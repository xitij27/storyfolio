import assert from "node:assert/strict";
import { relative } from "node:path";
import { test } from "node:test";

import { ROOT, RUNS, WORK } from "./files.mjs";

test("the folders agents run in are in no part of this repository", () => {
  // An agent in a folder of a git repository takes the repository's root for
  // its project: it is given this repository's instructions, which name the
  // skill, and it looks for its material at the root.
  assert.ok(relative(ROOT, WORK).startsWith(".."), `${WORK} is inside ${ROOT}`);
});

test("what the runs leave is kept in the repository", () => {
  assert.equal(relative(ROOT, RUNS), "evals/runs");
});
