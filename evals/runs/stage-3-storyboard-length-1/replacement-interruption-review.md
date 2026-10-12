# Replacement operation 02: interruption review

Disposition: the enclosure browser worker and its saved artifact/postflight checks completed, but the containing coordinator was externally interrupted before normal outer closure. The single replacement remains stopped. Its complete child evidence does not pass the required outer-supervision gate, authorize operation 03 or turn 3, or create another retry. No browser, model, test, helper edit, cleanup or process signal was performed for this review. Assigned image review for batches 07 to 09 was cancelled.

## Exact lifecycle

| UTC time, 12 October 2026 | Retained event |
| --- | --- |
| 21:15:27.632 | Outer command start; recorder PID 883466, coordinator child PID 883477. |
| 21:15:29.291 | Bounded worker start, PID 883650; 85000-ms work deadline and 5000-ms grace. |
| 21:16:22.397 | Artifact manifest's recorded finish. |
| 21:16:22.435 | Worker exit and close, code 0, no signal, timeout or external-signal flag; duration 53144 ms. |
| 21:16:22.438 | Timestamp assigned to the coordinator's closure object. |
| 21:16:23.969 | Outer lifecycle sequence 3 records external SIGTERM, sender unknown; sequences 4 and 5 record forwarding once to coordinator PID 883477, delivered true. |
| 21:16:23.975 | Coordinator child exit and close, code null, SIGTERM. Outer duration 56343 ms, `complete: false`, `status: externally-interrupted`, no forced escalation. |
| 21:16:35.382 | Actual terminal tool evidence retained, exit code 1. |

The external signal arrived 1534 ms after the worker closed, before its recorded work deadline of 21:16:54.291 and hard escalation time of 21:16:59.291. This is not a worker timeout. There is no inner deadline/stop-request event, and the bounded worker has `externalSignal: null` and `logError: null`.

Timestamp caveat: `run-operation.mjs` assigns `closure.closed` before its source/artifact postflight at line 35. That field is not the final `closure.json` write time. The complete closure file and complete matching summary in outer stdout are actually retained, so those checks did finish, but the records do not give their precise final-write time or establish a 1.531-second idle interval before interruption.

The recorder reports and forwards a received signal; it does not identify its origin. Nothing in these retained records establishes the sender, why the coordinator had not yet naturally exited, or a causal connection to earlier interruptions. Root's separate process-ownership check is not replaced by this saved-record review.

## Preserved child evidence

Read-only filesystem/hash checks found exactly 19 artifact files: 16 PNG originals, two reports and the manifest. The complete actual inventory matches the retained `artifact-inventory.json`; every non-manifest file hash matches the manifest map, and every report image path/hash/byte count matches an actual file. Both desktop and phone reports contain entry, opening/middle/ending and pointer/keyboard before/after originals, eight images per mode. Both reports record `complete: true`, no errors/problems and successful activated/changed responses. The manifest records `complete: true`, `passed: true`, `interrupted: null` and unchanged 185-file source.

Both saved source records are identical, and the manifest source-before/source-after records agree. The four outer raw-artifact hashes, three inner raw-log hashes and seven closure evidence hashes match their files. The coordinator's saved closure is `complete: true`, `sourceUnchanged: true`, `originalPreserved: true`, with no errors. These are valid retained inner observations, not a normal outer pass. This review did not recapture live source or visually inspect the sixteen images.

The new phone geometry directly records the earlier suspected mechanism on this replacement: the union center `(204.015625, 514.375)` hits an `li`, not the enclosure link. The first fragment center `(204.015625, 498.375)` is an actionable link hit and is the actual recorded pointer click. The keyboard trial records focus after two Tabs, Enter and a changed response. This supports the fragment-aware correction for this observed batch without retroactively changing the first measurement's failed required trials, proving other alternatives or completing the full concept gate.

## Gate and identities

The saved `supervision.json` binds the real interrupted outer result and terminal evidence. Merely having that file is not success: the unchanged normal-supervisor assertion requires code 0, no signal/interruption and normal lifecycle events, which these records explicitly contradict. Batches 03 to 09 remain unobserved by this stopped sequence. There is no final aggregate success or full-site/author acceptance.

| Evidence | SHA-256 |
| --- | --- |
| `commands-2/operation-02/result.json` | `611547081a0e87a6cf22d4a9f391ffff426139ea948cce83210208c99506cc41` |
| `control-2/operations/02/process.json` | `f3d987271a21be55bfbd123541dd20a5fdde68b64a38dc8e5b36e9b978077d71` |
| `control-2/operations/02/closure.json` | `489acea70fe74acd4cdd3c913cd15ee221c2d1f92ce8a6dce306fb396f106fa9` |
| `concepts-2/batches/02/artifacts/manifest.json` | `aabf9e3c8f11ed7e62efa7291834141a9b34c3effdb5c09becb80cba71b271dd` |
| `replacement-02-tool-terminal.json` | `ce028d1c3ea6e7608b7f0bba3a4e6ab3ee80d7fc3f59c48fab837d0d22fabe9e` |
