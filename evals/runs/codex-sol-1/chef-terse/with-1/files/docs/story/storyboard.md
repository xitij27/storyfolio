# Before the menu — full page storyboard

Status: concept selected; storyboard awaiting user approval. Written plan only. No implementation, prototype, artwork or final captions produced.

## Story and object

Question: **What happens before the menu is written?**

Answer to establish through evidence: Ines’s kitchen works from a prep list and a ferment log; the weekly menu comes last. The close connects that process to enquiries from prospective apprentices, workshop visitors and food writers.

One object: a thick register of seven leaves, visibly bound together at rest. During the scroll those same seven leaves unbind, move and reassemble. This is an editorial interpretation of the ferment log, not a claim about the physical appearance of Ines’s actual document. No jar model, floating ingredients or second animated object.

Use simple paper geometry, readable ink, page edges and a modest binding. Pages display supplied words, confirmed facts, approved images or field diagrams. Never fabricate batch records, recipes, salt percentages, dates or completion marks. Ordinary HTML holds every fact independently of the scene.

## Chapter map

Proposed chapter names, not purported exact headings from the kitchen’s documents.

| Chapter | Name in the form | Role | What it tells | What the leaves do | What can be touched |
|---|---|---|---|---|---|
| 1 | Entry | Opening / who | Ines, Saltmarsh, fermentation, page question | Register opens to log fields | Jump rail; three enquiry links; skip to close |
| 2 | Started | Where from | Dated roles and stage, with corrected Head Chef start | Seven leaves spread along a chronological line | Accessible career details |
| 3 | Salt | How | Prep list and actual log fields; menu written last | Leaves become a field diagram | Field explanations via focus/click |
| 4 | Checks | What / teaching | Larder, apprentice programme, workshops | Leaves fan into three readable work surfaces | Expand programme/workshop information when supplied |
| 5 | Ready | What came of it | Whole-kitchen waste measurement, with limits | Two leaves pair as comparison; others form the supporting record | Measurement note |
| 6 | Notes | Publications / others’ words | Brine and Callum’s approved quote | Leaves form a reading spread | Quote credit; Brine details; scans only if cleared |
| 7 | Next entry | Answer / contact | Process recap and three visitor routes | Leaves rebind into the complete register | Enquire about apprenticeships; workshop booking/enquiry; writer contact |

## Beats and scroll budget

One screen means about one desktop viewport of scroll. Target total: 10 screens; transition motion is included in those distances. On phones, let content determine chapter height rather than forcing this budget. All seven leaves remain identifiable in the scene, even when only selected faces are foregrounded.

Captions are intentionally not drafted. Each beat supplies its working title and exact evidence basis; final public wording is a separate editorial choice.

| Beat | Screens | How the leaves stand | What is on their faces | Added scene elements | Caption title and evidence basis |
|---|---|---|---|---|---|
| 1a | 1 | Bound register; cover and first leaf open | Name, current role, question; real log field names | Nothing beyond lighting | Entry: facts.md Identity and confirmed daily working forms |
| 2a | 1 | Leaves unbind into a chronological line | College, Brassica, Corn Exchange, Saltmarsh dates; Norway marked as an unpaid stage | Nothing | Started: source Experience/Education plus confirmed Saltmarsh dates and stage duties; no implied research or unexplained placement story |
| 2b | 0.5 | Stage leaf comes forward; six leaves remain in the line | Jar washing, labelling, two garum batches | Nothing | Stage: user’s confirmed duties, ten-week duration; no claim of independent authorship |
| 3a | 1 | Four foreground leaves form a left-to-right diagram; others remain attached visually | Started date, salt, check days, ready; no fictional values | Nothing | Salt: user’s four log fields; diagram is editorial, not a recipe |
| 3b | 1 | Diagram folds into a layered register, menu-labelled leaf last | Prep list / ferment log / menu, with no invented tasks | Nothing | Menu last: user’s explicit account of weekly order |
| 4a | 1.5 | Leaves fan into larder, apprentices and workshops panels | Selected owned larder photograph if cleared; otherwise text; factual programme and first-Monday workshop labels | Nothing | Checks: source larder, apprentice programme and workshops. Exclude 40+ and annual apprentice count until clarified; detailed teaching or booking claims require more facts |
| 5a | 1 | Two equal-size leaves paired; five supporting leaves hold scope | 14 kg/week and 5 kg/week, whole kitchen, prep and plate waste, one-month measurement in 2023, bones excluded | Nothing | Ready: user-confirmed measurement. Use “we”; no annual extrapolation, percentage claim, causal promise or individual credit |
| 6a | 0.75 | Reading spread with other leaves visible behind | Brine title; four issues, 2022–2025. Approved scans only later | Nothing | Brine: source Publications/About; no drawn cover or unapproved Olu art |
| 6b | 0.75 | Quote leaf turns into the same spread | Callum’s exact quotation and owner credit | Nothing | Recommendation: source quote plus user-confirmed reuse approval |
| 7a | 1 | All seven leaves close and bind together again | Three contact routes and field names from opening | Nothing | Next entry: confirmed prep/log/menu order and audience; opening question answered without new biographical claims |

## Motion and interaction

- Scroll controls leaf position, rotation and camera framing between settled readable states. Keep the camera steady while text is read; no perpetual spin, scroll hijacking, forced autoplay, cursor chase or sudden zooms.
- One persistent scene sits beside/behind ordinary text with its own clear region. Text contrast never depends on lighting or a page’s angle.
- Rail uses Entry, Started, Salt, Checks, Ready, Notes, Next entry. Links update the address fragment and work with keyboard navigation. Current chapter indicated by text and shape, not colour alone.
- Direct contact jump is always available. Interactions duplicate information already present in HTML; no fact hidden behind hovering or dragging the 3D object.
- Do not offer a pretend live ferment calculator or a simulated kitchen record.

## Thirty-second route

First screen holds Ines Okafor, Head Chef at Saltmarsh in Leeds, the fermentation focus and a small evidence strip naming the actual log fields. Visitor can open any chapter or skip directly to contact. Do not require a full scroll to find the role, method or contact choices.

Contact labels are provisional interface labels, not promises of openings or availability. Actual destinations remain pending. Prefer direct email and an existing workshop booking service if supplied; no fabricated addresses or dates. In a future build, unresolved routes must be resolved before publication, not shipped as dead buttons.

## Without the scene

| Where | What the visitor gets |
|---|---|
| Phone | Single-column text and a shallow scene region between blocks; less camera travel, fewer shadows, no text overlay on the register. Seven readable static leaf panels if rendering is slow. No scroll lock or horizontal drag requirement. |
| Reduced motion | Static chapter-specific arrangements with no interpolated rotation, zoom or parallax. Ordinary anchor navigation; instant state changes rather than a pinned moving scene. |
| No WebGL / rendering failure | Static CSS/SVG register illustration and the same seven HTML chapter panels. A failed scene cannot block content or enquiries. |
| No JavaScript | Complete server-rendered or pre-rendered document; chapter anchors and direct contact links work normally. Static paper panels replace 3D. |

Also provide logical headings, visible keyboard focus, sufficient contrast and descriptive image alternatives. Pause rendering when offscreen. Keep optional image details in captions/HTML, rather than texture-only text.

## Look and type

Three proposed looks for the same storyboard. Once building is separately requested, they can be compared on the actual scroll; no preview is built now.

| Look | Ground | Ink | Accent | Leaf surface |
|---|---|---|---|---|
| Larder paper — recommended | Warm chalk #F2EEE5 | Charcoal #252820 | Dark olive #526044 | Matt off-white, subtle fibre; no fake stains |
| Salt and graphite | Pale mineral #ECEDEA | Graphite #252B2D | Deep blue #315C70 | Smooth grey-white ruled sheets |
| Workshop notebook | Warm cream #F7EFE1 | Brown-black #302821 | Rust #9B482F | Plain uncoated paper with fine pencil-like rules |

Use Source Sans 3 for body text and navigation; IBM Plex Mono for log fields, dates and numbers on the leaves. Both can be self-hosted. Large quiet headings, narrow readable paragraphs, generous margins and clear numeric evidence. Check final text/background contrast when built. Avoid handwritten fonts masquerading as Ines’s handwriting.

No soundtrack, stock food photos, chef’s hat symbols or generic floating ingredients. The work supplies the visual interest.

## Other site requirements

“Build” below means part of a future authorized implementation, not work authorized now.

| Item | Build, later or never | Who decided / reason |
|---|---|---|
| Way round the page | Build | Assistant: chapter rail, skip link, persistent contact jump |
| Individual project pages | Later | Assistant: no supplied case-study depth to justify them yet |
| Every project listed | Build, concise | Assistant: surface larder, apprentice programme, workshops, Brine and Sunday Pot in text; Sunday Pot as a sourced factual note, no invented story |
| Contact and CV | Contact build; CV never in this scope | User audience/job-search instruction; assistant chooses direct contact. Destinations pending |
| Recommendations | Build | User approves Callum quote |
| Languages | English build; others later | Assistant: supplied material and audience context; change if user requests |
| Share preview and icon | Build | Assistant: name/role, log-inspired graphic and textual description; no unapproved photo. Final copy and domain pending |
| Missing-address page | Build | Assistant: brief message with home and enquiry links |
| Blog | Later | Assistant: Brine is supplied; no ongoing web publishing brief |
| Chat | Never in this scope | Assistant: no requirement; direct contact meets the audience need |
| Legal/privacy notice where applicable | Later, resolve before launch as needed | Assistant: base on actual hosting, data collection and contact mechanism; do not invent legal requirements |
| Tracking | Never in initial scope | Assistant: no requested analytics; static site need not collect visitor data |

## Implementation outline for a later handover

Proposed stack: a pre-rendered Astro page with a small Three.js scene and scroll progress controller, plus CSS/SVG static equivalents. Seven reusable leaf meshes, a shared paper material and restrained lighting. Load 3D progressively after HTML; no custom physics or model pipeline required. Exact libraries remain reviewable when implementation is authorized.

Content remains data-driven separately from scene poses. Approved images receive responsive sizes; only current/nearby chapter textures load. Test the document with JavaScript off before integrating motion; then verify reduced motion, WebGL failure, mobile reading, keyboard navigation, anchor sharing and all enquiry routes. Assess performance on a representative phone before accepting the scene. No deployment is part of this planning request.

## Assets and unresolved inputs

- Required before public use: real contact addresses/booking route; selected owned phone photographs with employer/private-label review; any chosen log/prep excerpts cleared of supplier prices and unapproved faces.
- Optional: restaurant permission for Priya photos, with her credit; Olu’s permission and agreed credit for drawings/scans. Ownership statement is not reuse permission.
- Other pending facts remain in facts.md. Do not publish unresolved numbers, career overlap interpretation, detailed collaboration claims or imagined lessons from grandmother/books.
- No dependency on third-party assets: text and an editorial field diagram can carry the storyboard without them.

## Approval sought

Approve the seven-chapter script and motion direction, or identify changes. Selected concept is approved; storyboard and final wording are not. Recommended look is provisional. No building is authorized.
