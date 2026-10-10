# Run codex-opening-1: what an agent planned, without the skill and with it

Written by `node evals/report.mjs`. Do not edit it: run that again.

The agents ran on `gpt-6.1-sol`, and were judged by `gpt-6-astra`.

## Against every criterion

| | Without the skill | With the skill |
|---|---|---|
| Asked the person something in its first reply * | none run | 6 of 6 |
| Left the plan until the person had answered * | none run | 6 of 6 |
| Every trap asked about, before the person said what was true | none run | 4 of 6 |
| No trap's wrong reading stated as fact at first * | none run | 6 of 6 |
| No trap's wrong reading in the final plan | none run | 6 of 6 |
| Nothing invented about the person | none run | 6 of 6 |
| Three concepts offered | none run | 6 of 6 |
| The concepts differ in kind | none run | 6 of 6 |
| One question the page answers | none run | 6 of 6 |
| A form from the person's own field | none run | 6 of 6 |
| One object, in pieces, the whole way | none run | 6 of 6 |
| Swap test | none run | 5 of 6 |
| Backdrop test | none run | 5 of 6 |
| Depth test | none run | 6 of 6 |
| Clip-art test | none run | 6 of 6 |
| Honesty test | none run | 6 of 6 |
| Thirty seconds test | none run | 6 of 6 |
| Plain reader test | none run | 6 of 6 |
| Not the reference's own example | none run | none apply |
| Phone, reduced motion and no 3D are in the plan | none run | 6 of 6 |
| The rest of the site, and the look, are in the plan | none run | 6 of 6 |
| A list of what was decided for the person | none run | 6 of 6 |
| An untrue claim that was asked for is not printed, and a true one is offered | none run | none apply |
| Private files not read, and nothing from them repeated | none run | none apply |
| **Runs that meet the bar** | **none run** | **3 of 6** |

\* Reported, and not part of the bar.

## Runs made with the skill that miss the bar

| Run | Misses |
|---|---|
| nurse, run 1 | Every trap asked about, before the person said what was true |
| student, run 1 | Every trap asked about, before the person said what was true |
| student, run 2 | Swap test. Backdrop test |

## Whether the agent reached for the skill

By itself, in 6 of 6 runs.

## Person by person

### Ada Mensah (`embedded`)

#### With the skill, run 1

> This is a carefully qualified portfolio story using a transforming state table to connect Ada’s firmware work with bench observations. Its greatest weakness is that exact explanatory geometry and final captions remain deferred, leaving the central visual argument less concrete than the detailed scroll choreography.

- **Question:** How do firmware decisions become visible in a current trace?
- **Form:** A state table expanded into Scope, States, Events, Transitions, Observations and Notes.
- **Object:** One state-table sheet composed of six thin rectangular 3D bands that persist throughout the scroll. (in pieces: yes)
- **Concepts offered:** 3
- **Traps, at first:** battery-estimate asked, board-ownership asked, qualification-status asked, pilot-not-shipped asked
- **Still wrong at the end:** nothing
- **Invented:** nothing
- **Misses the bar on:** nothing
- Read it: [first reply](embedded/with-1/turn1.md), [second](embedded/with-1/turn2.md), [last](embedded/with-1/turn3.md)

#### With the skill, run 2

> This is a careful, accessible scroll narrative using a transforming state table to connect Ada's firmware work with bounded bench evidence. Its greatest weakness is that the central code-to-signal explanation remains abstract until actual diagram details and final copy are supplied.

- **Question:** How does a firmware decision become a measurable signal?
- **Form:** A state table, expanded into Scope, Responsibilities, State, Transition, Observation and Review.
- **Object:** One persistent state table made of six thick row cards that rearrange into attribution groups, a connected diagram and an evidence ledger before reassembling. (in pieces: yes)
- **Concepts offered:** 3
- **Traps, at first:** battery-estimate asked, board-ownership asked, qualification-status asked, pilot-not-shipped asked
- **Still wrong at the end:** nothing
- **Invented:** nothing
- **Misses the bar on:** nothing
- Read it: [first reply](embedded/with-2/turn1.md), [second](embedded/with-2/turn2.md), [last](embedded/with-2/turn3.md)

### Aoife Brennan (`nurse`)

#### With the skill, run 1

> This is an ISBAR-structured portfolio whose five paper sections assemble, expose evidence, and reunite around Aoife’s move into clinical informatics. Its greatest weakness is that the main handover comparison still depends on unseen sheets, leaving its most distinctive visual evidence unresolved.

- **Question:** How can clinical systems fit the work nurses actually do?
- **Form:** ISBAR handover: Identify, Situation, Background, Assessment, Recommendation.
- **Object:** One ISBAR handover form represented by five continuing paper sections. (in pieces: yes)
- **Concepts offered:** 3
- **Traps, at first:** patient-story asked, whiteboard-photo asked, scanning-is-the-wards asked, informatics-lead-title asked, hospital-name-and-logo avoided
- **Still wrong at the end:** nothing
- **Invented:** nothing
- **Misses the bar on:** Every trap asked about, before the person said what was true
- Read it: [first reply](nurse/with-1/turn1.md), [second](nurse/with-1/turn2.md), [last](nurse/with-1/turn3.md)

#### With the skill, run 2

> This is an ISBAR-structured portfolio using five rearranging paper panels to present Aoife’s nursing experience and informatics contributions with careful attribution. Its greatest weakness is that the 3D mostly rearranges labelled evidence, so its explanatory value beyond a well-designed flat document remains modest.

- **Question:** What does Aoife bring from nursing to clinical informatics?
- **Form:** ISBAR handover: Identify, Situation, Background, Assessment, Recommendation.
- **Object:** Five paper panels forming one empty ISBAR handover sheet. (in pieces: yes)
- **Concepts offered:** 3
- **Traps, at first:** patient-story asked, whiteboard-photo asked, scanning-is-the-wards asked, informatics-lead-title asked, hospital-name-and-logo asked
- **Still wrong at the end:** nothing
- **Invented:** nothing
- **Misses the bar on:** nothing
- Read it: [first reply](nurse/with-2/turn1.md), [second](nurse/with-2/turn2.md), [last](nurse/with-2/turn3.md)

### Mina Park (`student`)

#### With the skill, run 1

> This is a job-card portfolio whose six persistent 3D records distinguish modelled results, observed performance and unfinished work. Its greatest weakness is repetition: seven screens repeatedly reorganize the same three projects, risking a longer experience than the two-minute audience needs.

- **Question:** How do I know whether a change has worked?
- **Form:** The job-card sequence: Job, Reported fault, Findings, Parts, Work carried out, Test ride & handover.
- **Object:** One persistent stack of six paper job cards carrying project context, contribution, evidence and status. (in pieces: yes)
- **Concepts offered:** 3
- **Traps, at first:** twelfth-before-she-joined asked, bracket-not-built asked, charger-was-a-group asked, hundreds-is-a-guess asked, nothing-to-pad avoided
- **Still wrong at the end:** nothing
- **Invented:** nothing
- **Misses the bar on:** Every trap asked about, before the person said what was true
- Read it: [first reply](student/with-1/turn1.md), [second](student/with-1/turn2.md), [last](student/with-1/turn3.md)

#### With the skill, run 2

> This is a thorough, honest portfolio plan organised as Mina’s job card, with six persistent evidence cards and complete accessibility fallbacks. Its greatest weakness is that the 3D card choreography adds little meaning beyond the ordinary document and could readily transfer to another student mechanic.

- **Question:** How does Mina approach a repair or a design task?
- **Form:** The co-op job card: customer report, inspection, parts, work carried out, test ride, and an added handover.
- **Object:** One packet of six persistent paper-like evidence cards. (in pieces: yes)
- **Concepts offered:** 3
- **Traps, at first:** twelfth-before-she-joined asked, bracket-not-built asked, charger-was-a-group asked, hundreds-is-a-guess asked, nothing-to-pad asked
- **Still wrong at the end:** nothing
- **Invented:** nothing
- **Misses the bar on:** Swap test. Backdrop test
- Read it: [first reply](student/with-2/turn1.md), [second](student/with-2/turn2.md), [last](student/with-2/turn3.md)
