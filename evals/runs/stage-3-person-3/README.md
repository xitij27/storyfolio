# Person test 3: where the run is

Plan: [plan 3](../../../docs/superpowers/plans/2026-10-31-person-test-3.md).
Protocol: [protocol.md](protocol.md), written before any actor.
Approved by the author's "yes" on 31 October
([record](../../../docs/history/2026-10-31-fix-the-map.md#steps-2-and-3-then-plan-3)).

## Progress

Repetition 1 (cohort `codex-person-3`) passed turn 1's gate and finished
turn 2, but the runner could not capture turn 2 (400-file snapshot bound):
[disposition](rep-1-turn-2-disposition.md). Repetition 2 (cohort
`codex-person-3b`, `--rep 2`) starts again from turn 1 with the bound
raised ([amendment](protocol.md#amendment-31-october-repetition-2)).

| Turn | Stop | Repetition 2 |
|---|---|---|
| 1 | Read | |
| 2 | Concept (one mix) | |
| 3 | Swap, then storyboard | |
| 4 | Look | |
| 5 | Words | |
| 6 | Finish | |

## Where the run lives

On the WSL machine, as user `kshitij`, from the clone at
`/home/kshitij/projects/storyfolio`:

- the frozen inputs, setup and each turn's prompt, reply and event stream:
  `evals/runs/codex-person-3b/full-journey-3/baseline-2/` (committed);
- the agent's workspace:
  under `/var/tmp/storyfolio-person-3/storyfolio-evals/`, named in that folder's `meta.json`;
- the agent's conversation: the Codex session named by `sessionId` in each
  turn's `result.json`, in `~/.codex/sessions/` (not committed: it holds
  account identifiers and this repository is public);
- the tools: Node 24.14.0 in `~/.local/opt/node-v24.14.0-linux-x64`, the
  browser libraries in `/var/tmp/chromium-libs`, and in `/tmp` (a RAM disk;
  a restart erases them) the npm cache `/tmp/storyfolio-npm-cache` and the
  browsers `/tmp/storyfolio-browser-cache`. To refill them, see plan 3's
  Task 2.

## To run the next turn

Write `gates/rep-2-after-N.json` after reading turn N (its `previousTurnDigest` is
the SHA-256 of `evals/runs/codex-person-3b/full-journey-3/baseline-2/turns/0N/result.json`),
then from the repository root:

```bash
export PATH=$HOME/.local/opt/node-v24.14.0-linux-x64/bin:$PATH \
  LD_LIBRARY_PATH=/var/tmp/chromium-libs/root/usr/lib/x86_64-linux-gnu \
  LANG=C.UTF-8 npm_config_cache=/tmp/storyfolio-npm-cache \
  PLAYWRIGHT_BROWSERS_PATH=/tmp/storyfolio-browser-cache \
  TMPDIR=/var/tmp/storyfolio-person-3
unset NEXT_TELEMETRY_DISABLED
node evals/codex-build-run.mjs --case evals/runs/stage-3-person-3/case.json \
  --cohort codex-person-3b --rep 2 --capabilities evals/builds/local-capabilities.json \
  --turn N+1 --gate evals/runs/stage-3-person-3/gates/rep-2-after-N.json \
  > evals/runs/stage-3-person-3/rep-2-turn-N+1.log 2>&1
```

If it stops with "source inventory differs" (no model call is made), a
folder the agent left outside the snapshot roots is the cause: move it out
intact with its hashes recorded, as in `stage-3-person-1`, and run again.
