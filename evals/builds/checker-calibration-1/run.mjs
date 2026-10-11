import { spawn } from "node:child_process";
import { readFile, writeFile, cp } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join, resolve } from "node:path";
import { inspectWorkspace, hash, json, verifyInputs } from "../../lib/build.mjs";

const folder = dirname(fileURLToPath(import.meta.url));
const original = resolve("evals/runs/codex-build-1/embedded-1/baseline-1");
const meta = JSON.parse(await readFile(join(original, "meta.json"), "utf8"));
const cap = JSON.parse(await readFile(join(meta.inputs, "capabilities.json"), "utf8"));
const originalSource = JSON.parse(await readFile(join(original, "spine-acceptance/source-before.json"), "utf8"));
const frozen = await verifyInputs(meta.inputs);
const sourceHashes = JSON.parse(await readFile(join(folder, "checker-source-hashes.json"), "utf8"));
const save = (name, value) => writeFile(join(folder, name), json(value), { flag: "wx" });
const inspect = async () => {
  const result = await inspectWorkspace(meta.work);
  return { ...result, entries: undefined, files: Object.fromEntries(Object.entries(result.entries).map(([path, { bytes, ...record }]) => [path, record])) };
};
const compare = (a, b) => [...new Set([...Object.keys(a), ...Object.keys(b)])].filter(path => json(a[path]) !== json(b[path]));
const implementation = async () => Object.fromEntries(await Promise.all(Object.keys(sourceHashes.hashes).map(async path => [path, hash(await readFile(path))])));
const before = await inspect();
const changedBefore = compare(originalSource.files, before.files);
if (changedBefore.length) throw new Error(`Actor source changed before calibration: ${changedBefore.join(", ")}`);
const hashes = await implementation();
if (json(hashes) !== json(sourceHashes.hashes)) throw new Error("Checker changed after unit verification");
await save("source-before.json", before);
await save("input-provenance.json", {
  modelCalls: 0, cohortDigest: frozen.digest, sourceRun: original, workspace: meta.work,
  originalSourceManifest: "../../runs/codex-build-1/embedded-1/baseline-1/spine-acceptance/source-before.json",
  sourceMatchesOriginal: true, implementation: hashes,
  expectationsHash: hash(await readFile(join(folder, "expectations.json"))),
  correction: "Remove only the bring-up definition from the partial spine projection: the frozen storyboard assigns it to the unvisited Observation chapter. Full-site expectations remain unchanged.",
});
const args = ["sandbox"];
for (let i = 0; i < cap.argv.length; i++) if (cap.argv[i] === "-c") args.push("-c", cap.argv[++i]);
const out = "/tmp/storyfolio-checker-calibration-1";
args.push("--", process.execPath, resolve("evals/check-build.mjs"), `--workspace=${meta.work}`, `--expectations=${join(folder, "expectations.json")}`, `--out=${out}`, "--dependencies=/tmp/storyfolio-build-capability-20261011");
await save("command.json", { started: new Date().toISOString(), cwd: meta.work, executable: cap.cliExecutable, args, modelCalls: 0 });
const result = await new Promise(resolve => {
  const child = spawn(cap.cliExecutable, args, { cwd: meta.work, stdio: ["ignore", "pipe", "pipe"] });
  let stdout = "", stderr = "";
  child.stdout.on("data", x => { stdout += x; process.stdout.write(x); });
  child.stderr.on("data", x => { stderr += x; process.stderr.write(x); });
  child.on("error", error => resolve({ error: String(error), code: null, stdout, stderr }));
  child.on("close", (code, signal) => resolve({ code, signal, stdout, stderr }));
});
await save("process.json", { ...result, finished: new Date().toISOString() });
await cp(out, join(folder, "runtime"), { recursive: true, errorOnExist: true, force: false });
const after = await inspect();
await save("source-after.json", after);
const changed = compare(before.files, after.files);
const afterHashes = await implementation();
await save("source-comparison.json", { changed, sourceUnchanged: changed.length === 0, implementationUnchanged: json(hashes) === json(afterHashes), implementationAfter: afterHashes });
console.log(json({ code: result.code, output: join(folder, "runtime"), sourceUnchanged: changed.length === 0 }));
process.exitCode = result.code === 0 && !changed.length && json(hashes) === json(afterHashes) ? 0 : 1;
