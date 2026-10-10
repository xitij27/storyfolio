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
