# Dawit Bekele — storyboard for approval

Status: proposed script; user accepted the whole-sheet world after scrolling the site and gallery. Keep the running site as it is while reviewing this plan. No new captions written at this stop; current site text remains a draft. Canonical facts: docs/story/facts.md, especially Confirmations received.

## Meaning and shape

An introduction to Dawit for engineering leaders planning a migration and conference organisers. Explain his work in ordinary language as planning the move of running software systems, including the checks before switching and the route back if something fails. Proof: his planning/sequencing role in the 310-service programme, with measured Order API availability of 99.98% over 26 months. Never call it zero downtime or imply he did it alone.

One sheet, throughout. It carries the person, places, study, career, practice and six work pieces, then becomes whole at contact. Its working-document character comes from his runbook, cutover checklist and rollback plan. There is no rhetorical opening question or promised answer. The close invites migration enquiries and conference invitations; no claim of present independent practice or availability date beyond confirmed material.

## Chapters

| Chapter | Name | What it holds | What it tells | Scene | Growth from previous | Touch |
|---|---|---|---|---|---|---|
| hello | Hello | Name, migration work, audience, one proof, contact | What Dawit does and why a visitor should continue | Floating CV-like sheet populated with confirmed background and work | The initial sheet settles into view | Work, Contact, chapter rail; planned CV link |
| from | Where from | Addis Ababa; Amsterdam move in 2016; Rotterdam move in 2020 | Study and work across three places | Same sheet bends into a globe, marked at real coordinates | Printed sheet curves into globe | Rail or navigation; scroll follows places |
| studied | What I studied | BSc Electrical Engineering, Entoto Technical University, 2009–2013; feeder-load logger | Education and the logger's second-copy lesson | Sheet unrolls into an illustrative degree representation with logger note | Globe opens and flattens into study sheet | Rail and navigation |
| worked | Where I've worked | Library 2013–2016; Lumen March 2016–July 2020; Kestrel since August 2020 | Career and permitted responsibilities | Long dated ribbon showing real institutions/roles | Study sheet stretches and curls into timeline | Scroll travels across timeline; rail |
| good | What I'm good at | Runbook, cutover checklist, rollback plan; SLO alerts and recovery; named reading | Documents and checks used in practice | Sheet folds into four panels: Migration, Cutover, Reliability, Learning | Timeline bends into the folded practice leaflet | Scroll travels across panels; rail |
| made | What I've made | Exactly six requested work pieces, brief, with detail on click | Contribution, method and scoped result for each | Same sheet spreads into six illustrated work panels | Leaflet unfolds into wall of work | Six labelled buttons and pickable panels; native detail dialogs; Escape/close |
| contact | Get in touch | Migration/conference invitation, approved example email, CV | How to start a conversation and retain background | Whole sheet returns, carrying contact details | Six panels gather into the original whole sheet | Email link only; printable CV and HTML download |

No testimonials chapter. No new projects or placeholder quotes.

## Beats and length

The supplied sheet world uses one beat per chapter; the custom-scene range of 12–22 beats does not apply. Seven chapter beats at a nominal 1.9 screens each: 13.3 screens of chapter budget. Preserve actual engine pacing: six full hold-and-move units plus final 0.4-unit hold, so physical scroll is 6.4 × max(1.9 viewport heights, 1000px), about 12.16 viewport heights on normal-height screens. Each full beat holds for 40% before transitioning. No artificial padding or additional projects. Reading the detail dialogs does not extend the scroll.

| Beat | Nominal screens | Scene and continuity | Picture/word inventory, not captions | Caption basis in fact sheet |
|---|---|---|---|---|
| hello | 1.9 | Initial whole sheet, CV-like introduction | Dawit; platform engineering; migration planning and checks; 310 services; contact; illustration notice | “Migration planning”: audience, confirmed notes on programme contribution; working documents; approved email |
| from | 1.9 | Same sheet curves into globe | Real map; Addis Ababa, Amsterdam, Rotterdam; study/work and move years; no birthplace claim | “Three places”: confirmed education and moves in 2016/2020 |
| studied | 1.9 | Globe opens into illustrated study document | BSc, field, university, 2009–2013; feeder-load sampling each second to SD card; document explicitly an illustration, not an original diploma | “Electrical engineering”: confirmed degree and accurate project notes, including second-copy lesson; no inferred team/deployment |
| worked | 1.9 | Study document becomes a timeline ribbon | Library role and systems; Lumen's approved line only; Kestrel migration planning/runbook; real dates | “Career”: confirmed chronology; strict Lumen restriction; note-backed personal contributions |
| good | 1.9 | Ribbon folds into working-practice panels | Runbook, checks, dual writes, checksums, rollback, SLO alerts, recovery; Google SRE book; Release It!; library 2014 | “Practice”: named working documents, approved technical methods and learning influences |
| made | 1.9 | Folded practice sheet opens into six-panel wall | Data-centre exit; Orders database; The runbook; On-call; ferry; Boring Migrations. Label all drawings Illustration; motifs are not measured traces | “Six work pieces”: approved notes and explicit attribution corrections, as below |
| contact | 1.9 budget; final hold only | Panels gather back into whole sheet | Example email; invitation for migration and conference conversations; CV actions; no contact form | “Write to Dawit”: audience, desired action, approved mailto and CV request |

The gallery's project motifs are illustrative, not working simulations or original internal diagrams. This plan keeps those components as requested. It does not promise a miniature cutover model. Small printed text is supported by readable HTML captions and dialog text; the scene is never the sole source of a claim.

## Six brief work entries and their click details

| Piece | Brief evidence on scroll | Detail opens on click |
|---|---|---|
| Data-centre exit | 310 services; 14 waves; 26 months | Wrote plan and sequence; programme of about 60 engineers; dependency grouping; rehearsed rollback, shadow, dual writes, routing at 1/10/50/100%, SLO checks and two-week soak; both sites closed on schedule; 99.98% measured Order API availability over 26 months; two internal incidents under ten minutes each |
| Orders database | Postgres 11→15; 4 TB | Led with one database engineer; logical replication and ferry dual writes; hourly checksums for three weeks; reads then writes; old cluster warm for a month; no maintenance window |
| The runbook | Six stages; 40 teams | Authored first version, still owns it; preflight, shadow, dual write, cutover, soak, decommission; each exit check gates next stage |
| On-call | We: 85→22 pages/week | Nine-person team over about a year; about half reduction from deleting unnecessary alerts; SLO burn-rate alerts; collective attribution |
| ferry | Maintainer since 2022; cutover command | Former colleague created it in 2019; Dawit maintains and wrote cutover command; lag/parity checks; switch writes; bounded fallback; omit star count and unconfirmed repository URL |
| Boring Migrations | SRE North 2024; 30 minutes | Publicly told 2014 library outage; dropped table, six-hour outage, nightly dump, paper loan slips; connection to rollback practice; runbook/rehearsal/exit checks; no recording/slides fetched or reproduced |

Use existing native dialogs, not six redundant standalone pages. The talk remains one of the six; do not add the library or degree project as a seventh. Keep all factual detail in server-rendered HTML for fallback access. Project modal closes via button/Escape and returns focus; test keyboard access at finish.

## A visitor with thirty seconds

First screen: name in header and sheet; plain explanation of migration planning; 310-service programme and exact role; contact available immediately through header and example email. Work and Contact are ordinary anchor links; chapter rail jumps through the story. Add CV link when the real printable/downloadable CV exists. Explain cutover as switching the live system and rollback as the route back, without inventing a guarantee. Do not require scrolling through education to reach work or contact.

## Without the scene

| Where | What the visitor gets |
|---|---|
| Phone | Same chapter order; readable caption band below scene; sheet pans across wide scenes as scrolling continues. All six work buttons remain available independent of 3D picking. Ordinary navigation, contact and CV remain accessible. Check short screens and modal scrolling. |
| Reduced motion | Immediate scroll-linked poses; no idle drift or eased camera travel. Retain navigation and all content; check stationary states and both directions. |
| No WebGL or scene failure | Full ordinary HTML story with every project and its detail, contact/CV links; no blank 3D dependency. Typography and headings replace scene, with no fetched fallback images. |
| No JavaScript | Server-rendered headings, full story/project text and ordinary links. Dialog-only interactions replaced by inline detail already in HTML. CV page and HTML download work as normal links; browser's Print works without JS. |

## Look and type

User asked to keep everything else as it is. Preserve current night look and swing movement while reviewing the script; do not silently redesign. Existing night: charcoal ground, warm paper, dark paper ink, amber accent, pale surrounding text. System sans-serif for reading and labels; Georgia/system serif for printed headings and document character. No font downloads.

At the look stop, show the same complete site in the engine's night, daylight and blueprint previews, with existing swing as default and fold/slide available. Daylight: light warm ground/paper, dark ink, orange accent. Blueprint: navy ground, cool pale paper, dark ink, gold accent. No additional world or custom component proposed. A keep-current answer retains night/swing.

## Everything else the site needs

“Build” includes features already working and additions still required. Nothing implies publishing.

| Item | Build, later or never | Decision and implementation |
|---|---|---|
| Way round page | Build | User requests ordinary navigation. Keep name/Home, Work, Contact, chapter anchors and rail. Add CV when it exists. Keyboard focus and deep links checked. |
| Page for each project | Never for this scope | Agent chooses existing native detail dialogs to meet user's brief-plus-click requirement; no duplicate routes needed. Can change if user requests shareable case-study pages. |
| Every project listed | Build | User: exactly six named pieces; all brief and clickable, full detail in HTML fallback. |
| Reach Dawit and CV | Build | User: mailto dawit@example.com only; do not send mail. Add printable /cv and download link for standalone HTML CV. Dedicated print layout, system fonts, ordinary browser Print/Save as PDF. No generated PDF promised. |
| What others say | Never | User: no testimonials. Omit section entirely. |
| Languages | Build English only | User; html lang=en. No translation UI. |
| Shared link preview | Build | User; generate local preview graphic with own typography/geometry; name, migration focus and email from confirmed facts. Open Graph/Twitter metadata, meaningful title/description. No public production URL until publishing decision. Preview only becomes publicly fetchable after publication. |
| Site icon | Build | User; local own-geometry folded-sheet/initials icon, no purchased/downloaded artwork or font. |
| Missing address page | Build | User; useful 404 with name, Home, Work, Contact and CV links; HTTP 404 and meaningful title. |
| Blog | Never | User. |
| Chat | Never | User. |
| Contact form | Never | User. |
| Legal notice | Later | User defers legal/hosting details until deciding to publish; no invented organisation/address/jurisdiction. |
| Hosting and domain | Later | User alone decides publishing. No deployment, account, payment or domain work. |
| Photos, slides and external assets | Never in this scope | User; own labelled geometry only. No downloads. |
| Additional skills | Never in this scope | User explicitly declines. Use available local tooling. |

## Choices made for you

1. Keep seven chapter beats; omit the testimonial chapter because none exist. No extra projects.
2. Keep gallery sheet geometry and scene order, with the same look and movement for now, per user's instruction.
3. Use the existing dialogs for work details rather than six separate pages; preserve complete HTML fallback.
4. Supply the CV as both printable HTML page and downloadable standalone HTML file. They will share confirmed content so attribution stays consistent.
5. Create the icon/share artwork locally with system fonts/own geometry. Reserve production URL and legal/hosting details for publication.
6. Keep 2014 story in the talk detail and learning/practice context; no new outage case study or duplicate project.
7. Leave unconfirmed title wording, counts, repository/video links and testimonials out. No availability guarantees or hypothetical clients.

## Approval requested

Approve this script or name changes. Then continue to look review, wording/CV work and final validation. World already accepted: WHOLE.sheet. Nothing has been published. Existing app unchanged at this stop.
