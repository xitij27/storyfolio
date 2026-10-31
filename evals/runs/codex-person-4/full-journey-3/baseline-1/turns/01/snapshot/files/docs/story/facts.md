# Dawit Bekele — source facts and questions

Status: first reading, awaiting Dawit's answers. No concept or public copy approved.
Sources: R = material/resume.md; L = material/linkedin.md; P = material/project-notes.md; O = material/old-site.md. All four supplied files read; no other personal sources accessed.

## Identity, places and education
- Dawit Bekele; Staff Platform Engineer, Kestrel Freight; Rotterdam. [R,L] Confirm official title and present status.
- Work locations: Addis Ababa 2013–2016; Amsterdam March 2016–July 2020; Rotterdam August 2020–present. [R,L] These are work locations, not established residence dates. Residence history unanswered.
- BSc Electrical Engineering, Entoto Technical University, 2009–2013. [R,L]
- Final-year microcontroller project recorded campus substation feeder load every second to an SD card. [R,P] P describes learning that data needs a second copy. Team, personal contribution and demonstration/deployment status unanswered.
- Contact dawit@example.com [R,O]; ferry URL github.com/example/ferry [R]. Both appear to be placeholders; do not enable without confirmation. Talk video is described as online [R] but no URL supplied.

## Kestrel Freight
- Staff Platform Engineer, August 2020–present, Rotterdam. Platform team of six; leads migrations and on-call. [R,L] Day-to-day work and official title to confirm.
- Stack: Go, Python, Bash, Kubernetes, Terraform, Helm, Postgres, Kafka, metrics, tracing, SLO-based alerting. [R] O also lists Linux.
- Data-centre exit, August 2020–October 2022: expiring leases; order intake and shipment tracking support around-the-clock truck dispatch. Dawit wrote and sequenced the plan. 310 services, two data centres, 14 dependency-based waves, 26 months, about 60 engineers across teams. Both centres closed on schedule. [P] R specifies managed Kubernetes in a public cloud; provider unspecified.
- Cutover process: dependency map and rollback rehearsal; mirrored reads; dual writes for state; weighted routing 1%, 10%, 50%, 100%, observed against service SLO; two-week soak before old instances switched off. [P] These are process steps, not measured traffic samples.
- Order API availability through programme: 99.98%. [P] L says 99.98% availability through migration, without scope. R says zero downtime. Attribution, measurement and scope unresolved.
- Orders database, 2022: 4 TB; Postgres 11 to 15; new cluster via logical replication; application dual writes through ferry; hourly checksums for three weeks; reads moved before writes; old cluster warm for one month. Dawit led with one database engineer; no maintenance window. [P,R] L calls this two major versions. P says 11 going out of support in 2022. Version description and timing need clarification; no inference that no maintenance window means zero interruption.
- Migration runbook, 2021–present: first version written and owned by Dawit; six stages (preflight, shadow, dual write, cutover, soak, decommission), each gated by exit checks. Used by 40 teams. [P,R,L] Confirm whether current count and internal use; not assume open source.
- On-call, 2021–2022: nine people audited alerts, deleted unactionable ones, introduced SLO burn-rate alerts. Weekly pages 85 to 22 after about a year. [P] R claims Dawit reduced pages by 74%; L describes on-call lead. Team result; measurement window, averages and personal role unanswered. Team of six vs rota of nine needs context.
- Proposed explanatory images in P: service wave map, reciprocal old/new request rates, flat error rate; dual-write paths and checksum parity; six gated stages; falling page count. These are source suggestions, not permission to use internal screens or fabricate observed chart data.

## Earlier roles
- Lumen Pay, Amsterdam: Site Reliability Engineer, March 2016–July 2020; on team running card authorisation path. [R,L] Personal work, stack, scale, concrete outcome and permissible illustration missing.
- Entoto Technical University Library, Addis Ababa: Systems Administrator, 2013–2016; Debian, open-source Perl/MySQL catalogue, about 30,000 records and 8,000 borrowers. [R] Confirm title, approximate counts/time and personal scope.
- Library 2014 incident: cleanup script against production rather than staging dropped a table; catalogue down six hours; restored from previous night's dump; day's loans re-entered from paper slips. [P] Permission to retell, identifying details and attribution must be confirmed.
- Added binary-log point-in-time recovery after 2014; primary/replica in 2015. [P,R] R also lists nightly dumps without chronology; do not imply dumps first added after incident. P's intended future recovery improvement is not a measured subsequent recovery time.

## Open source and speaking
- ferry: Go CLI for dual-write cutovers; former colleague created it in 2019, Dawit maintainer since 2022 and author of cutover command. Command checks lag and checksum parity, switches write target, preserves timed fallback. [P,R] Do not credit original authorship to Dawit.
- 1.2k GitHub stars. [P,L] Date and actual repository unanswered.
- Boring Migrations, SRE North 2024, 30 minutes: runbook, rehearsed rollback and exit checks; opens with library incident. [P,R,L] Public video link and permission to reuse materials missing.
- No photographs, illustrations, screenshots, quotes or testimonials supplied. No rights to employer assets established.
- Existing site: 2019 one-page text, “Dawit Bekele. SRE.” and “I keep things running.” [O] Its future and reusable content to ask.

## Gaps
- Intended audience and final action; exclusions and disclosure boundaries.
- Residence dates; detailed Lumen Pay work; current day-to-day work; degree contribution/team/status.
- Actual contact/repository/video links; reusable assets and permissions.
- Working-world picture for Lumen Pay and studies; confirmation/permission for other project illustrations.
- Learning influences beyond the two episodes in P; fate of old site.

## Disagreements
- R zero downtime vs P/L 99.98% availability (P scopes it to Order API).
- R/P Postgres 11→15 vs L “two major versions”; P's 2022 support rationale also needs checking.
- R personal 74% page reduction vs P nine-person effort, 85→22.
- Six-person platform team [R] vs nine-person rota [P]: potentially different groups, unconfirmed.

## To confirm
All questions below await answers; silence leaves them unresolved.
1. Audience and end action; exclusions; permission to name employers, describe technical processes and retell library incident; rights to any assets.
2. Migration count/period, personal leadership vs team implementation; availability definition/measurement/ownership and zero-downtime scope.
3. Database versions/year, support rationale, scope of no maintenance window, size measurement, personal/database-engineer division.
4. On-call measurements/period, personal contribution and team/rota distinction; runbook current count/scope; approximate library counts; repository stars/date and authorship.
5. Current roles/titles; personal Lumen Pay responsibilities, tools/outcome and a working picture; residence history; degree team/contribution/status; day-to-day objects and tools; learning sources.
6. Public links and contact; content permissions and explanatory illustration approval; old site's future.
