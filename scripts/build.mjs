import {cp,rm,readdir,readFile,access,writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {resolve,relative,extname,dirname} from 'node:path';
import {execFileSync} from 'node:child_process';
const root=fileURLToPath(new URL('../',import.meta.url));
const source=resolve(root,'src'),output=resolve(root,'build');
async function walk(dir){const files=[];for(const e of await readdir(dir,{withFileTypes:true})){const p=resolve(dir,e.name);if(e.isDirectory())files.push(...await walk(p));else files.push(p);}return files;}
try { await access(resolve(source,'index.html')); } catch { throw Error('Website source is missing. Commit the entire src/ folder alongside package.json and netlify.toml, then redeploy.'); }
const files=await walk(source);
const nativeTSX=resolve(source,'components/ui/anime-navbar.tsx');
for(const file of files){
 const ext=extname(file);if(!['.js','.tsx','.css','.html'].includes(ext))continue;
 const text=await readFile(file,'utf8');
 if(ext==='.tsx')execFileSync(process.execPath,['--input-type=module','--check'],{input:text,stdio:['pipe','inherit','inherit']});
 if(ext==='.js')execFileSync(process.execPath,['--check',file],{stdio:'inherit'});
 const patterns=ext==='.js'?[/\bfrom\s+['"]([^'"]+)['"]/g,/\bimport\s*\(\s*['"]([^'"]+)['"]/g]:ext==='.html'?[/\b(?:src|href)="([^"]+)"/g]:[/url\(['"]?([^)'"\s]+)['"]?\)/g];
 for(const pattern of patterns)for(const match of text.matchAll(pattern)){
  const link=match[1];if(/^(https?:|data:|#)/.test(link))continue;
  const target=resolve(dirname(file),link.split(/[?#]/)[0]);
  if(relative(source,target).startsWith('..'))throw Error(`Asset escapes source: ${link}`);
  await access(target===resolve(source,'components/ui/anime-navbar.js')?nativeTSX:target);
 }
}
await access(resolve(source,'index.html'));
await rm(output,{recursive:true,force:true});
await cp(source,output,{recursive:true});
await cp(resolve(root,'public/team'),resolve(output,'team'),{recursive:true});
for(const name of ['harman','disha','durgesh','harsh','dipanshu'])await access(resolve(output,'team',name+'.jpeg'));
await writeFile(resolve(output,'components/ui/anime-navbar.js'),await readFile(nativeTSX));
await rm(resolve(output,'components/ui/anime-navbar.tsx'));
console.log(`Production build succeeded: ${files.length} static files → build/ (no transpilation or external build service).`);
