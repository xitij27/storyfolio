// Fresh reconstruction and offline install within the single bounded setup operation.
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { join } from "node:path";
import { parseArgs } from "node:util";
import { loadReplacement, loadPrepared, checkInstall, root, json } from "./binding-lib.mjs";
const { values } = parseArgs({ options: { replacement: { type: "string" } } }); assert.ok(values.replacement);
let active, interrupted = null;
for (const signal of ["SIGTERM", "SIGINT"]) process.on(signal, () => { interrupted ??= signal; if (active?.pid) { try { process.kill(-active.pid, signal); } catch (error) { if (error.code !== "ESRCH") throw error; } } });
async function run(args) {
  assert.ok(!interrupted); const child = spawn(process.execPath, args, { cwd: root, env: process.env, detached: true, stdio: ["ignore", "inherit", "inherit"] }); active = child;
  const result = await new Promise((ok, fail) => { child.once("error", fail); child.once("close", (code, signal) => ok({ code, signal })); });
  active = null; assert.ok(!interrupted); assert.equal(result.code, 0); assert.equal(result.signal, null);
}
const binding = await loadReplacement(values.replacement);
await run([join(root, "evals/runs/stage-3-completion-2/full-journey-measurement/prepare-source.mjs"), "--binding", binding.bindingPath]);
const prepared = await loadPrepared(binding);
await run([join(root, "evals/runs/stage-3-comparison-1/record-command.mjs"), join(prepared.setup, "dependency-install"), prepared.application, "npm", "ci", "--offline", "--cache=/tmp/storyfolio-npm-cache"]);
await loadPrepared(binding); await checkInstall(binding, prepared);
console.log(json({ complete: true, modelCalls: 0, work: prepared.work, application: prepared.application }));
