// Archive existing actor diagnostics only. No model, build, browser or overwrite.
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { constants } from 'node:fs';
import { copyFile, lstat, mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const cohort = dirname(fileURLToPath(import.meta.url));
const source = '/var/tmp/storyfolio-freeze-runtime-20261011/storyfolio-evals/build-bench-depth-1-55RyeV/checks';
const destination = join(cohort, 'actor-checks');
const streamPath = join(cohort, 'bench-depth-1/baseline-1/turns/01/stream.jsonl');
const sha256 = bytes => createHash('sha256').update(bytes).digest('hex');
const rawStream = await readFile(streamPath);
assert.equal(sha256(rawStream), '233a97910bc8e51a1d8d765676f33faf75f3012f89984c03e7cf1e0bfab527c4');
const events = rawStream.toString('utf8').trimEnd().split('\n').map(JSON.parse);
const commands = events.filter(event => event.type === 'item.completed' && event.item?.type === 'command_execution').map(event => event.item);
const trees = [
  { path: '2026-10-11T19-45-44-023Z', events: ['item_17', 'item_20'], meaning: 'Initial production build failure' },
  { path: '2026-10-11T19-46-04-320Z', events: ['item_21', 'item_23'], meaning: 'Successful build and browser library-path failures' },
  { path: '2026-10-11T19-46-44-211Z', events: ['item_25', 'item_35'], meaning: 'First full seven-case actor browser matrix and contact sheets' },
  { path: '2026-10-11T19-49-39-906Z', events: ['item_40', 'item_46', 'item_48', 'item_51'], meaning: 'Full seven-case matrix after scene revisions and contact sheets' },
  { path: '2026-10-11T19-53-11-524Z', events: ['item_52', 'item_58'], meaning: 'Final fallback-only matrix and contact sheets' },
  { path: 'prototype-extra', events: ['item_43', 'item_45', 'item_50', 'item_55', 'item_63', 'item_64'], meaning: 'Latest retained supplemental viewport/keyboard reports, images, log and contact sheets; earlier same-path outputs may have been overwritten by the actor' },
];
for (const tree of trees) {
  for (const id of tree.events) assert.ok(commands.some(command => command.id === id), id);
}

async function assertParents(path) {
  let current = path;
  while (current !== dirname(current)) {
    const info = await lstat(current);
    assert.ok(info.isDirectory() && !info.isSymbolicLink(), `Non-directory or symlink: ${current}`);
    current = dirname(current);
  }
}
await assertParents(source);
await assertParents(cohort);
const files = [];
async function inventory(relative) {
  const path = join(source, relative), info = await lstat(path);
  assert.equal(info.isSymbolicLink(), false, `Symlink: ${path}`);
  if (info.isDirectory()) {
    for (const entry of (await readdir(path)).sort()) await inventory(join(relative, entry));
  } else {
    assert.ok(info.isFile(), `Non-regular file: ${path}`);
    const bytes = await readFile(path);
    files.push({ path: relative, bytes: bytes.length, sha256: sha256(bytes) });
  }
}
for (const tree of trees) await inventory(tree.path);
const bytes = files.reduce((sum, file) => sum + file.bytes, 0);
const manifest = {
  schemaVersion: 1, date: '2026-10-11', modelCalls: 0, source, sourceStream: 'bench-depth-1/baseline-1/turns/01/stream.jsonl',
  sourceStreamSha256: sha256(rawStream), provenance: 'Existing actor-owned diagnostics archived after the completed turn. No commands were rerun; this is not independent acceptance.',
  exclusions: ['setup-capability, separately preserved inherited coordinator setup evidence'],
  trees, fileCount: files.length, bytes, files,
  limitations: ['Hashes bind bytes at archival time; most ignored files were not hashed by the original post-turn snapshot.', 'Referenced source revisions vary across capture trees.', 'The actor reused prototype-extra paths; only the remaining latest bytes can be archived.'],
};
if (process.argv.includes('--inventory')) {
  process.stdout.write(JSON.stringify({ fileCount: files.length, bytes, trees: trees.map(tree => ({ ...tree, files: files.filter(file => file.path.startsWith(tree.path + '/')).length })) }, null, 2) + '\n');
} else {
  await mkdir(destination); // Existing archive is an error; never overwrite it.
  for (const file of files) {
    const from = join(source, file.path), to = join(destination, file.path);
    assert.equal((await lstat(from)).isSymbolicLink(), false);
    assert.equal(sha256(await readFile(from)), file.sha256, `Source changed: ${file.path}`);
    await mkdir(dirname(to), { recursive: true });
    await copyFile(from, to, constants.COPYFILE_EXCL);
    assert.equal(sha256(await readFile(to)), file.sha256, `Copied bytes differ: ${file.path}`);
  }
  await writeFile(join(destination, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n', { flag: 'wx' });
  process.stdout.write(JSON.stringify({ archived: true, destination, fileCount: files.length, bytes, modelCalls: 0, overwrites: false }, null, 2) + '\n');
}
