import { test } from "node:test";
import assert from "node:assert/strict";
import { pageLines } from "./pages.ts";
import { SAMPLE_PEOPLE } from "./people.ts";

const noa = SAMPLE_PEOPLE.noa;

test("a book page carries the chapter's lines from the person's data", () => {
  assert.deepEqual(pageLines(noa, "hello"), [noa.name, noa.role, noa.line, noa.seeking + "."]);
  assert.deepEqual(pageLines(noa, "contact"), [noa.contact.email, noa.seeking + ".", noa.contact.links.join(", ") + "."]);
});

test("the person's chosen words take the page's place, trimmed; blank words do not", () => {
  assert.deepEqual(pageLines(noa, "hello", "  I make forecasts.  "), ["I make forecasts."]);
  assert.deepEqual(pageLines(noa, "contact", "   "), pageLines(noa, "contact"));
});
