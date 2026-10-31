# Repetition 1, turn 2: stopped by the runner's snapshot bound

The agent finished turn 2 (437 s, about 154,000 uncached tokens) and its
reply is complete, but the runner's capture after the turn failed:
"Snapshot file bound exceeded: 400". The snapshot holds the installed
skill under `.agents` (269 files, now that the skill carries the gallery's
library), the agent's `site/` (123) and `docs/` and `material/` (8 with
`README.md`): 401 files. Without turn 2's snapshot the runner cannot send
turn 3, and rewriting its record by hand is not done. This is a tooling
failure outside the agent, so the protocol's second repetition is used
([amendment](protocol.md#amendment-31-october-repetition-2)).

What the agent made at stop 2, for the record (not a gate):

- **The mix:** `sheet,map,sheet,sheet,sheet,sheet,sheet,sheet` in
  `site/content/mix.ts`, seven chapters (no quotes), with a reason for each
  from the fact sheet in `docs/story/concepts.md`, and what it leaves out.
- **The field ask:** paper, tied to his own runbook, cutover checklist and
  rollback plan ("What I work from"), not an emblem of his field.
- **Shown running:** `npm run check` passed, 39 shots looked at, all six
  project windows opened; the reply gives the local address, the gallery's
  address and the invitation to swap, change or describe another scene.
- **The traps:** 99.98% for the Order API over 26 months, no zero
  downtime; on-call as "we"; ferry credited to its creator; Lumen Pay as
  its line.

Its workspace stays at
`/var/tmp/storyfolio-person-3/storyfolio-evals/build-full-journey-3-CmAuEI`,
and its records under `evals/runs/codex-person-3/`. A second
`.local-checks` folder the agent left there is not moved: repetition 1
ends here.
