# Exhibition implementation milestone — 14 October 2026

**Historical checkpoint:** superseded by [EXHIBITION-DELIVERY.md](EXHIBITION-DELIVERY.md). Counts, commit status and unfinished features below describe the earlier checkpoint.

The user approved implementation after the audit. This is a stable partial milestone, not completion of the full master request. No commits or deployments were made. The original restored source remains largely untracked because the connected GitHub branch lacked the application; preserve it.

## Completed and tested

- Green Rescue: shared N/E/S/W elbow model, all four orientations, rotate control, consistent selection/ghost/placement SVG, socket direction validation, installed-connection validation before success, and a separate narration row that no longer covers the mobile tap control. Other levels and timed behavior preserved.
- Integrated Indore experience, lazy-loaded within Impact Atlas, with Dashboard entry points and return navigation. Dark green/glass visual styling remains consistent with the original site.
- One documented local prototype: Khan River/Indore, using the existing April 2024 MPPCB source. Interactive four-stage explanation and a zoomable/pannable historical Indore district map derived from the bundled geometry. Explicitly a regional locator, not a street map or exact sampling-point map.
- Ten waste journeys: banana peel, plastic bottle, cardboard, battery, vegetable waste, glass bottle, aluminium can, phone, cooking oil and construction debris. Sorting challenge, distinct material routes, moving material illustration, contamination blocking, stage selection, previous/next/play/pause/replay, possible outputs and limitations. Dedicated battery handling differs from general electronics.
- Ten recovery processes: biogas, compost, plastic, paper, glass, aluminium, construction material, textiles, cooking oil and electronics. Shared renderer/controller; individual inputs, stages, scientific explanation, benefits and limits. These are general educational models, not verified local facility routes.
- All 50 existing Atlas records now expose topic-appropriate prevention/solution panels explaining meaning, mechanism, importance, illustrative examples and limitations. Existing case text/sources preserved. Panels explicitly distinguish general approaches from documented action at the named site.
- Conceptual comparison slider; eight-choice hypothetical Future City with visual state changes and qualitative effects; neither claims historical images or numerical forecasts.
- Seven-stop self-paced visitor tour: welcome, local challenge, geographic context, waste journey, global plastic case, chemistry connection, future choices. Back/next/skip/replay/exit; no login. Duration is not measured with visitors, so no 60–120-second completion claim.
- Reduced-motion handling, keyboard/native controls, mobile layouts and timer cleanup.

## Remaining / blocked

1. Ten verified Indore facility/landmark locations with exact coordinates and distinct site-backed scenes. Only the sourced Khan River regional story is included. Devguradia and the other proposed facilities were not researched successfully; no invented markers or operations were added.
2. Evidence-backed transformation timeline (8–10 milestones), historical then/now comparisons and 8–10 local environmental stories. The current comparison is explicitly conceptual, not a substitute for historical evidence.
3. New pollution case studies to reach at least three complete cases per category where evidence permits. Record counts remain unchanged: plastic 37, water 5, air 3, hazardous 1, e-waste 2, carbon 1, soil 1. MP records are a subset of India records.
4. Case-specific research and deeper documented progress/remaining-challenge narratives across all 50 cases. Shared prevention panels improve explanation but do not establish local implementation or resolve this entire research requirement.
5. Process-specific authoritative references beyond inherited topic/general-principle sources. Core educational mechanisms are presented without performance claims; no new official-source verification is claimed.
6. Chemistry Explore/Advanced mode and additional category tours; existing chemistry features, guided analysis and three Atlas tours remain intact.
7. Full physical-device touch/audio/WebGL testing and human exhibition timing. No new performance benchmark claims.

Research blocker: requests to Wikipedia, Indore district government, PIB and EPA were rejected by the runtime proxy with HTTP 403 tunnel denials. A network permission request did not remove that proxy restriction. Required domain additions were saved to the environment draft. Save/apply the network settings, then retry source access before adding local claims. Do not work around restrictions or repeat unchanged failed requests. The required next work is source verification, not another architecture audit.

## Validation performed

- `npm run build`: passed after initial integration.
- Final `npm test`: passed, exit 0, and rebuilt production. Includes the existing specialized suites, 791 chemistry acceptance checks, four-level game regression (184 object/state combinations), new cardinal-pipe checks and new resource/content checks.
- All 105 final production assets returned HTTP 200 and matched disk bytes.
- Chromium source-browser checks: all ten waste items and ten processes, wrong/correct sorting, contamination blocking/clearing, replay/play/pause, map controls, future choices, comparison slider, Atlas solution selection, 390px mobile layout and reduced motion, incorrect elbow rejection and corrected Level 1 completion. No uncaught JS exceptions in exercised paths.
- Chromium production-browser checks: all seven visitor-tour steps and embedded interactions, replay/exit, moving material illustration, real pointer drag preview/drop and Level 1 completion. No uncaught JS exceptions.
- Inspected desktop Indore, mobile journey and fixed mobile game screenshots. Mobile page width stays within 390px; narration does not overlap the tap target.
- Engine, reaction data, global stylesheet, navbar and workspace-tools.js verified byte-identical to the original supplied ZIP. Existing LocalStorage schema unchanged.

An initial tour test tried to find a Dashboard-only shortcut after the browser restored an Atlas tab. The test was corrected to navigate to `#/dashboard`; no app workaround was required. Both wrong-orientation and successful game paths executed.

## Main implementation files

- `src/pipe-model.js`; changes to green-rescue-state.js, green-rescue-art.js, green-rescue.js and green-rescue.css.
- `src/indore-explorer.js`, `src/indore.css`, `src/assets/indore-district.json`.
- `src/resource-data.js`, `src/resource-art.js`, `src/resource-player.js`.
- `src/case-solutions.js`.
- Integration changes in `src/app.js`, `src/science-controls.js`, `src/index.html`.
- `scripts/test-pipe.mjs`, `scripts/test-resources.mjs`, and integration into `scripts/test-production.mjs`.

Full audit, original inventory, file comparison and browser evidence are in `/workspace/onboarding-records/` and `/workspace/onboarding-records/upgrade/`. The external browser scripts use Chromium's local DevTools socket and do not add npm dependencies. They are supplemental checks, not part of the portable npm suite.

Environment draft: install instructions retained; startup instructions updated to reflect the user's approval and this milestone. Draft persistence was confirmed after one transient save failure and a successful read/retry. Publication is separate and has not been performed by the agent. Netlify deployment still requires explicit permission.
