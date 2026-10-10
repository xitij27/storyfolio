import assert from "node:assert/strict";
import { test } from "node:test";

import {
  filesWritten,
  keptAs,
  lastWrites,
  leaked,
  parseStream,
  summariseTurn,
  touched,
  usedSkill,
} from "./events.mjs";

const line = (event) => JSON.stringify(event);
const says = (...content) => ({ type: "assistant", message: { content } });
const text = (words) => ({ type: "text", text: words });
const calls = (name, input) => ({ type: "tool_use", name, input });
const ends = (extra = {}) => ({
  type: "result",
  session_id: "s-1",
  total_cost_usd: 0.25,
  duration_ms: 4000,
  is_error: false,
  ...extra,
});

test("a stream is read a line at a time, and what is not an event is left out", () => {
  const stream = [line({ type: "system" }), "", "Warning: not json", line(ends())].join("\n");
  assert.deepEqual(
    parseStream(stream).map((event) => event.type),
    ["system", "result"],
  );
});

test("a turn is everything the agent said, in order, and each tool it called", () => {
  const turn = summariseTurn([
    says(text("First I will read."), calls("Read", { file_path: "material/cv.md" })),
    { type: "user", message: { content: [{ type: "tool_result", content: "..." }] } },
    says(text("  Here is the plan.  ")),
    ends(),
  ]);
  assert.equal(turn.reply, "First I will read.\n\nHere is the plan.");
  assert.deepEqual(turn.tools, [{ name: "Read", input: { file_path: "material/cv.md" } }]);
  assert.equal(turn.sessionId, "s-1");
  assert.equal(turn.costUsd, 0.25);
  assert.equal(turn.durationMs, 4000);
  assert.equal(turn.failed, false);
});

test("a turn that was cut off before its result has failed", () => {
  const turn = summariseTurn([says(text("I was saying"))]);
  assert.equal(turn.failed, true);
  assert.equal(turn.sessionId, null);
  assert.equal(turn.reply, "I was saying");
});

test("a turn that ended in an error has failed", () => {
  assert.equal(summariseTurn([ends({ is_error: true })]).failed, true);
});

test("a skill is used when the Skill tool is called with its name", () => {
  const withSkill = summariseTurn([says(calls("Skill", { skill: "storyfolio" })), ends()]);
  const withAnother = summariseTurn([says(calls("Skill", { skill: "dataviz" })), ends()]);
  assert.equal(usedSkill(withSkill, "storyfolio"), true);
  assert.equal(usedSkill(withAnother, "storyfolio"), false);
});

test("the files written are each listed once, in the order they were first written", () => {
  const first = summariseTurn([
    says(
      calls("Write", { file_path: "docs/story/facts.md", content: "one" }),
      calls("Read", { file_path: "material/cv.md" }),
      calls("Write", { file_path: "/tmp/scratch/plan.md", content: "two" }),
    ),
    ends(),
  ]);
  const second = summariseTurn([
    says(calls("Edit", { file_path: "docs/story/facts.md", old_string: "one", new_string: "1" })),
    ends(),
  ]);
  assert.deepEqual(filesWritten([first, second]), ["docs/story/facts.md", "/tmp/scratch/plan.md"]);
  assert.deepEqual(filesWritten([]), []);
});

test("the last words given for each file are remembered, whether or not the write was allowed", () => {
  const first = summariseTurn([
    says(
      calls("Write", { file_path: "plan.md", content: "a first go" }),
      calls("Write", { file_path: "/elsewhere/notes.md", content: "notes" }),
    ),
    ends(),
  ]);
  const second = summariseTurn([
    says(
      calls("Write", { file_path: "plan.md", content: "the whole plan" }),
      calls("Edit", { file_path: "other.md", old_string: "a", new_string: "b" }),
    ),
    ends(),
  ]);
  const words = lastWrites([first, second]);
  assert.equal(words.get("plan.md"), "the whole plan");
  assert.equal(words.get("/elsewhere/notes.md"), "notes");
  // An edit says what changed and not what the file holds.
  assert.equal(words.has("other.md"), false);
});

test("a file the agent wrote is kept under its path in its folder, or by name if written elsewhere", () => {
  const work = "/runs/work/chef-with-1";
  assert.deepEqual(keptAs(work, "docs/story/facts.md", []), {
    from: "/runs/work/chef-with-1/docs/story/facts.md",
    kept: "docs/story/facts.md",
  });
  assert.deepEqual(keptAs(work, "/runs/work/chef-with-1/plan.md", []), {
    from: "/runs/work/chef-with-1/plan.md",
    kept: "plan.md",
  });
  assert.deepEqual(keptAs(work, "/tmp/scratch/plan.md", []), {
    from: "/tmp/scratch/plan.md",
    kept: "outside/plan.md",
  });
  assert.deepEqual(keptAs(work, "/tmp/other/plan.md", ["outside/plan.md"]), {
    from: "/tmp/other/plan.md",
    kept: "outside/2-plan.md",
  });
});

test("what the agent was given is not kept, even if it wrote over it", () => {
  const work = "/runs/work/chef-with-1";
  assert.equal(keptAs(work, "material/notes.md", []), null);
  assert.equal(keptAs(work, "/runs/work/chef-with-1/.claude/skills/storyfolio/SKILL.md", []), null);
  assert.equal(keptAs(work, work, []), null);
});

test("a private file is touched when a tool that reads is pointed at it", () => {
  const privateFiles = ["material/linkedin-export/messages.csv"];
  const reads = summariseTurn([
    says(calls("Read", { file_path: "/tmp/run/material/linkedin-export/messages.csv" })),
    ends(),
  ]);
  const greps = summariseTurn([
    says(calls("Grep", { pattern: "quarter", path: "material/linkedin-export/messages.csv" })),
    ends(),
  ]);
  const readsAnother = summariseTurn([
    says(calls("Read", { file_path: "material/linkedin-export/Profile.csv" })),
    ends(),
  ]);
  assert.equal(touched([reads], privateFiles), true);
  assert.equal(touched([greps], privateFiles), true);
  assert.equal(touched([readsAnother], privateFiles), false);
});

test("a private file that is only written about is not touched", () => {
  const notes = summariseTurn([
    says(
      calls("Write", {
        file_path: "docs/story/facts.md",
        content: "I left messages.csv unread.",
      }),
    ),
    ends(),
  ]);
  assert.equal(touched([notes], ["material/linkedin-export/messages.csv"]), false);
});

test("no private files, nothing touched", () => {
  const reads = summariseTurn([says(calls("Read", { file_path: "material/cv.md" })), ends()]);
  assert.equal(touched([reads], []), false);
});

test("a private string is leaked in any case, and not when it is absent", () => {
  assert.equal(leaked(["He said you SAVED the Quarter."], ["saved the quarter"]), true);
  assert.equal(leaked(["Nothing of the kind."], ["saved the quarter", "52k"]), false);
  assert.equal(leaked([], ["52k"]), false);
});
