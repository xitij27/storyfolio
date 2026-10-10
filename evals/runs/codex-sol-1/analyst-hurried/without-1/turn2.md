I’ll make the decisions and give you the complete plan, with no questions. I’ll use the strongest supported material and leave disputed figures out of the proposed public copy.


I’ve made the decisions. The site will target **hiring managers and product/data leaders**, use English, and position you as a **product analyst and founder who makes complex data useful**.

The complete specification is saved in [PORTFOLIO_PLAN.md](/tmp/storyfolio-evals/codex-analyst-hurried-without-yduEP9/PORTFOLIO_PLAN.md). Nothing has been built.

**1. The idea: “From signal to decision”**

The site’s visual story follows the same progression as your work: complex information becomes understandable, then useful.

Your opening line is already in your material:

> **I make dashboards people actually use.**

A sculptural, three-dimensional map inspired by Lisbon becomes a flat, readable map as visitors scroll. This connects the opening directly to Lisbon Rent Map. Later sections use workflows and schedules to explain banking and genomics.

The personality comes from your actual combination of work: city rents, banking dashboards, sequencing operations, automation, and community founding. The design gives those subjects room to be memorable.

**2. What happens from top to bottom**

| Section | What it shows | What moves |
|---|---|---|
| Opening | Your headline, name, role, Lisbon location, and direct links to work and contact | A shallow 3D geographic relief responds subtly to the pointer, then rotates toward a flat map |
| Lisbon Rent Map | The question the project answers, its scope, and available project details | The map stays visible through a short sequence explaining the question and product |
| Meridian Bank | Your dashboard work and its use by 200+ staff | An illustrative workflow becomes an organized dashboard composition |
| Helix Genomics | Sequencing operations, reporting, and your paper contribution | A sequencing queue resolves into a readable weekly schedule |
| AutoPilot and FraudShield | Two concise project stories explaining automation and real-time fraud detection | Small illustrative flows animate once as they enter view |
| About | Your professional path, DataTugas, education, award, and toolkit | Motion settles; the emphasis becomes typography and reading |
| Contact | A clear invitation, email link, and résumé download | Quiet map linework returns to connect the ending to the opening |

The homepage will contain the complete story. Expandable project details will add depth without sending visitors to thin case-study pages.

**3. Opening and navigation**

The first screen contains:

> **I make dashboards people actually use.**  
> Rafael Costa — Product Analyst & Founder, Lisbon.  
> Work across banking, genomics, and the city around me.

Actions: **Explore the work** and **Get in touch**.

Navigation: **Work · About · Contact**, with an accessible résumé download.

The headline appears immediately. The 3D loads afterward. There is no loading screen, introductory film, or interaction visitors must complete before reaching your work.

**4. Project presentation**

**Lisbon Rent Map leads.** Its title is “What does a room cost across Lisbon?” It is your most geographically specific project and gives the opening scene a purpose. The presentation explains that it maps room costs across Lisbon’s parishes.

Without actual map imagery or rental data, the visual will remain explicitly illustrative, with no fabricated prices.

**Meridian follows with adoption.** Its title is “Built for the people who use it every week.” The supported **200+ staff** figure provides the central evidence. The section emphasizes your product analyst role and dashboard work.

**Helix shows operational complexity.** Its title is “Helping a sequencing core plan its week.” The visual language uses schedules and queues. The content covers sequencing operations, reporting, and your contribution to a paper in the *Journal of Genomic Methods*.

**AutoPilot and FraudShield demonstrate range.** Their entries stay concise because the material contains limited detail. They will state their documented purpose without invented technical architecture, adoption figures, or deployment claims.

**5. About and personal voice**

The About section will use a strong typographic nameplate rather than depend on a missing portrait.

Its introduction:

> My work spans banking dashboards, sequencing operations, and a map of room rents across Lisbon. My background combines economics and data science. I also founded DataTugas.

A compact timeline includes Atlantico Telecom, Helix, Meridian, and DataTugas. Education appears without disputed graduation dates. The Health Data Hackathon 2023 win gets a small, clear mention.

SQL, Python, Tableau, Power BI, dbt, and statistics appear as a concise toolkit. No skill percentages.

**6. Colours and typography**

| Role | Choice |
|---|---|
| Main background | Warm paper — `#F2EFE8` |
| Text and dark section | Ink navy — `#14252D` |
| Links and selected features | Deep teal — `#176B68` |
| Occasional visual emphasis | Terracotta — `#C46D4E` |
| Headlines and body | Manrope |
| Dates and data captions | IBM Plex Mono |

Most of the page stays light. The banking section uses a dark background to change the pace.

Desktop headings are large—approximately 88–112px—with generous spacing. Body copy stays around 18px and comfortably narrow. Map lines, restrained grids, and precise alignment give the site a consistent identity.

**7. Motion rules**

The opening-to-map transformation is the main spectacle. Later motion explains the subject of each project.

Scrolling stays native. Links remain usable throughout. Text and numbers do not wait for animation to finish. There is no automatic sound, cursor replacement, or essential hover-only content.

Reduced-motion settings replace animated scenes with composed stills. Every story remains understandable without movement.

**8. The phone experience**

Mobile gets a deliberate layout:

- Headline first, compact map beneath.
- Single-column project stories.
- No pinned scroll sequences.
- Static opening artwork instead of loading the 3D bundle on touch devices.
- Readable diagram crops with full-size views where needed.
- Comfortable text, at least 44px touch targets, and preserved browser zoom.

The phone version should feel complete and composed.

**9. Content decisions already settled**

I will omit the conflicting Helix percentage, Rent Map visitor count, and MSc graduation year. I will also leave the bank’s 35% efficiency figure out of prominent copy because the material does not define the measurement.

Private messages and connection records will not become website content. Third-party testimonials are excluded from the launch composition.

The placeholder email and project URL will not appear as working links. Genuine contact routing is a launch configuration requirement; it does not prevent completion of this plan.

**10. What the site needs behind the presentation**

The later implementation will use **Astro, TypeScript, CSS, an isolated Three.js scene, and limited GSAP scroll animation**. Content stays in local files. No CMS, database, contact form, booking widget, or analytics at launch.

It also needs:

- An accessible résumé summary using supported facts.
- Search metadata, social preview artwork, favicon, sitemap, and 404 page.
- Keyboard navigation, visible focus, descriptive image text, and checked contrast.
- Compressed images and deferred 3D loading.
- Static fallbacks when JavaScript or WebGL fails.
- Testing on a normal phone, slower connection, and reduced-motion settings.

The future build order is: complete static layout, mobile composition, motion, contact configuration, then accessibility and performance checks. The plan is complete; construction remains outside this task.
