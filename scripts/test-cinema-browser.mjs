// Optional real-browser checks. Run preview, launch Chromium with --remote-debugging-port=9222, then run this script.
import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
const page=(await (await fetch((process.env.CDP_URL||'http://127.0.0.1:9222')+'/json/list')).json()).find(p=>p.type==='page');
const ws=new WebSocket(page.webSocketDebuggerUrl);await new Promise(r=>ws.onopen=r);let seq=0;const pending=new Map(),errors=[];
ws.onmessage=e=>{let x=JSON.parse(e.data);if(x.id){const p=pending.get(x.id);pending.delete(x.id);x.error?p.reject(x.error):p.resolve(x.result);}else if(x.method==='Runtime.exceptionThrown')errors.push(x.params.exceptionDetails);};
const send=(method,params={})=>new Promise((resolve,reject)=>{const id=++seq;const timer=setTimeout(()=>{pending.delete(id);reject(Error('CDP timeout: '+method+' '+String(params.expression||'').slice(0,180)));},20000);pending.set(id,{resolve:r=>{clearTimeout(timer);resolve(r)},reject:e=>{clearTimeout(timer);reject(e)}});ws.send(JSON.stringify({id,method,params}));});
const evaluate=async expression=>{const r=await send('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw Error(JSON.stringify(r.exceptionDetails));return r.result.value;};
const until=async expression=>{for(let i=0;i<100;i++){if(await evaluate('Boolean('+expression+')'))return;await new Promise(r=>setTimeout(r,100));}throw Error('Timed out: '+expression);};
const click=async selector=>{await until(`!!document.querySelector(${JSON.stringify(selector)})`);await evaluate(`document.querySelector(${JSON.stringify(selector)}).dispatchEvent(new MouseEvent('click',{bubbles:true}))`);};
const shot=async name=>{await new Promise(r=>setTimeout(r,450));if(process.env.NO_SCREENSHOTS==='1')return;const r=await send('Page.captureScreenshot',{format:'png'});await fs.writeFile((process.env.SCREENSHOT_DIR||'/tmp')+'/'+name+'.png',Buffer.from(r.data,'base64'));};
const origin=process.env.SITE_URL||'http://127.0.0.1:3000';
await send('Runtime.enable');await send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});await send('Page.enable');await send('Emulation.setDeviceMetricsOverride',{width:1440,height:1000,deviceScaleFactor:1,mobile:false});
await send('Page.navigate',{url:origin+'/#/dashboard'});await until("document.querySelector('[data-action=demos]')");
const ids=await evaluate("import('./data.js').then(m=>m.reactionLibrary.map(e=>e.id))");
await evaluate("window.__cinemaStep=-1;addEventListener('message',e=>{if(e.source===document.querySelector('[data-cinema-frame]')?.contentWindow&&e.data?.type==='cinema-rendered')window.__cinemaStep=e.data.step})");
for(const id of ids.filter(id=>!process.env.CINEMA_ID||id===process.env.CINEMA_ID)){
 await click('[data-action=tab][data-tab=Dashboard]');await click('[data-action=demos]');await evaluate('window.__cinemaStep=-1');await click(`[data-action=library-load][data-id="${id}"]`);await until("document.querySelector('reaction-cinema')");await evaluate("document.querySelector('reaction-cinema').scrollIntoView({block:'center',behavior:'instant'})");
 for(let step=0;step<5;step++){if(step)await click('[data-cinema=next]');await until(`window.__cinemaStep===${step}`);assert.equal(await evaluate("document.querySelector('[data-cinema-frame]').contentDocument.querySelectorAll('canvas').length>0"),true);assert.doesNotMatch(await evaluate("document.querySelector('[data-cinema-frame]').contentDocument.body.textContent"),/structures unavailable|Structure unavailable|This experience could not load|NaN|undefined/);}
 await click('[data-cinema=previous]');assert.equal(await evaluate("document.querySelector('reaction-cinema').step"),3);await click('[data-cinema=rotate]');await click('[data-cinema=reset]');
 await click('[data-cinema=replay]');await click('[data-cinema=pause]');assert.equal(await evaluate("document.querySelector('reaction-cinema').playing"),false);assert.equal(await evaluate("document.querySelector('reaction-cinema').step"),0);
 console.log('PASS WebGL',id,'all five scenes; previous/rotate/reset/replay/pause');
}
if(!process.env.CINEMA_ID||process.env.CINEMA_ID==='industrial-ammonia'){
await send('Runtime.evaluate',{expression:"document.querySelector('[data-cinema=fullscreen]').click()",userGesture:true});await until("document.fullscreenElement?.tagName==='REACTION-CINEMA'");await evaluate("document.exitFullscreen()");await until("!document.fullscreenElement");console.log('PASS Cinema fullscreen enter/exit');
await send('Emulation.setEmulatedMedia',{features:[]});await click('[data-cinema=play]');await until("document.querySelector('reaction-cinema').step===1");await click('[data-cinema=pause]');await new Promise(r=>setTimeout(r,5500));assert.equal(await evaluate("document.querySelector('reaction-cinema').step"),1);
await send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});await click('[data-cinema=play]');assert.equal(await evaluate("document.querySelector('reaction-cinema').playing"),false);assert.equal(await evaluate("document.querySelector('reaction-cinema').step"),2);
}
assert.equal(errors.length,0,JSON.stringify(errors));console.log('PASS Cinema coverage '+(process.env.CINEMA_ID||ids.length)+'; timing tested for full run or ammonia only.');ws.close();
