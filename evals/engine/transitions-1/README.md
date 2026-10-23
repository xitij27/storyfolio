# Transitions: one seam, four ways across it

23 October 2026, after the author: "I want to focus on the transitions. How
do we transition from one section to another? How one 3D component morphs
into another?" ([record](../../../docs/history/2026-10-23-transitions-focus.md)),
and their "okay go ahead" to this study.

## Why

The engine joins two chapters' scenes only by `chapterPresence`
([presence-1](../presence-1/README.md)): each scene gets 0 to 1 and fades
or scales itself. Person test 2 planned real carry-overs and built
"a cross-handover, not one shape morphing into the next". This study shows
the same seam joined four ways, so the author can choose by seeing them
before the engine or the skill changes.

## What was built

Live at https://xitij27.github.io/storyfolio/transitions/, one page per way.
Source in the library, which is published to GitHub Pages:

| File | What |
|---|---|
| `skills/storyfolio/library/components/transitions/seam.tsx` | Both pictures and the four ways, read from one scroll value |
| `skills/storyfolio/library/lib/morph.ts` | Distance along a path, even resampling, part of a path, blending two paths; tested in `morph.test.ts` |
| `skills/storyfolio/library/app/transitions/` | The index and the four pages |

The seam: picture A, a data pipeline (timetables flow from a store in
Zurich into a forecast store); picture B, where the person has lived (a
route across a dot map: Gothenburg, Delft, Zurich, Montreal). It uses the
library's made-up person rather than person test 2's own scene, because the
library ships in the skill and a ready-made answer for that fixture would
leak into its reruns. The seam is the same kind: a line in a system diagram
becoming a route on a map.

| Way | What happens | Frames |
|---|---|---|
| Today's swap | A scales down as B scales up in the same place, as `chapterPresence` makes agents do | [swap.png](frames/swap.png) |
| Line morph | The pipeline's line, resampled to 96 points, blends point for point into the route; the stores ride its ends and shrink; the map fades in round it | [line.png](frames/line.png), [phone](frames/line-phone.png) |
| Hand-off | The line is taken back into the timetables store, which shrinks into the Zurich marker; the route then draws outward from Zurich both ways, each city appearing as the line reaches it, the map spreading out by distance | [handoff.png](frames/handoff.png) |
| Camera dive | Picture B lies at 8 per cent scale on the store's lid, as a small screen; the camera zooms about it at a steady rate (distance times 0.08 to the power t) until B is the whole view and A has faded | [dive.png](frames/dive.png) |

Each strip shows 0, 32, 40, 46, 52, 58, 66 and 100 per cent through the
pinned section, made with [frames.mjs](frames.mjs) and [strip.py](strip.py)
against the static build served under `/storyfolio/`, in headless Chromium
with software WebGL. Every way runs backwards when scrolled up, and under
reduced motion cuts at the middle.

## What building it found

These matter when a way moves into the engine:

- **A thick line must keep its point count.** drei's `Line` (three's
  `Line2`) redrawn with fewer points kept drawing its old count and read
  past the new end: lines shot out to the origin. Every path is resampled
  to the same N before `setPositions`.
- **drei's `Line` hands its props to the material too.** A `visible={false}`
  prop hid the material for good, so setting the line visible each frame
  showed nothing: the hand-off's ocean crossing never drew in the first
  published build. Visibility is set only on the object, each frame.
- **A line of no length is hidden,** not drawn: a zero-length segment
  gives the thick-line shader nothing to point along.
- **Edges fade with their mesh.** drei's `Edges` has its own material; a
  faded store left its outline circles behind until every material in the
  picture was faded together.
- **A plate meant to match the background turns off tone mapping,**
  otherwise it renders darker than the clear colour and shows as a box.
- **Two lines match only if they run the same way.** The pipeline was laid
  out to run in the route's direction (east to west), so point i of one
  becomes point i of the other without the line folding over itself.

## What each way would need in the engine

- **Line morph:** something shared by two chapters' scenes (a path both
  can set), and `morph.ts`.
- **Hand-off:** an anchor: a named point that one scene ends at and the
  next begins from, and lines drawn on and taken back (`subPath`).
- **Camera dive:** the next scene placed, scaled down, inside an element
  of the last, and a camera path that zooms about it; the engine's beats
  already carry framing.

Status: waiting for the author to try the four and choose. No engine or
skill change, and no run, until then.
