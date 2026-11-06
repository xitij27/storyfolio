# Install routes, release candidate 1

Stage 4, Task 3 of the [packaging plan](../../../docs/superpowers/plans/2026-10-11-packaging.md).
Made 6 November 2026 with Claude Code 2.1.314 and codex-cli 0.162.1 on the
WSL machine. No model was started.

## Sources read, 6 November 2026

- Plugin manifest reference: https://code.claude.com/docs/en/plugins-reference
  (`name` is the only required field; a folder with `SKILL.md` at its
  root, no `skills/` and no `skills` key loads as a single skill; every
  component path must stay inside the plugin root).
- Marketplace reference: https://code.claude.com/docs/en/plugins/marketplace-reference.md
  (`name`, `owner`, `plugins` required; a relative `source` resolves from
  the marketplace root; a `github` marketplace source clones the
  repository, and `--sparse` / `sparsePaths` checks out only named
  directories).

## What was added

- `skills/storyfolio/.claude-plugin/plugin.json`: the plugin's root is the
  skill folder itself, so an install copies the skill (9.7 MB, 343 files)
  and none of the repository's evidence (1.6 GB tracked under `evals/`).
- `skills/storyfolio/.claude-plugin/icon.png`: `docs/assets/storyfolio-mark.png`
  (512 by 512), for the directory listing.
- `.claude-plugin/marketplace.json` at the repository root, one entry,
  `"source": "./skills/storyfolio"`.

## What was observed

| Check | Result |
|---|---|
| `claude plugin validate skills/storyfolio` | Validation passed; plugin directory checks found nothing to report (after the icon; before it, one `ICON_MISSING` warning) |
| `claude plugin validate .claude-plugin/marketplace.json` | Validation passed |
| In a disposable `CLAUDE_CONFIG_DIR`: `claude plugin marketplace add <this checkout>` then `claude plugin install storyfolio@storyfolio` | Both succeeded; `claude plugin list` shows `storyfolio@storyfolio` 0.1.0, enabled |
| The installed cache against the skill's tracked files | Identical file list (the tracked skill files plus the manifest and icon) |
| `claude plugin details storyfolio` | One skill, `storyfolio`; no agents, hooks or servers; about 61 tokens always on |

## Not yet tested

- **From GitHub** (`claude plugin marketplace add xitij27/storyfolio`): needs
  these files pushed, which is on the author's word. A plain add clones the
  whole repository (1.6 GB tracked); `--sparse .claude-plugin skills`
  should check out only what the plugin needs. To be tried after a push.
- **Skill-folder copies** for Claude Code (`.claude/skills/`) and Codex
  (`.agents/skills/`), and the agent-neutral route: Task 3's remaining
  routes, with Task 4's clean install from the extracted package.
