import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';
import {act,freshGame,levels} from '../build/green-rescue-state.js';
import * as art from '../build/green-rescue-art.js';
const paths=[['pipe','socket','treatment','tap'],['inspect','meter','calibrate','run'],['box','socket','paper','paper-bin','glass','glass-bin','transfer'],['heat','socket','sensor','valve-turn','valve-turn','launch']];
const wrong=[['tap','bypass'],['speed','flush'],['mixed','drain'],['bypass','boost']];
function finish(s){let count=0;while(s.phase==='ACTION_ANIMATION'){assert.equal(act(s,'popup'),s);assert.equal(act(s,'next'),s);assert.equal(act(s,'tap'),s);assert.ok(++count<10);s=act(s,'tick');}return s;}
let s=act(act(freshGame(),'start'),'begin'),tested=0;
for(let n=0;n<4;n++){
 assert.equal(s.level,n);const cues=new Set();for(const id of wrong[n]){let f=act(s,id);cues.add(f.action.beats[1].cue);f=finish(f);assert.equal(f.phase,'FAILURE');assert.equal(act(f,'next'),f);s=act(act(f,'popup'),'retry');assert.equal(s.phase,'PLAYING');}assert.equal(cues.size,2);
 // Exercise every object across all subsets of installed parts, with/without selection.
 for(let mask=0;mask<(1<<levels[n].required.length);mask++)for(const selected of [null,paths[n][0]])for(const id of levels[n].items){const base={...s,done:levels[n].required.filter((_,i)=>mask&(1<<i)),selected};const result=finish(act(base,id));assert.ok(['PLAYING','SUCCESS','FAILURE'].includes(result.phase));tested++;}
 for(const id of paths[n]){s=act(s,id);if(s.phase==='ACTION_ANIMATION'){const paused=act(s,'pause');assert.equal(act(paused,'tick'),paused);s=act(paused,'resume');}s=finish(s);}assert.equal(s.phase,'SUCCESS');assert.equal(s.action.beats.length,6);s=act(act(s,'popup'),'next');if(n<3)s=act(s,'begin');
 for(const mobile of [false,true]){const svg=art.world({...freshGame(),level:n,phase:'PLAYING'},mobile,true);for(const id of levels[n].items.filter(id=>!['inspect','paper','glass','paper-bin','glass-bin','valve-turn'].includes(id)))assert.ok(svg.includes(`data-object="${id}"`));assert.doesNotMatch(svg,/NaN|undefined/);for(const pose of art.poses)assert.ok(art.scientist(pose).includes('pose-'+pose));}
}
assert.equal(s.phase,'FINAL_VICTORY');assert.equal(s.mistakes,8);assert.equal(act(s,'restart').level,0);
// Execute the production controller in an event/clock harness (not a browser).
const events={},handlers={},messages=[],timers=new Map();let tid=0,mobile=false,drop=null,closed=0,tones=0;
const element=()=>({innerHTML:'',textContent:'',className:'',style:{},dataset:{},addEventListener(k,f){handlers[k]=f},querySelector(){return null},setAttribute(){},append(){},remove(){},setPointerCapture(){}});const root=element();
const context=vm.createContext({...art,levels,act,freshGame,document:{hidden:false,activeElement:null,body:element(),querySelector:q=>q==='#game'?root:element(),createElement:element,elementFromPoint:()=>drop,addEventListener:(k,f)=>events[k]=f},performance:{now:()=>0},window:{AudioContext:class{currentTime=0;destination={};resume(){return Promise.resolve()}createOscillator(){tones++;return{frequency:{setValueAtTime(){},exponentialRampToValueAtTime(){}},connect(){},start(){},stop(){}}}createGain(){return{gain:{setValueAtTime(){},exponentialRampToValueAtTime(){}},connect(){},disconnect(){}}}close(){closed++}}},parent:{postMessage:x=>messages.push(x)},location:{origin:'http://test'},matchMedia:q=>({matches:q.includes('650')&&mobile}),setTimeout:(fn,ms)=>{timers.set(++tid,{fn,ms});return tid},clearTimeout:id=>timers.delete(id),setInterval:fn=>{events.clock=fn;return 1},clearInterval(){},addEventListener:(k,f)=>events[k]=f,console});
vm.runInContext((await readFile(new URL('../build/green-rescue.js',import.meta.url),'utf8')).replace(/^import .*;\n/gm,'')+'\nglobalThis.probe={dispatch,get:()=>state};',context);
const d=context.probe.dispatch,get=context.probe.get;
function flush(){for(let i=0;i<12&&['ACTION_ANIMATION','SUCCESS','FAILURE'].includes(get().phase);i++){const entry=[...timers].find(([,t])=>t.ms<2000);assert.ok(entry);timers.delete(entry[0]);entry[1].fn();}}
d('start');d('begin');events.clock();assert.equal(get().elapsed,1);d('pause');events.clock();assert.equal(get().elapsed,1);d('resume');d('sound');assert.ok(tones>0);
const object=id=>({closest:()=>({dataset:{object:id}})});
handlers.pointerdown({pointerId:1,clientX:10,clientY:10,target:object('pipe')});events.pointermove({clientX:50,clientY:50});events.pointerup({clientX:50,clientY:50});assert.equal(get().phase,'PLAYING');assert.equal(get().done.length,0);
handlers.pointerdown({pointerId:2,clientX:10,clientY:10,target:object('pipe')});events.pointermove({clientX:50,clientY:50});drop=object('socket');events.pointerup({clientX:50,clientY:50});flush();assert.ok(get().done.includes('pipe'));
handlers.keydown({key:'Enter',preventDefault(){},target:object('treatment')});flush();d('tap');assert.doesNotMatch(root.innerHTML,/LEVEL COMPLETE!/);d('pause');assert.equal(get().phase,'PAUSED');d('resume');flush();assert.equal(get().phase,'RESULT_POPUP');assert.match(root.innerHTML,/LEVEL COMPLETE!/);
for(let n=1;n<4;n++){d('next');d('begin');for(const w of wrong[n]){d(w);flush();assert.match(root.innerHTML,/NOT QUITE!/);d('retry');}for(const id of paths[n]){d(id);flush();}assert.equal(get().outcome,'success');}
d('next');assert.match(root.innerHTML,/MISSION/);d('restart');d('begin');mobile=true;events.resize();assert.match(root.innerHTML,/portrait/);context.document.hidden=true;events.visibilitychange();assert.equal(get().phase,'PAUSED');d('exit');assert.equal(messages.at(-1).type,'green-rescue-exit');events.pagehide();assert.ok(closed>0);
console.log(`PASS: ${tested} object/state combinations; four complete six-beat successes; eight distinct failure routes; all 12 character poses; desktop/mobile SVG; controller timers, delayed popups, retry/next, pause/resume, restart, pointer-drop/keyboard adapters, optional audio and exit cleanup. Browser visual/touch timing not verified.`);
