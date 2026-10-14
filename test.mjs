import * as cinema from './src/reaction-cinema.js';
import * as scienceViews from './src/science-views.js';
import * as workspaceTools from './src/workspace-tools.js';
import * as experiences from './src/experiences.js';
import * as navbar from './src/components/ui/anime-navbar.js';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import * as data from './src/data.js';
import * as engine from './src/engine.js';
let checks=0;function check(fn){fn();checks++;}
const close=(a,b)=>assert.ok(Math.abs(a-b)<1e-8,`${a} != ${b}`);
for(const d of data.demos){const a=engine.analyze(d.reaction);check(()=>{assert.equal(a.valid,true);close(a.metrics.pmi.value,a.metrics.ef.value+1);assert.ok(a.score>=0&&a.score<=100);});}
check(()=>{const a=engine.analyze(data.emptyReaction());assert.equal(a.score,null);for(const m of Object.values(a.metrics))assert.equal(m.value,null);});
check(()=>{const a=engine.analyze(data.demos[0].reaction);close(a.metrics.atom.value,50);close(a.theory,18.0156);close(a.productMass,14.41248);close(a.metrics.rme.value,40);});
for(const [key,value] of [['yield',101],['duration',-1],['temperature',-274],['solventMass',-5],['waste',99999],['yield','bad']]){check(()=>{const a=engine.analyze({...data.demos[0].reaction,[key]:value});assert.equal(a.valid,false,key);assert.equal(a.score,null,key);});}
check(()=>{const r=structuredClone(data.demos[0].reaction);r.reactants[0].mass=-1;assert.equal(engine.analyze(r).valid,false);});
check(()=>{const r=structuredClone(data.demos[0].reaction);r.products[0].molar=300;assert.equal(engine.analyze(r).valid,false);});
check(()=>{const r={...data.demos[0].reaction,complete:false,waste:''};assert.equal(engine.analyze(r).metrics.pmi.value,null);assert.equal(engine.analyze(r).metrics.ef.value,null);});
check(()=>{const r={...data.demos[0].reaction,yield:0};assert.equal(engine.analyze(r).metrics.pmi.value,null);assert.equal(engine.analyze(r).metrics.yield.value,0);});
// Exercise the actual view functions, event handlers, shared state, and storage in a minimal host.
// This is a headless application integration harness, not browser layout or interaction QA.
const storage=new Map();
function boot(){
 const listeners={},registered=new Map(),bodyClasses=new Set(),app={innerHTML:''},toast={textContent:'',classList:{add(){},remove(){}}};
 const dialog={showModal(){},addEventListener(){}};
 const document={activeElement:null,body:{classList:{toggle(k,on){on?bodyClasses.add(k):bodyClasses.delete(k);}}},querySelector(s){return s==='#app'?app:s==='#toast'?toast:s==='#modal'?dialog:null;},querySelectorAll(){return [];},getElementById(){return null;},addEventListener(k,fn){listeners[k]=fn;},modelContext:{registerTool(t){registered.set(t.name,t);}}};
 const context=vm.createContext({...cinema,...scienceViews,...data,...engine,...navbar,...experiences,...workspaceTools,document,window:{scrollTo(){},addEventListener(){}},localStorage:{getItem:k=>storage.get(k)??null,setItem:(k,v)=>storage.set(k,v)},crypto:{randomUUID:()=>`id-${Math.random()}`},setTimeout:()=>1,clearTimeout(){},AbortController,console});
 const src=fs.readFileSync(new URL('./src/app.js',import.meta.url),'utf8').replace(/^import .*;\n/gm,'');
 vm.runInContext(src,context);
 const click=(action,extra={})=>listeners.click({preventDefault(){},target:{closest(){return {dataset:{action,...extra}};}}});
 const field=(path,value,select=false)=>listeners[select?'change':'input']({target:{dataset:{field:path},value,tagName:select?'SELECT':'INPUT',type:select?'select-one':'number',matches:s=>s==='[data-field]',hasAttribute(){return false;}}});
 const libraryInput=(value,category=false)=>listeners[category?'change':'input']({target:{value,id:category?'library-category':'library-search',matches(){return false;},hasAttribute(name){return name===(category?'data-library-category':'data-library-search');}}});
 const goal=value=>listeners.change({target:{value,hasAttribute:name=>name==='data-optimization-goal'}});
 return {click,field,libraryInput,goal,app,toast,registered,bodyClasses,state:()=>JSON.parse(storage.get('lgg.v1')||'{}')};
}
let h=boot();
check(()=>assert.match(h.app.innerHTML,/Smarter Chemistry/));
for(const tab of ['Analyze','Optimize','Compare','Solvents','Catalysts','Principles','History'])check(()=>{h.click('tab',{tab});assert.ok(h.app.innerHTML.length>1000);assert.ok(!h.app.innerHTML.includes('NaN'));});
h.click('demo',{index:'0'});h.click('tab',{tab:'Analyze'});
check(()=>assert.match(h.app.innerHTML,/value="Sugar hydrolysis/));
const original=engine.analyze(h.state().reaction);
h.field('yield','90');
check(()=>{const a=engine.analyze(h.state().reaction);assert.ok(a.metrics.rme.value>original.metrics.rme.value);assert.ok(a.metrics.ef.value<original.metrics.ef.value);assert.ok(a.score>original.score);});
h.click('tab',{tab:'Dashboard'});
check(()=>assert.match(h.app.innerHTML,new RegExp(`<strong[^>]*>${engine.format(engine.analyze(h.state().reaction).score)}</strong>`)));
h.click('tab',{tab:'Solvents'});h.click('use',{kind:'solvent',id:'toluene'});
check(()=>{assert.equal(h.state().reaction.solvent,'toluene');assert.equal(engine.analyze(h.state().reaction).categories[2].value,35);});
h.click('tab',{tab:'Principles'});
check(()=>{assert.match(h.app.innerHTML,/Can be made greener/);assert.match(h.app.innerHTML,/Sugar hydrolysis/);});
h.click('tab',{tab:'Catalysts'});h.click('use',{kind:'catalyst',id:'heterogeneous'});
check(()=>{assert.equal(h.state().reaction.catalyst,'heterogeneous');assert.equal(engine.analyze(h.state().reaction).categories[3].value,null);});
h.click('tab',{tab:'Optimize'});
check(()=>assert.match(h.app.innerHTML,/Toluene/));
h.click('scenario');h.field('scenario.solvent','water',true);h.field('scenario.solventMass','30');h.click('tab',{tab:'Compare'});
check(()=>{assert.match(h.app.innerHTML,/OPTIMIZED SCENARIO/);assert.match(h.app.innerHTML,/Toluene/);assert.match(h.app.innerHTML,/Water/);assert.equal(h.state().reaction.solvent,'toluene');});
h.click('tab',{tab:'Analyze'});h.field('yield','95');h.click('tab',{tab:'Compare'});
check(()=>{assert.equal(h.state().reaction.yield,'95');assert.match(h.app.innerHTML,/95.0/);});
h.click('save');const id=h.state().history[0].id;
check(()=>{assert.equal(h.state().history.length,1);assert.equal(h.state().history[0].results.metrics.yield.value,95);});
h=boot();
check(()=>{assert.equal(h.state().reaction.yield,'95');assert.equal(h.state().overrides.solvent,'water');assert.match(h.app.innerHTML,/OPTIMIZED SCENARIO/);});
h.click('tab',{tab:'History'});h.click('load',{id});
check(()=>{assert.equal(h.state().tab,'Analyze');assert.equal(h.state().reaction.yield,'95');assert.match(h.app.innerHTML,/heterogeneous/);});
for(const tab of ['Dashboard','Optimize','Compare','Principles'])check(()=>{h.click('tab',{tab});assert.match(h.app.innerHTML,/Sugar hydrolysis/);});
h.click('presentation');check(()=>assert.ok(h.bodyClasses.has('presenting')));
h.click('presentation');check(()=>assert.ok(!h.bodyClasses.has('presenting')));
h.click('tab',{tab:'History'});h.click('history-compare',{id});check(()=>assert.match(h.app.innerHTML,/SAVED BASELINE/));
h.click('tab',{tab:'Analyze'});h.field('yield','101');check(()=>{assert.match(h.app.innerHTML,/Yield must be between/);assert.equal(engine.analyze(h.state().reaction).score,null);});
h.field('yield','80');h.field('yieldMode','mass',true);check(()=>close(Number(h.state().reaction.products[0].mass),14.41248));
h.field('products.0.mass','9.0078');h.field('yieldMode','yield',true);check(()=>close(Number(h.state().reaction.yield),50));
h.click('add',{kind:'reactants'});check(()=>assert.equal(h.state().reaction.reactants.length,3));h.click('remove',{kind:'reactants',index:'2'});check(()=>assert.equal(h.state().reaction.reactants.length,2));
h.click('tab',{tab:'History'});h.click('delete',{id});h.click('delete-confirm',{id});check(()=>assert.equal(h.state().history.length,0));
check(()=>{assert.equal(h.registered.size,2);assert.throws(()=>h.registered.get('load_demo_reaction').execute({index:99}));const x=h.registered.get('load_demo_reaction').execute({index:2});assert.match(x.name,/Glucose/);assert.equal(h.registered.get('read_reaction_analysis').execute({}).reaction.name,x.name);});


// Full educational-scenario acceptance: all 10 entries, two complete passes.
const entries=data.reactionLibrary.filter(e=>!e.industrialEducation);
function atoms(rows){const out={};for(const r of rows)for(const [,el,count] of r.formula.matchAll(/([A-Z][a-z]?)(\d*)/g))out[el]=(out[el]||0)+Number(count||1)*r.coeff;return Object.fromEntries(Object.entries(out).sort());}
const clean=()=>assert.doesNotMatch(h.app.innerHTML,/\b(?:NaN|undefined|null)\b/);
check(()=>{assert.equal(entries.length,10);assert.equal(new Set(entries.map(e=>e.id)).size,10);assert.ok(new Set(entries.map(e=>e.category)).size>=6);});
const passes=[];
for(let pass=1;pass<=2;pass++){
 const start=checks;
 for(const entry of entries){
  storage.clear();h=boot();h.click('library-load',{id:entry.id});const r=h.state().reaction,a=engine.analyze(r);
  check(()=>{assert.deepEqual(r,entry.reaction);assert.equal(r.dataType,'educational-scenario');assert.equal(r.provenance.yield,'educational-scenario');assert.equal(r.provenance['reactants.*.molar'],'derived');assert.equal(r.units.mass,'g');assert.ok(r.caseStudy?.problem);assert.ok(entry.optimization.source);assert.ok(entry.optimization.limits);assert.equal(a.valid,true);assert.equal(engine.auditReaction(entry).decision,'KEEP');assert.deepEqual(atoms(r.reactants),atoms(r.products));for(const x of [...r.reactants,...r.products])close(x.molar,data.formulaMass(x.formula));for(const m of Object.values(a.metrics))assert.ok(Number.isFinite(m.value));assert.ok(Number.isFinite(a.score));assert.ok(Number.isFinite(a.energyIndex));assert.equal(a.solvent.id,'water');assert.ok(a.catalyst||r.catalyst==='none');close(a.inputMass,a.productMass+a.wasteMass);close(a.metrics.pmi.value,a.metrics.ef.value+1);assert.match(h.app.innerHTML,/Educational Demo/);assert.match(h.app.innerHTML,/Demo input/);assert.equal(h.state().overrides,null);});
  if(entry.id.startsWith('edu-'))check(()=>{for(const x of r.reactants)close(x.mass/x.molar,x.coeff*.01);});
  for(const tab of ['Analyze','Dashboard','Solvents','Catalysts','Principles','Optimize','Compare','History'])check(()=>{h.click('tab',{tab});clean();assert.deepEqual(h.state().reaction,r);if(tab==='Dashboard')assert.match(h.app.innerHTML,/>Why this score\?/);if(tab==='Catalysts'&&r.catalyst==='none')assert.match(h.app.innerHTML,/No catalyst used in this reaction/);});
  const outcome=engine.optimizationOutcome(r);const plan=outcome.alternatives.find(x=>x.scenario);
  check(()=>{assert.equal(outcome.status,'available');assert.ok(plan);assert.equal(plan.source,entry.optimization.source);assert.match(plan.efficiency,/not measured/);assert.deepEqual(Object.fromEntries(Object.keys(entry.optimization.changes).map(k=>[k,plan.scenario[k]])),entry.optimization.changes);});
  for(const [goal] of engine.optimizationGoals)check(()=>assert.ok(engine.recommendations(r,goal).some(x=>x.scenario)));
  h.click('tab',{tab:'Optimize'});check(()=>{assert.match(h.app.innerHTML,/Apply Optimization/);assert.match(h.app.innerHTML,/Main problem:/);assert.match(h.app.innerHTML,/Recommended change:/);});h.click('apply-recommendation',{id:plan.id});
  const p={...h.state().reaction,...h.state().overrides},b=engine.analyze(p);
  check(()=>{assert.deepEqual(h.state().reaction,r);assert.equal(b.valid,true);assert.notDeepEqual(p,r);assert.equal(h.state().tab,'Compare');assert.match(h.app.innerHTML,/What changed/);assert.equal(p.dataType,'educational-scenario');for(const [k,v] of Object.entries(entry.optimization.changes))assert.deepEqual(p[k],v);assert.deepEqual(atoms(p.reactants),atoms(p.products));close(b.metrics.yield.value,a.metrics.yield.value);close(b.theory,a.theory);if(entry.optimization.changes.reactants){assert.ok(b.metrics.atom.value>a.metrics.atom.value);assert.ok(b.metrics.rme.value>a.metrics.rme.value);}else{close(b.metrics.atom.value,a.metrics.atom.value);close(b.metrics.rme.value,a.metrics.rme.value);}if(entry.optimization.qualitativeOnly){assert.equal(b.score,a.score);for(const k of Object.keys(engine.metricInfo))close(b.metrics[k].value,a.metrics[k].value);}else assert.ok(b.metrics.ef.value<a.metrics.ef.value||b.energyIndex<a.energyIndex);close(b.score,b.categories.filter(c=>c.value!==null).reduce((v,c)=>v+c.value*c.weight,0)/b.availableWeight);clean();});
  for(const tab of ['Principles','Solvents','Catalysts'])check(()=>{h.click('tab',{tab});clean();if(tab==='Principles')assert.match(h.app.innerHTML,/Proposed: /);else assert.match(h.app.innerHTML,/Proposed scenario:/);});
  h.click('save');const saved=h.state().history[0];h=boot();h.click('load',{id:saved.id});
  check(()=>{assert.deepEqual(h.state().reaction,r);assert.deepEqual(h.state().overrides,saved.overrides);assert.deepEqual(h.state().reaction.provenance,r.provenance);assert.equal(engine.analyze({...r,...h.state().overrides}).score,b.score);});
  for(const tab of ['Dashboard','Optimize','Compare','Principles','Solvents','Catalysts','History'])check(()=>{h.click('tab',{tab});clean();assert.deepEqual(h.state().reaction,r);});
  h.click('tab',{tab:'Analyze'});h.field('yield',Number(r.yield)+1);const edited=engine.analyze(h.state().reaction);
  check(()=>{assert.equal(h.state().overrides,null);assert.equal(h.state().reaction.provenance.yield,'user-input');assert.ok(edited.metrics.rme.value>a.metrics.rme.value);assert.ok(edited.metrics.ef.value<a.metrics.ef.value);close(edited.metrics.atom.value,a.metrics.atom.value);assert.match(h.app.innerHTML,/Your input/);});
  h.field('temperature',Number(r.temperature)+10);const warmed=engine.analyze(h.state().reaction);check(()=>{assert.notEqual(warmed.energyIndex,edited.energyIndex);for(const k of Object.keys(engine.metricInfo))close(warmed.metrics[k].value,edited.metrics[k].value);});
  h.click('tab',{tab:'Solvents'});h.click('use',{kind:'solvent',id:'acetone'});check(()=>{assert.equal(h.state().reaction.provenance.solvent,'user-input');assert.equal(engine.analyze(h.state().reaction).solvent.id,'acetone');assert.ok(!engine.recommendations(h.state().reaction).some(x=>x.scenario));close(engine.analyze(h.state().reaction).metrics.atom.value,a.metrics.atom.value);});
  h.click('tab',{tab:'Catalysts'});h.click('use',{kind:'catalyst',id:'heterogeneous'});check(()=>{assert.equal(h.state().reaction.provenance.catalyst,'user-input');assert.equal(h.state().reaction.catalystIdentity,'');assert.equal(engine.analyze(h.state().reaction).categories[3].value,null);});
  h.click('library-load',{id:entry.id});check(()=>{assert.deepEqual(h.state().reaction,r);assert.equal(h.state().overrides,null);assert.equal(h.state().baseline,null);assert.equal(engine.analyze(h.state().reaction).score,a.score);});
 }
 passes.push({pass,reactions:entries.length,checks:checks-start,failures:0});console.log(`Full pass ${pass}: all ${entries.length} demos passed (${checks-start} checks).`);
}
// Route replacement preserves batch scale, updates row provenance, and does not mutate library data.
for(const entry of entries.filter(e=>e.optimization.changes.reactants)){
 const r=structuredClone(entry.reaction),original=JSON.stringify(entry);
 for(const x of r.reactants)x.mass*=2;r.provenance['reactants.0.mass']='user-input';
 const plan=engine.recommendations(r).find(x=>x.scenario),a=engine.analyze(r),b=engine.analyze(plan.scenario);
 check(()=>{close(b.theory,a.theory);close(b.productMass,a.productMass);assert.equal(plan.scenario.provenance['reactants.0.mass'],undefined);assert.equal(plan.scenario.provenance['reactants.*.mass'],'derived');assert.deepEqual(atoms(plan.scenario.reactants),atoms(plan.scenario.products));assert.equal(JSON.stringify(entry),original);});
}
// Old saved equation records remain readable; they are not silently promoted to complete demos.
for(const entry of data.retiredReactions){check(()=>{assert.deepEqual(atoms(entry.reaction.reactants),atoms(entry.reaction.products));assert.equal(engine.analyze(entry.reaction).valid,true);});}
storage.clear();h=boot();h.click('demos');check(()=>{assert.match(h.app.innerHTML,/15 matching reactions/);assert.doesNotMatch(h.app.innerHTML,/Load Esterification/);});
h.libraryInput('Lactose hydrolysis');check(()=>assert.match(h.app.innerHTML,/1 matching reactions/));h.click('library-clear');h.libraryInput('Class 11');check(()=>assert.match(h.app.innerHTML,/3 matching reactions/));h.click('close');
// Manual entry still uses the same engine and marks edited fields as user input.
h.click('new');h.click('new-confirm');
for(const [key,value] of Object.entries(data.demos[2].reaction)){if(['reactants','products','demo','name'].includes(key))continue;h.field(key,value,true);}
h.field('name','Manual mass accounting');for(const kind of ['reactants','products'])for(const [i,x] of data.demos[2].reaction[kind].entries())for(const [key,value] of Object.entries(x))h.field(`${kind}.${i}.${key}`,value);
h.field('balanced',true,true);h.field('yield',70);check(()=>{assert.ok(Number.isFinite(engine.analyze(h.state().reaction).score));assert.equal(h.state().reaction.provenance.yield,'user-input');});
h.click('save');const saved=h.state().history[0];h=boot();h.click('load',{id:saved.id});check(()=>assert.deepEqual(h.state().reaction,saved.reaction));
for(const entry of entries){h.click('guide-start');h.click('library-load',{id:entry.id});h.click('guide-run');h.click('guide-step',{step:'3'});h.click('apply-recommendation',{id:'education:'+entry.id});h.click('guide-step',{step:'5'});check(()=>{assert.match(h.app.innerHTML,/Proposed alternative assessment/);clean();});h.click('guide-exit');}
check(()=>{const r={...entries[0].reaction,solvent:'invalid'};assert.equal(engine.analyze(r).valid,false);assert.equal(engine.analyze(r).score,null);});
check(()=>{const r={...data.emptyReaction(),solvent:'water',temperature:25,duration:2};assert.equal(engine.analyze(r).score,null);assert.equal(engine.analyze(r).energyIndex,null);});
check(()=>{const a=engine.analyze(entries[0].reaction),b=engine.analyze(entries[2].reaction);assert.ok(engine.metricChanges(a,b).every(x=>x.status==='Different targets · not ranked'));});
check(()=>{const a=engine.analyze({...entries[0].reaction,solvent:''}),b=engine.analyze({...entries[0].reaction,temperature:''});assert.equal(a.coverage,b.coverage);assert.equal(engine.sameCoverage(a,b),false);});
storage.set('lgg.v1','bad json');h=boot();check(()=>assert.match(h.app.innerHTML,/saved session could not be read/));
const report={scope:'10 curated educational case studies, each with an applicable educational optimization',passes,checks,browserQA:'Mock DOM integration; real-browser visual/mobile QA unavailable',acceptance:'All 10 satisfy the educational-scenario requirements',provenance:'Reference chemistry; mathematically derived values; explicitly illustrative process and optimization quantities; user edits tracked',records:entries.map(e=>({...engine.auditReaction(e),optimization:{title:e.optimization.title,concept:e.optimization.concept,source:e.optimization.source,baseline:e.optimization.baseline,problem:e.optimization.problem,limits:e.optimization.limits,changes:e.optimization.changes},dataType:e.reaction.dataType}))};
fs.writeFileSync(new URL('./reaction-audit.json',import.meta.url),JSON.stringify(report,null,2)+'\n');
console.log(`PASS: ${checks} checks; 10 complete case-study optimization loops.`);
