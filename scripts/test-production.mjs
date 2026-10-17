import {execFileSync} from 'node:child_process';
import {readFile,mkdtemp,cp,writeFile,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=fileURLToPath(new URL('../',import.meta.url));
execFileSync(process.execPath,[join(root,'scripts/build.mjs')],{stdio:'inherit'});
execFileSync(process.execPath,[join(root,'scripts/test-standalone.mjs')],{stdio:'inherit'});
execFileSync(process.execPath,[join(root,'scripts/test-score.mjs')],{stdio:'inherit'});
execFileSync(process.execPath,[join(root,'scripts/test-motion.mjs')],{stdio:'inherit'});
execFileSync(process.execPath,[join(root,'scripts/test-navbar.mjs')],{stdio:'inherit'});
execFileSync(process.execPath,[join(root,'scripts/test-exhibition.mjs')],{stdio:'inherit'});
execFileSync(process.execPath,[join(root,'scripts/test-team.mjs')],{stdio:'inherit'});
execFileSync(process.execPath,[join(root,'scripts/test-experiences.mjs')],{stdio:'inherit'});
execFileSync(process.execPath,[join(root,'scripts/test-workspaces.mjs')],{stdio:'inherit'});
execFileSync(process.execPath,[join(root,'scripts/test-science.mjs')],{stdio:'inherit'});
execFileSync(process.execPath,[join(root,'scripts/test-atlas-regions.mjs')],{stdio:'inherit'});
execFileSync(process.execPath,[join(root,'scripts/test-platform-2.mjs')],{stdio:'inherit'});
execFileSync(process.execPath,[join(root,'scripts/test-part-1.mjs')],{stdio:'inherit'});
execFileSync(process.execPath,[join(root,'scripts/test-cinema-3d.mjs')],{stdio:'inherit'});
execFileSync(process.execPath,[join(root,'scripts/test-green-rescue.mjs')],{stdio:'inherit'});
execFileSync(process.execPath,[join(root,'scripts/test-pipe.mjs')],{stdio:'inherit'});
execFileSync(process.execPath,[join(root,'scripts/test-resources.mjs')],{stdio:'inherit'});
execFileSync(process.execPath,[join(root,'scripts/test-sorting.mjs')],{stdio:'inherit'});
execFileSync(process.execPath,[join(root,'scripts/test-embed-loader.mjs')],{stdio:'inherit'});
// Exercise the exact build bytes using the existing, unchanged acceptance suite.
const temp=await mkdtemp(join(tmpdir(),'lgg-production-'));
try{
 await cp(join(root,'build'),join(temp,'src'),{recursive:true});
 await cp(join(root,'test.mjs'),join(temp,'test.mjs'));
 await writeFile(join(temp,'package.json'),'{"type":"module"}');
 execFileSync(process.execPath,[join(temp,'test.mjs')],{stdio:'inherit'});
 await cp(join(temp,'reaction-audit.json'),join(root,'production-audit.json'));
}finally{await rm(temp,{recursive:true,force:true});}
