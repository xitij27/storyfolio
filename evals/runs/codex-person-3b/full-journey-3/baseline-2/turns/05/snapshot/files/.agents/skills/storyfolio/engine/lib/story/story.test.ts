import assert from "node:assert/strict";
import { test } from "node:test";
import { blankFormation } from "./formation.ts";
import { beatHeight, beatIndex, beatsOf, chapterAt, chapterNear, chapterNumber, chapterPresence, checkStory, type StoryDef } from "./story.ts";

const story: StoryDef = {
  pieces: 2,
  chapters: [
    { id: "opening", number: 0, name: "Opening", role: "opening", beats: [{ id: "opening.loose", height: 2 }, { id: "opening.whole", height: 1 }] },
    { id: "close", number: 1, name: "Close", role: "close", beats: [{ id: "close.whole", height: 1 }] },
  ],
};
const formations = () => Object.fromEntries(beatsOf(story).map((beat) => [beat.id, { rest: blankFormation(2) }]));

test("story helpers follow supplied chapters rather than global story data", () => {
  assert.deepEqual(beatsOf(story).map((beat) => beat.id), ["opening.loose", "opening.whole", "close.whole"]);
  assert.equal(beatIndex(story, "close.whole"), 2);
  assert.equal(beatIndex(story, "missing"), -1);
  assert.equal(beatHeight(story, "opening.loose"), 2);
  assert.throws(() => beatHeight(story, "missing"), /Unknown beat/);
  assert.equal(chapterNumber(story, "close"), 1);
  assert.equal(chapterNumber(story, "missing"), 0);
});

test("a chapter's scene grows in and out over the travel to and from its beats", () => {
  assert.equal(chapterPresence(story, "close", 1), 0);
  assert.equal(chapterPresence(story, "close", 1.25), 0.25);
  assert.equal(chapterPresence(story, "close", 2), 1);
  assert.equal(chapterPresence(story, "opening", 0.5), 1);
  assert.equal(chapterPresence(story, "opening", 1.75), 0.25);
  assert.equal(chapterPresence(story, "opening", 2), 0);
  assert.equal(chapterPresence(story, "missing", 1), 0);
  assert.equal(chapterPresence(story, "close", NaN), 0);
});

test("chapter proximity covers the entire chapter and bounded travel on each side", () => {
  assert.equal(chapterAt(story, -10), "opening");
  assert.equal(chapterAt(story, 1.49), "opening");
  assert.equal(chapterAt(story, 1.5), "close");
  assert.equal(chapterAt(story, 100), "close");
  assert.equal(chapterAt(story, NaN), "opening");
  assert.equal(chapterAt({ pieces: 0, chapters: [] }, 1), undefined);
  assert.equal(chapterNear(story, "opening", 2.5), true);
  assert.equal(chapterNear(story, "opening", 2.51), false);
  assert.equal(chapterNear(story, "close", 0, 2), true);
  assert.equal(chapterNear(story, "missing", 0), false);
});

test("a valid story with faces has no content problems", () => {
  assert.deepEqual(checkStory(story, formations(), [{ beat: "close.whole", piece: 0 }]), []);
});

test("validation reports duplicate IDs, invalid heights, missing formations and stale faces together", () => {
  const invalid = structuredClone(story);
  invalid.chapters[1].id = "opening";
  invalid.chapters[0].beats = [...invalid.chapters[0].beats, { id: "opening.whole", height: 0.5 }];
  const states = formations();
  delete states["close.whole"];
  const problems = checkStory(invalid, states, [{ beat: "absent", piece: 2 }, { beat: "close.whole", piece: 0.5 }]);
  assert.ok(problems.some((problem) => problem === "id used twice: opening"));
  assert.ok(problems.some((problem) => problem === "id used twice: opening.whole"));
  assert.ok(problems.some((problem) => problem.includes("height")));
  assert.ok(problems.some((problem) => problem.includes("missing formation")));
  assert.ok(problems.some((problem) => problem.includes("missing beat")));
  assert.equal(problems.filter((problem) => problem.includes("missing piece")).length, 2);
});

test("both rest and within must match the piece count and contain finite geometry", () => {
  const states = { ...formations(), "opening.loose": { rest: blankFormation(1), within: blankFormation(3) } };
  states["opening.loose"].within.pieces[0].rotation[0] = NaN;
  states["opening.loose"].rest.near = Infinity;
  const problems = checkStory(story, states);
  assert.equal(problems.filter((problem) => problem.includes("wrong number of poses")).length, 2);
  assert.equal(problems.filter((problem) => problem.includes("finite")).length, 2);
});

test("nonfinite heights and piece indices cannot bypass numeric checks", () => {
  const invalid = structuredClone(story);
  invalid.chapters[0].beats = [{ id: "opening.loose", height: NaN }];
  invalid.pieces = Infinity;
  const problems = checkStory(invalid, formations(), [{ beat: "close.whole", piece: NaN }]);
  assert.ok(problems.some((problem) => problem.includes("height")));
  assert.ok(problems.some((problem) => problem.includes("positive integer")));
  assert.ok(problems.some((problem) => problem.includes("missing piece")));
});
