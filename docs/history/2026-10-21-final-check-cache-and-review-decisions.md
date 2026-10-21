# Final-check cache-rule and screenshot-review decisions, 21 October 2026

During the independent whole-site check of turn 6
([interim record](../../evals/runs/stage-3-spine-time-1/recovery/final-1-interim.md)),
root (Claude Code) asked two questions and recorded the answers as given
through the question tool. The author's latest message before them was,
verbatim:

> yes

## Cache rule

Question: "All eight extra pages passed (Mosslink, CV page and download,
404, share image, icon, both archives). The unit failed only because
serving the agent's icon and share-image route handlers wrote 4 runtime
cache files the frozen rule doesn't recognise (it knows page caches
only). I checked them: each is the build's own seed plus a timestamp,
bodies byte-identical; no build file changed in any unit. How should this
count?"

Answer: **"Accept on diagnosis (Recommended)"**. The option read: "Record
the unit as a technical pass on root's documented diagnosis, disclosed as
a checker gap. No re-run, no new code."

## Screenshot review

Question: "The check produced 677 originals: 70 settled beats, 110
mid/end-of-beat, 162 transition frames, 305 control before/after trials,
30 other. The protocol says root views every original whole; that is
roughly 1M tokens and probably two more sessions. I've viewed ~40. How
should I complete the review?"

Answer: **"View all 677 (Recommended)"**. The option read: "Follow the
protocol exactly: I view every original whole, record each, and run the
coverage verifier. Slow and costly, but the verdict is fully covered."

Neither answer approves the site; the author's own desktop and phone
review still closes Stage 3. No push.
