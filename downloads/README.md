# Release archives

The ZIPs historically tracked in this directory predate the 25 October 2026 repair.
Do not use those historical ZIPs for the exhibition. The current delivery includes
fresh source, Netlify and offline-backup ZIPs attached with EXHIBITION-REPAIR.md.

To regenerate all three archives from this review branch:

```
npm ci
npm test
python3 scripts/package-release.py
```

This overwrites the local source/deployment ZIPs and writes a new offline backup,
plus SHA256.json. Generated archives are not used by the application build.
