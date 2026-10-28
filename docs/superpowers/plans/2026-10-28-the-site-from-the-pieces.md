# The person's site from the pieces, and the second stop: implementation plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** At stop 2 an agent writes the person's confirmed facts and one mix into a scaffolded site and shows it running; stops 3 to 6 then finish that same site: a look chosen from colourings, the person's chosen words, a CV and what opens on a click.

**Architecture:** The person's site becomes the stitched story at `/`, read from three files: `content/person.ts`, `content/mix.ts` and a new `content/site.ts` (look, chosen words, CV address). `stitch/` gains looks (palettes every world draws with), chosen words, and project detail; the dive's window becomes a card that stands in the last world. `npm run check` checks the person's site; the older plain story engine moves to `/plain-story` for scenes of the person's own. The skill's stops 2 to 5 are rewritten for a site made from the mix.

**Tech Stack:** TypeScript, three 0.180.0, Next.js 16 / React 19, `node:test`, playwright-core 1.64.0.

**Spec:** [the transitions design](../specs/2026-10-27-transitions-gallery-design.md), with its 28 October amendment (no mixer: the agent mixes). Built on [plan 1](2026-10-27-stitch-pieces-and-gallery.md) and its [study](../../../evals/engine/stitch-1/README.md).

Plan 2 of 3. Plan 3, the rerun of person test 2's fixture, follows on the author's word.

## Root's calls, for the author to check

The design changes only stop 2 in what the person decides, but says stops 3 to 6 are "built from the same pieces" and "the look becomes colourings of the chosen pieces". Today the scaffold's `/` is the older plain story, the stitched story writes its own captions, its CV button goes nowhere and a project's window holds a placeholder sentence. Without the tasks below, an agent at stops 4 to 6 would rebuild the site on the older engine. So:

1. **The person's site is `/`**, the stitched story, from stop 2 on. `/preview` stays for trying another mix, look or sample person.
2. **Three looks:** `night` (today's colours, unchanged), `daylight` and `blueprint`. A look colours the ground, paper, ink and accent; the book keeps its desk wood and page tints in every look, as its material.
3. **The person's words** replace the written-from-data caption of any chapter they choose words for; the opening and closing words of stop 5 go there.
4. **Project detail:** a project may carry `more` (a paragraph) and `page` (its own page's address). The placeholder sentence goes.
5. **The older plain story engine stays,** moved to `/plain-story`, with its check as `npm run check:plain`. It is the engine for a scene of the person's own. Nothing else depends on it.
6. **The dive's window becomes a card** of the world's paper, lit, shadowed and depth-tested, growing from the last chapter's element, instead of a flat rectangle drawn over the scene.
7. **The sheet's small words on a phone** are framed larger (the camera travels across the wall and reads the quotes one at a time, as the map already does on a phone).
8. **The component library paragraph at the look stop is removed** from `building.md`. The gallery, offered at stop 2, takes its place; the author turned from components to transitions on 23 October.

## Global Constraints

- Node 22.18 or later. three 0.180.0 as pinned; no new runtime dependency.
- The people in samples are made up. No em dashes anywhere, code comments included. No outside component code copied.
- Pace and joins unchanged from plan 1: 1.9 screens a chapter, a hold of 0.4, at most 0.55 chapters a second; never a swap.
- `stitch/` is edited only in `skills/storyfolio/engine/stitch/`; after any change run `node skills/storyfolio/scripts/sync-stitch.mjs` (the root `npm test` checks the copy byte for byte). Its pure modules import nothing from three or the DOM and import each other by relative path with `.ts`.
- Install, build and browse only in copies under `/var/tmp` (`check-skill` refuses `engine/node_modules`, `.next` and `checks`). Check production builds (`next dev`'s live-reload socket fails here). Chromium: `CHROMIUM=$HOME/.cache/ms-playwright/chromium-1234/chrome-linux64/chrome`.
- `SKILL.md` at most 800 words, a reference at most 1500 (`evals/check-skill.mjs`). The skill's description is unchanged.
- `node evals/check-skill.mjs` and the root `npm test` pass before every commit. Commit on `main`. No push and no paid run without the author's word.

## Review Focus

1. **Chosen words for a chapter the person has nothing for** (words for "say" with no quotes): ignored, never shown, no crash. Test in Task 4 (`wordsFor`).
2. **An unknown look in an address** (`/preview?look=pink`): the site's own look, no error. Test in Task 1 (`parseLook`).
3. **A light ground** (`daylight`): the rail, hint and caption still read over it. Test in Task 1 (`uiColours` contrast).
4. **No JavaScript or no WebGL on `/`:** the name, every chapter's words, every project's line and the CV and project-page links are there. Check in Task 6 (`site-check`).
5. **A CV or project page not built yet:** no button or link points nowhere; a link that is there answers 200. Test in Task 4 (CV button only with `cv`), check in Task 6 (links fetched).

---

### Task 1: Looks

**Files:**
- Create: `skills/storyfolio/engine/stitch/look.ts`, `stitch/look.test.ts`
- Modify: `stitch/paint.ts` (remove `PALETTE`; helpers that drew with it take a `Palette`), `stitch/world.ts`, `stitch/stage.ts`, `stitch/sheet.ts`, `stitch/map.ts`, `stitch/book.ts`, `stitch/react.tsx`, `stitch/stitch.css`, `engine/app/preview/preview.tsx`, `engine/scripts/stitch-check.mjs`

**Interfaces:**
- Produces:
  - `look.ts`: `type Palette = { bg; paper; paperDark; card; ink; muted; amber; teal; rose; blue; line: string }` (`amber` is the accent in every look); `type LookId = "night" | "daylight" | "blueprint"`; `LOOK_IDS: readonly LookId[]`; `LOOKS: Record<LookId, Palette>`; `parseLook(text: string | null | undefined): LookId | null`; `contrast(a: string, b: string): number` (WCAG ratio of two `#rrggbb`); `uiColours(p: Palette): { text: string; soft: string; glass: string; line: string }` (on a ground of relative luminance below 0.2: `#ece6d9`, `#c9cfd5`, `rgba(12, 16, 21, 0.72)`, `rgba(236, 230, 217, 0.14)`, today's; otherwise `p.ink`, `#2c333b`, `rgba(255, 255, 255, 0.8)`, `rgba(28, 34, 42, 0.14)`).
  - The three palettes:

    | | night | daylight | blueprint |
    |---|---|---|---|
    | bg | `#0f1318` | `#e7e3da` | `#0e2236` |
    | paper | `#f2ede2` | `#fbf8f2` | `#eaf0f5` |
    | paperDark | `#e3dccd` | `#ebe5d8` | `#d5dfe8` |
    | card | `#fbf7ee` | `#ffffff` | `#f6f9fb` |
    | ink | `#1c222a` | `#1c222a` | `#13202c` |
    | muted | `#6d7782` | `#5f6872` | `#5a6875` |
    | amber | `#e9a23b` | `#c9741f` | `#f2b33d` |
    | teal | `#3fa796` | `#2f8a7b` | `#48b3a6` |
    | rose | `#d8665a` | `#c4513f` | `#e27b6b` |
    | blue | `#4c7fd1` | `#3d6fc0` | `#6a9be0` |
    | line | `#c9c1b0` | `#cfc6b4` | `#b9c6d2` |

  - `WorldEnv.palette: Palette`; `StitchOptions.palette?: Palette` (default `LOOKS.night`); `StitchedStory` prop `look?: LookId` (default `"night"`), which sets `--st-bg`, `--st-ink`, `--st-muted`, `--st-glass`, `--st-line`, `--st-amber` on the `.stitch` element from `LOOKS[look]` and `uiColours`, and remounts the story when it changes.
  - `/preview?look=<id>` shows that look; `stitch-check.mjs --look=<id>` adds it to the address.

- [ ] **Step 1: Write the failing tests in `look.test.ts`**

```ts
test("night is today's palette, unchanged", () => {
  assert.deepEqual(LOOKS.night, { bg: "#0f1318", paper: "#f2ede2", paperDark: "#e3dccd", card: "#fbf7ee", ink: "#1c222a",
    muted: "#6d7782", amber: "#e9a23b", teal: "#3fa796", rose: "#d8665a", blue: "#4c7fd1", line: "#c9c1b0" });
});
test("every look gives every colour as #rrggbb", () => {
  for (const id of LOOK_IDS) for (const v of Object.values(LOOKS[id])) assert.match(v, /^#[0-9a-f]{6}$/);
});
test("ink reads on paper, and the words over the ground read, in every look", () => {
  for (const id of LOOK_IDS) {
    const p = LOOKS[id];
    assert.ok(contrast(p.ink, p.paper) >= 7, id);
    assert.ok(contrast(uiColours(p).text, p.bg) >= 7, id);
    assert.ok(contrast("#11161c", p.amber) >= 4.5, id); // the contact button's words
  }
});
test("parseLook takes the three names and nothing else", () => {
  assert.equal(parseLook("daylight"), "daylight");
  for (const x of ["pink", "", null, undefined, "Night"]) assert.equal(parseLook(x), null);
});
test("contrast is the WCAG ratio", () => {
  assert.equal(Math.round(contrast("#000000", "#ffffff")), 21);
  assert.equal(contrast("#777777", "#777777"), 1);
});
```

- [ ] **Step 2: Run `node --test skills/storyfolio/engine/stitch/look.test.ts`.** Expected: FAIL, module not found.
- [ ] **Step 3: Write `look.ts`.** Expected: the tests pass. If a pinned colour fails a contrast test, darken or lighten that one colour until it passes and note the change in the commit.
- [ ] **Step 4: Thread the palette through the worlds.** Each world reads `env.palette` where it read `PALETTE`; module-level drawing helpers take it as a parameter. Hex literals left in `sheet.ts`, `map.ts` and `book.ts` are only the book's desk wood and page tints. `grep -n "PALETTE" skills/storyfolio/engine/stitch/*.ts` prints nothing. `stitch.css` uses the custom properties wherever it wrote today's ground and UI colours; the project window stays paper. `preview.tsx` passes `parseLook(params.get("look")) ?? "night"` (Task 5 replaces the fallback with the site's look).
- [ ] **Step 5: Verify in a copy.** Sync; root `npm test`; copy the engine to `/var/tmp/plan2-engine`, `npm ci`, `npm run typecheck`, `npm run build`, `npx next start -p 3100`; run `stitch-check.mjs --url=http://127.0.0.1:3100 --mix=sheet,map,map,book,book,sheet,map,book` with `--look=` each of the three at 1440x900 and 390x844. Expected: 0 problems each. Open every shot: night matches plan 1's frames; daylight and blueprint show the same pictures in their colours, with readable rail and captions.
- [ ] **Step 6: The library still builds.** In `/var/tmp/library` (`cp -r skills/storyfolio/library`, `npm ci`): `npm run typecheck`, `BASE_PATH=/storyfolio npm run build`. Expected: pass.
- [ ] **Step 7: Commit** `stitch: three looks every world draws with`.

---

### Task 2: The dive's window is a card in the last world

**Files:**
- Modify: `skills/storyfolio/engine/stitch/stage.ts`, `stitch/dive.ts`, `stitch/dive.test.ts`, and the `anchor` of `sheet.ts`, `map.ts`, `book.ts`

**Interfaces:**
- Consumes: `Anchor` (`world.ts`), `diveSteps`, `fillPose`, `Palette` (Task 1).
- Produces: `fitCard(element: { w: number; h: number }, aspect: number, margin = 0.06): { w: number; h: number; picture: { w: number; h: number } }` in `dive.ts`: the largest card holding a screen-shaped picture (`aspect` wide to 1 high) with a border of `margin` of the card's height, fitting within 0.8 of the element. `Anchor` gains `size: { w: number; h: number }`, the element's face the card stands on (its `height` is removed; the stage takes the card's height from `fitCard`).
- Decisions: the card is the world's paper (`palette.card`) with the next world's picture inset, lit and shadowed by the world's lights and depth-tested (no `depthTest: false`, no `renderOrder` over everything). Over the fade it grows from the element's lower edge to its full size; it does not fade in on top. The sheet's card stands on the sheet's face at the chapter's hold; the map's at the chapter's place, standing on the ground; the book's on the right page. The camera then flies into its picture as today (`fillPose` against the picture's height).

- [ ] **Step 1: Write the failing tests in `dive.test.ts`**

```ts
test("fitCard fits a wide picture to a tall element by its width", () => {
  const c = fitCard({ w: 2, h: 3 }, 16 / 9);
  assert.ok(c.w <= 0.8 * 2 + 1e-9 && c.h <= 0.8 * 3 + 1e-9);
  assert.ok(Math.abs(c.picture.w / c.picture.h - 16 / 9) < 1e-9);
  assert.ok(Math.abs(c.w - 0.8 * 2) < 1e-9);
});
test("fitCard fits a tall picture to a wide element by its height", () => {
  const c = fitCard({ w: 4, h: 1 }, 390 / 844);
  assert.ok(Math.abs(c.h - 0.8) < 1e-9);
  assert.ok(Math.abs((c.h - c.picture.h) / 2 - 0.06 * c.h) < 1e-9);
});
```

- [ ] **Step 2: Run them; expected FAIL.** Step 3: write `fitCard`; expected PASS.
- [ ] **Step 4: Build the card in `stage.ts` and the three anchors** to the decisions above.
- [ ] **Step 5: Verify in the Task 1 copy** (sync, copy `stitch/` over, rebuild): `stitch-check.mjs --points` for the six mixes `sheet,map,map,map,map,map,map,map`, `map,sheet,sheet,sheet,sheet,sheet,sheet,sheet`, `map,book,book,book,book,book,book,book`, `book,map,map,map,map,map,map,map`, `book,sheet,sheet,sheet,sheet,sheet,sheet,sheet` and `sheet,book,book,book,book,book,book,book` (every ordered pair of worlds at the first seam), at 1440x900 and 390x844. Expected: 0 problems. Open the four dive shots of each: at raw 0.1 a small card on the element, at 0.5 the whole card inside the screen and on the element, nothing in front of it drawn behind it, at 1.0 the next world filling the screen as at its hold.
- [ ] **Step 6: Commit** `stitch: the dive's window is a card standing in the last world`.

---

### Task 3: The sheet's words on a phone

**Files:**
- Modify: `skills/storyfolio/engine/stitch/sheet.ts` (its narrow-screen framing of `made` and `say`, and of any other hold Step 1 finds)

- [ ] **Step 1: Find the small words.** In the copy, `stitch-check.mjs --mix=sheet,sheet,sheet,sheet,sheet,sheet,sheet,sheet --size=390x844 --at=<k+0.05, k+0.2, k+0.35 for every chapter k>` for both sample people. List every hold whose printed facts (names, titles, years, places, quoted words) are under 11 CSS pixels high at every one of those points.
- [ ] **Step 2: Frame each one larger on a narrow screen,** as the map does on a phone: the camera travels across the wall over the hold, a column of projects at a time, and reads the quote cards one at a time with the others faded to 4 per cent. Wide screens are unchanged.
- [ ] **Step 3: Verify** with Step 1's command: every listed fact is at least 11 CSS pixels high at some point of its hold, nothing scrolls sideways, 0 problems; the 1440x900 shots match before and after.
- [ ] **Step 4: Commit** `stitch: the sheet's words read on a phone`.

---

### Task 4: The person's words, the CV and what a project opens

**Files:**
- Create: `skills/storyfolio/engine/stitch/site.ts`, `stitch/site.test.ts`
- Modify: `stitch/chapters.ts`, `stitch/person.ts`, `stitch/react.tsx`

**Interfaces:**
- Produces:
  - `chapters.ts`: `wordsFor(p: Person, keys: readonly ChapterKey[], chosen: Partial<Record<ChapterKey, string>> = {}): Partial<Record<ChapterKey, string>>`: `captions(p, keys)`, with each chapter in `keys` whose chosen words are not blank taken from `chosen`, trimmed.
  - `person.ts`: `Project` gains `page?: string` and `more?: string`; `checkPerson` reports "The project <title> has a page that is not an address." when `page` does not start with `/` or `https://`.
  - `site.ts`: `type SiteChoices = { look: LookId; words: Partial<Record<ChapterKey, string>>; cv?: string }`.
  - `StitchedStory` gains `words?` and `cv?`. The caption and the text written out for anyone without the 3D use `wordsFor`. The contact button reads "CV" and links to `cv`, and is left out without one; the text's contact chapter links it too. Each project in the text links its `page` when it has one. The project window shows `more` when given and a link "More about <title>" to `page` when given; the placeholder sentence is gone.

- [ ] **Step 1: Write the failing tests in `site.test.ts`**

```ts
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
});
```

- [ ] **Step 2: Run; expected FAIL.** Step 3: write `wordsFor`, the `Project` fields, the check and `SiteChoices`; expected PASS.
- [ ] **Step 4: Change `react.tsx`** to the interface above.
- [ ] **Step 5: Verify:** sync; root `npm test`; in the copies, the engine's and the library's typecheck and build. In the library's static export at 390x844, open a project in the book: its line and tags, no placeholder sentence; the contact chapter shows the email button and no CV button.
- [ ] **Step 6: Commit** `stitch: the person's own words, the CV and what a project opens`.

---

### Task 5: The person's site at `/`

**Files:**
- Create: `skills/storyfolio/engine/content/site.ts`, `engine/app/plain-story/page.tsx` (the old `app/page.tsx`, moved unchanged)
- Modify: `engine/app/page.tsx`, `engine/app/preview/preview.tsx`, `engine/scripts/check.mjs`, `engine/package.json`, `engine/README.md`, `engine/AGENTS.md`

**Interfaces:**
- Consumes: `SiteChoices` (Task 4), `parseLook` (Task 1).
- Produces:
  - `content/site.ts`: `export const site: SiteChoices = { look: "night", words: {}, cv: undefined };`, a comment on each field saying the stop that sets it (look at stop 4, words at stop 5, the CV at stop 6).
  - `app/page.tsx`: `export const metadata: Metadata = { title: person.name, description: \`${person.role}. ${person.line}\` }` and `<main><StitchedStory person={person} mix={mix} look={site.look} words={site.words} cv={site.cv} /></main>`.
  - `/preview`: as now, plus `?look=`, falling back to `site.look`, and the site's words and CV.
  - `check.mjs` gains `--path` (default `/plain-story`) and shoots `${base}${path}?look=…`. `package.json`: `"check": "node scripts/site-check.mjs"` (Task 6), `"check:plain": "node scripts/check.mjs"`.
  - `README.md`: a first section, "The person's site", in place of "A stitched story": the three content files, what each world draws from the person, `/` and `/preview`, the looks, the words, project `more` and `page`, the CV, `npm run check`, and a paragraph "A world of your own" (a new world implements `World` in `stitch/world.ts` and is added to `WORLDS` in `mix.ts` and `FACTORIES` in `stage.ts`). The older sections follow under "The plain story engine, for scenes of your own", at `/plain-story`, checked by `npm run check:plain`.
  - `AGENTS.md`: its last paragraph becomes: "The site is a stitched story (`app/page.tsx`) read from `content/person.ts`, `content/mix.ts` and `content/site.ts`. Write only confirmed facts into them. `npm run check` builds it and checks it at desktop and phone size, without JavaScript and without WebGL. The plain story at `/plain-story` is the engine for a scene of the person's own."

- [ ] **Step 1: Move the plain story and write the files above.**
- [ ] **Step 2: Verify in a fresh copy:** `npm test`, `npm run typecheck`, `npm run lint`, `npm run build`; `npm run check:plain` passes as `npm run check` did before; `/`, `/preview?look=blueprint` and `/plain-story` answer 200; `/preview?look=pink` shows the site's look with no error.
- [ ] **Step 3: Root `npm test` and `check-skill`; commit** `engine: the person's site is the stitched story at /`.

---

### Task 6: Checking the person's site

**Files:**
- Create: `skills/storyfolio/engine/scripts/site-check.mjs`, `scripts/site-check.test.mjs`
- Modify: `engine/scripts/stitch-check.mjs`, `stitch/stage.ts` (the probe)

**Interfaces:**
- Produces:
  - The probe (`window.__stitch`) gains `mix: string` (`formatMix` of the mix shown).
  - `stitch-check.mjs`: `--path` (default `/preview`); `--mix` becomes optional (left out, the site's own); `--points` reads the mix from the probe.
  - `site-check.mjs` (`npm run check`): builds, starts `next start` on a free port, then: `stitch-check` of `/` at 1440x900 and 390x844 with the words hidden, and at 390x844 with `--words`; a load of `/` with JavaScript off and one with `--disable-3d-apis`, each finding the person's name and every chapter's title as visible text; and a fetch of every same-site link in the no-JavaScript page, each answering 200. Writes `checks/site/<time>/report.json` and the shots; exits 1 on any problem and prints where the shots are.
  - Pure, exported from `site-check.mjs`, whose run is guarded by `process.argv[1] === fileURLToPath(import.meta.url)` (`import.meta.main` is not in Node 22.18): `checkRuns(base: string, out: string): { name: string; args: string[] }[]` and `localLinks(hrefs: string[]): string[]` (keeps paths starting with `/`, not `//`; drops `#` fragments, `mailto:` and other sites; no repeats).

- [ ] **Step 1: Write the failing tests in `site-check.test.mjs`**

```js
test("the site is shot at a desktop and a phone, and once with its words", () => {
  const runs = checkRuns("http://127.0.0.1:4000", "/out");
  assert.deepEqual(runs.map((r) => r.name), ["desktop", "phone", "phone-words"]);
  for (const r of runs) assert.ok(r.args.includes("--path=/") && r.args.includes("--url=http://127.0.0.1:4000"));
  assert.ok(runs[1].args.includes("--size=390x844") && runs[2].args.includes("--words"));
});
test("only the site's own pages are fetched, each once", () => {
  assert.deepEqual(localLinks(["/cv", "/cv#top", "mailto:a@example.com", "https://x.org", "//x.org/a", "#close", "/projects/a"]), ["/cv", "/projects/a"]);
});
```

- [ ] **Step 2: Run; expected FAIL.** Step 3: write both scripts' changes; expected PASS.
- [ ] **Step 4: Verify in the copy:** `npm run check` passes on the placeholder person. Then set `cv: "/cv"` in `content/site.ts` without a `/cv` page: it fails, naming `/cv`. Put it back.
- [ ] **Step 5: Root `npm test`; commit** `engine: npm run check checks the person's site`.

---

### Task 7: The skill's stops for a site made from the mix

**Files:**
- Modify: `skills/storyfolio/SKILL.md`, `references/concept.md`, `references/storyboard.md`, `references/building.md`, `references/asking.md`

The runs behind these lines: person tests 1 and 2 (`evals/runs/stage-3-person-1`, `-2`), whose concepts the author judged weak and whose built seams swapped, and the author's decisions of 27 and 28 October. The other changes keep stops 3 to 5 from sending an agent to rebuild what the mix already runs. Exact text:

- [ ] **Step 1: `SKILL.md`.**
  - "For a requested build, sketch concepts at stop 2; build the chosen site after storyboard approval." becomes "For a requested build, the site runs from stop 2 and grows at each stop after."
  - Stop 2's last two cells: "One mix of gallery pieces, running for a requested build, and why" | "They have accepted it or said what to change, and `docs/story/concepts.md` records it".
  - Stop 4: "4. Look" | `references/building.md`, `engine/README.md` | "The whole site in two or three looks" | "They have chosen a look".
  - Stop 5: "5. Words" | `references/building.md` | "Pages that open on a click, and three whole-beat wording versions" | "They have chosen the wording".
  - `docs/story/concepts.md` holds "The mix, why each piece, and their answer".
- [ ] **Step 2: `concept.md`.** The first line becomes "The second stop: from the fact sheet to one mix of ready pieces, shown running, which the person accepts or changes." After "What the site is", insert:

```markdown
## The pieces

Three worlds can tell any chapter, each drawn only from the person's data: a sheet of paper that bends into each chapter's picture, a map of their places, and a pop-up book. A mix says which world holds each chapter. Two chapters in one world join by its own move; in two, the camera dives from one into the next. All of them run in the gallery, with two made-up people: https://xitij27.github.io/storyfolio/transitions/

Use the pieces as they are, with only the person's data in them. Write a scene only when the person asks for one.

## Choosing the mix

For each chapter, choose the piece that shows the most of this person with the captions hidden, given what their facts hold: how many places, jobs and projects, and whether anyone is quoted. Write a line for each choice saying why, from the fact sheet.

## Showing it

For a requested build, scaffold the site and fill it as `engine/README.md` says under "The person's site": their confirmed facts, and nothing else, in `content/person.ts`, and the mix in `content/mix.ts`. Answer the Person, Backdrop, Honesty and Thirty seconds tests below for it. Check it at desktop and phone size and look at every picture. Nobody can picture a mix from words, so give the person its address to scroll. For a planning-only request, give the mix in words with the gallery's address.

Put to them, in this order:

1. the mix, and the line on why each piece;
2. what of their facts each piece shows, and what it leaves out;
3. the gallery's address, and that they can swap any piece for another there, ask for changes, suggest a new component, or describe a design of their own.

Write the mix, the reasons and their answer to `docs/story/concepts.md`.

## A scene of your own

When the person asks for a new component or describes a design of their own, build it as a world, as `engine/README.md` says, and hold it to all that follows. Write in `docs/story/concepts.md` what it shows in each chapter it holds, how it joins its neighbours, and the lines of the fact sheet it stands on.
```

  Then delete the section "Three concepts, each written like this" and its build paragraph. The sections from "What does not work" to the tests stay, under "A scene of your own".
- [ ] **Step 3: `storyboard.md`.** After the chapters table add: "For a site made from the mix, a chapter's scene is its piece, and it grows out of the last by its world's move or a dive: say which, and what of the fact sheet it shows." After the paragraph on twelve to twenty-two beats add: "From the mix, a chapter is one beat of 1.9 screens, and the range does not apply." At the end of the look paragraph add: "For the mix, name two or three of the engine's looks (`stitch/look.ts`); its type is the pieces'."
- [ ] **Step 4: `building.md`.** Replace the first two sections with:

```markdown
## The look

Show the person's site in two or three looks: for the mix, the engine's looks at `/preview?look=`; for scenes of your own, the opening, one middle chapter and the ending, built in each. Let the person scroll them, ask which they choose, and stop for their answer before building on. An unanswered question in this turn is not a refusal to choose or permission to choose for them.

## What opens on a click, and the words

After the look choice, build what opens on a click (each project's page or window, the CV) and any remaining chapters of your own. For the opening and closing wording, show three versions of each whole beat, including the surrounding fixed text. Recommend one and leave room for their own wording. Stop for the choice, then use it word for word.
```

  In "The scene", the first sentence becomes "This holds for the pieces with the person's data in them, and for a scene of your own. Compare the running scene with the storyboard at its settled beats." and "grow it out of the last with the engine's chapter presence." becomes "grow it out of the last."
- [ ] **Step 5: `asking.md`.** "Where you offer a choice, the concept above all, give the ones…" becomes "Where you offer a choice, give the ones…".
- [ ] **Step 6: Verify:** `node evals/check-skill.mjs` (ok, `SKILL.md` at most 800 words); `grep -rnP '\x{2014}' skills/storyfolio` prints nothing; root `npm test`. Read the six stops through once as an agent would: no line still asks for three concepts, a spine or chapter presence.
- [ ] **Step 7: Commit** `skill: stop 2 shows one mix running; stops 3 to 5 finish it`.

---

### Task 8: A dry run on person test 2's facts, with no model

**Files:**
- Create: `evals/engine/stitch-2/README.md`, `evals/engine/stitch-2/dawit.ts`, contact sheets in `evals/engine/stitch-2/frames/`

- [ ] **Step 1: Write `dawit.ts`** from `evals/builds/full-journey-3/workspace/material/` and `prompts/turn2.md` only, as the confirmed facts stand after turn 2 (99.98 per cent and what it measures, "we" for the pages, ferry maintained not created, nothing of Lumen Pay beyond its line, no quotes). `checkPerson` returns `[]`.
- [ ] **Step 2: Do stop 2 as `concept.md` now says:** scaffold to `/var/tmp/stitch-2-site`, copy `dawit.ts` in as `content/person.ts`, choose a mix and write its reasons into the study.
- [ ] **Step 3: Do the rest as an agent would, briefly:** a `/cv` page and one project page from the facts, `cv: "/cv"`, one project's `page` and another's `more`, and chosen words for hello and contact. Run `npm run check`; then `stitch-check` of `/preview` in each look at both sizes with `--points`. Expected: 0 problems.
- [ ] **Step 4: Look at every shot** and record in the study: what each piece shows of Dawit with the words hidden, every printed fact the pieces get wrong or cannot show (amounts, close places such as Amsterdam and Rotterdam, project kinds drawn as illustration), the dives, the looks, and what is still weak. Fix in the engine only what fails a check; list the rest for the author.
- [ ] **Step 5: Commit** `evals: stitch-2, person test 2's facts made into a site from the pieces`.

---

### Task 9: Records

**Files:**
- Modify: `docs/handover.md`, `docs/superpowers/plans/README.md`, `evals/studies.md`, `skills/storyfolio/library/README.md` (the project window and looks, if it describes them)

- [ ] **Step 1:** the handover's newest entry (what was built, what Task 8 found, what is weak, the next step), this plan's row in the plans index, stitch-2 in the study catalogue.
- [ ] **Step 2:** Root `npm test`, `check-skill`, no em dashes in changed files. Commit `Record plan 2: the site from the pieces`.
- [ ] **Step 3: Ask the author** to look at Dawit's preview (served from the stitch-2 copy) and the changed skill text, and whether to launch plan 3. Record the answer verbatim in `docs/history/`.

## After this plan

Plan 3: person test 2's fixture (`evals/builds/full-journey-3`) run again with the changed skill, on the author's word. Its turn 3 answer changes from "Go with the concept you recommend" to accepting the mix with one piece swapped for another from the gallery (the design's call), and its gates are written for one mix at stop 2.
