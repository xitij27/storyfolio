# Dawit Bekele — source facts, awaiting confirmation

Read 31 October 2026. Sources: material/resume.md (R), linkedin.md (L), project-notes.md (N), old-site.md (O). No user answers received yet. Listed facts are source statements, not blanket approval to publish.

## Identity, places, education
- Dawit Bekele; Staff Platform Engineer; Rotterdam, Netherlands. Contact dawit@example.com (R, L, O); confirm real address before enabling contact.
- Work locations: Addis Ababa, 2013–2016; Amsterdam, March 2016–July 2020; Rotterdam, August 2020–present (R). Residence dates are unknown.
- BSc Electrical Engineering, Entoto Technical University, 2009–2013 (R, L). Final-year microcontroller project sampled campus substation feeder load every second to SD card (R, N). N says this taught the importance of a second copy. Collaboration, implementation details and permissions unresolved.

## Employment and projects
- Kestrel Freight, Staff Platform Engineer, August 2020–present, Rotterdam (R, L). Platform team of six; leads migrations and on-call (R). Official title to confirm. Stack: Go, Python, Bash, Kubernetes, Terraform, Helm, Postgres, Kafka, metrics, tracing and SLO alerts (R).
- Data-centre exit, August 2020–October 2022 (N): leases ending late 2022; 310 services serving order intake and shipment tracking. Dawit wrote and sequenced the plan; approximately 60 engineers across teams delivered 14 dependency-grouped waves in 26 months. Preflight included dependency mapping and rehearsed rollback; mirrored reads, dual writes for state, weighted routing at 1/10/50/100 percent, SLO observation, two-week soak. Both sites closed on schedule. Order API programme availability 99.98% (N). R says zero downtime; those claims need reconciliation before use. N describes a wave map and request-rate curves; these are picture descriptions, not supplied telemetry or assets. Employer permission unresolved.
- Orders database, 2022 (N): 4 TB, Postgres 11 to 15, logical replication and ferry dual writes, hourly checksum comparison over three weeks; reads then writes moved; previous cluster kept warm one month. Dawit led with one database engineer; no maintenance window (N). R agrees on versions; L says two major versions. Actual versions, measurements and display permission unresolved. N describes fan-out writes, checksum agreement, old database darkening.
- Runbook, 2021–present (N): Dawit wrote first version and owns it; six gated stages: preflight, shadow, dual write, cutover, soak, decommission. Forty teams use it (R, L, N). Scope/date of adoption and permission unresolved. N describes a service stopping at each gate.
- On-call, 2021–2022 (N): nine rota members reviewed alerts, removed unactionable alerts and introduced SLO burn-rate alerts. Weekly pages went from 85 to 22 after approximately a year (L, N); R reports 74% reduction. Team result; Dawit's specific contribution and count methodology unresolved. Platform team of six versus rota of nine may describe different groups; confirm. N describes falling weekly counts, not an actual supplied time series.
- Lumen Pay, SRE, Amsterdam, March 2016–July 2020 (R, L): on team running card authorisation path. Personal duties, tools, scale and outcomes unknown; employer name alone does not establish them.
- Entoto Technical University Library, Systems Administrator, Addis Ababa, 2013–2016 (R): Debian, Perl/MySQL open-source catalogue, approximately 30,000 records and 8,000 borrowers; moved one server to primary/replica in 2015; nightly dumps and binary-log recovery. N: first production system; accidentally dropped a table in 2014 with a production-targeted cleanup script; six-hour outage; restored nightly dump, day's loans re-entered from paper; added point-in-time recovery after incident. Public retelling permission, metric basis and identification limits unresolved.
- ferry, Go CLI for dual-write cutovers, maintainer since 2022 (N). Former colleague authored it in 2019; Dawit maintains it and wrote cutover command (lag/parity checks, switches write target, retains fallback). 1.2k stars (L, N), date and actual link unresolved; R gives github.com/example/ferry. No claim of original authorship permitted. Picture description: command switches write path, fallback open (N).
- Boring Migrations, SRE North 2024, thirty minutes (R, N); video said to be online, URL absent. Runbook, rollback rehearsal and exit checks; opens with 2014 library incident (N). Talk and quotation reuse permissions unresolved.
- Existing 2019 one-page site: “Dawit Bekele. SRE.” / “I keep things running.”; Linux, Kubernetes, Terraform, Postgres, Go, Python; dawit@example.com (O). Its future is the user's decision.

## Other material
- No photographs, screenshots, drawings, actual operational data, endorsements or third-party quotes supplied. Work-picture descriptions exist in N; do not treat them as permission for employer content.
- Learning sources: library incident and final-year data logger (N); any other person/book/source unknown.

## Gaps
- Target audience, desired next action, exclusions, old-site disposition, real contact/project/talk links.
- Residence history, official titles, Lumen duties/stack/results; study project collaborators and recognizable picture; permission boundaries.
- Personal on-call role, metric definitions and attribution, project assets and rights.

## Disagreements
- Zero downtime (R) versus 99.98% Order API availability (L, N): different scopes possible, not established.
- Postgres 11→15 (R, N) versus “two major versions” (L).
- L says “last four years”; actual migration dates in N are August 2020–October 2022. Do not repeat relative timeframe.
- Six-person platform team (R), nine-person rota (N): scope unknown.

## To confirm
1. Audience, desired end action, exclusions, and old-site future.
2. Availability/downtime scope, measurement period and team attribution; migration dates.
3. Database versions and whether no maintenance window is the accurate outcome; no inferred zero errors.
4. On-call role, rota scope, average versus snapshot counts and measurement window.
5. Forty-team adoption date/scope; 1.2k-star date and real links/contact.
6. Official roles; Lumen duties/tools/outcomes and useful working picture.
7. Residence dates; study-project ownership, tools and picture; missing everyday work details.
8. Employer content and library-incident permission; third-party collaborators/identities; available assets and rights.
9. Additional learning influences, or permission to use the documented ones.

## User answers
Pending. No concept or design chosen.
