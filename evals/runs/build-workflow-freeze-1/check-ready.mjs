// Restore the recorded launch environment for unpaid checks only.
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { readFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

assert.equal(process.argv.length, 2, "No arguments accepted; this helper cannot launch a paid turn");
const study = dirname(fileURLToPath(import.meta.url)), root = resolve(study, "../../..");
const cohort = join(root, "evals/runs/codex-bench-depth-baseline-1");
const capabilities = JSON.parse(await readFile(join(cohort, "inputs/capabilities.json"), "utf8"));
const runtime = JSON.parse(await readFile(join(cohort, "bench-depth-1/baseline-1/setup/runtime-environment.json"), "utf8"));
const dry = JSON.parse(await readFile(join(study, "dry.json"), "utf8"));
const env = { ...process.env, ...capabilities.environment, TMPDIR: runtime.TMPDIR };
const checks = [
  [join(study, "audit.mjs"), "--require-probe"],
  [join(root, "evals/codex-build-run.mjs"), "--case", "evals/builds/bench-depth-1/case.json", "--cohort", "codex-bench-depth-baseline-1", "--capabilities", "evals/builds/local-capabilities.json", "--dry"],
];
const results = [];
for (const args of checks) {
  const result = spawnSync(capabilities.node.executable, args, { cwd: root, env, encoding: "utf8", timeout: 30000, maxBuffer: 4 * 1024 * 1024 });
  assert.equal(result.error, undefined, String(result.error));
  assert.equal(result.status, 0, result.stdout + result.stderr);
  const value = JSON.parse(result.stdout);
  assert.equal(value.inputDigest ?? value.digest, dry.digest);
  if (value.capabilities) assert.deepEqual(value.capabilities, capabilities);
  results.push({ args, exitCode: result.status, stderr: result.stderr, inputDigest: value.inputDigest ?? value.digest });
}
console.log(JSON.stringify({ passed: true, inputDigest: dry.digest, results, modelCalls: 0, writes: false,
  paidExecutionAuthorized: false, scope: "Read-only current source, runtime environment, capability record and no-paid-artifact checks" }, null, 2));
