# Dawit Bekele — accepted storyboard

Status: approved by Dawit in conversation: ‘Yes to the storyboard in docs/story/storyboard.md. Please build it.’ The concept and storyboard are accepted; final captions, opening/closing wording and look are not chosen. Working titles and fact references below describe meaning, not final copy.

## Basis and audience

One local scroll-driven 3D introduction for engineering leaders preparing a migration and conference organisers. Introduce Dawit, his route into the work, his education/career, his working practices, the six requested work items and how to reach him. No new projects, testimonials or claims. All factual content is governed by the confirmation section of facts.md, which supersedes the original source conflicts.

Accepted eight-slot mix: `sheet,map,sheet,book,sheet,sheet,sheet,sheet`. The empty testimonials slot does not render, leaving seven visible chapters. User explicitly changed employment history from sheet to book; the conditional map fallback was not needed.

## Chapters

| Chapter | Working name | What it holds | What it tells | Scene picture | How it grows out of the last | What you can touch |
|---|---|---|---|---|---|---|
| Hello | Dawit / rollback | Name, platform-engineering field, 2014 library incident as the origin of rollback practice, 2027 independent plans | Who this is and why recovery matters to his work | The ready sheet's illustrated profile document, with the incident referenced; no reconstructed real incident record | The document settles into view; no new opening world | Ordinary chapter navigation, skip-to-content, work link, contact link and CV link once built |
| Where from | Addis Ababa → Amsterdam → Rotterdam | Study in Addis Ababa 2009–2013, library work until 2016, Amsterdam move 2016, Rotterdam move 2020 | The confirmed route through studies and work | Ready map of the three cities at actual geographic coordinates; route appears as scroll advances | Map window grows from the profile sheet; camera dives into it | Chapter links; no invented travel stops or address pins |
| Studied | Electrical engineering | BSc, Entoto Technical University, 2009–2013; final-year feeder-load logger; confirmed lesson about a second copy | What he studied and one thing it taught him | Sheet's degree illustration, labelled as illustration, with institution and logger note; not a reproduction of a certificate or a new circuit scene | A window within the map opens back into the sheet | Navigation; CV for complete education detail |
| Worked | Three roles | University library, 2013–2016; Lumen Pay, March 2016–July 2020; Kestrel Freight, August 2020–present, with permitted responsibilities | The production roles behind the practice | Ready pop-up book employment spread: three illustrative buildings named/datelabelled; the facing page supplies roles and permitted responsibilities | Book picture grows from the education sheet; camera dives to the opened employment spread | Chapter navigation and CV; no employer assets or building interactions |
| Good | The working documents | Runbook, cutover checklist, rollback plan; database and reliability practices; Go/Python/Bash, Kubernetes/Terraform/Helm, Postgres/Kafka | What Dawit works from and with | The sheet's four-fold practices leaflet, with short readable labels; longer terms remain in HTML | A sheet window grows from the book, then fills the frame as the book gives way | Navigation, link to runbook detail; no fake alert dashboard |
| Made | Six pieces of work | Data-centre exit, orders database, runbook, on-call, ferry and Boring Migrations | Brief evidence of work, clearly attributed | Sheet unfolds into six labelled work entries; current ready checklist drawings stay visibly illustrative | Practices leaflet unfolds into the six-part work index within the sheet world | Six keyboard-accessible project links, each opening its own local detail page; 3D picking uses the same destination |
| Contact | A migration or a talk | Intentional example contact, independent plans for 2027, conference interest, HTML CV | How the intended visitor can start a conversation | Sheet returns to one contact document; do not claim that the separate map/book were literally the same sheet | Six work entries rejoin as the sheet's whole contact page | mailto:dawit@example.com; printable CV and downloadable HTML; back-to-start navigation |

The book buildings are generic illustrations, not Kestrel/Lumen/university premises. Their ready-piece heights follow a capped tenure scale, not company size or a measured comparison. Nothing about Lumen's systems appears beyond its permitted one-line description.

## Beats and length

This uses the mix's shorter-story rule: one beat per chapter, rather than twelve to twenty-two beats. Seven beats × 1.9 screens = **13.3 screens of nominal chapter allocation**. Do not add a chapter for each project or duplicate the three-job career in another timeline.

The existing engine actually scrolls through six complete chapter units and the final 0.4-unit hold: `6.4 × max(1.9 × viewport height, 1000px)`, then one viewport of document height. At a 900px-high desktop that is 10,944px of scroll (12.16 screens), with document height 11,844px. Short screens use the 1000px floor. Hold is the first 40% of each chapter; the remaining 60% moves to the next. Non-reduced motion catches up at at most 0.55 chapters per second. This is the existing piece timing, not a newly invented long custom story.

| Beat | Screens (nominal) | Settled scene and preceding change | Pictures/labels in the scene | What its caption stands on — working title and source facts |
|---|---|---|---|---|
| 1. hello | 1.9 | Dawit's illustrated profile sheet settles into view | Name, field, places, education/roles, practice labels; short reference to the 2014 rollback lesson. No book covers or photographs | **Dawit / rollback** — facts.md confirmations: library outage in 2014 caused by dropped table; why he cares about rollbacks; migrations/databases/reliability; 2027 independent plans |
| 2. from | 1.9 | Map fills the window grown out of the sheet; route advances between the cities | Addis Ababa, Amsterdam, Rotterdam; dates stay in readable HTML if the map labels are too small | **The three cities** — confirmations: studied in Addis Ababa 2009–2013, library until 2016; moves to Amsterdam in 2016 and Rotterdam in 2020 |
| 3. studied | 1.9 | Map opens into the illustrated degree sheet | BSc Electrical Engineering, 2009–2013, Entoto Technical University; logger note. Illustration disclosure remains visible | **Electrical engineering / second copy** — confirmed project-notes “MY DEGREE”: feeder load sampled every second to SD card and the stated lesson about a second copy; individual authorship is not asserted |
| 4. worked | 1.9 | Sheet opens into the book employment spread | Three named job illustrations with dates; facing page includes roles and approved responsibilities. Lumen: “Card payment systems” only | **Three production roles** — facts.md confirmed chronology and source roles; library recovery/replica work; Kestrel plan ownership; restricted Lumen description |
| 5. good | 1.9 | Window in the book opens into the practices leaflet | Runbook, cutover checklist, rollback plan; database/reliability/tool groups. Reading influences may be named in ordinary HTML: Google SRE book and Release It! by Michael Nygard, without covers or quotations | **How the work is prepared** — user's everyday working documents and learning influences; approved runbook/database/on-call approaches and source stack; no claim of certification/expertise ranking |
| 6. made | 1.9 | Leaflet opens into the six-entry work index | Six names and short summaries; illustration labels; details open on click rather than adding scroll length | **Six work items** — confirmed project notes and user corrections. Migration: 310 services, 14 waves, 26 months, measured 99.98% Order API availability; on-call result belongs to nine-person team; ferry maintenance/cutover command, not original creation |
| 7. contact | 1.9 | Work entries fold back into a whole contact sheet; final hold without another transition | Intentional email, 2027 plans, talk interest and CV; no guarantee of availability, client result or risk-free migration | **Write about a migration or talk** — confirmed audience/desired next action, public example mailto, printable downloadable HTML CV request |

No final captions are proposed at this stop. Existing preview wording remains provisional until the later wording choice. No rhetorical question or outcome promise is introduced; the narrative connects the confirmed rollback lesson to the practice and evidence, then the requested contact action.

## Work details — same six items, more on a click

All six remain brief on the scroll. I propose **six permanent local detail pages**, replacing the preview's modal as the primary destination. This gives ordinary links, keyboard access, Back navigation, shareable addresses and text that works without JavaScript. No new portfolio items are added.

| Detail route | What it explains | Original illustration to draw from confirmed facts | Claim boundaries |
|---|---|---|---|
| `/work/data-centre-exit` | Lease deadline, plan/sequence ownership, dependencies, 14 waves, roughly 60 engineers, staged routing/soak, schedule result | Schematic showing two old sites, 14 labelled waves and managed Kubernetes; routing steps 1/10/50/100 as a separate flat process figure | Do not assign per-wave service counts, cloud vendor, incident details or fabricated request/error traces. 99.98% is measured Order API availability over all 26 months; two internal incidents each under ten minutes |
| `/work/orders-database` | 4 TB, Postgres 11→15, logical replication, dual writes, hourly checksums for three weeks, reads then writes, one-month warm fallback; led with a database engineer | Flat flow diagram showing logical replication and dual writes, then read/write cutover with old cluster retained | No invented lag limit, checksum values, query rate or zero-downtime claim; outcome is no maintenance window |
| `/work/runbook` | Dawit's first version and current ownership, 40 teams using it, six gated stages and exit-check rule | Flat six-stage gated process: preflight, shadow, dual write, cutover, soak, decommission | Stage names/rule are confirmed; do not invent a checklist threshold or assert that every failure was eliminated |
| `/work/on-call` | Nine-person team's review, 85→22 pages/week over about a year, about half the improvement from deleting unneeded alerts, SLO burn-rate changes | Two values at true scale, labelled as team before/after counts | Use “we”. No synthetic week-by-week curve, exact intermediate values or solo credit |
| `/work/ferry` | Former colleague created it in 2019; maintenance since 2022; Dawit's cutover command | Small control-driven cutover illustration: lag/parity checks → switch write target → keep fallback for a set window; step/back/restart controls | Label as illustration, no live systems. No fabricated command syntax, lag thresholds, duration, repository link or dated star count |
| `/work/boring-migrations` | SRE North 2024, thirty minutes; 2014 dropped table, six-hour outage, dump restore/paper re-entry; runbook, rollback rehearsal, exit checks | Original recovery-sequence diagram from incident notes; plain text talk title/date | No downloaded video/slides, event location, endorsements, participants, real logs or actual postmortem document |

The ferry illustration is a small working model on its detail page, not a new 3D world or extra main-story beat. Its states follow the confirmed command description, and every diagram has an ordinary HTML explanation and visible “Illustration” label. A static diagram plus the same explanation remains without JavaScript. These are drawn explanations, not operational evidence.

## Thirty-second visitor

First screen supplies name, the listed role with a plain explanation, one correctly scoped proof and a direct contact link. The plain explanation's meaning: Dawit plans and sequences moves of running services and databases, with checks and a prepared way back. This follows the confirmed migration/database/runbook work; avoid promises that systems cannot or will never stop. “Rollback” is explained as the prepared way back to the old system, rather than assuming familiarity with the term.

Show 310 services / 14 waves / 26 months with team attribution in the supporting detail, and 99.98% explicitly as Order API availability over those 26 months. Do not abbreviate it to an unqualified personal uptime score. A visible work link reaches the six items; a contact link skips to the close, and the email action is available immediately. Chapter navigation uses ordinary named links/anchors and current-section indication, not dots alone. An accessible text view is always available.

## Without the scene

Every fact and project link is ordinary HTML, not just a texture or canvas label.

| Where | What the visitor gets |
|---|---|
| Phone | Same seven chapters and six work links. Reframe to keep identity/contact and the subject visible; keep long words in the HTML caption rather than requiring texture reading. Preserve a caption-free gap for the close's CTA. The preview's panning crops and pale-paper/header collision need refinement; do not approve them as finished. Detail pages use responsive text and flat figures |
| Reduced motion | Immediate poses without idle bobbing or eased catch-up. Keep explicit chapter navigation and a plain-text view for readers who want no 3D movement at all. Inspect poses/transitions with motion preference enabled; current engine behavior alone is not a claim of complete motion compliance |
| No WebGL / scene failure | Ordinary HTML story, full role/study/project details, static original figures where useful, all detail/CV/email links; no endless blank canvas or loading screen. Preserve the chapter order |
| No JavaScript | Server-rendered story, ordinary anchor navigation, all six detail pages, static diagrams and CV. The ferry illustration becomes a static sequence. Printable/downloadable CV works directly. No required content hidden in a modal or click handler |

Also check short desktop screens, keyboard focus, forward/backward scrolling at intermediate transitions, link targets, dialog-free detail access, contrast, heading order and browser Back behavior. Check framing and runtime errors at each hold and move; software-rendered checks do not establish real-phone performance.

## Look and type — options for the next stop

No look selected here. After storyboard approval, show the whole site in the engine's **night**, **daylight** and **blueprint** looks, and ask Dawit to choose by scrolling. No new skills or downloads.

| Look | Ground | Ink | Accent | Surfaces |
|---|---|---|---|---|
| Night | Charcoal `#0f1318` | Dark `#1c222a` on paper; light HTML over the ground | Amber `#e9a23b` | Warm cream paper; ready book's own desk/page materials |
| Daylight | Warm grey `#e7e3da` | Dark `#1c222a` | Ochre `#c9741f` | Light paper/cards; ready book materials |
| Blueprint | Deep blue `#0e2236` | Dark blue `#13202c` on paper; light HTML over ground | Amber `#f2b33d` | Cool pale sheets; ready book materials |

Use local system-ui for ordinary text/navigation, and the ready pieces' Georgia/system-serif treatment for printed headings, with system sans for technical labels. No web fonts or external assets. Palette choice does not replace the labelled illustrations with real employer documents.

## Everything else the site needs

“Build” means required in this local site, not permission to publish. “Later” is explicitly deferred; “never” means excluded from this site's agreed scope.

| Item | Build, later or never | Who decided / implementation choice |
|---|---|---|
| Ordinary navigation | Build | Dawit requested it; agent proposes named chapter anchors, work/CV/contact links, skip link and visible focus. Keep equivalent links without JavaScript |
| Page for each work item | Build | Dawit requested more on a click; agent chooses six permanent pages instead of modal-only detail for useful links and fallback access |
| Every work item listed briefly | Build | Dawit explicitly named the six items; no seventh project |
| Email contact | Build | Dawit: public example mailto only; no sending mail and no form |
| Printable HTML CV | Build | Dawit requested it; agent chooses `/cv`, print stylesheet and browser Print / Save as PDF action, using confirmed chronology and appropriately attributed outcomes |
| Downloadable HTML CV | Build | Dawit requested it; agent chooses a self-contained local `.html` download generated from the same facts as `/cv`. No PDF generator or external service required |
| Testimonials | Never | Dawit: none exist; omit the chapter entirely |
| Language | Build: English only | Dawit requested English; set HTML language and useful English link labels |
| Translations | Never | Dawit explicitly excluded them |
| Shared-link preview | Build | Dawit requested it; agent chooses local name/field metadata and an original geometric preview image with no synthetic quote or personal photo. Use local image paths; canonical public origin waits for publishing |
| Site icon | Build | Dawit requested it; agent chooses simple original DB initials/geometry; no purchased or downloaded icon |
| Missing-page page | Build | Dawit requested a useful 404; agent chooses name, a clear missing-address explanation, home/work/CV/contact links and actual HTTP 404 status |
| Accessible HTML/text view | Build | Agent: necessary for equivalent content without 3D and for keyboard navigation; no facts locked into textures |
| Blog | Never | Dawit explicitly excluded it |
| Chat | Never | Dawit explicitly excluded it |
| Contact form | Never | Dawit explicitly excluded it |
| Legal notice | Later | Dawit defers legal/hosting details until publishing decision; do not invent business address or legal status |
| Hosting / domain / public canonical URL | Later | Dawit controls publishing; no deployment, DNS or public URL now |
| Analytics / tracking | Never in current scope | Agent: not needed for the requested local site; no third-party calls |
| New skills / external assets / purchases / downloads | Never for this build | Dawit explicitly declined/withheld authorization; use existing engine, installed dependencies, cached browser, system fonts and own geometry |

## Decisions made for you

1. Preserve seven main beats and keep long details off the scroll, so the accepted mix remains one introduction rather than six extended case studies.
2. Use permanent local detail pages as the click destinations; they improve ordinary navigation, accessibility and shareability.
3. Put the small working cutover illustration on ferry's detail page; it explains the confirmed mechanism without changing the accepted main-world mix.
4. Supply both a printable `/cv` and a self-contained HTML download, using the same confirmed facts.
5. Use named anchors, accessible equivalent text, local share artwork/icon and a useful 404; remove unused sample routes before delivery.
6. Keep precise attribution/scope beside numbers; omit unconfirmed star counts, URLs, implementation thresholds and employer visuals.
7. Refine phone framing/CTA overlap before final acceptance, and verify both directions through new book joins.
8. Defer public-origin/legal/hosting work to the user's publishing decision.

These decisions are recorded in decided-for-you.md and can be changed without changing the facts.

## Review requested

Approve this script, or name changes. This review covers chapter meaning/order, the book substitution, seven-beat length, six detail destinations and the remaining-site requirements. It is not a choice of final palette or final opening/closing wording. Next stop after approval: show whole-site looks for Dawit's choice.

User answer: “Yes to the storyboard in docs/story/storyboard.md. Please build it.” Recorded before implementation. User again declined additional skills and excluded publishing.
