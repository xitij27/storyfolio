// Root-only copy of the manual prototype, never evaluated actor output.
import assert from 'node:assert/strict';
import { mkdir, mkdtemp, readFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { captureSource, regularBytes, writeNew, hash, json } from '../../full-journey-measurement/binding-lib.mjs';
import { validateTargets } from '../../full-journey-measurement/measurement-lib.mjs';
const root = resolve('.'), original = join(root, 'prototypes/fixture-study');
const out = join(root, 'evals/runs/stage-3-completion-2/full-journey/calibration-1');
const source = await captureSource(original);
await mkdir(out);
const work = await mkdtemp('/var/tmp/storyfolio-entry-runtime-20261012/storyfolio-evals/journey-calibration-');
await writeNew(join(out, 'allocation.json'), json({ work, original, scope: 'Manual prototype copy for no-model prospective worker calibration, not journey evidence', modelCalls: 0, retries: 0 }));
for (const file of source.files) await writeNew(join(work, file.path), await regularBytes(original, file.path));
assert.deepEqual(await captureSource(work), source);
assert.deepEqual(await captureSource(original), source);
await writeNew(join(out, 'source.json'), json(source));
await writeNew(join(out, 'snapshot.json'), json({ schemaVersion: 1, files: Object.fromEntries(source.files.map(file => [file.path, { type: 'file', hash: file.sha256, size: file.bytes }])) }));
const common = { schemaVersion: 1, measurement: 'full-journey', sourceDigest: source.digest, actorResultSha256: hash(Buffer.from('CALIBRATION ONLY: NO ACTOR RESULT')),
  discovery: { reviewer: 'root, manual prototype source review', exhaustive: true, sources: ['app/page.tsx', 'content/story.ts', 'content/looks.ts'].map(path => ({ path, sha256: source.files.find(file => file.path === path).sha256 })) },
  eligibility: { disposition: 'implemented-output', authoredApplication: true, rationale: 'Known manually authored five-beat prototype, fresh copy, no actor lifecycle claim' }, calibrationOnly: true };
const gate = { ...common, stage: 4, alternatives: [{ id: 'bench', advertised: true, route: '/', control: null, beats: { opening: 'opening.assembly', middle: 'middle.relationship', ending: 'close.evidence' }, meaning: 'Actual single Bench look. Expected count failure against the unchanged two-to-three-look journey policy.' }] };
const ids = ['opening.assembly', 'power.cycle', 'middle.relationship', 'proof.boundaries', 'close.evidence'];
const text = '01 / THE QUESTION Between code and the bench. How do you connect a firmware decision to something you can actually observe? I wrote the firmware, scheduled the power states and built the bring-up fixture for Mosslink, an environmental sensor. Firmware is code that controls a physical device. ↓ Follow the work';
const versions = [{ meaning: ids[0], version: 'Actual manual prototype opening, not a simulated author choice', text }];
const selectionPath = 'evals/runs/stage-3-completion-2/full-journey/calibration-1/selection.json';
await writeNew(join(root, selectionPath), json({ schemaVersion: 1, calibrationOnly: true, selectedVersions: versions, scope: 'Exact opening text transcribed from manual app/page.tsx solely to calibrate full-text matching; no actual choice or journey gate' }));
const final = { ...common, stage: 6, route: '/', beats: ids.map((id, index) => ({ id, headingLevel: index ? 2 : 1, meaning: id })), approvedBeats: ids.map(id => ({ meaning: id, actualId: id })),
  requiredText: [text], selectedWording: { record: { path: selectionPath, sha256: hash(await readFile(join(root, selectionPath))) }, versions }, links: [], assets: [], requiredFiles: [], auxiliaryPages: [],
  focusOnlyControls: [{ selector: 'body:nth-of-type(1) > main:nth-of-type(1) > a:nth-of-type(1)', name: 'Skip to the evidence', href: '#proof', reason: 'Existing first link in manual app/page.tsx, revealed on focus and jumps into main story evidence' }],
  focusOnlyAttestation: { purpose: 'document-start-to-main-story', reviewedByRoot: true, sourcePath: 'app/page.tsx' } };
assert.deepEqual(validateTargets(gate), []); assert.deepEqual(validateTargets(final), []);
await writeNew(join(out, 'gate-targets.json'), json(gate)); await writeNew(join(out, 'final-targets.json'), json(final));
await writeNew(join(out, 'protocol.md'), '# Prospective local calibration\n\nNo model or actor output is used. The copied manual prototype and source\nremain unchanged. One offline install precedes one gate capture, one final\nbuild and one desktop capture, each separately invoked with the existing\nfinite bounds and no automatic retry. The gate has one actual look, so the\nunchanged policy must report the two-to-three-look count failure. The final\nsource has five actual beats, so the unchanged policy must report the\n12-to-22-beat count failure. These expected negatives must not be removed\nor padded away. Process closure, source integrity, rendering, artifact and\ncoverage assertions are examined separately. Every emitted original will\nbe reviewed. This is not a full-journey or Stage 3 pass.\n');
console.log(json({ work, original, files: source.files.length, sourceDigest: source.digest, output: out, expectedCountFailures: ['one look', 'five beats'], modelCalls: 0 }));
