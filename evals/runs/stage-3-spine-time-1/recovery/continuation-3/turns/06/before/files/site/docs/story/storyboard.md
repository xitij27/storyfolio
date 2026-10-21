# Storyboard — Ada Mensah / the bring-up fixture

Status: **approved by user on 21 October 2026**: “Yes to the storyboard in docs/story/storyboard.md. Please build it.” Approval includes the proposed 10-beat / 11.5-screen shorter scope and supporting site requirements. Concept 1 remains selected. Final look, final opening/closing wording, actual final review and publication are separate; publication stays outside this task.

## Story contract

- **Audience:** firmware hiring manager.
- **Question:** How does a firmware decision become something you can check?
- **Form:** bring-up checklist: Prepare → Command → Access → Observe → Record.
- **Object:** one generic bring-up fixture, assembled from seven solid base/contact segments. The same seven segments persist from first screen to last. No sheets, paper, cards, private circuit reconstruction or unrelated effects.
- **Starting meaning:** Ada's stated lesson, that a firmware decision needs a physical observation, gives the assembly its purpose. The fixture's contacts and solid bases gather into a whole; no invented origin story or learning chronology.
- **Closing answer (meaning, not caption):** a firmware decision needs a physical observation; the observation and its scope determine what can be claimed. Mosslink's reported radio-awake observation leaves cause/resolution open. The two-year battery projection is not the 72-hour observed run, six bench-tested samples are not a forty-unit field pilot, and a preliminary emissions check is not completed qualification. F3/F4/F5/F6/F8/F9 establish these distinctions. Contact is the next action after this answer, not the answer itself.
- **Scope exception to approve:** **10 beats, 11.5 screen heights**, instead of the usual 12–22 beats. One confirmed project and no available original measurement artifacts support this shorter story. Do not pad the story with biography, fake plots, extra projects or a resolved-fault narrative. This shorter scope is proposed for the same approval as the storyboard.
- **Attribution:** “Ada” applies only to writing firmware, scheduling states and building the fixture. Assembly/testing/qualification counts are project facts; no implication Ada personally performed them all. The colleague owns PCB and analogue-front-end design.

## Chapters

| Chapter | Its name in the form | Role | What it tells | What the pieces do | What the visitor can touch |
| --- | --- | --- | --- | --- | --- |
| 1 | Prepare | Opening / who | Name, embedded-firmware goal, own contribution and physical-observation lesson; scope of responsibility | Seven solid fixture segments gather into one bench assembly; grouped markings separate firmware/fixture contribution from colleague hardware contribution | Ordinary navigation, Mosslink project, view/download CV, email, skip to Record |
| 2 | Command | How | State scheduling; state table, timing diagram and current trace as working documents | The same fixture separates its command side from its observation side. Contact markers show a labelled teaching loop without time/current encodings | Chapter anchors; link to supplied teaching diagram |
| 3 | Access | What | Checking a new board's basic operation; fixture contribution; Mosslink as the only project | Command-side contacts face a central Fixture segment and an Observe segment. Relationships can be inspected spatially; no claimed original probe positions or wiring | Mosslink project page; link to fixture teaching diagram |
| 4 | Observe | How / reported observation | Radio awake after failed transmission; cause, timing, fix and resolution unconfirmed | Observation segment separates from command group while the fixture remains visibly connected by its shared arrangement. A labelled open observation has no success/checkmark animation, waveform or made-up measurements | Mosslink observation section and evidence limits |
| 5 | Record | Evidence / answer / close | Projection versus run; sample and qualification scope; lesson; contact | Estimate and Run stand apart at equal visual weight, then rejoin the same fixture while their distinct labels remain visible | Email, view/download/print HTML CV, Mosslink detail, back to start |

## Beats

These are working topic titles and source anchors, **not captions**. No final opening or ending wording is chosen at this stop. “Screens” means viewport-height units of story scroll, excluding normal header/footer and other pages. Phone text length may require more natural reading space; do not enforce a height that clips text.

### 1. Prepare — 2.25 screens

| Beat | Screens | How the pieces stand | What is on their faces | What the chapter adds | What its caption stands on |
| --- | --- | --- | --- | --- | --- |
| prepare.assemble | 1.25 | Seven solid fixture segments start close enough to read as one family and gather into a recognisable fixture. All seven are present immediately. | Firmware; States; Command; Fixture; Observe; Estimate; Run. These label conceptual roles, not actual hardware components. | Nothing. Actual geometric depth, contacts and base surfaces provide the tangible object. | Working topic: Ada, firmware and the bench. F2/F3/F9: name, firmware-role goal, Mosslink firmware/state scheduling/fixture contribution, lesson. |
| prepare.responsibility | 1.00 | Firmware, States and Fixture segments stand slightly forward as one contribution group; the remaining segments keep the assembly recognisable. No metric of effort is encoded. | Role labels stay legible; HTML explicitly attributes PCB and analogue front end to colleague. No private circuit image. | Nothing. | Working topic: contribution boundary. F3: Ada wrote firmware, scheduled power states and built fixture; colleague designed PCB/analogue front end. |

### 2. Command — 2.25 screens

| Beat | Screens | How the pieces stand | What is on their faces | What the chapter adds | What its caption stands on |
| --- | --- | --- | --- | --- | --- |
| command.states | 1.25 | Command-side segments open around the States segment, establishing a loop with spatial adjacency. The other segments remain at the fixture base. | States face carries the supplied `public/assets/power-states.svg`, explicitly labelled Teaching sequence. Sleep / Measure / Transmit have no durations, current values or recovered-firmware claim. | Nothing beyond the same pieces. The teaching sequence is also available as an ordinary HTML image/link. | Working topic: scheduling and teaching states. F3/F11: confirmed power-state scheduling; supplied illustrative loop and its limits. |
| command.documents | 1.00 | The command group faces the Observe group across the fixture; the two sides stay distinct. Labels sit on solid surfaces rather than floating sheets. | Role labels plus State table / Timing diagram / Current trace, as names of working documents only. No fabricated document content, timings or waveform. | Nothing. | Working topic: working documents. F7/F9: C, oscilloscopes, logic analysers and confirmed document names. No claim of a particular test sequence, proficiency rating or universal practice. |

### 3. Access — 2.25 screens

| Beat | Screens | How the pieces stand | What is on their faces | What the chapter adds | What its caption stands on |
| --- | --- | --- | --- | --- | --- |
| access.relationship | 1.25 | Three readable groups: command-side contacts → central Fixture segment → Observe segment. Estimate/Run remain together at the rear base, outside this explanation. Physical contacts and direction of grouping express access, without pretending to be original wiring. | Command / Fixture / Observe; supplied `bring-up-fixture.svg` can be on the Fixture face if legible, with Explanatory schematic label. | Nothing. Image is also in HTML, not dependent on texture readability. | Working topic: basic operation and fixture access. F3/F11: Ada built fixture; bring-up means checking new board's basic operation; supplied diagram is generic, not actual circuit/access proof. |
| access.mosslink | 1.00 | Fixture reassembles, with Firmware/States/Fixture visually grouped for Ada's contribution. No second project or showroom of devices. | Mosslink / Environmental sensor on the front assembled face; persistent role labels retained. No photo texture. | Ordinary HTML project link. | Working topic: Mosslink detail. F3/F10/F11: only project, contribution split, actual photo unavailable; separate page for depth rather than repeating the whole story. |

### 4. Observe — 1.25 screens

| Beat | Screens | How the pieces stand | What is on their faces | What the chapter adds | What its caption stands on |
| --- | --- | --- | --- | --- | --- |
| observe.open | 1.25 | Observe segment steps out of the command/fixture grouping and remains visibly an open observation. Other pieces stay assembled. Nothing snaps into a “fixed” or “passed” pose. | Observe face: Radio awake / After failed transmission. Secondary HTML says reported in a current trace; trace unavailable; no cause, fix, timing or later resolution confirmed. No implied duration via animation speed. | Nothing. No actual or synthetic trace. | Working topic: observation, open question. F8 in full, including all unconfirmed outcomes; F9 physical-observation lesson. |

### 5. Record — 3.50 screens

| Beat | Screens | How the pieces stand | What is on their faces | What the chapter adds | What its caption stands on |
| --- | --- | --- | --- | --- | --- |
| record.battery | 1.25 | Estimate and Run separate to opposite sides of the fixture at equal scale. Other five pieces remain as context. No bar lengths, battery drain simulation or proportional two-years/72-hours scale. | Estimate: Two-year projection. Run: Longest run 72 hours. HTML states bench current readings and assumed reporting cycle; no field endurance/weather evidence. | Nothing. | Working topic: projection versus observed run. F4/F9, without assuming Ada owned the measurements/calculation or that this was a two-year test. |
| record.scope | 1.00 | Same fixture stays central; temporary labels on separate faces carry sample/test/qualification scope. No forty-item grid or six “successful” device icons. | 40 engineering samples / 6 bench-tested / Preliminary check; all explanatory labels, not original test records. Numbers are not icons indicating all devices tested. | A concise ordinary HTML evidence list; no results dashboard. | Working topic: scope of evidence. F5/F6: forty assembled, six bench tested, none to customers; one preliminary emissions check passed; programme unfinished. |
| record.close | 1.25 | Seven pieces return to the recognisable fixture with command, access, observation and evidence roles readable together. Estimate and Run labels remain distinct. No completion badge for Mosslink. | Firmware / States / Command / Fixture / Observe / Estimate / Run, with Projected and Observed distinctions preserved in HTML. | Ordinary HTML email/CV actions. | Working topic: answer and contact. F2/F3/F4/F8/F9: physical observation is needed; estimates/runs support different claims. The answer is stated before the contact actions. |

**Total:** 1.25 + 1 + 1.25 + 1 + 1.25 + 1 + 1.25 + 1.25 + 1 + 1.25 = **11.5 screens / 10 beats**. No extra filler beat for a biography, testimonial or multiple projects.

## Someone with thirty seconds

First screen must show Ada Mensah, the target of embedded firmware roles involving physical devices, and concrete evidence of contribution: wrote Mosslink firmware, scheduled power states and built a bring-up fixture. “Firmware” is explained in ordinary words as the code that controls a physical device's operation. “Bring-up” is explained as checking a new board's basic operation. These are descriptions of the confirmed work, not new claims about deployment or success.

The opening carries the question and Ada's physical-observation lesson; the fixture assembles for that purpose. Its appearance does not imply an exact reconstruction or a device result. A visible Email link and view/download CV actions are available without scrolling. A Skip to evidence & contact link goes to Record, and chapter anchors jump to any checklist chapter. One example of contribution is not presented as independently published measurement evidence; no original trace is available.

## Navigation and routes

- `/`: the selected scroll story replaces the concept chooser after storyboard approval and staged build. Plain HTML header navigation: Story, Mosslink, CV, Email. Explicit links for viewing versus downloading CV.
- `/#prepare`, `/#command`, `/#access`, `/#observe`, `/#record`: stable chapter anchors, reachable from ordinary links even without JavaScript or WebGL. Compact chapter navigation wraps or uses native HTML disclosure on a phone; no JavaScript-only menu. Focus styles and enough target space are required.
- `/projects/mosslink`: one ordinary, readable project page. Sections planned: environmental-sensor context; Ada's firmware/state-scheduling/fixture contribution versus colleague hardware design; labelled teaching diagrams; radio-awake observation and unavailable trace; evidence ledger (battery, sample counts, qualification limits); return to relevant story chapter and contact/CV. No additional case study, date, deployment narrative, photo, testimonial or new measurement. All sources F3–F11, with user corrections controlling scope.
- `/cv.html`: existing corrected printable HTML CV. Keep employer and dates omitted, public example email, downloadable `.html` file, printer-friendly styling; no fake PDF. Final review checks it against the chosen site's claims. Browser Print instruction works without JavaScript.
- `/sketch/fixture`, `/sketch/sensor`, `/sketch/loom`: preserve as clearly labelled local concept studies, outside final main navigation. They are not additional projects. Old chooser can move to a labelled local comparison route if useful during review; it does not stay the portfolio landing page.
- Unknown path: real missing-page response with plain explanation and links to Story, Mosslink, CV and Email. No auto-redirect or fabricated destination.

## Without the scene

Every claim, number, qualification caveat and link is ordinary server-rendered HTML. Canvas is supplementary and inaccessible labels are not the only source of meaning.

| Where | What the visitor gets |
| --- | --- |
| On a phone | Same chapter order, one column of captions beneath the fixture's reserved visual area. Geometry fits the space left after text/header; caption height can expand. Seven pieces remain recognisable, with HTML carrying all labels that become small. Navigation wraps; no horizontal scroll, scroll locking, forced landscape or hover-only controls. Inspect at wide, phone and short heights. |
| With reduced motion | Immediate cuts between meaningful settled poses; no idle motion, parallax, easing or scroll-linked continuous transitions. All text, drawings and navigation remain. Check that a stationary pose stays still. |
| With no WebGL / failed scene | Natural-height HTML narrative with chapter headings and all actions. Use supplied fixture schematic in Access and supplied power-state schematic in Command, both visibly labelled explanations. Evidence is a textual ledger, not an invented graph. A canvas failure cannot blank the page. |
| With no JavaScript | Same server-rendered narrative, ordinary anchors, supplied diagrams, project page, mailto and view/download HTML CV. Hide nonworking look controls. No placeholder loading state or missing content. |

When 3D is available, settled formations must visibly explain the relationship named in each beat; do not rely solely on surrounding prose. Check both directions and intermediate positions when labels change. No label crossfade may leave superimposed words unreadable. Keep solid depth and mechanical contacts visible so this cannot become a card layout.

## Proposed looks and type

These are candidates for a later **runnable spine comparison**, not a choice made here. The spine will be opening, Access middle and Record ending in both looks; user chooses by scrolling before the remaining chapters are built.

| Look | Ground | Ink | One accent | Fixture surface |
| --- | --- | --- | --- | --- |
| Brushed aluminium bench | Warm off-white `#F2F0E9` | Graphite `#202932` | Copper `#8D471E` | Matte light aluminium bases, visible metal contacts, restrained reflections and a subtle ground shadow |
| Anodized bench | Deep blue-grey `#14252B` | Pale ivory `#F3F0E7` | Pale teal `#83D8C4` | Dark anodized metal bases and contrasting contacts; no decorative neon or glowing invented signals |

**Two system type families:** system sans-serif (`system-ui`, platform fallbacks) for human-readable HTML; system monospace (`ui-monospace`, platform fallbacks) for fixture markings, checklist numbering and evidence labels. No remote font request, downloadable font or package. Body text and face labels are checked for contrast/readability; do not turn evidence into oversized decorative numbers.

## Everything else the site needs

| Item | Build, later or never | Who decided / scope |
| --- | --- | --- |
| The way round the page | Build | User requested ordinary navigation. Agent chooses simple HTML header/chapter anchors and explicit skip link. Works without scene or JavaScript. |
| A page for each project | Build | User explicitly requested Mosslink's own page; exactly one project. `/projects/mosslink`. |
| Every project listed | Build | User confirms Mosslink is the only project. Single labelled project link in main story and navigation; no empty portfolio grid. |
| How to reach Ada and a CV | Build | User: email link plus corrected printable downloadable HTML CV. Existing `/cv.html` retained and reviewed. No form and no email sending/delivery test. |
| What others say | Never | User: no testimonials; no quotes supplied. |
| Languages | Build English; never translation controls | User: English only. |
| What a shared link shows | Build | User requested preview. Agent chooses locally generated 1200×630 image with Ada's name, embedded-firmware topic and original explanatory fixture geometry; descriptive title/description for Story and Mosslink. No external photo/model, metric headline, invented domain or publication claim. Test local metadata/image route; no external share submission. Production origin waits for a publishing decision. |
| Site icon | Build | User requested icon. Agent chooses a simple original fixture-contact motif, local SVG with a local raster fallback if needed. Readable at small sizes, not a borrowed logo or certification badge. |
| Missing-page page | Build | User requested useful page. Real 404 with clear recovery links and ordinary navigation. |
| Blog | Never | User excludes it. |
| Chat | Never | User excludes it. |
| Contact form | Never | User excludes it. |
| Extra project, photo, testimonial, award or measured result | Never in this scope | User explicitly prohibits invention. Fixture photo and trace remain unavailable; no private colleague circuit use. |
| Legal notice / jurisdiction / compliance claim | Later; compliance claim never without basis | User defers legal/hosting-jurisdiction details until publishing. Agent does not invent jurisdiction, assert compliance or add a placeholder legal claim. |
| Hosting / deployment / public origin | Later | User reserves publication. Keep server loopback/local; no domain purchase, account, public tunnel or deployment. |
| Analytics, tracking and remote services | Never in this scope | Agent: unnecessary to requested local site; change only if user requests added scope. |
| System fonts, supplied SVGs and explanatory geometry | Build | User permits these and no external asset purchase/download. Preserve SVG originals and provenance; record any derivative changes and accessible descriptions. |
| Additional skills | Never for this site | User has declined repeatedly. Continue with storyfolio, installed dependencies and available tools. |

## Implementation and review after approval

1. Build Prepare opening, Access middle and Record ending in both proposed looks, using the custom solid fixture. Ask user to choose a look before building remaining chapters.
2. After look selection, implement remaining planned beats plus ordinary navigation, Mosslink page, CV integration, icon, preview and useful missing-page response. Show three versions of each complete opening/closing beat including fixed surrounding text, then apply the selected wording exactly.
3. Check source facts across HTML, geometry labels, project page, CV and metadata. Run appropriate type/lint/tests and fresh production acceptance matrix. Inspect screenshot sets, both scroll directions and label transitions. Check phone/short viewports, keyboard links/focus, reduced motion, no JavaScript/WebGL, scene loss and local download/print behavior. Headless software rendering is not a phone performance claim.
4. Present the checked local site and record the user's actual review and remaining changes. Passing automated checks is not recorded as user approval. No publication.

## Decisions made without another question

Recorded also in decided-for-you.md: selected delegated concept 1; five checklist chapters; shorter ten-beat proposal subject to this script approval; role-based seven-segment explanatory fixture; no missing assets needed; exact one-project route; static HTML CV; system sans/monospace; two material-derived look candidates; plain navigation/fallbacks; local generated preview/icon; deferred public origin/legal/hosting. All unconfirmed facts stay omitted. No extra skills or external assets.

## Approval requested

Approve this full script and its **10-beat / 11.5-screen exception**, or specify changes. This approval would authorize the staged spine implementation and comparison of looks, not a chosen look, final wording, final-site review or publishing.

## Implementation update — 21 October 2026

User explicitly delegated selection of the recommended working finish; **Aluminium selected**, with reason in decided-for-you.md. All ten planned beats / 11.5 screens now implemented. The Measure segment uses a documented landscape derivative of the supplied teaching loop for face legibility; original SVG remains the HTML explanation/fallback. Whole opening/closing wording review is pending; see wording.md and the local /wording page. No final wording or actual final-site review recorded.
