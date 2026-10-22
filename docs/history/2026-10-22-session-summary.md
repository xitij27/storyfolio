# Session summary, 22 October 2026

Written for the next session. One Claude Code session (root) worked with the
author all day. The detailed records are linked; this page is the map.

## What happened, in order

1. **The whole-site check of the old Stage 3 site** (Ada Mensah, turn 6 of
   `stage-3-spine-time-1`) passed technically and failed Detail and
   hierarchy ([verdict](../../evals/runs/stage-3-spine-time-1/recovery/final-1-disposition.md)).
2. **The author rejected that site:** "It is just the same 3d asset roaming
   around across each scene. Is this how you tell a story?"
   ([record](2026-10-22-author-review-first-reaction.md),
   [root's diagnosis](../../evals/runs/stage-3-spine-time-1/recovery/author-review-1.md)).
3. **Four "meaning" reruns** (`evals/runs/stage-3-meaning-1` to `-4`) changed
   wording around the one-object rule: faces readable, draw confirmed
   facts, rank concepts by what they show, the rail moved to the top left in
   the engine. Rerun 4 was built in full; one beat in nine showed a fact
   (six of forty sockets lit). About 2.4 million uncached tokens.
4. **The author rejected rerun 4 and the approach:** "rods with dots on
   them ... they just arrange themselves"
   ([record](2026-10-22-author-rejects-rerun-4.md)). Root had kept the
   one-object rule and turned "tell a story" into a chart.
5. **Design change, then a deeper one:** first "each scene pictures its
   section" ([spec](../superpowers/specs/2026-10-22-scenes-picture-their-section.md)),
   then the author: a portfolio introduces the person (field, places,
   education, experience, work), not one project
   ([record](2026-10-22-a-portfolio-introduces-the-person.md)).
6. **Structure agreed in discussion**
   ([spec](../superpowers/specs/2026-10-22-portfolio-structure.md)): eight
   chapters (hello, where from, studied, worked, good at, made, others say,
   contact); brief on the scroll, more on a click; a through-line held to
   the bar of the author's own site (V3), whose nine pages become a globe, a
   maze floor solved by scrolling, a photograph colouring across a seam, a
   wall of project plates. The author approved an example at that bar (a
   circuit board for an embedded engineer): "yes this looks right".
7. **Skill rewritten** (`f107a2e`): concept reference rebuilt around the
   eight chapters and the through-line; first stop asks for places,
   education and roles with years; storyboard per beat names its picture.
8. **"Delete pointless examples"** (`4cd05a0`): the engine's demo story
   (seven cards that scatter, stack and fan, which every agent copied) is a
   placeholder now; the made-up Camille and Jun cases are gone. The starter
   passes 15/15 browser checks.
9. **Person test** (`evals/runs/stage-3-person-1`, fixture
   `evals/builds/full-journey-2`, Dawit Bekele): turns 1 to 5 done, gates
   passed at concepts and storyboard, all 15 beats built. Paused before
   turn 6 at the author's word. [How to continue](../../evals/runs/stage-3-person-1/README.md).

## What the author wants, as learned today

- Each scene is a picture of its section, recognisable with captions
  hidden. Never pieces that rearrange, split or glow; never a chart.
- The site introduces the whole person; how much life versus work depends on
  what the person gives; detail behind a click.
- V3 is the bar for creativity. "Your generated ideas are terrible. You
  need to do better." A plain introduction is acceptable but "missing
  something".
- Tokens matter. Ask before paid runs; stop early at gates when a run is
  failing; do not iterate wording on a broken premise.
- Talk a design through before writing it into the skill.

## How runs work now (learned the hard way)

- Runner: `evals/codex-build-run.mjs` (prepare, setup probe, one turn per
  call, a root-written gate between turns). Its own code is a frozen input:
  editing it refuses later turns. Rerun 4's lifted cap used a wrapper,
  `evals/runs/stage-3-meaning-4/lifted-turn.mjs`.
- The reported-token ceiling counts cached re-reads; the person case sets
  it out of reach. The uncached ceiling (1.5 million) is the cost bound,
  checked only between turns.
- Agents leave browser-check folders outside the snapshot roots; the runner
  then refuses before any model call. Move them out intact with hashes, as
  recorded in each run.
- `/tmp` is a 7 GB in-memory filesystem holding the pinned Node, npm cache
  and Chromium; serve and copy sites under `/var/tmp`.

## Open

- Turn 6 of the person test, then the author's desktop and phone review.
- Engine: the look switch at the top right covered part of rerun 4's scene;
  faint pale bands behind captions (`.story-caption-text::before`).
- From the old whole-site check, not done: supporting pages were built
  before the look choice.
- `evals/lib/score.mjs` still labels a v1 criterion "One object, in pieces,
  the whole way"; historical measurement, left unchanged.
- Stage 3 is not closed. Nothing has been pushed today.
