# The finished person-test-4 site, checked by root

All six turns closed normally: 2,552 s (43 of 180 minutes). Codex reported
about 2,118,000 uncached tokens over the six turns, over the 2 million
bound only after the last turn (the runner checks between turns). Turns 4
to 6 each reported 13 to 19 million input tokens, about 96 per cent cached;
turn 5's 13.9 million in 139 s looks like counters carried over from the
resumed session (the runner warns that resumed counters may overlap), so
the sum likely overstates the cost. Person test 2: 62 minutes, about 1.25
million.

Root served a copy of the finished site (`/var/tmp/p4-final-site`) on port
3140 for the author, at the WSL address (http://172.22.209.33:3140/ on 31
October). Typecheck, lint and 185 tests pass; `npm run check` passes with 0
problems ([report](site-check-report.json)); `/`, `/cv`, `/preview`,
`/wording` and the HTML CV download answer 200, a missing page and the
removed `/plain-story` 404. Frames: [every hold, desktop](holds-desktop.jpg),
[the moves between chapters, desktop](moves-desktop.jpg) (0.5, 0.7 and 0.9
of each chapter), [every hold, phone](holds-phone.jpg).

## Against [the criteria](../../../builds/full-journey-3/criteria.md)

| | Verdict |
|---|---|
| Person | Met: hello, where from, studied, worked, good at, made, contact |
| Scenes | Largely met: the sign, the route over Europe and Africa, the diploma at Addis Ababa, a building per job, his tools on Kestrel's roof, six work cards, the contact card. At home the work cards, buildings and sign crowd one another in "made" and "contact" |
| Working | Not met: no piece of work runs; the cards open text windows. The pieces have no working project (stitch-2, finding 5) |
| Brief, then a click | Met: six work cards and caption links open a window each, by keyboard too |
| Traps | Met: 99.98% Order API availability over 26 months, no zero downtime; "We reduced weekly pages from 85 to 22"; a former colleague created ferry; Lumen Pay as its line; the old site asked about at turn 1 |
| Readable | Largely met: captions sit in a band under the scene and no longer cover it; on a phone the map's labels are small, and the hello sign hides Rotterdam's name |
| Field | For the author: a dark map with paper cards, not a technical world; the author found one map good on 31 October |
| Seams | Met: one world; every chapter is reached by the camera flying over the same map; nothing pops in |
| Depth | Largely met: each window gives problem, his part, approach, scale and result; they are windows, not pages of their own |

## How the agent kept to the skill

- Stop 2: one world (the sheet) chosen with reasons, the pieces and the
  page unchanged, the gallery offered; turn 3's switch to the map made and
  recorded.
- Stop 4: no looks shown (night kept); turns 4 and 5 built ahead.
- The pieces: unchanged through turn 3; in turn 4 the agent edited
  `stitch/` to fix the faults root had seen (the diploma's city, the
  camera for "good at", long names) and to add a top navigation bar and a
  caption band, which Dawit's "ordinary navigation" asked for and the
  engine lacks ([diff](../evidence/turn-4-engine-edits.diff)).

The author's desktop and phone review decides.
