// No model invocation: run the frozen command-only probe inside its sandbox.
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { cp, readFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { hash, json, verifyInputs, writeNew } from "../../lib/build.mjs";

const study = dirname(fileURLToPath(import.meta.url));
const root = resolve(study, "../../..");
const out = join(root, "evals/runs/codex-bench-depth-baseline-1/bench-depth-1/baseline-1");
const setup = join(out, "setup");
const meta = JSON.parse(await readFile(join(out, "meta.json"), "utf8"));
const manifest = await verifyInputs(meta.inputs);
const capabilities = JSON.parse(await readFile(join(meta.inputs, "capabilities.json"), "utf8"));
assert.equal(manifest.digest, meta.inputDigest);
assert.equal(hash(await readFile(capabilities.cliExecutable)), capabilities.cliSha256);
assert.equal(process.execPath, capabilities.node.executable);
assert.equal(process.version, capabilities.node.version);
for (const [key, value] of Object.entries(capabilities.environment)) assert.equal(process.env[key] ?? null, value, `Frozen environment differs: ${key}`);
assert.equal(process.env.TMPDIR, "/var/tmp/storyfolio-freeze-runtime-20261011");
await writeNew(join(setup, "runtime-environment.json"), json({ schemaVersion: 1, TMPDIR: process.env.TMPDIR,
  source: "Explicit preparation environment; runner digest does not include TMPDIR" }));

const args = ["sandbox"];
for (let index = 0; index < capabilities.argv.length; index++) {
  if (capabilities.argv[index] === "-c") args.push("-c", capabilities.argv[++index]);
}
const probeOut = join(meta.work, "checks/setup-capability");
args.push("--", process.execPath, join(meta.inputs, "implementation/evals/probe-build-environment.mjs"), `--workspace=${meta.work}`, `--out=${probeOut}`);
const command = { schemaVersion: 1, modelCalls: 0, started: new Date().toISOString(), executable: capabilities.cliExecutable,
  cwd: meta.work, args, environment: { ...capabilities.environment, TMPDIR: process.env.TMPDIR },
  inputDigest: manifest.digest, capabilitySha256: manifest.hashes["capabilities.json"],
  limitations: "Command-only sandbox uses exact frozen actor -c overrides including default_permissions. It cannot ignore user configuration; future actor exec separately ignores it. This is coordinator setup, not actor preflight." };
await writeNew(join(setup, "capability-command.json"), json(command));
const result = await new Promise(done => {
  const child = spawn(command.executable, args, { cwd: meta.work, detached: true, stdio: ["ignore", "pipe", "pipe"] });
  let stdout = "", stderr = "", timedOut = false, forceTimer;
  const kill = signal => { try { process.kill(-child.pid, signal); } catch (error) { if (error.code !== "ESRCH") throw error; } };
  const timer = setTimeout(() => { timedOut = true; kill("SIGTERM"); forceTimer = setTimeout(() => kill("SIGKILL"), 2000); }, 420000);
  child.stdout.on("data", chunk => { stdout += chunk; });
  child.stderr.on("data", chunk => { stderr += chunk; });
  child.on("error", error => { clearTimeout(timer); clearTimeout(forceTimer); done({ code: null, error: String(error), stdout, stderr, timedOut }); });
  child.on("close", (code, signal) => { clearTimeout(timer); clearTimeout(forceTimer); done({ code, signal, stdout, stderr, timedOut }); });
});
await writeNew(join(setup, "capability-process.json"), json({ ...result, finished: new Date().toISOString(), modelCalls: 0 }));
try { await cp(probeOut, join(setup, "capability"), { recursive: true, errorOnExist: true, force: false }); }
catch (error) { await writeNew(join(setup, "capability-copy-error.json"), json({ error: String(error) })); }
console.log(json({ code: result.code, error: result.error ?? null, timedOut: result.timedOut, evidence: join(setup, "capability"), modelCalls: 0 }));
process.exitCode = result.code === 0 && !result.timedOut ? 0 : 1;
