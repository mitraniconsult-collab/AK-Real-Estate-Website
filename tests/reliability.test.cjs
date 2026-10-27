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
function localeHelpers() {
  const ctx = { window: {}, Intl };
  vm.runInNewContext(source('shared/i18n.js'), ctx);
  return ctx.window.AKLocale;
}
test('property fields use the same translation for raw DB rows and store models', () => {
  const { listingField } = localeHelpers();
  for (const row of [
    { title: 'Българско заглавие', title_en: 'English title', area: 'Божурище', area_en: 'Bozhurishte' },
    { title: 'Българско заглавие', titleEn: 'English title', area: 'Божурище', areaEn: 'Bozhurishte' },
  ]) {
    assert.equal(listingField(row, 'title', 'en'), 'English title');
    assert.equal(listingField(row, 'area', 'en'), 'Bozhurishte');
    assert.equal(listingField(row, 'title', 'bg'), 'Българско заглавие');
  }
  assert.equal(listingField({ title: 'Оригинал', title_en: '  ' }, 'title', 'en'), 'Оригинал');
});
test('property prices follow the selected locale and retain the exact amount', () => {
  const { price } = localeHelpers();
  assert.equal(price(168000, 'EUR', 'Sale', 'en'), '€168,000');
  assert.equal(price(168000, 'EUR', 'Sale', 'bg').replace(/\s/g, ' '), '168 000 €');
  assert.equal(price(1250000.5, 'EUR', 'Sale', 'en'), '€1,250,000.5');
  assert.match(price(950, 'EUR', 'Rent', 'bg'), /\/мес\.$/);
  assert.match(price(950, 'EUR', 'Rent', 'en'), /\/mo$/);
  assert.equal(price(null, 'EUR', 'Sale', 'bg'), '—');
  assert.equal(price(0, 'EUR', 'Sale', 'en'), '€0');
});
test('switching page language updates browser and metadata without duplicating tags', () => {
  const nodes = [];
  const document = {
    documentElement: { lang: 'bg' }, title: '',
    head: { appendChild: node => nodes.push(node) },
    createElement: () => ({ attrs: {}, setAttribute(key, value) { this.attrs[key] = value; } }),
    querySelector: selector => {
      const [, attr, value] = selector.match(/meta\[(name|property)="([^"]+)"\]/);
      return nodes.find(node => node.attrs[attr] === value) || null;
    },
  };
  const ctx = { window: {}, document, Intl };
  vm.runInNewContext(source('shared/i18n.js'), ctx);
  ctx.window.AKLocale.page('en', 'English title', 'English description');
  assert.equal(document.documentElement.lang, 'en');
  assert.equal(document.title, 'English title');
  ctx.window.AKLocale.page('bg', 'Българско заглавие', 'Българско описание');
  assert.equal(document.documentElement.lang, 'bg');
  assert.equal(document.title, 'Българско заглавие');
  assert.equal(nodes.length, 4);
  assert.equal(nodes.find(n => n.attrs.property === 'og:locale').attrs.content, 'bg_BG');
});
