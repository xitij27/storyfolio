# Person test 3: person test 2's fixture, from the pieces

Written before any actor, 31 October 2026, on the author's "yes" to
launching plan 3 ([record](../../../docs/history/2026-10-31-fix-the-map.md#steps-2-and-3-then-plan-3),
[plan](../../../docs/superpowers/plans/2026-10-31-person-test-3.md)). The
skill and engine are `main` at the commit that adds this file: the second
stop as one mix of gallery pieces shown running (plan 2), the map fixed for
Dawit's places ([stitch-3](../../engine/stitch-3/README.md)) and the two
wording fixes of 31 October.

**Question.** With the changed second stop, does a fresh agent recommend
one mix of gallery pieces for Dawit, show it running with a reason for each
piece, point to the gallery, take a swap, and finish the site from the
pieces through stops 3 to 6, with only confirmed facts in it, at no more
cost than person test 2?

**Fixture.** `evals/builds/full-journey-3`; see its README. Turns 1, 2, 4,
5 and 6 are person test 2's, byte for byte. Turn 3 is
[prompts/turn3.md](prompts/turn3.md): it keeps the agent's mix with one
change, "Where I've worked" told by the pop-up book's piece, or by the
map's if the book already tells it, so one piece always changes world.

**Actor, runner and bounds** as in person test 2: Codex
(`evals/codex-build-run.mjs`, model and effort from `evals/lib/codex.mjs`),
capabilities `evals/builds/local-capabilities.json`, six turns, 30 minutes
each, 90 in all, 1.5 million uncached tokens. Cohort `codex-person-3`. One
repetition; a second only after a failure outside the agent (capacity or
tooling), recorded first.

**Environment.** Person test 2's, rebuilt on this machine where it was lost
to restarts, with one difference: Node 24.14.0 (official build, in
`~/.local/opt/node-v24.14.0-linux-x64`), because this machine's Ubuntu Node
22.22.1 cannot run the engine's `.ts` tests and person test 2's pinned
22.22.1 is gone. The npm cache (`npm_config_cache=/tmp/storyfolio-npm-cache`)
and Playwright's browsers (`PLAYWRIGHT_BROWSERS_PATH=/tmp/storyfolio-browser-cache`,
Chromium 1248 and its headless shell) are under `/tmp`, which the actor may
write; the three browser libraries are in `/var/tmp/chromium-libs`
(`LD_LIBRARY_PATH`); `LANG=C.UTF-8`; `TMPDIR=/var/tmp/storyfolio-person-3`.
The setup evidence records them. No model is called before turn 1.

**Gates.** Root reads each turn's reply and workspace before the next fixed
prompt, and writes `gates/after-N.json`.

- After turn 1: stop if the reply gives a concept, a mix or a design, or
  publishes anything.
- After turn 2: passes when `content/person.ts` holds only confirmed facts
  (none of the five traps in `expectations.json`), `content/mix.ts` holds
  one mix, the agent ran it at desktop and phone size, and the reply gives a
  reason for each chapter's piece from the fact sheet, what each shows and
  leaves out, the gallery's address and the invitation to swap, change,
  suggest a component or describe a design of his own; and
  `docs/story/concepts.md` records the mix and reasons. Root serves the
  workspace's site and looks at it at both sizes. Stops if the mix is not
  running, a trap is in the facts, or scene code of the agent's own
  replaces the pieces unasked. How the agent answers "It should look like
  the field I work in" is recorded, and does not stop the run.
- After turn 3: passes when `content/mix.ts` has the swap,
  `docs/story/concepts.md` records it, and a storyboard is written. Stops
  if the swap is not made.
- After turns 4 and 5: recorded (the looks shown; what opens on a click and
  the wording versions), not stopping unless the site no longer runs.
- After turn 6: root serves a copy of the site, runs `npm run check`,
  shoots every hold and move at both sizes, judges it against
  [the criteria](../../builds/full-journey-3/criteria.md), and compares the
  cost with person test 2 (62 minutes, about 1.25 million uncached tokens).
  The author's review on a desktop and a phone decides.

A check folder the agent leaves outside the snapshot roots is moved out
intact with its hashes, as in `stage-3-person-1`.
