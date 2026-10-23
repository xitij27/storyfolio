# The live path — storyboard for approval

Status: approved by Dawit in conversation on 2026-10-23: “Yes to the storyboard in docs/story/storyboard.md. Please build it.” Concept selected by delegated choice, recorded in concepts.md. This is the structure and meaning of the story, not final captions. Exact wording is chosen at the later wording stop.

## Intended visitor and story

Engineering leaders with a migration ahead of them, and conference organisers. Show Dawit as a person whose approach to migrations includes planning the return route: his degree's second-copy lesson, his own library outage, and the specific systems and checks he later worked on. Introduce background and work before expanding projects. The close brings the forward path and rollback path together, supported by the database's warm fallback month, ferry's fallback window and rehearsed rollback in the runbook. No rhetorical question or guarantee of uninterrupted service.

One connected world of request paths, storage, replication, checks and recovery. Flexible paths carry on through the story; the objects at their ends change into recognisable chapter scenes. All geometry is an original **Illustration**. No internal diagrams, real dashboards, historical request traces, photographs or downloaded material.

## Chapters

| Chapter | Its name (working) | What it holds | What it tells | What its scene pictures | How it grows out of the last | What you can touch |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | Introduction | Name, migrations/reliability, audience, one proof; library origin | Migration planning with a way back | A catalogue table with a missing segment beside its dump-restore route | Record rows assemble; the restore path draws itself around the damaged table | Email; Work jump; skip to Contact |
| 2 | Places | Addis Ababa, Amsterdam, Rotterdam; moves in 2016 and 2020 | Where study and work took place | A minimal geographic route across an original low-relief map, with three city markers | Restore path lengthens into the geographic route; storage shapes recede into the relief | Chapter navigation |
| 3 | Study | BSc Electrical Engineering, Entoto Technical University, 2009–2013; logger and lesson | Sampling and the need for a second copy | Campus feeder input, a sampling device and recognisable SD-card silhouette with incoming samples | Route approaches the Addis marker and curves into the logger input | CV link |
| 4 | Work | Library through 2016, Lumen's permitted line, Kestrel work from 2020 | Progression and personal ownership | Catalogue store with recovery/replica; restrained location stop for Lumen; two-site migration topology at Kestrel | SD record path becomes catalogue storage; route passes Amsterdam without inventing a payment system, then unfolds at Rotterdam | Relevant work links; CV |
| 5 | Practice | Runbook, cutover checklist, rollback plan; formative books | Preparation, evidence and an explicit return route | Dependency routes, a cutover junction and a rehearsable fallback branch | Kestrel routes unfold at the junction; checks attach to the forward path | Ordinary links into runbook and ferry accounts |
| 6 | Selected work | All six requested work items, brief on scroll with detail on click | Actual method, result and responsibility | Waves between sites, two databases/checksums, six gates, removed alert sources, reversible ferry switch, illustrated talk subject | Each working path grows into the next operation; shared recovery strand persists | Six project pages; scroll-driven cutover; keyboard-operable Replay/Reset control |
| 7 | Contact | Migration and speaking enquiries, example email, printable downloadable CV | How to start a conversation | Complete migration/check/recovery system, forward and return routes both readable | Talk's rollback example settles back into the complete checked system | Email link; View CV; Download HTML CV; Back to start |

Lumen has **no system scene**: only an ordinary geographical/work-history stop and its permitted LinkedIn line. No testimonials chapter because none exist.

## Beats

**16 beats, 17.5 screen heights of scroll in total.** Heights are pacing allocations for desktop, not required reading time. Navigation skips directly to any chapter. Phone text may naturally extend a beat; readability takes priority over matching this exact height. Long explanations live on work pages. These are working labels and factual ingredients, not final captions.

Evidence references below point to the confirmed “User answers” section in facts.md and its underlying P sections. P = material/project-notes.md, confirmed accurate and permitted in full by Dawit. L = permitted LinkedIn line.

| Beat / chapter | Screens | What the scene shows and how it develops | Pictures and words in it | Caption basis and working title |
| --- | ---: | --- | --- | --- |
| 01 / Introduction | 1 | Catalogue records assemble above a store; the missing table segment and a separate backup store establish the recovery problem before scrolling | Original catalogue/restore illustration; name, migration work, 40-team runbook proof and contact remain HTML | Introduction — confirmed name, audience, runbook first-version ownership and 40-team use. Explain migration in ordinary language as moving a running system to a new home; no assumed knowledge of SRE |
| 02 / Introduction | 1 | Missing records take the nightly-dump restore path back to the table; recovery line remains visibly distinct | Illustration, not incident reconstruction; 2014 marker in HTML, no invented records or terminal text | Library outage — dropped table in 2014; six-hour outage; restored dump and paper loan re-entry; why Dawit cares about rollbacks. P: Boring Migrations, Library; user's correction |
| 03 / Places | 1 | Restore path stretches into a geographic route across a simple original map linking Addis Ababa, Amsterdam and Rotterdam; camera follows the three markers | City names and move years in HTML; no invented flight, itinerary or neighbourhood | Places — study/library in Addis Ababa; moved Amsterdam 2016 for Lumen, Rotterdam 2020 for Kestrel. User's direct confirmation |
| 04 / Study | 1 | At the Addis stop the path enters a sampling device and SD-card silhouette; discrete samples advance into storage | Illustration of logger function, not exact hardware; sample cadence explained in HTML; no arbitrary waveform values | Study — BSc Electrical Engineering, Entoto Technical University 2009–2013; campus substation feeder-load logger sampling once per second to SD; second-copy lesson. P: My degree. Do not show a redundant logger that was never confirmed |
| 05 / Work | 1 | SD record path becomes a library catalogue store; its restore path gains point-in-time recovery and a primary/replica pairing | Original storage/recovery illustration; no borrower data, catalogue counts or unconfirmed stack | Library systems — first production system, operated through 2016; PITR after 2014; replica in 2015. P: Library; direct education/location confirmation |
| 06 / Work | 0.75 | Catalogue scene settles into the geographical route at Amsterdam; no payment system or work detail is depicted | Only the permitted HTML line: Site Reliability Engineer; Lumen Pay; Amsterdam; Mar 2016–Jul 2020; Card payment systems | Lumen — user's LinkedIn-only boundary. A deliberate quiet stop; do not invent ownership, outcomes or lessons |
| 07 / Work | 1 | Route reaches Rotterdam and grows into two source-site footprints connected to a destination topology; dependency paths unfold between them | Illustration, not Kestrel infrastructure diagram; employer and personal planning responsibility in HTML | Kestrel — wrote plan and sequencing for data-centre exit, grouped services by dependency. P: Data-centre exit; about 60 engineers across programme. No unconfirmed present formal title |
| 08 / Practice | 1.25 | Dependency paths meet the preflight/rollback junction; a service's forward and return routes can be traced end to end | Small HTML checklist beside illustration: dependency map and rehearsed rollback; own runbook/checklist/rollback-plan working vocabulary | Preparation — confirmed daily artefacts and P migration preflight. No invented checklist items or claim of success guaranteed by process |
| 09 / Practice | 1 | Junction opens to show comparison before switching and a return route retained after it; stored records, not abstract particles, show what is being protected | Original reversible-route illustration. Book names as HTML references only: Google SRE book; Release It! by Michael Nygard | Influences and practice — direct book confirmation; P database checksum comparison and retained fallback. Do not invent a causal lesson from either book or reproduce covers/quotes |
| 10 / Selected work | 1.5 | Two-site topology grows fourteen wave routes into the destination; highlights move wave by wave, leaving the recovery route legible | Illustration with wave numbering; no 310 fabricated service traces. HTML summary and detail link | Data-centre exit — 310 services, 14 waves, 26 months Aug 2020–Oct 2022, Dawit planned/sequenced, about 60 engineers delivered; both sites closed on schedule; measured Order API availability 99.98% over those 26 months. P and user correction |
| 11 / Selected work | 1.75 | Destination opens into two distinct Postgres stores; incoming writes fan to both, checksum comparison appears, reads move then writes, old store remains linked as fallback | Illustration, not historical replay; labels for old/new, replication, comparison, fallback stay HTML when canvas labels are too small. Scroll operates sequence; Replay/Reset is a real HTML control | Orders database — 4 TB, Postgres 11 → 15 in 2022, led with one database engineer; hourly checksums for three weeks, no maintenance window, old cluster warm for a month. P: Orders database. No zero-downtime claim |
| 12 / Selected work | 1.25 | Comparison path unfolds into six individually gated runbook stages; a service waits until each illustrated exit check passes | Six real stage names in HTML: preflight, shadow, dual write, cutover, soak, decommission. Highlight illustrative checks without inventing their detailed criteria | Runbook — first version written and still owned by Dawit; 40 teams use it. P: Runbook and direct confirmation |
| 13 / Selected work | 1 | Gate signals branch into a recognisable alert-routing system; unneeded alert sources disconnect while actionable paths remain. Two scoped endpoint counts accompany it, without an invented weekly series | Illustration, not historical monitoring screenshot. HTML endpoints 85 and 22 pages/week; team scope and approximate year alongside | On-call — “we”, team of nine, over about a year in 2021–2022; alert deletion and SLO burn-rate alerts. No derived personal 74% claim. P: On-call and direct clarification |
| 14 / Selected work | 1 | Alert branches settle back into a dual-write junction; replication/checksum checks precede the write-target switch and the old-target return loop stays open | Original cutover-command illustration, no invented CLI syntax or output; ferry name and maintenance attribution in HTML | ferry — former colleague created it; maintained by Dawit since 2022; Dawit wrote cutover command. P: ferry. No unsupported external URL or star count |
| 15 / Selected work | 1 | Reversible junction becomes an opened demonstration of the catalogue restore and checked cutover side by side, presenting the talk's actual subject rather than a microphone emblem | Original illustration; talk title/event/year/duration in HTML. No slides, video download, fabricated quote, audience size or testimonial | Speaking — Boring Migrations, SRE North 2024, 30 minutes; runbook, rehearsed rollback, exit checks; opens with 2014 incident. P: Boring Migrations |
| 16 / Contact | 1 | Demonstration reconnects into one complete source/check/target system with the return route visible; motion settles and links remain ordinary HTML | Illustration; name, Rotterdam, migration/speaking contact and CV controls. No service guarantee or availability claim | Get in touch — dawit@example.com example public contact, engineering leaders and conference organisers; going independent in 2027 is confirmed intent, not current status. User's direct statements |

## Someone with thirty seconds

First screen: Dawit's name; a plain-language explanation of moving running systems between environments; runbook authored and still owned by him, used by 40 teams, as one proof; email immediately available. Avoid leading with an unexplained staff/SRE title. A visible ordinary navigation offers Background, Practice, Work, Contact and CV; a chapter rail adds direct access to every chapter. A skip-to-contact link appears before the scene; skip-to-content serves keyboard users. Work navigation jumps to all six work links without requiring animation completion. Navigation never locks scrolling.

## Project detail on click

Decision: six ordinary local pages rather than modal windows. Native links work by keyboard, with no JavaScript and in a new tab; each page has Work/Contact/CV navigation and a back-to-story link to its exact work beat. Do not require the visitor to replay the story.

| Route | Detail content from confirmed facts |
| --- | --- |
| /work/data-centre-exit | Problem: leases, 310 services, continuous order intake/tracking; personal plan/sequencing versus programme team; dependency waves; mirrored reads, stateful dual writes, weighted routing 1/10/50/100%, SLO checks, two-week soak; sites closed on schedule; 99.98% measured Order API availability over 26 months. Include the two internal incidents, each under ten minutes, alongside outcome so “no downtime” cannot be inferred |
| /work/orders-database | Postgres 11 → 15, 2022, 4 TB; Dawit led with one database engineer; logical replication, ferry dual writes, hourly checksums for three weeks; reads then writes; warm fallback month; no maintenance window. Omit disputed end-of-support rationale |
| /work/runbook | First version and ongoing ownership, 2021–now; six named stages and exit checks; 40 teams use it. Describe the approved process, never reproduce an internal runbook |
| /work/on-call | Nine-person team's alert review, removal of alerts nobody acted on, SLO burn-rate changes; 85 to 22 pages per week over about a year; “we” for work/result, no fabricated weekly breakdown |
| /work/ferry | Started by a former colleague in 2019; maintained by Dawit since 2022; Go CLI and his cutover command's lag/parity checks, write-target switch and fallback window. No example repository URL, executable claim or invented command syntax |
| /work/boring-migrations | SRE North 2024, thirty minutes; 2014 dropped-table story and recovery; rollback rehearsal, runbook and exit checks. Email for speaking; no unavailable video/slides link |

Each has a brief overview, role/ownership, approach, outcome where supported, and one original static explanatory diagram with useful alternative text. No invented outcome for ferry or talk. Facts stay available in HTML; diagrams do not carry claims absent from text.

## Without the scene

| Where | What the visitor gets |
| --- | --- |
| Phone | Full HTML story in the same order; navigation in a compact accessible disclosure; scene below/alongside the current text rather than behind it. Shorter scene viewport, capped pixel ratio, no hover-only actions. Labels in HTML. Expand text naturally; no fixed-height clipping. All six detail links and CV remain available |
| Reduced motion | Settled poses change directly at meaningful beats; no interpolation, autoplay, bobbing or idle motion. Replay/Reset becomes a user-driven step through stable states. Text and navigation identical |
| No WebGL / scene failure | Ordinary HTML and local static SVG diagrams of catalogue recovery, place route, logger, topology, runbook, database, alerts and ferry; Lumen stays text-only. No blank canvas occupying reading space. A scene failure cannot remove navigation, details or contact |
| No JavaScript | Complete server-rendered story, ordinary anchor navigation, local fallback diagrams, all project pages and the self-contained HTML CV. Work links, email, downloads and printing remain useful. No loading screen blocking content |

Accessibility: one h1, sequential headings, visible focus, sufficient contrast in every look, real labelled controls, current chapter indicated without relying only on colour, decorative canvas hidden from assistive technology. No pointer capture or scroll hijacking. The meaningful illustrations have HTML descriptions.

## Looks to try at the spine stop

Three provisional treatments of the same world; the visitor chooses by scrolling the runnable opening/middle/ending later. No look has been selected by the concept delegation.

| Look | Ground | Ink | Accent | Surfaces |
| --- | --- | --- | --- | --- |
| Night operations | Deep charcoal green | Warm off-white | Pale mint | Matte graphite storage, muted metal paths, amber recovery line |
| Day inspection | Warm pale mineral | Dark forest | Deep teal | Chalky storage, brushed grey paths, muted rust recovery line |
| Warm console | Dark brown charcoal | Soft ivory | Amber | Matte warm-grey storage, copper paths, cool slate recovery line |

The recovery line is distinguished by shape/position as well as colour. All looks remain usable without 3D. No glow-heavy dashboard treatment or external fonts.

Two system type stacks: `system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif` for prose/headings; `ui-monospace, SFMono-Regular, Consolas, Liberation Mono, monospace` for device labels/check states. Scene text uses the same local monospace family and remains duplicated in HTML. No font download.

## Everything else the site needs

| Item | Build, later or never | Who decided / implementation plan |
| --- | --- | --- |
| Way round the page | Build | User requested ordinary navigation. Assistant selects normal anchor links, chapter rail, skip links, Work/Contact/CV, browser history and stable fragments |
| Page for each project | Build | User requested more on click; assistant chooses six local pages over modal windows for sharing, keyboard and no-JS access |
| Every project listed | Build | User named exactly six; all six have a brief scroll beat and a detail page; library/degree remain background, not invented extra client projects |
| Contact and CV | Build | User requested example email link and printable downloadable HTML CV. `/cv` offers view/print/download; `/dawit-bekele-cv.html` is a self-contained file with print CSS and no JS dependency, served with an ordinary download link |
| CV contents | Build | Assistant: name, migration/reliability focus, Rotterdam, email; confirmed education and moves; library work/recovery; permitted Lumen line; Kestrel project responsibilities/dates and scoped results; team on-call attribution; ferry maintenance/command; talk. No unconfirmed formal title, resume-only stack, private identifiers or reference contacts. Use date-specific facts, not a guessed present employment end date |
| What others say | Never for this build | User: no testimonials, quotes or invented social proof |
| Languages | Build English; never translation for this build | User |
| Share preview | Build | User. Assistant: original locally generated 1200×630 PNG with name, migration/reliability focus and split/return-path geometry; matching title/description metadata for home and work pages; useful alt text. No remote asset fetch or fictional employer endorsement |
| Site icon | Build | User. Assistant: local original split-path/return-loop SVG, readable at small sizes, plus raster fallback if needed |
| Missing-page page | Build | User. Assistant: plain explanation and links to Home, Work, CV and Contact; stays useful without JS |
| Blog | Never for this build | User |
| Chat | Never for this build | User |
| Contact form | Never for this build | User: email link only, no sending mail |
| Legal notice | Later | User: legal details wait until publication decision |
| Hosting / publication / production domain | Later | User: everything local; no deploy, domain registration or publishing. Production canonical URLs and public share-card URL checked only when a real origin is chosen |
| Analytics / tracking | Never for this build | Assistant: no need to track a local portfolio. No external embeds or third-party scripts. Can revisit if requested |
| Asset/skill purchases or downloads | Never for this build | User: own geometry and system fonts, no additional skills, no photographs/slides download |
| README and checks | Build | Assistant: local start/build/preview instructions, dependency lockfile, verified facts and decision record; final unit/types/lint/build plus full browser acceptance of approved story |

## Validation and acceptance plan

At the spine stop, implement the opening, database middle and contact ending in the three looks, then obtain a look choice. At chapters stop, complete remaining scenes and offer three whole-beat wording versions for the person's choice; no claim becomes approved merely because it is in this storyboard. At finish, run engine unit/type/lint and full production browser matrix across desktop/short/phone, looks, reduced motion, no WebGL, no JavaScript and scene failure. Open every resulting screenshot for readability/framing/overlap. Verify all six detail pages, link destinations, contact mailto, missing-page links, original metadata/icon/preview resources, CV print output and downloaded standalone HTML. Headless rendering does not establish real phone performance; record that limit rather than claim it was measured. User's actual final review must be recorded before marking finished.

## Decisions made for Dawit

1. The live path over the bench/ribbon alternatives, following explicit delegation; strongest caption-independent explanation of cutover and return route.
2. Seven chapters and sixteen beats / 17.5 screens, with work details off the main scroll to keep the introduction brief.
3. Six standalone work pages rather than modals; useful without JavaScript and directly addressable.
4. Self-contained printable HTML CV plus view/download links; no PDF requirement inferred.
5. Original local diagrams as fallback; Lumen only its permitted text and geographical stop.
6. Three provisional looks to compare later; local sans-serif prose and monospace device labels.
7. No tracking, remote embeds or unavailable repository/video links; no invented placeholders presented as working destinations.
8. Relative local metadata/assets now; public-domain and legal decisions remain deferred to publication.

These are reversible implementation/planning decisions, recorded with reasons in decided-for-you.md. The only decision requested now is **yes to this storyboard, or changes**. No final captions have been proposed at this stop.
