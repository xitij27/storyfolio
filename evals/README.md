# The runs

## Codex runs, current workflow

On 10 October 2026 the author asked to use Codex and not Claude Code. Use
these commands for new runs. The Claude commands below document iteration 1
only. The skill is unchanged. The main `codex-sol-1` comparison runs ten
people twice in each arm on `gpt-6.1-sol`, medium reasoning, followed by
independent `gpt-6-astra` judging at medium reasoning with the same rubric.
An earlier partial Astra-only experiment remains in `codex-1`. Do not mix
its results with the Sol comparison. The author questioned using the same
flagship model for both roles, so the main experiment now matches the
original workhorse-agent / stronger-judge design.

```bash
node evals/codex-run-all.mjs --iteration codex-sol-1 --arm without --reps 2 --people analyst,analyst-hurried,analyst-overstate,architect,chef,chef-terse,nurse,reliability,student,student-terse
node evals/codex-run-all.mjs --iteration codex-sol-1 --arm with --reps 2 --people analyst,analyst-hurried,analyst-overstate,architect,chef,chef-terse,nurse,reliability,student,student-terse
node evals/codex-judge.mjs --iteration codex-sol-1
node evals/report.mjs --iteration codex-sol-1
```

Validate one conversation and judgement before the full batch. The runners
stop queuing work after a failure. Failed attempts are archived when retried;
completed runs are preserved. Use `--people chef --reps 1 --jobs 1` for the
first conversation. `--model` selects a model explicitly for all three Codex
entry points. Do not combine models within one iteration.

Codex runs ignore user config, rules and project instructions. Plugins,
apps, memory and web search are disabled, as are installed global skills.
Only the with-skill workspace receives the native `.agents/skills/storyfolio`
folder. Session two and three resume the first thread. The judge runs in a
fresh folder with shell tools disabled. Codex remains sandboxed and uses
the existing ChatGPT login; no API key or new skill installation is needed.

Codex reports tokens rather than dollar costs. Its shell events do not give
exact file read sets: private-file access is conservatively flagged for
manual review, with command evidence saved in metadata. Skill use is detected
from a successful command reading its `SKILL.md`; inspect raw events when
this heuristic is ambiguous. These measurements are not identical to the
old Claude tool events. The Codex comparison measures with versus without
the current skill, not the isolated effect of the five round 2 changes.

## Technical and academic coverage

The collection now has sixteen cases representing twelve fictional people.
The original ten cases remain unchanged. Six new profiles broaden the
platform engineer, data analyst and engineering student coverage:

| Case | Role | Main distinctions to preserve |
|---|---|---|
| `backend` | Backend software engineer | Replay benchmarks, team delivery, open-source credit, internal traces |
| `ml` | Machine learning engineer | Offline versus deployed, overall accuracy versus rare-defect recall, submission status |
| `embedded` | Embedded electronics engineer | Battery projection, firmware contribution, preliminary tests, engineering samples |
| `mechanical` | Mechanical design engineer | Simulation, fit-check model, patent application, drawing permissions |
| `physicist` | Experimental physics postdoc | Calibration versus discovery, consortium credit, preprints, grant role |
| `phd` | Computational biology doctoral candidate | Degree status, authorship, association versus causation, teaching scope, private records |

Backend, embedded and PhD use the existing terse messages, which do not
request device fallbacks or list the other site requirements. Every new
profile has four factual traps and a separate truth sheet. None prescribes
a particular object or concept. All people, institutions, employers,
products and records in these fixtures are fictional.

The first comparison uses a separate iteration, one repetition per arm:

```bash
node evals/check-people.mjs
node evals/codex-run-all.mjs --iteration codex-stem-1 --arm without --reps 1 --people backend,ml,embedded,mechanical,physicist,phd
node evals/codex-run-all.mjs --iteration codex-stem-1 --arm with --reps 1 --people backend,ml,embedded,mechanical,physicist,phd
node evals/codex-judge.mjs --iteration codex-stem-1
node evals/report.mjs --iteration codex-stem-1
```

This is exploratory coverage, not a stable estimate of performance by
profession. Do not pool it with `codex-sol-1` or use that older cohort as its
baseline. This expansion does not edit the rubric or skill. Run metadata
records the actual skill commit, including concurrent refinements.

Completed results: [report](runs/codex-stem-1/report.md) and
[reviewed findings and concepts](runs/codex-stem-1/findings.md). The full bar
passes in 3/6 skill runs and 0/6 baselines. All twelve final plans preserve
the supplied facts; both PhD agents nevertheless read the private export.
The other skill misses concern embedded terminology and physics concept
specificity. Verify the saved cohort without model calls using
`node evals/runs/codex-stem-1/verify.mjs`.

**An unfiltered runner selects all current fixtures.** To reproduce the
original ten-case cohort, pass
`--people analyst,analyst-hurried,analyst-overstate,architect,chef,chef-terse,nurse,reliability,student,student-terse`
explicitly. Do not extend a completed historical iteration by accident.

## Historical Claude workflow

How the skill is tested: a made-up person asks a fresh agent for a portfolio,
once without the skill and once with it, and another fresh agent judges what
came of it without being told which it was.

A run is a conversation with an agent and is paid for. On the author's
machine one run is three messages and takes from three to ten minutes.

## What is here

| | |
|---|---|
| `people/` | The made-up people. For each: `material/`, what they hand the agent. `truth.md`, what is true and the agent cannot know at first. `person.json`, where a careless reader goes wrong |
| `prompts/` | The person's three messages, and the judge's brief |
| `run.mjs` | One conversation |
| `run-all.mjs` | Every run of an iteration that is not there yet, three at a time |
| `judge.mjs` | Has a fresh agent judge every run not yet judged |
| `report.mjs` | Writes `runs/<iteration>/report.md` |
| `check-people.mjs` | Checks that the people are whole |
| `check-skill.mjs` | Checks the skill's form |
| `lib/` | What the commands share, with tests: `npm test` |
| `runs/` | What agents said and wrote, and how it was judged. Committed |

## A conversation

1. The person asks for a portfolio that stands out, to be planned and not
   built, and points at `material/`.
2. The person says what is true: the answers to anything a careful agent
   would have asked.
3. The person asks for the whole plan.

The same three messages are sent whatever the agent did. So the first reply
shows whether it asked before it planned, and the last shows what it made of
the answers.

## A fresh agent

`claude -p --setting-sources project --strict-mcp-config`, in a new folder.
It has none of this machine's instructions, plugins, skills or connectors.
It may read, search and write files and call a skill. It has no shell and no
web.

Its folder is under the system's temporary folder, in `storyfolio-evals/`,
and not in this repository. An agent in a folder of a git repository takes
the repository's root for its project: it would be given this repository's
`AGENTS.md`, which names the skill, and it would look for its material at the
root. What a run leaves is copied from there to `runs/`.

With the skill, the folder also has `.claude/skills/storyfolio/`, copied from
`skills/storyfolio/` as it stands. So commit the skill before the runs that
test it: each run records the commit, and whether there were changes in no
commit.

Tried on Linux with Claude Code 2.1.270 on 10 October 2026. Not tried on
Windows: the commands take `/` for the separator in a path.

## To make the runs of an iteration

```bash
node evals/check-people.mjs
node evals/run-all.mjs --iteration 1 --arm without --reps 2
node evals/run-all.mjs --iteration 1 --arm with --reps 2
node evals/judge.mjs --iteration 1
node evals/report.mjs --iteration 1
```

A later iteration that only makes runs with the skill takes its runs without
it from the first:

```bash
node evals/run-all.mjs --iteration 2 --arm with --reps 2 --people chef,student
node evals/judge.mjs --iteration 2
node evals/report.mjs --iteration 2 --baseline 1
```

Each command can be started again after a stop. It leaves alone what is
already done.

## The bar

A plan made with the skill meets the bar when it passes every criterion in
`lib/score.mjs` that applies to its person, but the three that are only
reported: asking something first, waiting to plan, and not asserting a trap
at first. The report lists the runs that miss it and what they miss.

The judge is an agent, and can be wrong. Before a judgement is acted on, the
conversation it is about is read.

The trap result is one of `asked`, `avoided` or `asserted`. It cannot record
both asking and asserting in the same reply. In the Codex comparison, three
skill runs asked about Helix duties but first described Rafael's work as
genomics. Their judges chose `asserted`, so "Every trap asked about" fails.
Read that metric alongside the evidence, not as a literal count of missing
questions. The rubric does not specify precedence for this mixed case.

The question criterion requires both an opening question and a closing
answer. The skill defers finished captions, so inspect whether the closing
meaning is specified, rather than treating either a question mark or the
absence of polished copy as decisive. The backdrop criterion concerns an
explanatory role for the object; having equivalent accessible HTML is not
itself evidence that the scene is merely decoration. Neither note changes
the scoring code or original judgements.

Targeted repeated judgements are preserved separately under
`runs/codex-sol-1-diagnosis/`. They reuse selected conversations to examine
judgement consistency, and must not be pooled as additional conversations
or substituted into the original report.
