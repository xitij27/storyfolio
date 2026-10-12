// Read-only post-turn binding/discovery inventory. No browser, build or mutation.
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve, join } from "node:path";
import { fileURLToPath } from "node:url";
import { captureSource } from "../codex-bench-entry-baseline-1/inputs/implementation/evals/lib/build-capture.mjs";
import { hash, verifyInputs } from "../codex-bench-entry-baseline-1/inputs/implementation/evals/lib/review.mjs";
const study = fileURLToPath(new URL(".", import.meta.url)), run = resolve(study, "../codex-bench-entry-baseline-1/bench-entry-1/baseline-1");
const meta = JSON.parse(await readFile(join(run, "meta.json"))), frozen = await verifyInputs(meta.inputs);
const actorBytes = await readFile(join(run, "turns/01/result.json")), actor = JSON.parse(actorBytes), source = await captureSource(meta.work);
assert.equal(frozen.digest, meta.inputDigest);
const actual = Object.fromEntries(source.files.map(file => [file.path, file]));
const missing = [], different = [];
for (const [path, record] of Object.entries(actor.snapshot.files)) {
  const saved = await readFile(join(run, "turns/01/snapshot/files", path));
  assert.equal(hash(saved), record.hash, `Saved source hash changed: ${path}`); assert.equal(saved.length, record.size);
  if (!actual[path]) missing.push(path);
  else if (actual[path].sha256 !== record.hash || actual[path].bytes !== record.size) different.push(path);
}
const extra = source.files.filter(file => !actor.snapshot.files[file.path]);
const paths = ["app/page.tsx", "app/sketch/[id]/page.tsx", "content/sketches/index.ts", "content/looks.ts", "content/index.ts", "content/story.ts", "content/copy.ts", "content/experience.tsx", "content/formations.ts", "content/apparatus.tsx", "content/links.ts", "content/extras/relationships.tsx", "components/story/story.tsx", "components/story/chapter.tsx", "components/story/look-switch.tsx", "components/story/use-look.ts", "components/story/rail.tsx", "lib/story/looks.ts", "docs/story/handover.md", "docs/story/decided-for-you.md"];
const discoverySources = paths.map(path => { assert.ok(actual[path]); return { path, sha256: actual[path].sha256, bytes: actual[path].bytes }; });
const conversation = {};
for (const path of ["turns/01/reply.md", "turns/01/stream.jsonl", "turns/01/process.json", "turns/01/result.json"]) { const bytes = await readFile(join(run, path)); conversation[path] = { sha256: hash(bytes), bytes: bytes.length }; }
console.log(JSON.stringify({ schemaVersion: 1, checkedAt: new Date().toISOString(), workspace: meta.work, inputDigest: frozen.digest, frozenInputFiles: Object.keys(frozen.hashes).length, actorResultSha256: hash(actorBytes), actorComplete: actor.complete, actorTimedOut: actor.timedOut, actorDurationMs: actor.durationMs, snapshotFiles: Object.keys(actor.snapshot.files).length, unexpected: actor.snapshot.unexpected, capturedFiles: source.files.length, strictSourceIdentity: !extra.length && !missing.length && !different.length, missing, different, extra, source, discoverySources, conversation, limits: "Source-only discovery. No browser, test, process mutation, new exclusions, or semantic/visual pass. Source subset equality does not satisfy the frozen exact-set gate." }, null, 2));
