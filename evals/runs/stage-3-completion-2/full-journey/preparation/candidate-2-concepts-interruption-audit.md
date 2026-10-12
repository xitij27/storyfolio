# Independent recovered-concepts interruption audit

The one capture remains incomplete and failed, not a deadline timeout or
passed stop-2 gate. No retry, continuation, repair, signal, browser, build,
test or model invocation was performed by this reviewer. The saved
[audit script](candidate-2-concepts-interruption-audit.mjs),
[full result](candidate-2-concepts-interruption-audit.json) and
[command/tool record](candidate-2-concepts-interruption-audit-tool.json)
retain the read-only checks. They validate preserved data, not the
successful-capture verifier or semantic acceptance.

## Lifecycle

The [outer lifecycle](../../full-journey-recovery/candidate-2/concepts-command/lifecycle.jsonl)
first records an external `SIGTERM` at `2026-10-12T16:23:31.845Z`,
172934 ms after its start. It forwarded the signal to its owned runner PID.
The [inner lifecycle](../../full-journey-recovery/candidate-2/concepts-1/units/concepts/review/lifecycle.jsonl)
records receipt at `16:23:31.846Z`; the worker manifest records receipt at
`16:23:31.850Z`. Neither signal record identifies the sender.

The inner child exited and closed code 1 at `16:23:32.218Z`, duration
171657 ms, with `timedOut:false` and no raw-log error. Its work deadline
was `16:35:35.561Z`, well after the interruption. The outer child exited
and closed code 1 at `16:23:33.934Z`, duration 175023 ms. The outer result
correctly says `externally-interrupted`, `complete:false`, and no force
attempt. The actual final tool poll agrees with that result and has no
open session ID. Final closure time must not be substituted for the first
signal time.

The saved build command closed code 0 at `16:20:47.516Z`; the saved server
command closed code 143 at `16:23:31.866Z`. These records establish child
closure, not who initiated the external signal. At the independent
`16:25:58.932Z` observation, known recorder, runner, worker, build, server
and browser PIDs `661352`, `661363`, `661540`, `661551`, `661937` and
`661972` were absent from `/proc`. This exact-PID check does not establish
whole-host or all-descendant absence; root owns any broader scoped process
review and cleanup. No broader session logs or credential files were read.

## Integrity and partial coverage

All 149 frozen inputs, 42 amendment helper identities and 403 original
turn artifacts matched their retained hashes. Original result, snapshot,
recorder and terminal references also matched. The amendment and binding
remain the reviewed `17ec3ed4...` and `088469b9...` identities.

The 182-row saved before/after source inventories equal the recovery
manifest. Every declared row also matched size and hash in the recovery
archive, original actor workspace and reconstructed measurement workspace.
This review did not re-enumerate generated source trees; it does not make
the post-closure recovery an original actor closure-time snapshot.

All 61 partial artifact files matched both the exact inventory and worker
manifest: 53 PNG originals, seven reports and the manifest. The manifest
hash is `fb6ed61837ea185527edcce7917d7cf6c4130fe8969914b2791da02ca77bdc57`.
The separate closure record truthfully preserves source/artifact binding
while `captureComplete:false`; no integrity error was found. Raw outer
and inner command/log/lifecycle hashes, retained install output hashes,
target and expectation bindings also matched.

There are 24 declared alternative/viewport cases. The first six reports,
three primary alternatives on desktop and phone, each contain eight
originals and no recorded problems. The seventh, `04-desktop`, has only
five originals and four recorded pointer/keyboard interruption problems.
Its report-level `complete:true` is not complete control coverage or a
pass: pointer capture reports a closed page/browser, the pointer response
is unobserved, and keyboard navigation and response are unobserved.
The remaining 17 cases have no reports. Overall manifest
`complete:false`, `passed:false`, interruption error and unobserved
semantic acceptance remain unchanged. A top-level empty `problems` array
does not erase the seventh report's problems or the interruption.

This reviewer did not inspect the images. Root's separately retained
original-image review must supply any visual observations. Neither six
problem-free partial reports nor valid hashes establish full choice,
semantic, continuation or Stage 3 acceptance. The signal's source and
cause remain unknown; no causal claim is inferred from previous incidents.
