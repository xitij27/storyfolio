# Turn 2 refused at launch; the agent's browser profile is moved out

The first turn 2 invocation stopped before any model call: "Full-journey
source inventory differs from approved snapshot; no turn was launched"
([log](turn-2-refused.log)). The turn-1 agent's own browser check had left
a Chrome profile in `.local-check/chrome-profile/` (50 files written during
turn 1, outside the snapshot roots). No browser process remained.

As with the `.next-concepts` cache in `stage-3-spine-time-1`, root moved the
folder out of the workspace intact, to
`/var/tmp/storyfolio-entry-runtime-20261012/storyfolio-evals/meaning-3-local-check-relocated/.local-check`.
Every file's SHA-256 before the move is in
[local-check-relocation.sha256](local-check-relocation.sha256), and all 50
verify at the new place. The live workspace inventory then equals the turn 1
snapshot. Turn 2 is launched once more with the same gate; this is not a
retry of a turn, since none ran.
