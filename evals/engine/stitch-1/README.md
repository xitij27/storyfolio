# Stitch 1: the three worlds as pieces, joined, previewed and in a gallery

28 October 2026. Plan 1 of 3 for the approved
[transitions design](../../../docs/superpowers/specs/2026-10-27-transitions-gallery-design.md):
[the plan](../../../docs/superpowers/plans/2026-10-27-stitch-pieces-and-gallery.md),
executed on the author's "continue with the development"
([record](../../../docs/history/2026-10-27-transition-examples-request.md#28-october-plan-1-goes-ahead)).
No agent run and no paid run: this is the engine and library work the
person test will use. Nothing is published yet.

## Change after the author saw it

Later on 28 October the author said: "No need to make the mixer. The AI
ahent will mix stuff themselves"
([record](../../../docs/history/2026-10-27-transition-examples-request.md#28-october-later-no-mixer)).
The mixer page (`/transitions/mix/`) and the index's "Mix your own"
section were removed; each chapter's pictures now open that whole example
at that chapter (`?c=<chapter>`, through a new `start` on `StitchedStory`
and an instant `goTo`). Making that work found that a page whose CSS
scrolls smoothly turned the jump into a smooth scroll that stopped near the
top; the stage now asks for "instant". `gallery-check.mjs` was rewritten
first and failed (the index still linked to a mixer; no piece link opened
at its chapter), then passed at both sizes. The sections below describe the
gallery as first built, with the mixer, and its checks then;
[gallery-desktop.jpg](frames/gallery-desktop.jpg) and
[gallery-phone.jpg](frames/gallery-phone.jpg) now show it without.

## What was built

The three examples of [transitions 2](../transitions-2/README.md) (one
sheet, one map, the remade pop-up book) are now worlds in the engine, in
`skills/storyfolio/engine/stitch/`, ported from plain three.js 0.160 to the
engine's three 0.180 and TypeScript. A world can hold any of the eight
chapters, so a site is stitched from a mix: which world holds each chapter.

| Part | Files | What it does |
|---|---|---|
| Pure core | `chapters.ts`, `person.ts`, `people.ts`, `mix.ts`, `scroll.ts`, `frame.ts`, `dive.ts` | The chapters and their words, the person's shape and the two made-up people, mixes and seams, the scroll at round 2's pace, where places fall, the dive's steps. 21 tests. |
| Worlds | `sheet.ts`, `map.ts`, `book.ts` | Each builds only its own chapters, poses statelessly from the scroll, and says where a window to the next world opens. Fixed slots (six projects, three quotes) show blanks as plain paper and the rest as "and N more". |
| Stage | `stage.ts`, `world.ts` | Follows the scroll, draws the world holding the story; two chapters in one world join by its own move, in two worlds by a dive: the next world is drawn into a window that fades in over the first 0.35 of the move, then the camera flies until the window fills the view. |
| Page | `react.tsx`, `stitch.css`, `paint.ts`, `land.ts` | The story on a page: caption, chapter rail, contact buttons, project window, and every chapter's words written out for screen readers and for no JavaScript or no WebGL. |
| Engine | `content/person.ts`, `content/mix.ts`, `app/preview/`, `scripts/stitch-check.mjs` | A site's person and mix; `/preview` shows them (`?mix=`, `?person=`); the check shoots every hold and move. |
| Library | `library/stitch/` (checked copy), `app/transitions/` (index, `whole/[world]/`, `mix/`), `components/transitions/` (`gallery-bar.tsx`, `mixer.tsx`, `pieces.ts`), `public/transitions/pieces/` (24 pictures), `scripts/piece-shots.mjs`, `scripts/gallery-check.mjs` | The gallery: whole examples, the mixer with its copyable line, every piece by chapter, and the four-ways study with its swap marked not to use. |

`land.json` moved from `components/story/` to `stitch/`, so the drawing kit
and the worlds load one file.

## How it was checked

Every run below is `scripts/stitch-check.mjs` against a production build of
a scaffolded copy (`/var/tmp/stitch-site`), in headless Chromium 1234 with
software WebGL (SwiftShader) and reduced motion, so each shot stands exactly
where the page is scrolled. A run fails on a page error, a failed request or
a blank 3D picture (under 1 per cent of sampled pixels clearly different
from the corner). Every run listed passed with no problems.

| Mix | People | Sizes | Frames |
|---|---|---|---|
| The whole sheet | Noa, Amara | 1440x900, 390x844 | [sheet-noa.jpg](frames/sheet-noa.jpg) |
| The whole map | Noa, Amara | both | [map-noa.jpg](frames/map-noa.jpg) |
| The whole book | Noa, Amara | both | [book-noa.jpg](frames/book-noa.jpg) |
| The three on a phone | Amara | 390x844 | [phone-amara.jpg](frames/phone-amara.jpg) |
| `sheet,map,sheet,map,sheet,map,sheet,map` (every seam a dive) | Noa, Amara | both | [dive-points.jpg](frames/dive-points.jpg): the first dive at raw 0.1, 0.5, 0.9 and 1.0, then the map's first frame |
| `map,map,book,book,sheet,sheet,book,map` | Noa, Amara | both | [mixed-noa.jpg](frames/mixed-noa.jpg), [mixed-noa-phone.jpg](frames/mixed-noa-phone.jpg) |
| All three worlds and one mix, for an edge person ([edge-person.ts](edge-person.ts)): one place, no study, no quotes, one job inside one year, nine projects | Ines (made up) | 1440x900, and the mix at 390x844 | [edge-person.jpg](frames/edge-person.jpg) |

What root saw in the frames:

- **Each world shows the example's pictures,** compared with
  [transitions 2's frames](../transitions-2/frames/), at the slower pace,
  in system fonts instead of Fraunces and Inter.
- **The dives:** each move's middle shows the next world inside a window of
  the last; no frame is blank. The dive's last frame matches the next
  world's first: mean pixel difference 0.00 into the map at 1440x900 and
  0.72 on a phone; into the book 4.95 and 3.43, which is the book's slow
  sway between two moments (the same book hold shot twice differs by 6.08).
- **Back up:** poses are stateless, and a point shot after scrolling to the
  end is pixel-identical (largest difference 0) to the same point shot on
  the way down. Not watched in a headed browser.
- **Re-entering a world:** in the mixed site the book, entered at "What I
  studied", opens there, and entered again at "What others say" shows that
  spread.
- **Phones:** the map centres the hello sign, the diploma and the contact
  card and fits them to the width, and reads the quotes one at a time
  (the camera goes from bubble to bubble during the hold and the others
  fade). The book starts each hold on its left page, whose words read, and
  pans to the scene.
- **The edge person:** no crash and nothing `undefined`; the study and
  quote chapters are left out and their neighbours join; one place gives a
  finite globe, map and page map; nine projects show six and "and 3 more".
- **The finish** ([finish-before-after.jpg](frames/finish-before-after.jpg)):
  the sheet's printed pictures have paper grain and the sheet stands in a
  dim pool of lamplight with its shadow; the map's buildings, cards and
  bubbles cast shadows on the ground and its cards are die-cut; both
  cameras lean in on holds and stand back while moving.

The gallery ([gallery-desktop.jpg](frames/gallery-desktop.jpg),
[gallery-phone.jpg](frames/gallery-phone.jpg)) was checked with
`library/scripts/gallery-check.mjs` on the static export served under
`/storyfolio/` at both sizes: the index, each whole example and a shared mix
link open with no page error and no failed request, nothing scrolls
sideways, Copy puts `map,map,book,book,sheet,sheet,book,map` on the
clipboard, a chapter button changes the mix in the address, and switching
person changes the words and keeps the mix. The library's 32 tests, its
typecheck and the build pass.

## What is still weak

- **The window of a dive floats.** It is a screen-shaped rectangle drawn
  over the last world at the chapter's look point (on the book, lying on the
  open pages). The design asked for the next scene "held inside an element
  of the last"; only the book comes close.
- **The sheet on a phone:** the wall of projects and the quote cards are
  fitted to the narrow width, as in the example, so their words are small.
- **The map is dark,** by design, so its shadows are faint, and its frames
  stay darker than the book's (mean grey 34 against 89).
- **One place on the map** puts every chapter's things on that one spot.
- **Projects beyond the sixth** are counted ("and 3 more") but cannot be
  opened from the scene.
- **System fonts** make the printed pages plainer than the examples.
- **The book on a phone** shows the right page whole and cuts the left
  page, whose words (the chapter's title and lines) run off the screen's
  left edge in every chapter ([phone-amara.jpg](frames/phone-amara.jpg),
  bottom row). The approved example frames it the same way. Found on
  28 October, in the live check below.
- **Software rendering only.** No physical phone, no headed browser, no
  frame-rate reading; the author approved the engine on a real phone, and
  the stitched story has not been seen there.

## Live check, 28 October

The author pushed `main` at `083a24a0` ("Yes, I pushed to main"); the
"Library on GitHub Pages" workflow, run 40628537713, deployed it. Root ran
`scripts/gallery-check.mjs --url=https://xitij27.github.io/storyfolio`
with playwright-core from `/var/tmp/stitch-site` and Chromium 1234:
both sizes, no problems ([report.json](live-check/report.json),
[desktop.jpg](live-check/desktop.jpg), [phone.jpg](live-check/phone.jpg)).
The index has no mixer and the map's "worked" piece opens at that chapter.

## Decisions made while building

Where the plan was silent, wrong or contradicted by what the shots showed,
root decided and went on. Each line says what was decided, why, and what it
costs if wrong.

- Setup: no worktree, work on main; AGENTS.md says "Commit on main" and the user's instructions override the skill; cost if wrong: none, commits are local and unpushed.
- Pre-flight (T3 to T5): World.anchor returns {position: Vector3, quaternion, height}; fillPose takes {position: [3], normal: [3]} shapes differ; stage converts, normal = (0,0,1) rotated by the anchor quaternion; fillPose stays pure as the plan says; cost if wrong: one adapter
- Pre-flight (T1 internal): placeViews: example formula gives 1.7 for a single place (far = 0); plan says zoom 1 special-case one place to zoom 1, as the plan's interface says
- Pre-flight (T1 internal): yearRange: examples use min(study start, work starts) to ceil(NOW) floor the start year (axis ticks are whole years), widen the start back so the span is at least 2
- Task 1: captions returns Partial<Record<ChapterKey,string>> holding only the keys asked for, not Record; writing a caption for an absent chapter is where undefined would be drawn (Review Focus 3, 5); cost if wrong: callers index with a fallback
- Task 1: added scroll.ts helpers clamp, lerp, smooth, ease, unitPx and chapters.ts titleOf, person.ts PROJECT_KINDS; the worlds need them and the plan lists five modules only; cost if wrong: none
- Task 2: grain takes a seed and uses the repeatable rand instead of Math.random; a picture should not change between visits or shots; cost if wrong: none, it looks the same
- Task 2: mapFrame also returns spanX and spanZ, and both frames are finite for no places; map.ts needs the spread for its padding; zero places would give NaN; cost if wrong: none
- Task 2: PALETTE gains card (#fbf7ee, book.js CARD); dieCut needs it; cost if wrong: none
- Task 3: checks run against a production build (next build, next start), not next dev; the dev server's live-reload socket fails here and the story never mounted; cost if wrong: none, a production build is what ships
- Task 3: stitch-check takes Chromium from CHROMIUM when set (this machine has build 1234, playwright-core 1.64 wants 1248); no download needed; cost if wrong: none
- Task 3: the blank test counts pixels whose channels differ from the corner by more than 90 in sum, sampled from the WebGL buffer right after a draw; the dark gradient backdrop alone differs from its corner by up to 72, so "differs at all" would never find a blank; cost if wrong: a nearly-black scene passes
- Task 3: mountStitch takes an optional spacer element; the React host passes its own; the host owns the page's layout; cost if wrong: none
- Task 3: the React host also writes every chapter's words out in full (screen readers; shown without JavaScript or WebGL); the engine's AGENTS.md asks for the text to be complete without the scene; cost if wrong: a little markup
- Task 3: anchor height stays the framing box's height as the plan says; revisit in Task 5 if the dive reads as a crossfade
- Task 4: on a narrow screen the hello sign, diploma and contact card are centred and fitted to the width, and the quotes are read one at a time (camera travels bubble to bubble over the hold, the others fade to 4 per cent); the plan's own phone check (sign, diploma, each bubble in view) failed with the example's 1.7x pull-back; cost if wrong: the phone map differs from the example's phone framing
- Task 4: the route stays drawn while moving out of "from"; the example dropped it to nothing for that move and brought it back at half opacity, a vanish at a chapter's edge; cost if wrong: none
- Task 4: buildings rise with "worked" if the map holds it, else with "good"; skills with no jobs stand as a stack of tags at home; camera targets of an empty list fall back to home; skills sit on job buildings, and an empty centroid is NaN; cost if wrong: an odd-looking good chapter for someone with no jobs
- Task 4: the made chapter's camera follows the plates' own positions by year, not each place plus a fixed offset; with several projects at one place the example's camera stayed on the first; cost if wrong: none
- Task 4: stitch-check gains --at=LIST for extra points; needed to see each quote on a phone; Task 5's --points uses the same path; cost if wrong: none
- Task 5: the sheet's anchor is half the chapter's picture high (and at most 0.8 of its width), on the camera's axis at the front of the sheet; at the framing box's full height the window already filled the view at the hold, so the dive was a crossfade, a swap by another name (spec anti-goal); cost if wrong: the window looks small on the sheet
- Task 5: the window is drawn over the scene (no depth test); an anchor can lie inside a shape (the globe), and it fades in, so nothing pops; cost if wrong: on a busy hold the window floats in front of things nearer the camera
- Task 5: "scrolling back up plays it in reverse" was checked headless: poses are stateless, and a shot of a point taken after scrolling to the end is pixel-identical to the shot taken on the way down (max diff 0); no headed browser here; cost if wrong: none for stateless poses
- Task 6: the book's window lies on the right page on a phone and across the whole spread on a wide screen, 0.9 of whichever fits; a screen-shaped window "as high as the page is deep" is twice the page's width on a desktop; cost if wrong: the window covers the left page's words on desktop while it fades in
- Task 6: the caption box hides during book chapters; the example did the same (its left page carries the words; the box covered it on a phone); cost if wrong: a reader of a mixed site sees the caption come and go
- Task 6: desk, page edges and grain use the seeded rand, not Math.random; repeatable pictures; cost if wrong: none
- Task 6: the stage passes the frame's clock into a dive (B posed at the same time; A re-posed at that time after its anchor); the book sways with time, and without it the seam frames would not match; cost if wrong: none
- Task 6: the left page caps long lists (6 places, 2 studies, 5 jobs, 6 skill groups) with "And N more." and each wrapped line at 4 lines; names and titles on cards are fitted with fillText's max width; Review Focus 3; cost if wrong: a very long list reads as cut short
- Task 7: the sheet's unseen floor is a dim pool of lamplight (a lit, fading radial texture) rather than a bare ShadowMaterial; a black shadow on the near-black backdrop could not be seen in the shots; cost if wrong: the sheet now stands on a faint warm pool the example did not have
- Task 7: "no frame darker overall than the book's" was judged as "the finish darkens no frame": the map's ground and the sheet's backdrop are dark by design (approved), so their frames (darkest 34 and 59 mean grey) are darker than the book's (89) before and after; the finish changed mean brightness by -0.3 to +10 on the map, and on the sheet only by framing (holds +6 to +15 from leaning in, moves -6 to -21 from standing back); cost if wrong: the author may want lighter worlds
- Task 8: the static export puts pages at out/transitions/..., not out/storyfolio/transitions/... (the base path is in links only); step 1 checked out/transitions/mix/; cost if wrong: none
- Task 8: added scripts/gallery-check.mjs to the library (index, whole examples, a shared mix, sideways scroll, Copy, person switch); step 3's checks, kept so Task 10 runs them against the live site; cost if wrong: none
- Task 8: piece-shots.mjs and gallery-check.mjs load playwright-core from PLAYWRIGHT_CORE (the library has no such dependency, and the plan forbids a new one); cost if wrong: one environment variable to set
- Task 8: gallery-check ignores requests that fail with ERR_ABORTED; Next.js prefetches link targets and navigating on cancels them; a missing file still shows as an HTTP error; cost if wrong: a cancelled real request is missed
- Task 8: the library index's button reads "Transitions gallery" instead of "Transitions study"; the page is now the gallery; cost if wrong: none
- Task 9: rendered an edge person (one place, no study, no quotes, one job inside one year, nine projects) through all three worlds and a mix, in the scaffolded copy only, and kept its file as evals/engine/stitch-1/edge-person.ts; Review Focus 1, 3 and 5 had unit tests but no browser render; cost if wrong: none
- Task 9: the study catalogue also gains rows for transitions-1 and -2, which earlier sessions left out; cost if wrong: none

## Review

Root reviewed the whole change against the plan and its review focus
(self-review: the session's instructions start no helper agents unless the
author asks). One fix was made, test first: the dive's window was drawn
into a half-float picture with no fallback, which a phone GPU without
`EXT_color_buffer_float` or `EXT_color_buffer_half_float` cannot draw into,
so every dive there would show a dark window; `windowType` in `dive.ts` now
falls back to plain bytes, and the all-dive mix passes again. Left as
minor: quick mixer clicks briefly start a second renderer on the same
canvas while the first is still loading (two clicks 80 ms apart settled
on the right picture, no glitch seen); `window.__stitch`, the check's hook,
is present in every site; the project window does not move focus into
itself; the engine's full browser matrix (`npm run check`) was not run,
because it starts playwright's own Chromium 1248, which this machine lacks.

## How to make the shots again

From a scaffolded copy with `npm ci` done (`npm run browsers` there wants
Chromium 1248; this machine has 1234, named with `CHROMIUM`):

```bash
npm run build && npx next start -p 3100 &
CHROMIUM=$HOME/.cache/ms-playwright/chromium-1234/chrome-linux64/chrome \
  node scripts/stitch-check.mjs --url=http://127.0.0.1:3100 \
  --mix=map,map,book,book,sheet,sheet,book,map --person=amara --size=390x844 --points --out=shots
```

The contact sheets were tiled from the PNGs with Pillow, as
[transitions 2's tile.py](../transitions-2/tile.py) does.
