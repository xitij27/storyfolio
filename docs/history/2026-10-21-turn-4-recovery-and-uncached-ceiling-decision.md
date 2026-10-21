# Turn-4 recovery and uncached-ceiling decisions, 21 October 2026

After turn 4 completed natively but its capture failed
([disposition](../../evals/runs/stage-3-spine-time-1/recovery/turn-4-capture-disposition.md)),
root (Claude Code) asked two questions and recorded the answers as given
through the question tool. The author's preceding message was, verbatim:

> okay so what should be done next to complete this skill?

## Recovery path

Question: "Turn 4 finished (two looks built, real wait for your choice)
but the runner's capture failed on the agent's regenerated build cache,
as in turn 2. How should I recover?"

Answer: **"Repeat turn-2 recovery (Recommended)"**. The option read: "No
paid turn. Archive the source excluding exactly site/.next-concepts,
measure both looks myself in a browser, then a new continuation record
whose capture excludes that exact directory for turns 5 and 6. Labelled
as a measurement variance."

## Uncached ceiling

Question: "After turn 4, 587,800 of the 1.5M uncached tokens are left.
Turn 4 alone used 442,881, so turns 5 and 6 will very likely pass the
ceiling. What should happen to it?"

Answer: **"Drop it for turns 5-6 (Recommended)"**. The option read:
"Like your 21 October decision on the reported-token ceiling: keep the
30-minute and 90-minute time caps, record the change as a disclosed
variance."

This applies prospectively to turns 5 and 6 of `codex-full-journey-timing-1`
only. The frozen `case.json` is not edited; the new continuation record
must declare and apply the change. The 1800000 ms per-turn and 5400000 ms
cumulative ceilings, the no-retry rule and every gate remain. Turn 4's
failed result stays `complete: false`.

Neither answer approves a look, a site, or a push.
