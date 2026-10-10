# Dawit Bekele — source facts

Status: read all three supplied material files. Source statements below retain their original wording for traceability; the user corrections and publication decisions below take precedence. No website has been built.

## Identity and positioning

- F01: Dawit Bekele; Rotterdam; dawit@example.com. Sources: material/resume.md, heading; material/linkedin.md, heading and location; material/old-site.md, contact. Confirm whether the email is a real public contact or a placeholder.
- F02: Staff Platform Engineer at Kestrel Freight; focus on migrations, reliability, on-call. Source: material/linkedin.md, heading.
- F03: Self-description: “I move systems that are not allowed to stop” and “I like migrations that are boring on the day.” Source: material/linkedin.md, About.
- F04: Existing site describes him as an SRE: “I keep things running.” Source: material/old-site.md. The supplied file says it is a one-page site made in 2019.

## Employment and results

- F05: Kestrel Freight, Staff Platform Engineer, Rotterdam, Aug 2020–present. Sources: material/linkedin.md, Experience; material/resume.md gives 2020–present. Confirm official title and personal responsibilities.
- F06: Resume says “Moved 310 services from on-premises data centres to the cloud with zero downtime.” LinkedIn says “Led the migration of 310 services out of two data centres, in 26 months” and reports “99.98% availability through the migration.” Sources: respective Kestrel entries. Confirm personal versus team ownership, dates, service count, availability scope and measurement, and what zero downtime means.
- F07: LinkedIn About describes the migration as work over “the last four years.” Source: material/linkedin.md, About (saved October 2026). Relationship to the 26-month migration and employment dates is unconfirmed.
- F08: Resume says Postgres 11 to 15 upgrade of a 4 TB orders database using dual writes. LinkedIn says a 4 TB Postgres upgrade “across two major versions” with dual writes and no maintenance window. Sources: Kestrel entries. Confirm versions, database size basis, production status, personal role, collaborators, and no-maintenance-window claim.
- F09: Author of company migration runbook; steps: preflight, shadow, dual write, cutover, soak, decommission. Source: material/resume.md, Kestrel entry. LinkedIn says it is now used by 40 teams. Source: material/linkedin.md, Kestrel entry. Confirm authorship/collaboration, current adoption count and definition, and permitted disclosures.
- F10: Resume says reduced on-call pages by 74%. LinkedIn identifies an on-call lead role and pages per week decreasing from 85 to 22. Sources: Kestrel entries. Confirm measurement windows, whether counts are averages, team attribution, personal contribution, and rounding (85 to 22 is approximately a 74% decrease).
- F11: Lumen Pay, Site Reliability Engineer, Amsterdam, Mar 2016–Jul 2020; on the team that ran the card authorisation path. Sources: material/linkedin.md, Experience; material/resume.md, Lumen entry. Confirm official title and actual personal work; no personal outcome is supplied.
- F12: Entoto Technical University Library, Systems Administrator, Addis Ababa, 2013–2016. Sources: material/linkedin.md, Experience; material/resume.md, library entry. Confirm title, responsibilities and any useful work example.

## Education, projects, speaking, skills

- F13: Entoto Technical University, BSc Electrical Engineering, 2009–2013. Source: material/linkedin.md, Education.
- F14: ferry: maintainer; command-line tool for dual-write cutovers; supplied link github.com/example/ferry; LinkedIn reports 1.2k GitHub stars. Sources: material/resume.md, Open Source; material/linkedin.md, Projects. Repository not fetched; link may be a placeholder. Confirm role, collaborators, actual use, public URL, and star count/date before using.
- F15: “Boring Migrations”, SRE North 2024; resume says video online. Sources: material/resume.md, Speaking; material/linkedin.md, Talks. URL, recording ownership, embed permission and exact speaker contribution are not supplied.
- F16: Linux, Kubernetes, Terraform, Postgres, Go, Python listed on old site. Source: material/old-site.md, Skills. Currency and present emphasis are unconfirmed.

## Assets and other people's material

- Only three text files were supplied. No photographs, diagrams, screenshots, 3D models, video files or testimonials are present.
- Runbook details and employer outcomes are described, but permission to show employer artifacts or detailed operational stories is unconfirmed.
- Talk recording is mentioned, but no usable link or rights information is provided.
- No specific patient, client or colleague story is supplied. No testimonial is supplied.

## Gaps

- Intended audience and desired visitor action.
- Personal role and collaborators for major results; measurement definitions and dates.
- Current daily working artifacts and rituals, in Dawit's own terminology.
- Influences or formative lessons.
- Public project and talk URLs; public contact confirmation.
- Approved visual evidence for work; disclosure and asset rights boundaries.
- Whether old-site skills and education should feature in the new site.
- What should happen to the existing site.

## Disagreements and ambiguities

- D01: Resume “zero downtime” versus LinkedIn “99.98% availability”; these may describe different measures but must not be equated without confirmation (F06).
- D02: Postgres 11→15 versus “across two major versions” (F08).
- D03: “last four years” versus 26-month migration and Aug 2020–present employment (F05–F07).
- D04: 74% versus 85→22 pages/week is compatible with rounding, but scope and time windows remain unknown (F10).
- D05: Current Staff Platform Engineer versus old site's SRE may reflect progression; current preferred identity and official titles need confirmation (F02, F04–F05).

## To confirm

Original question register, retained for traceability. Answer status is recorded below; silence does not confirm claims or rights.

1. Migration: personal role and collaborators; 310-service count, two data centres, 26-month dates; measured availability scope; meaning of zero downtime; relationship to “last four years” (F06–F07, D01, D03).
2. Database: correct versions, meaning of 4 TB, production status, personal contribution/collaborators, and no maintenance window (F08, D02).
3. Runbook: authorship, what 40 teams means/as of when, and what can be described or shown (F09).
4. On-call: measured or estimated result, measurement periods, averages or totals, personal/team attribution, work that caused the reduction (F10, D04).
5. Roles: official titles, preferred current description, and a personal-work sentence for each employer (F02, F04–F05, F11–F12, D05).
6. ferry: real URL, maintainership versus original authorship, collaborators, real-world use, star count/date (F14).
7. Talk and visuals: actual video URL, rights to link/embed, available images/diagrams/screens and who made them/what they show; employer permission and any people who appear (F15, Assets).
8. Audience and end-of-site action; confirm public contact address (F01).
9. What must not be shown, including employer/client details or people.
10. Daily documents, tools, lists and rituals in Dawit's own words; currency of the old skills list (F16).
11. Formative influence or lesson; whether to include education (F13).
12. What should happen to the old site (F04).

## User answers — 10 October 2026

Source for U01–U12: user's second message in this conversation.

- U01 / F06–F07: “Zero downtime” is too strong. Two incidents during the migration, each under ten minutes, both internal. Use measured 99.98% availability of the order API over the 26 months. Do not print zero downtime. Dates, personal migration leadership, 310 count and four-year phrasing remain unanswered and are omitted from planned claims.
- U02 / F10: 85→22 pages per week was the on-call team of nine, over about a year; half of it was deleting unnecessary alerts. User explicitly says to use “we”. Prefer the direct before/after count with attribution over a standalone 74% claim. Averaging method remains unspecified; do not call these weekly averages.
- U03 / F14: ferry was created by a former colleague. Dawit has maintained it since 2022 and wrote its cutover command. Do not claim original authorship. Actual repository URL, use in production and star count remain unconfirmed and are not planned as public claims.
- U04 / F09: Dawit wrote the runbook's first version and still owns it; 40 teams use it. Source material gives its six stage names. No internal document reproduction is authorized by this answer.
- U05 / F11: Nothing from Lumen Pay can be shown or described beyond the LinkedIn line. Restrict any mention to the existing SRE/card-payment-systems entry; no case study, screens or reconstructed operational detail.
- U06 / Assets: Kestrel talk and slides are public. Internal diagrams are not. Public status is not assumed to establish rights to reproduce or embed slides/video. Plan links when actual URLs are supplied; no internal diagrams.
- U07 / F12: First production outage Dawit caused was at the library in 2014: he dropped a table. He tells this story at the start of the talk. It is why he cares about rollbacks. Do not invent duration, impact, recovery procedure or affected people.
- U08 / Audience: Going independent next year; wants companies about to undertake a migration they fear to find him and write to him; conference organisers too. With the conversation dated 2026, next year means 2027 for planning, but no launch date or present consulting availability is asserted.
- U09 / F04: Old site can go; nothing that matters links to it. New site may replace it. Its URL is still unknown.
- U10 / Practice: Works from the runbook, cutover checklist and rollback plan. A postmortem only when something has gone wrong, “which is the point”. Do not make an incident-review form the main story.
- U11 / Influences: Google SRE book and Release It! by Michael Nygard. Textual mentions only; no book-cover assets needed.
- U12 / Delegation: “For anything I have not covered, use your judgement and tell me what you assumed. Carry on.” Authorizes choosing concept, look and routine planning decisions; does not turn unanswered factual questions into confirmed claims.

## Current answer status and remaining dependencies

- Answered or substantially answered: questions 1 (availability), 3 (runbook authorship/adoption), 4 (team attribution and timeframe), 6 (ferry role), 7 (disclosure boundaries), 8 (audience), 9 (employer boundaries), 10 (daily artifacts), 11 (influences), 12 (replacement).
- Unanswered and excluded from planned claims: question 2 (database versions/size/role), question 5 (title confirmation and extra job detail), migration service count/leadership/dates, precise GitHub star count, project production adoption, currency of skills list, education preference. Source-listed name and current role remain context; public role wording will use confirmed maintenance/runbook work rather than introduce an unconfirmed official title.
- Required before live publication: real public contact; actual ferry and talk/slides URLs if linked; actual domain/old URL for replacement; relevant legal business details when independent. No planning blocker.
- No photos, screenshots or employer artifacts are required by the selected concept. Any later addition needs provenance and permission.
