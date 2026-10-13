// Pure, one-record exception approved on 13 October 2026. Never normalizes history.
// Caller must separately bind exact raw bytes, worker lifecycle/artifacts/source,
// approval and terminal-wrapper observation time. terminal is the bare toolResult.
import assert from "node:assert/strict";

const root = "/home/kshitij/projects/storyfolio";
const study = "evals/runs/stage-3-storyboard-length-1";
const output = `${root}/${study}/commands-2/operation-02`;
const fields = (actual, expected) => { for (const [key, value] of Object.entries(expected)) assert.deepEqual(actual[key], value, `Reconciled record differs: ${key}`); };

export function assertReconciledOuter({ outer, terminal, command, events, processRecord, closure }) {
  fields(outer, { schemaVersion: 1, recorderPid: 883466, recorderParentPid: 2843635,
    childPid: 883477, childSpawned: true, childExited: true, childClosed: true,
    code: null, signal: "SIGTERM", interruptedBy: "SIGTERM", signalSender: "unknown",
    signalForwarded: true, shutdownGraceMs: 5000, forceAttempted: false, childError: null,
    complete: false, status: "externally-interrupted",
    finished: "2026-10-12T21:16:23.975Z", durationMs: 56343 });
  assert.deepEqual(outer.rawArtifacts, {
    "command.json": "88ddd086cc32b142273dbfcd5f97af90dfb4e0cb8c73553d5fb8623328650962",
    "lifecycle.jsonl": "26e6f4f8a42443c54bddf24624dc16349325492ce15d3b7f02bab33ace38e6df",
    "stdout.log": "0a3419483e9f6c5fc63a4bb510aa335813f1ab9253b25defea9af110c2c15322",
    "stderr.log": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  });
  fields(command, { schemaVersion: 1, started: "2026-10-12T21:15:27.632Z",
    cwd: root, executable: "/tmp/storyfolio-node-check-20261011/node_modules/node/bin/node",
    recorderPid: 883466, recorderParentPid: 2843635, shutdownGraceMs: 5000,
    recorderSha256: "fc92e1a3f4d4eaecbee0a952e0ea3dba4f7ec28487840698cb8aa83d9e262802",
    args: [`${study}/measurement-2/run-operation.mjs`, "--replacement", `${study}/concept-measurement-2.json`, "--id", "2"] });
  assert.deepEqual(events, [
    { sequence: 1, at: "2026-10-12T21:15:27.634Z", elapsedMs: 2, type: "recorder_started", recorderPid: 883466, recorderParentPid: 2843635 },
    { sequence: 2, at: "2026-10-12T21:15:27.637Z", elapsedMs: 5, type: "child_spawned", childPid: 883477 },
    { sequence: 3, at: "2026-10-12T21:16:23.969Z", elapsedMs: 56337, type: "external_signal", signal: "SIGTERM", first: true, childPid: 883477, sender: "unknown" },
    { sequence: 4, at: "2026-10-12T21:16:23.969Z", elapsedMs: 56337, type: "signal_forward_attempt", signal: "SIGTERM", childPid: 883477, scope: "owned-runner-pid-only" },
    { sequence: 5, at: "2026-10-12T21:16:23.969Z", elapsedMs: 56338, type: "signal_forward_result", signal: "SIGTERM", childPid: 883477, delivered: true },
    { sequence: 6, at: "2026-10-12T21:16:23.975Z", elapsedMs: 56343, type: "child_exit", childPid: 883477, code: null, signal: "SIGTERM" },
    { sequence: 7, at: "2026-10-12T21:16:23.975Z", elapsedMs: 56343, type: "child_close", childPid: 883477, code: null, signal: "SIGTERM" },
  ]);
  assert.equal(terminal.exit_code, 1); assert.equal(terminal.session_id, undefined);
  assert.equal(typeof terminal.output, "string");
  const { output: printedOutput, ...printed } = JSON.parse(terminal.output.trim().split("\n").at(-1));
  assert.equal(printedOutput, output); assert.deepEqual(printed, outer);
  fields(processRecord, { code: 0, signal: null, timedOut: false, externalSignal: null,
    spawnError: null, logError: null, wrapperPid: 883477, childPid: 883650,
    started: "2026-10-12T21:15:29.291Z", finished: "2026-10-12T21:16:22.435Z",
    durationMs: 53144, timeoutMs: 85000, graceMs: 5000, totalCapMs: 90000, stderr: "",
    stdoutSha256: "181fb0df7dda076d3c588cf3d8184a00c233bf3d8c6b46d6d26ed2e0467d8f5f",
    stderrSha256: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    lifecycleSha256: "15df81dfaab828d3440bc7669e569a538d4a0ad36e9c6158608583287716b7e9" });
  assert.deepEqual(JSON.parse(processRecord.stdout), { complete: true, sourceUnchanged: true, error: null,
    manifest: `${root}/${study}/concepts-2/batches/02/artifacts/manifest.json` });
  fields(closure, { id: 2, replacementSha256: "148b837d090f105d3e06804e7318dc03249ccdfb267b2ec0b1c87182290e5577",
    closed: "2026-10-12T21:16:22.438Z",
    processSha256: "f3d987271a21be55bfbd123541dd20a5fdde68b64a38dc8e5b36e9b978077d71",
    complete: true, sourceUnchanged: true, originalPreserved: true, errors: [] });
  assert.deepEqual(closure.evidence, {
    [`${study}/concepts-2/setup/reconstruction.json`]: "eb6413e85fddbbf6c0dd5e6c9e95195c2c885e6d71d9a543a662ad20bba053b3",
    [`${study}/concepts-2/setup/targets.json`]: "2b4672e8db6cf0b916a65cb04d63861a5959fb0d6ffbde018cff3e6fc30f48c5",
    [`${study}/concepts-2/setup/dependency-install/result.json`]: "3d9635382c0f7599471807aa923121d747d6f5286308a38ef8f5c5a6eeee8d24",
    [`${study}/control-2/operations/02/source-before.json`]: "4ebc9d0119f379d4ed58d4f1fbdb6eedafa996abf57a352057acc93bdb5c7a62",
    [`${study}/control-2/operations/02/source-after.json`]: "4ebc9d0119f379d4ed58d4f1fbdb6eedafa996abf57a352057acc93bdb5c7a62",
    [`${study}/control-2/operations/02/artifact-inventory.json`]: "75e4ca19b847e36f9c3fde6d75da84c3d1b3932ce5f2b8c6afb64e6abf3c26ad",
    [`${study}/concepts-2/batches/02/artifacts/manifest.json`]: "aabf9e3c8f11ed7e62efa7291834141a9b34c3effdb5c09becb80cba71b271dd",
  });
  assert.ok(Date.parse(processRecord.finished) < Date.parse(events[2].at));
  assert.ok(processRecord.durationMs < processRecord.timeoutMs && processRecord.durationMs <= outer.durationMs);
  assert.equal(Date.parse(outer.finished) - Date.parse(command.started), outer.durationMs);
  // closure.closed is the object-construction timestamp, not a final-write clock.
  // No sender attribution, future interruption allowance or budget reset follows.
  return { evidenceAccepted: true, outerNormal: false, reconciled: true, chargedMs: 56343 };
}
