// Read-only audit of the preserved timeout. This cannot authorize a continuation.
import assert from "node:assert/strict";
import { readFile, readdir, readlink } from "node:fs/promises";
import { join, resolve } from "node:path";
import { hash, json, verifyInputs } from "../../lib/build.mjs";
import { captureSource } from "../../lib/build-capture.mjs";
import { inventory, regularBytes } from "../stage-3-completion-2/full-journey-measurement/binding-lib.mjs";
const root = resolve("."), study = join(root, "evals/runs/stage-3-storyboard-length-1");
const run = join(root, "evals/runs/codex-full-journey-candidate-3/full-journey-1/baseline-1"), turn = join(run, "turns/04");
const read = async (base, path) => JSON.parse(await regularBytes(base, path));
const meta = await read(run, "meta.json"), actor = await read(turn, "result.json"), processRecord = await read(turn, "process.json");
const outer = await read(study, "turn-4-command/result.json"), terminal = await read(study, "terminal-turn4.json");
assert.equal(actor.complete, false); assert.equal(actor.timedOut, true); assert.equal(actor.interruptedBy, null); assert.equal(actor.usage, null);
assert.equal(actor.turn, 4); assert.equal(actor.requestedStop, 4); assert.equal(actor.sessionId, "01a13189-6311-7042-a63f-394a33e47fc6");
assert.equal(processRecord.code, -1); assert.equal(processRecord.timedOut, true); assert.equal(processRecord.interruptedBy, null);
assert.equal(processRecord.spawnError, null); assert.equal(processRecord.logError, null);
assert.equal(actor.durationMs, processRecord.durationMs); assert.ok(actor.durationMs >= 900000);
assert.equal(outer.code, 1); assert.equal(outer.complete, false); assert.equal(outer.interruptedBy, null);
assert.equal(outer.childClosed, true); assert.equal(terminal.exit_code, 1); assert.equal(terminal.session_id, undefined);
for (const [path, digest] of Object.entries(outer.rawArtifacts)) assert.equal(hash(await regularBytes(join(study, "turn-4-command"), path)), digest);
const inputs = await verifyInputs(meta.inputs); assert.equal(inputs.digest, "68c2bfd15305eb9b9fcb8114dbe64dd511d9a227627c8865833aad281f95ebeb");
assert.equal(Object.keys(inputs.hashes).length, 149);
for (let n = 1; n <= 4; n++) {
  const directory = join(run, "turns", String(n).padStart(2, "0")), result = await read(directory, "result.json");
  assert.deepEqual(Object.fromEntries((await inventory(directory)).filter(file => file.path !== "result.json").map(file => [file.path, file.sha256])), result.artifacts);
}
const snapshot = await read(turn, "snapshot/manifest.json"), source = await captureSource(meta.work);
assert.deepEqual(actor.snapshot, snapshot);
assert.deepEqual(Object.fromEntries(source.files.map(file => [file.path, { type: "file", hash: file.sha256, size: file.bytes }])), snapshot.files);
const saved = await inventory(join(turn, "snapshot/files"));
assert.deepEqual(Object.fromEntries(saved.map(file => [file.path, { type: "file", hash: file.sha256, size: file.bytes }])), snapshot.files);
const stream = (await regularBytes(turn, "stream.jsonl")).toString().trim().split("\n").map(line => JSON.parse(line));
assert.equal(stream.some(event => event.type === "turn.completed"), false);
const messages = stream.filter(event => event.type === "item.completed" && event.item?.type === "agent_message").map(event => ({ id: event.item.id, text: event.item.text }));
const processes = [];
for (const pid of (await readdir("/proc")).filter(name => /^\d+$/.test(name))) {
  try { const cwd = await readlink(`/proc/${pid}/cwd`); if (cwd === meta.work || cwd.startsWith(meta.work + "/")) processes.push({ pid: Number(pid), cwd, args: (await readFile(`/proc/${pid}/cmdline`)).toString().replaceAll("\0", " ") }); } catch {}
}
console.log(json({ integrityVerified: true, actorCompleted: false, timeoutMs: actor.durationMs, usage: "unknown", unexpectedExternalSignal: null,
  inputs: Object.keys(inputs.hashes).length, artifacts: Object.keys(actor.artifacts).length, sourceFiles: source.files.length, applicationFiles: source.files.filter(file => file.path.startsWith("site/")).length,
  sourceDigest: source.digest, resultSha256: hash(await regularBytes(turn, "result.json")), messages, processes, processObservationAt: new Date().toISOString(),
  continuationAllowed: false, browserProofEligible: false, stage3Complete: false, modelCalls: 0, writes: false }));
