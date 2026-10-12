import assert from "node:assert/strict";
import { test } from "node:test";
import { lookFromSearch, parseLook, searchWithLook, type Look } from "./looks.ts";

const look: Look = {
  id: "light", ground: "#fff", ink: "#111", faint: "#555", accent: "#c50",
  surface: { color: "#fff", roughness: 0.8, glows: false },
  lights: { ambient: 1, key: 2, fill: 0.3, rim: 0.6 }, floor: "matte", shadows: true,
};
const looks = [look, { ...look, id: "dark" }];

test("looks are resolved against supplied IDs with a validated default", () => {
  assert.equal(parseLook("dark", looks), "dark");
  assert.equal(parseLook("missing", looks), "light");
  assert.equal(parseLook(null, looks, "dark"), "dark");
  assert.equal(parseLook(undefined, looks, "missing"), "light");
  assert.throws(() => parseLook("light", []), /at least one look/);
  assert.equal(lookFromSearch("?fps&look=dark", looks), "dark");
});

test("switching looks preserves other search parameters and omits the default", () => {
  assert.equal(searchWithLook("?fps=1&look=light&x=a+b", "dark", "light"), "?fps=1&look=dark&x=a+b");
  assert.equal(searchWithLook("?look=dark", "light", "light"), "");
  assert.equal(searchWithLook("?look=dark&fps=1", "light", "light"), "?fps=1");
});
