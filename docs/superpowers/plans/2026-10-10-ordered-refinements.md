# Ordered refinements after the targeted and STEM comparisons

On 10 October 2026 the author said: "okay then let us proceed with this
order", accepting the recommendation in `2026-10-10-next-validation-priorities.md`.
Proceed with privacy, unsupported premises, then a review of creative failures.

## 1. Private files

Evidence: `evals/runs/codex-stem-1/phd/with-1/` reads participant contacts
after reading the profile reference. That reference begins by telling the
agent to read everything. Its explicit exception is under LinkedIn.

Make one candidate: put a general unopened-file boundary before the reading
instruction in the profile reference, and scope reading to profile material.
Keep the main skill, fixtures, prompts and rubric unchanged.

Run `codex-privacy-1`: PhD, analyst and student twice each with the skill,
using Sol medium and independent Astra medium judgements. Inspect every
shell command and output for actual private reads; preserve heuristic flags
when correcting filename-only false positives. Compare per case against
PhD in `codex-stem-1` and analyst/student in `codex-sol-2`, acknowledging the
unequal number of previous PhD repetitions. Do not pool those old cohorts
into a pretend matched baseline. Report all criteria and retain failures.

## 2. Unsupported premises

After recording the privacy result, inspect the remaining hurried analyst
failure in `codex-sol-2/analyst-hurried/with-2/`. Its opening and central
question inherit a field from an employer name despite unanswered duties.
Make a narrow correction only if the saved conversation supports it.

Use a separate iteration, `codex-premise-1`, with analyst-hurried and student
twice each. Preserve the accepted privacy wording. This tests the observed
miss and student regression coverage without another whole-suite batch.
Compare against the same cases in `codex-sol-2`, explicitly noting that the
privacy edit is also present. Keep fixtures, prompts and rubric fixed.

## 3. Creative review

Review the saved STEM concepts and physics/analyst creative failures, the
existing concept/storyboard references and the closing-answer rubric.
Distinguish missing source evidence from weak design and judge variability.
Record concrete examples and decisions. Do not add an instruction solely
because all six STEM objects are paper surfaces; assess what the objects
explain. No new paid creative round or rubric rewrite is predeclared here.

## Limits and records

One candidate and one focused batch per factual question in this piece of
work, not repeated sampling until passes appear. Six privacy conversations
and up to four premise conversations, each judged once. If a candidate
fails, preserve the result and explain the remaining limitation. Broader
validation waits for a stable candidate. Commit each skill candidate before
its runs and run the required local checks before each commit. Record all
outcomes in `evals/runs/` and current state in `docs/handover.md`.

## Outcome

Completed the declared order with ten conversations and ten judgements,
without retries. Privacy candidate `8adaaa3` fails both PhD repetitions;
the two analysts preserve private files. Its general boundary is retained
as a scope clarification, not a demonstrated fix. Full bar: 1/6.

Premise candidate `94faf60` removes the saved unsupported genomics framing
in both new hurried-analyst repetitions. All four final plans are factually
clean; the full bar is 0/4, down from 1/4 for the matched earlier cases.
Keep the targeted factual result distinct from overall quality.

The creative step is an offline evidence review, saved in
`evals/runs/codex-creative-review-1/findings.md`. No new creative rule or rubric
change was justified in this round. It identifies actual explanatory
relationships, missing public work evidence and a review interpretation of
the closing-answer requirement. All original scores remain unchanged.

Both cohort verifiers, skill/fixture checks, unit tests and skill-creator
validation pass. The privacy problem is unresolved. Further enforcement
work, concrete concept review and broader validation remain separate work.
