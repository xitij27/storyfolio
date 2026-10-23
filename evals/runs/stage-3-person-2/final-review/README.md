# The finished person-test-2 site, checked by root

Repetition 2 closed all six turns normally: 3,722 s (62 of 90 minutes) and
about 1,248,900 uncached tokens. Repetition 1 had used about 38,000 on turn
1 and an unrecorded amount on turn 2 before the model-capacity failure.

Root served a copy of the finished site
(`/var/tmp/storyfolio-entry-runtime-20261012/storyfolio-evals/person-2-review-site`)
on 127.0.0.1:3000. The six work pages, the CV and a real 404 respond.
[beats-sheet.png](beats-sheet.png) is the middle of each of the sixteen
beats as the agent captured them in turn 5; [filmstrip.png](filmstrip.png)
is 48 evenly spaced frames down the finished page with the text hidden,
made with [filmstrip.cjs](filmstrip.cjs), to see the transitions.

## Against [the criteria](../../../builds/full-journey-3/criteria.md)

| | Verdict |
|---|---|
| Person | Met: introduction, places, study, the three roles, practice, six works, contact |
| Scenes | Met: each beat is a picture of its subject in one schematic world |
| Working | Met: the orders-database cutover steps through replicate, dual write, compare, move reads, move writes with the scroll or a control |
| Brief, then a click | Met: six work pages |
| Traps | Met: 99.98% measured Order API availability with two internal incidents under ten minutes, no "zero downtime"; "We reviewed every alert", the pages the team's; "A former colleague created ferry"; Lumen Pay as its one line; the old site asked about at turn 1 |
| Readable | Met in the captures |
| Field | Met: a dark engineering grid with stores, write paths, routes, gates and alert routing; it reads as data infrastructure |
| Seams | Largely met: the grid and the return loop persist through every frame, and caught in-between frames show one scene shrinking as the next grows in at the same place. It is a cross-handover, not one shape morphing into the next |
| Depth | Met: each work page gives problem, approach, scale and result |

## Weak points

- The migration-waves picture is used twice, for Kestrel and for the
  data-centre exit; the two-database picture recurs in several beats.
- The transitions grow and shrink in place; nothing travels or morphs from
  one picture into the next.
- The places map and the logger are small and schematic.

The author's desktop and phone review decides.
