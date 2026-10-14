# Let’s Go Green 2.0 — Part 1

## Delivered

Exactly five main navigation entries: Dashboard, Chemistry Lab, Principles, History, Impact Atlas. The existing navbar component, mascot, colors, typography and animation code are unchanged. A scoped CSS rule fits the five items; mobile wraps them into three columns.

Chemistry Lab contains Analyze, Optimize, Compare and Industrial Process Explorer. Reaction Simulator remains available within Analyze. Compare retains its detailed comparison and slider subsections. Solvent and catalyst assessments now appear in expandable contextual panels in Analyze and Optimize. Their full reference browsers remain reachable inside the Lab, including from old links; they are not main navigation tabs. Existing reaction state, history, saved comparisons and calculations are retained. New canonical Lab hashes coexist with old Analyze/Optimize/Compare/Solvents/Catalysts hashes and browser-back navigation.

## Reaction curation and completeness

Original count for this Part 1: **15**. Final count: **15**. The prior release already curated the collection from 17; no further scientifically useful reaction was removed merely to reduce the count.

- Biochemical (4): Sugar hydrolysis; Starch hydrolysis; Glucose isomerization; Lactose hydrolysis.
- Core (6): Citric acid–bicarbonate neutralization; Acetic acid–bicarbonate neutralization; Calcium lactate formation; Calcium carbonate precipitation; PLA hydrolysis to lactic acid; PET hydrolysis to terephthalic acid.
- Industrial (5): Haber–Bosch ammonia synthesis; Contact process sulfur dioxide oxidation; Methanol synthesis via carbon monoxide; Iron oxide reduction via carbon monoxide; Hydrogen production by steam methane reforming.

No newly archived reactions. The earlier archives of cellulose hydrolysis, isomaltulose formation and tagatose formation remain recoverable and saved records remain analyzable. `archive/part-1/` contains the pre-change reaction data and affected application modules. The reaction dataset is byte-identical before/after Part 1.

Ten educational process scenarios have complete accounting and applicable structured optimization comparisons. Their quantities are labeled educational assumptions. Five industrial models have equation-level atom economy, assumed yield and RME, but lack complete plant inventories; unsupported E-factor, PMI and plant energy remain unavailable. No experimental values, catalyst performance or optimization savings were invented. Existing tests verify equations, molar masses, metric boundaries and edits. Detailed sources/provenance and the complete earlier audit remain in `PLATFORM-2-REPORT.md`.

## Industrial Process Explorer

The selector now includes **only the five industrial processes listed above**. Selecting the explorer while a biochemical/core reaction is current opens the supported ammonia process instead of a nonindustrial overview. This does not overwrite the current reaction. All five process diagrams, 22 stages, explanations, scientific references and presentation controls remain. No sixth incomplete process was added.

## Comparison improvements

The reveal slider retains its native mouse/touch/keyboard range control and reset. Added persistent metric cards with signed numerical differences, arrows, favorable/unfavorable/unchanged text, and two relative bars. Green indicates a genuinely favorable metric; muted amber indicates a less favorable metric. Unavailable and different-target comparisons are neutral. Slider movement changes the after-bar emphasis smoothly; the numbers remain actual engine results. Small changes are not converted into inflated percentages. Full original comparison tables and scientific caveats remain.

Bars compare each metric within its own before/after pair; they are not cross-metric scales or industrial impact measurements. Existing display precision is retained. Reduced-motion CSS disables the added bar transition.

## Atlas coverage and camera fixes

All 36 stored Indian state/UT boundaries remain selectable and associated with sourced records. There are 34 numerical plastic-waste records and two honest qualitative records (Meghalaya and Sikkim). Records retain units, source and year. Seven categories remain, without implying that every region has data for all seven. No new scientific records or environmental statistics were introduced in Part 1.

The regional SVG fits each complete projected geographic bounding box with padding and centered aspect-ratio preservation inside its own panel. Marker radius is now bounded by the selected viewport size; only the selected region’s marker remains when zoomed. This prevents a fixed-size marker obscuring a small UT. The unnecessary repeated globe zoom-in when entering India/MP was removed. Geographic viewBox transitions are brief and disabled under reduced-motion preference. Mathematical fit checks cover all 36 regions, including multi-part boundaries. Actual desktop/mobile visual framing remains unverified without a browser.

World (7 stops), India (10 stops) and MP (6 stops) tours remain separate and retain their next/previous/restart/exit controls. The global countries, seven local flags, chart, environmental diagrams, sources and case studies are preserved. The map is simplified educational geography, not a legal boundary document; the MP layer still represents 50 historical districts. No current administrative completeness or current pollution ranking is claimed.

## Icon audit and future work

The baseline had nine main navigation glyphs, not an identifiable set of 17 decorative emojis. There are now five main-navigation glyphs; seven functional environmental categories remain. Functional controls, molecular symbols and country flags were not deleted to meet an arbitrary count.

No premium 3D Reaction Cinema or Green Rescue game was implemented. The existing basic cinema and its ID-linked scene data remain intact for later replacement/extension. A nonvisual insertion comment identifies a future Dashboard game-entry location after the scope section; no placeholder card changes the current layout.

## Validation

Three bounded passes covered functional changes, data/regression checks, and final usability refinement. Early test failures were outdated navbar expectations and a test selector that did not account for an existing trailing class-space; these were corrected to assert exactly five tabs and the real active Lab state.

- Final production build: **passed**, 81 static source assets plus five photographs = **86 files**.
- Full automated suite: passed, including **791 chemistry acceptance checks**, two accounting passes through ten complete demos, all 15 analysis/save/restore flows, score/compare/principles/team/navigation regressions, all tours and all sourced regions.
- After final scoped navbar/secondary-navigation refinements: rebuilt production and reran standalone, workspace and Part 1 tests successfully.
- Additional explicit checks passed for Chemistry Lab main entry, contextual panels, old/new routes, five industrial options, all 36 complete boundary fits, bounded markers, and improved/worsened/unchanged comparison states.
- All **86** final production files returned HTTP 200 and matched disk bytes.
- Chemistry engine, reaction dataset, global styles, navbar/mascot component, workspace menu controller, team component and team stylesheet verified unchanged.

Tests use Node DOM/Canvas/clock harnesses, data assertions and local HTTP. A real browser was not available: visual layout, real-device touch, browser fullscreen/WebGL, runtime console and measured animation performance are **not certified**. No Vercel/Netlify deployment was performed. Existing Vercel static configuration remains: `npm run build`, output `build`, Node 24 recommended, no application environment variables.

## Changed files

Runtime: `src/app.js`, `src/workspace-tools.js`, `src/science-controls.js`, `src/atlas-regions.js`, `src/experiences.js`, `src/experience-controls.js`, `src/index.html`; new scoped `src/part-1.css`.

Tests: `scripts/test-standalone.mjs`, `scripts/test-navbar.mjs`, `scripts/test-production.mjs`; new `scripts/test-part-1.mjs`.

Delivery: README, this report, test log, HTTP audit, recoverable `archive/part-1/` copies and regenerated `build/`.

No dependencies added; no chemistry formulas, Green Score weights or datasets changed.
