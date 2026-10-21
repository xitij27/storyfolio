# Turn-5 transport-fallback decision, 21 October 2026

After turn 5 completed natively but the runner rejected it
([disposition](../../evals/runs/stage-3-spine-time-1/recovery/turn-5-transport-disposition.md)),
root (Claude Code) asked one question and recorded the answer as given
through the question tool. The author's preceding message was, verbatim:

> yes

Question: "Turn 5 did its work: it built the rest of the story, showed
three wording versions for the opening and closing, and waited, and its
source was saved. The runner rejected it only because the connection to
the model dropped and fell back from WebSockets to HTTPS before the agent
did anything. How should that count?"

Answer: **"Count it, narrow rule (Recommended)"**. The option read: "New
continuation record: a turn counts if its only errors are those
reconnect/fallback messages, all before the agent's first action,
followed by one normal completed turn. Applies to turn 5 and, if it
recurs, turn 6. No paid call; then I review stop 5 and launch turn 6."

This applies to turns 5 and 6 of `codex-full-journey-timing-1` only. Any
other error event, or a reconnect after the agent's first action, still
fails a turn. Turn 5's original result stays `complete: false`; the new
continuation record declares and applies the rule. Time ceilings, the
no-retry rule and every gate remain.

The answer approves no wording, site or push.
