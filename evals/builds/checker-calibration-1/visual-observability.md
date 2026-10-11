# Judge visual-tool observability correction, 11 October 2026

The first build judge treated the absence of image-view events in the
saved CLI stream as evidence that the actor's screenshot-review claim was
unsupported. The [targeted actor-session audit](../../runs/codex-build-1/audits/visual-tool-observability.md)
found 13 image-bearing calls and 39 returned images. All 39 returned image
payloads match retained PNGs byte for byte. The final run's 18 matrix
contact sheets cover all 93 screenshots, although contact-sheet delivery
does not prove careful review or full-resolution inspection of each image.

The current judge prompt and evidence-packet limitations now explain that
`codex exec --json` can omit image-view calls and image results. Absent
events cannot establish skipped screenshot review or an unsupported
review claim. Without supplemental proof, whether the review occurred is
unobserved. Neither tool delivery nor screenshot filenames establish pixel
quality. Packet descriptions now say that they contain events emitted by
the CLI, rather than claiming that every tool event is present.

This changes instructions for future frozen cohorts only. The original
cohort's input copies, prompts, actor artifacts and raw judgment remain
unchanged. No skill instruction was added and no actor or judge call was
made. The correction does not add an automatic actor-session import; any
future supplemental evidence needs its own bounded, attributable capture.

Validation: `node --test evals/lib/build-score.test.mjs` passed all 12 tests
on Node 22.22.1 outside the outer tool sandbox. The sandboxed run reported
only the test-file wrapper, so the outside run supplied the observable
per-test results and process-timeout check. No wording-matching test was
added for this instruction-only correction. Existing tests exercise packet
assembly, frozen implementation drift, evidence integrity, failed turns,
the judge deadline and preservation of results without retries.

The original input manifest still verifies all 126 frozen files with digest
`f3c2d770753136495701ed7ba73952709116a825d2b70fdbec119aaf859d31ba`.
