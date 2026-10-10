# Follow the transition — full storyboard

Status: concept A selected by user; storyboard proposed for review. Planning only. Final captions have not been written, and no site has been built.

## Purpose and narrative

Audience: firmware hiring managers. Desired understanding: Ada connects firmware behaviour to a measurable signal. End actions: email and download a corrected CV.

Guiding question: **How do firmware decisions become visible in a current trace?**

The story follows Ada's confirmed firmware, power-state scheduling and bring-up fixture work on Mosslink into the recorded observation of a radio remaining awake after a failed transmission. It finishes by distinguishing observations from projections and stating the scope of testing. It does not claim that Ada fixed the radio issue or delivered a quantified improvement.

The form is a state table expanded into six chapters. The object is one sheet composed of six thin rectangular bands. Six is the presentation structure, not a claim about the device's number of states. Each band keeps its identity throughout. At rest they are recognisable as a document; as they separate, their relationships carry the explanation.

## Chapters

| Chapter | Name in the form | Role | What it tells | What the pieces do | What can be touched |
|---|---|---|---|---|---|
| 1 | Scope | Opening / who / where | Ada's name; confirmed firmware and fixture contributions; Reedglass listed role, 2021–present; question and bench scope | Six bands assemble into one legible state-table sheet | Chapter rail, skip to contact, email/CV links |
| 2 | States | How | Power-state scheduling; state tables and timing diagrams as working documents | Bands fan vertically, maintaining readable alignment | Next chapter; equivalent HTML diagram descriptions |
| 3 | Events | What | Notes describe a failed transmission followed by a radio remaining awake | Bands align around an event annotation; one relationship gains emphasis | Accessible link to observation |
| 4 | Transitions | What / attribution | Approved simplified power-state diagram; Ada wrote firmware and built fixture, colleague designed PCB/analogue front end | Bands form a document-like flow arrangement derived only from approved diagram | Approved diagram and fixture image with descriptive text |
| 5 | Observations | Evidence / limits | Current trace made awake-radio behaviour visible; measured readings versus battery projection; six bench-tested samples; preliminary emissions check | Bands return to aligned evidence rows, then separate measurement, assumption and scope | Inline explanation of projection and testing scope |
| 6 | Notes | Close | Restate confirmed contribution and method; email and CV | Bands reunite into the original state-table sheet | Email, CV download, back to beginning |

## Beats

Desktop scroll lengths are approximate viewport heights; total 7.25. They are pacing targets, not a forced viewing duration. Natural scrolling and chapter links remain available.

| Beat | Screens | How the pieces stand | What is on their faces | What the chapter adds | Caption basis: working title and facts |
|---|---|---|---|---|---|
| 1. Scope | 1 | Six bands form a slightly tilted sheet with readable faces | Ada's name; working-document headings; short contribution labels | Ordinary HTML introduction and immediate contact; stable navigation | Firmware on physical devices: `facts.md` identity, CV role, user answers on firmware/fixture, audience and samples |
| 2. States | 1.25 | Vertical fan with minimal depth; bands remain in view | Supported parts of approved simplified power-state diagram; no invented state names | Plain-language explanation of power-state scheduling, based on stated responsibility; no device-specific cycle claimed | Scheduling power states: user answer on contribution and working documents |
| 3. Events | 1 | Rows align beside a textual failed-transmission marker | Event/observation labels supported by lab notes; no synthetic trace | HTML account of recorded behaviour; no claim of diagnosis ownership or fix | Radio remains awake: original notes, plus unanswered fix/verification question in `facts.md` |
| 4. Transitions | 1.5 | Bands arrange into a shallow flow layout; exact edges depend on approved diagram | Approved diagram fragments; Ada's own approved fixture photo on a band; attribution labels | Plain definition of bring-up and explicit division of work | Firmware and fixture: user answers on contributions, public assets, bring-up definition |
| 5a. Observation | 0.75 | Three aligned pairs of bands form an evidence sheet | Qualitative awake-radio observation and bench-measurement labels | Explanation of what a current trace shows; actual measured trace only if separately permitted | From event to signal: original notes and user audience statement; no actual trace supplied |
| 5b. Limits | 0.75 | Bands separate by measured reading, model assumption and test scope, still recognisable as one sheet | Projection label; 72-hour longest run; 40 engineering samples / 6 bench-tested; preliminary emissions status | HTML limitations with full context, never isolated promotional metrics | What the evidence supports: user battery, sample and qualification answers |
| 6. Notes | 1 | Original sheet whole again; no new object introduced | Confirmed contribution labels and working-document headings | Contact and corrected CV; compact closing synthesis from established facts | Firmware, power scheduling and bench evidence: user contribution, documents, purpose and contact actions |

Final public captions are deliberately deferred. These beat titles identify facts and intended meaning; they are not final copy. Unsupported details remain questions rather than scene content.

## First screen and navigation

A visitor who never scrolls gets Ada's name, a plain description of writing firmware for physical devices, her Mosslink firmware/power-scheduling/fixture contribution, one evidence statement about six bench-tested engineering samples, and contact/CV access. The evidence statement must not imply Ada personally tested every sample. A small static fragment of the approved simplified diagram can provide visual evidence; if it is unavailable, the sourced text remains sufficient.

Explain firmware as code running on the device, power-state scheduling as organising when the device's functions are active, and bring-up as checking a new board's basic operation. Specific Mosslink states and functions require the approved diagram; generic definitions must not imply unconfirmed implementation details.

Desktop: text in a generous left column, scene to the right, six labelled chapter links with current chapter indicated in text and colour. A skip link goes directly to contact. Email and CV remain readily accessible. Native hash links, browser back behaviour, keyboard navigation and focus targets work. No scroll capture, mandatory hover or drag-to-read interactions. Clicking navigation moves the page and scene together; reduced motion jumps directly.

## Motion

Scroll controls sheet assembly, row spacing, shallow depth and alignment. Transformations interpolate between the settled beats. Keep faces readable; use modest rotations, never continuous spinning or a camera fly-through. The whole object remains visible from first to final chapter. Meaningful content stays in HTML; the canvas is an illustrative counterpart.

Use a single sticky desktop scene across chapters. Chapter lengths adjust after a real reading review; never add empty scroll to increase spectacle. Reverse scrolling returns through the same states. No ambient animation is required to understand anything. Stop render updates when scroll is settled and when the page is hidden. An explicit motion toggle can select the static version.

No fake oscilloscope trace, fictional source code, fabricated current readings, simulated test success, circuit-board reconstruction or completed-fix animation. Highlight the relationship described in the notes without suggesting unconfirmed repair.

## Without the scene

All headings, evidence, caveats and links are ordinary HTML in document order. Descriptive static SVG/HTML diagrams and the approved photo replace the 3D sheet; essential information is never a texture only.

| Where | What the visitor gets |
|---|---|
| Phone | Single-column narrative, compact chapter navigation, small static document illustrations between text blocks. No long sticky canvas or scroll padding; contact/CV remain immediate. |
| Reduced motion | Same narrative with six settled static document views; no interpolation, smooth scrolling or parallax. |
| No WebGL | Static approved diagram and fixture photo alongside all HTML text; no error banner needed. |
| No JavaScript | Complete static page with native chapter anchors, images, email and CV links; no blank canvas or hidden text. |

Keyboard focus, contrast and meaningful image descriptions are part of the future acceptance checks. Canvas is hidden from assistive technology when redundant to HTML.

## Look and type

The material is a working engineering document: flat paper-like bands, crisp lines, almost no reflections, restrained shadows. Avoid neon laboratories, floating PCBs and glossy generic technology scenery.

Three preview candidates for a future build; the user's look choice comes from actual preview once a build is separately authorized:

| Look | Ground | Ink | Accent | Piece surface |
|---|---|---|---|---|
| Bench paper — recommended | Warm off-white | Near-black graphite | Deep teal | Matte ivory, fine ruled lines |
| Instrument sheet | Cool pale grey | Deep navy | Burnt orange | Smooth pale-grey sheet, crisp dark rules |
| Night notebook | Charcoal | Warm white | Muted cyan | Matte dark bands with light rules |

Use accent for active relationships and navigation, not status claims. Labels remain readable without colour. Check contrast for the selected palette.

Typeface proposal: Source Sans 3 for prose; IBM Plex Mono for state-table labels and document details. Self-host available licensed font files in a future build; system sans/monospace fallbacks keep layout usable if fonts fail. Prose stays on a comfortable measure, table labels never shrink to accommodate extra text.

## Complete site scope

“Build” below means include if a future build is authorized, not permission to implement now.

| Item | Build, later or never | Decision source |
|---|---|---|
| Navigation | Build: six anchors, contact skip link, immediate email/CV | Planner, to support hiring-manager scanning |
| Separate project pages | Never in current scope: one supported project story | Planner; only Mosslink supplied |
| Every project listed | Build: Mosslink only; no invented projects | Supplied material |
| Contact and CV | Build: email and corrected downloadable CV | User |
| Testimonials | Never in current scope | User: no testimonials |
| Languages | Build: English; other languages later if requested | Planner; supplied language |
| Shared-link preview and icon | Build: Ada's name, firmware focus, flat state-table preview, simple document-row icon | Planner; preview wording still reviewed as public copy |
| Missing-address page | Build: small helpful 404 with home/contact links | Planner |
| Blog | Never in current scope | Planner; no writing supplied or requested |
| Chat | Never in current scope | Planner; user wants email and CV |
| Legal notice | Later: assess country/hosting obligations before publication; location unconfirmed | Planner; no jurisdiction inferred from environment timezone |

No contact form, analytics, cookies, visitor tracking or external embeds are proposed. Download CV from the site itself. Share preview uses an original static diagram graphic, not an unapproved employer image. Suggested title structure is Ada's name plus firmware focus; exact public copy is deferred.

## Future implementation approach

Use a static HTML-first site with TypeScript and a small Three.js scene, built with Vite. One orthographic camera, six simple plane/box meshes, shared materials and local assets. Scroll progress drives transforms between the specified beats. Native CSS handles document layout and sticky positioning; animation must not own the scroll container.

Load the scene after essential HTML and images, only on suitable desktop devices without reduced motion. Cap pixel density, avoid post-processing and large texture sets. HTML text stays crisp independently of WebGL. A static build is deployable to ordinary static hosting; no backend or paid services needed for this scope. Final hosting choice is deferred until requested.

Verification in a future build: factual-copy review against `facts.md`; attribution and asset-permission review; corrected CV; keyboard/focus and chapter anchors; narrow-screen layouts; reduced motion; JavaScript/WebGL-disabled fallbacks; current mainstream browser rendering; scroll reversal; no blank first render. Performance goal: content appears promptly and scene loading cannot delay reading or contact. Measure actual load and animation performance before publication rather than promising scores now.

## Inputs still needed before final public content

- Actual approved fixture photo and simplified power-state diagram. Permission is established; files are not supplied yet. Do not crop in any prohibited colleague diagram.
- Exact public email; supplied `ada@example.com` remains the candidate, not a confirmed live address.
- Corrected downloadable CV; preserve confirmed responsibility division, battery-projection limits, sample scope and unfinished qualification.
- Formal role/title and dates can be checked when finalising the CV; do not infer broader duties.
- Actual current trace only if Ada wants it included and confirms permission. It is optional; the plan works with the sourced qualitative observation.
- Any claim about Ada diagnosing or fixing the awake-radio issue requires confirmation. This storyboard deliberately does not depend on such a claim.

No learning influence or formative anecdote is needed: the opening comes from her confirmed working document. No extra consent is needed for the already approved photo/diagram; check supplied files match that scope.

## Review stop

Ask the user for a yes to this storyboard or specific changes. The selected concept is approved; this full script is still a proposal. Under the storyfolio skill, storyboard approval concludes this planning workflow, and building is outside this version. No build occurs even after approval unless separately requested in an appropriate follow-on workflow.
