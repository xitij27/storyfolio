// One additive post-closure archive of turn 4, derived from ../recover-source.mjs. No actor writes, model, promotion or retry.
import assert from "node:assert/strict";
import { lstat, mkdir, readdir, realpath } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { DEFAULT_SNAPSHOT, hash, json, regularBytes, verifyInputs, writeNew } from "../../../lib/build.mjs";
import { SOURCE_EXCLUSIONS, sourceEntryExcluded } from "../../../lib/source-scope.mjs";
const root = process.cwd(), study = join(root, "evals/runs/stage-3-spine-time-1");
const run = join(root, "evals/runs/codex-full-journey-timing-1/full-journey-1/baseline-1");
const turn = join(study, "recovery/continuation/turns/04");
const turn4ResultSha256 = "434c0cdf7bdda2bdcbe42589fbb57ebc0d26deda0a0afc821cf1bba8976987b7";
const meta = JSON.parse(await regularBytes(run, "meta.json"));
assert.equal(await realpath(meta.work), resolve(meta.work));
const frozen = await verifyInputs(meta.inputs);
assert.equal(frozen.digest, "f94e0ef05af37a3eadb1992f7b22a0b589873fac8d5c4adf5ffe1cf967e23512");
// Turn 4 completed natively; only its capture failed.
const resultBytes = await regularBytes(turn, "result.json"), result = JSON.parse(resultBytes);
assert.equal(hash(resultBytes), turn4ResultSha256); assert.equal(result.turn, 4); assert.equal(result.requestedStop, 4);
assert.equal(result.complete, false); assert.equal(result.snapshot, undefined); assert.equal(result.timedOut, false); assert.equal(result.interruptedBy, null); assert.deepEqual(result.errors, []);
assert.equal(result.captureError, "Error: Snapshot byte bound exceeded: site/.next-concepts/cache/turbopack/v16.3.8-b0fad0d4/00000001.sst");
for (const [path, digest] of Object.entries(result.artifacts)) assert.equal(hash(await regularBytes(turn, path)), digest, `Turn-4 artifact changed: ${path}`);
const last = JSON.parse((await regularBytes(turn, "stream.jsonl")).toString().trim().split("\n").at(-1));
assert.equal(last.type, "turn.completed"); assert.deepEqual(last.usage, result.usage);
// The turn started from turn 3's snapshot.
const turn3Source = JSON.parse(await regularBytes(join(study, "recovery/continuation/turns/03/snapshot"), "source.json"));
assert.equal(JSON.parse(await regularBytes(join(turn, "before"), "source.json")).digest, turn3Source.digest);
const excluded = "site/.next-concepts";
const directory = await lstat(join(meta.work, excluded)); assert.ok(directory.isDirectory() && !directory.isSymbolicLink());
const markers = ["required-server-files.json", "BUILD_ID"].map(name => `${excluded}/${name}`);
assert.equal(JSON.parse(await regularBytes(meta.work, markers[0])).config.distDir, ".next-concepts");
const exclusions = [...SOURCE_EXCLUSIONS, "exact site/.next-concepts, identified by site/next.config.ts, the actor's serve scripts and generated markers"];
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
const source = await capture(), output = join(study, "recovery/source-recovery-4");
await mkdir(output); // Exclusive attempt: never reuse or overwrite this archive.
await writeNew(join(output, "attempt.json"), json({ started: new Date().toISOString(), originalResultSha256: turn4ResultSha256, sourceBasis: "post-closure-recovery", modelCalls: 0, retries: 0 }));
try {
  for (const file of source.files) {
    const bytes = await regularBytes(meta.work, file.path); assert.equal(hash(bytes), file.sha256); assert.equal(bytes.length, file.bytes);
    await mkdir(dirname(join(output, "files", file.path)), { recursive: true });
    await writeNew(join(output, "files", file.path), bytes);
  }
  const evidence = [];
  for (const path of markers) {
    const bytes = await regularBytes(meta.work, path), target = join(output, "diagnosis-markers", path);
    await mkdir(dirname(target), { recursive: true }); await writeNew(target, bytes); evidence.push({ path, bytes: bytes.length, sha256: hash(bytes) });
  }
  assert.deepEqual(await capture(), source); assert.deepEqual(await verifyInputs(meta.inputs), frozen);
  assert.equal(hash(await regularBytes(turn, "result.json")), turn4ResultSha256);
  for (const file of source.files) { const bytes = await regularBytes(join(output, "files"), file.path); assert.equal(hash(bytes), file.sha256); assert.equal(bytes.length, file.bytes); }
  await writeNew(join(output, "source.json"), json(source));
  const record = { schemaVersion: 1, completed: new Date().toISOString(), kind: "post-closure-source-archive", turn: 4, originalComplete: false,
    originalResultSha256: turn4ResultSha256, originalInputDigest: frozen.digest, previousSourceDigest: turn3Source.digest, sourceDigest: source.digest,
    sourceFiles: source.files.length, sourceBytes: source.files.reduce((n, file) => n + file.bytes, 0),
    originalWork: meta.work, exactAdditionalExclusion: excluded, classificationEvidence: evidence,
    bounds: { maxFiles: DEFAULT_SNAPSHOT.maxFiles, maxBytes: DEFAULT_SNAPSHOT.maxBytes, maxFileBytes: DEFAULT_SNAPSHOT.maxFileBytes },
    modelCalls: 0, originalFilesModified: false, sourceUnchangedDuringArchive: true,
    acceptance: "Source retention only. Not original closure-time proof, measurement binding, look acceptance or continuation approval" };
  await writeNew(join(output, "result.json"), json(record)); console.log(json(record));
} catch (error) { await writeNew(join(output, "error.json"), json({ error: String(error), originalComplete: false, modelCalls: 0 })); throw error; }
