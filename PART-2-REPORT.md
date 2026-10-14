# Part 2 — integrated 3D Reaction Cinema

This release changes Cinema and its direct integration only. It is implemented and automated checks pass, but **full visual acceptance remains open** because a real browser could not be installed: the downloaded Chromium archive was invalid/truncated. No screenshot, real WebGL rendering, phone touch, fullscreen or measured frame-rate result is claimed.

## What changed

The automatically visible player now has five scenes: Introduction, Reactants, Transformation, Products and Green Chemistry. Its inline stage maintains a responsive 16:9 aspect ratio, with captions and controls outside the stage to preserve readability. It reuses the bundled 3Dmol.js WebGL renderer and local molecular records, rendering real sphere-and-stick geometry rather than the former flat SVG projection. Each scene uses the selected reaction’s actual identities and coefficients; the transformation scene juxtaposes before and after without inventing bond-breaking paths or intermediates.

The separate “Explore molecular structures” UI is removed from Analyze. Shared molecular data, old renderer assets and scientific references are retained. No new dependencies, game, reaction datasets or calculation formulas were added. The existing industrial explorer automatically uses the updated player through its existing integration.

## Scientific representations

Twenty molecular records use PubChem computed 3D conformers. Hydrogen has a source-backed two-atom linear connectivity record projected into the 3D scene; displayed bond distance is illustrative, not a measured geometry. Haber–Bosch explicitly shows one N2 and three H2 molecules, followed by two NH3 molecules. Tests verify N2H6 atom totals on both sides and preserve the source bond orders.

Salts use labeled ionic charge/ratio schematics, not an invented isolated salt molecule or crystallographic lattice. Polyatomic ions are labeled groups, not fabricated atomistic conformers. Starch, PLA and PET use 3D repeat-unit blocks: connectors show polymer continuity, not chemical bonds or a validated atomistic chain. Iron uses a bulk-material block, not an asserted lattice. These representations are appropriate educational abstractions but **are not a complete validated atomic-scale model for every material**. True crystal/chain geometry would require suitable additional structural data. Molecular sizes are adjusted for readability and are not an intermolecular length scale.

All models preserve source connectivity. A name/formula mismatch suppresses the molecular model instead of showing a misleading structure. Source links and representation limits are in the player. Captions use the retained reaction-specific profiles; Green Score and atom economy come from the unchanged analysis engine. Process temperatures remain labeled assumptions where supplied. No exact industrial mechanism or predicted outcome is claimed.

## Controls and performance

Play, Pause, Replay, Previous Scene, Next Scene, scene progress, fullscreen where supported, Rotate molecules, and Reset camera are included. Users can drag the 3D stage; keyboard arrow and +/- controls rotate/zoom. Reduced motion replaces automatic playback with manual progression. Offscreen or hidden players pause.

The iframe loads lazily, stays mounted through scene changes, and reuses one viewer. Structure fetches are cached. Camera movement is finite, not perpetual. Scene changes cancel prior camera frames and obsolete asynchronous draws. Resize observation, timers, scene geometry and the WebGL context are cleaned up when the embedded stage is closed. A WebGL failure shows a readable named-substance fallback rather than a blank panel. No videos or audio were added.

## Complete coverage audit

Every entry has five populated scenes and passed the renderer API/data harness. “Passed” below does **not** certify real-browser visual rendering.

| Retained reaction | Scenes | Structure approach | Automated result |
|---|---:|---|---|
| Sugar hydrolysis | 5/5 | Computed molecular conformers | Harness passed; browser unverified |
| Starch hydrolysis | 5/5 | Computed molecular conformers + polymer schematics | Harness passed; browser unverified |
| Glucose isomerization | 5/5 | Computed molecular conformers | Harness passed; browser unverified |
| Lactose hydrolysis | 5/5 | Computed molecular conformers | Harness passed; browser unverified |
| Citric acid–bicarbonate neutralization | 5/5 | Computed molecular conformers + ionic schematics | Harness passed; browser unverified |
| Acetic acid–bicarbonate neutralization | 5/5 | Computed molecular conformers + ionic schematics | Harness passed; browser unverified |
| Calcium lactate formation | 5/5 | Computed molecular conformers + ionic schematics | Harness passed; browser unverified |
| Calcium carbonate precipitation | 5/5 | Computed molecular conformers + ionic schematics | Harness passed; browser unverified |
| PLA hydrolysis to lactic acid | 5/5 | Computed molecular conformers + polymer schematics | Harness passed; browser unverified |
| PET hydrolysis to terephthalic acid | 5/5 | Computed molecular conformers + polymer schematics | Harness passed; browser unverified |
| Haber–Bosch ammonia synthesis | 5/5 | Computed molecular conformers; H2 linear connectivity | Harness passed; browser unverified |
| Contact process — sulfur dioxide oxidation | 5/5 | Computed molecular conformers | Harness passed; browser unverified |
| Methanol synthesis — carbon monoxide route | 5/5 | Computed molecular conformers; H2 linear connectivity | Harness passed; browser unverified |
| Iron oxide reduction — carbon monoxide route | 5/5 | Computed molecular conformers + ionic, metal schematics | Harness passed; browser unverified |
| Hydrogen production — steam methane reforming | 5/5 | Computed molecular conformers; H2 linear connectivity | Harness passed; browser unverified |

## Validation actually executed

1. Scientific pass: Haber reactant/product atom counts checked first; CID identity, molecular formulas and bonds validated against all bundled records; every retained material assigned an explicit representation.
2. Cinema/integration pass: all **75 scenes** dispatched to a mock of the actual 3D renderer API; model coordinates finite; nonempty scene content; controls and five-scene progression, reduced motion, offscreen/visibility pause and cleanup exercised. These checks cannot prove lighting, framing or visual polish.
3. Performance/usability pass: added formula-mismatch rejection, renderer-unavailable fallback test, rotation/reset/pause messages and explicit WebGL-context cleanup. Rebuilt production and reran cinema, player and application smoke tests. Reused the local project fonts.

The full regression suite passed, including **791 chemistry acceptance checks**, all 15 load/save/restore flows, separate Atlas tours, five-tab navigation, comparison and unchanged industrial diagrams. Final production build passed: 86 static source assets plus five team photographs = **91 published files**. All 91 returned HTTP 200 with byte-identical content. Nine protected files were SHA-256 checked unchanged, including the chemistry engine, reaction dataset, global stylesheet, navbar component, Atlas region/controller files, workspace tools, team component and comparison module.

Full-suite output is in `PART-2-TEST-LOG.txt`; the machine-readable per-reaction result is `CINEMA-COVERAGE.json`; production asset results are in `part-2-http-audit.json`.

## Files changed

- `src/reaction-cinema.js`: five scenes, persistent inline stage, controls and scientific disclosure.
- `src/app.js`: removes the separate molecular-explorer entry only.
- `src/index.html`: includes cinema-scoped styles.
- New `src/cinema-stage.html`, `src/cinema-stage.js`, `src/cinema-stage.css`: isolated WebGL stage, scene rendering, camera controls and fallback.
- New `src/cinema-stage-model.js`: presentation-only geometry adapters and explicitly labeled material schematics.
- New `src/cinema-premium.css`: responsive cinema-only layout.
- `scripts/test-platform-2.mjs`, `scripts/test-production.mjs`; new `scripts/test-cinema-3d.mjs`.
- README, this report, coverage/test/HTTP records, recoverable `archive/part-2/` snapshots and regenerated `build/`.

No dependencies added. Existing 3Dmol.js license and local SDF files are unchanged. Technical API reference: https://www.3dmol.org/doc/GLViewer.html. Compound-specific PubChem references are accessible inside each player and identified by CID in `reaction-cinema.js`.

## Deployment and acceptance boundary

Static deployment settings are unchanged: `npm run build`, output `build`, Node 24 recommended, no application environment variables. No hosting deployment was performed. The integration is ready to inspect in a browser, but do not describe every reaction as visually approved or performance-certified until the actual WebGL scenes, mobile framing, real controls and fullscreen have been inspected. Schematic ions, polymers and solids remain explicit scientific limitations rather than fabricated atomistic models.
