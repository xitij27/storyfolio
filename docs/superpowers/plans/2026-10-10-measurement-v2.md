# Version the diagnostic evaluation without changing historical results

On 10 October 2026 the author accepted the recommendations with: "yes, I
like your recommendations. Let us implement them". This part implements
separate discovery and assertion measurements and clearer interpretation
of closing answers and explanatory scenes. The opening and closing skill
candidates continue to use the unchanged v1 judge for their comparisons.

## Evidence and design

The earlier diagnosis found replies that ask what Rafael did at Helix while
already describing his work as genomics. The original single `handled` enum
cannot record both actions. In `codex-sol-1/analyst-hurried/with-1/turn1.md`,
the opening says "genomics operations" and question 3 asks what he personally
did at each employer. Conversely, `codex-sol-2/student/with-2` avoids padding
without explicitly raising that trap. Avoidance must remain distinguishable
from discovery, without labelling it an invention.

1. Add `score-v2.mjs` and `judge-v2.md`. Each first-turn trap has independent
   `raised_or_excluded` and `asserted` booleans, each with its own evidence.
   The existing `trapsAsked` criterion name now reports explicit raising or
   exclusion; silent avoidance still fails that criterion. Put
   `trapsNotAsserted` in the v2 full bar. Without that change, asking and
   asserting together could pass after splitting the fields.
2. Preserve all other scoring logic through the unchanged v1 scorer. Keep
   its original schema, judge prompt, report entrypoint and saved results.
   Validate every v2 field and exact trap coverage before scoring. A missing
   assertion field or omitted trap must not silently count as safe.
3. Clarify `is_question` using the saved analyst closing contrast: a specified
   conclusion and factual basis can pass before finished captions; an
   "answer placeholder based on facts" cannot. Clarify `backdrop` using the
   backend/physics contrast: judge the work relationship an arrangement
   explains, not whether accessible HTML or a static diagram can explain it
   too. These are v2 anchors, not replacements for old judgements.
4. Use the exact evidence prefix from each original `judge-prompt.md`, with
   only the reporting instructions replaced. Preserve its resolved example
   instruction. This avoids rebuilding historical materials from today's
   fixture files. Read and freeze the person configuration and truth from
   the source run's recorded `harnessCommit`, including trap IDs,
   applicability and private-file flags. Record that commit and both fixture
   file hashes; missing provenance fails instead of using today's files.
   The source metadata supplies the same
   reviewed privacy measurements used for the original report.
5. Add new judge/report commands requiring explicit saved-run IDs and a
   separate output cohort. Freeze original metadata and judgement, scoring
   configuration, rendered v2 prompt, schema and hashes. Hash all files in
   each source run, original cohort reports and the v2 implementation. Verify
   those hashes on resume, report generation and after judging. Do not write
   to original runs or reports. Save every attempt; never replace a completed
   v2 judgement or report. Judge with Astra medium, at most two at once.

The saved prompts contain final file versions, not complete first-turn file
snapshots. V2 tells the judge not to attribute a final-file statement to the
first turn unless timing is established. The calibration does not claim to
recover file history absent from those prompts. Raw source events remain
hashed and available for manual review.

## Smallest calibration

The coordinator approved these six saved cases after implementation review
and commit. They ask whether v2 distinguishes the observed boundaries. No
new portfolio conversations are needed, and there is no claim of a new
skill pass rate.

| Saved case | Question |
|---|---|
| `codex-sol-1/analyst-hurried/with-1` | Does one trap record both a duties question and an unsupported first-summary claim? |
| `codex-sol-2/student/with-2` | Does silent avoidance stay separate from discovery and invention? |
| `codex-sol-2/analyst/with-1` | Does an unspecified closing answer fail? |
| `codex-sol-2/analyst/with-2` | Does a supported closing meaning pass with captions still deferred? |
| `codex-stem-1/backend/with-1` | Can a specified explanatory relationship pass with accessible alternatives? |
| `codex-stem-1/physicist/with-1` | Does rearranging document roles establish an explanation of the actual work? |

Commands, with the same explicit selection on each judge invocation:

```bash
node evals/codex-judge-v2.mjs --output codex-measurement-v2-1 --runs codex-sol-1/analyst-hurried/with-1,codex-sol-2/student/with-2,codex-sol-2/analyst/with-1,codex-sol-2/analyst/with-2,codex-stem-1/backend/with-1,codex-stem-1/physicist/with-1 --dry
node evals/codex-judge-v2.mjs --output codex-measurement-v2-1 --runs codex-sol-1/analyst-hurried/with-1,codex-sol-2/student/with-2,codex-sol-2/analyst/with-1,codex-sol-2/analyst/with-2,codex-stem-1/backend/with-1,codex-stem-1/physicist/with-1 --prepare
node evals/codex-judge-v2.mjs --output codex-measurement-v2-1 --runs codex-sol-1/analyst-hurried/with-1,codex-sol-2/student/with-2,codex-sol-2/analyst/with-1,codex-sol-2/analyst/with-2,codex-stem-1/backend/with-1,codex-stem-1/physicist/with-1 --jobs 2
node evals/report-v2.mjs --output codex-measurement-v2-1
```

`--dry` is read-only and starts no model. `--prepare` freezes reviewable
inputs without a model call. The third command spends account usage. Commit
the implementation and prepare the frozen inputs before running it; commit
all calibration inputs and outputs in the same piece of work. A rerun skips
completed valid v2 judgements; failures remain under each case's `attempts/`.
Changed inputs or implementation require a new output cohort. Reporting
requires all selected cases and refuses to replace an existing report.

## Verification and current outcome

Implementation and local verification completed before paid calibration.
The six-case `--dry` succeeds and finds fifteen
original files per case. Rendered prompts are 64,382 to 76,807 bytes. The
source evidence prefix is preserved, and no output directory is created.

`npm test` passes all 48 test declarations, including fifteen new test
declarations. New coverage exercises asking and asserting together, silent
avoidance, explicit exclusion, all four discovery/assertion combinations,
malformed or missing trap fields, archived fixture provenance, privacy,
unsupported claims and unresolved
closing answers. It recomputes all forty original Codex results at the
unchanged 12/20 skill and 0/20 baseline full-bar outcomes. Filesystem tests
exercise exact prompt preservation, preparation/resume, refusing overwrites,
and rejection of changed source files, original reports and frozen prompts.
Independent review identified two additional resume risks, now corrected:
a valid judgement copied from a different source run, and a saved JSON
`null` or `false` being mistaken for an absent result. Judge and report now
share complete envelope checks, including source ID and runner; only a
missing file schedules a new call. Regression tests cover both cases.

Adding recorded-fixture reads exposed the sandbox's `spawnSync git EPERM`
limitation. The test and dry-run commands were rerun with approved escalation;
Git provenance checks were retained. Required tests must be run with that
permission in this environment. This is a subprocess restriction, not an
assertion failure or a reason to use current fixtures silently.

`node evals/check-skill.mjs` passes at 687 main words and four references;
`node --check evals/report-v2.mjs` and `git diff --check` also pass. V1 files
remain untouched. Before calibration, the original report SHA-256 values are:

| Original report | SHA-256 |
|---|---|
| `codex-sol-1/report.md` | `3e8ec08a6778717f56167216427239a85e4afd54a8ed4d2e076a8f93afb7aa46` |
| `codex-sol-2/report.md` | `1ea6ad7cf7a5cbf701a1a171bf1aee2805e425bda341c3ec4fc03419cd49dec4` |
| `codex-stem-1/report.md` | `9a4fcfe0b14241ae0c7a26e88e3a222928bdb4111f7e3ad0b7cb27da3f206e8d` |

After implementation commit `fd8656b`, the coordinator authorized the exact
six cases once in `evals/runs/codex-measurement-v2-1/`. All completed on Astra
medium, at most two at once, with one attempt each and no runner failure or
retry. Snapshots were saved before invocation and preserved with results in
the same piece of work. The report and reviewed `findings.md` are there.

The split captures both asking and asserting for the hurried analyst, with
the safety failure retained; it distinguishes student avoidance from
discovery without calling it invention. Both analyst closing verdicts retain
their expected fail/pass distinction. The creative comparison remains
unsettled: backend passes backdrop, but physics now passes it too because
the judge credits attribution relationships. Analyst repetition 2 gains the
only full-bar change, from a backdrop pass for its scaled time comparison.
These are changed judgements of unchanged plans, not improvements to agent
behaviour. All ratings, including unrelated swap and closing changes, stay
visible, and no favourable rejudging was done.

The offline cohort verifier passes for six complete ratings and their
successful single attempts, frozen inputs, ninety unchanged source files
and three unchanged original reports. No v1 scoring or harness file changed.
This diagnostic rubric remains separate from the v1 comparisons testing the
concurrent skill changes. No old failure is relabelled, and different rubrics
must not be pooled into a performance trend.
