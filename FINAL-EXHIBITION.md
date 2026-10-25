# Let's Go Green — exhibition delivery

Date: 26 October 2026 (India). Based on repair commit `e694f221a8d8e00ba8f75e8b75af841abc98eb52`.
Review branch: `codex/final-exhibition-2026-10-26`.
No merge, live-site modification or Netlify deployment was performed.

## What changed

- Preserved the dark-green background, navbar, mascot, existing tools and datasets. Added four selected Dashboard cards: sage Chemistry Lab, peach Green Rescue, dusty-blue Impact Atlas, beige Explore Indore. Other card surfaces retain their existing styling.
- Changed the Dashboard headline to **EXPLORE A GREENER WORLD.**, entirely white. Bundled Poppins 400/500/600/700/800/900 locally, including its SIL Open Font License; updated existing font declarations, canvas labels and isolated pages.
- **Leafy Plant is NOT installed.** Neither the referenced design image nor a licensed Leafy Plant font file accompanied this request. The headline currently uses Poppins openly as a temporary fallback. Upload the exact licensed font and design image to finish that requirement; this release does not claim an exact visual-reference match.
- Green Rescue retains its existing character, scenery, animation sequences and state machine. Level 1 retains the working rotate/connect/treat water puzzle. Level 2 now requires inspection → metering → calibration → operation, with out-of-order rejection. Level 3 matches three prepared streams to labeled collection routes using drag or tap. Level 4 combines fitting recovery equipment, leak control and rotating a delivery valve. Added an explicit Hint button; retained pause/retry/next/restart/sound/exit and delayed result feedback.
- Moved World/India/MP tour controls directly beneath the globe or regional map, added Play/Pause with 12-second progression, current location and progress. Case summaries show issue, significance and possible improvement first; existing interactive detail and evidence remain expandable. No new scientific claims or statistics were added.
- Indore now highlights **Our City**, **Follow the Waste**, **Better Future**. Resource Lab, comparison, field stories, Sorting Studio and evidence remain under **Explore More**. Seven map layers and all existing data remain available.
- Kept the existing Guided Analysis and Indore visitor tour. Did not add the optional separate cross-site Quick Tour.

## Verification performed

| Check | Result and scope |
|---|---|
| Production build | `npm run build` and `npm test` succeeded; 125 deployable files including generated isolated entrypoints and team assets. |
| Chemistry/regressions | 791 acceptance checks, two library passes, ten accounting/optimization loops; existing scoring, missing-data, industrial records and motion/control harnesses passed. |
| Game state/controller | 368 object/state combinations; four six-beat successes; eight distinct failure routes; timers, pause/resume, keyboard adapters, restart, retry, optional sound and cleanup passed. |
| Actual chemistry browser | All 15 retained demos: load/analyze/contextual materials/optimization or industrial what-if/compare/principles/save/refresh/restore/edit. Yield changed score without changing atom economy. Compatibility mode enabled. |
| Navigation/education browser | All six main tabs at desktop/mobile widths; all 12 wheel selections and 22 industrial process stages; presentation controls. |
| New UI browser | 1440px and 390px: white headline, Poppins loaded locally, four feature cards, no Dashboard horizontal overflow, all Indore sections, World/India Next/Previous/Play/Pause/Exit and actual timed advancement. |
| Game browser | All four levels at desktop and mobile sizes, two wrong paths each, complete success, retry, pause/resume, hints, sound toggle, restart, exit. Actual mouse pipe dragging and emulated touch dragging/matching. Most automated checks use reduced motion. |
| Extracted Netlify ZIP | Served extracted files; full desktop upgrade/game walkthrough passed with no uncaught exceptions or HTTP failures. `index.html` is at ZIP root. |
| Extracted offline ZIP | All 125 website files served byte-for-byte; isolated page assets and 404 handling passed. Full embedded mobile game run passed, including no inner game scrollbar at completion. |
| Cinema browser | Fresh Haber–Bosch run: all five scenes rendered; Previous/rotation/reset/replay/pause, fullscreen enter/exit, timed Play/Pause and reduced-motion behavior passed. Other reactions were covered by the existing 15 × 5 renderer harness, not all repeated in WebGL for this release. |
| Preservation | Engine, reaction datasets, Cinema model/logic, Atlas content and resource data compared byte-for-byte with the repair version and remain unchanged. Existing game and Cinema `.htm` routing fix and `?safe=1` preserved. |

Detailed stdout is in `FINAL-TESTS.txt`. Test scripts distinguish DOM/clock harnesses from real Chromium checks. Touch testing is emulated, not physical-device testing. Sound controls were tested, not speaker/audio quality. The Windows launcher has not been executed on a physical Windows machine.

## Known limitations and safe exhibition route

- Authentic Leafy Plant and the design reference are missing. This is a functional delivery with that typography requirement still pending.
- A combined browser run hit a driver `Runtime.evaluate` timeout during repeated mobile Atlas navigation. Isolated desktop, mobile and extracted-package reruns passed. This is documented rather than described as zero issues.
- The previous repeated 3D reaction-switching stress issue is not claimed fixed by this visual/game update. Use `?safe=1` for the dependable exhibition route. It disables optional 3D Cinema only; analysis and chemistry calculations remain available. The offline launcher opens this mode by default. Cinema remains conceptual before/after imagery, not a validated continuous molecular mechanism.
- Source hyperlinks need internet to visit. Website assets, fonts, datasets, games and local maps are bundled; no external font service or API keys are required.
- Live Netlify CDN behavior has not been tested because deployment was not authorized.

Recommended core demo: Dashboard → load Esterification → Analyze → Green Score → Optimize → Apply → Compare → Save/History. Then show Indore or Green Rescue. Keep the compatibility URL ready.

## Files changed

Application: `src/app.js`, `src/index.html`, `src/final-exhibition.css`, `src/styles.css`, `src/fonts/fonts.css`, six Poppins WOFF2 files and `src/fonts/Poppins-OFL.txt`; `src/green-rescue.js`, `src/green-rescue-state.js`, `src/green-rescue.css`; `src/science-controls.js`, `src/atlas-globe.js`; `src/indore-explorer.js`, `src/indore.css`; font-name-only updates in `src/cinema-stage.js` and `src/cinema-stage.css`.

QA/delivery: `scripts/test-green-rescue.mjs`, `scripts/test-production-browser.mjs`, `scripts/test-final-exhibition-browser.mjs`, `scripts/test-preview.mjs`, `scripts/package-final.py`, this report and `FINAL-TESTS.txt`.

## Deploy manually to Netlify

1. Extract **lets-go-green-final-netlify.zip**.
2. Upload the extracted folder containing `index.html`, JS/CSS, assets, fonts and `_redirects`. Do not upload the source or offline wrapper folder as the website.
3. Git-build settings, if used later: **build command `npm run build`**, **publish directory `build`**, **Node 24**, **no environment variables/API keys required**.
4. Existing `netlify.toml` retains `pretty_urls=false`. `_redirects` maps the three legacy game/Cinema/molecular URLs to isolated `.htm` documents. Hash navigation needs no blanket SPA fallback. Do not replace isolated page responses with the main index.

## Run the offline package on Windows

Install Node.js 24 before the exhibition. Extract **lets-go-green-final-offline.zip** fully and double-click **START-OFFLINE.cmd**. Keep the console open. If the browser appears before the server is ready, refresh.

Manual CMD alternative, from the extracted offline folder:

```bat
node scripts\serve.mjs build
```

Open `http://localhost:4173/?safe=1#/dashboard`. No installation, build or internet is needed at exhibition time once Node is installed. Do not open `index.html` with `file://`.

## Edit and build the source

Extract **lets-go-green-final-source.zip**, open CMD in that folder, then:

```bat
npm ci
npm test
npm run build
npm run preview
```

Open `http://localhost:4173/?safe=1#/dashboard`. Use `npm run dev` for source development. `python scripts/package-final.py` can regenerate the three ZIPs after testing (Python is only needed for packaging).
