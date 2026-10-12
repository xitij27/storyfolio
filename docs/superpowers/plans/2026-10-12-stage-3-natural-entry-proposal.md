# Proposed Stage 3 natural build-entry experiment

12 October 2026. Proposal only: no paid allowance, fixture freeze, model
call or skill edit is made here. The currently approved work is the
separately labelled verification-only capture of unchanged candidate
source. This experiment would need its own explicit approval.

## One question and one case

**Given an approved storyboard and an ordinary request to build it, does
the shipped skill enter the build workflow and return a runnable spine
for a real look choice, without restarting planning or claiming that
building is unavailable?**

Use one new case, `evals/builds/bench-entry-1/`, and one fresh baseline
cohort, `codex-bench-entry-baseline-1`. Reserve
`codex-bench-entry-candidate-1` for a separately approved, failure-backed
matched rerun only. These are proposed names, not prepared cohorts.

The initial and only actor message is:

> Yes to the storyboard in docs/story/storyboard.md. Please build it.

Do not append an exception to the skill's endpoint, list the expected
stops, tell the actor how many looks to build or supply a desired answer.
The existing build studies explicitly granted an external override; none
answers this ordinary-entry question. The selected skill and normal
engine documentation remain available through the same declared local
mechanism in both arms. Save evidence that the actor actually read them.

The intended result follows the approved
[design's fourth stop](../specs/2026-10-10-portfolio-skill-design.md#the-journey-six-stops):
opening, one middle chapter and ending, in **two or three looks**, then
a real request for the person's look choice. Three is not mandatory.
Do not send a look selection or another actor turn in this experiment.

## Smallest defensible input derivative

Use the fictional Ada/Mosslink facts and five approved meanings from
[bench-depth-2](../../../evals/builds/bench-depth-2/README.md), not either
actor's implementation, images, review notes or the accepted manual
prototype. Preserve the historical fixture byte for byte.

Create and review a new derivative before freezing either arm:

- Preserve the fact sheet, factual corrections, approved five meanings,
  asset permissions and supplied diagrams. Retain exact source hashes and
  a line-level derivative record.
- Remove the old *one appearance*, diagnostic-only and no-look-choice
  restrictions from the new confirmations, storyboard and handover. Those
  clauses would contradict the question. Record these as new fictional
  approvals, not words spoken by the real author or evidence of prior
  concept-stage execution.
- Record that the apparatus concept and story are approved, that no look
  has been chosen, and that implementation has not started. Supply the
  normal planning handover/decision records needed for a fresh session,
  without inventing three earlier concept presentations or their review.
- Keep the bounded local portfolio content decisions explicit. No public
  deployment, mail, optional-skill installation, external asset acquisition
  or ungranted employer material is authorized. This entry case is not the
  full-site checklist proof.
- Preserve the declared neutral helper and capability facts as tooling
  data, with no new behavioral hints. Pre-scaffold inventory must show that
  the coordinator's starter is not a prior user site.

The fresh baseline uses the then-current committed skill unchanged,
including the two provisionally retained visual paragraphs if their
disposition remains unchanged. Do not add stop rows or remove either
planning-only endpoint before this baseline. Freeze source, task message,
skill, engine, capabilities, dependencies, helper and measurement identities.
Reuse the existing `schemaVersion: 1` path with `requestedStops: [4]`,
`refusalTurns: []`, one case-specific fixed prompt and `bounds.maxTurns: 1`.
Omit `taskKind`. Do not inherit the `prototype-depth` prompt or its fixed
five-beat/one-appearance completion contract.

Read-only source review confirms this is already supported:
[`validateCase`](../../../evals/lib/build.mjs#L44) accepts an ordered stop
subset matching the prompt count, [`planTurn`](../../../evals/lib/build.mjs#L235)
does not require an advance gate for turn 1, and
[`executeBuildTurn`](../../../evals/lib/build.mjs#L325) sends the frozen prompt
bytes without adding a stop-specific instruction. `requestedStop` is saved
metadata, not extra actor guidance. No new runner/schema work is proposed;
prepare only the new fixture and its prospective measurement if approved.

## Bounds and evidence

Proposed next approval: **one fresh actor conversation, one turn, maximum
15 minutes, no retry or continuation, no paid judge**. A text judge is not
needed to establish this narrow entry, built-output and approval-gate
question. Retain actual usage and process outcome; a wall deadline is not
a hard token or dollar cap, and the runner's between-turn token threshold
cannot enforce one inside a single turn.

If a specific behavioral miss supports a candidate, ask for the separate
matched rerun: at most one additional fresh one-turn conversation under
the same 15-minute limit, also without a paid judge or retry. This is at
most two actor conversations across separately decided steps, not permission
to queue both now. A baseline success needs no redundant instruction or
candidate run.

Before launch, verify the isolated actor workspace and local build/browser
capabilities without a model. Preserve command output and hashes. After
terminal closure, snapshot the source and independently inspect the actual
runnable result using frozen coordinator tooling. One bounded local capture
per arm, at most 15 minutes, with no automatic retries. Preserve an
interrupted capture and mark its missing observations unobserved.

Freeze these observations before baseline:

| Observation | Evidence and disposition |
|---|---|
| Ordinary continuation | Raw turn and source show whether the actor accepts the approved state and starts implementation, instead of refusing solely because the skill stops at planning or restarting facts/concepts without a real unresolved issue. |
| Runnable spine | Independently launch the saved source. The opening and ending meanings plus one of the three approved middle meanings are actually implemented. A promise or source file alone is not runnable output. |
| Real look gate | Two or three reviewable appearances of the same spine are materially visible, and the person is asked to choose before the workflow advances. No score for three mandatory looks, names alone, an inert switch or a preselected look supplied by the harness. |
| Honest handover | Recorded files distinguish what exists, what was checked, what failed and the pending user decision. Do not demand extra prose for behavior the baseline already performs correctly. |
| Integrity and limits | Bind source and originals, inspect all generated originals, retain timing/errors, audit actual reads and writes, and distinguish environment failure, missing evidence and actor behavior. Existing six visual criteria remain diagnostic context, not a substitute for entry/gate evidence. |

The allowed middle choices come from the frozen storyboard, not from
whatever happens to render. Actual look IDs may vary, but the design's
two-or-three requirement is fixed before execution. Do not add pixel
thresholds, decorative part counts or a synthetic quality score.

If the actor reaches a legitimate unresolved fact or asks about an optional
recommendation, preserve that branch. Do not send a new answer outside the
single-turn allowance or misclassify a genuine factual block as an endpoint
failure. Timeout, setup failure or incomplete visual evidence is not by
itself support for a behavioral sentence.

## Baseline before instruction, matched rerun after it

The [governing stage review](2026-10-11-stage-review.md#evidence-before-new-instructions)
rejects adding stops 4 to 6 merely because the original plan listed them.
This baseline can support only the routing/gate failure it actually shows.

If the actor refuses, restarts or bypasses the look decision, preserve the
exact turn/file evidence and select the smallest compatible endpoint or
stop-4 correction. Resolve both old planning-only statements coherently;
do not append contradictory build permission. Do not add stop-5 or stop-6
how-to instructions from a stop-4 miss. Do not predraft a broad six-reference
bundle. Keep the main skill's existing size/reference constraints and
required local checks.

Commit a justified candidate before its separately approved fresh matched
run. Inputs and observation criteria stay fixed. If a fixture or
measurement repair is needed, label it as a new measurement baseline,
not as a successful skill rerun. Preserve all historical attempts.

## Remaining gates, not bundled into this experiment

| Remaining requirement | Next evidence needed, not included here |
|---|---|
| Before-stop-1 machine/folder checks, three runnable concept sketches, relevant optional recommendations and actual refusal handling | One separately bounded early-journey baseline may share these naturally reached observations. Source/install guidance must be reviewed and frozen; an unreached refusal branch is unobserved. |
| Chapters and three whole-beat wording versions | Separate stop-5 question. The saved [two-pair choices](../../../evals/runs/codex-build-completion-1/embedded-completion-1/baseline-1/turns/01/snapshot/files/docs/story/copy-choices.md) support a narrow wording candidate, not insertion into this stop-4 test. New measurement must preserve the full design requirement before both arms. |
| Finish and author phone gate | Exercise actual supported finishing behavior and checklist in the integrated journey. A scripted phone approval is never real author approval. |
| Planning regression | Required after shipped behavioral changes, with unchanged planning-only prompts and rubric. The original six-conversation proposal retains its status until explicitly approved or changed with reasons; this single entry case does not replace it. |
| Stage 3 exit | Fresh six-stop non-sheet whole-site proof, complete technical and original-image review, and the author's actual desktop/phone approval. Neither the manual prototype nor this entry probe is that proof. |

This sequence advances the shipped workflow without treating the
verification-only capture as permission for more paid work. It also avoids
assuming that the candidate's timeout identifies a new instruction need.
