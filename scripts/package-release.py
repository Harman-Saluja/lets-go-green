"""Create source and static-build ZIPs with root-level files; no deployment.
Run npm test first, then: python3 scripts/package-release.py
"""
from pathlib import Path
import hashlib, json, os, re, zipfile

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

def package(name, base, files):
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
        assert 'index.html' in z.namelist() if base.name == 'build' else 'src/index.html' in z.namelist()
    return {'file':name,'files':len(files),'bytes':target.stat().st_size,'sha256':hashlib.sha256(target.read_bytes()).hexdigest()}

assert (root / 'build/index.html').is_file(), 'Run npm test or npm run build first.'
results = []
results.append(package('lets-go-green-updated.zip', root, source_files()))
results.append(package('lets-go-green-netlify-deploy.zip', root / 'build', [p for p in (root / 'build').rglob('*') if p.is_file()]))
(out / 'SHA256.json').write_text(json.dumps(results, indent=2) + '\n')
print(json.dumps(results, indent=2))
