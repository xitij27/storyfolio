# Temporary tooling restored after a host restart

21 October 2026. `/tmp` on this host is a RAM disk (`tmpfs`). The host
restarted at 2026-10-15 00:10:21 local time, which erased every
`/tmp/storyfolio-*` path the frozen capability environment names:

| Path | Role |
|---|---|
| `/tmp/storyfolio-node-check-20261011/node_modules/node/bin/node` | The pinned `capabilities.node.executable` and first `PATH` entry |
| `/tmp/storyfolio-npm-cache` | Cache for the `npm ci --offline` install contract |
| `/tmp/storyfolio-browser-cache` | `PLAYWRIGHT_BROWSERS_PATH` |
| `/tmp/storyfolio-browser-libs/root/usr/lib/x86_64-linux-gnu` | `LD_LIBRARY_PATH` for three OS libraries |

`/var/tmp` survived: the actor workspace
`/var/tmp/storyfolio-entry-runtime-20261012/storyfolio-evals/build-full-journey-1-zdvnMZ`
and the recorded `TMPDIR` still exist. The Codex CLI is unchanged; its
SHA-256 still equals the frozen `cliSha256`
`628e35487d888a28f0427fc37501da529dd3d81fcbad7a2c3421c1e8670d92e1`.

Each path was rebuilt at its exact original location with its recorded
recipe, so every frozen environment string stays true. No frozen input,
actor file, result or helper was edited. No model was called.

| Item | Recipe | Identity check |
|---|---|---|
| Node 22.22.1 | `npm install node@22.22.1` in `/tmp/storyfolio-node-check-20261011`, as the [engine proof](../../engine/plain-story-1/findings.md#environment-and-reproducibility) records | Binary SHA-256 `243fd8938011479f41b3de101842150fa990f33fbbb3f7aabd330857f2d79e1d`, equal to `bin/node` extracted from the official `node-v22.22.1-linux-x64.tar.gz`, whose SHA-256 `07c8aafa60644fb81adefa1ee7da860eb1920851ffdc9a37020ab0be47fbc10e` equals nodejs.org's `SHASUMS256.txt` |
| npm cache | Online `npm ci --cache=/tmp/storyfolio-npm-cache --ignore-scripts` from the archived site's `package.json` and `package-lock.json`, which are byte-identical to the engine's lock | npm verifies each package's lockfile integrity hash. A fresh `npm ci --offline --cache=/tmp/storyfolio-npm-cache` then added 392 packages, the recorded count |
| Chromium | `npx --no-install playwright-core install chromium` with `PLAYWRIGHT_BROWSERS_PATH=/tmp/storyfolio-browser-cache`, from that install's pinned `playwright-core` 1.64.0 | Revision 1248, Chrome Headless Shell 156.0.8078.4; shell binary SHA-256 `4fa61f0ba0b4f89b7bec242c32ca16d3bccf69dbfef0651924a9ba8fede5f9d6`. No earlier binary hash was recorded, so equality with the erased copy rests on Playwright's pinned revision |
| OS libraries | `apt-get download` of the exact versions, extracted with `dpkg-deb -x` into `/tmp/storyfolio-browser-libs/root` | All three `.deb` SHA-256 values equal [browser-libraries.json](../../engine/plain-story-1/browser-libraries.json) |

Smoke check: with the frozen `PATH`, `LD_LIBRARY_PATH`,
`PLAYWRIGHT_BROWSERS_PATH` and `LANG`, Chromium 156.0.8078.4 launched,
rendered a test page and wrote a screenshot. This is setup evidence, not
a measurement or a gate.

The `PATH` string also names `/home/kshitij/.codex/tmp/arg0/codex-arg03W66Hr`,
which no longer exists. It was a Codex launcher shim directory. The
string is unchanged, and the missing directory adds no executable.

Limit: these are restored copies. Equality with the erased bytes is
proved for Node and the OS packages, and rests on a pinned revision for
Chromium. A later restart erases them again, so check these paths before
any run.
