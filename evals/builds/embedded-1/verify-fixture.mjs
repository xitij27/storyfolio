#!/usr/bin/env node
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Fixture consistency, not a website test. Source hashes are checked against
// the historical revision before a manifest can be refreshed.
const fixture = path.dirname(fileURLToPath(import.meta.url));
const repository = path.resolve(fixture, '../../..');
const historicalRevision = 'da3c20238d5dc840328753aa0ac4ff5abc53a740';
const refresh = process.argv.slice(2).join(' ') === '--refresh';
assert(process.argv.length === 2 || refresh, 'Usage: node verify-fixture.mjs [--refresh]');
const digest = (bytes) => createHash('sha256').update(bytes).digest('hex');
const json = async (file) => JSON.parse(await readFile(file, 'utf8'));
const sourceRoots = [
  'evals/people/embedded',
  'evals/runs/codex-opening-1/embedded/with-2',
];

async function filesBelow(directory, prefix = '') {
  const found = [];
  for (const item of (await readdir(directory, { withFileTypes: true })).sort((a, b) => a.name.localeCompare(b.name))) {
    const relative = prefix ? `${prefix}/${item.name}` : item.name;
    assert(!item.isSymbolicLink(), `Symlink is not allowed in fixture/source: ${relative}`);
    if (item.isDirectory()) found.push(...await filesBelow(path.join(directory, item.name), relative));
    else if (item.isFile()) found.push(relative);
    else assert.fail(`Unsupported file type: ${relative}`);
  }
  return found;
}

async function fileRecord(root, relative) {
  const bytes = await readFile(path.join(root, relative));
  return { path: relative, bytes: bytes.byteLength, sha256: digest(bytes) };
}

const historicalInputs = [];
for (const relativeRoot of sourceRoots) {
  for (const relative of await filesBelow(path.join(repository, relativeRoot))) {
    const source = `${relativeRoot}/${relative}`;
    const record = await fileRecord(repository, source);
    const committed = execFileSync('git', ['show', `${historicalRevision}:${source}`], { cwd: repository, maxBuffer: 64 * 1024 * 1024 });
    assert.equal(record.sha256, digest(committed), `Historical source changed: ${source}`);
    historicalInputs.push(record);
  }
}

const workspace = path.join(fixture, 'workspace');
const workspaceFiles = await filesBelow(workspace);
assert(!workspaceFiles.includes('package.json'), 'Starting fixture must not contain an application');
assert(!workspaceFiles.some((file) => /(^|\/)(node_modules|\.next|\.git)(\/|$)/.test(file)), 'Generated/checkout data in fixture');
const workspaceRecords = await Promise.all(workspaceFiles.map((file) => fileRecord(workspace, file)));
const inventory = {
  schemaVersion: 1,
  id: 'embedded-1',
  moment: 'Before engine scaffold and dependency preparation',
  existingSite: false,
  packageManifestPresent: false,
  note: 'Static fixture data only. The runner must capture the actual prepared inventory, tool capabilities and enabled/disabled skills; this is not an actor machine check.',
  files: workspaceRecords,
};

const expected = await json(path.join(fixture, 'expectations.json'));
assert.equal(expected.id, 'embedded-1');
assert.equal(expected.schemaVersion, 1);
assert.equal(expected.beats.length, 7);
assert.equal(expected.chapters.length, 6);
assert.equal(expected.checklist.length, 11);
const ids = [...expected.chapters.map((chapter) => chapter.id), ...expected.beats.map((beat) => beat.id)];
assert.equal(new Set(ids).size, ids.length, 'Chapter and beat IDs share one namespace');
assert.deepEqual(expected.chapters.flatMap((chapter) => chapter.beatIds), expected.beats.map((beat) => beat.id));
assert.equal(expected.contentConstraints.pieceCount, 6);
assert.equal(expected.modes.desktop, 'animated');
for (const mode of ['mobile', 'reducedMotion', 'noWebGL', 'noJavaScript']) assert.equal(expected.modes[mode], 'static');

const confirmedText = await readFile(path.join(workspace, 'docs/story/confirmations.md'), 'utf8');
const storyboard = await readFile(path.join(workspace, 'docs/story/storyboard.md'), 'utf8');
const assetNotes = await readFile(path.join(workspace, 'docs/story/assets.md'), 'utf8');
for (const sentence of expected.requiredText) assert(confirmedText.includes(sentence), `Missing frozen wording: ${sentence}`);
for (const beat of expected.beats) assert(storyboard.includes(beat.id) && storyboard.includes(beat.heading), `Missing storyboard beat: ${beat.id}`);
for (const file of [...expected.assets, ...expected.requiredFiles]) assert(workspaceFiles.includes(file), `Missing fixture file: ${file}`);
for (const file of expected.assets) assert(assetNotes.includes(file.replace(/^public/, '')), `Asset provenance missing: ${file}`);
for (const link of expected.links) {
  if (link.href.startsWith('/')) assert(workspaceFiles.includes(`public${link.href}`), `Missing link target: ${link.href}`);
  if (link.href.startsWith('#')) assert(expected.chapters.some((chapter) => `#${chapter.id}` === link.href), `Missing anchor target: ${link.href}`);
}
for (const original of ['cv.md', 'lab-notes.md']) {
  assert.equal(digest(await readFile(path.join(workspace, 'material', original))), digest(await readFile(path.join(repository, 'evals/people/embedded/material', original))), `Source material changed: ${original}`);
}
const conceptSource = await readFile(path.join(repository, 'evals/runs/codex-opening-1/embedded/with-2/files/docs/story/concepts.md'), 'utf8');
const conceptCopy = await readFile(path.join(workspace, 'docs/story/concepts.md'), 'utf8');
assert(conceptCopy.endsWith(conceptSource.replaceAll('\u2014', ':')), 'Historical concept body must differ only in documented punctuation');
for (const file of workspaceFiles) {
  const content = await readFile(path.join(workspace, file), 'utf8');
  assert(!content.includes('\u2014'), `Em dash in fixture: ${file}`);
  if (/\.(svg|html)$/.test(file)) {
    assert(!/<script\b|\son\w+\s*=|(?:href|src)\s*=\s*["'](?:https?:)?\/\//i.test(content), `Active/external asset resource: ${file}`);
    assert(!content.includes('data:'), `Embedded data asset is not expected: ${file}`);
  }
}

if (refresh) await writeFile(path.join(fixture, 'workspace-inventory.json'), `${JSON.stringify(inventory, null, 2)}\n`);
else assert.deepEqual(await json(path.join(fixture, 'workspace-inventory.json')), inventory, 'Before-scaffold inventory drifted');

// Protocol, reports and future run data are coordinator-owned and frozen by
// the runner. Only this explicit fixture allowlist is included here.
const artifacts = [
  'README.md', 'expectations.json', 'verify-fixture.mjs', 'workspace-inventory.json',
  ...workspaceFiles.map((file) => `workspace/${file}`),
].sort();
const manifest = {
  schemaVersion: 1,
  id: 'embedded-1',
  createdDate: '2026-10-11',
  historicalRevision,
  historicalInputs,
  fixtureArtifacts: await Promise.all(artifacts.map((file) => fileRecord(fixture, file))),
  note: 'All original source bytes match the recorded historical revision. Fixture artifacts are new derivatives. This manifest excludes itself; the run freezes protocol/configuration, this manifest and its external expectations separately.',
};
if (refresh) await writeFile(path.join(fixture, 'source-manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`);
else assert.deepEqual(await json(path.join(fixture, 'source-manifest.json')), manifest, 'Fixture/source manifest drifted');
console.log(`Fixture verified: ${historicalInputs.length} unchanged historical files; ${workspaceFiles.length} starting files; 7 beats; 6 chapters; 11 checklist decisions; 5 local public assets. No application or paid run is verified by this check.`);
