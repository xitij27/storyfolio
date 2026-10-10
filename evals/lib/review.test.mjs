import assert from "node:assert/strict";
import { test } from "node:test";
import { mkdir, mkdtemp, readFile, readdir, rm, symlink, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { artifactHashes, captureWorkspace, existingRun, hash, inspectInputs, json, populateWorkspace, prepareInputs, reviewPrompt, safePath, verifyInputs, writeNew } from "./review.mjs";

async function fixture(t) {
  const root = await mkdtemp(join(tmpdir(), "storyfolio-review-test-"));
  t.after(() => rm(root, { recursive: true, force: true }));
  const source = { schemaVersion: 1, id: "sample", request: "Review material/repo for hiring managers. Feedback only.",
    materialRoot: "case/material", files: ["repo/index.html", "repo/asset.bin"], criteria: "criteria.md",
    provenance: { commit: "recorded-original-source", dirty: true } };
  for (const [path, bytes] of Object.entries({
    "case/case.json": json(source), "case/material/repo/index.html": '<a href="#contact">Contact</a>',
    "case/material/repo/asset.bin": Buffer.from([0, 255, 128, 7]),
    "case/material/not-allowed.txt": "Never copied", "case/expected.md": "Hidden expected answer",
    "criteria.md": "Assess scope and evidence.", "runner.mjs": "frozen implementation",
    "skills/storyfolio/SKILL.md": "Skill guidance", "skills/storyfolio/references/review.md": "Reference guidance",
  })) await writeNew(join(root, path), bytes);
  return { root, source, runs: join(root, "runs"), casePath: "case/case.json", cohort: "review-1",
    capabilities: { model: "test-model", browser: false }, implementationFiles: ["runner.mjs"] };
}

test("review preparation freezes exact bytes, resumes unchanged and excludes unallowlisted material", async t => {
  const options = await fixture(t);
  const prepared = await prepareInputs(options);
  assert.equal(prepared.manifest.digest, hash(json(prepared.manifest.hashes)));
  assert.deepEqual(await prepareInputs(options), prepared);
  assert.deepEqual(await readFile(join(prepared.inputs, "material/repo/asset.bin")), Buffer.from([0, 255, 128, 7]));
  assert.equal(prepared.manifest.hashes["material/not-allowed.txt"], undefined);
  const work = join(options.root, "work");
  await mkdir(work);
  const baseline = await populateWorkspace(prepared.inputs, work);
  assert.deepEqual((await readdir(work)).sort(), [".agents", "material"]);
  assert.equal(Object.keys(baseline).length, 4);
  await assert.rejects(readFile(join(work, "expected.md")), { code: "ENOENT" });
  await assert.rejects(readFile(join(work, "criteria.md")), { code: "ENOENT" });
  await assert.rejects(readFile(join(work, "material/not-allowed.txt")), { code: "ENOENT" });
  assert.equal(reviewPrompt(options.source.request, "natural"), options.source.request);
  assert.match(reviewPrompt(options.source.request, "explicit"), /Use the \$storyfolio skill/);
});

test("current source, request, criteria, skill, harness or capability drift cannot reuse a cohort", async t => {
  const options = await fixture(t);
  const { inputs } = await prepareInputs(options);
  for (const path of ["case/material/repo/index.html", "criteria.md", "skills/storyfolio/SKILL.md", "runner.mjs"]) {
    const original = await readFile(join(options.root, path));
    await writeFile(join(options.root, path), "changed");
    await assert.rejects(prepareInputs(options), /Current inputs differ/);
    await writeFile(join(options.root, path), original);
  }
  await writeFile(join(options.root, options.casePath), json({ ...options.source, request: "Different request" }));
  await assert.rejects(prepareInputs(options), /Current inputs differ/);
  await writeFile(join(options.root, options.casePath), json(options.source));
  await assert.rejects(prepareInputs({ ...options, capabilities: { model: "different" } }), /Current inputs differ/);
  await verifyInputs(inputs);
});

test("frozen evidence tampering, additions and incomplete preparation fail closed", async t => {
  const options = await fixture(t);
  const { inputs } = await prepareInputs(options);
  const location = join(inputs, "material/repo/index.html");
  const original = await readFile(location);
  await writeFile(location, "tampered");
  await assert.rejects(prepareInputs(options), /Frozen input changed/);
  await writeFile(location, original);
  await writeFile(join(inputs, "unexpected.txt"), "injected");
  await assert.rejects(verifyInputs(inputs), /file set changed/);
  await mkdir(join(options.runs, "incomplete", "inputs"), { recursive: true });
  await assert.rejects(prepareInputs({ ...options, cohort: "incomplete" }), { code: "ENOENT" });
});

test("allowlisted inputs cannot traverse directories, include Git metadata or follow symlinks", async t => {
  const options = await fixture(t);
  for (const path of ["../secret", "/secret", "repo/.git/config", "repo\\file", "repo//file"]) assert.throws(() => safePath(path));
  await symlink(join(options.root, "criteria.md"), join(options.root, "case/material/repo/link.txt"));
  await writeFile(join(options.root, options.casePath), json({ ...options.source, files: ["repo/link.txt"] }));
  await assert.rejects(inspectInputs(options), /Symlink input/);
  await writeFile(join(options.root, options.casePath), json({ ...options.source, files: ["repo/index.html", "repo/index.html"] }));
  await assert.rejects(inspectInputs(options), /unique file allowlist/);
});

test("workspace collection preserves changed binary bytes, additions, deletions and symlinks without following them", async t => {
  const options = await fixture(t);
  const { inputs } = await prepareInputs(options);
  const work = join(options.root, "work"), out = join(options.root, "out");
  await mkdir(work);
  const baseline = await populateWorkspace(inputs, work);
  await rm(join(work, "material/repo/index.html"));
  const changed = Buffer.from([255, 0, 254]);
  await writeFile(join(work, "material/repo/asset.bin"), changed);
  await writeNew(join(work, "material/repo/added.txt"), "new source");
  await writeNew(join(work, "review.md"), "Findings");
  await symlink("/nonexistent-outside-secret", join(work, "material/repo/link"));
  const changes = await captureWorkspace(work, out, baseline);
  assert.deepEqual(changes.map(change => [change.path, change.change]), [
    ["material/repo/added.txt", "added"], ["material/repo/asset.bin", "modified"],
    ["material/repo/index.html", "deleted"], ["material/repo/link", "added"], ["review.md", "added"],
  ]);
  assert.equal(changes.find(change => change.type === "symlink").target, "/nonexistent-outside-secret");
  assert.deepEqual(await readFile(join(out, "files/material/repo/asset.bin")), changed);
  assert.deepEqual(await readFile(join(inputs, "material/repo/asset.bin")), Buffer.from([0, 255, 128, 7]));
  assert.equal(await readFile(join(out, "files/review.md"), "utf8"), "Findings");
});

test("completed runs require matching identity and unchanged artifacts; incomplete runs never silently retry", async t => {
  const options = await fixture(t);
  const out = join(options.root, "run");
  const identity = { inputDigest: "frozen", invocation: "natural", rep: 1 };
  assert.equal(await existingRun(out, identity), null);
  await writeNew(join(out, "meta.json"), json({ ...identity, complete: false }));
  await assert.rejects(existingRun(out, identity), /incomplete run is preserved/);
  await writeFile(join(out, "meta.json"), json({ ...identity, complete: true }));
  await assert.rejects(existingRun(out, identity), /lacks preserved artifacts/);
  await writeNew(join(out, "turn1.jsonl"), '{"type":"turn.completed"}\n');
  await writeNew(join(out, "turn1.md"), "Saved review\n");
  const meta = { ...identity, complete: true, outputHashes: await artifactHashes(out) };
  await writeFile(join(out, "meta.json"), json(meta));
  assert.deepEqual(await existingRun(out, identity), meta);
  await assert.rejects(existingRun(out, { ...identity, inputDigest: "different" }), /identity differs/);
  await assert.rejects(writeNew(join(out, "turn1.md"), "overwrite"), { code: "EEXIST" });
  await writeFile(join(out, "turn1.md"), "changed");
  await assert.rejects(existingRun(out, identity), /artifact changed/);
});
