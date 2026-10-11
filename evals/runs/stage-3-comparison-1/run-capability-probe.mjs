// Unpaid command-only probe for one newly prepared comparison workspace.
// Intentionally cannot prepare a workspace or invoke an actor/judge.
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { cp, readFile, readdir, realpath } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { parseArgs } from "node:util";
import { hash, json, verifyInputs, writeNew } from "../../lib/build.mjs";

const { values } = parseArgs({ options: { cohort: { type: "string", default: "codex-bench-depth-baseline-2" } } });
assert.ok(["codex-bench-depth-baseline-2", "codex-bench-depth-candidate-1"].includes(values.cohort), "Only the two prospectively authorized cohorts are supported");
const study = dirname(fileURLToPath(import.meta.url)), root = resolve(study, "../../..");
const out = join(root, "evals/runs", values.cohort, "bench-depth-2/baseline-1"), setup = join(out, "setup");
const meta = JSON.parse(await readFile(join(out, "meta.json"), "utf8"));
assert.deepEqual((await readdir(out)).sort(), ["meta.json", "setup"], "Workspace is already spent or has unexpected artifacts");
const manifest = await verifyInputs(meta.inputs);
const source = JSON.parse(await readFile(join(meta.inputs, "case.json"), "utf8"));
const capabilities = JSON.parse(await readFile(join(meta.inputs, "capabilities.json"), "utf8"));
assert.equal(meta.cohort, values.cohort);
assert.equal(meta.caseId, "bench-depth-2");
assert.equal(source.id, "bench-depth-2");
assert.equal(source.files.length, 9);
assert.equal(manifest.digest, meta.inputDigest);
assert.equal(await realpath(meta.work), meta.work);
assert.ok(meta.work.startsWith("/var/tmp/storyfolio-comparison-runtime-20261012/storyfolio-evals/build-bench-depth-2-"));
assert.equal(hash(await readFile(capabilities.cliExecutable)), capabilities.cliSha256);
assert.equal(process.execPath, capabilities.node.executable);
assert.equal(process.version, capabilities.node.version);
for (const [key, value] of Object.entries(capabilities.environment)) assert.equal(process.env[key] ?? null, value, `Frozen environment differs: ${key}`);
assert.equal(process.env.TMPDIR, "/var/tmp/storyfolio-comparison-runtime-20261012");
await writeNew(join(setup, "runtime-environment.json"), json({ schemaVersion: 1, TMPDIR: process.env.TMPDIR, source: "Explicit preparation environment; runner digest does not include TMPDIR" }));

const args = ["sandbox"];
for (let index = 0; index < capabilities.argv.length; index++) if (capabilities.argv[index] === "-c") args.push("-c", capabilities.argv[++index]);
const probeOut = join(meta.work, "checks/setup-capability");
args.push("--", process.execPath, join(meta.inputs, "implementation/evals/probe-build-environment.mjs"), `--workspace=${meta.work}`, `--out=${probeOut}`);
const command = { schemaVersion: 1, modelCalls: 0, started: new Date().toISOString(), executable: capabilities.cliExecutable, cwd: meta.work, args,
  environment: { ...capabilities.environment, TMPDIR: process.env.TMPDIR }, inputDigest: manifest.digest, capabilitySha256: manifest.hashes["capabilities.json"],
  limits: "Command-only sandbox with all frozen actor -c values. Standalone sandbox still inherits user configuration; the future actor separately ignores it. Not filesystem read isolation, actor preflight or portfolio acceptance." };
await writeNew(join(setup, "capability-command.json"), json(command));
const result = await new Promise(done => {
  const child = spawn(command.executable, args, { cwd: meta.work, detached: true, stdio: ["ignore", "pipe", "pipe"] });
  let stdout = "", stderr = "", timedOut = false, forceTimer;
  const kill = signal => { if (!child.pid) return; try { process.kill(-child.pid, signal); } catch (error) { if (error.code !== "ESRCH") throw error; } };
  const timer = setTimeout(() => { timedOut = true; kill("SIGTERM"); forceTimer = setTimeout(() => kill("SIGKILL"), 2000); }, 420000);
  child.stdout.on("data", chunk => { stdout += chunk; });
  child.stderr.on("data", chunk => { stderr += chunk; });
  child.on("error", error => { clearTimeout(timer); clearTimeout(forceTimer); done({ code: null, error: String(error), stdout, stderr, timedOut }); });
  child.on("close", (code, signal) => { clearTimeout(timer); clearTimeout(forceTimer); done({ code, signal, stdout, stderr, timedOut }); });
});
await writeNew(join(setup, "capability-process.json"), json({ ...result, finished: new Date().toISOString(), modelCalls: 0 }));
let copied = false;
try { await cp(probeOut, join(setup, "capability"), { recursive: true, errorOnExist: true, force: false }); copied = true; }
catch (error) { await writeNew(join(setup, "capability-copy-error.json"), json({ error: String(error) })); }
console.log(json({ code: result.code, error: result.error ?? null, timedOut: result.timedOut, copied, evidence: join(setup, "capability"), modelCalls: 0 }));
process.exitCode = result.code === 0 && !result.timedOut && copied ? 0 : 1;
