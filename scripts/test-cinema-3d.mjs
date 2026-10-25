import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFile,writeFile} from 'node:fs/promises';
import * as cinema from '../build/reaction-cinema.js';
import * as presentation from '../build/cinema-stage-model.js';
import {reactionLibrary} from '../build/data.js';
const structures=new Map();for(const m of cinema.cinemaStructures)structures.set(m.cid,cinema.parseStructure(await readFile(new URL(`../build/assets/molecules/${m.cid}.sdf`,import.meta.url),'utf8'),m.cid));
const haber=reactionLibrary.find(r=>r.id==='industrial-ammonia').reaction;
for(const [kind,expected] of [['reactants',{N:2,H:6}],['products',{N:2,H:6}]]){const counts={};for(const g of presentation.sceneGroups(haber,kind)){const m=structures.get(cinema.structureFor(g.row.name).cid);for(const a of m.atoms)counts[a.element]=(counts[a.element]||0)+1;}assert.deepEqual(counts,expected);}
const elements=new Map(),messages=[],listeners={},models=[],shapes=[],labels=[];
const el=()=>({textContent:'',className:'',style:{},addEventListener(){},replaceChildren(){},append(){}});
const viewer={clear(){models.length=shapes.length=labels.length=0;},spin(){},addModel(){const m={atoms:[],addAtoms(a){this.atoms.push(...a);},setStyle(){}};models.push(m);return m;},addLabel(t,p){labels.push({t,p});},addSphere(s){shapes.push(s);},addBox(s){shapes.push(s);},addCylinder(s){shapes.push(s);},zoomTo(){},rotate(){},render(){},getView(){return [0,0,0,1];},setView(){},zoom(){},resize(){}};
const context=vm.createContext({...presentation,structureFor:cinema.structureFor,fetchStructure:async m=>structures.get(m.cid),document:{hidden:false,querySelector(q){if(!elements.has(q))elements.set(q,el());return elements.get(q);},createElement:el,addEventListener(){}},window:{$3Dmol:{createViewer:()=>viewer}},$3Dmol:{createViewer:()=>viewer},parent:{postMessage:d=>messages.push(d)},location:{origin:'http://test'},matchMedia:()=>({matches:true}),cancelAnimationFrame(){},requestAnimationFrame:()=>1,ResizeObserver:class{observe(){}disconnect(){}},addEventListener:(k,f)=>listeners[k]=f,console});
const source=(await readFile(new URL('../build/cinema-stage.js',import.meta.url),'utf8')).replace(/^import .*;\n/gm,'');vm.runInContext(source+'\nglobalThis.testDraw=draw;',context);
const coverage=[];
for(const entry of reactionLibrary){const scenes=cinema.cinemaScenes(entry.reaction);assert.equal(scenes.length,5);for(const scene of scenes){await context.testDraw({reaction:entry.reaction,kind:scene.kind,title:scene.title,playing:false,step:scenes.indexOf(scene)});assert.equal(messages.at(-1).type,'cinema-rendered');for(const m of models)for(const a of m.atoms)assert.ok([a.x,a.y,a.z].every(Number.isFinite));assert.ok(models.length+shapes.length>0);assert.ok(labels.length>0);}
const materials=[...new Set([...entry.reaction.reactants,...entry.reaction.products].filter(r=>!cinema.structureFor(r.name)).map(r=>r.name+' — '+presentation.materialKind(r)))];assert.ok(!materials.some(x=>x.endsWith('unavailable')));coverage.push({id:entry.id,name:entry.label,scenes:5,rendererHarness:'passed',materialSchematics:materials,browserWebGL:'not tested'});}
listeners.message({source:context.parent,origin:'http://test',data:{type:'cinema-control',action:'rotate'}});
listeners.message({source:context.parent,origin:'http://test',data:{type:'cinema-control',action:'reset'}});
listeners.message({source:context.parent,origin:'http://test',data:{type:'cinema-control',action:'pause'}});
assert.equal(presentation.matchesFormula(structures.get(222),'NH3'),true);assert.equal(presentation.matchesFormula(structures.get(222),'NH4'),false);
listeners.pagehide();context.window.$3Dmol=null;await context.testDraw({reaction:haber,kind:'reactants',title:'Reactants',step:1});assert.equal(messages.at(-1).type,'cinema-fallback');
assert.doesNotMatch(await readFile(new URL('../build/app.js',import.meta.url),'utf8'),/\$\{moleculeLinks\(r\)\}/);
await writeFile(new URL('../CINEMA-COVERAGE.json',import.meta.url),JSON.stringify(coverage,null,2));
console.log(`PASS: Haber reactant/product atom counts; all ${reactionLibrary.length} × 5 scenes dispatched into the 3D renderer API; finite model geometry; supported material representations; cleanup and removal of separate molecular entry. WebGL output not verified by this harness.`);
