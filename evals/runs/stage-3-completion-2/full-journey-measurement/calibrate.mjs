// Explicitly local, no-model setup calibration. Never a journey gate/result.
import assert from "node:assert/strict";
import { mkdir, realpath } from "node:fs/promises";
import { join, resolve } from "node:path";
import { parseArgs } from "node:util";
import { runBounded } from "../../stage-3-candidate-verification-1/bounded-process.mjs";
import { bounds, validateTargets, openCaptureLogs } from "./measurement-lib.mjs";
import { root, study, regularBytes, captureSource, assertSnapshot, writeNew, hash, json } from "./binding-lib.mjs";
const { values } = parseArgs({ options: Object.fromEntries(["workspace", "snapshot", "targets", "out", "unit", "build-proof"].map(key => [key, { type: "string" }])) });
for (const key of ["workspace", "snapshot", "targets", "out"]) assert.ok(values[key]);
const work = await realpath(values.workspace), output = resolve(values.out), snapshotPath = resolve(values.snapshot), targetsPath = resolve(values.targets);
assert.match(work.split("/").at(-1), /^journey-calibration-[A-Za-z0-9]+$/, "Root must supply a separately restored clean calibration copy, never the actor/replay workspace");
assert.ok(output.startsWith(join(root, "evals/runs") + "/") && !output.startsWith(work + "/"));
const read = path => regularBytes(root, path.slice(root.length + 1));
for (const path of [snapshotPath, targetsPath]) assert.ok(path.startsWith(join(root, "evals/runs") + "/"));
const snapshotBytes = await read(snapshotPath), targetsBytes = await read(targetsPath), snapshot = JSON.parse(snapshotBytes), targets = JSON.parse(targetsBytes), policy = JSON.parse(await regularBytes(study, "policy.json"));
assert.ok([2, 4, 6].includes(targets.stage)); assert.deepEqual(validateTargets(targets), []);
const before = await captureSource(work); assertSnapshot(before, snapshot.files); assert.equal(targets.sourceDigest, before.digest);
await mkdir(output); const review = join(output, "review"); await mkdir(review);
const unit = targets.stage === 6 ? values.unit : targets.stage === 2 ? "concepts" : "looks";
if (targets.stage === 6) assert.ok(["build", "desktop"].includes(unit), "Final calibration is only the approved build plus desktop, not another full matrix");
const args = [join(study, targets.stage === 6 ? "final-worker.mjs" : "gate-worker.mjs"), `--workspace=${work}`, `--targets=${targetsPath}`, `--expectations=${join(study, "policy.json")}`, `--out=${join(output, "artifacts")}`, `--dependencies=${policy.trustedDependencies.root}`], limits = bounds(unit, policy);
if (targets.stage === 6) { args.push(`--unit=${unit}`); if (unit !== "build") { assert.ok(values["build-proof"]); args.push(`--build-proof=${values["build-proof"]}`); } }
const command = { scope: "local no-model worker calibration only, not an actor run, journey gate or Stage 3 pass", executable: process.execPath, args, cwd: work, ...limits, snapshotSha256: hash(snapshotBytes), targetsSha256: hash(targetsBytes), sourceBefore: before, environment: Object.fromEntries(["PATH", "PLAYWRIGHT_BROWSERS_PATH", "LD_LIBRARY_PATH", "LANG", "TMPDIR", "NEXT_TELEMETRY_DISABLED"].map(key => [key, process.env[key] ?? null])), modelCalls: 0, retries: 0 };
await writeNew(join(review, "command.json"), json(command));
const logs = openCaptureLogs(review), logErrors = []; let ownedPid = null, logStop = false, logKillTimer;
function stopForLogError() {
  if (logStop || !ownedPid) return; logStop = true;
  const signal = name => { try { process.kill(ownedPid, name); } catch (error) { if (error.code !== "ESRCH") logErrors.push(`Owned worker shutdown: ${error}`); } };
  signal("SIGTERM"); logKillTimer = setTimeout(() => signal("SIGKILL"), limits.graceMs);
}
const append = (name, bytes) => { try { logs.write(name, bytes); } catch (error) { logErrors.push(`${name}: ${error}`); stopForLogError(); } };
let result;
try {
  result = await runBounded({ executable: process.execPath, args, cwd: work, env: { ...process.env, NEXT_TELEMETRY_DISABLED: "1" }, ...limits,
    onEvent: event => { if (["exit", "closed"].includes(event.type)) { ownedPid = null; clearTimeout(logKillTimer); } else if (["spawn-request", "spawned"].includes(event.type)) ownedPid = event.childPid; if (logErrors.length) stopForLogError(); append("lifecycle", JSON.stringify(event) + "\n"); },
    onStdout: bytes => append("stdout", bytes), onStderr: bytes => append("stderr", bytes) });
} finally { clearTimeout(logKillTimer); ownedPid = null; logErrors.push(...logs.close()); }
result.logError = logErrors.length ? { errors: logErrors, shutdown: "coordinator log failure, signalled only the owned worker PID; not an external-signal attribution" } : null;
const after = await captureSource(work), sourceUnchanged = json(before) === json(after); await writeNew(join(review, "result.json"), json({ ...result, sourceAfter: after, sourceUnchanged, scope: command.scope }));
console.log(json({ output, code: result.code, sourceUnchanged, logError: result.logError, scope: command.scope })); process.exitCode = result.code === 0 && sourceUnchanged && !result.timedOut && !result.externalSignal && !result.logError ? 0 : 1;
