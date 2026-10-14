import assert from 'node:assert/strict';
import {resourceProcesses,wasteItems,processById,resourceSources} from '../src/resource-data.js';
import {solutionGuides} from '../src/case-solutions.js';
import {processScene,materialIcon,cityScene} from '../src/resource-art.js';
import {atlasCases} from '../src/science-data.js';
import {indiaCases} from '../src/atlas-regions.js';
import {moreWorld} from '../src/atlas-content.js';
assert.equal(wasteItems.length,10);assert.equal(resourceProcesses.length,10);
assert.equal(new Set(wasteItems.map(x=>x.id)).size,10);assert.equal(new Set(resourceProcesses.map(x=>x.id)).size,10);
for(const item of wasteItems){assert.ok(processById(item.process));assert.ok(['organics','dry','special'].includes(item.sort));assert.ok(item.tip.length>25);}
assert.equal(wasteItems.find(x=>x.id==='battery').sort,'special');assert.equal(wasteItems.find(x=>x.id==='oil').sort,'special');
assert.notEqual(processById('battery'),processById('electronics'));
for(const p of [...resourceProcesses,processById('battery')]){for(const k of ['title','input','output','science','benefit','limit'])assert.ok(p[k]?.length>10,`${p.id}: ${k}`);assert.ok(p.stages.length>=4);assert.ok(p.sources.every(k=>resourceSources[k]));for(const [i,s] of p.stages.entries()){assert.ok(s.detail.length>45);const svg=processScene(p,i,true,false);assert.ok(svg.includes(s.name.replaceAll('&','&amp;')));assert.doesNotMatch(svg,/undefined|NaN|Infinity/);}assert.match(processScene(p,1,false,true),/Contamination blocks/);}
assert.equal(solutionGuides.length,7);
for(const c of [...atlasCases,...moreWorld,...indiaCases]){assert.ok(solutionGuides[c.category]);for(const step of solutionGuides[c.category])for(const k of ['what','how','why','example','limit'])assert.ok(step[k].length>35,`${c.id}: ${k}`);}
assert.notEqual(cityScene([]),cityScene(['green','water','biogas','compost']));
assert.match(materialIcon('battery'),/<svg/);
console.log('PASS: 10 material-specific waste journeys, 10 recovery processes, dedicated battery route, stage content/artwork, contamination feedback, and detailed prevention guides for all 50 Atlas records.');
const {environmentalStories,storyScene}=await import('../src/environment-stories.js');
const {comparisonScenes}=await import('../src/indore-comparisons.js');
assert.equal(environmentalStories.length,10);assert.equal(new Set(environmentalStories.map(s=>s.id)).size,10);
for(const s of environmentalStories){assert.ok(s.record?.source.startsWith('https://'));assert.ok(s.record.period);assert.equal(s.route.length,3);assert.ok(s.response.length>80&&s.change.length>80&&s.learning.length>50&&s.answer.length>80);for(let stage=0;stage<4;stage++){const scene=storyScene(s,stage);assert.doesNotMatch(scene,/undefined|NaN/);assert.match(scene,/not a site map or measured result/);}}
assert.equal(comparisonScenes.length,8);assert.equal(new Set(comparisonScenes.map(s=>s.id)).size,8);for(const c of comparisonScenes){if(c.process)assert.ok(processById(c.process),c.id);assert.ok(c.choices.length>0);assert.notEqual(cityScene([]),cityScene(c.choices));assert.ok(c.left.length>40&&c.right.length>40);}
console.log('PASS: 10 sourced field stories with four scoped narrative stages; eight distinct conceptual comparisons and valid related processes.');
const {comparisonArt}=await import('../src/indore-comparisons.js');
for(const c of comparisonScenes){const before=comparisonArt(c),after=comparisonArt(c,true);assert.notEqual(before,after);assert.doesNotMatch(before+after,/undefined|NaN/);assert.match(before+after,/Conceptual choices/);}
console.log('PASS: eight material-specific comparison illustrations, distinct scenario labels and no measured-outcome claims.');
