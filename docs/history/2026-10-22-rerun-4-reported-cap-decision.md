# Reported-token ceiling removed for meaning rerun 4, 22 October 2026

Turn 5 of meaning rerun 4 did not launch: "Cumulative actor token ceiling
reached" (12 million reported tokens, mostly cached re-reads; turn 4 alone
reported 8.35 million). No model call was made. Root asked through the
question tool: "Rerun 4 stopped before turn 5 at its 12 million
reported-token ceiling (mostly cached re-reads; turn 4 alone reported
8.35M). Uncached use is about 564k of 1.5M and time 29 of 90 minutes. On 21
October you dropped this ceiling for the previous run only. Drop it for
this run's turns 5 and 6?"

Answer: **"Drop reported cap (Recommended)"**. The option read: "Keep the
90-minute time limit and the 1.5 million uncached-token limit (the real
cost measure). Remove the 12 million reported-token limit for rerun 4,
recorded as a declared protocol change, applied through a small wrapper
like the previous run's."

Applied through `evals/runs/stage-3-meaning-4/lifted-turn.mjs`. A first
attempt added a flag to `evals/codex-build-run.mjs`, but the runner's own
code is part of the frozen inputs, so turn 5 was refused at launch ("Current
inputs differ from frozen cohort"), again with no model call; that change
was reverted to the frozen bytes. The wrapper verifies the frozen inputs and
setup probe unchanged, then runs the unchanged turn executor on a copy
(`evals/runs/codex-meaning-4/inputs-lifted/`) whose case differs only in
`maxTokens`. For rerun 4, turns 5 and 6 only.
