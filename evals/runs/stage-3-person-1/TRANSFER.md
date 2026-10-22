# Moving the person test to another device

The author asked, on 22 October 2026, to continue on another device. Turn 6
resumes the actor's Codex conversation, works in the actor's workspace, and
is checked by the runner against the machine details frozen at preparation
(`evals/runs/codex-person-1/inputs/capabilities.json`: the PATH string, the
Codex binary's path and SHA-256, the pinned Node's path). So everything
travels to the same absolute paths.

## The bundle

Root packed it in `/var/tmp/storyfolio-transfer/` on the first device, with
`SHA256SUMS` beside it. Carry the whole folder to the new device yourself
(drive, disk, network share). It is not in the repository: it is about
1.5 GB, and the conversation record holds Codex account identifiers while
this repository is public. It holds no login or credential.

| File | What | Restores to |
|---|---|---|
| `storyfolio-repo.bundle` | This repository, every branch and commit | `git clone` it |
| `person-1-workspace.tar.gz` | The actor's workspace, with its installed `node_modules` (the actor's sandbox allows no network beyond localhost, so it cannot reinstall) | `/var/tmp/storyfolio-entry-runtime-20261012/storyfolio-evals/build-full-journey-2-fs9yQ7` |
| `person-1-codex-session.tar.gz` | The Codex conversation, turns 1 to 5 | `/home/kshitij/.codex/sessions/2026/10/22/` |
| `codex-cli-0.162.1.tar.gz` | The pinned Codex CLI, release folder and its two links | `/home/kshitij/.codex/packages/standalone/` and `/home/kshitij/.local/bin/codex` |
| `storyfolio-tooling.tar.gz` | Pinned Node 22.22.1, Chromium 1248, its libraries, the npm cache | `/tmp/storyfolio-*` |

## Needs on the new device

- Linux on x86_64 (the binaries and `node_modules` are built for it), with a
  user named `kshitij`, so that `/home/kshitij` paths hold.
- `git`, `tar`, `python3`.
- The same ChatGPT account logged in to Codex (`codex login`), since the
  conversation belongs to it.

If any of these cannot hold, turn 6 cannot run unchanged; finishing turn 6
on the first device is then the simpler course.

## Restore

```bash
cd <folder holding the bundle>
sha256sum -c SHA256SUMS
git clone storyfolio-repo.bundle ~/projects/storyfolio
git -C ~/projects/storyfolio remote set-url origin https://github.com/xitij27/storyfolio.git
for f in person-1-workspace person-1-codex-session codex-cli-0.162.1 storyfolio-tooling; do
  tar -xzpf "$f.tar.gz" -C /
done
codex login
```

Then check, from `~/projects/storyfolio`:

```bash
sha256sum /home/kshitij/.codex/sessions/2026/10/22/rollout-2026-10-22T18-33-03-01a16475-7bbe-7713-a4a4-7d794da29d57.jsonl
# expect cbeb3a0c2fabf3c1995cff81b4a3da76c1eaa319b60be58d8304384333c566a3
sha256sum "$(realpath /home/kshitij/.local/bin/codex)"
# expect 628e35487d888a28f0427fc37501da529dd3d81fcbad7a2c3421c1e8670d92e1
```

## Running turn 6 there

Use the frozen environment exactly, then follow [README.md](README.md),
"To continue", from step 1:

```bash
cd ~/projects/storyfolio
eval "$(python3 -c 'import json,shlex
e=json.load(open("evals/runs/codex-person-1/inputs/capabilities.json"))["environment"]
print("\n".join(f"export {k}={shlex.quote(v)}" for k,v in e.items() if v is not None))')"
export TMPDIR=/var/tmp/storyfolio-entry-runtime-20261012
unset NEXT_TELEMETRY_DISABLED
```

The PATH string names first-device folders (VS Code server, Windows
mounts); missing folders are harmless, and the runner compares the string.
If the runner still refuses with "Current inputs differ from frozen cohort",
no model call has been made; compare `capabilities.json` with what the new
device has, and record any difference before deciding how to proceed.
