# The diagrams are crude, 23 October 2026

After person test 2 ([final review](../../evals/runs/stage-3-person-2/final-review/README.md)),
the author wrote, verbatim:

> Okay, it looks better now, but the diagrams look very crude. If you look at my own portfolio website, you will see how clear and sensible each diagram looks. But why is it that the diagrams here look so crude and unrefined? Of course, the transitions are smooth. I like that. But I wish the diagrams had more meaning to them, like every diagram in my portfolio website has a meaning to it, right? Is it because we don't have more information on the kinds of diagrams we can use? Should we add that component to the skill like we have a library of desirable diagrams?

## What root found in V3's code

V3 (`../portfolio-website`, `components/paper/prints/`, `lib/paper/`) draws
its diagrams as precise flat figures on the pages' surfaces, with canvas
line drawing and typesetting, and uses 3D for the pages' movement and a few
exhibits. Each figure has written drawing rules ("line drawings in the
look's ink and its one accent, each fitted to the box it is given"; words
as HTML beside it) and is built from real data: country polygons for the
globe's gores, the checked front pages of the papers learned from, a maze
solved by an actual search, one real photograph split at a seam. About
1,600 lines of print code and 960 of exhibit code serve these. The person
test agents modelled diagrams from 3D primitives (cylinders for databases,
tubes for paths, boxes), with symbols in place of data, sixteen of them in
about an hour.
