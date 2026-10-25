// Optional Chromium CDP checks; see EXHIBITION-DELIVERY.md for setup.
import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
const page=(await (await fetch((process.env.CDP_URL||'http://127.0.0.1:9222')+'/json/list')).json()).find(p=>p.type==='page');
const ws=new WebSocket(page.webSocketDebuggerUrl);await new Promise(r=>ws.onopen=r);let seq=0;const pending=new Map(),errors=[];
ws.onmessage=e=>{let x=JSON.parse(e.data);if(x.id){const p=pending.get(x.id);pending.delete(x.id);x.error?p.reject(x.error):p.resolve(x.result);}else if(x.method==='Runtime.exceptionThrown')errors.push(x.params.exceptionDetails);else if(x.method==='Network.responseReceived'&&x.params.response.status>=400)errors.push({url:x.params.response.url,status:x.params.response.status});};
const send=(method,params={})=>new Promise((resolve,reject)=>{const id=++seq;pending.set(id,{resolve,reject});ws.send(JSON.stringify({id,method,params}));});
const evaluate=async expression=>{const r=await send('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw Error(JSON.stringify(r.exceptionDetails));return r.result.value;};
const until=async expression=>{for(let i=0;i<100;i++){if(await evaluate(expression))return;await new Promise(r=>setTimeout(r,100));}throw Error('Timed out: '+expression);};
const click=async selector=>{await until(`!!document.querySelector(${JSON.stringify(selector)})`);await evaluate(`document.querySelector(${JSON.stringify(selector)}).dispatchEvent(new MouseEvent('click',{bubbles:true}))`);};
const shot=async name=>{if(process.env.NO_SCREENSHOTS==='1')return;const r=await send('Page.captureScreenshot',{format:'png'});await fs.writeFile((process.env.SCREENSHOT_DIR||'/tmp')+'/'+name+'.png',Buffer.from(r.data,'base64'));};
await send('Runtime.enable');await send('Network.enable');await send('Page.enable');
await send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});
const origin=process.env.SITE_URL||'http://127.0.0.1:3000';
await send('Page.navigate',{url:origin+'/'+(process.env.SAFE_MODE==='1'?'?safe=1':'')+'#/dashboard'});await until("document.querySelector('[data-action=demos]')");
await evaluate("localStorage.clear()");await send('Page.navigate',{url:'about:blank'});await send('Page.navigate',{url:origin+'/'+(process.env.SAFE_MODE==='1'?'?safe=1':'')+'#/dashboard'});await until("document.querySelector('[data-action=demos]')");
const library=await evaluate("import('./data.js').then(m=>m.reactionLibrary.map(e=>({id:e.id,industrial:!!e.industrialEducation})))");
const state=()=>evaluate("JSON.parse(localStorage.getItem('lgg.v1'))");
const analysis=()=>evaluate("import('./engine.js').then(m=>m.analyze(JSON.parse(localStorage.getItem('lgg.v1')).reaction))");
const nav=async tab=>{const target=tab==='Chemistry Lab'?'Analyze':tab;if((await state())?.tab===target)return;let selector=`[data-action=tab][data-tab="${tab}"],[data-action=subsection][data-tab="${tab}"]`;if(!await evaluate(`!!document.querySelector(${JSON.stringify(selector)})`))await click('[data-action=tab][data-tab="Chemistry Lab"]');await click(selector);await until(`JSON.parse(localStorage.getItem('lgg.v1')).tab===${JSON.stringify(target)}`);};
const clean=async()=>assert.doesNotMatch(await evaluate("document.querySelector('#main').textContent"),/\b(?:NaN|undefined)\b/);
for(const entry of library){
 await nav('Dashboard');await click('[data-action=demos]');await click(`[data-action=library-load][data-id="${entry.id}"]`);await until(`JSON.parse(localStorage.getItem('lgg.v1')).reaction.libraryId===${JSON.stringify(entry.id)}`);
 const original=(await state()).reaction;const a=await analysis();assert.equal(a.valid,true);assert.ok(Number.isFinite(a.score));
 await nav('Chemistry Lab');await click('[data-action=review]');await clean();
 for(const tab of ['Solvents','Catalysts','Optimize']){await nav(tab);await clean();}
 if(entry.industrial){await click('[data-action=scenario]');}else{await click(`[data-action=apply-recommendation][data-id="education:${entry.id}"]`);}
 const applied=await state();assert.deepEqual(applied.reaction,original);assert.ok(applied.overrides);
 await nav('Compare');await clean();
 await nav('Principles');await clean();await nav('Dashboard');await click('[data-action=save]');
 const saved=await state();assert.equal(saved.history[0].reaction.libraryId,entry.id);
 await send('Page.reload');await until("document.querySelector('[data-action=demos]')");await nav('History');await click(`[data-action=load][data-id="${saved.history[0].id}"]`);
 assert.deepEqual((await state()).reaction,original);assert.deepEqual((await state()).overrides,saved.overrides);
 await evaluate("(()=>{const e=document.querySelector('[data-field=yield]');e.value=50;e.dispatchEvent(new Event('input',{bubbles:true}));})()");
 const edited=await analysis();assert.equal(edited.metrics.yield.value,50);assert.equal(edited.metrics.atom.value,a.metrics.atom.value);assert.ok(edited.score!==a.score);await clean();
 console.log('PASS core browser',entry.id,'load/analyze/solvent/catalyst/optimize/compare/principles/save/refresh/restore/edit');
}
// Exercise the accessible educational controls as well as the tab routes.
await nav('Principles');await click('[data-action=subsection][data-section=wheel]');
for(let i=0;i<12;i++){await click(`[data-wheel-index="${i}"]`);assert.equal(await evaluate(`document.querySelector('[data-wheel-panel="${i}"]').hidden`),false);}
await nav('Chemistry Lab');await click('[data-action=subsection][data-section=industrial]');await until("document.querySelector('[data-process-choice]')");
const processes=await evaluate("[...document.querySelector('[data-process-choice]').options].map(x=>x.value)");let stages=0;
for(const id of processes){await evaluate(`(()=>{const e=document.querySelector('[data-process-choice]');e.value=${JSON.stringify(id)};e.dispatchEvent(new Event('change',{bubbles:true}));})()`);const count=await evaluate(`import('./workspace-tools.js').then(m=>m.processGuides[${JSON.stringify(id)}].stages.length)`);for(let i=0;i<count;i++){await click(`[data-process-step="${i}"]`);assert.equal(await evaluate("document.querySelector('process-explorer-v2').selected"),i);await clean();stages++;}await click('[data-process-mode=present]');await click('[data-process-step="0"]');assert.match(await evaluate("document.querySelector('process-explorer-v2').textContent"),/What to Say/);}
if(process.env.SAFE_MODE==='1'){assert.equal(await evaluate("document.querySelectorAll('reaction-cinema, [data-cinema-frame]').length"),0);assert.match(await evaluate("document.querySelector('#main').textContent"),/compatibility mode/);}
console.log('PASS 12 principle selections and '+stages+' industrial process stages; presentation controls; compatibility mode='+!!process.env.SAFE_MODE);
for(const width of [1440,390]){await send('Emulation.setDeviceMetricsOverride',{width,height:900,deviceScaleFactor:1,mobile:width===390});for(const tab of ['Dashboard','Chemistry Lab','Principles','History','Impact Atlas','Green Rescue']){await nav(tab);await clean();assert.ok(await evaluate('document.documentElement.scrollWidth<=innerWidth+1'),tab+' horizontal overflow');}}
assert.equal(errors.length,0,JSON.stringify(errors));console.log('PASS: all '+library.length+' reaction browser loops; all six tabs at desktop/mobile widths; no page exceptions.');ws.close();
