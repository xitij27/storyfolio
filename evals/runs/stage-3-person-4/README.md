# Person test 4: where the run is

Plan: [plan 3](../../../docs/superpowers/plans/2026-10-31-person-test-3.md), run again on the one-world skill.
Protocol: [protocol.md](protocol.md), written before any actor.
Approved by the author's "Launch with those (Recommended)" on 31 October
([record](../../../docs/history/2026-10-31-person-test-3-review.md#the-person-test-again-and-a-push)).

## Progress

| Turn | Stop | State |
|---|---|---|
| 1 | Read | passed: questions only, no concept (124 s, about 35,200 uncached tokens) |
| 2 | Concept (one world) | passed: the whole sheet, pieces unchanged, nothing over the scene (403 s, about 114,400 uncached tokens) |
| 3 | Switch world, then storyboard | passed: switched to the map and recorded; storyboard written (193 s, about 155,300 uncached tokens) |
| 4 | Look | recorded: no looks shown (night kept), built ahead; edited the pieces to fix engine faults and add navigation (1,193 s, about 563,400 uncached tokens) |
| 5 | Words | recorded: night set, three opening and closing versions shown, version 1 recommended (139 s, about 585,900 uncached tokens) |
| 6 | Finish | done: wording applied, checks pass, the author's review pending (500 s); root's [final review](final-review/README.md) |

## Where the run lives

On the WSL machine, as user `kshitij`, from the clone at
`/home/kshitij/projects/storyfolio`:

- the frozen inputs, setup and each turn's prompt, reply and event stream:
  `evals/runs/codex-person-4/full-journey-3/baseline-1/` (committed);
- the agent's workspace:
  under `/var/tmp/storyfolio-person-4/storyfolio-evals/`, named in that folder's `meta.json`;
- the agent's conversation: the Codex session named by `sessionId` in each
  turn's `result.json`, in `~/.codex/sessions/` (not committed: it holds
  account identifiers and this repository is public);
- the tools: Node 24.14.0 in `~/.local/opt/node-v24.14.0-linux-x64`, the
  browser libraries in `/var/tmp/chromium-libs`, and in `/tmp` (a RAM disk;
  a restart erases them) the npm cache `/tmp/storyfolio-npm-cache` and the
  browsers `/tmp/storyfolio-browser-cache`. To refill them, see plan 3's
  Task 2. The environment script is
  [stage-3-person-3/environment.mjs](../stage-3-person-3/environment.mjs).

## To run the next turn

Write `gates/after-N.json` after reading turn N (its `previousTurnDigest` is
the SHA-256 of `evals/runs/codex-person-4/full-journey-3/baseline-1/turns/0N/result.json`),
then from the repository root:

```bash
export PATH=$HOME/.local/opt/node-v24.14.0-linux-x64/bin:$PATH \
  LD_LIBRARY_PATH=/var/tmp/chromium-libs/root/usr/lib/x86_64-linux-gnu \
  LANG=C.UTF-8 npm_config_cache=/tmp/storyfolio-npm-cache \
  PLAYWRIGHT_BROWSERS_PATH=/tmp/storyfolio-browser-cache \
  TMPDIR=/var/tmp/storyfolio-person-4
unset NEXT_TELEMETRY_DISABLED
node evals/codex-build-run.mjs --case evals/runs/stage-3-person-4/case.json \
  --cohort codex-person-4 --capabilities evals/builds/local-capabilities.json \
  --turn N+1 --gate evals/runs/stage-3-person-4/gates/after-N.json \
  > evals/runs/stage-3-person-4/turn-N+1.log 2>&1
```

If it stops with "source inventory differs" (no model call is made), a
folder the agent left outside the snapshot roots is the cause: move it out
intact with its hashes recorded, as in `stage-3-person-1`, and run again.
