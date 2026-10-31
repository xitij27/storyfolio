# The author's review of person test 3's site, 31 October 2026

Person test 3 stopped after five of six turns
([run](../../evals/runs/stage-3-person-3/README.md)). Root served the site
as turn 5 left it and recommended that the author review it before any
further paid run. Windows did not reach the WSL server at 127.0.0.1; at
the WSL address the author opened it on a desktop and sent a screenshot of
the opening, with a red box drawn around the agent's fixed box in the top
left ("Illustrations · no internal documents", "Kestrel Freight ·
programme result", "310 services · 14 waves · 26 months", "99.98% Order
API availability over those 26 months")
([screenshot](../../evals/runs/stage-3-person-3/final-review/author-screenshot.png)).

The author's verdict, verbatim:

> No this looks terrible. The transitions dont seem to have any cohesion.
> It just pops out of no where. The content is also organized in weird
> places as shown in the picture. This is not a good portfolio website

So Stage 3 does not close on this site.

## What root found behind it

- **The joins.** The site's mix is sheet, map, sheet, book, sheet, sheet,
  sheet: four of its six joins cross from one world to another. Each such
  dive is a framed card of the next world that appears on the current
  object, grows and takes the screen: the map in a frame on the CV sheet,
  the book over the diploma, the leaflet over the book
  ([sheet into map](../../evals/runs/stage-3-person-3/final-review/join-sheet-into-map.jpg),
  [into and out of the book](../../evals/runs/stage-3-person-3/final-review/joins-into-and-out-of-the-book.jpg)).
  It is a picture swapped in through a window, not one thing becoming the
  next. Within one world (the sheet's folds, the camera over the map, the
  book's pages) the joins are continuous. The dive is the engine's own
  design (plans 1 and 2), not the agent's.
- **The page around the scene.** Text sits in four places around a small
  3D object: the agent's fixed proof box (the author's red box) and header,
  the engine's caption card at the bottom left and its chapter rail at the
  bottom right. The agent also framed each document whole and smaller to
  leave room for them (turn 4).

## One world, compared

Root showed the author Dawit's site in one world on the unchanged engine,
with no agent changes and no added boxes: every chapter on the map
(`/preview?mix=map,map,map,map,map,map,map,map`) and every chapter on the
sheet (`/preview?mix=sheet,sheet,sheet,sheet,sheet,sheet,sheet,sheet`),
and proposed, if one world read better: one world per site, the person
switching world rather than mixing; one place for the words, nothing over
the scene; the pieces used as they are; then the person test again. The
author answered, verbatim:

> yes both of them look good now

Root reads this as yes to one world per site and to the changes proposed
with it. A further paid run still needs the author's word.

## The person test again, and a push

Root changed the skill to one world per site and asked two questions. The
author's answers, as chosen:

- "Next step: run the person test again on the new one-world skill. It is
  paid (likely 1 to 1.5 million uncached tokens) and takes about 1 to 2
  hours of agent time. Launch it with these changes from the last run:
  turn 3 switches the whole world, 45 minutes per turn (180 in all), and a
  2 million uncached-token limit?" Answer: "Launch with those
  (Recommended)".
- "Push today's commits to GitHub? That publishes the map fix, the
  one-world skill and the gallery's new front-page text on GitHub Pages.
  The repository is public." Answer: "Push now".

Found when pushing: GitHub's `main` was already at `533b0b05` (the
one-world commit), pushed from the author's side; root pushed only this
record after it.
