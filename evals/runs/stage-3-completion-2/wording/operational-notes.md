# Live operational observations

Turn 1 launched at 04:12:14.279 UTC, through the reviewed recorder. PID
198325 supervises runner PID 198336. The independently checked setup audit
was observed at 04:12:03.999, but its message and written report arrived
after launch; root had already completed its own strict readiness review.
Do not claim root read that independent report before launching.

The first two retained polls completed at approximately 04:13:10 and
04:13:56 UTC. This exceeded the intended at-most-40-second cadence. Both
reported the session still live with no new outer output. Root is shortening
its polling interval. No cause, cure, completion or process-limit extension
is inferred from polling frequency. The actor retains its original
900000-ms bound, and all actual raw poll outputs remain saved separately.

Poll 10 observed terminal closure after the external signal described in
`interruption-disposition.md`. During later read-only inspection, two
summaries accidentally printed oversized nested result records; output
was truncated, not treated as a complete review. A compact summary command
then had one syntax error before a corrected read-only invocation. Neither
inspection wrote source, changed evidence or launched an actor/browser.
The exclusive preservation helper subsequently completed successfully.
