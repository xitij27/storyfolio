# Full storyboard: A dashboard worth opening

## Waiting before public use

1. Real contact, project URLs and public CV: supplied addresses use example domains.
2. Personal roles, collaborators, project status and approved artifacts/use permissions.
3. Metrics, attribution, conflicting figures and dates; job/title/status, paper and award details if included.
4. Permission for employer material and Beatriz's named recommendation.

These do not block delivery of the design plan. No answer requested this week. Unknown claims stay off the public page; no invented proof.

## Idea and audience

Question: What makes a dashboard worth opening?

One long scroll, structured as an editorial dashboard review, carried by six shallow panels. Their faces hold content; grouping, alignment and selection tell the story. The form is a design proposal, not a claim about Rafael's actual working rituals. It comes from F03, his dashboard self-description. Proposed closing answer: clear context, readable evidence and a next action. This is a design thesis, not a personal quote.

Assumed audience: product/data hiring managers and collaborators. Goal: contact about relevant work. Do not infer availability or job-seeking status.

## Chapters

| Chapter / form name | Role | Tells | Pieces do | Interaction |
|---|---|---|---|---|
| Overview | Opening/who | Name, Lisbon, sourced dashboard self-description, question | Assemble a legible 3×2 dashboard | Work/contact anchors, chapter rail |
| Context | Domains | Genomics, banking, Lisbon rents | Separate into three labelled pairs | Jump to related work |
| Definitions | How to read | Listed tools and exhibit metadata, not invented workflow | Flatten into a legend | Accessible metadata disclosure |
| Views | Work | Focused exhibit, then project index; conditional on evidence | One panel advances; others form index; return to grid | Inline details, normal project links |
| Checks | Evidence | Source, contribution, limits and verified outcomes | Work/evidence pairs align | Evidence links; omit if no evidence |
| Next action | Close | Design thesis and contact | Re-form whole dashboard, one contact panel | Direct contact and overview link |

## Beats

Screens are approximate desktop viewport-heights including transitions. Total about eight; mobile uses natural content height. These are working labels, not drafted captions.

| Beat | Screens | Arrangement | Faces | Adds | Caption basis |
|---|---|---|---|---|---|
| Overview | 1 | Shallow frontal 3×2 dashboard | Name, location, domains, sourced self-description | HTML question/nav | F01 name, F02, F03 |
| Context | 1 | Three separated pairs | Genomics, banking, Lisbon rents | HTML labels/links | F03 |
| Definitions | 1 | Flat legend | SQL, Python, Tableau, Power BI, dbt, Statistics | HTML tool list and exhibit field definitions | F12; metadata fields are editorial |
| Focused view | 1.5 | Selected face enlarges; others stay at edge | Approved Rent Map artifact if supplied | HTML role/context/collaborators/source/limits/link | F15 pending; F03 broad subject only |
| Work index | 1 | Same six panels in grid | Three approved project entries plus metadata faces | Inline details | F13–F15 pending; no assumed real-time/deployment claim |
| Checks | 1.5 | Work/evidence pairs | Approved artifacts, scoped contribution and measured result | HTML source and limits | F05–F17 only after individual confirmation |
| Next action | 1 | Original dashboard restored | Name/domains/real contact | HTML contact and design thesis | F01 name, F03; contact pending |

No approved images currently exist. Do not simulate employer screens, fabricate rents or turn illustrative charts into project evidence. If evidence remains unavailable, merge Views into a concise domain overview based on F03, remove Checks and unverified project entries, and shorten to about five screens. No empty cards or internal approval notes shown to visitors. This version cannot supply substantive project proof.

## Motion

### Layout and click specification

Desktop: a compact top bar contains Rafael's name linked to Overview and Work/Contact links. The scene occupies roughly three-fifths of the middle-chapter width, with readable text beside it; the focused exhibit receives a wider HTML image area. A slim chapter rail provides six labelled anchors. Links work through semantic HTML even when the matching panel appears interactive. No canvas-only hit targets.

Overview: View work → Views; Contact → Next action; chapter anchors → settled chapter state. Once approved, the opening artifact preview also links to the focused exhibit.

Context: domain links jump to corresponding approved work within Views. If no approved related exhibit exists, show an ordinary label rather than a dead link.

Definitions: six tools are plain labels. Approved project metadata can expand inline through a labelled native disclosure; do not imply nonexistent tool tutorials or profile links.

Focused view: Read project details opens a native inline disclosure containing role, collaborators, status and source notes; View project and Source appear only for verified public destinations. Approved preview opens a keyboard-accessible larger HTML image view with a visible close control; Escape closes and returns focus. The initial exhibit summary and image are already visible without expansion.

Work index: three approved project links jump to or expand their inline details. One active entry at a time is highlighted in the scene; selection never removes other HTML entries or traps focus.

Checks: evidence links go to permitted sources; numeric claims are accompanied by measurement scope and attribution in readable HTML. No animated count-up or invented comparison.

Next action: direct email link, optional approved professional-profile link and Download CV if a corrected public file exists. Back to overview returns to the beginning. Footer carries applicable legal/privacy links. No unavailable button is published.

Transitions use scroll distance, not timed compulsory sequences. Most of each beat is a settled readable state; motion occurs between those states. A chapter jump settles the target immediately. Avoid camera rolls, full rotations and motion across prose. Opening imagery must be understandable before scrolling, not concealed behind a loading introduction.

One persistent scene, six simple rectangular meshes. Meaningful transitions only: group, align, select, enlarge, reassemble. Native scrolling; no interception or input delays. Settled faces remain near frontal. No orbit requirement, hidden content on panel backs or cursor-controlled camera.

Desktop scene may pin across middle chapters; text remains ordinary selectable semantic HTML. Canvas is supplemental and hidden from accessibility tools. Chapter jumps and reverse scrolling update the scene directly. Static/CSS dashboard appears first; 3D defers until after core content loads. Pause offscreen or background rendering, cap pixel ratio at 1.5, compress textures; no bloom or video required.

Proposed performance budgets: initial shell under 250 KB compressed excluding optional work images; first-load transfer under 1 MB, with work assets lazy-loaded. Target LCP <2.5 s, INP <200 ms, CLS <0.1 on a representative midrange phone. Verify in future build, not claimed achieved.

## Thirty seconds

First screen: name, location, own dashboard self-description, three work domains. Work shortcut goes directly to an approved exhibit; contact is accessible from the opening and chapter rail. Show a static approved artifact preview in the opening when available. Without it the page gives a work description, not proof. Example contact addresses are not launch-ready.

## Fallbacks

| Case | Visitor gets |
|---|---|
| Phone | Single-column HTML, compact dashboard, short in-flow panel transitions, no long pinning or sideways scroll. Natural chapter heights, 44×44 px minimum targets, no hover dependency; weaker devices use static views. |
| Reduced motion | Static arrangement per chapter; no scrubbed transforms/parallax/smooth scrolling. Immediate anchors. |
| No WebGL | CSS or static images preserve panel groupings; same HTML and links. |
| No JavaScript | Static/server-rendered full content, approved previews and links; inline details shown normally. |

Require keyboard operation, visible focus, semantic headings, image alternatives, verified contrast, 200% zoom usability. No content requires tracking motion.

## Colours and type

| Look | Ground | Ink | Accent | Surface |
|---|---|---|---|---|
| Selected: working paper | #F3F0E8 | #182728 | #0F6B63 | Matte ivory panels, fine rules, subtle thickness and soft shadow |
| Night dashboard | #111B23 | #F3F0E8 | #72C7B9 | Matte dark panels, restrained borders |
| Annotated brief | #FAF7F0 | #292A2D | #93452D | Chalk-white panels with rust annotation rules |

Selected surface references printed/exported dashboard views, not a claim Rafael works on paper. Teal marks action/selection, not arbitrary data values. Real charts retain semantically suitable scales. No stock photos or floating particle charts.

Source Sans 3 for prose/headings; IBM Plex Mono for panel labels, tool names and metadata. Self-host licensed WOFF2 with licence notices. Headings 64–88 px desktop / 36–44 px mobile; body 18 px desktop / 16–18 px mobile; prose width 55–70 characters. Small canvas labels always have a comfortably readable HTML equivalent.

## Other requirements

Build means include in a future implementation, not authorization to build now. All choices made by assistant under delegation.

| Item | Build/later/never | Decision |
|---|---|---|
| Navigation | Build | Chapter anchors, Work/Contact shortcuts, skip link, hash deep links |
| Project pages | Later | Inline case details first; separate pages when evidence merits sharing |
| All projects listed | Build conditional | Each of three only after role/status/use confirmation |
| Contact and CV | Build conditional | Real public email/profile; sanitized CV after discrepancies resolved; no form |
| Testimonials | Later | Permission and attribution first |
| Languages | Build English; Portuguese later | Current sources are English; translation when audience calls for it |
| Sharing and icon | Build | Name/domain metadata, canonical URL, static 1200×630 dashboard social image, six-panel icon |
| 404 | Build | Overview/work/contact routes |
| Blog | Never for scope | No writing supplied or maintenance need |
| Chat | Never for scope | Direct contact suffices |
| Legal/privacy | Build as applicable | Assess actual operator, hosting and collection at launch; no guessed legal conclusion |
| Analytics | Later | No tracking/cookies by default; add for a specific measurement need |
| Hosting/domain | Later | Static CDN hosting, HTTPS and cache policy; no purchase/deploy now |
| Maintainability | Build | Structured project content with source and permission notes separate from animation |
| Verification | Future build | Real mobile, keyboard, contrast, reduced motion, WebGL/JS failure, links, performance |

## State

User explicitly accepted the recommended concept: “Go with the direction you recommend.” Full design plan expanded with per-chapter click behaviour. Unknown facts remain unknown. Approval of this expanded storyboard is not inferred; no build. No additional questions this week.
