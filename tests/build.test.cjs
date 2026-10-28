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

test('compiled admin entry renders its login and shared language switch in one scope',()=>{
 const html=fs.readFileSync(path.join(root,'dist/admin/index.html'),'utf8');
 const src=html.match(/src="(\/assets\/compiled\/[^\"]+)"/)[1];
 let rendered;
 const React={
  createElement(type,props,...children){return typeof type==='function'?type({...props,children}):{type,props,children};},
  useState(value){return [value===true?false:typeof value==='function'?value():value,()=>{}];},
  isValidElement:value=>!!value?.type,cloneElement:(value,props)=>({...value,props:{...value.props,...props}}),
  createContext:value=>({_value:value}),useContext:context=>context._value,
  useEffect(){},useRef:value=>({current:value}),useId:()=> 'test-id',
 };
 const window={React,innerWidth:1365,AKStore:{listings:[]},AKAdminLocale:{use:()=>({lang:'bg',t:key=>key,setLang(){}})}};
 const ctx={window,React,ReactDOM:{createRoot:()=>({render:tree=>rendered=tree})},document:{getElementById:()=>({})},location:{pathname:'/admin/login',search:'',hash:''},URLSearchParams,localStorage:{getItem:()=>null},console};
 vm.runInNewContext(fs.readFileSync(path.join(root,'dist',src),'utf8'),ctx);
 assert.match(JSON.stringify(rendered),/Sign In/);
 assert.match(JSON.stringify(rendered),/"BG"/);
 assert.match(JSON.stringify(rendered),/"EN"/);
});
