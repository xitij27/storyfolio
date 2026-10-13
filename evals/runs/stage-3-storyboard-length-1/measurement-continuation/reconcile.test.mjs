// Pure fixtures transcribed from retained operation-02 records; command environment
// and tool transport metadata are omitted because the caller binds those separately.
// No filesystem, process, browser, model, timer or network execution.
import assert from "node:assert/strict";
import test from "node:test";
import { assertReconciledOuter } from "./reconcile.mjs";

const saved = {
  "outer": {
    "schemaVersion": 1,
    "code": null,
    "signal": "SIGTERM",
    "finished": "2026-10-12T21:16:23.975Z",
    "durationMs": 56343,
    "recorderPid": 883466,
    "recorderParentPid": 2843635,
    "childPid": 883477,
    "childSpawned": true,
    "childExited": true,
    "childClosed": true,
    "interruptedBy": "SIGTERM",
    "signalSender": "unknown",
    "signalForwarded": true,
    "shutdownGraceMs": 5000,
    "forceAttempted": false,
    "childError": null,
    "complete": false,
    "status": "externally-interrupted",
    "timeoutAttribution": "This recorder has no work deadline. A child timeout is established only by that child's retained result, not inferred from external signals or exit code.",
    "rawArtifacts": {
      "command.json": "88ddd086cc32b142273dbfcd5f97af90dfb4e0cb8c73553d5fb8623328650962",
      "lifecycle.jsonl": "26e6f4f8a42443c54bddf24624dc16349325492ce15d3b7f02bab33ace38e6df",
      "stdout.log": "0a3419483e9f6c5fc63a4bb510aa335813f1ab9253b25defea9af110c2c15322",
      "stderr.log": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
    }
  },
  "terminal": {
    "exit_code": 1,
    "output": "{\"output\":\"/home/kshitij/projects/storyfolio/evals/runs/stage-3-storyboard-length-1/commands-2/operation-02\",\"schemaVersion\":1,\"code\":null,\"signal\":\"SIGTERM\",\"finished\":\"2026-10-12T21:16:23.975Z\",\"durationMs\":56343,\"recorderPid\":883466,\"recorderParentPid\":2843635,\"childPid\":883477,\"childSpawned\":true,\"childExited\":true,\"childClosed\":true,\"interruptedBy\":\"SIGTERM\",\"signalSender\":\"unknown\",\"signalForwarded\":true,\"shutdownGraceMs\":5000,\"forceAttempted\":false,\"childError\":null,\"complete\":false,\"status\":\"externally-interrupted\",\"timeoutAttribution\":\"This recorder has no work deadline. A child timeout is established only by that child's retained result, not inferred from external signals or exit code.\",\"rawArtifacts\":{\"command.json\":\"88ddd086cc32b142273dbfcd5f97af90dfb4e0cb8c73553d5fb8623328650962\",\"lifecycle.jsonl\":\"26e6f4f8a42443c54bddf24624dc16349325492ce15d3b7f02bab33ace38e6df\",\"stdout.log\":\"0a3419483e9f6c5fc63a4bb510aa335813f1ab9253b25defea9af110c2c15322\",\"stderr.log\":\"e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855\"}}\n"
  },
  "command": {
    "schemaVersion": 1,
    "started": "2026-10-12T21:15:27.632Z",
    "cwd": "/home/kshitij/projects/storyfolio",
    "executable": "/tmp/storyfolio-node-check-20261011/node_modules/node/bin/node",
    "args": [
      "evals/runs/stage-3-storyboard-length-1/measurement-2/run-operation.mjs",
      "--replacement",
      "evals/runs/stage-3-storyboard-length-1/concept-measurement-2.json",
      "--id",
      "2"
    ],
    "recorderPid": 883466,
    "recorderParentPid": 2843635,
    "shutdownGraceMs": 5000,
    "recorderSha256": "fc92e1a3f4d4eaecbee0a952e0ea3dba4f7ec28487840698cb8aa83d9e262802"
  },
  "events": [
    {
      "sequence": 1,
      "at": "2026-10-12T21:15:27.634Z",
      "elapsedMs": 2,
      "type": "recorder_started",
      "recorderPid": 883466,
      "recorderParentPid": 2843635
    },
    {
      "sequence": 2,
      "at": "2026-10-12T21:15:27.637Z",
      "elapsedMs": 5,
      "type": "child_spawned",
      "childPid": 883477
    },
    {
      "sequence": 3,
      "at": "2026-10-12T21:16:23.969Z",
      "elapsedMs": 56337,
      "type": "external_signal",
      "signal": "SIGTERM",
      "first": true,
      "childPid": 883477,
      "sender": "unknown"
    },
    {
      "sequence": 4,
      "at": "2026-10-12T21:16:23.969Z",
      "elapsedMs": 56337,
      "type": "signal_forward_attempt",
      "signal": "SIGTERM",
      "childPid": 883477,
      "scope": "owned-runner-pid-only"
    },
    {
      "sequence": 5,
      "at": "2026-10-12T21:16:23.969Z",
      "elapsedMs": 56338,
      "type": "signal_forward_result",
      "signal": "SIGTERM",
      "childPid": 883477,
      "delivered": true
    },
    {
      "sequence": 6,
      "at": "2026-10-12T21:16:23.975Z",
      "elapsedMs": 56343,
      "type": "child_exit",
      "childPid": 883477,
      "code": null,
      "signal": "SIGTERM"
    },
    {
      "sequence": 7,
      "at": "2026-10-12T21:16:23.975Z",
      "elapsedMs": 56343,
      "type": "child_close",
      "childPid": 883477,
      "code": null,
      "signal": "SIGTERM"
    }
  ],
  "processRecord": {
    "code": 0,
    "signal": null,
    "timedOut": false,
    "externalSignal": null,
    "spawnError": null,
    "wrapperPid": 883477,
    "childPid": 883650,
    "started": "2026-10-12T21:15:29.291Z",
    "finished": "2026-10-12T21:16:22.435Z",
    "durationMs": 53144,
    "timeoutMs": 85000,
    "graceMs": 5000,
    "totalCapMs": 90000,
    "stdout": "{\n  \"complete\": true,\n  \"sourceUnchanged\": true,\n  \"error\": null,\n  \"manifest\": \"/home/kshitij/projects/storyfolio/evals/runs/stage-3-storyboard-length-1/concepts-2/batches/02/artifacts/manifest.json\"\n}\n\n",
    "stderr": "",
    "logError": null,
    "stdoutSha256": "181fb0df7dda076d3c588cf3d8184a00c233bf3d8c6b46d6d26ed2e0467d8f5f",
    "stderrSha256": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "lifecycleSha256": "15df81dfaab828d3440bc7669e569a538d4a0ad36e9c6158608583287716b7e9"
  },
  "closure": {
    "id": 2,
    "replacementSha256": "148b837d090f105d3e06804e7318dc03249ccdfb267b2ec0b1c87182290e5577",
    "closed": "2026-10-12T21:16:22.438Z",
    "processSha256": "f3d987271a21be55bfbd123541dd20a5fdde68b64a38dc8e5b36e9b978077d71",
    "complete": true,
    "sourceUnchanged": true,
    "originalPreserved": true,
    "evidence": {
      "evals/runs/stage-3-storyboard-length-1/concepts-2/setup/reconstruction.json": "eb6413e85fddbbf6c0dd5e6c9e95195c2c885e6d71d9a543a662ad20bba053b3",
      "evals/runs/stage-3-storyboard-length-1/concepts-2/setup/targets.json": "2b4672e8db6cf0b916a65cb04d63861a5959fb0d6ffbde018cff3e6fc30f48c5",
      "evals/runs/stage-3-storyboard-length-1/concepts-2/setup/dependency-install/result.json": "3d9635382c0f7599471807aa923121d747d6f5286308a38ef8f5c5a6eeee8d24",
      "evals/runs/stage-3-storyboard-length-1/control-2/operations/02/source-before.json": "4ebc9d0119f379d4ed58d4f1fbdb6eedafa996abf57a352057acc93bdb5c7a62",
      "evals/runs/stage-3-storyboard-length-1/control-2/operations/02/source-after.json": "4ebc9d0119f379d4ed58d4f1fbdb6eedafa996abf57a352057acc93bdb5c7a62",
      "evals/runs/stage-3-storyboard-length-1/control-2/operations/02/artifact-inventory.json": "75e4ca19b847e36f9c3fde6d75da84c3d1b3932ce5f2b8c6afb64e6abf3c26ad",
      "evals/runs/stage-3-storyboard-length-1/concepts-2/batches/02/artifacts/manifest.json": "aabf9e3c8f11ed7e62efa7291834141a9b34c3effdb5c09becb80cba71b271dd"
    },
    "errors": []
  }
};
const fresh = () => structuredClone(saved);
const expectRejected = mutate => { const value = fresh(); mutate(value); assert.throws(() => assertReconciledOuter(value)); };

test("only this approved interrupted outer is accepted, unchanged and fully charged", () => {
  const value = fresh(), before = structuredClone(value);
  assert.deepEqual(assertReconciledOuter(value), { evidenceAccepted: true, outerNormal: false, reconciled: true, chargedMs: 56343 });
  assert.deepEqual(value, before); assert.equal(value.outer.complete, false);
  assert.equal(value.outer.signalSender, "unknown");
});

test("different operation, coordinator, worker or recorder cannot inherit the exception", () => {
  for (const mutate of [
    value => { value.closure.id = 3; },
    value => { value.command.args[value.command.args.length - 1] = "3"; },
    value => { value.command.args[0] = "other-runner.mjs"; },
    value => { value.command.recorderPid++; },
    value => { value.outer.recorderPid++; },
    value => { value.outer.childPid++; },
    value => { value.processRecord.wrapperPid++; },
    value => { value.processRecord.childPid++; },
    value => { value.closure.replacementSha256 = "0".repeat(64); },
  ]) expectRejected(mutate);
});

test("normalizing the outer or attributing its unknown sender is rejected", () => {
  for (const change of [
    { complete: true }, { code: 0 }, { signal: null }, { interruptedBy: null },
    { signalSender: "user" }, { signalSender: "platform" }, { status: "child-exited-successfully" },
    { signalForwarded: false }, { forceAttempted: true }, { childError: "failure" }, { childClosed: false },
  ]) expectRejected(value => { Object.assign(value.outer, change); });
});

test("different times, earlier signal, missing events and altered forwarding are rejected", () => {
  for (const mutate of [
    value => { value.command.started = "2026-10-12T21:15:27.633Z"; },
    value => { value.outer.finished = "2026-10-12T21:16:23.974Z"; },
    value => { value.events[2].at = "2026-10-12T21:16:21.000Z"; },
    value => { value.events[2].elapsedMs = 53368; },
    value => { value.events[2].sender = "user"; },
    value => { value.events[4].delivered = false; },
    value => { value.events[4].scope = "process-group"; },
    value => { value.events.pop(); },
    value => { value.events.reverse(); },
    value => { value.events.push(structuredClone(value.events[2])); },
    value => { value.closure.closed = "2026-10-12T21:16:23.000Z"; },
  ]) expectRejected(mutate);
});

test("incomplete, signalled, failed or late inner work cannot be reconciled", () => {
  for (const change of [
    { code: 1 }, { signal: "SIGTERM" }, { timedOut: true }, { externalSignal: "SIGTERM" },
    { spawnError: "spawn failed" }, { logError: "write failed" },
    { finished: "2026-10-12T21:16:24.000Z" }, { durationMs: 53143 }, { stderr: "failure" },
  ]) expectRejected(value => { Object.assign(value.processRecord, change); });
  for (const change of [{ complete: false }, { sourceUnchanged: false }, { originalPreserved: false }, { errors: ["incomplete"] }]) {
    expectRejected(value => { Object.assign(value.closure, change); });
  }
  expectRejected(value => { value.processRecord.stdout = JSON.stringify({ complete: false, sourceUnchanged: true, error: null, manifest: "missing" }); });
});

test("changed source, artifact and process identity never pass merely on boolean flags", () => {
  for (const key of Object.keys(saved.closure.evidence)) {
    expectRejected(value => { value.closure.evidence[key] = "a".repeat(64); });
    expectRejected(value => { delete value.closure.evidence[key]; });
  }
  for (const key of Object.keys(saved.outer.rawArtifacts)) expectRejected(value => { value.outer.rawArtifacts[key] = "b".repeat(64); });
  expectRejected(value => { value.closure.evidence.extra = "c".repeat(64); });
  expectRejected(value => { value.closure.processSha256 = "d".repeat(64); });
  expectRejected(value => { value.processRecord.lifecycleSha256 = "e".repeat(64); });
});

test("charged outer duration and existing worker budget cannot be reduced or reset", () => {
  for (const durationMs of [0, 53144, 56342, 56344, 900001, -1, NaN, null]) expectRejected(value => { value.outer.durationMs = durationMs; });
  for (const change of [{ timeoutMs: 900000 }, { graceMs: 0 }, { totalCapMs: 900000 }, { durationMs: 90001 }]) expectRejected(value => { Object.assign(value.processRecord, change); });
});

test("only genuinely closed exit-one terminal evidence matching this outer is accepted", () => {
  for (const mutate of [
    value => { value.terminal.exit_code = 0; },
    value => { delete value.terminal.exit_code; },
    value => { value.terminal.session_id = 123; },
    value => { value.terminal.output = "still running"; },
    value => { value.terminal.output = JSON.stringify({ ...value.outer, output: "/different/operation" }); },
    value => { value.terminal.output = JSON.stringify({ ...value.outer, complete: true, output: "/home/kshitij/projects/storyfolio/evals/runs/stage-3-storyboard-length-1/commands-2/operation-02" }); },
  ]) expectRejected(mutate);
});
