# Neutral transport-longevity diagnostic

Prospective source-only preparation, 12 October 2026. Root requested this
before another paid run: calibration 2 lost its older outer recorder near
395 seconds, the wording recorder caught external SIGTERM near 389 seconds,
and calibration 1 had previously completed near 442 seconds. These are
observations to investigate, not proof of a universal time limit. The
signal sender remains unknown. No diagnostic has been launched by this
preparer, and no historical result or process helper is changed.

## Fixed experiment

[heartbeat.mjs](heartbeat.mjs) is one direct neutral Node process with a
fixed 660000-ms duration and 30000-ms heartbeat interval. It starts no
child, model, browser or network request, never detaches, and never retries
or continues an interrupted attempt. It has no duration override. It writes
each JSON event synchronously to an exclusive `journal.jsonl`, syncs that
file, and prints the same event to stdout. The parent tool must retain its
own launch, poll and terminal records separately.

Every event obtains only PID, PPID, process-group ID, session ID, terminal
number, foreground process-group ID and process start ticks from
`/proc/self/stat`. No process-name scan, command line, environment dump,
other-process inspection or outgoing signal is used. `command.json` binds
the helper's SHA-256, actual Node executable/version, arguments, working
directory, observed TTY states and initial process metadata.

Caught SIGTERM, SIGINT or PTY SIGHUP is synchronously recorded with sender
`unknown`.
The helper cancels its timers, saves `complete:false` and exits nonzero.
It does not ignore a signal to keep running. Natural completion requires
the full monotonic duration and successful output/journal recording. The
terminal result hashes the command and journal. A write error also ends
incompletely. If storage or uncatchable termination prevents that result,
the missing result remains missing, never reconstructed as a pass.

Root may launch the identical helper once in each separately labelled
condition: ordinary pipes in `pipe-1/` and a PTY in `pty-1/`. The helper
checks the declared transport against actual stdout `isTTY`. Both output
directories must be absent; existing evidence is never overwritten or
archived. Root's [prospective launch decision](launch-decision.md) selects
concurrent launches with the same helper, native Node, working directory,
environment and supervision. Retain different start times and actual
overlap, rather than claiming an isolated controlled experiment. Neither
launch is an automatic response to the other's result.

## Root-only execution

1. First confirm the previous actor/capture and exact owned process cleanup
   are settled. Review these sources, save syntax and the six
   [injected-clock tests](heartbeat.test.mjs), and commit preparation.
   The tests have no real waits, subprocess, file I/O, network or signals.
2. Use the current native Node and the same recorded environment. Launch
   the helper directly through the terminal tool, not through a shell
   timeout, extra recorder or detached wrapper. Those would change the
   condition being measured. For the first launch set tool `tty:false`;
   for the other independently authorized launch set `tty:true`.
3. Root alone polls the live tool session at most 40 seconds apart, saving
   every outer return. Do not send input or terminal control characters.
   Only the companion neutral probe and explicitly recorded quick local
   checks may overlap. Do not overlap evaluated actors, models, builds or
   browser captures. A silent interval,
   lost tool session or missing heartbeat is not successful completion.
4. At terminal closure, preserve command, journal, result if present, tool
   output and exact exit/signal status. Review elapsed heartbeat intervals,
   own PID/group/session values and observed TTY state. No retry, cleanup
   of evidence or process-name signalling is part of this helper. A failed
   first condition does not automatically authorize or start another run.

Prospective commands from the repository root, not execution records:

```sh
longevity_node=/tmp/storyfolio-node-check-20261011/node_modules/node/bin/node
longevity_dir=evals/runs/stage-3-completion-2/process-supervision/longevity-1

"$longevity_node" --test "$longevity_dir/heartbeat.test.mjs"
"$longevity_node" "$longevity_dir/heartbeat.mjs" --transport pipe --output "$longevity_dir/pipe-1"
"$longevity_node" "$longevity_dir/heartbeat.mjs" --transport pty --output "$longevity_dir/pty-1"
```

Each helper invocation is a separate tool launch, with the matching TTY
setting and the same environment. Shell variables here are command-form
documentation, not an instruction to run all three in one batch.

## Interpretation

The requested wall duration is 660 seconds; scheduling and synchronous I/O
jitter are retained in actual monotonic elapsed times. Heartbeats are real
observations, not a fabricated catch-up sequence. The final duration event
may coincide with the 22nd interval; do not invent missing observations.

Completion demonstrates only that this neutral workload survived this
one transport condition for the recorded duration. Interruption or a
pipe/PTY difference is evidence for diagnosis, not identification of the
external sender or proof of causality. A success cannot prove all future
paid calls, browsers, builds or other process trees safe. Prior failures
remain unchanged. Root must record a separate disposition before resuming
paid work.

## Retained preparation checks

After root confirmed owned calibration cleanup at 05:14:08 UTC, root
authorized only quick pure tests and syntax checks. All six tests passed
at 05:19:43.725 UTC in [tests-1](tests-1/), recorder code 0 after 103 ms.
Both native syntax checks closed code 0 at 05:20:03.268 UTC, retained in
[syntax-helper-1](syntax-helper-1/) and [syntax-tests-1](syntax-tests-1/).
The three matching `*-tool.json` files retain the actual outer returns.
No long-duration diagnostic, real signal, model, browser or network call
ran during this validation. Signal behavior here used an injected emitter;
it is not a claim that an actual external signal was observed or attributed.

Validated helper SHA-256:
`22aaa0e37f8f5d030c969065c2ee41bf6aeef5355902109ab6e9f5aa43ad07e7`.
Tests SHA-256:
`6dc1f45fc4f44ffb750d8b8292ef65486bd6187772d00e9399e9ef848e4a2c7e`.
Actual pipe and PTY diagnostic launches remain root-owned and pending.
