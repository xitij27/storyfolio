// Offline verification adapted for an evidence experiment without a matched baseline.
// Starts no model conversations and preserves the earlier shared verifier.
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { criteria, failures, meetsBar, tally, CRITERIA } from "../../lib/score.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "../../..");
const base = process.argv[2] ? resolve(process.argv[2]) : here;
const json = async path => JSON.parse(await readFile(path, "utf8"));
const manifest = await json(join(base, "manifest.json"));
const hash = bytes => createHash("sha256").update(bytes).digest("hex");
const committed = (commit, path) => execFileSync("git", ["-C", root, "show", `${commit}:${path}`]);
for (const [path, expected] of Object.entries(manifest.originalArtifacts)) {
  assert.equal(hash(await readFile(join(root, path))), expected, `Changed original: ${path}`);
}
// The scoring implementation used here must still match the pinned experiment.
assert.equal(hash(await readFile(join(root, "evals/lib/score.mjs"))), manifest.fixedInputs["evals/lib/score.mjs"]);

const verified = new Set();
const rows = [];
const commands = [];
for (const id of manifest.people) {
  const previous = manifest.previous[id];
  const candidates = Array.from({ length: manifest.reps }, (_, i) => `${manifest.iteration}/${id}/with-${i + 1}`);
  let prompts;
  for (const [arm, paths] of [["before", previous], ["after", candidates]]) {
    for (const path of paths) {
      const dir = join(root, "evals/runs", path);
      const meta = await json(join(dir, "meta.json"));
      const judged = await json(join(dir, "judgement.json"));
      assert.equal(meta.complete, true, path);
      assert.equal(meta.person, id);
      assert.equal(meta.arm, "with");
      assert.equal(meta.runner, "codex");
      assert.equal(meta.model, manifest.agentModel);
      assert.equal(meta.reasoningEffort, manifest.reasoningEffort);
      assert.equal(meta.skillUsed, true);
      assert.equal(meta.skill.uncommitted, false);
      assert.equal(meta.turns.length, 3);
      assert.ok(meta.turns.every(t => !t.failed));
      assert.equal(judged.runner, "codex");
      assert.equal(judged.judge, manifest.judgeModel);
      assert.equal(judged.reasoningEffort, manifest.reasoningEffort);
      if (prompts) assert.deepEqual(meta.said, prompts, `Different messages: ${path}`);
      prompts = meta.said;
      const person = JSON.parse(committed(meta.harnessCommit, `evals/people/${id}/person.json`));
      assert.deepEqual(judged.judgement.traps.map(t => t.id).sort(), person.traps.map(t => t.id).sort());
      for (let turn = 1; turn <= 3; turn++) {
        assert.ok((await readFile(join(dir, `turn${turn}.jsonl`), "utf8")).trim());
        assert.ok((await readFile(join(dir, `turn${turn}.md`), "utf8")).trim());
      }
      assert.ok((await readFile(join(dir, "judge-prompt.md"), "utf8")).trim());
      assert.ok((await readFile(join(dir, "judge.jsonl"), "utf8")).trim());
      for (const name of meta.written) await readFile(join(dir, "files", name));
      if (arm === "after") {
        for (const [group, commit] of [["fixedInputs", meta.harnessCommit], ["skillSha256", meta.skill.commit]]) {
          const key = `${group}:${commit}`;
          if (!verified.has(key)) {
            for (const [name, expected] of Object.entries(manifest[group])) {
              assert.equal(hash(committed(commit, name)), expected, `${key}:${name}`);
            }
            verified.add(key);
          }
        }
        commands.push({ path, heuristic: meta.privateReadHeuristic ?? meta.readPrivate,
          readPrivate: meta.readPrivate, leakedPrivate: meta.leakedPrivate,
          privacyReview: meta.privacyReview ?? null,
          commands: meta.turns.flatMap((t, turn) => t.commands.map((c, command) => ({
            turn: turn + 1, command: command + 1, text: c.command, exitCode: c.exitCode,
            privateMarkerInOutput: person.privateStrings.some(s => c.output.includes(s)),
            profileReferenceRead: c.exitCode === 0 && c.output.includes("# Reading a profile"),
          }))),
        });
      }
      const score = criteria(judged.judgement, person, meta);
      rows.push({ path, id, arm, criteria: score, passes: meetsBar(score), misses: failures(score) });
    }
  }
}
const cases = manifest.people.map(id => ({ id,
  counts: Object.fromEntries(["before", "after"].map(arm => {
    const selected = rows.filter(r => r.id === id && r.arm === arm);
    return [arm, { runs: selected.length, fullBar: selected.filter(r => r.passes).length }];
  })),
  criteria: tally(rows.filter(r => r.id === id)),
}));
const result = { iteration: manifest.iteration, verified: [...verified], cases, rows };
await writeFile(join(base, "verification.json"), JSON.stringify(result, null, 2) + "\n");
await writeFile(join(base, "command-audit.json"), JSON.stringify(commands, null, 2) + "\n");
const ratio = ([pass, total]) => total ? `${pass}/${total}` : "Not applicable";
const lines = ["# Focused comparison by case", "",
  "This new fixture has no matched previous cohort. Historical physics runs are",
  "qualitative context only. The manifest pins the two new conversations.", "",
  ...cases.flatMap(c => [
    `## ${c.id}`, "", "| Criterion | Previous | Candidate |", "|---|---|---|",
    ...CRITERIA.map(([key, label]) => `| ${label} | ${ratio(c.criteria.before?.[key] ?? [0, 0])} | ${ratio(c.criteria.after[key])} |`),
    `| Full bar | ${c.counts.before.runs ? `${c.counts.before.fullBar}/${c.counts.before.runs}` : "Not applicable"} | ${c.counts.after.fullBar}/${c.counts.after.runs} |`, "",
  ]), "## Individual outcomes", "",
  "| Saved conversation | Failed criteria |", "|---|---|",
  ...rows.map(r => `| ${r.path} | ${r.misses.join(', ') || 'None'} |`), "",
  "All conversations, model roles, messages, committed candidate inputs and",
  "skill bytes were verified. Original metadata and judgements remain unchanged.", "",
];
await writeFile(join(base, "comparison.md"), lines.join("\n"));
console.log(JSON.stringify({ cases: cases.map(({ id, counts }) => ({ id, counts })), after: rows.filter(r => r.arm === "after").map(({ path, misses }) => ({ path, misses })) }, null, 2));
