// One frozen, source-bound measurement launch. Root retains terminal tool records.
import assert from "node:assert/strict";
import { createWriteStream } from "node:fs";
import { mkdir, readFile, realpath } from "node:fs/promises";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { parseArgs } from "node:util";
import { verifyInputs, writeNew } from "../../lib/review.mjs";
import { captureSource } from "../../lib/build-capture.mjs";
import { outsideWorkspace } from "../../lib/build-check.mjs";
import { runBounded } from "../../runs/stage-3-candidate-verification-1/bounded-process.mjs";
import { sha, json, ENVELOPE, validateTargets, eligibility } from "./measurement-lib.mjs";

const { values: o } = parseArgs({ options: Object.fromEntries(["run", "targets", "out", "dependencies", "settlement"].map(key => [key, { type: "string" }])) });
for (const key of ["run", "targets", "out", "dependencies", "settlement"]) assert.ok(o[key], `Missing --${key}`);
const run = await realpath(o.run), meta = JSON.parse(await readFile(join(run, "meta.json"))), inputs = await realpath(meta.inputs);
const frozen = await verifyInputs(inputs); assert.equal(meta.inputDigest, frozen.digest); assert.equal(meta.caseId, "bench-entry-1");
// The wrapper itself must be the frozen copy, not a post-outcome revision.
assert.equal(await realpath(fileURLToPath(import.meta.url)), join(inputs, "implementation/evals/builds/bench-entry-1/measurement-run.mjs"));
const actorBytes = await readFile(join(run, "turns/01/result.json")), actor = JSON.parse(actorBytes);
assert.ok(actor.snapshot?.files && Object.keys(actor.snapshot.files).length, "Final actor snapshot required");
const settlementBytes = await readFile(o.settlement), settlement = JSON.parse(settlementBytes);
assert.equal(settlement.actorResultSha256, sha(actorBytes)); assert.equal(settlement.closed, true); assert.ok(settlement.finished && settlement.reviewer);
assert.ok(Array.isArray(settlement.evidence) && settlement.evidence.length, "Saved process/tool closure evidence required");
for (const record of settlement.evidence) { assert.ok(outsideWorkspace(meta.work, await realpath(record.path))); assert.equal(sha(await readFile(record.path)), record.sha256, "Settlement evidence changed"); }
const targetBytes = await readFile(o.targets), targets = JSON.parse(targetBytes), expected = JSON.parse(await readFile(join(inputs, "expectations.json")));
assert.deepEqual(validateTargets(targets, expected), []); assert.equal(targets.actorResultSha256, sha(actorBytes));
const before = await captureSource(meta.work); assert.equal(targets.sourceDigest, before.digest);
assert.deepEqual(Object.fromEntries(before.files.map(file => [file.path, { type: "file", hash: file.sha256, size: file.bytes }])), actor.snapshot.files, "Current application differs from final actor snapshot");
for (const [path, record] of Object.entries(actor.snapshot.files)) { const bytes = await readFile(join(run, "turns/01/snapshot/files", path)); assert.equal(sha(bytes), record.hash); assert.equal(bytes.length, record.size); }
for (const record of targets.discovery.sources) assert.equal(sha(await readFile(join(meta.work, record.path))), record.sha256, "Public discovery source changed");
const capabilities = JSON.parse(await readFile(join(inputs, "capabilities.json"))), runtime = JSON.parse(await readFile(join(run, "setup/runtime-environment.json")));
assert.equal(process.execPath, capabilities.node.executable); assert.equal(process.version, capabilities.node.version);
const environment = { ...capabilities.environment, TMPDIR: runtime.TMPDIR, NEXT_TELEMETRY_DISABLED: "1" };
assert.ok(environment.TMPDIR);
const output = resolve(o.out); assert.ok(outsideWorkspace(meta.work, output)); await mkdir(output); assert.ok(outsideWorkspace(meta.work, await realpath(output)));
const review = join(output, "review"), artifacts = join(output, "artifacts"); await mkdir(review);
await writeNew(join(review, "single-attempt.json"), json({ schemaVersion: 1, started: new Date().toISOString(), actorResultSha256: sha(actorBytes), actorComplete: actor.complete, actorTimedOut: actor.timedOut, inputDigest: frozen.digest, settlementSha256: sha(settlementBytes), targetsSha256: sha(targetBytes), modelCalls: 0, retries: 0, eligibility: eligibility(targets) }));
await writeNew(join(review, "source-before.json"), json(before)); await writeNew(join(review, "observed-targets.json"), targetBytes); await writeNew(join(review, "settlement.json"), settlementBytes);
if (!eligibility(targets).captureUseful) {
  await writeNew(join(review, "skipped.json"), json({ ...eligibility(targets), status: "not demonstrated; browser measurement skipped", actorComplete: actor.complete, scope: "No authored implementation. An authored broken application must instead attempt this measurement." }));
  console.log(json({ skipped: true, success: false, output }));
} else {
  const args = [join(inputs, "implementation/evals/builds/bench-entry-1/measurement.mjs"), `--workspace=${meta.work}`, `--targets=${join(review, "observed-targets.json")}`, `--expectations=${join(inputs, "expectations.json")}`, `--out=${artifacts}`, `--dependencies=${await realpath(o.dependencies)}`];
  await writeNew(join(review, "command.json"), json({ executable: process.execPath, args, cwd: meta.work, environment, ...ENVELOPE, inputDigest: frozen.digest, workerSha256: sha(await readFile(args[0])), limitations: "895000 ms work plus at most 5000 ms orderly shutdown. Timer scheduling jitter is retained. Owned worker escalation does not prove every detached descendant exited; perform read-only post-run process review." }));
  const events = createWriteStream(join(review, "lifecycle.jsonl"), { flags: "wx" });
  const execution = await runBounded({ executable: process.execPath, args, cwd: meta.work, env: { ...process.env, ...environment }, ...ENVELOPE, onEvent: event => events.write(JSON.stringify(event) + "\n"), onStdout: bytes => process.stdout.write(bytes), onStderr: bytes => process.stderr.write(bytes) });
  await new Promise(done => events.end(done));
  await writeNew(join(review, "process.json"), json(execution));
  process.exitCode = execution.code === 0 && !execution.timedOut && !execution.externalSignal ? 0 : 1;
}
const after = await captureSource(meta.work); await writeNew(join(review, "source-after.json"), json(after));
await writeNew(join(review, "source-comparison.json"), json({ sourceUnchanged: json(before) === json(after), beforeDigest: before.digest, afterDigest: after.digest, sourceFiles: before.files.length, strictActorSnapshotIdentity: json(before) === json(after), actorDeliveryComplete: actor.complete }));
assert.deepEqual(after, before); assert.equal(sha(await readFile(o.targets)), sha(targetBytes)); assert.equal(sha(await readFile(join(run, "turns/01/result.json"))), sha(actorBytes)); await verifyInputs(inputs);
