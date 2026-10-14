# Let’s Go Green 2.0 — delivery report

Validated 10 October 2026. This report describes the current release; older upgrade reports are historical. No hosting deployment was performed.

## 1. Library inventory

Original visible library: **17**. Final visible library: **15**, comprising four biochemical, six core, and five industrial/engineering reactions.

| Category | Retained reaction |
|---|---|
| Biochemical | Sugar hydrolysis |
| Biochemical | Starch hydrolysis |
| Biochemical | Glucose isomerization |
| Biochemical | Lactose hydrolysis |
| Core | Citric acid–bicarbonate neutralization |
| Core | Acetic acid–bicarbonate neutralization |
| Core | Calcium lactate formation |
| Core | Calcium carbonate precipitation |
| Core | PLA hydrolysis to lactic acid |
| Core | PET hydrolysis to terephthalic acid |
| Industrial | Haber–Bosch ammonia synthesis |
| Industrial | Contact process — sulfur dioxide oxidation |
| Industrial | Methanol synthesis — carbon monoxide route |
| Industrial | Iron oxide reduction — carbon monoxide route |
| Industrial | Hydrogen production — steam methane reforming |

Archived from the visible selector: cellulose hydrolysis, isomaltulose formation, and tagatose formation. Their original objects are preserved in `archive/reaction-library-before-2.0.json`. Previously saved self-contained reactions remain analyzable. Acetic acid–bicarbonate neutralization was restored from the existing accounting dataset, not invented anew. The other 14 retained reaction objects match their baseline objects exactly.

## 2. Data completeness and scientific boundaries

Ten educational process scenarios support the complete accounting/optimization/comparison loop. Their quantitative process inputs remain explicitly illustrative, not measured literature results. Stoichiometric results are derived by the unchanged engine.

Five industrial reaction models support atom economy, assumed yield and reaction mass efficiency. They do **not** contain complete plant material/energy inventories; E-factor, PMI and plant energy are unavailable where unsupported. Their process diagrams explain engineering concepts but do not turn these reaction models into industrial life-cycle assessments. These five do not gain fabricated paired optimization datasets.

The restored acetate scenario compares the bicarbonate route with the balanced carbonate route: 2 CH3COOH + Na2CO3 → 2 CH3COONa + CO2 + H2O. Product basis, illustrative yield and auxiliary inventory are held consistently; the same engine derives the changed metrics. This is an educational pathway comparison, not an experimentally established performance claim.

## 3. Reaction Cinema

All 15 reactions automatically show a four-scene player in Analyze: Reactants, Conceptual Transformation, Products, and Green Chemistry. Play, Pause, Replay, Previous/Next, progress, and supported-browser fullscreen controls are included. Playback is requested by the user; it is not an endless autoplay loop. Reaction changes reset the presentation. Hidden/offscreen players pause and reduced-motion preferences simplify playback.

Twenty-one identity-matched PubChem structures support the cinema. Twenty use 3D conformer coordinates projected into SVG; hydrogen uses an explicitly labeled 2D connectivity record. Coefficients are shown, with repeated molecular models where practical. Polymer repeat units, salts and extended solids use labeled material representations rather than fabricated isolated molecules. No reaction mechanism, transition state or intermediate is invented. Sugar conformers are representative structures, not a simulation of solution equilibria.

The existing molecular popup now recognizes 22 local 3D identities. There are 23 bundled SDF files in total, including the 2D hydrogen record. Exact-name identity matching avoids treating every molecular formula as a unique structure.

## 4. Industrial Explorer

All five industrial processes retain their diagrams and 22 total stage explanations, presentation controls and source references. Cinema is also included within the industrial presentation. The pre-existing simulation remains separate from saved reaction state.

## 5. India and Madhya Pradesh

All **36** stored state/UT names were matched exactly to a sourced regional record and tested for selection. Coverage is a dated plastic-waste record for every region, not full measurement coverage for every environmental category.

- 32 numerical regional estimates: CPCB interim Plastic Waste Management annual report 2021–22.
- Two numerical estimates, separately labeled 2020–21: Manipur and Dadra and Nagar Haveli and Daman and Diu, from the July 2023 PIB annexure.
- Meghalaya and Sikkim: qualitative implementation records. No numerical value is supplied where reporting is absent or the unit is unclear.

Thus there are **34 numerical and two qualitative records**. Waste generated is not the same as environmental leakage or pollution severity. Different-year estimates are not pooled in a chart. Boundary files retain their source-vintage limitations; the MP layer contains 50 historical districts, not a claim of current administrative completeness.

Six MP local studies: Indore/Khan River; Singrauli air-quality action plan; Bhopal historical soil contamination; Ujjain sewage treatment; Jabalpur/Kathonda treatment; Gwalior/Jalalpur treatment. The last three are April 2024 infrastructure records, not pollution rankings or proof of current treatment performance. Pithampur was not added without a suitable verified record.

## 6. Countries and tours

World cases cover USA, Japan, UK, Ghana, Australia and Germany. India is the seventh supported country through its separate national/regional exploration. All seven country flags are local assets.

- **World Tour — 7 stops:** US plastic prevention; Minamata; London Great Smog; Love Canal; Agbogbloshie e-waste; Australian HFC phase-down; German e-waste collection.
- **India Tour — 10 stops:** Delhi NCAP; Gujarat; Maharashtra; Tamil Nadu; Kerala; Assam; West Bengal; MP/Indore; Ladakh; Lakshadweep. Except Delhi and Indore, these stops use the dated plastic-waste records.
- **MP Tour — 6 stops:** Indore, Singrauli, Bhopal, Ujjain, Jabalpur, Gwalior.

Tours have independent start/resume positions, Previous, Next, Restart and Exit. Progress is retained while Atlas stays open, not promised across reloads. Case links can open the related educational reaction without claiming that it accounts for local pollution.

## 7. Charts, diagrams and icons

Added a two-region plastic-waste comparison chart with year selection, actual values, units and source links. It compares only available records from the same reporting year. Added seven selectable source → pathway → consequence → prevention diagrams, with category-specific icons. No videos or invented time-series data were added.

The original audit found nine navbar glyphs, not the alleged 17 decorative emojis. The finalized navigation and mascot were preserved; no arbitrary icon deletion was performed.

## 8. Tests actually executed

- Production build succeeds; 80 static source assets plus five team photographs produce 85 published files.
- Full automated production suite succeeds, including **791 chemistry acceptance checks** and two complete passes through the ten fully specified optimization scenarios.
- All 15 curated records: analysis, navigation, simulation isolation, archive compatibility and four-scene cinema controls exercised in Node DOM/clock harnesses.
- Cinema: 21 CID/structure/formula checks; playback, pause, replay, next/previous, reduced motion, visibility and cleanup checks.
- Molecular popup: 22 local CID/SDF atom/bond records validated; all 22 industrial stages and presentation controls exercised.
- Atlas: all 36 regions, 50 historical MP districts, seven category filters, 34 numerical records, same-year chart boundaries, seven diagrams and separate 7/10/6-stop tour controls checked.
- Existing comparison, score transitions, principles selection, navbar, team, persistence and simulator regression harnesses pass.
- All **85 production files returned HTTP 200 with byte-identical content** through the local production server.
- Eight protected files—engine, global stylesheet, navbar, workspace navigation, existing experiences/controls and team module/styles—remain byte-identical to the baseline.

These are automated data/DOM/Canvas/clock and HTTP checks. **A real browser was unavailable.** Desktop/mobile visual appearance, real touch interaction, browser fullscreen, WebGL rendering, live console output and frame-rate performance are not certified. No actual Vercel/Netlify deployment or hosted smoke test was performed. Do not interpret the passing harnesses as browser screenshots or device testing.

## 9. Files and dependencies

New runtime files: `src/reaction-cinema.js`, `src/atlas-national-data.js`, `src/atlas-content.js`, `src/platform-2.css`; 15 additional local molecular SDFs; Australia/Germany flag SVGs.

Updated runtime files: `src/app.js`, `src/data.js`, `src/exhibition-data.js`, `src/science-data.js`, `src/science-controls.js`, `src/atlas-regions.js`, `src/index.html`.

Added `scripts/test-platform-2.mjs`; updated the production runner and existing count/integration tests (`test.mjs`, standalone, score, exhibition, experiences, workspaces, science, and regional Atlas harnesses). Build output regenerated. Archive snapshots, audit JSON, this report, final test log and README included.

No dependencies added. Existing local visualization libraries are reused. No global theme variables, chemistry formulas or scoring weights were changed.

## 10. Sources and deployment

Primary record sources:

- CPCB: https://cpcb.gov.in/uploads/plasticwaste/Annual_Report_2021-22_PWM.pdf
- PIB regional annexure: https://www.pib.gov.in/Pressreleaseshare.aspx?PRID=1943210
- MPPCB/NMCG April 2024: https://nmcg.nic.in/writereaddata/fileupload/ngtmpr/7_Madhya%20Pradesh%20-%20MPR%20April%202024.pdf
- NCAP launch list: https://www.pib.gov.in/PressReleasePage.aspx?PRID=1559384
- Australia: https://www.dcceew.gov.au/environment/protection/ozone/hfc-phase-down
- Germany: https://www.umweltbundesamt.de/en/topics/waste-resources/product-stewardship-waste-management/electrical-electronic-waste
- PubChem PUG REST CID-specific SDF records; exact identifiers and source URLs are stored in the molecular/cinema data. Downloaded records were checked against CID and atom/bond data.

Sources accessed 10 October 2026. Existing geography attribution/license files and flag-icons MIT license are retained. Existing scientific source ledgers remain in the older reports.

Deployment remains a static native-JavaScript application: Node 24 recommended, `npm run build`, publish/output directory `build`, no application environment variables. Included Vercel and Netlify configuration is unchanged. Navigation uses hashes; it does not require a history-router fallback. Upload the source project for repository builds, or the contents of `build` for static hosting.
