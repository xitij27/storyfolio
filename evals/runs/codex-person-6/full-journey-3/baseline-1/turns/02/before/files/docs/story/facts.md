# Dawit Bekele — source fact sheet

Status: first read; no answers received. Source statements below are not blanket approval for site claims. Questions remain unresolved.

Sources: `material/resume.md` (R), `material/linkedin.md` (L, saved October 2026), `material/project-notes.md` (P, October 2026), `material/old-site.md` (O, 2019).

## Identity, places and education

- Dawit Bekele; Staff Platform Engineer; Rotterdam; migrations, databases, reliability (R, L). Confirm current official title. L describes “systems that are not allowed to stop”; this is profile language, not proof of uninterrupted service.
- Addis Ababa: library employment 2013–2016 (R); Amsterdam: Lumen Pay March 2016–July 2020 (R, L); Rotterdam: Kestrel August 2020–present (R, L). These are work locations, not confirmed residence history.
- BSc Electrical Engineering, Entoto Technical University, 2009–2013 (R, L). Final-year microcontroller project logged campus substation feeder load every second to an SD card (R, P). P says it taught him that data needs a second copy. Individual/team contribution, real operation and shareable illustration need confirmation; no claim that the logger itself had redundancy.
- Email dawit@example.com (R, O); likely placeholder, verify. No portrait or other visual assets supplied.

## Kestrel Freight

- Staff Platform Engineer, Rotterdam, August 2020–present; platform team of six; leads migrations and on-call (R). Freight order intake, tracking and route planning describes employer systems, not automatically Dawit's individual work (R).
- Stack: Go, Python, Bash, Kubernetes, Terraform, Helm, Postgres, Kafka, metrics, tracing, SLO alerting (R). O also lists Linux. Confirm present daily tools.
- Data-centre exit, August 2020–October 2022: leases ending in late 2022; 310 services; order intake/tracking used for dispatch around the clock (P). Dawit wrote plan and sequence; about 60 engineers across teams; 14 dependency-based waves over 26 months (P). Both sites closed on schedule (P). R specifies managed Kubernetes in a public cloud; P describes destination as one cluster.
- Procedure: dependency map and rehearsed rollback in preflight, mirrored read traffic in shadow, dual writes for state, weighted routing at 1/10/50/100%, SLO monitoring, two-week soak before old instances off (P). P's picture suggestion: wave map and crossing request rates with flat error rate; no actual metric series supplied, so flat errors must not become an evidenced chart.
- Result: 99.98% Order API availability through programme (P); L says availability through migration, without scope; R says zero downtime. Confirm measurement/window, team attribution and precise downtime claim before use.
- Orders database, 2022: 4 TB, Postgres 11 to 15 (R, P). P says 11 was going out of support; check timing/context rather than assert. L calls this “across two major versions,” inconsistent with versions in R/P.
- New Postgres 15 cluster via logical replication; application dual writes through ferry; hourly checksum for three weeks; reads then writes moved; old cluster warm for one month (P). Led with one database engineer; no maintenance window (P). Confirm shared credit and whether planned window versus actual interruption. Picture suggestion: writes fan to two databases, checksum parity, old target goes dark (P).
- Runbook, 2021–present: first version written and owned by Dawit; six stages preflight, shadow, dual write, cutover, soak, decommission; exit checks gate progress (P, R). 40 teams use it (P, R, L). Confirm adoption definition/as-of date. Picture suggestion: service passes six gates (P).
- On-call, 2021–2022: nine-person rota reviewed alerts, removed unactionable alerts, replaced thresholds with SLO burn-rate alerts on key services (P). Weekly pages 85 to 22 after about a year (P, L); R attributes “reduced ... by 74%” to Dawit. Verify averages/windows and own contribution; credit team. P's picture suggestion: falling weekly count, but only endpoints supplied. Six-person platform team versus nine-person rota may be distinct; confirm.

## Other employment

- Lumen Pay, Site Reliability Engineer, Amsterdam, March 2016–July 2020; on team running card authorisation path (R, L). Personal responsibilities, stack, a concrete example and permitted disclosures missing. Do not infer a speciality or achievements from employer name.
- Entoto Technical University Library, Systems Administrator, Addis Ababa, 2013–2016 (R, L). Open-source Perl/MySQL catalogue on Debian; about 30,000 records and 8,000 borrowers; one physical server to primary plus replica in 2015; nightly dumps and binary-log point-in-time recovery (R).
- P recounts 2014 production-table deletion by cleanup script intended for staging: six-hour outage, restore from nightly dump, a day of loans re-entered from paper. P says added binary-log recovery after incident and replica in 2015. Confirm numbers, scope and permission to tell identifiable institutional story. Do not assert outcome of a later failure; “minutes, not a day” is a stated aim, not measured recovery.

## Open source and speaking

- ferry: Go CLI for dual-write cutovers (R, L, P); former colleague originally wrote it in 2019; Dawit maintainer since 2022 and author of cutover command (P). Command checks lag and checksum parity, switches write target, keeps fallback window (P). Confirm attribution, current stars/date (1.2k in L/P) and real repo URL; R's github.com/example/ferry appears placeholder. No evidence of authoring whole tool.
- “Boring Migrations,” SRE North 2024, 30 minutes, video online (R, P). Runbook, rehearsed rollback and exit checks, opens with library incident (P). Video URL and rights absent; no third-party quote supplied.

## Existing site and assets

- 2019 one-page site: “Dawit Bekele. SRE.” / “I keep things running.”; skills and placeholder email (O). User must choose what happens to it.
- P gives working-picture descriptions for migration, database, runbook, alerts and ferry. These are descriptions, not supplied images, recorded telemetry or employer permission. Ask whether original schematic illustrations using these details are permitted and which names/values may appear. Do not plan employer screenshots, diagrams, recordings or others' work before permission.

## Gaps

- Intended audience and final action; exclusions; residence history; current contact and public links.
- Lumen Pay's own work, tools and example; title confirmation; degree project collaboration/operation.
- Metrics' definitions, windows, ownership, permitted disclosure; visual rights; library story permission.
- Influences beyond degree/library notes; current-site disposition.

## Disagreements

- R's zero downtime vs P's 99.98% Order API availability: may be different measures, unresolved.
- L's “two major versions” vs R/P's Postgres 11 to 15.
- R's individual on-call reduction vs P's nine-person effort.
- Six-person platform team (R), nine-person rota (P): relationship unresolved.
- Old SRE title (O, 2019) versus current Staff Platform Engineer (R/L): likely chronology; confirm official current title.

## To confirm

1. Audience, desired closing action, usable contact/repository/talk links.
2. Data-centre migration attribution and metric/window; resolve zero downtime wording.
3. Postgres version wording, 4 TB meaning/date, individual contribution, maintenance-window versus interruption claim, support context.
4. Runbook 40-team count/date; alert averages/windows/own contribution; six/nine relationship.
5. Current official title; Lumen Pay work, stack and recognisable picture.
6. Residence dates; degree project team/operation and concrete working picture; library counts/date.
7. ferry attribution/stars/date/link.
8. Employer names/details/metrics allowed, original schematic permission, any forbidden details or third-party assets.
9. Library incident accuracy and permission to tell it; influences/lessons.
10. Current daily work/tools, desired working pictures or corrections to notes, existing-site fate.

Answers: pending. No unanswered question counts as approval.
