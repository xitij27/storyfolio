# Bounded Stage 3 comparison approved

12 October 2026. The author answered the separately presented question:

> Your rules require paid agent runs before and after a skill change. May I run one fresh five-beat baseline and one matched improvement test, each with at most one judge? Limits: 15 minutes per build, 10 minutes per judge, no retries. These are time limits, not a hard token-cost cap.

Their exact answer was:

> Approve this bounded comparison

This approves the [prepared protocol](../../evals/builds/bench-depth-2/protocol.md):
one fresh unchanged-skill baseline, then at most one matched candidate only
if the reviewed baseline supports it. Each arm permits one actor turn of
at most 15 minutes and at most one judge of at most 10 minutes, after
complete-packet preflight. No retry, continuation, extra cohort, historical
rejudgement or push is authorized. These are process deadlines, not a hard
token or dollar cap; retain actual usage.

The assistant proceeds using skill-creator guidance: retain only supported
candidate instructions and test the same failure after a change. The
repository's stricter saved-run and commit rules still govern. Do not
declare Stage 3 complete from this bounded diagnostic. Natural build entry,
early-journey choices, planning regression and the author-approved non-sheet
full-site proof remain separate requirements and cost decisions.

## Execution record

The preceding local development is committed as `8f1eec3`. The new
[comparison study](../../evals/runs/stage-3-comparison-1/findings.md) will retain
setup, actual process outcomes, access and visual review, candidate selection
and usage. At authorization recording, neither fresh model has launched.
