# Turn 2: the concepts repeat the failure; the run stops here

Turn 2 closed normally (327 s, about 78,000 uncached tokens; turn 1 about
33,000). Three runnable sketches, a recommendation, no fact invented. The
handoff is reached, but the change this run tests did not reach it, so
turn 3 is not sent: the fixed turn 3 prompt accepts the recommended
concept, and that concept already fails the captions-hidden test.

## What root saw

- **Labels again.** The recommended fixture opens into "two corresponding
  rows labelled CODE/STATE/CYCLE and BENCH/SIGNAL/LIMIT". The labels are
  unreadable at the size shown
  ([fixture middle](evidence/fixture-desktop-middle.png)).
- **Facts refused, in so many words.** Concept 3 splits its ribs into MODEL
  and RUN "of equal size, deliberately no visual duration ratio", and its
  caption says the pieces' "size and number represent no duration, current
  or sample count" ([enclosure middle](evidence/enclosure-desktop-middle.png)).
  concepts.md opens: "Equal piece counts are a drawing convention, not
  samples."
- **The new recommendation line was bent.** "Shows the most" became "shows
  the most of Ada's personal contribution".
- **The Backdrop test was skipped.** The tests listed are Honesty, Swap,
  Emblem, Depth and Thirty seconds; Backdrop, the one carrying the
  captions-hidden question, is missing.
- **The rail sits on the rightmost piece** in every wide sketch.

## Why the first change missed

The permission to draw facts was in `storyboard.md`, read only at stop 3,
after the concept is chosen and sketched. The rule that drives the caution,
"Nothing about the person is invented" in `SKILL.md`, is read first and
said nothing about drawing. The concept stop had no requirement on what its
sketches show. The rail overlap is in the engine's own CSS (right edge, mid
height, where the engine anchors the scene on a wide screen), so every
agent inherits it; a line asking agents to avoid it treats the symptom.

## Second change

- `SKILL.md`, the honesty rule: drawing a confirmed number, order or
  proportion as it is invents nothing; leaving the scene empty to stay safe
  is also a failure. The storyboard paragraph that said this is reduced to
  an example in the faces bullet.
- `concept.md`: each sketch's middle draws a confirmed fact or carries the
  work, readable at size; each concept's answer to every test is written;
  the recommendation is the scene that shows the most with captions hidden.
  Two made-up case biographies are shortened to stay within the word limit.
- Engine `story.css`: the rail moves to the top left beside the look switch,
  in a row, labels shown only for the current chapter. Checked on the last
  run's ten-beat site with the rule injected, wide and short
  ([wide](evidence/rail-wide-0.25.png), [short](evidence/rail-short-0.6.png),
  [script](evidence/rail-check.cjs)). The `building.md` line asking agents
  to keep the rail off the object is removed.

The pale bands behind captions (engine `.story-caption-text::before`) are
left as they are; they are not what the author objected to.

Next: a fresh journey, `stage-3-meaning-2`, same fixture and prompts,
judged at turn 2 first.
