# Person test 6: where the run is

Protocol: [protocol.md](protocol.md), written before any actor.
Approved by the author's "okay let us test it" on 6 November
([record](../../../docs/history/2026-11-06-person-test-5-review.md#person-test-6-goes-ahead)).

## Progress

| Turn | Stop | State |
|---|---|---|
| 1 | Read | passed: questions only, no concept (143 s, about 32,200 uncached tokens) |
| 2 | Concept (one world) | running |
| 3 | The sheet, then storyboard | |
| 4 | Look and move | |
| 5 | Words | |
| 6 | Finish | |

## Where the run lives

On the WSL machine, as user `kshitij`, from the clone at
`/home/kshitij/projects/storyfolio`:

- the frozen inputs, setup and each turn's prompt, reply and event stream:
  `evals/runs/codex-person-6/full-journey-3/baseline-1/` (committed);
- the agent's workspace:
  under `/var/tmp/storyfolio-person-6/storyfolio-evals/`, named in that folder's `meta.json`;
- the agent's conversation: the Codex session named by `sessionId` in each
  turn's `result.json`, in `~/.codex/sessions/` (not committed: it holds
  account identifiers and this repository is public);
- the tools: Node 24.14.0 in `~/.local/opt/node-v24.14.0-linux-x64`, the
  browser libraries in `/var/tmp/chromium-libs`, and in `/tmp` (a RAM disk;
  a restart erases them) the npm cache `/tmp/storyfolio-npm-cache` and the
  browsers `/tmp/storyfolio-browser-cache`. On 6 November they were refilled
  by copying `~/.cache/ms-playwright`'s Chromium 1248 and its headless shell,
  and by `npm ci --cache` from the engine's lock (an `npm ci --offline` in a
  fresh copy then installed). The environment script is
  [stage-3-person-3/environment.mjs](../stage-3-person-3/environment.mjs).

## To run the next turn

Write `gates/after-N.json` after reading turn N (its `previousTurnDigest` is
the SHA-256 of `evals/runs/codex-person-6/full-journey-3/baseline-1/turns/0N/result.json`),
then from the repository root:

```bash
export PATH=$HOME/.local/opt/node-v24.14.0-linux-x64/bin:$PATH \
  LD_LIBRARY_PATH=/var/tmp/chromium-libs/root/usr/lib/x86_64-linux-gnu \
  LANG=C.UTF-8 npm_config_cache=/tmp/storyfolio-npm-cache \
  PLAYWRIGHT_BROWSERS_PATH=/tmp/storyfolio-browser-cache \
  TMPDIR=/var/tmp/storyfolio-person-6
unset NEXT_TELEMETRY_DISABLED
node evals/codex-build-run.mjs --case evals/runs/stage-3-person-6/case.json \
  --cohort codex-person-6 --capabilities evals/builds/local-capabilities.json \
  --turn N+1 --gate evals/runs/stage-3-person-6/gates/after-N.json \
  > evals/runs/stage-3-person-6/turn-N+1.log 2>&1
```

If it stops with "source inventory differs" (no model call is made), a
folder the agent left outside the snapshot roots is the cause: move it out
intact with its hashes recorded, as in `stage-3-person-1`, and run again.

