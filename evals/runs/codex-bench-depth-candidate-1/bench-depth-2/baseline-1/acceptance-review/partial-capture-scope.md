# Timed-out candidate partial-artifact capture

The paid candidate ended at the fixed 15-minute limit. Its saved actor result
is `complete: false`, `timedOut: true`, duration 900055 milliseconds and
`usage: null`. The recorder and terminal tool return both ended with exit 1
at 2026-10-11T23:49:32.350Z. There is no retry or continuation.

The coordinator authorized one independent unpaid measurement of the retained
partial artifact. The prepared `run-acceptance.mjs` remains byte-identical to
the baseline wrapper and still requires completed actor delivery. Its gate was
not changed or bypassed by altering actor evidence. The separate
`run-partial-acceptance.mjs` explicitly requires the recorded timeout, saved
snapshot bytes, closed terminal tool result and matching recorder log hashes.
`partial-wrapper.diff` preserves the exact wrapper differences. The checker,
expectations, source, native Node, capability environment, temporary directory,
telemetry setting and trusted dependencies are unchanged.

Before launch, the frozen source collector found exactly the saved 184 files,
with no added, missing or changed file. Source digest:
`830d73920983268e04480dee830a5172a69a4077de80512a3d6e414d3439ecb7`.
All retained snapshot file hashes and sizes also match. The snapshot reports
unexpected `.aws` and `.codex` directories. A read-only names, types and sizes
listing found both empty. No credential contents were read. Empty directories
do not contribute to the frozen file inventory. A process listing found no
remaining actor runner or workspace process apart from the diagnostic itself.

The single capture launched as tool session 18520. Full launch, poll, process,
signal and source-comparison records are retained alongside this note.
Any technical or visual result applies only to this retained partial artifact.
It cannot erase the timeout or establish a completed build delivery. Original
review is divided by mode: `next_plan` owns desktop, mobile and short; acceptance
owns reduced motion, no WebGL, no JavaScript and context loss. Counts are derived
from the actual final artifact set, not copied from the baseline.

## Actual termination and retained evidence

The capture itself was interrupted. At 2026-10-12T00:00:05.043Z the wrapper
recorded SIGTERM with an unknown sender and forwarded it to the frozen
checker, as its predeclared handler specifies. The checker closed its page,
finished its partial manifest and stopped its own server. Its process then
closed with exit 1, signal null, at 00:00:05.277Z after 361175 milliseconds.
`tool-poll-07.json` is the terminal tool return; `signals.jsonl` and
`process.json` preserve the exact signal event and process output. This is
not an uninterrupted acceptance and not a second actor timeout.

The final manifest is `complete: false`, `passed: false`, with error
`Acceptance check interrupted`. Desktop and mobile have completed passing
technical reports. Short contains an interrupted report and 14 originals:
ten numbered mid/end captures and four rests, without the ending rest,
travel or controls. Reduced motion, no WebGL, no JavaScript and context
loss were never reached. Their absence is unobserved evidence, not success.
The short report's missing observations do not establish all the listed
application defects independently of the interruption.

All 134 retained artifact hashes and all frozen identities verify. All
184 source files still match the retained actor snapshot and before, after
and current runtime inventories exactly. Source identity is distinct from
the incomplete capture. The final manifest SHA-256 is
`b21f8baa6e9568c71e7d0cde2957c4e2405eff4018c09594de76f2fa23296572`.
There are 118 actual originals: desktop 62, mobile 42 and short 14.
The separate `verify-partial-acceptance.mjs` reports this partial scope;
the original complete-only verifier remains untouched. Its
`--integrity-only` result is saved in `partial-integrity.json`, with the
complete tool return in `partial-integrity-tool.json`.

The original complete-only verifier was also invoked read-only and correctly
rejected this manifest with `Incomplete capture remains unobserved`.
`complete-gate-rejection.json` preserves that expected exit-1 result. The
partial audit does not turn this rejection into a completed-acceptance pass.

The acceptance reviewer issued no kill, test suite or cleanup command.
Root and both other reviewers independently reported no cleanup, test or
signal action at the recorded event. Root reports its nearby operations
were image viewing, image hashing, documentation edits and read-only source
inspection. A read-only process listing after closure found no remaining
wrapper, checker or candidate server; only the diagnostic commands matched.
These reports do not identify the signal sender. No origin is inferred.
Root starts its repository checks only after the capture is closed.

No retry, corrective build, extra browser call or candidate judge follows.
The missing modes and partial short coverage remain unresolved. The actor's
original 900055-millisecond timeout and incomplete delivery also remain.

## Available-original review closure

The animated reviewer individually opened all 118 available original images
at original resolution, without excluding duplicate hashes. The combined
read-only `verify-partial-acceptance.mjs` passed its explicit partial-evidence
audit. `partial-verification.json` and `partial-verification-tool.json`
preserve the result and full tool return. They recheck all retained artifact
hashes, all 184 source files, the frozen assessments of all three recorded
reports, exact 118-image path/hash/byte coverage, no duplicate reviewed paths,
and the closed process and signal record. This is an evidence-integrity
success, not a completed-capture or visual-quality success.
