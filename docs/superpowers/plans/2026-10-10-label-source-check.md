# Check the sources behind labels and summaries

The author replied "yes" to the diagnosis and recommended next change:
checking that sources support the exact wording of labels and summaries.
Apply that focused refinement and rerun its cases. The prior diagnosis is
`evals/runs/codex-sol-1-diagnosis/findings.md`.

## Change and evidence

Replace the final sentence-only check in `skills/storyfolio/SKILL.md` with
a claim check covering introductions, working titles and object labels.
Read the supporting fact and its unresolved questions; a reference by
itself is insufficient. Do not transfer a topic between items or reuse
unconfirmed profile wording. Retain the existing description, caption
safeguard, references, rubric, fixtures and model roles.

The evidence mapping is `evals/runs/codex-sol-2/written-against.md`, including
both no-skill failures and the current-skill failures. No fixture-specific
wording is added to the skill.

## Evaluation

Commit the skill before running it. Run chef, analyst, analyst-hurried and
student twice each, eight fresh Sol medium conversations, then eight fresh
Astra medium judgements using the unchanged rubric. The student checks for
regression from longer instructions. This repeats the same cases and counts
as the relevant subset of `codex-sol-1`; it is not a full-suite result.

```bash
node evals/codex-run-all.mjs --iteration codex-sol-2 --arm with --reps 2 --people chef,analyst,analyst-hurried,student
node evals/codex-judge.mjs --iteration codex-sol-2
node evals/report.mjs --iteration codex-sol-2
```

Compare against the matching eight old skill conversations, separately from
the original no-skill baseline. Do not use the report's `--baseline` option
to compare old and new skills: that option loads the old no-skill arm, and
would include all 20 baseline conversations against this selected eight.

Primary questions, recorded before new results:

1. Do all four analyst introductions avoid presenting unconfirmed genomics
   duties as fact while still asking what the person did?
2. Do both hurried plans keep those unconfirmed duties out of public labels
   and concepts after the user refuses to answer?
3. Do both chef plans refrain from supplying an unknown workshop subject?
4. Are there other invented or unconfirmed claims, or regressions in the
   students' attribution, asset permissions and planning completeness?

Inspect outputs and commands, including the private-file heuristic, before
accepting judge flags. Preserve original metadata flags if a reviewed
correction is needed. Record both rubric scores and evidence for these
questions. Creative criteria still count toward the bar but were not the
target of this edit. Do not rejudge to seek a more favourable result.

Stop after this candidate and targeted batch to report the evidence. If an
execution failure occurs, preserve the attempt and fix the actual blocker;
do not silently mix model versions or replace completed evaluations.

Run `node evals/check-skill.mjs`, `node evals/check-people.mjs`, `npm test`,
and the skill-creator validator. Record outcomes in this repository, update
the handover, and commit on main. No deployment or publication is needed.

## Outcome

Completed eight conversations and eight judgements, with no failed or
retried evaluation. The source-check refinement is `e485f53`; the two student
runs record concurrent fixture commit `6b05309`, whose skill files have the
same hashes. Selected fixtures, user prompts, model roles, runner and rubric
were verified unchanged. Judging ran in completed groups of three, three and
two while later conversations finished; no output was judged twice.

The matched factual scores improve: nothing invented 7/8 to 8/8; final claims
clean 6/8 to 7/8; first-reply assertions absent 5/8 to 7/8. Both chef plans
omit the unknown workshop subject. One hurried run still carries genomics
into the introduction and central question. The full bar falls from 3/8 to
2/8, including a student first-reply `avoided` rather than `asked` score and
creative misses. Do not call this an overall success or completed fix.

All artifacts, command/permission reviews, a manifest and the local matched
comparison are in `evals/runs/codex-sol-2/`. Four private-read heuristic flags
were reviewed and corrected with the original flags retained. Local checks
pass, including sixteen fixtures after the separate expansion. The local
comparison needed an approved retry after its Git subprocess was blocked by
the sandbox. The wording is retained as provisional; this candidate's test
is complete and further revisions need their own evidence and reruns.
