// One local verification checkpoint. Refuses to replace its retained output.
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { readFile, mkdir, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { hash, json, verifyInputs } from "../../lib/build.mjs";

const study = dirname(fileURLToPath(import.meta.url));
const root = resolve(study, "../../..");
const output = join(study, "repository-verification");
const cohort = join(root, "evals/runs/codex-bench-depth-baseline-1");
const baseline = join(cohort, "bench-depth-1/baseline-1");
const environment = { ...process.env, PATH: `${dirname(process.execPath)}:${process.env.PATH}` };
const readJson = async path => JSON.parse(await readFile(path, "utf8"));
const sourcePaths = ["evals/codex-build-judge.mjs", "evals/lib/codex.mjs", "evals/lib/codex.test.mjs", "evals/lib/build-score.test.mjs"];
const source = Object.fromEntries(await Promise.all(sourcePaths.map(async path => [path, hash(await readFile(join(root, path)))])));
await mkdir(output);
const write = (path, value) => writeFile(join(output, path), value, { flag: "wx" });
const commands = [];
for (const [name, executable, args] of [
  ["skill", process.execPath, ["evals/check-skill.mjs"]],
  ["people", process.execPath, ["evals/check-people.mjs"]],
  ["fixture", process.execPath, ["evals/builds/bench-depth-1/verify-fixture.mjs"]],
  ["tests", "npm", ["test"]],
  ["diff", "git", ["diff", "--check"]],
  ["judge-audit", process.execPath, ["evals/runs/codex-bench-depth-baseline-1/judge-audit/verify.mjs"]],
  ["parser-reproduction", process.execPath, ["evals/runs/judge-response-parsing-1/reproduce.mjs"]],
]) {
  const began = Date.now();
  const result = spawnSync(executable, args, { cwd: root, env: environment, encoding: "utf8", timeout: 180000, maxBuffer: 32 * 1024 * 1024 });
  await write(`${name}.stdout`, result.stdout ?? "");
  await write(`${name}.stderr`, result.stderr ?? "");
  const entry = { name, executable, args, code: result.status, signal: result.signal, error: result.error ? String(result.error) : null, durationMs: Date.now() - began, stdoutSha256: hash(result.stdout ?? ""), stderrSha256: hash(result.stderr ?? "") };
  if (name === "tests") entry.counts = Object.fromEntries([...result.stdout.matchAll(/^# (tests|suites|pass|fail|cancelled|skipped|todo) (\d+)$/gm)].map(([, key, value]) => [key, Number(value)]));
  commands.push(entry);
}

const inputs = await verifyInputs(join(cohort, "inputs"));
assert.equal(inputs.digest, "57b8614b2334d19a387829598e9978f7d5ecc0412bfd364448c1cb5643b77f7e");
const artifacts = {};
for (const path of ["turns/01", "judge"]) {
  const result = await readJson(join(baseline, path, "result.json"));
  for (const [file, expected] of Object.entries(result.artifacts)) assert.equal(hash(await readFile(join(baseline, path, file))), expected, `${path}/${file}`);
  artifacts[path] = { count: Object.keys(result.artifacts).length, resultSha256: hash(await readFile(join(baseline, path, "result.json"))) };
}
const archives = [];
for (const [old, path] of [
  ["docs/handover.md", "docs/history/2026-10-11-before-baseline-reconciliation-handover.md"],
  ["evals/runs/codex-bench-depth-baseline-1/findings.md", "evals/runs/codex-bench-depth-baseline-1/premature-findings.md"],
]) {
  const original = spawnSync("git", ["show", `b81d2b7:${old}`], { cwd: root });
  assert.equal(original.status, 0);
  const bytes = await readFile(join(root, path));
  assert(bytes.equals(original.stdout), path);
  archives.push({ path, sha256: hash(bytes), verbatim: true });
}
const oldStream = spawnSync("git", ["show", "b81d2b7:evals/runs/codex-bench-depth-baseline-1/bench-depth-1/baseline-1/turns/01/stream.jsonl"], { cwd: root, maxBuffer: 16 * 1024 * 1024 });
assert.equal(oldStream.status, 0);
const completedStream = await readFile(join(baseline, "turns/01/stream.jsonl"));
assert(completedStream.subarray(0, oldStream.stdout.length).equals(oldStream.stdout));
for (const path of sourcePaths) assert.equal(hash(await readFile(join(root, path))), source[path], path);
const protectedSourceDiff = spawnSync("git", ["diff", "b81d2b7", "--", "skills/storyfolio", "prototypes/fixture-study", "evals/runs/codex-bench-depth-baseline-1/inputs"], { cwd: root, encoding: "utf8" });
assert.equal(protectedSourceDiff.status, 0);
assert.equal(protectedSourceDiff.stdout, "");
const passed = commands.every(command => command.code === 0);
const result = { schemaVersion: 1, date: new Date().toISOString(), passed, modelCalls: 0, node: { executable: process.execPath, version: process.version }, source, commands, inputDigest: inputs.digest, frozenInputs: Object.keys(inputs.hashes).length, artifacts, archives, earlyStreamIsPrefix: true, skillEnginePrototypeFrozenInputsUnchanged: true, limits: "Repository engineering verification only. Does not establish completed browser acceptance, visual quality, author approval or a new official judge score." };
await write("result.json", json(result));
console.log(json(result));
process.exitCode = passed ? 0 : 1;
