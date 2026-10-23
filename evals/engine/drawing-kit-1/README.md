# drawing-kit-1: a diagram reference, craft rules and an engine drawing kit

23 October 2026. After person test 2 the author found the diagrams crude
and asked whether the skill should carry a library of diagrams
([record](../../../docs/history/2026-10-23-crude-diagrams.md)). Root
proposed a diagram reference, craft rules and an engine drawing kit, and
to show the kit drawing a few of Dawit's diagrams before any paid run. The
author said "yes". This study is that work and that showing. No agent run
was made.

## The run that needed it

[Person test 2](../../runs/stage-3-person-2/final-review/README.md),
[beats sheet](../../runs/stage-3-person-2/final-review/beats-sheet.png).
The agent built all sixteen pictures as extras out of 3D primitives: a
database is three stacked cylinders, a route is a tube, a service a box
(`content/extras/geometry.tsx` in the served copy). Its map of Addis Ababa,
Amsterdam and Rotterdam is two extruded polygons whose points it typed by
hand (`content/extras/places.tsx`). The waves picture is used twice and the
two-database picture recurs. Several extras read `frameRef.current.dwell`
directly, the dwell of whichever beat is current, so the runbook drawn
again at the talk beat moves with that beat's scroll. Dawit's notes held the real structure in
each case: three cities with years, six named stages, five cutover steps,
85 and 22 pages a week.

## What changed

Engine (`skills/storyfolio/engine/`):

| File | What |
|---|---|
| `components/story/pen.ts` | The pen: `paper`, `line` (part drawn, arrow), `dot`, `box`, `text` (wrap, halo), `grid`, `timeline`, `map`, in units of a canvas 1000 wide, in the look's ink, accent and faint |
| `components/story/figure.tsx` | `Figure`: a sheet in an extra with a pen drawing on it, lit like the pieces, drawn again only when its progress value, the look, the fonts or the land change |
| `components/story/land.ts`, `land.json` | Natural Earth land and borders, fetched the first time a map is drawn; listeners are told when it arrives |
| `components/story/faces.ts` | A face that draws a map draws again when the land arrives (two lines) |
| `lib/story/figure.ts` | Pure placement: `boundsAround`, `mapProjection`, `arc`, `along`, `share`; tested in `figure.test.ts` |
| `components/story/land.test.ts` | Cities on land and seas not, so a swapped latitude and longitude cannot pass |
| `README.md` | Drawing figures: the calls, the map data, `Figure` with `dwellAt`, the 40-unit word size on a phone |

Skill: `references/diagrams.md` (the kinds by question, what each needs,
how it is drawn, the craft rules), named in SKILL.md's stop 2 row, and one
line each in `concept.md` and `building.md` pointing to it. SKILL.md is
now at its 800-word limit.

## The map data

Natural Earth, public domain ("All versions of Natural Earth raster +
vector map data found on this website are in the public domain"), from
`github.com/nvkelso/natural-earth-vector` at `ca96624a56bd078437bca8184e78163e5039ad19`:

| Source | SHA-256 |
|---|---|
| `geojson/ne_50m_land.geojson` | `e874b27a51d146452be360cafb3cc50c86001074a67d534113e6534682f9826b` |
| `geojson/ne_50m_admin_0_boundary_lines_land.geojson` | `2faac4f6b34386f3d21b6e018cf151f241f00e5c936d44dd17d7d9bfb147fa48` |

[land.mjs](land.mjs) packs them as flat longitude, latitude pairs rounded
to 0.01 degree, dropping repeated points: `node land.mjs ne_50m_land.geojson
ne_50m_admin_0_boundary_lines_land.geojson land.json`. The result,
`components/story/land.json`, is 1,014,188 bytes (about 340 KB gzipped),
1,422 land rings and 392 borders, SHA-256
`5b39a4eb8d6066010e975d40715a44daf2fe14bca32c1178cc8b2f5c661ec3b7`. In a
production build it is its own chunk; the home page does not load it.
At 1:50 million lower Manhattan falls in the harbour, so the test uses
inland cities.

## Dawit's diagrams

[fixture/content/sketches/](fixture/content/sketches/) is a sketch, `/sketch/dawit-figures`,
of five chapters, each a different kind from the reference, drawn only
from `evals/builds/full-journey-3`. The engine's one piece is a board that
turns a little between chapters; each chapter's `Figure` grows on it with
the chapter's presence, and its drawing follows `dwellAt` of its beat.

| Chapter | Kind | Facts drawn |
|---|---|---|
| Places | Route on a real map | Addis Ababa (2009 to 2016), Amsterdam (2016), Rotterdam (2020) at their coordinates; the Dutch pair on a second map at a larger scale, 57 km apart |
| Roles | Timeline | Degree 2009 to 2013, library 2013 to 2016, Lumen Pay March 2016 to July 2020, Kestrel Freight from August 2020 |
| Runbook | Gated process | The six stages by name; each stage's content from the data-centre exit notes (dependency map and rehearsed rollback, mirrored reads, dual writes for anything with state, 1, 10, 50, 100 per cent against its SLO, two weeks, old instances switched off) |
| Orders database | Pipeline, working by scroll | Orders service, ferry, Postgres 11 (4 TB) and 15; replicate, dual write, compare, move reads, move writes; the old cluster faint and still connected |
| On-call | Comparison at true scale | 85 and 22 pages a week, one dot a page; no line between them, since only the two numbers are known |

Captures (the engine's `scripts/shoot.mjs`, no problems reported in any mode):
[the scroll-drawn three at the start, middle and end of their beats](shots/dark-scroll.jpg),
[all five at the end, dark](shots/dark-all.jpg), [light](shots/light-all.jpg),
[phone, 390 by 844](shots/phone-all.jpg).

To view it again: scaffold the engine into a new folder with
`node skills/storyfolio/scripts/scaffold.mjs <site>`, copy `fixture/.` over
it, install (or hard-link the `node_modules` of a site with the same
lockfile), `npx next dev -p <port>` and open `/sketch/dawit-figures`.

## What building it showed

- **Word size on a phone.** The first version used 22 to 28 units for
  labels. On a phone a sheet across the screen is about 320 px wide, so
  those were 7 to 9 px. Every word is now 36 or 44 units, the runbook
  runs down the sheet so its names fit, and the rest is in the captions.
  The README states the 40-unit figure.
- **A piece's printed face lies 0.03 in front of its centre.** Sheets laid
  at 0.01 were hidden behind the board; the README says so.
- **Places too close for the scale** need a second map; a route bowed
  under that map was hidden, so it bows the other way.
- **`dwellAt` already existed** in `lib/story/timeline.ts`; the README now
  points to it for a figure's progress.
- **React's lint rule** forbids changing a memoised texture in a frame
  callback, so `Figure` keeps its canvas, texture and redraw state in one
  plain object.
- **Not changed:** a face's canvas is always 768 by 1024, so a pen
  drawing on the face of a piece that is not 3 by 4 is stretched. `Figure`
  sizes its canvas to its sheet. And `next dev` in Next.js 16.3 appends
  its own block to a scaffolded site's `AGENTS.md`.

## Checks

- Repository: `npm test` 362 of 362; `node evals/check-skill.mjs` ok, 800
  words, six references.
- Scaffolded site with the sketch: `npm run typecheck`, `npm run lint`,
  `npm test` (140) pass.
- The engine's `npm run check` on its own placeholder, with the changed
  engine: build and 15 of 15 browser checks pass.

## Not yet known

Whether an agent given the reference and the kit draws diagrams like
these. The repository's rule is that the run a change was made for is made
again: a person test on full-journey-3 with the changed skill. That is a
paid run and waits for the author's word.
