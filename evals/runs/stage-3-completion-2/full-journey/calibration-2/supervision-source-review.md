# Source review of missing closure records

12 October 2026. Read-only source/evidence inspection, with no process,
browser, build, test, installer or model execution. Root and the independent
auditor own process settlement and artifact/source inventory checks.

## What is retained, and what is not

[The launch command](desktop-command/command.json) and
[terminal tool return](desktop-tool-poll-4.json) retain one attempt and
outer exit 143. The command's wrapper SHA is
`c3ab91eeb5833650ce9482accf96a5985c85471b9c714da6da820752f797a1b0`.
It identifies the old
[record-command wrapper](implementation/evals/runs/stage-3-comparison-1/record-command.mjs),
not the newer durable process recorder. At this review checkpoint the
outer command/stream files, inner command and partial worker manifest
exist, but outer result, inner lifecycle/result and completed mode report
do not. No missing record is reconstructed as a successful or normally
closed result.

Root reported a terminal observation roughly 395 seconds after the saved
05:02:21.769Z launch, before the inner 475-second work deadline. Exit 143
is conventionally associated with SIGTERM, but the tool return itself
does not identify a signal sender, recipient PID or propagation path.
Neither missing files nor a partial manifest prove which processes were
signalled. Separate process evidence is required.

## Concrete recording vulnerabilities in the launched path

The old outer wrapper writes its command first and opens stdout/stderr
files for the child. It then awaits the child's close event before closing
streams, hashing them and writing `result.json`. It installs no SIGTERM
or SIGINT handlers and does not create a lifecycle journal at all. If that
wrapper terminates while awaiting its child, command and direct stream
bytes can remain without a result. The lack of an outer lifecycle file
is therefore expected from this wrapper's design, not proof that no
signal event occurred.

The inner
[calibrate.mjs](implementation/evals/runs/stage-3-completion-2/full-journey-measurement/calibrate.mjs)
writes its command before invoking `runBounded`, but passes
`onEvent: event => events.push(event)`. It stores the lifecycle only in
memory until the bounded call returns. It likewise saves stdout, stderr,
source-after and result only afterward. Thus loss of the inner process
before that return can discard its already observed signal/exit events
and worker console output. The empty outer log does not establish that
the worker emitted no progress, since `runBounded` buffers it internally.

[The bounded helper](implementation/evals/runs/stage-3-candidate-verification-1/bounded-process.mjs)
does install SIGTERM/SIGINT handlers. They record into the callback,
forward to the owned checker PID and schedule a bounded hard escalation.
Its promise resolves only on child close. Catching a signal does not make
the caller's in-memory event buffer durable or guarantee a final result
after uncatchable termination. The helper signals its child PID, while
the worker separately owns its detached server process group. This
structure requires actual process closure checks, not inferred cleanup.

The worker keeps a mode report in memory and writes it only after the
browser case exits. A partial manifest and existing originals therefore
do not establish whether particular control trajectories or final checks
completed, even when an image file is present. No after-the-fact report
should be invented from filename presence.

## What this does and does not explain

This source inspection identifies why evidence can be missing after a
supervisor dies. It does not establish the interruption's origin. Root
noted a prior wording interruption near 389 seconds, this observation near
395 seconds, and an earlier calibration that completed normally near
442 seconds. Nearby durations make an execution-environment lifetime
limit a hypothesis worth investigating, but the longer successful run
rules out inferring a universal 390-second limit from these observations.
There is no sender, environment timeout policy or process-group kill
record in this source evidence. User cancellation, kernel/host/tool
termination and other possible senders must not be asserted without proof.

For future explicitly authorized attempts, the already available
[new recorder](implementation/evals/runs/stage-3-completion-2/process-supervision/recorder.mjs)
offers synchronous append-only lifecycle events, PID records, caught
signal details and direct stream descriptors. The measurement wrapper
should also persist its own bounded events/progress as they occur instead
of waiting until close. Those are prospective observability improvements,
not a claimed interruption fix, spending/deadline extension or permission
to repeat this attempt. No recorder can promise a terminal result after
uncatchable process loss. Current raw evidence and incomplete status stay.
