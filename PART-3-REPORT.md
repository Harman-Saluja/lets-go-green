# Part 3 — Green Rescue: Save the Scientist

## Delivered game

A Dashboard feature card opens an integrated large modal containing the original Dr. Sprout character and four illustrated SVG puzzle scenes. The game is self-contained and lazy-loaded, with no new navigation tab and no changes to chemistry calculations, datasets, Green Score, Atlas, Cinema, History or existing UI components. The card uses the existing design system; the game has its own scoped stylesheet and local fonts.

All visuals are original code-authored SVG. The character, equipment, podiums, layered landscape and lab props use lightweight shapes and CSS motion. There are no copied characters, third-party game artwork, stock footage or external game assets.

## Completed levels and winning paths

| Level | Playable objective | Correct path | Distinct wrong outcomes |
|---|---|---|---|
| 1 — The Thirsty Scientist | Restore the fictional safe-water route | Inspect source → treatment and checks → repair supply → activate (repair can happen earlier) | Incomplete route sprays harmless droplets; tiny filter produces bubbles. Treatment before inspection also prompts confusion. |
| 2 — Factory Trouble | Stop unnecessary overfeeding | Install metered feed → run machine | Flushing produces a spray; running faster causes a harmless machine rattle. |
| 3 — Lab Mix-up | Route a known sealed recovery stream | Drag the sealed box to approved collection, or tap the box then the station | Drain triggers a comical warning; mixed waste triggers the reverse-conveyor cue and head shake. |
| 4 — Final Green Rescue | Combine efficiency and prevention | Recover suitable spare heat + install leak sensor → launch | Bypassing controls triggers a warning; extra power produces a rattle. |

Every level remains immediately retryable. Mistakes do not remove lives, reset progress or inflict harm. Success shows a one-sentence scientific idea, celebrates briefly, and automatically moves to the next level. The final result displays MISSION COMPLETE, four rescues, active play time and playful retry count. These are game statistics, not environmental scores.

## Controls and accessibility

Start; Pause/Resume; Restart; Sound on/off; progress; Exit; Play Again. Interactive equipment supports clicking, tapping, keyboard Enter/Space and visible focus. The recovery level supports pointer drag-and-drop with a following box token, plus a two-tap/keyboard alternative. Mobile uses a separate portrait scene arrangement with larger targets and wrapped labels.

Sound defaults off. Enabling it plays small synthesized tones through Web Audio; no audio file or autoplay soundtrack is loaded. Unsupported audio is handled without blocking the game. Escape exits. The native dialog traps focus; closing returns focus to the original button. Messages from the embedded game are checked against their source window and origin.

Hidden tabs pause active play, and the active timer stops while paused or hidden. The game cleans up intervals, transition timers and its audio context when closed. Reduced-motion preferences remove animation and particles while retaining text and visible completion checks.

## Animations implemented

Scientist surprise, confusion/head shake, relief/nod, happiness and celebration hops; harmless water spray; bubbles; machine rattle; short alarm cue; reverse-conveyor movement; hover lift; installed-object checkmarks; confetti; and the final fictional river/factory/tree improvement. Effects are brief rather than perpetual particle simulations. The graphics are illustrative; no real environmental outcome is predicted.

## Scientific concepts and limits

- Water: the explicitly fictional source contains particles and microbes. It requires a suitable treatment train plus checks and an intact supply route. Repair alone never wins. The small filter never makes the source safe. This is not a universal treatment procedure or drinking-water instruction.
- Factory: prevent unnecessary material input rather than moving waste into another environmental stream.
- Lab: a known, compatible, sealed and labeled stream goes to an approved specialist. No opening, pouring, mixing or on-site treatment instructions are given. Trained staff handle real lab waste.
- Finale: recover suitable process heat and prevent leaks within a fictional process design. The improved scenery represents the story, not measured emissions or water quality.

## Expected playtime

Designed for a casual **60–120-second** visit, including exploration and retries. The shortest route contains 11 meaningful object actions plus Start, with four 2.3-second success transitions. A visitor who knows the solutions can finish faster. Playtime is an estimate: no timed human visitor playtest was performed, and no artificial minimum-duration wait is imposed. The displayed timer counts active puzzle time, excluding pauses and success transitions.

## Validation performed

1. Level 1 prototype: both failures, inspection/treatment/supply gating, immediate retry and correct success tested before the complete game suite.
2. All four winning routes, two distinct wrong outcomes per level, progression, repeated retry, pause/resume, restart and completion tested against the actual game state module.
3. Controller event harness tested keyboard selection, pointer drag/drop, mobile layout markup, synthesized-sound creation, visibility pause, active timer, exit messaging, cleanup and modal focus return. The modal rejects exit messages from an unrelated frame and prevents duplicate opens.
4. Static SVG desktop and portrait scene artwork was rasterized and visually inspected. This checks artwork/layout, not browser animation or touch performance.
5. Production build passed. Full website regression suite passed, including **791 chemistry acceptance checks**, the 15-reaction workflows, Cinema, Atlas tours, comparison and five-tab navigation. The final targeted game and standalone tests passed after usability refinements.
6. All **96 production files** returned HTTP 200 with byte-identical content. Nine protected chemistry/theme/navigation/Atlas/team/comparison source files remain byte-identical.

**Remaining limits:** no real browser was available in this environment. Actual animation smoothness, physical touchscreen drag, audible sound quality, dialog behavior in different browsers and human completion time remain unverified. Passing event harnesses does not certify these device-level behaviors. No production deployment was performed.

## Files modified

- `src/app.js`: Dashboard game card and lazy launch action only.
- New `src/green-rescue-state.js`: four-level rules and state transitions.
- New `src/green-rescue.js`: original SVG scenes, character, controls, animation state, pointer/keyboard interactions and sound.
- New `src/green-rescue.css`: game-scoped theme, responsive scene controls, motion and reduced-motion styles.
- New `src/green-rescue.html`: self-contained game entry.
- New `src/green-rescue-dialog.js`: integrated modal lifecycle and focus restoration.
- New `scripts/test-green-rescue.mjs`; updated `scripts/test-production.mjs`.
- README, this report, logs, HTTP audit, `archive/part-3/app.js`, and regenerated `build/`.

No dependencies added. Deployment settings remain `npm run build`, output `build`, Node 24 recommended, no application environment variables. All three upgrades are included in the complete project ZIP.
