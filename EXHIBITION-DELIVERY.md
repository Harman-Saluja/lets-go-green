# Exhibition review delivery — 14 October 2026

This release continues the restored original website. It is a working review build with research-dependent requirements still open. It is not a claim that the entire requested exhibition is complete. No Netlify deployment or production merge was performed.

## Included

| Area | Delivered scope |
|---|---|
| Green Rescue | Shared cardinal-direction pipe artwork and validation; rotation; correct installed connections required; mobile hints separate from controls. All four existing levels preserved. |
| Indore | Lightweight perspective district relief, entrance transition, decorative depth/shadow, camera zoom/pan/reset, plan view, mouse/touch/keyboard controls, and a selectable regional Khan River story. No heavy 3D library. |
| Local interaction | Four Khan River stages and three qualitative source/treatment/monitoring choices. Retained April 2024 MPPCB evidence; no current water-quality claim. |
| Waste journeys | 10: banana, plastic bottle, cardboard, battery, vegetables, glass, aluminium can, phone, cooking oil, construction debris. Sorting, contamination guards, material movement, previous/next/play/pause/replay, mobile diagram scrolling. Changing to a wrong sorting choice stops and resets playback. |
| Recovery lab | 10 processes: biogas, compost, plastic, paper, glass, aluminium, construction materials, textiles, cooking oil, electronics; plus a dedicated battery route within journeys. Educational mechanisms, not verified Indore collection routes. |
| Comparisons | 8 distinct conceptual comparisons with material/process illustrations; direct pointer/touch dragging and keyboard range controls; links to related processes. Not historical then/now evidence. |
| Field stories | 10 across India and the world, reusing retained sources. Challenge → Response → Change → Learning, distinct pathway diagrams, questions/explanations, source/date/limits. These are not ten Indore locations. |
| Existing Atlas | All 50 records retained. Each has three interactive prevention/solution panels with meaning, mechanism, importance, example and limits, now paired with the case's own challenge, significance or educational connection and dated source. |
| Visitor guide | Seven stops; optional 98-second timed introduction (14 seconds per stop), plus manual back/next/skip/replay/exit. Interaction, hidden page, exit and reduced motion stop automatic advancement. This is a timer duration, not measured visitor comprehension time. |
| Accessibility | Native controls, focus restoration, keyboard map movement, touch map/slider interaction, reduced motion, ambient-animation pause, responsive layouts. Dashboard shortcuts and existing six-tab navigation retained. |

## Honest counts and unfinished work

- **Indore:** 1 documented river account at district level; **0 verified facility/street-coordinate pins** out of the requested ten. The displayed marker is explicitly regional. The boundary is the historical bundled district outline, not current street or elevation data.
- **Transformation timeline:** 0 dated milestones published. Eight to ten verified milestones remain blocked by research access.
- **Environmental stories:** 10 total: Khan River, Singrauli air controls, Bhopal soil, US plastics, Minamata, London smog, Love Canal, Ghana e-waste, Australia HFC policy and Germany e-waste collection. Only one is in Indore. A Change stage may explain why a source does not establish an improvement.
- **Atlas additions:** 0. Existing category counts: plastic 37, water 5, air 3, hazardous 1, e-waste 2, carbon/GHG 1, soil 1. MP is included within India, not added again.
- Case-specific intervention/outcome research across all 50 records remains partial. Shared educational guidance is not evidence of local implementation. The inherited state plastic inventory does not establish environmental leakage or local causal attribution.
- More specific authoritative references for individual recovery processes, verified historical comparisons, optional Chemistry Explore Mode and additional tours remain open.
- Real physical-device, audio, cross-browser and exhibition audience testing remain open. No measured 60 FPS claim or universal accessibility certification is made.

## Research access

Official-source requests still received runtime proxy HTTP 403 tunnel denials. The saved allowed-domain draft does not itself update that proxy. In **Environment settings → Internet access**, save/apply the pending custom allowed-domain changes, including `indore.nic.in`, `pib.gov.in`, `www.pib.gov.in`, `nmcg.nic.in`, `cpcb.gov.in`, `cpcb.nic.in`, `www.epa.gov`, `en.wikipedia.org`, `www.wikidata.org`, `query.wikidata.org` and `overpass-api.de`. Then recheck access and verify primary evidence before adding locations, coordinates, dates or outcomes. The agent did not bypass restrictions, apply runtime policy, or change Netlify settings.

Existing source metadata was preserved; it is not presented as newly verified research. Source-supported facts and educational responses are labelled separately in the interface.

## Validation and reproduction

Use Node 24 (22 or newer required), then:

```sh
npm ci
npm run build
npm test
npm run preview -- --port 4174
```

The portable suite builds the actual output and checks chemistry, all existing workspaces, regional Atlas, Cinema, game states, cardinal pipes, recovery content, story scope and comparison routes. It includes **791 chemistry acceptance checks** and **184 game object/state combinations**. See `EXHIBITION-TEST-LOG.txt` for this delivery's executed results. Older reports are historical snapshots.

Supplemental browser checks use Chromium's local DevTools protocol and Node's built-in WebSocket; no npm dependency is added. Run the preview server in one terminal and Chromium in another:

```sh
chromium --headless --no-sandbox --disable-dev-shm-usage --remote-debugging-port=9222 --user-data-dir=/tmp/lgg-browser about:blank
```

Run these **sequentially**, since they share one browser page:

```sh
node scripts/test-resource-browser.mjs
node scripts/test-tour-game-browser.mjs
node scripts/test-exhibition-browser.mjs
```

`SITE_URL`, `CDP_URL` and `SCREENSHOT_DIR` optionally override their local defaults. Screenshots default to `/tmp`. These checks cover all ten journeys and processes; correct/incorrect sorting and pipes; actual pointer pipe dragging and Level 1 completion; tour navigation; 40 field-story stages; eight dragged comparisons; 150 case-panel states; real 14-second advancement plus controlled complete 98-second scheduling; keyboard/pointer/touch map controls; reduced motion and 320/390/768px layouts. The test waits for browser layout after viewport changes before measuring overflow.

Visual inspection used Chromium screenshots of desktop/mobile Indore, river interactions, field stories, comparisons, material journeys and Green Rescue. This does not establish behavior on every browser or physical touchscreen.

## Packages

- `lets-go-green-updated.zip`: source/configuration files directly at archive root, including `src/`, `scripts/`, `public/`, package/lock files, `netlify.toml`, tests and documentation. `archive/` contains baseline fixtures required by existing regression suites. Excludes `.git`, generated `build`, dependencies, runtime logs and credentials.
- `lets-go-green-netlify-deploy.zip`: only the **contents** of the generated `build/` folder, with `index.html` directly at archive root and every generated asset. The local preview server is not needed in the deployed ZIP.

To review source, extract the editable ZIP into a new directory and run the commands above. To review production, extract the deployment ZIP and serve that directory with any static HTTP server. ES modules require HTTP rather than opening index.html via file://.

Deployment is a separate user action. Do not upload either archive to the live site until you approve it. Repository preservation uses a separate review branch and skip-build commit markers; no merge into main or live-site settings change is authorized by this delivery.

The extracted editable ZIP passed an isolated `npm ci` and production rebuild. All 107 rebuilt files exactly matched the deployment manifest. Both archives passed CRC and path/byte validation. The review branch is `codex/exhibition-upgrade`; its preservation commit includes `[skip ci]` and `[skip netlify]` to suppress Netlify builds. No pull request or main-branch merge is created.
