import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { lstat, readFile, readdir } from 'node:fs/promises';
import { resolve, relative, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const fixture = fileURLToPath(new URL('.', import.meta.url));
const root = resolve(fixture, '../../..');
const sha256 = bytes => createHash('sha256').update(bytes).digest('hex');
const manifest = JSON.parse(await readFile(join(fixture, 'source-manifest.json'), 'utf8'));
const config = JSON.parse(await readFile(join(fixture, 'case.json'), 'utf8'));
assert.equal(manifest.schemaVersion, 1);
assert.equal(manifest.id, config.id);
assert.equal(config.id, 'embedded-completion-1');
assert.equal(config.setupMode, 'existing-site');
assert.deepEqual(config.requestedStops, [5, 6]);
assert.deepEqual(config.refusalTurns, [1, 2]);
assert.deepEqual(config.bounds, { maxTurns: 2, turnTimeoutMs: 900000, maxWallMs: 1500000, maxTokens: 12000000, maxUncachedTokens: 350000 });
assert.deepEqual(config.prompts, ['evals/prompts/build-completion-turn1.md', 'evals/prompts/build-turn3.md']);
assert.equal(config.workspaceRoot, 'evals/builds/embedded-completion-1/workspace');
assert.equal(config.rubric, 'evals/prompts/build-criteria.md');

async function bytesAt(base, path) {
  assert.ok(path && !path.startsWith('/') && !path.split('/').some(part => !part || part === '.' || part === '..'), `Unsafe path ${path}`);
  let current = base;
  for (const part of path.split('/')) {
    current = join(current, part);
    assert.ok(!(await lstat(current)).isSymbolicLink(), `Symlink ${path}`);
  }
  assert.ok((await lstat(current)).isFile(), `Not a file ${path}`);
  return readFile(current);
}

async function filesAt(base, prefix = '') {
  const files = [];
  for (const entry of await readdir(join(base, prefix), { withFileTypes: true })) {
    const path = prefix ? `${prefix}/${entry.name}` : entry.name;
    if (entry.isDirectory()) files.push(...await filesAt(base, path));
    else { assert.ok(entry.isFile(), `Unsupported entry ${path}`); files.push(path); }
  }
  return files.sort();
}

const originalBytes = await bytesAt(root, manifest.sourceSnapshotManifest.path);
assert.equal(originalBytes.length, manifest.sourceSnapshotManifest.bytes);
assert.equal(sha256(originalBytes), manifest.sourceSnapshotManifest.sha256);
const original = JSON.parse(originalBytes);
const source = join(root, manifest.sourceSnapshot, 'files');
const included = manifest.included.map(row => row.path);
const excluded = manifest.excluded.map(row => row.path);
const all = [...included, ...excluded].sort();
assert.equal(new Set(all).size, all.length, 'Duplicate include/exclude path');
assert.deepEqual(all, Object.keys(original.files).sort(), 'Include/exclude partition differs from original manifest');
assert.deepEqual(all, await filesAt(source), 'Original snapshot inventory changed');
assert.deepEqual(config.files, included, 'Case allowlist differs from provenance');
assert.deepEqual([...included].sort(), await filesAt(join(fixture, 'workspace')), 'Workspace has missing or extra files');
for (const row of [...manifest.included, ...manifest.excluded]) {
  const bytes = await bytesAt(source, row.path);
  assert.equal(bytes.length, row.bytes, `Source size ${row.path}`);
  assert.equal(sha256(bytes), row.sha256, `Source hash ${row.path}`);
  assert.deepEqual(original.files[row.path], { type: 'file', hash: row.sha256, size: row.bytes });
  if (included.includes(row.path)) {
    assert.deepEqual(await bytesAt(join(fixture, 'workspace'), row.path), bytes, `Copied bytes ${row.path}`);
    assert.ok(!row.path.startsWith('.agents/'));
    assert.ok(!['next-env.d.ts', 'docs/story/environment-setup.json'].includes(row.path));
  } else assert.ok(row.reason, `Unexplained exclusion ${row.path}`);
}
assert.deepEqual(manifest.sourceSnapshotOmissions.excluded, original.excluded);
assert.deepEqual(manifest.sourceSnapshotOmissions.unexpected, original.unexpected);
assert.equal(config.expectations, manifest.coordinatorContract.expectations);
const expectationsBytes = await bytesAt(root, config.expectations);
assert.equal(sha256(expectationsBytes), manifest.coordinatorContract.expectationsSha256, 'Completion expectations changed');
const expectations = JSON.parse(expectationsBytes);
assert.equal(expectations.id, manifest.coordinatorContract.expectedFixtureId);
assert.equal(expectations.id, config.id, 'Judge acceptance identity must match current case');
const originalExpectations = await bytesAt(root, manifest.coordinatorContract.originalExpectations);
assert.equal(sha256(originalExpectations), manifest.coordinatorContract.originalExpectationsSha256, 'Original expectations changed');
const oldId = `"id": "${manifest.coordinatorContract.originalFixtureId}"`;
assert.equal(originalExpectations.toString().split(oldId).length, 2);
assert.deepEqual(expectationsBytes, Buffer.from(originalExpectations.toString().replace(oldId, `"id": "${expectations.id}"`)), 'Only the root identity may differ');
assert.equal(expectations.beats.length, 7);
for (const path of [config.protocol, config.rubric, ...config.prompts, ...config.implementationFiles]) await bytesAt(root, path);

console.log(JSON.stringify({
  passed: true,
  fixture: relative(root, fixture),
  sourceManifestSha256: manifest.sourceSnapshotManifest.sha256,
  includedFiles: included.length,
  excludedFiles: excluded.length,
  workspaceBytes: manifest.included.reduce((total, row) => total + row.bytes, 0),
  expectationId: expectations.id,
  originalExpectationId: manifest.coordinatorContract.originalFixtureId,
  unchangedRequirements: true,
  expectedBeats: expectations.beats.length,
  modelCalls: 0,
  dependencyInstalls: 0,
}, null, 2));
