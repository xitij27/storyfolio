# Second independent capture interruption

The approved single attempt is spent. The root execution tool confirmed
terminal closure with exit 1 in `capture-tool-poll-12.json`, without a
session ID. The checker completed type generation, type check, lint,
production build and three animated browser modes before interruption.

The wrapper records external SIGTERM, not its own deadline:
`timedOut: false`, duration 624,926 ms, process exit 1, final signal null.
The checker handles the forwarded signal and writes an interrupted
manifest, so the final null signal does not contradict the received TERM.
The allowed work deadline was 895,000 ms, followed by shutdown within the
900,000 ms envelope. No deadline or forced escalation was reached.

The manifest is incomplete and failed. Reduced-motion capture was
interrupted during controls; missing DOM fields and closed-page/control
errors are preserved, not reclassified as a successful report. They do not
by themselves demonstrate a new application regression. No-WebGL,
no-JavaScript and context-loss modes were not reached. Available still
images can support narrower observations only.

The new interruption happened at a different elapsed time from the old
361,175 ms interruption. Neither record identifies the signal sender.
Elapsed time alone does not establish a tool, model, test suite, operating
system, browser or application cause. No causal attribution is made.

## Coordinator activity

Root launched only the approved wrapper and polled its one execution
session. During its lifetime, root used read-only report/file/hash queries,
six individual original-image views, documentation edits through
`apply_patch`, collaboration messages and the separate non-blocking
approval question. Root did not run the repository test suite, another
build/browser, cleanup or signal command during the capture. All local
prelaunch tests had closed before launch. The retained exact tool polls
record the reported lifecycle.

The animated and fallback reviewers each explicitly confirmed they issued
no signal, stop, cleanup, test, build or browser command during the live
capture. Their reviews save their own provenance. These confirmations
exclude known coordinator actions; they do not identify an external sender.

No retry, actor continuation, candidate judge, source repair or new paid
run is authorized by this interrupted verification. Preserve its complete
available evidence separately from the earlier interrupted attempt. The
two visual guidance paragraphs remain provisionally retained pending the
broader requirements. Ordinary build entry is a separately scoped next
question, not a claim that this browser matrix passed.
