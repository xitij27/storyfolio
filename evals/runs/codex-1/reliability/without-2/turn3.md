The site should position you as the person to contact **before a migration becomes an emergency**. Its central idea is **“A way forward. A way back.”** Your experience gives the way forward credibility; your attention to rollback makes the promise distinctive.

The visual centre is one evolving 3D illustration of a migration. The editorial centre is the work you actually use: **the runbook, the cutover checklist, and the rollback plan**. Visitors should leave understanding both your experience and how you approach their problem.

This is the complete proposed plan. No building is included.

**1. Header and navigation**

A small, persistent header contains:

- **Dawit Bekele** — returns to the top.
- **Work** — jumps to the Kestrel migration.
- **Approach** — jumps to the three working documents.
- **Speaking** — jumps to the talk.
- **Get in touch** — jumps to contact.

No separate logo is necessary. Your name, set carefully, is the identity.

The header stays readable over all backgrounds. It becomes more compact while scrolling without disappearing. Anchor destinations account for its height.

**3D:** None in the header. Navigation always works independently of the scene.

**2. Opening: who you help**

The first screen establishes your name, expertise, and future independent practice.

> Dawit Bekele  
> Platform engineer · Rotterdam
>
> **I move systems that are not allowed to stop.**
>
> Planning a migration your team is worried about? My work centres on the runbook, the cutover checklist, and the rollback plan.
>
> Going independent in 2027.

Use the last line as a modest availability note, not a launch countdown.

The primary action is **“Tell me about your migration”**, linking to contact. The secondary action is **“Explore the work”**, jumping to the main case study section. Both appear before visitors need to scroll.

**3D:** Beside the copy, a small architectural composition carries a steady flow through an existing environment. A destination is visible across the scene. A thin, labelled return route introduces rollback as part of the composition.

The shapes suggest services and infrastructure without imitating shipping containers or claiming to represent Kestrel’s topology. A caption reads **“Conceptual migration illustration.”**

The scene starts in a useful, composed state. It does not assemble behind a loading screen.

**3. Personal foundation: why the way back matters**

The next section gives the visual idea a personal reason.

> **A way forward. A way back.**
>
> In 2014, at the university library, I dropped a table and caused my first production outage. It is why I care about rollbacks.

Keep this brief and factual. The site does not invent the recovery, the consequences, or dialogue from that day.

A text link, **“Hear the story in Boring Migrations”**, leads to the public talk. Use a timestamp only once it has been verified.

**3D:** The camera makes a small lateral move that reveals the return route more clearly. Motion slows so the passage can be read. Nothing breaks or flashes red; this is not a reenactment of the outage.

**4. Flagship work: moving Kestrel Freight**

Introduce the work with a large factual statement:

> **310 services. Two data centres. 26 months.**
>
> At Kestrel Freight, I led the migration out of two data centres and into the cloud.

Place the measured result directly beneath it:

> **99.98% order API availability over the 26-month migration.**
>
> There were two internal incidents during the migration, both lasting under ten minutes.

The measurement’s scope and period remain visible with the number. Do not imply that the incidents necessarily explain all measured unavailability.

The section has three readable beats:

1. **The scope:** what moved and over what period.
2. **The responsibility:** your role leading the migration.
3. **The outcome:** measured availability, with the incident context.

Further claims about constraints or implementation will come only from approved public material.

Visitors can click **“Read the migration case study.”** The homepage still provides enough evidence for someone who never opens it.

**3D:** On desktop, the scene stays briefly in place while representative groups of services move between environments. Use a few groups, not 310 individually animated objects. Persistent captions connect each visual state to the adjacent text.

Label this as an explanation of the process rather than a replay of actual traffic. Do not keep an uninterrupted stream running behind the historical availability claim in a way that visually promises zero downtime.

**5. The approach: three working documents**

This is the longest explanatory section and the main reason a prospective client should trust your process.

> **The work before the cutover.**
>
> The runbook. The cutover checklist. The rollback plan.

Give each document its own substantial panel. They should resemble carefully typeset working pages, not screenshots of internal files.

| Part | What it shows | What the 3D does | What visitors can click |
|---|---|---|---|
| **Runbook** | The sequence: preflight, shadow, dual write, cutover, soak, decommission. Credit: “I wrote its first version and still own it. Forty teams use it.” | Reveals the migration path in stages, with the current stage labelled. | Select a stage to view a short public explanation and its static diagram. |
| **Cutover checklist** | A public explanation of readiness, decision points, and responsibility. Any example wording is newly written and labelled illustrative. | Pauses before the route changes. Labels explain what must be established before proceeding. | Expand an illustrative checklist inline. |
| **Rollback plan** | A public explanation of when to stop and how a return path is prepared. It must not imply that every migration can be reversed instantly. | Highlights the return route and shows a conceptual reversal in a separate illustrative state. | Select “View rollback illustration” or return to the forward view. |

The six runbook stages are navigation aids, not compulsory steps visitors must complete. Their content remains available as text.

Use your line here:

> **“I like migrations that are boring on the day.”**

At cutover, the visual change is deliberately small. The preparation carries the meaning.

A postmortem is discussed only when describing an incident. It is not presented as one of your routine migration planning documents.

**6. Technical depth: the database upgrade**

A focused section gives engineering readers something concrete.

> **4 TB. Postgres 11 → 15. No maintenance window.**
>
> An orders database upgrade using dual writes.

Explain the upgrade at the level supported by the public talk and slides. Do not invent consistency checks, rollback mechanics, or the exact intermediate upgrade sequence.

**3D:** The larger service landscape simplifies into two database forms. A labelled diagram illustrates dual writes, then the change in routing. It is explicitly conceptual; it does not assert implementation details that have not been verified.

Visitors can click **“Read the database section”**, opening the corresponding anchor in the migration case study. Keeping it within that case study avoids creating a thin second article.

**7. Open source: ferry**

Give ferry its own clear entry, rather than presenting it as a product you founded.

> **ferry**
>
> A command-line tool for dual-write cutovers. Created by a former colleague; maintained by me since 2022. I wrote its cutover command.

The main action is **“View ferry on GitHub.”** A second link can point directly to the cutover command documentation once that destination is verified.

Do not imply ferry was used in the Kestrel database upgrade. Omit the star count at launch unless verified; it adds little compared with a precise account of your contribution.

**3D:** The main scene ends here. A small static command-flow illustration can support the entry if the documentation warrants it. No fake terminal, typing animation, or invented command syntax.

**8. Reliability: quieter on-call**

Move to a spacious section with a simple comparison:

> **85 → 22 pages per week**
>
> Over about a year, we reduced pages for our nine-person on-call team from 85 to 22 per week. About half of that reduction came from deleting alerts nobody needed.

Show the two values as directly comparable bars. Label the team size and timeframe alongside them. “Approximately 74% fewer pages” can be secondary text.

Avoid a fabricated time-series graph: only the before-and-after values are known.

**3D:** None. The reduction is clearer as a static graphic. The extra white space gives this part of the page a quieter rhythm without relying on animation.

**Clicks:** No forced call to action. Add a link only if there is approved public material that expands on the work.

**9. Speaking**

Present the talk as evidence of both your thinking and your ability to explain it.

> **Boring Migrations**
>
> SRE North 2024  
> A talk that starts with a dropped table and explains why rollback matters.

Use a real slide or video still once available and cleared for reuse.

Actions:

- **Watch the talk** — opens the public video.
- **View the slides** — opens the public deck.
- **Invite me to speak** — opens an email draft with a speaking-specific subject.

Do not autoplay or load a heavy third-party video player on the homepage.

**3D:** None. The talk’s actual material takes precedence.

**10. Background and influences**

A compact career timeline connects the locations and roles:

- **2020–present:** Staff Platform Engineer, Kestrel Freight, Rotterdam.
- **2016–2020:** Site Reliability Engineer, Lumen Pay, Amsterdam. **Card payment systems.**
- **2013–2016:** Systems Administrator, Entoto Technical University Library, Addis Ababa.

Lumen Pay receives no additional description, imagery, architecture, or case study.

Add your electrical engineering degree and a modest skills line: Linux, Kubernetes, Terraform, Postgres, Go, Python.

A small **“On my shelf”** note names the Google SRE book and *Release It!* by Michael Nygard. Do not add invented reviews, quotations, or claims about their influence.

**Clicks:** Download the corrected résumé; optionally visit the books’ official pages.

**3D:** None. A typographic timeline is sufficient. No decorative geographic map.

**11. Contact and footer**

Close with a direct invitation:

> **Planning a migration you’re worried about?**
>
> Tell me what needs to move, what must keep running, and your timeframe.
>
> Going independent in 2027. Get in touch about work planned for then.

Show the verified email address as selectable text, with **“Email Dawit”** and a small **“Copy email”** button. Copying should produce accessible confirmation.

A separate line handles **speaking enquiries**. Email subjects distinguish migration and speaking messages without forcing visitors through a form.

Finish with:

> **I keep things running.**

The footer contains GitHub, LinkedIn, résumé, and any required privacy information.

**3D:** No new scene. A small static motif from the migration illustration provides visual continuity without delaying contact.

**The look**

The design should feel like a precise engineering publication with a spatial illustration running through it.

| Element | Direction |
|---|---|
| Background | Warm paper, `#F2EFE7` |
| Main text | Near-black ink, `#17201F` |
| Infrastructure | Deep evergreen, `#173D36` |
| Change and emphasis | Copper, `#B85B38` |
| Main type | Instrument Sans |
| Technical labels | IBM Plex Mono |
| Layout | Asymmetrical editorial grid, generous margins, fine rules |
| 3D materials | Matte surfaces, soft shadows, restrained depth |

Copper is primarily an accent; text and controls need verified contrast. State is always communicated with labels and shapes as well as colour.

Headlines are large but readable. Paragraphs stay around 60–70 characters wide. Avoid tiny engineering annotations that look impressive but cannot be read.

Use ordinary links and buttons. No custom cursor, ambient audio, background code rain, or obligatory interaction tutorial.

**How scrolling and interaction work**

Normal browser scrolling controls progress through the main scene. Only the migration and approach sections use brief desktop pinning; there are no long empty stretches to advance animation.

Scrolling backwards restores earlier illustrative states. Clicking a stage moves directly to its explanation. Readers can bypass the entire sequence using navigation.

All interactive controls are HTML elements with keyboard support. Nothing essential requires clicking a 3D object. The canvas is supplementary to the document, with equivalent diagrams and captions outside it.

**On a phone**

The phone layout is designed as a complete reading experience:

- A compact header shows your name, contact link, and an accessible menu.
- The opening headline and primary action appear before the illustration.
- Static diagrams replace the pinned 3D sequence by default.
- Each migration stage sits next to its explanation in normal page flow.
- The three working documents stack vertically. Expanded examples appear inline.
- Statistics retain their scope and timeframe without tiny footnotes.
- No horizontal scrolling, sideways carousels, or drag-to-rotate controls.
- Controls have comfortable touch targets, and the layout respects text enlargement.

The page keeps the same order, claims, and destinations. There is no reduced-content mobile version.

**Without 3D or motion**

Static diagrams are the baseline presentation. Capable desktop devices can receive the enhanced scene after the text is usable.

If WebGL fails, JavaScript is disabled, or reduced motion is requested:

- The full page remains readable.
- Each stage has an appropriate still diagram.
- Navigation, case studies, contact, and downloads still work.
- No blank canvas or “unsupported device” message replaces content.
- Reduced-motion mode removes camera travel, scrubbed animation, and unnecessary transitions.

Only one scene renders at a time. Rendering pauses offscreen and when the browser tab is hidden. Avoid an automatic low-performance experience that makes someone struggle to reach your email.

**Supporting pages**

The homepage is supported by two substantive pages:

- **Migration case study:** scope, your responsibility, measured outcome, public account of the approach, database upgrade, and lessons that can be shared. Separate facts from conceptual diagrams and link to public sources.
- **Speaking page:** “Boring Migrations,” video, slides, a short factual speaker biography, and the speaking contact link. Include a transcript or captions link if available.

Both pages use the same typography and static diagrams. Neither requires 3D.

**Everything else needed before launch**

| Area | Required items |
|---|---|
| Verified content | Real email, GitHub repository, LinkedIn profile, talk video, slide deck, and availability wording |
| Public evidence | Review the talk and slides; confirm each technical claim against material approved for publication |
| Document examples | Newly authored, clearly illustrative runbook/checklist/rollback excerpts, or verified public excerpts |
| Attribution | Correct ferry authorship; maintenance since 2022; cutover command credit; accurate runbook ownership; “we” for on-call results |
| Résumé | Correct availability claim, team attribution, and ferry contribution; accessible downloadable PDF |
| Optional assets | Portrait and speaker photo; the design works without either |
| Accessibility | Semantic structure, skip link, keyboard operation, visible focus, contrast checks, diagram descriptions, reduced motion, accessible expanded content |
| Performance | Optimised scene and images, self-hosted licensed fonts, delayed 3D loading, offscreen pause, testing on a modest phone |
| Search and sharing | Page titles, descriptions, canonical URLs, sitemap, robots configuration, factual person metadata, social preview images |
| Site essentials | Domain and hosting, HTTPS, favicon, useful 404 page, working anchor and external links |
| Privacy | No analytics or contact database by default; assess privacy needs for any hosting logs, embeds, or later analytics |
| Verification | Browser and device checks, no-JavaScript and WebGL-failure checks, content review, link checks, email and résumé checks |
| Maintenance | A short owner guide for updating availability, role, links, case studies, and dependencies |

The old site can be replaced. Keep the domain if you control it; redirect any known useful old URLs, without creating an unnecessary legacy-content project.

**Assumptions behind this plan**

“Next year” means 2027, with no exact start date promised. The independent offering is framed around migration planning, cutover preparation, and rollback readiness; pricing, fixed packages, delivery guarantees, and ongoing on-call services are not assumed.

The public talk and slides will determine the depth of the technical case study. Their actual contents have not yet been reviewed. Internal diagrams and documents will not be reproduced.

The homepage prioritises prospective migration clients, then conference organisers. Its contact links—not time spent playing with the scene—are the important actions. Nothing has been built or changed.
