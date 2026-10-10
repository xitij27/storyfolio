# Concepts — Dawit Bekele

Three concepts, differing in form and object.

**Chosen: Concept A, The Runbook.** Dawit asked us to go with our recommendation (2026-10-10).

---

## Concept A — The Runbook

**The question.** What makes a migration boring on the day?

**The form.** His own migration runbook, in his own stage names, from his resume: preflight, shadow, dual write, cutover, soak, decommission.

| Chapter | Role | Holds |
|---|---|---|
| (opening, before preflight) | The opening | His name, the question, a single closed container at rest in a yard |
| Preflight | Who / Where from | The three jobs and their years — library, Lumen Pay, Kestrel — as the checks you do before you touch anything |
| Shadow | How | The way he works: the runbook, the checklist, the rollback plan; the 2014 dropped table as the shadow experience behind all of it |
| Dual write | What | The Kestrel migration itself, the Postgres 11→15 upgrade, ferry and its cutover command, the SRE North talk |
| Cutover | What came of it | 99.98% availability of the order API over 26 months, two sub-ten-minute internal incidents, pages per week 85→22 (said as "we," the on-call team of nine) |
| Soak | Proof that held | The runbook, still used by 40 teams; ferry, still maintained since 2022 |
| Decommission | (the old, switched off) | The old data centres; his old 2019 site, retired |
| (close, after decommission) | The close | The answer to the question, and how to write to him |

**The object.** Shipping containers — plain, stackable, identical at rest, five to twelve of them. Not the SRE emblem (no server racks, no globe of pings): these come from the company he's spent six years moving onto the cloud, a freight company, and from his own line about the work — "while the trucks kept running."

**What it becomes.**
- *Preflight:* the containers line up in a column, each stencilled with a job and its years, oldest at the bottom.
- *Dual write:* two full stacks stand side by side, on-prem and cloud, and small crates cross from one to the other one at a time, 310 of them, while one container is relabelled 11 → 15.
- *Cutover:* the stacks snap into one, and the containers' faces turn into stencilled numbers — 99.98%, 85→22, 40 teams.

**The opening and the close.** It opens on one closed container, alone, in a yard, with his name and the question. It closes on the full set standing together, whole and still, with the answer and an address to write to.

**What it stands on.** The runbook's stage names (resume), the 310 services and 26 months (resume, LinkedIn), 99.98%/order API/two sub-ten-minute incidents (confirmed), 85→22 pages said as "we," team of nine, about a year (confirmed), 40 teams (confirmed), ferry since 2022 with his cutover command (confirmed), the 2014 dropped table (confirmed), the old site retiring (confirmed).

**What it needs from him.** Nothing further to confirm. No picture is needed — the object is built, not photographed. If he'd like his talk video or slides linked at the point ferry/the talk appear, that's a yes to get (they're already public, by his own word).

**Why it's his.** The chapters are the exact words of the runbook he wrote and still owns, and the object is built from the freight business he has spent four years moving onto the cloud — no colleague at another company has this runbook, under these names, moving this freight.

---

## Concept B — The Rollback

**The question.** What do you build so a mistake doesn't become permanent?

**The form.** The rollback plan, the document he named second among the three he works from: the trigger that says something is wrong, the point of no return, the steps back, the check that it's really back.

| Chapter | Role | Holds |
|---|---|---|
| Opening | Name, the question | — |
| 2014 | Where from | The dropped table, the library, the first outage |
| The trigger | How | What he watches for now — the runbook, the checklist, the SRE book and *Release It!* |
| The point of no return | What | The Postgres 11→15 upgrade, run with dual writes precisely so there was always a way back |
| Steps back | What came of it | The two sub-ten-minute incidents during the Kestrel migration, and how they were recovered, not just that they happened |
| Verified | Proof | 99.98% over 26 months; the runbook now used by 40 teams |
| Close | Answer, contact | — |

**The object.** Stacked database-table blocks, labelled by schema version, five to twelve of them, one of which can be drawn out and the stack still stands. Not a control panel or a dashboard — those read as the reliability-engineer emblem. These are tables, because a table is the thing he dropped in 2014 and the thing he upgraded four versions later.

**What it becomes.**
- *2014:* one block, alone, tips and empties — the table he dropped.
- *The point of no return:* the full stack relabels from 11 to 15, one block at a time, each still removable.
- *Steps back:* a block is pulled from the middle of the stack and the rest hold — twice, for the two incidents — before settling again.

**The opening and the close.** Opens on the one block tipping, 2014, before his name has even settled on screen. Closes on the full stack, labelled 15, standing, with the answer and his contact.

**What it stands on.** The 2014 story, the Postgres upgrade, the two incidents, 99.98%, the 40 teams, the two books (all confirmed).

**What it needs from him.** Nothing further — same as A, no picture required.

**Why it's his.** The table is literally the object of his first and worst mistake, and the thing he later upgraded without a maintenance window; no emblem does that, because no one else dropped that table.

---

## Concept C — The Handover

**The question.** What does the next person on call need to know?

**The form.** The shift handover — the form a reliability team actually passes along at the end of a rotation: what's open, what to watch, what happened, what's next.

| Chapter | Role | Holds |
|---|---|---|
| Opening | Name, the question | — |
| What's open | Where from | The three jobs, in order, as unfinished business carried from one shift to the next |
| What to watch | How | The runbook, the checklist, the rollback plan, the books he learned from |
| What happened | What | The Kestrel migration, the Postgres upgrade, ferry, the talk |
| The numbers | What came of it | 99.98%, 85→22 pages (as "we"), 40 teams |
| What's next | Close | The answer, and how to reach him |

**The object.** A set of handover cards — plain index-card shapes, five to twelve of them, each passed from one hand-shape to the next as the page scrolls, each card's face carrying one fact.

**What it becomes.**
- *What's open:* the cards lay out in a line, oldest job first, like a hand of cards dealt in order.
- *What happened:* one card turns into the migration's two stacks (a small echo of concept A, held on a card's face rather than as the whole object).
- *The numbers:* the cards flip to show their numbers at once, like a hand turned face-up.

**The opening and the close.** Opens on a single card, blank side up. Closes on the full hand, face up, with the answer and his contact.

**What it stands on.** Same facts as A and B, read through the on-call rotation rather than the migration itself.

**What it needs from him.** Nothing further.

**Why it's his.** It is built from the literal practice of a shift handover, which he runs as on-call lead — but of the three, this is the one that leans most on a generic card-flip, and it says the least that A and C don't already say better.

---

## Which I would choose

**Concept A, The Runbook.** It's the closest reading of his own words: the runbook's six stages are already named, in order, on his own resume, and he told us directly it's one of the three documents he works from. The object — shipping containers — comes from the one detail that is unmistakably his and not a reliability engineer's in general: four years spent moving a freight company's services, one at a time, onto the cloud, "while the trucks kept running." Concept B is a close second and holds the 2014 story with more weight; if he wants the dropped table to carry more of the page than one scene, B is the one to open with instead. Concept C is the weakest of the three — the handover is real, but the card object says less than A's containers or B's tables, and leans closer to a generic flip-card effect than either.
