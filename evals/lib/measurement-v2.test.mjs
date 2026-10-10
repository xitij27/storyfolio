import assert from "node:assert/strict";
import { test } from "node:test";
import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { cohortPath, json, prepareCohort, readSavedJudgement, recordedPerson, sourceIds, verifyCohort, versionedPrompt, writeNew } from "./measurement-v2.mjs";
import { ROOT, readJson } from "./files.mjs";
import { JUDGE_MODEL, EFFORT } from "./codex.mjs";

test("resume rejects a valid judgement from another saved run or runner", async t => {
  const dir = await mkdtemp(join(tmpdir(), "storyfolio-v2-test-"));
  t.after(() => rm(dir, { recursive: true, force: true }));
  const person = recordedPerson({ person: "student", harnessCommit: "13f7ced" }).person;
  const original = await readJson(join(ROOT, "evals/runs/codex-sol-1/student/with-1/judgement.json"));
  const judgement = { ...original.judgement, traps: original.judgement.traps.map(trap => ({
    id: trap.id, raised_or_excluded: trap.handled === "asked", raised_evidence: trap.evidence,
    asserted: trap.handled === "asserted", asserted_evidence: trap.evidence,
  })) };
  const id = "old/student/with-1";
  const good = { source: id, runner: "codex", rubricVersion: "2", judge: JUDGE_MODEL, reasoningEffort: EFFORT, judgement };
  await writeFile(join(dir, "judgement.json"), json(good));
  assert.deepEqual(await readSavedJudgement(dir, id, person), good);
  for (const change of [{ source: "old/student/with-2" }, { runner: "another-runner" }]) {
    await writeFile(join(dir, "judgement.json"), json({ ...good, ...change }));
    await assert.rejects(readSavedJudgement(dir, id, person), /saved judge envelope/);
  }
});

test("only a missing judgement schedules work, while existing null or false fails", async t => {
  const dir = await mkdtemp(join(tmpdir(), "storyfolio-v2-test-"));
  t.after(() => rm(dir, { recursive: true, force: true }));
  const id = "old/student/with-1";
  assert.equal(await readSavedJudgement(dir, id, {}), undefined);
  for (const bad of [null, false, {}, []]) {
    await writeFile(join(dir, "judgement.json"), json(bad));
    await assert.rejects(readSavedJudgement(dir, id, {}), /saved judge envelope/);
  }
});

test("scoring fixtures come from the source harness commit, with no silent current-file fallback", () => {
  const recorded = recordedPerson({ person: "student", harnessCommit: "13f7ced" });
  assert.equal(recorded.person.id, "student");
  assert.equal(recorded.person.traps.length, 5);
  assert.equal(recorded.fixture.harnessCommit, "13f7ced");
  assert.equal(Object.keys(recorded.fixture.hashes).length, 2);
  assert.throws(() => recordedPerson({ person: "student" }), /harnessCommit/);
  assert.throws(() => recordedPerson({ person: "../student", harnessCommit: "13f7ced" }), /person ID/);
});

test("source selection is explicit and cannot target a source cohort or escape runs", () => {
  assert.deepEqual(sourceIds("beta/student/with-2,alpha/student/without-1"), ["alpha/student/without-1", "beta/student/with-2"]);
  for (const value of [undefined, "", "../student/with-1", "alpha/student/with-1,alpha/student/with-1"]) assert.throws(() => sourceIds(value));
  assert.throws(() => cohortPath("alpha", ["alpha/student/with-1"]));
  assert.throws(() => cohortPath("../alpha", ["beta/student/with-1"]));
});

test("v2 preserves the exact original evidence and resolved example instruction", () => {
  const prefix = "Original supplied evidence\n\n";
  const original = prefix + "# What to report\nold instructions\n**copied_example.** No example applies. Answer false.\n";
  const template = "unused template evidence\n# What to report\nnew instructions\n**copied_example.** {{example}}\n";
  assert.equal(versionedPrompt(original, template), prefix + "# What to report\nnew instructions\n**copied_example.** No example applies. Answer false.\n");
  assert.throws(() => versionedPrompt("no marker", template));
});

test("preparing and resuming never replace originals; source or snapshot drift fails closed", async t => {
  const root = await mkdtemp(join(tmpdir(), "storyfolio-v2-test-"));
  t.after(() => rm(root, { recursive: true, force: true }));
  const id = "old/student/with-1";
  const source = join(root, id);
  await mkdir(source, { recursive: true });
  const files = {
    "meta.json": json({ runner: "codex", complete: true, person: "student", iteration: "old", arm: "with", rep: 1, harnessCommit: "13f7ced" }),
    "judgement.json": json({ judge: "old-judge", judgement: { historical: true } }),
    "judge-prompt.md": "Pinned evidence\n# What to report\n**copied_example.** No example applies. Answer false.\n",
    "turn1.md": "The original reply\n",
  };
  for (const [name, bytes] of Object.entries(files)) await writeFile(join(source, name), bytes);
  await writeFile(join(root, "old/report.md"), "Original report\n");
  const manifest = await prepareCohort("new", [id], root);
  assert.equal(manifest.rubricVersion, "2");
  assert.deepEqual(await prepareCohort("new", [id], root), manifest);
  for (const [name, bytes] of Object.entries(files)) assert.equal(await readFile(join(source, name), "utf8"), bytes);
  const output = join(root, "new");
  await verifyCohort(output, root);
  await assert.rejects(writeNew(join(source, "judgement.json"), "replacement"), { code: "EEXIST" });
  await writeFile(join(source, "turn1.md"), "changed");
  await assert.rejects(verifyCohort(output, root), /source files changed/);
  await writeFile(join(source, "turn1.md"), files["turn1.md"]);
  await writeFile(join(root, "old/report.md"), "changed");
  await assert.rejects(verifyCohort(output, root), /reports changed/);
  await writeFile(join(root, "old/report.md"), "Original report\n");
  await writeFile(join(output, "cases", id, "judge-prompt.md"), "changed");
  await assert.rejects(verifyCohort(output, root), /snapshot judge-prompt.md changed/);
});

test("a pre-existing non-v2 output directory is never adopted or overwritten", async t => {
  const root = await mkdtemp(join(tmpdir(), "storyfolio-v2-test-"));
  t.after(() => rm(root, { recursive: true, force: true }));
  const id = "old/student/with-1";
  const source = join(root, id);
  await mkdir(source, { recursive: true });
  await writeFile(join(source, "meta.json"), json({ runner: "codex", complete: true, person: "student", iteration: "old", arm: "with", rep: 1, harnessCommit: "13f7ced" }));
  await writeFile(join(source, "judgement.json"), "{}\n");
  await writeFile(join(source, "judge-prompt.md"), "Evidence\n# What to report\n**copied_example.** Answer false.\n");
  await mkdir(join(root, "existing"));
  await assert.rejects(prepareCohort("existing", [id], root), { code: "EEXIST" });
});
