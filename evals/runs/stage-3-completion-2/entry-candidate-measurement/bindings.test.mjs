// Prospective pure tests only. Do not execute during a live actor or capture.
import assert from "node:assert/strict";
import test from "node:test";
import { assertExtras, splitSource, metadataPath, reboundTargets, hash } from "./bindings.mjs";
const digest = "a".repeat(64), file = { path: "app/page.tsx", sha256: digest, bytes: 12 };
const metadata = { path: ".git-local/HEAD", sha256: "b".repeat(64), bytes: 23 };
const source = files => ({ files, digest: hash(JSON.stringify(files)), exclusions: ["unchanged-policy"] });
const snapshot = { [file.path]: { type: "file", hash: file.sha256, size: file.bytes } };
const unexpected = [{ path: ".git-local", type: "directory" }];
const disposition = { schemaVersion: 1, reviewedByRoot: true, rationale: "Actual Git metadata inspected, not application source", extraFiles: [{ ...metadata, classification: "git-metadata", rationale: "Symbolic Git HEAD" }], unexpected: [{ ...unexpected[0], classification: "identified-git-metadata", rationale: "Git markers inspected" }] };
test("dynamic snapshot split preserves every retained byte and lists all extras", () => {
  const result = splitSource(source([metadata, file]), snapshot); assert.deepEqual(result.extras, [metadata]); assert.deepEqual(result.restored, source([file]));
  assert.deepEqual(splitSource(source([file]), snapshot).extras, []);
});
test("missing, changed, duplicate retained files and incorrect digest block reconstruction", () => {
  for (const current of [source([]), source([{ ...file, bytes: 13 }]), source([file, file]), { ...source([file]), digest: "f".repeat(64) }]) assert.throws(() => splitSource(current, snapshot));
});
test("every extra and unexpected path needs exact root-reviewed metadata disposition", () => {
  assertExtras([metadata], unexpected, disposition);
  for (const change of [{ reviewedByRoot: false }, { extraFiles: [] }, { unexpected: [] }, { rationale: "" }, { extraFiles: [{ ...disposition.extraFiles[0], sha256: digest }] }]) assert.throws(() => assertExtras([metadata], unexpected, { ...disposition, ...change }));
});
test("omitted application, credentials, active hooks and traversal are not allowed metadata", () => {
  for (const path of ["new-app.tsx", ".git-local/app.tsx", ".git-local/hooks/pre-commit", ".aws/credentials", ".codex/config.toml"]) assert.equal(metadataPath(path), false);
  for (const path of ["../escape", ".git-local/../app.tsx", "/tmp/source"]) assert.throws(() => metadataPath(path));
  const extra = { ...metadata, path: ".git-local/app.tsx" };
  assert.throws(() => assertExtras([extra], unexpected, { ...disposition, extraFiles: [{ ...extra, classification: "git-metadata", rationale: "Unsupported assertion" }] }));
});
test("Git metadata allowlist is narrow and does not authorize source mutation", () => {
  for (const path of [".git-local/HEAD", ".git-local/config", ".git-local/hooks/pre-commit.sample", ".git-local/objects/ab/" + "c".repeat(38), ".git-local/refs/heads/main"]) assert.equal(metadataPath(path), true);
});
test("target rebinding changes only sourceDigest and retains unknown actor outcome", () => {
  const original = { sourceDigest: digest, actorResultSha256: "b".repeat(64), looks: [{ id: "actual-look" }], sourceBinding: { exactSetEquality: false } };
  const rebound = reboundTargets(original, "c".repeat(64)); assert.deepEqual({ ...rebound, sourceDigest: digest }, original); assert.equal(original.sourceDigest, digest);
});
