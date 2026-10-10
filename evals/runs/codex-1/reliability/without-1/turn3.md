The site should make a worried migration owner think: **“This person understands what could go wrong, and knows how to prepare for it.”** Its visual ambition should come from showing that judgement in action.

The concept is **“Move forward. Know the way back.”** A custom 3D migration model progresses through the page, paired with the documents you work from: the runbook, cutover checklist and rollback plan. Your results establish credibility; the library outage explains why this work matters to you.

The main journey serves prospective clients. Speaking has a clear second route. Everything below is a design and content plan; nothing is being built.

**1. Navigation and opening**

A compact navigation contains your name, Work, Approach, Speaking and Contact. Your name returns to the top; the other links jump to clearly labelled sections. Keep navigation available on desktop without letting it dominate the page.

Proposed opening copy:

> Dawit Bekele  
> **Move forward.  
> Know the way back.**  
> I help teams plan and carry out migrations of systems they depend on.  
> Rotterdam · Going independent in 2027

Show your current Staff Platform Engineer role in a smaller supporting line.

The main action is **Tell me about your migration**, linking to the contact section. **Explore my work** jumps to the Kestrel story.

The 3D model occupies roughly half the desktop opening. Two source structures sit opposite a destination, connected by a carefully drawn route. Small markers suggest work passing through the system. An alternative path is labelled as a recovery route. It looks like a physical engineering model: matte surfaces, fine lines, restrained lighting and enough depth to feel tangible.

The scene is a conceptual illustration, explicitly labelled. It is not a representation of Kestrel’s infrastructure or current status.

The first frame should work as a still image. No loading screen, introductory sequence or required interaction stands between the visitor and your offer.

On a phone, the headline and primary action come first, followed by a compact illustration. Without 3D, that illustration communicates the same relationship between source, destination and recovery path.

**2. The flagship proof: Kestrel**

The opening flows directly into the migration story:

> **310 services. Two data centres. 26 months.**  
> I led Kestrel Freight’s migration from its data centres to the cloud.

A second statement gives the measured result:

> **99.98% order API availability over the 26-month migration.**  
> There were two internal incidents during the migration, both under ten minutes.

Keep the measurement period, system scope and incident qualification next to the number. Never shorten this elsewhere to “zero downtime” or imply the two incidents fully explain the availability figure.

On desktop, the model stays beside three short passages: the operational constraint, your leadership of the incremental migration, and the result. As the visitor scrolls, groups move between environments. The visual suggests staged work without pretending to reproduce the real migration schedule or all 310 services.

The scene should not depict invented incidents, traffic volumes or operational measurements. It is illustrating the process, while the text carries the historical evidence.

Visitors can click:

- **Read the migration case study**
- **Watch “Boring Migrations”**
- **View the public slides**

On mobile, the three passages become a normal vertical sequence with a few lightweight illustrations. Without 3D, the same source-to-destination states appear as labelled diagrams.

**3. Your approach: the documents behind the change**

Introduce the working method with:

> **The work before the switch.**  
> I work from a runbook, a cutover checklist and a rollback plan.

This is the main visual sequence. On desktop, readable document panels sit alongside the model. They resemble carefully typeset working documents, with steps, annotations and decision points. All text remains ordinary page content outside the 3D canvas.

The runbook supplies six stages:

| Stage | What the page explains | What the model does |
|---|---|---|
| Preflight | Establish prerequisites, checks and recovery options. | Source, destination and routes receive clear labels. |
| Shadow | Examine the new path before relying on it. | A secondary path becomes visible alongside the existing path. |
| Dual write | Explain the coordination and correctness questions involved in writing to both systems. | Two labelled write paths appear. |
| Cutover | Make the decision to switch using explicit checks. | The destination becomes the primary route. |
| Soak | Observe the new arrangement before retiring the old one. | The scene settles; observation points remain visible. |
| Decommission | Retire the old environment when the agreed conditions are met. | The old structure and its recovery route are removed. |

These explanations are an editorial outline for your review, not claims about undocumented Kestrel procedures. The sequence should also make clear that dual writes and rollback mechanics depend on the system; they are not universal migration instructions.

The **cutover checklist** appears at the switching point. The **rollback plan** remains visible where recovery is supported, with an explicit explanation that reversal can have conditions and limits. The model must never imply that rolling back is always immediate or lossless.

Finish with:

> I wrote the first version of the migration runbook and still own it. Forty teams use it.

Visitors can scroll through all six stages or use stage links to jump directly to one. Clicking must never be necessary to reveal the core explanation. A **Discuss your migration** link follows the sequence.

On mobile, the stages become six compact vertical entries. Each has its text and a small diagram. Without 3D, the same diagrams show the sequence. No lengthy pinned section or sideways scrolling.

Document content must come from public material or be clearly labelled illustrative. Internal runbooks, checklists and diagrams are not publication assets.

**4. The personal reason: the library outage**

The page becomes quiet here. Large, direct text carries the story:

> **In 2014, I dropped a table.**  
> At the university library, I caused my first production outage. It is why I care about rollbacks.

A short paragraph can connect that experience to your present approach, using your own account from the talk. Do not invent the recovery, consequences or dialogue.

The 3D model stops moving. A restrained static route illustration may remain at the edge of the section, but the words should have the visitor’s attention. There is no simulated crash or theatrical error screen.

Visitors can click **Hear the story in “Boring Migrations”**. Use a timestamp only after verifying it; otherwise link to the recording.

Mobile and non-3D versions use the same text-led composition.

**5. A closer technical example: the database upgrade**

Introduce the work with:

> **A 4 TB Postgres upgrade.**  
> Dual writes and a carefully managed cutover.

Use a brief explanation based on your supplied facts and the public talk material. Leave out the exact version path until the conflicting wording is resolved. Do not publish “no maintenance window” unless its scope is confirmed.

The visual changes into a close view of two database representations. Labelled paths explain the dual-write mechanism at a conceptual level. A few discrete scroll states are enough; the visitor should understand the diagram while stationary.

Explain your contribution, the important constraint, the decision and the verified outcome wherever the public evidence supports them. If that evidence is thin, keep this section short.

Visitors can click **Read the database section** within the Kestrel case study. A separate page is warranted only if there is enough publishable detail.

On mobile and without 3D, use a simple two-dimensional schematic with a written description. No tiny labels or animated code.

**6. The operational result: fewer pages**

Use the team’s result directly:

> **85 → 22 pages per week**  
> Over about a year, we reduced weekly pages across our nine-person on-call team. About half of that reduction came from deleting alerts nobody needed.

The graphic is a clearly labelled before-and-after comparison. There is no invented monthly trend, and no inference that fewer pages necessarily meant fewer incidents.

The 3D scene ends before this section. A simple graphic gives the page a change of pace and puts the result ahead of the spectacle.

The contact link can reappear here, but the section needs no artificial interaction or separate case-study page without more source material.

On phones and with reduced motion, the graphic stays static and fully readable.

**7. Public work: ferry**

Give ferry a substantial editorial entry with precise attribution:

> **ferry**  
> A command-line tool for dual-write cutovers.  
> Created by a former colleague. I have maintained it since 2022 and wrote its cutover command.

Show a real, verified command example or documentation excerpt when available. It should be selectable text, with enough context to understand its purpose. Do not invent flags or imply the example is a production-ready prescription.

Visitors can click **View the repository** and **Read the cutover command documentation**, once the links are verified.

The recorded 1.2k stars is optional supporting information. If included, date it rather than presenting it as a live count.

There is no 3D here. The public tool is the evidence. Mobile uses the same layout, with code wrapping or contained horizontal scrolling only where necessary.

**8. Speaking**

The heading can be simple:

> **Boring Migrations**  
> SRE North, 2024

Include a short factual description of the talk, a still from the public recording or title slide, and links to the recording and slides.

Visitors can click:

- **Watch the talk**
- **View the slides**
- **Invite me to speak**

The invitation goes to the contact section with a clearly identified speaking email option. A dedicated speaking page provides a shareable destination for organisers, with the talk, short biography and an approved photograph when available.

No autoplaying video. A lightweight preview loads the external player only on request. No additional 3D is needed.

On mobile, the recording preview and links stack vertically. Captions or a transcript should be linked where available; newly published transcripts need review for accuracy.

**9. About you**

Use a short professional narrative, supported by a restrained career timeline:

- **2013–2016:** Systems Administrator, Entoto Technical University Library, Addis Ababa.
- **2016–2020:** Site Reliability Engineer, Lumen Pay, Amsterdam — card payment systems.
- **2020–present:** Staff Platform Engineer, Kestrel Freight, Rotterdam.

Lumen receives only the permitted description. No diagrams, anecdotes or technical elaboration.

Mention your electrical engineering degree in a small supporting line. Avoid a long wall of technology badges; tools can appear where they help explain actual work.

Include:

> **Books I return to**  
> *Site Reliability Engineering* — Google  
> *Release It!* — Michael Nygard

These can link to authoritative book pages. Do not invent quotations or claim particular techniques came from either book without your confirmation.

An approved portrait would work here, but the design should remain complete without one. No stock photograph. No 3D interaction.

Visitors can open your résumé, LinkedIn and GitHub once those destinations are verified.

**10. Contact and footer**

Close with a direct invitation:

> **What are you preparing to move?**  
> Tell me what is changing, what has to keep working, and when you need help.

Show a real, selectable email address, an **Email me about a migration** link and a **Copy email address** button. Suggested email subject: “Migration enquiry”. The prompts are optional help, not required fields.

A separate **Invite me to speak** email link uses “Speaking enquiry”.

Repeat **Going independent in 2027** until your actual availability warrants different wording. Do not claim you are accepting immediate engagements, offer service packages or promise response times without confirmation.

The final visual is a settled version of the migration model, preferably a static image. The old route has been retired in the conceptual sequence. There is no need for continuous animation at the bottom of the page.

The footer contains your name, Rotterdam, contact and professional links, plus a privacy link if the site’s data handling requires one.

**The look should feel precise, warm and authored.**

| Element | Direction |
|---|---|
| Background | Warm chalk `#F2F0E9` |
| Primary text | Ink `#182326` |
| Active routes and links | Deep teal `#006B63` |
| Decision points | Burnt orange `#B64C2E` |
| Quiet surfaces | Stone `#DADDD6` |
| Headlines | Space Grotesk |
| Body text | Source Sans 3 |
| Diagram annotations | IBM Plex Mono, used sparingly |

Check contrast for every actual text/background combination. Colour always works alongside labels and shapes.

Use generous margins, clear alignment and large evidence-led typography. Give the method sequence a dark background to concentrate attention, then return to light reading surfaces. Avoid wrapping every section in matching cards.

The 3D materials should be matte, with soft shadows and shallow depth. No dramatic camera flights, particle storms or floating technology logos. Motion comes from the migration’s changing state.

**The interaction rules apply throughout.**

- Native scrolling; no scroll hijacking or mandatory horizontal journey.
- Short, bounded sticky scenes on desktop, with room for text to be read.
- Navigation and anchor links remain usable at every point in an animation.
- No required dragging, hovering or camera controls.
- No custom cursor, background audio or autoplaying video.
- Motion pauses offscreen and when the tab is hidden.
- A visible motion control complements the device’s reduced-motion preference.
- All important content exists as text or accessible diagrams outside the graphics layer.

**The phone and non-3D versions are complete designs.**

On phones, the site becomes an editorial sequence of copy, metrics, documents and compact diagrams. The primary contact action appears early. Navigation uses a conventional accessible menu. Type stays comfortably readable, controls have generous tap areas, and no essential label is squeezed into a miniature scene.

Reduced-motion users receive static stages without camera movement or travelling markers. If 3D fails, is unsupported or is too costly for the device, the page retains the same layout and replaces the scene with an optimised illustration.

Essential content and navigation load independently of JavaScript. The first meaningful screen appears before the graphics download. No visitor should have to wait for 3D to understand what you do or contact you.

**The rest of the site needs these supporting pieces.**

| Area | Required work |
|---|---|
| Main page | Final copy, section anchors, desktop and mobile layouts, static visual equivalents |
| Kestrel case study | Context, your role, constraints, decisions, scoped results, incidents and lessons supported by public material |
| Speaking page | Talk description, recording, public slides, organiser biography, invitation link |
| Résumé | Corrected claims, accurate ferry attribution, accessible downloadable version |
| Source review | Public talk and slides checked before technical details or images are reused |
| Contact | Verified email address and tested email/copy actions |
| Professional links | Verified GitHub, ferry repository, LinkedIn, talk and slide URLs |
| Accessibility | Semantic structure, skip link, keyboard access, visible focus, contrast, zoom/reflow checks, diagram descriptions |
| Performance | Optimised models and images, limited self-hosted font weights, deferred 3D loading, layout stability |
| Search and sharing | Descriptive titles, metadata, canonical URLs, sitemap, social preview images and appropriate person/site structured data |
| Operational setup | Domain, HTTPS, hosting, deployment checks, error page and lightweight uptime monitoring |
| Privacy | Decide whether analytics are useful; document any collection and account for third-party embeds |
| Maintenance | Editable content separate from scene logic; periodic checks of links, role, availability and dated statistics |
| Validation | Real phone testing, slower connections, keyboard and screen-reader checks, reduced motion, graphics failure and disabled JavaScript |

For performance, target good Core Web Vitals: largest contentful paint within 2.5 seconds, interaction to next paint within 200 milliseconds and cumulative layout shift below 0.1. Validate those targets on representative devices and, after launch, with real usage where measurement is available.

The old site does not need to constrain the structure. Any old URLs discovered during launch preparation can receive sensible redirects, but this is a fresh design.

**The remaining assumptions are explicit.**

- “Next year” means 2027; the site welcomes advance conversations without implying immediate availability.
- The initial offer is migration planning and execution. Pricing, packages and commercial terms are outside this plan.
- Your supplied facts may be published. Additional Kestrel technical detail must be supported by the public talk or slides.
- The database version path remains unresolved and will be omitted until confirmed.
- The supplied example email and repository address are placeholders until verified.
- No internal documents, internal diagrams, approved portrait or usable talk assets are currently in the material folder.
- The site will launch in English.
- A direct email route is sufficient initially; no contact form, scheduling service, newsletter or blog is needed.

Before implementation, the design package should contain final copy, the public-source content review, desktop and mobile wireframes, one finished visual style frame, and a scene-by-scene motion storyboard with its static equivalents. Those deliverables make the complete experience reviewable before development begins.
