# Let’s Go Green — exhibition corrections

Review branch: `codex/exhibition-corrections-2026-10-26`

Based on the previous reviewed version, commit `f8446e3317781cd91edb943eff74cfef21db2c10`. The previous working folder and branch were retained. No merge, Netlify deployment or production-site setting change was performed.

## What changed

### Restored Sorting Studio

The original game was still present but had been moved under Explore More. Its original three bin illustrations, ten material records, classification rules, collection animation, contamination challenge and destination links are retained.

Sorting Studio is now a main Explore Indore section between Follow the Waste and Better Future. A landing-page button and entry card open it in one click. Explore More still holds the deeper educational tools.

Added a shuffled item queue, current-item display, Next Item, remaining count, first-try score, completion panel and replay. Both drag-to-bin and tap-item-then-bin interactions work. Incorrect choices explain the material’s appropriate route. A replay guarantees a different order.

The teaching categories remain wet organics, dry materials and a neutral specialist collection station. They are explicitly not a claim about current Indore bin-colour regulations. Batteries and chemical waste need their own compatible authorised routes; the game does not recommend mixing them together.

### Consistent selected-card accents

The existing dark green backgrounds, navbar, mascot, typography, charts and map colours remain. Selected information surfaces now use sage/mint in Chemistry Lab, Optimize, Compare, Principles, History, Solvents and Catalysts; dusty blue in Atlas; peach in Rescue; beige in Indore; and sage/beige in Sorting Studio. Text contrast adjustments are scoped to these light surfaces. The Dashboard’s white headline remains unchanged.

### Medium-difficulty Green Rescue

1. **Water:** rotate three route elbows, orient and install the delivery pipe, then activate treatment and test the tap. Pipe repair alone cannot satisfy the success condition.
2. **Factory:** four process decisions—inspection, metered input, calibration and suitable clean-offcut recovery—with three choices at each step. Choice positions vary.
3. **Lab:** match six distinct labelled fictional material packages to three destinations. Tap or drag, then transfer the completed set.
4. **Final:** install the heat-recovery component, activate monitoring, align a valve, and route two different packages before launch.

The existing character, scenes, staged outcome animations, pause/retry/restart/exit, final celebration and opt-in sound remain. Progress now reflects actual solved tasks. Hints appear on request, after inactivity, and after repeated unsuccessful attempts. Frame sizing follows content and font changes.

These are simplified educational scenarios, not operating instructions or measured environmental predictions. The intended first-time pace is 30–60 seconds per level; this has not been measured with exhibition visitors.

## Verification actually performed

| Check | Result and scope |
|---|---|
| Production build | `npm run build` succeeded; 125 deployable files including generated isolated HTML entries. |
| Automated suite | `npm test` passed: chemistry, scoring, missing-data handling, comparisons, persistence, controls, routes, assets and embedded-page guards. |
| Chemistry acceptance | 791 checks, including two full passes through ten quantitative case-study optimization loops. |
| Game model/controller | 2,496 object/state combinations, four complete staged success sequences, eight failure routes, retry/next/pause/restart and cleanup harnesses. |
| Sorting Studio desktop | All ten items, incorrect/correct routes, first-try points, real mouse drag, Next/completion, collection guards, destination selection, replay shuffle and keyboard selection passed in Chromium. |
| Sorting Studio mobile | All ten items and the same round controls passed at 390 px, including emulated touch drag. An intermittent post-drag touch activation was reproduced and fixed with explicit touch release activation and duplicate-click suppression; the browser driver also waits for its server and uses isolated ports. |
| Rescue desktop | All four harder levels, wrong paths, mouse drags, pause, hints, retry, restart, sound toggle and exit passed in an isolated browser run. |
| Rescue embedded mobile | All four harder levels passed at 390 px with touch drags and wrong/correct outcomes; no page exceptions or failed network requests. Frame-height check passed. |
| Extracted deployment ZIP | Served the extracted files locally. All 15 reaction load/analyze/material/optimize/compare/principles/save/refresh/restore/edit workflows passed in compatibility mode. |
| Principles and industrial tools | All twelve principle selections and 22 industrial process stages, including presentation controls, passed in the extracted build. |
| Cinema | Haber–Bosch passed actual WebGL rendering through all five scenes, Previous, rotate/reset, replay/pause, fullscreen and timed playback/reduced-motion checks from the extracted build. All 15 × 5 scenes also passed the renderer API harness; that harness is not a visual WebGL test of every reaction. |
| Atlas and Indore | Desktop World and India tour controls, automatic World Tour progression, Indore navigation and landing entry checked. All-tab colour and desktop/mobile layout checks passed. |
| Asset serving | All 125 production files returned byte-for-byte; isolated experience documents were distinct from the main page, and missing assets returned 404. |
| Preservation | Byte comparison confirmed `engine.js`, reaction/science datasets, Atlas data and resource data unchanged. |

Browser tests used headless Chromium with desktop and mobile emulation. They are not physical-device, projector, audio-quality or visitor-usability tests. One combined browser run and one screenshot capture timed out; isolated functional runs completed. This report does not claim zero issues on every computer.

## Remaining limitations

- **Leafy Plant is not installed:** no usable licensed font file is available. The headline remains white with the existing fallback; Poppins remains available locally for the rest of the website. No substitute has been represented as Leafy Plant.
- **Optional 3D:** this release smoke-tested Haber–Bosch in a real renderer, not every reaction’s complete WebGL run. Earlier repeated renderer-switching stress remains a caution. Use `?safe=1` on a low-powered exhibition laptop if needed; the chemistry, Rescue, sorting, Atlas and other core tools remain available.
- **Learning scenarios:** medium difficulty and the expected playtime are design targets, not results from a student user study. Local waste rules still require verification before making municipal operating claims.
- **External references:** the application assets are local; opening source websites requires internet.

## Delivery and Windows setup

- `lets-go-green-corrected-netlify.zip`: production files with `index.html` at ZIP root. Extract and upload its contents as the Netlify site. Do not upload the source ZIP as a manual static deployment.
- `lets-go-green-corrected-offline.zip`: same build, a local server and `START-OFFLINE.cmd`. Install Node.js 24 beforehand, extract the entire ZIP, then double-click `START-OFFLINE.cmd`. Keep the command window open. It opens `http://localhost:4173/?safe=1#/dashboard`; refresh if the browser opens before the server starts.
- `lets-go-green-corrected-source.zip`: editable source, build/test scripts, configuration and this report. No application dependencies are required beyond Node.js.
- `lets-go-green-corrected-screenshots.zip`: Dashboard, Chemistry Lab, Impact Atlas, Green Rescue, Explore Indore and desktop/mobile Sorting Studio screenshots.

For source development in CMD, after extracting into the example folder:

```bat
cd /d "%USERPROFILE%\Downloads\lets-go-green-corrected-source"
npm test
npm run build
npm run preview
```

Open `http://localhost:4173/`. For the exhibition backup, use `http://localhost:4173/?safe=1#/dashboard`. Do not open `index.html` with `file://`.

Netlify build command: **`npm run build`**. Publish directory: **`build`**. Recommended Node: **24**. No environment secrets required. Existing hash navigation needs no catch-all SPA rewrite. The build includes `_redirects` for legacy isolated-experience URLs and `.htm` experience pages; `netlify.toml` keeps HTML prettification disabled. No deployment configuration was changed in this correction.

## Changed-file groups

- `src/sorting-studio.js`, `src/sorting-studio.css`, `src/sorting-data.js`, `src/indore-explorer.js`: restore prominent original game, queue/score and landing access.
- `src/app.js`, `src/final-exhibition.css`: page-scoped accent styling without changing chemistry behavior.
- `src/green-rescue-state.js`, `src/green-rescue.js`, `src/green-rescue-art.js`, `src/green-rescue.css`, `src/pipe-model.js`: richer puzzles, progress/hints, supported flow rendering and responsive embed sizing.
- Browser/model test scripts: updated paths, touch checks, game states and screenshot/layout validation.
- `scripts/package-corrections.py` and this report: fresh ZIP creation, extraction/byte verification and delivery instructions.
