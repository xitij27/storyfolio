# Fifth local preparation checks and final narrow delta

Root approved removing the four redundant live `process.stdout.write`
and `process.stderr.write` calls from `calibrate.mjs` and `run-unit.mjs`.
The raw-file callback appends remain synchronous and unchanged. Final
console summaries still occur only after the worker has closed and result
records have been written. No retry, source gate, deadline, record schema
or actor/prototype behavior changed in this follow-up.

Independent review found that asynchronous outer-stream EPIPE could
otherwise terminate a coordinator despite successful raw-file appends.
Removing the duplicate live forwarding eliminates that path; it neither
identifies nor claims to fix the historical interruption's cause. Existing
calibration records and frozen implementation copies were not edited.

Root authorized one fresh local verification of this delta, using the same
native Node PATH/environment and command sequence as local-tests-4.
The [command](local-tests-5/command.json), [stdout](local-tests-5/stdout.log),
[stderr](local-tests-5/stderr.log), [result](local-tests-5/result.json),
[tool launch](local-tests-5-tool-launch.json) and
[terminal poll](local-tests-5-tool-poll-1.json) are retained unchanged.
Session 86513 closed with exit 0 and no signal.

Start: 2026-10-12T05:22:58.168Z. Finish: 05:23:12.432Z.
Total recorded duration: 14264 ms. Stderr is empty.

- All three focused suites: 55 passed, zero failed, 105.035871 ms.
- Every measurement `.mjs` syntax check passed.
- Fixture preservation passed.
- Skill validator passed: 742 words, five references.
- People validator passed: 17 fictional people.
- Repository suite passed: 351 tests, zero failed, 13371.715077 ms.

The component durations above come from TAP summaries; individual syntax
and validator durations were not separately recorded. No browser,
application build, installer, model, paid actor or judge was launched.

Final changed helper SHA-256 values:

- `calibrate.mjs`: `c27dde1315d2ab8f759a1ca7d75fda3c0de5d964015ccda397b7685d7fe3f75e`.
- `run-unit.mjs`: `7bcaa2429ca0d80285b2a5ff8bc9d4fb001f038166eae0a8cd88fb44a9d77d06`.

Saved stdout SHA-256:
`fc1454e2c0f5f283566713ec8307502d686aca15d984f5fa0f6ea90b876a5560`.
Saved empty stderr SHA-256:
`e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855`.

The earlier [local-tests-4 review](local-tests-4-review.md) preserves the
previous tested checkpoint, timing derivation and scoped old-bound search.
Those passes are not relabelled as this final helper revision. Root still
owns the prospective documentation reconciliation, freeze, commit and any
separately labelled calibration or paid launch.
