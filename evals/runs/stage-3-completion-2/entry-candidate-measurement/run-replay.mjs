// Root-owned single capture. New source binding, unchanged frozen measurement worker.
import assert from "node:assert/strict";
import { createWriteStream } from "node:fs";
import { mkdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import { CAPTURE_BOUNDS, runBounded } from "../../codex-bench-entry-baseline-1/inputs/implementation/evals/runs/stage-3-candidate-verification-1/bounded-process.mjs";
import { loadOriginal, loadSetup, assertInstall, helperHashes, artifactInventory, readJson, setup, output, inputs, identities, captureSource, hash, json, writeNew } from "./bindings.mjs";
assert.equal(process.argv.length, 2, "No override arguments or retry options");
const binding = await loadOriginal(), restored = await loadSetup(binding), work = restored.record.work;
const install = join(setup, "dependency-install"), command = await readJson(join(install, "command.json")), result = await readJson(join(install, "result.json"));
assertInstall(command, result, work, binding.originalInstall);
for (const stream of ["stdout", "stderr"]) assert.equal(hash(await readFile(join(install, stream + ".log"))), result[stream + "Sha256"]);
await mkdir(output); const review = join(output, "review"), artifacts = join(output, "artifacts"); await mkdir(review);
const args = [join(inputs, "implementation/evals/builds/bench-entry-1/measurement.mjs"), `--workspace=${work}`, `--targets=${join(setup, "observed-targets.json")}`, `--expectations=${join(inputs, "expectations.json")}`, `--out=${artifacts}`, `--dependencies=${binding.expected.trustedDependencies.root}`];
await writeNew(join(review, "single-attempt.json"), json({ schemaVersion: 1, started: new Date().toISOString(), scope: "Separate candidate measurement of its exact saved snapshot; original actor outcome and complete original inventory stay unchanged", actorComplete: binding.actor.complete, actorTimedOut: binding.actor.timedOut ?? false, actorInterruptedBy: binding.actor.interruptedBy ?? null, actorResultSha256: binding.actorResultSha256, bindingHashes: binding.bindingHashes, sourceDigest: restored.current.digest, authorization: restored.record.authorization, modelCalls: 0, retries: 0 }));
await writeNew(join(review, "source-before.json"), json(restored.current));
await writeNew(join(review, "command.json"), json({ executable: process.execPath, args, cwd: work, environment: binding.environment, ...CAPTURE_BOUNDS, helperHashes: await helperHashes(), inputDigest: identities.candidateInput, baselineMeasurementInputDigest: identities.baselineInput, workerSha256: hash(await readFile(args[0])), installRecordSha256: hash(await readFile(join(install, "result.json"))), limitations: "895000 ms work plus up to 5000 ms shutdown, total 900000 subject to scheduling jitter. Forced worker termination cannot prove detached-descendant cleanup. Root must inspect owned PIDs read-only after closure." }));
const lifecycle = createWriteStream(join(review, "lifecycle.jsonl"), { flags: "wx" }), stdout = createWriteStream(join(review, "stdout.log"), { flags: "wx" }), stderr = createWriteStream(join(review, "stderr.log"), { flags: "wx" });
const execution = await runBounded({ executable: process.execPath, args, cwd: work, env: { ...process.env, ...binding.environment }, ...CAPTURE_BOUNDS, onEvent: event => lifecycle.write(JSON.stringify(event) + "\n"), onStdout: bytes => { stdout.write(bytes); process.stdout.write(bytes); }, onStderr: bytes => { stderr.write(bytes); process.stderr.write(bytes); } });
await Promise.all([lifecycle, stdout, stderr].map(stream => new Promise(done => stream.end(done))));
await writeNew(join(review, "process.json"), json({ ...execution, stdoutSha256: hash(await readFile(join(review, "stdout.log"))), stderrSha256: hash(await readFile(join(review, "stderr.log"))), lifecycleSha256: hash(await readFile(join(review, "lifecycle.jsonl"))) }));
const closure = { checkedAt: new Date().toISOString(), sourceUnchanged: false, originalPreserved: false, artifactBinding: false, captureComplete: false, errors: [] };
try { const after = await captureSource(work); await writeNew(join(review, "source-after.json"), json(after)); assert.deepEqual(after, restored.current); closure.sourceUnchanged = true; } catch (error) { closure.errors.push(String(error)); }
try { const after = await loadOriginal(); await loadSetup(after); closure.originalPreserved = true; } catch (error) { closure.errors.push(String(error)); }
try {
  const files = await artifactInventory(artifacts); await writeNew(join(review, "artifact-inventory.json"), json(files));
  const manifest = await readJson(join(artifacts, "manifest.json")); assert.deepEqual(manifest.sourceBefore, restored.current); assert.deepEqual(manifest.sourceAfter, restored.current);
  assert.deepEqual(Object.fromEntries(files.filter(file => file.path !== "manifest.json").map(file => [file.path, file.sha256])), manifest.artifacts);
  closure.artifactBinding = true; closure.captureComplete = manifest.complete === true;
} catch (error) { closure.errors.push(String(error)); }
await writeNew(join(review, "closure.json"), json(closure));
console.log(json({ ...closure, processCode: execution.code, signal: execution.signal, timedOut: execution.timedOut, externalSignal: execution.externalSignal, actorComplete: binding.actor.complete, actorTimedOut: binding.actor.timedOut ?? false, output }));
process.exitCode = execution.code === 0 && !execution.timedOut && !execution.externalSignal && closure.sourceUnchanged && closure.originalPreserved && closure.artifactBinding && closure.captureComplete ? 0 : 1;
