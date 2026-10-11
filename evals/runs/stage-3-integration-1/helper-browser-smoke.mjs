// Local CLI/browser verification only. Existing captures are read-only inputs.
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdir, readFile, readdir, realpath, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const directory = dirname(fileURLToPath(import.meta.url));
const root = resolve(directory, "../../..");
const label = process.argv[2] ?? "helper-browser-smoke";
assert.match(label, /^helper-browser-smoke(?:-[1-9]\d*)?$/);
const output = join(directory, label);
const sourcePath = "evals/builds/bench-depth-2/workspace/scripts/review-sheets.mjs";
const inputPath = "evals/runs/codex-bench-depth-baseline-1/bench-depth-1/baseline-1/acceptance-2/reduced-motion";
const environmentPath = "evals/runs/control-modality-1/after-2/manifest.json";
const sha = bytes => createHash("sha256").update(bytes).digest("hex");
const json = value => JSON.stringify(value, null, 2) + "\n";
const source = await readFile(join(root, sourcePath));
const environmentRecord = await readFile(join(root, environmentPath));
const environment = JSON.parse(environmentRecord).environment;
const cwd = await realpath("/tmp/storyfolio-build-capability-20261011");
const require = createRequire(join(cwd, "package.json"));
const playwrightPath = await realpath(require.resolve("playwright-core"));
const playwrightPackagePath = await realpath(require.resolve("playwright-core/package.json"));
const playwright = JSON.parse(await readFile(playwrightPackagePath, "utf8"));
async function inventory() {
  const entries = [];
  for (const name of (await readdir(join(root, inputPath))).sort()) {
    if (!/\.(?:png|jpe?g)$/i.test(name)) continue;
    const bytes = await readFile(join(root, inputPath, name));
    entries.push({ path: `${inputPath}/${name}`, name, bytes: bytes.length, sha256: sha(bytes) });
  }
  return entries;
}
const originals = await inventory();
assert.equal(originals.length, 51);
await mkdir(output); // Deliberately refuse any overwrite of a prior smoke.
await writeFile(join(output, "helper-source.mjs"), source, { flag: "wx" });
await writeFile(join(output, "wrapper-source.mjs"), await readFile(fileURLToPath(import.meta.url)), { flag: "wx" });
const command = { executable: process.execPath, args: [join(root, sourcePath), join(root, inputPath), join(output, "sheets")], cwd, environment };
const record = {
  schemaVersion: 1, modelCalls: 0, purpose: "Neutral screenshot utility CLI/browser proof, not visual acceptance or a new site capture",
  started: new Date().toISOString(), complete: false, node: process.version, command,
  source: { path: sourcePath, sha256: sha(source), bytes: source.length },
  wrapper: { path: "evals/runs/stage-3-integration-1/helper-browser-smoke.mjs", sha256: sha(await readFile(fileURLToPath(import.meta.url))) },
  environmentRecord: { path: environmentPath, sha256: sha(environmentRecord) },
  playwright: { version: playwright.version, entrypoint: playwrightPath, sha256: sha(await readFile(playwrightPath)), packageJson: playwrightPackagePath },
  originals,
};
await writeFile(join(output, "started.json"), json(record), { flag: "wx" });
const result = await new Promise(resolveResult => {
  const child = spawn(command.executable, command.args, { cwd, env: { ...process.env, ...environment }, stdio: ["ignore", "pipe", "pipe"] });
  let stdout = "", stderr = "", spawnError = null, timedOut = false;
  child.stdout.on("data", data => { stdout += data; });
  child.stderr.on("data", data => { stderr += data; });
  child.on("error", error => { spawnError = error.message; });
  const timeout = setTimeout(() => { timedOut = true; child.kill("SIGTERM"); }, 45_000);
  child.on("close", (code, signal) => { clearTimeout(timeout); resolveResult({ pid: child.pid, code, signal, timedOut, spawnError, stdout, stderr }); });
});
await writeFile(join(output, "process.json"), json(result), { flag: "wx" });
const after = await inventory();
record.originalsUnchanged = JSON.stringify(originals) === JSON.stringify(after);
record.sourceUnchanged = source.equals(await readFile(join(root, sourcePath)));
record.process = result;
record.finished = new Date().toISOString();
if (result.code === 0 && !result.signal && !result.spawnError && !result.timedOut) {
  const manifestBytes = await readFile(join(output, "sheets/manifest.json"));
  const manifest = JSON.parse(manifestBytes);
  const actual = manifest.files.flatMap(file => file.originals).map(file => ({ name: file.name, sha256: file.sha256 })).sort((a, b) => a.name.localeCompare(b.name));
  const expected = originals.map(({ name, sha256 }) => ({ name, sha256 })).sort((a, b) => a.name.localeCompare(b.name));
  assert.deepEqual(actual, expected);
  record.manifest = { path: "sheets/manifest.json", sha256: sha(manifestBytes), originals: actual.length };
  record.sheets = [];
  for (const entry of manifest.files) {
    const bytes = await readFile(join(output, "sheets", entry.file));
    record.sheets.push({ path: `sheets/${entry.file}`, bytes: bytes.length, sha256: sha(bytes), width: bytes.readUInt32BE(16), height: bytes.readUInt32BE(20), originals: entry.originals.length });
  }
  record.complete = record.originalsUnchanged && record.sourceUnchanged && record.sheets.length === 5;
}
await writeFile(join(output, "result.json"), json(record), { flag: "wx" });
console.log(json({ complete: record.complete, sourceUnchanged: record.sourceUnchanged, originalsUnchanged: record.originalsUnchanged, originals: originals.length, sheets: record.sheets?.length, process: result, output }));
if (!record.complete) process.exitCode = 1;
