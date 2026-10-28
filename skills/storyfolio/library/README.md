# Storyfolio library

Portfolio components to see running and copy, each listed by the chapter of
a Storyfolio site it serves: hello, where from, studied, worked, good at,
made, others say, contact, and pieces that hold the whole page together.

Published at https://xitij27.github.io/storyfolio/ by
`.github/workflows/library-pages.yml` whenever this folder changes on `main`.

## What is in it

`catalogue.ts` lists every piece: what it shows, its chapter, where it came
from and which files to copy. The index page, each piece's page
(`app/p/[id]/`) and its demo (`demos/`) are made from that list. `/template/`
is a whole page made of the V2 sections.

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

## The transitions gallery

`/transitions/` shows how one chapter of a site becomes the next, in three
worlds: one sheet, one map, a pop-up book. It has the three whole examples
(`/transitions/whole/<world>/`), each chapter's three pieces as pictures
(each opens its example at that chapter, `?c=<chapter>`), and the earlier
study of one seam joined four ways, whose swap is marked as not to use. A
bar over every story switches between the two made-up people and hides the
words.

There is no mixer: the agent building a site chooses the pieces for each
chapter and shows the mix moving; a person looks here for ideas and says
in words what they would change (the author, 28 October).

The worlds are `stitch/`, a copy of the engine's (see the engine's README,
"A stitched story"). Do not edit it here: change the engine's and run
`node ../scripts/sync-stitch.mjs`; `scripts/stitch-copy.test.mjs` in the
skill fails when the two differ.

`scripts/piece-shots.mjs` made the 24 pictures in
`public/transitions/pieces/` from a running build; run it again when a
world changes. `scripts/gallery-check.mjs` checks a build, local or live,
at desktop and phone sizes: no page error or failed request, no sideways
scroll, a piece opening at its chapter, and the person switch. Both need a
`playwright-core` (`PLAYWRIGHT_CORE`, such as an engine copy's), which the
library does not install.

## The globe's land

`content/land.ts` holds one bit for each of 12,000 dots spread evenly over
the sphere, set where the dot is on land: 2 KB in place of a map file. It
was made by `node scripts/land-mask.ts <countries.geojson>` from Natural
Earth 1:110m countries (public domain), the file the author's portfolio
keeps at `content/data/globe.json` (sha256 `785bba40...c812b`).
