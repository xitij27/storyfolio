# Evaluation study catalogue

This catalogue separates new conversations, repeat judgements, offline
reviews and deterministic probes. It indexes every cohort present at the
10 October 2026 documentation migration and subsequent studies, including
incomplete work. The
linked findings are the authoritative observations; this page is navigation
and a short account of each study's question and limits.

For new work, use the [Codex runbook](README.md). For current conclusions and
remaining decisions, read the [handover](../docs/handover.md). People,
employers, institutions, products and records in `evals/people/` are fictional.
The planning studies do not prove the quality of a built website. The later
Steve review pilot uses a real source snapshot outside that collection;
its review criteria and independent runtime observations are separate.

## Study index

| Study | Kind and status |
|---|---|
| [1](#1-original-claude-comparison-complete) | Claude comparison, complete |
| [2](#2-deferred-claude-round-2-no-saved-runs) | Deferred rerun, no saved results |
| [codex-1](#codex-1-astra-only-harness-trial-partial-and-superseded) | Astra-only trial, partial |
| [codex-sol-1](#codex-sol-1-main-codex-comparison-complete) | Main Codex comparison, complete |
| [codex-sol-2](#codex-sol-2-source-checking-in-labels-and-summaries-complete) | Focused source-check rerun, complete |
| [codex-stem-1](#codex-stem-1-technical-and-academic-coverage-complete) | New-profile comparison, complete |
| [codex-privacy-1](#codex-privacy-1-wider-private-file-instruction-complete) | Focused privacy-instruction rerun, complete |
| [codex-premise-1](#codex-premise-1-summary-and-question-premises-complete) | Focused premise rerun, complete |
| [codex-opening-1](#codex-opening-1-plain-language-opening-meaning-complete) | Focused opening rerun, complete |
| [codex-closing-1](#codex-closing-1-supported-closing-meaning-complete) | Focused closing rerun, complete |
| [codex-physics-evidence-1](#codex-physics-evidence-1-richer-work-evidence-complete) | New-input experiment, complete |
| [codex-sol-1-diagnosis](#codex-sol-1-diagnosis-original-rubric-repeat-judging-complete) | Offline review and repeated judging, complete |
| [codex-creative-review-1](#codex-creative-review-1-offline-concept-review-complete) | Offline review, complete |
| [codex-measurement-v2-1](#codex-measurement-v2-1-diagnostic-rubric-calibration-complete) | Changed-rubric rerating, complete |
| [codex-privacy-enforcement-1](#codex-privacy-enforcement-1-shell-access-probes-complete-prototype) | Deterministic probes, complete prototype |
| [codex-steve-review-before-1](#codex-steve-review-before-1-real-repository-review-complete) | One natural source-only review, complete |
| [codex-steve-review-observations-1](#codex-steve-review-observations-1-independent-product-review-complete) | Source and local browser observations, complete |
| [codex-token-usage-audit-1](#codex-token-usage-audit-1-saved-usage-audit-complete) | Offline token accounting, complete with scope limits |
| [codex-build-1](#first-stage-3-build-baseline-11-october-2026) | Bounded spine conversation and judgement, complete within its cost gate |
| [codex-build-completion-1](#bounded-stage-3-completion-11-october-2026) | Two-turn implementation continuation, technically checked; visual result rejected |
| [codex-visual-quality-review-1](#visual-quality-review-11-october-2026) | Source and image review after author rejection; Stage 3 visual proof remains open |
| [visual-recovery-prototype-1](#visual-recovery-prototype-11-october-2026) | Historical three-beat implementation; author requested the deeper revision below |
| [visual-recovery-depth-1](#visual-recovery-story-depth-11-october-2026) | Manual five-beat revision; story accepted and phone confirmed, closing the bounded prototype gate |
| [build-workflow-preparation-1](runs/build-workflow-preparation-1/findings.md) | No-model diagnostic tooling, fixture and calibration; final freeze gated by shared-controls and judge transport |

## Cases and comparison rules

The fictional planning collection has seventeen cases representing twelve
people. The original
ten cases represent six people: analyst, analyst-hurried, analyst-overstate,
architect, chef, chef-terse, nurse, reliability, student and student-terse.
The hurried, overstatement and terse cases change the conversation, not the
person. The six technical and academic additions are backend, ml, embedded,
mechanical, physicist and phd. `physicist-evidence` supplies a separate richer
input for the same fictional physicist; it does not replace `physicist`.

| Added case | Role and distinctions the plan must preserve |
|---|---|
| [backend](people/backend/person.json) | Backend engineer: replay benchmarks, team delivery, open-source credit, internal traces |
| [ml](people/ml/person.json) | ML engineer: offline versus deployed, overall accuracy versus rare-defect recall, submission status |
| [embedded](people/embedded/person.json) | Embedded engineer: battery projection, firmware contribution, preliminary tests, engineering samples |
| [mechanical](people/mechanical/person.json) | Mechanical designer: simulation, fit-check model, patent application, drawing permissions |
| [physicist](people/physicist/person.json) | Physics postdoc: calibration versus discovery, consortium credit, preprints, grant role |
| [phd](people/phd/person.json) | Computational biology candidate: degree status, authorship, association versus causation, teaching, private records |
| [physicist-evidence](people/physicist-evidence/person.json) | Same physicist with an approved fictional schematic, correction decision and scoped reference check |

Backend, embedded and PhD use the terse messages, which do not request
fallbacks or enumerate the other site requirements. Each of these seven
added cases has four traps and a truth sheet, without prescribing an object
or concept. The original ten cases remain intact.

Unless a study says otherwise, Codex conversations use `gpt-6.1-sol` and
independent judges use `gpt-6-astra`, all at medium reasoning with the
original v1 rubric. "Full bar" means every applicable scored criterion,
not a judgement of built quality. Counts belong only to their own study.
There is no pooled success rate. Matching a case does not match random seeds
or remove intervening skill edits, unequal repetitions or judge variability.

Recorded commit IDs identify the checkout at invocation; they need not be
the commit that last changed the skill. Where two commits have identical
skill bytes, that is stated from the saved verification. Later manifests pin
input hashes; early studies do not retroactively gain that provenance.

## Conversation comparisons and focused reruns

### `1`: original Claude comparison, complete

Question: what does an agent already do, and what does the first skill add?
Ten cases, twice per arm: 40 complete conversations and 40 saved judgements.
Agents use the recorded alias `sonnet`, judges `opus`; exact model versions
and reasoning effort are not recorded. The with-skill metadata pins
`aff5bca`. This predates the five changes at `e178be2` and uses the original
ten fixtures. No cohort-wide fixture hash manifest was saved.

The full bar passes 0/20 without and 1/20 with the skill. Structure improves,
but unsupported storyboard sentences become a prominent failure. Historical
judge instability and an earlier lost judging pass are documented. The
saved scores must not be compared causally with later Codex results.

Evidence: [findings](runs/1/findings.md), [report](runs/1/report.md),
[instruction-to-failure mapping](runs/1/written-against.md).
No cohort-local verifier exists. The
[Claude workflow archive](history/claude-workflow.md) documents its harness.

### `2`: deferred Claude round 2, no saved runs

The five revisions were made at `e178be2`, but the intended Claude rerun
was deferred for account usage limits. Local empty directories remain for
`analyst/with-1`, `analyst/with-2` and `analyst-hurried/with-1`; there are no
saved files, complete conversations or judgements in `evals/runs/2/`.
Git does not retain empty directories. No model or fixture version can be
inferred from them. There is no result, manifest, report or verifier.

Evidence: [original findings, Round 2](runs/1/findings.md#round-2) and the
[historical handover](../docs/history/2026-10-10-handover.md).

### `codex-1`: Astra-only harness trial, partial and superseded

Question: can Codex run the comparison in isolated sessions? Both agent and
judge use `gpt-6-astra`, medium. The author then chose distinct workhorse
and stronger-judge roles, so this experiment stopped. It preserves 23
complete conversations: all 20 baselines and three chef/chef-terse skill
runs, plus an interrupted `chef-terse/with-2` with two completed turns,
partial third-turn events and copied partial files. Fourteen judgements
are saved. It is not a completed arm comparison.

The skill is recorded at `05fd8ee`, with bytes unchanged from `e178be2`.
Harness metadata records `9b419d0` for the first trial and `05fd8ee` for the
others. These use the original ten cases; there is no frozen cohort-wide
fixture manifest. Isolation and private-read heuristic review are recorded.

Evidence: [findings](runs/codex-1/findings.md),
[interrupted run metadata](runs/codex-1/chef-terse/with-2/meta.json).
No aggregate report or cohort-local verifier exists. Do not pool these
results with the main Sol comparison or count the interrupted run complete.

### `codex-sol-1`: main Codex comparison, complete

Question: how does the revised planning skill compare with no skill under
Sol/Astra roles? Original ten cases, twice per arm: 40 conversations and
40 judgements. Full bar: 0/20 baseline, 12/20 with skill. All twenty skill
agents find it without its name in the user prompt.

With-skill metadata records `13f7ced`, with skill bytes unchanged from
`e178be2`; baseline harness commits are `dfca4a6` and `13f7ced`. Original
fixtures and v1 rubric are used. No cohort-wide frozen manifest was saved.
This does not isolate the five edits since Claude because provider, models
and harness also changed. Private reads were manually reviewed.

Evidence: [findings](runs/codex-sol-1/findings.md),
[report](runs/codex-sol-1/report.md). No cohort-local verifier exists;
the separate diagnosis below audits instruction reads and selected sources.

### `codex-sol-2`: source checking in labels and summaries, complete

Question: does checking what a source actually supports prevent inferred
labels and reused unconfirmed summaries? Chef, analyst, analyst-hurried and
student twice each, with skill only: eight conversations and eight
judgements. The source-check candidate is `e485f53`; two student metadata
records use `6b05309` after a concurrent fixture commit. Skill bytes and
selected original fixtures are verified identical across those checkouts.
The manifest pins fixtures, prompts, rubric and runner inputs.

Factual measures improve in this sample, but the matching subset's full bar
changes from 3/8 in `codex-sol-1` to 2/8. One hurried analyst still carries
an unsupported genomics premise. This is not an overall quality improvement
established by the study.

Evidence: [findings](runs/codex-sol-2/findings.md),
[report](runs/codex-sol-2/report.md), [comparison](runs/codex-sol-2/comparison.md),
[manifest](runs/codex-sol-2/manifest.json),
[instruction evidence](runs/codex-sol-2/written-against.md).
Offline verification and comparison generation:
`node evals/runs/codex-sol-2/compare.mjs`.

### `codex-stem-1`: technical and academic coverage, complete

Question: do the existing instructions generalize to six new profiles?
Backend, ml, embedded, mechanical, physicist and phd once per arm: twelve
conversations and twelve judgements. Fixture and harness commit `6b05309`;
skill tree `3b25e07950263292514d5564c7375bd672b6f3cb`, including the source-check
change. The manifest records the six fixtures and input hashes. No rubric
or skill change was introduced by this coverage study.

Full bar: 0/6 baseline and 3/6 with skill. All final plans preserve the
supplied facts. Both PhD agents read the private export; the embedded opening
and physics concepts expose separate weaknesses. One repetition per arm
provides exploratory coverage, not a stable estimate by profession.

Evidence: [findings and concepts](runs/codex-stem-1/findings.md),
[report](runs/codex-stem-1/report.md), [manifest](runs/codex-stem-1/manifest.json).
Offline verifier: `node evals/runs/codex-stem-1/verify.mjs`.

### `codex-privacy-1`: wider private-file instruction, complete

Question: does moving the exclusion before reading, beyond LinkedIn exports,
prevent the observed PhD read? PhD, analyst and student twice each: six
skill conversations and six judgements at `8adaaa3`, with selected fixtures,
messages, runner and v1 rubric unchanged and hashed in the manifest.

Both PhD agents read the instruction and still open private records. Both
analysts leave their private files unread; all final plans preserve facts.
Full bar is 1/6. Earlier comparators are one STEM PhD run and two Sol-2 runs
each for analyst/student, so there is no equally repeated pooled baseline.
The scope clarification remains, but reliable protection is not established.

Evidence: [findings](runs/codex-privacy-1/findings.md),
[report](runs/codex-privacy-1/report.md),
[comparison](runs/codex-privacy-1/comparison.md),
[manifest](runs/codex-privacy-1/manifest.json),
[instruction evidence](runs/codex-privacy-1/written-against.md).
Offline verifier: `node evals/runs/codex-privacy-1/verify.mjs`.

### `codex-premise-1`: summary and question premises, complete

Question: can instructions at the summary and concept decisions prevent an
unsupported field from becoming a speciality or opening premise?
Analyst-hurried and student twice each: four skill conversations and four
judgements at `94faf60`. The manifest fixes fixtures, messages, runner and
v1 rubric and selects matching `codex-sol-2` cases. The privacy edit is also
present, so comparison does not isolate the premise wording alone.

Both hurried analysts avoid the unsupported genomics claim; all four final
plans are factually clean. Full bar is 0/4 versus 1/4 in the earlier subset.
Creative limitations remain, especially when the person withholds answers.

Evidence: [findings](runs/codex-premise-1/findings.md),
[report](runs/codex-premise-1/report.md),
[comparison](runs/codex-premise-1/comparison.md),
[manifest](runs/codex-premise-1/manifest.json),
[instruction evidence](runs/codex-premise-1/written-against.md).
Shared offline verifier:
`node evals/runs/codex-privacy-1/verify.mjs evals/runs/codex-premise-1`.

### `codex-opening-1`: plain-language opening meaning, complete

Question: does explicitly specifying the first screen's meaning resolve
unexplained role and technical terminology? Nurse, embedded and student
twice each: six skill conversations and six judgements at `749eee0`.
Fixtures, prompts, runner and v1 rubric are fixed by the manifest.

All six read the new instruction, pass plain-reader clarity and preserve
factual boundaries. Full bar is 3/6. The prior nurse, embedded and student
cases come from different cohorts, with one embedded repetition and earlier
skill versions. They are contextual comparisons, not a pooled matched rate.

Evidence: [findings](runs/codex-opening-1/findings.md),
[report](runs/codex-opening-1/report.md),
[comparison](runs/codex-opening-1/comparison.md),
[manifest](runs/codex-opening-1/manifest.json),
[instruction evidence](runs/codex-opening-1/written-against.md).
Shared offline verifier:
`node evals/runs/codex-privacy-1/verify.mjs evals/runs/codex-opening-1`.

### `codex-closing-1`: supported closing meaning, complete

Question: can planning specify an answer while still deferring final copy?
Analyst, analyst-overstate and student twice each: six skill conversations
and six judgements at `b85d014`, including the opening instruction.
Fixtures, prompts, runner and v1 rubric are fixed by the manifest.

All six specify supported answers, read both additions and preserve factual
boundaries. Five pass the full bar; one analyst still fails backdrop.
The previous cases come from privacy, original Sol and opening cohorts,
with intervening edits. This is targeted support for the instruction,
not broad creative validation or proof of a causal effect.

Evidence: [findings](runs/codex-closing-1/findings.md),
[report](runs/codex-closing-1/report.md),
[comparison](runs/codex-closing-1/comparison.md),
[manifest](runs/codex-closing-1/manifest.json),
[instruction evidence](runs/codex-closing-1/written-against.md).
Shared offline verifier:
`node evals/runs/codex-privacy-1/verify.mjs evals/runs/codex-closing-1`.

### `codex-physics-evidence-1`: richer work evidence, complete

Question: can unchanged creative guidance explain a concrete, permitted
calibration decision? New `physicist-evidence` fixture, twice with skill:
two conversations and two v1 judgements. Fixture added at `f2daa12`; run
metadata records `f2daa12` and `fd8656b`, with identical opening-only skill
bytes. The closing addition is absent. Inputs are pinned in the manifest.

Both explain the signed comparison, fixed per-path corrections and held-back
check accurately and preserve their limits. One passes the full bar; the
other misses concept diversity. The old physicist fixture remains unchanged
and is qualitative context, not a matched baseline. There is no new creative
skill instruction or established improvement in creative range.

Evidence: [findings](runs/codex-physics-evidence-1/findings.md),
[report](runs/codex-physics-evidence-1/report.md),
[comparison](runs/codex-physics-evidence-1/comparison.md),
[manifest](runs/codex-physics-evidence-1/manifest.json),
[protocol](../docs/superpowers/plans/2026-10-10-physics-evidence.md).
Offline verifier: `node evals/runs/codex-physics-evidence-1/verify.mjs`.

## Diagnostics and offline reviews

### `codex-sol-1-diagnosis`: original-rubric repeat judging, complete

Question: why did eight skill runs miss, and which verdicts are unstable?
Offline review of all eight failures and instruction reads, plus four fresh
Astra medium judgements of unchanged saved Sol conversations: analyst/with-1,
analyst-overstate/with-2, nurse/with-2 and student-terse/with-2. No new portfolio
conversation, skill, fixture or rubric was introduced. Source skill and
harness metadata remain `13f7ced`; the manifest pins source evidence,
original prompts/judgements and rubric hash.

The factual failures are supported. Closing, swap and diversity verdicts
vary on repeat judging. These copies and new ratings are not additional
conversations and do not replace the original report.

Evidence: [findings](runs/codex-sol-1-diagnosis/findings.md),
[manifest](runs/codex-sol-1-diagnosis/manifest.json),
[instruction audit](runs/codex-sol-1-diagnosis/skill-read-audit.json).
Offline verifier: `node evals/runs/codex-sol-1-diagnosis/verify.mjs`.

### `codex-creative-review-1`: offline concept review, complete

Question: what do the saved objects explain, and what evidence is missing?
No paid conversation or judgement. Reviews all six STEM skill plans, with
selected Sol-2 analyst cases and the earlier closing diagnosis as contrasts.
The source versions are those studies' versions above; no new skill,
fixture or rubric candidate is introduced, and no new manifest is claimed.

The backend demonstrates a relationship; old physics plans mostly organize
records without a supplied calibration procedure. The review recommends
concrete work evidence and separates plain language and closing meaning
from concept diversity. It does not ban document objects, change scores or
establish built-site quality.

Evidence and source paths: [findings](runs/codex-creative-review-1/findings.md).
No report, numerical cohort or verifier exists.

### `codex-measurement-v2-1`: diagnostic rubric calibration, complete

Question: can separate trap fields and explicit scoring anchors clarify
known boundaries? Six fresh Astra medium ratings, once each, of saved Sol
conversations: Sol-1 hurried analyst/with-1; Sol-2 analyst/with-1 and with-2,
student/with-2; STEM backend/with-1 and physicist/with-1. No new agent runs.
Implementation `fd8656b`, rubric v2. The manifest freezes implementation,
schema, source files and reports; scoring fixtures are snapshotted from
recorded harness commits `13f7ced`, `e485f53` and `6b05309`.

The split fields capture asking while asserting and silent avoidance. The
analyst closing contrast remains; creative scores still vary. Four of six
criterion sets change, and one full-bar result flips under v2. This is
changed measurement, not improved agent behavior. Ninety original run files
and three original reports remain unchanged.

Evidence: [findings](runs/codex-measurement-v2-1/findings.md),
[report](runs/codex-measurement-v2-1/report.md),
[manifest](runs/codex-measurement-v2-1/manifest.json),
[implementation plan](../docs/superpowers/plans/2026-10-10-measurement-v2.md).
Offline verifier: `node evals/runs/codex-measurement-v2-1/verify.mjs`.

## Deterministic enforcement experiment

### `codex-privacy-enforcement-1`: shell access probes, complete prototype

Question: can filesystem permissions enforce the boundary that wording did
not? No models or rubric judgements. Linux, `codex-cli 0.162.1`, using the
PhD fixture and a separate opt-in sandbox experiment. Four saved results:
`nested-1` startup failure; `host-1` eleven probes with three expectation
failures; `host-2` twelve probes exposing a hardlink bypass; `host-3` twelve
passing probes using exact public-file grants. Original failed outcomes are
preserved, and result files record commands, configuration and input hashes.

The private fixture stays present and hash-identical outside the restricted
view. The final profile requires trusted, stable public inputs and runtime.
It is not integrated into a live model runner, does not cover every tool or
platform, and does not change the skill's privacy score. Git does not preserve
hardlink identity; the offline verifier checks saved evidence, while a new
experiment creates the hardlink again.

Evidence: [findings](runs/codex-privacy-enforcement-1/findings.md),
[experiment instructions](experiments/privacy-enforcement/README.md),
[successful result](runs/codex-privacy-enforcement-1/host-3/result.json),
[plan](../docs/superpowers/plans/2026-10-10-privacy-enforcement.md).
Offline verifier: `node evals/runs/codex-privacy-enforcement-1/verify.mjs`.
There is no model report or cohort-wide manifest.

## Existing-portfolio review

### `codex-steve-review-before-1`: real repository review, complete

Question: can the unchanged skill give useful feedback on the author's
supplied existing repository without forcing its creation workflow?
One natural source-only conversation, `gpt-6.1-sol` at medium, with inputs
committed at `1787ede` and frozen by hash. The real case is in
`evals/reviews/steve-source/`, separate from fictional planning fixtures.
The skill was selected and read; all nine predeclared review criteria pass
the saved manual assessment. The actor wrote only its review document and
changed no supplied material. There were no skill edits, paid judge calls
or conditional follow-up conversations.

This is one case, with no no-skill arm, repeat sample or blinded judgement.
It establishes useful behavior in this invocation, not general reliability
or the skill's causal contribution. Criteria are not planning scores, and
independent runtime observations were never supplied to the actor.

Evidence: [findings](runs/codex-steve-review-before-1/findings.md),
[assessment](runs/codex-steve-review-before-1/manual-assessment.md),
[agent review](runs/codex-steve-review-before-1/steve-source/natural-1/files/docs/story/review.md),
[frozen manifest](runs/codex-steve-review-before-1/inputs/manifest.json).
Offline verifier: `node evals/runs/codex-steve-review-before-1/verify.mjs`.

### `codex-steve-review-observations-1`: independent product review, complete

Separate coordinator source and browser inspection of the same real source
snapshot, with no paid harness conversation. Production build and browser
checks ran in an isolated copy; nineteen screenshots, measurements, scripts,
environment versions and command logs are preserved. No horizontal overflow
was measured at five widths. Sampled keyboard-menu, reduced-motion and
JavaScript-off behavior worked. Mobile stage names, pause size and autoplay
after manual selection support usability recommendations. The main content
priority is replacing the project placeholder with personal work evidence.

The original checkout was unchanged and its untracked PDF stayed unopened.
Local Chromium checks do not establish deployed parity, accessibility
conformance, physical-device behavior, cross-browser quality or the review
agent's ability to perform browser inspection. Initial transition captures
and settled follow-ups are both preserved; transient text overlap is not
reported as a persistent layout defect.

Evidence: [combined review](runs/codex-steve-review-observations-1/review.md),
[source observations](runs/codex-steve-review-observations-1/source-review.md),
[runtime observations](runs/codex-steve-review-observations-1/runtime-review.md),
[source preservation](runs/codex-steve-review-observations-1/source-preservation.json).
The ignored runtime directory contains a disposable app copy and dependencies;
observations and reproduction evidence are tracked outside it.

### `codex-token-usage-audit-1`: saved usage audit, complete

An offline answer to the author's 11 October question about review and
new-build token consumption. Steve's single source-only review records
319,691 input (277,376 cached) and 3,972 output tokens. Six current-skill
planning conversations have final input-plus-output counters from 248,651
to 439,223, median 273,927.5. Planning resume-counter scope is not fully
established; the audit preserves final counters and does not sum readings
from resumed turns. This is no full-build budget, invoice, representative
cost estimate or accounting of surrounding coordinator/subagent work.

No new portfolio conversations or judgements were started. Existing
artifacts are unchanged. Evidence: [findings](runs/codex-token-usage-audit-1/findings.md)
and [hashed source counters](runs/codex-token-usage-audit-1/audit.json).
Offline verifier: `node evals/runs/codex-token-usage-audit-1/verify.mjs`.

## Preservation when checking evidence

The commands above make no model calls. Some rewrite comparison, verification
or audit files and some require Git subprocess permission. Inspect each
script before use; a documentation migration should compare its inventory,
not regenerate old reports. Keep raw evidence at its original paths and
preserve symlink targets. No navigation file belongs inside a frozen source
run. See the [archive provenance](../docs/history/README.md) for the
migration's inventories and byte-preservation checks.

## First Stage 3 build baseline, 11 October 2026

[codex-build-1](runs/codex-build-1/findings.md) is one bounded Sol turn from
an approved derivative embedded storyboard, followed by one fresh Astra
judge. It reached the three-beat spine and look gate; the reported token
threshold prevented later turns. Original scores, image-tool observability
correction, coordinator checker diagnostics, retained source/screenshots
and exact usage remain separate. This is neither a full-site pass nor a
matched skill improvement.

## Bounded Stage 3 completion, 11 October 2026

[codex-build-completion-1](runs/codex-build-completion-1/findings.md) is a
fresh two-turn conversation from the preceding saved spine. It completed
chapters, offered and awaited copy choices, then finished the fictional
seven-beat implementation. Independent technical browser acceptance passes
6/6 and all 49 original screenshots were reviewed. The author subsequently
rejected its visual quality. These checks remain valid within their scope;
they do not establish product acceptance or close Stage 3's visual proof.

The single judge invocation was rejected before its model turn by a
1,048,576-character CLI limit, despite the author's separate approval of a
three-MiB byte allowance. There is no model judgement or usage report and
no retry. A new unpaid character guard prevents another oversized
invocation. Source, actor diagnostics, input-size failures, actual usage
and visual limitations remain preserved. Earlier findings also identify
missing complete wording alternatives and static State copy referring to
hidden rows. Those smaller gaps do not account for the substantial visual
failure recorded in the subsequent review. No skill or shipped engine
instruction changed.

## Visual-quality review, 11 October 2026

[codex-visual-quality-review-1](runs/codex-visual-quality-review-1/findings.md)
asks why the completed demo missed the original portfolio's visual standard
despite passing technical checks. The [author's rejection](../docs/history/2026-10-11-visual-quality-rejection.md)
is the trigger. This is an unpaid review of saved source and evidence,
with fresh demo browser captures. The original-site comparison uses its
source and repository-supplied preview image, not a fresh running original.

The review separates coordinator-selected constraints, actor implementation
choices and engine capabilities. The six flat rows, repeated formations,
label-only faces and disconnected diagrams do not establish the design's
object-led story. The fixture explicitly required static phone behavior.
The 246 repository tests and 49 reviewed screenshots checked correctness,
readability and mode coverage, without establishing expressive quality.
Completed implementation is therefore recorded separately from visual
acceptance, which failed and remains open.

Evidence: [findings](runs/codex-visual-quality-review-1/findings.md),
[source comparison](runs/codex-visual-quality-review-1/source-comparison.md),
[process review](runs/codex-visual-quality-review-1/process-review.md),
[preceding handover](../docs/history/2026-10-11-before-visual-quality-review-handover.md)
and [recovery plan](../docs/superpowers/plans/2026-10-11-visual-quality-recovery.md).
No new paid conversation or judgement, skill edit or engine edit was made.
Old frozen inputs, raw results and technical outcomes are preserved.

## Visual recovery prototype, 11 October 2026

[visual-recovery-prototype-1](runs/visual-recovery-prototype-1/findings.md)
records the authorized manual implementation of a three-beat fixture study.
Its separate [source](../prototypes/fixture-study/README.md) uses the same
fictional evidence with a new illustrative apparatus: assemble, separate
to explain command → board → fixture → observation, then reassemble with
the longest run and battery projection shown distinctly.

This is collaborative design and implementation, not an unchanged-agent
rerun or paid actor/judge cohort. Browser assertions, visual observations,
source hashes and capture conditions are preserved. At this checkpoint,
author approval and physical-phone assessment were pending; the later
five-beat revision below received acceptance. The result does not
close the non-sheet whole-site proof, establish a skill success rate or
authorize expansion past the prototype review gate.

## Visual recovery story depth, 11 October 2026

The author said the first prototype looks better, but clarified that
"The story needs more depth". [visual-recovery-depth-1](runs/visual-recovery-depth-1/findings.md)
records a bounded manual five-beat revision: scheduling and evidence
provenance join the existing assembly, bench relationship and conclusion.
The first source is preserved at `71ae3ea`, its evidence remains unchanged,
and shipped skill/engine instructions are not changed. This is not a paid
actor/judge cohort, a matched instruction experiment or final acceptance.

After capture, the author [accepted the story's depth](../docs/history/2026-10-11-story-depth-approval.md)
and [confirmed it works on phone](../docs/history/2026-10-11-fixture-phone-approval.md).
This closes the bounded prototype review gate at `fd03055`, not full Stage 3
acceptance. The saved study retains its original pre-approval status and
unchanged source/capture records. No new evaluation or implementation follows
automatically from these replies.
