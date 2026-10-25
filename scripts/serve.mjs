import {createServer} from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import {resolve,relative,extname} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=resolve(fileURLToPath(new URL('../',import.meta.url)),process.argv[2]||'src');
const portIndex=process.argv.indexOf('--port');
const port=Number(portIndex>=0?process.argv[portIndex+1]:4173);
const types={'.jpeg':'image/jpeg','.html':'text/html; charset=utf-8','.tsx':'text/javascript; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.woff2':'font/woff2','.ttf':'font/ttf','.json':'application/json'};
createServer(async(req,res)=>{try{
 let path=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
 if(/^\/(green-rescue|cinema-stage|molecular-frame)\.htm$/.test(path))path=path.replace(/\.htm$/,'.html');
 let file=resolve(root,'.'+path);if(relative(root,file).startsWith('..'))throw Error('Invalid path');
 if(process.argv[2]==='src'&&/^\/team\/(harman|disha|durgesh|harsh|dipanshu)\.jpeg$/.test(path))file=resolve(root,'../public','.'+path);
 if(path==='/components/ui/anime-navbar.js'){try{await stat(file);}catch{file=resolve(root,'components/ui/anime-navbar.tsx');}}
 if((await stat(file)).isDirectory())file=resolve(file,'index.html');
 const data=await readFile(file);res.writeHead(200,{'Content-Type':types[extname(file)]||'application/octet-stream','Cache-Control':'no-cache'});res.end(req.method==='HEAD'?undefined:data);
 }catch{res.writeHead(404,{'Content-Type':'text/plain'});res.end('Not found');}
}).listen(port,'127.0.0.1',()=>console.log(`Serving ${root} at http://localhost:${port}`));
