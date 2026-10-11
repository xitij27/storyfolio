import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import * as codex from "../../lib/codex.mjs";

// This reads the immutable completed attempt. It invokes no model and writes no file.
const root = resolve(dirname(fileURLToPath(import.meta.url)), "../../..");
const judge = "evals/runs/codex-bench-depth-baseline-1/bench-depth-1/baseline-1/judge";
const sha256 = value => createHash("sha256").update(value).digest("hex");
const expected = {
  "stream.jsonl": "1739f2114940ff6613c3ace4061248f091eefd2aa5803332a9ef9396aae561f4",
  "process.json": "a64d9f21c95560f08ea172af83c2caf81e07a0b69b6b94145bef95b6dec138aa",
  "reply.md": "2a482b2d70e826b69ea2534f65f3584a1b38451bb2cb9ccc9352a805b2fb524d",
};
const files = {};
for (const [name, digest] of Object.entries(expected)) {
  files[name] = await readFile(resolve(root, judge, name));
  assert.equal(sha256(files[name]), digest, `Original ${name} changed`);
}
const stdout = files["stream.jsonl"].toString("utf8"), process = JSON.parse(files["process.json"]);
const summary = codex.summariseCodex(stdout, process.code);
assert.equal(summary.failed, false);
assert.equal(files["reply.md"].toString("utf8"), summary.reply + "\n");
let legacyError;
try { JSON.parse(summary.reply); } catch (error) { legacyError = String(error); }
assert.ok(legacyError, "The saved aggregate must reproduce the original parsing failure");
const events = stdout.trim().split("\n").map(JSON.parse);
const messages = events.filter(event => event.type === "item.completed" && event.item?.type === "agent_message");
const report = {
  original: judge, originalHashes: expected, modelCalls: 0, originalWrites: false,
  implementation: Object.fromEntries(await Promise.all(["evals/lib/codex.mjs", "evals/codex-build-judge.mjs"].map(async path => [path, sha256(await readFile(resolve(root, path)))]))),
  processComplete: !summary.failed, messageCount: messages.length, legacyAggregateError: legacyError,
  finalMessageSha256: sha256(messages.at(-1).item.text),
  repairedExtractorAvailable: typeof codex.finalCodexMessage === "function",
};
if (report.repairedExtractorAvailable) {
  const final = codex.finalCodexMessage(stdout, process.code);
  assert.equal(final, messages.at(-1).item.text);
  const parsed = JSON.parse(final);
  Object.assign(report, { finalExact: true, finalJsonParsed: true, schemaVersion: parsed.schemaVersion, criteriaCount: Object.keys(parsed.criteria).length, aggregateUnchanged: true });
}
console.log(JSON.stringify(report, null, 2));
