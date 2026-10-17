import assert from 'node:assert/strict';
import {sortingItems,sortingBins,classifySort} from '../src/sorting-data.js';
import {indoreSystems,systemPreviews} from '../src/indore-systems.js';
assert.equal(sortingItems.length,10);assert.equal(sortingBins.length,3);assert.equal(new Set(sortingItems.map(x=>x.id)).size,10);
for(const item of sortingItems){assert.equal(sortingBins.filter(bin=>classifySort(item.id,bin.id)).length,1);for(const bin of sortingBins)assert.equal(classifySort(item.id,bin.id),item.bin===bin.id);assert.ok(item.why.length>45);}
assert.equal(classifySort('unknown','wet'),false);assert.equal(classifySort('battery','unknown'),false);assert.equal(classifySort('battery','dry'),false);assert.equal(classifySort('chemical','wet'),false);
assert.equal(sortingBins.find(x=>x.id==='special').label,'NO UNIVERSAL THIRD COLOUR ASSUMED');assert.equal(indoreSystems.length,7);for(const s of indoreSystems){assert.ok(['city','sorting','processes','future'].includes(s.tab));assert.ok(s.note.length>50);assert.equal(systemPreviews[s.id].length,3);}
console.log('PASS: all 30 sorting pairs, battery/chemical separation, invalid items/routes, three collection destinations and seven scoped educational system layers.');
