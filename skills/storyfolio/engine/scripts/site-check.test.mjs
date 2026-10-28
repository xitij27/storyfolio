import { test } from "node:test";
import assert from "node:assert/strict";
import { checkRuns, localLinks, missingFromPage, pageTitle } from "./site-check.mjs";

test("the site is shot at a desktop and a phone, and once with its words", () => {
  const runs = checkRuns("http://127.0.0.1:4000", "/out");
  assert.deepEqual(runs.map((r) => r.name), ["desktop", "phone", "phone-words"]);
  for (const r of runs) assert.ok(r.args.includes("--path=/") && r.args.includes("--url=http://127.0.0.1:4000"));
  assert.ok(runs[1].args.includes("--size=390x844") && runs[2].args.includes("--words"));
});

test("only the site's own pages are fetched, each once", () => {
  assert.deepEqual(localLinks(["/cv", "/cv#top", "mailto:a@example.com", "https://x.org", "//x.org/a", "#close", "/projects/a"]), ["/cv", "/projects/a"]);
});

test("everything the page must say without its 3D is found, or named", () => {
  const wanted = { name: "Ada Byron", words: ["Hello there."], projects: [{ title: "Loom", line: "A loom.", more: "It weaves.", page: "/loom" }], cv: "/cv" };
  assert.deepEqual(missingFromPage(wanted, "Ada Byron\nHello   there.\nLoom. A loom. It weaves.", ["/loom", "/cv"]), []);
  assert.deepEqual(missingFromPage(wanted, "Ada Byron Hello there. Loom. A loom.", ["/loom"]), ['the project "Loom": its more', "the CV link"]);
  assert.deepEqual(missingFromPage({ ...wanted, cv: undefined }, "Hello there. A loom. It weaves.", []), ["the name", 'the project "Loom": its title', 'the project "Loom": its page link']);
});

test("a page's title is read from its HTML", () => {
  assert.equal(pageTitle("<html><head><title>Dawit Bekele</title></head></html>"), "Dawit Bekele");
  assert.equal(pageTitle("<html><head></head></html>"), "");
});
