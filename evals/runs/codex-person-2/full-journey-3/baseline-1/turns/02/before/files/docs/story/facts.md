# Dawit Bekele — source facts

Status: source material read; first factual review awaiting user answers. Listed claims are sourced, not independently verified. No design selected.

## Sources

- R: `material/resume.md`
- L: `material/linkedin.md` (saved text, October 2026)
- P: `material/project-notes.md` (author's notes, October 2026)
- O: `material/old-site.md` (current site's text, made in 2019)

## Identity and career

| Fact | Source | Review |
| --- | --- | --- |
| Dawit Bekele; Staff Platform Engineer; Rotterdam; dawit@example.com | R:1–5, L:3–5 | Confirm current formal title and whether contact is real/public |
| Kestrel Freight, Rotterdam, Aug 2020–present; platform team of six; leads migrations and on-call | R:5–7, L:15–16 | Confirm formal title; six-person team versus nine-person rota |
| Go, Python, Bash, Kubernetes, Terraform, Helm, Postgres, Kafka, metrics, tracing, SLO-based alerting | R:15–16 | Confirm daily work in own words |
| Lumen Pay SRE, Amsterdam, Mar 2016–Jul 2020; on card authorisation team | R:18–19, L:24–26 | Personal responsibilities, tools, scale, outcome and permitted visual missing; payments domain alone establishes no personal speciality |
| Entoto Technical University Library systems administrator, Addis Ababa, 2013–2016; first production system | R:21–26, P:65–68 | Confirm title; public permission for incident |
| Ran open-source catalogue on Debian, Perl and MySQL; about 30,000 records and 8,000 borrowers; added nightly dumps and binary-log recovery; primary and replica in 2015 | R:23–26 | Approximate counts need time/scope; no measured recovery-time result supplied |
| BSc Electrical Engineering, Entoto Technical University, 2009–2013 | R:28–31, L:31–32 | Study location and lived dates absent |
| Final-year campus-substation microcontroller logger; feeder-load sample every second to SD card; learned importance of second copies | R:30–31, P:70–73 | Confirm solo/team, prototype/deployment and actual hardware/result; do not infer backup feature |
| Existing 2019 one-page site: SRE, “I keep things running”, Linux/Kubernetes/Terraform/Postgres/Go/Python, contact | O:1–9 | User to decide replacement/retention; supplied text has no images |

## Work and evidence

| Item | Supported details | Source | Unresolved |
| --- | --- | --- | --- |
| Data-centre exit | Aug 2020–Oct 2022; leases ending late 2022; order intake/tracking used around clock; wrote plan and sequencing; dependency groups; 310 services, two sites, 14 waves, 26 months, about 60 engineers; managed Kubernetes public cloud; both sites closed on schedule | P:3–15, R:8–9 | Confirm team credit and measured metric definitions; reconcile zero downtime |
| Migration process | Preflight dependency map and rehearsed rollback; mirrored reads; dual writes for state; weighted routing 1/10/50/100%; SLO observation; two-week soak before shutdown | P:7–12 | Permission to describe employer process and recreate diagrams |
| Availability | Order API 99.98% through programme; resume says zero downtime | P:14–15, L:18, R:9 | Does zero mean migration-caused downtime only? How measured, which dates, whose result? Flat-error-rate visual in P:16–18 not established as measured trace |
| Orders DB | 2022, 4 TB, Postgres 11→15; logical replication; application dual writes through ferry; hourly checksum comparisons for three weeks; reads then writes moved; old cluster warm one month; no maintenance window; Dawit led with one database engineer | P:20–30, R:10–11 | LinkedIn says two major versions; clarify upgrade path, scale timing, outcome and permission. P's support rationale needs confirmation before repetition |
| Runbook | 2021–now; six gated stages: preflight, shadow, dual write, cutover, soak, decommission; first version written and owned by Dawit; used by 40 teams | P:32–40, R:12–13, L:21 | When/how 40 counted; permission for stages/content; broad statement about all failures not proven |
| On-call | 2021–2022; nine-person rota reviewed alerts, removed unactioned alerts, introduced SLO burn-rate alerts; 85→22 pages/week over about a year | P:42–48, L:22, R:14 | Team result versus resume's personal 74%; averaging windows/data; six versus nine scope; stepwise trend unverified |
| ferry | Go CLI for dual-write cutovers; former colleague authored in 2019; Dawit maintains since 2022 and wrote cutover command; checks replication lag and checksum parity, switches write target, retains fallback window; 1.2k stars | P:50–56, R:33–34, L:34–35 | Real URL (`github.com/example/ferry` looks illustrative), star date, licence/rights for code/screens |
| Boring Migrations | SRE North 2024, 30 minutes; runbook, rollback rehearsal, exit checks; video online per resume | P:58–63, R:36–37, L:37–38 | Video URL and usage rights |
| Library incident | 2014 production cleanup script dropped table; six-hour catalogue outage; nightly-dump restore, day of loans re-entered from paper; later binary-log recovery and 2015 replica | P:58–68 | Permission to tell and name institution; no promised or measured later recovery time |

## Assets and other people's work

Only four Markdown sources supplied. No photos, screenshots, drawings, code, video files or testimonials supplied. P contains descriptions of work visuals, not permission to reproduce employer assets. No quotes from others supplied. Personal notes include lessons from degree and library incident; no books/mentors supplied.

## Gaps

- Audience, end action, exclusions, contact preferences and existing-site disposition.
- Residence dates (work/study city is not proof of residence); missing study location.
- Lumen Pay personal work, approach, tools, outcome and permitted visual.
- Study project collaborators, status, hardware and result; scale measurement context for library.
- Real ferry/talk links; ownership and permissions for any outside assets.
- Current role work since 2022 beyond runbook ownership/maintenance.

## Disagreements

- R:9 zero downtime versus P:14–15/L:18 99.98% programme availability; may be different metrics, not resolved.
- R:10/P:23 Postgres 11→15 versus L:19 “across two major versions”.
- L:8–10 “last four years” of migration versus P:3 Aug 2020–Oct 2022 and L saved October 2026.
- R:7 six platform engineers versus P:44 nine on rota; potentially different groups.
- R:14 personal 74% reduction versus P:44–47 team effort and 85→22 (~74%).

## To confirm — first review questions

All awaiting user answer; no silence counts as approval.

1. Audience, end action, exclusions and whether email is intended for contact.
2. Current formal role and role dates; residence/study locations with years where missing; daily work and post-2022 responsibilities.
3. Migration: team attribution, 99.98% definition/window, zero-downtime meaning, exact programme dates; stale “four years” wording.
4. DB: actual 11→15 path versus two-major-version wording; whether no maintenance window is correct; size timing and permission for project details.
5. Runbook's 40-team measurement/date; on-call team credit, weekly measurement windows, six versus nine people.
6. Lumen Pay: personal work, tools, outcome and one work picture explainable to colleague.
7. Library counts/time; incident permission, institution naming, later recovery improvement as measured versus intent.
8. Degree logger: individual contribution/collaborators, prototype/in-use, hardware/result and a representative work picture.
9. ferry maintainer/command authorship and initial author's credit, real URL/star date; talk URL.
10. Permission to name employers, describe work, create original illustrative diagrams; ownership/permission for supplied future images, code, recording or quotes. Which noted visuals best explain actual work? What other learning influences belong?
11. Existing-site replacement/retention and anything to carry over.
