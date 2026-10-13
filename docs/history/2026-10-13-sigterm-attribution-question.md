# SIGTERM attribution question, 13 October 2026

The author asked, verbatim:

> is it possible to also know how and why they come?

Context is the unexpected SIGTERMs, not approval of the shorter storyboard.
The ten-beat exception remains undecided. This work is read-only diagnosis
and repository documentation, not authority to install tracing software,
alter frozen helpers, rerun an evaluation or resume the paid journey.

## What the latest interrupted operation establishes

The [retained independent review](../../evals/runs/stage-3-storyboard-length-1/concept-replacement-signal-source-review.md)
and [raw lifecycle](../../evals/runs/stage-3-storyboard-length-1/commands-2/operation-02/lifecycle.jsonl)
show two different termination events on 12 October, UTC:

- The temporary Next preview server closed code 143 during normal cleanup
  at 21:16:22.141. That is not the unexpected interruption.
- The browser worker closed successfully at 21:16:22.435, with no timeout
  or external-signal flag. Its deadline was 21:16:54.291.
- At 21:16:23.969, 1534 ms after worker closure, recorder PID 883466 received
  SIGTERM, then forwarded it to its child coordinator 883477. The coordinator
  closed by SIGTERM at 21:16:23.975.

Thus the delivery path after arrival is known; the first sender and its
reason are not. The recorder has no work deadline. Its ordinary JavaScript
signal callback records the name and literally writes sender unknown,
without kernel sender metadata. Its parent PID is not sender evidence.
External means incoming to this recorder, not sent by the author. The
author's earlier denial is retained; nothing contradicts or overrides it.
No source-level self-signal path was found in the reviewed worker cleanup,
but missing historical process-group metadata limits that conclusion.

## New narrowly scoped checks

Available command lookup found journalctl and dmesg, but no strace, auditctl,
ausearch, bpftrace or perf on the current PATH. Current kernel identifies
Linux 6.18.33.2-microsoft-standard-WSL2; effective user is kshitij, UID 1000.
Read-only sysctls show perf_event_paranoid 2 and ptrace_scope 1. These are
observations, not proof that a particular future tracer will work.

Two journal queries restricted to 21:16:15 through 21:16:30 UTC on 12 October
returned no entries: exact recorder/coordinator PIDs, and kernel messages
matching oom, Out of memory, Killed process, shutdown or SIGTERM. This does
not prove absence of a cause, audit coverage, persistent history or provider
logs. No broad private logs, credentials or host contents were inspected.

## Can future events be attributed?

Often, yes. Record signal metadata and process identity while the event is
happening. Linux exposes sending PID/UID for signals delivered through
kill/sigqueue. The ordinary Node callback exposes the signal name, not this
full siginfo record. Sources checked on 13 October:
[Node 22 signal events](https://nodejs.org/docs/latest-v22.x/api/process.html#signal-events)
and [Linux sigaction](https://man7.org/linux/man-pages/man2/sigaction.2.html).

A narrowly scoped external trace could preserve signal delivery metadata,
sender/target process identity, parent and process-group IDs and timestamps
during the next already needed run. [strace](https://strace.io/) supports
signal delivery and process/syscall tracing. It is not available on the
current PATH and has not been installed or used by this work. Kernel auditing is another prospective
option, with access/configuration requirements and no claim of availability.

Sender identity answers who sent the request at the process level, not why
that process decided to do so or which human caused it. The why needs
correlation with the sender's timeout, cancellation or cleanup records.
An execution-service sender may require service-side logs unavailable in
this workspace. Automation can run under the same user ID; UID alone does
not identify a manual action. These possibilities are hypotheses, not the
diagnosed cause of the prior interruption.

Any later implementation should be separate from frozen historical evidence,
validated without paid work first, narrowly scoped and disclosed as a
measurement change. No intentionally induced failure or paid retry is needed
to answer this question. Existing evidence cannot identify the original
sender or reason; stronger future evidence may do so, without a guarantee.

Documentation checkpoint: node evals/check-skill.mjs passed (765 words,
five references), and npm test passed all 351 tests with zero failures.
No runtime helper, skill instruction or historical evidence changed.

