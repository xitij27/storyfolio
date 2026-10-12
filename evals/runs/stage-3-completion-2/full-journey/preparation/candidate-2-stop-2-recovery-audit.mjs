// Read-only post-closure recovery audit. Root executes and preserves stdout.
// No subprocess, browser, model, source write or retroactive snapshot repair.
import assert from "node:assert/strict";
import { lstat, readFile, readdir, realpath } from "node:fs/promises";
import { createHash } from "node:crypto";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

assert.deepEqual(process.argv.slice(2), ["--root-confirmed-closed"]);
const directory = dirname(fileURLToPath(import.meta.url)), root = resolve(directory, "../../../../..");
const started = new Date().toISOString(), cohort = "codex-full-journey-candidate-2";
const inputs = join(root, "evals/runs", cohort, "inputs"), run = join(root, "evals/runs", cohort, "full-journey-1/baseline-1");
const recovery = join(directory, "candidate-2-stop-2-recovery");
const hash = bytes => createHash("sha256").update(bytes).digest("hex");
const json = value => JSON.stringify(value, null, 2) + "\n";
const hashes = {};
function safe(path) { assert.ok(typeof path === "string" && path.length && !path.startsWith("/") && !path.includes("\\") && path.split("/").every(part => part && part !== "." && part !== ".."), path); }
async function bytesAt(base, path) {
  safe(path); assert.equal(await realpath(base), resolve(base));
  let current = base;
  for (const part of path.split("/")) { current = join(current, part); assert.ok(!(await lstat(current)).isSymbolicLink(), current); }
  assert.ok((await lstat(current)).isFile(), current); return readFile(current);
}
async function load(base, path, expected) {
  const bytes = await bytesAt(base, path), digest = hash(bytes);
  if (expected) assert.equal(digest, expected, path);
  hashes[join(base, path)] = digest; return JSON.parse(bytes);
}
async function pathsAt(base, prefix = "") {
  assert.equal(await realpath(base), resolve(base)); const paths = [];
  for (const entry of await readdir(join(base, prefix), { withFileTypes: true })) {
    const path = prefix ? `${prefix}/${entry.name}` : entry.name; safe(path);
    assert.ok(!entry.isSymbolicLink(), path);
    if (entry.isDirectory()) paths.push(...await pathsAt(base, path));
    else { assert.ok(entry.isFile(), path); paths.push(path); }
  }
  return paths.sort();
}
async function verifyInventory(base, manifest, expectedCount) {
  assert.equal(manifest.files.length, expectedCount);
  assert.equal(new Set(manifest.files.map(row => row.path)).size, expectedCount);
  assert.equal(manifest.digest, hash(JSON.stringify(manifest.files)));
  assert.deepEqual(await pathsAt(base), manifest.files.map(row => row.path).sort());
  for (const row of manifest.files) {
    const bytes = await bytesAt(base, row.path); assert.equal(bytes.length, row.bytes, row.path); assert.equal(hash(bytes), row.sha256, row.path);
  }
}

const frozen = await load(inputs, "manifest.json");
assert.equal(frozen.digest, "01b8086923dcb9f03102c84bcec346e29037b469fb4c760334f17a5057185566");
assert.equal(frozen.digest, hash(json(frozen.hashes))); assert.equal(Object.keys(frozen.hashes).length, 149);
for (const [path, digest] of Object.entries(frozen.hashes)) assert.equal(hash(await bytesAt(inputs, path)), digest, path);
const build = await import(pathToFileURL(join(inputs, "implementation/evals/lib/build.mjs")));
assert.deepEqual(await build.verifyInputs(inputs), frozen);
// These are the two complete transitive source-inventory implementation files.
for (const path of ["evals/lib/build-capture.mjs", "evals/lib/source-scope.mjs"]) assert.equal(hash(await bytesAt(root, path)), frozen.hashes[`implementation/${path}`], path);
const { captureSource, SOURCE_EXCLUSIONS } = await import(pathToFileURL(join(inputs, "implementation/evals/lib/build-capture.mjs")));
const meta = await load(run, "meta.json"); assert.equal(meta.inputDigest, frozen.digest); assert.equal(meta.inputs, inputs);
assert.equal(await realpath(meta.work), meta.work); assert.ok((await lstat(meta.work)).isDirectory());
const history = await build.readTurnHistory(run); assert.equal(history.length, 2);
const expectedResults = ["d740dc624fb943648adf2de629f63243ee8da2b3d5966a04b2bfae7fdc967645", "59067a559ac604d2e70ddafedbc7b592dc63d7ba30d4b97085e246511b9ff3a2"];
for (const [index, actor] of history.entries()) {
  assert.equal(actor.digest, expectedResults[index]); assert.equal(actor.complete, true); assert.equal(actor.sessionId, "01a130a7-a4ce-7eb2-bc48-2015a0dab0be");
  assert.equal(Object.keys(actor.artifacts).length, [199, 204][index]);
  const turn = join(run, "turns", String(index + 1).padStart(2, "0"));
  assert.deepEqual(await pathsAt(turn), [...Object.keys(actor.artifacts), "result.json"].sort());
}
const commonHashes = ["f3ce536dbdb60b67685aa134a5209c119b0f6ca81951ab6693ec81807225e46e", "0a2bae4b18059ec216b58844bc05f7dd31d2d5c874cb3098e265efa713bfb056"];
for (const [index, expected] of commonHashes.entries()) {
  const number = index + 1, common = await load(directory, `candidate-2-stop-${number}-integrity-command/stdout.log`, expected);
  assert.equal(common.verified, true); assert.equal(common.inputDigest, frozen.digest); assert.equal(common.resultSha256, history[index].digest);
  const outerDirectory = join(directory, `candidate-2-turn-${number}`), outer = await load(outerDirectory, "result.json", common.hashes.outerResult);
  assert.equal(outer.complete, true); assert.equal(outer.code, 0); assert.equal(outer.interruptedBy, null);
  for (const [path, digest] of Object.entries(outer.rawArtifacts)) assert.equal(hash(await bytesAt(outerDirectory, path)), digest, path);
  const tool = await load(directory, `candidate-2-turn-${number}-tool-poll-${number === 1 ? 5 : 14}.json`, common.hashes.tool);
  assert.equal(tool.result.exit_code, 0); assert.equal(tool.result.session_id, undefined);
  const { output, ...printed } = JSON.parse(tool.result.output); assert.equal(output, outerDirectory); assert.deepEqual(printed, outer);
}
const original = history[1].snapshot;
assert.deepEqual(original, await load(join(run, "turns/02"), "snapshot/manifest.json", "698882bf52f40113cde24fdde5767811131eb452a258db671263aa11f7d61c67"));
assert.equal(Object.keys(original.files).length, 98); assert.ok(!Object.keys(original.files).some(path => path.startsWith("site/")));
const record = await load(recovery, "recovery.json", "96933e373121316876d9b07370a0887d5c715828f8a65bec95821cba41824049");
assert.equal(record.kind, "post-closure source recovery, not original actor snapshot");
assert.equal(record.actorResultSha256, history[1].digest); assert.equal(record.originalWorkspace, meta.work);
assert.equal(record.sourceFiles, 182); assert.equal(record.officialSnapshotFiles, 98); assert.equal(record.sourceUnchangedDuringCopy, true);
const source = await load(recovery, "source/manifest.json", "db72f877d970f41891ac60074d5ecedbe93e8388a54aeb42382d233d29cf9c24");
assert.equal(source.digest, "70a581fce400ea0edb47d5b95bf5a290614d1b5edbcf121952dd04357a733a10");
assert.equal(record.sourceDigest, source.digest); assert.deepEqual(source.exclusions, SOURCE_EXCLUSIONS);
await verifyInventory(join(recovery, "source/files"), source, 182);
for (const [path, row] of Object.entries(original.files)) {
  assert.deepEqual(source.files.find(file => file.path === path), { path, bytes: row.size, sha256: row.hash });
  assert.deepEqual(await bytesAt(join(recovery, "source/files"), path), await bytesAt(join(run, "turns/02/snapshot/files"), path));
}
const additions = source.files.filter(row => !Object.hasOwn(original.files, row.path));
assert.equal(additions.length, 84); assert.ok(additions.every(row => row.path.startsWith("site/"))); assert.deepEqual(additions, record.additionalSource);
const initial = await load(join(run, "setup/snapshot"), "manifest.json"); assert.equal(Object.keys(initial.files).length, 94);
for (const [path, row] of Object.entries(initial.files)) assert.deepEqual(original.files[path], row, path);
assert.deepEqual(await captureSource(meta.work), source);

const checks = await load(recovery, "actor-checks-manifest.json", "a77385c0ca2d83480f480b8041cd9133ef4655ec438a1c2f7b3e901a4cd3fd54");
await verifyInventory(join(recovery, "actor-checks"), checks, 19);
const expectedImages = ["concepts/contact-sheet.jpg"];
for (const concept of ["fixture", "states", "lead"]) for (const viewport of ["desktop", "phone"]) for (const beat of ["opening", "middle", "close"]) expectedImages.push(`concepts/${concept}-${viewport}-${beat}.png`);
assert.deepEqual(checks.files.map(row => row.path).sort(), expectedImages.sort());
await verifyInventory(join(meta.work, "site/checks"), checks, 19);
assert.equal(record.actorChecksFiles, 19); assert.equal(record.actorCheckOriginals, 19);
const provenance = await load(recovery, "native-view-provenance.json", "11cafc3b57da02020d0c7bc7893bf9224b7c1de1339465bd8d9ad8c644e5e938");
const nativePath = "/home/kshitij/.codex/sessions/2026/10/12/rollout-2026-10-12T17-07-37-01a130a7-a4ce-7eb2-bc48-2015a0dab0be.jsonl";
assert.equal(provenance.source, nativePath); assert.equal(provenance.actorSession, history[1].sessionId);
const native = await bytesAt(dirname(nativePath), nativePath.split("/").at(-1));
assert.equal(native.length, provenance.sourceBytes); assert.equal(hash(native), provenance.sourceSha256);
const nativeLines = native.toString().split("\n"); assert.equal(JSON.parse(nativeLines[0]).payload.id, history[1].sessionId);
assert.deepEqual(provenance.events.map(row => row.line), [245, 246, 248]);
const selected = provenance.events.map(row => { const line = nativeLines[row.line - 1] + "\n"; assert.equal(Buffer.byteLength(line), row.bytes); assert.equal(hash(line), row.sha256); return line; });
const saved = await bytesAt(recovery, provenance.savedEvents.path);
assert.equal(saved.length, provenance.savedEvents.bytes); assert.equal(hash(saved), provenance.savedEvents.sha256); assert.deepEqual(saved, Buffer.from(selected.join("")));
const [call, view, output] = selected.map(line => JSON.parse(line));
assert.equal(call.payload.type, "custom_tool_call"); assert.equal(call.payload.name, "exec"); assert.equal(call.payload.call_id, provenance.callId);
const viewedPath = join(meta.work, "site/checks/concepts/contact-sheet.jpg");
assert.equal(call.payload.input, `image((await tools.view_image({path:${JSON.stringify(viewedPath)}})).image_url);\n`);
assert.equal(view.payload.type, "item_completed"); assert.equal(view.payload.item.type, "ImageView"); assert.equal(view.payload.thread_id, history[1].sessionId); assert.equal(view.payload.item.path, "file://" + viewedPath);
assert.equal(output.payload.type, "custom_tool_call_output"); assert.equal(output.payload.call_id, provenance.callId);
const images = output.payload.output.filter(item => item.type === "input_image"); assert.equal(images.length, 1); assert.equal(images[0].detail, "high");
assert.ok(images[0].image_url.startsWith("data:image/jpeg;base64,"));
const delivered = Buffer.from(images[0].image_url.split(",")[1], "base64");
assert.equal(delivered.length, 279152); assert.equal(hash(delivered), "ed15d1dd0980c896de794569c5e4fb10b66c1978bd94321310c6ad4afe846ffd");
const contact = await bytesAt(recovery, provenance.original.path);
assert.equal(contact.length, provenance.original.bytes); assert.equal(hash(contact), provenance.original.sha256); assert.ok(!contact.equals(delivered));
assert.deepEqual(await captureSource(meta.work), source);
hashes.self = hash(await readFile(fileURLToPath(import.meta.url)));
console.log(json({ schemaVersion: 1, verified: true, started, finished: new Date().toISOString(), cohort,
  inputDigest: frozen.digest, frozenInputs: 149, priorArtifacts: 199, turn2Artifacts: 204, sessionId: history[1].sessionId,
  originalSnapshotFiles: 98, recoveredSourceFiles: 182, additionalFiles: 84, additionalRoot: "site", sourceDigest: source.digest, currentLiveEqualsRecovery: true,
  recoveredAt: record.observedAt, actorChecks: 19, originalPngs: 18, originalContactSheets: 1, nativeImageEvents: 3,
  contactOriginalSha256: hash(contact), deliveredImageSha256: hash(delivered), deliveredMatchesOriginalBytes: false, hashes,
  limits: "Independent present-time byte/provenance verification of a later recovery, not complete source identity at actor closure or replacement of the official 98-file snapshot. The unchanged generated-tree exclusion policy applies; excluded generated dependencies/builds are not exhaustively archived. No process-absence or historical-writer-closure proof, visual/behavioral acceptance, measurement eligibility, continuation approval, new actor allowance or Stage 3 completion is inferred. No source, frozen input, actor history or image was changed; no subprocess/model/browser was launched." }));
