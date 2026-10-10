I’ll read the material folder first and shape the plan around your work and personality, including where motion and 3D add meaning.


The strongest idea in your material is “I move systems that are not allowed to stop.” I’m shaping the site around a live migration: the infrastructure changes as you scroll while the service keeps moving. Your work supplies the story and the visual behaviour.

There are also a few details to reconcile before publication, especially “zero downtime” versus “99.98% availability” and the database upgrade wording. The plan will flag those rather than turn them into unsupported claims.


The site should feel like **a complex operation in steady hands**. Your material has a strong point of view already: “I move systems that are not allowed to stop” and “I like migrations that are boring on the day.” Those should guide both the writing and the interaction.

My proposed concept is **“Everything moves. Service continues.”** As the visitor scrolls, a small, precise 3D system moves from one environment to another. A continuous stream travels through it throughout. Each transition reveals the decisions, tools and operational care behind your work.

The ambition is visual, but the impression visitors leave with is practical: Dawit can be trusted with consequential infrastructure.

**The visual idea**

Use a custom 3D routing model: two source structures, a destination structure, and illuminated paths between them. Think architectural model meets infrastructure diagram, with tangible surfaces, restrained depth and readable labels.

It references your two data centre migration directly. It also gives your runbook a visual language: prepare a route, shadow traffic, run both paths, switch, observe, retire.

This is a conceptual illustration, clearly presented as such; it should never imply access to Kestrel’s actual topology or live telemetry. Avoid a floating technology-logo cloud, decorative planet or simulated terminal. Your work already supplies more distinctive subject matter.

**The scroll, from top to bottom**

1. **Opening: the system is already running.**

   The first screen pairs large typography with the 3D model, visible immediately without an introductory loading sequence.

   > Dawit Bekele  
   > I move systems that are not allowed to stop.  
   > Staff Platform Engineer · Rotterdam  
   > Migrations, reliability, on-call.

   Below: **Explore the migration** and **Get in touch**. A small navigation offers Work, Approach, About and Contact.

   The model has a gentle flow of moving markers. On the first scroll, a destination comes into view while the existing route continues operating. The page establishes the premise within seconds.

2. **The main proof: 310 services, two data centres, 26 months.**

   A large editorial case study takes over. On desktop, the model stays beside three short passages as the visitor scrolls through them:

   - **The constraint:** freight operations had to continue throughout the migration.
   - **The work:** moving services incrementally, with a repeatable migration process.
   - **The result:** 310 services migrated in 26 months; the availability claim appears once its wording is reconciled.

   Groups in the model transfer gradually between environments. There is no need to render 310 individual objects; the number belongs in the typography.

   A **Read the migration story** link leads to a dedicated case study with room for your role, decisions, validation, results and lessons. Until those details are supplied, the homepage should stay within the documented facts.

3. **The method: make the risky day boring.**

   The visual shifts from a spatial model to a clear, six-stage route:

   **Preflight → Shadow → Dual write → Cutover → Soak → Decommission**

   Each stage gets a short explanation next to the corresponding change in the model. During dual write, two paths operate together. At cutover, the new path takes over. The old structure disappears only at decommission.

   This is the most expressive scroll sequence, and it earns its place by explaining your approach. The sequence ends with the strongest evidence of influence beyond a single project:

   > The migration runbook is now used by 40 teams.

   The explanations should be reviewed by you before publication; the material supplies the stages but not their detailed procedures.

4. **The precision work: a 4 TB Postgres upgrade.**

   Give this its own quieter, visually focused section. Two database representations sit alongside a diagram explaining dual writes.

   The headline is concrete:

   > A 4 TB database. A carefully managed change.

   Explain the upgrade, your contribution and the continuity requirement in a few sentences. The full case study can cover how correctness was checked and how cutover was controlled, once those details are available.

   Here the scroll simply advances the diagram. The visitor should be able to understand the mechanism without needing to interact.

5. **The human result: a quieter on-call rotation.**

   The composition opens up. Show **85 → 22 pages per week** as a simple, labelled comparison, with a field of marks becoming less dense as the section enters view.

   Copy connects reliability work to operational load. Don’t claim fewer incidents or better sleep without supporting evidence; the documented result is fewer pages.

   This is an important change of pace. Your portfolio should show that platform engineering includes caring for the people who operate the platform.

6. **The work other people can use.**

   Two substantial editorial entries:

   - **ferry:** your command-line tool for dual-write cutovers. Include your maintainer role, a verified repository link and eventually a real usage example. The recorded 1.2k stars can be a dated supporting detail.
   - **“Boring Migrations”:** SRE North 2024. Link the recording, add a short summary and provide captions or a transcript where available.

   These connect the case studies to public evidence of how you think and teach. Use authentic screenshots or excerpts when available; the supplied material contains no visual assets.

7. **The person, then an easy conversation.**

   Close with a compact career narrative: university library systems in Addis Ababa, payment infrastructure in Amsterdam, then freight platforms in Rotterdam. Those environments give the biography specificity without inventing personal interests or motivations.

   Suggested closing line:

   > Planning a migration that has to keep running?  
   > Let’s talk.

   Show a working email link, LinkedIn, GitHub and a downloadable, accessible résumé. The 3D model is now settled in its destination. Its final composition is enough; it doesn’t need perpetual animation.

**Colour and typography**

The palette should feel warm, technical and deliberate:

| Role | Proposed colour | Use |
|---|---|---|
| Main background | Warm chalk `#F2F0E9` | Reading surfaces and open space |
| Text | Ink `#182326` | Headlines, body copy, structural lines |
| Primary accent | Deep teal `#006B63` | Links, active routes, selected stages |
| Secondary accent | Burnt orange `#B64C2E` | Transition points and small emphasis |
| Quiet surfaces | Stone `#DADDD6` | Model structures and diagram backgrounds |

Use one dark section around the migration method to concentrate attention, then return to light surfaces. Colour always works alongside labels and shapes; it never carries status alone. Final colour combinations need contrast checks.

For type, use **Space Grotesk** for distinctive headlines and large numbers, **Source Sans 3** for comfortable reading, and **IBM Plex Mono** sparingly for diagram labels. Self-host small font subsets and limit weights.

The layout should have generous margins, strong alignment and occasional oversized numbers. Avoid giving every achievement the same rounded card treatment.

**How motion should behave**

Scrolling controls the migration’s progress with native page scrolling. No scroll hijacking, forced horizontal journeys, custom cursor or mandatory interaction.

Keep the richest 3D sequence within the opening and flagship story. Later sections use the same visual language through lighter diagrams and typography. Text remains readable while the scene moves, and motion never delays navigation or hides evidence.

Every animated sequence has a complete static state. With reduced motion enabled, visitors receive labelled diagrams and immediate content, with no camera movement or continuous traffic animation.

**How it holds up on a phone**

The mobile version gets its own composition:

- Put the headline and work link before a compact model illustration.
- Replace the long sticky scene with static or lightly animated diagrams between paragraphs.
- Stack the six method stages vertically, with every explanation visible.
- Use ordinary links and large tap targets; no hover-dependent information or drag requirement.
- Keep the numerical comparisons and case-study content intact.

Full 3D is an enhancement on capable devices. A compressed illustration appears first, and the same illustration remains useful if graphics fail or the connection is slow. Mobile should feel like the clearest expression of the idea.

**What else the site needs**

Build toward a homepage and two detailed case-study pages, with stable links to individual sections. The content should arrive as HTML independently of the 3D scene, giving search engines, screen readers and readers on slow connections the same substantive portfolio.

Include keyboard navigation, visible focus states, a skip link, accessible diagram descriptions, page titles, social sharing images and a useful 404 page. Aim for Core Web Vitals targets, especially a largest contentful paint under 2.5 seconds; load the graphics after the essential content and pause rendering offscreen.

A direct email link is sufficient initially. Add analytics only if there is a clear question to measure, such as whether visitors reach a case study or follow a contact link.

Before publication, resolve these content gaps:

- **Availability:** the résumé says “zero downtime”; LinkedIn says “99.98% availability.” These may describe different scopes, but the site needs one precise explanation.
- **Database upgrade:** confirm Postgres 11 → 15 and how that relates to “across two major versions.”
- **Public links:** verify the supplied `example.com` email and `github.com/example/ferry` address, and obtain the LinkedIn and talk URLs.
- **Case-study depth:** supply the key decisions, constraints, your individual contribution and any diagrams or operational details suitable for public use.
- **Current facts:** recheck your title, employment and repository statistics before launch.

The plan is grounded in your [LinkedIn material](material/linkedin.md), [résumé](material/resume.md) and [old site](material/old-site.md). Nothing has been built or changed.
