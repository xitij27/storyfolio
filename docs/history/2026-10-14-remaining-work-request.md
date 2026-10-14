# Remaining work request, 14 October 2026

The author asked, verbatim:

> OK So what else is left Help me create a detailed documentation by checking the existing documents in the code base and deciding where are we remaining and how much more is left in order to complete this skill

Root read the reading map, the handover, the original design, the
controlling stage review, the 13 October stage plan, the Stage 3
completion and remaining-proof records, the packaging plan, the plan
index, the current timing-proof study and its dispositions, the skill and
its five references, and the build runner's budget accounting at
`5b43aec`. No model, browser, judge, installation or paid run was started.

The answer is the [remaining-work document](../superpowers/plans/2026-10-14-remaining-work-to-completion.md).
It consolidates the earlier plans into one ordered checklist and estimate.
It does not replace their requirements, change the skill, add evaluation
authority or approve anything on the author's behalf.

One new observation is recorded there: by root's projection from saved
usage, the current proof's 12000000 reported-token ceiling and its
remaining 4298837 ms of cumulative actor time may run out before fixed
turn 6. This is a projection from earlier runs, not an observed failure.
The document recommends that the author settle the ceiling policy before
turn 4, without changing the protocol here.

The README and the handover's "What exists now" section still describe a
planning-only skill with four references. The document records this as
documentation lag, consistent with the 13 October plan, without editing
public claims before Stage 3 acceptance.

## Verification on this checkpoint

- `node evals/check-skill.mjs`: pass, 765 words and five references.
- `node evals/check-people.mjs`: pass, 17 cases.
- `npm test` with the host `/usr/bin/node` v22.22.1: 236 tests reported,
  14 files fail with `ERR_UNKNOWN_FILE_EXTENSION` on `.ts`. This is the
  known host limitation recorded in the handover, not a regression.
- `npm test` with the native Node v22.22.1 at
  `/tmp/storyfolio-node-check-20261011/node_modules/node/bin`: 351 passed
  across 31 suites, zero failed, cancelled or skipped; 12.137 seconds.
- `git diff --check`: pass. No em dashes in the changed files. All 29
  relative links in the two new documents resolve.

Only documentation changed: the new plan, this record, and navigation
entries in the handover, documentation map, plan index and history
index. Committed on `main`; no push.
