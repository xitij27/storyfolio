I’ll read the material folder first and use your work and personality to shape the concept, scroll experience, and visual direction. I’ll keep this to planning only.


The strongest direction is **“I move systems that are not allowed to stop.”** That line from your material is more distinctive than a conventional portfolio introduction. It gives the site a story, a visual language, and a reason for 3D to exist.

Your work is about making difficult transitions feel uneventful: moving 310 services, upgrading a 4 TB database, and making on-call quieter. The site should make that usually invisible work visible. It should feel precise, composed, and quietly ambitious.

**The concept: “While everything keeps running.”**

One evolving 3D system accompanies the page. A continuous stream passes through two groups of infrastructure. As visitors scroll, services gradually move from the original environment to the new one; the stream keeps flowing.

This is an abstract illustration of your work, not a claimed reconstruction of Kestrel’s architecture. Its movements explain migration, validation, and continuity. Avoid floating technology logos, decorative globes, terminal cosplay, or a dashboard full of invented live metrics.

The distinctive moment comes at cutover: after all the visible preparation, almost nothing happens. Traffic continues. Your line lands: **“I like migrations that are boring on the day.”**

**The page, from top to bottom**

1. **Opening — establish who you are immediately.**  
   “Dawit Bekele” and “Staff Platform Engineer · Rotterdam” sit above the large headline: **“I move systems that are not allowed to stop.”** Beneath it: a short introduction about migrations, reliability, and on-call.

   The 3D system occupies the other half of the desktop viewport, already carrying a restrained flow of activity. Two ordinary links—“Explore the work” and “Get in touch”—work immediately. Visitors never need to wait for an animation to understand or use the page.

2. **The flagship migration — give the spectacle evidence.**  
   Introduce Kestrel Freight with **310 services. Two data centres. 26 months.** Then explain your role leading the migration while the business continued operating.

   Across a short desktop scroll sequence, groups of services move between environments. Text advances through preparation, migration, and retirement of the old infrastructure. Each stage should describe a real decision, safeguard, or responsibility; we’ll need your detail to write those passages accurately.

   End with the recorded **99.98% availability through the migration**, subject to the wording check below. A “Read the migration” link opens a dedicated case study rather than cramming all the engineering detail into the animation.

3. **The database cutover — show how you think.**  
   The scene simplifies to two database forms. A diagram introduces the **4 TB Postgres 11 → 15 upgrade**, dual writes, and the absence of a maintenance window.

   Visitors see writes reaching both sides, followed by the cutover illustration. Persistent captions explain what they are seeing; the animation never carries the explanation alone. The key content is your reasoning: how consistency was checked, what allowed the change to proceed, and how rollback was handled. Those details need your input.

   This is where “boring on the day” appears. The emotional payoff is continuity.

4. **Quieter on-call — make the human outcome legible.**  
   Leave the 3D scene and return to open, spacious typography. Show **85 → 22 pages per week**, with a simple comparison graphic and the corresponding **74% reduction**.

   The visual rhythm settles, with fewer marks and more breathing room. Explain what changed operationally once you supply the specifics. Avoid inventing stories about sleep, burnout, or team sentiment.

5. **Tools and practices that other people can use.**  
   Present three editorial entries, each with a short explanation and a clear destination:
   - **ferry:** your command-line tool for dual-write cutovers.
   - **The migration runbook:** used by 40 teams, showing the documented sequence: preflight, shadow, dual write, cutover, soak, decommission.
   - **“Boring Migrations”:** your SRE North 2024 talk.

   These establish that your contribution extends beyond a single migration. Link to a public or sanitised runbook only if one is available.

6. **The person behind the systems.**  
   A compact career narrative follows Addis Ababa → Amsterdam → Rotterdam, connecting library systems, payment authorisation, and freight infrastructure. Use factual, plainspoken copy rather than turning the locations into an invented personal story.

   A small skills line can retain Linux, Kubernetes, Terraform, Postgres, Go, and Python from your old site. They support the work instead of becoming the main attraction. An optional portrait and a short paragraph in your own voice would add warmth.

7. **A direct finish.**  
   Return to your original line: **“I keep things running.”** Close with email, GitHub, LinkedIn, and a downloadable résumé once the destinations are verified.

   Keep the invitation neutral until your objective is clear—hiring, consulting, speaking, or professional connection. There is no evidence in the material that you are currently looking for a role.

**Colours and typography**

Use a warm paper background (`#F2EFE7`) with near-black ink (`#17201F`). Deep evergreen (`#173D36`) gives the infrastructure scene weight; oxidised copper (`#B85B38`) marks transitions. The result should feel closer to an engineering publication than a neon developer dashboard.

Colour will have a consistent job: neutral structures, green for the established path, copper for the part being changed. Labels and shapes also communicate state, so understanding never depends on colour.

Set headlines and body copy in **Instrument Sans**, with **IBM Plex Mono** reserved for numbers, stage labels, and small technical annotations. Large, carefully spaced headlines provide confidence; readable paragraphs carry the substance. Use an asymmetrical editorial grid, generous margins, fine rules, and very few boxed cards.

**Movement and the phone experience**

Use normal browser scrolling. On desktop, the migration scene can remain briefly pinned while three concise stages advance beside it. Avoid scroll hijacking, long cinematic introductions, and elaborate camera flights. Small translations and changes in routing will explain more than constant spinning.

On phones, the same story becomes a linear reading experience: headline first, compact visual second, then clearly labelled stages. Replace the pinned 3D sequence with lightweight static diagrams or short transitions. Stack statistics and keep technical diagrams readable without horizontal dragging.

Reduced-motion settings should receive the complete story as still illustrations. The page must also remain useful if WebGL fails or JavaScript is unavailable. Stop rendering when the scene is offscreen, and load the main text and links before the 3D assets.

**What else the site needs**

Alongside the homepage, plan two shareable case studies: the service migration and database upgrade. Each should cover context, your responsibility, constraints, decisions, validation, outcomes, and lessons. Include useful static diagrams so a technical reader can inspect the work at their own pace.

The build should include keyboard navigation, visible focus states, accessible contrast, semantic text, social preview images, page metadata, a favicon, a résumé download, and a helpful 404 page. Prefer direct email over an unnecessary contact form. Self-host fonts and keep the rendering dependencies small.

Before implementation, resolve these content gaps:

- **Reliability wording:** the résumé says “zero downtime,” while LinkedIn gives 99.98% availability. These may describe different scopes. Confirm whether there was zero migration-induced downtime and what period the availability figure covers.
- **Verified destinations:** the email and GitHub address look like placeholders; the talk video and LinkedIn URL are missing. Verify the repository’s star count before publishing it.
- **Engineering evidence:** collect your decisions, validation methods, rollback approach, and any diagrams or excerpts suitable for public use. Confirm which employer details can be published.
- **Personal direction:** identify the audience you most want to reach and add a little first-person material about how you work.

The success criterion is simple: within seconds, a visitor understands what you do; after scrolling, they understand why your judgment matters. The 3D earns its place by helping explain that judgment.

Nothing has been built or changed.
