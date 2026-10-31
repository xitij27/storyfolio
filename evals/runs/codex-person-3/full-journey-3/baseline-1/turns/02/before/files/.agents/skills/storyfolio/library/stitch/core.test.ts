import { test } from "node:test";
import assert from "node:assert/strict";
import { stateAt, follow, MAX_RATE, totalUnits, HOLD } from "./scroll.ts";
import { chaptersFor, checkPerson, yearRange, slots, placeViews } from "./person.ts";
import { yearText, captions, CHAPTERS, type ChapterKey } from "./chapters.ts";
import { parseMix, formatMix, seams, chaptersOf, worldsOf, WHOLE } from "./mix.ts";
import { SAMPLE_PEOPLE } from "./people.ts";

const pick = (s: { from: number; to: number; t: number; local: number }) => ({ from: s.from, to: s.to, t: s.t, local: s.local });

test("stateAt holds, then moves, and the last chapter only holds", () => {
  assert.deepEqual(pick(stateAt(0.2, 8)), { from: 0, to: 0, t: 0, local: 0.5 });
  const m = stateAt(1.7, 8);
  assert.equal(m.from, 1); assert.equal(m.to, 2); assert.ok(Math.abs(m.raw - 0.5) < 1e-9);
  assert.deepEqual(pick(stateAt(99, 8)), { from: 7, to: 7, t: 0, local: 1 });
});

test("totalUnits is the moves plus the last hold", () => {
  assert.equal(totalUnits(8), 7 + HOLD);
});

test("follow never moves faster than MAX_RATE and is exact under reduced motion", () => {
  assert.ok(follow(0, 5, 0.1, false) <= MAX_RATE * 0.1 + 1e-9);
  assert.ok(follow(0, 5, 0.1, false) > 0);
  assert.ok(follow(5, 0, 0.1, false) < 5);
  assert.equal(follow(0, 5, 0.1, true), 5);
});

test("chaptersFor leaves out what the person has nothing for", () => {
  const p = { ...SAMPLE_PEOPLE.noa, quotes: [], study: [] };
  assert.deepEqual(chaptersFor(p), ["hello", "from", "worked", "good", "made", "contact"]);
  assert.deepEqual(chaptersFor(SAMPLE_PEOPLE.noa), CHAPTERS.map((c) => c.key));
});

test("seams join neighbours, within a world or by a dive, skipping missing chapters", () => {
  const m = parseMix("sheet,sheet,map,sheet,book,book,book,book")!;
  const keys: ChapterKey[] = ["hello", "from", "studied", "worked", "made", "contact"];
  assert.deepEqual(seams(m, keys).map((s) => s.kind), ["within", "dive", "dive", "dive", "within"]);
  assert.deepEqual(seams(m, keys)[3], { from: "worked", to: "made", kind: "dive" });
  assert.deepEqual(chaptersOf(m, keys, "sheet"), ["hello", "from", "worked"]);
  assert.deepEqual(worldsOf(m, keys), ["sheet", "map", "book"]);
});

test("a mix that leaves a world and comes back keeps both of its chapters", () => {
  const m = parseMix("sheet,map,sheet,sheet,sheet,sheet,sheet,sheet")!;
  const keys = CHAPTERS.map((c) => c.key);
  assert.deepEqual(seams(m, keys).slice(0, 2).map((s) => s.kind), ["dive", "dive"]);
  assert.deepEqual(chaptersOf(m, keys, "map"), ["from"]);
  assert.deepEqual(chaptersOf(m, keys, "sheet").slice(0, 2), ["hello", "studied"]);
});

test("parseMix rejects anything but eight known worlds, and formatMix inverts it", () => {
  assert.equal(parseMix("sheet,map"), null);
  assert.equal(parseMix("sheet,sheet,sheet,sheet,sheet,sheet,sheet,globe"), null);
  assert.equal(formatMix(WHOLE.book), "book,book,book,book,book,book,book,book");
  assert.deepEqual(parseMix(" map, book ,sheet,map,book,sheet,map,book "), parseMix("map,book,sheet,map,book,sheet,map,book"));
  const text = "map,book,sheet,map,book,sheet,map,book";
  assert.equal(formatMix(parseMix(text)!), text);
});

test("slots pads with null and counts what does not fit", () => {
  assert.deepEqual(slots([1, 2], 3), { shown: [1, 2, null], more: 0 });
  assert.deepEqual(slots([1, 2, 3, 4, 5], 3), { shown: [1, 2, 3], more: 2 });
  assert.deepEqual(slots([], 2), { shown: [null, null], more: 0 });
});

test("yearRange spans at least two years, even for one job in one year", () => {
  const p = { ...SAMPLE_PEOPLE.noa, study: [], work: [{ ...SAMPLE_PEOPLE.noa.work[0], from: 2026, to: 2026.5 }] };
  const [a, b] = yearRange(p); assert.ok(b - a >= 2);
  assert.ok(Number.isInteger(a) && Number.isInteger(b));
  assert.deepEqual(yearRange(SAMPLE_PEOPLE.noa), [2017, 2027]);
});

test("placeViews gives one finite view for a person with one place", () => {
  const v = placeViews({ ...SAMPLE_PEOPLE.noa, places: [SAMPLE_PEOPLE.noa.places[0]] });
  assert.equal(v.length, 1); assert.equal(v[0].zoom, 1);
  const all = placeViews(SAMPLE_PEOPLE.noa);
  assert.equal(all.length, 4);
  for (const x of all) assert.ok(x.zoom >= 1 && x.zoom <= 1.7);
});

test("both sample people pass checkPerson, and yearText reads as the examples do", () => {
  assert.deepEqual(checkPerson(SAMPLE_PEOPLE.noa), []); assert.deepEqual(checkPerson(SAMPLE_PEOPLE.amara), []);
  assert.equal(yearText({ ...SAMPLE_PEOPLE.noa.work[0], from: 2020, to: 2020.6 }), "2020");
  assert.equal(yearText({ ...SAMPLE_PEOPLE.noa.work[2], to: null }), "2023 to now");
  assert.equal(yearText(SAMPLE_PEOPLE.noa.work[1]), "2021 to 2023");
});

test("checkPerson names what makes a person unusable", () => {
  const bad = {
    ...SAMPLE_PEOPLE.noa,
    name: "",
    places: [{ ...SAMPLE_PEOPLE.noa.places[0], lat: Number.NaN }],
    work: [{ ...SAMPLE_PEOPLE.noa.work[0], from: 2022, to: 2021 }],
    projects: [{ ...SAMPLE_PEOPLE.noa.projects[0], kind: "video" as never }],
  };
  const errs = checkPerson(bad);
  assert.equal(errs.length, 4, errs.join("; "));
});

test("captions give each present chapter its words, and only those", () => {
  const keys: ChapterKey[] = ["hello", "from", "contact"];
  const c = captions(SAMPLE_PEOPLE.noa, keys);
  assert.deepEqual(Object.keys(c), keys);
  assert.equal(c.hello, "Research engineer. I turn messy transit data into forecasts people plan their day around.");
  assert.equal(c.from, "Gothenburg (grew up), then Delft (studied), then Zurich (worked), then Montreal (lives now)");
  assert.equal(c.contact, "noa@example.com. Open to research engineering roles.");
  const all = captions(SAMPLE_PEOPLE.amara, CHAPTERS.map((k) => k.key));
  for (const v of Object.values(all)) assert.ok(v.length > 0 && !v.includes("undefined"));
});
