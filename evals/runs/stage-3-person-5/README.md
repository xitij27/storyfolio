# Person test 5: where the run is

Protocol: [protocol.md](protocol.md), written before any actor.
Approved by the author's "fine looks okay lets proceed" on 6 November
([record](../../../docs/history/2026-11-06-what-is-left.md#person-test-5-goes-ahead)).

## Progress

| Turn | Stop | State |
|---|---|---|
| 1 | Read | passed: questions only, no concept (123 s, about 30,500 uncached tokens) |
| 2 | Concept (one world) | passed: the whole sheet, pieces unchanged, study at Addis Ababa by `city` (289 s, about 74,800 uncached tokens) |
| 3 | The sheet, then storyboard | passed: the sheet kept and recorded; storyboard written (120 s, about 168,600 uncached tokens) |
| 4 | Look and move | recorded: looks and moves captured but not offered (read "keep everything else" as night and swing); built ahead, with three wording versions (827 s, about 287,700 uncached tokens) |
| 5 | Words | recorded: night and swing set; three opening and closing versions shown, A and A recommended (281 s, about 315,000 uncached tokens) |
| 6 | Finish | done: wording applied, checks pass, the author's review pending (544 s); root's [final review](final-review/README.md) |

## Where the run lives

On the WSL machine, as user `kshitij`, from the clone at
`/home/kshitij/projects/storyfolio`:

- the frozen inputs, setup and each turn's prompt, reply and event stream:
  `evals/runs/codex-person-5/full-journey-3/baseline-1/` (committed);
- the agent's workspace:
  under `/var/tmp/storyfolio-person-5/storyfolio-evals/`, named in that folder's `meta.json`;
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
the SHA-256 of `evals/runs/codex-person-5/full-journey-3/baseline-1/turns/0N/result.json`),
then from the repository root:

```bash
export PATH=$HOME/.local/opt/node-v24.14.0-linux-x64/bin:$PATH \
  LD_LIBRARY_PATH=/var/tmp/chromium-libs/root/usr/lib/x86_64-linux-gnu \
  LANG=C.UTF-8 npm_config_cache=/tmp/storyfolio-npm-cache \
  PLAYWRIGHT_BROWSERS_PATH=/tmp/storyfolio-browser-cache \
  TMPDIR=/var/tmp/storyfolio-person-5
unset NEXT_TELEMETRY_DISABLED
node evals/codex-build-run.mjs --case evals/runs/stage-3-person-5/case.json \
  --cohort codex-person-5 --capabilities evals/builds/local-capabilities.json \
  --turn N+1 --gate evals/runs/stage-3-person-5/gates/after-N.json \
  > evals/runs/stage-3-person-5/turn-N+1.log 2>&1
```

If it stops with "source inventory differs" (no model call is made), a
folder the agent left outside the snapshot roots is the cause: move it out
intact with its hashes recorded, as in `stage-3-person-1`, and run again.

## For the next run

Turn 3's answer here said "Keep everything else as it is, but tell the
whole site with the sheet." The agent took "everything else" to include the
look and move, and did not offer them at stop 4
([gate 4](gates/after-4.json)). A later run that tests stop 4 says only
which world to use at turn 3, such as: "Tell the whole site with the
sheet. If it is already the sheet, keep it. Record the world and my choice,
then work out the story and the rest of what the site needs."
