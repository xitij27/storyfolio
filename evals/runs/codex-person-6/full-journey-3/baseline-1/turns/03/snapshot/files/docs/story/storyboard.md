# Storyboard — sheet world

Status: proposed for user approval at stop 3. World accepted; look, motion and final wording not yet chosen. Existing concept copy remains provisional. This document specifies content and behaviour, not final captions.

## Purpose and through-line

For engineering leaders planning a migration and for conference organisers. The introduction explains the person through his places, education, career, working documents and six examples. The same sheet becomes every picture, then returns whole at contact. The reader should understand what Dawit has done and be able to write to him about a migration or talk.

Opening meaning, in ordinary language: his work is planning and carrying out moves between computer systems, with checks before switching and a prepared way back if things go wrong. Define migration as that move, cutover as the switch and rollback as the way back when those terms are used. Do not suggest guaranteed uninterrupted service. Proof on the first screen: Dawit wrote the first migration-runbook version, still owns it, and 40 teams use it. The 2014 library incident explains his concern for rollbacks in career/detail content; the degree logger explains the second-copy lesson. No new scene of either is promised.

No rhetorical question or invented origin story. The close offers the actual requested contact and CV; it makes no promise about availability or client outcomes. Going independent in 2027 is confirmed intent, not a claim of already trading independently.

## Chapters

| Chapter | Its name | What it holds | What it tells | Scene picture | How it grows out of the last | What you can touch |
|---|---|---|---|---|---|---|
| hello | Hello | Name, plain-language field, intended audience, one proof, working documents | Dawit's work concerns planned system moves and ways back | Whole illustrative CV sheet with confirmed person data | Opening sheet settles into view | Work and Contact links; chapter rail; CV once built |
| from | Where from | Addis Ababa study/library; Amsterdam 2016; Rotterdam 2020 | The confirmed route through study and work | The sheet curves into a globe using supplied local geographic geometry, with these places | Same sheet wraps from flat page into globe | Rail and top navigation; scroll carries view between places |
| studied | What I studied | BSc Electrical Engineering, Entoto Technical University, Addis Ababa, 2009–2013; feeder-load logger and second-copy lesson | Education and what the project taught him | Sheet becomes an illustrative degree page, with logger note; not a reproduction of a certificate | Globe opens into the wide degree sheet | Navigation; scroll |
| worked | Where I've worked | Library 2013–2016; Lumen Pay Mar 2016–Jul 2020; Kestrel Aug 2020–present; permitted contributions | From running library systems to migration planning and ownership | The sheet stretches into a dated career ribbon, viewed along its length | Degree page extends into timeline | Navigation; scroll travels career span |
| good | What I'm good at | Migration planning, dual writes/checksums, exit checks, alert review; runbook/checklist/rollback plan | How he prepares and checks changes | Sheet folds into the existing four-panel practice leaflet | Timeline folds into the leaflet, without changing worlds | Navigation; scroll across panels |
| made | What I've made | Six specified items, each brief, more on click | Work, approach, measured result where supplied, correct credit | Sheet opens into six illustrated work pieces; generic checklist drawings, explicitly labelled illustration | Leaflet opens into the six-piece sheet wall | Each piece and its matching HTML button opens a native dialog; Close/Escape returns focus |
| contact | Get in touch | Example email, migration and conference enquiries, 2027 intent, printable/downloadable CV | A clear way to start a conversation | Six pieces gather into a whole contact sheet | Same sheet comes back together | mailto link; CV page, print and HTML download; navigation back to work |

No testimonial chapter. No new world or component requested. The ready sheet's shapes stay as supplied. Do not promise a working cutover simulator or measured trace from its illustrative checklist animation.

## Beats and scroll budget

One meaningful beat per chapter using the supplied pieces: seven beats × 1.9 viewport heights = **13.3 screens** nominally. Engine minimum is 1000 pixels per chapter, so on viewports shorter than about 526px the actual screen count is higher. This is the content pacing budget; the engine adds viewport room for the ending. No extra beats to fill a target. Settled holds and continuous transitions use the existing engine; final movement is chosen at stop 4.

| Beat | Screens | Scene and change from preceding beat | Pictures and words in it | Caption basis (working topic, not caption copy) |
|---|---:|---|---|---|
| hello | 1.9 | Whole CV sheet presents Dawit and confirmed work | Name, descriptive role, brief record; original geometry labelled illustration. A factual short proof must be readable in first-screen HTML, rather than rely on miniature CV print | Introduction and runbook proof: facts.md authoritative audience, working documents, runbook ownership and 40 teams |
| from | 1.9 | Page wraps into globe; view follows confirmed places | Addis Ababa → Amsterdam → Rotterdam; short city labels. Years/context belong in caption if globe labels crop | Places and moves: authoritative study/library dates and moves in 2016/2020 |
| studied | 1.9 | Globe unfurls into illustrative degree sheet | BSc, field, university, 2009–2013; logger note. Illustration label remains available at this beat | Education and second-copy lesson: authoritative approval of project-notes.md / MY DEGREE; no sole-authorship or redundant-logger claim |
| worked | 1.9 | Degree sheet extends into career ribbon | Named roles/employers and time spans. Exact month dates in CV. Long university name must not obscure the next role | Career: authoritative library story, Lumen restriction, migration planning/runbook ownership. Lumen detail only “Card payment systems.” No internal systems picture |
| good | 1.9 | Ribbon folds into practice leaflet | Existing four groups: planning, cutovers, runbook, reliability. Each lists supported practices; small technical terms explained in accessible prose | Practice: authoritative working documents; project-notes.md procedure and checks. Books can appear in CV/detail, no cover downloads |
| made | 1.9 | Leaflet opens into six illustrated pieces | Six titles, concise summaries, illustration labels; readable HTML access to every item | Work: authoritative metric definitions, team credit, ferry attribution and approved notes. No fictional intermediate time series |
| contact | 1.9 | Pieces return to a whole sheet | Public example email and invitation; CV action | Contact: authoritative audience, example address, 2027 intent and requested CV |

## Six work-item dialogs

Every item has a brief summary on the scroll and opens more on click. Use native dialogs rather than six additional pages: summaries plus approach/result/contribution fit within them. All detail is also in server-rendered HTML for fallback and assistive access. No invented URLs. Separate project pages are not required for this version.

| Item | Brief facts to retain | What opens |
|---|---|---|
| Data-centre exit | 310 services; 14 waves; 26 months; measured Order API availability 99.98% over those 26 months | Lease-ending problem; Dawit's plan/sequence; about 60 engineers; dependency groups; preflight/rollback, shadow reads, dual writes, weighted routing 1/10/50/100%, two-week soak; scheduled closure. Two internal incidents each under ten minutes. No zero-downtime claim or flat-error trace |
| Orders database | 4 TB; Postgres 11 → 15; no maintenance window | Led with one database engineer; logical replication and application dual writes via ferry; hourly checksums for three weeks; reads then writes; old cluster warm one month. No expanded claim of no interruption |
| Runbook | First version written by Dawit; still owned by him; 40 teams use it | Preflight → shadow → dual write → cutover → soak → decommission; exit check gates each transition. No internal document reproduction |
| On-call | “We”; team of nine; 85 → 22 pages/week over about a year | Alert review, unnecessary alerts deleted (half the effort), SLO burn-rate alerts. Shared result. No 74% individual boast or invented weekly samples |
| ferry | Maintainer since 2022; cutover-command author; former colleague created tool | Replication lag/parity checks; write-target switch; fallback window. No star count, author credit for whole tool, or unconfirmed repo link |
| Boring Migrations | SRE North 2024; 30 minutes | Runbooks, rehearsed rollbacks and exit checks; approved 2014 library table deletion and recovery lesson. No downloaded video/slides; no inferred venue city (remove prototype's Rotterdam attribution here) |

All graphics are original illustrative geometry; animated checklists are illustrative activity, not recordings of the projects. Technical steps stay in detail so introductory reading remains brief.

## Someone with thirty seconds

The first viewport must show name, explanation of work and runbook proof in readable HTML. Current prototype opening needs the proof added during wording work. Contact and Work remain in the top navigation; CV joins when its page exists. The rail reaches each chapter; Contact skips to the close. Keyboard users can open every project from a normal HTML button. Visitors need not finish the scroll to find the address or CV. No contact form or mail sending.

## Without the scene

| Where | What the visitor gets |
|---|---|
| Phone | Same seven-beat order, normal navigation, captions below scene and six HTML work buttons. The sheet pans across wide content as the supplied world does. Long labels must shorten to names, with full dates/context in HTML. Verify 390×844 and a short viewport; no reliance on tiny scene text |
| Reduced motion | Fixed poses at the corresponding scroll positions, no easing/idle movement; project illustrations at rest. Same text and actions |
| No WebGL / lost context | Scene yields to ordinary HTML: name, all seven chapter texts, all six summaries/details, email and CV. No empty substitute canvas or essential information available only in drawings |
| No JavaScript | Server-rendered HTML story with every summary/detail expanded, real chapter links, mailto and CV. Dialog behaviour is unnecessary because all detail is already present. CV remains usable and download is a normal link |

Use native keyboard/focus behaviour, visible focus, Escape/close and focus return for dialogs. Check narrow-screen dialog scroll and all links. Ordinary browser back/forward and #chapter addresses remain usable.

## Looks and type — choices at the next stop

Show the whole confirmed sheet story in these three existing looks, not just swatches:

| Look | Ground | Ink | Accent | Surfaces |
|---|---|---|---|---|
| Night | Charcoal #0f1318 | Dark #1c222a on paper; warm light HTML text | Amber #e9a23b | Warm paper #f2ede2, darker folds |
| Daylight | Warm grey #e7e3da | Dark #1c222a | Orange #c9741f | Pale paper #fbf8f2 |
| Blueprint | Navy #0e2236 | Blue-black #13202c on paper; light HTML text | Amber #f2b33d | Cool paper #eaf0f5 |

Use the engine's supplied system-ui sans for reading/navigation and Georgia (Times New Roman/serif fallback) for printed sheet headings; technical labels use its sans. No font downloads. Exact fonts depend on the visitor's installed fonts. Compare fold, swing and slide movement locally at stop 4; current night/swing is provisional. The user chooses look and movement then. Final opening and closing wording follows at stop 5 with three whole-beat alternatives for each.

## Everything else the site needs

| Requirement | Build, later or never | Who decided / concrete behaviour |
|---|---|---|
| Way round page | Build | User requested ordinary navigation; agent selects existing name/home, Work, Contact, CV and chapter rail; stable #chapter links |
| A page for each project | Never for this version | Agent chooses six native detail dialogs, already supported; user requested more on click, not separate pages |
| Every work item listed | Build | User named exactly six; all summaries on scroll, all details available in HTML |
| Contact and CV | Build | User: mailto dawit@example.com only. Agent: /cv printable HTML with print stylesheet, Print action and Download HTML link. Download is a standalone .html copy with embedded local CSS and same confirmed content, generated from shared facts; print remains possible without JavaScript through browser menu |
| Testimonials | Never | User says none exist; omit chapter |
| Languages | Build English only; never translation | User |
| Shared link and icon | Build | User. Agent: original local 1200×630 image with name, field and confirmed runbook proof; sheet geometry and accent matching chosen look, no photo/quote. Metadata uses local image path; no invented production domain/canonical URL. Locally generated folded-sheet icon, legible at small size. Actual remote social-card fetch test waits for publication |
| Missing address | Build | User. Agent: useful 404 with name, clear missing-page explanation, links Home, Work, Contact and CV; correct 404 response |
| Blog | Never | User |
| Chat | Never | User |
| Contact form | Never | User |
| Legal notice and hosting | Later, at publication | User explicitly deferred; no invented legal business details |
| Publishing, analytics or external integrations | Later for publishing; never analytics/integrations in this scope | User keeps publishing decision; agent adds no tracking or service dependencies |
| Asset/skill installation | Never | User: no extra skills, external asset purchase/download. Work from installed tools/cache, system fonts and own geometry |

## Build and review sequence

1. User accepts or changes this storyboard. Record actual answer before advancing.
2. Show full story in looks and moves locally; record chosen look and movement.
3. Build final click-through details, printable/downloadable CV, metadata/share image, icon and 404 using confirmed facts. Show three complete opening/closing beat wording alternatives; record choice and use exactly.
4. Verify desktop/phone/short screen, both scroll directions and transitions, reduced motion, no JavaScript/no WebGL, keyboard dialogs, project summaries/details, links, 404, CV print/download content and no third-party asset requests. Run required engine checks after implementation; inspect screenshots. Correct clipping/overlap rather than relying on a passing script.
5. Present checked local site for actual user review and record their feedback; do not equate automated success with user acceptance. Publishing stays separate.

No implementation beyond the already running concept is claimed by this storyboard. The CV, icon, sharing and useful 404 remain planned work. Existing tests passed in the prior turn; this documentation-only step does not need a rerun.

## Acceptance

User response: pending. Requested decision: yes to the script as a whole, or what to change. Look, movement and final wording choices are subsequent decisions, not questions to settle now.
