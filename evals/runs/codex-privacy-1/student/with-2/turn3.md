I’ll give you the complete plan for the open job card direction, including every scroll beat, interaction, fallback, and site requirement. I’ll keep unconfirmed facts separate from design choices. No building.


The direction is **The open job card**: one long page, seven paper records in 3D, and a story organized around the working sequence you described at the co-op.

The page answers **“How do I approach a mechanical problem?”** through your workflow, your contributions, and the evidence available so far. It is designed for an engineering placement reviewer with two minutes.

These facts remain unresolved before publication:

1. Your current study year, next placement period, and real contact, CV, and blog links.
2. The bracket’s comparison baseline, detailed division of work, and permission to show team CAD.
3. Photograph authorship and publication rights.
4. Any detailed restoration diagnoses or lessons you want included.

The plan does not depend on guessing them. Nothing has been built.

**The overall experience**

On desktop, readable text sits beside a persistent 3D packet of seven cards held in a simple metal clip. The cards contain project identifiers, contribution records, photographs where permitted, and evidence status.

As the visitor scrolls, those same cards open, spread, pair, and gather. Their arrangements explain the information: a sequence for your workflow, a contact sheet for parts, paired records for contribution and outcome.

The page is approximately seven desktop screens long, targeting a 90–120-second first read. That is a design target to check during implementation. Navigation lets someone take a shorter route immediately.

**1. Job details — the first screen**

The opening establishes:
- Mina Park.
- Mechanical engineering.
- The guiding question.
- One concrete contribution: the gear train and housing for a four-person phone-charger project.

Your current year and placement dates enter only after confirmation.

**3D:** The clipped packet opens slightly. Its front record stays readable, while the other six cards remain visible behind it. This settled state works immediately; animation does not delay the introduction.

**Visitor actions:** Jump directly to Projects, Checks, or Contact; open the verified CV when supplied.

**Scroll allowance:** About one screen.

The object’s origin is your stated job-card practice. There is no invented first-repair anecdote or mentor story.

**2. Reported issue — the work in scope**

Three concise records introduce:
- The hand-crank phone charger.
- The pedal box mounting bracket.
- The road-bike restoration.

Each establishes the project’s identity and available scope. This section does not invent design requirements, customer complaints, or reasons a component needed changing.

**3D:** Three project cards advance from the packet. Four remain behind, preserving the sense of one object.

**Visitor actions:** Select a project to jump to its contribution details later in the page.

**Scroll allowance:** About three-quarters of a screen.

“Reported issue” functions as the job card’s scope field; it does not imply that these three projects were customer repair jobs.

**3. Findings — how you work**

This section explains the exact sequence you named:

**What the customer reports → what you find → parts → what you do → test ride.**

It gives the reviewer a concrete account of your working routine. We will use the field names and your explanation, without manufacturing an example repair.

**3D:** Five cards spread into an ordered sequence. The remaining two stay stacked at the edge. Their arrangement makes the progression visible.

**Visitor actions:** Focus individual fields through ordinary HTML controls. The full sequence remains readable without interacting.

**Scroll allowance:** About one screen.

Workshop logbook use can appear as brief supporting context. There is no generic skills chart or invented proficiency rating.

**4. Parts — the visual evidence**

This is the main photographic moment. Proposed selections are:
- One photograph of the bike parts laid out on the floor.
- Two useful component closeups.
- Records identifying your charger contribution: gear train and housing.

The exact component names and image descriptions follow inspection of the supplied photographs. We do not infer condition, repair success, or authorship from availability alone.

**3D:** The seven cards settle into a compact contact sheet. Photographs occupy selected faces; contribution and project records fill the others.

**Visitor actions:** Open a photograph at a useful viewing size, see its description and credit, then dismiss it by button, Escape, or keyboard controls.

**Scroll allowance:** About one screen.

If image rights remain unresolved, readable contribution records occupy those slots. The story still works.

**5. Work carried out — your contribution**

This section makes personal responsibility explicit.

| Project | What the record contains |
|---|---|
| Phone charger | Group of four; your part was the gear train and housing; first-year module, 2025 |
| Bracket | Current CAD/simulation stage; detailed individual scope added after clarification |
| Restoration | Project identity and permitted photographs; detailed repair claims added only when confirmed |

Hallam Racing context can include your October 2025 joining date. The July competition ranking stays out.

**3D:** Cards form paired rows, placing project context beside contribution. The seventh card acts as the index. A permitted bracket CAD still can sit on its project record.

**Visitor actions:** Expand concise inline details. The summaries remain visible; only supporting information is tucked away.

**Scroll allowance:** About one screen.

Separate case-study pages are unnecessary for the current amount of verified material.

**6. Checks — results and limits**

This section gives outcomes room to be assessed.

For the **charger**, it records your reported group-prototype observation: **four minutes of cranking for one percent of charge**. Your gear train/housing contribution remains separate from the overall result. No testing protocol or universal charging rate is implied.

For the **bracket**, it states that it has **not been manufactured or physically tested**. The 18% reduction remains withheld until its comparison baseline is clear; if used later, it must retain the CAD/simulation qualification. November machining is a scheduled next step, not a completed result.

For **co-op practice**, the test ride is shown as a step in your job-card workflow. It does not establish an outcome for the restoration.

**3D:** The charger observation and bracket status turn face-on together. Other cards remain in shallow layers behind them. The arrangement lets the reviewer compare evidence types.

**Visitor actions:** Open supporting context or jump back to the project details.

**Scroll allowance:** About one-and-a-quarter screens.

**7. Handover — the closing screen**

The ending gathers:
- The workflow you described.
- Your confirmed contribution.
- The reported prototype outcome.
- The work still awaiting physical checks.
- A clear contact action.

This answers the opening question through the records already shown. Final closing prose is a later copy task.

**3D:** All seven cards gather back into the clipped packet. Its front face becomes the handover record.

**Visitor actions:** Email you, download the CV, and visit the blog once its address is verified.

**Scroll allowance:** About one screen.

**Navigation and interaction**

A discreet desktop rail links to the seven chapters. Prominent shortcuts lead to Projects, Checks, Contact, and the CV. On a phone, navigation becomes a compact set of ordinary anchor links.

Scrolling remains native. Visitors control the pace and can skip any part. Core evidence never depends on dragging, hovering, opening an accordion, or waiting for a reveal.

The 3D responds to scroll position through restrained transitions between seven settled arrangements. A nearly fixed camera, short card travel, matte surfaces, and soft shadows keep the record faces legible.

**The look and typography**

The selected look is **Workshop paper**:

| Element | Direction |
|---|---|
| Background | Warm off-white `#F1EEE6` |
| Text | Charcoal `#202522` |
| Accent | Deep green `#28594B` |
| Cards | Pale, matte paper with fine printed rules |
| Clip | Subtle brushed metal |

This is a design choice, not an assumption about your actual stationery or bike colour.

**Source Sans 3** handles headings and body text. **IBM Plex Mono** handles card labels, dates, identifiers, and measurements. Body text stays in the sans serif.

Proposed sizes are 44–64 px for desktop headings, 32–40 px on mobile, and 16–18 px for body text. Text columns remain comfortable to read, with roughly 55–70 characters per line.

Two alternatives are preserved in the planning document: cool grey with dark blue, and cream with oxide red. The selected palette is warm paper and green; no theme switcher is needed.

**On a phone and without 3D**

Every fact, link, attribution, and outcome lives in ordinary HTML. The canvas is an additional presentation layer.

| Situation | Experience |
|---|---|
| Phone | Single-column job-card sections with static illustrations and photographs by default. Tap to inspect images. Content determines section height |
| Reduced motion | Fixed card arrangements, immediate anchor navigation, and the same readable content |
| No WebGL | Static records replace the scene and preserve its relationships |
| No JavaScript | Fully readable HTML, normal anchors, image links, native expandable details, email, and CV |
| Assistive technology | Logical headings, descriptive links, image alternatives, and contribution/outcome text in reading order |

Mobile tap targets are at least 44 px. Future checks cover narrow screens, landscape, long links, keyboard access, screen readers, and 200% zoom. Essential measurements never exist only as text on a 3D texture.

**Everything else the site needs**

“Included” below means part of a future implementation; no implementation is underway.

| Item | Decision |
|---|---|
| Navigation | Include section anchors, shortcuts, active-section indication, and a skip link |
| Project coverage | Include charger, bracket, and restoration; co-op practice provides working context |
| Separate project pages | Later, when verified process and evidence justify them |
| Contact | Include verified public email |
| CV | Include an accessible PDF, reachable from opening and closing |
| Testimonials | Omit; none exist |
| Languages | English initially |
| Shared links | Factual title/description and a static job-card preview image |
| Favicon | Simple MP icon |
| Missing-address page | Include a concise 404 with a return link |
| Blog | Link externally once verified; integration can wait |
| Chat | Omit |
| Privacy | No tracking, cookies, or third-party embeds initially |
| Legal notice | Establish actual publishing requirements before launch |
| Accessibility | Keyboard controls, visible focus, contrast checks, image descriptions, accessible viewer, and motion fallbacks |
| Performance | Readable content first; responsive compressed images; defer the scene until essential content is available |
| Maintenance | Editable attribution, evidence type, project status, image credit, and review date |
| Hosting/domain | Choose later; no purchase or deployment now |

Future performance targets are an initial compressed critical payload below 300 KB and largest-content loading under 2.5 seconds on representative mobile conditions. These require measurement during implementation.

**Assets, assumptions, and publication readiness**

The proposed visual minimum is one floor-layout photograph, two bike-detail photographs, and one permitted bracket CAD view. Charger photographs are optional. Actual customer job cards are unnecessary.

I chose the concept, palette, typefaces, chapter order, inline project detail, English, direct email, and static mobile presentation under your instruction to use judgment. I have not assumed missing facts, image rights, or completed project outcomes.

Before publication, the contact/CV links and asset permissions need resolving; every claim, metadata field, and card label needs checking against the fact sheet; and bracket status needs updating to what has actually happened.

The complete plan is saved in [storyboard.md](/tmp/storyfolio-evals/codex-student-with-cwRfiq/docs/story/storyboard.md), with [facts](/tmp/storyfolio-evals/codex-student-with-cwRfiq/docs/story/facts.md), [decisions](/tmp/storyfolio-evals/codex-student-with-cwRfiq/docs/story/decided-for-you.md), and an updated [handover](/tmp/storyfolio-evals/codex-student-with-cwRfiq/docs/story/handover.md). Building is outside this planning version and remains excluded by your instruction.
