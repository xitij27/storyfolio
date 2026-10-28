# Storyfolio engine

A starting project for one scroll and one story in 3D: shared pieces for what carries on
through the story, and a scene of its own for each chapter.
The supplied page is a placeholder that tests the engine: one sheet whose
picture changes by chapter. It has no design in it; replace all of `content/`.

Taken from V3 at `163b8ceb302b7b4e5beeff8f1161f4cdc7663b15` and made
independent of that site's content, paper shapes and assets. The source
project is unchanged. Storyfolio's engine and generated SVGs are MIT licensed.

## Start

Use Node 22.18 or later with native TypeScript support. Scaffold this folder
with `node <installed-skill>/scripts/scaffold.mjs <site-folder>`. Existing
`docs/story/` files are kept; any conflicting engine path aborts the copy.
Then, in the new site folder:

```bash
npm ci
npm run browsers
npm run dev
```

Open the local address printed by Next.js. Append `?look=dark` to choose a
look and `?fps` to show the frame meter. The appearance switch preserves
other query parameters, the fragment and the current scroll position.
Read the frame meter on a real phone; software rendering in a headless
browser does not measure phone performance.

Never install dependencies inside an installed skill. The copied project
belongs to the person, has its own lockfile, and does not depend on the
skill after scaffolding. System fonts make builds independent of remote
font services. Add licensed local files with `next/font/local` if needed;
the scene starts without waiting for them and redraws faces when fonts load.

## From storyboard to content

`lib/story/` contains pure, tested calculations. `components/story/` owns
the browser and scene. The person's story belongs in `content/`:

| File | Storyboard input |
|---|---|
| `story.ts` | Chapter IDs, names, roles, beat IDs and screen heights; one fixed piece count |
| `formations.ts` | A rest formation for every beat; optional `within` formation reached as its rest is scrolled |
| `faces.ts` | Pictures or canvas drawing functions for a beat and piece |
| `copy.ts` | Metadata, language, labels and complete HTML text |
| `looks.ts` | Ground, text and surface colors, lights and matte/no floor |
| `extras.ts` | Each chapter's own scene: lazy imports, each in its own error boundary |
| `links.ts` | Ordinary HTML links over a named piece at a named beat |
| `checks.json` | Optional checks of capabilities this fixture exercises |

Use `as const satisfies StoryDef` for the story and
`satisfies Record<BeatId, BeatFormation>` for formations. `checkStory`
also rejects invalid IDs, heights, piece counts and face references at
runtime. A formation contains one position, rotation and size per piece,
plus framing. `layouts.ts` supplies stack, fan, ring, grid, row and seeded
scatter; `measure` bounds their rotated faces. Depth, a custom shape's
extent and a whole formation's turn can require extra framing room.

The HTML in `app/page.tsx` follows the same beat order using `Chapter` and
`Beat`. A `Beat` can carry a static `fallback` image or diagram. Keep one
`h1`, stable chapter heading IDs and every factual claim in HTML. The check
script verifies the rendered beat IDs against the content contract.

The bundle type is in `components/story/types.ts`. Import a bundle inside a
client component, as `content/experience.tsx` does, and pass server-rendered
HTML as children. Bundles contain drawing functions and component loaders,
so cannot be serialized across a server/client prop boundary.

A custom `Piece` component receives its index, face material and look.
Build it at unit width/height centered at the origin. Its parent group gets
the formation's position, rotation and width/height scale each frame. Keep
materials present from the first frame. Extras receive the shared frame,
look, reduced-motion flag and control store, and stay mounted from a beat
before their chapter to a beat after it. Drive each with
`chapterPresence(story, chapter, frameRef.current.beat)` from
`lib/story/story.ts`, 0 to 1 over the travel in and back to 0 over the travel
out: let it grow, unfold, fly in or turn into the next scene with that value,
so that one chapter's scene grows out of the last. Never switch one on or off
at a chapter's edge. Their shapes are children of the formation group.

Use `useExtraFrame` from `components/story/extra-frame.tsx` for an extra's
frame callback. It receives the same state, delta and optional XR frame as
React Three Fiber's `useFrame`. A synchronous exception disables that
callback immediately and unmounts its owning extra, leaving the core scene,
other extras and HTML running. Each extra also has a React boundary for
render failures and rejected lazy imports. For example:

```tsx
useExtraFrame(() => {
  const shown = chapterPresence(story, "middle", frameRef.current.beat);
  if (line.current) line.current.scale.x = Math.max(shown, 0.001);
});
```

`content/extras/middle-line.tsx` uses this hook. A raw third-party `useFrame`
callback, timer, event handler or rejected asynchronous task does not pass
through this guard. Handle failures at those boundaries explicitly;
wrapping a component in a React boundary does not catch them.

For caption controls, use `useControl` or `useControls` from
`components/story/controls.tsx` in a client component. Real controls remain
HTML. The canvas takes no pointer events. Overlay links are hidden and
removed from keyboard navigation outside their beat; supply the same
destination in the text for fallback access.

For a sketch, add a client component importing its own bundle and HTML to
`content/sketches/index.ts`. Its key becomes `/sketch/<id>`. The initial
registry is empty and unknown keys return 404.

## Drawing figures

Draw a diagram flat, on a surface in the scene, with the pen in
`components/story/pen.ts`; do not build it from meshes. The pen works on any
canvas, in units of a canvas 1000 wide: `pen.w` is 1000 and `pen.h` follows
the canvas's shape. Its tones are the look's `ink`, `accent` and `faint`.

| Call | Draws |
|---|---|
| `paper()` | The look's surface over the whole canvas |
| `line(points, { tone, weight, dash, upTo, arrow })` | A line, drawn to `upTo` of its length, with an arrow where the drawn part ends |
| `dot(point, { r, tone, open })` | A dot, or a ring |
| `box({ x, y, w, h }, { tone, weight, fill, r })` | A box filled with the paper, so lines behind it stop at its edge |
| `text(words, x, y, { size, tone, align, width, halo })` | Words; `width` wraps them, `halo` keeps them readable over lines |
| `grid(box, step)` | Faint lines every `step` |
| `timeline(box, from, to)` | A time axis with its years; gives the x of a date in years |
| `map(box, bounds)` | The world's real coastlines and borders; gives the point of a latitude and longitude |

`lib/story/figure.ts` places things: `boundsAround` some places, an `arc`
between two points, a share of a line by its length (`along`), and the
`share` of a value that one step of a scroll takes.

`map` draws Natural Earth's land and borders at 1:50 million (public
domain), from `stitch/land.json`. It is a megabyte, fetched the
first time a map is drawn, and the map is drawn again when it arrives. Give
it the places' real coordinates. Where two places are too close to tell
apart, draw a second map of them at a larger scale beside the first.

In an extra, `Figure` from `components/story/figure.tsx` is a sheet with a
drawing on it, lit like the pieces. `progress` is read every frame;
`dwellAt` from `lib/story/timeline.ts` gives one beat's own progress, 0
before it, 1 after it:

```tsx
<Figure look={look} width={3.6} height={2.5}
  progress={() => dwellAt(frameRef.current, beatIndex(story, "places.route"))}
  draw={(pen, value) => {
    const at = pen.map({ x: 20, y: 20, w: 960, h: 654 }, boundsAround([from, to]));
    pen.line(arc(at(...from), at(...to)), { tone: "accent", upTo: value, arrow: true });
  }} />
```

It is drawn again only when the value, the look, the fonts or the land
change. A face's `draw` can use the pen too: `pen(context, width, height, look)`.
A piece's printed face lies 0.03 in front of its centre, so a figure laid
on a piece goes further forward than that.

On a phone a sheet across the screen is about 320 pixels wide, so words
smaller than about 40 units cannot be read there. Put those in the caption.

## A stitched story

`stitch/` tells the eight chapters in three worlds: a sheet of paper (the
CV bending into each chapter's picture), a map of the person's places, and
a pop-up book. A mix says which world holds each chapter. Two neighbouring
chapters in one world join by that world's own move (the sheet folds, the
camera flies over the map, the page turns); in two worlds, a window showing
the next world opens in the last one and the camera dives into it. Every
picture and word is drawn from the person's data, so no scene code is
written for a person.

- `content/person.ts` is the person, in the shape of `stitch/person.ts`.
  The supplied one is a made-up placeholder: replace it with the confirmed
  facts. A chapter with nothing in it (no study, no quotes) is left out and
  its neighbours join.
- `content/mix.ts` is the mix, one world per chapter in chapter order. The
  gallery's mixer writes it as one line, such as
  `map,map,book,book,sheet,sheet,book,map`; `parseMix` in `stitch/mix.ts`
  reads it.
- `/preview` shows the story from those two files. `?mix=<line>` tries
  another mix and `?person=noa` or `?person=amara` a sample person without
  editing anything.
- `scripts/stitch-check.mjs` shoots `/preview` at every chapter's hold and
  the middle of every move, with reduced motion so each shot stands exactly
  where the page is scrolled, and fails on a page error, a failed request
  or a blank picture. `--points` adds four shots of the first dive, `--at`
  any other points. Run it against a production build (`npm run build`,
  then `npx next start`); open the screenshots.

  ```bash
  node scripts/stitch-check.mjs --url=http://127.0.0.1:3000 \
    --mix=map,map,book,book,sheet,sheet,book,map --size=390x844 --points
  ```

`stitch/` is also the component library's: the library carries a copy,
which `node <skill>/scripts/sync-stitch.mjs` makes and a test keeps byte for
byte. In the skill, change `stitch/` only here, then sync.

The scroll runs at the examples' pace: a chapter takes 1.9 screens of
scrolling (at least 1000 pixels), holds for its first 0.4, and the story
moves at most 0.55 chapters a second however fast the reader scrolls.
Natural Earth's land, for the globe, the map and the book's map page, is
`stitch/land.json`; the drawing kit's maps read it from there too.

## Check

```bash
npm test
npm run typecheck
npm run lint
npm run check
```

`check` builds, starts its own production server on a free local port,
runs the browser matrix and stops only that process group. It writes a
manifest, logs, reports and screenshots under `checks/<timestamp>/` and
returns a failure exit code for failed checks. `PLAYWRIGHT_BROWSERS_PATH`
selects an optional shared browser cache. `PLAYWRIGHT_CORE` is an optional
override; normally the installed local package provides the browser tool.

The matrix checks both looks at wide, short and phone sizes, reduced
motion, no WebGL and no JavaScript. Optional plain-story probes exercise
keyboard access and failed chapter loading. Context loss checks the HTML
fallback. Wide captures include the beginning, middle and end of each
beat's rest; reduced-motion captures also check that a stationary scene
stays still. Open every screenshot for overlap, clipping, legibility and
framing. Automatic passes do not replace visual review.

For a focused investigation use `npm run check -- --only=light-phone`.
`--skip-build` checks a previously built app and is diagnostic only.
Neither establishes a fresh full acceptance run. `scripts/shoot.mjs`
documents individual screenshots, blocked requests, look switching,
overflow and shader checks.

No JavaScript leaves the server-rendered text. No WebGL or a failed scene
leaves ordinary text and any beat's static image. Reduced motion cuts
between poses, including within-beat formations, without idle movement.
The scene pauses offscreen, caps sharpness on touch devices and steps down
quality when measured frames stay slow.
