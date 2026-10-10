I’ll review the material folder first, then shape a site concept around your work and personality, including the scroll experience, visual direction, mobile behavior, and practical requirements. I won’t build anything.


Your material has a strong central idea: you move systems that cannot stop. I’m shaping the site around a continuous flow that survives a change of infrastructure, with your migration work providing the story and the evidence.

I also found a few details to resolve before publishing: the materials describe the Postgres upgrade differently, and “zero downtime” needs to stay distinct from the reported 99.98% availability.


The site should make one idea memorable: **Dawit Bekele moves systems that cannot stop.**

Your strongest story is already in the material: 310 services migrated over 26 months while freight operations continued. That gives the website a distinctive visual language and a reason to use 3D. The spectacle comes from watching a complicated transition stay calm.

**The concept: “Keep things moving.”**

A continuous stream of small signals travels through a restrained, three-dimensional infrastructure model. As visitors scroll, the infrastructure changes around that stream: services move, two environments briefly coexist, traffic switches, and the old environment retires. The flow continues.

This is an illustrative model of your migration practice, not a reconstruction of Kestrel’s private architecture. It connects your freight experience, reliability work, and `ferry` without leaning on literal trucks or ships.

The voice should be direct and quietly confident, drawing from your own line: “I like migrations that are boring on the day.” Visitors should leave understanding your judgment, not just your tooling.

1. **The journey from top to bottom**

   | Part | What the visitor sees and learns | What happens on scroll |
   |---|---|---|
   | **Opening: the promise** | “I move systems that are not allowed to stop.” Your name, Staff Platform Engineer, Rotterdam, and a short introduction. Clear links to selected work and contact. | Signals move through a compact infrastructure model beside the headline. The first scroll gently reveals that there are two environments. |
   | **The migration: the flagship story** | Kestrel Freight: 310 services, two data centres, 26 months, and 99.98% availability through the migration. Explain the operational constraint: the trucks kept running. | Services progressively cross between environments while the signal stream continues. A few readable labels describe the change; text stays in ordinary page flow. |
   | **The method: how you make it safe** | Your runbook: preflight → shadow → dual write → cutover → soak → decommission. Emphasize the decisions and checks behind each stage, including rollback where confirmed. Mention adoption by 40 teams. | The model changes with each stage: a parallel route appears, both destinations receive writes, traffic switches, then the old route fades. Each visual transition answers a technical question. |
   | **The database: a closer look** | A focused case study of the 4 TB Postgres upgrade without a maintenance window. Show the constraint, your role, the approach, and the verified outcome. | The camera moves closer to one service. Two write paths make the dual-write approach understandable without turning the page into a technical dashboard. |
   | **Reliability after the move** | On-call pages fell from 85 to 22 per week. Explain what you changed and how it affected the team once those details are available. | The scene settles and visual activity decreases. A simple before-and-after graphic carries the evidence; avoid implying every page was an outage. |
   | **Tools and shared knowledge** | `ferry`, your dual-write cutover CLI, and “Boring Migrations,” your SRE North 2024 talk. Each gets a short explanation and a real destination link. | The 3D scene gives way to crisp project and talk previews. A real command example can demonstrate `ferry` once verified. |
   | **The person and the invitation** | A compact career thread: university library systems in Addis Ababa → card payments in Amsterdam → freight infrastructure in Rotterdam. Close with your approach to engineering and a clear contact link. | Motion subsides. The closing composition is spacious, with “I keep things running” returning from your original site. |

   The migration section should be the visual centerpiece. The rest of the site gives visitors room to read, assess your work, and contact you.

2. **What the work needs to show**

   This portfolio should be useful to engineering leaders, prospective collaborators, and peers who want to understand how you think.

   Each substantial case study should answer four questions: what could not fail, what you owned, how you managed the transition, and what changed afterward. Put those answers before technology lists.

   The supplied material supports a strong overview, but fuller case studies need your specific decisions: how you established readiness, validated dual writes, chose cutover criteria, and handled rollback. Those details should come from you. Diagrams should be approved abstractions, with no confidential service names or topology.

   Linux, Kubernetes, Terraform, Postgres, Go, and Python can appear alongside relevant work. They do not need a standalone wall of skill badges.

3. **Colours, type, and visual character**

   Use a warm, paper-like background with dark ink typography. This gives the technical material an editorial quality and keeps the atmosphere calm.

   - **Warm ivory:** `#F3F0E8` for the main background.
   - **Deep charcoal:** `#202724` for text and infrastructure geometry.
   - **Deep teal:** `#176B63` for active routes, links, and emphasis.
   - **Burnt copper:** `#A54B2A` for transitions and selected annotations.

   Exact text combinations should pass contrast checks. Labels and shapes must explain states independently of colour.

   Use **Instrument Sans** for large headlines and reading text, paired with **IBM Plex Mono** for measurements, runbook steps, and diagram annotations. Oversized type belongs at the opening; case-study paragraphs should stay comfortable to read.

   The 3D objects should look like matte architectural models: simple volumes, thin routes, soft shadows, and carefully placed labels. Generous space and precise alignment will give the site its character. A real portrait is optional; infrastructure work can carry the opening without one.

4. **How motion should behave**

   Scrolling controls the migration narrative, with modest camera movement and clear changes in system state. Use one short sticky scene on desktop, alongside readable text. Preserve native scrolling and make navigation immediately usable.

   The continuous signal stream should move slowly. Avoid spinning objects, constant particle effects, custom cursors, or interactions visitors must discover before reaching the work.

   Every animated state needs a meaningful static equivalent. With reduced motion enabled, visitors get diagrams and the complete written story. If WebGL fails, a prepared illustration occupies the same space.

5. **How it holds up on a phone**

   Mobile should feel deliberately composed:

   - Put the headline and introduction first, followed by a shallow visual.
   - Replace the sticky 3D sequence with stacked diagrams for the six migration stages.
   - Keep the achievements as readable text.
   - Use full-width project links and comfortable tap targets.
   - Make everything available without hover, dragging, or precise gestures.

   A lightweight rendering may be enabled on capable phones, but the static mobile design must stand on its own. The visitor should reach your work quickly on an ordinary connection.

6. **What else the site needs**

   Keep the navigation small: **Work, Approach, About, Contact**, plus a downloadable résumé. Give the major case studies their own URLs so they can be shared directly, while the homepage tells the complete overview.

   Build requirements should include keyboard access, visible focus states, semantic headings, accessible diagram descriptions, reduced-motion support, and readable content before the 3D assets load. Load the visual layer progressively and pause rendering when it is off-screen.

   Add search metadata, a social sharing image, a useful 404 page, and clear contact links. A direct email link is sufficient unless you want a form. Analytics are optional.

   Before publication, resolve these content details:

   - Confirm the Postgres upgrade: LinkedIn says “two major versions”; the résumé specifies 11 → 15.
   - Confirm the scope of “zero downtime,” keeping it separate from 99.98% availability.
   - Verify the email and GitHub address, which currently look like placeholders, and obtain the talk URL.
   - Confirm permission to name the employer and publish the metrics.
   - Supply the decision-making details needed for the case studies.

The result should feel ambitious through its composition and choreography, with the depth coming from your actual work. **The signature moment is watching the infrastructure change while the flow keeps moving.** No implementation has been started.
