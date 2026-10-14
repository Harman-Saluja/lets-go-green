import assert from 'node:assert/strict';
import {reactionLibrary} from '../build/data.js';
import {analyze,recommendations} from '../build/engine.js';
const base=structuredClone(reactionLibrary.find(x=>x.id==='demo-1').reaction),a=analyze(base);
assert.equal(a.availableWeight,90);
assert.equal(a.categories.reduce((n,c)=>n+c.weight,0),100);
assert.equal(a.score,a.categories.reduce((n,c)=>n+(c.contribution??0),0));
for(const [field,value,direction] of [['yield',70,-1],['solventMass',60,1],['temperature',80,-1],['duration',5,0],['solvent','toluene',-1]]){
 const b=analyze({...base,[field]:value});assert.equal(Math.sign(b.score-a.score),direction,field);
 assert.equal(b.metrics.atom.value,a.metrics.atom.value);
 if(field==='temperature'||field==='duration')for(const c of a.categories.filter(c=>c.name!=='Energy'))assert.equal(b.categories.find(x=>x.name===c.name).value,c.value);
}
const partial=analyze({...base,temperature:''});assert.equal(partial.availableWeight,80);assert.equal(partial.categories[1].contribution,null);
assert.ok(Math.abs(partial.score-partial.categories.reduce((n,c)=>n+(c.value===null?0:c.value*c.weight),0)/80)<1e-10);
for(const entry of reactionLibrary.filter(e=>!e.industrialEducation)){const x=analyze(entry.reaction),p=recommendations(entry.reaction).find(x=>x.id==='education:'+entry.id),y=analyze(p.scenario);assert.ok(x.valid&&y.valid);assert.ok(x.score>=0&&x.score<=100);if(entry.optimization.qualitativeOnly)assert.equal(x.score,y.score);}
const b=analyze(recommendations(base).find(x=>x.id==='education:demo-1').scenario);
console.log(`PASS weighted scoring, missing-data normalization, directional changes, independent factors and all 10 alternatives. Starch: ${a.score} → ${b.score}.`);
