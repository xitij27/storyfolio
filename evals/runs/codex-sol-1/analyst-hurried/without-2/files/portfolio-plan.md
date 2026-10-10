# Rafael Costa — portfolio concept and experience plan

Planning only. No website, prototype, or application has been built.

## Purpose and audience

Decision: the primary audience is product and analytics hiring managers; collaborators are a secondary audience. The site should make Rafael’s practical impact understandable quickly, then reward deeper reading. Rafael has delegated the remaining planning decisions; no answers are required to complete this plan.

The source material supports a profile that crosses economics, data science, genomics, banking, and community building. Its most distinctive thread is Rafael’s own line: “I make dashboards people actually use.” That is the positioning. “Founder” should be contextualized through DataTugas, rather than implying a currently operating company.

## Concept: Data, made useful

An editorial portfolio built around the transformation from information into a decision someone can act on. The visual centerpiece is a small three-dimensional decision table: translucent layers, plotted marks, and flat interface panels arranged in shallow depth. As visitors move down the page, the same visual vocabulary shifts from raw information to an organized view and finally to a clear action.

This should feel like a working instrument Rafael might use, with precise labels and humane writing. It should not imitate a science-fiction control room. Lisbon enters through the rent-map project and a restrained cartographic texture, not through generic travel imagery.

The scroll sequence is an artistic metaphor. It must not pretend to display live fraud events, real bank data, or measured scientific results. Actual project visuals require Rafael’s own cleared assets; illustrative graphics must be identified as such.

## The journey from top to bottom

### 1. Opening: a clear promise

The first screen has Rafael Costa, “Product analyst · Lisbon,” the headline “I make dashboards people actually use,” and a short supporting line connecting banking, genomics, and Lisbon rents. Use two direct links: “Explore my work” and “Get in touch.” A small persistent navigation contains Work, About, and Contact.

Beside the text is the decision table. On initial load it is already legible; there is no mandatory introduction. During the first viewport of scrolling, separated layers settle into an aligned view. Pointer movement can add a very small change in perspective, but reading and navigation never depend on it. Rafael’s identity and value are visible before any animation completes.

### 2. The work: three distinct projects

Three generous editorial chapters follow. Every chapter has a title, one-sentence explanation, Rafael’s role when confirmed, an actual visual if available, and a case-study link. Use a normal vertical flow with a briefly sticky visual on desktop; do not force horizontal scrolling.

**Lisbon Rent Map opens the sequence.** It is the easiest project for a visitor to understand and gives the site a personal geographic anchor. Explain it as “A map of what a room costs in every parish of Lisbon.” The scene becomes a shallow map surface with a few clearly labeled areas. Scroll can reveal the relationship between an overview and a local detail. Only use real geography and price values from a supplied, dated dataset; otherwise show a neutral conceptual map without invented figures. Explain coverage, collection dates, and limitations in the case study. Monthly traffic remains unpublished until reconciled.

**AutoPilot follows.** Explain it as an automation platform for analytics teams. The visual becomes a compact process diagram, with steps lining up as the chapter enters view. Exact steps, technologies, users, and time savings must come from project evidence. Do not invent a production pipeline to fill the design. The case study should identify what is shipped, experimental, or still in progress.

**FraudShield closes the project sequence.** Explain it as a real-time fraud detection system. A deliberately labeled illustrative event stream can show the concept of surfacing a signal for review. Do not imply an established accuracy, a deployed banking integration, or actual customer activity. The eventual case study should explain data, evaluation, latency, false positives, Rafael’s contribution, and limitations wherever those details are available.

The shared composition connects the chapters, but each project has its own information structure. Avoid giving all three identical screenshot cards.

### 3. Evidence: what changed for people

The animated scene recedes and the page becomes calmer. Show Meridian Bank’s dashboards used by 200+ staff and the reported 35% efficiency improvement. Label these as professional experience, separate from the personal project chapters; the sources do not establish that FraudShield or AutoPilot delivered these bank outcomes. Explain what “efficiency” measures when evidence is supplied.

For Helix, emphasize the sequencing operation and the colleague’s concrete testimony: “He is the reason we stopped double-booking the sequencers.” Attribute it to Beatriz Lima, Head of the Sequencing Core, Helix Genomics Institute. Confirm public use and final quotation wording before publication. Omit the reporting improvement percentage until the conflicting figures are resolved.

Mention the Health Data Hackathon 2023 win and journal contribution in a compact evidence strip. Add an award link and paper citation when supplied; do not infer authorship rank or which project won the award.

### 4. About: the person behind the systems

A short first-person narrative links an economics background with making data usable in everyday operations. Present the professional path in a concise timeline: Atlantico Telecom, Helix Genomics Institute, and Meridian Bank. Include DataTugas as a separate community/founder chapter, with its recorded 2018–2020 dates and a description to be supplied.

Show SQL, Python, Tableau, Power BI, dbt, and statistics as a quiet capability list. No proficiency meters. Add a portrait and a personal paragraph if Rafael supplies them; do not invent hobbies, values, or a founding story. Education can show degree names while the MSc completion date is verified.

### 5. Contact: an easy next step

Finish with a simple “Let’s make the data useful” invitation, a verified email link, an optional confirmed LinkedIn profile, and a reviewed downloadable résumé. Describe the roles or collaborations Rafael welcomes once confirmed. A contact form is unnecessary for the first version unless requested.

The decision-table visual resolves into a flat, readable composition. The closing motion reinforces clarity without delaying contact.

## Visual language

- Background: warm paper, `#F3F0E8`.
- Primary text: deep ink, `#172522`.
- Primary accent: teal, `#126B63`, for links, data marks, and navigation emphasis.
- Secondary accent: terracotta, `#B64E35`, for small highlights and contrast between project chapters.
- Surface: soft mineral gray, `#DDE4DE`, for panels and quiet dividers.

Check all final text and control combinations for WCAG AA contrast; do not rely on accent colors alone to communicate meaning. Keep the same palette throughout, with slightly different emphasis per project.

Use **Manrope** for confident headings and readable body copy, and **IBM Plex Mono** sparingly for dates, figure labels, and captions. Self-host a small set of font weights. Large headlines, generous margins, fine rules, and useful captions should carry the design even when animation is disabled. Final typography needs testing with real copy rather than oversized placeholder slogans.

## Motion and interaction rules

One shared 3D scene is sufficient. Use depth, alignment, and a small number of purposeful transitions rather than continuous particles or spinning objects. Each animated state should explain the nearby content. Avoid cursor replacement, scroll hijacking, sound, flashing, and text that becomes readable only after a reveal.

Use native page scrolling and anchor links. A visitor should be able to reach work immediately, open case studies, use the browser back button, and contact Rafael without finishing the full sequence. Animations pause when offscreen. The page remains complete if graphics fail to load.

## Phone and accessibility

On phones, text comes first and each chapter becomes a short stacked story with a static or lightweight animated visual. Replace the desktop 3D composition with pre-rendered frames or flat diagrams by default; do not shrink a desktop canvas into an unreadable miniature. No long pinned sections or hover-only information. Keep touch controls at least 44 px, body copy approximately 17–18 px, and charts readable with an accompanying text explanation.

Respect `prefers-reduced-motion` with static compositions and ordinary transitions. Provide semantic headings, visible keyboard focus, descriptive links, alt text, and accessible figure summaries. Canvas content is decorative; essential claims and labels are in HTML. Test keyboard use, screen readers, zoom, and common narrow viewport widths.

## Site structure and delivery requirements

The homepage is an overview, not the only container for detailed work. Give each project its own shareable case-study URL, with a consistent narrative: problem, users, Rafael’s role, decisions, evidence, result, and limitations. Keep unsubstantiated sections out of the published version rather than filling them with generic copy.

Proposed routes: `/`, `/work/lisbon-rent-map`, `/work/autopilot`, and `/work/fraudshield`. Include a useful 404 page and direct project links. Provide metadata, social preview images, favicon, sitemap, accessible navigation, and a downloadable résumé.

Load content and the main visual first; defer 3D until after the initial readable page. Use compressed images, efficient geometry, and a device-aware graphics budget. Target good Core Web Vitals on real mobile devices: LCP within 2.5 seconds, INP below 200 ms, and CLS below 0.1, measured rather than assumed. Use privacy-respecting analytics only if Rafael wants visitor measurement. No third-party trackers by default.

Before release, verify copy, links, privacy, asset rights, confidentiality, accessibility, performance, and behavior when scripts or graphics are unavailable. Banking and genomics visuals need sanitized or synthetic data with clear labeling. The LinkedIn archive’s connections and private messages should not become public site content.

## Content decisions before publication

| Item | Résumé | LinkedIn export | Planning decision |
| --- | --- | --- | --- |
| Helix reporting reduction | 40% | 60% | Omit percentage until verified. |
| Lisbon Rent Map monthly visitors | 5,000 | 3,000 | Omit metric until verified; confirm date and measurement basis. |
| MSc completion | 2021 | 2022 | Show degree without completion year until verified. |

The supplied contact address and Rent Map URL use example domains. Treat them as placeholders until working public destinations are provided. No usable project screenshots, datasets, detailed case studies, portrait, public LinkedIn URL, or paper citation are present in the supplied material.

Needed before a finished site can tell the full story: project assets and permission to show them; each project’s role, team, scope, status, and evidence; clarification of disputed facts; confirmed contact and project links; DataTugas context; publication-ready résumé; and consent for attributed recommendation use. The visual direction is ready for review now, while those content gaps remain explicit.


## Final decisions under delegated planning authority

- Position Rafael primarily as a product analyst who turns complex data into usable tools. Explain the DataTugas founder experience in About, with its historical dates.
- Retain the project order: Lisbon Rent Map, AutoPilot, FraudShield. Follow with professional evidence, About, and Contact.
- Use Manrope and IBM Plex Mono, the warm-paper/ink/teal/terracotta palette, and one shared restrained 3D composition.
- Keep all three project pages, but scale their detail to the evidence supplied. Start with factual project summaries and clearly labeled conceptual illustrations. Do not fabricate screenshots, workflows, metrics, testimonials, or personal history.
- Resolve source conflicts by omission: no Helix percentage, Rent Map traffic figure, or MSc completion year in publication copy. These can be added later from documented evidence; they are not needed to approve the design direction.
- Present Meridian’s figures as reported professional outcomes, without assigning them to AutoPilot or FraudShield. Never invent a definition or calculation for the efficiency figure.
- Leave the named recommendation out of initial publication unless public reuse is already authorized. Use the documented sequencing-operations description as the fallback.
- Use a typographic identity rather than requiring a portrait. No stock portrait or invented biography.
- Treat example-domain URLs as unavailable. Do not publish a fake email button or dead project link. A real contact destination is a factual launch dependency, not an outstanding planning question.
- Use a content-first implementation: Astro and TypeScript for static pages; one deferred Three.js scene for desktop; CSS for routine transitions. Keep copy in local Markdown files rather than adding a CMS.
- No form, trackers, cookie banner, newsletter, blog, or theme switch in the first version. The planned implementation adds no nonessential cookies; any future integrations require their own privacy review.
- Provide a text-based identity, social preview image, sitemap, metadata, 404 page, accessible project routes, and reviewed PDF résumé. Do not redistribute the original LinkedIn export.
- Use lightweight static visuals on phones and for reduced motion. Essential content is server-rendered HTML and remains usable without JavaScript.

## Future build sequence and completion criteria

This is a future execution plan, not authorization to build now.

1. Establish publication-safe copy from the current material, omitting disputed facts and unavailable destinations. Design the static page and project layouts using real copy.
2. Implement accessible navigation, the homepage, and factual project pages. Establish responsive typography, visual hierarchy, and working direct URLs.
3. Add the shared 3D composition and purposeful scroll transitions. Add mobile, reduced-motion, graphics-failure, and no-JavaScript fallbacks.
4. Add verified contact links and any available cleared assets, then validate links, privacy, accessibility, rendering, and mobile performance.

The result is ready when a visitor can identify Rafael and his value on the first screen, understand the three projects without animation, distinguish professional results from personal projects, navigate with keyboard or touch, share a project URL, and reach a genuine contact destination. All public claims must be traceable to source material. Target LCP at or below 2.5 seconds, INP below 200 ms, and CLS below 0.1; report measured results when the site exists.
