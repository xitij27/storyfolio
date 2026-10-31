import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { test } from "node:test";

import { CHAPTERS, PIECES } from "./catalogue.ts";

test("every piece has a unique id, a known chapter and files that exist", () => {
  assert.equal(new Set(PIECES.map((p) => p.id)).size, PIECES.length);
  for (const piece of PIECES) {
    assert.ok(CHAPTERS.some((c) => c.id === piece.chapter), piece.id);
    for (const file of piece.files) assert.ok(existsSync(new URL(file, import.meta.url)), `${piece.id}: ${file}`);
    // A piece written from an outside idea names that idea; one from the portfolio does not.
    assert.equal(piece.from === "Written here", Boolean(piece.originals?.length), piece.id);
  }
});

test("every chapter has at least one piece", () => {
  for (const chapter of CHAPTERS) assert.ok(PIECES.some((p) => p.chapter === chapter.id), chapter.id);
});
