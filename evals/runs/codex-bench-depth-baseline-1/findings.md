# Five-beat baseline: completed actor, separate assessments

11 October 2026. One Sol medium actor and one Astra medium text judge were
spent under the [bounded authorization](../../../docs/history/2026-10-11-build-baseline-launch-approval.md).
There was no actor continuation, model retry, candidate run or push.

## Corrected outcome

The actor completed the five-beat, one-appearance prototype in its original
turn. It recovered from the blocked registry request with an offline locked
installation, then implemented the page and ran checks. The earlier
incomplete report was an assistant error: a yielded execution call was
mistaken for termination. The same process continued without a second call.
The [premature findings](premature-findings.md) preserve that incorrect
`b81d2b7` record verbatim. The [reconciliation record](../../../docs/history/2026-10-11-baseline-reconciliation-and-development.md)
preserves the correction, exact author direction and preceding handover.

The [final actor result](bench-depth-1/baseline-1/turns/01/result.json),
[process record](bench-depth-1/baseline-1/turns/01/process.json),
[reply](bench-depth-1/baseline-1/turns/01/reply.md) and
[full stream](bench-depth-1/baseline-1/turns/01/stream.jsonl) establish
completion, not visual acceptance. The before/after snapshot has 42 changes
across 174 initial and 202 final files. Skill, engine runtime, fixed story
and facts, and supplied SVGs are unchanged. The 44-change result summary
uses an earlier setup baseline. See the [actor audit](actor-audit.md).

## What was built and checked

An original illustrative six-part bench rig accompanies question, scheduling,
bench relationship, evidence provenance and sample scope. Explanatory copy
is ordinary HTML. Source review retains ownership and evidence boundaries:
colleague-designed PCB/analogue circuitry, illustrative loop rather than
recovered firmware, two-year projection distinct from 72 hours observed,
six of forty samples bench-tested, none sent to customers and qualification
unfinished.

Actor-owned evidence reports 129 tests, lint, type checks, production build,
seven browser conditions and a final three-fallback check. Earlier failed
attempts remain evidence. The [actor-check archive](actor-checks/manifest.json)
retains all 221 files from six capture trees, including originals, reports
and contact sheets, totaling 28,773,349 bytes. These are actor-controlled
diagnostics, not independent acceptance.

Independent fixed type generation, type checks, lint and production build
passed against a workspace whose retained actor source matches the final
snapshot. The first coordinator
browser attempt was externally interrupted before a complete mode report;
its partial originals and manifest remain in
[acceptance](bench-depth-1/baseline-1/acceptance/). A separately recorded
second unpaid attempt used the identical frozen checker and expectations,
not a changed actor or another model turn. It completed all seven conditions
with unchanged source. Its [manifest](bench-depth-1/baseline-1/acceptance-2/manifest.json)
retains `complete: true`, `passed: false`: every mode fails the same inherited
focus-only skip-link pointer trial, with four consequent problem entries.
The skip works through actual sequential keyboard navigation; other control,
rest, motion, stillness and fallback checks have no reported problems.
Do not silently relabel these seven frozen failures as passes. The
[modality review](checker-modality-review.md) attributes the mismatch and
proposes a separately versioned repair.

Source comparisons and process evidence are under
[acceptance review](bench-depth-1/baseline-1/acceptance-review/).
The second wrapper recorded an external SIGTERM at 20:28:17 UTC and caught
it without terminating the checker. Its sender is unknown. The checker
subsequently finished all modes with exit 1 and no terminating signal.
This was not an uninterrupted wrapper run. Both attempts and the signal
record remain intact; no third capture or paid call was made.

The source-bound scopes need a further qualification: the independent
checker inventories 189 files from the actor-created `.prototype-history`
Git metadata tree that the actor snapshot excludes. All 201 compared source
files match, and the full 390-file checker inventory is unchanged across
capture. That does not establish equality of the two whole file sets.
The stricter judge acceptance-attachment guard would reject this set
difference. This report was not supplied to the already-completed judge,
and no guard was bypassed. Keep the explicit extra-path inventory alongside
the code match, rather than claiming exact snapshot/acceptance identity.

The separate original-image review does not establish the intended visual
quality. The apparatus is recognizable and responsive, all five meanings
and factual limits remain readable, and still/failure modes preserve the
explanations. However, the scene mostly carries disconnected labels while
prose supplies the command/board/fixture/observation relationship. Sampled
forward and reverse transitions also superimpose console wording. These are
visual implementation concerns, not consequences of the skip-link checker
rule. Source and text passes therefore do not advance the workflow to
full-site acceptance.

The [visual observations and criterion dispositions](bench-depth-1/baseline-1/acceptance-review/visual-observations.md)
and [fallback review](bench-depth-1/baseline-1/acceptance-review/fallback-review/findings.md)
cover all 274 originals from the completed capture and all 35 from the
interrupted attempt, not just contact sheets. The
[integrity audit](bench-depth-1/baseline-1/acceptance-review/integrity-audit.json)
and [full image inventory](bench-depth-1/baseline-1/acceptance-review/original-image-inventory.json)
retain hashes, exact review coverage and the source-scope qualification.
Reproduce the read-only audit with:

```sh
node evals/runs/codex-bench-depth-baseline-1/bench-depth-1/baseline-1/acceptance-review/verify-acceptance.mjs
```

## Judge delivery, parser failure and separate audit

Complete-packet dry validation passed before the one authorized judge.
The 1,419-byte prompt references a logical packet of 744,403 bytes and
744,204 UTF-16 code units through 23 read-only pages. All pages were delivered,
with 24 receipts including a repeat. [Delivery](bench-depth-1/baseline-1/judge/delivery.json)
does not establish comprehension, history retention or visual review.

The model completed and produced terminal JSON, but the original runner
parsed two progress updates concatenated with that JSON. Its
[raw result](bench-depth-1/baseline-1/judge/result.json) remains
`complete: false`, with the original SyntaxError and no accepted
`judgement.json`. No model was recalled or failed record overwritten.

The separately labelled [judge audit](judge-audit/README.md) extracts only
the exact final message `item_26` and applies the frozen schema, eligibility
and exact-citation validators to the saved packet. All 60 text document
bodies, input hashes and page receipts verify, with zero validation problems.
The derivative assessment has 14 pass, one fail and ten unobserved criteria.
These are the original model's reviewed text opinions, not a successful
historical runner result, new judgement or visual score. Coordinator
acceptance was not supplied to this judge.

The sole reported failure is the build-start available-skills inventory.
The rubric asks for it and no actor event demonstrates it. However, the
fixture did not explicitly supply the disabled-skill inventory visible in
harness records to the judge. This is a scoped missing observation and
input-visibility limitation, not an unauthorized installation, demonstrated
need for another tool, or before-stop-1 failure. It does not alone justify
a new instruction. Factuality, attribution, source-level realization,
documentation, installation restraint and honest limits pass in this text
assessment. Stop-4/5/6 choices and full-journey completion remain unobserved.

The parser defect is repaired separately in
[judge-response-parsing-1](../judge-response-parsing-1/findings.md), with
failure reproduction and regression tests. Aggregate commentary is retained,
while only the completed terminal message is validated. Old inputs and raw
results remain unchanged.

## Information boundary and interpretation

The [command audit](actor-audit.md) found one undeclared cross-run tooling
read: `item_27` prints `/tmp/storyfolio-contact-sheets.mjs`, whose import
names an earlier runtime; `item_32` adapts it. The printed body is generic
screenshot tooling, not the held-out geometry, copy, assets or accepted
design. No saved command reads the accepted implementation, recovery specs
or rubric. Exact filesystem and image telemetry are incomplete. This is
not a strictly fixture-only uncontaminated reproduction, though the observed
read does not establish copying of the held-out solution.

The actor reports image inspection, which the CLI's command/message-only
stream cannot independently verify. Missing image events also do not prove
inspection was skipped. Coordinator original-image review is separate.
Technical success, text scores and earlier acceptance of `fd03055` do not
approve this new output. Author visual and physical-phone review are pending.

The case supplies concept and approved story, explicitly overrides the
planning-only endpoint and asks for one appearance. It tests neither
concept discovery nor supported build activation, early preflight timing,
look choices, whole-beat wording choices, optional-skill recommendation and
refusal, a whole site or generality.

## Usage

| Invocation | Duration | Input | Cached input subset | Uncached input | Output |
|---|---:|---:|---:|---:|---:|
| Actor | 766.005 s | 3,934,281 | 3,815,040 | 119,241 | 18,677 |
| Judge | 318.070 s | 2,673,456 | 2,375,552 | 297,904 | 5,773 |

Combined input plus output is 6,632,187 tokens, including 6,190,592 cached
input. Uncached input plus output is 441,595. Reasoning-output counters are
retained but not added again. No dollar charge is reported. Deadlines and
invocation limits bounded time and calls, not hard token or dollar spend.
The parser failure does not erase the judge's usage.

## Direction

The completed evidence separates a measurement mismatch from the visual
implementation weaknesses. Do not add prose for behavior that already
passed. The author authorized continued local development after tests; the
observed harness defect is handled with code and local tests, not another
paid evaluation. Skill, engine, accepted prototype, frozen inputs and the
public planning-only promise remain unchanged. New paid experiments retain
the plan's separate question, scope and cost decision.
The [post-baseline plan](../../../docs/superpowers/plans/2026-10-11-post-baseline-attribution.md)
records cause-by-cause disposition and the next local measurement work.
