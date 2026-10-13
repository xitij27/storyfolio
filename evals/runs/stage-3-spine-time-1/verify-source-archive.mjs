// Read-only archived-byte verification. Does not authorize measurement or a turn.
import assert from "node:assert/strict";
import { join } from "node:path";
import { captureSource } from "../../lib/build-capture.mjs";
import { readTurnHistory, verifyInputs } from "../../lib/build.mjs";
import { assertSupervisor, regularBytes, inventory, hash, json } from "../stage-3-completion-2/full-journey-measurement/binding-lib.mjs";
const root = process.cwd(), study = join(root, "evals/runs/stage-3-spine-time-1"), archive = join(study, "source-recovery-1");
const read = async (base, path) => JSON.parse(await regularBytes(base, path));
const record = await read(archive, "result.json"), source = await read(archive, "source.json");
assert.equal(record.kind, "post-closure-source-archive"); assert.equal(record.originalComplete, false);
assert.equal(record.modelCalls, 0); assert.equal(record.originalFilesModified, false);
assert.equal(record.sourceUnchangedDuringArchive, true); assert.equal(record.exactAdditionalExclusion, "site/.next-concepts");
const files = await inventory(join(archive, "files")); assert.deepEqual(files, source.files);
const captured = await captureSource(join(archive, "files")); assert.deepEqual(captured.files, source.files); assert.equal(captured.digest, source.digest);
// Inventory uses path/sha256/bytes key order; source digests use path/bytes/sha256.
const canonical = files.map(({ path, bytes, sha256 }) => ({ path, bytes, sha256 }));
assert.equal(hash(JSON.stringify(canonical)), record.sourceDigest); assert.equal(source.digest, record.sourceDigest);
assert.equal(files.length, record.sourceFiles); assert.equal(files.reduce((n, file) => n + file.bytes, 0), record.sourceBytes);
assert.ok(files.length <= record.bounds.maxFiles && record.sourceBytes <= record.bounds.maxBytes);
for (const file of files) { assert.ok(file.bytes <= record.bounds.maxFileBytes); assert.ok(!file.path.startsWith(record.exactAdditionalExclusion + "/")); }
for (const reference of record.classificationEvidence) {
  const location = reference.path.startsWith(record.exactAdditionalExclusion + "/") ? "diagnosis-markers" : "files";
  const bytes = await regularBytes(join(archive, location), reference.path); assert.equal(hash(bytes), reference.sha256); assert.equal(bytes.length, reference.bytes);
}
const run = join(root, "evals/runs/codex-full-journey-timing-1/full-journey-1/baseline-1"), meta = await read(run, "meta.json");
const frozen = await verifyInputs(meta.inputs); assert.equal(frozen.digest, record.originalInputDigest);
const original = await readTurnHistory(run); assert.equal(original.length, 2); assert.equal(original[1].digest, record.originalResultSha256); assert.equal(original[1].complete, false);
const outer = await read(study, "source-recovery-command/result.json"), terminal = await read(study, "source-recovery-tool-terminal.json"), command = await read(study, "source-recovery-command/command.json");
for (const [path, digest] of Object.entries(outer.rawArtifacts)) assert.equal(hash(await regularBytes(join(study, "source-recovery-command"), path)), digest);
const events = (await regularBytes(study, "source-recovery-command/lifecycle.jsonl")).toString().trim().split("\n").map(JSON.parse);
assert.equal(assertSupervisor(outer, terminal, command, events), join(study, "source-recovery-command"));
assert.equal(command.cwd, root); assert.deepEqual(command.args, ["evals/runs/stage-3-spine-time-1/recover-source.mjs"]);
assert.deepEqual(await read(study, "source-recovery-command/stdout.log"), record);
console.log(json({ archiveIntegrityVerified: true, normalRecoveryClosure: true, sourceFiles: files.length, sourceBytes: record.sourceBytes,
  sourceDigest: source.digest, originalFailedResultPreserved: true, frozenInputs: Object.keys(frozen.hashes).length,
  sourceBasis: "post-closure-source-archive", measurementAndContinuationBinding: "not implemented", acceptance: "not assessed", modelCalls: 0, writes: false }));
