# Turn 5: native completion after a transport fallback

21 October 2026. Not yet a stop-5 pass. The original
[result](continuation-2/turns/05/result.json) stays `complete: false`.
No retry; the live actor workspace is untouched.

## What closed

The actor ran 910493 ms in the same session (process code 0, no timeout
or interruption). The source snapshot is complete: the
[exact capture](exact-capture.mjs) skipped `site/.next-concepts`, as
intended, and recorded 25 source changes.

The [stream](continuation-2/turns/05/stream.jsonl) has 73 lines. Lines 3
to 6 are `error` events "Reconnecting... 2/5" to "5/5 (stream
disconnected before completion: websocket closed by server before
response.completed)", and line 7 is an `item.completed` of type `error`:
"Falling back from WebSockets to HTTPS transport". All five come before
the agent's first action. The turn then ran normally and ends with one
terminal agent message and one `turn.completed` whose usage equals the
result's.

The runner failed afterwards in `finalCodexMessage`, whose rule rejects
any `error` event: "Final Codex message requires one successful
completed turn". So `final.md` was not written; the
[reply](continuation-2/turns/05/reply.md) holds the same text.

## What the agent handed over

- Aluminium recorded as selected; Command and Observe built; the story
  now has ten beats.
- [wording.md](continuation-2/turns/05/snapshot/files/docs/story/wording.md)
  and a local `/wording` page: three complete versions each of the
  opening and closing beats, with the fixed surrounding text identical
  across versions, a recommendation (A and A), room for the person's own
  wording, and an explicit wait: "Choose an opening A/B/C and a closing
  A/B/C, or send edits."
- Every version stays within the fact sheet, including closing B's
  projection, bench readings, assumed reporting cycle and 72-hour run.

These are source and reply observations; root has not yet reviewed the
new chapters in a browser or written the stop-5 gate.

## Budget after turn 5

Turn 5 used 785414 uncached tokens (ceiling lifted). Cumulative actor
time 3237972 ms of 5400000, leaving 2162028 ms (36.0 minutes); turn 6's
own cap is 30 minutes.

## Next

Author decision on whether a transport fallback before any work, followed
by a normal completed turn, counts as native completion; see the handover.
