# Smallest supported build-instruction changes

12 October 2026. Read-only evidence review for the renewed Stage 3 work.
This note proposes changes; it does not edit the skill, launch a model or
browser, run tests, or revise an old fixture or result. The main agent owns
the new authorization, implementation and execution decisions.

## Two observed misses

### A runnable look choice before the remaining chapters

The [natural-entry baseline reply](../codex-bench-entry-baseline-1/bench-entry-1/baseline-1/turns/01/reply.md),
lines 4-7, asks a text-only Warm/Dark/delegate question. Lines 9 and 12 then
announce all five chapters and proceeding with Warm. In the
[raw stream](../codex-bench-entry-baseline-1/bench-entry-1/baseline-1/turns/01/stream.jsonl),
these are `item_3` at line 8, `item_7` at line 15 and `item_12` at line 24.
`item_8` starts the complete five-chapter implementation at line 16.
[The final decision record](../codex-bench-entry-baseline-1/bench-entry-1/baseline-1/turns/01/snapshot/files/docs/story/decided-for-you.md),
line 5, expressly says no answer arrived and Warm was a provisional default.
The final [story definition](../codex-bench-entry-baseline-1/bench-entry-1/baseline-1/turns/01/snapshot/files/content/story.ts),
lines 5-9, implements all five approved meanings.

The agent did enter building, so this is **not an observed endpoint
refusal**. It also did not pretend the person approved Warm. The specific
miss is substituting a text question and a provisional default for the
reviewable-spine decision, then expanding before an answer. Its later
timeout and the 198-versus-180 source inventory blocker are separate facts.
The unreviewed actor images do not establish whether the two source looks
were materially reviewable.

Smallest behavioral addition, in the stop-4 instruction itself:

> Build the opening, one middle chapter and the ending in two or three
> looks. Let the person scroll those looks, ask which they choose, and stop
> for their answer before building the remaining chapters. An unanswered
> question in this turn is not a refusal to choose or permission to choose
> for them.

The last sentence closes the precise ambiguity demonstrated by the saved
decision record. Keep the existing explicit-delegation path in
`references/asking.md`; do not turn this into a broad change to the
successful planning/refusal behavior. The approved
[six-stop design](../../../docs/superpowers/specs/2026-10-10-portfolio-skill-design.md),
lines 90-92 and 135-140, supplies the intended behavior. The saved run,
not the design alone, supplies the reason to add it now. Two looks are
sufficient; neither three mandatory looks nor specific palette names are
supported additions.

### Three wording versions, each shown as the complete beat

The older [completion turn-1 reply](../codex-build-completion-1/embedded-completion-1/baseline-1/turns/01/reply.md),
lines 26-33, offers O1/O2 and C1/C2, one short recommendation and one short
alternative per placement. Its
[copy-choice record](../codex-build-completion-1/embedded-completion-1/baseline-1/turns/01/snapshot/files/docs/story/copy-choices.md),
lines 14-38, repeats those pairs and merely describes the fixed sentences
that surround them. It does not present three full versions of either beat.
It did stop for the choice and allow custom edits, which should be retained.

Smallest behavioral addition, in the stop-5 instruction:

> For the opening and closing wording, show three versions of each whole
> beat, including the surrounding fixed text. Recommend one and leave room
> for their own wording. Stop for the choice, then use it word for word.

This means three total versions, not three alternatives plus a fourth
recommendation. Do not vary confirmed fixed claims to manufacture variety.
The governing design is lines 138-140; the existing
[remaining-stages audit](../codex-build-completion-1/audits/remaining-stages.md#concrete-design-to-rubric-gap-wording-choices)
already identifies this exact gap. The frozen completion rubric at
`inputs/rubric.md`, line 39, required only meaningful alternatives. Therefore
do not retroactively call the old rubric failed or manufacture an old judge
score. The saved omission against the fuller design is the evidence.

## Endpoint coherence without changing planning

The inspected [SKILL.md](../../../skills/storyfolio/SKILL.md) has planning-only
claims at lines 10 and 24, a three-stop heading at line 12, an unqualified
first-reply rule at line 22, and a separately authorized build section at
lines 26-32. Updating these is compatibility work accompanying the two
supported changes, not proof of an additional endpoint-refusal failure.

- Preserve the existing stop-1, stop-2 and stop-3 rows and their references.
  Preserve the factuality, provenance, question/answer and caption-deferral
  instructions. Planning requests that explicitly forbid building still
  end at the approved storyboard.
- Replace the two planning-only endpoint claims with a scope statement
  allowing an explicitly requested build after storyboard approval. Make
  clear that the recorded handover determines the current stop; an approved
  build continuation does not restart profile questioning.
- Qualify the first-reply rule as applying when starting from profile
  material. Keep its existing no-premature-planning rationale. This removes
  a literal conflict with an already approved build without changing the
  first three evaluation prompts.
- Extend the stop table coherently through Spine, Chapters and Finish.
  Stop 4 is the runnable look decision above; stop 5 follows that decision
  and presents complete wording choices; stop 6 follows the copy decision
  and finishes/checks the site. Existing engine README/check instructions
  already cover technical implementation. A separate new reference file
  for every stop is not required by these failures.
- Keep the two provisionally retained settled-scene/transition paragraphs
  unchanged. They have their own earlier run evidence and remain distinct
  from the new gate and copy instructions.
- [concept.md](../../../skills/storyfolio/references/concept.md), line 92,
  still says there is no engine. Remove that false rationale while retaining
  the explicit text-only concept method for this measured planning version.
  Do not silently add runnable stop-2 sketches while claiming unchanged
  planning coverage.
- Finish cannot fabricate the person's real scrolling/phone approval or
  permission to publish. The completion run correctly left these pending
  in [turn 2](../codex-build-completion-1/embedded-completion-1/baseline-1/turns/02/reply.md).
  A new agent can finish implementation and supply evidence, but its own
  browser checks do not create that author decision.

No new early-preflight, optional-skill, installation, whole-file reference
reading or generic timeout-recovery instructions are supported here. The
natural-entry actor's local Git workaround exposed a measurement mismatch;
it is not evidence for teaching a skill benchmark-specific Git exclusions.
The actor also recognized and disclaimed overlapping rebuild evidence
itself. Do not expand this patch into a speculative operational rule bundle.

## Reusable tests and the actual operational limits

### Matched entry candidate

Reuse [bench-entry-1/case.json](../../builds/bench-entry-1/case.json) with a
fresh `codex-bench-entry-candidate-1` cohort through
[codex-build-run.mjs](../../codex-build-run.mjs). The existing schema already
supports `requestedStops: [4]`, `refusalTurns: []` and one 900,000 ms turn.
The sole actor prompt remains exactly:

> Yes to the storyboard in docs/story/storyboard.md. Please build it.

Keep its eleven fixture files, capabilities, engine, task and criteria
unchanged for behavioral attribution. Read-only `--dry`, separate `--prepare`
and `--turn 1` paths exist. Root must commit the candidate before preparing,
retain complete freeze/setup/closure evidence and audit the actual skill
read. Do not add the expected three-beat/two-look answer to the prompt or
actor-visible setup record. No continuation is necessary to observe whether
the first turn stops at the actual look choice.

Operational limits to settle before launching:

1. The retained natural-entry setup helpers hard-code the baseline cohort
   and runtime root. They cannot simply be invoked against a new cohort.
   Use clearly retained new mechanical coordinator derivatives or existing
   lower-level preparation tools; never mutate the old frozen helper bytes.
2. The frozen measurement launcher requires exact current-source versus
   saved-snapshot equality. The old baseline's eighteen nonbare Git files
   block it. A clean replay of the saved 180 files is a separately labelled
   measurement baseline, not an original-gate pass. Any prospective helper
   or source-boundary repair must be independently recorded. If measurement
   bytes change across arms, disclose that change; do not describe all 132
   inputs as differing only in the skill.
3. Use the retained native Node, offline dependency cache, browser resources
   and exact capability environment. Setup success is not actor preflight.
   The actor performed its own reinstall in the old run; do not assume
   setup alone constrains everything it subsequently executes.
4. The old narrow browser protocol samples desktop/phone opening, one
   middle and ending in every advertised look. It is not the full-site,
   seven-condition, transition, copy-choice or Stage 3 completion test.
   Its old no-candidate authorization prose is historical scope, not a new
   grant. Record the new authorization and bounds separately without
   rewriting the historical protocol.

### Planning regression

The existing [embedded person](../../people/embedded/person.json) is the
smallest direct-domain regression: the unchanged three terse messages in
`evals/prompts/turn1-terse.md`, `turn2-terse.md`, `turn3-terse.md` explicitly
request planning and no building. Use the existing
[codex-run.mjs](../../codex-run.mjs), fresh iteration, `--person embedded
--arm with --rep 1`. It already sends all three fixed messages and resumes
one conversation. Check fact confirmation before concepts, three concepts,
storyboard meaning, deferred captions, no premature build and actual skill
reads. Prior [opening-study coverage](../codex-opening-1/findings.md) includes
two successful embedded planning repetitions; those are historical context,
not a new matched control with identical intervening skill bytes.

If root chooses a second, non-build-domain regression, `student` has prior
closing-study coverage without private input files; `analyst-overstate`
adds explicit false-claim pressure and requires full private-read audit.
Do not launch a whole unfiltered suite or add a judge merely by habit.
One case is bounded regression evidence, not complete Stage 1 validation.

The planning runner defaults to a historical iteration unless one is
supplied, archives failed attempts on rerun and automatically sends three
turns. Its invocation default is 25 minutes per turn, not the build's
15-minute envelope. Root must state and enforce the intended planning budget
before execution and not describe it as a one-turn build run.

### Wording regression and full-site proof are separate

[embedded-completion-1](../../builds/embedded-completion-1/case.json) already
supports stops 5 and 6 with a frozen existing site and explicit choice gate.
Its first turn can test the three-complete-beat presentation using the same
historical prompt. That prompt contains a planning-only override and an
inherited, previously rejected sheet-site design, so it is not ordinary
entry or a new non-sheet quality proof. Keep the old rubric untouched and
record whole-beat/count observations against the explicit product criterion.
A continuation needs its actual recorded choice and separate launch gate.

Passing entry plus a planning regression would validate only those scopes.
The complete non-sheet site's visual, fallback, interaction and factual
proof, exact copy adoption and the person's final approval remain separate
Stage 3 obligations. None is established by this evidence note.
