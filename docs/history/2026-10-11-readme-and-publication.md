# Publication status and illustrated README

11 October 2026. This record accompanies the README change and preserves the
earlier current-status wording superseded by the author's public-status
update. Full earlier archives remain unchanged.

## Author requests

In order, the author said:

> okay now frame a professional [README.md](README.md) describing how people can install and use this skill. Add all necessary information and license too

> Why just codex, this skillshould be able to work with claude too.

> or rather any AI agent

> okay I have made it public. Now make the readme feel more illustrative and inviting

The final statement establishes the author's reported GitHub visibility
change. Opening the public repository through the available web reader
returned a cache miss, so this work records the report rather than claiming
independent visibility verification. No renewed push instruction was given.

## What changed

- README opens with the skill's one-scroll, one-story, one-object idea and a
  local concept illustration of paper pieces changing through a story. The
  editable SVG and its rendered PNG are under `docs/assets/`. The artwork is
  expressly labeled as a concept illustration. The PNG was rendered using
  the already installed librsvg and Cairo libraries and visually inspected.
  There were no new packages or external image-generation calls.
- The concept examples come from `skills/storyfolio/references/concept.md`.
  The fictional chef and engineer are identified as fictional. The reader
  sees why the form comes from a person's work and chooses among three
  concepts developed for their own material.
- A three-step decision table, a starter conversation and the exact five
  `docs/story/` files explain the experience and its output. Planning ends at
  an approved storyboard; implementation remains future work.
- The clone step now reflects the public repository. Codex and Claude Code
  installation examples copy the complete source folder into a parent skill
  directory, avoiding an extra nested folder when the command is repeated.
  Placeholder project paths and the Bash-compatible shell requirement are
  explicit. Generic file-reading agents get a prompt with an adjustable
  skill path; file-saving requirements are distinguished from reading.
- Local installation paths and activation are supported by the fetched
  official [Codex skill documentation](https://learn.chatgpt.com/docs/build-skills)
  and [Claude Code skill documentation](https://code.claude.com/docs/en/skills).
  The Codex URL `https://developers.openai.com/codex/skills/` redirected to
  the linked current page. These sources were checked on 11 October 2026.
- The [originating portfolio](https://xitij27.vercel.app) credit follows the
  original approved naming, MIT and attribution defaults recorded in the
  earlier handover. The live portfolio itself was not re-evaluated.
- `AGENTS.md`, the current handover and documentation navigation now reflect
  the author's reported public status. This task did not audit publication,
  remove evaluation artifacts, change the skill or run paid evaluations.

## Review and verification

An independent read-only agent reviewed the prior README and then the new
README and SVG. Its useful findings were the missing output-file preview,
the stale private-status line, preserving planning scope, incomplete
cross-agent capability assumptions, placeholder paths and repeated-copy
nesting. The final review found the changes ready: concept labeling, the
five outputs, four references and installation structure match the skill.

Verification completed with Node.js `v22.22.1`:

- `node evals/check-skill.mjs`: passed, 687 words and four references.
- `node evals/check-people.mjs`: passed, 17 people/cases.
- `npm test`: passed, all 54 tests, zero failures. It ran with approved
  access outside the workspace sandbox for the documented Git subprocesses.
- `git diff --check`: passed.
- A read-only Node check resolved all 133 local links in the six changed
  Markdown documents, excluding historical code blocks, and found no em
  dashes. It also checked the SVG title/description, twenty page instances
  across four scenes and the PNG's 1200 by 520 dimensions.
- `python3 docs/history/verify-documentation-migration.py`: passed, all five
  verbatim archives and the one extraction, with no errors.
- The seven earlier text snippets below match the corresponding source
  files at `d39e6d2` verbatim. Node's Git subprocess initially returned
  `EPERM` inside the sandbox; the approved retry passed.

These are local documentation and repository checks. No model evaluation
or website build was started. The work is committed locally on `main`.

## Earlier publication guidance

The following sections preserve the superseded wording verbatim from the
working tree at `d39e6d2`.

### Repository rule

```text
- The repository on GitHub is private. Making it public is the author's to
  do, and `docs/handover.md` says what has to come out of it first.
```

### Current handover publication section

```text
## Before publication

The GitHub repository is private. Making it public is the author's decision.
The existing publication note requires removing raw turn streams before a
public release and reviewing machine paths, account usage and personal
project context. Later nested judge streams, privacy-probe records and
source-file symlinks also need that review; the original glob is incomplete.
Archives now contain copies of those contextual notes and need the same
review. [Full original publication record](history/2026-10-10-handover.md#what-this-is).
No removal or publication is part of this documentation work.
```

### Current handover source-review note

```text
This real person's source and assets need review before any
public release of Storyfolio, alongside the existing publication checklist.
```

### Earlier README private-status line

```text
Storyfolio is currently in a private repository. You need access to clone it.
```

### Earlier README implementation summary in the handover

```text
The root [README](../README.md) now provides public-facing installation and
usage guidance for the planning-only skill. It presents Storyfolio as a
portable instruction directory for any agent that supports local skills or
can read attached files, with concrete Codex and Claude Code paths and a
prompt-based fallback for other capable agents. It also records the three
approval points, privacy boundaries, contribution checks and the current
private-repository status. [LICENSE](../LICENSE) adds the MIT license selected
in the original design record; `package.json` declares the same SPDX
identifier. This documentation change did not alter the skill or run a paid
evaluation.
```

### Earlier author-decision row

```text
| 11 October: "frame a professional README.md describing how people can install and use this skill. Add all necessary information and license too" | Root README now documents the supported local installation, activation, scope, usage, safeguards and contributor checks. MIT licensing is in `LICENSE` and package metadata. The repository is still private, so access is required to clone it. |
```

### Earlier archive closing line

```text
Archives remain subject to the private repository's pre-publication review.
```
