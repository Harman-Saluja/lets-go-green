import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFile} from 'node:fs/promises';
const root=new URL('../',import.meta.url);
const read=p=>readFile(new URL(p,root),'utf8');
const app=await read('build/app.js'),css=await read('build/team.css'),source=await read('build/team.js');
const markup=vm.runInNewContext(app.slice(app.indexOf('function teamSection(){'))+';teamSection()');
const members=[['harman','Harman Saluja'],['disha','Disha Makkar'],['durgesh','Durgesh Asati'],['harsh','Harsh Shinde'],['dipanshu','Dipanshu Yadav']];
assert.deepEqual([...markup.matchAll(/data-team-member="([^"]+)" aria-label="([^"]+)"/g)].map(m=>m.slice(1)),members);
assert.match(app,/state\.tab==='Dashboard'\?teamSection\(\):''\}<\/main><footer>/);
for(const [id,name] of members){assert.ok(markup.includes(`alt="Portrait of ${name}"`));assert.ok(markup.includes(`role="tooltip">${name}</span>`));assert.deepEqual(await readFile(new URL(`public/team/${id}.jpeg`,root)),await readFile(new URL(`build/team/${id}.jpeg`,root)));}
const events={},items=members.map(([id])=>{const classes=new Set();return {id,open:false,expanded:'false',classList:{toggle(k,v){v?classes.add(k):classes.delete(k);}},contains(el){return el===this;},closest(){return this;},querySelector(){return {setAttribute:(k,v)=>{this.expanded=v;}};},get isOpen(){return classes.has('is-open');}};});
const document={activeElement:null,querySelectorAll:()=>items.filter(i=>i.isOpen),addEventListener:(n,fn)=>events[n]=fn};
vm.runInNewContext(source,{document});
for(const item of items){
 events.pointerover({target:item,pointerType:'mouse'});assert.ok(item.isOpen);assert.equal(item.expanded,'true');
 events.pointerout({target:item,relatedTarget:null});assert.ok(!item.isOpen);
 events.focusin({target:item});assert.ok(item.isOpen);events.keydown({key:'Escape'});assert.ok(!item.isOpen);
 events.focusout({target:item,relatedTarget:null});
 events.pointerover({target:item,pointerType:'touch'});assert.ok(!item.isOpen);
 events.click({target:item});assert.ok(item.isOpen);events.click({target:item});assert.ok(!item.isOpen);
}
events.click({target:items[0]});events.click({target:items[1]});assert.ok(!items[0].isOpen&&items[1].isOpen);events.click({target:{}});assert.ok(!items.some(x=>x.isOpen));
assert.match(css,/prefers-reduced-motion:reduce/);assert.match(css,/flex-wrap:wrap/);assert.match(css,/object-fit:cover/);assert.match(css,/focus-visible/);
console.log('PASS: exact five names/order, Dashboard-only placement, image build bytes, hover/touch/focus/Escape interactions (DOM harness); responsive/reduced-motion CSS declarations checked, not browser layout QA.');
