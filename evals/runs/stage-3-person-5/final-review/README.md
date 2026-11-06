# The finished person-test-5 site, checked by root

All six turns closed normally: 2,185 s (36 of 180 minutes), about
1,256,600 uncached tokens (Codex's input less cached input, plus output;
person test 4: 43 minutes, about 2.1 million as reported).

Root served a copy (`/var/tmp/p5-final-site`) on port 3170 for the author
(http://172.22.209.33:3170/ on 6 November). Typecheck, lint and 186 tests
pass; `npm run check` passes with 0 problems ([report](site-check-report.json));
`/`, `/cv`, `/cv/download` and `/review/words` answer 200, a missing page
404. Frames with the words: [every hold, desktop](holds-desktop.jpg),
[the moves, desktop](moves-desktop.jpg) (swing), [every hold, phone](holds-phone.jpg).

## Against [the criteria](../../../builds/full-journey-3/criteria.md)

| | Verdict |
|---|---|
| Person | Met: hello, where from, studied, worked, good at, made, contact |
| Scenes | Met as the sheet draws them: his CV, a globe with his three cities, the diploma, a timeline, a folded leaflet of his methods and reading, six work panels, the contact page |
| Working | Not met: no piece of work runs; the panels open text windows. The pieces have none |
| Brief, then a click | Met: six panel buttons in the caption and on the sheet open a window each, by keyboard too |
| Traps | Met: 99.98% Order API availability over 26 months, no zero downtime; "we" for 85 to 22 pages; ferry created by a former colleague; Lumen Pay as its line; the old site asked about at turn 1 |
| Readable | Largely met: words in the band under the scene; on a phone "worked" is cut at the edges and "made" shows part of its wall |
| Field | For the author: a sheet of paper (his runbook, checklist and plan), not a technical world |
| Seams | Met: one world, every chapter grown from the last by the swing |
| Depth | Largely met: each window gives contribution, approach and result; windows, not pages |

## How the agent kept to the skill

- Stop 2: one world (the sheet) chosen with reasons; turn 3's "keep it the sheet" recorded.
- `stitch/` unchanged through turn 5, and `app/` changed only by pages
  around the story (CV, missing page, share images, a wording review). In
  turn 6 the agent changed one line of `stitch/stage.ts`: under reduced
  motion the idle sway stops too. Sound, and for the engine.
- Stop 4: the looks and moves were captured but not offered. The agent
  read turn 3's "keep everything else as it is", root's prompt, as keeping
  night and swing. So this run does not test whether stop 4 offers the
  moves.

The author's desktop and phone review decides.
