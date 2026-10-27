const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const seo = require('../server/public-seo.cjs');
const template = fs.readFileSync(require('node:path').join(__dirname, '../listing.html'), 'utf8');
test('initial HTML escapes listing text and includes a real photo rather than video', () => {
 const html = seo.metadata(template, { id:'L-014', title:'<script>"&', title_en:'Apartment', description_en:'A bright apartment', images:['https://images.test/tour.mp4', 'https://images.test/photo.jpg'], main_image:0 }, 'en');
 assert.match(html, /<title>Apartment \| AK Real Estate<\/title>/);
 assert.match(html, /<html lang="en">/);
 assert.match(html, /property="og:image" content="https:\/\/images.test\/photo.jpg"/);
 assert.match(html, /rel="canonical" href="https:\/\/www.akrealestatebg.com\/listing\?id=L-014"/);
 const escaped = seo.metadata(template, {id:'L-1', title:'<script>"&'});
 assert.match(escaped, /&lt;script&gt;&quot;&amp;/);
});
test('public reads retain RLS, filter drafts, and propagate outages', async () => {
 let url, options;
 const rows = await seo.listings({select:'id,status'}, async (u,o) => {url=u;options=o;return {ok:true,json:async()=>[{id:'L-1',status:'Active'},{id:'L-2',status:'Draft'}]};});
 assert.equal(new URL(url).searchParams.get('status'),'neq.Draft');
 assert.ok(options.headers.apikey.startsWith('sb_publishable_'));
 assert.deepEqual(rows.map(row=>row.id),['L-1']);
 await assert.rejects(seo.listings({}, async()=>({ok:false,status:503})));
});
test('sitemap contains actual listings and does not turn outages into an empty sitemap', async () => {
 const xml = await seo.sitemap(async()=>({ok:true,json:async()=>[{id:'L-014',status:'Active'}]}));
 assert.match(xml,/listing\?id=L-014/);
 assert.match(xml,/\/contact<\/loc>/);
 await assert.rejects(seo.sitemap(async()=>{throw Error('offline');}));
});
