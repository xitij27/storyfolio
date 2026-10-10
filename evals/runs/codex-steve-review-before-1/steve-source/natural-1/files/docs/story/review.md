# Review of Steve Nyami’s existing portfolio

The site has a coherent visual system, a distinctive educational illustration, and thoughtful accessibility provisions in its source. Its biggest weakness is the gap between the promise to show work and the evidence currently available. Improve that gap first, then make the opening and experience descriptions more specific. The existing structure can support those changes; a rebuild or a new 3D concept is unnecessary.

## Scope and evidence

Reviewed on 11 October 2026 using `material/source-context.md` and the supplied snapshot: `material/repo/index.html`, `src/main.js`, `src/style.css`, `src/scan-figure.js`, README, design plan, package files, and search metadata files. Source HEAD: `9a5603d51463eb2564f8b5a117b2242678c660b1`. The locally modified lockfile’s SHA-256 is `0b60183ec1ccab626dff1765223bfef0d9a3b9e541848079ad27dac565a2ceda`.

This is a source review. I did not run a browser, local server, production build, accessibility audit, or deployed-site check. Layout and behavior assessments describe what the code specifies; they are not observations of the rendered site. External links were not tested. The omitted `Profile.pdf` was not available or read. The README’s attribution to a September 2026 LinkedIn export and the design plan’s “confirmed” labels are repository claims, not independent owner confirmations.

The design plan identifies healthcare AI employers and research teams as the intended audience, with collaborators secondary. I use that as a working evaluation lens, not a confirmed audience preference. Storyfolio’s emphasis on personal evidence informs this review; its concept-selection and storyboard workflow is outside the requested scope.

## What works

- **The visual system is consistent and restrained.** Navy, teal, and light surfaces, two complementary font families, shared spacing, and reusable controls provide a clear foundation. The CSS specifies distinct section treatments without introducing a separate visual language for every section. Preserve this system rather than adding more effects. See `src/style.css:1`, `:78`, and `:202`.
- **The surgical-vision figure has an explanatory purpose.** Its six stages connect capture, features, segmentation, tracking, phase recognition, and human review. It is more relevant to the page’s stated interests than generic technology artwork. Crucially, the “Illustrative” badge, example-model labels, and caption separate the drawing from patient data and actual model output. This is a good educational visual, though it does not demonstrate Steve’s own project experience. See `index.html:107–258`.
- **The source takes navigation and motion preferences seriously.** There is a skip link, semantic sections, visible focus styling, real anchor navigation, and a mobile menu with synchronized expanded state, Escape handling, and focus management. The figure has a pause control, selectable stages, reduced-motion stills, and an off-screen animation stop. Essential profile and contact content is present in HTML. These are strengths to preserve, subject to browser verification. See `src/main.js:8–67`, `src/scan-figure.js:629–708`, and `src/style.css:457`.
- **The page avoids fabricated project evidence.** The project area explicitly says “Coming soon” instead of presenting invented case studies, accuracy scores, or inactive demo links. Experience dates, organizations, education, and skills are easy to locate in the markup. Honest incompleteness is preferable to unsupported achievements. See `index.html:272–365`.
- **Contact is straightforward.** Email and LinkedIn have actual anchor destinations, with no unnecessary form or backend. Metadata includes a canonical URL, social image, and structured profile information. This is useful groundwork, although neither contact delivery nor search behavior is verified here. See `index.html:7–65` and `:389–398`.

## Improve first, in this order

### 1. Make the primary action deliver useful evidence

**Finding:** “Explore my work,” the Projects navigation item, and “Scroll to discover” all lead to a section with no actual project. Its heading promises “The work behind the ideas” and its introduction promises a closer look, but the content only describes future case studies (`index.html:103`, `:261`, `:272–296`). The illustration provides considerable technical detail while the personal work section provides none.

**Why it matters:** An employer can understand the desired field but cannot assess Steve’s contribution, technical judgment, or results. This is the largest obstacle to the intended visitor journey.

**Next change:** Until publishable project information is available, point the main action to the existing Experience section and label it accordingly. Shorten the coming-soon block and its decorative document treatment. The CSS gives that artwork a minimum height of 390px on mobile, or 330px below 390px, before its explanatory copy (`src/style.css:387`, `:441`); that is a substantial reading cost for an empty section.

Then add one real example using the existing project area: problem, project status, Steve’s role, collaborators, method, one inspectable artifact, limitations, and a real resource link where available. A course exercise or personal experiment can be useful if accurately labeled. Include results only with their evaluation context and attribution. If employer work cannot be shown, use an approved description or a separate personal example.

**Done when:** The main action immediately reveals substantive existing content, and the first project lets a visitor distinguish what Steve did from what a team or example model did. This depends on new factual input; the supplied snapshot cannot fill it.

### 2. Give the opening a more personal, concrete message

**Finding:** “Intelligence. With a human perspective,” “Exploring the space,” and “Curiosity. Context. Care.” establish a tone but say little unique about Steve. His name and listed study background sit beneath the large headline. The guiding principles also remain general (`index.html:98–104`, `:261`, `:367–380`).

**Next change:** Bring the existing name and study information into the most prominent opening copy. Keep the medical AI interest visible, but ground any stronger specialization statement in an actual example. Compress repeated introductions across the hero, credentials strip, education, and About. Keep the principles short until a case study can demonstrate them through a concrete decision or limitation.

Avoid turning the surgical illustration, a skills tag, or an employer’s name into a claim that Steve built surgical models, worked with clinicians, or delivered clinical impact. The supplied material does not establish those details.

**Done when:** A quick read identifies who Steve is, the focus the page presents, and where to find evidence of his contribution without relying on the slogan.

### 3. Replace broad role descriptions with attributable contributions

**Finding:** The Fraunhofer entry refers to “modern, scalable software components” and production-system stabilization without an example. The Research Assistant entry describes IT operations, not medical AI research. The tutoring entry is more concrete because it names teaching activities and topics (`index.html:307–329`).

**Next change:** For each relevant role, add one owner-confirmed example of the problem, Steve’s responsibility, a technical decision, and an observable result. Results need not be numerical. Preserve official job titles while explaining the actual work; do not infer a medical research role from “Research Assistant.” Add context or a source link for the listed Freudenberg award and issuer information for certifications if available. Keep introductory certificates secondary to substantive work.

**Done when:** A reader can explain Steve’s contribution without repeating an organization name or a broad skills label. Confirm current employment, award details, degree status, and claim wording before strengthening the page or its JSON-LD.

### 4. Tighten the illustration’s technical copy and small-screen controls

**Finding:** The frame-capture explanation equates 25 fps with a universal 40ms processing limit. That is a frame interval, not necessarily an end-to-end latency budget; buffering, parallelism, and frame sampling affect system requirements. The review explanation says corrections become training labels so models keep improving, which implies a retraining process that the illustration does not establish (`index.html:250`, `:255`).

**Next change:** Describe 40ms as the interval between frames at 25 fps, and distinguish throughput from latency. Say corrections *can* inform later training after curation and evaluation. Keep the example labels and non-patient-data disclaimer, but make the latter easier to read: its current font size is 11px (`src/style.css:158`).

The pause button is 32px square, falling to 28px below 390px, below the design plan’s own 44px target. Increase its hit area. Below 480px, stage names become visually hidden and only numbers remain (`src/style.css:124`, `:414–416`, `:433`); consider a compact named selector or wrapped labels so visitors can choose a stage without memorizing the numbers. Verify that changing descriptions remains readable during autoplay and usable with keyboard and screen reader interaction.

**Done when:** Technical explanations describe examples accurately, and the figure remains understandable and controllable on a narrow screen. These control sizes are source findings, not a claim that the site fails a complete WCAG audit.

### 5. Make the contact invitation specific and update the documentation

**Finding:** Contact links exist, but the invitation is broad. The design plan still says contact details remain a notice and lists working links as future work, which disagrees with the implemented page (`index.html:391–393`; `docs/medical-ai-design-plan.md`, Direction and Implementation scope).

**Next change:** Once Steve confirms what opportunities he wants, state that briefly near the contact action. Do not invent availability or a job search. Update the plan to describe the existing links and keep future content needs separate from implemented features. Verify metadata and “Present” labels against current facts. Add a CV only if an appropriate document becomes available.

**Done when:** Visitors know what sort of conversation to initiate, and maintainers can tell what already exists from what remains planned.

## Verification after those changes

Check the production build and rendered layouts at 320, 390, 768, 1024, and 1440px; keyboard navigation and menu focus; 200% zoom; reduced motion; JavaScript disabled; figure controls and description updates with a screen reader; contact and external links; and metadata consistency. Pay particular attention to the 768–999px header, where desktop navigation remains active, and the mobile distance to useful evidence. These are follow-up checks, not reported passes or observed defects.

Keep the current palette, simple implementation, illustration disclosures, and navigation provisions. The highest-value investment is one truthful, inspectable account of Steve’s work and a primary action that reaches it.
