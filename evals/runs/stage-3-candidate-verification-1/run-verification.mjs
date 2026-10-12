// One separately authorized unpaid verification. No retry or model invocation.
import assert from "node:assert/strict";
import { createWriteStream } from "node:fs";
import { access, readFile } from "node:fs/promises";
import { join } from "node:path";
import { hash, json, verifyInputs, writeNew } from "../../lib/build.mjs";
import { inputs, study, review, output, loadBindings, verifyPrevious } from "./bindings.mjs";
import { CAPTURE_BOUNDS, runBounded } from "./bounded-process.mjs";

assert.equal(process.argv.length, 2, "No arguments accepted");
await assert.rejects(access(output), { code: "ENOENT" }, "A new acceptance directory is required");
const binding = await loadBindings(), before = await binding.source();
await writeNew(join(review, "single-attempt.json"), json({ schemaVersion: 1, started: new Date().toISOString(), authorization: "User approved one verification-only capture of the saved candidate, capped at 15 minutes, with no new actor or judge run and no retry", actorComplete: binding.actor.complete, actorTimedOut: binding.actor.timedOut, actorResultSha256: binding.actorResultSha256, inputDigest: binding.frozen.digest, previousCapture: binding.previous, modelCalls: 0, retries: 0 }));
await writeNew(join(review, "source-before.json"), json(before));
const args = [join(inputs, "implementation/evals/check-build.mjs"), `--workspace=${binding.meta.work}`, `--expectations=${join(inputs, "expectations.json")}`, `--out=${output}`, "--dependencies=/tmp/storyfolio-build-capability-20261011"];
const helperHashes = {};
for (const name of ["run-verification.mjs", "bindings.mjs", "bounded-process.mjs"]) helperHashes[name] = hash(await readFile(join(study, name)));
await writeNew(join(review, "command.json"), json({ schemaVersion: 1, executable: process.execPath, cwd: binding.meta.work, args, environment: binding.environment, checkerTimeoutMs: CAPTURE_BOUNDS.timeoutMs, shutdownGraceMs: CAPTURE_BOUNDS.graceMs, totalChildLifetimeCapMs: CAPTURE_BOUNDS.totalCapMs, helperHashes, scope: "Independent technical and pixel verification of the unchanged timed-out partial actor artifact, not a completed actor delivery or paid comparison retry", modelCalls: 0, noRetries: true }));
const events = createWriteStream(join(review, "lifecycle.jsonl"), { flags: "wx" });
const execution = await runBounded({ executable: process.execPath, args, cwd: binding.meta.work, env: { ...process.env, ...binding.environment }, ...CAPTURE_BOUNDS, onEvent: event => events.write(JSON.stringify(event) + "\n"), onStdout: bytes => process.stdout.write(bytes), onStderr: bytes => process.stderr.write(bytes) });
await new Promise(done => events.end(done));
await writeNew(join(review, "process.json"), json({ ...execution, lifecycleSha256: hash(await readFile(join(review, "lifecycle.jsonl"))) }));
let sourceError = null, after = null;
try { after = await binding.captureSource(); assert.deepEqual(after, before); } catch (error) { sourceError = String(error); }
if (after) await writeNew(join(review, "source-after.json"), json(after));
await writeNew(join(review, "source-comparison.json"), json({ sourceUnchanged: !sourceError && after?.digest === before.digest, beforeDigest: before.digest, afterDigest: after?.digest ?? null, strictActorSnapshotIdentity: !sourceError && !!after, sourceFiles: before.files.length, error: sourceError }));
await verifyInputs(inputs);
const previous = await verifyPrevious();
await writeNew(join(review, "previous-evidence-after.json"), json(previous));
console.log(json({ code: execution.code, signal: execution.signal, timedOut: execution.timedOut, externalSignal: execution.externalSignal, sourceUnchanged: after?.digest === before.digest, manifest: join(output, "manifest.json"), process: join(review, "process.json"), actorDeliveryRemainsIncomplete: true }));
process.exitCode = execution.code === 0 && !execution.timedOut && !execution.externalSignal && !sourceError && !!after ? 0 : 1;
