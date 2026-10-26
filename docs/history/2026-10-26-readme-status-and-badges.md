# README status and badges, 26 October 2026

The author wrote, verbatim:

> add information about the completion status and the necessary badges in the README file. So that it looks like a professional repository.

## What changed

- **Badges** under the title: status (stage 3 of 4 in progress), the
  `library-pages.yml` workflow, licence, Node.js 22.18 or later (from
  `package.json`), agent skill for Claude Code and Codex, and last commit.
  Each points at something that exists: the workflow's last run had
  succeeded, and both Pages addresses answered 200 when checked.
- **No test badge.** No workflow runs `npm test` or `check-skill` on GitHub,
  so a "tests passing" badge would claim what nothing checks. Adding one
  needs a CI workflow, which the author has not asked for.
- **A "Project status" section** replaces the paragraph that called the
  shipped skill planning-only. That had gone out of date: `SKILL.md` now runs
  all six stops for a requested build. The table follows the stage framing
  of the [12 October checkpoint](2026-10-12-stage-status-clarification.md)
  and the current [handover](../handover.md): stage 1 implemented and
  evaluated, stage 2 complete, stage 3 in progress (two person tests built
  whole sites; author review next; transitions are the current focus),
  stage 4 after stage 3.

Left as they were, though written for the planning-only skill: "How it
works" (three decisions), "What you leave with" (an approved storyboard),
and "Any other agent" (says four reference files; `references/` now holds
six).

Documentation only; no skill, engine or evaluation change, and no run.
