# Rubric v2 calibration: codex-measurement-v2-1

These are fresh judgements of selected saved conversations, not new portfolio conversations or a skill success-rate comparison. Original judgements and reports remain unchanged. All source and frozen-input hashes verified.

Judge: `gpt-6-astra`, medium reasoning.

V2 records discovery and assertion independently. Both are in its full bar, so asking about a fact cannot cancel asserting the wrong reading. Silent avoidance remains a discovery miss. Closing meaning can be specified before final copy; an accessible equivalent does not make an explanatory scene decorative.

| Saved run | Original v1 bar | V2 bar | V2 misses |
|---|---|---|---|
| codex-sol-1/analyst-hurried/with-1 | fail | fail | No trap's wrong reading stated as fact at first; No trap's wrong reading in the final plan; One question the page answers; A form from the person's own field; Swap test; Backdrop test; Clip-art test; Honesty test; Thirty seconds test |
| codex-sol-2/analyst/with-1 | fail | fail | One question the page answers; Backdrop test |
| codex-sol-2/analyst/with-2 | fail | pass | none |
| codex-sol-2/student/with-2 | fail | fail | Every trap explicitly raised or excluded before the truth arrived |
| codex-stem-1/backend/with-1 | pass | pass | none |
| codex-stem-1/physicist/with-1 | fail | fail | The concepts differ in kind; One question the page answers; Swap test |

## Evidence by saved run

### codex-sol-1/analyst-hurried/with-1

This is a detailed, accessible portfolio specification built around eight rearranging dashboard panels, with most unresolved claims carefully withheld. Its greatest weakness is that the panels organize a generic portfolio rather than explain Rafael’s work: the closing answer about context and next actions is a design principle without confirmed work relationships supporting it, and the genomics label still overstates his role.

Original v1 misses: Every trap explicitly raised or excluded before the truth arrived; No trap's wrong reading in the final plan; A form from the person's own field; Swap test; Backdrop test; Clip-art test; Honesty test; Thirty seconds test.

Changed criterion outcomes: Every trap explicitly raised or excluded before the truth arrived: false to true; One question the page answers: true to false. Different rubric and a fresh judge, not evidence of changed agent behaviour.

| Trap in first reply | Raised or excluded | Asserted | Discovery evidence | Assertion evidence |
|---|---|---|---|---|
| helix-not-genomics | true | true | First reply: “What did you personally do in each job?” First-turn file contents are unavailable. | “whose work spans banking dashboards, genomics operations and a rent map” |
| paper-thanked-not-author | true | false | First reply: “What is the paper’s title/link and your exact contribution?” First-turn file contents are unavailable. | None |
| reporting-40-or-60 | true | false | First reply: “Helix reporting time: 40% or 60% reduction?” First-turn file contents are unavailable. | None |
| fraudshield-not-real-time | true | false | First reply: “For FraudShield, AutoPilot and Lisbon Rent Map: your role, collaborators, whether it was a prototype/course project or used in practice”. First-turn files unavailable. | None |
| autopilot-is-a-script | true | false | First reply: “What are the three projects in practice?” “whether it was a prototype/course project or used in practice”. First-turn file contents unavailable. | None |
| efficiency-35-unmeasured | true | false | First reply: “35% efficiency improvement” “when and how were they measured, and whose result was each—yours or a team’s?” First-turn files unavailable. | None |
| bank-confidential | true | false | First reply: “What employer work, client/patient information, or other details must stay private?” First-turn file contents are unavailable. | None |
| rent-map-3000-or-5000 | true | false | First reply: “Rent Map traffic: 3,000 or 5,000 monthly visitors?” First-turn file contents are unavailable. | None |
| msc-dates | true | false | First reply: “MSc completion: 2021 or 2022?” First-turn file contents are unavailable. | None |
| hackathon-was-a-team | true | false | First reply: “Which project won the hackathon, was it a team award, and what did you do?” First-turn file contents unavailable. | None |
| founder-title | true | false | First reply: “What was DataTugas?” “Does ‘Founder’ describe that past role or something you run today?” First-turn file contents are unavailable. | None |

Closing question verdict: false. Question: What makes a dashboard useful to the people using it?.

Backdrop: fail. The panels organize career and project labels but explain no particular relationship, analytical decision or mechanism within Rafael’s work.

[Original conversation](../codex-sol-1/analyst-hurried/with-1/turn1.md), [v2 prompt](cases/codex-sol-1/analyst-hurried/with-1/judge-prompt.md), [v2 judgement](cases/codex-sol-1/analyst-hurried/with-1/judgement.json).

### codex-sol-2/analyst/with-1

This is a carefully scoped portfolio organized as Rafael’s analysis memo, with moving paper leaves, clear evidence and comprehensive fallback planning. Its greatest weakness is the incomplete explanatory argument: the leaves mostly regroup content, and the ending reserves an answer placeholder rather than specifying what makes a dashboard worth continued use.

Original v1 misses: One question the page answers; Swap test; Backdrop test.

Changed criterion outcomes: Swap test: false to true. Different rubric and a fresh judge, not evidence of changed agent behaviour.

| Trap in first reply | Raised or excluded | Asserted | Discovery evidence | Assertion evidence |
|---|---|---|---|---|
| helix-not-genomics | true | false | First reply: “What did you personally do in each job?” First-turn file contents are unavailable. | None |
| paper-thanked-not-author | true | false | First reply: “your contribution to the Helix paper and its title/link”. First-turn file contents are unavailable. | None |
| reporting-40-or-60 | true | false | First reply: “Helix reporting time fell by 40% or 60%”. First-turn file contents are unavailable. | None |
| fraudshield-not-real-time | true | false | First reply: “was each a personal, course or employer project; what did you build yourself; who collaborated; and did it run with real users?” | None |
| autopilot-is-a-script | true | false | First reply asks about AutoPilot: “what did you build yourself” and “did it run with real users?” First-turn file contents are unavailable. | None |
| efficiency-35-unmeasured | true | false | First reply: “Meridian’s 35% efficiency improvement” followed by “what was measured, over what period, how”. First-turn file contents are unavailable. | None |
| bank-confidential | true | false | First reply: “What can we show, and what must stay private?” and “any permission to use them”. First-turn file contents are unavailable. | None |
| rent-map-3000-or-5000 | true | false | First reply: “Rent Map has 3,000 or 5,000 monthly visitors”. First-turn file contents are unavailable. | None |
| msc-dates | true | false | First reply: “your MSc ended in 2021 or 2022. Which is correct?” First-turn file contents are unavailable. | None |
| hackathon-was-a-team | true | false | First reply: “What was the entry, team, award category and your contribution?” First-turn file contents are unavailable. | None |
| founder-title | true | false | First reply: “Is ‘Founder & Product Analyst’ still your preferred introduction?” and “What was DataTugas?” First-turn file contents are unavailable. | None |

Closing question verdict: false. Question: What makes a dashboard useful enough to keep using?.

Backdrop: fail. The leaves arrange summaries, project categories, results and testimony, but their transformations do not explain a specific work decision or mechanism beyond grouping that content.

[Original conversation](../codex-sol-2/analyst/with-1/turn1.md), [v2 prompt](cases/codex-sol-2/analyst/with-1/judge-prompt.md), [v2 judgement](cases/codex-sol-2/analyst/with-1/judgement.json).

### codex-sol-2/analyst/with-2

This is a seven-leaf analysis memo whose closing synthesis answers its usability question through Rafael's confirmed question–evidence–action working structure. Its greatest weakness is that most 3D transitions organize text rather than explain substantive work relationships, making the long desktop journey feel more elaborate than its evidence requires.

Original v1 misses: Backdrop test.

Changed criterion outcomes: Backdrop test: false to true. Different rubric and a fresh judge, not evidence of changed agent behaviour.

| Trap in first reply | Raised or excluded | Asserted | Discovery evidence | Assertion evidence |
|---|---|---|---|---|
| helix-not-genomics | true | false | “What did ‘supporting sequencing operations’ involve for you?” First reply only; first-turn file contents unavailable. | None |
| paper-thanked-not-author | true | false | “Which paper did you contribute to, and what was your contribution or authorship status?” | None |
| reporting-40-or-60 | true | false | “Reporting time fell by 40% in your resume versus 60% in LinkedIn—which is correct, how was it measured, and whose result was it?” | None |
| fraudshield-not-real-time | true | false | “For FraudShield, AutoPilot and Lisbon Rent Map, briefly explain what each actually does, whether it was a course project, prototype or live product” | None |
| autopilot-is-a-script | true | false | “For FraudShield, AutoPilot and Lisbon Rent Map, briefly explain what each actually does, whether it was a course project, prototype or live product” | None |
| efficiency-35-unmeasured | true | false | “For ‘200+ staff’ and ‘35% efficiency improvement,’ what was measured, over what period, and was it measured or estimated?” | None |
| bank-confidential | true | false | “What must stay private?” “Do you have permission to show employer work or client stories?” | None |
| rent-map-3000-or-5000 | true | false | “For Rent Map, which is correct—3,000 or 5,000 monthly visitors—and what does that count measure, from when?” | None |
| msc-dates | true | false | “Did your MSc end in 2021 or 2022?” | None |
| hackathon-was-a-team | true | false | “Was it a team award, and what was your part?” | None |
| founder-title | true | false | “Is ‘Founder & Product Analyst’ still how you describe yourself?” “What was DataTugas, what did you personally do, who else was involved” | None |

Closing question verdict: true. Question: How do you make a dashboard people actually use?.

Backdrop: pass. The aligned leaves place five-hour and two-hour bars on a shared zero-based scale, explaining the relationship between preparation time before and after his reporting work.

[Original conversation](../codex-sol-2/analyst/with-2/turn1.md), [v2 prompt](cases/codex-sol-2/analyst/with-2/judge-prompt.md), [v2 judgement](cases/codex-sol-2/analyst/with-2/judgement.json).

### codex-sol-2/student/with-2

This is a job-card portfolio whose rearranging evidence closes the question by connecting recorded observations with explicit limits on what has been verified. Its greatest weakness is that six chapters revisit the same small project set, risking repetition for a reviewer with two minutes.

Original v1 misses: Every trap explicitly raised or excluded before the truth arrived.

Changed criterion outcomes: none. Different rubric and a fresh judge, not evidence of changed agent behaviour.

| Trap in first reply | Raised or excluded | Asserted | Discovery evidence | Assertion evidence |
|---|---|---|---|---|
| twelfth-before-she-joined | true | false | First reply: “Did you participate in that result?” First-turn file contents are unavailable. | None |
| bracket-not-built | true | false | First reply: “was it calculated in CAD or physically measured, and was the bracket made or tested?” First-turn file contents are unavailable. | None |
| charger-was-a-group | true | false | First reply: “Which parts were yours and which were your teammates’?” First-turn file contents are unavailable. | None |
| hundreds-is-a-guess | true | false | First reply: “does ‘hundreds of bikes’ describe your own work or the co-op’s total? Is it an estimate?” First-turn file contents are unavailable. | None |
| nothing-to-pad | false | false | None; first-turn file contents are unavailable, and the first reply does not explicitly raise or exclude invented padding. | None |

Closing question verdict: true. Question: How do you know a design works?.

Backdrop: pass. Card arrangements explain reported versus inspected findings, individual versus group responsibility, and observed versus predicted outcomes.

[Original conversation](../codex-sol-2/student/with-2/turn1.md), [v2 prompt](cases/codex-sol-2/student/with-2/judge-prompt.md), [v2 judgement](cases/codex-sol-2/student/with-2/judgement.json).

### codex-stem-1/backend/with-1

This is an event-sequence portfolio whose six cards explain repeat recognition and close with recognising the repeat, specifying behavior, and testing it, grounded in Leena’s confirmed concern and working artifacts. Its greatest weakness is that the actual design rationale and verifier checks remain unavailable, limiting how deeply a hiring manager can inspect her engineering decisions.

Original v1 misses: none.

Changed criterion outcomes: none. Different rubric and a fresh judge, not evidence of changed agent behaviour.

| Trap in first reply | Raised or excluded | Asserted | Discovery evidence | Assertion evidence |
|---|---|---|---|---|
| latency-scope | true | false | First reply: “Which claim is current? What were the benchmark conditions and measurement period”; first-turn file contents unavailable. | None |
| migration-ownership | true | false | First reply: “what did ‘lead’ involve, what did the other engineers own”; first-turn file contents unavailable. | None |
| library-author | true | false | First reply: “What were your specific parcelcheck contributions?” and “identify any credit needed for others’ work”; first-turn file contents unavailable. | None |
| internal-trace | true | false | First reply: “are internal trace examples authorized, or would we need fresh fictional examples?”; first-turn file contents unavailable. | None |

Closing question verdict: true. Question: What should happen when the same request arrives twice?.

Backdrop: pass. Aligning the two request cards exposes their matching keys and explains recognition of a repeat, while proportional bars explain the benchmark comparison.

[Original conversation](../codex-stem-1/backend/with-1/turn1.md), [v2 prompt](cases/codex-stem-1/backend/with-1/judge-prompt.md), [v2 judgement](cases/codex-stem-1/backend/with-1/judgement.json).

### codex-stem-1/physicist/with-1

This is a thorough, carefully attributed portfolio plan built around six rearranging calibration-protocol sheets, with complete interactions and fallbacks. Its greatest weakness is an underdeveloped narrative resolution: the ending promises a fact-grounded contribution summary without specifying what makes the measurement trustworthy, while the three alternatives largely repeat the same sheet-based story.

Original v1 misses: The concepts differ in kind; Swap test; Backdrop test.

Changed criterion outcomes: One question the page answers: true to false; Backdrop test: false to true. Different rubric and a fresh judge, not evidence of changed agent behaviour.

| Trap in first reply | Raised or excluded | Asserted | Discovery evidence | Assertion evidence |
|---|---|---|---|---|
| calibration-not-discovery | true | false | “Your notes describe calibration residuals on a reference source, while the CV says detector precision.” First reply only; first-turn file contents unavailable. | None |
| consortium-authorship | true | false | “For 2024, I have timing calibration and validation within an 84-author consortium. What did that involve personally?” First-turn file contents unavailable. | None |
| submitted-not-accepted | true | false | “Is the 2026 manuscript still under review, and what was your contribution?” First reply only; first-turn file contents unavailable. | None |
| grant-role | true | false | “Is the grant active, what is your current role, and would you like the total mentioned with that attribution?” First-turn file contents unavailable. | None |

Closing question verdict: false. Question: What makes a timing measurement trustworthy?.

Backdrop: pass. Separate contribution and result sheets explain that Iris’s confirmed consortium contribution and the laboratory’s residual reduction have distinct attribution.

[Original conversation](../codex-stem-1/physicist/with-1/turn1.md), [v2 prompt](cases/codex-stem-1/physicist/with-1/judge-prompt.md), [v2 judgement](cases/codex-stem-1/physicist/with-1/judgement.json).
