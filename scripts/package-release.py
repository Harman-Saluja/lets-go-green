"""Create source and static-build ZIPs with root-level files; no deployment.
Run npm test first, then: python3 scripts/package-release.py
"""
from pathlib import Path
import hashlib, json, os, re, zipfile, tempfile, shutil

root = Path(__file__).resolve().parent.parent
out = root / 'downloads'
out.mkdir(exist_ok=True)
excluded_dirs = {'.git', 'node_modules', 'build', 'downloads', '.netlify', '__pycache__'}
secrets = re.compile(rb'(?:-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----|AKIA[0-9A-Z]{16}|gh[pousr]_[A-Za-z0-9]{30,})')
def source_files():
    for folder, dirs, names in os.walk(root):
        dirs[:] = sorted(d for d in dirs if d not in excluded_dirs)
        for name in sorted(names):
            p = Path(folder) / name
            if name.endswith(('.log', '.zip', '.pyc')):
                continue
            if name.startswith('.env') or name.endswith(('.pem', '.key')):
                raise ValueError('Sensitive-looking source file: ' + str(p.relative_to(root)))
            if p.is_symlink():
                raise ValueError('Unexpected symlink: ' + str(p.relative_to(root)))
            if secrets.search(p.read_bytes()):
                raise ValueError('Credential pattern in: ' + str(p.relative_to(root)))
            yield p

def package(name, base, files, entry=None):
    files = sorted(files)
    target = out / name
    with zipfile.ZipFile(target, 'w', zipfile.ZIP_DEFLATED, compresslevel=9) as z:
        for p in files:
            z.write(p, p.relative_to(base).as_posix())
    with zipfile.ZipFile(target) as z:
        assert z.testzip() is None
        assert len(z.namelist()) == len(files)
        for p in files:
            assert z.read(p.relative_to(base).as_posix()) == p.read_bytes()
        assert (entry or ('index.html' if base.name == 'build' else 'src/index.html')) in z.namelist()
    return {'file':name,'files':len(files),'bytes':target.stat().st_size,'sha256':hashlib.sha256(target.read_bytes()).hexdigest()}

assert (root / 'build/index.html').is_file(), 'Run npm test or npm run build first.'
results = []
results.append(package('lets-go-green-updated.zip', root, source_files()))
results.append(package('lets-go-green-netlify-deploy.zip', root / 'build', [p for p in (root / 'build').rglob('*') if p.is_file()]))
with tempfile.TemporaryDirectory(prefix='lgg-backup-') as folder:
    backup = Path(folder)
    shutil.copytree(root / 'build', backup / 'build')
    (backup / 'scripts').mkdir()
    shutil.copy2(root / 'scripts/serve.mjs', backup / 'scripts/serve.mjs')
    (backup / 'START-BACKUP.cmd').write_text('@echo off\ncd /d "%~dp0"\necho Open http://localhost:4173/?safe=1#/chemistry-lab/analyze/analysis\necho Keep this window open. Node.js 24 must already be installed.\nnode scripts/serve.mjs build\npause\n')
    shutil.copy2(root / 'WINDOWS-EXHIBITION.md', backup / 'WINDOWS-EXHIBITION.md')
    (backup / 'BACKUP-README.txt').write_text('Extract fully. Install Node.js 24 beforehand. Double-click START-BACKUP.cmd. No npm install or build is needed. Open http://localhost:4173/?safe=1#/chemistry-lab/analyze/analysis. Load a demo, Analyze, Optimize, Compare, Save. This backup uses the identical production files; optional features are preserved. Do not upload this wrapper folder to Netlify; use the separate deployment ZIP.\n')
    results.append(package('lets-go-green-offline-backup.zip', backup, [p for p in backup.rglob('*') if p.is_file()], 'build/index.html'))
(out / 'SHA256.json').write_text(json.dumps(results, indent=2) + '\n')
print(json.dumps(results, indent=2))
