import assert from 'node:assert/strict';
import {reactionLibrary,exhibitionProfiles,exhibitionGroups} from '../build/data.js';
import {analyze,recommendations} from '../build/engine.js';
assert.equal(reactionLibrary.length,15);
const weights={H:1.008,C:12.011,N:14.007,O:15.999,S:32.06,Fe:55.845};
const totals=rows=>{const out={};for(const r of rows)for(const [,el,n] of r.formula.matchAll(/([A-Z][a-z]?)(\d*)/g))out[el]=(out[el]||0)+Number(n||1)*Number(r.coeff);return Object.fromEntries(Object.entries(out).sort());};
for(const e of reactionLibrary){const p=exhibitionProfiles[e.id];assert.ok(p);assert.ok(p.groups.length&&p.groups.every(g=>exhibitionGroups.includes(g)));const words=p.overview.split(/\s+/).length;assert.ok(words>=40&&words<=70,`${e.id}: ${words}`);for(const k of ['industry','application','importance','environment','opportunities'])assert.ok(p[k]);if(!e.industrialEducation)continue;
 const r=e.reaction,a=analyze(r);assert.ok(a.valid,JSON.stringify(a.errors));assert.deepEqual(totals(r.reactants),totals(r.products));
 for(const row of [...r.reactants,...r.products]){const mass=[...row.formula.matchAll(/([A-Z][a-z]?)(\d*)/g)].reduce((n,[,el,c])=>n+weights[el]*Number(c||1),0);assert.ok(Math.abs(row.molar-mass)<.001);}
 for(const k of ['atom','yield','rme'])assert.ok(Number.isFinite(a.metrics[k].value));for(const k of ['ef','pmi'])assert.equal(a.metrics[k].value,null);assert.equal(a.energyIndex,null);assert.equal(a.wasteMass,null);assert.ok(a.score>=0&&a.score<=100);assert.ok(a.solvent||r.solvent==='none');assert.ok(a.catalyst||r.catalyst==='none');assert.equal(r.yield,75);assert.match(r.notes,/Educational Assumptions/);assert.equal(r.complete,false);assert.ok(!recommendations(r).some(p=>p.scenario));
 const b=analyze({...r,yield:65});assert.equal(b.metrics.atom.value,a.metrics.atom.value);assert.ok(b.metrics.rme.value<a.metrics.rme.value);assert.ok(b.score<a.score);
}
console.log('PASS: all 15 educational profiles; five industrial equations, molar masses, metrics, missing-data boundaries and responsive edits.');
