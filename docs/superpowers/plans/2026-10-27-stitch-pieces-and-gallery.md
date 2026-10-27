# Stitched pieces and the transitions gallery: implementation plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the three transition examples into pieces any site can stitch together chapter by chapter from a person's data, show them in a gallery, and let the engine render a mix.

**Architecture:** A framework-free three.js module, `stitch/`, holds three worlds (sheet, map, book), each able to pose any of its chapters and move between them; a stage renders whichever world holds the current chapter and joins two different worlds by a camera dive into a window showing the next world's render. It lives in `skills/storyfolio/engine/stitch/` (so every scaffolded site has it) with a byte-identical, test-enforced copy in `skills/storyfolio/library/stitch/` (the library is built on its own, out of the skill). A React client component mounts it in both apps; the library adds the gallery pages.

**Tech Stack:** TypeScript, three 0.180.0 (no React Three Fiber inside `stitch/`), Next.js 16 / React 19 for the host pages, `node:test` for pure logic, playwright-core 1.64.0 for browser checks.

**Spec:** [docs/superpowers/specs/2026-10-27-transitions-gallery-design.md](../specs/2026-10-27-transitions-gallery-design.md). Source of every world's look and motion: [evals/engine/transitions-2/examples/](../../../evals/engine/transitions-2/examples/) (`sheet.js`, `map.js`, `book.js`, `kit.js`, `people.js`), which the author approved ("the animations are amazing"; the remade book "looks much better").

This is the first of three plans. The design's later parts get their own plans once this one lands, because they depend on its interfaces: **Plan 2**, the skill's second stop (one recommended mix shown moving, then the gallery); **Plan 3**, the rerun of person test 2's fixture, on the author's word.

## Global Constraints

- Node 22.18 or later. three 0.180.0, as pinned in both apps; no new runtime dependency.
- The people in samples are made up: no real person, employer, product or quote.
- No em dashes anywhere, code comments included.
- No outside component code copied (React Bits, Aceternity UI).
- Pace, from round 2: a chapter takes 1.9 screens of scrolling (at least 1000 px); the first 0.4 of it holds, the rest moves; the story moves at most 0.55 chapters a second; reduced motion follows the scroll exactly.
- Never a swap: a scene does not appear or vanish at a chapter's edge; two worlds join only by the dive.
- Fonts are system stacks (the engine builds without remote fonts): serif `Georgia, "Times New Roman", serif`, sans `system-ui, sans-serif`.
- `stitch/` modules import each other by relative path with the `.ts` extension, and its pure modules import nothing from three or the DOM, so `node --test` runs them from the repository root.
- `node evals/check-skill.mjs` and `npm test` pass before every commit. Commit on `main`. No push without the author's word.

## Review Focus

1. **A person with one place** (no route): globe, map and book must show the single place with no NaN, no empty route and no crash. Test in Task 1 (`placeViews`) and Task 3 (`mapFrame`).
2. **A mix that leaves a world and comes back** (sheet, map, sheet): re-entering shows the chapter asked for, not the one left. Test in Task 1 (`seams`) and browser check in Task 6.
3. **Fewer or more items than a world has slots** (two quotes, nine projects, one job in one year): blank slots stay plain paper, extras are counted on the last slot, never `undefined` drawn. Test in Task 1 (`slots`, `yearRange`).
4. **A phone, 390 by 844:** the book shows its words, then pans to the scene; nothing scrolls sideways; captions do not cover the scene's middle. Browser check in Tasks 4, 5, 7.
5. **A person missing a chapter** (no quotes, no study): that chapter is left out and the seams join its neighbours. Test in Task 1 (`chaptersFor`, `seams`).

---

### Task 1: The pure core: chapters, people, mixes, scroll

**Files:**
- Create: `skills/storyfolio/engine/stitch/chapters.ts`, `person.ts`, `people.ts`, `mix.ts`, `scroll.ts`
- Test: `skills/storyfolio/engine/stitch/core.test.ts`
- Modify: `skills/storyfolio/engine/package.json` (test glob gains `"stitch/*.test.ts"`), root `package.json` (test glob gains `"skills/storyfolio/engine/stitch/*.test.ts"`)

**Interfaces:**
- Produces:
  - `chapters.ts`: `CHAPTERS: readonly { key: ChapterKey; title: string }[]` in the order hello, from, studied, worked, good, made, say, contact, with the titles of `examples/people.js`; `type ChapterKey`; `captions(p: Person, keys: ChapterKey[]): Record<ChapterKey, string>`; `yearText(w: Work): string` ("2020" when start and end years match, "2021 to 2023", "2023 to now").
  - `person.ts`: `type Person` and its parts `Place`, `Study`, `Work`, `SkillGroup`, `Project` (with `kind: "chart" | "photo" | "maze" | "route" | "bars" | "list"`), `Quote`, `Contact`, exactly the shape of `examples/people.js`; `checkPerson(p: Person): string[]` (empty when usable); `chaptersFor(p: Person): ChapterKey[]` (hello and contact always; the others only when the person has at least one item for them); `NOW = 2026.8`; `yearRange(p: Person): [number, number]` (from the earliest study or work start to `ceil(NOW)`, at least two years apart); `slots<T>(items: T[], n: number): { shown: (T | null)[]; more: number }`; `placeViews(p: Person): { lat: number; lng: number; zoom: number }[]` (port of `viewAt`'s per-place zoom in `sheet.js`: `clamp(0.4 / max(farthest neighbour angle, 0.01), 1, 1.7)`, zoom 1 for a single place).
  - `people.ts`: `SAMPLE_PEOPLE: Record<"noa" | "amara", Person>` copied from `examples/people.js`.
  - `mix.ts`: `type WorldId = "sheet" | "map" | "book"`; `type Mix = Record<ChapterKey, WorldId>`; `WHOLE: Record<WorldId, Mix>`; `parseMix(text: string): Mix | null` (eight comma-separated world ids in chapter order); `formatMix(m: Mix): string`; `type Seam = { from: ChapterKey; to: ChapterKey; kind: "within" | "dive" }`; `seams(m: Mix, keys: ChapterKey[]): Seam[]`; `chaptersOf(m: Mix, keys: ChapterKey[], w: WorldId): ChapterKey[]`; `worldsOf(m: Mix, keys: ChapterKey[]): WorldId[]`.
  - `scroll.ts`: `HOLD = 0.4`, `MAX_RATE = 0.55`, `UNIT_SCREENS = 1.9`, `MIN_UNIT_PX = 1000`; `type ScrollState = { s: number; from: number; to: number; t: number; raw: number; local: number }` (chapter indices); `stateAt(s: number, n: number): ScrollState` (port of `kit.js`; the last chapter only holds; `t` is the cubic ease of `raw`); `follow(shown: number, target: number, dt: number, reduce: boolean): number` (port of round 2's `step`); `totalUnits(n: number): number` (`n - 1 + HOLD`).

- [ ] **Step 1: Write the failing tests in `core.test.ts`**

```ts
test("stateAt holds, then moves, and the last chapter only holds", () => {
  assert.deepEqual(pick(stateAt(0.2, 8)), { from: 0, to: 0, t: 0, local: 0.5 });
  const m = stateAt(1.7, 8);
  assert.equal(m.from, 1); assert.equal(m.to, 2); assert.ok(Math.abs(m.raw - 0.5) < 1e-9);
  assert.deepEqual(pick(stateAt(99, 8)), { from: 7, to: 7, t: 0, local: 1 });
});
test("follow never moves faster than MAX_RATE and is exact under reduced motion", () => {
  assert.ok(follow(0, 5, 0.1, false) <= MAX_RATE * 0.1 + 1e-9);
  assert.equal(follow(0, 5, 0.1, true), 5);
});
test("chaptersFor leaves out what the person has nothing for", () => {
  const p = { ...SAMPLE_PEOPLE.noa, quotes: [], study: [] };
  assert.deepEqual(chaptersFor(p), ["hello", "from", "worked", "good", "made", "contact"]);
});
test("seams join neighbours, within a world or by a dive, skipping missing chapters", () => {
  const m = parseMix("sheet,sheet,map,sheet,book,book,book,book")!;
  const keys: ChapterKey[] = ["hello", "from", "studied", "worked", "made", "contact"];
  assert.deepEqual(seams(m, keys).map((s) => s.kind), ["within", "dive", "dive", "dive", "within"]);
  assert.deepEqual(chaptersOf(m, keys, "sheet"), ["hello", "from", "worked"]);
});
test("parseMix rejects anything but eight known worlds, and formatMix inverts it", () => {
  assert.equal(parseMix("sheet,map"), null);
  assert.equal(parseMix("sheet,sheet,sheet,sheet,sheet,sheet,sheet,globe"), null);
  assert.equal(formatMix(WHOLE.book), "book,book,book,book,book,book,book,book");
});
test("slots pads with null and counts what does not fit", () => {
  assert.deepEqual(slots([1, 2], 3), { shown: [1, 2, null], more: 0 });
  assert.deepEqual(slots([1, 2, 3, 4, 5], 3), { shown: [1, 2, 3], more: 2 });
});
test("yearRange spans at least two years, even for one job in one year", () => {
  const p = { ...SAMPLE_PEOPLE.noa, study: [], work: [{ ...SAMPLE_PEOPLE.noa.work[0], from: 2026, to: 2026.5 }] };
  const [a, b] = yearRange(p); assert.ok(b - a >= 2);
});
test("placeViews gives one finite view for a person with one place", () => {
  const v = placeViews({ ...SAMPLE_PEOPLE.noa, places: [SAMPLE_PEOPLE.noa.places[0]] });
  assert.equal(v.length, 1); assert.equal(v[0].zoom, 1);
});
test("both sample people pass checkPerson, and yearText reads as the examples do", () => {
  assert.deepEqual(checkPerson(SAMPLE_PEOPLE.noa), []); assert.deepEqual(checkPerson(SAMPLE_PEOPLE.amara), []);
  assert.equal(yearText({ ...SAMPLE_PEOPLE.noa.work[0], from: 2020, to: 2020.6 }), "2020");
  assert.equal(yearText({ ...SAMPLE_PEOPLE.noa.work[2], to: null }), "2023 to now");
});
```

(`pick` keeps `from`, `to`, `t`, `local`.)

- [ ] **Step 2: Run them and see them fail**

Run: `node --test skills/storyfolio/engine/stitch/core.test.ts`
Expected: FAIL, modules not found.

- [ ] **Step 3: Write the five modules** to the interfaces above, porting from `examples/kit.js` and `examples/people.js`. `checkPerson` reports a missing name, email or first name, a place without finite `lat`/`lng`, a work or study whose `from` is after its `to`, and a project kind outside the six.

- [ ] **Step 4: Run them and see them pass**, then `npm test` from the repository root.

Expected: PASS; the root count rises by the new tests.

- [ ] **Step 5: Commit** `stitch: the pure core of chapters, people, mixes and the scroll`.

---

### Task 2: Paint, land, and the library's checked copy

**Files:**
- Create: `skills/storyfolio/engine/stitch/paint.ts`, `land.ts`, `frame.ts`
- Move: `skills/storyfolio/engine/components/story/land.json` to `skills/storyfolio/engine/stitch/land.json`; modify `components/story/land.ts:31` and `components/story/land.test.ts:6` to the new path
- Create: `skills/storyfolio/scripts/sync-stitch.mjs`, `skills/storyfolio/scripts/stitch-copy.test.mjs`
- Create (by the script): `skills/storyfolio/library/stitch/` (whole copy)
- Modify: `skills/storyfolio/library/package.json` test glob gains `"stitch/*.test.ts"`
- Test: `skills/storyfolio/engine/stitch/frame.test.ts`

**Interfaces:**
- Consumes: Task 1's `Person`, `Place`.
- Produces:
  - `paint.ts` (browser only): `canvas(w, h, draw)`, `wrap(ctx, text, x, y, maxW, lineH, maxLines?)`, `rrect`, `serif(size, weight?, style?)`, `sans(size, weight?)`, `miniPicture(ctx, kind, x, y, w, h, seed)`, `grain(ctx, w, h, n?)`, `dieCut(src, r?)`, `label(text, opts)` (a camera-facing sprite), `texture(el, renderer)`, `PALETTE` (the `C` of `kit.js`), each ported from `kit.js` and round 2's `book.js`.
  - `land.ts` (browser only): `type Land = { land: number[][]; borders: number[][] }`; `loadLand(): Promise<Land>` by `import("./land.json")`, failing soft to empty; `fillLand(ctx, land, project)`; `dotLand(ctx, land, project, w, h, step, r, color, stretch?)`.
  - `frame.ts` (pure): `equirect(lng, lat, w, h): [number, number]`; `mapFrame(places: Place[], span = 13): { lat0: number; lng0: number; cosL: number; k: number; at(lat: number, lng: number): [number, number] }` (port of `map.js`'s projection, at least 8 degrees of span); `pageFrame(places: Place[], pw: number): (lat: number, lng: number) => [number, number]` (port of `book.js`'s `placeMap`); `fillDistance(fovDeg: number, height: number): number` (the distance at which a plane of that height fills a camera's view: `height / 2 / tan(fov / 2)`).
  - `sync-stitch.mjs`: copies `engine/stitch/` over `library/stitch/`, removing files no longer in the source; `stitch-copy.test.mjs` fails when any file differs or is missing on either side.

- [ ] **Step 1: Write the failing tests**

`frame.test.ts`:

```ts
test("mapFrame and pageFrame stay finite for one place", () => {
  const one = [SAMPLE_PEOPLE.noa.places[0]];
  assert.ok(mapFrame(one).at(one[0].lat, one[0].lng).every(Number.isFinite));
  assert.ok(pageFrame(one, 3)(one[0].lat, one[0].lng).every(Number.isFinite));
});
test("fillDistance fills a 35 degree view with a plane one unit high", () => {
  assert.ok(Math.abs(fillDistance(35, 1) - 0.5 / Math.tan((17.5 * Math.PI) / 180)) < 1e-9);
});
test("equirect puts 0,0 in the middle", () => assert.deepEqual(equirect(0, 0, 200, 100), [100, 50]));
```

`stitch-copy.test.mjs`: `test("the library's stitch is the engine's, byte for byte", ...)` comparing both trees' file lists and SHA-256 of each file.

- [ ] **Step 2: Run them and see them fail** (`node --test skills/storyfolio/engine/stitch/frame.test.ts skills/storyfolio/scripts/stitch-copy.test.mjs`).
- [ ] **Step 3: Write `paint.ts`, `land.ts`, `frame.ts`; move `land.json` with `git mv` and fix the two engine paths; write `sync-stitch.mjs`; run it.**
- [ ] **Step 4: Run them and see them pass**, then the root `npm test` (the engine's `land.test.ts` still passes from its new path).
- [ ] **Step 5: Commit** `stitch: paint, land and frames; the library carries a checked copy`.

From here on, every task that changes `engine/stitch/` ends by running `node skills/storyfolio/scripts/sync-stitch.mjs` before its tests.

---

### Task 3: The stage, the sheet world, and a preview page in the engine

**Files:**
- Create: `skills/storyfolio/engine/stitch/world.ts`, `stage.ts`, `sheet.ts`, `react.tsx`, `stitch.css`
- Create: `skills/storyfolio/engine/content/person.ts`, `content/mix.ts`, `app/preview/page.tsx`, `app/preview/preview.tsx`
- Create: `skills/storyfolio/engine/scripts/stitch-check.mjs`

**Interfaces:**
- Consumes: Tasks 1 and 2.
- Produces:
  - `world.ts`:

    ```ts
    export type WorldEnv = { person: Person; renderer: THREE.WebGLRenderer; land: Land; narrow: () => boolean };
    export type WorldView = { from: ChapterKey; to: ChapterKey; t: number; raw: number; local: number; time: number };
    export type Anchor = { position: THREE.Vector3; quaternion: THREE.Quaternion; height: number };
    export interface World {
      readonly id: WorldId;
      readonly scene: THREE.Scene;              // opaque background of its own
      readonly camera: THREE.PerspectiveCamera;
      pose(view: WorldView): void;             // stateless: the same view always gives the same picture
      anchor(chapter: ChapterKey): Anchor;     // where a window to the next world opens, at that chapter's hold
      pick(ndc: THREE.Vector2, chapter: ChapterKey): Project | null;
      resize(aspect: number): void;
      dispose(): void;
    }
    export type WorldFactory = (env: WorldEnv, chapters: ChapterKey[]) => Promise<World>;
    ```

  - `stage.ts`: `mountStitch(canvas: HTMLCanvasElement, o: { person: Person; mix: Mix; onState?: (st: ScrollState, keys: ChapterKey[]) => void; onProject?: (p: Project) => void }): Promise<{ dispose(): void; goTo(index: number): void }>`. It sizes a scroll spacer of `totalUnits(n)` chapters, follows the scroll with `follow`, builds only the worlds in `worldsOf`, and each frame renders the world holding the current chapter; a `"within"` seam is that world's own `pose` with `from` and `to`. A click while a chapter holds calls that world's `pick` and passes a hit to `onProject`. A mix naming a world with no registered factory throws `No world: <id>`. Dives come in Task 5; until then a `"dive"` seam renders the `from` world holding.
  - `sheet.ts`: `createSheet: WorldFactory`, a port of `examples/sheet.js` with these changes: it builds textures and shapes only for its chapters; poses are stateless functions of the view (the cache may skip work but never changes the result); the wall's six plates come from `slots(projects, 6)` and the last plate reads "and N more" when `more > 0`; the quote cards come from `slots(quotes, 3)`, blank plates and cards are plain paper; the timeline uses `yearRange`; the globe uses `placeViews`; the scene background is the examples' dark gradient as a texture, so the world renders opaque; `anchor` is a plane at the sheet's centre facing the camera, as high as the chapter's framing box.
  - `react.tsx` (`"use client"`): `StitchedStory({ person, mix, showWords = true }: { person: Person; mix: Mix; showWords?: boolean })`. It renders the canvas, the caption box, the chapter rail, the contact buttons and the project window, with the markup and classes of `examples/index.html` and `kit.js` moved into `stitch.css` under a `.stitch` root class.
  - `content/person.ts` exports `person: Person` (`SAMPLE_PEOPLE.noa`, marked as the placeholder to replace); `content/mix.ts` exports `mix: Mix` (`WHOLE.sheet`).
  - `/preview` renders `StitchedStory` with `content/`'s person and mix; `?mix=` overrides the mix when `parseMix` accepts it, and `?person=noa|amara` swaps in a sample person.
  - `stitch-check.mjs`: `node scripts/stitch-check.mjs --url <base> --mix <text> [--person noa] [--size 1440x900] [--out dir]` loads `/preview?...`, screenshots each chapter's hold and each move's middle (`k + 0.2` and `k + 0.7` chapters), fails on any page error or failed request, and fails when a shot's canvas is blank (fewer than 1 per cent of sampled pixels differ from the corner pixel). It writes `report.json` and the PNGs.

- [ ] **Step 1: Write `stitch-check.mjs`, run it against a page that does not exist yet, and see it fail**

Run: `cd <scaffolded copy> && npm run dev` then `node scripts/stitch-check.mjs --url http://127.0.0.1:3000 --mix sheet,sheet,sheet,sheet,sheet,sheet,sheet,sheet`
Expected: FAIL, 404 on `/preview`.

(Work in a scaffolded copy: `node skills/storyfolio/scripts/scaffold.mjs /var/tmp/stitch-site && cd /var/tmp/stitch-site && npm ci`, then copy changed engine files over as you go, or develop in the copy and copy back. Never install inside the skill.)

- [ ] **Step 2: Write `world.ts`, `stage.ts`, `sheet.ts`, `react.tsx`, `stitch.css`, the content files and the preview route.**
- [ ] **Step 3: Run the check and see it pass** for both people at 1440x900 and 390x844. Open the PNGs and compare with `evals/engine/transitions-2/frames/sheet-noa.jpg`: every chapter shows the same picture as the example, at the slower pace. Then `npm run typecheck` and `npm test` in the copy.
- [ ] **Step 4: Copy back, sync, run the root `npm test` and `check-skill`.**
- [ ] **Step 5: Commit** `stitch: the stage and the sheet world, previewed in the engine`.

---

### Task 4: The map world

**Files:**
- Create: `skills/storyfolio/engine/stitch/map.ts`
- Modify: `stage.ts` (register the factory)

**Interfaces:**
- Consumes: `WorldFactory`, `mapFrame`, `slots`, `paint.ts`.
- Produces: `createMap: WorldFactory`, a port of `examples/map.js` (round 1's fixes included) with these changes: props are built only for its chapters, and a chapter's props stand from the move into it onward only if the map owns that chapter; camera shots are per chapter key; the flight between two of its chapters rises by `min(travel * 0.75, 12)`; plates and bubbles come from all projects and quotes (the map has room), each at its place; `anchor` is a standing card at the chapter's look target, facing the camera, 1.2 high; the scene background is the dark ground colour.

- [ ] **Step 1: Run `stitch-check` with `--mix map,map,map,map,map,map,map,map` and see it fail** with the page error `No world: map`.
- [ ] **Step 2: Write `map.ts` and register it.**
- [ ] **Step 3: Run the check for both people at both sizes and see it pass;** compare with `frames/map-noa.jpg`. At 390x844 the hello sign, the diploma and each quote bubble are within the view.
- [ ] **Step 4: Copy back, sync, tests, check-skill.**
- [ ] **Step 5: Commit** `stitch: the map world`.

---

### Task 5: The dive between worlds

**Files:**
- Create: `skills/storyfolio/engine/stitch/dive.ts`, `dive.test.ts`
- Modify: `stage.ts`

**Interfaces:**
- Consumes: `World.anchor`, `fillDistance`.
- Produces:
  - `dive.ts` (pure): `diveSteps(raw: number): { fade: number; fly: number }` where `fade` rises over `raw` 0 to 0.35 and `fly` eases over 0.35 to 1; `fillPose(anchor: { position: [number, number, number]; normal: [number, number, number] }, fovDeg: number, height: number): [number, number, number]` (the camera position on the anchor's normal at `fillDistance`).
  - In `stage.ts`, a `"dive"` seam from world A at chapter `a` to world B at chapter `b`: B is posed at `{ from: b, to: b, t: 0, raw: 0, local: 0 }` and rendered into a render target the size of the canvas; A holds at `a` (`local: 1`); a plane in A's scene at `A.anchor(a)`, as wide as `height * aspect`, shows the target with opacity `fade`; A's camera moves from its own pose to `fillPose` (position lerp, quaternion slerp) by `fly`. When the move ends, B renders directly: by construction the last dive frame and B's first frame match.

- [ ] **Step 1: Write the failing tests**

```ts
test("the dive fades in the window, then flies", () => {
  assert.deepEqual(diveSteps(0), { fade: 0, fly: 0 });
  assert.equal(diveSteps(0.35).fade, 1); assert.equal(diveSteps(0.35).fly, 0);
  assert.equal(diveSteps(1).fly, 1);
});
test("the fill pose stands on the anchor's normal at the fill distance", () => {
  const p = fillPose({ position: [1, 2, 3], normal: [0, 0, 1] }, 35, 1);
  assert.deepEqual(p.slice(0, 2), [1, 2]); assert.ok(Math.abs(p[2] - (3 + fillDistance(35, 1))) < 1e-9);
});
```

- [ ] **Step 2: Run them and see them fail.**
- [ ] **Step 3: Write `dive.ts` and the dive in `stage.ts`.**
- [ ] **Step 4: Run the tests, then `stitch-check` with `--mix sheet,map,sheet,map,sheet,map,sheet,map`** and both people at both sizes. Pass, and in the PNGs: each move's middle shows the next world inside a window of the last; no frame is blank; scrolling back up through a dive in a headed browser plays it in reverse. Add `--points` for one dive at raw 0.1, 0.5, 0.9 and 1.0 and confirm the 0.9 and 1.0 shots look nearly the same.
- [ ] **Step 5: Copy back, sync, tests, check-skill; commit** `stitch: worlds join by a dive into a window`.

---

### Task 6: The book world

**Files:**
- Create: `skills/storyfolio/engine/stitch/book.ts`
- Modify: `stage.ts` (register the factory)

**Interfaces:**
- Consumes: `WorldFactory`, `pageFrame`, `slots`, `dieCut`, `grain`.
- Produces: `createBook: WorldFactory`, a port of round 2's `examples/book.js` with these changes: one turning sheet per chapter it owns, in order, so the spread of its first chapter is open at the start; the inside cover carries its first chapter's words; project cards come from `slots(projects, 6)` and speech bubbles from `slots(quotes, 3)`, with "and N more" on the left page when `more > 0`; shadows stay on (`PCFSoftShadowMap`, one 2048 lamp map); on a narrow view, each hold starts on the left page and pans to the right page over `local` 0.3 to 0.7; `anchor` lies on the right page, facing up, as high as the page is deep.

- [ ] **Step 1: Run `stitch-check` with `--mix book,book,book,book,book,book,book,book` and see it fail** with the page error `No world: book`.
- [ ] **Step 2: Write `book.ts` and register it.**
- [ ] **Step 3: Run the check for both people at both sizes and see it pass;** compare with `frames/book-noa-2.jpg`. At 390x844 the left page's words are readable in the first part of each hold. Then `--mix map,map,book,book,sheet,sheet,book,map` passes (the book entered mid-site opens at its first chapter, and re-entering a world shows the chapter asked for: Review Focus 2).
- [ ] **Step 4: Copy back, sync, tests, check-skill.**
- [ ] **Step 5: Commit** `stitch: the book world`.

---

### Task 7: The sheet and the map brought to the book's finish

**Files:**
- Modify: `skills/storyfolio/engine/stitch/sheet.ts`, `map.ts`

**Interfaces:** none new.

The design's bar is round 2's book: lit, shadowed, card-edged, layered, a camera that leans in. Apply the same means without changing what each scene shows:
- **Sheet:** a soft contact shadow under the sheet on an unseen floor (a shadow-receiving plane with `ShadowMaterial`), the lamp from the upper left, paper `grain` on every printed picture, and a camera that leans in on each hold and stands back while the sheet moves (as `book.ts` does).
- **Map:** shadows from buildings, cards and plates on the ground (lamp casting, ground receiving), `dieCut` edges on every standing card and bubble, the same lean-in on holds.

- [ ] **Step 1: Capture the before:** `stitch-check` for `WHOLE.sheet` and `WHOLE.map`, Noa, 1440x900.
- [ ] **Step 2: Make the changes.**
- [ ] **Step 3: Capture the after, both people, both sizes; the check passes.** Each scene is the same picture as before, with shadows and card edges visible in the PNGs, and no frame darker overall than the book's.
- [ ] **Step 4: Copy back, sync, tests, check-skill.**
- [ ] **Step 5: Commit** `stitch: the sheet and the map finished to the book's bar`.

---

### Task 8: The gallery in the library

**Files:**
- Modify: `skills/storyfolio/library/app/transitions/page.tsx` (the new index)
- Create: `skills/storyfolio/library/app/transitions/whole/[world]/page.tsx`, `app/transitions/mix/page.tsx`, `components/transitions/gallery-bar.tsx`, `components/transitions/mixer.tsx`, `components/transitions/pieces.ts`, `scripts/piece-shots.mjs`, `public/transitions/pieces/<world>-<chapter>.jpg` (24 images)
- Keep: `app/transitions/[way]/` and `components/transitions/{seam,study,ways}` (transitions 1) unchanged

**Interfaces:**
- Consumes: the library's copy of `stitch/` (`StitchedStory`, `WHOLE`, `parseMix`, `formatMix`, `SAMPLE_PEOPLE`, `CHAPTERS`).
- Produces:
  - `/transitions/`: four sections in this order. **Whole examples:** three cards, each a picture and two lines, linking to `/transitions/whole/<world>/`. **Mix your own:** a link to `/transitions/mix/`. **Chapter by chapter:** for each of the eight chapters, its three pieces side by side as pictures, each linking to `/transitions/mix/?m=<that world in that chapter, sheet elsewhere>`. **One seam, four ways:** the existing list, with "Today's swap" marked as what the engine did before and not to use.
  - `/transitions/whole/<world>/` and `/transitions/mix/`: `StitchedStory` under `GalleryBar`, which holds the back link, the person switch (`?p=noa|amara`) and "Hide words".
  - `mixer.tsx`: on `/transitions/mix/`, a row of eight chapter buttons, each cycling sheet, map, book, starting from `?m=` or `WHOLE.sheet`; under it, "Your mix: `<formatMix>`" with a copy button and one line: "Send this line to the agent building your site, with anything you would change." The URL keeps `?m=` and `?p=` so a mix can be shared.
  - `piece-shots.mjs`: from a running static build, saves each world's chapter at its hold's middle at 960x600 as JPEG quality 82 into `public/transitions/pieces/`.

- [ ] **Step 1: In a copy of the library (`cp -r skills/storyfolio/library /var/tmp/library && cd /var/tmp/library && npm ci`), run `BASE_PATH=/storyfolio npm run build` and confirm `out/storyfolio/transitions/mix/` does not exist yet.**
- [ ] **Step 2: Write the pages and components; run `piece-shots.mjs` against `npx serve out` (or the dev server) and add the 24 pictures.**
- [ ] **Step 3: Verify:** `npm test`, `npm run typecheck`, `BASE_PATH=/storyfolio npm run build`; then serve `out/` under `/storyfolio/` and, in Chromium at 1440x900 and 390x844, open the index, each whole example, and a shared mix link: no page errors, no failed requests, no sideways scroll, the copy button puts the mix line on the clipboard, and the person switch changes only words and places.
- [ ] **Step 4: Copy back into the skill (pages, components, script, pictures), run the root `npm test` and `check-skill`.**
- [ ] **Step 5: Commit** `library: the transitions gallery of whole examples, a mixer and every piece`.

---

### Task 9: Documentation and the evidence study

**Files:**
- Modify: `skills/storyfolio/engine/README.md` (a section "A stitched story": `content/person.ts`, `content/mix.ts`, `/preview`, `stitch-check`, that `stitch/` is shared with the library and edited only in the engine, then synced)
- Modify: `skills/storyfolio/library/README.md` (the transitions gallery and the mix line)
- Create: `evals/engine/stitch-1/README.md` and its contact sheets (from the `stitch-check` PNGs, with `evals/engine/transitions-2/tile.py`)
- Modify: `docs/handover.md`, `docs/superpowers/plans/README.md` (this plan's status), `evals/studies.md` (the new study)

- [ ] **Step 1: Write the three READMEs' sections and the study:** what was built, which mixes and sizes were checked, what root saw in the frames, and what is still weak.
- [ ] **Step 2: Root `npm test`, `check-skill`, and a scan for em dashes in every changed file** (`grep -rnP '\x{2014}'` over them prints nothing).
- [ ] **Step 3: Commit** `Document stitched stories, the gallery and their checks`.

---

### Task 10: Publish the gallery (on the author's word)

**Files:** none.

- [ ] **Step 1: Ask the author** whether to push `main` so the gallery goes live at https://xitij27.github.io/storyfolio/transitions/. Record the answer verbatim in `docs/history/`.
- [ ] **Step 2: On yes:** `git push origin main`; wait for the "Library on GitHub Pages" workflow (`gh run watch`); expected: success.
- [ ] **Step 3: Check the live site** in Chromium at both sizes as in Task 8's Step 3, against the live address. Record the result and the run id in the handover; commit and push that record.

---

## After this plan

Write Plan 2 (the skill's second stop) from the design's journey table, using `content/person.ts`, `content/mix.ts`, `/preview`, `formatMix` and the gallery's mix line as the agent's tools. The design keeps the look stop as colourings of the chosen pieces, so Plan 2 starts by adding a palette option to `mountStitch` and the three worlds (today each takes `PALETTE` alone). Then Plan 3 (the person test on `evals/builds/full-journey-3`), launched only on the author's word.
