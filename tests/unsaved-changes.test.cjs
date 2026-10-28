const { test } = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const path = require('node:path');
function setup() {
 const listeners={}, docListeners={}, moves=[], dispatched=[];
 let url=new URL('https://example.test/admin/listings/QA/edit'), approved=false, asks=0;
 const location={};for(const key of ['href','origin','pathname','search','hash'])Object.defineProperty(location,key,{get:()=>url[key]});
 const history={state:null,replaceState(state,_,to){this.state=state;url=new URL(to,url);},pushState(state,_,to){this.state=state;url=new URL(to,url);},go:delta=>moves.push(delta)};
 const window={alert(){},confirm(){asks++;return approved;},addEventListener:(key,fn)=>listeners[key]=fn,dispatchEvent:event=>dispatched.push(event)};
 const ctx={window,location,history,URL,document:{addEventListener:(key,fn)=>docListeners[key]=fn},PopStateEvent:class{constructor(type,options){this.type=type;Object.assign(this,options);}}};
 vm.runInNewContext(fs.readFileSync(path.join(__dirname,'../admin/unsaved-changes.js'),'utf8'),ctx);
 return {guard:window.AKUnsavedChanges,listeners,docListeners,moves,dispatched,history,location,approve:value=>approved=value,asks:()=>asks,move:(to,state)=>{url=new URL(to,url);history.state=state;}};
}
test('cancelled navigation preserves edits and the current route; confirmed navigation clears the warning',()=>{
 const s=setup(),owner={};s.guard.setDirty(owner,true);
 assert.equal(s.guard.push('/admin/listings'),false);assert.match(s.location.pathname,/QA\/edit/);assert.equal(s.guard.dirty(),true);
 s.approve(true);assert.equal(s.guard.push('/admin/listings'),true);assert.equal(s.guard.dirty(),false);assert.equal(s.dispatched.length,1);
});
test('back and forward cancellation restore the correct history entry',()=>{
 for(const destination of [-1,1]){
  const s=setup();s.guard.setDirty({},true);s.move('/admin/listings',{akAdminIndex:destination});
  assert.equal(s.guard.acceptPop({state:s.history.state}),false);assert.deepEqual(s.moves,[-destination]);
  assert.equal(s.guard.dirty(),true);assert.equal(s.guard.acceptPop({state:{akAdminIndex:0}}),false);
 }
});
test('closing a dirty page warns; a clean page does not',()=>{
 const s=setup(),owner={};let prevented=0;const event={preventDefault(){prevented++;}};
 s.listeners.beforeunload(event);assert.equal(prevented,0);
 s.guard.setDirty(owner,true);s.listeners.beforeunload(event);assert.equal(prevented,1);
 s.guard.clear(owner);s.listeners.beforeunload(event);assert.equal(prevented,1);
});
test('normal links are guarded while new tabs and same-page anchors remain usable',()=>{
 const s=setup();s.guard.setDirty({},true);let prevented=false;
 const link={href:'https://example.test/admin/listings',target:'',hasAttribute:()=>false};
 const event={button:0,target:{closest:()=>link},preventDefault(){prevented=true;},stopImmediatePropagation(){}};
 s.docListeners.click(event);assert.equal(prevented,true);
 prevented=false;link.target='_blank';s.docListeners.click(event);assert.equal(prevented,false);
 link.target='';link.href=s.location.href+'#details';s.docListeners.click(event);assert.equal(prevented,false);
});
test('authentication redirects can force navigation and several edit owners are tracked separately',()=>{
 const s=setup(),a={},b={};s.guard.setDirty(a,true);s.guard.setDirty(b,true);s.guard.clear(a);assert.equal(s.guard.dirty(),true);
 assert.equal(s.guard.push('/admin/login',true),true);assert.equal(s.asks(),0);assert.equal(s.guard.dirty(),false);
});

test('in-app navigation waits until a save or upload finishes',()=>{
 const s=setup(),owner={};s.guard.setBusy(owner,true);s.approve(true);
 assert.equal(s.guard.push('/admin/listings'),false);assert.equal(s.asks(),0);
 s.guard.setBusy(owner,false);assert.equal(s.guard.push('/admin/listings'),true);
});
