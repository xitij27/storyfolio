# Three concepts for Ada Mensah

Status: proposed; no selection yet. Concepts are verbal plans only.

## Grounding and candidate forms

Premises confirmed in `facts.md`: Ada wrote Mosslink firmware, scheduled power states and built a bring-up fixture; her colleague designed the PCB and analogue front end. Her audience is firmware hiring managers. She wants to show how code connects to a measurable signal. Her documents are state tables, timing diagrams, current traces and bench checklists.

Candidate trade forms: state table, timing diagram, bench checklist, current-trace measurement record, bring-up log, power-budget spreadsheet. The three chosen forms come from Ada's stated working documents, rather than invented personal habits.

Shared boundaries: no invented waveform, state names, firmware listing, measured saving, completed fix, customer deployment or certification. No colleague circuit diagram. Any visual explanation without a source is explicitly illustrative and contains no purported measurement. Public asset permission covers the fixture photo and simplified power-state diagram; their contents still need to be seen. A current trace is a working document, not yet an approved public asset.

## A. Follow the transition — recommended

**Question:** How do firmware decisions become visible in a current trace?

**Form:** a state table, expanded into six chapters: Scope (name/question, role and dates); States (power-state scheduling); Events (failed-transmission observation from notes); Transitions (approved simplified diagram, with firmware/PCB responsibilities explicit); Observations (what the current trace revealed, with projection and bench limits); Notes (answer and email/CV).

**Object:** one six-row state-table sheet, rendered as six thin rectangular 3D strips. This is a visual interpretation of Ada's document, not a claim that her actual table has six rows. Faces carry sourced captions and portions of the approved diagram. Its origin is visible immediately: a readable state table labelled with her confirmed role in firmware and power scheduling.

**Three transformations:** in States, rows separate so the reader can inspect a state description; in Transitions, the same rows arrange into the simplified diagram's supported relationships; in Observations, rows align event/observation/limit captions so the relationship between a failed transmission and the awake-radio observation is readable. Do not invent the actual states or transition details before receiving the diagram.

**Opening:** Ada's name, question and a table assembling from its rows, with a short confirmed description of her Mosslink contribution, bench scope and email/CV access visible without scrolling.

**Close:** the rows reunite as a table. Proposed answer: “Firmware, power states, bench evidence.” The accompanying sentence uses confirmed responsibilities and the awake-radio observation, without claiming a fix. Email and corrected CV sit beside it.

**Stands on:** `facts.md` user answers on contribution, audience, daily documents, public diagram and bench scope; original notes on the failed-transmission observation.

**Needs:** approved simplified diagram; fixture photo optional. A public trace or confirmation of exact diagnostic/fix details is optional, not required to proceed with a qualitative observation.

**Why hers:** its central event is the Mosslink radio remaining awake after a failed transmission, with Ada's firmware responsibilities and bench limits stated precisely.

## B. Read across time

**Question:** How can a timing diagram connect firmware behaviour to a measurable signal?

**Form:** a timing diagram with six chapters: Context (name/question and listed role); Signals (her working documents and responsibility boundaries); Sequence (power-state scheduling and simplified diagram); Event (the failed-transmission observation); Measurement (bench readings, battery projection and 72-hour limit); Annotation (answer and contact).

**Object:** one timing-diagram sheet, divided into six long transparent 3D bands. Each band carries an annotation or approved diagram fragment. These are presentation bands, not claims about six actual device signals. No fabricated waveforms or timings.

**Three transformations:** in Signals, the bands fan out to expose firmware, fixture and hardware-attribution labels; in Event, they align around one textual event marker for the failed transmission; in Measurement, they align observations and assumptions in depth, making the difference between measured readings and projected battery life visible.

**Opening:** the diagram's annotation bands slide into alignment; Ada's name and firmware/fixture contribution remain readable beside them.

**Close:** bands return to a single annotated document. Proposed answer: “Align the firmware event with what the bench shows.” This expresses the site's explanation, not an unconfirmed claim that Ada performed a particular fix. Email/CV complete the page.

**Stands on:** `facts.md` user answers on timing diagrams, firmware, power scheduling and battery projection; original notes on awake-radio observation.

**Needs:** approved simplified diagram. A real timing diagram or trace would improve it but would need explicit public permission; without one, show labels and relationships only, with no imitation measurements.

**Why hers:** it centres the stated failed-transmission observation and separates Mosslink's measured currents from its endurance projection, rather than showing an anonymous animated waveform.

## C. At the bring-up bench

**Question:** What can a bring-up bench tell us about firmware on a new board?

**Form:** a bench checklist with six chapters: Scope (name/question and listed role); Setup (Ada's fixture and meaning of bring-up); Procedure (firmware and power-state scheduling); Observation (radio-left-awake note); Limits (six bench-tested samples, projection and unfinished qualification); Handover (answer, email and CV).

**Object:** one six-leaf checklist booklet. Its rectangular 3D leaves carry the public fixture photo, simplified diagram and factual captions. The booklet is a visual interpretation of her checklist practice, not an assertion about the format of her own checklist.

**Three transformations:** in Setup, leaves open into a labelled exhibit of Ada's fixture photo; in Procedure, they form an ordered document view connecting firmware responsibilities to the approved diagram; in Limits, they become evidence leaves with scope captions, with no success ticks implying completed tests or qualification.

**Opening:** the booklet opens on the fixture photograph and a plain definition: bring-up checks a new board's basic operation. Ada's contribution and contact are immediately visible.

**Close:** leaves close into a handover booklet. Proposed answer: “Basic operation, visible behaviour, stated limits.” Contact and corrected CV finish it.

**Stands on:** `facts.md` user answers on fixture ownership, photo permission, bring-up definition and test/qualification limits; original notes on bench checklists and radio observation.

**Needs:** approved fixture photo and simplified diagram. No PCB reconstruction, circuit diagram or employer test records required.

**Why hers:** the physical starting point is the fixture she built, and the page explicitly distinguishes her firmware/fixture work from her colleague's PCB work.

## Recommendation and checks

Choose A. It most directly joins Ada's power-state scheduling to the signal she wants hiring managers to understand. B puts more pressure on an unsupplied public timing/trace asset; C gives the fixture more prominence than the firmware.

All three keep one object throughout, use its faces to hold evidence and relationships, end with the object whole, and preserve plain text reading and immediate contact. Their first screen will show name, confirmed contribution, bench scope and email/CV access. Each has six chapters; none pads the story with testimonials, invented projects or history. Colours, opening copy and detailed motion remain for the storyboard after selection.

## Selection

Selected: A, Follow the transition. User: “Go with the one you recommend, and give me the whole plan. Still no building.” This approves the concept and authorizes the storyboard, not a build or the finished storyboard.
