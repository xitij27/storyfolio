# Actor access, lifecycle and evidence audit

The single actor turn timed out. It is not a completed delivery or an
independent acceptance pass. The separately authorized browser verification
was not launched because its frozen source-equality precondition is blocked.
No actor continuation, source repair, judge, browser replay or process cleanup
was performed by this reviewer.

## Terminal record and process visibility

The [actor result](bench-entry-1/baseline-1/turns/01/result.json) records
`complete: false`, `timedOut: true`, 900,071 ms and `usage: null`. Token cost
is unknown, not zero. Its process record has code -1, no external
`interruptedBy`, spawn error or log error. The outer command recorder closed
with code 1, no signal, at `2026-10-12T02:37:09.098Z`, after 902,051 ms.
[The final outer tool return](../stage-3-natural-entry-1/actor-tool-poll-13.json)
also records exit 1. This is a deadline timeout, not evidence of the unrelated
external SIGTERM conditions from earlier studies.

The full [108-event stream](bench-entry-1/baseline-1/turns/01/stream.jsonl)
has 50 command starts, 47 command completions and nine completed agent
messages. There is no `turn.completed` event. The saved `reply.md` contains
intermediate agent messages, not a completed final delivery. Three commands
have no matching completion in this stream:

- `item_37`, line 69: lettering/texture edits, type/lint and the `accepted`
  browser matrix.
- `item_54`, line 101: type/lint and the final `verified` browser matrix.
- `item_57`, line 106: local production server and final supplemental
  `verified-interactions` review.

The retained [read-only audit result](../stage-3-natural-entry-1/actor-audit-result.json)
binds the full command inventory, exact line numbers, intermediate messages,
source changes and safe metadata. At 02:43:24 UTC, no readable same-UID
process had a workspace current directory or file-descriptor target. The
same check before archival at 02:46:23 UTC also found none. `/proc/372` and
`/proc/374` denied current-directory and descriptor access; that visibility
limit remains explicit. These are point-in-time checks, not proof about
inaccessible or detached processes. No argv, environment or credential
contents were read, and no signals were sent.

## Access and input integrity

All 50 saved commands, including embedded scripts, were reviewed. `item_1`
(lines 4-5) reads the actor handover and the entire local
`.agents/skills/storyfolio/SKILL.md`; its returned text contains the complete
4,790-byte frozen skill. `item_2` reads the declared story, environment,
facts, confirmations, assets, decisions and engine README. Other inspected
source is the copied engine, authored application, installed dependencies
or local actor checks. No command reads the accepted prototype, repository
held-out implementation, old evaluation content or coordinator rubric.

This is not a filesystem read-jail claim. `item_9` (lines 18-19) lists `/tmp`,
exposing names of other studies and unrelated temporary material, and lists
matching dependency paths under the fresh runtime root. The saved command
does not open those other study contents. Its runtime-root listing includes
two local screenshot-utility test stub directories. A blocked registry
attempt (`item_5`, exit -1) is followed by the declared offline-cache install
(`item_10`, exit 0). This is an actor dependency reinstall, not held-out
solution access. Ambient capabilities were configured, not physically
unreadable; the conclusion is limited to recorded access.

The archival verifier rechecked all 132 frozen input hashes, their manifest
digest `504064164d5410a3d8cba07e7c877989924a3a4b15b67d76af92ec28e920238a`,
and the corresponding current fixture, skill, engine and implementation
bytes. The input and shipped source are unchanged. All 365 result-bound
artifacts verify, and all 180 retained final source files match the live
workspace byte for byte. Compared with the actual 177-file turn-before
snapshot, there are 18 modified files and three additions.

The actor did modify three copied core-engine files, not just its content
adapter: `components/story/types.ts` adds optional extra `reach`,
`components/story/scene.tsx` uses that reach instead of a fixed 0.5, and
`components/story/faces.ts` sets texture anisotropy to 8. `item_28` introduces
the changes and `item_37` revises texture filtering. The final application
edit, `item_51` at line 95, reduces authored extra reach from 3 to 1.5.
Consequently this output is not proof of an unchanged copied core or a
content-only adapter. The installed skill copy and repository engine are
unchanged; these are actor-workspace edits only.

## Unexpected directories and the frozen blocker

`.aws` and `.codex` are nonsymlink empty directories, inspected only by
metadata and entry count. They add no source files. `.git-local` contains
18 regular files, no symlinks, and ordinary Git-layout subdirectories. The
only reported config value is `core.bare=false`; arbitrary config contents
are not exported. No Git or credential bytes were copied into this archive.

Exact actor provenance is `item_47` (lines 86-87), which successfully runs
`git --git-dir=.git-local --work-tree=. init` and ignores that directory.
It follows the failed ordinary `git init` in `item_42` and the read-only
`.git` observation in `item_43`. No commit command appears. The 18 files are
`HEAD`, `config`, `description`, fourteen sample hooks and `info/exclude`.
Their metadata and hashes are retained in the independent
[source-binding blocker](../stage-3-natural-entry-1/source-binding-blocker.json).

The frozen helper excludes validated hidden **bare** Git trees, not this
nonbare tree. Thus frozen capture sees 198 files while the case-constrained
actor snapshot retains 180. Every common file matches, with no missing
file; the eighteen extras still fail exact equality. Actor provenance and
`.gitignore` do not waive the gate. The
[blocked disposition](../stage-3-natural-entry-1/source-binding-blocker.md)
preserves the original policy, and browser verification remains unspent.

## Actor checks preserved, not accepted

The retained [archival script](../stage-3-natural-entry-1/archive-actor-checks.mjs)
first inventoried and then exclusively copied thirteen command-referenced
paths. It rejects symlinks, verifies copied hashes, compares inventories
before and after, and cannot overwrite an existing destination. The
[archive manifest](actor-checks/manifest.json) maps each path to exact actor
event IDs and binds 596 files totaling 65,963,068 bytes: 477 original PNGs,
seven derivative contact-sheet PNGs and 112 non-PNG files. The inherited
`setup-capability` evidence, dependencies, `.next`, credentials and Git
metadata are excluded. The archive adds its own manifest separately.

All 477 actor originals and seven contact sheets remain **unreviewed by this
audit**. Neither file names such as `accepted`/`verified` nor actor-authored
pass labels constitute coordinator acceptance. `interaction-review` and
`review-server.log` were reused by actor attempts; only surviving bytes can
be preserved, not overwritten historical revisions.

The first matrix failed at a type error. Two later full matrices completed
with command exit 1; `accepted` remains incomplete and `release` exited 143.
The actor explicitly disclaimed earlier overlapping rebuild/check evidence
in `item_52` (line 97) and its source handover. `verified` retains only one
matrix result and `complete: false`; the final supplemental directory has
40 PNGs but no report. A prior supplemental review exited 0 (`item_41`),
but precedes final source changes. Its report is actor-owned. No final-source
complete test matrix, complete visual review or independent look-switch
verification is established. The stream exposes only `command_execution`
and `agent_message` items, so the actor's claims of opening originals are
not independently demonstrated by an image-view event in this record.

The actor asked for a visual-look choice in `item_3` (line 8), then continued
without an answer. `item_31` records Warm as a provisional default and Night
as an alternative, explicitly not author approval. This is observed
ask-then-proceed behavior, not a completed author look-choice handoff or
evidence of a regression at the earlier planning stops. No judgment score
or full-site quality conclusion is assigned here.

Archive manifest SHA-256:
`ed1f05c7c80c71de2c27d314f467ba3a71f67f388a1438a81aec7ae7f28fd289`.
Audit result SHA-256:
`eb3913fe1b9cd778250ac4f515e91e929d343624792949b1fb14bfd4aabdb8e2`.
The study retains the full [inventory tool result](../stage-3-natural-entry-1/actor-checks-inventory-tool.json)
and [archival tool result](../stage-3-natural-entry-1/actor-checks-archive-tool.json).
