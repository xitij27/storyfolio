# Diagnostic rubric v2: six saved conversations

On 10 October 2026 the author accepted the recommendation to improve
evaluation diagnostics. Implementation `fd8656b` was reviewed and tested
before these six fresh Astra medium judgements. This is one calibration of
a changed rubric, not another portfolio conversation cohort or a test of a
new skill. Every rating is retained, including changes outside the intended
distinctions. Nothing was rejudged to obtain a preferred result.

## What the calibration establishes

The split trap fields record the two previously conflated actions correctly.
The hurried analyst asks what Rafael personally did at each employer while
already describing his work as "genomics operations". V2 records both
`raised_or_excluded: true` and `asserted: true` for `helix-not-genomics`.
The discovery criterion now passes, while the independent no-assertion
criterion fails the full bar. Separating the fields has not excused the
wrong premise.

The student padding case records `false` for both fields: it does not raise
or explicitly exclude invented padding in its first reply, and it does not
invent any. Discovery still fails. This does not establish a need for the
skill to add another question, nor does it mean the student plan fabricated
testimonials. `invented` is empty in all six ratings; only the hurried
analyst still has a wrong final trap reading.

The two saved analyst closings retain the intended distinction. Repetition
1 leaves an "answer placeholder based on facts" and fails `hasQuestion`.
Repetition 2 specifies an answer connecting a question, evidence with limits,
and a next action, grounded in the person's confirmed memo structure, and
passes while final captions remain deferred.

## The creative boundary remains unsettled

The backend still passes backdrop. Its paired request cards expose matching
keys to explain repeat recognition, and its proportioned bars explain a
scoped benchmark comparison. Equivalent HTML and static fallbacks do not
invalidate that explanation.

The physicist also receives a backdrop pass under v2, unlike its original
v1 rating. The judge cites separate contribution and result sheets that
distinguish Iris's own consortium work from the laboratory's residual
reduction. Those arrangements are present in the saved storyboard, so this
is not an invented reason. But it is a relationship of attribution, not
an explanation of the actual calibration procedure or decision that the
offline creative review hoped to distinguish. The fixture still supplies
no actual procedure or schematic. This calibration therefore does not
establish a stable backend/physics backdrop distinction.

V2 also gives analyst repetition 2 a backdrop pass for its five-hour and
two-hour bars on a shared zero-based scale. This is directly specified in
its storyboard. It changes that saved plan's full-bar outcome from fail to
pass under the new rubric. The agent's plan did not improve between ratings.
Keep the original result and describe this as changed measurement.

Do not tighten the skill or ban document objects to force these cases apart.
The planned evidence-rich physics comparison addresses the missing example
separately. If the author later wants the rubric to require an actual work
decision rather than an attribution relationship, that would be another
explicitly versioned criterion change, with comparison evidence, not a
silent reinterpretation of these results.

## All changes remain visible

| Saved case | V1 to v2 criterion changes | Full bar |
|---|---|---|
| `codex-sol-1/analyst-hurried/with-1` | Discovery fails to passes; closing question passes to fails; first assertion remains present and is now independently in the bar | Fail in both |
| `codex-sol-2/analyst/with-1` | Swap fails to passes; closing answer and backdrop still fail | Fail in both |
| `codex-sol-2/analyst/with-2` | Backdrop fails to passes | Fail to pass under v2 |
| `codex-sol-2/student/with-2` | No criterion outcome changes; padding avoidance and discovery now have separate evidence | Fail in both |
| `codex-stem-1/backend/with-1` | No criterion outcome changes | Pass in both |
| `codex-stem-1/physicist/with-1` | Closing question passes to fails; backdrop fails to passes | Fail in both |

The fresh judge changes four of six criterion sets. Its swap change for
analyst repetition 1 is outside the explicit v2 anchor changes. That is a
reminder that individual creative ratings vary. These cases were selected
for known diagnostic boundaries, and the rubric changed at the same time
as the judge invocation. Do not pool them as new agent runs, infer a skill
success rate, or attribute every score difference to the revised wording.

The physics closing failure is also worth preserving: the new judge treats
the promise of a contribution summary as insufficient to resolve what makes
a timing measurement trustworthy. The original rating remains available;
no retrospective skill claim is based on this one fresh interpretation.

## Provenance and verification

The exact source evidence prefixes were copied from the six original
`judge-prompt.md` files; only the reporting instructions changed. The
resolved example instructions were retained. Scoring fixtures and truth
were read from each source run's recorded harness commit, then snapshotted:
`13f7ced`, `e485f53` and `6b05309`. The manifest records their paths and
SHA-256 hashes, the v2 implementation/schema, every original file in the six
run directories, and the three original cohort reports.

Six judgements completed with exactly one attempt each, maximum concurrency
two, and no runner failures or retries. All judges used `gpt-6-astra` with
medium reasoning. Reported usage totals: 149,383 input tokens, 7,754 output
tokens and 760 reasoning-output tokens; no dollar cost is supplied by this
runner. The frozen prompts and original scores, new ratings, raw streams
and process results are under `cases/`.

The initial preparation needed approved escalation because this environment
blocks Git subprocesses inside the sandbox. The judge calls used the
approved network execution path. Source/hash verification passed both at
judge completion and report generation. All ninety original run files and
all three original reports remain byte-identical to the prepared manifest.
The v1 scoring code, original judge prompt, original runners and reports
were not edited by this calibration.

The original saved prompts contain final file versions rather than complete
first-turn snapshots. The judge was explicitly told not to infer earlier
file contents from final files; its first-turn evidence here refers to the
saved first replies. Raw source events remain available for separate manual
inspection if a disputed first-turn file claim needs it.

Read the complete [report](report.md), [manifest](manifest.json) and
[implementation plan](../../../docs/superpowers/plans/2026-10-10-measurement-v2.md).
Verify these artifacts without another model call:

```bash
node evals/runs/codex-measurement-v2-1/verify.mjs
```
