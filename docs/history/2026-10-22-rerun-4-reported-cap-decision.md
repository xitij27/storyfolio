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

Applied as `--lift-reported-cap docs/history/2026-10-22-rerun-4-reported-cap-decision.md`
on `evals/codex-build-run.mjs`, which removes only `maxTokens` inside
`executeBuildTurn` after the frozen case is verified. For rerun 4 only.
