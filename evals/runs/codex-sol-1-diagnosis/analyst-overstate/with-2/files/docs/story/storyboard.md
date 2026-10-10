# Storyboard — The analysis memo

Status: complete planning draft. Rafael explicitly approved the recommended direction and requested the full plan, still without building. Final narrative captions are not drafted here; the tables name content and its factual basis. No implementation authorised or performed.

## Waiting on Rafael before publication

1. Real contact destination and corrected CV.
2. Live Rent Map URL, approved image, data/map attribution, and context for approximate visitor count.
3. Optional capstone link and asset permissions. Until then, show a text summary only.
4. AutoPilot permission, if it is to appear at all. The default excludes it.

These do not block review of the plan. No employer screenshot, source code, simulated employer interface, or research-author claim is planned.

## Idea and object

Organising question: **What makes a dashboard worth using?**

The visitor reads an analysis memo made of six thin paper leaves: a cover plus Rafael's five named sections. Scrolling changes their arrangement, so the same object becomes context, method, work samples, evidence, and a completed memo. Motion is tied to reading: nothing continuously spins. The opening derives from Rafael's actual working form, not an invented story about his beginnings.

Desktop: ordinary HTML text occupies roughly half the viewport; the object occupies the other half in a sticky scene. Use natural scrolling and short transitions between settled, readable states. No forced scroll speed or scroll lock. A section rail and Contact shortcut remain available. About eight viewport-heights of content is a starting estimate, adjustable for text length; scroll distance must never stretch just to finish animation.

## Chapters

| Chapter | Name in the memo | Role | What it tells | What the six leaves do | Interaction |
|---|---|---|---|---|---|
| 1 | The question | Opening / who | Rafael Costa; Product analyst; user's dashboard-use self-description; question; immediate Helix proof | Gather into the cover, then open the question leaf | Jump to work, Contact, section rail |
| 2 | The data | Where from / context | Analyst roles, correct MSc dates; clear operational versus scientific boundary | Spread chronologically, without inventing links between events | Expand concise background/CV details |
| 3 | What I did | How / what | Named memo process; Rent Map owned public project; capstone accurately classified | Separate into five stages, then bring the relevant work leaf forward | Approved live-map link; keyboard-accessible project details |
| 4 | What I found | Outcomes / testimony | Approximate weekly reporting-time change; self-reported map traffic; Beatriz's attributed recommendation | Align evidence leaves for comparison; turn one leaf to testimony | Evidence notes; accessible quote text |
| 5 | What I would do | Answer / close | Direction toward product analyst roles; invitation to discuss work | Reassemble the same six leaves into a completed packet | Confirmed email/contact link; corrected CV |

## Beats

Screen lengths are desktop estimates; on mobile each beat takes only the space its content needs. Faces use confirmed text and approved work images. There are no fabricated charts or interface mocks.

| Beat | Screens | Arrangement | Faces | Added elements | Caption subject / fact basis |
|---|---|---|---|---|---|
| 1A | 1 | Six leaves gather into a memo, then the cover lifts slightly | Name, Product analyst, supplied self-description, five user-supplied memo headings | HTML question, immediate proof summary, work/contact links | Identity and dashboard work: F01–F04, U01/U03/U14/U15 |
| 2A | 1 | Chronological horizontal spread | Public employer/title/date labels, degree/date label; small career items appear in HTML if space is limited | Compact text chronology | Career context: F06/F09/F12/F20, U01/U09; no invented duties at Atlantico |
| 3A | 1 | Five section leaves form a left-to-right sequence, cover remains alongside | The question / the data / what I did / what I found / what I would do | HTML process list, explicitly Rafael's named memo structure | Working method: U15; no invented experiments or product decisions |
| 3B | 1.5 | Rent Map leaf faces forward; other leaves remain visible at its edge | Approved current Rent Map image, or text description until provided | Inline details: ownership, public status, room-cost scope, actual link when confirmed | Owned public work: F16, U08; no invented pricing insight, filters, or map interaction |
| 3C | 0.75 | Second work leaf opens beside the map leaf | FraudShield title and academic-notebook classification | Short text case note; optional artifact link once verified; no benchmark claims | Academic work and honest limits: U04; AutoPilot excluded |
| 4A | 1 | Two leaves align as a before/after comparison, other four form a shallow stack | Approximate five hours / approximately two hours; weekly-report context; approximately 60% less preparation time | Accessible HTML values and self-reported source note; map traffic in a separate evidence note | Helix outcome: U03; Rent Map approx. 3,000/month: U08, never combined into one metric |
| 4B | 0.75 | One leaf turns to the quote; rest stay as the same packet | Exact supplied Beatriz recommendation and attribution | Full quote in HTML, no portrait | Testimony: F22/U12; attribute the double-booking statement to Beatriz, do not turn it into a new measured outcome |
| 5A | 1 | All six leaves reassemble, with contact beside rather than hidden on a reverse face | Name, Product analyst, contact label | Desired-role statement, confirmed contact, CV link | Career direction: U14; answer meaning grounded in U01/U03/U08; final wording later |

No evidence of formative influences was supplied; do not invent an origin anecdote. DataTugas may appear as a modest CV item: started a twelve-person university study group (U11). Hackathon may appear as team award/charts contribution (F18/U10), not a headline achievement or individual win. Paper acknowledgement omitted pending citation.

## Thirty-second visit

The first viewport provides name, Product analyst, the user's exact self-description, and the Helix weekly-report preparation result with approximate five-hour/two-hour context. Work and Contact links are visible without scrolling. A compact rail jumps directly to each of the five sections. Recruiters can reach a corrected CV and inline case details without completing an animation. All important evidence is HTML text, not solely a texture on a 3D face.

## Phone, accessibility, and failures

| Situation | Reading and visual behaviour |
|---|---|
| Phone | Single column, text before visuals. Small memo preview between section introductions; no full-screen pinning. Simplify transforms and omit 3D on constrained devices. Map becomes an approved static image/link, never a hover-dependent miniature. Contact remains in navigation. Use at least 44px touch targets and avoid sticky controls covering content. |
| Reduced motion | Static section illustrations; no scrubbing, camera movement, page flipping, or animated numeric changes. Same content, order, links, and evidence. |
| No WebGL / context loss | HTML memo cards and approved static project image replace the scene; show no blocking error. |
| No JavaScript | Full semantic page, anchor navigation, native disclosure elements, links, CV and contact remain functional. Static illustrations remain available. |

Plan for meaningful headings, visible keyboard focus, a skip link, clear link names, alt text for meaningful images, and sufficient contrast. Canvas is presentational; controls and meaningful content live in HTML. Never require dragging or deciphering a leaf's back face. Check 320px layouts and text enlargement to 200% without lost content.

## Colours, material, and type

Default selected under U16: **working paper**. Ground #F3EFE5, ink #202522, accent #00685F, leaves #FFFCF4. Matte paper, modest thickness, fine rules, restrained shadows. Use accent for actions and selected section, not to fabricate data categories. Avoid fake handwriting and invented annotations.

Alternatives for later visual review:

| Look | Ground | Ink | Accent | Leaves |
|---|---|---|---|---|
| Working paper — selected | #F3EFE5 | #202522 | #00685F | Warm matte ivory #FFFCF4 |
| Archive paper | #E9E7E1 | #252A30 | #304FA0 | Cool off-white #FCFCF8 |
| Night desk | #17201F | #F4F1E9 | #83D5C5 | Warm pale paper #F4F1E9 with dark ink #202522 |

Verify actual text/button contrast during build; accent use alone must not convey meaning. These are design proposals, not claims about Rafael's existing taste.

**Source Sans 3** for readable body text and headings; **IBM Plex Mono** for memo section labels, dates, and figures. Self-host two carefully limited font sets with system fallbacks. Body starts around 18px desktop / 17px mobile, generous line height, readable line length. Headlines scale fluidly rather than forcing short phones into oversized text. Both are proposed, subject to asset licence checks when obtained.

## Everything else the site needs

Build means include in a future implementation, not permission to build now.

| Item | Build, later, or never | Decision / reason |
|---|---|---|
| Navigation | Build | Assistant under U16: five anchors, Work shortcut, Contact shortcut, skip link |
| A page for each project | Later | Assistant: inline case detail initially; separate pages only when enough approved evidence exists |
| Every project listed | Build, scoped | Assistant: Rent Map and correctly labelled FraudShield; AutoPilot withheld until cleared; never silently imply all work is public |
| Contact and CV | Build | Assistant: verified contact link and corrected accessible PDF; no placeholder destination published |
| What others say | Build | User permitted Beatriz's exact attributed quote (U12); no additional testimony invented |
| Languages | Build English; others later | Assistant assumption based on this brief; no inferred Portuguese copy |
| Share preview / icon | Build | Assistant: name and role, static memo preview, simple memo-derived icon; no invented logo affiliation |
| Missing-address page | Build | Assistant: accessible 404 with link to portfolio/contact |
| Blog | Never in initial scope | Assistant: no writing supplied or publishing habit inferred |
| Chat | Never in initial scope | Assistant: direct contact better serves hiring; no pretend availability |
| Legal notice if required | Later, before launch where applicable | Assistant: determine requirements from deployment/data collection; use actual contact details only |
| Privacy / analytics | Build review; analytics later | Assistant: no trackers or contact form by default; assess host logging/privacy needs before launch |
| Search metadata | Build | Assistant: accurate title/description, canonical URL once known, correct person/job information; no researcher schema |
| Domain, hosting, HTTPS | Later, before launch | Assistant: choose real domain/deployment after implementation; no purchases or publishing now. Secure hosting with compression and sensible caching. |
| Content/asset maintenance | Build handover | Assistant: keep content separate from scene logic; document updating projects, CV, links, metrics, and share images. |
| Asset licences and attribution | Build review | Assistant: record font, map, dataset, image, and code licences; add visible credits where required. |
| Launch verification | Later, before launch | Assistant: real-device accessibility/performance checks, browser coverage, all link/download checks, metadata previews, and confidential-asset review. |

## Implementation constraints for handover

- Progressive enhancement: static content renders first; defer the optional scene until core text is usable. One lightweight geometric memo object; no imported room, environment video, or particle system.
- Lazy-load project imagery; use responsive compressed images. Limit rendering resolution on phones, pause rendering off-screen, and release scene resources when unmounted.
- Performance targets, not current measurements: good Core Web Vitals at the 75th percentile (LCP ≤2.5s, INP ≤200ms, CLS ≤0.1). Verify on a mid-range phone and slow mobile connection during the eventual build.
- Check keyboard use, screen-reader order, reduced motion, no-JS/no-WebGL, long text, and image/context loading failures. Core content must remain readable in all cases.
- Correct the CV before linking: Data Analyst rather than genomics researcher, MSc 2020–2022, report preparation about five to two hours, academic capstone, team hackathon contribution, study group rather than inflated Founder headline; remove 35% and misleading traffic baseline.
- Evidence structure should retain source, ownership, scope, dates/period where known, outcome definition, and display permission per item. No confidential files enter public assets or metadata.

## Approval

Rafael approved the recommended direction: “Go with the direction you recommend.” The full storyboard is supplied for review; this statement is not recorded as approval of implementation, publication, missing facts, or final narrative copy. Final wording and actual assets remain later work. This planning workflow does not build the website.
