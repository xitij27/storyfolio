# Broaden technical and academic evaluation coverage

On 10 October 2026 the author asked: "For the tests and evals, I'd like to
see more for tech, engineering, STEM or academia related roles".

The existing ten cases represent six people, including a platform engineer,
a data analyst and an engineering student. There is no research career case.
Add six distinct fictional people, rather than more variants of those three.

| Case | Role | What the case asks of the method |
|---|---|---|
| `backend` | Backend software engineer | Benchmark scope, team ownership, open-source contribution and internal artifacts |
| `ml` | Machine learning engineer | Offline evaluation versus deployment, class-specific metrics, individual work and publication status |
| `embedded` | Embedded electronics engineer | Bench versus field performance, board versus firmware ownership, preliminary versus completed testing |
| `mechanical` | Mechanical design engineer | Simulation versus measured performance, prototype maturity, invention credit and drawing permissions |
| `physicist` | Experimental physics postdoc | Calibration versus discovery, consortium authorship, submitted work and grant role |
| `phd` | Computational biology doctoral candidate | Degree status, preprint authorship, association versus causation, teaching credit and private records |

Each has source material, a separate second-turn truth sheet, and four
explicit traps. Give backend, embedded and PhD the existing terse prompts
to test whether the method supplies the omitted planning requirements.
Do not prescribe an object or storyboard in the fixtures. The facts should
support several concepts; the evaluator still uses the existing rubric.

1. Write and review all six fixtures. Document the coverage and keep the
   previous cases unchanged. Run the fixture checker, skill checker and
   harness tests, then commit before any model conversation.
2. Use the current Codex harness, Sol medium test agents and Astra medium
   judges. Start with the backend pair and inspect that the run and judging
   inputs work. Then run the other five once in each arm. Twelve portfolio
   conversations and twelve judgements answer the initial coverage question.
   Use `codex-stem-1` as a separate iteration, with explicit `--people` and
   `--reps 1`, without borrowing the older baseline.
3. Generate its report and review factual and creative misses against the
   conversations. Record the actual concepts, limitations and useful next
   questions in `evals/runs/codex-stem-1/findings.md`. One observation per
   case and arm is exploratory coverage, not a stable pass-rate estimate.
4. Update the handover with the author's request, scope, checks and findings.
   Commit on main. No skill or rubric edits are part of this expansion.

Existing reports are historical cohorts. Adding fixtures changes which
people an unfiltered runner selects, so document explicit case lists for
reproducing earlier cohorts. Do not rerun the ten older cases merely because
the fixture collection grew.

Concurrent work was observed after the initial inspection: another session
committed the label-source refinement and started `codex-sol-2`. Preserve
its files. Record the actual skill revision used by the new cohort; this
expansion does not edit the skill or evaluate the isolated effect of that
other change.

## Fixture validation

Before the first conversation, `node evals/check-people.mjs` passed all
sixteen cases, `node evals/check-skill.mjs` passed (687 words, four
references), `npm test` passed all four test-file subtests, and
`git diff --check` was clean. The source review checked that each trap has
a cue in the material and a resolution in the truth sheet; the ML metric
names remain unknown until the second message. No new harness logic was
needed. The existing runner discovers the new folders automatically.
