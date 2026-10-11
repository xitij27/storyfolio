import { spawn } from "node:child_process";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { inspectWorkspace, hash, json, verifyInputs } from "../../../../../lib/build.mjs";

const review = join(dirname(fileURLToPath(import.meta.url)), "attempt-2");
await mkdir(review);
const run = resolve(review, "../..");
const inputs = resolve(run, "../../inputs");
const workspace = "/var/tmp/storyfolio-freeze-runtime-20261011/storyfolio-evals/build-bench-depth-1-55RyeV";
const resultPath = join(run, "turns/01/result.json");
const result = JSON.parse(await readFile(resultPath, "utf8"));
const frozen = await verifyInputs(inputs);
const inspect = async () => {
  const source = await inspectWorkspace(workspace);
  return { ...source, entries: undefined, files: Object.fromEntries(Object.entries(source.entries).map(([path, { bytes, ...entry }]) => [path, entry])) };
};
const differences = (a, b) => [...new Set([...Object.keys(a), ...Object.keys(b)])].filter(path => json(a[path]) !== json(b[path]));
const save = (name, value) => writeFile(join(review, name), json(value), { flag: "wx" });
const before = await inspect();
const drift = differences(result.snapshot.files, before.files);
await save("source-before.json", before);
await save("saved-source-comparison.json", { finalTurnResultSha256: hash(await readFile(resultPath)), changed: drift, sourceMatchesFinalTurn: drift.length === 0 });
if (drift.length) throw new Error(`Workspace differs from final actor capture: ${drift.join(", ")}`);
const args = [join(inputs, "implementation/evals/check-build.mjs"), `--workspace=${workspace}`, `--expectations=${join(inputs, "expectations.json")}`, `--out=${join(run, "acceptance-2")}`, "--dependencies=/tmp/storyfolio-build-capability-20261011"];
const environment = {
  PATH: `/tmp/storyfolio-node-check-20261011/node_modules/.bin:${process.env.PATH}`,
  TMPDIR: "/var/tmp/storyfolio-freeze-runtime-20261011",
  PLAYWRIGHT_BROWSERS_PATH: "/tmp/storyfolio-browser-cache",
  LD_LIBRARY_PATH: "/tmp/storyfolio-browser-libs/root/usr/lib/x86_64-linux-gnu",
  NEXT_TELEMETRY_DISABLED: "1",
};
await save("command.json", { modelCalls: 0, started: new Date().toISOString(), inputDigest: frozen.digest, executable: process.execPath, cwd: workspace, args, environment, scope: "Unpaid independent acceptance with frozen checker and expectations after the actor stopped. Full local permissions do not change the actor protocol or its original evidence." });
const execution = await new Promise(resolveProcess => {
  process.on("SIGTERM", () => { writeFileSync(join(review, "interrupted.json"), json({ signal: "SIGTERM", at: new Date().toISOString(), pid: process.pid, ppid: process.ppid })); });
  process.on("SIGINT", () => { writeFileSync(join(review, "interrupted.json"), json({ signal: "SIGINT", at: new Date().toISOString(), pid: process.pid, ppid: process.ppid })); });
  const child = spawn(process.execPath, args, { cwd: workspace, env: { ...process.env, ...environment }, stdio: ["ignore", "pipe", "pipe"] });
  let stdout = "", stderr = "";
  child.stdout.on("data", data => { stdout += data; });
  child.stderr.on("data", data => { stderr += data; });
  child.on("error", error => resolveProcess({ error: String(error), code: null, stdout, stderr }));
  child.on("close", (code, signal) => resolveProcess({ code, signal, stdout, stderr }));
});
await save("process.json", { ...execution, finished: new Date().toISOString() });
const after = await inspect();
await save("source-after.json", after);
const changed = differences(before.files, after.files);
await save("source-comparison.json", { changed, sourceUnchanged: changed.length === 0 });
console.log(json({ code: execution.code, signal: execution.signal, sourceUnchanged: changed.length === 0, result: join(run, "acceptance-2/manifest.json"), processEvidence: join(review, "process.json") }));
process.exitCode = execution.code === 0 && !changed.length ? 0 : 1;
