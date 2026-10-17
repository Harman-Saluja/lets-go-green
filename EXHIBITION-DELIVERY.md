# Exhibition review delivery — 17 October 2026

Continuation of `codex/exhibition-upgrade` after `4ffb8b0`. The reported preview failures are fixed and the independent engineering work is delivered. Evidence-dependent Indore expansion remains blocked; this is not a claim that every requested exhibition feature is complete. No deployment or merge into main was performed.

## Critical fixes

The user's exact production command, `npx serve -s build`, reproduced the recursive website. Serve's default clean-URL handling redirected `green-rescue.html` to `/green-rescue`; its single-page fallback then served the main `index.html`. The same happened to `cinema-stage.html`. The main app restored its active tab inside that iframe and created another iframe, explaining the repeated navigation, Cinema panels, footers and scrollbars.

- The generated `serve.json` disables clean URLs so the actual isolated HTML documents load directly.
- `app-loader.js` refuses to start the main application when a host returns it for a known embedded page or inside an application-owned experience frame. It displays a recovery message. This protects against a bad fallback without hiding duplicate UI with CSS.
- Green Rescue reports its content height to its parent through an origin/source-checked message, removing the game's internal scrollbar. Standalone Exit now returns to Dashboard; pause removes an active drag preview.
- Level 1 now has a real open north/east pipe gap. The installed elbow bridges that gap; water flow only appears after the correctly connected pipe and treatment steps. Existing shared N/E/S/W validation remains intact. Touch gestures stay within the puzzle; narration occupies its own full-width row.
- The bundled flag licence now uses `LICENSE.txt`, because the same single-page server treats extensionless paths as application routes.

## Completed experiences

| Area | Delivered scope |
|---|---|
| Sorting studio | Three perspective SVG bins; green wet organics, blue accepted dry materials, neutral separate specialist collection. Ten draggable/selectable items, animated lids/drop feedback, wrong-choice explanations, progress, contamination challenge, replay and keyboard controls. No official third colour is invented. |
| Collection | A compartmented wet/dry vehicle animation and a distinct specialist route. All ten items and uncontaminated streams are required before departure. Three destination explanations link to related recovery processes; the electronics example is explicitly not universal battery/chemical treatment. |
| Indore map | Seven selectable system layers: water, collection, segregation, recovery, processing, restoration and community participation. Each has a conceptual mechanism preview and an actionable exhibit marker. Non-water layers are learning activities, not geographic facility inventories. Existing perspective/plan, zoom, pan, keyboard/touch controls and district outline remain. |
| Integration | Sorting opens from map interactions, its own Indore tab and waste journeys. Its destinations open the shared recovery player. Tour navigation stops before entering the activity. |
| Preserved | Ten waste journeys, ten recovery processes, eight conceptual comparisons, ten global/Indian field stories, the seven-stop 98-second guide, all 50 Atlas records and their three prevention/solution panels. Chemistry engine, reaction data, LocalStorage schema and existing dark-green theme are preserved. |

All scenes are locally rendered SVG/CSS or the existing locally bundled molecular renderer. No animation or map library dependency was added. Reduced motion and ambient-motion pause apply to the new visuals.

## Browser verification

The actual build was served at **http://localhost:3000** using `npx serve -s build`. Real Chromium input was sent through its DevTools protocol; screenshots were visually inspected. These are automated browser interactions, not physical-device or human-manual certification.

| Green Rescue level | Desktop mouse | Mobile touch at 390 px |
|---|---|---|
| 1 — water treatment | Incorrect elbow rejected; retry, actual drag/drop, correct connection, treatment and completion passed | Same sequence passed; hint clear of tap control |
| 2 — metered feed | Wrong choice, retry, placement, calibration, pause/resume and completion passed | Same sequence passed |
| 3 — sealed transfer | Wrong choice, retry, placement, approved route and completion passed | Same sequence passed |
| 4 — recovery and control | Wrong choice, retry, placement, sensor and completion passed | Same sequence passed |

Both viewports also passed start, sound toggle, progression, final victory, restart and Exit. All game frames fit their contents. Sound-button state was tested; audible output was not certified in headless Chromium.

Cinema loaded actual local molecular geometry, advanced through five scenes, and rendered in Presentation Mode without recursive frames. Direct hash navigation covered Dashboard, Analyze, Optimize, Solvents, Catalysts, Compare, Industrial Explorer, Principles, History, Atlas and Green Rescue, with one app header/footer each. A deliberately misconfigured second server reproduced the bad fallback and verified the loader's recovery behavior for all three child pages.

Sorting checks cover mouse and touch dragging, all ten correct routes, incorrect selections, incomplete/contaminated collection guards, all three destination panels, recovery links, reset, keyboard Enter, reduced motion and exit cleanup. Existing browser checks cover map controls; all ten journeys/processes; 40 field-story stages; eight dragged comparisons; 150 Atlas solution states; visitor-guide navigation, actual 14-second advancement and controlled 98-second scheduling; 320/390/768px layouts and reduced motion. No uncaught JavaScript exceptions occurred in the passing browser runs.

## Build and portable tests

`npm test` passed, including the production build, **791 chemistry acceptance checks**, **184 game object/state combinations**, cardinal pipe validation, Cinema/workspace suites, all 30 sorting pairs, system-layer scope and recursive-startup guards. The build validates dynamic-import references as well as existing module/HTML/CSS references. See `EXHIBITION-TEST-LOG.txt` and `EXHIBITION-VALIDATION.json` for executed results and the production file manifest.

```sh
npm ci
npm test
npx serve -s build
```

Keep the generated `serve.json` beside `index.html`. Open the URL printed by the server. `npm run preview` is also supported. Node 24 is recommended; 22 or newer is required. No application credentials are needed.

Optional browser tests require Chromium with `--remote-debugging-port=9222`. Run them sequentially against the same page:

```sh
SITE_URL=http://localhost:3000 node scripts/test-production-browser.mjs
SITE_URL=http://localhost:3000 node scripts/test-sorting-browser.mjs
SITE_URL=http://localhost:3000 node scripts/test-resource-browser.mjs
SITE_URL=http://localhost:3000 node scripts/test-tour-game-browser.mjs
SITE_URL=http://localhost:3000 node scripts/test-exhibition-browser.mjs
```

`CDP_URL` and `SCREENSHOT_DIR` can override defaults. The fallback test additionally expects a second `serve -s build` server on port 3001 with a config containing `{"cleanUrls":true}`; run `node scripts/test-embed-fallback-browser.mjs` only against that deliberately broken preview.

## Exact counts and blockers

- **Verified Indore facility/street-coordinate locations: 0 of the requested 10.** One existing district-level Khan River account is retained. The marker does not locate a sampling station or facility.
- **Dated transformation milestones: 0.** No empty timeline was published.
- **Indore-specific stories: 1**, using the retained April 2024 MPPCB account. Ten broader field stories remain, including that Khan story.
- **Additional Atlas cases: 0.** Existing 50 retained; category counts remain plastic 37, water 5, air 3, hazardous 1, e-waste 2, carbon/GHG 1 and soil 1.
- Saraswati, the confluence, Sirpur and other water bodies, ten site coordinates, historical comparisons and additional local outcomes need reliable source/geographic verification. Eight conceptual comparisons do not substitute for historical evidence.
- Existing educational prevention guidance remains separate from verified case-specific interventions. A new source audit of all 50 cases and additional category research remain blocked.

The environment's saved Internet-access configuration already lists the requested research domains, including `indore.nic.in`, `pib.gov.in`, `nmcg.nic.in` and CPCB domains. Official requests still receive runtime proxy **403 CONNECT denials**. Reapplying an effective allowlist to a newly started environment, or administrator correction of the runtime policy, is required before this research can proceed. Merely editing the saved list again does not establish access. No restriction was bypassed and no coordinates, measurements, milestones or citations were invented.

Physical-device, audible output and cross-browser exhibition acceptance remain open. No universal performance or accessibility certification is claimed.

## Download and reproduce

GitHub Release API access was denied in this environment. The two ZIPs are instead exported as ordinary files on the authorised review branch under `downloads/`; use the GitHub download/raw-file controls. The source ZIP excludes `downloads/` to prevent recursive archives.

- `lets-go-green-updated.zip`: editable source/configuration at ZIP root, including `src/`, `scripts/`, `public/`, package files, `netlify.toml` and the baseline fixtures in `archive/`. No Git history, dependencies, credentials or generated build.
- `lets-go-green-netlify-deploy.zip`: every generated production file, with `index.html` and `serve.json` directly at ZIP root.
- `downloads/SHA256.json`: byte sizes, file counts and SHA-256 hashes.

Both ZIPs receive CRC and byte-for-byte validation. The editable ZIP is also extracted into an isolated directory for `npm ci`, the complete regression suite and comparison of its rebuilt output against the deployment ZIP. Repackage with `python3 scripts/package-release.py` after running `npm test`.

Commits use `[skip ci] [skip netlify]`. No production deployment, release-triggered deployment or main-branch merge is part of this delivery.
