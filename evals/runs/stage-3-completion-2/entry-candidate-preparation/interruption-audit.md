# Independent interruption audit

The paid entry candidate has no normal terminal actor result. Its outer
execution tool closed with exit 143 in
[actor-tool-poll-2.json](actor-tool-poll-2.json). Exit 143 is consistent with
termination, but does not establish a received signal, its sender, the
exact stop time or which process was terminated. No actor continuation or
retry occurred. Token usage/cost are unknown, not zero.

## Saved lifecycle

The recorder command started at `2026-10-12T03:46:36.472Z`; the actor's
`started.json` says `03:46:37.267Z`, stop 4, timeout 900000 ms. The raw
stream has 189053 bytes and 55 valid JSONL events, SHA-256
`bc1501124836961f8e8e6a84392cd061fa8eb2f9b48267b8802147f56bfa6fe6`.
There are 25 command starts, 24 command completions and four agent
commentary messages. There is no `turn.completed` or `turn.failed` event.

The only unmatched command is `item_19`, stream line 38:
`npm run check -- --out=checks/spine-first`. The final observed command,
`item_28`, starts at line 54 and completes at line 55, reading the local
timeline and screenshot script. The stream's last-write metadata is
`03:53:42.468Z`. The outer terminal poll file was retained at
`03:54:00.208Z`; file modification time is not an exact signal timestamp.
No timeout event or saved timeout result establishes that the 900000-ms
limit was reached.

At the independent `03:57:36.332Z` audit, the original turn still contained
only before-snapshot, prompt, started record, stderr and stream. Normal
`process.json`, `result.json`, `reply.md` and final `snapshot/manifest.json`
were absent, as was `actor-command/result.json`. Recorder stdout/stderr
were both empty. These absences were not filled with synthetic normal
results. Root's later [recovery record](interruption-recovery/recovery.json)
is explicitly coordinator recovery, not actor closure or an accepted gate.

The actor read the installed candidate skill in `item_2` (lines 6 and 7)
and the new building reference with the installed engine README in
`item_4` (lines 10 and 11). It described an opening/middle/ending spine in
two looks in commentary `item_8`, line 18. This narrower progress is not a
completed person-facing choice handoff. Initial lint, typecheck and tests
completed in `item_16` to `item_18`; after later source edits in `item_25`,
only typecheck completed in `item_26`. A prior browser result cannot
establish final-revision acceptance. All four agent messages remain
commentary, not a fabricated terminal reply.

## Process and recovery checks

A read-only `/proc` scan at `03:57:36.332Z` inspected 75 same-UID processes
and 1983 accessible descriptor links, excluding the audit process itself.
None had a cwd or descriptor under the exact actor workspace, cohort run
or actor-command directory. Cwd access was denied for PIDs 372 and 374;
descriptor-directory access was denied for PID 374. No command lines,
environments or credential contents were read, and no signals were sent.
This supports the absence of observed scoped writers, not proof that every
detached, changed-cwd, inaccessible or other-UID descendant is gone.

At `04:00:04.759Z`, all 179 recovered source files matched both their saved
hashes/sizes and the live workspace. Root's complete source digest is
`ba83fba0f7a60dfb85ff88595a6a148bef3954dbb72ca3387e7b5f6e7d5408b9`.
All 133 frozen input hashes still verified. `.aws` and `.codex` were
nonsymlink directories with zero entries, inspected by metadata only.

All 80 archived check files matched their recorded hashes/sizes. Their
provenance is mixed and should not be called 80 independent actor checks:

| Workspace check subtree | Files | PNG paths | Bytes | Origin |
|---|---:|---:|---:|---|
| `setup-capability` | 16 | 9 | 1306862 | Coordinator starter setup |
| `spine-first` | 64 | 44 | 9184275 | Actor command `item_19` |

The 44 actor PNG paths were not visually reviewed by this lifecycle audit;
actor pass labels are not independent acceptance. The recovery JSON hash
is `471c423f35658a4973d104aff99f82adb40bbfd08e7a192894aca7fad5af8694`;
the archived check inventory hash is
`ed02c71c00b2318d1a0ae1d3f7f5dfcb64792dd8381ccefeb5b68a210aa8fedc`.

## Cause remains unknown

The unchanged historical recorder has no signal handler or saved child
PID. It writes `result.json` only after child close. Therefore an abrupt
recorder loss can leave no inner terminal result, but the present records
do not prove exactly that mechanism. The older baseline judge retained a
valid inner completion despite outer exit 143; the two interrupted browser
captures retained explicit external TERM records at different elapsed
times. These are distinct observations, not evidence of one established
sender or shared cause. See the earlier
[capture disposition](../../stage-3-candidate-verification-1/interruption-disposition.md)
and [blocked judge disposition](../../stage-3-comparison-1/candidate-judge-preflight.md).

This reviewer issued no tests, build, browser, model, cleanup or signal
command during the entry actor. Its live-period actions were static reads,
diffs and assigned source/evidence edits. The first focused local runner
test began at `03:58:21.042Z`, only after root's recovery/safety authorization,
well after the retained outer closure. No causal claim is made about other
tools or the platform.

The smallest justified prospective change is observability: a separately
frozen recorder with recorder/parent/child PIDs and append-only signal,
forwarding, escalation and child-close events, direct native launch without
an extra synchronous wrapper, and regular bounded polling. It should forward
the first caught external signal once to its owned runner PID, let the
runner manage its actor group, and record any bounded-grace force step.
No broad process-group cleanup, automatic retry or assumption that this
prevents another external termination is justified. The old recorder and
all original evidence stay unchanged. Root approved development and
no-model signal tests for that separate recorder, subject to review before use.
