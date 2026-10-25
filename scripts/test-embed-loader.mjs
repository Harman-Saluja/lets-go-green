import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';
const source=await readFile(new URL('../src/app-loader.js',import.meta.url),'utf8');
// Observe startup requests without executing the application in the small DOM model.
const imports=[];const script=source.replace(/await import\('([^']+)'\);/g,(_,path)=>`imports.push(${JSON.stringify(path)});`);
for(const [path,frame,blocked] of [['/',false,false],['/index.html',false,false],['/preview/',false,false],['/green-rescue.html',false,true],['/green-rescue',false,true],['/cinema-stage.html',false,true],['/cinema-stage',false,true],['/molecular-frame.html',false,true],['/green-rescue.htm',false,true],['/experiences/cinema-stage/index.html',false,true],['/',true,true]]){
 imports.length=0;const app={innerHTML:''},window={};window.parent=frame?{}:window;window.frameElement=frame?{matches:()=>true}:null;
 vm.runInNewContext(script,{location:{pathname:path},window,document:{querySelector:()=>app},imports});
 assert.equal(imports.includes('./app.js'),!blocked,path);assert.equal(app.innerHTML.includes('role="alert"'),blocked,path);if(blocked)assert.equal(imports.length,0);
}
const config=JSON.parse(await readFile(new URL('../src/serve.json',import.meta.url),'utf8'));assert.equal(config.cleanUrls,false);
console.log('PASS: normal entry boots once; all isolated page fallback paths and nested app frame block recursive startup with a recovery message; serve preserves HTML URLs.');
