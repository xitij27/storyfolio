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
to 28 minutes of the 90-minute bound.

## To continue

1. Look at the turn-5 chapters before writing the gate:
   `site/checks/chapters-final/light-wide/` in the workspace
   `/var/tmp/storyfolio-entry-runtime-20261012/storyfolio-evals/build-full-journey-2-fs9yQ7`.
   Check each chapter's scene with the captions hidden, as in the turn-3
   disposition.
2. Write `gates/after-5.json` like `gates/after-4.json`, with
   `afterTurn: 5` and `previousTurnDigest` the SHA-256 of
   `evals/runs/codex-person-1/full-journey-2/baseline-1/turns/05/result.json`.
3. Run, from the repository root:

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
