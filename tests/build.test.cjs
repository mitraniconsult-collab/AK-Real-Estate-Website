const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { execFileSync } = require('node:child_process');
const root=path.join(__dirname,'..');
test('deployment HTML loads production React and valid compiled entries without changing source files',()=>{
 execFileSync(process.execPath,['scripts/build.cjs'],{cwd:root});
 const entries=new Set();
 for(const name of ['index.html','contact.html','sell.html','admin/index.html','admin/_p/listing-edit.html']){
  const html=fs.readFileSync(path.join(root,'dist',name),'utf8');
  assert.doesNotMatch(html,/text\/babel|@babel\/standalone|react\.development|react-dom\.development/);
  const scripts=[...html.matchAll(/<script[^>]*src="([^"]+)"/g)].map(m=>m[1]);
  const app=scripts.findIndex(s=>s.startsWith('/assets/compiled/'));
  assert.ok(app>scripts.indexOf('/assets/vendor/react-dom-18.3.1.min.js'));
  assert.ok(app>=0);entries.add(scripts[app]);
 }
 for(const entry of entries)new vm.Script(fs.readFileSync(path.join(root,'dist',entry),'utf8'));
 assert.match(fs.readFileSync(path.join(root,'index.html'),'utf8'),/text\/babel/);
 for(const name of ['server','tests','scripts','node_modules','supabase'])assert.equal(fs.existsSync(path.join(root,'dist',name)),false);
 assert.ok(fs.existsSync(path.join(root,'dist','robots.txt')));
});
