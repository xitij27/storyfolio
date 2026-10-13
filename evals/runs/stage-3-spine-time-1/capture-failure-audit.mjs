// Read-only diagnosis. Never repairs or promotes the original failed result.
import assert from "node:assert/strict";
import { join } from "node:path";
import { hash, json, regularBytes, readTurnHistory, verifyInputs } from "../../lib/build.mjs";
import { summariseCodex, finalCodexMessage } from "../../lib/codex.mjs";
const root = process.cwd();
const study = join(root, "evals/runs/stage-3-spine-time-1");
const run = join(root, "evals/runs/codex-full-journey-timing-1/full-journey-1/baseline-1");
const read = async (base, path) => JSON.parse(await regularBytes(base, path));
const meta = await read(run, "meta.json"), frozen = await verifyInputs(meta.inputs);
assert.equal(frozen.digest, "f94e0ef05af37a3eadb1992f7b22a0b589873fac8d5c4adf5ffe1cf967e23512");
const history = await readTurnHistory(run); assert.equal(history.length, 2);
const actor = history[1], turn = join(run, "turns/02"), processRecord = await read(turn, "process.json");
assert.equal(actor.complete, false); assert.equal(actor.snapshot, undefined);
assert.equal(actor.captureError, "Error: Snapshot byte bound exceeded: site/.next-concepts/cache/turbopack/v16.3.8-b0fad0d4/00000001.sst");
assert.equal(processRecord.code, 0);
for (const key of ["timedOut", "interruptedBy", "spawnError", "logError"]) assert.ok(!processRecord[key], key);
const stream = (await regularBytes(turn, "stream.jsonl")).toString();
const summary = summariseCodex(stream, processRecord.code), final = finalCodexMessage(stream, processRecord.code);
assert.equal(summary.failed, false); assert.equal(summary.sessionId, "01a133cb-3949-7881-a279-b078b5f3baca");
assert.equal(actor.sessionId, summary.sessionId); assert.deepEqual(summary.usage, actor.usage);
assert.equal(actor.durationMs, processRecord.durationMs);
assert.equal((await regularBytes(turn, "reply.md")).toString(), summary.reply + "\n");
const outer = await read(study, "turn-2-command/result.json"), terminal = await read(study, "terminal-turn2.json");
assert.equal(outer.code, 1); assert.equal(outer.status, "child-exited-unsuccessfully"); assert.equal(outer.complete, false);
assert.equal(terminal.exit_code, 1); assert.equal(terminal.session_id, undefined);
const { output, ...terminalRecord } = JSON.parse(terminal.output.trim().split("\n").at(-1));
assert.deepEqual(terminalRecord, outer); assert.equal(output, join(study, "turn-2-command"));
for (const key of ["childSpawned", "childExited", "childClosed"]) assert.equal(outer[key], true);
for (const key of ["interruptedBy", "childError", "signal", "signalSender"]) assert.equal(outer[key], null);
for (const key of ["signalForwarded", "forceAttempted"]) assert.equal(outer[key], false);
for (const [path, digest] of Object.entries(outer.rawArtifacts)) assert.equal(hash(await regularBytes(join(study, "turn-2-command"), path)), digest);
const events = (await regularBytes(study, "turn-2-command/lifecycle.jsonl")).toString().trim().split("\n").map(JSON.parse);
assert.deepEqual(events.map(event => event.type), ["recorder_started", "child_spawned", "child_exit", "child_close"]);
for (const event of events.slice(2)) { assert.equal(event.code, 1); assert.equal(event.signal, null); }
const paths = ["site/next.config.ts", "site/scripts/serve-concepts.mjs", "site/.next-concepts/BUILD_ID", "site/.next-concepts/required-server-files.json"];
const evidence = [];
for (const path of paths) { const bytes = await regularBytes(meta.work, path); evidence.push({ path, sha256: hash(bytes), bytes: bytes.length }); }
const config = (await regularBytes(meta.work, paths[0])).toString(), launcher = (await regularBytes(meta.work, paths[1])).toString();
assert.match(config, /distDir: process\.env\.STORYFOLIO_DIST_DIR \?\? "\.next"/);
assert.match(launcher, /STORYFOLIO_DIST_DIR:'\.next-concepts'/);
const generated = await read(meta.work, paths[3]); assert.equal(generated.config.distDir, ".next-concepts");
console.log(json({ verifiedFrozenInputs: Object.keys(frozen.hashes).length, originalResultSha256: actor.digest,
  originalArtifactsVerified: Object.keys(actor.artifacts).length, originalComplete: false, nativeTurnCompleted: true,
  sourceSnapshotAvailable: false, signalOrTimeout: false, outerCode: outer.code, sessionId: actor.sessionId,
  durationMs: actor.durationMs, usage: actor.usage, finalMessage: final, liveDiagnosisEvidence: evidence,
  sourceEvidenceBasis: "Live post-closure diagnosis, not a recovered snapshot or original closure-time source proof",
  paidCalls: 0, writes: false, next: "Preserve failure; bind additive source recovery before any browser or paid continuation" }));
