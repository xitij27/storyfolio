# The finished person-test-6 site, checked by root

All six turns closed normally: 1,852 s (31 of 180 minutes), about 778,400
uncached tokens (person test 5: 36 minutes, about 1.26 million).

Root served a copy (`/var/tmp/p6-final-site`) on port 3180 for the author
(http://172.22.209.33:3180/ on 6 November). Typecheck, lint and 187 tests
pass; `npm run check` passes with 0 problems ([report](site-check-report.json));
`/`, `/cv`, `/wording` and `/review` answer 200, a missing page 404.
Frames with the words: [every hold, desktop](holds-desktop.jpg),
[the moves, desktop](moves-desktop.jpg) (slide), [every hold, phone](holds-phone.jpg).

## The run's question: does stop 4 offer the looks and moves?

Yes. With turn 3 naming only the world, the agent kept night and swing as
provisional, then at turn 4 built `/review` with all nine looks and moves,
each opening the whole story, recommended blueprint with slide, and
stopped for the choice. Person test 5's skipped stop came from root's
turn 3 wording, not the skill.

## Against [the criteria](../../../builds/full-journey-3/criteria.md)

| | Verdict |
|---|---|
| Person | Met: hello, where from, studied, worked, good at, made, contact |
| Scenes | Met as the sheet draws them: his CV, the globe with his cities and years, the diploma, a timeline, a leaflet of his migration planning, cutovers, runbook and reliability, six work panels, the contact page |
| Working | Each project window plays its picture doing its kind of work (stitch-5); no project itself runs |
| Brief, then a click | Met: six buttons and panels open a window each, by keyboard too |
| Traps | Met: 99.98% scoped to the Order API over 26 months, no zero downtime; "we" and a team of nine for 85 to 22 pages; ferry maintained, created by a former colleague; Lumen Pay as its line; the talk placed at "SRE North", with no city invented |
| Readable | Largely met: words in the band; on a phone the timeline and wall pan through the hold; small print on the sheet |
| Field | For the author: blueprint, cool paper on navy, chosen for technical material |
| Seams | Met: one world, every chapter grown from the last by the slide |
| Depth | Largely met: each window gives approach, result and credit |

## How the agent kept to the skill

- `stitch/` byte-identical to the engine's through all six turns; nothing
  over the scene. Pages around the story: the CV and its download, the
  missing page, share images, `/review` and `/wording`.
- In turn 6 it found that Back from `#made` to the bare address did not
  return the story to its start, and worked round it outside `stitch/`
  (`components/chapter-entry.tsx`). Root fixed it in the engine: the story
  goes to its start when the address has no chapter (shown in a browser:
  Work, Back, Forward land on made, hello, made).

The author's desktop and phone review decides.
