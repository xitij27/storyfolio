# Candidate animated visual review: retained partial capture

12 October 2026. Reviewer: `next_plan`. The two targeted weaknesses are
improved in the observed output, but **this is not a successful completed
comparison or seven-mode visual acceptance**. The actor timed out after
900,055 ms with `complete:false`; the separate frozen capture received
SIGTERM at 00:00:05.043Z from an unknown sender and ended incomplete.
Neither failure is erased by the narrower visual findings.

## Exact coverage and identity

Every **available original** was individually opened at original resolution:
118 files, not a selected gallery and not hash-deduplicated.

| Mode | Originals | Rests | Travel | Numbered mid/end | Controls |
|---|---:|---:|---:|---:|---:|
| Desktop | 62 | 5 | 24 | 10 | 23 |
| Mobile | 42 | 5 | 24 | 10 | 3 |
| Short, interrupted | 14 | 4 | 0 | 10 | 0 |

Short has no `rest-scope.png`, no forward/reverse travel and no control
images. Its numbered scope mid/end originals exist and were reviewed.
Reduced-motion, no-WebGL, no-JavaScript and context-loss produced no
originals and remain **unobserved**. Missing observations are not passes
or established application defects.

The [view inventory](animated-review/viewed-images.json) records every
path, byte count and SHA-256. Its `complete:true` means all 118 *available*
originals reviewed, not complete required-mode coverage.
[Partial integrity verification](partial-verification.json) checks the exact
118 originals, all 134 capture artifacts and 184 unchanged source files
against the retained actor snapshot. The capture manifest remains
`complete:false, passed:false`. Desktop and mobile technical reports pass;
the short report fails with interrupted/missing observations.

Stable references:

- Source digest: `830d73920983268e04480dee830a5172a69a4077de80512a3d6e414d3439ecb7`.
- Capture manifest: `b21f8baa6e9568c71e7d0cde2957c4e2405eff4018c09594de76f2fa23296572`.
- Viewed inventory: `5aeca535894f945b873e7f147a686fb0b143caabc31c8df1cc26d5469a281505`.
- Partial verification: `176b4df840cd4cc0893e8343747d00bd5b3df7e64092150fe83701d4ee8477eb`.

## Targeted findings

**Settled relationship and evidence: pass within observed rests.**
Desktop, mobile and retained short bench rests show the command panel,
central board response and observation panel as related parts. Board contacts
meet the fixture-access base. The scene is an illustrative relationship
diagram, not recovered wiring. Evidence rests enlarge two separate displays:
measured current plus an assumed interval support the two-year projection;
the 72-hour bench run is observed, not two-year proof or a field claim.
Accessible prose, ownership and provenance limits remain.

Primary originals are [desktop bench](../acceptance/desktop/rest-bench.png),
[desktop evidence](../acceptance/desktop/rest-evidence.png),
[phone bench](../acceptance/mobile/rest-bench.png),
[phone evidence](../acceptance/mobile/rest-evidence.png), and the corresponding
[short bench](../acceptance/short/rest-bench.png) and
[short evidence](../acceptance/short/rest-evidence.png).
Their exact hashes are also selected in [the structured review](animated-visual-review.json).

**Old/new face-word collision: pass in the available desktop/mobile samples,
short unobserved.** All four adjacent intervals, both directions and the
0.2, 0.5 and 0.8 samples were reviewed, 24 per viewport. The earlier
superimposed main labels were not observed. The board/evidence labels remain
stable and the fixture-to-scope strip does not visibly show two competing
versions together. This includes
[forward bench to evidence 0.5](../acceptance/desktop/travel-forward-bench-evidence-0.5.jpg)
and [reverse evidence to bench 0.5](../acceptance/desktop/travel-reverse-evidence-bench-0.5.jpg).

This is specifically the old/new collision finding, **not proof that every
scene word stays readable throughout travel**. On phone, foreground prose
moves over a faded lower scene and fixture strip, for example
[forward bench to evidence 0.8](../acceptance/mobile/travel-forward-bench-evidence-0.8.jpg),
[forward evidence to scope 0.8](../acceptance/mobile/travel-forward-evidence-scope-0.8.jpg),
and [reverse scope to evidence 0.5](../acceptance/mobile/travel-reverse-scope-evidence-0.5.jpg).
The prose remains readable, but the covered scene words cannot all be
inspected there. No short travel exists, so no corresponding forward or
reverse verdict is possible. Some connections are absent from travel and
control-after frames; the qualified relationship remains visible at rests.

## Unchanged six criteria, observed scope only

| Criterion | Result in retained coverage |
|---|---|
| Backdrop | Pass at observed rests: the apparatus explains relationships and distinct evidence, not only names. |
| Depth | Pass: all five meanings and the bounded answer are visible in numbered images across all three captured viewports. |
| Swap | Pass for this artifact: board cycle, access contacts and separate command, observation and evidence treatment are work-specific. This is not broad non-sheet proof. |
| Detail and hierarchy | Pass at observed rests and available controls: the active loop/evidence expands; copy remains clear. Secondary phone labels are small and phone travel has the overlay limit above. |
| Spatial quality | Pass in observed desktop/mobile samples: recognizable assembly and changing emphasis serve the story. No short motion verdict or every-frame claim. |
| Phone and still modes | Unobserved as a complete criterion. Phone rests retain meaningful treatment and complete prose; all four later modes are absent. |

The five-beat sequence develops the question, scheduling order, physical
check, evidence provenance and final supported limits. Forty assembled,
six bench-tested, none to customers, one preliminary emissions check and
unfinished qualification remain bounded in the ending. The desktop
navigation focus outlines and focus-only skip are visible; phone skip
focus and its resulting ending are visible. Short control behavior is
unobserved, not inferred from its visible navigation.

## Attribution and disposition

These are output observations under the
[pre-outcome plan](../../../../stage-3-comparison-1/visual-review-plan.md),
not a new rubric, text score, causal claim or author approval. Both candidate
paragraphs changed together; this single incomplete pair cannot isolate
their effects or establish a general success rate. No candidate judge
score exists. The timeout is an actor completion failure; the external
capture interruption is a separate measurement-lifecycle event with an
unknown sender. I issued no browser launch, test, cleanup or kill operation.

The observed partial artifact supports retaining the two outcome-based
paragraphs **provisionally**, not declaring them validated by a successful
comparison. Whole-scope acceptance, fallback behavior, continuous
scene-word readability, physical-phone review and Stage 3 completion remain
unestablished. No new model call, retry, continuation, source edit or
additional instruction is recommended by this review.
