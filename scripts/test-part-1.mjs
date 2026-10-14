import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {parseRoute,routeHash,processGuides} from '../build/workspace-tools.js';
import {ProcessExplorer} from '../build/science-controls.js';
import {mapView,regionBounds} from '../build/atlas-regions.js';
import {reactionLibrary} from '../build/data.js';
import {analyze} from '../build/engine.js';
import {comparisonReveal} from '../build/experiences.js';
for(const tab of ['Analyze','Optimize','Compare','Solvents','Catalysts']){
 assert.equal(parseRoute(routeHash(tab)).tab,tab);
 assert.equal(parseRoute('#/'+tab.toLowerCase()).tab,tab);
}
assert.deepEqual(parseRoute('#/chemistry-lab'),{tab:'Analyze',section:'analysis'});
const explorer=new ProcessExplorer();explorer.idValue='demo-0';explorer.render();
assert.equal(explorer.idValue,'industrial-ammonia');assert.equal((explorer.innerHTML.match(/<option /g)||[]).length,5);
for(const id of Object.keys(processGuides)){explorer.idValue=id;explorer.render();assert.ok(explorer.innerHTML.includes('selected'));assert.ok(!explorer.innerHTML.includes('value="demo-0"'));}
const geo=JSON.parse(await readFile(new URL('../build/assets/india-states.json',import.meta.url)));
const bounds=geo.features.map(regionBounds),box=[Math.min(...bounds.map(b=>b[0])),Math.min(...bounds.map(b=>b[1])),Math.max(...bounds.map(b=>b[2])),Math.max(...bounds.map(b=>b[3]))],scale=Math.cos((box[1]+box[3])/2*Math.PI/180);
for(const f of geo.features){const html=mapView(geo,'india',0,f.properties.name),view=html.match(/viewBox="([^"]+)"/)[1].split(' ').map(Number),b=regionBounds(f),left=(b[0]-box[0])*scale,top=box[3]-b[3];assert.ok(view.every(Number.isFinite));assert.ok(view[0]<left&&view[1]<top);assert.ok(view[0]+view[2]>left+(b[2]-b[0])*scale);assert.ok(view[1]+view[3]>top+b[3]-b[1]);const markers=[...html.matchAll(/<circle[^>]+ r="([^"]+)"/g)];assert.equal(markers.length,1);assert.ok(Number(markers[0][1])<=Math.min(view[2],view[3])*.012+1e-9);assert.ok(!html.includes('<animate'));assert.ok(mapView(geo,'india',0,f.properties.name,'0 0 40 40').includes('attributeName="viewBox"'));}
const r=reactionLibrary[0].reaction,a=analyze(r),better=analyze({...r,yield:90}),worse=analyze({...r,yield:40});
assert.match(comparisonReveal(r,r,a,better),/lgg-change better/);assert.match(comparisonReveal(r,r,a,worse),/lgg-change worse/);assert.match(comparisonReveal(r,r,a,a),/= Unchanged/);
assert.equal(await readFile(new URL('../src/data.js',import.meta.url),'utf8'),await readFile(new URL('../archive/part-1/data.js',import.meta.url),'utf8'));
console.log('PASS: Part 1 legacy/canonical routes, five industrial selectors, all 36 complete boundary fits and bounded markers, honest better/worse/unchanged feedback, unchanged reaction dataset. DOM/data checks; no real-browser visual claim.');
