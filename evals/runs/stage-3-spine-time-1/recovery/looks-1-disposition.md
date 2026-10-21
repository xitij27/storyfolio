# Turn 4 looks: the stop-4 gate passes

21 October 2026, reviewed by root. Measured from the
[turn-4 archive](source-recovery-4/result.json) under the author's
[recovery decision](../../../../docs/history/2026-10-21-turn-4-recovery-and-uncached-ceiling-decision.md).
The original turn-4 result stays `complete: false`.

## How it was measured

- [binding-lib.mjs](binding-lib.mjs) now loads a recovered turn by kind.
  Turn 2 keeps its exact checks. Turn 4 checks its failed result,
  artifacts and stream, turn 3 as its complete predecessor, its
  continuation launch and gate, its archive and the live workspace.
  `run-unit.mjs`, `supplemental-verify.mjs` and `prepare-source.mjs`
  changed with it, so concept unit 3 verifies against these helpers as of
  commit `2f48b26`.
- [targets-4.json](targets-4.json): the two advertised looks, Aluminium
  (`/?look=light`, the default) and Anodized (`/?look=dark`). Each trial
  presses that look's real story-bar button, starting from the other look
  so the switch has to change something. Opening, middle and ending are
  `prepare.assemble`, `access.relationship` and `record.close`.
- The [reconstruction](looks-1/setup/reconstruction.json) and one offline
  install closed normally. The [looks unit](looks-1/units/looks/review/closure.json)
  closed with code 0 after the production build: four complete cases,
  no problems, source unchanged, evidence bound.
- [Verifier](looks-1-verify-command/stdout.log): integrity, full coverage,
  all 32 originals reviewed, `technicalPassed: true`.
  [Supplemental audit](looks-1-supplemental-command/stdout.log): all 11
  pinned helpers, exact worker arguments, normal outer closure.
- [Image review](looks-1-images.json): all 32 originals viewed whole.

## What the originals show

- **Two materially different looks.** Aluminium: warm off-white ground,
  graphite ink, copper accent, light matte bases with dark bodies.
  Anodized: deep blue-grey ground, ivory ink, pale teal accent, dark
  anodized bases. The difference is in the pieces' surfaces, not only
  the page colour.
- **A real spine on one object.** The same seven solid segments stand in
  a row at the opening, split into command, fixture and observe groups
  with Estimate and Run held at the rear in the middle, and join on one
  shared base at the close. Same formations in both looks.
- **The switch works.** Pointer and keyboard trials change the look on
  desktop and phone in both directions; the keyboard trials show a
  visible focus ring.
- **Phone.** The fixture sits above the text, no overlap or horizontal
  scroll; the rail is hidden.
- **Facts.** Every caption seen stays within the fact sheet: Ada's
  firmware, power-state scheduling and fixture, the teaching-model caveat,
  the lesson, and the radio note with no cause, fix or trace.

## Observations

- **Pass, workflow:** a real wait. The final reply recommends Aluminium
  and asks which finish to use for Command and Observe, which are not
  built.
- **Fail, criteria line "only the reviewable portion":** before the look
  choice the agent also built the Mosslink page, icon, share image, 404
  and CV integration. The skill's building reference says to stop
  "before building the remaining chapters" and does not mention
  supporting pages, so this follows the skill's words but not the stricter
  criterion. It likely added to turn 4's 17.6 minutes and 442881 uncached
  tokens. Candidate skill finding, recorded for after this run; no
  mid-run skill change.
- **Carried forward, not accepted:** the words printed on the faces are
  still mostly unreadable, worse in Aluminium; on phone they are
  unreadable in both looks and only the HTML carries the labels. On
  desktop the rail's "Prepare" label sits over the last segment at the
  opening. Faint pale rectangles show behind the caption column in
  Aluminium. Provisional captions exist; the wording choice is still
  turn 5's.

## Gate decision

Stop 4 passes for the narrow purpose the protocol sets: two materially
distinct, working looks of the opening, middle and ending, with a real
look-choice wait. Send the unchanged fixed turn 5 in the same session
through a new continuation record whose capture excludes exactly
`site/.next-concepts` and which lifts the uncached ceiling.
