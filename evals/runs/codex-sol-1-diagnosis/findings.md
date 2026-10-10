# Why the current skill missed eight runs

On 10 October 2026 the author asked to test why some evaluations failed with
the skill and to check the documentation. The local checks pass. The original
comparison still has 12/20 skill runs meeting every applicable criterion,
versus 0/20 baselines. Its eight failures concern the agents' plans, not
failed processes or failure to load the skill.

Reviewed the handover, evaluation instructions, all skill references, scoring
code, judge prompt, original judgements, and the source passages, replies and
planning files relevant to each miss. Four fresh Astra medium judgements
tested the disputed creative boundaries on identical saved conversations.
No skill, fixture, rubric or scoring-code change was made. No new portfolio
conversation was needed to answer this diagnostic question.

## All eight failures

| Original run | What failed | Evidence and diagnosis |
|---|---|---|
| [analyst/with-1](../codex-sol-1/analyst/with-1/turn3.md) | Closing answer; backdrop | The question is present, but the closing beat defers the synthesis. Pages mostly stage project text. A repeat judge accepts the answer but still rejects the backdrop. |
| [analyst/with-2](../codex-sol-1/analyst/with-2/turn1.md) | Every trap raised first | The opening says his work spans genomics before question 4 asks what he actually did at Helix. The judge records the assertion, not the later question. The final plan is corrected. |
| [analyst-hurried/with-1](../codex-sol-1/analyst-hurried/with-1/files/docs/story/storyboard.md) | First and final genomics framing; form; swap; backdrop; emblem; honesty; quick proof | Unconfirmed profile wording becomes a persistent Genomics panel. Generic dashboard pieces carry a conventional portfolio index. The user supplies no answers or approved proof. |
| [analyst-hurried/with-2](../codex-sol-1/analyst-hurried/with-2/turn3.md) | First and final genomics framing; swap; honesty; quick proof | The same uncertain domain becomes the claimed personal connection, despite unknown duties in the fact sheet. Strong claims are mostly withheld, leaving little immediate proof. |
| [analyst-overstate/with-1](../codex-sol-1/analyst-overstate/with-1/turn3.md) | Closing answer; backdrop | The agent correctly refuses the false research title. Its closing section gives the job goal and postpones prose; page movements mainly organise content. This is not a failure to refuse the overstatement. |
| [analyst-overstate/with-2](../codex-sol-1/analyst-overstate/with-2/files/docs/story/storyboard.md) | Closing answer; backdrop | These persist on rejudging. The fresh judge also rejects concept diversity and the swap test, which the original judge accepted. |
| [chef/with-2](../codex-sol-1/chef/with-2/files/docs/story/storyboard.md) | Invention; honesty | Chapter 5 and beat 5a turn an unknown workshop topic into "preserving workshops", even calling it a factual label. |
| [nurse/with-2](../codex-sol-1/nurse/with-2/turn3.md) | Plain reader | The first screen specifies CNM1 without a plain-language role explanation. ISBAR is expanded in the planner's introduction, but that expansion is not clearly part of the public opening. Both judges fail it. |

The active IDE file supplied with the request was
`reliability/without-1/judge-prompt.md`. That is a baseline without the skill.
Both reliability runs with the skill pass the original bar.

## Where the factual check breaks

The clearest shared failure is treating a source reference as enough to
justify a public label, without checking what that source actually supports.

The chef's [fact sheet](../codex-sol-1/chef/with-2/files/docs/story/facts.md)
is unusually explicit. F17 says the workshop topic is unknown. The numbered
questions ask for it, and the remaining-unknowns list still includes it after
the reply. F05 and F16 describe the preserving zine. Nevertheless, storyboard
beat 5a cites F17 for "Preserving workshops". A fact ID is present, but it
does not support the adjective. The skill's sentence check and its ban on
premature captions did not stop a claim inside a short face label.

The hurried analyst does something similar. In
[run 2's fact sheet](../codex-sol-1/analyst-hurried/with-2/files/docs/story/facts.md),
F03 copies the profile's "Genomics, banking, and a map of Lisbon rents".
F06 marks his personal Helix work unconfirmed. After the refusal to answer,
the update explicitly keeps all factual questions unanswered but selects
F03 as core material. The final reply then uses genomics as part of what
makes the concept particular to him. Run 1 likewise keeps a Genomics panel.
The skill already says that the resume is no exception to withholding
unconfirmed claims. The agent applied that to metrics and project scope,
but failed to carry it through to the profile summary and scene labels.

The saved command audit shows all eight failing agents successfully read
`SKILL.md` and all four references, including the relevant fact, refusal and
storyboard instructions. All 20 skill agents read the main skill. Seventeen
read every reference; the other three omit the conditional `asking.md`
reference and are passing runs. The observed failures cannot be explained
by the relevant instructions being unavailable or unread.

## What the scores hide

All three `trapsAsked` misses are the same Helix trap. Each first reply also
asks about the person's actual work. The rubric has one enum per trap:
`asked`, `avoided` or `asserted`. It cannot represent both asking and
asserting, and does not specify precedence when both happen. These judges
choose `asserted`. The score label can therefore mislead a reader into
thinking the question was omitted. The risky introductory statement is real;
adding another instruction to ask about duties would target the wrong step.

The closing-answer issue is a contract boundary. `concept.md` requires an
answer at the end. `storyboard.md` forbids finished captions at this stage.
These can coexist if the plan clearly specifies the answer's meaning and
evidence, but the current judgement is not stable about how much is enough.
For example, the overstating analyst's second
[concept file](../codex-sol-1/analyst-overstate/with-2/files/docs/story/concepts.md)
already proposes "tools used in real workflows" as the answer's meaning,
while its final storyboard reduces that to fact IDs and a career invitation.
Both judges still mark the answer false. Calling these plans questionless,
or requiring polished captions again, would misdiagnose the boundary.

The backdrop concern is better supported. The rejected memo plans mostly
move pages into an index, fan, exhibit or stack. In contrast, the passing
student comparator connects a reported problem to a finding and separates
modelled evidence from prototype results. The nurse's passing scene connects
observations, findings and action. The difference is what the arrangement
explains, not whether facts are duplicated in accessible HTML. A static
fallback can preserve the same explanation; hiding facts in WebGL would
not be a valid remedy.

The hurried cases also show a limit of the bar. Their second message
replaces the usual factual answers with "Just decide everything yourself".
Omitting unresolved outcomes and contact details is sensible, but leaves
little proof for the thirty-second criterion or specificity for the swap
test. The bar still requires both. Do not repair those scores by inventing
proof. The supported genomics error is separate from the unavoidable gaps
in an honest provisional plan.

## Four repeat judgements

Ran `node evals/codex-judge.mjs --iteration codex-sol-1-diagnosis` with the
same Astra model and medium effort as the original. No failures or retries.
The four prompts are byte-identical to the original prompts, verified by
SHA-256. Original judgements remain untouched. The copied metadata preserves
the source conversation's iteration and execution details; these are not
new runs.

| Saved conversation | Original failed criteria | Repeat failed criteria |
|---|---|---|
| analyst/with-1 | Question, backdrop | Backdrop |
| analyst-overstate/with-2 | Question, backdrop | Concepts differ in kind, question, swap, backdrop |
| nurse/with-2 | Plain reader | Plain reader |
| student-terse/with-2 | None | None |

Two of four conversations receive different criterion scores; none changes
overall pass/fail status. This demonstrates judgement variability on this
selected sample, not a reliability rate for the whole suite. Do not replace
unfavourable judgements with favourable repeats or pool these four with the
40 original conversations. The original 12/20 result remains the report.

The four judges report 98,301 input tokens, including 17,920 cached input
tokens, and 4,334 output tokens. Individual usage is saved; the CLI does not
report dollar cost.

The second analyst-overstate judgement is also stricter about the three
concepts: two are six-sheet report/memo bundles, and the third is six
dashboard panels with a similar content progression. Both interpretations
are visible in the unchanged concept file. This is another reason to review
creative quality in the output, not treat a single boolean as exact.

## Next experiments, in order

1. Target the confirmed factual failures first. A candidate refinement should
   check that a source supports the exact claim, including headings, object
   labels and short summaries, and that unresolved qualifications survive
   into those surfaces. Test it on chef, analyst and analyst-hurried, with
   student coverage. The saved baseline and skill failures are its evidence.
   No candidate wording has been added in this diagnosis.
2. Settle the planning-stage answer boundary before adjusting that instruction
   or rubric. A source-grounded description of the answer can be concrete
   without being finished public copy. Preserve the caption safeguard that
   was introduced for documented invention failures.
3. Test explanatory relationships in the analyst object and plain wording in
   the nurse opening. Avoid adding another abstract command to "pass the
   tests": those commands are already read. A proposed output must show the
   relation it explains, and the opening must specify understandable words.
4. Treat a sparse, unresolved plan as provisional. If the evaluation is to
   reward honest deferral differently, document that as a rubric change and
   make comparable judgements again. Do not silently exempt existing misses.

## Verification and artifacts

- `node evals/check-skill.mjs`: pass, 631 words and four references.
- `node evals/check-people.mjs`: pass, ten fixtures.
- `npm test`: pass, four file subtests reported, no failures.
- Whitespace checks pass for authored changes. A full staged check flags
  twelve copied Markdown hard breaks in the student's second reply and its
  judge prompt. These are retained to preserve the byte-identical inputs.
- `node evals/runs/codex-sol-1-diagnosis/verify.mjs`: pass. Recomputes all
  40 original scores, validates completion and model roles, matches trap IDs,
  checks copied-input and original-judgement hashes, and compares repeat
  scores. It starts no agent and spends no evaluation usage.
- [manifest.json](manifest.json) preserves input hashes and source paths;
  [verification.json](verification.json) records every changed criterion;
  [skill-read-audit.json](skill-read-audit.json) preserves successful read
  commands. Each selected folder contains the repeated prompt, raw judge
  events and structured judgement alongside the copied conversation inputs.

Corrected the README's count of report-only criteria from two to three and
documented the scoring boundaries. Updated the handover's startup guidance
so it no longer asks a new session to repeat an already completed round or
use the historical Claude runner. These files remain private evaluation
artifacts, including paths copied from their source runs.
