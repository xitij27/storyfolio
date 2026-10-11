// Read-only verification of retained local proof. Never invokes Codex or a model.
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile, readdir } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createPagedEvidence, verifyPageCoverage } from "../../lib/judge-transport.mjs";

const study = dirname(fileURLToPath(import.meta.url)), root = resolve(study, "../../..");
const hash = bytes => createHash("sha256").update(bytes).digest("hex");
const readJson = async path => JSON.parse(await readFile(path, "utf8"));
const report = await readJson(join(study, "capture-1/result.json"));
for (const [path, sha256] of Object.entries(report.sourceHashes)) assert.equal(hash(await readFile(join(root, path))), sha256, `Calibration source drift: ${path}`);
for (const item of report.results) {
  const bytes = await readFile(join(root, item.path)), prompt = bytes.toString("utf8");
  assert.equal(hash(bytes), item.originalSha256);
  assert.equal(item.reconstructedSha256, item.originalSha256);
  assert.equal(bytes.length, item.originalBytes);
  assert.equal(item.exactReconstruction, true);
  const packet = JSON.parse(prompt.slice(prompt.indexOf('\n{\n  "schemaVersion"') + 1));
  const bundle = createPagedEvidence(prompt, { documents: packet.documents.map(({ path, sha256, bytes, selection, text }) => ({ path, sha256, bytes, ...(selection === undefined ? {} : { selection }), selectedTextSha256: hash(text), selectedTextBytes: Buffer.byteLength(text) })) });
  assert.equal(bundle.digest, item.bundleDigest);
  assert.deepEqual(verifyPageCoverage(bundle, await readFile(join(study, item.ledger), "utf8")), item.coverage);
}
const tests = await readFile(join(study, "repository-tests.tap"), "utf8");
assert.match(tests, /# tests 305\n# suites 31\n# pass 305\n# fail 0\n/);
assert.doesNotMatch(tests, /not ok|truncated output/);
assert.match(tests, /Accessor final state: gone/);
const cli = await readJson(join(study, "cli-result.json"));
assert.equal(cli.completeMcpTableReplacesEarlierTable, true);
assert.equal(cli.modelCalls, 0);
assert.equal(hash(await readFile(cli.executable)), cli.cliSha256);
const evidence = {};
async function scan(prefix = "") {
  for (const entry of (await readdir(join(study, prefix), { withFileTypes: true })).sort((a, b) => a.name.localeCompare(b.name))) {
    const path = prefix ? `${prefix}/${entry.name}` : entry.name;
    if (path === "runtime" || path === "verification.json") continue;
    assert(!entry.isSymbolicLink());
    if (entry.isDirectory()) await scan(path);
    else evidence[path] = hash(await readFile(join(study, path)));
  }
}
await scan();
console.log(JSON.stringify({ schemaVersion: 1, kind: "local-transport-evidence-verification", node: process.version,
  results: { historicalPromptsUnchanged: true, exactFullPromptReconstruction: true, sourceHashesMatch: true,
    deliveryLedgersMatch: true, repositoryTests: { tests: 305, suites: 31, passed: 305, failed: 0 },
    actualAccessorTerminated: true, cliBinaryAndConfigurationProofMatch: true },
  sourceHashes: report.sourceHashes, evidence, modelCalls: 0,
  limitations: report.limitations,
}, null, 2));
