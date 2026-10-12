import assert from "node:assert/strict";
import test from "node:test";
import { assertSnapshot, assertInstall, reboundTargets, safePath, identities } from "./bindings.mjs";
import { CAPTURE_BOUNDS } from "../../codex-bench-entry-baseline-1/inputs/implementation/evals/runs/stage-3-candidate-verification-1/bounded-process.mjs";
const digest = "a".repeat(64), source = { files: [{ path: "app/page.tsx", sha256: digest, bytes: 2 }] }, snapshot = { "app/page.tsx": { type: "file", hash: digest, size: 2 } };
test("exact source inventory accepts identical saved bytes", () => assertSnapshot(source, snapshot));
test("extra, missing, changed and duplicate source entries cannot pass", () => {
  for (const files of [[], [...source.files, { path: ".git-local/config", sha256: digest, bytes: 1 }], [{ ...source.files[0], bytes: 3 }], [{ ...source.files[0], sha256: "b".repeat(64) }], [...source.files, ...source.files]]) assert.throws(() => assertSnapshot({ files }, snapshot));
});
test("unsafe snapshot paths are rejected by the unchanged frozen path validator", () => {
  for (const path of ["../escape", "/absolute", "app/../escape", "app\\escape", ".git/config", "app//page.tsx"]) assert.throws(() => safePath(path));
  assert.equal(safePath(".agents/skills/storyfolio/SKILL.md"), ".agents/skills/storyfolio/SKILL.md");
});
test("rebound target changes only sourceDigest and preserves old blocker", () => {
  const original = { sourceDigest: identities.originalSource, looks: [{ id: "light" }, { id: "dark" }], sourceBinding: { strictSourceIdentity: false }, actorResultSha256: identities.actorResult };
  const replay = reboundTargets(original, identities.restoredSource);
  assert.notEqual(replay, original); assert.equal(original.sourceDigest, identities.originalSource);
  assert.deepEqual({ ...replay, sourceDigest: original.sourceDigest }, original); assert.equal(replay.sourceBinding.strictSourceIdentity, false);
  assert.throws(() => reboundTargets(original, "invalid"));
});
const originalInstall = { executable: "npm", args: ["ci", "--offline", "--cache=/tmp/storyfolio-npm-cache"], environment: { PATH: "native-first", NEXT_TELEMETRY_DISABLED: null } };
const command = { ...originalInstall, cwd: "/fixture/replay" }, result = { code: 0, signal: null, finished: "2026-10-12T00:00:00Z" };
test("only matched successful install evidence passes", () => assertInstall(command, result, command.cwd, originalInstall));
test("changed install cwd, command, environment, failure or timeout is rejected", () => {
  for (const changed of [{ ...command, cwd: "/other" }, { ...command, executable: "sh" }, { ...command, args: ["install"] }, { ...command, environment: { ...command.environment, NEXT_TELEMETRY_DISABLED: "1" } }]) assert.throws(() => assertInstall(changed, result, command.cwd, originalInstall));
  for (const changed of [{ ...result, code: 1 }, { ...result, signal: "SIGTERM" }, { ...result, timedOut: true }, { ...result, error: "failed" }]) assert.throws(() => assertInstall(command, changed, command.cwd, originalInstall));
});
test("unchanged bounded helper includes shutdown inside 900000 milliseconds", () => assert.deepEqual(CAPTURE_BOUNDS, { timeoutMs: 895000, graceMs: 5000, totalCapMs: 900000 }));
