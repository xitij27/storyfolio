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

## What a planning conversation tests

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

## Engine verification evidence

The [plain-story engine record](engine/plain-story-1/) holds stage 2's
local engineering checks. These runs make no model evaluation calls and
do not establish the stage 3 agent build workflow. The shipped skill still
ends at an approved storyboard.

| Evidence | What it establishes |
|---|---|
| [Findings](engine/plain-story-1/findings.md) | Commands, outcomes, corrections, limitations and the current author-review gate |
| [Source provenance](engine/plain-story-1/source-provenance.json) | The V3 revision and selected source hashes used for extraction |
| [Dependency review](engine/plain-story-1/dependency-review.md) and [baseline](engine/plain-story-1/dependency-baseline.json) | Version decisions and their recorded evidence |
| `diagnostic-*` and `matrix-*` folders in the [engine record](engine/plain-story-1/) | Each attempt's manifest, logs, reports and screenshots; source hashes where recorded |
| [Light](engine/plain-story-1/visual-light.md), [dark](engine/plain-story-1/visual-dark.md) and [reduced-motion](engine/plain-story-1/visual-reduced.md) visual reviews | Human-readable screenshot observations, tied to their stated capture set |
| [Tooling record](engine/plain-story-1/tooling.md) | Scaffold and checker development checks |

Read the findings to identify the final accepted capture set; a failed
diagnostic or earlier matrix remains evidence and is not overwritten.
Reports and screenshots from different source versions must not be merged
into an apparent single passing run. Automated and visual checks precede
the author's real desktop/phone review, which is recorded separately.

To reproduce local engine checks, use Node 22.18 or later with native
TypeScript support and follow the [engine README](../skills/storyfolio/engine/README.md).
Install dependencies in a scaffolded copy, never inside the skill directory.
Keep commands, source versions and retained results in a new repository
evidence folder. A focused `--only` run or `--skip-build` run is diagnostic;
it does not substitute for a fresh complete acceptance run.

## Bounded build baseline

Stage 2 has the author's desktop and physical-phone approval. Stage 3's
[first baseline protocol](../docs/superpowers/plans/2026-10-11-build-baseline.md)
freezes one complete fictional [embedded case](builds/embedded-1/README.md),
three continuation prompts, the unchanged skill and approved engine. The
[completed first probe](runs/codex-build-1/findings.md) stopped after its
first turn at the token threshold. Example cohort names below are fresh
placeholders, not authorization for another paid run. This
is a build experiment from an approved storyboard, not a full-journey test.
No other skill is enabled. Recommendations and installation restraint are
observed; successful use of other skills and before-stop-1 timing are not.

Preparation and one-turn execution are separate:

```sh
node evals/codex-build-run.mjs --case evals/builds/embedded-1/case.json --cohort codex-new-build-1 --capabilities evals/builds/local-capabilities.json --dry
node evals/codex-build-run.mjs --case evals/builds/embedded-1/case.json --cohort codex-new-build-1 --capabilities evals/builds/local-capabilities.json --prepare
```

These make no model calls. Prepare freezes implementation and inputs,
scaffolds outside Git and records the initial folder inventory. Install
locked dependencies explicitly, retain commands and logs in the run's
`setup/`, and prove the actual capability profile in that workspace before
writing its digest-bound `setup/probe.json`. Give the actor the factual
setup result in `docs/story/environment-setup.json`. A coordinator probe
does not count as the actor checking its own machine.

`--turn 1` in place of `--prepare` starts the first paid turn. Later turns
require `--turn 2 --gate <saved-json>` and then `--turn 3 --gate <saved-json>`.
Each gate binds the previous result digest and describes the actual working
artifact and offered choice. Stop if that stopping point was not reached;
do not improvise prompts or advance automatically. The protocol allows at
most three turns in one conversation and one fresh Astra judge, with
explicit wall-time limits and a between-turn token threshold. Review actual
usage with the author before any further paid conversation or retry.

[The independent checker](check-build.mjs) takes `--workspace`, frozen
`--expectations`, a new `--out` directory outside the actor workspace, and
`--dependencies` pointing to a separate coordinator project root. This argument is required.
Next runs from the app's resolved installation after its package identity
and CLI hash match the trusted copy, avoiding mixed runtime modules.
TypeScript, lint and Playwright use the coordinator installation. Full
transitive dependency integrity is not established. The checker calls
known tool entry points and checks six browser conditions. Preserve source
hashes before and after, all reports, screenshots and visual observations.
[Its scope](builds/acceptance.md) describes what still needs manual review.
[The final smoke](builds/acceptance-smoke-1/findings.md) and
[capability probe](builds/environment-probe-1/findings.md) are engineering
evidence, not paid baseline results.

```sh
node evals/codex-build-judge.mjs --run evals/runs/codex-new-build-1/embedded-1/baseline-1 --acceptance acceptance/manifest.json --dry
```

Omit `--acceptance` for an incomplete build without a full acceptance run.
The dry invocation validates preserved evidence and constructs the prompt
without a model call. Removing `--dry` spends the single judge allowance.
The judge refuses altered inputs, overwrite, silent truncation and automatic
retry. Its text evidence excludes image pixels, so save screenshot review
separately. Keep automatic findings, judge verdicts and coordinator review
distinct. A complete model turn does not mean a completed build stage.

Default inline preparation enforces both the two-MiB UTF-8 byte allowance and
the observed CLI maximum of 1,048,576 characters. The character guard uses
JavaScript UTF-16 code units, conservatively counting an astral character
as two. Raising a byte allowance cannot bypass this independent guard.
The [completion packet diagnosis](runs/codex-build-completion-1/embedded-completion-1/baseline-1/audits/judge-packet-size.md)
records the real rejection and why minification is insufficient. Keep full
evidence; do not silently truncate it or retry an exhausted attempt.

New cases may explicitly freeze `judgeTransport: "paged-v1"` before the
actor. The [transport study](runs/judge-transport-1/findings.md) documents
lossless paging of the exact full logical prompt through one local read-only
MCP tool. The initial entry prompt retains the inline guards. Full evidence
is bounded at 8 MiB and 512 pages; page text targets 32 KiB with each complete
wire response at most 64 KiB. All pages need matching served-response
receipts before the original citation/schema checks can accept a score.
`--dry` constructs and validates the complete bundle without starting its
accessor or a model. There is no automatic inline-to-paged fallback or
runtime transport override. Keep transport, helper code and bounds frozen
across a matched comparison. Existing attempts remain immutable.

The one fresh judge turn and ten-minute deadline remain. MCP tool iterations
may add inference requests and token usage within that turn. Served pages
are not proof of semantic reading, retained model history or context fit.
Local protocol/configuration tests do not claim an actual model can score
the largest packet; incomplete delivery or context failure yields no score
and no retry. No new paid allowance follows from the transport repair.

Current checker and judge corrections are documented in the
[non-model calibration](builds/checker-calibration-1/findings.md). Original
cohort copies preserve their earlier implementation. To reproduce a frozen
historical judgement, use its recorded implementation revision; do not
modify old inputs to accommodate current code. CLI JSON can omit image
calls, so absent visual events are not proof of skipped image review.

### Prototype-depth preparation

The newer [prototype-depth preparation](builds/bench-depth-1/README.md) uses
case/expectations schema 2 and `taskKind: "prototype-depth"`, not a requested
journey stop. Its one fixed prompt permits a five-beat, one-appearance
prototype. New headings are checked structurally; semantic and pixel review
remain separate. Version 1 retains its exact heading and stop mapping.
The new checker records all five rests, short viewport, forward/reverse
travel, discovered controls, reduced-motion stillness and post-context-loss
coverage with source/artifact hashes. These are measurements, not visual
approval. [Calibration and known blockers](runs/build-workflow-preparation-1/findings.md)
are retained outside the historical studies.

The author subsequently approved the final local freeze. The
[freeze study](runs/build-workflow-freeze-1/findings.md) now records the
prepared `codex-bench-depth-baseline-1` cohort, 121 fixed inputs, and passing
capability checks in its actual external workspace. Use that study's exact
recheck commands, not an invented fresh preparation command. Its digest is
`57b8614b2334d19a387829598e9978f7d5ecc0412bfd364448c1cb5643b77f7e`.
Do not overwrite the cohort, refresh its frozen files or copy held-out
prototype material into the workspace.

Keep the exact frozen Node, CLI, four environment values and disabled-skill
inventory. Runtime storage uses
`TMPDIR=/var/tmp/storyfolio-freeze-runtime-20261011`, which the runner does
not include in its capability digest. A separate retained setup record
binds it, and the study's final read-only audit enforces it. Factual actor
setup data is byte-bound to the retained coordinator record. Generated
trees remain explicitly excluded from source auditing; configuration
isolation is not a filesystem read jail.

The paid envelope is still unapproved. The proposed next allowance is one
fresh `gpt-6.1-sol` medium actor turn with a fifteen-minute deadline, then
at most one fresh `gpt-6-astra` medium text judge with a ten-minute deadline
after unpaid validation of the complete actual packet. No continuation,
correction or retry is included. These bound process time and invocations,
not usage or dollars; the one-turn token threshold is not a hard spending
cap. No `--turn` or paid judge invocation follows from local preparation.
The frozen prospective fixture/protocol wording remains unchanged; current
preparation status and remaining gates are recorded in the freeze study.

### Historical approved build continuation

The [completion protocol](../docs/superpowers/plans/2026-10-11-build-completion-proposal.md)
has the author's cost-review approval for one fresh conversation with at
most two actor turns and one judge. The
[completion fixture](builds/embedded-completion-1/README.md) copies the
saved first actor's spine without repairs. Its `setupMode: "existing-site"`
supplies the unchanged skill separately and skips engine scaffolding.
Its `requestedStops: [5, 6]` maps the two turns to chapters/copy and finish;
`refusalTurns: [1, 2]` records the fixed prompts declining optional skills.
Earlier spine/look-choice and build-start preflight criteria remain
unobserved in this fresh continuation.

The runner retains the total-token threshold and also checks
`bounds.maxUncachedTokens` between turns. It sums reported actor input minus
cached input plus output, requiring reliable nonnegative counters with
cached input no greater than total input. Missing or invalid accounting
stops advancement. These limits cannot cap one in-flight turn. A source
snapshot, completed model turn or passing check alone does not establish
the actual copy-choice gate. Preserve the coordinator's evidence-backed
gate before sending the second prompt. Preparation and all results use a
new cohort; the exhausted original baseline remains immutable.

This allowance has now been used. The [completion findings](runs/codex-build-completion-1/findings.md)
record two finished actor turns, six passing independent browser conditions,
49 reviewed images and one judge invocation rejected before a model turn
by the CLI character limit. The author had explicitly raised only that
attempt's local byte allowance to three MiB. No judgement or usage report
was produced and no retry was made. Further conversations need a new
question and cost decision; the current skill remains planning-only.

## Single-turn existing-portfolio review pilot

`review-run.mjs` evaluates one review request against an allowlisted local
source snapshot. This is separate from the three-turn planning protocol
and its scores. The first real case is `reviews/steve-source/case.json`;
it is not a fictional person and does not belong under `people/`.

The case supplies an exact request, material root, relative file allowlist,
criteria path and source provenance. A cohort freezes source bytes, skill,
request, criteria, implementation and capability settings. Only material
and the skill enter the agent workspace. Use a fresh cohort name:

```bash
node evals/review-run.mjs --case evals/reviews/steve-source/case.json --cohort codex-new-review-1 --invocation natural --rep 1 --dry
node evals/review-run.mjs --case evals/reviews/steve-source/case.json --cohort codex-new-review-1 --invocation natural --rep 1 --prepare
node evals/review-run.mjs --case evals/reviews/steve-source/case.json --cohort codex-new-review-1 --invocation natural --rep 1
```

Dry/prepare make no model calls; the last command spends model usage. All
three inspect the installed Codex version and may need outer-sandbox
escalation. Explicit invocation appends a skill request and is a separately
labelled diagnostic, not evidence of automatic discovery.

The runner preserves raw events, replies, generated files and changed or
deleted source bytes. Completed outputs are verified and preserved; changed
inputs require a new cohort. Failed runs remain in place and a deliberate
retry needs a new repetition. Manually assess review criteria and source
claims, saving findings beside the cohort. Do not use `report.mjs` or either
planning judge for these reviews. The agent has no network/browser tools;
the runner is not GitHub acquisition or a live browser audit. Independent
runtime observations must remain separate from a fixed source-only test.

The active scope and run budget are in
[the Steve pilot plan](../docs/superpowers/plans/2026-10-11-steve-review-pilot.md).

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
