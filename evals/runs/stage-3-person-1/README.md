# Person test (`stage-3-person-1`), state and how to continue

The first test of the skill's change to a site that introduces the person
([protocol](protocol.md), [fixture](../../builds/full-journey-2/README.md),
Dawit Bekele). Cohort `codex-person-1`. Paused after turn 5 on the author's
word "I want to continue this in another session".

## Where it stands

| Turn | Result | Wall s | Uncached tokens |
|---|---|---:|---:|
| 1 | Fact questions, incl. places and degree; all five traps | 99 | 28,268 |
| 2 | Three concepts covering the person; runbook recommended; [passes gate](turn-2-disposition.md) | 546 | 80,452 |
| 3 | Seven chapters, 15 beats, each a picture; [passes gate](turn-3-disposition.md) | 186 | 96,246 |
| 4 | Spine in two looks, working migration model; gate written | 1,324 | 251,865 |
| 5 | All 15 beats in Paper/daylight, five work pages, CV, 404; three openings and closings offered, A recommended | 1,555 | 413,059 |
| Total | | 3,710 (62 of 90 min) | 869,890 of 1,500,000 |

Turn 6 (finish with the recommended wording) has not been sent. It has up
to 28 minutes of the 90-minute bound. Root has viewed the turn-5 chapters
and written the turn-6 gate ([turn-5-disposition.md](turn-5-disposition.md),
[gates/after-5.json](gates/after-5.json)).

## Where the run lives

The run was made on another machine, from a clone at
`/home/kshitij/projects/storyfolio`. Only that machine has what turn 6
needs: the agent's conversation (Codex session
`01a16475-7bbe-7713-a4a4-7d794da29d57`, in that machine's `~/.codex`), the
workspace under `/var/tmp/storyfolio-entry-runtime-20261012/`, the frozen
inputs at the absolute path in `meta.json`, Codex itself, and the pinned
tools in `/tmp`. The runner resumes the conversation with
`codex exec resume <session>` and refuses a workspace path that differs
from the saved probe (`evals/lib/build.mjs`), so turn 6 is sent from that
machine.

On 22 October (evening) the work was taken up on a second machine (a clone
at `/home/kshitij-parashar/Downloads/projects/storyfolio`, pulled from
GitHub at `543c51a`). It has none of the above: no Codex, no session, no
workspace, and `/tmp` is on disk there. Root's view of the turn-5 chapters
was made there on a rebuild of the saved snapshot, as the disposition says.

## The agent's conversation

The actor is one Codex conversation across all six turns, session
`01a16475-7bbe-7713-a4a4-7d794da29d57` (the `sessionId` in every
`evals/runs/codex-person-1/full-journey-2/baseline-1/turns/0N/result.json`).
Turn 6 continues it: the runner reads the session id from turn 5's result
and calls `codex exec resume 01a16475-7bbe-7713-a4a4-7d794da29d57`, so the
agent keeps everything it said, read and built in turns 1 to 5. Nothing
has to be passed to it by hand.

`codex exec resume` needs Codex's own record of the conversation:

- `/home/kshitij/.codex/sessions/2026/10/22/rollout-2026-10-22T18-33-03-01a16475-7bbe-7713-a4a4-7d794da29d57.jsonl`,
  19195948 bytes, SHA-256 `cbeb3a0c2fabf3c1995cff81b4a3da76c1eaa319b60be58d8304384333c566a3`, as it stood after turn 5.
- A copy, verified identical, in
  `/var/tmp/storyfolio-entry-runtime-20261012/storyfolio-evals/person-1-codex-session-backup/`.

It is not committed: it is large and holds Codex account identifiers, and
this repository is public. Earlier runs recorded such files by path and
hash the same way. Before turn 6, check the file still hashes as above; if
it is missing, copy the backup back to the same path.

What the agent was told and said is in the repository: each turn's
`prompt.md`, `reply.md` and raw event stream `stream.jsonl` under
`evals/runs/codex-person-1/full-journey-2/baseline-1/turns/`.

Turn 6 must run on this machine or on another prepared as in [TRANSFER.md](TRANSFER.md), as the same Linux user (`kshitij`), with
the same Codex login, because the conversation, the workspace
(`/var/tmp/storyfolio-entry-runtime-20261012/storyfolio-evals/build-full-journey-2-fs9yQ7`)
and the tooling in `/tmp` are here. Another machine would need all three
copied to the same paths.

## To continue

1. Done: the turn-5 chapters are viewed with the captions hidden
   ([turn-5-disposition.md](turn-5-disposition.md)).
2. Done: [gates/after-5.json](gates/after-5.json), whose
   `previousTurnDigest` is the SHA-256 of
   `evals/runs/codex-person-1/full-journey-2/baseline-1/turns/05/result.json`.
3. On the machine the run was made on, with this gate pulled into its
   clone, check that the `/tmp` tools below still exist, then run from the
   repository root:

```bash
export PATH=/tmp/storyfolio-node-check-20261011/node_modules/node/bin:$PATH \
  PLAYWRIGHT_BROWSERS_PATH=/tmp/storyfolio-browser-cache \
  LD_LIBRARY_PATH=/tmp/storyfolio-browser-libs/root/usr/lib/x86_64-linux-gnu \
  LANG=C.UTF-8 TMPDIR=/var/tmp/storyfolio-entry-runtime-20261012
unset NEXT_TELEMETRY_DISABLED
node evals/codex-build-run.mjs --case evals/runs/stage-3-person-1/case.json \
  --cohort codex-person-1 --capabilities evals/builds/local-capabilities.json \
  --turn 6 --gate evals/runs/stage-3-person-1/gates/after-5.json \
  > evals/runs/stage-3-person-1/turn-6.log 2>&1
```

   If it stops with "source inventory differs" (no model call is made),
   a folder the agent left outside the snapshot roots is the cause: move it
   out intact with its hashes recorded, as `local-check-relocation.sha256`
   and `turn-2-local-check-relocation.sha256` were, and run again.
4. Serve a copy of the finished site for the author (copy the workspace's
   `site/` to a folder under `/var/tmp`, not `/tmp`, which is a small
   in-memory filesystem; then `next start --hostname 127.0.0.1`), check it
   against [the criteria](../../builds/full-journey-2/criteria.md), and
   ask for the author's desktop and phone review, which decides.

The pinned Node, npm cache, Chromium and its libraries live in `/tmp`; a host
restart erases them (see `../stage-3-spine-time-1/environment-restore-1.md`
for how they were rebuilt). The workspace and relocated folders are under
`/var/tmp/storyfolio-entry-runtime-20261012/storyfolio-evals/`.
