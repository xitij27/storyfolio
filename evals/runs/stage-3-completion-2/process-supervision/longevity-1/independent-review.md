# Independent source review

12 October 2026, before the diagnostic launches. The auditor read the full
heartbeat helper, six injected-clock test groups and README. No code,
test, runtime, browser or model was executed by this review.

No concrete launch blocker was found. Natural completion requires at least
660,000 monotonic milliseconds, not heartbeat count or wall-clock change.
SIGTERM, SIGINT and SIGHUP stop the timers and record incomplete closure
with unknown sender. Storage/output failures cannot become a successful
result. The command binds actual stdout TTY state, helper bytes and only
its own process identity. Journal appends are synchronous and fsynced;
output directories and result records are exclusive. The helper creates
no child, sends no signal and has no runtime or duration override.

Root subsequently specified two separately launched once-only conditions
running concurrently, pipes and PTY, to avoid an extra eleven-minute wait.
This supersedes the preparer's original sequential schedule, not the
duration, no-retry or genuine-completion requirements. Root will record
actual timing, concurrent resource exposure and any quick local-check
overlap. There must be no evaluated actor, browser or build overlap. The
README owner was notified to align its prospective schedule before launch.

The six pure tests were reported passing by root; this auditor did not run
them. Passing either neutral probe cannot establish sender attribution,
a universal time limit, transport causality or future workload safety.
Uncatchable termination and failed storage can still leave missing terminal
records; missing evidence remains failure/incompleteness, never success.

Source identities at this review:

- `heartbeat.mjs`:
  `22aaa0e37f8f5d030c969065c2ee41bf6aeef5355902109ab6e9f5aa43ad07e7`.
- `heartbeat.test.mjs`:
  `6dc1f45fc4f44ffb750d8b8292ef65486bd6187772d00e9399e9ef848e4a2c7e`.
- README at the read checkpoint:
  `5a0686b08add2269d6782fcda66cfc2bb4f0e340fb284ccd6d25f218777c14f2`.
  Its subsequent scheduling clarification does not change helper behavior.

The paired calibration interruption audit is
[separate](../../full-journey/calibration-2/interruption-audit.md). Its
PID-only cleanup and unknown outer interruption must not be relabelled by
the result of these future probes.
