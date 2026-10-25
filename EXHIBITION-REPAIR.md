# Exhibition repair — 25 October 2026

## Delivery decision
**Ready for the checked core exhibition route and Green Rescue. Use the compatibility backup for the safest live demonstration.** This is not a claim that every ambitious feature request is complete or that the site has zero issues. Continuous 3D switching remains an unresolved stress-test limitation.

Review branch: `codex/exhibition-repair-2026-10-25`.
Base: `codex/exhibition-upgrade` at `6be87ae531e34748f45700cbcb34436b7a988f52`.
GitHub access and branch-creation permission were verified. Main and production were not modified. No merge or deployment was performed. Commit messages include deployment-skip markers.

## Actual project
Native HTML/CSS/JavaScript ES modules; npm, no application package dependencies. `src/index.html` loads `app-loader.js` and the existing app. The navbar's `.tsx` file contains native JavaScript and the build emits `.js`; this is not a React/Next compilation. Main navigation uses URL hashes. State and History use LocalStorage. No API key, database, or required environment variable is needed. Existing data, local fonts, images, 3D renderer and molecular records are packaged locally. External reference links require internet.

Netlify: `npm run build`, publish `build`, Node 24. The source branch already built successfully at inspection; the older missing-dist build error was not present in this revision.

## What changed and why
- Reproduced the reported recursive-loading failure with the actual `serve-handler` routing engine: `.html` clean-URL redirects plus the SPA rewrite returned the main app for an embedded experience. The base branch already had `cleanUrls:false`, but its HTML entry URLs remained fragile if that setting was lost or overridden.
- Build now emits `green-rescue.htm`, `cinema-stage.htm` and `molecular-frame.htm` from the existing HTML shells. App frames use these aliases. All scripts/data/styles remain shared. Both clean-URL settings passed the routing regression test, with the SPA rewrite enabled. Legacy HTML bookmarks remain available.
- Recursion protection recognizes the new entry URLs. Production validation verifies actual output files, aliases, asset responses and missing-file 404s.
- Three explicit Netlify legacy redirects are included in `_redirects`; a redirect sets the canonical file URL so relative assets cannot resolve under an accidental trailing-slash folder. No catch-all rewrite is added. Future Git-based builds disable Pretty URLs in `netlify.toml`. Current live settings were not touched. Configuration reference: https://docs.netlify.com/build/configure-builds/file-based-configuration/ .
- Cinema Pause no longer redraws the entire scene. Delayed structure loading cannot resume motion after Pause. Manual stage changes have a bounded camera transition, with reduced-motion support. This does not invent a chemical mechanism.
- Added explicit `?safe=1` compatibility mode: only Cinema 3D is replaced by a labeled net-equation summary. Chemistry calculations and all other features remain available. This is an emergency option, not a hidden cosmetic workaround.
- Added Windows launch instructions, a launcher, current HTTP/browser tests and a ready-built offline backup package.
- Corrected test reporting/counts and made screenshots optional. Functional browser checks were retained. A mobile test now waits for viewport/layout settlement before measuring width; no CSS redesign was needed.

**Unchanged:** theme, global CSS, navbar, mascot, team images, chemistry engine, score formulas/weights, reaction datasets, optimization calculations, existing game art and levels. No application dependencies were added.

## Executed checks
| Area | Current evidence |
| --- | --- |
| Install/build | `npm ci` and fresh `npm test` succeeded; test suite includes a fresh production build. |
| Chemistry | 791 acceptance checks; two complete library passes; ten complete accounting/optimization loops; five industrial models retain explicit scope limits. |
| HTTP/packaging | 117 production files served byte-for-byte; three isolated HTML aliases and their assets; 404 for missing assets. ZIP integrity and extracted-build checks are recorded with delivery. |
| Core browser | All 15 reactions loaded, analyzed, opened in solvent/catalyst/principles views, compared, saved, refreshed, restored and edited. Yield edits changed the score without changing atom economy. |
| Optimizations | Ten educational alternatives applied; original data preserved. Five industrial examples create honest manual what-if comparisons rather than claiming measured optimized plant outcomes. |
| Main navigation | All six main tabs at 1440px and 390px; no horizontal overflow in those checks. History restored full reaction and comparison state. |
| Compatibility backup | All 15 core loops passed through the real serve routing engine with clean URLs and SPA fallback enabled. Twelve principle selections and all 22 industrial stages/presentation controls passed; no page exceptions or HTTP error responses in this run. |
| Green Rescue | Eight full level runs: four desktop-pointer and four mobile-touch. Wrong choice/retry, correct path, pipe dragging, pause/resume, sound toggle, restart, exit and final completion. No recursive frame or nested game scrollbar. State suite covers 184 action combinations. |
| Cinema | All 15 × five scenes passed in fresh browser sessions: renderer acknowledgments, canvas presence, available structures and no page exceptions. Previous/rotate/reset/replay/pause tested. Haber additionally passed fullscreen enter/exit, timed Play/Pause and reduced-motion controls. Presentation mode passed in the production browser suite. |
| Indore/sorting | Seven layers, ten sortable items, desktop drag and touch drag, incorrect/incomplete/contaminated collection feedback, correct destinations, keyboard, reset and linked recovery. |
| Follow the Waste | Ten journeys and ten recovery processes, sorting/contamination guards, playback, replay, mobile layout and reduced motion passed. |
| Atlas/Indore stories | Map pointer/touch/keyboard controls, 40 story stages, eight comparisons, 150 case panels, actual timed tour transition and controlled complete tour; 320/390/768px checks. Existing data preserved, not re-researched. |

## Reaction coverage
All rows passed core load → analyze → appropriate optimization/scenario → compare → save → refresh → restore → edit. Cinema coverage below is **isolated-session coverage**, not a successful continuous stress test.

| Reaction | Core workflow | Optimization scope | Cinema |
| --- | --- | --- | --- |
| Sugar hydrolysis | Pass | Applied demo alternative | 5/5, isolated |
| Starch hydrolysis | Pass | Applied demo alternative | 5/5, isolated |
| Glucose isomerization | Pass | Applied demo alternative | 5/5, isolated |
| Lactose hydrolysis | Pass | Applied demo alternative | 5/5, isolated |
| Citric acid–bicarbonate neutralization | Pass | Applied demo alternative | 5/5, isolated |
| Acetic acid–bicarbonate neutralization | Pass | Applied demo alternative | 5/5, isolated |
| Calcium lactate formation | Pass | Applied demo alternative | 5/5, isolated |
| Calcium carbonate precipitation | Pass | Applied demo alternative | 5/5, isolated |
| PLA hydrolysis to lactic acid | Pass | Applied demo alternative | 5/5, isolated |
| PET hydrolysis to terephthalic acid | Pass | Applied demo alternative | 5/5, isolated |
| Haber–Bosch ammonia synthesis | Pass | What-if model | 5/5, isolated |
| Contact process — sulfur dioxide oxidation | Pass | What-if model | 5/5, isolated |
| Methanol synthesis — carbon monoxide route | Pass | What-if model | 5/5, isolated |
| Iron oxide reduction — carbon monoxide route | Pass | What-if model | 5/5, isolated |
| Hydrogen production — steam methane reforming | Pass | What-if model | 5/5, isolated |

## Limitations / unfinished work
1. **Continuous WebGL switching:** multi-reaction 3D stress runs intermittently stalled Chromium Runtime.evaluate in this restricted software-rendering environment. Fresh-session coverage passed for every reaction. The cause is not conclusively isolated to the browser or app; do not interpret isolated passes as a full stress-test pass. Use the supplied compatibility backup for the exhibition core. Reload before trying a standalone 3D demonstration if needed.
2. **Cinema scope:** existing conceptual before/after scenes are preserved. They are not continuous atom-mapped bond-rearrangement animations, verified molecular mechanisms, or transition-state calculations. Polymer/ionic/solid schematics remain explicitly labeled.
3. **Exact `npx serve -s build`:** attempted; the CLI exits before listening because this environment denies its `uv_interface_addresses` call. I did not claim it passed. Its actual routing dependency was tested with the same SPA rewrite and both clean-URL settings, including browser core loops. The project's own production preview passed and is the recommended local command.
4. Screenshot capture sometimes hung in headless Chromium. Early game screenshots were inspected; broad final screenshot capture was disabled while functional/layout checks continued. No full visual or FPS benchmark is claimed.
5. No real Windows machine, physical mobile device, projector or audible speaker-quality test was available. Touch was browser-emulated. Fullscreen was checked in Chromium, not on your projector.
6. No live Netlify deployment/CDN validation was performed because deployment requires your approval. TOML parsed successfully and static routing/output checks passed locally.
7. No extra Indore research, fabricated locations, coordinates, photographs or statistics were added. Existing environmental content remains educational and scoped. Scientific input provenance and industrial missing-data limits are unchanged.

## Run and backup
Read **WINDOWS-EXHIBITION.md**. Source: `npm ci`, `npm test`, `npm run build`, `npm run preview`; open http://localhost:4173.
For the safest route use http://localhost:4173/?safe=1#/chemistry-lab/analyze/analysis . Load Sugar hydrolysis (sucrose) → Analyze → Green Score → Optimize → Compare → Save → History. The backup ZIP already contains the tested build and server; with Node installed, extract it and run START-BACKUP.cmd. No build or npm download is needed for that backup. Keep the same browser/port to retain History.

Detailed current evidence: **EXHIBITION-REPAIR-TESTS.txt** and **EXHIBITION-REPAIR-VALIDATION.json**. Older reports in the repository describe older revisions and are not the basis for this delivery.

## Changed source and delivery files

- `EXHIBITION-REPAIR-TESTS.txt`
- `EXHIBITION-REPAIR-VALIDATION.json`
- `EXHIBITION-REPAIR.md`
- `README.md`
- `START-EXHIBITION.cmd`
- `WINDOWS-EXHIBITION.md`
- `downloads/README.md`
- `netlify.toml`
- `package.json`
- `scripts/build.mjs`
- `scripts/package-release.py`
- `scripts/serve.mjs`
- `scripts/test-cinema-3d.mjs`
- `scripts/test-cinema-browser.mjs`
- `scripts/test-core-browser.mjs`
- `scripts/test-embed-fallback-browser.mjs`
- `scripts/test-embed-loader.mjs`
- `scripts/test-exhibition-browser.mjs`
- `scripts/test-preview.mjs`
- `scripts/test-production-browser.mjs`
- `scripts/test-production.mjs`
- `scripts/test-resource-browser.mjs`
- `scripts/test-serve-routing.mjs`
- `scripts/test-sorting-browser.mjs`
- `scripts/test-standalone.mjs`
- `scripts/test-tour-game-browser.mjs`
- `src/_redirects`
- `src/app-loader.js`
- `src/app.js`
- `src/cinema-stage.js`
- `src/reaction-cinema.js`
- `src/science-views.js`

Generated ZIPs are delivered separately. Historical ZIPs still tracked under downloads are clearly marked as older artifacts; use the new attached ZIPs or regenerate from this branch.
