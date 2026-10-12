# Independent terminal audit

Both neutral probes completed their actual 660-second monotonic duration
and exited zero. This supports observed survival of these two neutral
workloads, not a fixed signal cause, a general transport advantage, or
future actor/browser safety. Root confirmed both sessions terminal before
the independent read-only audit ran.

The retained [audit script](audit-closed.mjs),
[full result](audit-closed-result.json) and
[exact tool response](audit-closed-tool.json) bind both original command
and journal hashes, each result, the exact helper and all retained tool
output. The audit ran at `2026-10-12T05:37:38.024Z` to
`05:37:38.296Z`, without a subprocess, runtime, model, browser or signal.

| Observation | Ordinary pipes | PTY |
| --- | --- | --- |
| Tool session | 58891 | 99015 |
| Actual PID | 284924 | 284925 |
| Monotonic start wall label | 05:25:18.546Z | 05:25:18.547Z |
| Final duration-event elapsed | 660,029 ms | 660,027 ms |
| Final result elapsed | 660,041 ms | 660,040 ms |
| Final result wall label | 05:36:18.587Z | 05:36:18.587Z |
| Retained sequence | Start, 21 heartbeats, duration reached | Start, 21 heartbeats, duration reached |
| Terminal tool exit | 0 | 0 |

The small final-duration difference is real: the result is assembled after
the synchronous terminal event append/output. Do not relabel the earlier
event elapsed value as the final result duration. Each heartbeat interval
was between 30,004 and 30,033 ms. The natural deadline occurred before a
22nd interval callback; no missing heartbeat or catch-up event is invented.
Each of the 23 actual journal events exactly matches the combined launch
and fifteen retained poll outputs, allowing only PTY CRLF line endings.
No caught signal, error or sender was recorded. Both helper command hashes
match the reviewed source
`22aaa0e37f8f5d030c969065c2ee41bf6aeef5355902109ab6e9f5aa43ad07e7`.

## Process closure

At the audit's post-terminal observation both exact PIDs were absent from
`/proc`. Their recorded start ticks, groups and sessions are preserved in
the result. A scoped metadata scan inspected 76 same-UID processes and
2,026 readable descriptor links, finding no cwd or descriptor tie to either
exact probe output directory. The helper source creates no child process.
No broad claim was made about the repository cwd, where unrelated root and
agent commands can legitimately remain active.

PID 372's cwd and 45 descriptor links, and PID 374's cwd and descriptor
directory, were inaccessible. The scan is not a kernel process jail or a
universal absence proof: unknown reparented processes without a matching
cwd/readable output descriptor could evade it. No command line,
environment dump, credential contents or descriptor contents were read.

## Matching and protocol deviations

The saved launch invocations specify the same native executable, explicit
environment values, helper, repository cwd and preparation commit
`d5a253b`. They differ in declared output/transport and actual TTY setting.
The helper verifies stdout's real TTY state; all three streams were non-TTY
for pipes and TTY for the PTY invocation. This checks declared launch
settings, not every inherited environment variable.

Root explicitly authorized concurrent launches and quick local-check
overlap before launching. The observed starts were one millisecond apart.
Therefore this is not a strictly isolated or causal transport comparison.
Both modes survived; it establishes no PTY advantage and no identified
cause of the older interruptions. Root's proposed continued use of ordinary
pipes preserves the historical transport but cannot promise the cause is
fixed.

The prospective at-most-40-second polling cadence was not met. Both saved
return histories contain eight gaps exceeding 40 seconds: 49, 54, 51, 61,
59, 92, 59 and 76 seconds. The result lists their exact adjacent filenames.
These are timestamped return observations, not exact poll-request times;
do not invent a fully compliant request cadence from them. The continuous
actual helper heartbeats and terminal monotonic measurements still establish
the observed duration despite this deviation. They do not cure the
comparison's scheduling/resource limitations.

No old interrupted result is changed by these successful neutral probes.
The post-probe disposition and any later calibration launch remain root
decisions, not actions performed by this audit.
