# Person test 4: person test 2's fixture, in one world

Written before any actor, 31 October 2026, on the author's answer "Launch
with those (Recommended)" to running the person test again on the
one-world skill with longer bounds
([record](../../../docs/history/2026-10-31-person-test-3-review.md#the-person-test-again-and-a-push)).
The skill and engine are `main` at the commit that adds this file: one
world per site at stop 2, the pieces used as they are, nothing over the
scene ([design amendment](../../../docs/superpowers/specs/2026-10-27-transitions-gallery-design.md#amendment-31-october-2026-one-world-per-site)),
after [person test 3](../stage-3-person-3/README.md), whose mixed site the
author found "terrible".

**Question.** With the one-world second stop, does a fresh agent tell
Dawit's site in one world of gallery pieces, show it running with a reason,
point to the gallery, switch world when asked, leave the pieces and the
page around the story unchanged, and finish the site through stops 3 to 6,
with only confirmed facts in it? Does the author find it a good portfolio?

**Fixture.** `evals/builds/full-journey-3`. Turns 1, 2, 4, 5 and 6 are
person test 2's, byte for byte. Turn 3 is [prompts/turn3.md](prompts/turn3.md):
it keeps everything else and switches the whole site to the map, or to the
sheet if the agent already chose the map.

**Actor and runner** as in person tests 2 and 3: Codex
(`evals/codex-build-run.mjs`), capabilities
`evals/builds/local-capabilities.json`, cohort `codex-person-4`, one
repetition; a second only after a failure outside the agent, recorded
first.

**Bounds, changed on the author's word:** six turns, 45 minutes each, 180
in all, 2 million uncached tokens (person test 3: 30, 90 and 1.5 million;
its turn 4 took 21 minutes and turn 5 ran past 30). The snapshot bounds are
person test 3's amended ones (1500 files, 64 MB).

**Environment** as in person test 3's protocol: Node 24.14.0 first on
`PATH`, `npm_config_cache=/tmp/storyfolio-npm-cache`,
`PLAYWRIGHT_BROWSERS_PATH=/tmp/storyfolio-browser-cache`, the browser
libraries in `/var/tmp/chromium-libs`, `LANG=C.UTF-8`, and
`TMPDIR=/var/tmp/storyfolio-person-4`. Recorded by
[environment.mjs](../stage-3-person-3/environment.mjs). No model call before
turn 1.

**Gates.** Root reads each turn's reply and workspace before the next fixed
prompt, and writes `gates/after-N.json`. At every gate root records
whether the agent changed `stitch/` or put anything over the scene.

- After turn 1: stop if the reply gives a concept, a world or a design, or
  publishes anything.
- After turn 2: passes when `content/person.ts` holds only confirmed facts
  (none of the five traps), `content/mix.ts` tells every chapter in one
  world, the agent ran it at desktop and phone size, and the reply gives
  the world and why, what each chapter shows and leaves out, the gallery's
  address and the invitation to choose another world, change, suggest a
  component or describe a design of his own; and `docs/story/concepts.md`
  records it. Root serves the workspace's site and looks at it at both
  sizes. Stops if the site is not running, a trap is in the facts, or the
  agent mixes worlds unasked.
- After turn 3: passes when `content/mix.ts` is the switched world for
  every chapter, `docs/story/concepts.md` records the change, and a
  storyboard is written. Stops if the world is not switched.
- After turns 4 and 5: recorded, not stopping unless the site no longer
  runs.
- After turn 6: root serves a copy of the site, runs `npm run check`,
  shoots every hold and move at both sizes, judges it against
  [the criteria](../../builds/full-journey-3/criteria.md), and records the
  cost against person test 2 (62 minutes, about 1.25 million uncached
  tokens). The author's review on a desktop and a phone decides.

A folder the agent leaves outside the snapshot roots is moved out intact
with its hashes, as in `stage-3-person-1`.
