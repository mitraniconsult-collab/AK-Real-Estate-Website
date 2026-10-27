const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const root = path.join(__dirname, '..');
const source = fs.readFileSync(path.join(root, 'ui_kits/website/Contact.jsx'), 'utf8');
const start = source.indexOf('  const handleSubmit = async (e) => {');
const end = source.indexOf('\n  };', start) + 5;
function contact(insert = async () => ({error:null}), values = {}) {
 const state = {sent:false, loading:false, error:'', failureCode:''}, calls = [], logs = [];
 const ctx = {
  name:'Test person', phone:'+359 (879) 684-460', message:'A viewing please', budget:'150000 EUR', interest:'buy', lang:'bg', isBg:true, honeypot:'',
  submitLock:{current:false}, submitted:{current:false}, navigator:{userAgent:'test'},
  INTEREST_OPTIONS:[{key:'buy',bg:'Покупка',en:'Buying'}],
  setError:v=>state.error=v, setFailureCode:v=>state.failureCode=v,
  setLoading:v=>state.loading=v, setSent:v=>state.sent=v,
  console:{error:(...args)=>logs.push(args),warn(){}},
  window:{akSupabase:{from:()=>({insert:payload=>{calls.push(payload);return insert(payload);}}), functions:{invoke:async()=>({error:null})}}}, ...values
 };
 vm.runInNewContext(source.slice(start,end)+'\nthis.submit=handleSubmit;',ctx);
 return {ctx,state,calls,logs,submit:()=>ctx.submit({preventDefault(){}})};
}
test('a legitimate inquiry submitted immediately is saved before success appears', async () => {
 let confirm;
 const form=contact(()=>new Promise(resolve=>confirm=resolve));
 const first=form.submit();await form.submit();
 assert.equal(form.calls.length,1);assert.equal(form.state.sent,false);assert.equal(form.state.loading,true);
 confirm({error:null});await first;
 assert.equal(form.state.sent,true);assert.equal(form.state.loading,false);
 await form.submit();assert.equal(form.calls.length,1);
});
test('failed inquiries remain retryable and diagnostics do not print personal details', async () => {
 let fail=true;
 const form=contact(async()=>fail?{error:{code:'42501',message:'private submitted phone',details:'private message'}}:{error:null});
 await form.submit();
 assert.equal(form.state.sent,false);assert.equal(form.state.loading,false);assert.equal(form.state.failureCode,'unavailable');
 assert.equal(form.ctx.message,'A viewing please');assert.equal(JSON.stringify(form.logs).includes('private'),false);
 fail=false;await form.submit();assert.equal(form.calls.length,2);assert.equal(form.state.sent,true);
});
test('thrown connection errors release the submission lock', async () => {
 const form=contact(async()=>{throw Error('offline');});
 await form.submit();await form.submit();
 assert.equal(form.calls.length,2);assert.equal(form.state.sent,false);assert.equal(form.state.loading,false);
});
test('invalid phone numbers and overlong messages never reach the database', async () => {
 for(const phone of ['hello','123','+1234567890123456','++359879684460']){
  const form=contact(undefined,{phone});await form.submit();assert.equal(form.calls.length,0);assert.equal(form.state.failureCode,'phone');
 }
 const form=contact(undefined,{message:'a'.repeat(5001)});await form.submit();assert.equal(form.calls.length,0);assert.equal(form.state.failureCode,'length');
});
test('blocked browser storage uses Bulgarian and invalid stored languages are normalized', () => {
 const ctx={window:{},localStorage:{getItem(){throw Error('blocked');}}};
 vm.runInNewContext(fs.readFileSync(path.join(root,'shared/i18n.js'),'utf8'),ctx);
 assert.equal(ctx.window.AKLocale.read(),'bg');
 ctx.localStorage.getItem=()=> 'en';assert.equal(ctx.window.AKLocale.read(),'en');
 ctx.localStorage.getItem=()=> 'unknown';assert.equal(ctx.window.AKLocale.read(),'bg');
});
