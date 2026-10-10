I’ll record your approval of the protocol direction and give you the full plan here, including every section, interaction, fallback, and launch requirement. This remains planning only.


The site will be **a calibration protocol that unfolds as you scroll**, organized around one question: **How do you check that a timing correction works?**

Its story is your personal contribution: choosing separate corrections, implementing them, and checking them on held-back reference pulses. The 3D makes that method easier to follow. The ending connects the evidence to your search for a fellowship or research instrumentation position.

The complete plan is also saved in [storyboard.md](/tmp/storyfolio-evals/codex-physicist-evidence-with-gr64Wj/docs/story/storyboard.md). Nothing has been built.

**The object and the scroll**

Seven thin protocol leaves remain present from beginning to end. Their faces carry the approved schematic, procedure, values, limitations and public record. They gather into a stack, separate into comparisons, align into tables and return to the stack.

These are designed document leaves presenting your approved extract, rather than reproductions of an unseen notebook. Their arrangement expresses logical relationships. It never represents detector geometry or cable lengths.

On desktop, the page spans roughly nine viewport heights. Transitions are short, with readable resting states. Scrolling remains native; there is no compulsory introduction, scroll hijacking or delayed reveal of your name.

**1. Scope — who you are and what visitors will learn**

The opening establishes your name, listed postdoctoral role and institution, fellowship/instrumentation direction, and your personal calibration contribution.

It includes one compact piece of evidence: **2.0 ns before correction, 0.2 ns afterward**, explicitly identified as the equal-weight mean absolute value of three path means in the held-back reference check. Its reference-source scope is visible immediately.

For visitors outside physics, the opening explains the task in ordinary terms: checking how closely three timing paths agree with a reference after applying separate saved corrections.

- **3D:** The schematic, procedure and result leaves assemble into a shallow seven-leaf stack. Essential information is already readable before movement begins.
- **Clicks:** CV, email, “View the check,” and chapter navigation.
- **Purpose:** Someone spending thirty seconds gets your identity, contribution, proof and a way to reach you.

**2. Reference — what is being compared**

The approved schematic shows the common reference source, three timing paths and recorded reference times.

This section defines residual as reported time minus reference time, explains nanoseconds, and identifies positive residuals as late and negative residuals as early.

- **3D:** Leaves separate into the reference, three path records and comparison records. Connectors follow the approved logical schematic.
- **Clicks:** Chapter navigation; a schematic description is available alongside the figure.
- **Purpose:** Establish the measurement before showing a result. Definitions remain visible rather than hidden in tooltips.

**3. Compare — why separate corrections matter**

Visitors see that A and C report late while B reports early. The section explains that shifting every path by the same amount leaves their differences unchanged.

The displayed values are clearly labeled as the **held-back group before correction**:

| Path | Mean residual before correction |
|---|---:|
| A | +2.0 ns |
| B | −1.0 ns |
| C | +3.0 ns |

- **3D:** Three path-record leaves spread around a shared, labeled zero line. Their signed positions express the comparison; the other leaves remain visible nearby.
- **Clicks:** Visitors can jump forward to the correction procedure or validation.
- **Purpose:** Make your decision understandable before introducing its implementation.

**4. Correction — your choice and implementation**

This chapter has two scroll beats.

First, visitors see that the corrections came from the **first pulse group**, then were frozen before the second group was examined:

| Path | Saved correction |
|---|---:|
| A | +1.8 ns |
| B | −0.9 ns |
| C | +2.7 ns |

Second, the page explains the application: subtract each path’s saved correction from its raw residual. Path B receives particular attention because subtracting its negative correction moves its time later.

Your ownership is explicit: you chose the per-path procedure and implemented the correction table and its application. The engineer supplied the reference distribution hardware.

- **3D:** Correction leaves sit beside their matching path records. First-group corrections and held-back check records occupy distinctly labeled areas.
- **Clicks:** A procedure control reveals the four steps together. The essential method remains readable without using it; without JavaScript, the complete procedure is expanded.
- **Purpose:** Show both your contribution and the separation between establishing corrections and checking them.

**5. Validation — the evidence**

The first beat displays the full comparison on the **same held-back group**:

| Path | Before correction | After correction |
|---|---:|---:|
| A | +2.0 ns | +0.2 ns |
| B | −1.0 ns | −0.1 ns |
| C | +3.0 ns | +0.3 ns |

The second beat explains the summary measure:

- Before: `(2.0 + 1.0 + 3.0) / 3 = 2.0 ns`
- After: `(0.2 + 0.1 + 0.3) / 3 = 0.2 ns`
- Ratio: `2.0 / 0.2 = 10`

Each path has equal weight. The values are rounded, and the remaining residuals are visibly nonzero.

- **3D:** Path records align into before/after columns on the same signed scale. A summary leaf comes forward while the individual path values remain visible.
- **Clicks:** A before/after control switches emphasis. Both columns remain available together in the HTML table, so interaction is optional.
- **Purpose:** Let a physicist inspect the arithmetic while giving a wider panel a clear, bounded outcome.

The schematic and result carry the required credit:

“Timing calibration extract and schematic: Iris Voss, Northmere Institute for Measurement”

**6. Limits — what the check establishes**

The page gives the limits comparable visual weight to the result.

It states that this is a laboratory reference-source check. The summary does not supply pulse-to-pulse spread, an uncertainty estimate or scientific sensitivity. It does not identify the offset causes, establish performance on scientific data, or prove that the corrections remain valid after conditions change.

- **3D:** Leaves settle into a flat, readable arrangement. Residuals never animate to zero.
- **Clicks:** Ordinary navigation; every limitation is directly readable without expansion or hover.
- **Purpose:** Make the result interpretable and show exactly where its evidence ends.

**7. Record — public work and the next step**

The final section connects the case to your public record:

- **2024 consortium paper:** published; one of 84 authors; your contribution was timing calibration and validation. You were not first author and did not lead its scientific analysis.
- **2026 calibration manuscript:** separate public preprint, under review and not accepted.
- **ArrayTime:** the lab’s awarded €1.8 million grant, with your supervisor as principal investigator; you wrote the calibration work-package section.

The closing answer returns to your chosen procedure, implementation and held-back check, with its scope intact. CV and email provide the next action for a fellowship or instrumentation hiring panel.

- **3D:** The seven leaves return to the recognizable protocol stack. Its record face rests beside the publication and contact links.
- **Clicks:** Published paper, preprint, CV, email and an optional public grant link if supplied.
- **Purpose:** Leave visitors with a clear account of your contribution and a direct route to contact you.

**The look**

The chosen palette comes from readable protocol material:

| Element | Colour |
|---|---|
| Background | Warm paper — `#F3F0E8` |
| Leaves | Pale ivory — `#FFFCF5` |
| Text | Dark ink — `#17252B` |
| Accent | Restrained blue — `#285B9A` |

The leaves have subtle thickness, fine ruled separators and soft shadows. Spacious composition and large chapter numbers give the page presence. Technical labels remain readable rather than becoming tiny textures on angled surfaces.

**Source Sans 3** handles explanations and navigation. **IBM Plex Mono** handles protocol labels, formulas and numerical records, with aligned digits. Both would be self-hosted with appropriate licensing and system-font fallbacks.

Blue marks emphasis. Signs, labels and units convey meaning independently of colour.

**Navigation and interaction**

A persistent header provides CV and contact links. Desktop has a labeled chapter rail; mobile has a compact chapter index. Each chapter has a shareable anchor.

“View the check” lets visitors bypass the introductory explanation, and a direct contact link skips to the close. Browser back/forward navigation works normally.

Controls are keyboard accessible with visible focus. Scrolling never moves keyboard focus. The page has no compulsory gestures, hover-only explanations or pointer-following effects.

**On a phone**

The experience becomes a single-column document with stacked figures and records. The seven-leaf motif remains recognizable, but long pinned 3D sequences give way to static diagrams and short optional transitions.

Text stays around 18px with comfortable spacing. Touch targets are at least 44px. Numerical records stack by path with their labels and units repeated, avoiding dependence on a wide table. CV and contact remain easy to reach.

The phone version tells the complete story at the reader’s pace. Its clarity does not depend on rendering a desktop scene.

**Without motion or 3D**

| Situation | Experience |
|---|---|
| Reduced motion | Static settled figures; no scrubbed camera, parallax or object travel. Before/after changes instantly. |
| No WebGL | SVG schematic and signed comparison figures, alongside the complete HTML table and procedure. |
| No JavaScript | Complete pre-rendered page, static figures, expanded procedure, both result columns and working ordinary links. |
| Scene fails to load | Static content remains available and readable. |

All substantive text is HTML. No essential claim, value, credit or link exists only on a 3D surface.

Static content loads first. Optional 3D loads afterward, stops rendering offscreen and reduces detail where needed. The plan avoids large textures, continuous effects and heavyweight external embeds.

**Everything else the site needs**

“Included” below means part of a future implementation. This task remains planning only.

| Item | Decision |
|---|---|
| Chapter navigation | Include header links, anchors, desktop rail and mobile index. |
| Separate project pages | Defer until more complete public cases are supplied. |
| Work coverage | Include the approved calibration case, both publication records and accurately attributed grant context. |
| CV | Include an accessible downloadable PDF and useful on-page summary. Actual file pending. |
| Email | Include a verified public address. Treat the supplied example address as unverified. |
| Publication links | Include correct citations, authorship and explicit status. Exact URLs pending. |
| Credits | Preserve the extract’s required credit beside its schematic and results, including static versions. |
| Testimonials | Omit; none are supplied. |
| Languages | English initially. Add reviewed translations later if wanted. |
| Search metadata | Include accurate title, description, semantic headings, indexable text and canonical URL once known. |
| Shared-link preview | Use a static protocol/table image with your name and accurately scoped work description. |
| Site icon | Use a simple protocol-leaf motif. |
| Missing-page experience | Include a readable 404 with home, CV and contact links. |
| Blog | Defer until there is public writing you want to maintain. |
| Chat or contact form | Omit initially; direct email meets the requested action. |
| Analytics | Omit initially; add only for a defined need. |
| Privacy and legal notices | Determine from actual hosting practices and jurisdiction before launch. |
| Domain and hosting | Choose later; no purchase or publication is part of this task. |
| Final copy | Write and check against the approved facts before publication. |
| Verification | Check signs, arithmetic, scope, authorship, status, credits, links, contrast, keyboard access, mobile layout and all fallback modes. |

I’ve used your delegated judgment to choose the protocol, warm-paper appearance, English, one page and direct email contact. Missing biography, quotations, imagery and links are omitted rather than guessed. Those decisions are recorded in [decided-for-you.md](/tmp/storyfolio-evals/codex-physicist-evidence-with-gr64Wj/docs/story/decided-for-you.md).

The remaining launch assets are your actual CV, verified public email and correct publication links. Your chosen direction is recorded, and the planning handover is complete. Building remains outside this planning version and your current instruction.
