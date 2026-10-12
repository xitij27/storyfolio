# Prospective clean candidate measurement

Root owns all reconstruction, install, browser launches, terminal polling,
original-image review and commits. These helpers prepare a separately
labelled clean saved-source measurement of `codex-bench-entry-candidate-1`.
They never continue the actor or improve its application. The candidate
actor may complete or remain incomplete; its actual outcome is preserved.
No actual result, targets, disposition, install or capture is asserted by
this prospective preparation. No helper or test has been executed yet.

## Same measurement, different saved application

The baseline restored its 180 saved files. This candidate restores its own
exact final snapshot, using dynamic counts and hashes, never 180 by fiat.
The complete original non-generated workspace inventory is bound separately.
Its extra files remain in place and their exact paths, bytes and SHA-256
hashes remain in the coordinator disposition. Missing or changed retained
source blocks reconstruction. The existing shared generated-source policy
is untouched; no broad Git or hidden-directory exclusion is introduced.

The same baseline-frozen `measurement.mjs`, expectations, source policy,
trusted dependency identity and bounded-process helper are used for both
arms. The candidate freeze must contain equal measurement/transitive bytes.
The already-bound baseline replay's pure source/hash/install helpers are
reused, with their own source hash pinned, without invoking its old loader
or changing its files. Same native Node, four environment values, TMPDIR,
offline install arguments and telemetry treatment are required. The candidate
capability's extra disabled unrelated skill is documented in the
[preparation disposition](../entry-candidate-preparation/capability-drift-disposition.md),
not hidden as whole-freeze equality. Browser subprocess settings remain equal.

No-output, planning-only or genuine unresolved-question outcomes without an
authored application are not converted into a successful stock-starter
capture. Root records that eligibility outcome without running these helpers.
Any authored implementation, even apparently broken, remains eligible for
one build attempt once integrity and metadata preconditions pass.

## Root supplies post-turn records

After the actor's outer session closes and result/snapshot files settle,
root saves four new coordinator records in this directory before any copy:

1. `original-source.json`: exact frozen `captureSource(meta.work)` result.
   This contains hashes, sizes and the unchanged policy, not raw metadata
   or credential contents. Do not inspect the live workspace during the turn.
2. `observed-targets.json`: all public advertised looks/routes/switches and
   source-semantic opening/middle/ending, following the unchanged
   [measurement protocol](../../../builds/bench-entry-1/measurement-protocol.md).
   Bind its top-level `sourceDigest` to the full original inventory and
   `actorResultSha256` to the settled result. Discovery source hashes must
   belong to retained snapshot files. No passing subset or source repair.
3. `extras-disposition.json`: explicit root review, even when no extras exist.
   `schemaVersion:1`, `reviewedByRoot:true`, a nonempty `rationale`, and arrays
   `extraFiles` and `unexpected`. Each extra copies its inventory `path`,
   `bytes`, `sha256` in original capture order, adding `classification:
   "git-metadata"` and a specific `rationale`. Each unexpected entry copies
   the actor snapshot's `path` and `type` in its original order, adding
   `classification:"identified-git-metadata"` or `"empty-directory"` and
   a specific `rationale`. Unknown or omitted application files block copy.
   The narrow local guard requires Git marker/layout evidence, rejects
   active hooks and credential/config trees, and verifies empty directories
   are actually empty. Root must review meaning as well as allowed names.
4. `measurement-input.json`: the following binding shape, with actual
   lowercase SHA-256 values, never placeholders at execution:

   ```json
   {
     "schemaVersion": 1,
     "cohort": "codex-bench-entry-candidate-1",
     "inputDigest": "5cb0491da31d429b09082c298f475546c1ec10ccc003cafa1bb037aea5e309e9",
     "actorSettled": true,
     "actorResultSha256": "SHA256 of candidate turns/01/result.json",
     "originalSourceSha256": "SHA256 of original-source.json",
     "targetsSha256": "SHA256 of observed-targets.json",
     "extrasDispositionSha256": "SHA256 of extras-disposition.json",
     "actorCommandSha256": "SHA256 of the recorded actor command.json",
     "processRecord": {"path": "evals/runs/stage-3-completion-2/ACTUAL-ACTOR-RECORD/result.json", "sha256": "actual hash"},
     "terminalTool": {"path": "evals/runs/stage-3-completion-2/ACTUAL-TERMINAL-TOOL.json", "sha256": "actual hash"}
   }
   ```

The lifecycle gate checks the retained recorder streams and command, outer
exit with no live session ID, and matching final result timestamp. It reads
the actual result's completion/timeout/interruption flags; a browser result
cannot erase them. It requires root's existing `record-command.mjs` actor
invocation shape, one native-node runner `--turn 1` with the frozen case,
cohort and capability source. Do not create fake closure records to fit it.

## Root-only sequence after review

Use `/tmp/storyfolio-node-check-20261011/node_modules/node/bin/node` for all
helpers. Preserve full command, stdout/stderr, outer tool/session/poll and
terminal evidence in new directories here. Do not run tests, extra builds
or cleanup concurrently with a live actor or browser capture.

1. Review/commit helpers and the four actual post-turn records. Run a
   read-only `loadOriginal()` preflight and retain its result. It verifies
   both frozen input sets, final actor artifacts, all saved/current source,
   metadata disposition, public targets and settled lifecycle. No paid call.
2. Run `reconstruct.mjs --authorization=/absolute/repository/docs/history/2026-10-12-stage-3-completion-authority.md`.
   It creates `setup/` exclusively and allocates a new
   `replay-bench-entry-candidate-1-*` directory below the original TMPDIR's
   `storyfolio-evals/`. Only exact saved source files are copied. Only the
   copied target record's top-level `sourceDigest` changes; historical
   source-binding notes remain intact. The new binding records both scopes.
3. Root records one `npm ci --offline --cache=/tmp/storyfolio-npm-cache`
   in that new workspace, using `record-command.mjs` and retaining
   `setup/dependency-install/{command,result}.json` plus both logs. Its
   recorded executable is `npm`; use all six original setup environment
   values, including explicitly unset `NEXT_TELEMETRY_DISABLED`. Those are
   in the candidate cohort's original setup install command. The measured
   environment is saved in new `setup/reconstruction.json`, with telemetry
   off for the worker. There is no new `setup/runtime-environment.json` here.
4. Run `run-replay.mjs` once, no override or retry. It verifies successful
   matching install evidence and exact restored source before creating
   `measurement/` exclusively and invoking the unchanged worker.
5. After terminal closure, inspect owned PIDs read-only, then run
   `verify-replay.mjs`. Review every emitted original at original detail and
   bind its actual path/hash/bytes. Record incomplete capture or missing
   observations honestly. No previous image substitutes for fresh originals.

All measurement output is inside this repository: `setup/` records source
restoration, rebound targets, helper and input identities, authorization and
install; `measurement/artifacts/` holds unchanged worker output, while
`measurement/review/` holds lifecycle, command, streams, process, source
before/after, exact raw artifact inventory and closure checks. Original
source bytes remain archived in the actor snapshot; originals and historical
records are rechecked but never overwritten or deleted.

## Limits and prospective checks

The inherited bound sends TERM at 895000 ms and allows at most 5000 ms
shutdown within 900000 ms total child lifetime, subject to scheduling jitter.
It records actual PIDs, events and durations, with no retry. An external
signal sender remains unknown unless established independently. Forced
worker exit cannot prove detached descendants exited; root checks processes.
The strict final verifier may reject an incomplete raw manifest, while
preserving its files and errors. Do not relax the gate or launch again.

Capture completion is not semantic, material-look, phone-device or Stage 3
acceptance. The frozen narrow desktop/phone opening/middle/ending and real
switch observations keep all their original limits. Original actor timeout,
missing handoff, missing looks or unanswered author gates remain outcomes.

`bindings.test.mjs` contains six pure prospective checks: dynamic exact
snapshot partition, retained-source mismatch, complete root disposition,
forbidden app/credential/hook paths, narrow Git paths, and target rebinding.
They have not run at this source-only checkpoint. Syntax and focused checks
must be recorded only after root allows a no-live-process test window.
