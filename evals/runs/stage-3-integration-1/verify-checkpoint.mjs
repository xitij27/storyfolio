// Retain one local engineering checkpoint, never invoke a model or overwrite evidence.
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { hash, inspectBuildInputs, json, verifyInputs } from "../../lib/build.mjs";

const study = dirname(fileURLToPath(import.meta.url));
const root = resolve(study, "../../..");
const name = process.argv[2] ?? "verification-1";
assert.match(name, /^verification-[1-9]\d*$/);
const output = join(study, name);
const environment = { ...process.env, PATH: `${dirname(process.execPath)}:${process.env.PATH}`, TMPDIR: "/var/tmp/storyfolio-stage3-runtime-20261012" };
const inspected = await inspectBuildInputs({ root, casePath: "evals/builds/bench-depth-2/case.json", capabilities: { schemaVersion: 1, meaning: "Engineering checkpoint only, not frozen actor capabilities" } });
const sourcePaths = ["evals/lib/build-score.test.mjs", "evals/lib/build-capture.test.mjs", "evals/lib/build-check.test.mjs", "evals/lib/build.test.mjs", "evals/lib/source-scope.test.mjs", "evals/lib/review-sheets.test.mjs", "evals/runs/stage-3-integration-1/verify-checkpoint.mjs"];
const source = Object.fromEntries(await Promise.all(sourcePaths.map(async path => [path, hash(await readFile(join(root, path)))])));
await mkdir(output);
const save = (name, bytes) => writeFile(join(output, name), bytes, { flag: "wx" });
const commands = [];
for (const [name, executable, args] of [
  ["skill", process.execPath, ["evals/check-skill.mjs"]],
  ["people", process.execPath, ["evals/check-people.mjs"]],
  ["tests", "npm", ["test"]],
  ["fixture", process.execPath, ["evals/builds/bench-depth-2/verify-fixture.mjs"]],
  ["source-reproduction", process.execPath, ["evals/runs/source-inventory-1/reproduce.mjs"]],
  ["historical-judge-audit", process.execPath, ["evals/runs/codex-bench-depth-baseline-1/judge-audit/verify.mjs"]],
  ["diff", "git", ["diff", "--check"]],
]) {
  const began = Date.now();
  const result = spawnSync(executable, args, { cwd: root, env: environment, encoding: "utf8", timeout: 180000, maxBuffer: 32 * 1024 * 1024 });
  await save(`${name}.stdout`, result.stdout ?? "");
  await save(`${name}.stderr`, result.stderr ?? "");
  const entry = { name, executable, args, code: result.status, signal: result.signal, error: result.error ? String(result.error) : null, durationMs: Date.now() - began, stdoutSha256: hash(result.stdout ?? ""), stderrSha256: hash(result.stderr ?? "") };
  if (name === "tests") entry.counts = Object.fromEntries([...(result.stdout ?? "").matchAll(/^# (tests|suites|pass|fail|cancelled|skipped|todo) (\d+)$/gm)].map(([, key, value]) => [key, Number(value)]));
  commands.push(entry);
  console.log(JSON.stringify({ name, code: entry.code, counts: entry.counts }));
}
const frozen = await verifyInputs(join(root, "evals/runs/codex-bench-depth-baseline-1/inputs"));
assert.equal(frozen.digest, "57b8614b2334d19a387829598e9978f7d5ecc0412bfd364448c1cb5643b77f7e");
const protectedPaths = ["skills/storyfolio", "prototypes/fixture-study", "evals/builds/bench-depth-1", "evals/runs/codex-bench-depth-baseline-1"];
const protectedDiff = spawnSync("git", ["diff", "784eb1e", "--", ...protectedPaths], { cwd: root, encoding: "utf8", maxBuffer: 16 * 1024 * 1024 });
assert.equal(protectedDiff.status, 0); assert.equal(protectedDiff.stdout, "");
const previous = spawnSync("git", ["show", "784eb1e:docs/handover.md"], { cwd: root });
assert.equal(previous.status, 0);
const archived = await readFile(join(root, "docs/history/2026-10-12-before-stage-3-development-handover.md"));
assert(archived.equals(previous.stdout));
for (const path of sourcePaths) assert.equal(hash(await readFile(join(root, path))), source[path]);
const after = await inspectBuildInputs({ root, casePath: "evals/builds/bench-depth-2/case.json", capabilities: { schemaVersion: 1, meaning: "Engineering checkpoint only, not frozen actor capabilities" } });
assert.equal(after.digest, inspected.digest, "Implementation or fixture changed during verification");
const result = { schemaVersion: 1, date: new Date().toISOString(), passed: commands.every(command => command.code === 0), modelCalls: 0, node: { executable: process.execPath, version: process.version }, environment: { TMPDIR: environment.TMPDIR }, source, fixtureInspectionHashes: inspected.hashes, fixtureInspectionDigestNotRunDigest: inspected.digest, commands, historicalInputsVerified: Object.keys(frozen.hashes).length, historicalInputDigest: frozen.digest, protectedSourcesUnchanged: protectedPaths, handoverArchive: { verbatim: true, sha256: hash(archived) }, limitations: "Local engineering verification. No actor run, candidate skill edit, full-site acceptance, physical-phone check or Stage 3 completion." };
await save("result.json", json(result));
console.log(JSON.stringify({ passed: result.passed, result: join(output, "result.json"), modelCalls: 0 }));
process.exitCode = result.passed ? 0 : 1;
