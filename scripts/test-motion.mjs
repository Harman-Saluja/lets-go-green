import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
import {format} from '../build/engine.js';
const source=readFileSync(new URL('../build/app.js',import.meta.url),'utf8');
const code=source.slice(source.indexOf('function animateComparison()'),source.indexOf('function comparePage(a)'));
for(const [from,to,reduced,comparable] of [[78,80.3,false,true],[80.3,78,false,true],[78,78,false,true],[78,80.3,true,true],[78,80.3,false,false]]){
 const metric={dataset:{metricFrom:'4.2',metricTo:'2.1'},textContent:'2.1',isConnected:true};
 const frames=[],queue=[],original={dataset:{count:String(from)}},proposed={dataset:{count:String(to)},textContent:String(to),isConnected:true},bar={dataset:{fromWidth:'100%'},style:{width:'60%'}};
 const context=vm.createContext({format,motionAllowed:()=>!reduced,visualRun:(el,keys)=>{if(el)frames.push(keys)},requestAnimationFrame:fn=>queue.push(fn),document:{querySelector:s=>s.includes('data-comparable')?(comparable?{}:null):s.includes('original')?original:s.includes('[data-count]')?proposed:{},querySelectorAll:s=>s==='[data-metric-from]'?[metric]:s==='.comparison'?[{},{}]:s.includes('process-track')?[bar]:[]}});
 vm.runInContext(code+';animateComparison()',context);let time=0;while(queue.length){assert.ok(time<2000);queue.shift()(time);time+=100;}
 assert.equal(Number(proposed.textContent),to);assert.equal(metric.textContent,'2.1');
 if(reduced)assert.equal(frames.length,0);else {assert.ok(frames.some(x=>x[0].width==='100%'&&x[1].width==='60%'));if(from!==to&&comparable)assert.ok(frames.some(x=>x[0].strokeDasharray===from+' 100'&&x[1].strokeDasharray===to+' 100'));}
}
console.log('PASS: motion code endpoints, increase/decrease/unchanged, reduced motion and comparison guard (mock animation API; not browser visual QA).');

const section=(a,b)=>source.slice(source.indexOf(a),source.indexOf(b));
const ctx=vm.createContext({format});
vm.runInContext(section('function gauge(', 'function why(')+section('function scoreDelta(', 'function comparisonSummary('),ctx);
for(const [n,expected] of [[2.999999999,'3.0'],[7.456,'7.5'],[14,'14.0'],[72.836,'72.8']]){
 const html=vm.runInContext(`gauge({score:${n}})`,ctx);assert.ok(html.includes('>'+expected+'</strong>'));assert.equal(vm.runInContext(`scoreDelta(${n})`,ctx),'+'+expected);
}
assert.equal(vm.runInContext('scoreDelta(-2.345)',ctx),'-2.3');assert.equal(vm.runInContext('scoreDelta(0)',ctx),'0.0');
console.log('PASS: score display and signed differences use one decimal; changed metrics reach correct endpoints.');
