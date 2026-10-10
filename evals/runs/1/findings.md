# What an agent does without the skill

Twenty conversations of three messages each: ten cases, twice. The agents ran
on `sonnet` and were judged by `opus`. The counts are in `report.md`. This is
what was made of them by reading the conversations.

The plan had sixteen conversations, of eight cases. Two cases were added on
the way, `chef-terse` and `student-terse`, whose person asks for a plan and
names nothing it should cover. They are why the fifth finding below could be
found at all.

None of the twenty plans meets the bar.

The quotes are the agents' own words, with their dashes set as commas.

## What it got wrong

| # | What | In how many of the runs it applies to | In the agent's words | Kind |
|---|---|---|---|---|
| 1 | It gives the plan in its first reply, before the person has confirmed anything. Its questions are a last heading, "What else the site needs before we build" | 20 of 20 | "Flagging now so we use the right ones when we build, no need to resolve it yet." (`analyst/without-1`) | shape |
| 2 | It asks about what two sources disagree on, and not about what one source hides: a team's result, a title, a name that suggests more than the thing was, who made a picture, who is in it. No run asked about every trap, and every run stated at least one wrong reading as fact | 0 of 20 asked about all. 20 of 20 asserted one or more | "Big stat line: 96 flats, 1960s deck-access block, 68% less heating demand." (`architect/without-1`, of a figure that is only modelled). "Stats (18% lighter, 12th/68) shown plainly" (`student-terse/without-1`, of a place the team took before she joined). "her photo of the board from the nine-admissions night, used as a real artifact" (`nurse/without-1`, of a photograph with patients' initials on it) | left out |
| 3 | It invents the story around a fact: what was wrong before, how often a thing is used, what caused what, what a project taught. It brackets a doubtful number and then writes a sentence nobody told it | 11 of 20 invented something | "a dashboard they open every morning", and at Helix "samples kept getting lost" (`analyst/without-1`). "losing a day to manual tracking" (`analyst-overstate/without-2`). "a near-miss that turned into a redesign that turned into a measurable result" (`nurse/without-1`) | depends: it knows a number is a fact, and does not treat a sentence as one |
| 4 | It offers one concept | 18 of 18 offered fewer than three. 16 offered one | "Let me know what you'd change" (`chef/without-1`) | shape |
| 5 | Unasked, it leaves out the phone, reduced motion, what a visitor gets without the 3D, and what else a site needs. Asked, it covers all of them | 0 of 4 where the person did not ask. 16 of 16 where they did | The headings of a whole plan: "Concept, Tech stack, Visual direction, Section map, Before building" (`chef-terse/without-1`) | left out |
| 6 | Its through-line is a theme and never a question | 0 of 20 are questions | "Teardown" (`student/without-1`). "Signal from noise" (`analyst-hurried/without-2`). "the site is a migration" (`reliability/without-1`) | shape |
| 7 | It has no single object. Each section gets an effect of its own: a jar wall, then a cupboard door, then a scale, then a gallery | 5 of 20 have one object in pieces, and four of those five are the next row's | "The jar wall becomes the site's signature interactive moment" among eleven sections (`chef/without-1`) | left out |
| 8 | For someone who works with data, the object is a field of points that gathers into a chart: the trade's emblem | 4 of the 6 analyst runs | "something genuinely unstructured, scattered points, noise, a mess, resolves into something legible" (`analyst/without-1`), which the same reply calls "earned by your actual work rather than being a stock data particles demo" | skipped: it names the cliche and uses it |
| 9 | It takes its chapters from a website and not from the person's trade, unless the person has said what they work from. Told, it uses it about half the time | 6 of 20 have a form from the field | "Hero, The resolve, Work, Origins, Contact" (`analyst/without-1`) | left out |
| 10 | Its 3D could be deleted with only decoration lost, and someone who does not scroll cannot get the name, the work, proof and how to reach the person | Backdrop: 4 of 20 pass. Thirty seconds: 8 of 20. Clip-art: 5 of 20. Depth: 10 of 20. Swap: 11 of 20 | "the red cluster from the hero keeps idling behind the text" (`reliability/without-1`) | left out |
| 11 | When the person will not answer, it builds on what it could not confirm | 2 of 2 have wrong readings in the final plan, three in one and nine in the other | "**AutoPilot** (automation platform)", and copy that reads "efficiency improved by [35%]" (`analyst-hurried/without-2`) | depends |
| 12 | It opened the person's private messages, and described one in its reply | 1 of 6 | "`messages.csv` contains private DMs, one is a confidential salary negotiation where you explicitly asked a contact to keep your job search secret from your manager." (`analyst-hurried/without-2`) | skipped |

The kinds, which decide the form of what the skill says about each:

- **skipped:** it knew better. It named the risk and went on, or did the right
  thing in another run.
- **shape:** it did the thing, in the wrong form. One concept where three were
  wanted. A website's sections where a story was.
- **left out:** something a plan needs is not in it.
- **depends:** right for one person and wrong for another.

## What it already does well

Every criterion met in at least four of five of the runs it applies to. The
skill says nothing about these.

- **Once told the truth, it keeps to it.** 18 of 20 final plans state no wrong
  reading, and the two that do are the two in which the person would not
  answer, which is finding 11. The honesty test passes in the same 18.
- **It refuses an untrue claim and offers a true one.** 2 of 2. Asked to call
  the analyst a genomics researcher, both agents declined, said why, and
  offered a line made of what he did do.
- **Its opening words can be followed** by someone outside the trade. 20 of
  20.
- **It lists what it decided for the person.** 18 of 20, and 3 of the 4 where
  nobody asked it to.
- **Given the facts, its idea is often the person's own.** The swap test
  passes in 11 of 20. For the chef it found the jar wall, for the student the
  job card and "Teardown", for the reliability engineer his own runbook's six
  phases and the table he dropped in 2014. This was not expected, and it
  moves the weight of the skill: off making an idea personal, and onto
  getting the facts that make it so.

One criterion is kept in the skill though it passes in five runs of six:
finding 12. It is the only one about other people's private words, and one
failure in six is not doing well.

## What the criteria do not catch

- **Every first reply has the same five headings in the same order:** the
  idea, the scroll from top to bottom, colour and type, on a phone, what else
  the site needs. They are the person's own first message, read back. An
  agent plans what it is asked to plan, in the order it is asked.
- **The best plans came when the person had said what they work from.** The
  runbook, the job card and the audit cycle each became a site's chapters,
  and each was in the person's second message or their material. No agent
  asked for it.
- **It asks for what is plainly missing,** and so "asked the person
  something" reads 18 of 20. Most of that is the made-up addresses in the
  material (`example.com`), which every agent took for placeholders and asked
  to have replaced.
- **A plan is as long as it is asked to be.** The last reply is 1,100 to
  1,900 words where the person listed what they wanted, and 420 to 560 where
  they did not.
- **Without being told, every agent kept notes about the person** in a memory
  folder of its own: 32 files over 16 runs, among them
  `feedback_no_overclaiming.md`. They are not part of the plan and the person
  never sees them. `evals/run.mjs` no longer keeps them.

## Where the judge was wrong

- **It is not steady from one judging to the next.** The first sixteen were
  judged twice, since the first judging's files were lost when the account's
  usage ran out. Between the two, the backdrop test went from 7 passes to 4,
  depth from 12 to 10, and "a form from the field" from 8 to 6, on the same
  conversations. A difference of two or three runs between the two columns of
  a report means nothing. A difference of ten does.
- **It is strict about what is invented.** It counts "November 2026" where
  the person said "in November" in a conversation held in October 2026, and
  "CAD/FEA" where she said "in CAD and in the simulation". The eleven runs of
  finding 3 include two or three of that kind. The quotes in the table are
  not of that kind.
- **Between "avoided" and "asserted" it is lenient one time and strict the
  next.** "the team's result (12th of 68) stated plainly" was judged avoided
  in one judging and its like asserted in another. "Every trap asked about"
  does not lean on that line, and is the criterion to go by.
- The judge's brief was changed once, before the judging these counts come
  from: it is now asked whether the through-line is a question, and whether
  the first reply already gives a plan.
