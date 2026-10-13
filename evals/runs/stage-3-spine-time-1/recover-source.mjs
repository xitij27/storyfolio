// One additive post-closure archive. No actor writes, model, promotion or retry.
import assert from "node:assert/strict";
import { lstat, mkdir, readdir, realpath } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { DEFAULT_SNAPSHOT, hash, json, readTurnHistory, regularBytes, verifyInputs, writeNew } from "../../lib/build.mjs";
import { SOURCE_EXCLUSIONS, sourceEntryExcluded } from "../../lib/source-scope.mjs";
import { finalCodexMessage } from "../../lib/codex.mjs";
const root = process.cwd(), study = join(root, "evals/runs/stage-3-spine-time-1");
const run = join(root, "evals/runs/codex-full-journey-timing-1/full-journey-1/baseline-1");
const meta = JSON.parse(await regularBytes(run, "meta.json"));
assert.equal(await realpath(meta.work), resolve(meta.work));
const frozen = await verifyInputs(meta.inputs);
assert.equal(frozen.digest, "f94e0ef05af37a3eadb1992f7b22a0b589873fac8d5c4adf5ffe1cf967e23512");
const history = await readTurnHistory(run); assert.equal(history.length, 2);
assert.equal(history[1].digest, "7a7cbf72ccf7963cc665961a486af11b8c49b44f7ea755db217a6ec3f5ac63b6");
assert.equal(history[1].complete, false); assert.equal(history[1].snapshot, undefined);
const diagnosis = JSON.parse(await regularBytes(study, "capture-failure-audit-command/stdout.log"));
assert.equal(diagnosis.nativeTurnCompleted, true); assert.equal(diagnosis.originalResultSha256, history[1].digest);
const excluded = "site/.next-concepts";
const directory = await lstat(join(meta.work, excluded)); assert.ok(directory.isDirectory() && !directory.isSymbolicLink());
const evidence = [];
for (const reference of diagnosis.liveDiagnosisEvidence) {
  const bytes = await regularBytes(meta.work, reference.path);
  assert.equal(hash(bytes), reference.sha256); assert.equal(bytes.length, reference.bytes); evidence.push(reference);
}
assert.equal(JSON.parse(await regularBytes(meta.work, excluded + "/required-server-files.json")).config.distDir, ".next-concepts");
const exclusions = [...SOURCE_EXCLUSIONS, "exact site/.next-concepts, identified by retained config, launcher and generated markers"];
async function capture() {
  const files = []; let total = 0;
  async function visit(prefix = "") {
    assert.ok(prefix.split("/").length <= 32, "Source depth bound");
    for (const entry of (await readdir(join(meta.work, prefix), { withFileTypes: true })).sort((a, b) => a.name.localeCompare(b.name))) {
      const path = prefix ? `${prefix}/${entry.name}` : entry.name;
      assert.ok(!entry.isSymbolicLink(), `Source symlink: ${path}`);
      if (path === excluded) { assert.ok(entry.isDirectory()); continue; }
      if (await sourceEntryExcluded(meta.work, path, entry)) continue;
      if (entry.isDirectory()) await visit(path);
      else {
        assert.ok(entry.isFile(), `Unsupported source entry: ${path}`);
        const stat = await lstat(join(meta.work, path));
        assert.ok(stat.size <= DEFAULT_SNAPSHOT.maxFileBytes, `Source file bound: ${path}`);
        total += stat.size; assert.ok(total <= DEFAULT_SNAPSHOT.maxBytes, "Source byte bound");
        assert.ok(files.length < DEFAULT_SNAPSHOT.maxFiles, "Source count bound");
        const bytes = await regularBytes(meta.work, path); assert.equal(bytes.length, stat.size);
        files.push({ path, bytes: bytes.length, sha256: hash(bytes) });
      }
    }
  }
  await visit(); return { files, digest: hash(JSON.stringify(files)), exclusions };
}
const source = await capture(), output = join(study, "source-recovery-1");
await mkdir(output); // Exclusive attempt: never reuse or overwrite this archive.
await writeNew(join(output, "attempt.json"), json({ started: new Date().toISOString(), originalResultSha256: history[1].digest, sourceBasis: "post-closure-recovery", modelCalls: 0, retries: 0 }));
try {
  for (const file of source.files) {
    const bytes = await regularBytes(meta.work, file.path); assert.equal(hash(bytes), file.sha256); assert.equal(bytes.length, file.bytes);
    await mkdir(dirname(join(output, "files", file.path)), { recursive: true });
    await writeNew(join(output, "files", file.path), bytes);
  }
  for (const file of evidence.filter(file => file.path.startsWith(excluded + "/"))) {
    const target = join(output, "diagnosis-markers", file.path); await mkdir(dirname(target), { recursive: true });
    await writeNew(target, await regularBytes(meta.work, file.path));
  }
  assert.deepEqual(await capture(), source); assert.deepEqual(await verifyInputs(meta.inputs), frozen);
  assert.deepEqual((await readTurnHistory(run)).map(item => item.digest), history.map(item => item.digest));
  for (const file of source.files) { const bytes = await regularBytes(join(output, "files"), file.path); assert.equal(hash(bytes), file.sha256); assert.equal(bytes.length, file.bytes); }
  await writeNew(join(output, "source.json"), json(source));
  const final = finalCodexMessage((await regularBytes(join(run, "turns/02"), "stream.jsonl")).toString(), 0);
  await writeNew(join(output, "native-final.md"), final + "\n");
  const record = { schemaVersion: 1, completed: new Date().toISOString(), kind: "post-closure-source-archive", originalComplete: false,
    originalResultSha256: history[1].digest, originalInputDigest: frozen.digest, sourceDigest: source.digest,
    sourceFiles: source.files.length, sourceBytes: source.files.reduce((n, file) => n + file.bytes, 0),
    originalWork: meta.work, exactAdditionalExclusion: excluded, classificationEvidence: evidence,
    bounds: { maxFiles: DEFAULT_SNAPSHOT.maxFiles, maxBytes: DEFAULT_SNAPSHOT.maxBytes, maxFileBytes: DEFAULT_SNAPSHOT.maxFileBytes },
    modelCalls: 0, originalFilesModified: false, sourceUnchangedDuringArchive: true,
    acceptance: "Source retention only. Not original closure-time proof, measurement binding, concept acceptance or continuation approval" };
  await writeNew(join(output, "result.json"), json(record)); console.log(json(record));
} catch (error) { await writeNew(join(output, "error.json"), json({ error: String(error), originalComplete: false, modelCalls: 0 })); throw error; }
