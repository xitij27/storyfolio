// Deterministic contracts and historical packet parity only. No model calls.
import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { codexArgs } from "../../../lib/codex.mjs";
import { ACTOR_MODEL, JUDGE_MODEL, BOUNDS, ORDER, accounting, judgeBrief, messages, nextUnit, planningArgs, remaining, validateJudgement } from "./contracts.mjs";
const root = fileURLToPath(new URL("../../../../", import.meta.url));
const read = path => readFile(join(root, path), "utf8"), object = async path => JSON.parse(await read(path));
const walk = async (directory, prefix = "") => {
  const paths = [];
  for (const entry of await readdir(join(root, directory, prefix), { withFileTypes: true })) {
    const path = prefix ? prefix + "/" + entry.name : entry.name;
    if (entry.isDirectory()) paths.push(...await walk(directory, path)); else paths.push(path);
  }
  return paths.sort();
};
const good = () => ({ complete: true, durationMs: 1000, usage: { input_tokens: 100, cached_input_tokens: 50, output_tokens: 10 } });
test("planning argv remains byte-for-byte shared planning configuration for actor, resume and judge", () => {
  for (const options of [{ model: ACTOR_MODEL, disabled: ["/example/SKILL.md"] }, { model: ACTOR_MODEL, sessionId: "same-session" }, { model: JUDGE_MODEL, judge: true, schema: "/schema.json" }]) {
    assert.deepEqual(planningArgs(options), codexArgs(options));
    assert.ok(planningArgs(options).includes("project_doc_max_bytes=0"));
    assert.ok(!planningArgs(options).includes("project_doc_max_bytes=32768"));
  }
});
test("fixed order contains exactly six conversations, eighteen turns and six judges", () => {
  assert.equal(ORDER.length, 24);
  assert.equal(ORDER.filter(row => row.unit === "judge").length, 6);
  assert.equal(new Set(ORDER.map(row => row.id)).size, 24);
  assert.equal(18 * BOUNDS.actorTurnMs + 6 * BOUNDS.judgeMs, BOUNDS.maximumPaidMinutes * 60000);
  assert.equal(nextUnit([], ORDER[0]), ORDER[0]);
  assert.throws(() => nextUnit([], ORDER[1]));
  assert.throws(() => nextUnit([{ ...ORDER[0], complete: false }], ORDER[1]));
  assert.throws(() => nextUnit([{ ...ORDER[0], complete: true }], ORDER[0]));
  // A valid low score is not an execution failure and does not halt coverage.
  const done = ORDER.slice(0, 4).map(row => ({ ...row, complete: true, score: { meetsBar: false } }));
  assert.equal(nextUnit(done, ORDER[4]), ORDER[4]);
});
test("usage sums reported counters conservatively and never fills absent counters with zero", () => {
  assert.deepEqual(accounting([good(), good()]), { durationMs: 2000, inputTokens: 200, outputTokens: 20, cachedInputTokens: 100, totalTokens: 220, uncachedPlusOutput: 120 });
  for (const change of [row => { row.usage = null; }, row => { delete row.usage.cached_input_tokens; }, row => { row.usage.cached_input_tokens = 101; }, row => { row.usage.input_tokens = -1; }, row => { row.durationMs = 0.1; }, row => { row.complete = false; }]) { const row = good(); change(row); assert.throws(() => accounting([row])); }
});
test("exact prospective thresholds and exhausted wall time block any continuation or judge", () => {
  assert.equal(remaining([good()]).timeoutMs, 900000); assert.equal(remaining([good()], { judge: true }).timeoutMs, 600000);
  for (const row of [
    { ...good(), usage: { input_tokens: 2000000, cached_input_tokens: 1999999, output_tokens: 0 } },
    { ...good(), usage: { input_tokens: 350000, cached_input_tokens: 0, output_tokens: 0 } },
    { ...good(), durationMs: 2700000 },
  ]) { assert.throws(() => remaining([row])); assert.throws(() => remaining([row], { judge: true })); }
});
test("all six original conversations receive exact unchanged synthesized messages", async () => {
  const templates = Object.fromEntries(await Promise.all([1, 2, 3].map(async turn => ["turn" + turn, await read("evals/prompts/turn" + turn + ".md")])));
  for (const id of ["analyst", "analyst-overstate", "student"]) {
    const person = await object("evals/people/" + id + "/person.json");
    person.truthText = (await read("evals/people/" + person.truth + "/truth.md")).trim();
    const said = messages(person, templates);
    for (const rep of [1, 2]) assert.deepEqual(said, (await object("evals/runs/codex-closing-1/" + id + "/with-" + rep + "/meta.json")).said);
    assert.match(said[0], /Do not build anything yet/); assert.match(said[2], /Still no building/);
  }
});
test("blind judge packet exactly reproduces every original closing packet", async () => {
  const template = await read("evals/prompts/judge.md");
  for (const id of ["analyst", "analyst-overstate", "student"]) {
    const person = await object("evals/people/" + id + "/person.json");
    person.truthText = (await read("evals/people/" + person.truth + "/truth.md")).trim();
    const materialRoot = "evals/people/" + person.material + "/material";
    const material = await Promise.all((await walk(materialRoot)).map(async path => ({ path: "material/" + path, text: person.privateFiles.includes("material/" + path) ? "" : await read(materialRoot + "/" + path) })));
    for (const rep of [1, 2]) {
      const base = "evals/runs/codex-closing-1/" + id + "/with-" + rep, meta = await object(base + "/meta.json");
      const replies = await Promise.all([1, 2, 3].map(turn => read(base + "/turn" + turn + ".md")));
      const files = await Promise.all(meta.written.map(async path => ({ path, text: await read(base + "/files/" + path) })));
      assert.equal(judgeBrief({ person, material, said: meta.said, replies, files, template }), await read(base + "/judge-prompt.md"));
      const judgement = (await object(base + "/judgement.json")).judgement;
      assert.deepEqual(validateJudgement(judgement), judgement);
      assert.throws(() => validateJudgement({ ...judgement, concepts_offered: "three" }));
      assert.throws(() => validateJudgement({ ...judgement, extra: true }));
    }
  }
});
