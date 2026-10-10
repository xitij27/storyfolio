# Fact sheet — Dawit Bekele

Sources: `material/resume.md`, `material/linkedin.md` (saved as text, October 2026), `material/old-site.md` (one-page site made 2019).

## Who they are, in their own words
- "I move systems that are not allowed to stop." (linkedin)
- "I like migrations that are boring on the day." (linkedin)
- Old site (2019) said: "Dawit Bekele. SRE. I keep things running." — predates current title and the migration work.
- **Answer:** The old site can be retired. Nothing that matters links to it.

## Where they have been
- Rotterdam, Netherlands (current). Addis Ababa, Ethiopia (earlier, per Entoto Technical University). (linkedin)
- **Answer:** Confirmed, no correction.

## Jobs

### Staff Platform Engineer, Kestrel Freight, Rotterdam — Aug 2020 to present (linkedin); resume gives "2020 to present"
- Led the migration of 310 services out of two data centres, in 26 months. (linkedin)
- Resume: "Moved 310 services from on-premises data centres to the cloud with zero downtime."
- Linkedin: "99.98% availability through the migration."
- **Resolved:** "Zero downtime" was too strong — retire that line. The measured figure is 99.98%, and it describes the order API, over the 26 months of the migration. There were two incidents during the migration, each under ten minutes, both internal. True claim to use: "99.98% availability on the order API, over 26 months, including two internal incidents each under ten minutes."
- Upgraded a 4 TB Postgres database across two major versions (resume says Postgres 11 to 15, naming it the "orders" database) with dual writes, no maintenance window.
- Wrote the migration runbook (resume names its stages: preflight, shadow, dual write, cutover, soak, decommission). Linkedin: "now used by 40 teams."
- **Answer (runbook):** Dawit wrote its first version and still owns it. 40 teams use it — confirmed, not an estimate.
- On-call lead. Resume: "Reduced on-call pages by 74%." Linkedin: "pages per week from 85 to 22."
- **Answer (on-call):** This was the on-call team of nine, over about a year — say "we," not "I." About half the drop came from deleting alerts nobody needed.

### Site Reliability Engineer, Lumen Pay, Amsterdam — Mar 2016 to Jul 2020
- Resume: "On the team that ran the card authorisation path." Linkedin: "Card payment systems."
- No individual outcome or figure given for this job in either source.
- **Answer:** Nothing of Lumen Pay's can be shown or described beyond the line already on the LinkedIn profile ("card payment systems"). Treat this job as a one-line stop on the route, not a chapter with its own proof.

### Systems Administrator, Entoto Technical University Library, Addis Ababa — 2013 to 2016
- No description of duties, outcomes, or scale in either source.
- **Answer:** This is where the first production outage happened, in 2014: Dawit dropped a table. He tells this story at the start of his SRE North talk, and says it is why he cares about rollbacks. No other detail about the job itself was given — treat the outage as the one fact worth keeping from this job, not the job's duties.

## Education
- Entoto Technical University, BSc Electrical Engineering, 2009 to 2013. (linkedin only; not on resume)
- **Answer:** Confirmed, no correction.

## Projects
- **ferry** — command-line tool for dual-write cutovers. Resume lists Dawit as "maintainer." Linkedin describes it as his project, with "1.2k stars on GitHub," but does not say he created it versus took over maintenance.
- **Answer:** A former colleague created ferry. Dawit has maintained it since 2022, and personally wrote its cutover command.

## Talks
- "Boring Migrations," SRE North 2024. Resume notes "video online." (resume, linkedin)
- **Answer:** The talk and its slides are public and may be linked. It opens with the 2014 library outage story. Kestrel's internal diagrams are not public and must not be shown.

## Figures (what it measures, over what time, measured/modelled/guess, whose result)
1. 310 services migrated, in 26 months — Kestrel Freight, team effort led by Dawit.
2. 99.98% availability, order API, over the 26-month migration, including two internal incidents each under ten minutes. Measured, not "zero downtime."
3. 4 TB Postgres database, Postgres 11 → 15, dual writes, no maintenance window.
4. Runbook used by 40 teams — confirmed count, Dawit wrote and still owns it.
5. On-call pages: 85/week → 22/week — the on-call team of nine, over about a year. "We," not "I"; about half the drop was deleting unneeded alerts.
6. ferry: 1.2k GitHub stars — Dawit maintains it since 2022 and wrote its cutover command; a former colleague created it.

## What others have said of them
- Nothing in the material (no quotes, no recommendations included). Confirmed gap — none offered.

## What they learned from
- The first production outage, 2014, at the Entoto library: dropped a table. Source of his focus on rollbacks.
- The Google SRE book.
- *Release It!* by Michael Nygard.

## Pictures, drawings or files claimed
- None mentioned in resume or linkedin text. Old site was text-only.
- Talk slides (SRE North 2024) are public and usable. Kestrel's internal diagrams are not usable. No headshot or other picture offered yet — open gap, see below.

## Who the site is for, and what should happen at the end
- Dawit is going independent next year. The audience: a company about to run a migration it's afraid of, and conference organisers. The end of the site should get one of them to write to him.

## What must not be shown
- Anything of Lumen Pay's beyond the single LinkedIn line ("card payment systems").
- Kestrel Freight's internal diagrams (the talk and its slides are the exception — those are public).

## What they work from, day to day
- The runbook, the cutover checklist, and the rollback plan. A postmortem only when something has gone wrong — "which is the point," i.e. the goal is to need postmortems as rarely as possible.

---

## Gaps (remaining)
- No picture, headshot, or diagram supplied yet for any project. The talk slides (public) are the one visual asset confirmed available. This is a gap to flag back to Dawit before build: a storyboard can be written without pictures, but the site cannot ship without at least one real image of him and ideally one real artifact (a slide, a terminal screenshot of ferry, a diagram he's willing to redraw cleanly).
- Lumen Pay and the Entoto library job both remain thin by design (per Dawit's own limits) — they read as a route, not a case study. Decided for you: treat them as waypoints in the "where from" chapter, not chapters of their own.
- No quotes or outside validation exist, and none were offered. Decided for you: drop the "what others say" role from the storyboard rather than inventing or soliciting one.

## Disagreements
- Resolved: "zero downtime" (resume) was inaccurate; "99.98% availability" (linkedin) is the figure to use, with its two internal incidents named rather than hidden.

## To confirm
All answered. Nothing outstanding except the picture/artifact gap above.
