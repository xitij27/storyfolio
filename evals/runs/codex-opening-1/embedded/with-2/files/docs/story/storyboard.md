# State by state — full page storyboard

Status: concept selected by Ada; storyboard awaiting review. Planning only. No website, prototype, 3D assets or production code have been built.

## Governing idea

Question: **How does a firmware decision become a measurable signal?**

One long page follows the form of a state table. One persistent 3D object consists of six thick row cards, made from matte paper-like material with squared edges. The cards become a responsibility table, a diagram and an evidence review before returning to their original table. These are six narrative pieces, not six real firmware states or sample boards.

The story is Ada's firmware, power-state scheduling and bring-up fixture work on Mosslink. It must keep a colleague's PCB and analogue front-end contribution distinct. It must distinguish measurements, projections and incomplete qualification.

Final captions are deliberately deferred. Every beat below specifies the facts its text may contain; it does not invent polished claims. Chapter labels are proposed document headings, not a claimed existing template used by Ada.

## Chapters

| Chapter | Name in the form | Role | What it tells | What the pieces do | What can be touched |
|---|---|---|---|---|---|
| 1 | Scope | Opening and who | Ada; firmware for physical devices; question; fixture preview | Flat table gains shallow depth, staying legible | Chapter links, email, CV, skip to close |
| 2 | Responsibilities | Who and project attribution | Ada wrote firmware, scheduled power states and built fixture; colleague designed PCB and analogue front end | Rows separate into two clearly attributed groups | Ordinary text links to next chapter |
| 3 | State | How | Power-state scheduling and state tables as working documents | Rows line up as a document with annotated relationships | View permitted simplified diagram at readable size |
| 4 | Transition | How and what | Simplified power-state diagram alongside timing-diagram practice | Same rows spread into a connected schematic | Diagram description and keyboard-operable image expansion |
| 5 | Observation | What and evidence | Fixture; assembled versus tested samples; projection versus endurance; preliminary check | Rows form a bench evidence review; photo has the largest face | Expand permitted fixture photo; read evidence notes |
| 6 | Review | Answer and close | Firmware, scheduling and fixture work read alongside stated bench evidence; invitation to discuss firmware roles | Rows return to one complete table | Email and downloadable corrected CV |

No career-history chapter is padded from a single CV entry. No testimonials, extra projects or unsupported incident outcome are added.

## Beats

One screen means approximately one desktop viewport of scroll. Total desktop story: approximately eight viewports, adjusted when real text and assets arrive. Durations are a budget, not a requirement to force empty space. On mobile, content determines height.

| Beat | Screens | How pieces stand | Faces | Added scene elements | Caption basis: working title and facts |
|---|---|---|---|---|---|
| 1. Scope | 1 | Six rows laid flat as one table, slight elevation | Ada's name, selected question, contribution labels, small permitted fixture-photo preview | Nothing | **Firmware and the bench** — facts: identity from CV; user-confirmed firmware/scheduling/fixture contribution, target audience and bring-up definition |
| 2. Responsibilities | 1 | Same rows separate into two attributed columns, all pieces visible | Ada: firmware, power-state scheduling, fixture; colleague: PCB, analogue front end; Mosslink named | Thin dividers connecting attribution to text | **Who made what** — user-confirmed contribution split; no ownership of the entire sensor design |
| 3. State | 1 | Rows return to a ruled table | Confirmed contribution notes and permitted simplified diagram excerpts after artifact inspection | Thin rules and annotations derived only from supplied public diagram | **Scheduling power states** — confirmed power-state scheduling, state-table daily practice; actual state names and entries await the diagram |
| 4. Transition | 1.5 | Rows unfold into a connected schematic, with slight depth separation | Parts of the permitted simplified power-state diagram, distributed without inventing extra states | Connectors from that diagram; a labelled explanatory timing guide only if consistent with the supplied artifact | **Reading transitions** — confirmed simplified diagram permission and use of timing diagrams/current traces; no claimed diagnosis, fix or measured result for the radio-awake incident |
| 5a. Fixture | 1 | Rows form a shallow bench review with photo face foremost | Ada's permitted test-fixture photo; firmware/scheduling/fixture contribution labels | Nothing; no reconstruction of the colleague's board circuitry | **Checking basic operation** — user-confirmed fixture work and definition of bring-up |
| 5b. Evidence | 1.5 | Rows align as an evidence ledger with equal readable weight | Forty assembled / six bench-tested / no customer deployment; projected battery estimate / longest run 72 hours; one preliminary emissions check / qualification unfinished | Textual labels for assembled, bench-tested, projected and unfinished | **What the bench supports** — user-confirmed samples, battery limitations and qualification status; no fabricated current values or implication that the 72-hour run validated the projection |
| 6. Review | 1 | Rows reassemble into the opening table | Contribution summary, permitted artifact thumbnails, explicit evidence limits | Nothing | **Code beside evidence** — confirmed firmware/scheduling/fixture contribution and hiring goal; email and downloadable CV request |

## Scroll choreography

- The scene occupies a sticky desktop pane; readable HTML occupies the adjacent pane. At chapter boundaries the cards settle into a legible arrangement before the next transformation begins.
- Scroll position directly controls transitions. No autoplay, endlessly rotating object, inertia that outlasts scroll, scroll hijacking or forced horizontal navigation.
- Use short translation and rotation movements. Keep the camera steady except for a small framing adjustment in Transition; no fly-throughs or full spins.
- Faces remain oriented toward the reader when their content matters. Static HTML repeats their substantive information; moving labels are never the only source.
- Evidence is revealed as the rows align, but HTML evidence notes remain available without the reveal animation.
- Chapter navigation jumps to stable arrangements. Direct links such as `#observation` open the correct HTML section and initialize the scene to the appropriate settled state, if a scene is available.
- The current-trace relationship is explained in text as part of Ada's daily practice. No actual employer current trace is displayed without a supplied, permitted artifact. No illustrative curve masquerades as a measurement.

## A visitor with thirty seconds

The first screen carries Ada's name, her confirmed firmware/scheduling/fixture contribution, a permitted fixture-photo preview, and the selected question. Explain firmware as code that controls a physical device, and bring-up as checking a new board's basic operation. These are planned meanings; final introductory wording awaits a later copy step.

Email and CV sit in a compact persistent header. A chapter rail names Scope, Responsibilities, State, Transition, Observation and Review; a Skip to contact link jumps to Review. The photo is evidence of an artifact Ada built, not evidence of battery endurance, qualification or a field deployment.

Before assets arrive, the plan reserves this photo space; it does not substitute a fake device or stock photograph.

## Without the scene

All content is semantic, server-rendered or statically generated HTML. The 3D supplements it.

| Where | Visitor gets | Replacement for moving pieces |
|---|---|---|
| Phone | Single-column chapters, photo and diagram large enough to read, compact chapter navigation and email/CV; no long sticky desktop scroll distances | Static card arrangements and diagram; no required WebGL download on narrow screens |
| Reduced motion | Same chapters and links; no scroll-driven rotation, translation or parallax | Static six-row table and static chapter arrangements |
| No WebGL or renderer failure | Complete text, attribution, evidence notes, permitted photo and diagram; contact works | CSS table/cards and the actual permitted images |
| No JavaScript | Full page, chapter anchors, image descriptions, email and CV links | HTML/CSS table, static diagram and fixture image |

Images have meaningful alternative text written after inspection; complex diagram gets a plain text description. Keyboard order follows the story. No interaction depends on drag, hover or colour alone. Focus is visible; reduced-motion preference is respected from first render.

## Look and type

Recommended default: **Bench paper**. Optional looks belong to the same object/material, not separate concepts. A future build can offer a compact persistent appearance control beside the header; it should not interrupt the story or require a choice to read.

| Look | Ground | Ink | Accent | Piece surface |
|---|---|---|---|---|
| Bench paper — default | Warm off-white | Graphite | Muted amber | Matte cream with fine ruled lines and subtle edge thickness |
| Instrument paper | Deep graphite | Pale ivory | Muted amber | Dark matte cards with fine pale rules |
| Review sheet | Cool light grey | Charcoal | Restrained blue | Smooth light-grey cards with restrained annotations |

Body type: **Source Sans 3**, for readable prose and headings. Piece labels/table notation: **IBM Plex Mono**, matching technical document notation. Self-host fonts in a future build, retaining their licenses and system fallbacks. Large readable labels, generous margins, minimal shadows and no glossy sci-fi decoration. Colours must pass contrast checks; evidence statuses always have text labels.

## Site completeness

“Build” below means included in a possible future implementation, not authorization to implement now.

| Item | Build, later or never | Decided by |
|---|---|---|
| Navigation | Build: chapter links, skip-to-content, skip-to-contact, anchor URLs | Planner, to support short visits and keyboard access |
| Individual project pages | Never in this scope: one complete Mosslink case study on the page | Planner, only one supplied project |
| Every project listed | Build: Mosslink only; do not invent a grid | Planner, source scope |
| Email and CV | Build: header and closing links; final address and corrected accessible PDF required | Ada requested both; placement chosen by planner |
| Testimonials | Never in this scope | Ada: none |
| Languages | Build: English only; later if Ada supplies translations | Planner, source language |
| Shared-link preview and icon | Build: title identifying Ada and firmware work, factual summary, static state-table motif with Ada's name; simple AM/table-rule icon | Planner; final preview wording later |
| Missing-address page | Build: short readable 404 with Home and contact links | Planner |
| Blog | Never in this scope | Planner, no supplied writing or request |
| Chat | Never in this scope | Planner, Ada requested email/CV |
| Legal notice where required | Later: determine hosting/publishing jurisdiction and required particulars before publication | Planner; jurisdiction not supplied |

## Future implementation outline — no build yet

- Use a static-first page with semantic HTML and CSS; a single Three.js scene supplies the six row cards. One scroll controller maps chapter progress to positions. Framework choice should follow the eventual repository rather than trigger a new setup now.
- Use simple box geometry, a small number of materials, compressed image textures and no post-processing dependency. Render only when scene state changes; pause offscreen and when the tab is hidden.
- Load the scene after the initial readable content, with an explicit static fallback. Avoid fetching the 3D bundle where the mobile/static mode is used.
- Retain the same six pieces across chapters; transitions and face changes carry the selected concept. No extra decorative scenes.
- Validate attribution and every evidence statement against `facts.md`; verify mobile layout, keyboard navigation, reduced motion, JavaScript/WebGL fallbacks, deep links, contact/CV links and readability before any future handover.
- Deployment is outside this planning request.

## Asset checklist and unresolved matters

Required before a future build:

1. Ada's permitted fixture photo, supplied without the prohibited circuit diagram visible. Inspect the actual file before composing crop/alt text.
2. The permitted simplified power-state diagram. Inspect labels and topology before specifying real state names, entries or connector animations. The six narrative cards do not imply six actual states.
3. A corrected downloadable CV: distinguish Ada's firmware/scheduling/fixture from colleague PCB/analogue work; describe battery life as projection, samples as engineering samples, and emissions as preliminary with qualification unfinished.
4. Final public email address. `ada@example.com` is source-listed but not explicitly confirmed as publication contact.

Optional only: a separately permitted current trace or confirmed public account of the radio-awake issue. Neither is required for this storyboard. Do not infer that Ada fixed it or add an outcome.

Current title/dates remain CV-sourced and are not expanded into a career story. Other disclosure limits and influences remain unknown and unused. No publishing is authorized.

## Review request

Ask Ada to approve this storyboard or specify changes. Concept choice does not constitute storyboard approval. This plan defines content facts and interactions; final prose is a later copy step. A storyboard yes does not authorize building, which Ada explicitly excluded.
