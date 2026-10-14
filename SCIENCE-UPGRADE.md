# Science experience upgrade — implementation and evidence

## Architecture and preservation

The existing app remains native JavaScript/HTML/CSS, using its current state, hash routes and `lgg.v1` LocalStorage. No framework, backend, package-manager dependency or build infrastructure was added. The production command remains `npm run build`, output `build`, Node >=22. Vercel configuration is unchanged. Existing eight navigation buttons remain, with Impact Atlas added as a ninth. Scoped grid breakpoints wrap navigation rather than shrinking all labels into a crowded row.

No changes to the engine, Green Score weights, dataset, global theme stylesheet, wheel/slider/living-score modules, navbar animation component, dropdown handlers, team files or persisted reaction format. The simulator still uses the same engine. New features are educational displays, not new scientific calculations.

## Molecular viewer

Analyze includes selectable reactant/product structure chips alongside its existing reaction display. Original equation text and stoichiometry remain untouched. Exact compound-name aliases resolve to PubChem CIDs; a molecular formula alone never resolves identity. The viewer is a locally loaded, isolated iframe using vendored 3Dmol.js. Closing removes the iframe and its rendering context. Rotation, zoom, camera reset and ball-and-stick/space-filling controls are implemented. Local SDF records prevent API outages from blocking use. Rendering failures retain a useful description/reference.

Bundled PubChem computed 3D conformers, retrieved 10 October 2026:

| Compound | CID | Formula |
|---|---:|---|
| Ethanol | 702 | C2H6O |
| Acetic acid | 176 | C2H4O2 |
| Ethyl acetate | 8857 | C4H8O2 |
| Water | 962 | H2O |
| Ammonia | 222 | NH3 |
| Methanol | 887 | CH4O |
| Methane | 297 | CH4 |
| Carbon dioxide | 280 | CO2 |

Source pattern: `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/{CID}/SDF?record_type=3d`. Atom counts, finite coordinates, bond indices, CID headers and 3D tags were checked. Coordinates and bonds were not edited. These are computed isolated conformers, not measured geometries, reaction mechanisms, bulk liquids or crystal models. Several records are available for manually named inputs even if absent from the demo library. Unmatched compounds, ions/salts, metals and polymer repeat units have explanatory fallbacks.

Library: 3Dmol.js, downloaded from https://3Dmol.org/build/3Dmol-min.js. BSD-3-Clause and incorporated-code notices are bundled in `src/vendor/3Dmol-LICENSE.txt`. The snapshot SHA-256 values are in `src/assets/science-provenance.json`. Documentation evaluated: https://3dmol.org/doc/GLViewer.html. Mol* was not needed for this small-molecule scope.

## Impact Atlas

One lazily loaded, orthographic 3D sphere rendered with Canvas 2D, not WebGL/Three.js. Natural Earth boundaries make geography recognizable. Pointer dragging, keyboard rotation, zoom, reset, smooth focus and optional rotation are implemented. Rotation starts paused, respects reduced motion and stops rendering in hidden tabs. Disconnect cancels frames/listeners/observers. An accessible case list remains available if drawing fails.

Natural Earth 1:110m administrative geometry, downloaded from:
https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_admin_0_countries.geojson

Natural Earth data is public domain: https://www.naturalearthdata.com/about/terms-of-use/
Only original names and geometry were retained. Marker coordinates come directly from country `LABEL_X`/`LABEL_Y` fields. These are explicitly **country locator markers**, not exact sites, measured hotspots, rankings or pollution coverage. No country is shaded as polluted. Five categories each contain one documented educational case; they are not a comparable worldwide dataset. Access date: 10 October 2026. Source text is summarized; photographs, charts and third-party reports were not redistributed.

| Category / case | Source and date |
|---|---|
| Plastic Waste — United States prevention context | EPA background: https://www.epa.gov/plastics/about-plastic-products-and-plastic-pollution (accessed 2026-10-10) |
| Water Pollution — Minamata, Japan | Japan Ministry of the Environment, 2002 historical summary: https://www.env.go.jp/en/chemi/hs/minamata2002/summary.html |
| Industrial Air Pollution — London Great Smog | Met Office account of December 1952: https://weather.metoffice.gov.uk/learn-about/weather/case-studies/great-smog |
| Hazardous Chemical Waste — Love Canal, USA | EPA retrospective, 2018-08-06: https://www.epa.gov/archive/epa/newsreleases/love-canal-revealed-national-problem-superfund-provided-solution.html |
| Electronic Waste — Agbogbloshie, Ghana | WHO historical example, 2024-08-29: https://www.who.int/news-room/facts-in-pictures/detail/e-waste-and-child-health |

Panels distinguish historical accounts from broad educational context, link sources and display dates. Prevention connections are qualitative educational interpretations, not claimed remediation outcomes. Related Chemistry opens the corresponding existing principle. No unrelated reaction is forced into a case. The five-stop World Tour progresses manually with Previous, Next, Restart and Exit. No comparable historical dataset was selected, so no timeline or invented trends were added.

## Industrial Process Explorer 2.0

The root missing-data cause was absent guide mappings for three existing IDs. The original five industrial reaction records were retained:

- `industrial-ammonia`: five stages of the existing Haber–Bosch loop.
- `industrial-contact`: five stages, with air drying before sulfur burning, catalytic oxidation, absorption into concentrated acid and final acid preparation. No direct SO3-to-water absorption diagram.
- `industrial-methanol`: five stages matching syngas/CO synthesis, with cooling and distillation. The library equation is a simplified CO route, not the entire feed composition.
- `industrial-iron`: four stages of a conceptual CO reduction zone. Explicitly not a complete blast furnace or hydrogen-DRI plant; no incompatible methods are combined.
- `industrial-hydrogen`: three existing reforming, shift and purification stages. Metrics cover only the library reforming step, not complete plant impacts.

Shared SVG equipment symbols show conceptual material flow, not construction details. Each stage supplies a short explanation, environmental issue, opportunity and manual presentation line. Start, Previous, Next, Restart and Exit are implemented. Loading a library reaction or using the Analyze process shortcut synchronizes the explorer; changing its selector resets progress. Other library entries have an honest Reaction Overview, not invented industrial stages.

Additional checked references:
- EPA AP-42 sulfuric acid background, 1992, pp. 7–9: https://www.epa.gov/sites/default/files/2020-09/documents/final_background_document_for_sulfuric_acid_section_8.1_1.pdf
- Uhde methanol plants: https://www.thyssenkrupp-uhde.com/en/products-and-technologies/methanol-and-synthetic-fuels/methanol-plants
- Uhde process brochure showing synthesis/separation/distillation: https://ucpcdn.thyssenkrupp.com/_binary/UCPthyssenkruppBAISMicrositePowertoX/en/green-methanol/link-Methanol_Plants_Brochure.pdf
- worldsteel raw materials/route context: https://worldsteel.org/about-steel/raw-materials/
- Existing hydrogen reference: https://www.energy.gov/cmei/fuels/hydrogen-production-natural-gas-reforming
- Existing ammonia reference: https://pubs.rsc.org/en/content/articlehtml/2018/ra/c8ra06821f

## Controlled review and testing

1. Molecular pass: retrieved and validated eight SDF identities/geometry records; added exact-name matching, unsupported-material explanations and local rendering error states. iframe isolation provides teardown without leaking a persistent viewer.
2. Atlas pass: checked five sources and Natural Earth coordinate anchors; tested category/tour state, sphere projection and input/cleanup harness. Refinement cancels camera focus when dragging starts and focuses each newly selected category's country.
3. Industrial pass: completed missing mappings and tested all 22 stages/presentation controls. Source review corrected contact-route air-drying order and documented iron/reforming process boundaries.
4. Regression pass: production build, existing 926-check suite, all 17 reaction/simulator workflows, nine-tab integration, persistence, scoring, navbar, team, wheel and slider harnesses passed. No separate linter or type checker is configured; build checks JavaScript syntax and static assets.

**Unresolved acceptance checks:** the Chromium download repeatedly returned a truncated archive. No real-browser screenshot, WebGL molecular render, physical touch/pinch test, browser console review or measured performance benchmark was executed. Automated checks are mock-DOM/math/data checks, not evidence that the final visuals render correctly on every device. No external deployment was performed. Do not treat every visual acceptance criterion as certified.

## File inventory

Created: `src/science-data.js`, `src/science-views.js`, `src/science-controls.js`, `src/science-upgrade.css`, `src/atlas-globe.js`, `src/molecular-frame.html`, `src/molecular-frame.js`; local `src/assets/earth.json`, `country-anchors.json`, `science-provenance.json`, eight `molecules/*.sdf`; `src/vendor/3Dmol-min.js` and license; `scripts/test-science.mjs`; this report.

Modified integration: `src/app.js`, `src/workspace-tools.js`, `src/index.html`; `scripts/test-production.mjs`, `scripts/test-standalone.mjs`, `scripts/test-workspaces.mjs`, `test.mjs`; README and regenerated build/audit output. No package.json or lockfile changes.
