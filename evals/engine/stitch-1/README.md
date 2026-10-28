# Stitch 1: the three worlds as pieces, joined, previewed and in a gallery

28 October 2026. Plan 1 of 3 for the approved
[transitions design](../../../docs/superpowers/specs/2026-10-27-transitions-gallery-design.md):
[the plan](../../../docs/superpowers/plans/2026-10-27-stitch-pieces-and-gallery.md),
executed on the author's "continue with the development"
([record](../../../docs/history/2026-10-27-transition-examples-request.md#28-october-plan-1-goes-ahead)).
No agent run and no paid run: this is the engine and library work the
person test will use. Nothing is published yet.

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
- **Software rendering only.** No physical phone, no headed browser, no
  frame-rate reading; the author approved the engine on a real phone, and
  the stitched story has not been seen there.

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
