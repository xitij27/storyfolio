# Concepts — Dawit Bekele

Three concepts, built from `facts.md`. They differ in form or object, not only in colour.

---

## Concept A — The Runbook, told in crates

**The question:** How do you move something that is not allowed to stop?

**The form — the runbook,** in its own named stages (resume): Preflight, Shadow, Dual Write, Cutover, Soak, Decommission.

| Chapter | Role | Holds |
|---|---|---|
| Opening | The opening | His name, the question, where the work began |
| Preflight | Who / Where from | Addis Ababa (library, 2013–16) → Amsterdam (Lumen Pay, 2016–20) → Rotterdam (Kestrel Freight, 2020–) |
| Shadow | How | His way of working: dual writes, shadow traffic, boring-on-the-day; the runbook's own shape |
| Dual Write | What | 310 services, the 4 TB Postgres 11→15 upgrade, ferry's cutover command, the runbook itself |
| Cutover | What came of it | 99.98% on the order API over 26 months (two internal incidents, each under ten minutes, named plainly), 85→22 weekly pages for the on-call team of nine, the runbook at 40 teams |
| Soak | Proof it held | The SRE North 2024 talk and its public slides |
| Decommission | The close | The answer; Dawit going independent next year; how to reach him |

**The object — a small fleet of shipping crates,** 7 of them, standing closed and stacked at rest. Faces carry his real work: one shows the runbook's stages, one the Postgres figures, one ferry's terminal, one the talk's title card.

**What it becomes:**
- *Preflight:* the crates line up as a route on a map, one per city and year.
- *Dual Write:* the crates split and face the viewer as a wall, one project to a face.
- *Decommission:* the crates close and restack into one block — whole again, the way the chapter's name empties a system out.

**The opening and the close:** Opens on 2014 — the dropped table at the library, and the two books read after (the Google SRE book, *Release It!*) — the crates not yet arranged, just arriving. Closes on Decommission: the old job powering down, the crates settled, a line to write to him.

**What it stands on:** the runbook's named stages (resume), the career route (linkedin), the 99.98%/incidents correction, the 85→22 "we" correction, ferry's history, the 2014 story, the two books, "going independent."

**What it needs from Dawit:** one real picture of him; at least one real artifact to put on a crate face — a terminal screenshot of `ferry`, a slide from the talk, or a clean redraw of one runbook diagram that isn't Kestrel's internal one.

**Why it's his:** Kestrel Freight is a freight company, and "I move systems that are not allowed to stop" is his own line. A crate is not the SRE emblem — it's what his employer's trucks carry, turned into the shape of his own migrations. Nobody else's runbook has these six stage names.

---

## Concept B — The Rollback Plan, told in gates

**The question:** How do you make it safe to turn back?

**The form — a rollback plan,** in the shape any SRE would recognise: Trigger, Point of No Return, Steps Back, Verify, Lessons Kept.

| Chapter | Role | Holds |
|---|---|---|
| Opening | The opening | 2014, the dropped table, the start of his talk |
| Trigger | Who / Where from | What sets a migration off; the three cities and jobs as points on the way |
| Point of No Return | How | Why he delays it — shadow traffic, dual writes; the runbook's logic without naming its stages |
| Steps Back | What + what came of it | ferry's cutover command (literally a rollback tool), the Postgres dual-write safety net, the figures (99.98%, two incidents, 85→22 "we", 40 teams) |
| Verify | Proof it held | The SRE North 2024 talk |
| Lessons Kept | The close | Back to 2014 and the two books; going independent; contact |

**The object — a row of lock gates,** 6 of them, closed and upright at rest — the kind Rotterdam itself is built on, holding back water that is not allowed to fail. Faces carry the figures and artifacts.

**What it becomes:**
- *Point of No Return:* two gates open side by side — dual write, shown literally.
- *Steps Back:* the gates shut one at a time, each revealing a project on its face.
- *Lessons Kept:* all gates closed and still, the water held.

**The opening and the close:** Opens and closes on the same point — 2014 — so the page reads as a loop: a mistake made safe is the whole story.

**What it stands on:** the same facts as Concept A, reordered around rollback rather than career chronology; Rotterdam's own geography as the object's source.

**What it needs from Dawit:** the same picture and artifact as Concept A, plus his comfort with the page naming Rotterdam's flood defences as a metaphor for his own work (a liberty the facts don't state outright — his own, to confirm).

**Why it's his:** he named rollbacks, specifically, as the lesson of his first outage, and he lives in a city that is one large, literal rollback mechanism. Nobody else's reason for caring about rollbacks is a table he dropped in Addis Ababa in 2014.

---

## Concept C — The Cutover Checklist, told in track points

**The question:** What makes a migration boring on the day?

**The form — a cutover checklist,** the day-of document: Freeze, Go/No-Go, Flip, Watch, Stand Down.

| Chapter | Role | Holds |
|---|---|---|
| Opening | The opening | 2014 and the two books, as what the checklist exists to prevent |
| Freeze | Who / Where from | The three stops, frozen in place like stations on a line |
| Go/No-Go | How | The decision logic behind dual writes and shadow traffic |
| Flip | What + what came of it | The cutovers themselves — 310 services, Postgres, ferry's cutover command — each a switch thrown; the figures beside them |
| Watch | Proof it held | Soak-period numbers, the talk |
| Stand Down | The close | Decommissioning the old; going independent; contact |

**The object — a set of railway track points,** 6 of them, lying straight and at rest, each able to send a line one of two ways — the literal shape of a cutover.

**What it becomes:**
- *Freeze:* the points lie end to end as a single straight track — his route, one stop after another.
- *Flip:* each point throws, sending its track to a new face carrying one project.
- *Stand Down:* the points lock straight again, settled.

**The opening and the close:** Opens on why the checklist exists (2014); closes on Stand Down — the switch thrown one last time, into independence.

**What it stands on:** the same facts, told through the day of a cutover rather than the whole career or the idea of rollback.

**What it needs from Dawit:** same picture and artifact gap as the others.

**Why it's his:** `ferry`'s own command is a cutover command — he wrote it. Track points are not the SRE emblem (that would be a server rack or a dashboard); they're the shape of the one motion — flip, one way or the other — his whole career has rehearsed.

---

## Which I would choose

**Concept A.** Two reasons beyond taste:

1. Its form needs nothing invented — the runbook's six stage names are already in Dawit's own resume, so the chapters are his document, not a trade template I've filled in. Concepts B and C use recognisable trade documents, but their section names (Trigger, Freeze, Flip...) are mine, not his.
2. "Decommission" as the last chapter does double duty: it's the runbook's real final stage, and it's also literally what Dawit is doing to his current job next year. That ending isn't a metaphor I'm reaching for — it's where his own two timelines (the document, the career) already meet.

Concept B is the most emotionally precise (rollback, 2014, Rotterdam's gates all point the same way), and is worth keeping in reserve if Dawit reads A and feels it undersells how much the 2014 story matters to him. Concept C is the tightest and most literal to `ferry`, but its checklist stage names are the most invented of the three, and "boring" as a chapter name risks reading flat without the right copy around it.

Test notes on A: swap (no — needs Kestrel Freight's name and the dropped-table story to work at all), backdrop (no — each chapter's crate arrangement carries that chapter's meaning), emblem (no — a crate is freight's shape, not an engineer's), honesty (clean — every figure above matches the corrected fact sheet), thirty seconds (yes — name, "moves systems that can't stop," 99.98%/40 teams as instant proof, and a close with how to reach him, all possible without scrolling past the first two chapters).
