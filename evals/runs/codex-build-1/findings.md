# First build baseline, 11 October 2026

One Sol conversation reached stop 4 with a working Scope, Transition and
Review spine in three implemented appearances. It stopped for the actual
look choice. No stop-5 or stop-6 prompt was sent: the first turn exceeded
the frozen between-turn token threshold. No shipped skill instruction or
engine source was changed by this study.

## Protocol, provenance and usage

The [protocol](../../../docs/superpowers/plans/2026-10-11-build-baseline.md)
and implementation were committed as `2f36b7e` before model execution.
[Inputs](inputs/manifest.json) freeze 126 files with digest
`f3c2d770753136495701ed7ba73952709116a825d2b70fdbec119aaf859d31ba`.
The [pre-actor audit](audits/pre-actor-freeze.md) verified the implementation,
CLI binary, configuration, supplied skill, fixture and scaffold.
The [exact-workspace setup](embedded-1/baseline-1/setup/preparation-record.md)
passed local HTTP, explicit external-network denial, production build and
browser capture. Its nine images were reviewed. That coordinator setup
does not count as an actor preflight.

| Model call | Wall time | Input tokens | Cached input subset | Output tokens |
|---|---:|---:|---:|---:|
| Sol actor, one turn | 802.071 seconds | 4,603,905 | 4,470,144 | 25,845 |
| Astra judge, one fresh call | 112.016 seconds | 267,133 | 0 | 4,390 |
| Total | 914.087 seconds | 4,871,038 | 4,470,144 | 30,235 |

The actor used 133,761 uncached input tokens. Across both calls, uncached
input plus output is 431,129 tokens, alongside the cached input above.
The protocol counts all reported input plus output between turns, including
cached input. The actor alone reported 4,629,750 against the 1,500,000
threshold. This was not a hard cap on an in-flight turn. The recorded
[stop decision](embedded-1/baseline-1/stop-after-turn-1.json) binds the actual
result digest and refuses advancement. The CLI reports no dollar charge.
No additional actor, retry or selective rejudgement was made.

## What the actor produced

The [saved source](embedded-1/baseline-1/turns/01/snapshot/files/),
[raw turn](embedded-1/baseline-1/turns/01/stream.jsonl) and
[reply](embedded-1/baseline-1/turns/01/reply.md) preserve the observed work.
It read the unchanged skill and approved derivative, kept six row cards,
implemented Bench paper, Instrument paper and Review sheet, and retained
facts and explanatory asset limits. It implemented the explicitly selected
static phone/reduced-motion modes. It left the remaining four beats for
the look choice and did not claim real-phone approval.

It recovered from a blocked registry request with an offline locked
install, corrected wide-face texture proportions and two layout overlaps,
and recorded the interrupted browser attempts separately. Its final own
matrix reports 18/18 cases, with 131 tests, typecheck and lint passing.
These are actor-authored checks, not independent acceptance. The actor
created local history in `.storyfolio-git` because the ordinary `.git`
placeholder was read-only; a [bundle and integrity record](embedded-1/baseline-1/actor-evidence/turn-1/history-integrity.json)
preserve that history. The [retention manifest](embedded-1/baseline-1/actor-evidence/turn-1/retention-manifest.json)
covers 367 other files, including every interrupted/final check and three
temporary scripts/logs. All lasting evidence now lives in this repository.

The [75-command audit](audits/turn-1-commands.md) found no observed reads of
this development repository, other runs or disabled global skills, and no
optional-skill installation attempt. Directory listings are distinguished
from content reads. Configuration isolation remains no filesystem read jail.
No actor process with the workspace as its current directory remained
after the turn; the process inventory's detection limits are recorded.

## Independent judgement and reviewed corrections

The original [Astra judgement](embedded-1/baseline-1/judge/judgement.json)
reports 14 pass, 2 fail and 8 unobserved. It is retained unchanged.

One failure is confirmed: the actor's handover claims existing engine
defaults remain for other bundles, but its shared static-mode change applies
to every Story bundle. This is an inaccurate implementation-scope statement.
The [engine adaptation review](audits/engine-adaptation.md) separately finds
that wide-face texture allocation is a reusable engine improvement worth
considering. The static fallback itself correctly follows this fixture's
chosen policy; it is not a defect in the approved engine default.

The other failure, `reported_limits`, rests on absent image-view events in
`codex exec --json`. The [underlying-session audit](audits/visual-tool-observability.md)
proves this absence inference invalid: 13 completed image-bearing calls
returned 39 images, all matching retained PNG bytes. All eighteen final
contact sheets cover the 93 matrix originals. The actor's contact-sheet
inspection claim is supported. This does not establish that every original
was inspected at full resolution; sheet cells are 480 by 300. No paid
rejudge was used to replace the original result. This reviewed correction
leaves one confirmed failure among the observed criteria.

No optional skill was recommended. The judge did not find evidence that a
particular missing skill materially harmed this bounded stop, so relevance
is unobserved rather than a manufactured failure. It correctly leaves
source/install verification unobserved without the external source packet.
Refusal handling, later stops, before-stop-1 timing, non-sheet generality
and successful use of installed complementary skills remain untested.
This run does not justify writing `other-skills.md` or new skill wording.

## Independent browser measurement

The [stop-4 diagnostic](embedded-1/baseline-1/spine-acceptance/scope.md)
used the unchanged coordinator checker with a derivative selecting the
three spine beats authorized by the fictional fixture. It is not full seven-beat acceptance
and was not supplied through the judge's full-site acceptance interface.
Source hashes match the saved actor snapshot before and after both attempts.

With separate physical Next.js copies, the build hit a `workStore`
prerender error. With the same source and checker using the site's own
byte-identical tool entrypoints, production build passed. The
[dependency-location audit](audits/acceptance-dependency-location.md)
explains the mixed module-instance problem. It is a coordinator integration
issue, not an actor failure.

The local-dependency run completed all six modes and saved 21 images, all
individually reviewed: [desktop/mobile](embedded-1/baseline-1/spine-acceptance/visual-spine-desktop-mobile.md),
[reduced motion](embedded-1/baseline-1/spine-acceptance/visual-reduced-motion.md)
and [fallbacks](embedded-1/baseline-1/spine-acceptance/visual-fallback.md).
No blocking layout defect was observed. Pale scene depth and the limits of
the transition formation remain recorded. These are headless observations,
not physical-phone performance or a whole-site approval.

The raw checker reports 0/6 passes. Each case repeats the same five false
observations: its exact raw-label matching rejects otherwise usable links
with decorative arrows or a CV format suffix, and the coordinator's partial
expectation mistakenly includes the bring-up definition assigned to the
unvisited Observation chapter. Reports and screenshots preserve usable
links with the correct destinations. Original failed reports remain intact;
no passing original acceptance is claimed. The subsequent
[non-model calibration](../../builds/checker-calibration-1/findings.md)
passes all six conditions with the corrected checker and partial projection,
on unchanged actor source. It preserves the original results and does not
extend the actor's observed stage coverage.

## What remains

Cost review is required before further paid work. The next build question
must cover the unvisited chapters, copy approval and finish, with deliberate
bounds informed by this exposure. The remaining Stage 3 questions still
include early preflight and concept sketches, complementary-skill source
verification and refusal handling, planning regression, and the non-sheet
whole-site proof with actual author approval. Stage 1's closing decisions,
privacy integration, broader review support and Stage 4 packaging remain
in the handover. Nothing was pushed.
