import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {reactionLibrary,principles,emptyReaction} from '../build/data.js';
import {analyze,recommendations,format} from '../build/engine.js';
import {comparisonReveal,principlesWheel,wheelNames,scoreFactors,captureScores,animateScores} from '../build/experiences.js';
import {setReveal,selectPrinciple,installExperienceControls} from '../build/experience-controls.js';
for(const entry of reactionLibrary){const r=entry.reaction,a=analyze(r),proposed=recommendations(r).find(x=>x.scenario)?.scenario||{...r,yield:65},b=analyze(proposed);const html=comparisonReveal(r,proposed,a,b);for(const score of [a.score,b.score])assert.ok(html.includes(format(score)+'/100'));assert.doesNotMatch(html,/\b(?:NaN|undefined)\b/);assert.match(html,/value="50"/);assert.match(scoreFactors(a),/Contribution:/);}
const app=await readFile(new URL('../build/app.js',import.meta.url),'utf8');assert.doesNotMatch(app,/journeyView|data-journey/);
const wheel=principlesWheel(principles);assert.equal((wheel.match(/data-wheel-index=/g)||[]).length,12);for(const n of wheelNames)assert.ok(wheel.includes(n));
const range={setAttribute(k,v){this[k]=v;}},viewport={style:{setProperty(k,v){this[k]=v;}}},reveal={querySelector:s=>s.includes('viewport')?viewport:range};for(const n of [0,25,50,75,100]){setReveal(reveal,n);assert.equal(viewport.style['--reveal'],n+'%');assert.equal(range.value,String(n));assert.equal(range['aria-valuetext'],`${n}% original, ${100-n}% optimized`);}
let focused=-1;const segments=Array.from({length:12},(_,i)=>({dataset:{wheelIndex:String(i)},setAttribute(k,v){this[k]=v;},focus(){focused=i;},closest:s=>s==='[data-wheel]'?wheelRoot:s==='[data-wheel-index]'?segments[i]:null})),panels=Array.from({length:12},()=>({hidden:true}));const wheelRoot={querySelectorAll:s=>s.includes('index')?segments:panels};for(let i=0;i<12;i++){selectPrinciple(wheelRoot,i,true);assert.equal(focused,i);assert.equal(segments[i]['aria-pressed'],'true');assert.deepEqual(panels.map(x=>x.hidden),panels.map((_,j)=>j!==i));}
const lists={},handlers=new Proxy({},{get:(_,k)=>e=>(lists[k]||[]).forEach(f=>f(e))}),doc={addEventListener:(k,f)=>(lists[k]??=[]).push(f)},win={matchMedia:()=>({matches:false,addEventListener(){}})};installExperienceControls(doc,win);for(const [key,from,to] of [['ArrowRight',11,0],['ArrowLeft',0,11],['Home',5,0],['End',0,11],['Enter',3,3],[' ',4,4]]){handlers.keydown({target:segments[from],key,preventDefault(){}});assert.equal(focused,to);}
handlers.input({target:{value:'72',matches:()=>true,closest:()=>reveal}});assert.equal(range.value,'72');
selectPrinciple(wheelRoot,4);for(const event of ['pointerover','focusin'])for(let i=0;i<12;i++){handlers[event]({target:segments[i]});assert.equal(segments[4]['aria-pressed'],'true');}for(let i=0;i<12;i++){handlers.click({target:segments[i]});assert.equal(segments[i]['aria-pressed'],'true');}
// Controlled animation clock checks exact endpoint, downward motion, missing data and rapid cancellation.
let queue=new Map(),next=0,reduced=false;const clock={matchMedia:()=>({matches:reduced}),requestAnimationFrame:f=>{queue.set(++next,f);return next;},cancelAnimationFrame:id=>queue.delete(id)};
function element(key,score){const ring={setAttribute(k,v){this[k]=v;}},gauge={querySelector:()=>ring,classList:{flags:new Set(),add(k){this.flags.add(k);},remove(...keys){keys.forEach(k=>this.flags.delete(k));}}};return {dataset:{livingScore:key,count:score===null?'':String(score)},textContent:format(score),isConnected:true,closest:()=>gauge,ring};}
let elements=[];const scoreDoc={querySelectorAll:()=>elements};const flush=()=>{for(let time=0;queue.size&&time<2000;time+=100){const jobs=[...queue.values()];queue.clear();jobs.forEach(f=>f(time));}assert.equal(queue.size,0);};
for(const [from,to] of [[61.4,75.8],[80,63.25],[0,50],[50,0],[50,null],[null,50],[50,50]]){elements=[element('current',to)];animateScores({current:from},scoreDoc,clock);if(from!==null&&to!==null&&to<from)assert.ok(!elements[0].closest().classList.flags.has('lgg-score-improved'));flush();assert.equal(elements[0].textContent,format(to));assert.equal(elements[0].ring['stroke-dasharray'],`${to??0} 100`);}
elements=[element('current',80)];animateScores({current:50},scoreDoc,clock);const first=[...queue.values()][0];queue.clear();first(0);const previous=captureScores(scoreDoc);elements=[element('current',65)];animateScores(previous,scoreDoc,clock);flush();assert.equal(elements[0].textContent,'65.0');reduced=true;elements=[element('current',77.123456)];animateScores({current:50},scoreDoc,clock);assert.equal(queue.size,0);assert.equal(elements[0].textContent,'77.1');assert.equal(elements[0].dataset.count,'77.123456');
reduced=false;elements=[element('original',60),element('optimized',72)];scoreDoc.querySelector=()=>({});animateScores({},scoreDoc,clock);assert.equal(elements[1].textContent,'60.0');flush();assert.equal(elements[1].textContent,'72.0');
const css=await readFile(new URL('../build/experiences.css',import.meta.url),'utf8');assert.match(css,/prefers-reduced-motion/);assert.match(css,/@media\(max-width:600px\)/);
console.log('PASS: journey removed; 15 comparison datasets; range endpoints/input; 12 persistent wheel selections, hover does not change selection, keyboard wrap; score increase/decrease/zero/missing/rapid updates and precision. DOM/clock harness, not visual browser QA.');

// Remember valid scores across tabs without gauges, but clear missing states.
elements=[element('current',71.3)];captureScores(scoreDoc);elements=[];assert.equal(captureScores(scoreDoc).current,71.3);elements=[element('current',null)];assert.equal(captureScores(scoreDoc).current,null);
// Pointer tilt is bounded, resettable, and disabled for touch/reduced motion.
let tiltJobs=[],tiltReduced=false;
const tiltHandlers={},svg={isConnected:true,style:{setProperty(k,v){this[k]=v;}},getBoundingClientRect:()=>({left:0,top:0,width:320,height:320}),contains:()=>false};
installExperienceControls({addEventListener:(k,f)=>tiltHandlers[k]=f},{matchMedia:()=>({matches:tiltReduced,addEventListener(){}}),requestAnimationFrame:f=>{tiltJobs=[f];return 1;},cancelAnimationFrame:()=>tiltJobs=[]});
const target={closest:s=>s==='[data-wheel] svg'?svg:null};
tiltHandlers.pointermove({target,clientX:320,clientY:0,pointerType:'mouse'});tiltJobs.pop()();assert.equal(svg.style['--tilt-x'],'4deg');assert.equal(svg.style['--tilt-y'],'4deg');tiltHandlers.pointerout({target});assert.equal(svg.style['--tilt-x'],'0deg');tiltHandlers.pointermove({target,pointerType:'touch'});assert.equal(tiltJobs.length,0);tiltReduced=true;tiltHandlers.pointermove({target,pointerType:'mouse'});assert.equal(tiltJobs.length,0);
assert.match(css,/lgg-wheel__segment\[aria-pressed=true\]/);assert.doesNotMatch(css,/lgg-journey/);
console.log('PASS: score continuity across tabs; bounded pointer tilt, exit reset and touch/reduced-motion suppression.');
// Existing score rows disclose only the provided engine description.
let shown={hidden:true,textContent:''};const factorRows=[];const factorRoot={querySelectorAll:()=>factorRows,querySelector:()=>shown};const factor={dataset:{scoreDescription:'Atom economy: subscore 80.0/100. Contribution: 20.0 points.'},setAttribute(k,v){this[k]=v;},closest:s=>s==='[data-score-factor]'?factor:s==='.breakdown'?factorRoot:null};factorRows.push(factor);
handlers.click({target:factor});assert.equal(shown.hidden,false);assert.equal(shown.textContent,factor.dataset.scoreDescription);assert.equal(factor['aria-expanded'],'true');shown.hidden=true;handlers.keydown({target:factor,key:'Enter',preventDefault(){}});assert.equal(shown.hidden,false);
console.log('PASS: factor selection and keyboard disclosure show the supplied engine explanation.');

// Glass markup and bounded light response; these do not certify browser rendering.
assert.equal((wheel.match(/class="lgg-wheel__glass"/g)||[]).length,12);
assert.equal((wheel.match(/class="lgg-wheel__reflection"/g)||[]).length,12);
assert.match(wheel,/#157F86/);assert.match(wheel,/#34D5CC/);assert.match(wheel,/#7CE2DA/);
tiltReduced=false;tiltHandlers.pointermove({target,clientX:320,clientY:0,pointerType:'mouse'});tiltJobs.pop()();
assert.equal(svg.style['--reflection-x'],'2px');assert.ok(Number(svg.style['--reflection-opacity'])<=.67);
tiltHandlers.pointerout({target});assert.equal(svg.style['--reflection-x'],'0px');assert.equal(svg.style['--reflection-opacity'],'.32');
const polish=await readFile(new URL('../build/exhibition-polish.css',import.meta.url),'utf8');
assert.match(polish,/prefers-reduced-motion/);assert.match(polish,/margin-block-start:24px/);assert.match(polish,/margin-block-start:20px/);
assert.match(app,/How much of the reactant atoms/);assert.match(app,/LocalStorage/);assert.match(app,/indirect estimate/);
console.log('PASS: twelve glass segments/reflections, bounded pointer light/reset, accessible selection retained; scoped spacing and plain-language markup checks. Visual appearance is not browser-tested.');
