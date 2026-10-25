// Optional real-browser checks. Run preview, launch Chromium with --remote-debugging-port=9222, then run this script.
import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
const page=(await (await fetch((process.env.CDP_URL||'http://127.0.0.1:9222')+'/json/list')).json()).find(p=>p.type==='page');
const ws=new WebSocket(page.webSocketDebuggerUrl);await new Promise(r=>ws.onopen=r);let seq=0;const pending=new Map(),errors=[];
ws.onmessage=e=>{let x=JSON.parse(e.data);if(x.id){const p=pending.get(x.id);pending.delete(x.id);x.error?p.reject(x.error):p.resolve(x.result);}else if(x.method==='Runtime.exceptionThrown')errors.push(x.params.exceptionDetails);};
const send=(method,params={})=>new Promise((resolve,reject)=>{const id=++seq;pending.set(id,{resolve,reject});ws.send(JSON.stringify({id,method,params}));});
const evaluate=async expression=>{const r=await send('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw Error(JSON.stringify(r.exceptionDetails));return r.result.value;};
const until=async expression=>{for(let i=0;i<100;i++){if(await evaluate('Boolean('+expression+')'))return;await new Promise(r=>setTimeout(r,100));}throw Error('Timed out: '+expression);};
const click=async selector=>{await until(`!!document.querySelector(${JSON.stringify(selector)})`);await evaluate(`document.querySelector(${JSON.stringify(selector)}).dispatchEvent(new MouseEvent('click',{bubbles:true}))`);};
const shot=async name=>{if(process.env.NO_SCREENSHOTS==='1')return;await new Promise(r=>setTimeout(r,450));const r=await send('Page.captureScreenshot',{format:'png'});await fs.writeFile((process.env.SCREENSHOT_DIR||'/tmp')+'/'+name+'.png',Buffer.from(r.data,'base64'));};
// Start a second serve instance with {"cleanUrls":true} to reproduce the bad host fallback.
const origin=process.env.FALLBACK_URL||'http://localhost:3001';
await send('Runtime.enable');await send('Page.enable');
for(const path of ['green-rescue.html','cinema-stage.html','molecular-frame.html']){
 const response=await fetch(origin+'/'+path);assert.ok((await response.text()).includes('app-loader.js'),'Expected deliberately broken HTML fallback');
 await send('Page.navigate',{url:origin+'/'+path});await until("document.querySelector('#app [role=alert]')");
 assert.match(await evaluate("document.querySelector('#app').textContent"),/Recursive loading has been stopped/);
 await new Promise(r=>setTimeout(r,400));assert.equal(await evaluate("document.querySelectorAll('#app iframe,#app header,#app footer').length"),0);
}
assert.equal(errors.length,0,JSON.stringify(errors));console.log('PASS: real clean-URL/SPА fallback for game, Cinema and molecular child pages stops startup, displays recovery, and creates no nested iframe/header/footer.');ws.close();
