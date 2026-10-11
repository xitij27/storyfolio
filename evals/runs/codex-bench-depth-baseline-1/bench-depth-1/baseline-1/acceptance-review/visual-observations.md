# Source-bound visual observations

11 October 2026. Completed coordinator review of original PNG and JPEG
captures, opened individually in batches. This is separate from the paid
text judge and from actual author approval. The result is not acceptance:
the frozen checker fails all seven modes, the visual review identifies a
bench-explanation miss, and exact source-set identity is not established.

## Coverage and source binding

The [original inventory](original-image-inventory.json) records all 309
generated originals with their paths, sizes, SHA-256 hashes and reviewers.
This coordinator viewed all 35 images from the interrupted first attempt
and all 226 desktop, mobile, short-height and reduced-motion images from
the completed second attempt. The delegated
[fallback review](fallback-review/findings.md) opened all 48 remaining
originals, including duplicate images at their separate paths. There are
no missing or duplicate inventory paths. Completed coverage is 274 images:
65 desktop, 45 mobile, 65 short, 51 reduced-motion and 16 each for no WebGL,
no JavaScript and actual context loss. The three animated viewports include
72 travel images across all four intervals in both directions.

The [read-only verifier](verify-acceptance.mjs) and its
[saved result](integrity-audit.json) verify all 303 completed checker
artifacts and the identical frozen/current checker implementations.
All reports bind to the unchanged before/after/current 390-file capture
digest `a2e81366eefe18dbb816dfa2f4ec239d684e3ff5d728382706bddc715e2da841`.
The actor-scope comparison separately matches all 202 saved snapshot files
before, after and now. The checker excludes `next-env.d.ts`, leaving 201
comparable actor files, all of which match its captured hashes. However,
its capture contains 189 additional `.prototype-history/` Git metadata
files omitted by the actor snapshot. Their exact paths are preserved in
the audit. Whole source-set equality therefore fails; this report is
ineligible for strict judge attachment. A narrower application-source
match is not presented as that stronger identity guarantee.

## Final disposition

These are sampled criterion decisions, not an averaged score or a claim
that the skill caused every miss. Source omissions, measurement limits and
the author's opinion remain separate.

| Criterion | Status | Evidence and limit |
|---|---|---|
| Backdrop | Fail | The useful projection/observation displays deserve credit, but the bench composition leaves command, response, fixture access and observation as isolated labelled parts. The important relationship is carried by prose rather than made inspectable in the scene. See desktop and mobile `rest-bench.png`. |
| Depth | Pass | All five meanings have distinct readable explanations and the ending answers the opening with contribution and evidence limits, in animated and fallback originals. |
| Swap | Pass | The console, board, contact frame and claim instruments form a recognizable work-specific apparatus, with story-specific pose and face changes. |
| Detail and hierarchy | Fail | Parts are recognizable and do not crowd the HTML, but the important fixture-access surface is effectively blank at sampled rest scales, and the face detail does not let a visitor inspect that role. This is not a requirement to print every surface or to add unsupported technical detail. |
| Spatial quality | Pass within sampled coverage | The same apparatus persists, with meaningful console, board/frame and evidence-display emphasis, and no sampled disappearance or viewport clipping. The overlapping console words in two named reverse-travel originals remain a local weakness, not an every-frame pass. |
| Phone and still modes | Pass within sampled coverage | The phone retains recognizable 3D treatment and complete prose; reduced motion is stationary at the recorded pairs; all three failure modes retain readable explanations and diagrams. Small scene labels limit inspection on phone. |
| Factual, ownership and provenance boundaries in viewed content | Pass within sampled coverage | Projection and continuous observation remain distinct; six of forty, no customers, preliminary emissions and unfinished qualification remain bounded; PCB ownership remains with the colleague; illustrative diagrams are labelled. This does not replace the behavioral judge. |
| Type generation, strict typecheck, lint and production build | Pass | All four fixed commands exited 0. |
| Frozen browser acceptance | Fail | All seven reports retain only the same four skip-pointer findings. The source-level modality explanation does not change the raw result. |
| Original artifact integrity and review coverage | Pass | The verifier matches all 303 completed artifacts and accounts for 274 completed plus 35 partial originals. Its exit 0 means integrity and coverage, not acceptance. |
| Exact actor-snapshot/capture source-set identity | Fail | 201 comparable actor files match, but 189 captured Git metadata files have no actor-snapshot counterpart. Strict judge attachment is ineligible. |
| First attempt completeness | Fail | It terminated with exit 143 and only 35 originals, without final case reports. It remains preserved as partial evidence. |
| Second attempt completeness | Pass, with signal caveat | Final manifest is complete and checker exits 1 for failed assertions. Wrapper caught an externally delivered SIGTERM at 20:28:17.071 UTC and continued; its sender is unknown. |
| Every-frame behavior, physical-phone performance, screen reader and author approval | Unobserved | No such observation is supplied by these captures, and prior prototype approval is not transferred. |

The initial interruption is recorded in [interruption.md](interruption.md).
The second attempt's [signal observation](attempt-2/signal-observation.md)
preserves the event and the correction of the earlier stale status report.
It is not described as uninterrupted. Its exact final tool return is
[tool-poll-13.json](attempt-2/tool-poll-13.json), and the full process return
is [process.json](attempt-2/process.json). The completed checker ran from
20:25:53.396 to 20:42:05.498 UTC. The server's exit 143 was its normal owned
shutdown, separate from the first attempt's interrupted wrapper.

## Desktop and phone rests

The five meanings are developed in readable HTML. Firmware and bring-up are
explained at the opening; scheduling explains why separating activities
helps inspection; the bench paragraph preserves ownership; the evidence
paragraph separates measured inputs plus assumption from the continuous
run; the ending answers the question and bounds sample and qualification
scope. All desktop and 390 by 844 phone rests retain those explanations.

The apparatus has recognizable physical identities: a console, a green
board, a frame with three contacts, a base, and two instrument displays.
The console rises at Scheduling, the board and frame separate at Bench,
and the two claim displays move apart at Evidence. This is materially more
specific to bench work than a generic set of cards. No requirement to copy
the accepted manual prototype's arrangement or palette is applied.

The principal visual weakness is the bench relationship. In
`acceptance-2/desktop/rest-bench.png` and `mobile/rest-bench.png`, the console,
board, suspended frame and two claims remain separate labelled parts.
Their arrangement does not make the command-to-response-to-observation
relationship readily inspectable. Fixture access must be inferred from the
frame, and the observation is represented by outcome labels rather than a
readable relationship. The HTML supplies the chain. This is a failure of
explanatory composition, not a requirement for arrows, a fixed part count,
an interactive control, or additional invented measurements.

The evidence displays do distinguish projection and observation, and the
HTML comparison gives their different support. Small scene labels are
soft, especially on phone. The model remains recognizable and the prose
is clear, but the scene provides little independently inspectable detail
beyond those labels. The fixture's front strip and the base appear blank
at these sampled scales despite their labelled source material.

## Desktop movement and navigation

All 24 desktop original forward/reverse travel samples preserve the same apparatus
and its changes in emphasis. No sampled object disappears or clips at a
viewport boundary. Caption fades and incoming/outgoing partial captions
occur during travel; this is separate from legible settled rests.

The console changes printing for Scheduling. Mid-travel originals such as
`desktop/travel-reverse-bench-scheduling-0.5.jpg` and
`desktop/travel-reverse-scheduling-question-0.5.jpg` show old and new words
overlapping during the face crossfade. This is a local visual weakness,
not proof that every animation frame fails or that the engine as a whole
is defective. The inherited face crossfade is being used with changing
actor-authored printing.

Original pointer and keyboard navigation screenshots reach the indicated
beats and the ending's Return link reaches the opening. The Skip link
appears with a visible focus outline during actual keyboard navigation and
reaches the ending. Its frozen pointer-probe failure is analysed separately
as a modality mismatch in automatic control discovery.

## Measurement limits

These screenshots and viewport checks do not establish physical-phone
performance, frame rate, every animation frame, author satisfaction, or
generality to other people and objects. Readable prose is credited without
treating it as proof that the scene explains the same relationship.
No actor source, frozen checker, expectations or previous study was edited.
