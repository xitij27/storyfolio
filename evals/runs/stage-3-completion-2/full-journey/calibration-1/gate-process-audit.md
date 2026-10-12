# Independent gate-calibration process audit

12 October 2026. Read-only saved-lifecycle and scoped `/proc` inspection.
No signals, process cleanup, tests, models, builds or browsers were started
by this auditor. The calibration is not an actual journey actor or gate.

The [worker record](gate/review/result.json) closed normally at
04:32:41.280Z, duration 33121 ms, code 1, signal null, timedOut false,
externalSignal null and spawnError null. The four retained
[lifecycle events](gate/review/lifecycle.jsonl) are spawn-request, spawned,
exit and closed, with no deadline or interruption event. The outer
[recorder result](gate-command/result.json) closed at 04:32:41.322Z,
duration 33258 ms, code 1 and signal null. Its terminal
[tool return](gate-tool-poll-2.json) is closed, exit 1, and matches the
saved result including its separately returned output-directory identity.

The [manifest](gate/artifacts/manifest.json) is complete, source unchanged
and passed false. Its only problem is the expected negative calibration:
one advertised alternative where two to three are required. Desktop and
phone reports are each complete, with no report error or problem. This is
completed limited coverage with an expected failing count, not an
interrupted capture, passing look gate or full-journey acceptance.

The Next build child PID 223698 closed code 0 at 04:32:15.393Z. The preview
server PID 224181 closed code 143, signal null, at 04:32:41.027Z during the
worker's shutdown phase. The worker explicitly terminates its server in
normal cleanup. This child status is not evidence of an external signal
to the wrapper; none was recorded there.

At 04:33:43.311Z, a same-UID read-only check inspected 77 processes and
2032 descriptor links. No cwd or descriptor was tied to either exact scope:

- `/var/tmp/storyfolio-entry-runtime-20261012/storyfolio-evals/journey-calibration-5yt94U`.
- `evals/runs/stage-3-completion-2/full-journey/calibration-1/gate` beneath
  the repository root.

PID 372 denied cwd and 45 descriptor-link reads; PID 374 denied cwd and
descriptor-directory reads. No process argv, environment or descriptor
contents were read. Detached or reparented processes with another cwd and
no scoped descriptor can evade this check. It is limited ownership
evidence, not universal process absence. Tool chunk: `677985`.

Root received that no-ties observation and launched the next distinct
calibration build at 04:34:22.835Z. The later 04:34:43.468Z inspection
checked only the four old recorded PIDs: wrapper 223661, worker 223675,
build 223698 and server 224181. All were absent with ENOENT. It did not
mistake the new build for a gate-process leak or rescan the live workspace.

The same read-only check verified all ten manifest artifact hashes, worker
stdout/stderr bytes, recorder stream hashes, and exact retained
before/after inventories: 86 files, source digest
`1c499ad1346aa437d5701993b7b71f1b60cc35670e9afe0b7c76d48a1c18a060`.
It did not rereview images or mutate/capture the calibration source.
Root separately owns the eight-original visual review.

The first audit assertion compared the full terminal object with the
saved recorder result and rejected its legitimate extra `output` field
(tool `4852b2`). The corrected assertion checks that exact output path
separately and deep-compares every remaining field. It then passed, tool
`f9e8a2`. No evidence or runtime helper was changed.

SHA-256 bindings:

- Worker result: `c8735ca14d3ca5e551060923e5d0a523ce8f6cf4698206d351b7a8d98cfc3f69`.
- Manifest: `2137342fee00f513a9e0185fb3a6c0ca259744d40b7b08b847c930c0d52ec8ce`.
- Worker lifecycle: `0fd4c5590fb1c1d4dfd3dea70dcf40b29a080734d28a091f3414c97aebc7ef4e`.

Disposition: normal terminal closure and no observed old owned process
ties, with the expected calibration count failure preserved. No retry or
Stage 3 pass is inferred.
