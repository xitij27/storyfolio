# Storyfolio stage 2 (the engine) and stage 3 (the build): implementation plan

Current implementation follows the [11 October stage review](2026-10-11-stage-review.md).
The proposal below is preserved as written; its status statements and any
conflicting instructions are historical. Stage 2 is ready for author review.

For Codex to carry out in `/home/kshitij/projects/storyfolio`. Read the
repository's `AGENTS.md` first; it overrides anything here that conflicts.

## Context

On 11 October 2026 the author said: "Id want the end goal of my skill to be
able to build stuff right? so we need to have these things in the skill as
well." Asked two questions that day, they chose **"Plan stage 2 now"**
(stage 1's closing items stay open and may run alongside) and **"Recommend;
person installs"** for other UI/3D/frontend skills (named at each stop, how
to install them, none required). Then: "You just come up with the
implementation plan. Codex will implement it." And, on approving it: "No
commit this plan somewhere so that codex can implement it. NO
IMPLEMENTATION FROM YOU".

Claude wrote this plan on 11 October 2026 after reading V3's sources
(read-only) and this repository's design, harness and saved runs. Nothing in
it has been implemented. **Status: proposed, not started.**

The approved design (`docs/superpowers/specs/2026-10-10-portfolio-skill-design.md`)
already makes building the end goal: a method plus a starter engine, six
stops, four stages. Only stage 1 exists: stops 1 to 3, ending at an approved
storyboard. Stage 2 (the engine), stage 3 (stops 4 to 6, stop 2's sketches,
six references, the whole-site proof) and stage 4 (packaging) have not begun,
and no plan exists for them. Stage 3 runs on the engine, so stage 2 comes
first.

"V3" is the author's portfolio home page, in the private repository
`/home/kshitij/projects/portfolio-website` (clean at `163b8ce` on 11
October). The engine is copied out of its `lib/paper/`, `components/paper/`,
`components/use-webgl-supported.ts`, `components/webgl-boundary.tsx`,
`scripts/shoot.mjs` and `app/globals.css`, and made general. **Read V3 only.
Never change it** (design line 627).

## Global constraints

- Commit on `main`, files added by name, after `git status`: another session
  may be working in this checkout. Never push; the 10 October push permission
  was for that day only. Each commit message ends with Codex's attribution.
- `node evals/check-skill.mjs`, `node evals/check-people.mjs` and `npm test`
  pass before every commit.
- No em dashes in any file written.
- **Never run `npm install` inside `skills/storyfolio/`.** The eval harness
  copies the whole skill folder into every run (`evals/codex-run.mjs:33`).
  Installs, builds and checks happen in a scaffolded copy under
  `${TMPDIR:-/tmp}/storyfolio-engine-check/`, outside any git repository.
- Stage 2 makes no model conversation. Stage 3's paid runs are only the ones
  named below, each with its question written down before it runs.
- No skill text (`SKILL.md`, `references/`) changes in stage 2.
- Anything learned goes into the repository before a task ends (AGENTS.md).

## Decisions this plan takes

| # | Decision | Why |
|---|---|---|
| 1 | Engine source at `skills/storyfolio/engine/`, copier at `skills/storyfolio/scripts/scaffold.mjs` | Design lines 529 to 549; it ships with the skill |
| 2 | Node 22.18 or later, not the design's 20.9 | V3's tests run `.ts` directly with `node --test`, which needs type stripping (unflagged in 22.18). Node 20 reached end of life on 30 April 2026. Record this change in the design's "Open" list and the handover |
| 3 | Exact versions from V3's `package-lock.json`: `next` 16.2.10, `react` and `react-dom` 19.2.4, `three` 0.180.0, `@react-three/fiber` 9.6.1, `@react-three/drei` 10.7.7, `tailwindcss` and `@tailwindcss/postcss` 4.3.2, `typescript` 5.9.3, `eslint` 9.39.4, `eslint-config-next` 16.2.10, `@types/three` 0.185.0, `@types/react` 19.2.17, `@types/react-dom` 19.2.3; `@types/node` the current 22.x; `playwright-core` the current stable, pinned | Design line 348 ("V3's, at the versions V3 runs") |
| 4 | None of V3's other dependencies. Replace `motion`'s `useReducedMotion` with a 15-line `matchMedia` hook, `lucide-react` with inline SVG, `cn` with a string join | Design line 350: no library for motion, smooth scrolling or languages |
| 5 | No web font is downloaded: system font stacks by default, with `next/font/local` documented for later | `next/font/google` fetches at build time, which fails offline and in sandboxed runs |
| 6 | `scripts/shoot.mjs` resolves `playwright-core` from the engine's own `node_modules`, with `PLAYWRIGHT_CORE` as an override; Chromium installed by `npx playwright-core install chromium` | Settles the design's open item (line 658), subject to Task 9 confirming it |
| 7 | A story is a bundle passed to the shell. `/` renders `content/`'s main story and `/sketch/[id]` renders any bundle in `content/sketches/` | Stage 3's stop 2 sketches then need no engine change |
| 8 | Left out: the bending sheet, the flurry, the globe, maps, the mirror floor, environment reflections, languages, the boot sequence | Design lines 452 to 461 |
| 9 | Evidence of engine checks goes in `evals/engine/plain-story-1/` | AGENTS.md: what a test run showed is kept in the repository |

## Stage 2: the engine

### Task 0. Put this plan in the repository and record the directions

Already done in the commit that added this plan: the plan is at
`docs/superpowers/plans/2026-10-11-stage-2-engine-stage-3-build.md`, the
plan index has a row for it, and `docs/handover.md` records the author's
directions above and names this plan.

Left for Codex, in the same commit as Task 1:

1. `docs/handover.md`, "Start the next session": change the Node
   prerequisite to 22.18 (decision 2).
2. The design's "Open" section: a dated line for decision 2.
3. The plan index row: status "Stage 2 in progress".

### Task 1. Skeleton and guards

- `skills/storyfolio/engine/package.json`: `"private": true`, no `"type"`
  field (as V3), `"engines": { "node": ">=22.18" }`, exact versions from
  decision 3. Scripts: `dev`, `build`, `start`, `lint` (`eslint`),
  `typecheck` (`tsc --noEmit`), `test`
  (`node --disable-warning=MODULE_TYPELESS_PACKAGE_JSON --test "lib/**/*.test.ts"`),
  `check` (`node scripts/check.mjs`), `browsers`
  (`playwright-core install chromium`).
- `tsconfig.json`, `eslint.config.mjs` and `postcss.config.mjs` from V3,
  with what names V3's own files taken out. `tsconfig` keeps
  `allowImportingTsExtensions` and the `@/*` path.
- `next.config.ts`: minimal. `engine/.gitignore`: `node_modules/`, `.next/`,
  `next-env.d.ts`, `checks/`.
- Root `.gitignore`: add `skills/storyfolio/engine/node_modules/` and
  `skills/storyfolio/engine/.next/`.
- `evals/check-skill.mjs`: fail if `engine/node_modules` or `engine/.next`
  exists ("install in a scaffolded copy, never in the skill"). Exempt
  `engine/CLAUDE.md` from the `@`-path rule, since loading `AGENTS.md`
  at once is what it is for.
- Root `package.json` `test`: also run
  `skills/storyfolio/engine/lib/story/*.test.ts` and
  `skills/storyfolio/scripts/*.test.mjs`, with
  `--disable-warning=MODULE_TYPELESS_PACKAGE_JSON`.

### Task 2. The units, `engine/lib/story/`, each with a test

No React or browser in them. Each imports the others by relative path with
`.ts` and never `@/` (V3 handover line 1655). Port V3's tests for what is
kept, as `node:test` with `node:assert/strict` in V3's style, and write new
ones for what is new.

| Unit | From V3 | Keep | Take out or add |
|---|---|---|---|
| `timeline.ts` | `lib/paper/timeline.ts` | All: `playhead`, `phase`, `place`, `settle`, `weight`, `dwellAt`, `gathered`, `approach`, `TRAVEL` | Comments say "pieces", not "pages" |
| `formation.ts` | `lib/paper/poses.ts` | `Vec3`, `Pose`, `lerp`, `smoothstep`, `SPREAD`, `stagger`, `blankFormation`, `mixFormation`, `swing` | Remove `paper`, `wrap` and `bow`. `pages` becomes `pieces`. Add `BeatFormation = { rest: Formation; within?: Formation }` and `atRest(out, beat, dwell)`, which blends `rest` to `within` by the beat's dwell (design line 405) |
| `layouts.ts` | new | | `stack`, `fan`, `ring`, `grid`, `row`, `scatter` (seeded by `rand`). Each returns `Pose[]` for `n` pieces of a given size; `measure(poses)` returns `{ span, rise }` from the poses and their sizes |
| `camera.ts` | `lib/paper/camera.ts` | All, as is | "The paper's own bar" becomes "the story's own bar" |
| `story.ts` | `lib/paper/chapters.ts` | `beatIndex`, `beatHeight`, `chapterAt`, `chapterNear`, `chapterNumber`, flattened `BEATS` | Generic over a story: `StoryDef = { pieces: number; chapters: readonly ChapterDef[] }`, `ChapterDef = { id; number; name; role; beats }`, `role` one of opening, who, where, how, what, outcomes, others, close (design line 238), `BeatIdOf<S>`. Add `checkStory(story, formations, faces)` returning problems: an id used twice, a height under 1, a beat with no formation, a formation with the wrong number of poses, a face naming a missing beat or piece |
| `quality.ts` | new | | From a rolling window of frame times: the pixel ratio step and whether shadows are on. It steps down where frames are slow and never steps back up (design lines 421 to 423) |
| `overlay.ts` | `pageOnScreen`, `see` and `moved` in `lib/paper/flurry.ts` | The projection | `pieceOnScreen` only; nothing of the flurry |
| `controls.ts` | `lib/paper/controls.ts` | `createControls` | Keys are strings. `piece` (which piece the pointer or keyboard is on) is the one built-in key. Remove `handTurn` and the globe keys |
| `looks.ts` | `lib/paper/looks.ts` | `parseLook`, `lookFromSearch`, `searchWithLook`, generic over a list and its default | `Look = { id, ground, ink, faint, accent, surface: { color, roughness, glows }, lights: { ambient, key, fill, rim }, floor: "matte" \| "none", shadows }` (design line 468). No mirror, numerals or curl |
| `typeset.ts` | `lib/paper/typeset.ts` | All, as is | |
| `rand.ts` | `lib/paper/rand.ts` | As is | |

### Task 3. The components, `engine/components/story/`

Before writing these, read V3's `docs/v3-handover.md` lines 1395 to 1721
("Learned the hard way", "Rules that hold throughout"). These rules shape
this code most:

- React Three Fiber aims a camera given by props at the origin.
- A shader program is built the first time something is drawn with it, so
  every piece material is drawn in the first frame.
- Meshes without a transform are not depth-sorted, so each piece is a group
  with its own transform.
- An emissive map ignores alpha.
- Anything wider than the screen makes a phone scroll sideways.
- A link taken off its piece keeps its place.
- The first frame can be drawn before a `useEffect` has run.
- An on-demand chunk can fail to arrive.
- The server renders the controls.

| Component | From V3 | Does |
|---|---|---|
| `story.tsx` | `components/paper/paper.tsx` | The shell. Takes a story bundle. Measures `[data-beat]` blocks and captions into `Stage`, turns the scroll into a playhead ref, and sets `data-scene` on or off, `data-look` and the look's colours as CSS variables. Mounts the scene behind a `WebGLBoundary`, the rail and the bar (the look switch, while there is more than one look). Pauses the scene off screen. Leans the pieces towards a mouse, never for touch or reduced motion. Drops numerals and languages |
| `use-reduced-motion.ts` | new (decision 4) | `matchMedia("(prefers-reduced-motion: reduce)")` through `useSyncExternalStore` |
| `use-look.ts`, `look-switch.tsx` | V3's files of those names | The look from `?look=`, kept in the address |
| `chapter.tsx` | `components/paper/chapter.tsx` | `Chapter`, `Beat`, `Kicker`, `Title`, `Body`, `Note`, with the `story-` class prefix. A beat's height comes from the story |
| `conductor.tsx` | `components/paper/conductor.tsx` | Eases the phase each frame and fills a `Frame`. No flurry. `newFrame(pieces)` |
| `scene.tsx` | `components/paper/scene.tsx` | One `Canvas`. Pixel ratio from `quality.ts` and a coarse pointer; `frameloop` from on screen. Contains Conductor, lighting, pieces, and the bundle's extras, each lazy, mounted while `chapterNear`, inside its own `WebGLBoundary` and `Suspense`. A `webglcontextlost` listener on the canvas turns the scene off (V3's boundary cannot catch that) |
| `pieces.tsx` | new, on the framing in `components/paper/pages.tsx` lines 334 to 420 | Each frame: `mixFormation` of from and to with the stagger, the beat's `within` blend, then V3's framing (`roomBeside`, `bandShare`, `swing`, `overScale`, `overAnchor`, `bandFit`, `cameraDistance`, `viewHalf`, `stageLift`), without the flurry, the globe or `handTurn`. Sets each piece group's position, turn and size. A piece's shape comes from the bundle; the default is a thin card with a face |
| `faces.ts`, `face-material.ts` | `components/paper/prints/store.ts` and `sheet-material.ts`, what is not the paper's | A face is a picture or a canvas the bundle draws on. Made two to a frame from a queue. Each is drawn again once fonts load. `MeshStandardMaterial` with `onBeforeCompile` mixes two maps by a uniform, so a face fades into the next as the piece moves |
| `stage.tsx` | `components/paper/stage.tsx` | Lights, fog and a matte floor from the look. No `MeshReflectorMaterial` or `Environment` |
| `rail.tsx` | `components/paper/chapter-rail.tsx` | As is |
| `overlay.tsx` | `components/paper/controls/reference-links.tsx` | Real links laid over the pieces the bundle names, placed each frame by `pieceOnScreen`, hidden and out of the tab order while off their beat |
| `meter.tsx` | new | A frame meter shown with `?fps` |
| `use-webgl-supported.ts`, `webgl-boundary.tsx` | V3's files of those names | As is |

### Task 4. Styles and the app

- `components/story/story.css`: V3 `app/globals.css` lines 433 to 656, and
  the reduced-motion rules after them, with `paper-` renamed `story-`: the tall blocks, the pinned caption, the short
  screen query (`max-height: 34rem`), `data-scene="off"`, the caption's
  cloud, the scene fading in, the scroll-driven caption fades, and reduced
  motion. Colours come from the look's CSS variables.
- `app/layout.tsx`: `lang` and metadata from `content/copy.ts`, system font
  stacks. `app/globals.css`: Tailwind and `story.css`.
- `app/page.tsx`: renders the main bundle. One `h1`.
- `app/sketch/[id]/page.tsx`: renders `content/sketches/<id>`, with
  `generateStaticParams` from `content/sketches/index.ts`, which is empty in
  the plain story.

### Task 5. The plain story, `engine/content/`

What the agent writes for a person later. Here it is the engine's own story,
which the checks run against (design line 344): seven card pieces, three
chapters of one beat each.

1. `opening.gather` (height 2): rests scattered, gathers into a stack as it
   is scrolled (`within`).
2. `middle.fan` (height 1): fanned. Its chapter has one lazy extra, a thin
   line under the fan, to exercise loading, the guard and `chapterNear`.
3. `close.whole` (height 1): the stack closed and whole. One overlay link,
   on piece 0, to `#opening`.

| File | Holds |
|---|---|
| `story.ts` | The story `as const satisfies StoryDef`, and `BeatId` |
| `formations.ts` | `Record<BeatId, BeatFormation>`, built with `layouts.ts`. TypeScript fails while a beat has none |
| `faces.ts` | Canvas faces (a number and a word), and one picture face from `public/plain/face.svg` |
| `copy.ts` | Every word a visitor reads, plain, saying what the page is: an engine's test story |
| `looks.ts` | Two looks: a light ground with dark ink, and a dark one |
| `extras.ts`, `extras/middle-line.tsx`, `links.ts` | As described above |
| `index.ts` | The main bundle. `sketches/index.ts` exports an empty record |

### Task 6. The checks, `engine/scripts/`

- `shoot.mjs`: V3's `scripts/shoot.mjs` with `.paper` renamed `.story`, the
  `kp-booted` init script removed, an empty default `--ignore`, and
  `playwright-core` resolved per decision 6. Keep every option and every
  failure.
- `check.mjs`: runs `next build`, starts `next start` on a free port, waits
  for a 200, runs the matrix below, and writes `checks/<timestamp>/<name>/`
  with screenshots and `report.json`. It stops the server through the
  child's process group, never `pkill -f` (V3 handover line 1599). It exits
  non-zero if any run has problems.

| Name | Size | Flags | Expect |
|---|---|---|---|
| wide | 1440x900 | `--beats --late-shaders=40000 --inside=.story-control` | scene on, every beat |
| short | 1280x720 | the same | scene on |
| phone | 390x844 | `--touch --beats --inside=.story-control` | scene on |
| reduced | 1440x900 | `--reduced-motion --beats` | scene on |
| no-webgl | 1440x900 | `--no-webgl --beats --expect-scene=off` | scene off |
| no-js | 1440x900 | `--no-js --expect-selector=h1` | text only, no canvas |

`--expect-beats` is the count the wide run reports, held for the rest. V3
handover line 1420 names two failed requests seen against `next start`;
handle them as it says.

### Task 7. The copier, `skills/storyfolio/scripts/scaffold.mjs`

`node scaffold.mjs <folder>` copies `engine/` into the folder, leaving out
`node_modules`, `.next` and `checks`. The person's folder already holds
`docs/story/`, so it may be non-empty. If any file it would write already
exists, it writes nothing and lists the conflicts. Logic in an exported
function; `scaffold.test.mjs` covers an empty folder, a folder with
`docs/story/`, and a conflict.

### Task 8. The engine's own instructions

- `engine/AGENTS.md`: V3's Next.js block ("This is NOT the Next.js you
  know ... read the relevant guide in `node_modules/next/dist/docs/`").
  Then: read `docs/story/handover.md` first and keep it current; all context
  is kept in this repository (design line 113); install, check and look at
  the screenshots before calling anything done.
- `engine/CLAUDE.md`: `@AGENTS.md`.
- `engine/README.md`: the layout, the `content/` contract and how a
  storyboard's rows map onto it, the commands, `?look=` and `?fps`, and
  "Taken from V3 at `163b8ce`".

### Task 9. Prove it, and stop for the author

1. `node skills/storyfolio/scripts/scaffold.mjs "$TMPDIR/storyfolio-engine-check"`,
   then `npm install` and `npm run browsers` there. This needs the network,
   so ask for approval to run outside the sandbox if needed. Copy the
   generated `package-lock.json` back into `skills/storyfolio/engine/`.
2. In a second fresh scaffold, `npm ci` from that lockfile. Then `npm test`,
   `npm run typecheck`, `npm run lint`, `npm run build`, `npm run check`.
   All pass.
3. Open every screenshot and write down what is wrong in it. V3 found real
   faults that passed every check (design line 449).
4. Commit `evals/engine/plain-story-1/`: `findings.md` (versions, commands,
   results, each screenshot's verdict, deviations), every `report.json`, and
   the screenshots. Add a line on this folder to `evals/README.md`.
5. **Stop and ask the author to scroll it:** `npm run dev -- -H 0.0.0.0` in
   the scaffold, on their computer and their phone with `?fps`. Record their
   words verbatim in the findings and the handover. Fix what they name and
   repeat steps 2 to 4.
6. Stage 2 is done when the author says yes. Update the handover, the plan
   index and the design's "Open" list (the browser item is settled), then
   commit.

## Stage 3: the build

Begins only after stage 2 has the author's yes. AGENTS.md governs every
skill line: it goes in only after a run where an agent without it got that
thing wrong. So the references are written after the baseline runs, never
before.

### Task 10. The build fixture and harness, with no model yet

- `evals/builds/embedded-1/`: the start state. The embedded fixture's
  material, plus `docs/story/{facts,concepts,storyboard,decided-for-you,handover}.md`
  copied byte for byte from `evals/runs/codex-opening-1/embedded/with-2/files/docs/story/`.
  That plan met the full bar. The person is an engineer, not a researcher,
  and the object is "six thick row cards", not sheets, as design line 603
  asks. `README.md` gives the provenance and source hashes. That
  conversation ended without the person's yes to the storyboard, so the
  first build message supplies it.
- `evals/prompts/build-turn{1,2,3,4}.md`, the person's side:
  1. "Yes to the storyboard. Build it."
  2. After the spine: picks the first look.
  3. After the chapters: picks the agent's recommended sentence for each.
  4. After the finish: "It looks right on my phone."
- `evals/lib/build.mjs` (pure, unit-tested) and `evals/codex-build-run.mjs`.
  Before the agent starts, the harness copies the fixture into `WORK`, runs
  the scaffold, runs `npm ci` and points `PLAYWRIGHT_BROWSERS_PATH` at a
  shared cache. Only the harness has the network; the agent keeps
  `network_access: false` (`evals/lib/codex.mjs:29`). After the last turn
  the harness runs `typecheck`, `lint`, `build` and `check` on what the agent
  made, and saves the reports, the screenshots and every file the agent
  wrote, as `codex-run.mjs` does.
- **Probe before any paid run:** check that `npm run build` and
  `npm run check` work under the same Codex sandbox the agent gets (find the
  CLI's sandbox command for this version and record it). If they do not,
  stop and ask the author whether build runs may have the network or run
  outside the sandbox.
- `evals/prompts/judge-build.md` and `evals/lib/build-score.mjs` (unit-tested,
  in the style of `score.mjs`). The criteria:
  - nothing invented, and nothing unconfirmed printed, against the fact sheet;
  - the storyboard's chapters, beats and formations are what was built;
  - the three fallbacks are present;
  - other skills are named with how to install them, and none is installed
    by the agent;
  - the person is asked at stops 4 to 6 only what Ask or decide gives them;
  - `decided-for-you.md` is kept current.

  The harness's checks are scored, not judged.

### Task 11. Baseline build runs (2 conversations)

Question, written first: with the engine but no build references, what does
an agent get wrong at stops 4 to 6? The skill for this run is a candidate
`SKILL.md` whose stops table gains rows 4 to 6 (Spine, Chapters, Finish;
design lines 90 to 92), each naming no reference, and nothing else. Commit
it before running. Run one conversation, record its tokens (see
`evals/runs/codex-token-usage-audit-1/`), and ask the author before the
second. Findings go in `evals/runs/codex-build-1/findings.md`.

### Task 12. Write the references against the baseline

Each new line is tied to a failure in `evals/runs/codex-build-1/`, recorded
in a `written-against.md` as `codex-sol-2` did. Leave out what the baseline
did well. Each is at most 1,500 words and named in `SKILL.md`, which stays at
800 words or fewer. Sources:

| Reference | From |
|---|---|
| `engine.md` | The engine README; design lines 339 to 461 |
| `look-and-type.md` | Design lines 463 to 479 |
| `rules.md` | V3 handover lines 1395 to 1721, the general rules only (design lines 481 to 496) |
| `checks.md` | `check.mjs`, and what to look for by eye |
| `other-skills.md` | Design lines 498 to 523: recommend, the person installs, none required. Agent-neutral, as the author asked on 11 October ("or rather any AI agent", handover directions table): how to install for agents with a skills folder (at least Claude Code and Codex), and what to do in one without. Commands checked against each source repository on the day and dated. Read each third-party source before listing it |
| `finishing.md` | The design's checklist: share card, icon, missing-page page, legal notice, how to publish (the person publishes) |

Also:

- Stop 2: three rough three-beat sketches on the engine at `/sketch/<id>`,
  replacing the last line of
  [concept.md](../../../skills/storyfolio/references/concept.md) ("In this
  version a concept is shown in words").
- Remove "This version plans the site and does not build it" and "say that
  building is not in this version" from `SKILL.md`.

### Task 13. Rerun, then a planning regression

1. The same fixture with the references, 2 conversations. Compare with Task
   11. At most two rounds of rewording, as stage 1 allowed.
2. `SKILL.md` has changed, so rerun codex-closing-1's cases (analyst,
   analyst-overstate, student, twice each: 6 conversations) on the unchanged
   rubric and compare with codex-closing-1, which ran on the current skill.

### Task 14. The proof (design Testing, item 5)

One fresh conversation through all six stops for the embedded person: stops
1 to 3 with the existing turn prompts, then the build turns. The harness
checks pass, every beat's screenshot is looked at, and the author scrolls
the site. Record their words. Stage 3 is done when they say yes. Stage 4,
packaging, then gets its own plan.

## Cost

Stage 2: no model conversations. Stage 3: Task 11 needs 2, Task 13 needs 2
to 4 plus 6, and Task 14 needs 1. That is 11 to 13 conversations, each judged
once. Build conversations are much longer than planning ones, so Task 11's
first conversation is the cost probe, and the author is asked before more.

## Verification

- Stage 2: Task 9 steps 1 to 6. A second scaffold built from the committed
  lockfile passes `test`, `typecheck`, `lint`, `build` and `check` at all
  six settings; every screenshot is looked at and written up; the author has
  scrolled it and said yes.
- In this repository: `node evals/check-skill.mjs` (with the new
  `node_modules` guard), `node evals/check-people.mjs` and `npm test` (now
  including the engine units and the copier) pass. `git status` shows no
  `node_modules` or `.next` under `skills/`. V3's `git status` is unchanged.
- Stage 3: each paid cohort has its question recorded before it runs, a
  findings file, `written-against.md` for every new line, and the planning
  regression compared with codex-closing-1.
