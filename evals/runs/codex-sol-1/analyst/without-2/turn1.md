I’ll read the material folder first, then shape a site concept around your work and personality, including the scroll experience, visual direction, mobile behavior, and practical requirements. I’ll keep this to planning.


The strongest thread in your material is making data useful to people: bank staff, sequencing teams, and people searching for a room in Lisbon. That gives the site a clear story and a reason for the 3D.

I also found conflicting figures and dates across the résumé and LinkedIn export. I’ll flag those in the plan and use the consistent facts for now. Private messages and contact lists will stay out of the proposed public content.


The site should feel like **Rafael Costa’s working world: precise, useful, and connected to real people.** Your strongest story is already in your material: “I make dashboards people actually use.” Banking, genomics, and Lisbon rents give that statement substance.

My recommendation is a portfolio built around **“From data to a decision.”** The visual spectacle comes from showing how your work makes something understandable and actionable. Nothing has been built.

**The idea**

A warm, editorial website with a single recurring 3D surface: a table of information viewed in shallow perspective. As visitors scroll, it takes different forms—a dashboard, a sequencing schedule, a map of Lisbon.

These forms represent the different settings in which you work. They share one visual language, so the site feels authored rather than assembled from unrelated effects.

Your name, writing, and project evidence remain the focus. The 3D provides atmosphere and explanation; the portfolio still communicates fully without it.

The primary audience should be hiring managers and potential collaborators. They should understand your value in the first screen, then find enough detail to assess your work.

**The scroll, from top to bottom**

| Part | What it shows | What happens as you scroll |
|---|---|---|
| **1. Introduction** | Rafael Costa; Founder & Product Analyst; Lisbon. Headline: **“I make dashboards people actually use.”** Supporting line: “Across banking, genomics, and everyday life in Lisbon.” Links: **Explore my work** and **Get in touch**. | A small field of data marks settles into a readable surface. The text is visible immediately; there is no loading intro. A brief scroll changes the scene’s perspective and reveals the work below. |
| **2. Evidence of usefulness** | Three concise facts: dashboards used by **200+ staff**, **35% improved efficiency** at Meridian Bank, and **winner of the Health Data Hackathon 2023**. Each links to its relevant context. | The surface flattens into an editorial layout. Numbers appear as ordinary readable text, without animated counters. |
| **3. Meridian Bank** | Your product analyst work: who uses the dashboards, which decisions they support, what you contributed, and how the efficiency improvement was measured. | A dashboard-like composition comes into focus. One annotated detail explains a real decision the work supports. Use actual, approved imagery or a clearly labelled reconstruction once available. |
| **4. Helix Genomics Institute** | Sequencing operations, reporting improvements, and the human effect of better planning. Feature the public LinkedIn recommendation about ending double-booked sequencers, attributed to Beatriz Lima. | Rows on the recurring surface align into a scheduling view. The motion illustrates coordination. Any reconstruction must use supplied evidence rather than inventing your interface. |
| **5. Lisbon Rent Map** | The most visually distinctive project: “A map of what a room costs in every parish of Lisbon.” Explain its audience, data sources, methodology, and limitations. | The surface becomes a shallow relief map of Lisbon. A selected parish rises slightly as its explanation appears. Visitors can choose a parish, but scrolling never requires interaction. |
| **6. Other work and background** | FraudShield and AutoPilot, followed by a concise career timeline, DataTugas, and education. SQL, Python, Tableau, Power BI, dbt, and statistics appear in context. | Motion becomes quieter. Two project previews and a readable timeline give visitors room to browse. Avoid treating tools as skill percentages. |
| **7. Contact** | A short closing invitation: **“Have a decision that needs better data?”** Email, LinkedIn, and a downloadable résumé. | The scene settles into a simple surface, leaving the contact text prominent. The footer includes a return-to-top link. |

Use normal scrolling throughout. A compact navigation—**Work / About / Contact**—lets visitors skip the visual sequence. Avoid forced scroll speeds, long pinned passages, and custom cursors.

**What each project needs to say**

The homepage introduces the work; substantial projects should have their own shareable pages. Each case study should answer:

- **What was difficult?** The situation and the people affected.
- **What did you own?** Your role, collaborators, and constraints.
- **What did you change?** The analytical or product decisions, supported by a few annotated artifacts.
- **What improved?** The result, how it was measured, and any limits.
- **What did you learn?** One specific reflection that reveals your judgment.

Meridian, Helix, and Lisbon Rent Map should lead because the material gives them the clearest connection to users and outcomes. FraudShield and AutoPilot can begin as shorter project notes; their descriptions currently lack enough detail for full case studies.

**Colour and type**

Use a warm palette drawn from paper, ink, and Lisbon’s built environment:

| Role | Colour |
|---|---|
| Main background | Warm ivory `#F3EFE7` |
| Main text | Deep ink `#172126` |
| Primary accent and links | Petrol teal `#176B68` |
| Selective emphasis | Terracotta `#B64E35` |
| Rules and quiet surfaces | Limestone `#D8D0C3` |

Keep most of the page ivory and ink. Teal connects interactive elements and data highlights; terracotta marks a selected feature or meaningful result. Data charts need a separate, accessible categorical palette.

Use **Geist** for navigation, body copy, and labels, paired with **Source Serif 4** for large editorial statements and reflective passages. Tabular numerals make metrics and chart labels orderly. Large type, generous margins, and occasional asymmetry give the page character without compromising readability.

The 3D should use matte surfaces, restrained depth, and soft shadows. Its colours should belong to the same palette as the text and charts.

**How it holds up on a phone**

The mobile version should have its own composition:

- Stack text and artifacts vertically; remove sideways reading.
- Replace the desktop 3D scene with lightweight stills or brief transitions by default. Offer a small interactive map where it adds value.
- Keep every project’s purpose and result visible without hovering or opening an interaction.
- Turn map exploration into tap-to-select parishes with a readable detail panel.
- Use approximately 18px body text, comfortable line lengths, and touch targets at least 44px high.
- Keep contact and project links easy to reach.

With reduced motion enabled, all scroll-linked movement becomes static. The full story remains available.

**What else the site needs**

The first page should render immediately, with 3D loaded afterward. Load the scene only when needed, pause it offscreen, and provide a static fallback on slower devices. Aim for good Core Web Vitals on mobile; validate those on the eventual build.

Accessibility should cover keyboard navigation, visible focus, contrast, semantic headings, chart descriptions, and textual equivalents for visual evidence. Colour alone must never communicate a data distinction.

Each case study needs a stable URL, descriptive page title, social preview image, and crawlable text. Include a current résumé and working contact links. A direct email link is sufficient initially; analytics should be minimal and privacy-conscious.

**Material to resolve before publishing**

The supplied files disagree on:

| Item | Résumé | LinkedIn export |
|---|---|---|
| Helix reporting-time reduction | 40% | 60% |
| Lisbon Rent Map monthly visitors | 5,000 | 3,000 |
| MSc dates | 2020–2021 | 2020–2022 |

Leave these disputed claims out of public copy until resolved. DataTugas appears as a past founder role, dated 2018–2020; the site should clarify that history.

The folder contains written summaries, but no project screenshots, underlying map data, or detailed case studies. Before implementation, gather suitable artifacts, clarify your contributions and measurement methods, and check what employer work can be shown publicly. The paper needs a title and citation. The map URL and email appear to be example addresses and need replacing or confirming.

Private correspondence, recruiting discussions, and connection details have no role in the public site.

The result should be memorable because visitors can see **how you turn information into something people use**, with the motion reinforcing that story at every stage.
