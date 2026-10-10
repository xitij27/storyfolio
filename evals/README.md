# Running and reading the evaluations

Use Codex for new evaluations, as the author directed on 10 October 2026.
The current roles are `gpt-6.1-sol` agents and independent `gpt-6-astra`
judges, both at medium reasoning. Each conversation and judgement spends
model usage. Start with a specific question and its smallest useful study.

For results, read the [study catalogue](studies.md). For project status,
read the [handover](../docs/handover.md); for documentation navigation,
read the [documentation map](../docs/README.md). The
[historical Claude workflow](history/claude-workflow.md) is a verbatim
archive, not the workflow for new runs. The
[complete former runbook](../docs/history/2026-10-10-evals-readme.md)
preserves its original commands, results and explanations.

## What a conversation tests

A fictional person asks a fresh agent to plan a portfolio, without building
it. The same three messages are sent regardless of the agent's response:

1. Ask for a portfolio and point to `material/`.
2. Supply the person's answers, or the case's refusal or overstatement.
3. Ask for the complete plan.

The first reply shows what the agent checks before planning. The final
reply and written files show how it uses the answers. A fresh judge receives
the material, truth, conversation and files without the arm label. This
measures written planning, not a built site's visual or interaction quality.

| Location | Purpose |
|---|---|
| [people/](people/) | Fictional input material, private test files, truth sheets and case-specific traps |
| [prompts/](prompts/) | User messages and versioned judging instructions |
| [codex-run.mjs](codex-run.mjs) | One three-message conversation |
| [codex-run-all.mjs](codex-run-all.mjs) | Queue selected cases and repetitions, at most three at once |
| [codex-judge.mjs](codex-judge.mjs) | Original v1 judging of complete, unjudged Codex conversations |
| [report.mjs](report.mjs) | Generate the original rubric report for a new cohort |
| [lib/](lib/) | Shared runner, scoring, provenance and test code |
| [runs/](runs/) | Saved observations, raw events, plans, judgements and reviewed findings |

## Before spending model usage

Record the question, selected cases, repetitions, comparison group and
stopping rule in a plan. A skill change must link to a saved run that needed
it, then rerun the relevant cases. Keep fixtures, prompts and rubric fixed
when testing a skill candidate. A fixture or measurement change is a
separate experiment. Commit the candidate before running it so metadata
identifies committed skill bytes.

Run the local checks from the repository root:

```bash
node evals/check-people.mjs
node evals/check-skill.mjs
npm test
```

Choose a new iteration name and pass it explicitly to every command. The
examples below use `codex-new-question-1`, which is a placeholder for a new
study, not a completed cohort to resume. Check that your chosen directory
does not already exist. The runners' defaults still name historical
iterations, so do not rely on those defaults.

Specify `--people` explicitly. An unfiltered batch selects every current
fixture, including variants and the evidence-rich physics case. Do not
extend an old comparison accidentally. Do not combine model choices within
one iteration. `--model` is available on the three v1 Codex entry points;
use the established roles unless a different model comparison is the
question being tested.

## Run a new v1 cohort

For a planned comparison that includes the chef, first validate one baseline
conversation and its judgement:

```bash
node evals/codex-run-all.mjs --iteration codex-new-question-1 --arm without --reps 1 --people chef --jobs 1
node evals/codex-judge.mjs --iteration codex-new-question-1 --people chef
```

Read the three replies, raw events and judgement before the remaining batch.
Check isolation and private-file evidence where applicable. A with-skill
trial should also confirm that the agent finds and reads the native skill.
Use the actual planned case for this trial if the study does not include
chef, and use only the planned arm for a focused skill rerun.

For example, if the question calls for chef and student twice per arm:

```bash
node evals/codex-run-all.mjs --iteration codex-new-question-1 --arm without --reps 2 --people chef,student
node evals/codex-run-all.mjs --iteration codex-new-question-1 --arm with --reps 2 --people chef,student
node evals/codex-judge.mjs --iteration codex-new-question-1
node evals/report.mjs --iteration codex-new-question-1
```

The completed trial is skipped. Conversation failures stop new work from
being queued; restarting archives failed conversation attempts before
retrying and preserves completed runs. Interrupting the batch stops queuing
and lets active conversations drain. The v1 judge skips saved judgements,
but its failed prompt and stream can be replaced on retry: preserve those
artifacts before any approved retry. Do not rejudge to select a preferred
outcome.

Write reviewed observations beside the new runs. Include all failures,
actual output evidence, input versions, privacy review and limitations.
Commit the artifacts and update the study catalogue and handover.

## Isolation and measurement limits

The runner ignores user configuration, rules and project instructions. It
disables plugins, apps, memory, web search and installed global skills.
Only the with-skill workspace receives `.agents/skills/storyfolio`. Turns
two and three resume the first thread. Judges use fresh folders with shell
tools disabled. The harness uses the existing ChatGPT login and sandbox,
without a new skill installation or API key.

Conversation workspaces are outside the repository so repository
instructions do not become test inputs. Their retained results belong in
`runs/`, not just the temporary workspace. The standard sandbox restricts
writes and network access, but is **not a filesystem read jail**. Inspect
raw commands for reads of repository instructions, another run or global
skills. Historical audits found no cross-run content read in the reviewed
comparison; that does not establish technical prevention.

Codex shell events do not expose exact file read sets. Before treating any
privacy count as final, inspect every saved command and its output, including
broad searches, scripts, globs and batched reads. A filename inventory or
text written about excluded files can trigger a false positive. Confirmed
private content in a command's output is a read even if the final plan omits
it. Preserve original heuristic flags and command evidence, and record any
correction with an explicit review reason in the new cohort's metadata and
audit. Do not silently rewrite historical evidence.

Skill use is detected heuristically from a successful command reading
`SKILL.md`. Inspect raw events and reference reads when ambiguous. Token
usage is recorded; the Codex harness does not report dollar cost. These
measurements are not identical to the old Claude tool events.

The [privacy enforcement prototype](runs/codex-privacy-enforcement-1/findings.md)
tests deterministic shell access separately. It is not integrated into the
standard conversation runner and does not make skill instructions an
access-control boundary.

## Read v1 scores with the evidence

[score.mjs](lib/score.mjs) defines the bar: every applicable criterion must
pass except the three reported-only measures, `askedFirst`, `waited` and
`trapsNotAsserted`. Inspect the conversation before acting on a judgement.

A first-turn trap receives only `asked`, `avoided` or `asserted`. V1 cannot
represent asking and asserting in the same reply, and specifies no precedence
for that mixed case. An `asserted` verdict can make `trapsAsked` fail even
when the agent also asked the relevant question. Silent avoidance is also
different from explicitly raising or excluding the trap. Read the evidence
alongside the label.

The question criterion requires an opening question and a closing answer.
The skill defers finished captions; a supported closing meaning can satisfy
the planning requirement, while a promise to write an answer later does not.
The backdrop criterion concerns what the object explains. Equivalent
accessible HTML or static diagrams are not themselves evidence that a
scene is decoration. These interpretation notes do not replace the v1
rubric or any saved judgement.

Keep studies separate. Small independent repetitions, judge variability,
unequal older groups and intervening edits limit causal conclusions. A
standard report without `--baseline` shows only the selected iteration.
`--baseline` adds another iteration's no-skill arm; it does not create a
matched skill-before/skill-after comparison. Use a focused study's manifest
and comparison for that purpose. Do not pool different providers, models,
fixtures, rubric versions, reratings or selected subsets into a success rate.

## Optional diagnostic rubric v2

V1 remains the normal workflow. [judge-v2.md](prompts/judge-v2.md) and
[score-v2.mjs](lib/score-v2.mjs) separately record whether each trap was
raised or excluded and whether its wrong reading was asserted. Both
requirements gate the v2 bar. It also anchors closing meaning and
explanatory scenes with accessible equivalents.

Use explicit saved run IDs and a new output name. `codex-new-diagnostic-1`
below is a placeholder, separate from the completed calibration:

```bash
node evals/codex-judge-v2.mjs --runs codex-sol-2/analyst/with-1,codex-sol-2/analyst/with-2 --output codex-new-diagnostic-1 --dry
node evals/codex-judge-v2.mjs --runs codex-sol-2/analyst/with-1,codex-sol-2/analyst/with-2 --output codex-new-diagnostic-1 --prepare
node evals/codex-judge-v2.mjs --runs codex-sol-2/analyst/with-1,codex-sol-2/analyst/with-2 --output codex-new-diagnostic-1
node evals/report-v2.mjs --output codex-new-diagnostic-1
```

`--dry` is read-only; `--prepare` freezes inputs without a model call. The
third command spends model usage. V2 preserves attempts, skips completed
judgements and refuses to replace an existing report. It snapshots scoring
fixtures from recorded harness commits and verifies source conversations,
original judgements and original reports by hashes. Frozen cohorts require
their recorded implementation bytes. A changed rubric needs another cohort.
These are diagnostic reratings, not additional portfolio conversations or
evidence of improved agent behavior. See the
[completed six-case calibration](runs/codex-measurement-v2-1/findings.md).

## Inspect saved studies without new runs

The [catalogue](studies.md) links each study's findings, reports, manifests
and available verification scripts. These scripts make no model calls,
but some regenerate comparisons or audits and some require Git subprocesses.
Read their write behavior before running them against frozen evidence.
Likewise, `report.mjs` overwrites a report and reads current fixtures: do not
regenerate a historical report as an incidental documentation check.
Preserve original paths and bytes, including symlink targets. V2 freezes
exact directory membership, so even a new README inside a source run can
invalidate its provenance checks.
