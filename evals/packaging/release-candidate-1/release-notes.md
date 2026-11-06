The first release of Storyfolio: an agent skill that turns a person's profile into a portfolio site told as one long scroll in 3D.

## Install

In Claude Code, as a plugin:

```bash
claude plugin marketplace add xitij27/storyfolio --sparse .claude-plugin skills
claude plugin install storyfolio@storyfolio
```

Or copy `skills/storyfolio/` into your project's `.claude/skills/` (Claude Code) or `.agents/skills/` (Codex). The [README](https://github.com/xitij27/storyfolio#get-started) has every route.

## What is in it

- The skill: `SKILL.md`, six references, and the scaffold.
- The engine a site is made from: Next.js 16.4.5, React 19.2.4, three.js 0.180.0, with its own lockfile, tests and checks. A scaffolded site belongs to its person and no longer depends on the skill.
- Needs Node.js 22.18 or later with built-in TypeScript support.

## How it was checked

Unpacked outside the repository, this package scaffolds a site that passes its 187 tests, type check, lint, and its browser checks at desktop and phone size and without JavaScript or WebGL. Claude Code 2.1.314 and Codex 0.162.1 list the skill from their folders. The [release checklist](https://github.com/xitij27/storyfolio/blob/main/evals/packaging/release-candidate-1/findings.md) links every record.

## Limits

The person tests ran one model, and the planning stops have been tested on one made-up person since the second stop changed. See [what has been tested, and what has not](https://github.com/xitij27/storyfolio#project-status).

## Files

- `storyfolio-0.1.0.tar`: the frozen package (the marketplace file, README, LICENSE and `skills/storyfolio/`), made by `git archive` from this tag. sha256 `9e6f00bc153f814e719054f259222ff4e0a461330de56e14d1f6b8111993808d`.
- `storyfolio-0.1.0-files.sha256`: the sha256 of each of its 136 files.
