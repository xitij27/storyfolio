import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "../../..");
const sha256 = bytes => createHash("sha256").update(bytes).digest("hex");
const cases = ["analyst", "analyst-overstate", "student"];
const metricNames = ["inputTokens", "cachedInputTokens", "uncachedInputTokens", "outputTokens", "inputPlusOutputTokens", "reasoningOutputTokens"];

async function evidence(path) {
  const bytes = await readFile(join(ROOT, path));
  return { path, sha256: sha256(bytes), bytes: bytes.length };
}

async function turn(path) {
  const bytes = await readFile(join(ROOT, path));
  const events = bytes.toString("utf8").trimEnd().split("\n").map((line, index) => ({ event: JSON.parse(line), line: index + 1 }));
  const completed = events.filter(({ event }) => event.type === "turn.completed");
  assert.equal(completed.length, 1, `${path}: expected one completed event`);
  assert.equal(events.some(({ event }) => event.type === "turn.failed"), false, `${path}: failed event`);
  const sessionIds = events.filter(({ event }) => event.type === "thread.started").map(({ event }) => event.thread_id);
  assert.equal(sessionIds.length, 1, `${path}: expected one session ID`);
  return {
    path,
    sha256: sha256(bytes),
    bytes: bytes.length,
    sessionId: sessionIds[0],
    completedEventLine: completed[0].line,
    usage: completed[0].event.usage,
  };
}

function metrics(usage) {
  assert(usage.cached_input_tokens <= usage.input_tokens);
  return {
    inputTokens: usage.input_tokens,
    cachedInputTokens: usage.cached_input_tokens,
    uncachedInputTokens: usage.input_tokens - usage.cached_input_tokens,
    outputTokens: usage.output_tokens,
    inputPlusOutputTokens: usage.input_tokens + usage.output_tokens,
    reasoningOutputTokens: usage.reasoning_output_tokens,
  };
}

function distribution(values) {
  const sorted = [...values].sort((a, b) => a - b);
  const half = sorted.length / 2;
  const median = Number.isInteger(half) ? (sorted[half - 1] + sorted[half]) / 2 : sorted[Math.floor(half)];
  return { min: sorted[0], median, max: sorted.at(-1), sum: sorted.reduce((a, b) => a + b, 0) };
}

export async function collect() {
  const reviewDirectory = "evals/runs/codex-steve-review-before-1/steve-source/natural-1";
  const reviewMetaPath = `${reviewDirectory}/meta.json`;
  const reviewMeta = JSON.parse(await readFile(join(ROOT, reviewMetaPath), "utf8"));
  const reviewTurn = await turn(`${reviewDirectory}/turn1.jsonl`);
  assert.equal(reviewMeta.complete, true);
  assert.deepEqual(reviewTurn.usage, reviewMeta.turn.usage);
  assert.equal(reviewTurn.sessionId, reviewMeta.turn.sessionId);
  const runs = [];
  for (const person of cases) {
    for (const repetition of [1, 2]) {
      const directory = `evals/runs/codex-closing-1/${person}/with-${repetition}`;
      const metaPath = `${directory}/meta.json`;
      const meta = JSON.parse(await readFile(join(ROOT, metaPath), "utf8"));
      assert.equal(meta.complete, true);
      assert.equal(meta.model, "gpt-6.1-sol");
      assert.equal(meta.reasoningEffort, "medium");
      assert.equal(meta.skill.commit, "b85d014");
      assert.equal(meta.skill.uncommitted, false);
      const turns = await Promise.all([1, 2, 3].map(n => turn(`${directory}/turn${n}.jsonl`)));
      assert.equal(new Set(turns.map(t => t.sessionId)).size, 1);
      assert.deepEqual(turns.map(t => t.usage), meta.turns.map(t => t.usage));
      for (let n = 1; n < turns.length; n++) {
        for (const field of Object.keys(turns[n].usage)) {
          assert(turns[n].usage[field] >= turns[n - 1].usage[field], `${directory}: non-monotone ${field}`);
        }
      }
      runs.push({
        directory, person, repetition,
        model: meta.model, reasoningEffort: meta.reasoningEffort, cliVersion: meta.cliVersion,
        skill: meta.skill,
        meta: await evidence(metaPath),
        turns,
        finalCounterMetrics: metrics(turns.at(-1).usage),
      });
    }
  }
  return {
    sources: await Promise.all(["evals/codex-run.mjs", "evals/lib/codex.mjs", "evals/runs/codex-closing-1/findings.md"].map(evidence)),
    review: {
      directory: reviewDirectory,
      model: reviewMeta.model,
      reasoningEffort: reviewMeta.reasoningEffort,
      cliVersion: reviewMeta.cliVersion,
      scope: "One source-only review conversation. Independent browser inspection and evaluation development work are excluded.",
      meta: await evidence(reviewMetaPath),
      turn: reviewTurn,
      finalCounterMetrics: metrics(reviewTurn.usage),
    },
    runs,
    summary: {
      sampleSize: runs.length,
      distinctCases: cases.length,
      recordedTurnsPerConversation: 3,
      finalCounterMetrics: Object.fromEntries(metricNames.map(metric => [metric, distribution(runs.map(run => run.finalCounterMetrics[metric]))])),
    },
  };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const audit = JSON.parse(await readFile(join(HERE, "audit.json"), "utf8"));
  assert.deepEqual(await collect(), audit.measurements);
  console.log("Verified one source review and six planning conversations: source hashes, session IDs, raw usage, metadata copies and final-counter statistics. No model calls or writes.");
}
