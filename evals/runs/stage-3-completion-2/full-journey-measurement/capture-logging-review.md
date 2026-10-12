# Prospective capture logging review

12 October 2026, source-only independent review after calibration 2's
authorized server cleanup and no-owned-ties observation. No tests, runtime,
browser or model were executed by this auditor. Archived calibration
implementation and original outcomes remain unchanged.

The reviewed change opens lifecycle/stdout/stderr files exclusively before
spawn, writes callback bytes synchronously with a short-write loop, and
closes all descriptors while retaining close errors. It no longer needs a
successful final worker close to preserve already received lifecycle or raw
stream bytes. It explicitly does not promise fsync/power-loss durability.

`run-unit.mjs` and `calibrate.mjs` attribute log failures to the coordinator,
not an external sender. A failure requests shutdown once for the owned
worker PID. Both `exit` and `closed` callbacks clear that PID and cancel
escalation before attempting further logging; `finally` repeats cleanup.
This avoids knowingly signalling a previously reported exited child or
signalling PID zero. This is ordinary owned-PID lifecycle tracking, not an
atomic kernel PID-identity guarantee or proof about detached descendants.
Log errors fail the result, and the next-unit guard rejects a prior log
error. No automatic next unit or retry was introduced.

One concrete prospective lifecycle issue was sent to the implementation
owner and root: child-output callbacks also called `process.stdout.write`
and `process.stderr.write` outside the guarded file-append path, without
stream error handlers. An asynchronous outer-stream EPIPE could terminate
the coordinator before its owned-worker cleanup or final record, even if
the independent file writes succeeded. Removing those redundant tees or
handling their errors through the same shutdown path is needed before
claiming that output-path failure is covered. This finding does not identify
the earlier calibration's signal or cause. Its disposition is recorded
below when the owner responds.

The keyboard change is limited to `body.focus({ preventScroll: true })`
before actual sequential Tab navigation. It does not programmatically focus
the target or bypass actual activation. The new bound categories explicitly
give animated desktop/mobile/short 1,500,000 ms total, other modes and gates
900,000 ms, and build/auxiliary 300,000 ms, each including 5,000 ms grace.
These prospective bounds do not change old timeouts or grant visual passes.

Read checkpoint hashes:

- `measurement-lib.mjs`:
  `c74d4c57108858e62dae5ddd117c263fbcade52365f407ce7629bd82f7c140c5`.
- `calibrate.mjs`:
  `db4ac02021af2c7692adcb7a739a26e1f32f32de53ade327e047a408a2ad206f`.
- `run-unit.mjs`:
  `6e06e52fd852955efdba5bc1302496dcd089a3df199dd85a3fda5ccdccc69142`.
- `controls-lib.mjs`:
  `9fbadafef85a75acba473f596e47fe0cf60d08de3adc6a6066fbdcd29ea081dc`.

## Finding disposition

Root approved removal of the four redundant live tee calls. The owner
removed only those stdout/stderr calls from both wrappers; callbacks still
write exact raw bytes synchronously to the independent files. A narrow
source reread confirmed no child-stream tee remains. The ordinary final
summary is still printed after child closure and final evidence handling.
No remaining blocker was found in this reviewed change. The owner reported
that root-authorized local tests were running under `local-tests-5`; this
auditor did not execute them or infer their final result.

Verified correction hashes:

- `calibrate.mjs`:
  `c27dde1315d2ab8f759a1ca7d75fda3c0de5d964015ccda397b7685d7fe3f75e`.
- `run-unit.mjs`:
  `7bcaa2429ca0d80285b2a5ff8bc9d4fb001f038166eae0a8cd88fb44a9d77d06`.
