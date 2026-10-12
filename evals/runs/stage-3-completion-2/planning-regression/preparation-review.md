# Planning adapter source review

12 October 2026. Source-only preparation, not regression execution.

The preparer read the original planning actor/batch/judge runners, shared
argument builder, stream parser, score/schema, file helpers, selected
person definitions, original prompts, closing-run findings and all six
closing-run raw usage records. All six historical packets are hash-bound;
their exact prospective parity tests still require execution.
The [77-file source record](historical-sources.json) retains SHA-256 and
byte identities for the historical evidence and packet-parity inputs.
No old run, shared runner, rubric, prompt or skill was edited.

The coordinator approved a local adapter because the old runner cannot
enforce the requested per-turn bounds or select a single bounded judge.
The prospective limits are in [protocol.md](protocol.md), including the
approved 2000000 reported-total and 350000 uncached-plus-output stops.
No cost cap, favorable rerating or permission for extra conversations is
inferred. The six-case regression waits until the last skill behavior
change and a recorded launch disposition for the unknown interruptions.

An independent source review by `audit_actor` found no concrete prompt,
blind-packet, session or serial no-retry blocker in the initial adapter.
Its follow-ups are incorporated: freeze the actual outer recorder,
disclose the stricter source boundary, bind setup and initial snapshot
identities across turns, and compare every prior unit's input digest.

Root separately identified an asynchronous log-end callback that could
leave shutdown unsettled. The transport now uses exclusive synchronous
raw logs plus a streamed lifecycle record. An absent child-close event at
the shutdown bound produces forced failed-record closure, closes owned
pipes and unrefs the child handle. This is not a claim that detached or
escaped descendants exited, nor a fix or attribution for earlier external
SIGTERM events. The independent reread produced the finding below.

The final independent transport review identified split UTF-8 decoding:
decoding each pipe chunk separately could corrupt multibyte characters
in the in-memory stream while the raw log stayed exact. The transport now
retains Buffer chunks and decodes once at settlement. A deterministic
split-character test compares returned text with the raw bytes. The
review otherwise found the bounded-close and identity guards coherent.
The reviewer then reread the Buffer correction and split-character test,
confirmed the concrete defect was addressed, and reported no remaining
concrete static transport or source-continuity blocker. This is not a
runtime pass; root must execute the retained tests after capture closure.

Six contract/packet-parity tests and seven fake-transport tests are written.
The latter cover successful closure, external-signal provenance, missing
close at the deadline, write failure, split UTF-8, spawn failures and
exclusive evidence.
They create no subprocess and send no real signal. Neither these tests,
native syntax checks, dry/prepare nor any paid unit has been executed by
the preparer. Root owns actual validation and its saved results.

Read-only preparation commands inspected source/status, derived historical
usage and hashes, and searched new files for em dashes/trailing whitespace.
That search had no findings. No command issued by this preparer signalled,
killed, cleaned up or otherwise controlled an actor, capture or browser.

Source checkpoint before validation:

| File | SHA-256 |
| --- | --- |
| runner.mjs | a406d313388cc2b57325d7619e3873e8f95b69b6e372c48befda085f940514ef |
| contracts.mjs | 2ae460905e5f156d44a3c3e22194c405d6aa9a186d65c0b0b895788fb570f720 |
| process.mjs | e38a8c165f2409307e10c8c50fd45485afe45a2031b6648e1dafc0374271c10a |
| contracts.test.mjs | c605265131acb4ed07ee7a95af636a6a1a48428bde8fde7c6f53384001aef20d |
| process.test.mjs | 76e7f6fc5848228a8d796c6067df5f85c9671b9c4a0964d86f9a05fdcb7a69f4 |

These source hashes are a checkpoint, not a substitute for the later full
committed input freeze. The final unit result remains the execution gate;
compatibility metadata or a rubric score cannot override a failed unit.
