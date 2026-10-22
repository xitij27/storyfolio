# Each scene pictures its section

> **Corrected the same day** by [A portfolio introduces the person](2026-10-22-portfolio-structure.md): one object stays allowed when it can become each chapter's picture, as V3's pages do; the chapters introduce the whole person.

22 October 2026. Amends [the skill design](2026-10-10-portfolio-skill-design.md)
on the author's direction ([record](../../history/2026-10-22-change-the-design-direction.md)).

## Why

The design said one object in 3D, five to twelve similar pieces, carries the
whole story and "becomes what each chapter needs". Five built or sketched
sites followed it, and every one was the same pieces rearranged. The author
rejected the first as "the same 3d asset roaming around across each scene"
and the last, after four reworded reruns, as "some bunch of rods with dots
on them, and they glow here and there and they just arrange themselves"
([first](../../history/2026-10-22-author-review-first-reaction.md),
[last](../../history/2026-10-22-author-rejects-rerun-4.md)).

Identical pieces built from simple shapes can only be rearranged. They can
fold into a picture, as V3's pages folded into a globe, only when the
pieces are something that can become a picture; bars, tiles and sockets
cannot. And agents read the honesty rule as "depict nothing real", so they
would not draw even a generic board to show what a firmware engineer works
on. The reruns then pushed the scene toward a chart (six of forty sockets
lit), which the author did not ask for either.

## The author's standard

A scene is about its section: the person introducing themselves, their
work, or their field. With the captions hidden, a visitor should still see
who this is and what they do.

## What changes

- **One world, not one object.** The concept names the things the person
  works with and makes. Each chapter's scene is a picture of that chapter's
  subject, made from that world. Continuity comes from the world, the look,
  the camera and the story, not from one set of pieces rearranged.
- **What does not work** gains: one set of pieces rearranged through every
  chapter; a chart standing in for a scene.
- **Illustration is allowed and labelled.** Picturing the kind of thing the
  person works with (a plate, a dashboard, a board on a bench) is not a
  claim. A particular device's design, a measured value or an event is, and
  stays bound by the fact sheet.
- **The tests.** Backdrop asks whether, with captions hidden, each scene
  shows what its chapter is about. Emblem stays: a picture of this person's
  work, not the symbol of the trade.
- **The storyboard** names, per beat, what the scene shows and which real
  pictures are in it, in place of how pieces stand and what is on their
  faces.
- The rule added during the reruns, "drawing a confirmed number, order or
  proportion as it is invents nothing", and the concept line "showing is in
  the shapes: how many, how long", are removed. They produced the chart.

## What stays

One scroll, one story, one question answered at the close, a form from the
person's trade for the chapters, the stops, the honesty rules, the text in
HTML with the scene optional, and the engine. The engine already supports a
scene per chapter: `extras.ts` loads chapter-specific shapes only near
their chapter, and a custom `Piece` component can be any shape. Its shared
pieces remain for what carries on through the story; a story needs at
least one.

## Not yet done

No run has tested this change. Per the repository rules the runs it was
made for are made again after it, and a run needs the author's word.
