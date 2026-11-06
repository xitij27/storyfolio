# The site and the README, reviewed for a made look, 6 November 2026

The author asked, verbatim:

> use all the front-end design skills and a hallmark audit skills to review
> the website and see if it looks AI generated or how we can improve the
> website for Storyfolio. And maybe also look into how we can put the text
> and description better in the README and in the website.

This is a review and a set of proposals. Nothing on the site, in the
engine or in the README was changed. Each proposal below waits for the
author's word.

## How it was reviewed

- **Before reviewing, `main` was fast-forwarded** from `bf8580b0` to
  `8103e0a2` (34 commits already on GitHub: person tests 3 and 4, one world
  per site, the sheet's moves). The review is of that state.
- **The website** is the GitHub Pages site, the library in
  `skills/storyfolio/library/`: the index at
  https://xitij27.github.io/storyfolio/, the gallery at `/transitions/`,
  and one whole story, `/transitions/whole/sheet/`. The engine's story
  chrome (`skills/storyfolio/engine/stitch/stitch.css` and `react.tsx`)
  was read too, since every person's site carries it.
- **Hallmark's audit** (`/hallmark audit`): its linter, `sloplint.mjs`,
  run on the library's source and on the three live pages with the render
  tier (Chromium at 1280x800, 1440x900, 1920x1080 and 375 wide), then its
  judged gates walked from the screenshots. The full output is in
  [sloplint-before.txt](../../assets/2026-11-06-site-review/sloplint-before.txt).
  The engine's CSS was linted statically. Genre: modern-minimal (a
  developer tool), inferred.
- **The frontend-design skill**: its list of what generated pages cluster
  around, its rules on type, labels and motion, and its two-pass plan for
  a new direction (below).
- Screenshots: [index](../../assets/2026-11-06-site-review/library-index-1440.jpg),
  [gallery](../../assets/2026-11-06-site-review/gallery-1440.jpg),
  [sheet story at 1440](../../assets/2026-11-06-site-review/sheet-story-1440.jpg),
  [sheet story at 375](../../assets/2026-11-06-site-review/sheet-story-375.jpg).

## The verdict, page by page

| Page | Looks generated? | Why |
|---|---|---|
| Index, `/` | **Yes, the most** | shadcn's default neutrals, system-ui, one word in a purple-to-cyan gradient, a monospace label over the heading, three buttons, then the same rounded card with pill tags 22 times. No picture on a site about 3D pictures. Its pieces (starfield, gooey search, typed terminal, from React Bits and Aceternity ideas) are the effects the skill's own description promises to move people away from. |
| Gallery, `/transitions/` | **Half** | The 24 rendered chapters are real and nobody else's: the strongest material on the site. The frame around them is the index's template: gradient word, mono label, a 76-word paragraph, small section heads, every picture in the same card. |
| Story, `/transitions/whole/sheet/` | **Least** | The paper CV in 3D is its own thing. The overlay pulls it back toward a template: a blurred glass caption card, a tracked "01", a tracked "SCROLL" cue, tracked amber caps on the CV, Georgia over system-ui. |
| README | **No** | Plain verbs, the project's own nouns, specific. Its problems are facts that went stale on 31 October and the order of its sections. |

What works and should stay: the three worlds and their 24 pictures; the
gallery's per-chapter pictures that open the story at that chapter; the
person switch and "Hide words"; the README's tagline, its stops table and
"Nothing about you is invented".

## Findings

Tier names are Hallmark's: **Floor** cannot be waived, **Reflex** is a
machine default that may be waived with a reason, **Finish** is craft.
Paths are relative to `skills/storyfolio/`.

### Floor

1. **Purple-to-cyan gradient on one word of each hero heading.**
   `library/app/globals.css:148-153` (`.text-gradient`, hues 274, 310,
   210), used at `library/app/page.tsx:11` ("running") and
   `library/app/transitions/page.tsx:24` ("becomes"). The single most
   recognised generated-page tell, twice over (gradient text, and one
   accented word in a heading). Fix: set the whole heading in one ink.
2. **Too many words per screen.** Index hero has three text blocks before
   its actions and 222 words in the next screen; gallery hero paragraph is
   76 words (171 on its first screen). `library/app/page.tsx:13-17`,
   `library/app/transitions/page.tsx:26-31`.
3. **Tracked small capitals in the story's chrome**, on every person's
   site: `engine/stitch/stitch.css:25` (`.cap .num`, "01"), `:28-29`
   (`.hint`, "SCROLL"), `:42` (`.modal .eyebrow`, the project's place and
   year). Fix: body face, a step smaller, sentence case, no tracking.
4. **Text over text on a phone** (seen at 375 wide in headless Chromium;
   check on a phone): "SCROLL" sits on the caption's last line, the chapter
   rail's dots sit over the CV's text, and the sheet runs off the right
   edge ([shot](../../assets/2026-11-06-site-review/sheet-story-375.jpg)).
   At 1440 the gallery bar's grey subtitle runs across the top of the
   cream sheet, where it is hard to read
   ([shot](../../assets/2026-11-06-site-review/sheet-story-1440.jpg)).
   `library/components/transitions/gallery-bar.tsx:36-41`,
   `engine/stitch/stitch.css:15-29`. Root's findings on person test 3
   already said the caption card and rail scatter the text.
5. **Colour literals outside the tokens**: the gallery bar's hexes
   (`gallery-bar.tsx:36,38,41,44,51,60`), `study.tsx`'s `bg-[#0b1416]`, and
   the engine's end links and modal (`stitch.css:35,39,42,45-48`). The `.dark` block's oklch
   values the linter also lists are a theme block, so those are dismissed.
6. **Small ones:** no `overflow-x: clip` on `html` and `body`
   (`library/app/globals.css`); the story's rail buttons and end links
   have no `:focus-visible` style of their own (the browser's ring
   remains, so keyboard use still works).

### Reflex

7. **Mono labels over headings** ("Storyfolio library", "Transitions"):
   `library/app/page.tsx:9`, `library/app/transitions/page.tsx:22`,
   `library/app/p/[id]/page.tsx:27`. They name what the heading already
   says. Fix: delete them, and let the page's name live in a nav.
8. **System faces as the display**: `globals.css:14-15` (system-ui for
   heads), `stitch.css:5` (Georgia and system-ui). Nobody chose these; they
   are what is left when nothing was chosen. The author chose system fonts
   so "nothing waits on a font service"; self-hosted files keep that.
9. **The card kit**: every piece, picture and study in the same rounded,
   bordered card with the same hover lift
   (`library/app/page.tsx:37-58`, `library/app/transitions/page.tsx:14-15`).
   Chapter-by-chapter is a grid of eight chapters by three worlds, shown
   as eight separate rows of three cards, not as the table it is.
10. **Small section heads and one rhythm**: every h2 is 24px under a 48
    to 60px hero head, every section is a hairline and the same 97px gap.
11. **The first screen holds no picture.** At 1440x900 the index's hero
    ends at 648px with nothing beside it; the gallery's at 568px. The
    product is a moving 3D picture; the first screen should be one.
12. **Glass caption**: `stitch.css:22-23` (blurred translucent card over
    the scene), and the template's floating link
    (`library/app/template/page.tsx:21`).
13. **The night look is two generated defaults at once**: cream paper,
    a serif and a warm accent (`engine/stitch/look.ts:16-17`) on a tinted
    near-black ground. It is the product's material, so it is not wrong,
    but it is why the story reads as "nice, seen it". Moving one axis
    (paper toward real office white, or the accent) would separate it.

### Dismissed, with reasons

- 44a, 44c, 44d on the whole story: it is a full-bleed 3D canvas, not a
  landing hero.
- 62 on `.stitch .cta` (hidden at rest): only in 3D mode; without
  JavaScript the page's text version carries the contact.
- 54 on the project window's place and year: it carries a fact, so it is
  not an eyebrow; the tracked caps (finding 3) still apply.
- 48 on the `.dark` block's oklch values: a declared theme block.

### Not about looks, found on the way

- **The gallery cannot show the sheet's fold and swing.**
  `library/app/transitions/whole/[world]/page.tsx` passes no `move`, so
  the public sheet always slides. Stop 4 now asks a person to pick a move,
  and the author judged fold and swing "cool" on 1 November. A "Move"
  switch beside "Person" in the gallery bar would let anyone see all three.
- **Two names for two sites.** The README calls `/transitions/` "the
  gallery" and `/` "the component library"; the site calls them
  "Transitions" and "Storyfolio library". The GitHub About points at
  `/transitions/`, while the bare Pages address lands on the older pieces.
- **"One seam, four ways"** at the end of the gallery, with its "What the
  engine did before. Not to use." pill, is project history on a page for
  visitors.

## Which depth settles what

| Depth | Settles | Touches |
|---|---|---|
| **Polish** (fix the tells, keep the look and layout) | Findings 1 to 7, 10, 12; the bar's subtitle; the phone overlaps | `library/app/*.tsx`, `globals.css`, `gallery-bar.tsx`; `engine/stitch/stitch.css` and `react.tsx`, then `node scripts/sync-stitch.mjs` |
| **Restyle** (keep the layout, change the system) | Adds 8, 9, 13: chosen faces, the product's own palette for the gallery, tiles in place of cards | as above, plus self-hosted font files |
| **Full** (new composition, same content and links) | Adds 11 and the two-names problem: the gallery becomes the front page with the sheet moving on its first screen | `library/app/page.tsx` and `transitions/page.tsx`, a new route for the older pieces |

The story chrome is in the engine, so a polish there changes every
person's site; it adds no instruction to the skill, so it needs no run of
its own, but person test 5 would be its test.

## A direction for the gallery (full depth)

Written with the frontend-design skill's two passes: a plan, then a check
of the plan against what any similar page would get.

**First pass.**

- *Colour*: the product's night palette, so the gallery and the story are
  one system: ground `#0f1318`, paper `#f2ede2`, ink `#ece6d9`, muted
  `#9aa4ae`, signal amber `#e9a23b`. Drop the purple brand tokens and
  shadcn's neutrals.
- *Type*: one text serif for heads and the CV (e.g. Source Serif 4), one
  plain sans for the rest (e.g. Public Sans), self-hosted.
- *Layout*: the moving sheet is the first screen; the chapters are one
  table, chapters down, worlds across.
- *Principle*: show, never describe. The pictures carry the page.

**Check against the defaults.** The palette is two of the skill's named
clusters together (cream, serif and a warm accent; a near-black ground
with one bright accent). Revised: keep the paper, since a CV is paper,
but set the page's ground as the map's slate (`#1b2531`, lighter than the
story's near-black) and let amber appear only where something is current
(the chosen world, the focused chapter, the playing move). Two faces from
the open catalogue rather than the generated-page staples (Inter, Fraunces,
Instrument Serif). The table is right because the content is a grid of
chapters by worlds; the numbers 1 to 8 stay because the chapters are a
real sequence.

```
+----------------------------------------------------------------+
| Storyfolio                       Gallery   Pieces   GitHub     |
|                                                                |
|  How one chapter          +----------------------------------+ |
|  becomes the next         |                                  | |
|                           |  the sheet, moving: CV curls     | |
|  One person's portfolio,  |  into a globe, flattens into     | |
|  told on paper, on a map  |  the diploma (a muted loop with  | |
|  and in a pop-up book.    |  a pause button; a still poster  | |
|                           |  without JavaScript)             | |
|  [Watch the sheet] GitHub +----------------------------------+ |
+----------------------------------------------------------------+
|  +-------------------------+  +-----------+  +-----------+     |
|  | One sheet (larger)      |  | One map   |  | Pop-up    |     |
|  +-------------------------+  +-----------+  +-----------+     |
+----------------------------------------------------------------+
|                    One sheet      One map       Pop-up book    |  sticky
|  1  Hello          [picture]      [picture]     [picture]      |
|  2  Where from     [picture]      [picture]     [picture]      |
|  ...                                                           |
|  On a phone: one world at a time, chosen by three tabs.        |
+----------------------------------------------------------------+
|  Make your own: copy the skill and give your agent your CV.    |
|  The people here are made up.   MIT.   Source on GitHub.       |
+----------------------------------------------------------------+
```

The older pieces move to `/pieces/`. `/transitions/` must keep working:
the skill links it (`references/concept.md:24`, `engine/README.md:54`)
and so does the GitHub About. A static export cannot redirect on the
server, so `/transitions/` keeps the gallery itself, or the front page
and `/transitions/` render the same component.

The 2026-10-27 gallery spec lists "changing the component library's
static sections" as a non-goal, so moving the old pieces off the front
page is the author's call.

## Proposed words for the site

| Where | Now | Proposed |
|---|---|---|
| Gallery heading | How one chapter *becomes* (gradient) the next. | How one chapter becomes the next (one ink) |
| Gallery lede (76 words) | A portfolio told in eight chapters, in three worlds: ... The two people are made up. | One person's portfolio, told on paper, on a map and in a pop-up book. |
| Gallery actions | none | Watch the sheet; Get the skill (the repository, not the library's source) |
| "Whole examples" | Whole examples / One world through all eight chapters. | Watch a whole site |
| "Chapter by chapter" sub-line | Each world's piece for each chapter. Open one to see it in its example, at that chapter. | Open a picture to watch that chapter move. |
| The agent's part, now inside the lede | The agent building a site chooses the world that suits the person and shows it moving; say what you would change. | Its own line by the table: "Making your own? Your agent picks a world for you and shows it running. Tell it if you'd rather have another." |
| The seam study | One seam, four ways, with "What the engine did before. Not to use." | Off the front page, or at the foot as "The first study", without the pill |
| Footer | none | The people on this site are made up. MIT. Source on GitHub. |
| Index heading (if it stays) | Pieces for a portfolio, *running* (gradient), by the chapter they tell. | Pieces from earlier portfolios |
| Index lede | Open one to see it working, then copy its files. Some come from a real portfolio; others ... | Sections and effects from the author's own portfolio, by the chapter they tell. Open one, then copy its files. |
| Index tags | idea: React Bits | From an idea in React Bits |
| Page title | Storyfolio library | Storyfolio: a portfolio told in 3D |
| Story cue | SCROLL | Delete it, or "Scroll to begin" in sentence case, gone on the first scroll and never over the caption |
| Story caption number | 01 | Delete it (the rail shows where you are), or "1" untracked |
| Project window label | ZURICH, 2024 | Zurich, 2024, sentence case, under the title |

## Proposed changes to the README

**Facts that went stale on 31 October and 1 November** (fix whatever else
is decided):

| Section | Now | Should say |
|---|---|---|
| Opening paragraph | one long scroll in eight chapters, each a 3D picture | ... told in one 3D world: a sheet of paper, a map or a pop-up book. Each chapter is a picture of what it is about, and grows out of the last. |
| Picture | Four chapters across the sheet, the map and the book (a mixed site) | One world through four chapters. The sheet's pictures exist: `library/public/transitions/pieces/sheet-{hello,from,studied,made}.jpg`. Alt: "Four chapters of a made-up person's site on one sheet of paper: their CV, wrapped into a globe of the places they lived, unrolled into a diploma, split into a wall of projects." |
| Status, first bullet | a site mixes them, one world per chapter. Between two worlds the camera dives through a card | A site is told in one world, chosen at stop 2. Another world for one chapter only when the person asks. |
| Status, "Where stage 3 stands (28 October)" | The dry run and "Next: a test in which a fresh agent builds..." | As of 6 November: person tests 3 and 4 built whole sites; the sheet read best to the author, who found the map's site lacked flow; the sheet now has three moves (slide, fold, swing), chosen at the look stop; next, the person test again with the moves, then the author's review, which closes stage 3. |
| How it works, stop 2 | Your site, already running: one world per chapter, with a reason for each / Accept it, or swap pieces from the gallery | Your site, already running in one world, and why that world suits you / Accept it, or choose another world from the gallery |
| How it works, stop 4 | The whole site in two or three looks | The whole site in two or three looks, and the sheet's moves |
| Three worlds table, sheet row | It folds from one picture into the next | It slides, folds or swings from one picture into the next; you pick the move |
| What you leave with | `mix.ts` Which world tells each chapter | `mix.ts` Which world tells the story |
| Component library section | Browse the library: portfolio pieces running, listed by chapter | Say which is which: the gallery (the three worlds, what a site is made from) and the older pieces |

**Order.** A visitor reads what it is, sees it, then decides to use it.
Today the stage table, with internal stage names and dates, comes second.
Proposed order: tagline and paragraph, picture, links, How it works,
Three worlds, Get started, Start the conversation, What you leave with,
Project status, Library, Where it came from, Contribute, License. The
status badge stays at the top. The author asked for the status and badges
on 26 October "so that it looks like a professional repository", so the
table stays; only its place changes, and only on their word.

**Links under the picture.** "See it running" goes to the gallery's index,
which opens on text. Send it to the moving thing,
`/transitions/whole/sheet/`, and add "Browse the gallery" for the index.

**The GitHub About** reads well and is still true. Once the front page
changes, its website can be the bare Pages address.

## What is left for the author

1. The stale README facts: fix now? They describe the skill as it was
   before 31 October.
2. A polish of the story chrome and the library's tells (findings 1 to 7,
   10, 12, and the overlaps): yes or no? It changes every person's site.
3. The gallery as the front page, the older pieces at `/pieces/`, and a
   move switch in the gallery bar: yes or no? The author judges from
   examples, so the next step would be the first screen built and shown,
   before the rest.
4. A push for any of it, on the author's word.

## What was done, 6 November

On the author's "Yes, you can fix the README. And then you can do the
cleanup the AI tells and yeah, you can do everything with the
recommendation suggests" ([record](../../history/2026-11-06-site-and-readme-direction.md)).
No push: that waits for the author's word.

**The README.** Every stale fact in the table above is fixed. The new
picture is [`docs/assets/storyfolio-sheet.jpg`](../../assets/storyfolio-sheet.jpg),
made from the sheet's four existing renders (hello, where from, studied,
made) with captions in the gallery's faces; the old mixed picture stays in
`docs/assets/` for the record. The links under it go to the moving sheet
and the gallery. The sections are in the proposed order, with Project
status after "What you leave with" and the badges where they were. "The
gallery and the pieces" replaces "Component library".

**The story's chrome, in the engine** (`engine/stitch/stitch.css` and
`react.tsx`, synced to the library with `scripts/sync-stitch.mjs`), so in
every person's site:

- the caption's "01" and the "SCROLL" cue are gone (the rail shows where
  the reader is), which also ends the cue sitting on the caption on a phone;
- the project window's place and year are a sentence-case line under the
  title, no longer tracked capitals above it, in a darker amber
  (`#8a5a12`, 5.1:1 on the paper, where `#b47718` was 3.2:1);
- the caption is a solid panel of the look's own ground, no blur;
- every colour is a `--st-*` token, and the rail, the end links and the
  project window have a focus ring that shows at once.

**The library** (the Pages site):

- `/` is the gallery (`components/gallery/`), also served at
  `/transitions/`: a nav of the wordmark and three links; a hero with
  "How one chapter becomes the next", one sentence, "Watch the sheet" and
  "Get the skill", beside a 12.7-second loop of the sheet's fold
  (`public/gallery/sheet-fold.webm`, 2.2 MB, recorded by the new
  `scripts/hero-loop.mjs`; a poster without script or under reduced
  motion; a pause button); the three worlds, the sheet's tile larger with
  links to its three moves; one table of chapters by worlds, its header
  row sticky, one world at a time on a phone; "Make your own"; a footer
  with the made-up note, Pieces, the first study, the licence and the
  source.
- `/pieces/` holds the older pieces as catalogue rows by chapter, with
  their sources in words ("From the author's V2 portfolio, from an idea in
  React Bits") in place of pills.
- The bar over a whole example: no subtitle over the sheet, a solid band
  behind its words, a Move switch on the sheet (`?m=`, starting with the
  swing, as a new site does), two rows on a phone.
- The piece pages, the study pages and the template's link use the same
  nav and tokens; the study's first way is now "The old swap" (its text
  said "What the engine does now").
- Faces: Source Serif 4 and Public Sans, served from `app/fonts/` (OFL)
  through `next/font/local`. Colours: `--g-*` and `--bar-*` tokens, the
  map's slate ground, the story's paper and ink, amber only for what is
  current or pressed. The pieces keep their own tokens and fonts.
- `scripts/gallery-check.mjs` now also opens `/` and `/pieces/`, chooses
  the map above the table on a phone before opening its piece, and checks
  the move switch.

**Checks.** The library's 52 tests, `typecheck` and `BASE_PATH=/storyfolio`
build pass; `gallery-check` on the local build: 2 sizes, 0 problems; the
repository's 419 tests and `check-skill` pass. The loop plays when motion
is allowed and stops on Pause (checked in Chromium).

**Hallmark, after** ([full output](../../assets/2026-11-06-site-review/sloplint-after.txt),
the gallery's files and three local pages):

| | Before | After |
|---|---|---|
| Front page `/` | the index: 2a, 38iii, 64, 58, 44c, 59, 77, 78, 79 | clean, but for the 83 waiver (the pictures are the product's own renders) |
| Gallery tells (gradient word, mono labels, card kit, small heads) | all present | gone from the gallery's pages |
| Story chrome (engine) | 67 three times, 54, 26a, 29 | none of these; left: 48 on the `.stitch` token block (the linter reads only `:root`), 62 (the end links hidden in 3D mode, with the text version below), 24b spacing |
| Still firing, kept | | 2a and 48 on the V2 pieces' own theme blocks, 1 on their system face (the gallery's faces come through `next/font`, which the linter cannot see), 44a, 44c and 44d on the full-bleed story, 44c on `/pieces/` opening onto its rows |

Screenshots after: [front at 1440](../../assets/2026-11-06-site-review/after-front-1440.jpg),
[front, whole page](../../assets/2026-11-06-site-review/after-front-1440-full.jpg),
[sheet story](../../assets/2026-11-06-site-review/after-sheet-story-1440.jpg),
[phones](../../assets/2026-11-06-site-review/after-phones.jpg),
[pieces](../../assets/2026-11-06-site-review/after-pieces-1440.jpg).

**Left, and why:**

- **The story's faces and the night look's palette** (findings 8 and 13)
  are unchanged. Both are drawn into every person's 3D scenes, and the
  author judges looks from examples; changing them is for a shown example
  first.
- **On a phone, the sheet runs off the right edge at hello and the rail's
  dots sit over its text.** That is the engine's camera framing, which
  the author approved on a physical phone; it needs their look on one.
- **Hallmark's fresh-context finish review** was not run: it is a
  subagent, and none was asked for.
- **The GitHub About** still points at `/transitions/`, which still works.
  It could point at the bare Pages address once this is pushed; that is a
  change on GitHub, on the author's word.
- **A push**, which publishes the site and the README.
