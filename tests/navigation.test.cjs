const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const source = fs.readFileSync(path.join(__dirname,'../ui_kits/website/Nav.jsx'),'utf8');
function menu(open) {
 const events={}, document={body:{style:{overflow:'auto'}},activeElement:null,addEventListener:(key,fn)=>events[key]=fn,removeEventListener:key=>delete events[key]};
 const item=()=>({focus(){document.activeElement=this;}});
 const button=item(), first=item(), last=item();
 let closed=false, cleanup;
 const ctx={open,document,menuButton:{current:button},menuPanel:{current:{querySelector:()=>first,querySelectorAll:()=>[first,last]}},setOpen:value=>closed=!value,React:{useEffect:fn=>cleanup=fn()}};
 const start=source.indexOf('  // Keep keyboard focus');
 const end=source.indexOf('  const [storedLang',start);
 vm.runInNewContext(source.slice(start,end),ctx);
 return {document,events,button,first,last,cleanup:()=>cleanup?.(),isClosed:()=>closed};
}
test('open mobile navigation focuses its first link, loops Tab and closes with Escape', () => {
 const m=menu(true);assert.equal(m.document.activeElement,m.first);assert.equal(m.document.body.style.overflow,'hidden');
 let prevented=false;
 m.last.focus();m.events.keydown({key:'Tab',shiftKey:false,preventDefault(){prevented=true;}});
 assert.equal(m.document.activeElement,m.button);assert.equal(prevented,true);
 m.events.keydown({key:'Tab',shiftKey:true,preventDefault(){}});assert.equal(m.document.activeElement,m.last);
 m.events.keydown({key:'Escape',preventDefault(){}});assert.equal(m.isClosed(),true);
 m.cleanup();assert.equal(m.document.activeElement,m.button);assert.equal(m.document.body.style.overflow,'auto');assert.equal(m.events.keydown,undefined);
});
test('closed navigation does not intercept keys or change scrolling', () => {
 const m=menu(false);assert.equal(m.document.body.style.overflow,'auto');assert.equal(m.events.keydown,undefined);
});
