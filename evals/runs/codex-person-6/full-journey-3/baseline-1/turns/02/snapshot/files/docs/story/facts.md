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

## User answers — authoritative, received 2026-11-06

These answers supersede conflicting source statements above. All numbered open questions not answered here remain unconfirmed and their claims are omitted.

- Audience: engineering leaders planning a migration they fear, and conference organisers. Going independent next year; closing action is writing to Dawit.
- Migration: résumé's zero downtime is too strong and must not be used. Two internal incidents, each under ten minutes. Use measured 99.98% availability of the Order API over the 26-month programme.
- On-call: nine-person team's result, 85 to 22 pages/week over about a year. Half the effort was deleting unnecessary alerts. Say “we”; do not claim individual achievement or measured intermediate values.
- ferry: created by former colleague, maintained by Dawit since 2022; Dawit wrote cutover command. Star count and real repository remain unconfirmed, omit both.
- Runbook: Dawit wrote first version and still owns it; 40 teams use it.
- Lumen Pay: disclose only LinkedIn's one line, “Card payment systems,” plus listed role/location/dates. No additional description or illustration of their systems.
- Kestrel talk/slides public, internal diagrams not. No images or slides supplied; no downloads authorized.
- P (`material/project-notes.md`) belongs to Dawit, is accurate and may be described and illustrated in full, including six stages, 14 waves, dual writes/checksums and 2014 incident. Original drawings must be labelled illustration. No internal screenshots, dashboards or diagrams exist to show. This confirms database 4 TB, Postgres 11→15, led with one database engineer, no maintenance window; use that wording without expanding to uninterrupted operation. Do not repeat the unneeded support-timing explanation.
- 2014 was the first production outage Dawit caused: dropped a library table. Told publicly in his talk; why he cares about rollbacks. P's incident details approved for description.
- Public names permitted: Dawit Bekele, Kestrel Freight, Lumen Pay (one line only), Entoto Technical University, ferry.
- Places: studied Addis Ababa 2009–2013, ran library systems there until 2016; moved to Amsterdam in 2016 for Lumen Pay and Rotterdam in 2020 for Kestrel.
- Degree: BSc Electrical Engineering, Entoto Technical University, 2009–2013. P is accurate for logger project; do not infer sole authorship.
- Working materials: runbook, cutover checklist, rollback plan; postmortem when something goes wrong. Books: Google SRE book and Release It! by Michael Nygard. Do not download covers.
- Old site may be replaced; nothing important links to it.
- No testimonials, photographs or slides. Omit testimonial chapter.
- dawit@example.com is intentional public example contact; mailto link only, never send. Printable HTML CV requested, available to download.
- Six work items with concise summaries and more on click: data-centre exit, orders database, runbook, on-call, ferry, talk. No invented projects, clients, figures or quotes.
- English; normal navigation; share preview; site icon; useful missing page. No blog/chat/translations/form. Legal/hosting decisions deferred to publishing.
- Local system fonts and own geometry; no external asset downloads/purchases; no additional skills. Keep everything local.
- Current official title not explicitly answered; use “Platform engineer” as description rather than assert current official grade. Source roles may be listed in career chronology with source attribution; no expanded Lumen claims.
- Still unconfirmed and omit: star count, true repository/talk URLs, library catalogue/borrower counts (from R only), platform team size and relationship to rota, unsupported metric precision, residence before university, sole authorship of logger.
