# Person test 6: person test 5 again, with turn 3 naming only the world

Written before any actor, 6 November 2026, on the author's "okay let us
test it"
([record](../../../docs/history/2026-11-06-person-test-5-review.md#person-test-6-goes-ahead)).
The skill and engine are `main` at the commit that adds this file, with
[stitch-5](../../engine/stitch-5/README.md): project windows that play.

**Question.** Does the skill's stop 4 offer the looks and the sheet's moves,
each running, and wait for the choice? In person test 5 the agent did not,
having read turn 3's "keep everything else as it is" as keeping night and
swing ([gate 4](../stage-3-person-5/gates/after-4.json)). And does the
author find the finished site a good portfolio?

**Fixture and prompts** as person test 5's ([protocol](../stage-3-person-5/protocol.md)),
except turn 3, [prompts/turn3.md](prompts/turn3.md): it names only the
world, the sheet, and drops "Keep everything else as it is". Turn 5 is
person test 5's (the recommended look and move).

**Actor, runner, bounds and environment** as person test 5's, with cohort
`codex-person-6` and `TMPDIR=/var/tmp/storyfolio-person-6`.

**Gates** as person test 5's. After turn 4, root records whether the reply
shows the looks and the moves, each running, and asks for a choice; that is
this run's question, and it does not stop the run.
