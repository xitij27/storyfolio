# Recovered stop-2 concept measurement

21 October 2026. Additive, no-model measurement of the timing proof's
turn-2 concepts from the [post-closure archive](../source-recovery-disposition.md).
The original turn-2 result stays `complete: false` with no snapshot. This
is a declared measurement variance, not a retroactive capture pass.

`binding-lib.mjs` exports `loadBinding` and `loadPrepared` with the same
return shape as the ordinary full-journey binder, so the prepared
[launcher](../measurement/run-unit.mjs) and
[supplemental audit](../measurement/supplemental-verify.mjs) select it by
the binding's `kind` and otherwise run unchanged. It checks:

- the run's meta, all 149 frozen inputs and every original coordinator
  helper hash;
- turn 1 complete in the same session;
- turn 2: exact result hash, the exact snapshot byte-bound error, no
  timeout or interruption, every artifact hash, and a final
  `turn.completed` whose usage equals the result's;
- the outer recorder's normal unsuccessful closure (code 1, no signal);
- the 189-file archive against its manifest and recovery record;
- the live actor workspace, byte for byte, against the archive, skipping
  exactly `site/.next-concepts` and the original exclusions;
- root's targets against the archive and the turn-2 result hash.

`prepare-source.mjs` copies the archive into a fresh
`$TMPDIR/storyfolio-evals/journey-recovery-time-2-*` workspace.
`verify.mjs` is the frozen original verifier with this loader and a
source-basis label; coverage rules come from the original
`measurement-lib.mjs` unchanged.

Root order: commit these records; `prepare-source.mjs --binding
binding.json` once; one recorded `npm ci --offline` in `work/site`;
`run-unit.mjs --binding binding.json --unit concepts` once through the
recorder; `supplemental-verify.mjs`; review every original image; then
`verify.mjs`. No retry, model call or turn 3 is implied.

The temporary tooling these runs need was rebuilt after a host restart;
see [the restore record](../environment-restore-1.md).
- 21 October: [concept unit 1 stopped at startup on missing tooling](concepts-1-disposition.md); replacement `binding-2.json` writes `concepts-2`.
- 21 October: [concept unit 2](concepts-2-disposition.md): capture complete, one sub-pixel checker false negative; author decision pending.
- 21 October: author chose a checker-only fix; `binding-3.json` and `adapter-3.json` pin [hit-target-2.mjs](../measurement/hit-target-2.mjs) and write `concepts-3`.
- 21 October: [concept unit 3 passes the stop-2 gate](concepts-3-disposition.md). Turns 3 to 6 run through [continue.mjs](continue.mjs), after a one-shot [cache move](relocate-cache.mjs).
- 21 October: generated cache [moved](cache-relocation.json); [continuation](continuation.json) and [turn-3 gate](gate-after-2.json) pass a dry run. Turn 3 launches next.
- 21 October: turn 3 closed normally (172874 ms actor time; snapshot captured; 392 artifacts). Storyboard review and turn-4 gate pending.
- 21 October: [turn 3 passes the stop-3 gate](turn-3-disposition.md) under the ten-beat exception; [gate-after-3.json](gate-after-3.json) passes a dry run. Turn 4 launches next.
- 21 October: turn 4 completed natively; [capture failed on the regenerated `site/.next-concepts`](turn-4-capture-disposition.md). Evidence preserved; author decision pending.
- 21 October: [recover-source-4.mjs](recover-source-4.mjs) archived turn 4's 205 authored files (source digest `ef33a605…`) in [source-recovery-4](source-recovery-4/result.json), excluding exactly `site/.next-concepts`. Source retention only; the turn-4 binder, look measurement and continuation record follow.
- 21 October: [turn 4's looks pass the stop-4 gate](looks-1-disposition.md) from the archive: four complete cases, all 32 originals reviewed, verifier and supplemental audit pass. Supporting pages built before the look choice are recorded as a failed criteria observation.
- 21 October: turns 5 and 6 run through [continue-2.mjs](continue-2.mjs) under [continuation-2.json](continuation-2.json): turn 4 counts as capture-only, [exact-capture.mjs](exact-capture.mjs) skips exactly `site/.next-concepts`, and the uncached ceiling is lifted. [gate-after-4.json](gate-after-4.json) passes a dry run. Turn 5 launches next.
- 21 October: turn 5 completed natively with a complete snapshot, but [the runner rejected it on WebSocket reconnect errors before any work](turn-5-transport-disposition.md). Evidence preserved; author decision pending.
- 21 October: the author counts turn 5 under a [narrow transport rule](transport-fallback.mjs); [stop 5 passes](turn-5-disposition.md). Turn 6 runs through [continue-3.mjs](continue-3.mjs) under [continuation-3.json](continuation-3.json); [gate-after-5.json](gate-after-5.json) passes a dry run.
