# The component library

Made on the author's [23 October direction](../../history/2026-10-23-component-library.md):
a library of components that shows a person how pieces could be used in
their site, with ideas from React Bits and Aceternity UI, and the author's
own portfolio components as ready-to-use templates.

## What it is

A small static Next.js app at `skills/storyfolio/library/`, separate from
the engine, published at https://xitij27.github.io/storyfolio/. Its
[README](../../../skills/storyfolio/library/README.md) says what is in it
and how to run it.

- **By chapter.** Every piece is listed under the chapter of a Storyfolio
  site it serves (the eight of the [portfolio structure](2026-10-22-portfolio-structure.md),
  plus "throughout"), with one line on what it shows.
- **Running, one page each.** Each piece runs on its own page with a
  made-up person, so the browser never holds many WebGL canvases at once
  and a 2D piece never loads three.js. `/template/` is a whole page of the
  author's V2 sections.
- **What to copy.** Each page lists the files to copy, and for a piece
  written from an outside idea, the original and the command that
  installs it.

## Decisions

| Decision | Why |
|---|---|
| No React Bits or Aceternity code; our own pieces from their ideas | Both licences forbid redistributing their code. Using the idea, and pointing the person to install the original, is allowed. |
| 3D pieces read one number, how far their section has scrolled (0 to 1) | The Lab's `ScrollStage` already passes it; V3's exhibits are lifted out of the paper onto the same input. |
| A 2 KB land mask, not a map file or three-globe | Dots of land need only one bit per dot; the globe needs no library. |
| The V3 globe, maze and speech exhibits are not lifted out | They draw on V3's paper sheets. Their standalone forms are the Lab route, the maze project figure and the Lab spectrogram. |
| A native `<select>` and `<button>` in place of Base UI | Drops a dependency; the phone filter keeps its round button. |
| Built and installed outside the skill | The rule the engine follows; `evals/check-skill.mjs` refuses `library/node_modules`, `.next` and `out`. |
| Static export with `BASE_PATH`; plain image addresses go through `asset()` | GitHub Pages serves the site under `/storyfolio/`, which Next adds only to its own links. |

## In the skill

One paragraph in `references/building.md`, at the look stop, offers the
library to the person. It went in on the author's word without a run that
needed it ("Yes, marked untested"): untested, and no paid run is made for it
until the author says.
