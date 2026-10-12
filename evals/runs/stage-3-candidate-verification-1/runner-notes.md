# Single verification runner

This separately authorized unpaid verification uses the saved timed-out
candidate's exact 184-file source and unchanged frozen checker, expectations,
native Node, capability environment and trusted dependencies. It does not
resume the actor or judge, and it does not overwrite the earlier attempt.
The new acceptance directory and exclusive single-attempt record prevent
automatic reruns. Root owns launch, complete tool polling and approval history.

Launch from the repository root:

```sh
/tmp/storyfolio-node-check-20261011/node_modules/node/bin/node evals/runs/stage-3-candidate-verification-1/run-verification.mjs
```

The actual checker child has a fixed 895000-millisecond work timer. At that
deadline it receives SIGTERM so its existing frozen handlers can stop the
owned build/server children and save the interrupted manifest. A five-second
shutdown grace is included within the 900000-millisecond total child-lifetime
envelope. Grace is shortened if scheduling delay has consumed any remaining
time. If the checker remains alive, the wrapper records escalation at the
900000-millisecond target and sends SIGKILL only to that owned checker PID.
Operating-system and event-loop scheduling jitter can delay actual signal
delivery or reaping; exact times are recorded, not rounded into a guarantee.
The wrapper never signals a shared
process group or guesses at ownership. Any remaining process after forced
shutdown requires a separately evidenced coordinator disposition, not a
blind cleanup command. External SIGINT/SIGTERM is recorded with unknown
sender and forwarded; no origin is guessed. Lifecycle events retain PIDs,
timestamps, deadline, exits, closure, stdout and stderr.

Six bounded native child-process tests exercise the exact production envelope,
ordinary exit, the real
deadline with orderly shutdown, forced termination after grace, an external
signal and spawn failure. No test starts a browser, builder, actor or judge.
The first prospective 900000-plus-5000 design was never launched. Its
`wrapper-tests.json` and `wrapper-readiness.json` are retained as historical
preparation only, superseded by the revised 895000-plus-5000 timing and the
`wrapper-tests-revised.json` and `wrapper-readiness-revised.json` records.

The read-only `verify-verification.mjs --integrity-only` checks frozen inputs,
all acceptance hashes, all 184 source files before/after/current and against
saved actor bytes, exact checker command/environment, lifecycle and preserved
old interrupted evidence. Without that flag it also requires both complete
available-original review inventories. Missing modes stay unobserved and the
original actor timeout remains visible regardless of this verification result.
Reviewer inventories go under `acceptance-review/animated-review/` and
`acceptance-review/fallback-review/`. No actor or frozen input is edited.
