import { test } from "node:test";
import assert from "node:assert/strict";
import { checkRuns, localLinks } from "./site-check.mjs";

test("the site is shot at a desktop and a phone, and once with its words", () => {
  const runs = checkRuns("http://127.0.0.1:4000", "/out");
  assert.deepEqual(runs.map((r) => r.name), ["desktop", "phone", "phone-words"]);
  for (const r of runs) assert.ok(r.args.includes("--path=/") && r.args.includes("--url=http://127.0.0.1:4000"));
  assert.ok(runs[1].args.includes("--size=390x844") && runs[2].args.includes("--words"));
});

test("only the site's own pages are fetched, each once", () => {
  assert.deepEqual(localLinks(["/cv", "/cv#top", "mailto:a@example.com", "https://x.org", "//x.org/a", "#close", "/projects/a"]), ["/cv", "/projects/a"]);
});
