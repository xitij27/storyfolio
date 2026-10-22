# Fact sheet — first reading, awaiting Dawit's answers

Sources: R = material/resume.md; L = material/linkedin.md (saved October 2026); O = material/old-site.md (site made in 2019). All three files read; no other material files present. Source claims below are provisional where questions remain. No external profile visited.

| Item | Source and claim | Confirmation needed |
|---|---|---|
| Identity | R/L/O: Dawit Bekele. R/L: Rotterdam. R/O: dawit@example.com. | Confirm name/location; is email a placeholder or intended contact? |
| Current role | R/L: Staff Platform Engineer, Kestrel Freight, 2020–present; L specifies Aug 2020, Rotterdam. | Is title official? Still current? Personal responsibilities in own words? |
| Service migration | R: moved 310 services on-prem to cloud, zero downtime. L: led 310-service migration from two data centres in 26 months, 99.98% availability. L introduction says last four years. | Personal versus team ownership; what did Dawit do? Period and meaning of 26 months/four years. Scope of zero downtime versus availability, measurement and time window. May employer and account be named? |
| Database | R: Postgres 11→15, 4 TB orders database, dual writes. L: across two major versions, no maintenance window. | Correct versions/steps (11→15 versus two major versions); 4 TB measured when/what; own role versus team; interruption and permission to describe orders system. |
| Runbook | R: author, preflight → shadow → dual write → cutover → soak → decommission. L: wrote runbook now used by 40 teams. | Sole/coauthored? What 40 means, when verified, permission to describe steps or show employer material. |
| On-call | R: reduced pages by 74%. L: on-call lead, weekly pages 85→22. | Own work; team result; time window, averaging/measurement, team/systems scope, whether 74% is rounded. |
| Lumen Pay | R/L: SRE 2016–2020; L: Mar 2016–Jul 2020, Amsterdam. R: on team running card authorisation path; L: card payment systems. | Official title, own concrete responsibilities, safe to name employer and discuss work? |
| Library | R/L: Systems Administrator, Entoto Technical University Library, 2013–2016; L: Addis Ababa. | Official title, dates, own concrete work, safe to name? |
| Education | L: Entoto Technical University, BSc Electrical Engineering, 2009–2013. | Confirm details. |
| Places | L gives job locations Addis Ababa, Amsterdam, Rotterdam. | Job locations do not establish places lived; ask residence years. |
| ferry | R: maintainer, github.com/example/ferry. L: CLI tool for dual-write cutovers, 1.2k GitHub stars. | Real URL or placeholder; personal contribution/collaborators; where used and what can be shown; stars as of when and whose project result. |
| Talk | R/L: Boring Migrations, SRE North 2024. R: video online. | Correct title/event/year, real URL, recording/slides ownership and permission to use/link. |
| Tools | O: Linux, Kubernetes, Terraform, Postgres, Go, Python. | Current day-to-day tools and outputs in own words. |
| Existing site | O: Dawit Bekele. SRE. I keep things running. Skills and contact, made 2019. | Replace it or keep alongside? Source supplied as text, no assets. |
| Profile wording | L: I move systems that are not allowed to stop; prefers migrations boring on the day. | Personal framing; do not treat slogan as proof of measured uninterrupted service. |
| Assets/quotes | No photographs, screens, drawings, testimonials or slides supplied. | Any wanted assets require ownership and permissions before planning use. |

## Gaps
Audience and desired ending action; exclusions; residence dates; concrete duties at each role; learning influences; verified project/contact/talk links; permitted evidence and visuals.

## Disagreements
- Zero downtime (R) versus 99.98% availability (L): potentially different scopes, unresolved.
- Postgres 11→15 (R) versus across two major versions (L): unresolved wording/steps.
- Four years in L introduction versus migration completed in 26 months: relation and dates unresolved.
- 74% and 85→22 likely rounding, not assumed without confirmation.

## To confirm
All confirmation cells above remain unanswered. Questions presented to Dawit in first factual handoff cover identity/contact; role/duties; service/database/runbook/on-call claims; earlier roles; project/talk; permissions; audience/ending; omissions; biography/education; daily work; influences; existing site.

# Dawit's answers — recorded 22 October 2026

The following user answers supersede conflicting source claims. Unconfirmed claims are omitted rather than guessed, per explicit instruction. Quotations retain the user's words.

## Confirmed work and corrections
- Migration: “\"Zero downtime\" on my resume is too strong. There were two incidents during the migration, both under ten minutes, both internal. 99.98% is the measured figure. Use that, and say what it measures: the order API, over the 26 months.” Use the scoped availability figure; never zero downtime. The 310-service count, precise personal leadership/contribution and two-data-centre scope remain unconfirmed and are excluded.
- On-call: “Pages per week, 85 to 22: that was the on-call team of nine, over about a year, and half of it was deleting alerts nobody needed. Say \"we\".” Use we; show weekly pages, nine-person team, approximate one-year period. Do not claim a sole personal result or independently calculated percentage.
- ferry: “I did not create it. A former colleague did. I have maintained it since 2022, and I wrote its cutover command.” Use these contributions. The supplied URL, stars, adoption, and detailed command mechanics are unconfirmed and excluded.
- Runbook: “I wrote its first version and I still own it. 40 teams use it.” The internal stage list and exact document are unconfirmed for public use and excluded. An abstract illustrative sequence must not claim to reproduce it.
- Lumen Pay: “nothing of theirs can be shown or described beyond the line on my LinkedIn.” Permitted supplied LinkedIn line: “Card payment systems.” No authorisation-path details, screen, model or invented responsibilities.
- Kestrel: “the talk and its slides are public. Internal diagrams are not.” No internal diagrams; user also prohibits downloading anything. Can describe confirmed talk, not acquire slides. Talk URL/title/event/year remain unconfirmed, so omit source-specific identifiers unless later confirmed.
- Library: “The first production outage I caused was in 2014, at the library. I dropped a table. I tell that story at the start of my talk. It is why I care about rollbacks.” Can tell this as first-person account without invented consequences, recovery actions or duration.
- Daily work: “What I work from: the runbook, the cutover checklist and the rollback plan. A postmortem only when something has gone wrong, which is the point.” These are confirmed working materials, not permission to expose the employer's documents.
- Learning influences: “the Google SRE book, and Release It! by Michael Nygard.” No cover assets supplied; represent in own geometry and text if used, labelled illustration.
- Database: no confirmation of versions, size, exact technique, team ownership or outcome in answer. User explicitly requests a brief database-upgrade work item; that topic is confirmed by that request. Detail remains excluded until confirmed; show as illustration, not an accurate system schematic.

## Audience and contact
- “I am going independent next year. I want a company that is about to do a migration it is afraid of to find me and write to me. Conference organisers too.” In current dated context next year = 2027; preserve “Planning to go independent in 2027”, without claiming available/current consultant status or inventing clients.
- “The old site can go. Nothing that matters links to it.” Replacement authorized; no publishing or deletion of external site authorized.
- “dawit@example.com is my public example contact. A link is enough; do not send mail. Please make a printable HTML CV from these confirmed facts, available to download.” Mailto only, never send. Keep actual example status clear in docs; no invented address.

## Biography and naming
- “I grew up in Addis Ababa and studied there: a BSc in Electrical Engineering at Entoto Technical University, 2009 to 2013. I came to software through the job after it, keeping the university library's catalogue servers running. I moved to Amsterdam in 2016 for Lumen Pay and to Rotterdam in 2020 for Kestrel Freight.” These establish location sequence, education, library duties, move years and work associations. Source-only exact months, formal titles and end dates are omitted until confirmed.
- “Use my name, Kestrel Freight, Lumen Pay (its one line only), Entoto Technical University and ferry publicly. The 2014 dropped table can be told as I tell it.” Naming and account permission established.

## Assets, scope and features
- “No photographs of me or my work, and no slides, are in the folder. Illustrations are fine if they are labelled as such. Do not download anything.” Use own geometry, label all project/scenes as illustration; no external assets requested.
- “There are no testimonials. Leave that out.” Omit testimonial chapter.
- “Show each piece of work briefly, with more on a click: the migration, the database upgrade, the runbook, ferry and the talk. Do not invent another project, client, figure or quote.” Exactly these five work items. Detail can only use confirmed facts; database specificity remains excluded.
- “I want English, ordinary navigation, a share preview, a site icon and a useful missing-page page. No blog, chat, translation or contact form. Legal and hosting details wait until I choose to publish.” Local preview/icon generated locally; share URL waits for publishing domain.
- “Use local system fonts and your own geometry. No external asset purchase or download is authorized.” No fonts, photos, icons or asset libraries fetched. Build tooling dependencies are not visual assets; install from existing local cache with offline mode.
- “I'm not installing additional skills for this site. Continue with what is available. For facts I have not confirmed, leave the claim out rather than guessing. Carry on.” No missing-skill installation, no repeated factual interrogation necessary; unresolved claims simply omitted.

## Remaining gaps / excluded claims
Formal titles, exact employment date ranges and present status not expressly confirmed; 310 services; two data centres; four-year phrasing; database version/size/technique/results; exact 40-team measurement date; ferry URL/stars/adoption; conference name/title/date/URL; named slide contents; source-only tools. These stay out of all concept copy, storyboard, site and CV. We may describe the requested database-upgrade work item only at that level, labelled illustration.

## Resolved disagreements
Use 99.98% order API availability across 26 months, not zero downtime. Do not resolve database version discrepancy by inference: omit both versions. Do not use four years. On-call uses confirmed 85→22 per week/team of nine/about one year/“we”, not rounded sole-person 74% claim.
