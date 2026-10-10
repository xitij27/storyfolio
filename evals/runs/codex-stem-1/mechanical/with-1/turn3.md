I’ll expand the recommended direction into the full page plan, including each scroll beat, interaction, fallback, and site requirement. I’ll also record your choice of concept. No building.


The direction is **Requirement → choice → check**: one continuous design review, carried by a moving verification matrix. It shows a mechanical design lead how you organize the connection between requirements, design decisions, assembly fit, and verification.

The complete plan is saved in [storyboard.md](/tmp/storyfolio-evals/codex-mechanical-with-Wn0XYA/docs/story/storyboard.md). No website, prototype, or visual assets have been built.

Inputs needed for a future release:

1. The approved external render and a newly drawn, dimensionless schematic marked **“Simplified explanation.”**
2. Your public email address; the address in the CV remains a planning placeholder.
3. Only if you want the 18°C figure included: the temperature quantity being compared and the baseline. The current plan leaves that number out.

**The idea and the object**

The page asks: **“How do you turn a requirement into a design you can verify?”**

Its structure comes from your verification matrix. The 3D object consists of six thin rectangular row panels. Together, they look like a technical document lifted into space. Their faces carry the approved render, explanatory diagrams, contribution topics, and evidence labels.

The same six panels remain throughout the page. Their arrangements explain different relationships: a matrix for traceability, offsets for assembly variation, separated groups for evidence status, and a complete matrix at the close.

These panels represent a working document. They do not represent six physical cold-plate components.

The page uses your confirmed workflow and contribution scope. Specific requirements, design rationales, tolerance results, and acceptance criteria have not been supplied, so the explanatory matrix will not pretend to reproduce the employer’s actual engineering record.

**The page, from top to bottom**

**1. Scope — who you are and what this review concerns**

The opening shows your name, mechanical design discipline, senior-role goal, and your contribution to the channel manifold and assembly interface. The approved render provides an immediate view of the work.

Your three artifacts—requirements table, tolerance stack, verification matrix—establish where the page’s visual language comes from. A compact evidence summary distinguishes simulation from the polymer assembly model.

**3D:** Six legible document rows gather into a rectangular matrix. The render spans their faces. The movement is brief; the settled opening remains readable.

**Clicks:** “Start reading” jumps to Requirements. “View evidence” jumps to Evidence status. Email is available immediately.

**Space:** About one desktop screen. A visitor who stops here still gets your identity, contribution, evidence limits, and contact route.

**2. Requirements — establish the reasoning chain**

This part introduces the relationship between a requirement, a design response, and a verification method. Your requirements table is the starting artifact.

The 800 W and stated inlet flow appear as **simulation conditions**. They are not presented as confirmed product requirements.

**3D:** The panels align beneath requirement, response, and check columns. A restrained connecting line crosses those columns, making the relationship visible.

**Clicks:** Selecting a column emphasizes its explanation and corresponding part of the matrix. The explanations remain available without clicking.

**Space:** About one screen. No invented requirement values or confidential table excerpts.

**3. Design response — make your contribution legible**

This is the longest part, with two consecutive beats.

The first focuses on the **channel manifold**. The second focuses on the **assembly interface**. Each uses a new simplified schematic, alongside an informative crop of the approved render where appropriate.

The text identifies your contribution. It does not supply unconfirmed claims about reduced pressure loss, machining cost, leakage, or why a particular feature was selected.

**3D:** Two rows move forward while the remaining four preserve the matrix outline. The highlighted rows first expose the manifold explanation, then turn slightly to reveal the assembly-interface explanation. Labels stay readable.

**Clicks:** Visitors can select Manifold or Assembly interface, and open the approved render at a larger size. Both explanations also appear in normal reading order.

**Space:** About two screens, giving each contribution room to be understood.

**4. Assembly fit — explain the tolerance stack**

This part explains your definition of a tolerance stack: how variation in separate parts affects their assembled fit.

A qualitative diagram makes that relationship understandable. It carries no actual dimensions, calculated tolerances, or pass/fail result.

The polymer model is described specifically as an assembly fit-check model. Its existence does not establish a successful fit result, thermal performance, or pressure integrity.

**3D:** The rows offset against a shared reference. Their alignment marks make accumulated variation visible. They settle into a comparison diagram without a success tick or implied validation.

**Clicks:** A Reference / Illustrative variation control switches between two labeled explanatory states. It is not a tolerance calculator.

**Space:** About one screen.

**5. Evidence status — distinguish what exists from what remains unproven**

This part gives three categories equal prominence:

| Category | What the page establishes |
|---|---|
| Simulation | Thermal comparison at 800 W and the stated inlet flow; no measured thermal result or efficiency claim |
| Physical model | A polymer model for assembly fit checking; no metal cold plate |
| Remaining hardware verification | Thermal bench testing remains planned; pressure testing has not occurred; the design is not in production |

A secondary filing note can record the 2025 patent application, its ungranted status, three named inventors, employer ownership, and your limited contribution scope. It is factual context rather than an ownership or achievement badge.

**3D:** The six rows separate into three labeled pairs. The categories are distinguished through position, words, and line treatment.

**Clicks:** Each category can expand a short clarification. The essential status is already visible.

**Space:** About one screen. No animated temperature field or flowing coolant suggests evidence that has not been provided.

**6. Verification plan — connect questions to methods**

The matrix now connects a design question with a check and its current status.

It covers assembly fit, planned thermal bench testing, and a **proposed** pressure/leak-integrity check. The latter is my suggested verification topic; it is not represented as an existing item in the employer’s plan.

Acceptance thresholds, test pressures, instrumentation, schedules, and results remain unspecified.

**3D:** The rows align under question, method, and current-status columns. Outstanding results remain explicitly labeled. Completing the visual matrix never suggests completed testing.

**Clicks:** Visitors can expand each method’s purpose, available evidence, and status.

**Space:** About one screen.

**7. Handover — answer the question and invite contact**

The ending brings the reasoning chain together:

**Requirement → design response → verification method → current evidence.**

It leaves outstanding checks visible and provides email contact. The conclusion concerns traceable engineering reasoning, without claiming readiness for production.

**3D:** The panels reform the opening matrix. The camera settles square to it, making the final state calm and readable. Evidence labels remain in place.

**Clicks:** Email, copy email, and links back to any chapter. The email address is also selectable text.

**Space:** About one screen, with enough room for a quiet ending.

**How scrolling and navigation work**

The desktop experience is approximately nine viewport heights, adjusted to the actual text. The scene stays beside ordinary page text while moving between short, settled states.

Scrolling uses normal browser behavior. Reading does not depend on precise scroll positioning. A slim chapter rail identifies the current section, and visitors can jump anywhere.

All controls live in ordinary HTML. Canvas picking and tiny 3D targets are unnecessary. Links, browser history, keyboard focus, and direct chapter URLs work normally.

**The look**

The selected direction is **Inspection sheet**:

| Element | Treatment |
|---|---|
| Background | Warm off-white `#F3F0E8` |
| Text | Graphite `#20282B` |
| Accent | Deep teal `#006C67` |
| Panels | Matte pale surfaces, fine rules, restrained shadows |
| Layout | Generous margins; asymmetric text and scene composition |

Teal emphasizes the relationship currently being examined. Unperformed checks use written status labels and open or dashed treatments, without implying failure.

**IBM Plex Sans** carries headings and prose. **IBM Plex Mono** carries matrix headings, conditions, and annotations. Body text is approximately 18 px on desktop and 17–18 px on phones, with comfortable line spacing.

Perspective is mild. Motion uses controlled translations and small rotations, then stops. There is no idle spinning or decorative particle system. The page’s character comes from its document structure and your engineering subject matter.

**On a phone**

The page becomes a single-column illustrated review in the same seven-part order.

Each chapter has a compact diagram above its text. The render, manifold/interface explanations, variation diagram, evidence groups, and closing matrix remain available. Long desktop pinning is removed.

A compact chapter menu and Email link stay easy to reach. Controls have generous touch targets, and every interaction works without hovering.

Static diagrams are the default. Lightweight movement can be added on capable devices later, provided it improves understanding and meets performance targets.

**Without the 3D**

| Situation | Experience |
|---|---|
| Reduced motion | Fixed illustrations in normal page flow; no camera movement, parallax, or scroll animation |
| WebGL unavailable or lost | Chapter-specific static diagrams and the approved render replace the scene |
| JavaScript disabled | Complete text, images, native chapter links, disclosure sections, and email contact |
| Screen reader | Ordered headings, descriptive diagrams, accessible controls, and all evidence in text; decorative canvas excluded |
| Keyboard or browser zoom | Visible focus, working navigation, flexible layouts, and no scroll trap |

Meaningful relationships survive in the static diagrams. No visitor must wait for 3D to load before reading or contacting you.

**Everything else the site needs**

“Included” below means part of a future authorized implementation.

| Item | Decision |
|---|---|
| Navigation | Include chapter anchors, desktop rail, phone menu, skip link, and persistent Email |
| Project coverage | Include this supported project story; add other projects when public material exists |
| Separate project pages | Later |
| Contact | Email and selectable address; optional copy control |
| Downloadable CV | Later, after correcting simulation, prototype, and patent wording |
| Testimonials | Omit; none supplied |
| Languages | English initially |
| Search metadata | Factual title, description, canonical URL, sitemap, and heading structure |
| Shared-link preview | Name, discipline, approved render or original matrix graphic |
| Site icon | A simple original matrix mark |
| Missing-page experience | Useful 404 with home and email links |
| Blog | Later, when writing exists |
| Chat | Omit from current scope |
| Analytics | Defer; no tracking by default |
| Legal information | Resolve any jurisdiction-dependent requirement before release |
| Domain and hosting | Choose later; no purchase or deployment now |
| Asset records | Keep a private source-and-rights register |
| Editing | Keep content and evidence statuses easy to update independently of the scene |

Performance work includes compressed imagery, minimal font files, deferred 3D loading, reusable simple geometry, and stopping rendering when idle or offscreen. Initial content must not wait behind a loading screen.

Future validation covers mobile layouts, keyboard and screen-reader use, reduced motion, JavaScript-off behavior, WebGL failure, browser zoom, email links, image rights, and factual consistency across the page and sharing metadata.

**Assumptions and remaining boundaries**

I chose English, one substantial project, a concise engineering-review structure, and email contact. The approved external render is the only cleared existing visual. Confidential CAD and supplier drawings remain excluded; the prototype photograph and review slides are also excluded because public rights were not established.

The strongest optional content addition would be one publicly shareable chain showing an actual requirement, your design choice, its rationale, and its intended check. Until then, the page explains your confirmed workflow and contribution without fabricating that detail.

The planning records include [facts](/tmp/storyfolio-evals/codex-mechanical-with-Wn0XYA/docs/story/facts.md), [concepts](/tmp/storyfolio-evals/codex-mechanical-with-Wn0XYA/docs/story/concepts.md), [decisions](/tmp/storyfolio-evals/codex-mechanical-with-Wn0XYA/docs/story/decided-for-you.md), and the [handover](/tmp/storyfolio-evals/codex-mechanical-with-Wn0XYA/docs/story/handover.md). Final captions and construction remain later work.

Does this complete storyboard have your approval, or is there anything you want changed?

The [storyfolio instructions](/tmp/storyfolio-evals/codex-mechanical-with-Wn0XYA/.agents/skills/storyfolio/references/storyboard.md) require “A yes to the script, or what to change.” That approves the plan only; building is outside this version and your current request.
