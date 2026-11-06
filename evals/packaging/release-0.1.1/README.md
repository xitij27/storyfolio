# Release 0.1.1 and the plugin branch

Made 7 November 2026 on the author's "yes lets do all the recommendations"
and their answers: a `plugin` branch for Anthropic's plugin directory, and
release 0.1.1. No model was started.

## Why

Anthropic's plugin directory ([submit](https://claude.com/docs/plugins/submit),
[pre-submission checklist](https://claude.com/docs/plugins/pre-submission-checklist.md),
read 6 November) stops validation for a repository over 50 MiB as GitHub
archives it or over 10,000 files and folders. `main` is about 1,080 MiB as a
tar.gz with 59,903 tracked files, because of the evaluation records. The
portal tracks a branch or tag of the submitter's choosing. It also blocks a
plugin folder without a README of at least 40 words outside code blocks:
`skills/storyfolio/` had none.

## What was made

| | |
|---|---|
| `skills/storyfolio/README.md` | New, 312 words: what the skill does, and what it reads, writes, installs, runs and links to, as the security scan asks |
| `plugin.json` | `version` 0.1.1 |
| Release commit | `20ec4ffd9a133537f905d88935f2798cbff035af` on `main`, tag `v0.1.1` |
| Archive | `storyfolio-0.1.1.tar`, 137 files, sha256 `9938fd6efd3349ceac778aff09345c98cf8cf78efa802b2e9ef1c47a35771410`, made twice with equal hashes; per-file list [manifest-sha256.txt](manifest-sha256.txt) |
| Against 0.1.0 | Three files differ: `README.md`, `plugin.json`, the new plugin README. Every `skills/storyfolio/engine/` file is byte-identical, so the [clean install](../release-candidate-1/clean-install.md) holds |
| GitHub release | https://github.com/xitij27/storyfolio/releases/tag/v0.1.1, [notes](release-notes.md); the downloaded archive hashes as above |
| `plugin` branch | `ff5fa81e`, no parent: exactly the archive's files (`.claude-plugin/`, `README.md`, `LICENSE`, `skills/storyfolio/`). GitHub's tar.gz of it is 0.55 MiB, 161 entries |

Checks: `claude plugin validate` (plugin and marketplace) passed on the
branch's files; installed from them in a disposable `CLAUDE_CONFIG_DIR`,
0.1.1, with `LICENSE`, `README.md`, `SKILL.md`, `engine/`, `references/`,
`scripts/`. From GitHub (`--sparse`), a fresh install gets 0.1.1.
`check-skill` ok, `npm test` 422 of 422. Not tried: `claude plugin update`
from an installed 0.1.0.

## Refreshing the plugin branch at a release

After the release commit `C` on `main` (with `version` raised), from the
repository root, without touching the working tree:

```bash
export GIT_INDEX_FILE=$(mktemp -u)
git read-tree --empty
git ls-tree -r C -- .claude-plugin README.md LICENSE skills/storyfolio | git update-index --index-info
T=$(git write-tree); unset GIT_INDEX_FILE
git update-ref refs/heads/plugin $(git commit-tree $T -p plugin -m "Storyfolio plugin <version>, from main at <C>")
git diff --stat C plugin -- .claude-plugin README.md LICENSE skills/storyfolio   # empty
git push origin plugin
```

The directory checks the tracked branch on push (webhook) or on a schedule.

## For the directory form (the author submits)

At https://claude.ai/directory/manage, **Submit new**, **Plugin bundle**:

- **Source**: repository `xitij27/storyfolio`, plugin path
  `skills/storyfolio`, branch `plugin`. Then **Validate**.
- **Listing details** come from `plugin.json` and the plugin README.
- **Data handling**, drafted for the author to confirm:
  - Reads or stores personal data: yes. It reads the material the person
    points it at (a resume, a LinkedIn export, notes) and writes the
    confirmed facts into the person's own project (`docs/story/`,
    `content/`). The plugin keeps nothing itself.
  - Sends data to services other than declared connectors: no. Installing
    the site downloads packages from npm and Chromium for playwright-core;
    no personal data goes with them.
  - Retention: the files stay in the person's project until they delete
    them.
  - Intended for people under 18: the author's answer.
- **Compliance**: a contact e-mail and the four acknowledgements, the
  author's.

Expected at validation: `engine/stitch/land.json` (1,014,188 bytes) is over
the 256 KiB file limit, a "held for a reviewer" result, not a block.
Whether the name `storyfolio` is free in the directory is only known at
validation.
