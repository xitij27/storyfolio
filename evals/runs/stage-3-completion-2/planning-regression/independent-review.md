# Independent planning-adapter source review

12 October 2026. Read-only review of `runner.mjs`, `process.mjs`,
`contracts.mjs`, `contracts.test.mjs` and `protocol.md`, with the legacy
planning runners, shared planning argv and judgement schema for comparison.
No adapter invocation, test, model, browser, install or build was executed.

No concrete prompt, packet, session-continuation or serial no-retry blocker
was found in this source checkpoint. The adapter retains the legacy
planning argv rather than build permissions. Person/truth/material/prompt
and rubric bytes are checked against the historical frozen identities;
synthesized messages are checked against both old repetitions. Actor
messages and blinded judge-packet assembly follow the original branches.
Tests are supplied for exact six-conversation packet parity, not presumed
passing by this review.

Each invocation selects one fixed serial unit and creates its output
exclusively before a paid call. A missing result in an existing unit or an
incomplete prior result blocks progression. Successful actor history is
source-bound to the current workspace and must retain one session. Safe
integer accounting rejects missing usage and enforces the declared
between-turn totals before continuation or judging. The judge consumes
the complete third-turn exports and strictly validates only the terminal
JSON message. A valid lower rubric score remains an outcome, whereas an
execution/schema/usage failure halts subsequent units.

The custom transport has a separate owned process group, per-unit work
deadline and bounded shutdown grace, explicit timeout/external/log/spawn
failure records, exclusive raw logs and no retry. As with other transport,
uncatchable wrapper termination can prevent final evidence, and detached
process absence requires root's separate scoped check. Pure contract tests
do not by themselves exercise actual process shutdown.

Small provenance follow-ups were sent to the preparer before freeze:

- Include the prospective outer recorder among frozen implementation
  identities if root uses it, matching the protocol's all-harness claim.
- Explicitly disclose the stricter build-source snapshot policy versus
  the legacy all-files walker: unknown nonempty source causes a halt,
  rather than being silently omitted or treated as an old-equivalent run.
- Consider binding setup/initial-snapshot records and checking each saved
  unit's input digest against the current freeze as inexpensive
  coordinator-record consistency guards.

Those are prospective qualification and integrity follow-ups, not observed
paid-run failures. Final freeze review and root-owned tests are pending.
No historical outcome is rerated and no planning regression is claimed.

Reviewed SHA-256 checkpoint:

- `runner.mjs`: `dc6dba3cd1402821ebc56070ca943ef2fd44403d8476aa7234e1188c26f1a7fc`.
- `process.mjs`: `5a40e2f0e281aa8aca5497a2c5cccefe9cc9dbb0130231bb021e01af121fe624`.
- `contracts.mjs`: `2ae460905e5f156d44a3c3e22194c405d6aa9a186d65c0b0b895788fb570f720`.
- `contracts.test.mjs`: `c605265131acb4ed07ee7a95af636a6a1a48428bde8fde7c6f53384001aef20d`.
- `protocol.md`: `a3ac10b973e9c82349515eec9486ef767097e80d85b214c32f99c4365486c7ad`.

## Final transport and identity follow-up

The later source-only read confirms the requested provenance guards were
added: the outer recorder is frozen, each prior unit must use the current
input digest, conversation setup and initial snapshot hashes must remain
identical, the initial snapshot must exactly match frozen material plus
skill, and the immediately saved pre-invocation source must equal the
previous snapshot. The README discloses the stricter source boundary.

The revised transport writes exclusive raw and lifecycle logs synchronously.
Its deadline and shutdown timer settle a missing child close as an explicit
forced failure. Owned pipes are destroyed and the child handle unreferenced
on that forced path, so retained inherited pipes do not hold the record
promise or Node event loop open. This is not proof that escaped descendants
exited. Normal child close, external interruption, deadline, logging error
and spawn failure remain distinct retained facts. No retry was introduced.

This follow-up found one concrete output-fidelity defect: concatenating
each incoming Buffer into a string independently can corrupt a multibyte
UTF-8 character split between chunks, although the raw log bytes survive.
The preparer corrected it before freeze by accumulating Buffers and decoding
once at settlement. The new fake test splits both a two-byte accented
character and a four-byte symbol and compares decoded results with the exact
raw logs. The correction and all seven fake tests were read, not executed,
by this reviewer. Root-owned validation remains required after the active
desktop calibration closes.

No remaining concrete transport or source-continuity blocker was found at
this checkpoint. This is not a launch, process test result, successful
planning regression or claim that the earlier unknown signals are fixed.

Final reviewed SHA-256 checkpoint:

- `runner.mjs`: `a406d313388cc2b57325d7619e3873e8f95b69b6e372c48befda085f940514ef`.
- `process.mjs`: `e38a8c165f2409307e10c8c50fd45485afe45a2031b6648e1dafc0374271c10a`.
- `process.test.mjs`: `76e7f6fc5848228a8d796c6067df5f85c9671b9c4a0964d86f9a05fdcb7a69f4`.
- `README.md`: `ad94740a5e31ba224e4119bc92362015171e9ae33178aadc4a2b690e0d0ff4e4`.
