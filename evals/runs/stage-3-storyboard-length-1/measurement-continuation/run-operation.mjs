// One explicit bounded operation, never a loop, retry or model invocation.
import assert from "node:assert/strict";
import { mkdir } from "node:fs/promises";
import { join } from "node:path";
import { parseArgs } from "node:util";
import { runBounded } from "../../stage-3-candidate-verification-1/bounded-process.mjs";
import { openCaptureLogs } from "../../stage-3-completion-2/full-journey-measurement/measurement-lib.mjs";
import { assertBatchCoverage } from "./verify.mjs";
import { planOperation, inspectHistory } from "../measurement/budget.mjs";
import { loadReplacement, loadPrepared, readHistory, commandFor, checkInstall, root, captureSource, regularBytes, inventory, hash, json, writeNew, assertContinuationId } from "./binding-lib.mjs";
const { values } = parseArgs({ options: { replacement: { type: "string" }, id: { type: "string" } } }); assert.ok(values.replacement && values.id !== undefined);
const id = Number(values.id); assertContinuationId(id);
const binding = await loadReplacement(values.replacement);
let prepared = await loadPrepared(binding);
await checkInstall(binding, prepared);
const history = await readHistory(binding, prepared), limits = planOperation({ history, nextId: id, bindingSha256: binding.replacementSha256, batches: binding.replacement.schedule.length });
assert.ok(history.reduce((sum, row) => sum + row.outerDurationMs, 0) + limits.totalCapMs <= 900000, "Insufficient whole-invocation budget for the next operation allocation");
const directory = join(binding.control, "operations", String(id).padStart(2, "0"));
await mkdir(join(binding.control, "operations"), { recursive: true }); await mkdir(directory);
await writeNew(join(directory, "attempt.json"), json({ id, started: new Date().toISOString(), replacementSha256: binding.replacementSha256, continuationSha256: binding.continuationSha256, continuationHashes: binding.continuationHashes, helperHashes: binding.replacementHashes, limits, retries: 0, modelCalls: 0 }));
if (id > 0) { await mkdir(join(binding.output, "batches"), { recursive: true }); await mkdir(join(binding.output, "batches", String(id).padStart(2, "0"))); }
const command = { ...commandFor(binding, id, prepared), id, replacementSha256: binding.replacementSha256, continuationSha256: binding.continuationSha256, continuationHashes: binding.continuationHashes, originalBindingSha256: binding.bindingSha256, helperHashes: binding.replacementHashes, originalHelperHashes: binding.helperHashes, limits };
await writeNew(join(directory, "command.json"), json(command)); await writeNew(join(directory, "source-before.json"), json(binding.restored));
const env = { ...process.env }; for (const [key, value] of Object.entries(command.environment)) { if (value === null) delete env[key]; else env[key] = value; }
const logs = openCaptureLogs(directory), logErrors = []; let ownedPid, killTimer;
function append(name, data) { try { logs.write(name, data); } catch (error) { logErrors.push(String(error)); if (ownedPid && !killTimer) { try { process.kill(ownedPid, "SIGTERM"); } catch {} killTimer = setTimeout(() => { try { process.kill(ownedPid, "SIGKILL"); } catch {} }, limits.graceMs); } } }
let execution;
try {
  execution = await runBounded({ executable: command.executable, args: command.args, cwd: command.cwd, env, ...limits,
    onEvent: event => { if (["exit", "closed"].includes(event.type)) { ownedPid = null; clearTimeout(killTimer); } else if (["spawn-request", "spawned"].includes(event.type)) ownedPid = event.childPid; append("lifecycle", JSON.stringify(event) + "\n"); },
    onStdout: bytes => append("stdout", bytes), onStderr: bytes => append("stderr", bytes) });
} finally { clearTimeout(killTimer); ownedPid = null; logErrors.push(...logs.close()); }
execution.logError = logErrors.length ? logErrors : null;
for (const [file, key] of [["stdout.log", "stdoutSha256"], ["stderr.log", "stderrSha256"], ["lifecycle.jsonl", "lifecycleSha256"]]) execution[key] = hash(await regularBytes(directory, file));
await writeNew(join(directory, "process.json"), json(execution));
const closure = { id, replacementSha256: binding.replacementSha256, continuationSha256: binding.continuationSha256, continuationHashes: binding.continuationHashes, closed: new Date().toISOString(), processSha256: hash(await regularBytes(directory, "process.json")), complete: false, sourceUnchanged: false, originalPreserved: false, evidence: {}, errors: [] };
async function bind(file) { const relative = file.slice(root.length + 1); closure.evidence[relative] = hash(await regularBytes(root, relative)); }
try {
  prepared = await loadPrepared(binding); await checkInstall(binding, prepared);
  const after = await captureSource(prepared.work); await writeNew(join(directory, "source-after.json"), json(after)); assert.deepEqual(after, binding.restored); closure.sourceUnchanged = true;
  await loadReplacement(values.replacement); closure.originalPreserved = true;
  await bind(join(prepared.setup, "reconstruction.json")); await bind(join(prepared.setup, "targets.json")); await bind(join(prepared.setup, "dependency-install/result.json"));
  await bind(join(directory, "source-before.json")); await bind(join(directory, "source-after.json"));
  if (id > 0) {
    const artifacts = join(binding.output, "batches", String(id).padStart(2, "0"), "artifacts"), files = await inventory(artifacts), manifest = JSON.parse(await regularBytes(artifacts, "manifest.json"));
    await writeNew(join(directory, "artifact-inventory.json"), json(files)); await bind(join(directory, "artifact-inventory.json")); await bind(join(artifacts, "manifest.json"));
    assert.deepEqual(Object.fromEntries(files.filter(file => file.path !== "manifest.json").map(file => [file.path, file.sha256])), manifest.artifacts);
    assert.deepEqual(manifest.sourceBefore, binding.restored); assert.deepEqual(manifest.sourceAfter, binding.restored); assert.deepEqual(manifest.targets, binding.targets);
    assert.equal(manifest.batch, id); assert.deepEqual(manifest.selectedAlternative, binding.targets.alternatives[id - 1]); assert.equal(manifest.complete, true); assert.equal(manifest.passed, true); assert.equal(manifest.interrupted, null);
    const reports = []; for (const mode of ["desktop", "phone"]) reports.push(JSON.parse(await regularBytes(artifacts, `${String(id).padStart(2, "0")}-${mode}/report.json`)));
    const assessment = assertBatchCoverage({ batch: id, manifest, reports, targets: binding.targets, policy: binding.policy, files });
    assert.equal(assessment.passed, true);
  }
  // Provisional child closure only. The next operation still requires root-retained
  // normal outer supervision, charging its full actual duration via readHistory.
  const row = { id, bindingSha256: binding.replacementSha256, ...execution, complete: true };
  inspectHistory({ history: [...history, row], bindingSha256: binding.replacementSha256, batches: binding.replacement.schedule.length }); closure.complete = true;
} catch (error) { closure.errors.push(String(error)); }
await writeNew(join(directory, "closure.json"), json(closure));
console.log(json({ ...closure, durationMs: execution.durationMs, previousWholeExecutionMs: history.reduce((sum, row) => sum + row.durationMs, 0), provisionalCurrentChildMs: execution.durationMs, next: "Root must retain actual outer normal closure and charge its whole duration. No next operation starts automatically." }));
process.exitCode = closure.complete ? 0 : 1;

