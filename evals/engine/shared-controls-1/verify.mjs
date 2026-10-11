// Read-only hash checks, plus a new no-overwrite verification result artifact.
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const study = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(study, "../../..");
const hash = file => createHash("sha256").update(readFileSync(file)).digest("hex");
const json = file => JSON.parse(readFileSync(file, "utf8"));
const output = path.join(study, "browser-verification.json");
if (existsSync(output)) throw new Error(`Will not overwrite ${output}`);
const baseline = json(path.join(study, "baseline/source-manifest.json"));
const patched = json(path.join(study, "patched/source-manifest.json"));
assert.deepEqual(Object.keys(baseline.engineSha256), Object.keys(patched.engineSha256));
const differences = Object.keys(baseline.engineSha256).filter(file => baseline.engineSha256[file] !== patched.engineSha256[file]);
assert.deepEqual(differences, ["components/story/story.tsx"]);
assert.deepEqual(baseline.fixtureSha256, patched.fixtureSha256);
assert.equal(hash(path.join(root, "skills/storyfolio/engine/components/story/story.tsx")), patched.engineSha256["components/story/story.tsx"]);
const result = { schemaVersion: 1, verifiedAt: new Date().toISOString(), node: process.version,
  engineDifferences: differences, fixtureIdentical: true, sourceAndArtifactsUnchanged: true, variants: {}, harnessSha256: {} };
for (const name of ["baseline", "patched"]) {
  const manifestFile = path.join(study, name, "source-manifest.json");
  const manifest = json(manifestFile);
  const expected = { ...manifest.engineSha256, ...manifest.fixtureSha256 };
  for (const [file, expectedHash] of Object.entries(expected)) assert.equal(hash(path.join(study, "runtime", name, file)), expectedHash, `${name} runtime ${file}`);
  for (const [file, expectedHash] of Object.entries(manifest.fixtureSha256)) assert.equal(hash(path.join(study, "fixture", file)), expectedHash, `fixture ${file}`);
  assert.equal(hash(path.join(study, name, "story.tsx.original")), manifest.engineSha256["components/story/story.tsx"]);
  const reportFile = path.join(study, name, "capture-1/browser.json");
  const report = json(reportFile);
  assert.equal(report.sourceManifestSha256, hash(manifestFile));
  assert.equal(report.probeSha256, hash(path.join(study, name, "capture-1/browser.mjs.original")));
  assert.equal(report.probeSha256, hash(path.join(study, "browser.mjs")));
  for (const [file, item] of Object.entries(report.artifacts)) assert.equal(hash(path.join(study, file)), item.sha256, `image ${file}`);
  assert.equal(report.passed, true);
  for (const check of ["build", "typecheck", "lint"]) assert.match(readFileSync(path.join(study, name, `${check}.log`), "utf8"), /\nExit 0\n$/);
  result.variants[name] = { sourceFilesChecked: Object.keys(expected).length, sourceManifestSha256: hash(manifestFile),
    reportSha256: hash(reportFile), cases: report.cases.map(item => ({ name: item.name, result: item.result })),
    imagesVerified: Object.keys(report.artifacts).length,
    checkLogSha256: Object.fromEntries(["build", "typecheck", "lint"].map(check => [check, hash(path.join(study, name, `${check}.log`))])) };
}
for (const file of ["prepare.mjs", "run-check.mjs", "browser.mjs", "verify.mjs"]) result.harnessSha256[file] = hash(path.join(study, file));
writeFileSync(output, `${JSON.stringify(result, null, 2)}\n`);
console.log(JSON.stringify(result, null, 2));
