"""Package tested production bytes; does not deploy anything."""
from pathlib import Path
import zipfile,shutil,json,hashlib
root=Path(__file__).resolve().parent.parent
out=root/'downloads';out.mkdir(exist_ok=True)
work=root.parent/'corrections-verification';work.mkdir(exist_ok=True)
def pack(name,folder,files):
 target=out/name
 with zipfile.ZipFile(target,'w',zipfile.ZIP_DEFLATED,compresslevel=9) as z:
  for p in sorted(files):z.write(p,p.relative_to(folder).as_posix())
 with zipfile.ZipFile(target) as z:
  assert z.testzip() is None
  extracted=work/name.removesuffix('.zip');extracted.mkdir(exist_ok=True);z.extractall(extracted)
  for p in files:assert z.read(p.relative_to(folder).as_posix())==p.read_bytes()
 return {'file':name,'sha256':hashlib.sha256(target.read_bytes()).hexdigest(),'bytes':target.stat().st_size}
results=[pack('lets-go-green-corrected-netlify.zip',root/'build',[p for p in (root/'build').rglob('*') if p.is_file()])]
backup=work/'offline-staging';backup.mkdir(exist_ok=True)
shutil.copytree(root/'build',backup/'build',dirs_exist_ok=True);(backup/'scripts').mkdir(exist_ok=True)
shutil.copy2(root/'scripts/serve.mjs',backup/'scripts/serve.mjs')
(backup/'START-OFFLINE.cmd').write_text('@echo off\ncd /d "%~dp0"\necho Keep this window open. Node.js 24 must be installed before the exhibition.\nstart "" "http://localhost:4173/?safe=1#/dashboard"\nnode scripts/serve.mjs build\npause\n')
(backup/'README.txt').write_text('Extract the ZIP completely. Install Node.js 24 before going offline. Double-click START-OFFLINE.cmd; keep the console open. If the browser opens before the server is ready, refresh. No npm install, build, internet, or external font service is needed. Start at http://localhost:4173/?safe=1#/dashboard . The safe=1 parameter disables only optional 3D Cinema. Source links need internet to open; their descriptions and all local app assets remain available. This is not a file:// application. Upload the separate Netlify ZIP contents for hosting.\n')
if (root/'CORRECTIONS-REPORT.md').exists():shutil.copy2(root/'CORRECTIONS-REPORT.md',backup/'CORRECTIONS-REPORT.md')
results.append(pack('lets-go-green-corrected-offline.zip',backup,[p for p in backup.rglob('*') if p.is_file()]))
excluded={'.git','node_modules','build','downloads','__pycache__'}
files=[p for p in root.rglob('*') if p.is_file() and not excluded.intersection(p.relative_to(root).parts) and p.suffix not in ['.zip','.log','.pyc']]
results.append(pack('lets-go-green-corrected-source.zip',root,files))
results.append(pack('lets-go-green-corrected-screenshots.zip',out/'screenshots',[p for p in (out/'screenshots').glob('*.png')]))
(out/'CORRECTIONS-SHA256.json').write_text(json.dumps(results,indent=2)+'\n');print(json.dumps(results,indent=2))
