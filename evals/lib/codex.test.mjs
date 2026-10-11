import test from "node:test";
import assert from "node:assert/strict";
import { codexArgs, summariseCodex } from "./codex.mjs";
import * as codex from "./codex.mjs";

const stream = (...events) => events.map(e => JSON.stringify(e)).join("\n");
test("Codex preserves replies, commands, thread and usage", () => {
  const result = summariseCodex(stream(
    { type: "thread.started", thread_id: "thread-1" },
    { type: "item.started", item: { type: "agent_message", text: "duplicate" } },
    { type: "item.completed", item: { type: "command_execution", command: "cat material/cv.md", aggregated_output: "cv", exit_code: 0 } },
    { type: "item.completed", item: { type: "agent_message", text: "Question?" } },
    { type: "turn.completed", usage: { input_tokens: 10, output_tokens: 3 } },
  ));
  assert.equal(result.sessionId, "thread-1");
  assert.equal(result.reply, "Question?");
  assert.equal(result.commands[0].output, "cv");
  assert.equal(result.usage.output_tokens, 3);
  assert.equal(result.failed, false);
});
test("Codex partial turns, API failures and failing exits never count as complete", () => {
  assert.equal(summariseCodex("").failed, true);
  assert.equal(summariseCodex(stream({ type: "turn.failed" })).failed, true);
  assert.equal(summariseCodex(stream({ type: "turn.completed" }), 1).failed, true);
});
test("Codex resume retains isolation and judge disables shell tools", () => {
  const args = codexArgs({ sessionId: "abc", judge: true, schema: "/schema.json", disabled: ["/skill/SKILL.md"] });
  assert.deepEqual(args.slice(0, 2), ["exec", "resume"]);
  for (const value of ["--ignore-user-config", "--ignore-rules", "project_doc_max_bytes=0", "features.plugins=false", "features.apps=false", "features.memories=false", "features.shell_tool=false", 'web_search="disabled"', 'sandbox_mode="read-only"']) assert.ok(args.includes(value), value);
  assert.deepEqual(args.slice(-2), ["abc", "-"]);
  assert.ok(args.some(a => a.includes("enabled=false")));
});
test("test agents default to Sol and judges to Astra; explicit choices are preserved", () => {
  const model = options => { const args = codexArgs(options); return args[args.indexOf("--model") + 1]; };
  assert.equal(model({}), "gpt-6.1-sol");
  assert.equal(model({ judge: true }), "gpt-6-astra");
  assert.equal(model({ model: "gpt-6-astra" }), "gpt-6-astra");
});

const message = text => ({ type: "item.completed", item: { type: "agent_message", text } });
const completed = (...items) => stream({ type: "thread.started", thread_id: "one-turn" }, { type: "turn.started" }, ...items, { type: "turn.completed", usage: { input_tokens: 20, output_tokens: 5 } });

test("final Codex message excludes commentary while the historical aggregate stays intact", () => {
  const final = ' {"answer":"complete"}\n';
  const stdout = completed(message("I will read the evidence."), { type: "item.completed", item: { type: "mcp_tool_call" } }, message("I am continuing the review."), message(final));
  assert.equal(codex.finalCodexMessage(stdout), final);
  assert.equal(summariseCodex(stdout).reply, "I will read the evidence.\n\nI am continuing the review.\n\n" + final);
});

test("final Codex message never searches earlier messages or strips non-JSON wrappers", () => {
  for (const final of ['{"broken":', '```json\n{"answer":true}\n```', 'The result is {"answer":true}.']) {
    const stdout = completed(message('{"earlier":"valid JSON"}'), message(final));
    assert.equal(codex.finalCodexMessage(stdout), final);
    assert.throws(() => JSON.parse(codex.finalCodexMessage(stdout)), SyntaxError);
  }
});

test("final Codex message rejects absent, failed, interrupted, ambiguous and corrupt turns", () => {
  const valid = completed(message('{"answer":true}'));
  for (const [stdout, code] of [
    ["", 0], [valid, 1], [valid, null],
    [stream({ type: "thread.started", thread_id: "partial" }, message('{"answer":true}')), 0],
    [completed(), 0], [completed(message("")), 0], [completed(message("  \n")), 0], [completed(message(null)), 0],
    [completed(message("Commentary only"), { type: "item.completed", item: { type: "mcp_tool_call" } }), 0],
    [completed(message('{"answer":true}'), { type: "item.started", item: { type: "agent_message" } }), 0],
    [completed(message('{"answer":true}'), { type: "turn.failed", error: { message: "failed" } }), 0],
    [completed(message('{"answer":true}'), { type: "error", message: "interrupted" }), 0],
    [valid + "\n" + stream(message('{"later":true}')), 0],
    [valid + "\n" + stream({ type: "turn.started" }), 0],
    [valid + "\n" + valid, 0],
    [valid + "\n{truncated", 0], ["not an event\n" + valid, 0], ["null\n" + valid, 0],
    [valid.replace('{"type":"thread.started","thread_id":"one-turn"}\n', ""), 0],
  ]) assert.throws(() => codex.finalCodexMessage(stdout, code), Error, stdout);
});
