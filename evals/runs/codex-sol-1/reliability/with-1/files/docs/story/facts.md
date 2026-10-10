# Dawit Bekele — fact sheet

Status: source statements recorded; user confirmation pending. These are not approved website claims.

## Identity and positioning

- F01: Dawit Bekele; Rotterdam, Netherlands; contact dawit@example.com. Sources: material/resume.md, heading; material/linkedin.md, heading; material/old-site.md, contact. Confirm whether the email is a placeholder and what contact to use.
- F02: Calls himself a Staff Platform Engineer focused on migrations, reliability and on-call. Source: material/linkedin.md, heading.
- F03: “I move systems that are not allowed to stop” and “I like migrations that are boring on the day.” Source: material/linkedin.md, About. Current site says “I keep things running.” Source: material/old-site.md. Opening language has not been selected.

## Employment and results

- F04: Staff Platform Engineer at Kestrel Freight, Rotterdam, August 2020–present. Sources: material/linkedin.md, Experience; material/resume.md, employment (2020–present). Confirm official title, current status and personal responsibilities.
- F05: Led migration of 310 services out of two data centres into the cloud over 26 months. Source: material/linkedin.md, Experience and About; material/resume.md says moved 310 services. Scope, measurement period and personal versus team ownership unconfirmed.
- F06: Resume says migration had “zero downtime”; LinkedIn says “99.98% availability through the migration.” Sources: material/resume.md, Kestrel first bullet; material/linkedin.md, Kestrel second bullet. These could measure different things; do not equate or choose between them without clarification.
- F07: Postgres 11→15 upgrade of a 4 TB orders database using dual writes. Source: material/resume.md, Kestrel second bullet. LinkedIn describes “across two major versions,” dual writes and no maintenance window. Source: material/linkedin.md, Kestrel third bullet. Actual version sequence, size basis, deployment status, collaborators and personal role unconfirmed.
- F08: Author of migration runbook: preflight, shadow, dual write, cutover, soak, decommission. Source: material/resume.md, Kestrel third bullet. Used by 40 teams according to material/linkedin.md, Kestrel fourth bullet. Authorship, adoption definition/date and permission to show employer content unconfirmed.
- F09: Reduced on-call pages by 74%. Source: material/resume.md, Kestrel fourth bullet. LinkedIn says on-call lead, pages per week from 85 to 22. Source: material/linkedin.md, Kestrel fifth bullet. Baseline, period, counting method, interventions and ownership unconfirmed.
- F10: Site Reliability Engineer at Lumen Pay, Amsterdam, March 2016–July 2020; on team running card authorisation path. Sources: material/linkedin.md, Experience; material/resume.md, Lumen role. Official title, actual personal work and shareable outcomes unconfirmed.
- F11: Systems Administrator at Entoto Technical University Library, Addis Ababa, 2013–2016. Sources: material/resume.md, employment; material/linkedin.md, Experience. Official title and actual personal work unconfirmed.

## Education, projects, speaking and skills

- F12: BSc Electrical Engineering, Entoto Technical University, 2009–2013. Source: material/linkedin.md, Education.
- F13: Maintainer of ferry; github.com/example/ferry. Source: material/resume.md, Open Source. LinkedIn calls it a command-line tool for dual-write cutovers with 1.2k GitHub stars. Source: material/linkedin.md, Projects. Actual URL, contributions/collaborators, real usage, public assets and date of star count unconfirmed.
- F14: “Boring Migrations,” SRE North 2024, video online. Sources: material/resume.md, Speaking; material/linkedin.md, Talks. URL, speaking role, recording ownership and reuse rights unconfirmed.
- F15: Existing site lists Linux, Kubernetes, Terraform, Postgres, Go, Python. Source: material/old-site.md, Skills. Site was made in 2019 and labels Dawit “SRE.” Source: material/old-site.md, introductory note and heading. Current relevance and desired disposition of old site unconfirmed.

## Assets and influences

- Material supplied: three Markdown text files. No photographs, project screens, diagrams, talk recording or other visual files supplied.
- No named book, person, formative failure or other influence supplied.
- No employer/client/colleague stories beyond role descriptions supplied. Public reuse permissions have not been established.

## Gaps

- Intended audience, desired end action and current professional objective.
- Personal responsibility and evidence behind the headline results.
- Daily work artifacts and rituals, in Dawit's own terms.
- Shareable project evidence, actual ferry/talk URLs and permitted assets.
- Influences and formative experiences.
- Content exclusions and publication boundaries.
- Real contact details and what should happen to the current site.

## Disagreements and ambiguities

- F06: “Zero downtime” versus “99.98% availability”; measurement scopes may differ.
- F07: Postgres 11→15 versus “across two major versions”; version sequence unclear.
- F03/F15: 2019 site says SRE; newer material says Staff Platform Engineer. Appears chronological, but desired current identity is not confirmed.
- F03/F05: LinkedIn About says “last four years,” although saved in October 2026 and employment begins August 2020. Avoid relative-time wording until dated.

## To confirm — first-stop questions

1. Who is the site for, what should visitors do at its end, and which current title/identity should it use?
2. Kestrel: confirm title/current role; explain your own work versus the team's in the 310-service migration; confirm 26 months and what zero downtime/99.98% each measure, over which period, and whether measured or estimated. Clarify the date behind “last four years.”
3. Database: explain personal contribution, collaborators, actual production use, version sequence, what 4 TB measures and when, and what “no maintenance window” means.
4. Runbook/on-call: confirm authorship and stages; what 40 teams measures and when; what changes you personally made to move weekly pages from 85 to 22, the comparison period and whether these are measured counts supporting 74%.
5. Earlier roles: confirm official titles/dates and describe your own work and any shareable outcomes at Lumen Pay and the library; confirm education and which listed skills remain current.
6. ferry: actual URL, what you built/maintain, other contributors, real usage, shareable evidence and whether the 1.2k-star count is current (with date).
7. Talk/assets: actual talk URL and speaking role; who owns the recording and any proposed photos, diagrams, screenshots or quotations; what employer materials may be shown and what must be excluded or anonymised.
8. What documents, lists and rituals do you work from day to day, using your names for them?
9. What did you learn from: a person, book, early mistake or experience you are comfortable sharing?
10. What should happen to the 2019 site, and is dawit@example.com a placeholder? What contact destination should be used?

## User answers

User supplied corrections and delegated unanswered design choices in the next conversation turn. The following supersede source wording; unanswered factual questions remain pending and cannot be guessed.

- U01 (F06): Resume's “zero downtime” is too strong. There were two internal incidents, each under ten minutes. Use measured 99.98% availability for the order API over the 26-month migration. Do not describe this as uninterrupted service or extrapolate to the whole company.
- U02 (F09): Weekly pages fell from 85 to 22 for the on-call team of nine over about a year. Half the reduction was deleting unnecessary alerts. Attribute this to “we,” not to Dawit alone. Do not turn “about a year” into an exact comparison window.
- U03 (F13): A former colleague created ferry. Dawit has maintained it since 2022 and wrote its cutover command. Production adoption, URL and star count remain unconfirmed.
- U04 (F08): Dawit wrote the first version of the runbook and still owns it. Forty teams use it. Internal text and diagrams are not cleared for reproduction.
- U05 (F10): Nothing from Lumen Pay may be shown or described beyond the LinkedIn line. No screens, operational details, inferred payment responsibilities or case study.
- U06: Kestrel talk and slides are public; internal diagrams are not. Link to public material when actual URLs are supplied. Public availability alone does not establish permission to embed or reproduce assets.
- U07: At the library in 2014, Dawit caused his first production outage by dropping a table. He tells that story at the start of the talk. This is why he cares about rollbacks. No recovery process, impact duration or affected people were supplied.
- U08: Going independent “next year”; wants companies facing a migration they fear to find him and write to him, and wants conference organisers too. Interpreting next year as 2027 from the session date is a planning assumption, not approved launch copy. Do not claim current consulting availability or offer a dated booking promise.
- U09 (F15): Old site can go; nothing that matters links to it. Replacement authorised at the planning level; no implementation requested.
- U10: Works from the runbook, cutover checklist and rollback plan. Uses a postmortem only when something has gone wrong. These are valid foundations for concepts; do not make an incident review the main story.
- U11: Influences: the Google SRE book and Release It! by Michael Nygard. No specific lesson from either was supplied.
- U12: “For anything I have not covered, use your judgement and tell me what you assumed. Carry on.” Design taste, concept selection and routine planning decisions delegated. Facts and asset ownership are not inferred.

## Outstanding facts after the answers

1. Real email, repository and talk/slides URLs; current title, dates and launch availability. Placeholders must not be published.
2. Migration count of 310 services and exact personal/team responsibility. The 26 months is confirmed via U01, but the service count was not explicitly confirmed. Exclude the count from planned proof.
3. Database version sequence, 4 TB basis, personal contribution, deployment context and maintenance-window claim. Exclude this case study for now.
4. Specific earlier-role responsibilities, education verification and current skills. Do not expand the Lumen LinkedIn line or print an unconfirmed full CV.
5. ferry's current star count, usage and collaborators beyond the creator/maintainer distinction. Omit adoption claims and stars.
6. Rights for any reproduction of public slides/recording, photographs, quotes or employer assets. Plan original explanatory graphics and outbound links; no asset reuse assumed.

Unanswered source claims remain in the original record above for traceability, but only confirmed U-lines support public-facing result claims. No testimonials were supplied.
