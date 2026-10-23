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

## Root's proposal and the author's answer

Root answered, verbatim:

> Your guess is part of it, but the bigger gap is *how* the diagrams are made. Your site's code shows three differences.
>
> **1. They're drawn, not modelled.** Your pages carry flat, precise figures drawn on their surfaces: fine lines in the look's ink plus one accent colour, each fitted to its box, with words set beside them. 3D is used for the pages moving between figures. Our agents built every diagram out of 3D blocks: cylinders for databases, tubes for paths, boxes. At that size, blocks can only look crude.
>
> **2. They're built from real data.**
> - The globe is made of real country outlines.
> - The papers are the actual front pages you learned from.
> - The maze is solved by an actual search.
> - The colourisation is one real photograph split at a seam.
>
> That's why each one *means* something. Ours used symbols: a cylinder "is" a database, a tube "is" a route. Nothing in them is Dawit's actual structure, even where his notes had it (14 waves, six gates, five cutover steps, three cities with years).
>
> **3. They have craft rules and time.** Each of your figures has written rules, backed by about 2,500 lines of drawing and exhibit code. The agent made 16 diagrams in about an hour with no guidance on how a diagram should look.
>
> **So yes to a diagram component, but not as a gallery of finished pictures.** Finished pictures would get copied, and every site would look the same, the failure the skill's own "swap" test guards against. I'd add three things:
>
> 1. **A diagram reference in the skill:** the kinds of diagram, chosen by the question each answers.
>    - *Where:* a route on a real map.
>    - *When:* a timeline with real dates.
>    - *How it flows:* a pipeline, with direction.
>    - *In what order, with checks:* a gated process.
>    - *What changed:* a before and after split at a seam.
>    - *What's inside:* a cutaway or layers.
>    - *How much:* a comparison at true scale.
>    - *How it behaves:* a trace over time.
>    - *A solved problem:* a working model.
>
>    Each kind lists the facts it needs and how to draw it clearly, with your site as the standard.
> 2. **Craft rules from your site:**
>    - One idea per diagram, built from the person's real data, never a symbol.
>    - Drawn as clean flat figures on surfaces, with one accent colour for the subject and everything else faint.
>    - Labels readable at the size shown, or set beside the figure.
>    - Fewer diagrams finished properly beats many rough ones.
> 3. **An engine drawing kit,** so agents don't hand-roll primitives: crisp lines, arrows, nodes, labels, grids and timelines on surfaces, plus a map drawn from real coordinates. The map needs a public-domain coastline dataset in the engine, about 1 to 2 MB, which is the one material cost.
>
> The skill and engine work is free to build and test, and I'd show you the kit drawing a few of Dawit's diagrams before any paid run. Should I go ahead?

On 23 October the author replied, verbatim:

> yes

What was built and shown: [drawing-kit-1](../../evals/engine/drawing-kit-1/README.md).
No paid run was made.
