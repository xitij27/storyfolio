# Clean saved-source entry replay

This is a new measurement-only baseline within the newly directed Stage 3
completion work. It is not another actor turn, a successful skill rerun or
a waiver of the original source-inventory gate. Root records the new user
direction, reviews these helpers and owns every actual setup/launch/poll.
Creating these helpers does not itself reconstruct, install or capture.

Preparation checks: seven focused no-model tests pass, with full command,
stdout/stderr and terminal evidence in `local-tests/` and
`local-tests-tool.json`. All three executable helper syntax checks pass.
The saved `read-only-binding-preflight.json` verifies that the original
132-file freeze, 365 result artifacts, 180 saved source files and 198-file
live original inventory are available and unchanged. No workspace was
allocated and no install/build/browser was invoked by these checks.

## Fixed scope

Restore exactly the 180 files saved by the timed-out ordinary-entry actor.
Their frozen-order source digest is
`fea7a2ef704fa6c30e3d6d1477a39b911fa06961b54560f8f0bca90f3c1403c3`.
The actor result remains incomplete/timed out. The original 198-file
workspace, 18 extra Git metadata files, frozen launcher, original observed
targets and blocker all stay unchanged. The helper verifies those original
identities before reconstruction and before/after measurement. Missing or
changed originals stop this procedure rather than being silently waived.

Reconstruction copies saved source bytes only. It does not copy credentials,
Git metadata, node_modules, `.next`, actor checks or old screenshots. There
are no application improvements, engine edits or shared exclusion changes.
The original frozen narrow worker and expectations are reused. Every
semantic target, public look and selector stays the same. Only the copied
observed-target record's top-level sourceDigest changes to the restored
180-file digest; its original historical sourceBinding stays visibly
blocked. `reconstruction.json` records the distinct new binding.

The fresh directory uses mkdtemp below the original recorded TMPDIR:
`/var/tmp/storyfolio-entry-runtime-20261012/storyfolio-evals/replay-bench-entry-1-*`.
The recorded native Node, four capability environment values, browser cache,
library path and trusted dependency root remain exact. The offline install
must match the original setup command and all six recorded environment
fields, including an unset telemetry flag. The measured worker separately
forces telemetry off, as the original frozen measurement launcher does.
Dependency entrypoint checks retain their original limited scope, not an
assertion about every transitive package byte.

## Root-only commands

Use `/tmp/storyfolio-node-check-20261011/node_modules/node/bin/node` for each
helper. Record complete command/tool launch and terminal returns separately
inside this directory. Commit/review preparation before the actual capture.

1. Run `reconstruct.mjs --authorization=/absolute/repository/docs/history/NEW_DIRECTION.md`.
   The direction must be saved in the repository. It creates `setup/`
   exclusively and returns the new workspace. An existing setup directory
   is an earlier attempt, never overwritten or automatically retried.
2. Root runs one `npm ci --offline --cache=/tmp/storyfolio-npm-cache` from
   that returned workspace with the original setup environment. Use the
   existing `evals/runs/stage-3-comparison-1/record-command.mjs` to save
   `setup/dependency-install/{command,result}.json` and full stdout/stderr.
   Its recorded executable must be `npm`, arguments exactly as shown,
   cwd the new workspace, environment identical to the old setup record.
   Derive the environment from the old frozen capabilities and
   `setup/runtime-environment.json`; explicitly unset
   `NEXT_TELEMETRY_DISABLED` for this installation. Do not reconstruct or
   rerun a failed install automatically. Its evidence stays in the repository.
3. Run `run-replay.mjs` once, with no overrides. It first checks the settled
   original actor, saved artifacts, setup helper hashes, authorization,
   successful install and exact restored source. It writes `measurement/`
   exclusively, then invokes the unchanged frozen worker once.
4. After terminal closure, root checks owned process IDs read-only and runs
   `verify-replay.mjs` for a source/artifact check. Save that command's result
   separately. Review every actual original image at full original detail,
   retaining path/hash/bytes inventories. No old image substitutes for it.

All outputs are retained below this repository directory: `setup/` contains
allocation, source restoration, rebound targets, identities and install
evidence; `measurement/artifacts/` contains unchanged worker output;
`measurement/review/` contains lifecycle, command, full process/stream logs,
source before/after, artifact inventory and closure findings. Source files
are already archived by the original actor snapshot and are not duplicated
as an unbound second source archive.

## Bound and interpretation

The existing frozen bounded helper sends TERM after 895000 ms work and
allows at most 5000 ms shutdown, escalating at 900000 ms total child lifetime,
subject to timer scheduling jitter. It records exact PIDs, deadlines,
signals and duration. It never retries. An external signal's sender stays
unknown unless independently established. Hard worker termination alone
cannot prove all detached descendants exited, so root inspects process
state before later work and only cleans up confirmed owned processes.

Complete technical capture is not material-look, semantic or Stage 3
acceptance. Errors and missing artifacts remain failures or unobserved scope.
Partial captures retain their raw files and explicit closure errors. The
read-only final verifier is strict and may fail on incomplete artifact
binding; do not relax it or relaunch to obtain a pass. Existing actor timeout,
missing final look-choice handoff and original 198/180 blocker are preserved.
This replay cannot supply the author's real choice or full six-stop proof.
