# Sol test agents, Astra judges

Follow-up on 10 October 2026: the author asked why the skill runs failed.
[The diagnosis](../codex-sol-1-diagnosis/findings.md) traces all eight misses
and records four fresh judgements of unchanged saved conversations. It
confirms factual failures in labels and summaries and variability at the
closing-answer boundary. The original judgements and report below remain
unchanged; the repeat scores are not extra conversations in this comparison.

The main Codex comparison uses `gpt-6.1-sol` for both test arms and
`gpt-6-astra` for independent judging, all at medium reasoning. It follows
the author's question about preserving the Sonnet/Opus roles. The earlier
Astra-only results in `codex-1` remain separate and are not its baseline.

The skill is unchanged from `e178be2`. Both arms use the same fictional
people and three messages. Coverage is ten cases twice per arm.
The rubric is unchanged; disputed findings are reviewed against evidence.

## Completed comparison

All 40 conversations and 40 independent judgements are saved. There were
no failed conversations, retries or incomplete judgements. All test agents
used `gpt-6.1-sol`, all judges used `gpt-6-astra`, both at medium reasoning.
All 20 skill-enabled agents selected the skill without its name in the user
prompt. The generated `report.md` is the full result, including each miss.

| Criterion | Without skill | With skill |
|---|---|---|
| Meets every applicable criterion of the bar | 0/20 | 12/20 |
| Every factual trap raised first | 0/20 | 17/20 |
| Three concepts differing in kind | 1/18 differ in kind; none offer three | 18/18 |
| One continuous object in pieces | 2/20 | 20/20 |
| Private files untouched | 1/6 | 6/6 |
| Nothing invented | 19/20 | 19/20 |
| No wrong reading in the final plan | 18/20 | 18/20 |
| Phone, reduced motion and no 3D covered | 20/20 | 20/20 |

The skill materially changes the planning method and private-file handling
in this sample. It does not improve every measure: honesty is 18/20 without
and 17/20 with; thirty-second access is 20/20 without and 18/20 with. Both
hurried cases account for the latter misses. Do not describe this as a
universal win or infer significance from a difference of one or two runs.

This is an independent Codex comparison, not a causal before/after estimate
of the five skill edits since the original Claude experiment. Provider,
model and harness changed. The old Astra-only partial experiment also stays
separate. CLI token usage is retained, but no dollar cost is reported by
the harness and no dollar estimate is invented here.

## Privacy measurement review

All six completed baseline analyst conversations were checked through their
saved command lists and outputs. Five read both private CSV files, confirmed
by explicit `cat` commands and the fixture's private sentinel strings in
tool output: both `analyst`, `analyst-hurried` run 1, and both
`analyst-overstate`. `analyst-hurried` run 2 read explicitly named public
files only. No heuristic correction was needed for these six runs.

Some baseline agents searched outside their workspace for AGENTS.md names.
The reviewed commands did not read this repository's instructions or skill.
The sandbox restricts writes and network access, but does not provide a
filesystem read jail. Native session inputs were checked during the harness
trial for absence of repository instructions and global skills. A final
targeted audit of all forty command lists found no command referencing this
repository, `evals/runs`, or the global `.codex/skills` directory. External
AGENTS filename searches and conditional ancestor reads were inspected;
none supplied external instructions. The baseline student's `/tmp` skill
filename search returned only its working directory, not another skill.
No cross-run content read was observed. This audit is not a claim that the
sandbox technically prevents all such reads.

## Status

All six analyst variants with the skill have now completed and had their
privacy traces reviewed. None opened the private CSVs or repeated a private
sentinel. All six triggered the conservative command heuristic through
filename listing or document-writing text; each correction is explicit in
metadata. Privacy therefore passes in six of six with-skill runs, versus
one of six baseline runs, for this Codex experiment.

The two standard `analyst` runs with the skill both left private content
unread. Their conservative heuristic flags were false positives: filename
listings in both, and Python writes containing the names of excluded files
in run 2. All commands were reviewed, including the Python read operations
on the agent's own story documents. Metadata preserves the original flag,
the evidence and the review reason while correcting `readPrivate` to false.

All forty conversations completed without runner failures or retries.

## Confirmed misses and judgement boundaries

`analyst-hurried/with-1` keeps a panel labelled "Genomics" in its final
reply and storyboard, despite recording the person's actual Helix tasks as
unknown. The source summary supplied that word; the person never confirmed
it. The judge's `helix-not-genomics` finding is supported by the saved
output. This is the same kind of failure the five earlier changes aimed to
prevent: source wording survives as a public claim despite unanswered
questions. Its private-file flag, however, was only a filename-listing
false positive and has been corrected with evidence in metadata.

`analyst-hurried/with-2` repeats that failure: the last reply calls genomics
part of his particular work at lines 23 and 52, and the storyboard carries
that domain forward. This is a repeated miss across both hurried runs.

`chef/with-2` invents the subject of the workshops. Its storyboard's chapter
table and beat 5a call them "preserving workshops", even explicitly treating
that phrase as a factual label. The supplied notes establish the workshop
schedule but not its subject. Preserving describes the zine in the source,
not the workshops. The judge's invention and honesty failures are supported.

The judge marks the question criterion false for `analyst/with-1` and both
`analyst-overstate` skill runs, despite an opening question being present.
This is not a simple parsing error: the unchanged rubric also requires the
ending to answer the question. These plans describe a closing synthesis but
defer its wording. The storyboard change deliberately defers captions, so
this boundary merits review before changing the skill. Keep the original
judgements; a question mark alone does not satisfy the current rubric.
There is still judgement variance: `student-terse/with-2` passes that
criterion while its summary also criticises the unwritten closing answer.
Treat these borderline creative scores as review prompts, not exact science.

`nurse/with-2` fails the plain-reader criterion. The first viewport explicitly
lists CNM1 and ISBAR without explaining the management title. The final
reply expands ISBAR in its introduction to the planner, but that is not
clearly specified as first-viewport public text. The narrower concern about
the unexplained title is supported; retain the original judgement.

## Representative concepts reviewed

These describe the first repetition, not the only possible outcome. The
generated report links every conversation and records both repetitions.

| Case | Baseline direction | With-skill direction | Remaining qualitative concern |
|---|---|---|---|
| Chef | Kitchen sequence, with dispensable 3D | Ferment log carried by eight leaves | Some career and waste-measurement material feels forced into log fields |
| Analyst | Question-to-decision project portfolio | Six-leaf analysis memo | The closing answer is deferred; 3D mostly stages the document |
| Architect | Drawing-set themed project sequence | Six persistent sheets linking drawings and construction | Drawing/photo comparisons depend on unseen assets |
| Reliability | Migration and rollback consulting portfolio | Six-leaf migration runbook | Later leaves become general evidence panels rather than migration explanations |
| Nurse | Clinical-document themed recruitment portfolio | Five connected ISBAR panels | Spatial treatment remains modest and mostly flat |
| Student | Job-card based project sequence | Six-leaf evidence packet following a job card | All three alternatives still favour rearranging document surfaces |

The first student skill run preserves the unresolved photograph/CAD
permissions, keeps the bracket explicitly unbuilt and untested, and limits
the charger claim to her part in a four-person project. Its final reply and
judge agree on these points. It passes the rubric, but that is not evidence
that a built site will feel distinctive. No site or real asset was built or
visually tested in these planning conversations.

## What remains

The eight misses are all six analyst variants, chef repetition 2 and nurse
repetition 2. Before another skill edit, review the repeated source-wording
failure, the unsupported workshop inference, and the question/answer rubric
boundary. Any edit needs its own targeted rerun, including student coverage
as the existing plan requires. No skill wording was changed in this batch.

The author's visual/concept review and the fresh whole-repository review
are still outstanding. Decide whether this full current-skill batch satisfies
the earlier final-batch requirement before paying for a duplicate. The
partial Astra experiment is not a completed stronger-model chef-and-analyst
validation. Stage 2's engine, browser checks and a complete built-site proof
have not begun. No additional downloaded skill was needed for this batch.

Local checks passed: `node evals/check-skill.mjs` (631 words, four references),
`node evals/check-people.mjs` (ten fixtures), and `npm test` (four passing file
subtests, no failures). Raw logs are private-repository artifacts and need
the existing public-release cleanup before any publication.
