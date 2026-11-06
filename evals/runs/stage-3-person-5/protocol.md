# Person test 5: person test 2's fixture, on the sheet with its moves

Written before any actor, 6 November 2026, on the author's "fine looks
okay lets proceed" to launching it
([record](../../../docs/history/2026-11-06-what-is-left.md#person-test-5-goes-ahead)).
The skill and engine are `main` at the commit that adds this file: one
world per site, the sheet's three moves offered at the look stop
([sheet-moves-1](../../engine/sheet-moves-1/README.md)), and person test
4's engine fixes ([stitch-4](../../engine/stitch-4/README.md)).

**Question.** With the moves and the fixes, does a fresh agent tell Dawit's
site on the sheet, show the moves next to the looks at stop 4 and let him
choose, leave `stitch/` and the page around the story unchanged, and finish
the site through stops 3 to 6 with only confirmed facts? Does the author
now find it a good portfolio, with transitions that "wow"?

**Fixture.** `evals/builds/full-journey-3`. Turns 1, 2, 4 and 6 are person
test 2's, byte for byte. Two answers change:

- Turn 3, [prompts/turn3.md](prompts/turn3.md): the whole site on the
  sheet, kept if it already is. The author found the sheet "definitely
  better" than the map on 1 November.
- Turn 5, [prompts/turn5.md](prompts/turn5.md): takes the recommended look
  and the recommended move, since stop 4 now offers both.

**Actor and runner** as in person tests 2 to 4: Codex
(`evals/codex-build-run.mjs`), capabilities
`evals/builds/local-capabilities.json`, cohort `codex-person-5`, one
repetition; a second only after a failure outside the agent, recorded
first.

**Bounds** as in person test 4: six turns, 45 minutes each, 180 in all,
2 million uncached tokens; snapshot 1500 files, 64 MB.

**Environment** as in person test 4's protocol, with
`TMPDIR=/var/tmp/storyfolio-person-5`, recorded by
[environment.mjs](../stage-3-person-3/environment.mjs). No model call
before turn 1.

**Gates.** Root reads each turn's reply and workspace before the next fixed
prompt, and writes `gates/after-N.json`. At every gate root records whether
the agent changed `stitch/` or put anything over the scene.

- After turn 1: stop if the reply gives a concept, a world or a design, or
  publishes anything.
- After turn 2: passes when `content/person.ts` holds only confirmed facts
  (none of the five traps; his study placed at Addis Ababa), `content/mix.ts`
  tells every chapter in one world, the agent ran it at desktop and phone
  size, and the reply gives the world and why, what each chapter shows and
  leaves out, the gallery's address and the invitation to choose another;
  and `docs/story/concepts.md` records it. Root serves the site and looks
  at it at both sizes. Stops if the site is not running, a trap is in the
  facts, or the agent mixes worlds unasked.
- After turn 3: passes when `content/mix.ts` is the sheet for every
  chapter, `docs/story/concepts.md` records the choice, and a storyboard is
  written. Stops otherwise.
- After turn 4: recorded, not stopping unless the site no longer runs.
  Records whether the looks and the sheet's moves are shown, each running.
- After turn 5: recorded, not stopping unless the site no longer runs.
  Records the move and look set in `content/site.ts`.
- After turn 6: root serves a copy of the site, runs `npm run check`,
  shoots every hold and move at both sizes, judges it against
  [the criteria](../../builds/full-journey-3/criteria.md), and records the
  cost against person test 4 (43 minutes, about 2.1 million uncached tokens
  as reported). The author's review on a desktop and a phone decides.

A folder the agent leaves outside the snapshot roots is moved out intact
with its hashes, as in `stage-3-person-1`.
