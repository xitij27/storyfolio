# Independent preparation review

12 October 2026. Read-only source and retained-record review, before any
calibration-3 preparation execution or browser launch. The auditor read the
complete prepare helper/protocol, relevant imported inventory, snapshot,
exclusive-write and recorder APIs, and checked the pinned source,
calibration-2 preparation and partial-integrity-result hashes. No helper,
test, build, browser or model was run by this review.

No concrete gating or API blocker was found. The helper:

- Requires tracked, committed and clean selected implementation, helper,
  protocol and outcome-disposition files. A prospective launch decision
  is explicitly insufficient.
- Verifies the 86-file source, matching snapshot and immutable original
  successful build proof, then the exact current 173-file build and narrow
  qualified cache comparison. Unknown source/build differences fail.
- Preserves all eight original build artifacts, 109 original failed
  desktop artifacts, calibration 2's archived 23 implementation files,
  its 81 partial artifact files, raw records and reviewed-original hashes.
  It also insists the missing terminal records and fields stay absent.
  It neither runs a completed-case verifier on partial output nor changes
  the old score.
- Creates exactly 23 new helper copies and new launch/preparation metadata
  exclusively. Existing output is refused, and helper/source/build bytes
  are rechecked after copying.
- Binds the actual native executable/version and six declared environment
  values, records the durable outer recorder and one desktop-only command,
  and asserts the prospective 1,495,000 ms work plus 5,000 ms grace bound.
  It does not launch that command.

Two manual boundaries remain explicit, not hidden automation: root must
review the committed disposition's actual decision, probe/process evidence
and selected transport; root must verify and retain exact helper equality
at the later launch because the command names current source paths. The
helper does not semantically prove arbitrary prose or future source
immutability. These are documented coordinator gates, not bypassed checks.

A small protocol correction was requested: calibration 2's initial worker
manifest is `complete:false` with no `passed` field, rather than a terminal
failed score. Its separate partial-integrity result deliberately says no
technical pass. Preserve this distinction when describing the old result.

Read checkpoint hashes:

- `prepare.mjs`:
  `7974c3ea5056bdc118f8cbca584835b45d124991d4891f140e852d4cedcd7974`.
- `protocol.md` before the requested prose correction:
  `dc33a4181140f2d78c35ec3832fab82d4c7fb54db0c25609824b992595db9861`.
- Calibration-2 partial-integrity result:
  `bebdce3db5e17dbcec068f97866b803b38f9a56ca1437442ca5e42547abde459`.
- Calibration-2 preparation:
  `b7b33cec9a7d0e56e2e6631331821a2c42475d80af02265e01cfa6e39f71350a`.
- Calibration-1 source record:
  `63b4672d073f498ac6fa1f2c020b8d13831bb6cb1dca40f25c8dee6af38fb43d`.

The pending neutral-probe audit must disclose polling gaps beyond the
prospective 40-second cadence and the authorized concurrent conditions.
Actual monotonic heartbeats can establish observed survival despite those
deviations; they cannot make the diagnostic a strictly matched causal
experiment or explain earlier interrupted commands. This preparation
review claims no probe outcome before terminal closure.

The owner applied the precise protocol correction: the old interrupted
manifest stays incomplete, without a terminal pass/fail field. The helper
is unchanged. Corrected protocol SHA-256:
`4ceecb60cb22ac325bb1b49377d58f17ab75a35272f2d0ded9ada49ad9f14968`.
