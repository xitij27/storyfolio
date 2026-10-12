# Independent terminal audit

Calibration 3 completed normally and retained all required desktop
coverage, but its actual mode result failed. There was no recorded timeout,
external signal or log failure. The 12 technical findings and separate
five-beat scope finding remain unchanged. This is a completed apparatus
observation, not a successful prototype or Stage 3 acceptance result.

## Closure and integrity

The durable recorder started at `05:41:28.164Z` and finished at
`05:49:02.167Z`, after 454,003 ms. Its child exited and closed with code 1;
the worker's own normal execution took 453,875 ms and finished at
`05:49:02.126Z`. Both inner and outer lifecycle records verify. Outer
`complete:false` means `child-exited-unsuccessfully` in this recorder's
schema, not missing closure or an interrupted capture. The worker manifest
is genuinely `complete:true`, `passed:false`.

[The metadata-only process audit](process-audit-result.json) at
`05:50:23.071Z` to `05:50:23.304Z` found recorder 300154, coordinator
300165 and worker 300176 absent. Among 76 same-UID processes and 2,024
readable descriptor links, it found no scoped workspace/output ties or
observable descendants of the known PIDs. The usual inaccessible metadata
for PIDs 372/374 and detached/reparented discovery limits remain explicit.
No cleanup or signal was needed. This is not broad repository-cwd or
universal process-absence proof.

After root finished all original-image views, the previously prepared
[read-only integrity verifier](desktop-integrity.mjs) passed at
`05:53:56.707Z` to `05:53:57.251Z`. The
[complete result](desktop-integrity-result.json) and
[exact tool response](desktop-integrity-tool.json) retain hashes and counts:

- All 23 launch helper files, 28 preparation references, launch metadata,
  durable outer command/raw streams/lifecycle/result, and actual inner raw
  streams/lifecycle/result bind correctly.
- All 86 source files match preparation and both capture observations.
  The current 173-file build matches the capture's before/after inventories.
  Raw identity and the separately qualified immutable-build comparison are
  both unchanged. The original 167-file build plus six already validated
  cache-promotion files is still preserved separately.
- All 109 artifact hashes verify, with exactly 102 root-reviewed originals:
  ten mid/end images, five rest images, 24 frames across eight directed
  travel intervals, and 63 control originals. There are 16 controls, 32
  trials, one evidenced pointer N/A, 21 page samples, four wording
  observations and five raw control censuses. Counts are derived from the
  actual complete report, not an assumed expected image total.
- Root's [original review inventory](desktop-originals-review.json) matches
  every image path, size and hash exactly. Root owns the
  [pixel assessment](desktop-visual-review.md); this auditor did not claim
  an independent visual review of those images.
- The old eight build artifacts, 109 failed calibration-1 desktop artifacts
  and 81 partial calibration-2 artifact files remain unchanged, as do the
  latter's four raw files and 23 archived helpers. Missing historical
  terminal evidence remains absent. Nothing was reconstructed or rescored.

## Meaning of the 12 failures

[Detailed raw-trial attribution](control-findings.md) preserves the actual
numbers and relevant source. Two navigation trials generate six related
conservative findings because their final scroll observations differ from
the settlement observer's last point. Their targets nevertheless exist,
are visible and are in view afterward. Root saw readable destinations.
Do not describe those derived diagnostics as proof that navigation never
responded, or remove the frozen settlement failures because images look
readable.

The other six diagnostics use a combined message saying a control was not
reached and activated. All six raw trials actually have `reached:true`,
`activated:true` and `changed:true`; the failed condition is
`hitTarget:false`. Their recorded focused controls are offscreen, with five
also recorded invisible. Four middle buttons change pressed state and two
links navigate, but that does not prove usable visible keyboard focus.
The tested path uses actual sequential Tab and native activation. Sticky
captions, opacity-based animation and smooth scrolling are relevant source
context, not an isolated causal explanation for every human-paced path.

The apparatus now supplies complete, source-bound evidence and faithfully
retains these failures. It need not make the manual prototype all-green to
be usable for prospective measurement. Whether to proceed remains root's
disposition; this audit authorizes no new capture, source repair, paid run
or acceptance claim.
