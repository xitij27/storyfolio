import test from "node:test";
import assert from "node:assert/strict";
import { codexArgs, summariseCodex } from "./codex.mjs";

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
