// Tests fresh production bytes over HTTP, not just source strings.
import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {readFile,readdir} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {resolve} from 'node:path';
const root=fileURLToPath(new URL('../',import.meta.url));
const server=spawn(process.execPath,['scripts/serve.mjs','build','--port','4187'],{cwd:root,stdio:['ignore','pipe','inherit']});
try{
 await new Promise((ok,no)=>{const t=setTimeout(()=>no(Error('Preview startup timeout')),10000);server.stdout.once('data',()=>{clearTimeout(t);ok()});server.once('error',no);server.once('exit',c=>{clearTimeout(t);no(Error('Preview exited: '+c))});});
 const origin='http://127.0.0.1:4187';let count=0;
 async function walk(dir,prefix=''){for(const e of await readdir(dir,{withFileTypes:true})){const path=prefix+e.name;if(e.isDirectory())await walk(resolve(dir,e.name),path+'/');else{const response=await fetch(origin+'/'+path);assert.equal(response.status,200,path);assert.deepEqual(Buffer.from(await response.arrayBuffer()),await readFile(resolve(dir,e.name)),path);count++;}}}
 await walk(resolve(root,'build'));
 for(const [name,marker] of [['green-rescue','id="game"'],['cinema-stage','id="viewer"'],['molecular-frame','id="molecule-controls"']]){
  assert.deepEqual(await readFile(resolve(root,'build',name+'.htm')),await readFile(resolve(root,'build',name+'.html')));
  const url=origin+'/'+name+'.htm';const response=await fetch(url);const html=await response.text();assert.equal(response.url,url);assert.ok(html.includes(marker));assert.ok(!html.includes('app-loader.js'));
  for(const [,asset] of html.matchAll(/(?:src|href)="([^"]+)"/g)){const r=await fetch(new URL(asset,url));assert.equal(r.status,200,asset);}
 }
 const routes=await readFile(resolve(root,'build/_redirects'),'utf8');
 for(const name of ['green-rescue','cinema-stage','molecular-frame'])assert.ok(routes.includes('/'+name+'.htm'));
 assert.ok(!routes.includes('/*'));
 assert.ok(routes.split('\n').filter(l=>l.startsWith('/')).every(l=>l.trim().endsWith('302')));
 assert.equal((await fetch(origin+'/missing-file.js')).status,404);
 console.log(`PASS: ${count} production files served byte-for-byte; all isolated HTML entries and their assets; missing asset returns 404.`);
}finally{server.kill();}
