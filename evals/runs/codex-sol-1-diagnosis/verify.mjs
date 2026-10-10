// Recompute this diagnosis without starting any paid conversation or judge.
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { ROOT, RUNS, loadPerson, peopleIds, readJson } from "../../lib/files.mjs";
import { criteria, failures, meetsBar } from "../../lib/score.mjs";
import { summariseCodex } from "../../lib/codex.mjs";

const base = dirname(fileURLToPath(import.meta.url));
const manifest = await readJson(join(base, "manifest.json"));
const hash = async path => createHash("sha256").update(await readFile(path)).digest("hex");
assert.equal(await hash(join(ROOT, "evals/prompts/judge.md")), manifest.rubricSha256);

const counts = { without: { completed: 0, passed: 0 }, with: { completed: 0, passed: 0 } };
const failedSkillRuns = [];
for (const id of await peopleIds()) {
  const person = await loadPerson(id);
  for (const arm of ["without", "with"]) for (const rep of [1, 2]) {
    const dir = join(RUNS, manifest.sourceIteration, id, `${arm}-${rep}`);
    const meta = await readJson(join(dir, "meta.json"));
    const judged = await readJson(join(dir, "judgement.json"));
    assert.equal(meta.complete, true);
    assert.equal(meta.model, "gpt-6.1-sol");
    assert.equal(meta.reasoningEffort, "medium");
    assert.equal(meta.turns.length, 3);
    assert.ok(meta.turns.every(t => !t.failed));
    assert.equal(judged.judge, manifest.judge);
    assert.equal(judged.reasoningEffort, manifest.reasoningEffort);
    assert.deepEqual(judged.judgement.traps.map(t => t.id).sort(), person.traps.map(t => t.id).sort());
    const scored = criteria(judged.judgement, person, meta);
    counts[arm].completed++;
    counts[arm].passed += Number(meetsBar(scored));
    if (arm === "with") {
      assert.equal(meta.skillUsed, true);
      if (!meetsBar(scored)) failedSkillRuns.push({ run: `${id}/${arm}-${rep}`, failures: failures(scored) });
    }
  }
}
assert.deepEqual(counts, { without: { completed: 20, passed: 0 }, with: { completed: 20, passed: 12 } });

const comparisons = [];
for (const run of manifest.runs) {
  const source = join(ROOT, run.source);
  const target = join(ROOT, run.target);
  for (const [name, expected] of Object.entries(run.inputSha256)) {
    assert.equal(await hash(join(source, name)), expected, `source changed: ${name}`);
    assert.equal(await hash(join(target, name)), expected, `copy changed: ${name}`);
  }
  assert.equal(await hash(join(source, "judgement.json")), run.originalJudgementSha256);
  assert.equal(await hash(join(source, "judge-prompt.md")), run.originalJudgePromptSha256);
  assert.equal(await hash(join(target, "judge-prompt.md")), run.originalJudgePromptSha256);
  const meta = await readJson(join(source, "meta.json"));
  const person = await loadPerson(meta.person);
  const old = await readJson(join(source, "judgement.json"));
  const fresh = await readJson(join(target, "judgement.json"));
  assert.equal(fresh.judge, manifest.judge);
  assert.equal(fresh.reasoningEffort, manifest.reasoningEffort);
  const stream = summariseCodex(await readFile(join(target, "judge.jsonl"), "utf8"));
  assert.equal(stream.failed, false);
  assert.equal(stream.commands.length, 0);
  assert.deepEqual(JSON.parse(stream.reply), fresh.judgement);
  assert.deepEqual(fresh.judgement.traps.map(t => t.id).sort(), person.traps.map(t => t.id).sort());
  const before = criteria(old.judgement, person, meta);
  const after = criteria(fresh.judgement, person, meta);
  comparisons.push({
    source: run.source,
    identicalPrompt: true,
    originalPass: meetsBar(before),
    repeatedPass: meetsBar(after),
    originalFailures: failures(before),
    repeatedFailures: failures(after),
    changedCriteria: Object.keys(before).filter(k => before[k] !== after[k]).map(k => ({ criterion: k, before: before[k], after: after[k] })),
    usage: fresh.usage,
  });
}

const result = { counts, failedSkillRuns, comparisons };
await writeFile(join(base, "verification.json"), JSON.stringify(result, null, 2) + "\n");
console.log(JSON.stringify(result, null, 2));
