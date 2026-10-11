# Bounded completion of the fictional build

11 October 2026. Both authorized actor turns completed stops 5 and 6 on
the existing fictional Ada Mensah site. Independent acceptance passes all
six browser conditions and all 49 original screenshots were reviewed.
The single approved judge invocation was rejected by the CLI's input
length limit before a model turn started. There is no independent model
judgement or behavioral score for this cohort.

The working local preview is [localhost:3011](http://localhost:3011).
[Preview verification](audits/preview-verified.json) records HTTP 200 and
all seven beat IDs from a separate process, plus the restart command and
source workspace. The approved engine preview on port 3010 is separate.
Local server lifetime depends on this session. The complete final source
is retained in [the turn-2 snapshot](embedded-completion-1/baseline-1/turns/02/snapshot/files/).

## Question and provenance

The [approved protocol](../../../docs/superpowers/plans/2026-10-11-build-completion-proposal.md)
asks whether a fresh conversation can complete chapters, stop for a copy
choice, then finish the saved three-beat spine. The
[initial approval](../../../docs/history/2026-10-11-build-completion-approval.md)
authorizes at most two Sol medium turns and one Astra medium judgement.
The [fixture](../../builds/embedded-completion-1/README.md) preserves 97
site files from the previous actor, including inherited documentation.
The existing skill and shipped engine are unchanged. External prompts
explicitly authorize building beyond the skill's planning-only ending.

The frozen cohort has 208 input files and digest
`d0e14ef568c0d136796be8434b86ae65c884ced13102d8cb83950cef13a0f824`.
[Preparation](../../builds/completion-preparation-1/findings.md) and the
[exact-workspace setup](embedded-completion-1/baseline-1/setup/preparation-record.md)
record source selection, dependencies, sandbox capabilities and the
unpaid readiness check. The [freeze audit](audits/pre-actor-freeze.md)
records isolation and input identity. This is continuation coverage,
not a whole journey or a matched instruction-improvement comparison.

## Actual gates and implementation

Turn 1 completed six chapters and seven beats, preserved all eleven fixed
factual sentences, and explicitly stopped for opening O1/O2 and closing
C1/C2 choices. O1 and C1 were recommended and used provisionally. The
[gate](embedded-completion-1/baseline-1/gate-after-turn-1.json) binds the
actual reply and the usage check. The fixed second prompt selected those
first recommendations; it did not simulate final phone approval.

Turn 2 recorded the selected copy and performed the finishing pass. Its
supplemental direct-link check found that targeting the sticky second
Observation heading could activate Review. The actor added ordinary
anchors to beat wrappers and verified `#observation.evidence` against the
Observation rail. This establishes the new supported anchor; it does not
prove that the old `#observation.evidence-title` fragment was repaired.
The failed supplemental attempt and its screenshots remain preserved.

[Turn-1 content review](embedded-completion-1/baseline-1/audits/turn-1-content-review.md)
and [final content review](embedded-completion-1/baseline-1/audits/final-content-review.md)
find all required beats, headings, fixed sentences, source assets and
selected wording intact. The diagrams remain explanatory, attribution is
separate from the colleague's work, and projections remain separate from
measured results. No source omission or new unsupported factual claim was
found in these reviews. That is a bounded review, not a model rubric score.

## Checks and visual evidence

The actor reports 131 site tests, type checking, lint, 18 production
browser cases and its supplemental checks passing. Its source, commands,
reports, screenshots and local Git history are retained separately from
independent acceptance. [Command audits](audits/turn-1-commands.md) and
[the second-turn audit](audits/turn-2-commands.md) found no observed reads
of the development repository or other runs, and no optional-skill
installation. The supplied skill files remain unchanged.

The frozen coordinator checker independently passed type generation,
type checking, lint, production build and all six full-site conditions:
desktop, static phone, reduced motion, unavailable WebGL, no JavaScript
and context loss. The [manifest](embedded-completion-1/baseline-1/acceptance/result/manifest.json)
binds the full expectations and artifacts. Source hashes were unchanged
before and after this check. The actor's own checker was not used as the
independent acceptance implementation.

All 49 original images were inspected individually:

- [14 desktop images](embedded-completion-1/baseline-1/audits/visual-desktop.md).
- [14 phone and reduced-motion images](audits/visual-mobile-reduced.md).
- [21 fallback images](embedded-completion-1/baseline-1/audits/visual-fallbacks.md).

No blocking clipping or overlap was found. Scene texture labels are
softer than HTML, and diagram fine print is small in mobile thumbnails;
larger HTML repeats the key limitations and expansion links are present.
Six desktop mid/end pairs are byte-identical, so they are not independent
motion evidence. These checks do not establish physical-phone performance.

The [underlying image-tool audit](audits/visual-tool-observability.md)
records 11 completed image-bearing calls and 53 returned images. Forty
match retained PNG bytes exactly; eleven are resized tall sheets and two
are partial sheets with subsequent coverage. The final turn's image
delivery covers 213 matrix and 16 supplemental images through sheets and
selected originals. This supports the actor's inspection claim without
claiming attention or full-resolution inspection of every source image.
Only sanitized image-call metadata and unmatched image payloads were
copied from the underlying session.

## Judge failure and usage

The complete judge packet was 2,560,105 bytes. Preparation first rejected
it against the frozen two-MiB limit, without a model call or truncation.
The author then [explicitly approved](../../../docs/history/2026-10-11-build-judge-size-approval.md)
a three-MiB allowance for the one unused judgement, keeping the same
ten-minute deadline and full evidence. Its exact prompt hash is
`fda25f8c89713adccd38fd8dcc885908f5369fc0485ff76b1bdbbb8000ec0ae8`.

The [single invocation](embedded-completion-1/baseline-1/judge/result.json)
ended after 4,361 ms. The [CLI error](embedded-completion-1/baseline-1/judge/stderr.log)
reports `input_too_large`: 2,556,184 characters against a separate
1,048,576-character maximum. Only `thread.started` appears in the stream;
there is no model turn, judgement or usage counter. The invocation record
conservatively records one attempted model call. No retry was made and no
zero-charge claim is inferred from missing usage. Raising the local byte
allowance could not change this separate CLI constraint.

A subsequent unpaid harness fix adds a character guard before invocation,
with boundary and Unicode tests. It preserves the byte bound, rejects
overflow without truncation and leaves this cohort's frozen code intact.
It prevents the same avoidable invocation; it does not make this packet
judgeable. Future evidence delivery needs a separately reviewed correction
that preserves evidence and fits the actual transport limit. The
[packet-size audit](embedded-completion-1/baseline-1/audits/judge-packet-size.md)
quantifies the contributors; minification alone is insufficient.

| Actor turn | Duration | Input | Cached input | Output | Uncached input plus output |
| --- | --- | ---: | ---: | ---: | ---: |
| 1 | 8m 33s | 2,435,119 | 2,310,912 | 16,099 | 140,306 |
| 2 | 8m 26s | 7,025,838 | 6,818,304 | 30,958 | 238,492 |
| Sum of reported counters | 16m 59s | 9,460,957 | 9,129,216 | 47,057 | 378,798 |

[Raw actor accounting](embedded-completion-1/baseline-1/actor-usage.json)
keeps each counter. Input plus output sums to 9,508,014. Resumed counters
may overlap, so this is the protocol's conservative sum, not a claim of
distinct billed tokens. The final uncached sum crosses 350,000 during
turn 2; that is a between-turn threshold, not a hard in-flight cap.
Turn 2 was within bounds when authorized, and no later actor turn was
sent. These figures exclude the earlier cohort, the failed judge's unknown
usage, and coordinator/subagent work. The CLI supplied no dollar charge.

## Omissions and remaining development

Two concrete product/design gaps remain after the successful build:

1. The design asks for **three complete wording versions shown as whole
   beats**. The frozen rubric asks only for meaningful alternatives; the
   actor supplied two short versions per placement. The
   [stage audit](audits/remaining-stages.md#concrete-design-to-rubric-gap-wording-choices)
   identifies this measurement gap. The full design requirement stands;
   no narrower rubric pass or two-option reply revises it.
2. Static State copy says “These six narrative rows” although the row
   graphic is absent in static modes. The main text is readable and factual,
   but this reference should become self-contained in future work. The
   independent phone and fallback reviews preserve the visible evidence.

The shipped skill still plans and stops before building. No new skill
instruction or `other-skills.md` was written, and no isolated site
adaptation was promoted to the shipped engine. No relevant optional-skill
recommendation miss has been established; source/install verification,
the actual recommendation-then-refusal branch and successful use of other
installed skills remain unobserved. The restored ten-skill list and early
machine-check requirements remain in the governing plan.

Stage 3 still needs the supported build entry point, early preflight and
concept sketches, any failure-backed instruction and matched rerun,
planning regression, and an approved whole-site proof using a non-sheet
object. Actual final scrolling approval of this fictional site is also
pending. Stage 1 closure, broader review/privacy work and Stage 4 packaging
retain their separate dispositions in the [handover](../../../docs/handover.md).
Nothing was published or pushed.

## Repository checkpoint

`node evals/check-skill.mjs` and `node evals/check-people.mjs` pass, and
`npm test` passes all 246 tests after the character guard was added. The
five focused prompt tests include exact-boundary, byte/character
independence, raised-byte-limit and astral-character cases. Logs are
retained under `audits/`, alongside the earlier 242-test checkpoint.
The previous handover is archived verbatim before its current status was
shortened. Source, raw results, failures, screenshots and author decisions
are retained together in this repository.
The [preservation audit](audits/preservation-check.md) verifies the frozen
inputs, saved turns, source snapshots, acceptance artifacts and retained
actor evidence. The live preview's allowlisted source matches the final
snapshot; the post-run character guard is recorded separately from the
frozen implementation.
