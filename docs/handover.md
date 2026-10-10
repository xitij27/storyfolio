# Handover

Start here in a new session. It says what this is, what exists, what the
author has said, and what is next. Keep it current at the end of each piece
of work.

## What this is

A skill that takes an agent from a person's profile to a portfolio site of
one kind: one long scroll that tells one story, carried by one object in 3D
taken from the person's own work. The design is
`docs/superpowers/specs/2026-10-10-portfolio-skill-design.md`. It is built in
four stages, and each has a plan in `docs/superpowers/plans/`.

It came out of the author's own portfolio, which is a private repository,
`portfolio-website`, a folder beside this one. Its `docs/v3-handover.md` and
`docs/design-directions.md` are where the method was learned.

## What exists

Stage 1, the method, is being built. This file is brought up to date as its
plan is carried out: `docs/superpowers/plans/2026-10-10-storyfolio-stage-1-method.md`.

## What the author has said

On 10 October 2026, each from choices shown to them:

1. The skill carries a method and a starter engine.
2. It lives in this repository, apart from the portfolio.
3. The 3D is built in code. A model file is allowed as one chapter's extra.
4. The design, in three parts and then as written. With it three defaults,
   theirs to change: the name `storyfolio`, the MIT licence, and their
   portfolio named in the README as where the skill came from.

What they asked for, word for word, is in the portfolio's
`docs/project-notes.md`, under "A skill for making sites like this one".

How they like to work, from the portfolio's handover: they decide by seeing
and not from descriptions, they say yes in a word, they read a short summary
and not a plan, and a question from them about a design is usually a request.

## What is next

The plan of stage 1, task by task.

## Learned the hard way

- **A fresh agent is not fresh without two flags.** `claude -p` in an empty
  folder still has this machine's plugins, skills and instructions.
  `--setting-sources project` leaves those out. It does not leave out the
  connectors of the account: on 10 October a trial agent tried to write the
  person's plan into a document online. `--strict-mcp-config` leaves those
  out.
- **`--safe-mode` cannot be used for a run with the skill.** It leaves out
  every skill, one given with `--plugin-dir` too.
- **An agent told to build nothing may write its plan somewhere else:** the
  scratch folder it is given. `evals/run.mjs` keeps what was written from the
  tools the agent called, and not from what is in its folder afterwards.
- **`node --test` does not take a folder.** It takes a pattern:
  `node --test "evals/lib/*.test.mjs"`.
