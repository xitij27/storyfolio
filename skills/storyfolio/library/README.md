# Storyfolio library

Portfolio components to see running and copy, each listed by the chapter of
a Storyfolio site it serves: hello, where from, studied, worked, good at,
made, others say, contact, and pieces that hold the whole page together.

Published at https://xitij27.github.io/storyfolio/ by
`.github/workflows/library-pages.yml` whenever this folder changes on `main`.

## What is in it

The front page, `/`, is the gallery of the three worlds (below). The older
pieces are at `/pieces/`: `catalogue.ts` lists every one, with what it
shows, its chapter, where it came from and which files to copy, and the
pieces index, each piece's page (`app/p/[id]/`) and its demo (`demos/`)
are made from that list. `/template/` is a whole page made of the V2
sections.

The gallery's own pages (the front page, `/pieces/`, the piece and study
headers, the bar over a story) use the `--g-*` and `--bar-*` tokens in
`app/globals.css` and two faces served with the site from `app/fonts/`
(Source Serif 4 and Public Sans, both under the SIL Open Font License, the
licences beside them). The pieces keep their own tokens and system fonts,
as the author built them.

| From | Folder | Pieces |
|---|---|---|
| The author's portfolio, V2 | `components/sections/` | Hero, about with a globe, skills with evidence, experience timeline, project grid, testimonials, contact |
| The author's portfolio, V3 | `components/paper/` | Chapter rail, look switch, caption slider, project window, and three exhibits (data points, system stack, network) |
| The author's Lab sketches | `components/lab/` | The pinned scroll stage, layers, a route on a globe, a live research exhibit |
| The author's project figures | `components/figures/` | A cipher's difference spreading, a maze solved, a before and after |
| Written here from an outside idea | `components/pieces/` | Rotating word, starfield, pixel portrait, typed terminal, dot globe, expanding cards, gooey search, ripple grid |

The author's code is taken from `../portfolio-website` at `163b8ce`, with
next-intl and that site's content replaced by `content/sample.ts`. Its
React Bits and Aceternity UI components are not taken.

## Outside ideas, and their licences

React Bits (MIT with the Commons Clause) and Aceternity UI forbid
redistributing their components' code, so none of it is here. Each piece in
`components/pieces/` is written from the idea alone, and its page names the
original with the command that installs it into a person's own site, which
both licences allow.

## The person

`content/sample.ts` is a made-up person: no person, employer, project or
quote in it is real. A site built from these pieces replaces all of it with
the person's own confirmed facts.

## Run it

Never install inside the skill. Copy the folder out, then, with Node 22.18
or later:

```bash
cp -r <skill>/library <somewhere>
cd <somewhere>
npm ci
npm run dev        # http://localhost:3000
npm test           # the pure helpers and the catalogue
npm run typecheck
BASE_PATH=/storyfolio npm run build   # the static site in out/, as Pages serves it
```

Plain image addresses (an `<img>`, a texture) need the base path, so they go
through `asset()` in `content/sample.ts`.

## The gallery

The front page (`components/gallery/gallery-page.tsx`, also served at
`/transitions/`, the address the skill and the repository's About link to)
shows how one chapter of a site becomes the next, in three worlds: one
sheet, one map, a pop-up book. It opens on the sheet's fold, recorded
(`public/gallery/sheet-fold.webm`, a still poster without script or under
reduced motion, and a pause button), then the three whole examples
(`/transitions/whole/<world>/`), then a table of every world's picture for
every chapter (each opens its example at that chapter, `?c=<chapter>`; on
a phone one world shows at a time). The earlier study of one seam joined
four ways is linked from the footer. A bar over every story switches
between the two made-up people, picks the sheet's move (`?m=slide`, `fold`
or `swing`; a new site starts with the swing, so the gallery does) and
hides the words.

There is no mixer: the agent building a site chooses the world that suits
the person and shows it moving; a person looks here for ideas and says in
words what they would change (the author, 28 and 31 October).

The worlds are `stitch/`, a copy of the engine's (see the engine's README,
"A stitched story"). Do not edit it here: change the engine's and run
`node ../scripts/sync-stitch.mjs`; `scripts/stitch-copy.test.mjs` in the
skill fails when the two differ.

`scripts/piece-shots.mjs` made the 24 pictures in
`public/transitions/pieces/` from a running build; run it again when a
world changes. `scripts/hero-loop.mjs` recorded the front page's loop, the
sheet's fold from hello to studied and back, with an ffmpeg that has
libvpx-vp9 (Playwright's own build has it); run it again when the sheet
changes. `scripts/gallery-check.mjs` checks a build, local or live, at
desktop and phone sizes: no page error or failed request, no sideways
scroll, the front page and the pieces index, a piece opening at its
chapter, the person switch and the move switch. All three need a
`playwright-core` (`PLAYWRIGHT_CORE`, such as an engine copy's), which the
library does not install.

## The globe's land

`content/land.ts` holds one bit for each of 12,000 dots spread evenly over
the sphere, set where the dot is on land: 2 KB in place of a map file. It
was made by `node scripts/land-mask.ts <countries.geojson>` from Natural
Earth 1:110m countries (public domain), the file the author's portfolio
keeps at `content/data/globe.json` (sha256 `785bba40...c812b`).
