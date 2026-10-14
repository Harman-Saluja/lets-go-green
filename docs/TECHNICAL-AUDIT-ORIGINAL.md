# Let's Go Green — technical audit and proposed upgrade

14 October 2026. Scope: restore the supplied project, verify build/tests, audit existing behavior, and plan the upgrade. No exhibition implementation, commits, or deployments.

## Restoration

All 264 ZIP files were reconciled into `/workspace/lets-go-green`, stripping only the outer `lets-go-green-netlify/` folder. `src/`, `scripts/`, `public/`, package.json and netlify.toml are now at the repository root. Seven existing files were identical. The sole differing existing file was README.md: its original one-line contents are preserved in `README.before-zip.md` beside this report, and the complete archive documentation replaces it. See `extraction-manifest.json`.

Archive entries were checked for path traversal, absolute paths, symlinks and Git metadata. A post-test byte comparison found no differences from the ZIP, including regenerated build/audit outputs. No application source was edited. The restored files are uncommitted, mostly untracked; GitHub main still lacks them. Preserve them in the cloud snapshot and do not discard them with git clean/reset.

## Architecture and existing features

Native HTML/CSS/JavaScript ES modules and custom elements; no React, Next, Vite or npm runtime dependencies. Node 24.19.0 matches .nvmrc and Netlify. npm 11.9.0 is installed. No application environment variables, credentials, API backend or database are required. Maps, fonts, portraits, flags, structures and the vendored 3Dmol library are local. External references are reading links.

Entry: `src/index.html`. `src/app.js` owns central state, event delegation, rendering and chemistry/history workflows. Dedicated modules own maps, science views, process exploration, cinema, principles/comparisons, navigation and the game. The navbar .tsx file deliberately contains JavaScript-compatible syntax, not JSX; build emits it as .js, and dev resolves that alias.

| Main navigation | Existing tools/subsections |
|---|---|
| Dashboard | Guided chemistry analysis, reaction/library entry, scores, game entry, team |
| Chemistry Lab | Analyze, Optimize, Compare, Industrial Process Explorer |
| Analyze | Reaction Analysis and Reaction Simulator; contextual solvent/catalyst panels |
| Compare | Reaction Comparison and Before/After Slider |
| Solvents/Catalysts | Full browsers reachable from Lab contextual panels and legacy routes |
| Principles | Overview and interactive 12-principle wheel |
| History | Saved reaction loading, comparison and deletion |
| Impact Atlas | World, India, Madhya Pradesh; seven filters; chart and three tours |
| Green Rescue | Isolated same-origin iframe, four sequential levels |

There are six actual main tabs; Analyze/Compare/etc. remain internal legacy tab names. Hash routing supports canonical Chemistry Lab and old routes, plus popstate/hashchange. No server SPA rewrite is needed.

Main state uses a plain object and LocalStorage `lgg.v1`: reaction, comparison overrides/baseline, history, preferences and guide state. Simulator drafts are isolated. Atlas tour progress lasts while the component remains open. Game state does not modify chemistry. Preserve storage compatibility and the existing missing/invalid-data handling.

Theme uses cascading CSS, dark green overrides, green accents, selective glass panels, local DM Sans/Manrope and the original mascot. The first CSS root contains older light defaults; later overrides produce the confirmed dark appearance. Use scoped styles and computed appearance, not a global rewrite.

Animations include navbar spring frames, metric interpolation, comparison reveals, principle-wheel effects, Canvas globe, SVG process flows, 3Dmol iframe cinema and CSS/SVG game scenes. Reduced-motion branches exist and need regression protection.

Maps are custom: orthographic Canvas globe in atlas-globe.js; SVG regional renderer in atlas-regions.js. Local Natural Earth country geometry/anchors and geoBoundaries regions are bundled. World supports drag/keyboard rotation, zoom/reset and rotation controls. Regional maps support selection, padded viewBox fitting and reset, but are not yet a free-pan city map. There are 36 Indian regions and 50 historical MP district shapes, explicitly not current legal survey geometry. Existing country anchors/region locators are not facility coordinates.

Build syntax-checks JavaScript and local references, copies src to build, copies public/team and emits the navbar alias. Output: 97 files (92 source assets plus five portraits). Netlify and Vercel use `npm run build`, output `build`; Netlify pins Node 24. Local build success is not a remote deployment result.

## Chemistry audit

15 active reactions: four biochemical, six core, five industrial. Ten educational accounting cases have structured optimization; five industrial reaction models deliberately lack full plant inventories. Historical entries remain archived for compatibility. Older reports claiming 12 or 17 active entries are superseded by the current source.

engine.js computes atom economy from balanced target stoichiometry, limiting-reactant theoretical yield, yield, RME, PMI and E-factor with declared boundaries. Missing/invalid inputs remain unavailable. Water is included in mass accounting. E-factor = PMI - 1 applies only where the accounting assumptions support it, not universally for arbitrary entered waste/recovery data.

Green Score weights: atom economy 20%, RME 15%, E-factor 15%, PMI 10%, yield 10%, solvent 10%, energy 10%, safety 6%, catalyst 4%. Available weights normalize; safety/catalyst are unavailable. The energy index is abs(T-25) × hours, an educational proxy rather than kWh. Solvent mappings and simulated optimizations are educational, not experimental evidence. No justified calculation change was identified.

Five industrial guides contain 22 stages: ammonia 5, hydrogen 3, contact process 5, methanol 5, iron 4. Cinema has five scenes, play/pause/replay, previous/next, rotation/reset and fullscreen. There are 22 molecular identity records and 12 principles. Preserve these, simulator isolation, comparison slider, score factors, library and history. The existing guided chemistry flow/presentation mode is not the requested whole-site exhibition mode.

## Atlas coverage

These are records, not verified facility sites or complete case studies. MP is a subset of India.

| Category | World | India | MP district view | Unique combined |
|---|---:|---:|---:|---:|
| Plastic Waste | 1 | 36 | 0 | 37 |
| Water Pollution | 1 | 4 | 4 | 5 |
| Air Pollution | 1 | 2 | 1 | 3 |
| Industrial and Hazardous Waste | 1 | 0 | 0 | 1 |
| Electronic Waste | 2 | 0 | 0 | 2 |
| Carbon / Greenhouse-Gas Emissions | 1 | 0 | 0 | 1 |
| Soil Contamination | 0 | 1 | 1 | 1 |

50 unique IDs. All have baseline problem/cause/importance/connection/improvement/source/period fields. No category is entirely empty across all views. World soil is empty; India hazardous/e-waste/carbon are empty; MP plastic/hazardous/e-waste/carbon are empty. MP has a state plastic inventory in India view, but no district plastic case in MP view. Plastic inventories contain 34 numerical historical records and two qualitative records, not 36 precise pollution sites.

Existing manual tours: World 7, India 10, MP 6 stops; start/resume, previous/next, restart/exit. Category-based tours are not implemented. An older report claiming no carbon coverage is stale: Australia's HFC phase-down exists.

## Incomplete case-study inventory

All 50 entries fall short of the new requested per-stage depth: meaning, mechanism, importance, example, limitations and evidence. That does not mean every entry is empty or false. The full record inventory with text, IDs and source URLs is in `atlas-inventory.json`.

| Cases | Required expansion |
|---|---|
| US plastics | Prevention, return/take-back where relevant, reuse/recovery mechanisms, examples and trade-offs |
| Minamata | Food-chain mechanism, prevention versus historical remediation, progress and limits |
| London smog | Combustion/weather mechanisms, sourced historical response, current extrapolation limits |
| Love Canal | Source prevention, containment/remediation, monitoring and residual constraints |
| Agbogbloshie | Collection and authorized recovery, exposure prevention, historical/current distinction; no unsafe dismantling |
| Germany e-waste | Repair/reuse/take-back, controlled treatment, examples and collection limits |
| Australia HFC | Substitution, leak control, energy trade-offs, policy versus measured outcomes |
| Khan River/Indore | Sewage prevention, infrastructure/treatment/reuse, dated monitoring and uncertainty |
| Singrauli | Specific control measures; planned actions versus demonstrated completion |
| Bhopal | Sampled-site/historical boundary, assessment and remediation without invented present status |
| Ujjain, Jabalpur/Kathonda, Gwalior/Jalalpur | Replace shared generic treatment sentence with documented context; distinguish capacity and throughput |
| Delhi NCAP | Programme membership versus outcomes; measures, implementation and limitations |
| All 36 state/UT plastic inventories, india-plastic-0…35 | Shared generic explanations need expansion; retain inventories as inventories and add site cases separately |

Current pathway buttons are Source / Pathway / Consequence / Prevention. The plastic prevention caption is “Prevent, reuse, recover”; a literal Return/Prevent/Reuse/Recover four-card interface is not present in this ZIP. Every category shares its conceptual pathway, rather than a case-specific process.

No duplicate IDs or absent baseline fields were found. Sources/periods were inspected, but factual claims were not freshly reverified against authoritative publications. Existing “checked” dates belong to the archive, not this research session.

## Green Rescue diagnosis

The actual game is equipment placement, not a rotatable pipe grid. No orientation state, four-elbow model, grid coordinate system or directional connection validator exists.

`green-rescue-art.js:10` defines one pipe path, `M-49 -17H17V-43H49V16H-49Z`, with West and North openings. Selection and pointer ghost use partArtwork('pipe'); placement uses the same SVG with positive uniform scale(.7). No mirroring transformation was found.

The route travels down into the socket and exits right: North + East is required. The West + North artwork does not align with that route. Desktop screenshots confirm the mismatch. It looks reversed relative to the required connection, but does not actually flip on placement. Success checks only the pipe/treatment done flags, so the visual defect cannot fail connectivity logic.

Level 1 was solved in real headless Chromium using UI click events and actual timers: start → begin → pipe → socket → treatment → tap → LEVEL COMPLETE. All four levels passed the existing automated state/controller suite.

After approval, use one N/E/S/W connection model for artwork, preview/ghost/placement and socket validation; verify NE, ES, SW, WN. Preserve all four levels. Adding rotation gameplay would be an extension to this game, so agree how it fits the existing interaction rather than assuming a grid already exists.

Additional visual finding: at 390px width, the bottom action hint overlaps the OPEN TAP button/label. Fix in the approved usability phase. Physical touch/drag is not certified by this click-event browser run.

## Proposed Indore layout and interactions

Keep the dark identity. Dashboard and Atlas → India → MP entry points lead to a city map beside a large selected interactive scene, with shared journey/timeline controls below. Mobile stacks map and scene. Short explanations and expandable evidence keep the visual first. Reuse SVG/local geometry, native sliders, playback patterns and existing map concepts. Country anchors cannot serve as city site coordinates. No heavy engine/new dependency is justified yet.

Prototype Devguradia fully before scaling: verified marker, smooth focus, segregation scene, clickable treatment stages, outputs, evidence, related journey, accessible playback and mobile layout. Assess it as an exhibition rather than a text panel.

| Candidate | Distinct interaction | Research gate |
|---|---|---|
| Devguradia | Follow segregated streams through treatment/recovery | Actual facilities, coordinates, dates and capacity scope |
| Choithram Mandi | Remove contamination and follow vegetable waste | Documented market waste route |
| Kabitkhedi | Interactive actual treatment flow | Verify process; do not assume biomethanation |
| Nehru Park | Organic matter/soil layers | Verified local association or labelled education/replacement |
| Regional Park | Compost inputs and maturation | Verify programme; no invented operating values |
| Rajwada | Scrubbable public-participation timeline | Citywide evidence, not invented landmark transformation |
| Sarafa Bazaar | Food/packaging choices and handling routes | Landmark coordinates; educational-scenario label |
| Chappan Dukan | Packaging/reuse comparison and segregation | Separate general education from local claims |
| Crystal IT Park area | Construction-material sorting/recovery | Publish only if local connection is documented |
| Tenth documented site | Distinct water/resource-recovery scene | Select after authoritative research |

Shared planned modules: location/source registry, city-map controller, scene shell, accessible playback, timeline, comparison slider, material/process renderer, evidence panel, tour controller, qualitative Future Indore scene and exhibition navigation. No new dependencies selected. Future Indore stays hypothetical with no invented numerical forecasts.

## Phases, tests and risks

1. Obtain approval for implementation; this restored ZIP is the baseline.
2. Fix pipe consistency/mobile overlap and expand the case-study content schema. Test orientation mismatch, not just success flags.
3. Research/expand sparse Atlas categories toward three complete cases each where evidence permits; retain inventory/site distinctions and publish only populated tours.
4. Build and evaluate the complete Devguradia prototype before scaling.
5. Add verified locations, 8–10 milestones/comparisons/stories and future concept, with explicit evidence-based exceptions if necessary.
6. Implement ten material-specific waste journeys and 8–10 process stories, including contamination/limits and authorized hazardous/e-waste handling.
7. Add the 60–120-second exhibition sequence, Dashboard shortcuts, Explore/Advanced Lab modes and targeted cinema/process/principles/history improvements. Preserve calculations/storage.
8. Run regression, source/coordinate/content checks, old storage compatibility, keyboard/touch/mobile/reduced-motion checks, all game levels, WebGL/fallback/cleanup and production build/HTTP validation. Deploy only with separate explicit approval.

Research gaps: exact Indore locations, facility identity and operation, capacity versus throughput, source titles/publication/reporting dates, historic milestones, authentic licensed imagery, current status. Prioritize IMC, Smart City, MoHUA/SBM, CPCB/MPPCB, NITI Aayog and primary research. Replace unsupported candidates rather than inventing facts.

Risks: broad app.js rendering/event coupling, component teardown and duplicate timers/listeners, map async selection, iframe performance, touch targets, animation-only explanations, changed storage schemas, stale map boundaries and conflating educational chemistry with measured environmental outcomes. Use scoped CSS, shared structured data, lazy assets and phase-specific regression tests.

## Validation evidence and limits

- npm ci: passed; no dependencies added.
- npm run build: passed, exit 0.
- npm test: passed, exit 0; build, 14 specialized suites and production chemistry acceptance. Final chemistry suite reports 791 assertions including two 337-check passes through ten full educational demos. Other suites are additional, not included in that count.
- Tests cover scores, motion, six-tab navigation, profiles, portraits, principles/comparison, simulation/routes, 22 process stages, region maps, platform/tours, cinema renderer API and game. Game checks 184 object/state combinations, four successes and eight failure routes.
- All 97 production assets: HTTP 200 and exact disk-byte match.
- Dev root, app module, navbar alias, public portrait and game: HTTP 200.
- Headless Chromium 154: main-tab smoke checks, US Atlas selection, Level 1 completion, desktop and emulated-mobile screenshots. No uncaught exceptions in exercised paths. Mobile Dashboard width 390px, scroll width 390px.
- Screenshots inspected: Atlas desktop; game before/placed/complete; mobile Dashboard and game. Not exhaustive visual certification.
- Physical touch/browser dragging, audible output, exhaustive WebGL/fullscreen, all mobile screens, remote deployment and fresh-task restoration remain unverified.

The first browser harness expected textual content in every main panel; the game correctly contains an iframe. The external audit harness was corrected and rerun successfully. No app change was needed.

## Status

Completed: reconciliation, environment setup, build/tests, local HTTP, limited real-browser verification, audit and plan. Saved environment draft: install_script and start_skill with tested commands and instructions to preserve restored untracked source. Review/save in environment settings and publish the cloud environment when desired; this is separate from deploying the website and has not occurred here.

Not implemented: exhibition upgrade and identified bug fixes. New location research remains pending. No commit or deployment. Await approval before application changes.
