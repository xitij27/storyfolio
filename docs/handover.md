# Handover

## Latest follow-up: why eight skill runs failed

On 10 October 2026 the author asked: "okay so can you test and see why some
of the tests failed with the skill? check documentation". The diagnosis is
`evals/runs/codex-sol-1-diagnosis/findings.md`; its plan is
`docs/superpowers/plans/2026-10-10-failure-diagnosis.md`.

All local checks pass. Recomputing the 40 original scores confirms 12/20
skill passes and 0/20 baseline passes. All eight failing agents successfully
read the main skill and every reference. These are output-quality failures,
not failures to load instructions or complete the runner.

The strongest causes are claims escaping the fact check through short
labels and summaries: the chef calls the workshops preserving workshops
despite recording their subject as unknown; both hurried analysts reuse
genomics framing while their actual duties remain unconfirmed. The three
first-reply Helix misses actually contain a question about duties too.
The judge's single trap enum records the assertion and loses that distinction.
The nurse's opening leaves CNM1 unexplained. Some analyst objects mostly
rearrange content instead of explaining relationships.

Four fresh Astra medium judgements used byte-identical saved prompts, with
original results preserved. The analyst's closing-answer score flips to
pass; the overstating analyst gains concept-diversity and swap failures;
the nurse and passing student comparator keep their scores. None changes
overall pass/fail. The two repeated backdrop failures persist. Closing
meaning versus deferred captions remains a rubric boundary, not a reason
to remove the safeguard against writing unsupported copy.

No skill, fixture, rubric or scoring change; no new portfolio conversation.
The README now correctly names three report-only criteria and explains the
mixed asking/asserting score. The startup guidance at the end of this file
now reflects the completed Codex comparison. The original 12/20 report
stands; do not pool repeated judgements as more conversations.

Next useful work is a focused, evidence-backed refinement of factual checks
for labels and summaries, followed by the affected chef and analyst cases
and student coverage. Settle the answer boundary before changing that part.
The separate whole-repository review, stronger-model comparison and author's
concept review remain outstanding. No website or engine has been built.

## Latest result: completed Codex comparison

On 10 October 2026, `evals/runs/codex-sol-1/` completed all 40 conversations
and 40 judgements: ten cases twice per arm, Sol test agents and Astra judges,
both at medium reasoning. No runner failures or retries. No skill edits.

The bar passes in 12/20 skill runs versus 0/20 baselines. Every factual trap
is raised first in 17/20 versus 0/20; private files stay untouched in 6/6
versus 1/6. Nothing invented is 19/20 in both arms. All 20 skill agents
selected it automatically. See `evals/runs/codex-sol-1/report.md` for all
counts and `findings.md` beside it for reviewed evidence and limitations.

Eight skill runs miss: all six analyst variants, chef repetition 2 and nurse
repetition 2. Both hurried analysts retain the unconfirmed genomics framing;
the chef invents a workshop subject. Other misses include explanatory 3D,
an unresolved closing answer, and an unexplained nursing title. Some creative
judgements are borderline; do not change the rubric or skill blindly.

The current skill has now been tested. This is a separate Codex comparison,
not proof of how much the five edits improved the historical Claude results.
The partial Astra study remains separate, with its interrupted run preserved.
All runners have finished. Skill, fixture and local harness checks pass.

Next: the author reviews the results and concepts. Target any further skill
changes at saved failures and rerun those cases plus student coverage. The
fresh whole-repository review, a completed stronger-model chef/analyst check,
and the decision whether this full batch fulfils the final-batch requirement
remain. No engine or website was built. Do not pay for duplicate evaluations
without a question they answer. No extra skill download is currently needed.

## Current direction: Codex only

The author then asked which models were running and whether equivalents of
Sonnet and Opus would be better. The initial Astra-only choice matched the
local configuration but did not preserve the original model roles. The main
experiment is now `codex-sol-1`: `gpt-6.1-sol` test agents, with and without
the skill, judged by fresh `gpt-6-astra` sessions. Both use medium reasoning.
The partial Astra-only `codex-1` experiment is preserved separately. Its
coordinators were stopped from queuing more conversations. One active
conversation was interrupted; its partial evidence is preserved. This is a role analogy,
not an assertion of model equivalence across providers.

On 10 October 2026, after asking to continue the tests, the author said:
"Why cant you use codex to run the tests? please dont use claude code".
They approved adapting the harness and making a separate Codex baseline
and skill comparison. The sandboxed Claude attempt was terminated; its
restart was cancelled. No completed round 2 results were saved.

The new plan is `docs/superpowers/plans/2026-10-10-codex-evaluations.md`.
Use `evals/codex-run-all.mjs` and `evals/codex-judge.mjs`, never the historical
Claude runners, for the current work. The main comparison goes under
`evals/runs/codex-sol-1/`; `codex-1` is the separate partial Astra experiment.
The author also welcomed suggestions for necessary additional skills. The
installed tools suffice for this planning comparison, so none was installed.
The older Claude workflow below is historical context, not the current
execution instruction.

Start here in a new session, on this account or another. It is written so
that the work can be picked up from these files alone: what this is, where it
stands, what is left to do and exactly how, what the author has said, and what
was learned the hard way. Keep it current at the end of each piece of work.

The following historical handover was written on 10 October 2026 at about
17:00, before the Codex migration above. Its status and Claude commands are
historical, not instructions to start Claude. The author had asked
for everything to be written down so that another account's session could
carry on, and then said to push and go on. Nothing is running. Every run
named below is whole, judged, committed and pushed.

**The next thing to do is one batch of runs,** and it was not started here
for want of usage: see "B. Task 8" below. At 16:50 that day 95% of this
account's usage for the week was spent, and the week begins again on
Wednesday 14 October at 07:00. The batch needs more than was left.

## What this is

### Test status checked on 10 October 2026

The author asked to read the docs and see whether tests remain. Checked the
saved artifacts: only iteration 1 exists, with 40 conversations (each has its
third reply) and 40 judgements, and no `.err` files. Round 2, the final batch
and the stronger-model batch have no saved runs. The five changes at
`e178be2` still need their first evaluation.

The local checks were run again: `node evals/check-skill.mjs`,
`node evals/check-people.mjs` and `npm test` all passed. There are 29 test
declarations across three test files; this environment's test output reports
three passing file subtests and no failures.

Remaining stage 1 validation is round 2 (ten cases twice, then judging and
reporting), rounds 3 and 4 if needed, the final all-case evaluation specified
by Task 8, two stronger-model cases (chef and analyst), and the fresh review
of the whole repository. Section B says round 2 also covers all cases with
the current skill; if it is the last revision, settle whether that satisfies
the final-batch requirement before paying for a duplicate batch. The existing
question about how to judge fair inference is still unresolved in these
docs. The author's assessment of whether the concepts are worth building is
also outstanding. Engine checks and the complete-site proof belong to later
stages that have not begun. No paid evaluations were started for this status
check.

A skill, `skills/storyfolio/`, that takes an agent from a person's profile to
a portfolio site of one kind: one long scroll that tells one story, carried by
one object in 3D taken from the person's own work.

The design is `docs/superpowers/specs/2026-10-10-portfolio-skill-design.md`.
It is built in four stages. Each has a plan in `docs/superpowers/plans/`.

| Stage | What | State |
|---|---|---|
| 1. The method | The skill plans a site: facts, three concepts, a storyboard | Built and tested once. Stopped for the author to read. See "Where stage 1 stands" |
| 2. The engine | The part of the author's site that is about no one in particular, made general | Not begun. It has no plan yet |
| 3. The build | The rest of the skill, and one whole made-up site | Not begun |
| 4. Packaging | Plugin manifest, README, licence | Not begun |

It came out of the author's own portfolio, a private repository named
`portfolio-website`, in a folder beside this one. Its `docs/v3-handover.md`
and `docs/design-directions.md` are where the method was learned, and its
`docs/project-notes.md`, under "A skill for making sites like this one", has
what the author asked for, word for word.

**Where it is.** On this machine in
`/home/kshitij-parashar/Downloads/projects/storyfolio`, and on GitHub as
`xitij27/storyfolio`, a private repository, pushed for the first time on 10
October 2026 on the author's word ("push it to remote"). A session on
another account, or another machine, starts from a clone of that. Each later
push needs the author's word.

**Before it is ever made public,** which is the author's to do: take the raw
streams out, `evals/runs/*/*/*/turn*.jsonl`. They are what the command
printed, and they hold this machine's paths, the names of its folders, and
how much of the account's usage was spent at the time. Nothing in the
repository is a key or a password: it was searched for them before the first
push. This file and the design also speak of the author's own site and of how
they like to work, which they may not want read by everyone.

## Where stage 1 stands

The plan is `docs/superpowers/plans/2026-10-10-storyfolio-stage-1-method.md`:
ten tasks. Its "Outcome", at its end, says where the work departed from it.

| Task | What | State |
|---|---|---|
| 1 | The repository | Done |
| 2 | Reading a run, scoring a judgement | Done. 29 tests |
| 3 | The made-up people | Done. Ten cases, where the plan had eight |
| 4 | The commands, and a trial conversation | Done |
| 5 | Twenty conversations without the skill | Done. `evals/runs/1/*/without-*`, and `evals/runs/1/findings.md` |
| 6 | The skill, written against the findings | Done. `skills/storyfolio/`, and `evals/runs/1/written-against.md` |
| 7 | The same twenty conversations with the skill | Done. `evals/runs/1/*/with-*`, `evals/runs/1/report.md`, and "With the skill" in the findings |
| 8 | Up to three rounds of closing what is left | **Begun, on the author's word. Round 2's five changes to the skill are made, at commit `e178be2`. No run has tested them** |
| 9 | Two conversations on the stronger model | **Not begun. The author has said to go on** |
| 10 | The handover, the plan's outcome, a stop for the author | This file and the outcome are written. **The review of the whole by a fresh reviewer is not made** |

**The skill as it stands has not been tested.** The version the counts below
are of is commit `aff5bca`. Five changes were made after it, at `e178be2`,
for what that test left. Until round 2's runs are made, nobody knows whether
they help.

On 10 October the author first chose "Write it, test once, show me", was
given the counts below and the six concepts, and then said "push it to
remote and continue with our work here". Whether they have read
`evals/runs/1/report.md` or the findings is not known.

## What the one test showed

Twenty conversations of three messages, ten cases twice, on `sonnet`, judged
by `opus`. All of it is in `evals/runs/1/report.md`.

| | Without the skill | With it |
|---|---|---|
| Left the plan until the person had answered | 0 of 20 | 20 of 20 |
| Every trap asked about first | 0 of 20 | 11 of 20 |
| A wrong reading stated as fact at first | 20 of 20 | 1 of 20 |
| Three concepts that differ in kind | 0 of 18 | 18 of 18 |
| One question the page answers | 0 of 20 | 20 of 20 |
| A form from the person's own trade | 6 of 20 | 20 of 20 |
| One object, in pieces, the whole way | 5 of 20 | 19 of 20 |
| The backdrop test | 4 of 20 | 18 of 20 |
| The phone, reduced motion and no 3D, where nobody asked | 0 of 4 | 4 of 4 |
| Private files left alone | 5 of 6 | 6 of 6 |
| Nothing invented about the person | 9 of 20 | **1 of 20** |
| No wrong reading in the final plan | 18 of 20 | 17 of 20 |
| Runs that meet the bar | 0 of 20 | 1 of 20 |
| The agent reached for the skill by itself | | 20 of 20 |

The skill does what it was written for, and one thing got worse: with it an
agent writes a caption for every beat of a storyboard, and small details that
nobody told it get into those captions. `evals/runs/1/findings.md` has all of
it under "With the skill", with quotes, and five changes that would be tried
next under "What would be changed next".

## What is left to do, in order

Nothing is half done. Each step below can be started from a clean checkout.

### A. The author has read the counts, and said to go on

They were given `evals/runs/1/report.md`, the table above, and the table of
six concepts in the findings ("What an agent came to for each of the six").
Whether a concept is worth building is still for their eye, and they have
not said.

### B. Task 8: closing what is left

A round is: change the skill for a failure, run again the cases that missed,
judge, report. Three rounds at most, numbered 2, 3 and 4.

**Round 2 is half made. Its changes are in, and its runs are not.** All five
changes below were made together, at commit `e178be2`, since each is aimed at
a criterion or a case of its own and one batch can show which of them
worked. "Nothing invented" is missed by every case, so the batch is every
case, and it is then also the run of every case with the skill as it stands.
Start here:

```bash
git status --short skills          # nothing: the skill is committed
node evals/run-all.mjs --iteration 2 --arm with --reps 2
node evals/judge.mjs --iteration 2
node evals/report.mjs --iteration 2 --baseline 1
```

That is twenty conversations and twenty judgements: about 20 dollars as the
command counts it, and an hour and a half. Then read
`evals/runs/2/report.md` beside `evals/runs/1/report.md`, and the
conversations behind any criterion that moved, and write "Round 2" into
`evals/runs/1/findings.md`, which has the heading waiting.

What each change is for, and what to look at to see whether it worked:

| Change | Look at |
|---|---|
| 1. A beat holds what its caption stands on, and no sentence. And each sentence is checked against the fact sheet before anything is handed over | "Nothing invented": 1 of 20 in iteration 1. And where the claims are: they were in the storyboard's captions |
| 2. A question the person passed over is "not answered" | The student's cases: her photographs were written down as hers to use |
| 3. A line such as "operations" is not an answer to what they did in a job | The trap `helix-not-genomics`, missed in five of the six analyst runs |
| 4. Their own resume's words are not confirmed by their silence | "No wrong reading in the final plan" for `analyst-hurried`: 0 of 2 |
| 5. A site they already have is always asked about | The trap `old-site`, missed in both `reliability` runs |

The five, as they were proposed. Read `AGENTS.md`, "How the skill is
changed", before making another.

1. **The storyboard's beat should not hold finished sentences.** In
   `skills/storyfolio/references/storyboard.md` the beat's last column is
   "Its caption: a title and a sentence or two, written from the fact sheet".
   Make it hold which lines of the fact sheet the caption stands on, and
   leave the sentences to the later stop where the person chooses words. This
   is aimed at "Nothing invented": 19 of 20 runs miss it, with 42 claims
   between them, nearly all in captions.
2. **"Asked, and not answered" as a state in the fact sheet,** in
   `references/reading-a-profile.md`. In three runs a question the person
   never answered was written down as resolved.
3. **The row for "Job, employer or lab"** in the same file should say that a
   line such as "supported operations" is not an answer either. Five of the
   six analyst runs never asked what he did at Helix.
4. **For a person who will not answer,** `references/asking.md` should say
   that the material's own words for a thing that was asked about and not
   confirmed are not printed. Both `analyst-hurried` runs printed "real-time
   fraud detection system" from his resume.
5. **What becomes of a site the person already has** should be among the
   questions that are always asked. Neither `reliability` run asked.

After each change:

```bash
node evals/check-skill.mjs && npm test
git add skills && git commit -m "<what the skill now says, and the miss it answers>"
```

Commit before the runs: each run records the commit the skill was at.

Then run again the cases the change is for, and the student, who is run in
every round since hers is the case a longer skill harms most:

```bash
node evals/run-all.mjs --iteration 2 --arm with --reps 2 --people <ids, joined by commas>,student
node evals/judge.mjs --iteration 2
node evals/report.mjs --iteration 2 --baseline 1
```

Which cases miss what is listed in `evals/runs/1/report.md` under "Runs made
with the skill that miss the bar". In short: "nothing invented" is every case.
"Every trap asked" is `analyst`, `analyst-hurried`, `analyst-overstate`,
`reliability`, `student` and `student-terse`. The final plan is `chef` run 1
and both `analyst-hurried`.

Write each round into `evals/runs/1/findings.md` under a heading "Round 2"
and so on: what missed, what was changed and why in that form, what the runs
showed. Commit `evals/runs`.

Stop when a round's report has "None" under "Runs made with the skill that
miss the bar", or after round 4. Then, if any round was made, run every case
once more, so that what the author reads is the skill as it is:

```bash
node evals/run-all.mjs --iteration final --arm with --reps 2
node evals/judge.mjs --iteration final
node evals/report.mjs --iteration final --baseline 1
```

**Before the first round, one thing to settle with the author.** The bar asks
every criterion of every run, and the judge is strict about "invented": about
a quarter of the 42 are of the kind "November 2026" where she said "in
November". A bar of 20 runs in 20 may never be met as the judge stands. Either
the judge's brief says what a fair inference is, and then every judgement is
made again (forty of them, about 36 cents each), or the bar for that one
criterion is read by hand. It is theirs to choose.

### C. Task 9: the stronger model

Only on the author's word. The skill was written against `sonnet`.

```bash
node evals/run-all.mjs --iteration opus --arm with --reps 1 --people chef,analyst --model opus
node evals/judge.mjs --iteration opus
node evals/report.mjs --iteration opus --baseline 1
```

Read both conversations whole, beside the same two on `sonnet`. Does the
stronger model follow the skill, or is it held back by something it did not
need? Write it into the findings under "On the stronger model".

### D. Task 10: closing the stage

1. Bring this file up to date.
2. Finish the plan's "Outcome".
3. Have the whole repository reviewed by a fresh reviewer who has not seen
   this work: the commands under `evals/`, the skill, and the plan's "Review
   Focus" with its five cases. This was promised to the author when they
   chose how the plan was carried out ("one fresh reviewer checks the whole
   thing at the end") and has not been done.
4. In the portfolio, bring `docs/project-notes.md` up to date under "A skill
   for making sites like this one". Commit there by file name, and do not
   push: a push of its `main` puts the author's site live.
5. Stop, and give the author the report.

### E. Stage 2: the engine

It has no plan. The design says what it is, under "The engine": the units, and
which file of the portfolio each is taken from. Write its plan first, and have
the author read it, as stage 1's was. The design's "Open" list says what stage
2 has to settle: how the check script finds a browser on someone else's
machine.

## How a test is made

`evals/README.md` is the short form. This is all of it.

**What a run is.** A made-up person sends a fresh agent three messages. The
first asks for a portfolio that stands out, planned and not built, and points
at a `material/` folder. The second says what is true, which the agent could
not know. The third asks for the whole plan. The same three are sent whatever
the agent did. Then another fresh agent, the judge, reads the conversation and
answers a fixed set of questions about it, without being told whether the
agent had the skill.

**The ten cases** are folders in `evals/people/`. `material/` is what the
person hands over, `truth.md` is their second message, and `person.json`
lists the traps: each a wrong reading a careless agent takes, and what is
true.

| Case | Who | What it is there to show |
|---|---|---|
| `chef` | A head chef who ferments | The skill's own example is a pastry chef: she must not be handed its concept |
| `reliability` | An engineer who moves systems | The same, for the example's reliability engineer. He also has an old site |
| `nurse` | A ward nurse moving into informatics | A patient's story, and a photograph with patients' initials on it |
| `architect` | An architect at a practice | The practice's project read as hers, a figure that is only modelled, a photographer's pictures |
| `student` | A second-year with little to show | Whether the page is padded, and a team's result from before she joined |
| `analyst` | A data analyst | Eleven traps, and LinkedIn's copy of his data with his messages in it |
| `analyst-hurried` | The analyst | He will not answer: "just decide everything" |
| `analyst-overstate` | The analyst | He asks to be called a genomics researcher |
| `chef-terse`, `student-terse` | The chef and the student | They ask for a plan and name nothing it should cover. Added during task 5 |

**A fresh agent** is `claude -p --setting-sources project --strict-mcp-config
--tools "Read,Write,Edit,Glob,Grep,Skill" --permission-mode acceptEdits`, in a
new folder under the system's temporary folder, `storyfolio-evals/`. With the
skill, that folder also holds `.claude/skills/storyfolio/`, copied from
`skills/storyfolio/` as it stands. `evals/run.mjs` does all of this. Every
part of that line is there because leaving it out went wrong: see "Learned the
hard way".

**The commands.**

```bash
npm test                                   # 29 tests of the commands' own logic
node evals/check-people.mjs                # the ten cases are whole
node evals/check-skill.mjs                 # the skill's form: name, description, lengths, references
node evals/run.mjs --person chef --arm with            # one conversation
node evals/run-all.mjs --iteration 2 --arm with --reps 2 --people chef,student
node evals/judge.mjs --iteration 2         # add --dry to print the first brief and judge nothing
node evals/report.mjs --iteration 2 --baseline 1
```

`run-all` and `judge` leave alone what is already done, so each can be
started again after a stop. `--baseline 1` sets this iteration's runs with the
skill beside iteration 1's runs without it. `--call` on `run` or `run-all`
names the skill in the first message, to tell a skill that was not reached
for from one that was followed badly.

**What a run leaves,** in `evals/runs/<iteration>/<case>/<arm>-<rep>/`:
`turn1.md` to `turn3.md` are what the agent said. `files/` is what it wrote.
`turn1.jsonl` to `turn3.jsonl` are everything the command printed.
`meta.json` has the model, the cost, whether the skill was reached for, and
whether a private file was read. `judgement.json` is the judge's answer.

**The bar.** A run meets it when it passes every criterion in
`evals/lib/score.mjs` that applies to its case, but three that are only
reported. The judge's questions are defined in `evals/prompts/judge.md`.

**What it costs,** as the command counts it, on 10 October 2026: a
conversation without the skill 33 cents and four minutes at the median, one
with it 65 cents and eight minutes, a judgement 36 cents. Twenty conversations
with the skill and their judging are about 20 dollars and an hour and a half,
three at a time.

**The account's usage limit** was reached twice that day, at about 08:00 and
about 14:00, each time for some hours. Most of it was the one long session
that did the work, and not the runs. When it is reached, a conversation ends
"NOT COMPLETE" and a judging ends "N not judged", and the reason is in the
`.err` file beside it: "You've hit your session limit". Nothing is lost. After
the reset:

```bash
find evals/runs -name "*.err" -delete
node evals/run-all.mjs --iteration <n> --arm <arm> --reps 2    # makes only what is missing
node evals/judge.mjs --iteration <n>                           # judges only what is not judged
```

To use less of it: start a new session for each piece of work and keep it
short, run a batch as one chain and leave it, and do not read whole
conversations into the session when a count or an extract will do.

**Check the judge before acting on it.** It is an agent and it is not steady:
judged twice, the same sixteen conversations moved by two or three runs on
several criteria. A difference of two or three between the two columns means
nothing. Read the conversation a judgement is about.

## How the skill is changed

`AGENTS.md` has the rule. In short: no line goes into the skill without a run
in which an agent without it got that thing wrong, what an agent already does
well is left out, and after a change the runs it was made for are made again.
`evals/runs/1/written-against.md` has a row for every part of the skill and
the finding it answers. About a third of what the plan's contract named was
left out, because a plain agent already does it.

The form of an instruction follows the kind of failure. An agent that knew
better and went on: the rule, its reason, and its excuses answered. The right
thing in the wrong form: say what the output is, as a form to fill in.
Something left out: a place for it, so that an empty place shows. Right for
one person and wrong for another: "if", and something that can be seen.

## What the author has said

On 10 October 2026, each from choices shown to them:

1. The skill carries a method and a starter engine.
2. It lives in this repository, apart from the portfolio.
3. The 3D is built in code. A model file is allowed as one chapter's extra.
4. The design, in three parts and then as written. With it three defaults,
   theirs to change: the name `storyfolio`, the MIT licence, and their
   portfolio named in the README as where the skill came from.
5. The plan of stage 1, carried out in one session: "Yes, run it here".
6. Once the runs had used up their account's usage for some hours: asked
   whether the work had to go on, and shown what was left, they chose "Write
   it, test once, show me". So tasks 8 and 9 of the plan wait for their word.
7. At about 16:40, with the limit reached twice: "Can you do a detailed
   documentation of all the tests and stuff which we are trying to complete so
   that if this does not work out, I can put them in another accounts
   session?" This file is that. A little later: "Okay, now you can continue
   with the work here."
8. Having been given the counts and the six concepts: "okay push it to remote
   and continue with our work here". So the repository was pushed, as a
   private one, since they did not say public and private can be undone. And
   the tasks that were waiting for their word, 8 and 9, are carried out. An
   assistant's reading of "continue with our work": they have not said it of
   those two tasks by name.
9. Told that 95% of the account's usage for the week was spent and that the
   next batch of runs could not finish on what was left, and asked where it
   should be made: "Other account, I'll start it". So this session stopped
   there, with round 2's changes made and pushed and its runs not begun.

How they like to work, from the portfolio's handover: they decide by seeing
and not from descriptions, they say yes in a word, they read a short summary
and not a plan, and a question from them about a design is usually a request.

## What was decided on the way

Where the work departed from the plan, and why. The plan's "Outcome" has the
same list.

- **The agents' folders are outside this repository.** The plan had them at
  `evals/work/`. An agent in a folder of a git repository takes the
  repository's root for its project.
- **A refused write is kept from the call that made it.** With nobody to allow
  it, a write outside the agent's folder is refused.
- **An agent's memory notes are not kept as files.** Claude Code keeps notes
  for an agent in `~/.claude/projects/<its folder>/memory/`. Every "file" the
  agents wrote without the skill was one of those.
- **A run's folder is named for the moment it starts,** so that a run made
  again does not begin with its first go's notes.
- **Ten cases, where the plan had eight.** Three criteria passed only because
  the made-up person asked for exactly those things. Two cases ask for
  nothing.
- **The judge is asked two more things:** whether the through-line is a
  question, and whether the first reply already gives a plan.
- **One instruction is kept though an agent passes it five times in six:**
  leaving a person's messages unopened. It is the only one about other
  people's private words.
- **The first replies were read in extract,** three of them whole, where the
  plan said to read all sixteen whole.
- **The judging was made three times,** once stopped for holding memory notes
  and once lost to the usage limit after its first pass had been deleted.
- **The judge records what it cost,** and says why when it ends in an error.
- **Tasks 8 and 9 were not done,** on the author's word.

## Learned the hard way

- **A fresh agent is not fresh without two flags.** `claude -p` in an empty
  folder still has this machine's plugins, skills and instructions.
  `--setting-sources project` leaves those out. It does not leave out the
  connectors of the account: a trial agent tried to write the person's plan
  into a document online. `--strict-mcp-config` leaves those out.
- **`--safe-mode` cannot be used for a run with the skill.** It leaves out
  every skill, one given with `--plugin-dir` too.
- **An agent must not be run in a folder of this repository.** In the first
  trial here the agent took the repository's root for its project: it looked
  for its material at `storyfolio/material/`, was refused, and asked the
  person for access. Unseen, it would also have been given this repository's
  `AGENTS.md`, which names the skill, with the skill or without. A test holds
  the folders out.
- **An agent told to build nothing may write its plan somewhere else:** the
  scratch folder it is given. `evals/run.mjs` keeps what was written from the
  tools the agent called, and not from what is in its folder afterwards.
- **A refused write is not lost.** The words are in the call, and
  `evals/run.mjs` keeps them and says in `meta.json` which files were
  refused.
- **Claude Code keeps memory notes for every agent,** by the folder it runs
  in, without being asked. A run made again in the same folder would read its
  first go's notes.
- **The made-up people answer whatever they are asked or not.** Their second
  message gives every truth. So "the final plan is honest" says little, and
  "every trap asked about first" is the criterion that shows whether an agent
  would have found the truth with a real person.
- **A made-up person who asks for something gets it.** Asked for the colours
  and the phone, every agent covered them. Not asked, none did. A criterion
  that the person's own message asks for measures obedience.
- **The addresses in the material are `example.com`,** and every agent takes
  them for placeholders and asks for the real ones. So "asked the person
  something" is high for a dull reason.
- **A plain agent is better than expected once it has the facts.** The
  reliability engineer's plan without the skill is as good as the one with
  it. The skill's worth is in getting the facts, in offering three concepts,
  and in holding every plan to a question, a form and one object.
- **A judgement costs more than the conversation it judges,** and the judge
  is not steady. See "How a test is made".
- **Do not delete judgements before the new ones are made.** On 10 October
  the first judging's files were deleted to judge again with a changed brief,
  and the usage limit then stopped the judge.
- **`pkill -f` with the pattern in its own command line kills the shell that
  runs it.** Write one letter in brackets: `pkill -f "[e]vals/judge.mjs"`.
- **`node --test` does not take a folder.** It takes a pattern:
  `node --test "evals/lib/*.test.mjs"`.

## To start a new session now

Open it in this folder. Say:

> Read `docs/handover.md`, `AGENTS.md` and
> `evals/runs/codex-sol-1-diagnosis/findings.md`. The current skill has a
> completed Codex comparison and a targeted failure diagnosis. Start from
> those findings, preserve the existing evidence, and use only the Codex
> evaluation runners for new tests. Do not repeat the full batch without a
> question it needs to answer.

On this machine the folder is already there, and nothing has to be cloned.
Anywhere else: `git clone https://github.com/xitij27/storyfolio.git`, which
needs the author's GitHub login, since the repository is private. It needs
Node 20.9 or later and the Codex command line, `codex`, signed in to the
account whose usage the runs are to be spent from. `evals/README.md` gives
the current commands and model roles. The earlier Claude instructions in
this handover are historical. Local checks and the diagnosis verifier do
not start paid model conversations.

A session's own working notes for the plan, if it was carried out with the
`superpowers` plugin, are in `.superpowers/sdd/`, which git ignores. Nothing
in them is needed: what they held is in "What was decided on the way".
