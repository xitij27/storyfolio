The direction is **“From requirement to verification”**: a portfolio built around one detailed engineering story, showing how you translate requirements into design choices, assess assembled fit, and plan the evidence needed to verify performance.

The visual signature is an approved external render paired with a **new, dimension-free 3D schematic**. The schematic moves as the visitor scrolls, helping explain your contribution without exposing confidential geometry. It is visibly labeled **“Simplified explanation — not production geometry.”**

The page should work at two speeds: a hiring lead can scan your role, contribution, result, and project status quickly, or follow the full engineering argument.

### 1. Navigation

A quiet, persistent header contains **Nadia Okafor**, **Work**, **Approach**, **About**, **Email**, and **CV**.

- Your name returns to the top.
- Work jumps to the project brief.
- Approach jumps to the verification section.
- About jumps to your profile.
- Email opens the visitor’s email application.
- CV opens an accessible PDF, with a download option.

Use native scrolling and ordinary links. Anchor destinations must remain visible below the header.

**3D:** None in the navigation. The model never blocks controls.

### 2. Opening: who you are and how you think

Suggested opening copy:

> **Nadia Okafor**  
> Mechanical design engineer  
> **From requirement to verification.**
>
> Cooling hardware developed through design choices, assembly considerations, and verification planning.
>
> Seeking senior mechanical design roles.

Place the approved external render prominently beside the copy. Below it, introduce the newly created schematic in a similar orientation, with a clear change of visual treatment and its explanatory label.

Primary action: **Explore the cold-plate redesign**.  
Secondary action: **View CV**.

**3D:** The schematic makes one small rotation to establish depth, then rests. Pointer movement is unnecessary. The approved render remains a static image; it is not treated as an interactive CAD asset.

**Without 3D:** The approved render and a still of the schematic provide the same introduction.

### 3. Project brief: establish scope and ownership

Introduce the cold-plate redesign with a compact project summary:

| Item | What the page says |
|---|---|
| Context | Employer-owned work at Alderwake Drives |
| Your contribution | Channel manifold and assembly interface |
| Thermal evidence | 18°C reduction in simulation at 800 W and the stated inlet flow |
| Physical model | Polymer fit-check model for assembly |
| Current status | No metal cold plate made or pressure-tested; not in production |
| Patent | Application filed in 2025; not granted; three inventors |

Follow this with a short explanation of the original engineering problem, once its public wording is confirmed.

**3D:** The schematic rotates to a stable overview. Only the areas relevant to your contribution receive callouts. Other schematic components stay visually subdued.

**Clicks:** **Read the project status** jumps to the verification section. Callouts can be selected to highlight their corresponding text; the explanations are also visible without interaction.

### 4. Requirements: show where decisions begin

Use a public-safe requirements summary, newly written for the site. Do not publish the internal requirements table as a screenshot.

Present a small number of actual requirements, each connected to:

1. What the design needs to achieve.
2. The design choice it informs.
3. How compliance will be assessed.

The final categories and wording must come from your project. Thermal behavior and assembled fit are relevant starting points, but numerical limits and acceptance criteria must not be invented.

**3D:** Selecting a requirement highlights the relevant schematic region. Scrolling introduces the connections in sequence, without automatically changing content before the visitor can read it.

**Clicks:** Requirement rows select matching annotations. All rows remain readable, with one selected state rather than hidden essential information.

**Without 3D:** A labeled schematic sits beside the requirements, using matching reference markers.

### 5. Design choices: explain your contribution

Create two substantial passages:

**Channel manifold**  
Explain the requirement it addresses, the choice you contributed, the alternatives or tradeoffs you considered, and the evidence used to assess that choice.

**Assembly interface**  
Explain how parts locate during assembly, what the interface must accommodate, and how you approached assembled fit.

Write these passages from confirmed project detail. Do not imply that you designed every feature or that an illustrative schematic reproduces the actual internal design.

**3D:** The schematic separates into a few explanatory elements. The channel-manifold passage highlights a simplified channel arrangement; the assembly passage shows locating relationships. No detailed internal geometry, dimensions, or simulation-like flow effects.

The scene rests at each useful view. Scrolling back reverses the movement.

**Clicks:** **Enlarge schematic** opens a labeled still with its explanation. Avoid requiring visitors to orbit the model to discover important features.

### 6. Tolerance stack: make mechanical reasoning visible

Introduce the artifact with plain language:

> A tolerance stack checks how variation in separate parts affects their assembled fit.

Then explain how you used a tolerance stack in this project, using public-safe wording.

A separate illustrative diagram can demonstrate how several part variations affect one assembled relationship. Label it **“Illustrative example; no project dimensions shown.”** It must not imply project values or results.

**3D:** A few schematic parts move slightly to demonstrate variation and its effect on fit. Use discrete nominal and illustrative variation states; avoid exaggerated movement that suggests actual clearances.

**Clicks:** Visitors can switch between **Nominal** and **Illustrative variation**. The accompanying text explains both states.

**Without 3D:** Two side-by-side diagrams show the same comparison. On phones, they stack vertically.

### 7. Polymer fit check: identify what physical evidence establishes

Show the polymer fit-check model if a photo is available and approved for publication.

Explain:

- What assembly or fit questions were checked.
- What was observed.
- Whether those observations led to changes.

Include only confirmed findings. The supplied material establishes that the model exists, but does not specify every check or outcome.

A visible evidence label reads:

> **Physical evidence: polymer assembly fit check**  
> This model does not establish thermal performance or pressure integrity.

**3D:** The schematic aligns into its assembled state. It illustrates the assembly relationship; it does not animate a test or imply a successful result.

**Clicks:** The photo can open at a larger size. Any additional views need informative captions.

If no public photo is available, use a straightforward text section rather than presenting a synthetic image as the physical model.

### 8. Thermal result: show the result and its basis together

Suggested headline:

> **18°C lower temperature in simulation**

Immediately beneath it:

> Compared at 800 W and the stated inlet flow. No measured thermal result is available.

Publish the inlet-flow value only if cleared. Do not claim efficiency improvement, production savings, or measured performance.

If public-approved comparison images are available, show them with matching scales and clear conditions. Otherwise, present the result as typography with an evidence panel. Do not generate decorative heat maps.

**3D:** The schematic becomes still. Thermal evidence receives the visual emphasis; an animated model should not appear to substantiate the simulation.

**Clicks:** **Comparison conditions** expands any additional approved explanation of the simulation setup. The essential conditions remain visible without clicking.

### 9. Verification plan: connect the whole argument

This is the case study’s conclusion and the strongest signal for a mechanical design lead.

Present a public-safe verification matrix connecting:

| Field | Purpose |
|---|---|
| Requirement | What must be established |
| Design response | The choice intended to address it |
| Verification method | How it will be assessed |
| Acceptance criterion | What constitutes a pass, if publishable |
| Evidence and status | What exists and what remains pending |

Use explicit labels such as **Simulation evidence**, **Polymer fit check**, **Planned**, and **Pending**. Populate them from the actual matrix.

The status summary must make clear that thermal bench testing remains planned, no metal cold plate has been made or pressure-tested, and the design is not in production.

**3D:** The schematic reassembles and rests. Selecting a matrix entry highlights the associated region, where useful. The matrix remains the primary content.

**Clicks:** Visitors can inspect individual entries and their supporting explanations. Do not hide pending items behind a default filter.

**Without 3D:** Static reference markers connect the schematic to matrix entries.

### 10. Your profile and patent contribution

Move into a quieter, text-led section.

Include:

- Mechanical design engineer, Alderwake Drives, 2020–present.
- Experience developing cooling hardware from simulation through supplier handover.
- Your approach, demonstrated through requirements, tolerance analysis, and verification planning.
- Your interest in senior mechanical design roles.

Suggested patent wording:

> Named as one of three inventors on an employer-owned split-channel cooling assembly patent application filed in 2025. The application has not been granted. My contribution covered the channel manifold and assembly interface.

Link to a public patent record only if the correct record is available and suitable to share.

**3D:** No new animation. The completed schematic can appear as a small still, allowing your profile to take focus.

**Clicks:** CV, email, and any verified public patent link.

### 11. Contact and footer

Suggested close:

> **Let’s discuss your next mechanical design challenge.**  
> Seeking senior mechanical design roles.

Show the verified email address prominently, with **Email Nadia** and **Copy email address** actions. Confirm successful copying accessibly.

The footer contains CV access, image and model credits where needed, and a short ownership statement for the featured work.

**3D:** None. Contact should be immediate and dependable.

## Look and feel

The page should feel precise, spacious, and grounded in physical engineering.

| Use | Colour |
|---|---|
| Main background | Warm paper — `#F3F0E8` |
| Text and structure | Graphite — `#222725` |
| Primary accent | Deep teal — `#176B68` |
| Model surfaces and secondary panels | Aluminium grey — `#B8C1C2` |
| Occasional annotation | Copper — `#AD6545` |

Use **IBM Plex Sans** for headings and prose, and **IBM Plex Mono** for measurements, reference markers, and status labels. Check contrast for every actual text/background pairing; the palette alone does not guarantee accessibility.

Large headings establish the story. Short explanations and diagrams carry the detail. Fine rules and restrained annotation provide structure without decorative technical clutter.

Use native scroll, short transitions, and brief desktop pinning only where it helps connect a model view to text. No forced pauses, custom cursor, autoplay spin, or introductory loading sequence.

## Phone, reduced motion, and no 3D

The phone version gets its own composition:

- A single column, with each illustration immediately above its explanation.
- A compact navigation menu plus readily available email access.
- Lightweight schematic stills as the default, avoiding a long pinned scene.
- Requirements and verification entries rendered as labeled cards.
- Large drawings opened in an accessible image viewer.
- Comfortable touch targets and no hover-dependent content.

With reduced motion enabled, use still images and direct state changes. If WebGL fails, is unavailable, or loads slowly, the complete page appears with static illustrations. Essential content must never exist only inside the 3D canvas.

Load text and the opening image first. Load the optional 3D scene afterward, with a restrained asset budget. The portfolio should remain useful before that scene arrives.

## Everything else the site needs

**Content and publication preparation**

- Approved external render in suitable resolutions.
- A newly created, dimension-free schematic and matching fallback images.
- Approved polymer-model photo, if available.
- Confirmed project brief, responsibilities, design rationale, and fit-check findings.
- Public-safe requirements summary, tolerance explanation, and verification matrix.
- Approved simulation conditions and any publishable comparison images.
- Accurate patent wording and an optional verified public record link.
- Updated, accessible CV and verified public email address.
- Publication clearance for any additional employer-owned material.

Confidential dimensioned CAD and supplier drawings stay out of the site, downloadable files, model assets, and deployed source bundle.

**Site structure and delivery**

- One complete portfolio page, plus a dedicated, shareable case-study URL using the same content.
- Stable section links for hiring conversations.
- Page titles, descriptions, social preview image, favicon, and search indexing configuration.
- Responsive images, compressed optional 3D assets, reliable fonts, and static fallbacks.
- Semantic headings, keyboard support, visible focus, meaningful image descriptions, and accessible controls.
- HTTPS, a suitable domain, hosting, a useful error page, and working CV/email links.
- A simple editing workflow for project status, CV, and contact details.
- Optional minimal analytics if you want to understand visits; no analytics are required for the concept.

**Checks before launch**

Verify factual claims, employer clearance, phone layouts, keyboard access, reduced motion, WebGL failure, slow connections, major browsers, downloadable files, and all contact links.

**Assumptions:** the primary audience is a mechanical design lead evaluating you for a senior role; one deep case study is the right starting point; the schematic is newly created explanatory content; unspecified acceptance criteria and project outcomes remain unwritten until confirmed; and `nadia@example.com` is a placeholder pending verification.

This is the full design plan. No site, code, or assets have been built or changed.
