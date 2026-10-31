import { test } from "node:test";
import assert from "node:assert/strict";
import { captions, wordsFor } from "./chapters.ts";
import { chaptersFor, checkPerson } from "./person.ts";
import { SAMPLE_PEOPLE } from "./people.ts";

test("chosen words replace a chapter's caption, trimmed", () => {
  const keys = chaptersFor(SAMPLE_PEOPLE.noa);
  const w = wordsFor(SAMPLE_PEOPLE.noa, keys, { hello: "  I make forecasts.  ", contact: "" });
  assert.equal(w.hello, "I make forecasts.");
  assert.equal(w.contact, captions(SAMPLE_PEOPLE.noa, keys).contact);
});

test("words for a chapter the person does not have are not shown", () => {
  const p = { ...SAMPLE_PEOPLE.noa, quotes: [] };
  const w = wordsFor(p, chaptersFor(p), { say: "Kind words." });
  assert.equal("say" in w, false);
});

test("a project page must be an address", () => {
  const p = { ...SAMPLE_PEOPLE.noa, projects: [{ ...SAMPLE_PEOPLE.noa.projects[0], page: "projects/x" }] };
  assert.equal(checkPerson(p).length, 1);
  assert.deepEqual(checkPerson({ ...p, projects: [{ ...p.projects[0], page: "/projects/x" }] }), []);
  assert.deepEqual(checkPerson({ ...p, projects: [{ ...p.projects[0], page: "https://example.com/x" }] }), []);
});
