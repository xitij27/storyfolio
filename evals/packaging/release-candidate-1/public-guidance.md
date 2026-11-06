# Public guidance, release candidate 1

Stage 4, Task 5 of the [packaging plan](../../../docs/superpowers/plans/2026-10-11-packaging.md).
Made 6 November 2026. The author saw the diff and said "yes" before the
commit (`a8d88bb6`). No model was started.

## What the README now says, and what each line rests on

| README | Evidence |
|---|---|
| Node 22.18 or later with built-in TypeScript; check with `node -p process.features.typescript` | [clean install, finding 1](clean-install.md#findings) |
| Sparse clone of `skills/` | Run from GitHub in a scratch folder: exit 0, 3 s, 15 MB, the skill and the top-level files |
| Plugin: `marketplace add ... --sparse .claude-plugin skills`, `install`, `marketplace update`, `update`, `uninstall` | Each run in a disposable `CLAUDE_CONFIG_DIR` with Claude Code 2.1.314; all succeeded, and `plugin list` was empty after the uninstall |
| Each agent reads only its own skill folder | [install routes](install-routes.md#skill-folder-copies-6-november) |
| The site's commands; Chromium's Linux libraries and the error naming them | [clean install](clean-install.md) and its finding 2; the three Ubuntu package names are the ones the handover records as missing on the WSL machine |
| `npm run build` then `npm start` serves the site | The author looked at the site served this way ([clean install](clean-install.md#the-authors-look)) |
| Agents, one model, one person for planning | [install routes](install-routes.md) and the [closers decision](../../../docs/history/2026-11-06-closers-decision.md) (items 13 and 16, deferred with their limits stated) |
| Without JavaScript or WebGL, the name, words and links remain | `engine/scripts/site-check.mjs` runs `missingFromPage` on both loads |

Removed: GitHub's "Download ZIP", which fetches the whole repository.
Not said, because it was not tried: any particular host for publishing.

## Updates need a new version

`claude plugin update storyfolio@storyfolio` answered "storyfolio is
already at the latest version (0.1.0)". Claude Code compares
`version` in `skills/storyfolio/.claude-plugin/plugin.json`: a later
release must raise it, or installed copies keep the old files.

## The name

Checked 6 November 2026:

- npm: no package `storyfolio` (`npm view storyfolio`: 404).
- GitHub repositories named storyfolio: three, this one,
  `katmh/storyfolio` (1 star) and `runrunicd/storyfolio` (0 stars).
- The web: Storyfolio at https://storyfolio-landing.pages.dev/, a
  browser tool for planning picture books. Same name, different field.
  Nearby names: StoryPortfolio (a Framer component), StoryFolder (video
  storyboards).

No trademark search was made.
