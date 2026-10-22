# Rank concepts by what the scene shows, 22 October 2026

After meaning rerun 3 stopped at turn 2
([disposition](../../evals/runs/stage-3-meaning-3/turn-2-disposition.md)),
root asked through the question tool: "Rerun 3 produced the first scene
that shows a fact (the rack: 40 sockets, 6 lit), but the agent still
recommends the fixture 'because Ada made it'. The skill itself says 'the
object comes from what the person makes', which competes with 'pick the
scene that shows the most'. How should I proceed?" The options were rank by
showing, build the rack now, build the fixture, or ownership should win.

Answer: **"Rank by showing (Recommended)"**. The option read: "Change the
skill so 'comes from what the person makes' is a bar every concept must
clear, not a ranking; the recommendation ranks only by what the scene
shows. Rerun to turn 2 (~10 min, ~140k tokens); build only if it passes."
