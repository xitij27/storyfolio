I’ll use the analysis-memo direction and give you the complete plan here, including every scroll beat, interaction, visual choice and fallback. I’ll also update the handover to record your choice. No building.


The site will be **The analysis memo**: a single scroll organised around the document you actually work from.

Its question is **“How do you turn an analysis into something people use?”** The page answers through your work: the sample-tracking dashboard and weekly report, the SQL reporting script, and your Lisbon map.

One packet of eight memo pages carries the entire 3D experience. The pages separate to expose context, sit beside projects to explain your method, align to compare outcomes, then gather into the completed memo. Their faces contain your work and evidence. The text stays readable in ordinary HTML alongside them.

Nothing has been built.

**The page, in order**

The five memo sections become seven chapters. On desktop, the whole experience takes roughly ten viewport heights, with native scrolling and shortcuts throughout. These are pacing estimates, not compulsory viewing times.

| Chapter | What it shows | What the 3D does | What visitors can click |
|---|---|---|---|
| **1. The question** | Rafael Costa; Product Analyst; your own line, “I make dashboards people actually use”; the organising question; Rent Map’s approximate monthly audience as immediate proof | The packet starts slightly open and readable. Five tabs show the memo’s structure. No opening animation to wait through | **Work**, **Contact**, and section navigation |
| **2. The data: context** | A brief career and education path. Helix is described as operational tracking and reporting. Meridian receives a concise role listing without employer material | The context page comes forward. The other pages form a shallow date index behind it | Project shortcuts; a verified CV download when available |
| **3. The data: evidence** | An index distinguishing Rent Map as your public project, Helix as operational reporting, AutoPilot as a script, and FraudShield as a capstone notebook | The four work pages fan out, each with a clear identity and status | An anchor to each project’s explanation |
| **4. What I did: method** | Your exact sequence: the question, the data, what I did, what I found, what I would do. A compact skills list, without ratings | The method page opens fully. Its five prompts form a readable sequence beside the packet | Jump to the work; optional disclosure for supporting detail |
| **5. What I did: work** | Rent Map first, then Helix and AutoPilot, followed by smaller supporting entries | Each project page comes forward beside the method page; the same packet remains visible | The real Rent Map link, project anchors, and expandable written notes |
| **6. What I found** | Three distinct outcomes, then Beatriz’s attributed quote | Evidence pages align for comparison. The quote page then turns forward | Supporting explanations and attribution; no forced carousel |
| **7. What I would do** | The answer supported by the work, your goal of joining a product company, and a direct contact action | All eight pages reunite. The next-action page is readable on top | Contact about a product analyst role; download the verified CV |

**How the work chapter unfolds**

This is the longest part of the page. It gives each project the amount of space its evidence warrants.

1. **Lisbon Rent Map — the main exhibit.**  
   Its page comes forward and holds beside the method page for roughly one and a half screens. It shows an actual screenshot or export once supplied, accompanied by its subject, your ownership and about 3,000 monthly visitors. Visitors can open the live map. Until an approved image exists, the exhibit uses factual text. No invented map data, features, refresh rates or origin story.

2. **Helix — tracking and scheduling.**  
   The next page explains that you built the sample-tracking dashboard and weekly scheduling report for the sequencing core. It contains no sample records, operational screens or implication that you performed scientific work. Your paper acknowledgement can appear as a small supporting note; it will not be presented as authorship.

3. **AutoPilot — a useful script.**  
   Its page describes the SQL script that fills your team’s weekly report and is used by six people. No proprietary code, report output or invented time savings. Helix and AutoPilot together occupy roughly one screen.

4. **Supporting work — a compact index.**  
   One page holds FraudShield as an undeployed MSc notebook, your chart-making contribution to the five-person hackathon team, and DataTugas as the twelve-person study group you started. These receive about half a screen collectively, with no inflated platform, company or leadership claims.

**How the evidence chapter works**

The outcomes appear together, with their contexts attached:

| Evidence | Presentation |
|---|---|
| Helix weekly report | **About five hours → about two hours** of preparation, through your work |
| Lisbon Rent Map | **About 3,000 visitors a month**, preserving your approximate wording |
| AutoPilot | **Six people use the script** |

The scene makes these easy to compare without suggesting they measure the same thing. There is no unexplained oversized percentage, annualised saving or combined “impact score.”

Beatriz’s quote follows as one readable, attributed statement:

> “Rafael’s dashboards changed how the core plans its week. He is the reason we stopped double-booking the sequencers.”

Her name and role accompany it. It remains a testimonial, rather than an independently verified claim about scientific or clinical impact.

The close collects this evidence and returns to your own positioning. Final opening and closing copy will be written separately; this plan does not invent personal lessons or promises about future results.

**Navigation and interaction**

A desktop rail uses your five memo section names, with access to all seven chapters. **Work** and **Contact** remain easy to reach. Direct project links let someone land on the relevant evidence without starting at the top.

The first screen gives a hurried visitor your name, role, positioning, one proof and contact access. Nobody has to complete the scroll to understand you.

Interaction stays simple:

- Native scrolling; no scroll hijacking.
- Ordinary links and keyboard-accessible disclosures.
- Visible focus states and a skip-to-content link.
- No mandatory dragging, hovering, rotating or puzzle-solving.
- No essential information printed only on tilted 3D surfaces.

**The look**

The primary palette is warm paper with dark ink and cobalt annotations:

| Element | Colour or treatment |
|---|---|
| Background | Warm cream `#F2EFE7` |
| Main text | Near-black `#202620` |
| Accent | Cobalt `#274BC4` |
| Memo pages | Off-white `#FFFEF9` |
| Depth | Thin edges, faint rules and restrained soft shadows |

The layout uses generous margins, left-aligned headings and a stable reading column. Blue identifies tabs, links and annotations. No decorative gradients, distressed paper textures or continuous object rotation.

The two typefaces are:

- **Newsreader** for headings and reading text.
- **IBM Plex Mono** for document labels, tabs and numeric evidence.

Body text starts around 18–20px on desktop and 17–18px on phones, with comfortable line spacing and a reading width of about 60–70 characters. Small labels remain legible. Actual contrast and font rendering must be checked during any future build.

Two alternative treatments are recorded: pale grey graph paper with navy ink and petrol accents; or charcoal pages with ivory text and pale blue accents. The warm-paper direction is the chosen plan.

**Phones and the experience without 3D**

| Situation | What visitors receive |
|---|---|
| **Phone** | A single-column document. Each project and its evidence sit together. Static packet illustrations preserve the visual identity; capable devices may get shallow optional movement. No long pinned scene or horizontal carousel |
| **Reduced motion** | Static arrangements for each chapter, with no camera travel, parallax or autoplay. All content and links remain |
| **No WebGL** | Lightweight SVG or CSS page illustrations, plus approved project imagery. The complete HTML page remains |
| **No JavaScript** | The full document, native anchor links, ordinary contact/project links and native disclosures |

On phones, a compact section menu replaces the desktop rail. Touch targets are at least 44px, and contact remains easy to find.

The HTML loads before the optional scene. Rendering pauses when the scene is offscreen. Where the scene duplicates the document, assistive technology reads the HTML rather than redundant canvas content.

**Everything else the site needs**

These are requirements for a future implementation, not actions authorised now.

| Item | Plan |
|---|---|
| **Navigation** | Section anchors, project anchors, Work/Contact shortcuts and skip link |
| **Project coverage** | All named projects included at their accurate scale; Rent Map receives the main exhibit |
| **Separate project pages** | Later, only when sufficient real material supports them |
| **Contact** | A verified email action; no form backend needed initially |
| **CV** | An accessible, accurate downloadable CV after current details are checked |
| **Testimonial** | Beatriz’s permitted quote with clear attribution |
| **Language** | English first; reviewed Portuguese can follow |
| **Shared-link preview** | Your name, factual description and a static memo image |
| **Site icon** | A simple memo-tab mark |
| **Search visibility** | Useful metadata, canonical URL, sitemap and verified public profile information |
| **404 page** | A short page with routes back to work and contact |
| **Accessibility** | Semantic headings, keyboard access, visible focus, image descriptions, contrast and motion preferences |
| **Performance** | Simple geometry, restrained textures, deferred scene loading and static mobile default; aim for fast mobile loading and minimal layout shift |
| **Legal/privacy information** | Determine applicable requirements before publication, based on the actual hosting and functionality |
| **Hosting and domain** | Decide later; no purchase or deployment now |
| **Analytics and cookies** | Omitted at launch |
| **Blog and chat** | Omitted at launch |

The remaining production inputs are your real contact details, live Rent Map URL, a permitted map image or export, and verified current CV details. The supplied `.example` addresses will not be published. Any third-party map imagery or listing content needs its rights checked before reproduction.

I assumed English, a recruiter audience, contact about a product analyst role as the main action, and inline project explanations rather than separate case-study pages. Those choices—and their reasons—are recorded in [decided-for-you.md](/tmp/storyfolio-evals/codex-analyst-with-8MN1qD/docs/story/decided-for-you.md).

The complete beat-by-beat specification is saved in [storyboard.md](/tmp/storyfolio-evals/codex-analyst-with-8MN1qD/docs/story/storyboard.md), with corrected source facts in [facts.md](/tmp/storyfolio-evals/codex-analyst-with-8MN1qD/docs/story/facts.md). This remains a planning deliverable only.
