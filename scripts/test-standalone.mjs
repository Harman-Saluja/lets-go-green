import * as cinema from '../build/reaction-cinema.js';
import * as scienceViews from '../build/science-views.js';
import * as workspaceTools from '../build/workspace-tools.js';
import * as experiences from '../build/experiences.js';
import * as navbar from '../build/components/ui/anime-navbar.js';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFile} from 'node:fs/promises';
import {webcrypto} from 'node:crypto';
import * as data from '../build/data.js';
import * as engine from '../build/engine.js';
const source=(await readFile(new URL('../build/app.js',import.meta.url),'utf8')).replace(/^import .*;\n/gm,'');
const storage=new Map();
function boot(){
 const listeners={},app={innerHTML:''},toast={textContent:'',classList:{add(){},remove(){}}},dialog={showModal(){},addEventListener(){}};
 const document={activeElement:null,body:{classList:{toggle(){}}},querySelector:s=>s==='#app'?app:s==='#toast'?toast:s==='#modal'?dialog:null,querySelectorAll:()=>[],getElementById:()=>null,addEventListener:(key,fn)=>listeners[key]=fn};
 const context=vm.createContext({...cinema,...scienceViews,...data,...engine,...navbar,...experiences,...workspaceTools,document,window:{scrollTo(){},addEventListener(){}},localStorage:{getItem:key=>storage.get(key)??null,setItem:(key,value)=>storage.set(key,value)},crypto:webcrypto,setTimeout:()=>1,clearTimeout(){},AbortController,console});
 vm.runInContext(source,context);
 return {app,group:value=>listeners.change({target:{value,matches:()=>false,hasAttribute:n=>n==='data-library-group'}}),click:(action,extra={})=>listeners.click({preventDefault(){},target:{closest:()=>({dataset:{action,...extra}})}})};
}
for(const entry of data.reactionLibrary){
 storage.clear();let h=boot();h.click('library-load',{id:entry.id});assert.equal(JSON.parse(storage.get('lgg.v1')).reaction.libraryId,entry.id);assert.match(h.app.innerHTML,/Reaction Overview/);
 if(entry.industrialEducation)h.click('scenario');else h.click('apply-recommendation',{id:'education:'+entry.id});h.click('save');
 const before=JSON.parse(storage.get('lgg.v1'));h=boot();
 const after=JSON.parse(storage.get('lgg.v1'));assert.deepEqual(after,before);
 for(const tab of ['Dashboard','Analyze','Solvents','Catalysts','Principles','Optimize','Compare','History','Impact Atlas','Green Rescue']){
  h.click('tab',{tab});if(['Analyze','Optimize'].includes(tab))assert.match(h.app.innerHTML,/aria-label="Reaction materials"/);assert.equal(JSON.parse(storage.get('lgg.v1')).tab,tab);assert.ok(h.app.innerHTML.includes('data-tab="'+(['Analyze','Optimize','Compare','Solvents','Catalysts'].includes(tab)?'Chemistry Lab':tab)+'" class="nav-tab active" aria-current="page"'));assert.equal((h.app.innerHTML.match(/class="nav-tab active"/g)||[]).length,1);assert.equal((h.app.innerHTML.match(/class="nav-tab (?:active)?"/g)||[]).length,6);assert.doesNotMatch(h.app.innerHTML,/\b(?:NaN|undefined|null)\b/);
 }
 h.click('load',{id:before.history[0].id});assert.equal(JSON.parse(storage.get('lgg.v1')).reaction.libraryId,entry.id);assert.equal(before.history.length,1);assert.ok(before.overrides);
}
storage.clear();const filterHarness=boot();filterHarness.click('demos');for(const group of data.exhibitionGroups){filterHarness.group(group);const ids=[...filterHarness.app.innerHTML.matchAll(/data-action="library-load"[^>]*data-id="([^"]+)"/g)].map(x=>x[1]);assert.deepEqual(ids,data.reactionLibrary.filter(e=>data.exhibitionProfiles[e.id].groups.includes(group)).map(e=>e.id));}
console.log('PASS: both scope filters; all 15 production demos load/apply/save/restore and render all tabs without document.modelContext or any Sites SDK (mock DOM).');

{const h=boot();h.click('tab',{tab:'Chemistry Lab'});assert.equal(JSON.parse(storage.get('lgg.v1')).tab,'Analyze');assert.match(h.app.innerHTML,/aria-label="Chemistry Lab tools"/);console.log('PASS: Chemistry Lab main entry and contextual materials panels.');}
