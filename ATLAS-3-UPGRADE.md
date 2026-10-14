# Impact Atlas 3.0 and molecular viewer visibility

## Implemented
- Existing orthographic Canvas globe, five world case studies, camera controls and World Tour retained.
- Seven requested category colors, scoped to Atlas. Colors identify topics, not severity.
- Locally bundled SVG country flags: US, GB, JP, GH, IN. Markers have category rings, country/case hover text, camera focus and accessible case-list alternatives. Overlapping screen markers are suppressed; all cases remain in the list.
- World / India / Madhya Pradesh navigation. One lazily loaded reusable SVG map renderer and cached boundary datasets. All 28 states and 8 UTs selectable through paths and a native dropdown. Keyboard Enter/Space selects map paths; native dropdown supports keyboard/touch.
- Region selection zooms the map; whole-map reset and geographic navigation clear stale selections. Categories retain the geographic level and reset case selection.
- Three source-backed MP case studies: Indore (Khan River, water), Singrauli (industrial air-control plan), Bhopal (historical soil contamination). Three-stop manual India Tour; five-stop World Tour preserved.
- Molecular viewer was already implemented behind a collapsed details element. Analyze now exposes the shared structure card, atom symbol and explicit View 3D buttons. Existing exact-name matching, 3Dmol viewer, SDF structures, rotation/zoom/reset/close and material fallbacks are reused.

## Data, provenance and limits
No environmental quantities, rankings, severity scores or trends were added. No chemistry calculations or reaction inputs changed. Only Madhya Pradesh has Indian case-study coverage in this release; other states and unsupported categories show Data unavailable, not a low-pollution assessment. Carbon is a functional filter with no verified case bundled. Pithampur was researched but no environmental case was added: the accessible official emergency-preparedness PDF did not establish a suitable pollution claim. Dhar remains selectable and unclassified.

Sources checked 10 October 2026:
- MPPCB, April 2024 monthly report to NMCG, Annexure VIII and p.36: https://nmcg.nic.in/writereaddata/fileupload/ngtmpr/7_Madhya%20Pradesh%20-%20MPR%20April%202024.pdf
- MPPCB, Revised CEPI Action Plans, Singrauli: https://cpcb.gov.in/industrial_pollution/New_Action_Plans/CEPI_Action_Plan_Singrauli.pdf . Publication date not stated; schedules include 2023–2025. Actions are not presented as currently completed.
- CSE, December 2009 site investigation, conclusions p.18: https://www.bhopal.org/wp-content/uploads/2016/06/CSE-REPORT.pdf . Historical sampled-site findings, not a current Bhopal-wide condition.
- Geographic data: geoBoundaries commit 9469f09, simplified IND ADM1 and ADM2. https://www.geoboundaries.org/api/current/gbOpen/IND/ADM1/ and https://www.geoboundaries.org/api/current/gbOpen/IND/ADM2/ . Metadata is bundled alongside geometry.
- ADM1: DataMeet / Election Commission of India, CC BY 2.5 IN: https://creativecommons.org/licenses/by/2.5/in/ . Source metadata labels year 2011 despite containing Ladakh and merged DNH/DD; the 2023 release has the expected 36 regions. No claim of current legal/survey accuracy. Names normalized by removing diacritics; shape IDs and geometries preserved.
- ADM2: Pathways Data / LG Directory, ODbL 1.0: https://opendatacommons.org/licenses/odbl/1-0/ . MP extract retains 50 historical district geometries and names. Metadata labels 2021, but the source omits newer districts. This is explicitly disclosed in the UI. The adapted database is distributed under ODbL; full editable GeoJSON is included. Source feature block 0–49 contains the MP district records.
- Download paths: https://media.githubusercontent.com/media/wmgeolab/geoBoundaries/9469f09/releaseData/gbOpen/IND/ADM1/geoBoundaries-IND-ADM1_simplified.geojson and corresponding ADM2 path.
- Natural Earth country label anchors retained. India anchor [79.358105,22.686852] comes from the same Natural Earth country dataset. Map dots use boundary bounding-box centers: representative region locators, not monitoring stations or contamination coordinates.
- Flags: https://github.com/lipis/flag-icons , MIT license included in assets/flags/LICENSE.
- Eight unchanged PubChem CID structures: ethanol 702, acetic acid 176, ethyl acetate 8857, water 962, ammonia 222, methanol 887, methane 297, carbon dioxide 280. No molecular identity is inferred from formula alone.

## Validation
- Production build and all regression suites via npm test.
- Regional suite: every state/UT and historical MP district selected and rendered; every category; stale-selection clearing; India Tour forward/back/restart/exit; local flags; visible molecular entry points.
- Existing tests cover 17 reaction load/analyze/apply/save/restore flows, all tab rendering, scoring, comparison, wheel, simulator, navbar, team, 22 industrial stages, globe projection/input/cleanup, and 8 SDF identity/atom/bond records.
- SHA-256 protected-file comparison verifies engine, reaction data, global styles, navbar, simulator/workspace logic, wheel/score interaction code and team source unchanged.
- These are Node/DOM/Canvas harness checks plus HTTP asset checks. No real-browser visual, physical touchscreen or WebGL rendering verification was possible in this environment. Do not interpret harness passes as browser visual QA.
- No deployment performed. Existing Vercel static build configuration remains: npm run build → build/. No new npm dependencies or environment variables.

## Modified / added files
Modified: src/science-data.js (two category names only), src/science-controls.js (Atlas navigation/controller), src/science-views.js (visible molecular entry point), src/atlas-globe.js (local flag markers), src/science-upgrade.css (scoped Atlas styles), scripts/test-science.mjs, scripts/test-production.mjs.
Added: src/atlas-regions.js, regional GeoJSON/metadata and flag assets under src/assets/, scripts/test-atlas-regions.mjs, this report. Build output regenerated; production audit refreshed. Existing navbar and global theme files untouched.
