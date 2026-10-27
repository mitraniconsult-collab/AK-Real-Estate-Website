const { test } = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const path = require('node:path');
const root = path.join(__dirname, '..');
const source = name => fs.readFileSync(path.join(root, name), 'utf8');
async function store(client) {
  const ctx = { window: { akSupabase: client }, console: { error() {}, warn() {} }, alert() {} };
  vm.runInNewContext(source('shared/listings-store.js'), ctx);
  await new Promise(resolve => setImmediate(resolve));
  return ctx.window.AKStore;
}
function client(result, upsert) {
  return { from: () => ({ select: () => ({ order: async () => typeof result === 'function' ? result() : result }), upsert }) };
}
test('unconfigured or failed service never exposes demonstration properties', async () => {
  for (const service of [undefined, client({ error: { code: '503' } }), client(() => { throw Error('offline'); })]) {
    const s = await store(service);
    assert.equal(s.ready, true);
    assert.equal(s.loadError, true);
    assert.equal(s.listings.length, 0);
  }
});
test('retry recovers actual properties after a failure', async () => {
  let failed = true;
  const s = await store(client(() => failed ? { error: {} } : { data: [{ id: 'L-014', title: 'Real property', status: 'Active' }] }));
  failed = false;
  await s.load();
  assert.equal(s.loadError, null);
  assert.equal(s.listings[0].id, 'L-014');
});
test('unsuccessful and thrown saves preserve existing state', async () => {
  for (const save of [async () => ({ error: { code: '42501' } }), async () => { throw Error('offline'); }]) {
    const s = await store(client({ data: [{ id: 'L-1', title: 'Original' }] }, save));
    assert.equal(await s.upsert({ id: 'L-1', title: 'Unsaved' }), false);
    assert.equal(s.listings[0].title, 'Original');
  }
});
test('store reports success only after the server confirms a save', async () => {
  let confirm;
  const s = await store(client({ data: [] }, () => new Promise(resolve => { confirm = resolve; })));
  const saving = s.upsert({ id: 'L-20', title: 'Confirmed' });
  assert.equal(s.listings.length, 0);
  confirm({ error: null });
  assert.equal(await saving, true);
  assert.equal(s.listings[0].title, 'Confirmed');
});
test('search covers Bulgarian, English, transliteration and property references', () => {
  const ctx = { window: {} };
  vm.runInNewContext(source('shared/search.js'), ctx);
  const match = ctx.window.AKMatchesSearch;
  const row = { id: 'L-014', title: 'Апартамент в Божурище', city: 'Божурище', title_en: 'One-bedroom apartment in Bozhurishte' };
  for (const query of ['Божурище', 'bozhurishte', 'ONE-BEDROOM', 'l-014', 'apартамент', 'apartment Bozhurishte']) assert.equal(match(row, query), true, query);
  assert.equal(match(row, 'Malibu'), false);
});
function storage() {
  const m = new Map();
  return { getItem: key => m.get(key) ?? null, setItem: (key, v) => m.set(key, v), removeItem: key => m.delete(key) };
}
test('remember me persists across visits; session-only tokens stay out of localStorage', () => {
  const localStorage = storage(), sessionStorage = storage(), ctx = { window: {}, localStorage, sessionStorage };
  vm.runInNewContext(source('shared/auth-storage.js'), ctx);
  const adapter = ctx.window.AKAuthStorage;
  adapter.setItem('session', 'remembered');
  assert.equal(localStorage.getItem('session'), 'remembered');
  localStorage.setItem('ak.auth.remember', 'false');
  adapter.setItem('session', 'temporary');
  assert.equal(localStorage.getItem('session'), null);
  assert.equal(sessionStorage.getItem('session'), 'temporary');
  assert.equal(adapter.getItem('session'), 'temporary');
  adapter.removeItem('session');
  assert.equal(adapter.getItem('session'), null);
});
function editorSave(upsert) {
  const code = source('admin/ListingFormPage.jsx');
  const start = code.indexOf('  const save = async (publish) => {');
  const end = code.indexOf('\n  };', start) + 5;
  const events = [];
  const ctx = {
    saveLock: { current: false }, imagesUploading: false, validate: () => true,
    form: { id: 'L-014', title: 'Edited', status: 'Active' }, editing: true,
    Store: { upsert }, t: s => s, navigate: () => events.push('navigate'),
    setSaving: value => events.push(['saving', value]), setSaved: value => events.push(['saved', value]),
    setSaveError: value => events.push(['error', value]),
  };
  vm.runInNewContext(code.slice(start, end) + '\nthis.runSave = save;', ctx);
  return { save: ctx.runSave, events };
}
test('editor waits for acknowledgement and blocks double submission', async () => {
  let confirm, calls = 0;
  const { save, events } = editorSave(() => { calls++; return new Promise(resolve => { confirm = resolve; }); });
  const pending = save(true);
  await save(true);
  assert.equal(calls, 1);
  assert.equal(events.includes('navigate'), false);
  assert.equal(events.some(e => e[0] === 'saved' && e[1] === true), false);
  confirm(true);
  await pending;
  assert.equal(events.includes('navigate'), true);
});
test('editor failure keeps user on the form with an actionable error', async () => {
  const { save, events } = editorSave(async () => false);
  await save(true);
  assert.equal(events.includes('navigate'), false);
  assert.equal(events.some(e => e[0] === 'error' && e[1].includes('Your changes are still here')), true);
  assert.equal(events.at(-1)[0], 'saving');
  assert.equal(events.at(-1)[1], false);
});
