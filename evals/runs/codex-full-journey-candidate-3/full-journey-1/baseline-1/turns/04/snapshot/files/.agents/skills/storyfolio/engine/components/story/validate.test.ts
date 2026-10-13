import test from "node:test";
import assert from "node:assert/strict";
import { blankFormation } from "../../lib/story/formation.ts";
import type { StoryBundle } from "./types.ts";
import { checkBundle } from "./validate.ts";

function bundle(): StoryBundle {
  return {
    story: { pieces: 1, chapters: [{ id: "opening", number: 0, name: "Opening", role: "opening", beats: [{ id: "opening.one", height: 1 }] }] },
    formations: { "opening.one": { rest: blankFormation(1) } },
    faces: [{ id: "first", beat: "opening.one", piece: 0, src: "/face.svg" }],
    looks: [{ id: "light", ground: "#fff", ink: "#111", faint: "#555", accent: "#a00", surface: { color: "#fff", roughness: 1, glows: false }, lights: { ambient: 1, key: 1, fill: 0, rim: 0 }, floor: "none", shadows: false }],
    copy: { railLabel: "Chapters", lookLabel: "Look" },
  };
}
test("accepts a complete bundle without optional extras or links", () => {
  assert.deepEqual(checkBundle(bundle()), []);
});
test("rejects face identities that would share or overwrite the wrong texture", () => {
  const value = bundle();
  value.faces = [...value.faces, { ...value.faces[0] }];
  const problems = checkBundle(value);
  assert.ok(problems.includes("face id used twice: first"));
  assert.ok(problems.includes("two faces assigned to opening.one:0"));
});
test("rejects an absent look before hydration tries to read it", () => {
  const value = bundle();
  value.looks = [];
  value.defaultLook = "missing";
  assert.ok(checkBundle(value).includes("bundle must have a look"));
  assert.ok(checkBundle(value).includes("default look is missing: missing"));
});
test("rejects links and extras that could never appear", () => {
  const value = bundle();
  value.links = [{ beat: "missing", piece: 2, href: "", label: "" }];
  value.extras = [{ chapter: "missing", load: async () => ({ default: () => null }) }];
  const problems = checkBundle(value);
  assert.ok(problems.includes("link names missing beat: missing"));
  assert.ok(problems.includes("link names missing piece: 2"));
  assert.ok(problems.includes("link must have a label and destination"));
  assert.ok(problems.includes("extra names missing chapter: missing"));
});
