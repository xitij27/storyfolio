import { readFile, readdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';

// Read-only verification, run from the repository root. Never modifies capture
// outputs, the retained actor snapshot or a browser workspace.
const base = 'evals/runs/codex-bench-depth-baseline-2/bench-depth-2/baseline-1';
const hash = bytes => createHash('sha256').update(bytes).digest('hex');
const read = async path => {
  const bytes = await readFile(path);
  return { path, bytes: bytes.length, sha256: hash(bytes), value: JSON.parse(bytes) };
};
const inventory = await read(`${base}/acceptance-review/animated-review/viewed-images.json`);
const manifest = await read(`${base}/acceptance/manifest.json`);
const snapshot = await read(`${base}/turns/01/snapshot/manifest.json`);
const errors = [];
const actual = [];
const modes = [];
for (const mode of ['desktop', 'mobile', 'short']) {
  const directory = `${base}/acceptance/${mode}`;
  const report = await read(`${directory}/report.json`);
  const images = (await readdir(directory)).filter(name => /\.(png|jpe?g)$/i.test(name)).sort();
  actual.push(...images.map(name => `${directory}/${name}`));
  modes.push({ mode, originals: images.length, report: { path: report.path, bytes: report.bytes, sha256: report.sha256 }, sourceDigest: report.value.sourceDigest, problems: report.value.problems, controlInventoryComplete: report.value.controlInventoryComplete });
  if (report.value.sourceDigest !== manifest.value.sourceBefore.digest) errors.push(`source mismatch in ${mode}`);
  if (report.value.problems.length) errors.push(`technical problems in ${mode}`);
}
const reviewed = inventory.value.images;
const reviewedPaths = reviewed.map(image => image.path);
const missing = actual.filter(path => !reviewedPaths.includes(path));
const extra = reviewedPaths.filter(path => !actual.includes(path));
if (missing.length || extra.length) errors.push('reviewed/generated original path sets differ');
if (new Set(reviewedPaths).size !== reviewedPaths.length) errors.push('duplicate reviewed path');
const imageMismatches = [];
for (const image of reviewed) {
  const bytes = await readFile(image.path);
  if (bytes.length !== image.bytes || hash(bytes) !== image.sha256 || image.viewMethod !== 'view_image original') imageMismatches.push(image.path);
}
if (imageMismatches.length) errors.push('reviewed image identity mismatch');
const before = manifest.value.sourceBefore.files;
const after = manifest.value.sourceAfter?.files ?? [];
const beforeMap = new Map(before.map(file => [file.path, file]));
const afterMap = new Map(after.map(file => [file.path, file]));
const snapshotEntries = Object.entries(snapshot.value.files).filter(([, file]) => file.type === 'file');
const snapshotMap = new Map(snapshotEntries);
const sourceMismatches = [];
for (const [path, file] of beforeMap) {
  const saved = snapshotMap.get(path), final = afterMap.get(path);
  if (!saved || saved.hash !== file.sha256 || saved.size !== file.bytes) sourceMismatches.push(`snapshot:${path}`);
  if (!final || final.sha256 !== file.sha256 || final.bytes !== file.bytes) sourceMismatches.push(`after:${path}`);
  const bytes = await readFile(`${base}/turns/01/snapshot/files/${path}`);
  if (hash(bytes) !== file.sha256 || bytes.length !== file.bytes) sourceMismatches.push(`saved-bytes:${path}`);
}
for (const path of snapshotMap.keys()) if (!beforeMap.has(path)) sourceMismatches.push(`snapshot-extra:${path}`);
for (const path of afterMap.keys()) if (!beforeMap.has(path)) sourceMismatches.push(`after-extra:${path}`);
if (sourceMismatches.length) errors.push('capture/snapshot source identity mismatch');
if (manifest.value.complete !== true) errors.push('capture incomplete');
if (manifest.value.sourceBefore.digest !== manifest.value.sourceAfter?.digest) errors.push('before/after source digest mismatch');
const sourceFiles = [];
for (const relative of ['content/apparatus.tsx', 'content/faces.ts', 'content/formations.ts', 'content/index.ts', 'components/story/face-material.ts', 'components/story/pieces.tsx']) {
  const path = `${base}/turns/01/snapshot/files/${relative}`;
  const bytes = await readFile(path);
  sourceFiles.push({ path, bytes: bytes.length, sha256: hash(bytes) });
}
console.log(JSON.stringify({
  schemaVersion: 1, command: `node ${base}/acceptance-review/animated-review/verify-reviewed.mjs`,
  passed: errors.length === 0, errors,
  capture: { path: manifest.path, bytes: manifest.bytes, sha256: manifest.sha256, complete: manifest.value.complete, finished: manifest.value.finished, sourceBefore: manifest.value.sourceBefore.digest, sourceAfter: manifest.value.sourceAfter?.digest, frozen: manifest.value.frozen },
  snapshot: { path: snapshot.path, bytes: snapshot.bytes, sha256: snapshot.sha256, fileCount: snapshotEntries.length },
  inventory: { path: inventory.path, bytes: inventory.bytes, sha256: inventory.sha256, reviewed: reviewed.length, generated: actual.length, missing, extra, imageMismatches },
  modes, sourceMismatches, sourceFiles,
  limits: 'Verifies retained identities and declared view coverage, not visual quality, every animation frame, a physical phone or author approval.'
}, null, 2));
if (errors.length) process.exitCode = 1;
