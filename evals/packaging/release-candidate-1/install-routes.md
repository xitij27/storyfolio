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
  skill folder itself, so an install copies the skill (9.7 MB, 343 files; 2.0 MB, 132 files
  once `library/` moved out the same day)
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
| The installed cache against the skill's tracked files | Identical file list (the tracked skill files plus the manifest and icon), before and again after `library/` moved out |
| `claude plugin details storyfolio` | One skill, `storyfolio`; no agents, hooks or servers; about 61 tokens always on |

## From GitHub, after the author's push (6 November)

In a fresh disposable `CLAUDE_CONFIG_DIR`: `claude plugin marketplace add
xitij27/storyfolio --sparse .claude-plugin skills` succeeded in 2.4 s, and
`claude plugin install storyfolio@storyfolio` installed 0.1.0, enabled
(17 MB under `plugins/` in all). The Pages workflow from `library/` (run
42298395554) succeeded, and the live gallery answers 200.

## Skill-folder copies (6 November)

From the frozen archive ([freeze.md](freeze.md), `e1af3eb5`), unpacked in a
scratch folder under `/tmp`: `skills/storyfolio` copied with `cp -R` into a
fresh git project's `.claude/skills/` and `.agents/skills/`, as the README
says. Both copies hash equal to the manifest's `skills/storyfolio/` lines.
Clients started with empty homes (`CLAUDE_CONFIG_DIR`, `CODEX_HOME`), no
login, and no model was called.

| Check | Result |
|---|---|
| Claude Code 2.1.314, `claude -p "/context"` in the project | Lists `storyfolio`, source "Project", about 80 tokens |
| Same, with only `.agents/skills/` present | Not listed: Claude Code reads `.claude/skills/` |
| codex-cli 0.162.1, `codex debug prompt-input` in the project (renders the model's input without calling it) | Lists `storyfolio:storyfolio` with its full description, file `<project>/.agents/skills/storyfolio/SKILL.md` |
| Same, with only `.claude/skills/` present | Not listed: Codex reads `.agents/skills/` |
| `node .claude/skills/storyfolio/scripts/scaffold.mjs .` from the project root | Exit 0, 121 files; the project's files outside `.claude/`, `.agents/` and `.git/` hash equal to the installed `engine/`; no source file names either skill folder |
| The same command again | Exit 1, "Nothing written", names `.gitignore` |

The site's checks on a scaffold of these bytes are in
[clean-install.md](clean-install.md).

## Not tested

- **From GitHub without `--sparse`**: a plain add clones the whole
  repository (1.6 GB tracked). Not tried.
- **The agent-neutral route** (an agent told to read `SKILL.md` from a
  checkout): there is no client to list it. What it needs, relative links
  that resolve inside the package, was checked in the clean install. No
  model was given it.
- **A model invoking the skill** from any of these routes: discovery and
  listing only.
