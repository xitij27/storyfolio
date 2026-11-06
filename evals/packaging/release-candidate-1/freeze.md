# Freeze, release candidate 1

Stage 4, Task 1 of the [packaging plan](../../../docs/superpowers/plans/2026-10-11-packaging.md).
Made 6 November 2026 on the WSL machine. No model was started.

## The candidate

- **Source commit:** `5d7cf1686fcdca1470e0c265a6812f2ab173e380`
  (2026-11-06T23:04:34+01:00), the engine on Next.js 16.4.5. Later commits
  touch only `docs/` and `evals/`; `git diff 5d7cf168 HEAD` over the
  allowlist below is empty at `ed03d3c4`, and the working tree was clean.
- **Archive:** `storyfolio-rc1.tar`, 135 files, sha256
  `d825b55e133ab3908c9c686b0fe6fc14a563f7174400edab10e802d87e50f9e0`.
  Made twice; both hashes equal. Not committed: the command remakes it.

```bash
git archive --format=tar --prefix=storyfolio-rc1/ \
  5d7cf1686fcdca1470e0c265a6812f2ab173e380 \
  .claude-plugin README.md LICENSE skills/storyfolio > storyfolio-rc1.tar
```

- **Every file and its sha256:** [manifest-sha256.txt](manifest-sha256.txt).
  Its 132 `skills/storyfolio/` lines equal the package the second clean
  install used ([clean-install-2/package-sha256.txt](clean-install-2/package-sha256.txt)),
  so the proof below is of these bytes.

## The allowlist

Git's tracked files under these paths, and nothing else:

| Path | What | Ships in |
|---|---|---|
| `.claude-plugin/marketplace.json` | The one-entry marketplace | Repository and GitHub install |
| `README.md`, `LICENSE` | Public guide, MIT licence | Repository |
| `skills/storyfolio/` (132 files) | `SKILL.md`, `references/` (6), `scripts/` (scaffold and its test), `.claude-plugin/` (manifest, icon), `engine/` (121: source, config, `AGENTS.md`, `CLAUDE.md`, `README.md`, `LICENSE`, tests, check scripts, `public/plain/face.svg`, `package-lock.json`) | A plugin install copies this folder only |

Only tracked files are archived, so dependency trees, build output, browser
caches, check shots and local credentials cannot enter it. `library/`,
`docs/`, `evals/`, `prototypes/` and the root `package.json` stay in the
repository and out of the package. The two binary files are the plugin icon
and `face.svg`. The largest file is `engine/stitch/land.json` (1.0 MB, the
map's land); its origin is Task 2's to check.

## Supported setup

- **Node** 22.18 or later with native TypeScript support
  (`engine/package.json` `engines`), proved on the official 22.18.0; npm 9.2.0
  ran `npm ci`.
- **Lock:** `engine/package-lock.json`, lockfileVersion 3, sha256
  `d8b2f09f4a40ff49ef989ef44750a467a7ddfd77738a922aaa8a8a63c1eb3d53`;
  `next` 16.4.5, `react` 19.2.4, `three` 0.180.0, `playwright-core` 1.64.0.
- **Browser:** `npm run browsers`, playwright-core's Chromium headless shell
  1248. On Linux it needs the system's NSS, NSPR and ALSA libraries.

## The proof

The [second clean install](clean-install.md#second-run-after-the-nextjs-upgrade):
scaffold cases, `npm test` 187, typecheck, lint, `npm run check` 0 problems,
`check:plain` 15 of 15, production audit clean, and the author's look at the
served site, "okay it looks fine". Plugin installs from a local marketplace
and from GitHub: [install-routes.md](install-routes.md) (made before the
Next.js move; the plugin's file list is the same).

## For Task 2

- The skill folder has no licence at its root: a plugin install copies
  `skills/storyfolio/`, which holds `engine/LICENSE` but not the root
  `LICENSE`, so `SKILL.md`, `references/` and `scripts/` arrive without one.
- `engine/stitch/land.json`'s source and terms.
