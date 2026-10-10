# Fact sheet — Ada Mensah

Status: Ada supplied corrections and direction. The user-confirmed facts below supersede conflicting source wording. Original source review is retained for provenance.

## Identity and work

- Name: Ada Mensah. Source: `material/cv.md`, heading.
- Listed role: embedded systems engineer at Reedglass Sensing, 2021 to present. Source: `material/cv.md`. To confirm: whether this is the official title and whether role and dates remain current; personal responsibilities beyond Mosslink.
- Seeking embedded firmware roles involving physical devices. Source: `material/cv.md`. To confirm: intended site audience and final visitor action.
- Contact listed: ada@example.com. Source: `material/cv.md`. To confirm: whether this is the public contact to use.
- Tools: C, oscilloscopes, logic analysers, board bring-up. Source: `material/cv.md`.

## Mosslink

- Environmental sensor. Source: `material/cv.md`.
- CV says Ada owned low-power sensor design, bring-up and verification. Source: `material/cv.md`. To confirm: precise personal contribution, collaborators' contributions, and whether firmware was part of Ada's work.
- CV says “two-year battery life.” Source: `material/cv.md`. Notes say the spreadsheet uses measured sleep and transmit current with an assumed reporting interval, and the longest continuous notebook run is 72 hours. Source: `material/lab-notes.md`. Do not describe two years as demonstrated runtime. To confirm: whether this is a modelled estimate, assumptions, and whose measurements/model it is.
- CV says “forty-unit pilot.” Source: `material/cv.md`. Notes say forty engineering samples were assembled and six appear in the bench log. Source: `material/lab-notes.md`. Deployment and verification of forty units are not established. To confirm: assembled/tested/deployed counts, actual use, and Ada's contribution.
- CV says “Qualification: emissions pass.” Source: `material/cv.md`. Notes identify a preliminary emissions report. Source: `material/lab-notes.md`. Final qualification is not established. To confirm: what passed, preliminary versus final status, and Ada's part.
- Ada identifies an interesting state transition that left the radio awake after a failed transmission; a current trace made it visible. Source: `material/lab-notes.md`. To confirm: whether Ada diagnosed/fixed it, measured outcome, and whether a public account is allowed. No fix or outcome is established yet.
- Notes refer to a project photo showing a PCB, Ada's test fixture, and a colleague's circuit diagram. Source: `material/lab-notes.md`. The photo itself is not supplied. To confirm: photographer, ownership, employer permission, colleague's permission for diagram, and which artifacts can be shown or recreated.
- Project's operational status and collaborators are not established. Sources: both material files. To confirm.

## Working practice and influences

- Uses state tables, timing diagrams and bench checklists. Source: `material/lab-notes.md`.
- No old portfolio. Source: `material/lab-notes.md`.
- No learning influences or formative experiences supplied.
- No testimonials supplied.

## Gaps

- Target audience and desired visitor action.
- Precise project contribution and operational status.
- Publicly usable artifacts: the referenced photo, trace, diagram and report are not supplied.
- Confirmed results and conditions for each numerical claim.
- Learning influences, public contact, and disclosure limits.

## Disagreements

- Two-year battery-life wording versus model assumptions and 72-hour continuous run.
- Forty-unit pilot wording versus forty assembled engineering samples and six in the bench log.
- Emissions pass wording versus preliminary report.

## Original source-review questions

1. Is the listed role/title official and current, are the dates correct, and what did Ada personally do at Reedglass and on Mosslink? Include firmware/design/verification scope, collaborators, and whether Mosslink was deployed or remained engineering samples.
2. Is two years a modelled estimate? What reporting interval, battery capacity, and other conditions apply? Who measured the currents and made the model, and what does the 72-hour run establish?
3. Of forty assembled samples, how many were tested and deployed? What does the six-unit bench log represent, and what was Ada's part?
4. What does the preliminary emissions report establish? Was there a final qualification pass, and what was Ada's role?
5. What was Ada's part in finding and resolving the radio-awake transition, what outcome is supported, and may this story be public?
6. Who took the photo, and what employer/colleague permission exists for the PCB, fixture, diagram, trace and report? Which can be shown or recreated?
7. Who is the site for, and what should a visitor do at the end? Is ada@example.com the public contact?
8. What must not be shown or named?
9. Are state tables, timing diagrams and bench checklists the central daily artifacts; what other named documents or rituals matter?
10. What did Ada learn from: a person, book, failure, or formative experience?

## User-confirmed facts — authoritative

Source for every item in this section: Ada's reply in this conversation.

- Battery: two years is a projection from bench current readings and an assumed reporting cycle. Longest run was 72 hours. No field endurance or weather testing supports a two-year claim. Do not describe it as demonstrated runtime.
- Contribution: Ada wrote the firmware, scheduled the power states and built the bring-up fixture. A colleague designed the PCB and analogue front end. “Owned the sensor design” blurs the division and must not be used to describe Ada's role.
- Qualification: one preliminary emissions check passed. Full qualification is unfinished. Do not describe the device as certified or qualified.
- Samples: forty engineering samples assembled; six tested on the bench; none went to customers. No field pilot or product launch.
- Permitted artifacts: Ada's own test-fixture photo and a simplified power-state diagram have permission for public use. The colleague's circuit diagram does not and is excluded.
- Audience and purpose: a firmware hiring manager should understand how Ada connects code to a measurable signal.
- Daily working documents: state table, timing diagram and current trace. Bring-up means checking a new board's basic operation.
- Closing actions: email and a downloadable CV are sufficient.
- No old site and no testimonials.

## Remaining gaps and unresolved questions

- Role's official/current title and dates remain sourced to the CV, not explicitly reconfirmed. Do not expand this into an unconfirmed account of employment history.
- Whether Ada personally diagnosed or fixed the radio-awake issue, its outcome, and permission to publish that incident remain unanswered. Concepts must not rely on resolution or ownership of this incident.
- Exact battery/model assumptions, ownership of the measurements/model, and meaning of the 72-hour run remain unspecified. Use only the confirmed limits above, not inferred details.
- The public-use photo and simplified diagram are described but not supplied in the material folder.
- Public use of actual traces, reports, employer firmware or other assets has not been granted. Do not plan to reproduce them; explanatory graphics must be clearly labelled and contain no invented measurements or private code.
- Exact public email address and final corrected CV file remain to be confirmed before a build/publishing handover.
- Other disclosure limits and learning influences remain unanswered. Concepts do not depend on them.
