# Documentation map

Start with [the current handover](handover.md). It says what the skill does
today, what the author has decided, what the evidence supports and what
remains open. The skill currently plans a portfolio through an approved
storyboard. The reusable engine is implemented, locally verified and
approved on desktop and a physical phone. Stage 3's fictional seven-beat
implementation passed six technical browser conditions, but the author
rejected its visual quality. The 49 reviewed images established readability
and layout checks, not a convincing object-led story. Stage 3's visual proof
has failed and remains open. The completion judge could not start because
its packet exceeded the CLI character limit. Shipped site-building guidance
remains future work.

The author subsequently authorized a manual three-beat recovery prototype.
Its [source and setup](../prototypes/fixture-study/README.md),
[design](superpowers/specs/2026-10-11-fixture-prototype.md) and
[findings](../evals/runs/visual-recovery-prototype-1/findings.md) record that
first checkpoint, before author approval.
The author then requested more story depth. The
[five-beat revision](superpowers/specs/2026-10-11-fixture-story-depth.md) and
[new study](../evals/runs/visual-recovery-depth-1/findings.md) record the result,
with [the exact clarification](history/2026-10-11-prototype-depth-feedback.md)
preserved separately. The author then [accepted the revised story's depth
and direction](history/2026-10-11-story-depth-approval.md), then
[confirmed it works on phone](history/2026-10-11-fixture-phone-approval.md).
The bounded prototype review gate is closed; full Stage 3 acceptance remains
open. The next planning step is a scoped build-workflow protocol.
The author has now authorized that planning. The
[reproduction plan](superpowers/plans/2026-10-11-build-workflow-reproduction.md)
specifies an unchanged-skill five-beat diagnostic, local preparation and a
proposed paid envelope. The author subsequently
[approved no-model preparation](history/2026-10-11-build-preparation-approval.md).
The [implemented tooling and diagnostic evidence](../evals/runs/build-workflow-preparation-1/findings.md)
at that checkpoint stopped before final freeze, pending shared-controls and
judge-transport decisions. No paid run was authorized then. The earlier
[planning record](history/2026-10-11-build-workflow-planning.md) remains intact.
The author subsequently [approved the shared-controls repair](history/2026-10-11-shared-controls-approval.md).
Its [engineering study](../evals/engine/shared-controls-1/findings.md) records
the narrow provider fix and local verification. The subsequently
[authorized local transport repair](history/2026-10-11-judge-transport-approval.md)
is now implemented. Its [study](../evals/runs/judge-transport-1/findings.md)
records byte-exact historical packet delivery, bounded read-only pages,
305 passing tests and the then-untested live-model limits. Final input freeze,
actor-workspace capability proof and paid-run approval were separate later gates.

The author then [approved the final local preparation](history/2026-10-11-build-freeze-approval.md).
The [freeze and capability study](../evals/runs/build-workflow-freeze-1/findings.md)
now records 121 fixed inputs, the fresh external workspace, offline locked
dependencies and passing loopback, blocked-external-request, production-build
and starter-browser checks under the exact frozen sandbox configuration.
It supersedes the pending-freeze status above, not the paid-run gate.
The author has since [approved the bounded launch](history/2026-10-11-build-baseline-launch-approval.md):
one actor turn, followed by at most one judge only after complete-packet
validation. At the freeze checkpoint no actor or judge had started. Process
deadlines are not hard token or spending caps. The study is the home for exact
recheck commands and the separately retained `TMPDIR` requirement.

The actor subsequently completed the five-beat prototype after recovering
from the blocked package registry with its offline cache. The earlier
incomplete report was premature and is
[explicitly corrected](history/2026-10-11-baseline-reconciliation-and-development.md).
The [baseline findings](../evals/runs/codex-bench-depth-baseline-1/findings.md)
separate the completed source, actor-owned checks, coordinator visual and
technical evidence, usage and information-boundary limits. The single judge
received every page, but the original evaluator mixed progress messages with
final JSON. Its failed result is preserved beside a no-model terminal-message
audit. The author authorized continued local development after the tests;
the [parser repair](../evals/runs/judge-response-parsing-1/findings.md) is a
separate engineering change, not a new paid judgement or skill improvement.
The new output has no author visual or physical-phone approval.
Independent review covers all 274 completed-capture originals plus 35 from
an interrupted attempt. The completed seven-mode checker fails on its
focus-only skip-link pointer requirement; separate visual review finds a
weak bench relationship and overlapping transition labels. The
[post-baseline plan](superpowers/plans/2026-10-11-post-baseline-attribution.md)
keeps measurement repair and visual improvement distinct.

On 12 October the author [directed completion of Stage 3 first](history/2026-10-12-stage-3-development.md).
The [completion work record](superpowers/plans/2026-10-12-stage-3-completion.md)
keeps the product milestones in view: supported build entry, missing journey
and choice coverage, planning regression and the approved full-site proof.
Local measurement corrections and a neutral new comparison fixture are
implemented. The [verified checkpoint](../evals/runs/stage-3-integration-1/findings.md)
records 342 passing tests, seven valid browser conditions, 15 rejected
faulty variants and a real-browser helper smoke. The shipped skill is still
planning-only, with two evidence-backed visual paragraphs drafted but not
applied at that checkpoint. The author then [approved the bounded comparison](history/2026-10-12-stage-3-comparison-approval.md).
The [new comparison record](../evals/runs/stage-3-comparison-1/findings.md)
tracks the actual baseline, any justified candidate and remaining limits.

For a new session, read:

1. [Repository rules](../AGENTS.md), then [current handover](handover.md).
2. [The skill](../skills/storyfolio/SKILL.md) and its linked references when
   working on behavior.
3. [Plan index](superpowers/plans/README.md) for the relevant protocol,
   status and successor work.
4. [Evaluation studies](../evals/studies.md) for the evidence, and
   [the current runbook](../evals/README.md) before running anything.

| Information | Authoritative home |
|---|---|
| Current state, author directions, open decisions and startup guidance | [Handover](handover.md) |
| What Storyfolio is, how to install and use it, and its licence | [Repository README](../README.md) and [MIT License](../LICENSE) |
| README concept illustration and publication-status update | [Illustration](assets/storyfolio-overview.png), [SVG source](assets/storyfolio-overview.svg) and [publication and README record](history/2026-10-11-readme-and-publication.md) |
| Repository-wide working rules | [AGENTS.md](../AGENTS.md) |
| Current instructions followed by the test agent | [Skill and references](../skills/storyfolio/SKILL.md) |
| Design rationale and intended scope | [Original approved design](superpowers/specs/2026-10-10-portfolio-skill-design.md) and [existing-portfolio review design](superpowers/specs/2026-10-10-existing-portfolio-review.md) |
| Stage coherence corrections and engine proof | [Stage review](superpowers/plans/2026-10-11-stage-review.md), its [machine-check and optional-skill protocol](superpowers/plans/2026-10-11-stage-review.md#machine-check-and-recommendations-for-other-skills), and [engine evidence](../evals/engine/plain-story-1/findings.md) |
| Rejected demo, original-site comparison and visual recovery | [Author's rejection](history/2026-10-11-visual-quality-rejection.md), [review findings](../evals/runs/codex-visual-quality-review-1/findings.md) and [recovery plan](superpowers/plans/2026-10-11-visual-quality-recovery.md) |
| Work protocols, completion gates and outcomes | [Plans](superpowers/plans/README.md) |
| How to make and interpret a current evaluation | [Evaluation runbook](../evals/README.md) |
| Which experiments exist and what each asks | [Study catalogue](../evals/studies.md) |
| Observations, conversations, judgements and verification evidence | The relevant [saved study](../evals/studies.md) under `evals/runs/` |
| Previous handovers, exact historical statements and preservation records | [History index](history/README.md) |
| Historical Claude operating instructions | [Archived workflow](../evals/history/claude-workflow.md) |

The original design includes stages that have not been built and historical
tool choices. The existing-portfolio review direction is accepted, with an
implementation plan prepared; no dedicated skill review entry point is
implemented yet. A source-review runner and pilot exist. Use the
current handover for implementation status and the runbook for current
Codex commands.

Keep new detail in its authoritative home and link to it from navigation
pages. Preserve original plans and designs at their existing paths. Saved
evaluation trees are evidence: their paths, file membership and bytes can
be pinned by verifiers, so navigation belongs outside those trees. Complete
historical snapshots remain available even when current guidance is
shortened. All project context stays committed in this repository.

Stage 3's first paid build probe uses the
[bounded baseline protocol](superpowers/plans/2026-10-11-build-baseline.md),
[complete fictional fixture](../evals/builds/embedded-1/README.md) and
[build runbook](../evals/README.md#bounded-build-baseline). Its preparation
checks are [recorded separately](../evals/builds/preparation-checks/findings.md)
from agent evaluation results.

[First build baseline findings](../evals/runs/codex-build-1/findings.md)
separate the completed spine, actual usage, original scores, reviewed
corrections and the unvisited stages.

[Completion findings](../evals/runs/codex-build-completion-1/findings.md)
record the completed implementation, copy gate, technical acceptance,
image reviews and judge transport failure. The subsequent
[visual-quality review](../evals/runs/codex-visual-quality-review-1/findings.md)
records the author's rejection and the gap between those checks and the
design's visual goal. It compares original-site source and its repository
preview image with fresh demo captures; it is not a fresh runtime comparison
of both sites. The [earlier handover](history/2026-10-11-before-visual-quality-review-handover.md)
preserves the preceding status verbatim. The [recovery plan](superpowers/plans/2026-10-11-visual-quality-recovery.md)
does not itself authorize another paid run or change the skill or engine.
