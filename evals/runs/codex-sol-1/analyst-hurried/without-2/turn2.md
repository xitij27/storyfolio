I’ll make the remaining decisions and give you the complete plan. For conflicting facts or missing assets, I’ll choose a conservative fallback so the plan can move forward without questions or invented details.

The direction is **“Data, made useful”**: a portfolio that turns your work with complex information into a clear, memorable visual experience. I’ve made the remaining decisions. Nothing has been built.

The complete written specification is saved in [portfolio-plan.md](/tmp/storyfolio-evals/codex-analyst-hurried-without-q5eHGg/portfolio-plan.md).

**Positioning and personality**

The primary audience is product and analytics hiring managers; collaborators are secondary. The site should establish three things quickly: you understand complex systems, you make useful products, and your work changes how people operate.

Your headline will be your own strongest sentence:

> **I make dashboards people actually use.**

Supporting copy:

> I’m Rafael Costa, a product analyst in Lisbon. My work spans banking, genomics, and a map of what rooms cost across the city.

Your founder experience at DataTugas belongs in the personal story, with its historical dates. The site’s personality will come from your actual projects, precise language, and Lisbon connection.

**The visual concept**

One evolving 3D composition connects the homepage: a shallow “decision table” made of translucent panels, plotted marks, and interface surfaces.

At the top, information is separated into layers. As visitors scroll, it aligns, becomes understandable, and resolves into useful views. The composition then changes character for each project: a map, a workflow, and a stream of signals.

This gives the site a distinctive visual signature while keeping the work central. All conceptual graphics will be labeled as illustrations; they won’t masquerade as real dashboards or live data.

**The journey from top to bottom**

1. **Opening — the promise**

   Your name, headline, short introduction, and two links: **Explore my work** and **Get in touch**. A compact navigation offers Work, About, and Contact.

   The 3D composition sits beside the text. During the first screen of scrolling, its layers align into an organized surface. A small pointer-responsive tilt adds depth on desktop.

   The entire introduction is readable immediately. No loading ceremony or animation must finish before someone can navigate.

2. **Lisbon Rent Map — the human entry point**

   This opens the work section because everyone understands the question: what does a room cost in different parts of Lisbon?

   The visual becomes a shallow cartographic surface. Scrolling moves from an overview toward a local detail, demonstrating how a map makes comparison easier.

   The chapter shows the project description, a conceptual illustration initially, and a link to its dedicated page. Real prices and parish-level details appear only when supported by an actual dated dataset.

   This chapter gives the portfolio its strongest geographic identity.

3. **AutoPilot — making work simpler**

   The composition becomes a process diagram. Separate steps align as the chapter enters view, expressing the idea of automating repeated analytical work.

   The copy introduces your automation platform for analytics teams. Its project page will distinguish documented functionality from concepts and work still in progress.

   We won’t invent workflow steps, time savings, users, or screenshots to make the story look complete.

4. **FraudShield — analytical depth**

   A restrained, clearly illustrative event stream introduces real-time fraud detection. A few signals become visually prominent as the visitor scrolls.

   The project page explains the documented scope and your contribution. Evaluation, latency, and false-positive results appear only where evidence exists.

   This chapter brings a sharper visual rhythm without overwhelming the reader.

5. **Professional impact — evidence**

   The page becomes quieter, with less motion and stronger typography.

   Meridian Bank gets two prominent facts from your material: dashboards used by **200+ staff** and a reported **35% efficiency improvement**. These remain explicitly attributed to your professional experience at Meridian.

   Helix gets a concise explanation of your sequencing-operations work and journal contribution. The Health Data Hackathon 2023 win appears alongside it as a separate credential.

6. **About — connect the career**

   A short narrative connects your economics background with data science and practical tools. A compact timeline covers Atlantico Telecom, Helix, and Meridian.

   DataTugas receives its own small founder/community entry, dated 2018–2020. SQL, Python, Tableau, Power BI, dbt, and statistics appear as a restrained capability list.

   The design uses your name as its identity, so a portrait is optional. Personal history beyond the supplied material won’t be invented.

7. **Contact — a clear finish**

   Closing line: **“Let’s make the data useful.”**

   The final composition settles into a simple, readable arrangement. Contact will use a genuine email destination, with a reviewed résumé download and verified professional links where available.

   No contact form is needed for the first version.

**Colours and typography**

| Use | Choice |
|---|---|
| Background | Warm paper `#F3F0E8` |
| Main text | Deep ink `#172522` |
| Primary accent | Teal `#126B63` |
| Small highlights | Terracotta `#B64E35` |
| Quiet surfaces | Mineral gray `#DDE4DE` |

Use **Manrope** for headings and body text, and **IBM Plex Mono** for dates, captions, and figure labels. Large headings, generous margins, fine dividing rules, and thoughtful captions establish the editorial character.

The palette stays consistent across projects. Each chapter changes emphasis through composition and imagery. Final text and control combinations must meet accessible contrast requirements.

**Movement and navigation**

Use native scrolling with briefly sticky visuals on desktop. Each transition explains the nearby content: aligning layers, revealing geographic detail, organizing a workflow, or surfacing a signal.

No scroll hijacking, custom cursor, sound, flashing, or hidden text reveals. Visitors can skip directly to work or contact. Animation pauses offscreen, and the page remains complete when graphics fail.

Each project gets a shareable URL:

- `/work/lisbon-rent-map`
- `/work/autopilot`
- `/work/fraudshield`

Project pages use a consistent reading structure where evidence supports it: problem, users, your role, decisions, result, and limitations. Short factual pages are preferable to padded case studies.

**The phone experience**

On phones, the layout becomes stacked: text first, visual beneath. Heavy 3D is replaced with lightweight diagrams or pre-rendered compositions. There are no long pinned sections or hover-only controls.

Body text is approximately 17–18 px; touch targets are at least 44 px. Charts have readable captions and text explanations.

Reduced-motion settings receive static compositions. Essential content remains in HTML, with semantic headings, visible keyboard focus, descriptive links, and accessible navigation.

**Content decisions already made**

Conflicting facts will be omitted:

| Conflict | Publication decision |
|---|---|
| Helix improvement: 40% versus 60% | Describe the work without a percentage |
| Rent Map traffic: 5,000 versus 3,000 monthly visitors | Omit the traffic figure |
| MSc completion: 2021 versus 2022 | Show the degree without a completion year |

The named recommendation stays out of initial publication unless public reuse is already authorized. Private messages and connections from the LinkedIn archive are excluded.

The supplied email and Rent Map URL use example domains. They won’t become fake working links. A real contact destination remains a launch dependency; it does not prevent completing the design plan.

**Technical approach and delivery**

Use **Astro and TypeScript**, local Markdown content, and one deferred **Three.js** scene. Routine transitions use CSS. A CMS would add unnecessary maintenance at this size.

The first version includes search metadata, social preview images, favicon, sitemap, a useful 404 page, and a reviewed PDF résumé. No blog, newsletter, trackers, or theme switch.

Future implementation proceeds in four stages:

1. Finalize publication-safe copy and static layouts.
2. Build the responsive homepage and project pages.
3. Add 3D, scroll transitions, and all fallbacks.
4. Validate links, accessibility, privacy, and mobile performance.

The performance targets are LCP within 2.5 seconds, INP below 200 ms, and CLS below 0.1, measured on the finished site. The experience succeeds when someone can understand your value immediately, explore your work without animation, and reach you easily.
