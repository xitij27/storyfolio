# Dawit Bekele — source facts and confirmation

Status: first reading; user confirmation pending. Sources are material/*.md, supplied October 2026. No proposed site copy yet. Everything remains local; publishing is the user's decision.

## Identity, places and education
- Dawit Bekele; Staff Platform Engineer; Rotterdam; migrations, databases, reliability. Sources: resume.md heading, linkedin.md heading. Confirm formal title and current status.
- Work places: Addis Ababa (library, 2013–2016), Amsterdam (Lumen Pay, March 2016–July 2020), Rotterdam (Kestrel, August 2020–present). Sources: resume.md roles. These establish work locations, not residence dates; ask about places lived.
- BSc Electrical Engineering, Entoto Technical University, 2009–2013. Final-year microcontroller logger sampled campus substation feeder load every second to SD card. Sources: resume.md education, project-notes.md MY DEGREE. Notes attribute learning about second copies to this work. Confirm project authorship, practical use and what may be shown.

## Work
- Kestrel Freight: listed Staff Platform Engineer, August 2020–present; six-person platform team; leads migrations and on-call. Stack: Go, Python, Bash, Kubernetes, Terraform, Helm, Postgres, Kafka, metrics, tracing, SLO alerts. Source: resume.md Kestrel. Confirm title and permissions.
- Data-centre exit, August 2020–October 2022: leases ending; order intake and tracking needed continuous service. Dawit wrote and sequenced plan; dependency grouping into 14 waves; preflight dependency mapping and rollback rehearsal, shadow reads, dual writes for state, weighted routing at 1/10/50/100%, SLO observation, two-week soak. 310 services, two data centres, managed Kubernetes in public cloud, 26 months, about 60 engineers. Both centres closed on schedule. Sources: project-notes.md DATA-CENTRE EXIT; resume.md. Notes specify 99.98% Order API availability over programme; resume says zero downtime; LinkedIn omits metric scope. Do not equate these. Ask scope, measurement and attribution of each result.
- Orders database, 2022: 4 TB; Postgres 11 to 15; logical replication and ferry application dual writes; hourly checksum job for three weeks, reads then writes switched, old cluster warm for month. Led with one database engineer, no maintenance window. Sources: project-notes.md ORDERS DATABASE, resume.md. LinkedIn says across two major versions; resolve wording. Ask measured size/time, precise personal work and permission.
- Runbook, 2021–present: first version written and owned by Dawit; six gated stages: preflight, shadow, dual write, cutover, soak, decommission. Used by 40 teams. Source: project-notes.md RUNBOOK; resume.md. Ask what 40 measures/as of when and permission to describe gates.
- On-call, 2021–2022: nine rota members reviewed alerts, removed unactionable alerts, introduced SLO burn-rate alerts. 85 to 22 pages/week after about a year. Source: project-notes.md ON-CALL. Resume says reduced by 74%; LinkedIn calls Dawit lead. Team result; ask averages, period, scope and Dawit's contribution. Do not claim individual 74% result.
- Lumen Pay: Site Reliability Engineer, Amsterdam, March 2016–July 2020; on team running card authorisation path. Sources: resume.md, linkedin.md. Personal responsibilities, tools, example and outcome absent. Do not infer payments specialty from employer alone.
- Entoto Technical University Library: Systems Administrator, Addis Ababa, 2013–2016; Debian, Perl/MySQL open-source catalogue; about 30,000 records, 8,000 borrowers; physical server to primary and replica in 2015; dumps and binary-log point-in-time recovery. Source: resume.md. Notes: first production system run; cleanup script dropped production table instead of staging in 2014; catalogue down six hours, restored nightly dump, day of loans re-entered from paper; recovery added after error and replica in 2015. Source: project-notes.md BORING MIGRATIONS and LIBRARY. Confirm permission to tell incident, figures, duties and timeline of nightly backups.

## Open source and speaking
- ferry: Go CLI for dual-write cutovers; former colleague created in 2019; Dawit maintainer since 2022, wrote cutover command checking lag/parity, switching write target and keeping fallback window. 1.2k stars. Sources: project-notes.md FERRY, resume.md, linkedin.md. Ask star-count date, sole/co-maintainer, repository address; supplied github.com/example/ferry is unverified. Do not present as original author.
- Boring Migrations, SRE North 2024, 30 minutes, video online. Sources: all three profile sources. Notes describe rollback, exit checks and library incident. Ask actual video URL, ownership/embedding permissions and incident clearance.

## Existing site and assets
- old-site.md: 2019 one-page site calls Dawit an SRE, says “I keep things running”; skills Linux, Kubernetes, Terraform, Postgres, Go, Python; dawit@example.com. Resume repeats email. Ask whether address is placeholder and what becomes of old site. No domain or actual images supplied.
- Notes describe possible explanatory pictures for each Kestrel project and ferry; these are descriptions, not supplied employer screenshots or measured chart datasets. Ask permission for original illustrative diagrams and whether any real artefacts can be used.
- No photographs, drawings, endorsements or external quotes supplied. Do not invent any.

## Gaps
- Audience, desired end action, exclusions, residence history, current role confirmation.
- Lumen personal contribution and recognisable work example.
- Degree project authorship/use; real contact/repository/video URLs; old-site disposition.
- Asset permissions and diagram confidentiality; metrics definitions/measurement dates.

## Disagreements
- “zero downtime” in resume versus 99.98% Order API programme availability in notes. May have different scopes; user must resolve.
- LinkedIn “across two major versions” versus explicit Postgres 11 to 15 in notes/resume. Use no version-count claim before answer.
- Personal “reduced ... 74%” in resume versus nine-person team result in notes. Confirm personal part.
- Old site “SRE” versus current Staff Platform Engineer. Could reflect 2019; confirm current preferred title.

## To confirm
1. Audience and final visitor action; real contact/link destinations; what becomes of 2019 site.
2. Current/formal title; job/study dates; places lived with years; day-to-day work in own words.
3. Availability scope, measurement, attribution, downtime wording; project counts/time confirmation.
4. Database version wording, size measurement, no-maintenance-window claim, personal role.
5. Runbook usage date/meaning; on-call measurement windows/scope and personal versus team credit.
6. Lumen work/tools/outcome; library incident clearance, scale/time and recovery timeline.
7. ferry authorship/maintainership, star date; degree project team/use; talk link and permissions.
8. What must not be shown; permission for named employers, metrics, abstract diagrams; rights for any supplied later assets.
9. Working pictures for Lumen, library and studies; corrections to notes' Kestrel/ferry pictures; formative influences beyond supplied degree/incident.

## User answers
Pending. Unanswered items remain unresolved.
