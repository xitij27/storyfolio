# Everything about this project is kept in this repository

The author's rule, first made for the portfolio this skill came out of: "I
need every context about this project within this repository."

- **Write it here and commit it,** in the same piece of work that produced
  it: what the author said and decided, what was found out, plans, and what a
  test run showed.
- **Nowhere else.** Not an assistant's memory or notes, not a temporary
  folder, not a hosted document, and not the conversation alone.
- **Where it goes.** Where things stand and what the author has said:
  `docs/handover.md`. The design: `docs/superpowers/specs/`. Plans:
  `docs/superpowers/plans/`. What agents planned in a test, and how it was
  judged: `evals/runs/`.
- **Before ending a piece of work, ask:** is there anything I know now that
  is only in the conversation, in my own notes or in a temporary file? If so,
  write it down here and commit it.

# What this is

A skill, `skills/storyfolio/`, that takes an agent from a person's profile to
a portfolio site of one kind: one long scroll that tells one story, carried
by one object in 3D. Read `docs/handover.md` before working on it.

# How the skill is changed

- **No line goes into the skill without a run that needed it.** Before an
  instruction is added, there is a run in `evals/runs/` in which an agent
  without it got that thing wrong. What an agent already does well is left
  out. `evals/README.md` says how a run is made.
- **After a change, the runs it was made for are made again.**
- **The description says when to use the skill, and nothing of how it
  works.** An agent given a summary of the steps follows the summary and does
  not read on.
- `node evals/check-skill.mjs` and `npm test` pass before a commit.

# Rules that hold throughout

- Commit on `main`. Push to `origin` only when the author says so: they did
  on 10 October 2026, and each push since needs their word again.
- The repository on GitHub is private. Making it public is the author's to
  do, and `docs/handover.md` says what has to come out of it first.
- The people in `evals/people/` are made up. No real person, employer or
  product is described in them.
- No em dashes in the skill or in these files. A comma, a colon, a full stop
  or brackets.
- A run is a conversation with an agent, and it is paid for. Do not make
  runs that a question does not need.
