# Facts and open questions

Status: first answers received. User confirms all project-notes.md as accurate and permits description and original labelled illustrations. The confirmation section below overrides earlier source ambiguities. The live path selected by delegated choice on 2026-10-23; see concepts.md.

## Sources

- R: material/resume.md
- L: material/linkedin.md (saved October 2026)
- O: material/old-site.md (2019 site text)
- P: material/project-notes.md (own notes, October 2026)

Only these four profile files were supplied and read. No photographs, screens, recommendations or private records were found in the material listing.

## Identity and career

| Fact from material | Source | Qualification / unresolved question |
| --- | --- | --- |
| Dawit Bekele; Staff Platform Engineer; Rotterdam; dawit@example.com | R, L | Confirm current formal title and usable contact; example-domain address may be a placeholder. |
| Describes work as migrations, databases, reliability; leads migrations and on-call | R; L says migrations, reliability, on-call | Daily activities at Kestrel have detailed support in P. |
| Kestrel Freight, Rotterdam, Aug 2020–present; platform team of six | R, L | Confirm current role; distinguish six-person platform team from nine-person on-call rota. |
| Wrote and sequenced data-centre exit plan; grouped services by dependency; 14 waves, 310 services, two sites, 26 months, Aug 2020–Oct 2022; about 60 engineers | P; R, L support scale | Programme result belongs to wider team; confirm attribution and permission to name employer and scale. |
| Leases ending late 2022; order intake and shipment tracking support round-the-clock truck dispatch | P | Employer story permission unresolved. |
| Preflight dependency mapping and rehearsed rollback; mirrored reads; stateful dual writes; weighted routing at 1/10/50/100%; SLO checks; two-week soak | P | Describe as method, not a measured performance trace. Permission unresolved. |
| Both data centres closed on schedule; Order API availability 99.98% during programme | P; L gives unscoped availability | Confirm metric boundary and downtime wording. |
| Orders database, 2022: Postgres 11 to 15, 4 TB; logical replication, dual writes through ferry; hourly checksums for three weeks; reads moved before writes; old cluster warm for one month | R, P | P says version 11 nearing end of support; timeline and rationale require clarification. L says across two major versions. |
| Led database upgrade with one database engineer; no maintenance window | P; R, L | Confirm ownership and employer permission; no maintenance window does not establish zero downtime. |
| Runbook: preflight, shadow, dual write, cutover, soak, decommission; exit checks; wrote first version and owns it; 2021–now; 40 teams use it | P; R, L | Confirm current count, what use means and permission. |
| On-call 2021–2022: nine-person rota reviewed every alert, deleted unactionable alerts and introduced SLO burn-rate alerts; 85 to 22 pages weekly after about a year | P; L supports counts | Team result; averaging window and measurement source missing. R rounds reduction to 74%. |
| Go, Python, Bash, Kubernetes, Terraform, Helm, Postgres, Kafka, metrics, tracing, SLO alerts | R | Ask which tools and artefacts dominate day-to-day work. |
| Lumen Pay, Amsterdam, SRE, Mar 2016–Jul 2020; on team running card authorisation path | R, L | Own responsibilities, stack, recognisable system and outcome missing. Employer field does not establish personal speciality. |
| Entoto Technical University Library, Addis Ababa, systems administrator, 2013–2016 | R, L | Confirm formal titles if inaccurate. |
| Ran open-source catalogue in Perl/MySQL on Debian; about 30,000 records and 8,000 borrowers; moved physical server to primary/replica in 2015; nightly dumps and binlog PITR | R, P | Approximate counts: when and whose scope? Work permission unresolved. |
| Cleanup script accidentally dropped production table in 2014; six-hour outage; restored nightly dump and re-entered a day of loans from paper; added PITR after 2014 | P | Confirm public retelling and whether any identifiers must be omitted. No borrower data supplied or needed. |
| BSc Electrical Engineering, Entoto Technical University, 2009–2013; final project microcontroller logged campus substation feeder load every second to SD | R, L, P | Own contribution, collaborators and permission to depict project unresolved. |
| Degree project lesson: data one cannot lose needs a second copy | P | Source supports lesson, but not that project itself implemented a second copy. |
| Locations associated with roles: Addis Ababa 2013–2016; Amsterdam Mar 2016–Jul 2020; Rotterdam Aug 2020–present | R, L | Work locations are not proof of residence; ask if personal geography matters. |

## Open source, talk and existing site

| Fact | Source | Qualification / unresolved question |
| --- | --- | --- |
| ferry, Go CLI for dual-write cutovers; former colleague started it in 2019; Dawit maintains since 2022 and wrote cutover command | P; R supports maintainer | Do not attribute creation to Dawit. Confirm public repo URL and licence; supplied github.com/example/ferry appears placeholder. |
| Cutover command checks replication lag/checksum parity, changes write target and keeps prior target available for fallback window | P | May illustrate workflow after confirmation; no terminal output supplied. |
| 1.2k GitHub stars | P, L | Rounded count; date not explicit; omit unless confirmed. |
| Boring Migrations, SRE North 2024, 30 minutes; video online | R, L, P | Needs real video URL, rights if embedding; talk discusses runbook, rollback, exit checks and library incident. |
| Current one-page site made in 2019: Dawit Bekele, SRE, “I keep things running”; skills Linux/Kubernetes/Terraform/Postgres/Go/Python; email | O | Ask what becomes of old site and any wording to preserve. |
| Notes describe wave map, traffic transfer/error line, two-database writes/checksums, six gated stages, weekly page counts and fallback write path as explanatory pictures | P | No real employer screens supplied. Ask if original schematic illustrations are allowed and what must remain confidential. Do not fabricate historical traces or measured values. |

## Gaps

- Audience, desired next action, exclusions and permission boundaries.
- Lumen: personal work, tools, system view and outcome.
- Actual contact/repository/video destinations; no visual assets or asset rights supplied.
- Residence history if desired; education collaborators and actual physical device appearance.
- Day-to-day working vocabulary; visual explanation of Lumen, library and studies.
- What from the old site should remain; other formative influences if desired.

## Disagreements

- R says zero downtime for the migration; L/P report 99.98% availability (P scopes it to Order API). Those could refer to different boundaries, but none is established.
- R/P say Postgres 11 to 15; L says across two major versions. P dates upgrade to 2022 and says version 11 going out of support; clarify exact dates and rationale.
- L, saved October 2026, says “last four years”; P dates data-centre exit Aug 2020–Oct 2022. Avoid stale duration.
- R says platform team of six; P says nine on rota and about 60 across migration programme. Likely different scopes; confirm.
- R says 74% fewer pages; P/L say 85 to 22 (roughly 74%). Need comparable measurement periods.

## To confirm

1. Audience and ending action; current title and actual contact destinations.
2. Migration ownership, availability scope and downtime wording; correct dates instead of stale “four years”.
3. Database versions, date and rationale; own role versus colleague; no-window wording.
4. Metric definitions/time windows/currentness and attribution for services, waves, teams, pages, catalogue counts, stars; team scopes.
5. Lumen responsibilities, tools, visible artefact and outcome; correctness of listed titles/dates.
6. Employer and third-party permissions, confidential details, library incident retelling, original schematic drawings.
7. Working vocabulary and pictures for each role/studies; university project contribution/collaborators.
8. Formative influences and whether degree/library lessons may be used.
9. Residence corrections/additions if relevant; old-site disposition and words to retain.

## User answers

Received in conversation, 2026-10-23. These answers govern all use of earlier source assertions.

- Audience: engineering leaders planning a migration they fear, and conference organisers. Going independent next year (relative to October 2026); do not claim already independent or available for contracts now. Desired action: write to Dawit.
- Use Dawit Bekele, Kestrel Freight, Lumen Pay (LinkedIn line only), Entoto Technical University, ferry. dawit@example.com is intentional public example contact. Link only; never send mail.
- All P content is confirmed accurate and may be described and illustrated, including 14 waves, six runbook stages, dual writes, checksums and the 2014 incident. User says explicitly to omit facts not confirmed rather than guess.
- Migration: zero downtime is too strong and prohibited copy. Two internal incidents, each under ten minutes. Measured Order API availability was 99.98% over the 26 months. Use this scoped metric. P confirms personal planning/sequencing, programme team of about 60, 310 services, 14 waves, Aug 2020–Oct 2022. Avoid stale LinkedIn duration.
- On-call: nine-person team, 85 to 22 pages weekly over about one year. Half of it was deleting unneeded alerts. Use “we”; no personal-result wording, no need for derived 74% figure.
- ferry: former colleague created it; Dawit maintains since 2022 and wrote cutover command. P confirms implementation details. No confirmed destination; do not use example repository URL. Omit star count because snapshot date was not confirmed and it is unnecessary.
- Runbook: wrote first version, still owns it; 40 teams use it. Six stages and exit checks confirmed through P.
- Database: P confirmed as accurate, including Postgres 11 to 15, 2022, 4 TB, leading with one database engineer, no maintenance window, checksum cadence and fallback month. Omit ambiguous “two major versions” and end-of-support rationale rather than add an interpretation.
- Lumen: nothing may be shown or described beyond LinkedIn line: Site Reliability Engineer, Lumen Pay, Amsterdam, Mar 2016–Jul 2020; “Card payment systems.” No card-authorisation schematic, tools, clients, results or invented detail.
- Library: user confirms first production outage caused in 2014, dropped table, tells it at start of talk; why Dawit cares about rollbacks. P confirms six-hour outage, nightly-dump restore, paper loan recovery, PITR afterwards and replica in 2015. Omit unconfirmed catalogue/borrower counts and exact old catalogue stack from R.
- Education: BSc Electrical Engineering at Entoto Technical University in Addis Ababa, 2009–2013; ran university library systems until 2016. P confirms feeder-load logger sampling every second to SD and second-copy lesson; no collaborators, ownership beyond “my final-year project” or second-copy implementation claim.
- Moved to Amsterdam in 2016 for Lumen; Rotterdam in 2020 for Kestrel. Study/library in Addis Ababa. No invented travel route or exact map geography needed.
- Daily artefacts: runbook, cutover checklist, rollback plan; postmortem only when something goes wrong. Books: Google SRE book, Release It! by Michael Nygard. No book-cover download or quotation.
- Old site may go; nothing important links to it. No wording retention requested.
- No photographs, slides, testimonials or internal diagrams/screens/dashboards are supplied. Download none. Kestrel talk/slides public does not authorize fetching; use original geometry marked “Illustration”.
- Six required work items, each brief with more on click: data-centre exit, orders database, runbook, on-call, ferry, talk. No invented projects, clients, figures or quotes.
- English; ordinary navigation; printable downloadable HTML CV from confirmed facts; share preview, site icon, useful missing-page page. No blog/chat/translation/contact form. Legal/hosting decisions deferred until publishing.
- Local system fonts and own geometry. No external asset purchase/download. No more skills to install; user declines them. Local build/dependency tooling only; no publication.

### Outstanding claims: omit, do not block or guess

Exact formal current title and present employment dates beyond confirmed P, six-person platform team, unsupported resume-only tools/counts, degree collaborators/device appearance, real repository/video URLs, and exact metric sampling windows beyond user-confirmed scopes. No question about these is needed for the concepts. Role labels may be attributed to profile in planning; CV should use confirmed work ownership/date ranges and approved LinkedIn line.

The earlier Gaps/Disagreements/To confirm lists are the initial audit trail, not outstanding approval requests where resolved by this section.
