# Fact sheet — Dawit Bekele

Sources: `material/resume.md` (R), `material/linkedin.md` (L), `material/old-site.md` (O).

## Who they are

- Dawit Bekele. Based in Rotterdam. [R, L]
- Calls himself, in his own LinkedIn About: "I move systems that are not allowed to stop." [L]
- Current title: Staff Platform Engineer, Kestrel Freight. [R, L]
- Old site (2019) called him "SRE" with a skills list: Linux, Kubernetes, Terraform, Postgres, Go, Python. [O]

**To confirm:** Is "I move systems that are not allowed to stop" a line he wants carried into the new site, or just how he described himself on LinkedIn?

## Jobs

### Staff Platform Engineer, Kestrel Freight, Rotterdam — Aug 2020 to present [R, L]
- Moved/led the migration of 310 services out of two on-premises data centres into the cloud, over 26 months. [R, L]
- **Confirmed by Dawit:** 99.98% is the real figure, not "zero downtime." It measures the order API, over the 26 months. There were two incidents during the migration, both under ten minutes, both internal (not customer-facing).
- Upgraded a 4 TB Postgres database from version 11 to 15, using dual writes, no maintenance window. [R, L]
- Wrote the migration runbook (preflight, shadow, dual write, cutover, soak, decommission): **confirmed** — he wrote the first version and still owns it. Used by 40 teams, confirmed as current.
- On-call. **Confirmed:** pages per week 85→22 was the on-call team of nine, over about a year — not his figure alone. Say "we." About half the drop came from deleting alerts nobody needed.

### Site Reliability Engineer, Lumen Pay, Amsterdam — Mar 2016 to Jul 2020 [R, L]
- Resume: "On the team that ran the card authorisation path." LinkedIn: "Card payment systems."
- **Confirmed:** nothing of Lumen Pay's may be shown or described beyond the line already on LinkedIn ("card payment systems" / "card authorisation path"). No outcome or figure is available for this job, and none should be invented.

### Systems Administrator, Entoto Technical University Library, Addis Ababa — 2013 to 2016 [R, L]
- No day-to-day description given, but **confirmed:** this is where, in 2014, he caused the first production outage of his career — he dropped a table. He tells this story at the start of his talk, and says it's why he cares about rollbacks. This is the one scene from this job the site should use.

## Education

- Entoto Technical University, BSc Electrical Engineering, 2009 to 2013. [L only — not on resume]

## Projects

- **ferry** — **confirmed:** a former colleague created it, Dawit has maintained it since 2022, and he wrote its cutover command himself. 1.2k stars on GitHub (date of count still unconfirmed, but not load-bearing).

## Talks

- "Boring Migrations," SRE North 2024. Resume notes "video online." The talk opens with the 2014 dropped-table story. Slides are public.

## What others have said

- Nothing in the material. Not pursued further — not essential to the story.

## What they learned from

- **Confirmed:** the Google SRE book, and *Release It!* by Michael Nygard.
- **Confirmed:** the 2014 dropped-table incident at the library is the origin of why he cares about rollbacks — this is his "first failure."

## Pictures, drawings, files

- None exist. **Confirmed as a real gap, not an oversight** — nothing of Lumen Pay's internal systems may be shown, and no diagrams of Kestrel's internals exist to show either. What is public and usable: the SRE North 2024 talk and its slides. Everything else visual on the site has to be built from the shape of the work itself (the runbook's stages, the rollback, the dial of 85→22, the dropped table) rather than from photos or screenshots.

## Old site

- **Confirmed:** can be retired. Nothing that matters links to it.

## What he works from, day to day

- **Confirmed:** the runbook, the cutover checklist, and the rollback plan. A postmortem only when something has gone wrong — "which is the point."

## Who the site is for

- **Confirmed:** he's going independent next year (2027). The site is for a company about to run a migration it's afraid of, and for conference organisers. The call to action is: write to him.

---

## Gaps (remaining)

1. No images of any kind exist or can be sourced. The entire visual language has to be built, not photographed or screenshotted.
2. Lumen Pay has no figure or personal outcome beyond "card payment systems / card authorisation path," and nothing more may be shown — this job will read thin by design, not by accident.

## Disagreements

None remaining — the downtime figure is settled at 99.98%, measuring the order API over 26 months, with two sub-ten-minute internal incidents during the 26 months.

## Open, left to judgement

- Whether to use the LinkedIn About line ("I move systems that are not allowed to stop") verbatim, adapt it, or replace it — Dawit didn't say either way and told us to use judgement. See `decided-for-you.md`.
