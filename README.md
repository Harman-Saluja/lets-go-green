# Let’s Go Green 2.0 — standalone project

**Latest exhibition review:** see [EXHIBITION-DELIVERY.md](EXHIBITION-DELIVERY.md) for the current features, exact counts, research blockers, executed tests and two ZIP formats. The reports and progress sections below are historical snapshots; their older browser limitations and asset counts are superseded by that delivery record.

This is the complete existing application, prepared for independent hosting. The interface, reaction datasets and chemistry engine are preserved. Nothing has been deployed by this export.

See **GREEN-RESCUE-2-REPORT.md** for the six-tab game overhaul, gameplay, executed tests and remaining browser checks. **PART-3-REPORT.md** documents the superseded game. See **PART-2-REPORT.md** for the integrated five-scene 3D Cinema, coverage table and browser-testing limitations. See **PART-1-REPORT.md** for the five-tab Chemistry Lab cleanup, map framing and comparison changes. See **PLATFORM-2-REPORT.md** for the prior 15-reaction library, Cinema, 36-region Atlas, sources, test results and limitations. Earlier upgrade reports are retained as history.

## Netlify settings

| Setting | Value |
|---|---|
| Framework | None: HTML, CSS and native JavaScript ES modules |
| Package manager | npm; dependency-free package and lockfile included |
| Build command | `npm run build` |
| Publish directory | `build` |
| Base directory | Repository root |
| Node | 24 recommended and configured; scripts require 22 or newer |
| Application environment variables | None |
| Server functions / database / API keys | None |
| Redirects | None required: hash-based tab/subsection navigation |

`netlify.toml` specifies the command, publish folder and Node version. See [Netlify configuration documentation](https://docs.netlify.com/build/configure-builds/file-based-configuration/).

## Run locally

Run `npm ci`, then `npm run dev`. Open the printed localhost URL. Changes are visible after refreshing; there is no hot-reload dependency.

Run `npm run build` for production, then `npm run preview` to serve the output. Both servers default to port 4173; stop one before starting the other, or use `npm run preview -- --port 4174`.

Run `npm test` to build and run the production regression suites, including 791 chemistry acceptance checks and the Platform 2.0 data/interaction harness. It writes `production-audit.json`. The full final output is in `PLATFORM-2-TEST-LOG.txt`.

Historical Part 3 HTTP results are retained in `part-3-http-audit.json`. Current production asset and browser checks are documented in `EXHIBITION-DELIVERY.md` and `EXHIBITION-VALIDATION.json`. Fullscreen, audio, physical-device and cross-browser testing remain open. No hosting deployment was performed.

## Deploy

For repository deployment, put the CONTENTS of this project folder at your repository root and connect that repository to Netlify. The included configuration supplies the correct settings.

For a manual upload, use the contents of the included `build` folder. It already contains the production-ready site, with `index.html` at its root. Do not upload the entire source project as the publish folder. The build is validation plus static copying; there is no compilation framework to install.

## Inspection and file map

- `src/index.html`: existing HTML entry point; loads `styles.css` and `app.js` via relative paths. Favicon is an inline SVG data URL.
- `src/app.js`: all eight tabs, demo selection, input processing, shared state, rendering, Optimize/Apply/Compare and History. Navigation changes `state.tab`; there are no `/analyze` or other pathname routes. Refreshing `/` restores the stored tab and state.
- `src/data.js`: reference cards, principles, 12 curated demo reactions, historical datasets, formulas, provenance, source links and structured optimization metadata.
- `src/engine.js`: shared metrics, educational Green Score, thermal proxy, recommendations and comparison rules. No remote model or chemistry API.
- `src/styles.css`: existing dark/green design, typography, responsive styles and transitions. Icons are text/CSS and the inline favicon; no image library is needed.
- `src/fonts/`: the same DM Sans and Manrope fonts, now self-hosted with their OFL licenses. Normal operation makes no external font requests.
- `scripts/build.mjs`: syntax-checks JavaScript and verifies local asset/import references before copying `src` to `build`. No minifier or transformation changes application semantics.
- `scripts/serve.mjs`: development/production-preview HTTP server, using Node built-ins only. Not deployed or needed on Netlify.
- `test.mjs`, `scripts/test-production.mjs`: acceptance suite and production test wrapper.
- `RESEARCH.md`, `reaction-audit.json`: original research and earlier audit retained.

The original project had no package.json, lockfile, package manager, build system, TypeScript or third-party JavaScript dependencies. This export adds npm scripts without introducing runtime dependencies. All package imports in tooling are built-in `node:` modules.

## Persistence and independence

Browser storage uses `lgg.v1`. It contains the current reaction, proposed scenario, comparison baseline, saved history and view preferences. Calculations rerun locally. Storage failure has an existing user-facing fallback message.

LocalStorage belongs to each browser AND origin. History at the former ChatGPT Sites address does not automatically appear at a new Netlify address. New Netlify history persists across refreshes on the same domain; changing domains or clearing browser data changes that storage context. There is no cross-device database or account sync.

The optional `document.modelContext.registerTool` integration is guarded with feature detection and error handling. Ordinary browsers do not need it. No Sites SDK, authentication token, preview server, environment variable or hosting API is used by the application. Sites repository credentials and hosting metadata are excluded from this export.

Reference-source hyperlinks open external reading materials; they do not supply runtime calculations. Educational assumptions and the engine’s existing scientific limitations are unchanged.

## Green Score v2 and motion update

Planned weights: atom economy 20%, RME 15%, E-factor 15%, PMI 10%, yield 10%, solvent 10%, energy 10%, safety 6%, catalyst 4%. Safety and catalyst are N/A pending sufficient evidence; neither receives an invented score. Waste is already represented by E-factor and PMI, with no additional cleanliness bonus. Available weights are normalized. Correlated metrics remain educational choices, not independent scientific evidence.

Percentage metrics use their percentage values. E-factor score = 100/sqrt(1+E); PMI score = 100/sqrt(PMI). These continuous, monotonic educational mappings reduce compression of high material-intensity values. Existing solvent mapping and thermal proxy remain unchanged. The weighted result displays one decimal. Historical inputs recalculate with v2, so old screenshots and presentation scores are outdated. Starch now scores 78.0 → 80.3 for the existing 100 g → 60 g auxiliary-water scenario.

Compare includes original-to-proposed score/gauge motion, card reveals, favorable metric highlights, and normalized waste/thermal bars. Animations use actual results, allow decreases and unchanged results, respect reduced motion, and do not mutate reaction state. Catalyst or feedstock identity alone earns no bonus.

Validation: production build; all 926 existing integration assertions across two complete library passes; extra weighted-score and mock-animation tests. Browser installation returned a corrupt download, so rendered layout, real-browser console and perceived smoothness could not be verified in this environment. No live deployment was performed. Run npm test to reproduce automated checks.

## Fix for a missing source directory on Netlify

The source directory is now named `src/` (previously `dist/`, a name often treated as generated output). Commit the entire `src/` directory, including fonts, plus `scripts/`, package files and `netlify.toml`. Place these directly at the repository root, not inside another project folder. Build command remains `npm run build`; publish directory remains `build`. The build output can be ignored by Git; source cannot.

For a manual deployment, upload the included `build/` directory contents as the site. This bypasses the build step.

## Minimal/glass refinement

The interface now uses a light solid base and selective translucent navigation, score and comparison panels. Forms and long data sections stay solid. No new runtime dependency or chemistry formula was added. Score arithmetic now retains full precision; rendering alone formats scores, category contributions and signed differences to one decimal. Changed metric values animate, unchanged ones stay still; original/proposed cards enter from opposite sides, with data-based highlights and reduced-motion support. The Apply status accompanies immediate recalculation rather than delaying it behind a loading screen.

The production and mock-DOM/motion tests cover all twelve cases, history, formatting, motion endpoints and directional scores. A browser executable is unavailable in this environment; real-browser layout, console and smoothness have not been verified.

## Dark-theme navbar update / Vercel

The dark green palette is restored from the original project stylesheet (commit bc548fd). The supplied anime-navbar reference is adapted to native ES modules in src/components/ui/anime-navbar.tsx. This file deliberately uses JavaScript-compatible syntax without JSX, React, Tailwind or Next dependencies; the build syntax-checks and emits it as .js. The dev server resolves that module to the same source. Its button actions use the existing state.tab navigation handler; there is no link navigation to suppress. Keyboard activation, aria-current, mobile two-row layout, resize positioning and reduced motion are supported. The mascot and pill use finite damped spring frames.

Vercel configuration: framework Other, npm run build, output build. No SPA route rewrite is required because navigation uses state, not URL paths. This package preserves the previous Netlify configuration too. No deployment was made. Production and all-tab DOM tests pass; a real browser executable is unavailable, so rendered overlap/smoothness and browser console checks remain unverified. Chemistry engine and reaction data were byte-compared unchanged.

## Exhibition content update

The shared library now contains 17 selectable entries: the original 12 complete educational accounting cases plus five limited industrial reaction models (ammonia, contact-process SO₂ oxidation, CO-route methanol, CO reduction of iron oxide, and steam methane reforming). Archived templates remain preserved. The scope selector supports overlapping Bio & General Chemistry / Engineering & Industrial Chemistry membership without duplicating reactions; chemical-category filtering and text search are retained.

`src/exhibition-data.js` holds separate educational profiles, references and the five new records. Every selectable reaction has a 40–70-word overview, applications, environmental considerations and green-chemistry opportunities. Expand the reaction context in Analyze or the opportunities section in Optimize. Dashboard adds a compact engineering-scope disclosure. Compare explains actual available differences without estimating emissions or measured energy.

Industrial quantities are **Educational Assumptions**: a 10 mmol stoichiometric extent and 75% target yield, not reported conversion or operating recommendations. Formula masses and theoretical quantities are derived. These records describe individual reaction steps, not complete plants. They support AE, assumed yield and RME. Full inventory, E-factor, PMI, measured energy, emissions, quantitative hazard/catalyst ratings and paired optimization results are unavailable. Reference operating context is descriptive; no universal temperature/time is inserted. Qualitative opportunities do not generate automatic changes; manual what-if comparisons remain available. The existing 12 quantitative educational optimization scenarios are unchanged.

Validation: `npm test` builds production, tests all 17 entries across eight tab renderers and browser-storage save/restore in a mocked DOM, verifies both scope filters, checks all five new elemental equations and molar masses independently, checks missing-data behavior and manual yield responsiveness, and runs the original 926 checks including two full 12-case passes. Motion, score formatting and navbar harnesses pass. Before/after comparison confirmed unchanged engine, CSS, navbar and original 12 reaction objects. Actual browser layout, mobile rendering and browser-console testing were not available; those are not claimed as passed. Existing responsive styles are reused without CSS edits.

Vercel configuration remains unchanged: `npm run build`, output `build`, framework Other, Node 24 recommended. No new dependencies or environment variables. No deployment was performed.

## Meet the Team

The Dashboard now ends with five locally hosted circular portraits and name-only tooltips: Harman Saluja, Disha Makkar, Durgesh Asati, Harsh Shinde, Dipanshu Yadav, in that order. Hover or keyboard focus reveals a name; tap toggles it; Escape or an outside click dismisses it. The wrapping row and motion preferences use scoped `team.css`; global styles, navbar, datasets and calculations are unchanged. Original photographs are unchanged files in `public/team/`, copied to `/team/` during build. Lazy loading, asynchronous decoding and explicit dimensions avoid loading them before needed and reserve their space.

Added files: `src/team.css`, `src/team.js`, `scripts/test-team.mjs`, and five photos. Integration changes: `src/app.js`, `src/index.html`, build and development server scripts, test runner and this README. No dependencies added. Vercel still publishes `build` using `npm run build`.

Validation: full existing production test suite (926 checks and additional score, exhibition, navbar and motion tests) passed. Team DOM harness checks exact names/order, Dashboard-only placement, hover entry/exit, touch toggle, keyboard focus and Escape, and dismissal. All five photo URLs returned HTTP 200 with image/jpeg in both production and development servers; deployed bytes match uploads. Responsive/reduced-motion CSS was checked, but actual browser visual rendering and mobile interactions remain unverified because the browser download failed in this environment. No live Vercel deployment was performed.

## Interactive exhibition experiences — focused revision

Reaction Journey was removed completely from Analyze, including its specific Play/Pause/Replay controls, animation handlers and styles. The existing equation, forms and calculations remain.

The existing 12-segment Principles Wheel now uses restrained SVG/CSS depth: segments lift on hover and remain elevated after selection. Clicking/tapping another segment changes the selection and existing information panel. Arrow keys, Home/End and Enter/Space remain supported. Pointer tilt is bounded to four degrees, resets on exit, and is disabled for touch and reduced motion. Reduced motion retains the clear selection outline without transforms. Names, explanations, examples and principle order are unchanged.

The existing Green Score gauge retains full engine precision and one-decimal display. It remembers the last displayed score across tabs without gauges and smoothly animates genuine changes in the number and ring. Only increases receive a brief highlight; decreases and unchanged values do not. Missing/invalid states remain unavailable. Earlier animation frames are cancelled on rapid updates. Existing factor rows now disclose the actual subscore, calculated contribution, active weight and engine explanation on hover/focus/click/tap or Enter/Space. Unsupported factors remain N/A in the existing methodology details.

The Before/After slider renderer, control function and CSS rules were compared against their previous versions and are unchanged. Global CSS, datasets, engine, navbar and team code were hash-checked as unchanged. No dependencies, global theme changes, new tabs or scoring changes.

Changed source: `src/app.js`, `src/experiences.js`, `src/experience-controls.js`, `src/experiences.css`; updated `scripts/test-experiences.mjs` and README. Production output regenerated.

Validation: production build and full regression suite passed (original 926 checks plus existing production suites). New DOM/animation-clock tests verify removal, 12 persistent wheel selections, keyboard wrapping, hover not changing selection, bounded tilt/reset, touch/reduced-motion suppression, actual-score transitions in both directions, zero/missing/rapid updates, score continuity across tabs and factor disclosure. All 17 reaction workflows continue to render and save/restore in the integration harness. These are not browser visual tests: actual 3D appearance, mobile layout and browser-console QA remain unverified in this environment.

Vercel settings remain `npm run build` with output `build`; no external deployment was performed.

## Navigation shortcuts and educational workspaces

Added optional Analyze / Compare / Principles dropdown shortcuts, while keeping all eight direct tab buttons and the existing mascot/animation component. A separate chevron supports touch; Arrow Down opens shortcuts, Escape closes them, and outside click/focus closes them. Visible subsection controls duplicate access inside each parent section. Hash URLs such as `#/analyze/simulator` support direct entry, refresh and browser back/forward without server routes. Compare and Principles shortcuts scroll to the existing visuals rather than replacing their content.

Analyze → Reaction Simulator keeps a separate original snapshot and temporary what-if draft. Supported quantities, assumed yield, solvent/catalyst classes, temperature, time and process boundary inputs run through the unchanged engine. Invalid inputs retain the engine's unavailable state. Reset restores the snapshot; Send to Compare explicitly copies the draft into the existing comparison object and rejects a stale original. It never overwrites original reaction inputs or history automatically. Refresh discards unsent temporary assumptions. Changes are educational inputs, not compatibility validation or experimental predictions; changing solvent/temperature cannot change atom economy.

Analyze → Industrial Process Explorer adds referenced qualitative diagrams for ammonia synthesis (five stages) and natural-gas hydrogen production (three stages). Stage selection, Next/Previous and Overview expose explanations and environmental trade-offs. The three other industrial entries explicitly lack stage diagrams. Hydrogen reaction metrics remain scoped to the existing reforming equation, not the full shift/purification route. No plant yields, energy consumption, operating values or numerical improvements are inferred.

Changed source: `src/app.js`, `src/index.html`; added `src/workspace-tools.js`, `src/workspace-nav.js`, `src/workspace-tools.css`. Test integration changed in `test.mjs`, `scripts/test-standalone.mjs`, `scripts/test-production.mjs`; added `scripts/test-workspaces.mjs`. README and generated build/audit output updated. No dependencies added.

Validation: production build and full regression suite, including all 17 simulation edit/reset/compare flows, original-data isolation, invalid yields, unchanged atom economy, stale comparison prevention, subsection routes/back navigation, all eight process stages and dropdown mouse/touch/keyboard event handlers in a mock DOM. Theme CSS, navbar component, engine, reaction datasets, existing wheel/slider/score interaction files and team files are byte-for-byte unchanged. Real-browser visual, touch-device layout and console checks remain unverified; no Vercel deployment was performed. Vercel build command remains `npm run build`, output directory `build`.

## Exhibition polish — glass wheel, language and spacing

The existing Principles Wheel now has local teal/cyan SVG glass gradients, illuminated bevels, pointer-responsive reflection arcs, raised hover/selected segments, a short entrance reveal and a frosted information panel. All twelve official names, keyboard selection and touch selection remain; the panel uses concise explanations and examples. Mouse tilt stays bounded to four degrees. Touch and reduced-motion preferences disable pointer tilt; reduced motion suppresses the new transforms and animations. No animation dependency was added.

Metric cards retain scientific labels and display one short definition. Status badges use simpler wording while retaining estimate labels. Every tab has a compact expandable Quick meanings guide, including simulator/process vocabulary under Analyze. Reactant/product and solvent/catalyst introductions are clearer. Existing formulas, quantitative outputs, provenance, limitations and reference content remain. Scoped spacing rules give major sections 24px desktop / 20px mobile separation, including Automatic Analysis → Reaction Identity, and align related editor/asides without changing page width or global theme variables.

Files changed: `src/app.js`, `src/experiences.js`, `src/experience-controls.js`, `src/index.html`; added `src/exhibition-polish.css`. Updated `scripts/test-experiences.mjs`, the UI wording assertion in `test.mjs`, this README, and generated production output/audit. Global theme CSS, engine, datasets, navbar component, dropdown controls, simulator/process logic and team code are unchanged.

Tests actually run: successful production build; full regression suites (926 original checks plus production, 17 reaction/simulator workflows, wheel/score/slider/navbar/team tests); new checks for twelve glass segments/reflections, pointer-light bounds/reset, accessibility state and plain-language/spacing markup. Static CSS checks cover responsive/reduced-motion rules. These are mock-DOM and code checks: the visual glass appearance, real mobile layout and browser-console behavior have not been verified in a real browser. No deployment was performed. Build remains `npm run build`; Vercel output remains `build`.

## Molecular Viewer, Impact Atlas and Process Explorer 2.0

See `SCIENCE-UPGRADE.md` for the full source ledger, file inventory, implementation choices, testing results and limitations. Adds locally bundled PubChem structures with lazy 3Dmol viewing; a ninth Impact Atlas tab with a Canvas-projected Earth, five documented case categories and manual world tour; and all five industrial guides with 22 stages, SVG equipment and Presentation Mode. Existing calculations and datasets remain unchanged. Production build and regression harnesses pass. Real-browser/WebGL/touch/visual acceptance checks remain blocked by a truncated browser download; the upgrade has not been deployed.
