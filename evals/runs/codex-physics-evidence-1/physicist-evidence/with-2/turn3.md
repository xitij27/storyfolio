I’ll record your approval of the protocol direction and give you the complete plan, including each scroll stage, its 3D behaviour, controls, fallbacks and supporting site requirements. This remains planning only.


The direction is **The calibration protocol**: one continuous page that lets a physicist inspect your reasoning and lets a wider hiring panel understand your personal contribution.

Its central question is **“How do you check whether a timing correction works?”** The page answers through your approved example: choose per-path corrections, freeze them, apply them to held-back pulses, compare the results, and state exactly what that comparison establishes.

The complete plan is saved in [storyboard.md](/tmp/storyfolio-evals/codex-physicist-evidence-with-5ZRbix/docs/story/storyboard.md). No website has been built.

**The object that carries the story**

Eight thin, matte sheets form a protocol document. They stay present from the opening to the closing screen, separating and rearranging as their content becomes relevant.

Their faces carry your approved schematic, procedure, correction values, rounded results, scope and contribution record. These are newly designed presentations of supplied material. The sheets do not pretend to be scans of your notebook or a model of the detector.

On desktop, the document occupies roughly half the screen beside a readable text column. A chapter rail provides direct navigation. The whole sequence takes approximately nine screen heights, with normal scrolling and no scroll locks.

**1. Objective — meet Iris and understand the work**

The first screen establishes:

- Iris Voss, postdoctoral researcher at Northmere Institute for Measurement.
- Your personal contribution: choosing and implementing per-path corrections and performing the held-back reference check.
- A plain explanation of comparing a reported time with its reference.
- The bounded proof: the stated reference-check comparison measure fell from 2.0 ns to 0.2 ns.
- Your interest in fellowship and research instrumentation positions.

The eight sheets begin assembled, with a miniature version of the approved schematic visible. As the visitor scrolls, the front sheet lifts and exposes the comparison beneath it. The opening establishes where the object comes from: your shared calibration procedure.

**Clickable:** CV, email, publications shortcut, chapter navigation and a skip-to-handover link. A visitor can understand your contribution and reach you without completing the scroll.

**2. Reference comparison — explain what is measured**

The page introduces the reference source and paths A, B and C. It explains:

- Each path’s reported time is compared with the reference time for that pulse.
- Raw residual means reported time minus reference time.
- Positive means late; negative means early.
- Times are measured in nanoseconds, abbreviated ns.

Four sheets open into the logical comparison: one reference sheet and three path sheets. Printed connectors follow the approved schematic. The other sheets remain visibly gathered beside them.

The diagram explicitly identifies itself as a logical comparison. Positions and line lengths do not represent detector geometry or cable lengths.

**Clickable:** select A, B or C to highlight its relationship with the reference; reveal short term definitions. All three paths remain visible by default, and selection never hides essential evidence.

**3. Correction — show your decision**

This chapter makes your choice concrete. A and C reported late while B reported early. A common shift would leave their differences unchanged, so you chose a fixed correction for each path.

The path sheets align beside the saved correction table:

| Path | Saved correction from the first group |
|---|---:|
| A | +1.8 ns |
| B | −0.9 ns |
| C | +2.7 ns |

The operation is shown consistently: subtract the path’s saved correction from its raw residual. B deserves a clear explanation: subtracting its negative correction moves its reported time later.

The page identifies this as your decision and implementation without claiming to explain the physical causes of the offsets.

**Clickable:** select a path to connect its table row with the operation; return to the default “show all” view.

**4. Independent check — make the separation visible**

This section has two scroll states.

First, the page shows that the first pulse group sets the three corrections. Those values become fixed before the second group is examined.

Then, the path sheets move into the held-back checking stage while the correction sheet stays stationary. This physical separation makes the important methodological point visible: the check group did not set the corrections.

The page explains that both before and after columns describe the same second group. It does not invent pulse records, sample counts or distributions.

**Clickable:** simple step controls offer the same sequence as scrolling, plus a direct jump to the result. Visitors do not need to manipulate the scene to understand it.

**5. Result — inspect the evidence and the metric**

The three path sheets move along a signed residual scale, from the rounded before-check means to the rounded after-check means:

| Path | Before correction | After correction |
|---|---:|---:|
| A | +2.0 ns | +0.2 ns |
| B | −1.0 ns | −0.1 ns |
| C | +3.0 ns | +0.3 ns |

The scale includes zero, and the final positions visibly remain nonzero.

A comparison sheet then comes forward to explain the aggregate calculation: the **mean absolute value of the three path means, with equal weight per path**.

- Before: `(2.0 + 1.0 + 3.0) / 3 = 2.0 ns`
- After: `(0.2 + 0.1 + 0.3) / 3 = 0.2 ns`
- Ratio: `2.0 / 0.2 = 10`

The table and metric definition stay readable outside the 3D scene. Animation connects the endpoints; it does not count through intermediate numbers or imply a measured time series.

**Clickable:** before/after controls change the spatial arrangement. The complete table remains available alongside them.

**6. Scope — put the result beside its limits**

The result sheet settles next to sheets showing scope and ownership.

The page explains that this summary does not supply individual-pulse variation, a quantified uncertainty estimate, physical offset causes or performance after conditions change. It does not establish increased scientific sensitivity, a new physical effect or performance on scientific data.

Your part is stated precisely: you chose the procedure, implemented the correction table and its application, and performed the held-back check. A lab engineer supplied the reference distribution hardware.

Your working documents—protocol, uncertainty budget and notebook—can be named here. An uncertainty budget is explained as recording sources of doubt in a measurement; no fictional budget is displayed.

The required credit appears beside the schematic and again in the footer:

“Timing calibration extract and schematic: Iris Voss, Northmere Institute for Measurement”.

**Clickable:** optional definitions and credit details. The essential scope remains visible without opening anything.

**7. Supporting record — connect the case to your public work**

The sheets open into a reading spread with ordinary publication links alongside them.

The record includes:

- **“Timing structure in the Vela array”, 2024:** published consortium paper; you are one of 84 authors, with timing calibration and validation as your contribution.
- **“Reference-source calibration for modular detectors”, 2026:** separate public preprint under review, not an accepted journal paper.
- **ArrayTime, €1.8 million, 2025–2028:** the lab’s awarded grant, led by your supervisor as principal investigator; you wrote the calibration work-package section.

The approved example is not attributed to either paper unless that relationship is subsequently established.

**Clickable:** the actual publication links once supplied, plus the downloadable CV. Publication status is visible beside each link.

**8. Handover — answer the opening question and offer contact**

The sheets reassemble into one document, with the check summary and its scope visible on top.

The closing brings together the answer: you fixed separate corrections using the first pulse group, checked them on held-back pulses, and reported the comparison with its limits intact.

It then offers the practical next step for a hiring visitor: contact you about a fellowship or research instrumentation position, read your publications, or download your CV.

**Clickable:** email, CV, publications and back to the opening.

**The look**

The selected palette comes from the document material:

| Element | Colour |
|---|---|
| Background | Warm ivory `#F3F0E7` |
| Main ink | Dark blue-grey `#202C32` |
| Accent | Teal `#006B66` |
| Sheet surface | Pale matte paper `#FFFCF5` |

Fine rules, restrained shadows and generous margins give the sheets their character. Teal marks navigation, selection and reference relationships. Path labels and signs carry meaning independently of colour.

**IBM Plex Sans** handles narrative, headings and navigation. **IBM Plex Mono** handles formulas, printed sheet labels and aligned numbers. Body text is approximately 18 px on desktop and 17 px on phones, with comfortable line spacing and short reading widths.

The result chapter briefly widens to place the diagram and table together. Elsewhere, the composition stays consistent. Final narrative captions remain a later writing task; this plan specifies their content and factual basis.

**Phones, accessibility and losing the 3D**

| Situation | What the visitor gets |
|---|---|
| **Phone** | A single-column page with inline diagrams and the complete table. Static presentation is the default; shallow 3D moments may appear where the device handles them comfortably. No long pinned canvas or artificial scroll gaps. |
| **Reduced motion** | Static chapter arrangements, with no travelling sheets, parallax or animated scrolling. |
| **No WebGL or rendering failure** | A static schematic, sequence diagram and accessible result table replace the scene. Reading continues normally. |
| **No JavaScript** | The complete text, diagrams, table, chapter anchors, CV and email links remain available. Before and after appear together. |
| **Print or saved PDF** | A clean document containing the check, scope, credits, publications and contact details. |

Phone navigation becomes a compact chapter list. Touch targets are at least 44 px. If the table becomes too narrow, values are grouped by path rather than clipping labels or units.

Keyboard access, visible focus, logical headings, adequate contrast and a skip link are required. Nothing depends on hovering or dragging. At increased text size, the layout flows into one column. Assistive technology receives the complete explanation through ordinary page content.

**Everything else the site needs**

“Include” means part of a future implementation.

| Requirement | Decision |
|---|---|
| Chapter navigation | Include anchors, current-chapter indication, contact shortcut and back to top |
| Public work index | Include the approved case and both publications |
| Separate project pages | Defer until additional supported cases justify them |
| Contact | Include direct email access |
| CV | Include a downloadable, public-ready file |
| Credits | Include the exact extract credit and any additional figure-specific credits |
| Search metadata | Include accurate name, role, institution and work description |
| Shared-link preview | Include a protocol-cover illustration and concise identity description |
| Site icon | Include a simple “IV” mark |
| Missing-address page | Include a useful 404 with navigation and contact |
| English | Include; additional languages can follow if needed |
| Print styling | Include |
| Blog | Defer until there is writing and a maintenance intention |
| Testimonials and awards | Omit from this version; none supplied |
| Chat, analytics and contact form | Omit from this version; direct contact serves the stated goal |
| Legal notice | Resolve applicable requirements before launch, once jurisdiction and hosting are known |

Primary text should load immediately; the scene loads afterward. Simple sheet geometry, limited rendering resolution, compressed fonts and paused offscreen rendering keep the experience practical. Future verification should cover slow connections, lower-powered phones, keyboard use, reduced motion and failed rendering.

The remaining launch inputs are actual publication URLs and complete citations, a downloadable CV, confirmation that the supplied email is operational, and domain/hosting details. Additional imagery is optional: the approved extract already supports the whole concept.

The design assumptions are English, one page, one substantial calibration case, direct contact, and the selected paper palette and typefaces. They are recorded in [decided-for-you.md](/tmp/storyfolio-evals/codex-physicist-evidence-with-5ZRbix/docs/story/decided-for-you.md). This completes the planning handover; building remains outside this version of the storyfolio workflow and your request.
