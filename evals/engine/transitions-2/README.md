# Transitions 2: three ways through a whole portfolio

27 October 2026. The author asked for examples to judge instead of
technical questions, each realistic enough to go into a portfolio with only
the text changed ([record](../../../docs/history/2026-10-27-transition-examples-request.md)).
[Transitions 1](../transitions-1/README.md) joined one seam of one person
four ways; these examples run through all eight chapters of the agreed
[structure](../../../docs/superpowers/specs/2026-10-22-portfolio-structure.md)
(hello, where from, studied, worked, good at, made, others say, contact).

## What was built

`examples/` is one page with three examples. Every picture and word is drawn
from a person's data in [people.js](examples/people.js), which holds two
made-up people: Noa Lindqvist, a research engineer (the component library's
person), and Amara Okafor, a product designer with other places, a master's
degree and other jobs. A switch at the top of each example changes the
person; nothing else changes, which is the author's "only the text" test.

| Example | How one chapter becomes the next | Frames |
|---|---|---|
| A. One sheet | The CV is one sheet of paper, cut invisibly into six tiles. It wraps into a globe (the route drawn place to place), unrolls into the diploma, stretches into a timeline of the jobs, folds into a four-panel leaflet of skills, splits into a wall of six project plates (each opens on a click), pairs into three quote cards and folds back into the contact page. The next picture is printed on the sheet as it moves. Closest to V3, whose pages bend into each picture. | [sheet-noa.jpg](frames/sheet-noa.jpg) |
| B. One map | One dotted map of the person's places. Each chapter rises where it happened: a sign where they live now, the route, the diploma at the school, a building per job as tall as its years, the skills used there stacked on its roof, project plates where they were made, quotes where those people worked, then back home with the whole life in view. The camera flies between them, rising on long journeys. | [map-noa.jpg](frames/map-noa.jpg) |
| C. Pop-up book | Each chapter is a spread: words on the left page, cut-outs standing on the right. Turning the page curls it over, folds the old cut-outs flat and raises the new: the person, flags on a map, the school and diploma, a building per job, tabbed skill cards, project cards (each opens), speech bubbles, an envelope with the letter. | [book-noa.jpg](frames/book-noa.jpg) |

[all-amara.jpg](frames/all-amara.jpg) shows the three with the second
person. Each contact sheet is 16 points down the scroll (each chapter's hold
and the middle of each move) at 1440 by 900, from
[shots.mjs](shots.mjs) and [tile.py](tile.py) in headless Chromium with
software WebGL. They are sketches of movement, not finished design.

## What root left out, and why

- **A cloud of particles that reforms into each shape.** It is the usual
  answer to "one 3D thing morphs into another", but it is pieces that
  rearrange, which the author rejected on 22 October
  ([record](../../../docs/history/2026-10-22-author-rejects-rerun-4.md)).
- **One seam's own shared shape** (the pipeline becoming the route in
  transitions 1). It needs a shape found for each seam of each person,
  which is not "only the text".

## How to run it

The page expects its modules at `/files/` and the engine's Natural Earth
land (`skills/storyfolio/engine/stitch/land.json`, not copied here; it lay
in `components/story/` until 28 October) at `/files/land.json`. `shots.mjs`
serves it that way:

```bash
node shots.mjs evals/engine/transitions-2/examples \
  skills/storyfolio/engine/stitch/land.json <outDir> sheet/noa 1440 900
```

It needs `playwright-core` (1.56.1 was used) and a Chromium; it uses
`~/.cache/ms-playwright/chromium-1234`. three.js 0.160.0 and the Fraunces
and Inter fonts load from public CDNs. The author was shown it through the
brainstorming companion, which serves the same files from a scratch folder
(`index.html` there is named `transition-examples.html`).

## Checks

- All three load for both people with no page errors. The only failed
  request on the local check server is the browser's favicon, which it does
  not serve; the companion page loaded with no failed request at all.
- Seen in the frames: each chapter is recognisable as its picture, and the
  words on the pictures read at 1440 by 900.
- Not checked: phones. The book narrows to the right page and the map
  stands back on narrow screens, but nothing was viewed at phone size.
- Known weak points: the map's long flights across an ocean show little;
  the book's cut-outs are small at full-book view; the sheet's quotes are
  fixed at three columns and its projects at six plates.

## Round 2: slower, and a better-made book

The author liked all three, found the book crude and every move too fast
([record](../../../docs/history/2026-10-27-transition-examples-request.md#the-examples-and-the-authors-opinion)).

- **Slower, in all three** ([kit.js](examples/kit.js)): a chapter now takes
  about two screens of scrolling instead of one, of which 60 per cent is the
  move (was 50), and however fast the reader scrolls, the story moves at
  most 0.55 chapters a second, easing in behind the scroll. A move takes at
  least about a second. Reduced motion still follows the scroll exactly.
- **The book, remade** ([book.js](examples/book.js)): a wooden desk lit by
  one lamp from the upper left with soft shadows (the turning page shadows
  the spread; the cut-outs shadow the page); cloth covers, a spine and a
  block of page edges; pages that dip into the gutter; paper grain; every
  cut-out die-cut with a white card edge; scenes in layers (a sunburst
  behind the person and a ribbon with the name in front; trees behind the
  school and a rolled diploma in front; a skyline behind the job buildings,
  whose roofs differ and whose windows are lit for the current job; a
  stamped envelope); and a camera that leans in on each open spread and
  stands back while a page turns. [book-noa-2.jpg](frames/book-noa-2.jpg).

Status: shown to the author again; waiting for their opinion. No engine or
skill change and no run until then.
