# Green Rescue 2.0

Implemented in the existing standalone application. No deployment performed.

## Experience

Sixth main tab: Dashboard, Chemistry Lab, Principles, History, Impact Atlas, Green Rescue. The existing Dashboard game card now opens the dedicated page. Existing navbar component/mascot styling is reused; the desktop grid accommodates six tabs.

Original layered SVG artwork includes an articulated scientist with 12 poses (idle, walking, looking, thinking, surprised, confused, worried, happy, celebrating, failure, victory, working). CSS animates separate head, torso, arms and legs. Equipment includes shaded tanks, treatment columns, valves, gauges, machinery, conveyors and sealed recovery containers. This is original vector art, not emoji or third-party game artwork.

| Level | Working route | Distinct wrong actions | Visible consequences |
|---|---|---|---|
| Water Rescue | Place pipe → treatment valve → tap | Tap before connection; bypass treatment | Pipe spray; unsafe-water indication; treatment lights, flowing water, checks, scientist walk and celebration |
| Factory Rescue | Place metered feeder → calibrate → run | Max speed; flush away | Hopper rattle/material bounce; spill; metered process and moving conveyor |
| Lab Rescue | Place sealed box → approved route → transfer | Mixed waste; drain | Reverse conveyor; alarm; sealed transfer to collection |
| Final Green Rescue | Place heat recovery → leak control → launch | Bypass; extra power | Alarm; overload rattle; operating equipment, illustrative greenery and confetti |

Place objects by dragging onto the socket or by selecting the part then selecting the socket. Equipment is keyboard accessible. Hints appear after inactivity. Four levels progress through explicit Next buttons. Failure popups provide immediate Retry while retaining completed connections.

## Timing and controls

State machine: TITLE → LEVEL_INTRO → PLAYING → ACTION_ANIMATION → SUCCESS/FAILURE → RESULT_POPUP → NEXT/RETRY → FINAL_VICTORY. Pause retains the current sequence step and remaining timer. Restart clears the run. Exit returns to Dashboard and stops scheduled audio. Sound is off by default; optional original synthesized cues include short victory notes (not recorded voices or realistic sound samples).

Each correct partial setup takes 1.8 seconds. The final six-step sequence takes 5.5 seconds, followed by a 0.35-second popup delay. Failure sequences take 1.97 seconds plus that delay. Visitor thinking, placement and reading determine total time; the 90–120-second target has not been measured with people. There is progression, not a level-selection menu.

Reduced motion disables animated movement while preserving scene updates and outcomes. The game is isolated in a same-origin iframe and uses no added dependencies, downloads, video or remote assets.

## Scientific boundaries

Fictional water scenario: particles and microbes, a prepared clarification/filtration/disinfection route and scenario checks. Repair alone never marks the water safe. This is not a drinking-water treatment procedure. Factory play demonstrates prevention of unnecessary inputs. Lab play keeps an already sealed, compatible, labeled stream separate for trained specialist collection; it never recommends pouring waste into drains. Final scenery is illustrative, not an environmental prediction. Game decisions do not change chemistry scores or calculations.

## Executed verification — three bounded passes

1. Functional: Water Rescue was tested before extension. Complete success, both distinct failures, delayed result, retry and next passed. All four levels then passed 184 combinations of objects, installed prerequisites and selection state; eight distinct failure routes; all success sequences; guarded phases.
2. Artwork: rendered all eight desktop/mobile SVG scenes; inspected representative scenes at both sizes. Corrected mobile target spacing, wrong-place drag acceptance, hint targets and equipment-specific drag art. These were static vector renders, not browser animation capture.
3. Integration: full `npm test` passed (including legacy 791 chemistry checks); final targeted game/navbar/standalone tests passed after visual corrections. Event/clock harness exercised pointer-drop and keyboard adapters, timers, popups, pause/resume, restart, sound synthesis, exit cleanup and portrait markup. Production build passed; page and seven integration/game assets returned HTTP 200 from the production server. Ten protected files were verified byte-identical against pre-change hashes.

### Remaining acceptance limits

No functioning browser was available for this run. Actual CSS/SVG motion quality, touch scrolling/dragging on devices, perceived audio quality, browser console, frame rate, and successful human run time remain unverified. The code and harness tests are complete; exhibition-quality acceptance still needs a real-browser playthrough. No Vercel deployment was made; existing static Vercel configuration remains compatible (`npm run build`, output `build`).

## Source files changed

- `src/green-rescue-state.js`: explicit timed, guarded game state machine and four puzzle rules.
- `src/green-rescue-art.js` (new): original scientist and environment SVG assets.
- `src/green-rescue.js`: player, timed event sequences, interactions, feedback, audio and cleanup.
- `src/green-rescue.css`: game-only visual treatment, articulated animation and responsive/reduced-motion rules.
- `src/app.js`: sixth tab, dedicated game surface, Dashboard entry and validated iframe exit event.
- `src/workspace-tools.js`: Green Rescue hash route.
- `src/part-1.css`: six-column navigation fit and isolated game iframe sizing.
- `scripts/test-green-rescue.mjs`, `scripts/test-navbar.mjs`, `scripts/test-standalone.mjs`: game and six-tab regression coverage.
- `README.md`, this report and test log: delivery documentation.

`build/` regenerated. `archive/rescue-2/` preserves the replaced game and integration source. Chemistry engine, reaction data, global theme stylesheet, navbar component, Cinema, Atlas data, science controls, team code and existing interactive experiences are unchanged.
