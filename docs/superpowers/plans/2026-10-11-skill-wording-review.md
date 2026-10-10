# Skill wording review and drafted rewrites

On 11 October 2026 the author asked: "what do you think of this skill? is
it well written?" The review below was given in that conversation. It ended
with an offer to draft rewrites for the author to read before deciding which
runs are worth paying for, and the author replied "okay".

**Status: drafted, not applied.** No skill file is changed and no run has
been made. Each rewrite waits on the author's decision, and then on the runs
listed for it under [Runs each would need](#runs-each-would-need).

## The review

The skill is well written where it was first written. SKILL.md is a short
map (687 words): three stops, each naming the reference to open, what goes
to the person and when to go on. It gives reasons rather than orders, as in
why the first reply stops at the first stop. `concept.md` is the strongest
file: what does not work, worked cases that show what was turned down, and
a guard against copying them. The storyboard's empty rows make an agent
cover phones, no WebGL and shared links without a lecture. The description
says when to use the skill, and nothing of how.

What was found against it:

1. **The claim check is now the hardest passage to read.** SKILL.md line 53
   is one 154-word bullet in the file that is always loaded. The first
   version ended "find the line of the fact sheet it stands on. A sentence
   with no line goes, or becomes a question." The replacement from `e485f53`
   says "Read the supporting line and its unresolved questions, not just its
   reference. It must establish the whole claim: a topic attached to one item
   does not establish the topic of another." Its "It" is unclear, and "the
   introduction" is named nowhere else.
2. **The later lines are in another voice.** The lines added in `8adaaa3`,
   `94faf60`, `749eee0` and `b85d014` are abstract and procedural, beside
   text that is concrete and led by examples. Compare "change the question
   instead of treating it as creative framing" with "a hall that was
   'standing empty', a wheel that is 'true again'" in the same skill.
3. **A scored trap is named in the skill.** `asking.md` line 18 says
   "'real-time system' is still not confirmed, and it is not printed." The
   analyst fixtures score `fraudshield-not-real-time`: "FraudShield is a
   real-time fraud detection system, or one that ran anywhere." The line came
   in with `e178be2`, after `analyst-hurried/with-1` in run 1 printed
   "real-time fraud detection system". A run needed the rule, but not that
   example. It predates the rule later plans set themselves, "No
   fixture-specific wording is added to the skill"
   ([label-source-check plan](2026-10-10-label-source-check.md)). Since
   `e178be2`, the analyst cases' result on that trap partly tests whether the
   agent read the answer. Milder cases: `storyboard.md` line 27 takes
   "standing empty" and "true again" from `architect/with-2` and
   `student/with-1` in run 1, but those were invented details, not scored
   traps. The list before the example in `asking.md` line 18 (a figure, a
   project that ran, a paper, a title) follows the analyst traps closely, but
   in general words.
4. **Two small conflicts.** `reading-a-profile.md` says to tell the person
   which files were left unopened (lines 7 and 24), but the list of what goes
   in the first message (lines 64 to 74) leaves it out and ends "Nothing
   else." Line 7 also says to "ask what it contains before opening it", which
   suggests an exchange before the first stop, while SKILL.md line 22 makes
   the first reply the first stop. The review also named a third: stop 3's
   gate does not say the yes is written into a file. On a closer read,
   SKILL.md line 24 has `docs/story/handover.md` brought up to date when the
   yes comes, so no change is drafted for it.
5. **A possible gap, not drafted.** `concept.md` line 15 wants a question
   "about something that interests the person now", and stop 1 never asks
   what that is, which invites invention. Under AGENTS.md no line goes in
   without a run that needed it. Look for this in the next runs' fact sheets
   and concepts.
6. **Where the changes have gone, not drafted.** All six changes since the
   first version guard facts. None touches the creative guidance, and the
   [handover](../../handover.md) lists creative consistency as open. Each
   guard makes an agent more careful, and the next gain is probably on the
   concept side.

## Drafted rewrites

Each draft keeps every failure its line was written for. The evidence for
each is linked. None adds a file, a stop or an instruction that no run
needed, and none uses wording from a fixture. The made-up examples (a
thesis on tides, a law firm, a game) were checked against `evals/people/`
and `skills/` on 11 October 2026, and none of their key words is in a
fixture.

### 1. The claim check, SKILL.md line 53

Now:

> - **Nothing about the person is invented.** You know that a number, an employer, a title and a quote are facts. So is every small thing a sentence says on its way: what was wrong before they came, how often a thing is used, which came first, why, how a thing was left, what it taught them. That sounds like writing, and it is a claim. Before handing over any reply or file, check each claim against the fact sheet, including introductory summaries, working titles and labels on the object's faces. Read the supporting line and its unresolved questions, not just its reference. It must establish the whole claim: a topic attached to one item does not establish the topic of another. Wording that depends on an unanswered question stays out of the introduction and the planned page, even if copied from a profile. Remove it or list it as a question to confirm.

Draft, as two bullets:

> - **Nothing about the person is invented.** You know that a number, an employer, a title and a quote are facts. So is every small thing a sentence says on its way: what was wrong before they came, how often a thing is used, which came first, why, how a thing was left, what it taught them. That sounds like writing, and it is a claim.
> - **Each claim is checked before you hand anything over.** Find the line of the fact sheet it stands on. The summary at the top of your first reply is made of claims, and so are a working title and a label on a piece of the object. The line has to hold the whole claim, and the claim must not hang on a question they have not answered, even when the words are their own profile's. That their thesis was about tides does not make their job at the harbour about tides. A claim that fails goes, or becomes a question.

The draft is 168 words against 154 now. With it, SKILL.md is 701 words
(687 now), under the 800 that `evals/check-skill.mjs` allows. It is easier
to read, not shorter.

Keeps, from [codex-sol-2/written-against.md](../../../evals/runs/codex-sol-2/written-against.md):

| Clause it was written with | Where the draft keeps it |
|---|---|
| Include introductory summaries, working titles and object labels | "The summary at the top of your first reply is made of claims, and so are a working title and a label" |
| Read what the fact establishes and its open questions, not only the citation | "The line has to hold the whole claim, and the claim must not hang on a question they have not answered" |
| A topic attached to one item does not establish another's | The thesis and the harbour |
| Open qualifications apply to copied profile wording and the summary | "even when the words are their own profile's" |

### 2. The fixture example, asking.md line 18

Now, the last sentence of the bullet:

> The person's own resume is no exception: if you asked whether a project ever ran and they did not say, "real-time system" is still not confirmed, and it is not printed.

Draft:

> The person's own resume is no exception: if you asked whether the game on it was ever released and they did not say, it is not printed as released.

Keeps the run 1 finding ([run 1 findings](../../../evals/runs/1/findings.md),
"For a person who will not answer"): the material's own words for something
asked about and not confirmed are not printed. Removes the scored trap's
answer.

### 3. The premise check, concept.md line 19

Now:

> Before choosing the question, state what must be true about the person for it to make sense. Check those premises against the fact sheet's unanswered questions. An employer's field is not the person's contribution. If a premise is unconfirmed, change the question instead of treating it as creative framing.

Draft:

> Before you settle on the question, write down what must be true of the person for it to make sense, and find each of those in the fact sheet. Where one hangs on a question they have not answered, change the question: calling it a framing does not make it true. Where they worked is not what they did. "What makes a contract hold?" asks too much of someone who kept a law firm's computers running.

Keeps, from [codex-premise-1](../../../evals/runs/codex-premise-1/findings.md):
writing the premises down (the saved premise review that turned a question
down came from this), checking them against unanswered questions, an
employer's field not being the person's work, and changing the question
rather than keeping it as framing.

### 4. The first summary, reading-a-profile.md line 66

Now:

> 1. Two or three sentences on what the material establishes about the person. Describe their own work, not an employer's field. If their responsibilities need confirming, give the employer and listed role without turning its name or their profile slogan into a speciality.

Draft:

> 1. Two or three sentences on what the material shows of their own work. Where you do not yet know what they did in a job, give the employer and the title as listed, and stop there: a firm called Northgate Legal does not make them a lawyer, and the slogan at the top of a profile does not make them a specialist.

Keeps, from [codex-premise-1](../../../evals/runs/codex-premise-1/findings.md):
their own work and not the employer's field, employer and listed role where
duties are open, and neither the employer's name nor the profile slogan
turned into a speciality. The law firm is the same made-up case as draft 3,
so the two read as one lesson.

### 5. The close, storyboard.md line 29

Now:

> For the close, state in planning notes what answers the opening question and which facts support that answer. Its final wording still waits, but its meaning must be decided. A contact link, a job goal or a promise to write an answer later does not supply that meaning.

Draft:

> For the close, the words wait but the answer does not. Write down what answers the opening question, and the lines of the fact sheet it stands on. A contact link is not an answer, and neither is the job they want, or a note that the answer will come later.

Keeps, from [codex-closing-1](../../../evals/runs/codex-closing-1/findings.md):
the answer and its supporting facts decided now, final wording deferred, and
none of the three substitutes the saved failures used.

### 6. The opening, storyboard.md line 35

Now:

> Specify what the opening tells someone outside the field about the person's work, in ordinary words supported by the fact sheet. Explain any unfamiliar title or technical term there. This meaning is part of the plan even while the final captions wait.

Draft:

> Write down what the first screen tells someone outside their field about their work, in plain words the fact sheet supports. Any title or term of their trade that such a visitor would not know is explained there. This is planned now, though the captions wait.

Keeps, from [codex-opening-1](../../../evals/runs/codex-opening-1/findings.md):
plain meaning for an outsider, support from the fact sheet, titles and terms
explained, and the meaning planned before captions.

### 7. Files left unopened, reading-a-profile.md lines 7 and 64 to 74

The wording of the privacy boundary is kept as it is.
[codex-privacy-1](../../../evals/runs/codex-privacy-1/findings.md) decided
not to pay for another wording variant, since the PhD failure needs an
enforced boundary and not new words. Only the two conflicts are resolved.

Line 7, now, the last two sentences:

> Tell the person which files you left. If a file's purpose is unclear, ask what it contains before opening it.

Draft:

> Where you cannot tell what a file is, leave it unopened, and ask about it with your other questions.

The message list, now items 3 and 4:

> 3. These, which no material answers: [the five questions, unchanged]
> 4. Nothing else. No concept, no outline, no look.

Draft, a new item 4 and the old item 4 as 5:

> 4. The files you left unopened, by name, and why.
> 5. Nothing else. No concept, no outline, no look.

Line 24 ("tell the person that you left them") then has a place in the
message to go.

## Runs each would need

AGENTS.md: "After a change, the runs it was made for are made again."

| Draft | Cases its line was written for | Cohort the line came from |
|---|---|---|
| 1 | chef, analyst, analyst-hurried, student | codex-sol-2 |
| 2 | analyst-hurried | run 1 |
| 3, 4 | analyst-hurried, student | codex-premise-1 |
| 5 | analyst, analyst-overstate, student | codex-closing-1 |
| 6 | nurse, embedded, student | codex-opening-1 |
| 7 | phd, analyst | codex-privacy-1 |

All seven at once, two repetitions each, covers chef, analyst,
analyst-hurried, analyst-overstate, student, nurse, embedded and phd: 16
conversations and 16 judgements.

**Recommended first step: drafts 1 and 2 only.** Draft 2 takes a scored
answer out of the skill. Draft 1 is the rule an agent reads in every
conversation. Run chef, analyst, analyst-hurried and student twice each, the
same eight as codex-sol-2, so a matched comparison exists: 8 conversations
and 8 judgements. Drafts 3 to 7 change voice and placement. Their runs
passed on the target, so their payoff is consistency. Fold them into the
next cohort that has another question to answer, and do not pay for voice
alone.

Record before the run: after draft 2, the analyst cases may do worse on
`fraudshield-not-real-time`. That would be a truer measure of the rule, and
not a regression caused by the rewrite.

With the skill committed first, and a fresh cohort name, per the
[runbook](../../../evals/README.md):

```bash
node evals/codex-run-all.mjs --iteration codex-wording-1 --arm with --reps 2 --people chef,analyst,analyst-hurried,student
node evals/codex-judge.mjs --iteration codex-wording-1
node evals/report.mjs --iteration codex-wording-1
```

## Independent assessment, 11 October 2026

The author requested a second opinion:

> I asked claude to review the skill and it came up with these points:
> [2026-10-11-skill-wording-review.md](2026-10-11-skill-wording-review.md) . Study them and tell me if it is valid or not

This assessment preserves the original review and drafts above. It checks
the current skill, commit history and saved evidence, with two independent
read-only reviews of wording and evaluation claims. It does not apply a
rewrite or start an evaluation conversation or judgement.

### Verdict on the six points

| Point | Assessment | Basis |
|---|---|---|
| 1. Dense claim check | Valid editorial concern, not an established behavioral defect. | The bullet is 154 words. Splitting it can make it easier to scan. However, "It" naturally refers to the supporting line, and "the introduction" follows "introductory summaries" in the same paragraph. The ambiguity claim is stronger than the evidence. The existing check has a documented purpose and partial factual gains in [codex-sol-2](../../../evals/runs/codex-sol-2/findings.md). |
| 2. Different voice | Plausible style judgement, not evidence of worse agent performance. | The newer passages use more procedural language. Precision can be useful, and the [premise](../../../evals/runs/codex-premise-1/findings.md), [opening](../../../evals/runs/codex-opening-1/findings.md) and [closing](../../../evals/runs/codex-closing-1/findings.md) cohorts support their targeted requirements, with the limitations each study records. No comparison shows that the drafted voice works better. |
| 3. Scored example in the skill | Valid, and the strongest concern about evaluation independence. | [asking.md](../../../skills/storyfolio/references/asking.md) repeats "real-time system", overlapping the analyst's `fraudshield-not-real-time` trap in [person.json](../../../evals/people/analyst/person.json). The [original failed reply](../../../evals/runs/1/analyst-hurried/with-1/turn3.md) prints "real-time fraud detection system". Git confirms `e178be2` added the example afterward. That trap is partly cued by a known example and provides weaker evidence of generalization. The runs remain useful regression tests; the overlap neither invalidates all results nor measures how much the example affected them. |
| 4. Two conflicts | One real textual inconsistency and one possible ambiguity. | [reading-a-profile.md](../../../skills/storyfolio/references/reading-a-profile.md) requires reporting unopened files, but its exhaustive first-reply list omits that notice and ends "Nothing else". Asking about an unclear file can already happen in the first-stop questions, so a separate earlier exchange is not required. The abandoned third concern needs no change: [SKILL.md](../../../skills/storyfolio/SKILL.md) requires recording answers at every stop and updating the handover after storyboard approval. |
| 5. Current interests | Sensible hypothesis, not a demonstrated missing instruction. | The concept should concern current interests, but profile evidence and the existing gap/confirmation questions can establish them. No cited run shows this particular omission causing an invented interest. Observe it before adding a mandatory question. |
| 6. All changes guard facts; creativity is next | Partly valid direction, inaccurate history and an unproved prediction. | There are six post-initial skill revisions, but privacy concerns file access, opening clarity concerns outsider comprehension, and closing meaning concerns the story's answer. Those are not all factual guards. Concept diversity remains mixed in [the richer physics study](../../../evals/runs/codex-physics-evidence-1/findings.md), which supports further investigation, not a claim that another creative instruction is necessarily the next gain. |

The description, three-stop structure, reference routing and explicit
storyboard coverage are concrete strengths. Calling `concept.md` the
strongest file, or declaring one voice easier to read, remains editorial
judgement. The measured 687-word body and four references are correct.
One minor historical correction: the earlier claim-check quotation called
the "first version" above is from `e178be2`, not the initial `aff5bca`.

### Assessment of the drafts

- **Draft 1:** broadly preserves the intended safeguards and usefully
  separates the rule from the checking step. It grows the passage from
  154 to 168 words, so it is a readability candidate, not a simplification
  proven to help agents. Its example of a first-reply summary is narrower
  than "introductory summaries", although the universal claim check remains.
- **Draft 2:** a reasonable replacement for the directly cued example.
  It retains the resume-and-unanswered-question lesson. Reducing overlap
  does not turn already-used cases into unseen generalization evidence.
- **Drafts 3 and 4:** largely faithful, but longer. Draft 3 makes positive
  fact-sheet support more explicit. Draft 4's example concerns inferring a
  profession from an employer, whereas the saved failure concerned inferring
  a domain of work. Its general employer/title-only safeguard remains.
- **Drafts 5 and 6:** largely faithful stylistic alternatives. Draft 5
  explicitly asks for fact-sheet lines; draft 6 names the first screen,
  already required by the preceding paragraph. Neither has a demonstrated
  advantage over the current tested wording.
- **Draft 7:** potentially useful for making the first-message contract
  consistent, but more than moving text. It explicitly batches unclear-file
  questions and asks why files were left unopened. The cited privacy runs
  do not demonstrate a failure caused by the notice's placement or question
  timing. Thus the blanket claim that every new instruction already has
  its required failure evidence is not established. This is not a privacy
  fix, and the review should not present it as one.

### Corrections to the proposed evaluation

1. **Do not pre-excuse worse behavior.** The statement that a worse
   `fraudshield-not-real-time` result would be "not a regression caused by
   the rewrite" is unjustified. If new output again makes an unsupported
   claim, record that failure. A direct hint's removal may explain it;
   sampling and judgement variation are also possible. The explanation
   must follow the evidence, rather than deciding in advance that a decline
   cannot count. Removing the cue improves independence in one respect,
   not necessarily portfolio quality.
2. **The old cohort is not a clean control for these rewrites.** The eight
   proposed conversations match `codex-sol-2` in cases and repetition counts,
   but today's skill also contains the intervening privacy, premise/summary,
   opening and closing changes. Comparing with that cohort cannot isolate
   drafts 1 and 2, and applying both together cannot isolate their individual
   effects. Historical runs can supply regression context. If attribution
   is the question, use unchanged-current-skill comparison runs with fixed
   fixtures, prompts, models and rubric; if only regression coverage is
   needed, state the narrower conclusion. No such runs are authorized or
   started by this assessment.
3. **Not all the cited targets passed.** The statement that drafts 3 to 7
   had runs that "passed on the target" is false for the privacy target:
   [both PhD repetitions read private files](../../../evals/runs/codex-privacy-1/findings.md).
   If draft 7's target means notice placement instead, that target was not
   established by the cited study. The original review acknowledges the
   privacy failure earlier, so its closing generalization contradicts its
   own evidence.

Recommendation: accept the example-overlap finding and the first-message
inconsistency, treat the dense paragraph as optional editorial work, and
correct the evaluation claims before choosing any rewrite. Draft 2 has the
clearest reason to be prioritized in a future change. Do not bundle the
seven drafts or commission eight conversations merely for voice consistency.
Any later skill change still needs the saved-failure rationale and focused
rerun required by the repository rules. Generalization needs examples not
used to develop the wording, treated as a separate fixture experiment.

### Scope and verification

Only this assessment and its navigation/status records were edited. Skill
files, fixtures, saved evaluations and the original review text are unchanged.
The initial worktree contained another session's Steve-pilot changes. That
session committed them as `dffa92e` during the read-only investigation;
the worktree was clean before these documentation edits began.
An unrelated `evals/runs/codex-token-usage-audit-1/` directory appeared
during verification and was left untouched.

- `node evals/check-skill.mjs`: passed, 687 words and four references.
- `npm test`: the sandboxed invocation failed in `measurement-v2.test.mjs`;
  the approved execution outside the sandbox passed all 54 tests. This is
  consistent with the documented Git-subprocess sandbox limitation.
- `git diff --check` and documentation checks passed: all 109 local link
  targets in the three edited files exist, and none contains an em dash.
- No skill evaluation conversations or judgements were started. Local
  checks validate repository integrity, not the effectiveness of a rewrite.
- Record this work on `main`; no push is part of the author's request.

## Response to the assessment, 11 October 2026

The author passed the assessment above back to the conversation that wrote
the review. That conversation accepts these corrections: the ambiguity in point 1
was overstated; point 2 is a matter of taste with no evidence behind it; the
"earlier exchange" in point 4 is not a conflict, since an unclear file can
be asked about among the first-stop questions; point 6 misdescribes the
history, since privacy, opening clarity and closing meaning are not fact
guards; the quotation called "first version" is from `e178be2`; draft 4's
example is about a profession where the saved failure was about a field of
work; a worse result after draft 2 would be a failure and is not excused in
advance; codex-sol-2 is no control for today's skill; and draft 7's target
did not pass.

Two checks of the saved runs, made after the assessment, weaken findings
that both the review and the assessment accepted.

**The example reached fewer results than the review said.** The skill has
not changed since `b85d014`. Of the 18 saved Codex analyst-family runs with
the skill that have conversation logs (codex-sol-1, codex-sol-2,
codex-privacy-1, codex-premise-1 and codex-closing-1), the agent first ran
a command that printed `asking.md` in turn 2 in 17, and in turn 1 in one
(`codex-sol-2/analyst-hurried/with-1`). So the first-reply question about
FraudShield, asked in all 18, came before the example was read in all but
one. In the analyst and analyst-overstate cases the person answers that
question, so their final plans do not rest on the example. What it could
have cued is the final plan of the six analyst-hurried runs, all of which
leave FraudShield's "real-time" out. Without the skill, the same case's
final plan asserts it in 5 of 6 runs (run 1, codex-1 and codex-sol-1). The
six skill runs also leave out the sibling traps that `asking.md` does not
name in words (`autopilot-is-a-script`, `founder-title`,
`hackathon-was-a-team`, `efficiency-35-unmeasured`). The six no-skill runs
assert them 5, 5, 6 and 3 times. That fits the rule working beyond its example. It is not evidence of
generalisation: the general list in the same sentence ("a figure whose
meaning you do not know, a project you cannot say ever ran, a paper you
cannot say they wrote, a title you cannot say is theirs") was also written
against this case.

**The unopened-files inconsistency has not cost anything.** In every saved
Codex skill conversation that left a private file unopened, the same 18
analyst-family conversations, the first reply names the file. The PhD runs read their private file,
so no notice was due. AGENTS.md says what an agent already does well is left
out, so draft 7 is withdrawn.

Revised recommendation:

- **Draft 2 only.** Its question is narrow: without the named answer, does
  the analyst-hurried final plan still leave unconfirmed resume wording out?
  It needs the case it was written for, analyst-hurried, twice: 2
  conversations and 2 judgements. The conclusion is regression coverage for
  that case only. Any unsupported claim in the result is recorded as a
  failure. Attribution would need a current-skill arm as well, since
  analyst-hurried last ran on `94faf60` and `storyboard.md` has changed since;
  that is worth paying for only if the result fails.
- **Draft 1** is optional editing. codex-sol-2 shows agents read and applied
  the current wording, so it waits for a cohort that has another reason to
  run its cases.
- **Drafts 3 to 6** are not proposed. **Draft 7** is withdrawn.
- Generalisation needs a fixture the wording was not written against, as
  the assessment says. That is a separate experiment.

The checks read only saved `judgement.json` verdicts, `turn*.jsonl` command
events and `turn1.md` replies. No skill file was changed and no run was made.

## Follow-up recommendation, 11 October 2026

The author supplied the response committed as `8012071` and asked:
"Do you want me to apply draft 2 and start the two runs?" The independent
reviewer's recommendation is yes: draft 2 alone, with two analyst-hurried
conversations and two independent judgements as a bounded regression check.
Draft 1 remains optional, drafts 3 to 6 stay dropped, and draft 7 stays
withdrawn. This review records that recommendation; it does not apply the
skill change or launch the proposed evaluations.

A fresh read of the five named cohorts confirms 18 conversations, 17 first
prints of the resume example in turn 2 and one in turn 1. The check searched
completed command output for "The person's own resume is no exception:"
rather than counting filename listings. All 18 saved judgements mark the
FraudShield first-reply trap asked. All six hurried skill judgements omit
FraudShield and the four named sibling traps from `final_asserts`. Three
still report the separate unsupported genomics claim, so these counts do
not mean all six plans were factually clean. The six historical no-skill
judgements reproduce the stated counts: FraudShield 5, AutoPilot 5,
Founder 5, hackathon 6 and efficiency 3. Their mixed providers and versions
make this descriptive context, not a controlled estimate of the rule's effect.

Manual inspection confirms that all 18 first replies identify the unopened
messages and connections exports. Four give both exact CSV filenames; the
other fourteen identify them in ordinary words. This supports withdrawing
draft 7. The accurate claim is that no notice omission was observed in these
conversations, rather than that the mismatch could never matter.

Two qualifications remain. Reading the example after the first reply rules
out its causing that reply, but receiving a user's answer does not prove
the example had no later influence. The answered cases did not need the
example to justify omitting the claim; only the hurried cases test that
omission without a confirming answer. Also, a current-skill comparison
after a failure could investigate attribution; one additional run would
not by itself establish cause amid sampling and judging variation.

These qualifications do not justify expanding the initial two-run scope.
Freeze the fixture, prompts, models and rubric, commit the single edit
before running, and report both judgements and actual claims. Two successes
would mean no observed recurrence in those two conversations, not proof of
equivalence or generalization. A failure remains a failure and warrants a
separate decision about diagnostic comparison, rather than automatic extra
sampling until a pass appears.

Verification for this follow-up: the skill form check passes at 687 words
with four references; approved `npm test` passes all 54 tests. Only this
recommendation and its handover link are changed. No skill edit, portfolio
evaluation, rejudgement or push was performed.

## Decision, and what else the saved judgements show, 11 October 2026

The author passed on the independent reviewer's later recommendation, which
reverses the one recorded above:

> **No, we can stop here and leave the skill unchanged.** Draft 2 reduces overlap with a test case, but we have no demonstrated current behavior problem that requires this rewrite.
>
> The two runs become necessary **if we apply draft 2**, because your repository rules require testing skill changes.
>
> My recommendation: skip the wording change and its runs for now. The review has already served its purpose by correcting our understanding of the evidence.

The author gave no contrary instruction, and asked: "anything else wrong
with this skill?" The skill is unchanged and draft 2's runs are not made.

To answer from evidence rather than from the text, every Codex skill run
with a judgement was scored again with `evals/lib/score.mjs` and the current
fixtures, using the script at the end of this section. It reproduces each
cohort's documented count of runs meeting the bar: codex-sol-1 12/20,
codex-sol-2 2/8, codex-stem-1 3/6, codex-privacy-1 1/6, codex-premise-1 0/4,
codex-opening-1 3/6, codex-closing-1 5/6, codex-physics-evidence-1 1/2.

The 38 runs after codex-sol-1, on the six skill versions from `e485f53` to
`b85d014`, meet the bar in 15 and fail 46 criteria in all:

| Criterion | Failures | Where |
|---|---|---|
| swap | 9 | analyst-hurried 4, student 3, analyst 1, physicist 1 |
| backdrop | 7 | analyst 3, analyst-hurried 2, physicist 1, student 1 |
| trapsAsked | 6 | student 4, nurse 1, analyst-hurried 1 |
| hasForm | 4 | analyst-hurried 4 |
| thirtySeconds | 4 | analyst-hurried 4 |
| differInKind | 3 | chef 1, physicist 1, physicist-evidence 1 |
| privateUntouched | 3 | phd 3, every PhD skill run |
| hasQuestion | 2 | analyst 2, both before the closing line |
| depth | 2 | analyst-hurried 2 |
| clipart | 2 | analyst-hurried 2 |
| plainReader | 2 | analyst-hurried 1, embedded 1 (before the opening line) |
| finalClean, honesty | 1 each | analyst-hurried |

Three things in these numbers were not recorded together before.

1. **One case carries half the failures.** analyst-hurried is 4 of the 38
   runs and 22 of the 46 failures, and fails every time. Its creative
   limits are already explained in
   [codex-creative-review-1](../../../evals/runs/codex-creative-review-1/findings.md):
   the person withholds the evidence a story needs. Two more things hold
   it down. The judge's `form` is "empty if the parts are a website's usual
   sections ... under any names", and all four plans take an analysis
   brief, data atlas or dashboard "as an editorial decision, not a claim
   about his working routine", then name its chapters by the website roles
   (Context, Toolkit, Work inventory, Next step), since the person never
   said what he works from. And five of the six thirty-second failures in
   all Codex skill runs, every one of them analyst-hurried, cite contact
   that is not usable: the material's addresses are `rafael@example.com`
   and `https://rentmap.example`, which agents take for placeholders, as
   [run 1](../../../evals/runs/1/findings.md) noted, and this person will not
   give real ones. Part of this case's score measures the fixture.
2. **The padding trap fails on wording.** 4 of the 10 student runs fail
   only `trapsAsked`, each on `nothing-to-pad`. The judge marks "asked"
   where the agent wrote "No testimonials supplied; do not invent them"
   and "avoided" where it wrote "No testimonial material supplied" or "No
   testimonials supplied or planned". No student plan pads. Set aside, the
   34 runs without analyst-hurried meet the bar in 19, not 15.
3. **What is left is what the handover already names.** Without those two
   effects, the failures are creative (swap 5, backdrop 5, differInKind 3)
   and privacy (every PhD run reads the participant export). The two
   hasQuestion failures and the plainReader failure come from versions
   before the closing and opening lines that addressed them. The nurse's
   single trap miss (`codex-opening-1/nurse/with-1`, hospital name and logo)
   has no second instance.

So the saved runs show no new defect in the skill's text that a run
demonstrates. Its demonstrated weaknesses remain creative consistency and
private-file access, both open in the [handover](../../handover.md), and
neither is shown to be fixable by wording. Nothing here proposes a skill
change, a rubric change or a rejudgement; the figures above are a reading
of the original judgements, which stand. If the full-bar rate is used to
compare skill versions, report analyst-hurried and the padding wording
separately, as codex-sol-2 and codex-premise-1 already do case by case.

The script, run from the repository root with `node`:

```js
import { readFileSync, existsSync, readdirSync } from "node:fs";
import { join, resolve } from "node:path";
const { criteria, failures, meetsBar } = await import(resolve("evals/lib/score.mjs"));
const json = (path) => JSON.parse(readFileSync(path, "utf8"));
const cohorts = ["codex-sol-1", "codex-sol-2", "codex-stem-1", "codex-privacy-1",
  "codex-premise-1", "codex-opening-1", "codex-closing-1", "codex-physics-evidence-1"];
const runs = [];
for (const cohort of cohorts) {
  for (const person of readdirSync(join("evals/runs", cohort))) {
    const fixture = join("evals/people", person, "person.json");
    if (!existsSync(fixture)) continue;
    for (const run of readdirSync(join("evals/runs", cohort, person)).filter((r) => r.startsWith("with-"))) {
      const dir = join("evals/runs", cohort, person, run);
      if (!existsSync(join(dir, "judgement.json"))) continue;
      const scored = criteria(json(join(dir, "judgement.json")).judgement, json(fixture), json(join(dir, "meta.json")));
      runs.push({ cohort, person, run, pass: meetsBar(scored), fails: failures(scored) });
    }
  }
}
const show = (label, rows) => {
  const count = {};
  for (const row of rows) for (const name of row.fails) count[name] = (count[name] ?? 0) + 1;
  console.log(`${label}: ${rows.length} runs, ${rows.filter((r) => r.pass).length} meet the bar`);
  for (const [name, n] of Object.entries(count).sort((a, b) => b[1] - a[1])) console.log(`  ${name} ${n}`);
};
for (const cohort of cohorts) show(cohort, runs.filter((r) => r.cohort === cohort));
const later = runs.filter((r) => r.cohort !== "codex-sol-1");
show("after codex-sol-1", later);
show("after codex-sol-1, without analyst-hurried", later.filter((r) => r.person !== "analyst-hurried"));
```
