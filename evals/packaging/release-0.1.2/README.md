# Release 0.1.2: a privacy policy

Made 7 November 2026. The portal's validation of the `plugin` branch
warned, as the author reported: "No privacy policy URL found. Add
privacyPolicyUrl to plugin.json, or a “Privacy” link to your README. This
is a warning, not a blocker." No model was started.

## What changed

| | |
|---|---|
| `skills/storyfolio/PRIVACY.md` | New: the skill collects nothing; what it reads, where data goes (the person's project), what installing downloads, Next.js telemetry outside the checks (on by default for `npm run dev` and `npm run build`; the checks turn it off), the gallery on GitHub Pages, keeping and deleting |
| `plugin.json` | `privacyPolicyUrl` (accepted by `claude plugin validate`), `version` 0.1.2 |
| Plugin README | A "Privacy" link, and the install line `claude plugin validate` advised (`/plugin install storyfolio --marketplace xitij27/storyfolio`) |
| Release commit | `60dd1e6f59145c2404658e4f4bca3e459e0da21e` |
| Archive | `storyfolio-0.1.2.tar`, 138 files, sha256 `1ea27beff6691546ec0c1b1b7c4f8857783e8cdc54e0c2b1c028699b2c3ca15f`, made twice with equal hashes; [manifest-sha256.txt](manifest-sha256.txt). Against 0.1.1: `plugin.json`, the plugin README and the new `PRIVACY.md` |
| `plugin` branch | `bbc7f993`, parent `ff5fa81e`, equal to the release's files |

Checks: `claude plugin validate` nothing to report, `check-skill` ok,
`npm test` 422 of 422. The engine is unchanged from 0.1.0.

## Publishing

The first attempt was refused by the session's permission check as a
public action without the author's word on 0.1.2. On their "yes publish":
`main` and `plugin` pushed (`plugin` at `bbc7f993` on GitHub), tag
`v0.1.2` on `60dd1e6f`, and the GitHub release
https://github.com/xitij27/storyfolio/releases/tag/v0.1.2. The privacy URL
answers 200, and the downloaded archive hashes to `1ea27bef...a15f`.

## The directory refuses it (7 November)

The portal's check of 0.1.2, shared by the author: "Validation has
warnings · Directory policy failed". Needs you: **Files outside the allowed
types accepted only from Verified organizations**: "The directory accepts
scripts, programs, and files outside the allowed types only from Verified
organizations, and your organization isn't one, so this version is
refused. Remove each file that, whatever its name, isn't Markdown, text,
JSON, YAML, or a PNG, JPEG, GIF, WebP, or ICO image, each that starts with
`#!`, and each package manager configuration file". The privacy warning is
gone; the `land.json` and credential findings remain as warnings.

On 0.1.1 the same rule was a note ("This isn't refused yet"); by 0.1.2 it
refused. The plugin's files by type: 75 `.ts`, 23 `.tsx`, 11 `.mjs`, 3 `.css`,
1 `.svg` (113 code files, refused) against 12 `.md`, 6 `.json`, 1 `.png`,
`LICENSE` and `.gitignore`. The code is the engine and its scaffold, which
the skill copies into the person's project: it cannot leave the plugin
without the skill fetching it from elsewhere.

**The author's decision:** skip the directory. Storyfolio is distributed
through its own marketplace (`xitij27/storyfolio`, `--sparse`) and the
README's folder copies, which work and are tested. Revisit if the rule
changes or the publisher becomes Verified. Options not taken: asking
Anthropic about Verified status, and an instructions-only plugin that
downloads the engine from the pinned release (a change to the skill's
instructions, a second variant, and paid runs to prove it).

The `plugin` branch stays: it costs nothing and is ready if the directory
becomes possible.

## Installing from the plugin branch (7 November)

Asked whether to make `plugin` the default branch and rename `main`, root
advised against it (the front page's README would lose its pictures and
links, the Pages workflow runs on `main`, clones would get the release
output, and the repository's rules name `main`) and tested the alternative:
in a disposable `CLAUDE_CONFIG_DIR`, `claude plugin marketplace add
"xitij27/storyfolio#plugin"` took 2 s and 2.8 MB, checked out `plugin`, and
`claude plugin install storyfolio@storyfolio` installed 0.1.2. On the
author's "yes", the README's Claude Code install uses it, with the
`--sparse` line from `main` kept as an alternative.
