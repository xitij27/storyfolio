# Dawit Bekele — facts, awaiting confirmation

Sources: R = material/resume.md; L = material/linkedin.md (saved October 2026); O = material/old-site.md (2019 site text); N = material/project-notes.md (own notes, October 2026). These are source claims, not yet personal confirmation. No answers received.

## Identity and work
- Dawit Bekele; Staff Platform Engineer; migrations, databases, reliability; Rotterdam; dawit@example.com. [R,L] Old site calls him SRE and lists Linux, Kubernetes, Terraform, Postgres, Go, Python. [O] Confirm present title, contact and real links; example addresses are not verified destinations.
- Kestrel Freight, Rotterdam, Staff Platform Engineer, Aug 2020–present; platform team six; leads migrations and on-call. [R,L] Tools: Go, Python, Bash, Kubernetes, Terraform, Helm, Postgres, Kafka, metrics, tracing, SLO alerts. [R]
- Data-centre exit, Aug 2020–Oct 2022: leases ending; order intake and tracking support round-the-clock truck dispatch. Dawit wrote plan and sequencing; around 60 engineers; 310 services, two data centres, 14 dependency-based waves, 26 months, both sites closed on schedule. [N] Runbook: dependency map, rehearsed rollback, mirrored reads, stateful dual writes, weighted routing 1/10/50/100%, SLO monitoring, two-week soak. [N] R says managed Kubernetes/public cloud and zero downtime; N and L say Order API availability 99.98% during programme. Scope and individual/team attribution need confirmation; do not combine into an unqualified zero-downtime claim.
- Orders database, 2022: Postgres 11→15, 4 TB, writes every second, logical replication and ferry dual writes; hourly checksum comparison for three weeks; reads then writes moved; old cluster warm for a month; no maintenance window; Dawit led with one database engineer. [R,N] L calls this 'two major versions', inconsistent with version endpoints. Confirm endpoints and wording; avoid version-count claim.
- Runbook, 2021–now: preflight, shadow, dual write, cutover, soak, decommission; exit checks gate entry to next stage. Dawit wrote first version and owns it; used by 40 teams. [R,N,L] Confirm current count and what may be shown.
- On-call, 2021–2022: nine-person rota reviewed alerts, removed unactioned ones and replaced threshold alerts with SLO burn-rate alerts for key services; 85→22 pages/week after about a year. [N,L] R says reduced by 74%; raw counts imply rounded 74.1%. Team result, measurement windows and Dawit's own part need confirmation. Nine-person rota need not be same as six-person platform team; clarify if useful.
- Lumen Pay, Amsterdam, Site Reliability Engineer, Mar 2016–Jul 2020. On team running card authorisation path. [R,L] No specific responsibilities, stack, project or result supplied; do not infer payments expertise from employer name alone.
- Entoto Technical University Library, Addis Ababa, Systems Administrator, 2013–2016. Ran open-source catalogue, Perl/MySQL on Debian, about 30,000 records and 8,000 borrowers. [R] Dropped table in production in 2014 via cleanup script intended for staging; six-hour outage, restored nightly dump; day's loans re-entered from paper slips. Added binlog point-in-time recovery after 2014, primary/replica in 2015. [R,N] Confirm approximate count periods, personal responsibility, disclosure permission and wording of recovery expectations; 'minutes' is a goal, not measured recovery evidence.

## Study, open source and speaking
- BSc Electrical Engineering, Entoto Technical University, 2009–2013. Final project: microcontroller logger, campus-substation feeder load every second to SD card. [R,N] N says learned that data you cannot lose needs a second copy. Confirm individual/team role, whether built and used, any shareable work.
- ferry: Go CLI for dual-write cutovers; former colleague created in 2019; Dawit maintainer since 2022, wrote cutover command checking replication lag and checksum parity, switching write target, retaining fallback for set window. 1.2k stars. [R,L,N] github.com/example/ferry is unverified placeholder. Confirm authorship credit, current star count/date, actual URL and permission to discuss implementation.
- Boring Migrations, SRE North 2024, 30 minutes; video online. Covers runbook, rehearsed rollback, exit checks; opens with library incident. [R,N,L] Video URL, ownership and approved incident disclosure absent.
- No third-party quotes, photos, screenshots or other image files supplied. Working-picture descriptions in N: wave map/traffic curves; dual DB writes/checksums; six runbook gates; page-count decline; CLI switch/fallback. These are descriptions, not permission to reproduce employer diagrams or exact measurements.

## Gaps
- Intended audience and final action; exclusions and permissions; current title and useful contact/links.
- Places lived with years (job locations are not proof of residence); Lumen responsibilities, tools, concrete system and shareable outcome.
- Confirm work/study visual descriptions, what colleague would recognise, and rights to any real work assets.
- Additional formative influences, if wanted; old site's future.

## Disagreements
- Zero downtime [R] versus 99.98% Order API availability [L,N]: distinguish cutovers from overall programme if correct; unresolved.
- Postgres 11→15 [R,N] versus 'two major versions' [L]: unresolved.
- L says 'last four years' for migration, whereas N dates programme Aug 2020–Oct 2022. Use explicit confirmed dates instead of relative wording; confirm.
- Platform team six [R] and on-call rota nine [N]: potentially different groups; do not equate.

## To confirm
1. Audience, desired final visitor action, present role/contact/real links.
2. Metric scopes, time windows, measured vs estimated, team attribution: migration scale/availability and zero downtime; DB size/version endpoints/no maintenance window; runbook adoption; page counts and 74%; library scale; ferry stars/date. Confirm source details or correct exceptions.
3. Lumen own responsibilities, tools, concrete work, collaborators, result and one explanatory picture; what may be named or shown.
4. Permission for employer/project names, reconstructed technical diagrams and library incident; exclusions; ownership of any future imagery/video.
5. ferry credit, actual URL and public implementation details; talk video link and permission to link (not embed/reuse by default).
6. Residence years, missing chronology and education project contribution/use.
7. Day-to-day work names and explanatory pictures for each role/studies; whether N descriptions are accurate and safe to illustrate.
8. Learning influences and old-site disposition.

## User answers
Pending. User asked for planning and local working 3D scroll site, with guided decisions. Everything remains local; publishing is user's decision.

## Confirmations received — 2026-11-06

The user's second message overrides conflicting source claims:
- Audience: engineering leaders at companies planning a migration they fear, plus conference organisers. Going independent next year (2027 relative to current session); desired action is writing to Dawit. Do not imply independence has begun.
- Order API availability measured 99.98% over the 26-month migration. Two internal incidents, each under ten minutes. Remove zero-downtime claims.
- On-call team of nine achieved 85→22 pages/week over about a year. About half the reduction came from deleting unnecessary alerts. Use “we”, never individual attribution.
- ferry created by former colleague; maintained by Dawit since 2022; he wrote cutover command. Star count and real URL not confirmed: omit.
- Runbook: wrote first version, still owns it; 40 teams use it.
- Lumen: only LinkedIn line permitted: Site Reliability Engineer, Lumen Pay, Amsterdam, Mar 2016–Jul 2020; “Card payment systems.” No further description or illustration of its work.
- All material/project-notes.md is accurate and may be described and illustrated, including six runbook stages, 14 waves, dual writes/checksums and 2014 incident. This confirms its dates, scale, methods, results and role attribution. Degree logger details confirmed through these notes; no further individual/team or deployment claims.
- Library 2014 first production outage caused by Dawit dropping a table; public talk opens with it; it explains his concern for rollbacks. May tell it.
- BSc Electrical Engineering, Entoto Technical University, Addis Ababa, 2009–2013; ran library systems until 2016. Moved to Amsterdam in 2016 for Lumen and Rotterdam in 2020 for Kestrel. No unsupported residence start date in Addis Ababa.
- Names Dawit Bekele, Kestrel Freight, Lumen Pay (one line), Entoto Technical University and ferry approved for public wording. Site itself stays local.
- No internal Kestrel diagrams/screenshots/dashboards may be used. Own drawings only, labelled “Illustration”. Public talk/slides exist but do not download assets. No photos or slides supplied. No testimonials.
- Work documents: runbook, cutover checklist, rollback plan; postmortem only after something goes wrong. Formative reading: Google SRE book; Release It! by Michael Nygard.
- dawit@example.com approved example public contact, mailto link only; do not send. No confirmed repository/video URLs: omit external links until provided.
- Old site may be replaced; nothing needs keeping.
- Six work pieces requested, brief with more on click: data-centre exit, orders database, runbook, on-call, ferry, talk. No invented work, clients, figures or quotes.
- Printable HTML CV, available to download; English, ordinary navigation, share preview, site icon, useful 404. No blog/chat/translation/form. Legal/hosting deferred to publishing.
- Local system fonts and own geometry; no external asset purchase/download. No more skills to install. Omit any remaining unconfirmed fact.

## Remaining unresolved claims — omit
- Library record/borrower counts (only in resume), current formal title beyond source record, ferry star count/real URL, talk video URL, any actual recovery benchmark, degree project collaborators/deployment. Do not add unconfirmed facts to fill gaps.
