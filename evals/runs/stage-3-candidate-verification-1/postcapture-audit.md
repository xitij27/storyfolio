# Independent postclosure audit

12 October 2026. Root confirmed session 37183 closed with exit 1 in
[poll 12](capture-tool-poll-12.json) before this audit. The
[retained audit script](postcapture-audit.mjs) ran the existing read-only
integrity verifier once and saved its full command, stdout, stderr and
process result in [postcapture-audit](postcapture-audit/result.json).
The [execution-tool return](postcapture-audit-tool.json) is retained too.
No browser, build, test suite, installation, model, cleanup or signal
command was invoked by the auditor. No existing output was overwritten.

## Exact process outcome

The wrapper started its checker at `2026-10-12T00:33:44.476Z`. It recorded
an external SIGTERM at `00:44:09.109Z`, elapsed 624,633 ms, sender unknown.
That is 270,367 ms before the 895,000-ms work deadline. The configured
deadline was `00:48:39.476Z`, with forced-shutdown target `00:48:44.476Z`.
Neither deadline nor escalation fired. The wrapper forwarded the received
signal to its owned checker; the checker exited and closed 293 ms later,
at `00:44:09.402Z`, code 1, signal null. Total child lifecycle: 624,926 ms.

The complete six-event [lifecycle](acceptance-review/lifecycle.jsonl)
matches its hash in [process.json](acceptance-review/process.json): one
spawn request, spawn, external signal, stop request, exit and close.
The frozen checker records its server exit 143 during this orderly stop.
This is not the candidate actor's earlier 900,055-ms timeout, nor the
original capture's earlier interruption. The origin of this new external
SIGTERM is not recorded. Repetition, elapsed time and command overlap do
not identify a sender or establish a cause.

## Integrity and observable coverage

The read-only integrity verifier exited 0, with no stderr. All 222 new
capture artifacts, including 203 available original images, verify exactly.
The source before, after and at this audit is identical to all 184 saved
actor files, digest
`830d73920983268e04480dee830a5172a69a4077de80512a3d6e414d3439ecb7`.
All 124 frozen inputs, 86 shipped skill files including 79 engine files,
and 367 original actor artifact hashes remain unchanged. The original
interrupted capture's manifest and all 134 artifacts are also unchanged.
No historical result is upgraded or replaced by this new verification.

The new manifest remains `complete: false`, `passed: false`. Type generation,
typecheck, lint and production build completed successfully. Desktop,
mobile and short-height technical modes pass. Reduced-motion capture was
interrupted; its page-closed errors, missing fields and missing late control
trials stay in the report rather than becoming established application
defects. No WebGL, no JavaScript and context-loss modes remain unobserved.
This audit does not assert that the 203 original images have been reviewed
or that their pixels meet the visual criteria. Separate reviewers own that
assessment. Actor-owned earlier checks do not fill missing independent modes.

## Limited postclosure process observation

At `2026-10-12T00:45:53.163Z`, a same-user `/proc` metadata observation found:

- Wrapper PID 4191480 and checker PID 4191500 no longer existed.
- No observed process had its cwd in the candidate workspace or a current
  parent chain through either recorded PID.
- No TCP/TCP6 listener remained on the recorded server port, 34395.
- Two unrelated cwd reads were denied and retained in the result.

The [process observation](postcapture-audit/process-observation.json) reads
only process stat/comm/cwd and TCP listener metadata, not command lines or
environment contents. No process was signalled. No surviving owned process
was observed, but this is not proof that every detached, reparented or
otherwise unrecorded descendant is absent: no complete historical descendant
PID inventory exists. No cleanup is inferred or performed.

The one authorized verification remains interrupted and spent. There is no
automatic retry, source repair, actor continuation or judge invocation.
This preserved partial evidence cannot establish completed delivery or
Stage 3 completion, and the actor's usage remains unknown.
