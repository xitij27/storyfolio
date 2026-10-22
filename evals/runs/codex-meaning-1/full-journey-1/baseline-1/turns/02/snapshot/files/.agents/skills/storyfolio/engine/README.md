# Storyfolio engine

A starting project for one scroll, one story and one family of 3D pieces.
The supplied page is a plain test story, not a person's portfolio.

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
| `extras.ts` | Lazy imports of chapter-specific shapes, each in its own error boundary |
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
look, reduced-motion flag and control store and mount only near their
chapter. Their shapes are children of the formation group.

Use `useExtraFrame` from `components/story/extra-frame.tsx` for an extra's
frame callback. It receives the same state, delta and optional XR frame as
React Three Fiber's `useFrame`. A synchronous exception disables that
callback immediately and unmounts its owning extra, leaving the core scene,
other extras and HTML running. Each extra also has a React boundary for
render failures and rejected lazy imports. For example:

```tsx
useExtraFrame(() => {
  if (line.current) line.current.visible = frameRef.current.from === 1;
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
