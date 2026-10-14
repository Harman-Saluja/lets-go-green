import * as cinema from '../build/reaction-cinema.js';
import * as scienceViews from '../build/science-views.js';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFile} from 'node:fs/promises';
import {webcrypto} from 'node:crypto';
import * as data from '../build/data.js';
import * as engine from '../build/engine.js';
import * as navbar from '../build/components/ui/anime-navbar.js';
import * as experiences from '../build/experiences.js';
import * as work from '../build/workspace-tools.js';
import {installWorkspaceNav} from '../build/workspace-nav.js';
const source=(await readFile(new URL('../build/app.js',import.meta.url),'utf8')).replace(/^import .*;\n/gm,'');
function boot(hash=''){
 const storage=new Map(),listeners={},events={},app={innerHTML:''},location={hash};
 const document={activeElement:null,body:{classList:{toggle(){}}},querySelector:s=>s==='#app'?app:s==='#toast'?{classList:{add(){},remove(){}}}:null,querySelectorAll:()=>[],getElementById:()=>null,addEventListener:(k,f)=>listeners[k]=f};
 const window={location,scrollTo(){},addEventListener:(k,f)=>events[k]=f,history:{pushState:(a,b,h)=>location.hash=h,replaceState:(a,b,h)=>location.hash=h}};
 const context=vm.createContext({...cinema,...scienceViews,...data,...engine,...navbar,...experiences,...work,document,window,localStorage:{getItem:k=>storage.get(k)??null,setItem:(k,v)=>storage.set(k,v)},crypto:webcrypto,setTimeout:()=>1,clearTimeout(){},AbortController,console});
 vm.runInContext(source,context);
 return {app,window,events,context,click:(action,extra={})=>listeners.click({preventDefault(){},target:{closest:()=>({dataset:{action,...extra}})}}),input:(key,value)=>listeners.input({target:{hasAttribute:n=>n==='data-sim-field',tagName:'INPUT',type:'number',dataset:{simField:key},value}}),get:expr=>JSON.parse(vm.runInContext('JSON.stringify('+expr+')',context))};
}
for(const entry of data.reactionLibrary){
 const h=boot();h.click('library-load',{id:entry.id});const original=h.get('state.reaction');
 h.click('subsection',{tab:'Analyze',section:'simulator'});assert.match(h.app.innerHTML,/What-if inputs/);
 h.input('yield','60');const draft=h.get('simulation.draft');assert.equal(engine.analyze(draft).metrics.yield.value,60);assert.deepEqual(h.get('state.reaction'),original);assert.equal(engine.analyze(draft).metrics.atom.value,engine.analyze(original).metrics.atom.value);
 h.input('yield','101');assert.equal(engine.analyze(h.get('simulation.draft')).valid,false);
 h.click('simulation-reset');assert.deepEqual(h.get('simulation.draft'),original);
 h.input('yield','60');h.click('simulation-compare');assert.equal(h.get('state.tab'),'Compare');assert.equal(h.get('state.overrides.yield'),'60');assert.deepEqual(h.get('state.reaction'),original);
 assert.doesNotMatch(h.app.innerHTML,/\b(?:NaN|undefined)\b/);
 h.click('subsection',{tab:'Analyze',section:'simulator'});h.click('simulation-reset');assert.deepEqual(h.get('simulation.draft'),original);
}
for(const [tab,items] of Object.entries(work.sections))for(const [id] of items){
 const h=boot(work.routeHash(tab,id));assert.equal(h.get('state.section'),id);h.click('tab',{tab:'Dashboard'});assert.equal(h.window.location.hash,'#/dashboard');h.window.location.hash=work.routeHash(tab,id);h.events.popstate();assert.equal(h.get('state.section'),id);assert.equal(h.get('state.tab'),tab);
}
for(const [id,g] of Object.entries(work.processGuides)){for(let i=-1;i<g.stages.length;i++){const html=scienceViews.processView(data.reactionLibrary.find(e=>e.id===id),g,i);assert.match(html,/Process reference/);if(i>=0)assert.ok(html.includes(g.stages[i].what));assert.doesNotMatch(html,/undefined|NaN/);}}
assert.match(scienceViews.processView(null,null),/No verified equation/);
const h=boot();h.click('library-load',{id:data.reactionLibrary[0].id});h.click('subsection',{tab:'Analyze',section:'simulator'});h.input('yield','60');vm.runInContext('state.reaction.temperature=42',h.context);h.click('simulation-compare');assert.equal(h.get('state.tab'),'Analyze');
const handlers={},winhandlers={},classes=new Set(),attrs={},props={};let focused=false,linkFocus=false;
const button={setAttribute:(k,v)=>attrs[k]=v,focus:()=>focused=true,closest:()=>entry};
const menu={inert:true,style:{setProperty:(k,v)=>props[k]=v}};
const entry={classList:{add:k=>classes.add(k),remove:k=>classes.delete(k),contains:k=>classes.has(k)},querySelector:s=>s==='[data-nav-toggle]'?button:s==='.lgg-nav-menu'?menu:{focus:()=>linkFocus=true},getBoundingClientRect:()=>({left:900,bottom:150}),closest:()=>({getBoundingClientRect:()=>({left:100,top:50})}),contains:x=>x===button};
const doc={addEventListener:(k,f)=>handlers[k]=f,querySelectorAll:()=>classes.has('is-menu-open')?[entry]:[]};
const win={innerWidth:1000,addEventListener:(k,f)=>winhandlers[k]=f};installWorkspaceNav(doc,win);
const target={closest:s=>s==='[data-nav-toggle]'?button:s==='.lgg-nav-entry'?entry:null};
handlers.click({target});assert.equal(menu.inert,false);assert.equal(attrs['aria-expanded'],'true');assert.equal(props['--menu-left'],'604px');
handlers.keydown({key:'Escape',target});assert.equal(menu.inert,true);assert.ok(focused);
handlers.keydown({key:'ArrowDown',target,preventDefault(){}});assert.ok(linkFocus);handlers.focusout({target,relatedTarget:null});assert.equal(menu.inert,true);
handlers.pointerover({target,pointerType:'mouse'});assert.equal(menu.inert,false);handlers.pointerout({target,relatedTarget:null,pointerType:'mouse'});assert.equal(menu.inert,true);
handlers.click({target});handlers.pointerout({target,relatedTarget:null,pointerType:'touch'});assert.equal(menu.inert,false);handlers.click({target:{closest:()=>null}});assert.equal(menu.inert,true);
console.log('PASS: 15 simulator isolation/edit/reset/compare flows; invalid inputs, unchanged atom economy, stale baseline rejection; all subsection routes and back navigation; all referenced process stages; dropdown pointer/tap/keyboard/outside dismissal (mock DOM).');
