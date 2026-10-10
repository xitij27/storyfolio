// Verify the saved cohort and its committed inputs without starting a model.
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join, resolve } from "node:path";
import { criteria, failures, meetsBar, tally } from "../../lib/score.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "../../..");
const json = async path => JSON.parse(await readFile(path, "utf8"));
const manifest = await json(join(here, "manifest.json"));
const git = (...args) => execFileSync("git", ["-C", root, ...args]);
const source = path => git("show", `${manifest.fixtureCommit}:${path}`);
for (const [path, expected] of Object.entries(manifest.sha256)) {
  assert.equal(createHash("sha256").update(source(path)).digest("hex"), expected, path);
}

const rows = [];
for (const id of manifest.people) {
  const person = JSON.parse(source(`evals/people/${id}/person.json`).toString());
  for (const arm of manifest.arms) {
    const dir = join(here, id, `${arm}-1`);
    const meta = await json(join(dir, "meta.json"));
    const judged = await json(join(dir, "judgement.json"));
    assert.equal(meta.person, id);
    assert.equal(meta.arm, arm);
    assert.equal(meta.rep, 1);
    assert.equal(meta.iteration, manifest.iteration);
    assert.equal(meta.runner, "codex");
    assert.equal(meta.model, manifest.agentModel);
    assert.equal(meta.reasoningEffort, manifest.reasoningEffort);
    assert.equal(meta.complete, true);
    assert.equal(meta.turns.length, 3);
    assert.equal(meta.said.length, 3);
    for (let i = 1; i <= 3; i++) {
      assert.equal(meta.turns[i - 1].failed, false);
      assert.ok((await readFile(join(dir, `turn${i}.md`), "utf8")).trim());
      assert.ok((await readFile(join(dir, `turn${i}.jsonl`), "utf8")).trim());
    }
    if (arm === "with") {
      assert.equal(meta.skill.uncommitted, false);
      assert.equal(git("rev-parse", `${meta.skill.commit}:skills/storyfolio`).toString().trim(), manifest.skillTree);
    } else assert.equal(meta.skill, null);
    assert.equal(judged.runner, "codex");
    assert.equal(judged.judge, manifest.judgeModel);
    assert.equal(judged.reasoningEffort, manifest.reasoningEffort);
    assert.deepEqual(judged.judgement.traps.map(t => t.id).sort(), person.traps.map(t => t.id).sort());
    assert.ok((await readFile(join(dir, "judge-prompt.md"), "utf8")).trim());
    for (const path of meta.written) await readFile(join(dir, "files", path));
    const score = criteria(judged.judgement, person, meta);
    rows.push({ arm, criteria: score, id, passes: meetsBar(score), misses: failures(score) });
  }
}
assert.equal(rows.length, 12);
console.log(JSON.stringify({
  conversations: rows.length,
  inputHashes: Object.keys(manifest.sha256).length,
  bars: Object.fromEntries(manifest.arms.map(arm => [arm, rows.filter(r => r.arm === arm && r.passes).length])),
  tally: tally(rows),
  cases: rows.map(({ id, arm, passes, misses }) => ({ id, arm, passes, misses })),
}, null, 2));
