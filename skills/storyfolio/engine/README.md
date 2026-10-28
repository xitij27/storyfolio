# Storyfolio engine

A starting project for a person's site: one scroll that introduces them in
eight chapters, in 3D. `/` is their site, a stitched story read from
`content/person.ts`, `content/mix.ts` and `content/site.ts`; the supplied
person is made up. `/plain-story` keeps the older plain story engine, for a
scene of the person's own.

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

Open the local address printed by Next.js: `/` is the person's site. On the
plain story (`/plain-story`), append `?look=dark` to choose a look and
`?fps` to show the frame meter; its appearance switch preserves other query
parameters, the fragment and the current scroll position.
Read the frame meter on a real phone; software rendering in a headless
browser does not measure phone performance.

Never install dependencies inside an installed skill. The copied project
belongs to the person, has its own lockfile, and does not depend on the
skill after scaffolding. System fonts make builds independent of remote
font services. Add licensed local files with `next/font/local` if needed;
the scene starts without waiting for them and redraws faces when fonts load.

## The person's site

`/` is the person's site: one scroll through the eight chapters, each told by
one of three worlds drawn only from the person's data: a sheet of paper (the
CV bending into each chapter's picture), a map of their places, and a pop-up
book. Two neighbouring chapters in one world join by that world's own move
(the sheet folds, the camera flies over the map, the page turns); in two
worlds, a card showing the next world grows from an element of the last and
the camera dives into it. No scene code is written for a person.

It is read from three files:

| File | Holds | Set at |
|---|---|---|
| `content/person.ts` | The person's confirmed facts, in the shape of `stitch/person.ts`. The supplied one is made up: replace all of it. A chapter with nothing in it (no study, no quotes) is left out and its neighbours join | Stop 2 |
| `content/mix.ts` | Which world holds each chapter, chosen to suit the person from the pieces in the library's gallery, https://xitij27.github.io/storyfolio/transitions/. As one line it reads like `map,map,book,book,sheet,sheet,book,map` (`parseMix` and `formatMix` in `stitch/mix.ts`) | Stop 2 |
| `content/site.ts` | The look (`night`, `daylight` or `blueprint`, in `stitch/look.ts`), the person's own words for any chapter, the CV's address, and the site's language | Stops 4 to 6 |

`/preview` shows the same story and tries things without editing:
`?mix=<line>` another mix, `?look=<id>` another look, `?person=noa` or
`?person=amara` a sample person.

The words under each chapter are written from the person's data (`captions`
in `stitch/chapters.ts`) until the person chooses their own. Put those in
`site.words` by chapter, such as the opening (`hello`) and the close
(`contact`); a world that prints a chapter's words, such as the book's left
page, prints theirs. Every word, each project's line and `more`, and the
CV and project links are also written out in the page's HTML, for anyone
without the 3D and for screen readers. Every page is titled with the
person's name unless it gives a title of its own.

A project opens a window on a click: its line and tags, `more` (a paragraph)
when it has one, and a link to `page` when it has its own page. Write a
project's page as an ordinary Next.js page (such as
`app/projects/<name>/page.tsx`) and give its address as `page`. The CV is a
page too (such as a printable `app/cv/page.tsx`); its address in `site.cv`
shows the CV button and link. Neither shows until it exists.

### A world of your own

When the person asks for a scene the three worlds do not have, write it as a
world: a module in `stitch/` that implements `World` in `stitch/world.ts` for
the chapters the mix gives it (its own scene and camera, `pose` for any point
of the scroll, `anchor` for the element a dive's card stands on, `pick` for a
project under the pointer). Add its id to `WORLDS` in `stitch/mix.ts` and its
factory to `FACTORIES` in `stitch/stage.ts`; it then mixes with the others.
Draw its diagrams flat, with the pen (Drawing figures, below).

### Checking it

`scripts/stitch-check.mjs` shoots a story at every chapter's hold and the
middle of every move, with reduced motion so each shot stands exactly where
the page is scrolled, and fails on a page error, a failed request or a blank
picture. `--path=/` opens the person's site instead of `/preview`;
`--points` adds four shots of the first dive, `--at` any other points,
`--look` a look. `npm run check` runs it for you; to run it alone, use a
production build (`npm run build`, then `npx next start`) and open the
screenshots.

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

## The plain story engine, for scenes of your own

`/plain-story` keeps the engine this project began with: shared pieces
carried through the story in formations, a scene of its own for each
chapter, and the drawing kit. A site made from the mix does not need it. It
is there for a design of the person's own that the worlds cannot hold, and
its pen and land serve any world. `npm run check:plain` runs its browser
matrix (Check, below).

### From storyboard to content

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

The HTML in `app/plain-story/page.tsx` follows the same beat order using `Chapter` and
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

### Drawing figures

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

## Check

```bash
npm test
npm run typecheck
npm run lint
npm run check
```

`check` checks the person's site at `/`. It builds, starts its own
production server on a free local port, shoots the story at every
chapter's hold and move at 1440x900 and 390x844 (the words hidden, and
once on the phone with them), loads it without JavaScript and without
WebGL and looks for the name, every chapter's title and words, each
project's line, `more` and page link, and the CV link, fetches every page
of the site the story links to (the CV, each project's page), and checks
that an address that is not there answers 404 with the person's name in
its title. It
writes `report.json`, logs and shots under `checks/site/<timestamp>/` and
fails on a page error, a failed request, a blank picture, missing words or
a link that does not answer. Open the shots: a pass does not replace
looking. `CHROMIUM` names a Chromium to start instead of playwright-core's
own.

`check:plain` checks the plain story at `/plain-story`. It builds, starts
its own production server on a free local port, runs the browser matrix
and stops only that process group. It writes a
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

For a focused investigation use `npm run check:plain -- --only=light-phone`.
`--skip-build` checks a previously built app and is diagnostic only.
Neither establishes a fresh full acceptance run. `scripts/shoot.mjs`
documents individual screenshots, blocked requests, look switching,
overflow and shader checks.

No JavaScript leaves the server-rendered text. No WebGL or a failed scene
leaves ordinary text and any beat's static image. Reduced motion cuts
between poses, including within-beat formations, without idle movement.
The scene pauses offscreen, caps sharpness on touch devices and steps down
quality when measured frames stay slow.
