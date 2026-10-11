# Stage coherence review, 11 October 2026

The author asked: "okay claude pushed the planning for next stages. Let us
review that and see if it needs to be changed and continue with the
development. Make sure that all the stages are coherent and make sense.
Let me know if anything is left out in the current development".

This review reads the current handover, the approved design, the stage 1
outcome and open plans, the proposed stage 2 and 3 plan, the current
evaluation harness, and the selected embedded fixture. It starts no paid
conversation and changes no skill instructions. The original
[stage 2 and 3 plan](2026-10-11-stage-2-engine-stage-3-build.md) remains a
historical record; the corrections below govern implementation where they
conflict with it. Requirements in the approved design and original plan
that are not explicitly changed remain in force. Calling the proposal
historical does not retire those requirements. The author's later
[forwarded review](../../history/2026-10-11-stage-3-protocol-correction.md)
identified the omitted machine check and optional-skill coverage; both are
made explicit below.

## Sequence and current gaps

The four-stage sequence is sound: establish the planning method, extract a
reusable engine, prove the complete build workflow, then package that
proven capability. The author's permission to start stage 2 allows its
engineering work alongside the remaining stage 1 decisions. It does not
turn the planning studies into evidence of a working site.

| Stage | Depends on | Exit evidence |
|---|---|---|
| 1. Method | Confirmed design, fictional material and fixed evaluation questions | Planning comparisons, the author's concept assessment, and recorded dispositions for the stronger-model, broader-validation and closing-review work |
| 2. Engine | Approved extraction design; may proceed alongside remaining stage 1 decisions | Clean scaffold, units/type/lint/build/browser checks, reviewed screenshots and the author's real scrolling approval |
| 3. Build | Stage 2 approval, a complete fixture and corrected evaluation protocol | Failure-backed instructions with matched reruns, planning regression, and an approved whole-site proof using a non-sheet object |
| 4. Packaging | Stage 3 proof and approval; remaining capability claims have explicit dispositions | Allowlisted self-contained package, license/origin review, clean installation/scaffold verification and accurate support documentation; publishing remains the author's action |

The actionable [packaging plan](2026-10-11-packaging.md) carries stage 4's
tasks and release gates. The original stage 2 and 3 plan remains historical;
this table and the corrections below explain the current dependencies.

Stage 1 still needs the author's assessment of concept quality, a fresh
whole-repository closing review, completion or explicit disposition of the
stronger-model check, and a decision about broader final validation. The
existing-portfolio path has one successful source-only pilot, not general
acquisition or browser-enabled evaluation. Live privacy enforcement is
still a prototype outside the runner. Those are parallel open workstreams,
not implicit additions to the engine or reasons to silently expand paid
run counts. The current handover and plan index retain their evidence.

## Corrections before stage 2 is called complete

1. **Expected output comes from the story contract.** Task 6 derives the
   expected beat count from the first browser run. That lets every run
   omit the same beat and pass. Read the expected IDs/count from the frozen
   story data and compare against the rendered page. Require the scene to
   be on for ordinary and reduced-motion runs, and require zero canvases
   without JavaScript.
2. **Check real request failures.** V3's screenshot script catches HTTP
   error responses but has no `requestfailed` listener. Porting it without
   that listener misses aborted requests and connection failures. The
   empty default ignore pattern must mean no ignored requests, not the
   regular expression that matches every URL. Intentionally blocked
   failures need separately recorded expectations.
3. **Exercise the new behavior, as well as six screenshots settings.**
   Include both looks, start and end of a within-beat movement, reduced
   motion over time, a lost WebGL context, a failed lazy extra, and keyboard
   access to the overlay. Static screenshots alone do not establish these
   contracts. Preserve programmatic observations and review screenshots;
   a headless run is not a phone frame-rate measurement.
4. **Keep the engine extraction auditable.** Record the source revision,
   selected paths and original hashes. Include no private portfolio copy,
   personal assets or unrelated source. Scaffold and dependency installation
   may use an isolated temporary workspace; the retained source, reports,
   commands, screenshots and findings belong in this repository.
5. **The author gate is real.** Stage 2 can reach an implementation and
   verification checkpoint before the author's phone/desktop review. Call
   that checkpoint ready for review, not stage complete. Do not enter the
   stage 3 paid build experiment before the author has approved the engine.

## Corrections required before a stage 3 experiment

### A complete, honest fixture

Task 10's selected embedded plan is a useful regression fixture, but is
not currently a build-ready proof. Its
[storyboard](../../../evals/runs/codex-opening-1/embedded/with-2/files/docs/story/storyboard.md)
explicitly requires a fixture photo, a simplified state diagram, a
corrected CV and a confirmed public email (lines 112 to 119). Only `cv.md`
and `lab-notes.md` exist in that person's material. Approving the storyboard
does not supply those artifacts or permissions. Create and freeze explicit
fictional build assets and confirmations, or amend a new derivative
fixture's approved scope to omit them. Preserve the historical plan bytes
and record every derivative change.

The same plan calls its object matte paper-like row cards, its look Bench
paper, and its alternative concepts timing sheets and checklist leaves.
This is weak evidence for the design's non-sheet whole-site proof. Keep
embedded as an optional card-engine regression and select a separate,
unambiguously non-sheet object for the generality proof. That choice needs
its own question and budget before any extra conversation. The fixture
also chooses a static mobile mode and excludes an individual project page;
resolve these differences from the engine default and design explicitly,
without silently rewriting the approved historical storyboard.

### Evidence before new instructions

Task 11 proposes committing new stop rows before a run needing them, while
leaving the skill's planning-only exit sentences intact. That both conflicts
with the repository's evidence rule and gives the actor contradictory
instructions. Keep shipped skill instructions unchanged for the baseline.
Define a fixed external build-task contract and permitted continuation in
the evaluation protocol, used identically in both arms, or first obtain a
saved continuation failure that justifies a narrow scope change. Record
which approach is used and what the resulting comparison can establish.

The approved-storyboard baseline never exercises stop 2. It cannot justify
adding rough sketches there. Reserve a separate concept-stage question
with building explicitly permitted, and rerun that same question after
any sketch instruction. Do not create six references merely to meet the
old file list. Write only instructions supported by the saved failures;
technical API documentation is not proof of a behavioral improvement.

Task 14's existing planning prompts say "Do not build anything yet" and
"Still no building". Retain them unchanged for planning-only regression,
but give the six-stop proof its own versioned prompts that permit sketches
and advance only from the actual gate reached. A scripted "It looks right
on my phone" can close an actor turn but supplies no phone evidence or
author approval. Label it simulated and retain the real author gate.

### Machine check and recommendations for other skills

These are explicit stage 3 evaluation questions, inherited from the
[design's journey](../specs/2026-10-10-portfolio-skill-design.md#the-journey-six-stops)
and [recommendation policy](../specs/2026-10-10-portfolio-skill-design.md#recommending-other-skills).
The author's 11 October choice, **"Recommend; person installs"**, stands:
at each stop, name a missing skill when it would help, what it is for,
where it comes from and how the person can install it. The person installs;
the agent does not. None is required, and the work continues if declined.
Relevance and availability matter; do not score a recital of all ten names
as success or require a recommendation when none would help.

The starting list below preserves the design's inventory from the author's
machine on 10 October. These are historical candidates, not freshly
verified sources or installation advice:

| For | Skill | Source recorded in the design |
|---|---|---|
| Visual direction | `frontend-design` | `anthropics/claude-plugins-official` |
| UI direction and generic-default review | `ui-design` | `mblode/agent-skills` |
| 3D and scroll | `react-three-fiber`, `threejs-webgl`, `web3d-integration-patterns` | `freshtechbro/claudedesignskills` |
| Type | `typography-audit` | `mblode/agent-skills` |
| Browser inspection | `ui-verification` | `mblode/agent-skills` |
| React and Next.js | `vercel-react-best-practices` | `vercel-labs/agent-skills` |
| Model files | `blender-web-pipeline` | `freshtechbro/claudedesignskills` |
| Finding other skills | `find-skills` | `vercel-labs/skills` |

Before recommending a source in a new reference, read its actual skill
instructions and repository, including the third-party `freshtechbro` and
`mblode` sources. Record what was reviewed and its revision/date. Check each
installation command against that source and date it. Cover agents with a
skills folder, including Codex and Claude Code, and agents without one;
do not promise installation or file-reading capabilities they lack. Keep
`web-animation-design` excluded until its provenance is established.
This correction supplies no installation commands and verifies no external
source.

The planned actor has no network access. Freeze dated, coordinator-reviewed
source and installation evidence as data available equally in both arms,
and record that this supplied material can cue recommendations. If that
evidence is unavailable, mark command verification unobserved; do not reward
guessed commands or treat an access limit as a skill-instruction failure.
Do not load those external skills as actor instructions merely to check
their installation documentation.

Freeze these separate scored observations before baseline build runs:

| Observation | Evidence and failure condition |
|---|---|
| Machine and folder check | The actor checks Node and git, whether a site already exists, which skills are installed and enabled for it, and whether it can actually open a browser to inspect its work. Save commands, outputs and capability limits. Use the engine's current Node requirement, including native TypeScript support. Harness setup alone does not count as an actor check. Preserve the pre-scaffold folder inventory so the harness-created engine is not mistaken for a pre-existing user site. |
| Relevant missing skills | At each stop reached, assess whether a missing skill would help and whether any recommendation states its purpose, source and installation path. Save the actual recommendation and its source evidence. Omission of a relevant recommendation or presenting an optional skill as required is a failure. |
| Person-controlled installation | Inspect tool calls and file changes, not just the final reply. Any attempt by the actor to install or enable another skill is a failure, even if blocked. The harness's frozen engine dependency installation is a separate operation. |
| Continuing without optional skills | Include a fixed refusal of optional installation when the actor recommends it, identically in baseline and rerun. Verify that work continues with the available capabilities. If this branch is not reached, mark refusal handling unobserved rather than passed. |

Record timing separately. A baseline starting from an approved storyboard
can score the machine check at build startup and recommendations at stops
4 to 6. It cannot establish the design's **before stop 1** requirement or
recommendations at stops 1 to 3. The corrected protocol must include those
observations in a baseline starting before stop 1, sharing the concept-stage
question where feasible. Freeze its question and bounded cost with the
other stage 3 runs; this amendment authorizes no extra conversation.
Do not use a late-stage miss as evidence about an unvisited earlier stop.

Write `other-skills.md` only if the baseline shows a relevant miss. Tie
each instruction to the saved failure and rerun the same question after
the change. Apply the same rule to any new machine-check instruction. The
design requirement remains an acceptance criterion even if the baseline
already satisfies it and needs no new skill text.

Record the isolation limit explicitly. The build runner is still to be
implemented. The existing [runner helper](../../../evals/lib/codex.mjs)
ignores user configuration, disables discovered global skills and disables
plugins; the build protocol must preserve and verify that isolation. No
other skill is supplied or enabled for the actor during these runs. Files
may still exist on the host, and configuration flags are not a filesystem
read barrier. Save the enabled/disabled inventory and audit actual reads
for contamination, as the [runbook](../../../evals/README.md#isolation-and-measurement-limits)
requires. These runs test recommendations, installation restraint and
continuation without other skills. They do not test successful use of
installed complementary skills; that remains unverified without a separate
controlled question.

### Independent, bounded build measurement

The build harness should freeze hashes for fixture, engine, skill, prompts,
rubric, dependency lock, CLI and model settings. Save preparation failures,
raw turns, usage, changed/deleted source, check reports and screenshots.
Exclude installed dependencies, `.next`, browser caches and duplicate
generated artifacts from source snapshots. Reusing `codex-run.mjs`'s
whole-workspace walk literally would copy those large trees and read
binary files as text (lines 65 to 72).

Run acceptance checks from a frozen coordinator-owned implementation, not
only the actor's editable `package.json` and checker. Preserve ordinary
build diagnostics separately from rubric judgments. Include meaningful
failure paths and links, the assets provenance file required by the design,
the approved wording, and every checklist item's disposition. Define the
independent judge entry point and its exact inputs; a prompt and scoring
module alone do not implement a judge. Keep the two arms blinded where
possible and record any unblinding from their content.

The sandbox probe is right, but a local server/browser failure is not
automatically a need for broad network access. Record which capability
failed and seek only the capability actually necessary. The build actor's
capability settings differ from the old planning runner: that runner turns
off project instructions and browser tools. State whether the shipped
engine instructions are deliberately supplied and how browser inspection
is available in the tested product workflow.

The written 11 to 13 conversation estimate depends on the uncorrected
protocol and is not a new blanket run authorization. Freeze the corrected
questions, smallest case lists, repetitions, stop conditions and maximum
cost exposure before stage 3. A paid probe still comes first; author
approval remains required before the planned further build runs.

## Stage 4 is partly present, and needs its own release gate

The README and MIT license already exist and the author reports that the
repository is public. Stage 4 should update those artifacts, not claim
packaging and publication have never started. Publishing remains the
author's decision; no new push is authorized by the development request.

The packaging plan should cover the actual distributable: skill references,
scaffold, engine, lockfile, license and origin credit. Test installation and
scaffolding from a clean extracted package, check for machine-specific
paths and missing files, verify fresh dependency installation, and confirm
current plugin manifest fields against official documentation. Keep
Codex, Claude Code and agent-neutral usage accurate, distinguishing
documented portability from clients actually smoke-tested. Update the
README from planning-only to building only after stage 3 passes. Record
supported versions, browser setup, upgrade ownership and release
limitations. A fresh audit of public artifacts and their rights is still
distinct from a report that the GitHub visibility changed.

## Work authorized now

The engine checkpoint and plan correction are committed. The author has
now [approved desktop and physical-phone scrolling](../../history/2026-10-11-engine-approval.md)
and said to proceed. Stage 2 is complete. Prepare the complete fixture,
frozen protocol, independent checker and bounded runner, then conduct the
first baseline conversation as the cost probe. Further paid conversations
still require the planned cost review and approval. Skill wording changes
still require saved failures and matched reruns. Release and push are not
authorized. The unresolved Stage 1 and review workstreams remain visible.
