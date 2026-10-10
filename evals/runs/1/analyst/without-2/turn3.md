Here's the full plan, start to finish.

## The concept, in one line

The site dramatizes the thing you actually do: it opens as noise and your scrolling resolves it into signal — a map, a schedule, a report — the same motion your dashboards perform for the people who use them.

## Global elements (present throughout)

- **Nav:** fixed, minimal — your name, and four jump links: Work / Experience / Recognition / Contact, plus a **Resume (PDF)** button. Lets a recruiter skip straight to Work without sitting through the hero.
- **Format:** one continuous scrolling page, not separate case-study pages. Each case study has a "Read the memo" toggle that expands an overlay panel in place — question, data, what you did, what you found, what you'd do next — so depth is available without a page reload or losing scroll position.
- **A scroll-progress mark** somewhere subtle (not a loud progress bar) so the page doesn't feel endless on a long scroll.

## Section by section

### 1. Hero
**On screen:** your name, "Product Analyst," and the line "I make dashboards people actually use."
**3D:** a field of small points drifting in depth — loosely standing in for transactions, listings, samples. Mouse movement gives them parallax on desktop; on touch they drift on their own, slowly. As you start to scroll, they begin — just barely — to align.
**Clickable:** nothing load-bearing here; a small "scroll" cue, that's it.
**Phone / no-3D:** the point field becomes a lighter, lower-density version (or a pre-rendered loop) so it doesn't tax a mid-range phone. With reduced motion on, the points render already in their semi-aligned state, no animation, just a still image.

### 2. Who you are
**On screen:** one short paragraph — economist who moved into data, Lisbon.
**3D:** the points from the hero finish resolving into one clean line/axis, timed to your scroll position (scrubbed, not autoplaying) so it feels caused by you scrolling, not a video playing at you.
**Clickable:** nothing.
**Phone / no-3D:** same resolved line, rendered static immediately; no scrub needed since there's nothing lost by skipping straight to the end state.

### 3. Work — intro
**On screen:** a short section header ("Work," or similar).
**3D:** the resolved line gently deforms into the first shape it needs — the outline of Lisbon's parishes — handing off into the next section.
**Clickable:** nothing.
**Phone / no-3D:** a straight cut to the next section's static shape, no morph.

### 4. Case study — Lisbon Rent Map
**On screen:** what it is (a live, public map of rents by parish, ~3,000 visitors/month), and the memo toggle.
**3D:** the map outline from the transition builds a price heat gradient parish-by-parish as you scroll through the section, using the accent color at the high end.
**Clickable:** **"View the live map"** (opens rentmap.example in a new tab) and **"Read the memo"** (expands the question/data/approach/finding/next-step panel in place — *I still need this content from you*).
**Phone / no-3D:** the heat gradient renders as a static final map with a simple fade-in, no build-by-parish animation; both buttons remain, full-width and tap-sized.

### 5. Case study — Helix sample-tracking dashboard
**On screen:** what it is — the dashboard and weekly report you built for the sequencing core at Helix Genomics, not the science itself. The 5hrs→2hrs result. Beatriz's quote, with attribution (Head of the Sequencing Core).
**3D:** the map shape morphs into a simple schematic — nodes moving along a track toward "sequenced," a couple highlighted amber for the double-booking risk the dashboard now catches. A number flips from "~5 hrs" to "~2 hrs" at a scroll marker.
**Clickable:** **"Read the memo"** only (no external link — this is a former employer's internal tool, and the visual here is a generic schematic, not a recreation of their actual UI).
**Phone / no-3D:** the node track renders as a simple static diagram with the stat already flipped; quote displays as plain text, no animation needed to land it.

### 6. Lighter work — FraudShield & AutoPilot
**On screen:** two smaller, side-by-side (stacked on phone) mentions. FraudShield: your MSc capstone, a notebook analysis on a public card-transaction dataset — honestly scoped, not a production system. AutoPilot: a script that fills in your team's weekly report from SQL, six people use it.
**3D:** deliberately smaller and quieter than the two deep case studies — a light canvas/SVG animation, not a full WebGL scene. FraudShield: a small cluster of points separating into "flagged" vs "clean" based on the model. AutoPilot: a small "input → script → filled report" icon sequence.
**Clickable:** nothing by default. *(Flagging a judgment call: since AutoPilot started right after you joined Meridian, I'm treating it under the same no-specifics caution as the bank's dashboards until you tell me otherwise — so no screenshots, no numbers beyond "six people use it.")* If you have a public notebook link for FraudShield, that could be a click target — optional, your call.
**Phone / no-3D:** both render as static icon rows with a label, no animation required.

### 7. Experience
**On screen:** a compact timeline — DataTugas (started a 12-person study group at university) → Atlantico Telecom (churn analysis, internship) → Helix Genomics (Sep 2021–Jan 2024) → Meridian Bank (Product Analyst, Feb 2024–present, dashboards used by 200+ staff — the one fact your agreement allows, nothing more).
**3D:** a simple path the camera travels along as you scroll, roughly tracing Porto → Lisbon, with nodes lighting up as they pass.
**Clickable:** tapping/clicking a node expands one line of detail (role, dates, the one fact for that stop).
**Phone / no-3D:** the path becomes a plain vertical list with the same tap-to-expand behavior; no camera movement.

### 8. Toolkit
**On screen:** SQL, Python, Tableau, Power BI, dbt, Statistics, as tags.
**3D:** none — plain DOM elements.
**Clickable:** hovering or tapping a tag highlights every case study above that used it (an amber outline on the relevant section), tying the toolkit back to real, shipped work instead of a floating skill list.
**Phone / no-3D:** tap instead of hover, same highlight behavior.

### 9. Recognition
**On screen:** Health Data Hackathon 2023 — team of five, your part was the charts; the Helix paper, phrased as "thanked in the acknowledgements for the tracking dashboard" (not authorship); Beatriz's quote may already have landed in section 5, so this could just carry the hackathon and paper credit to avoid repetition.
**3D:** none, or at most the faint point field at very low opacity in the background for continuity. Calm by design — this section is about credibility, not spectacle.
**Clickable:** nothing required.
**Phone / no-3D:** plain stacked text, fades in on scroll.

### 10. Education
**On screen:** MSc Data Science (2020–2022) and BSc Economics (2017–2020), Universidade do Douro. One line each, visually quiet.
**3D:** none.
**Clickable:** nothing.
**Phone / no-3D:** identical, it's already minimal.

### 11. Contact / close
**On screen:** email, resume download, LinkedIn.
**3D:** the noise field from the hero reappears and settles into total stillness — a final, deliberate bookend, then stops moving entirely.
**Clickable:** `mailto:` link, **Resume (PDF)** download, LinkedIn link. *(Assumption: including your LinkedIn profile link since it's already public; no GitHub, since none was in your material — add one if you have it.)*
**Phone / no-3D:** the field renders already still, buttons stack full-width.

## The look

- **Background:** near-black ink, not pure black (roughly `#0A0A0C`).
- **Text:** warm off-white/bone (roughly `#F4F1EA`).
- **Accent:** one warm signal amber (roughly `#FF9B3D`), used only for emphasis — flagged data points, the hover highlight, stat call-outs, link states. Everything else stays monochrome so the accent reads as meaningful, not decorative.
- **Type:** a geometric grotesk sans for headlines (Neue Montreal / General Sans — something structural, not a template-default), paired with a monospace (JetBrains Mono or IBM Plex Mono) for stats, labels, and nav — the "lives in SQL and terminals" signature.
- **No photo** by default — text and type carry the identity. Easy to add a headshot later if you want one; flagging this as an assumption, not a fixed decision.

## Phone, in summary

Scroll-triggered fades/reveals stay everywhere. Parallax, pointer-reactive motion, and camera moves drop. Heavy scenes (hero field, Rent Map build, Helix schematic) render lighter or as a pre-settled still. The timeline becomes a vertical list. Everything tap-sized, single column, nav collapses to a simple menu + the Resume button always visible.

## Without the 3D (reduced motion / low power)

Every scene has a **named static end-state** above (not a stripped-down version) — resolved line, finished heat map, flipped stat, settled field — so `prefers-reduced-motion` and low-end devices get the complete, fast, fully-informative page, just without the build-up. This matters as much as the motion does, since part of your audience is a recruiter who wants the facts in ten seconds.

## Everything else the site still needs

**Content I still need from you:**
- The actual memo content (question / data / what you did / what you found / what you'd do next) for the Rent Map and Helix case studies — I don't want to invent plausible-sounding specifics.
- Confirmation on AutoPilot: safe to describe with real specifics, or same no-specifics treatment as Meridian?
- A real screenshot or short clip of the Lisbon Rent Map for reference while building its scene.
- Whether you want a FraudShield notebook link included, if one's public.
- A resume PDF (or confirm I should typeset one from this material).

**Decisions to confirm or override:**
- Dropping "Founder" from the site (kept only as "started a study group" for DataTugas).
- No photo — confirm or send one.
- LinkedIn link in, no GitHub (unless you have one to add).
- The amber/ink/bone palette and the grotesk+mono type pairing.

**Production/technical, regardless of content:**
- Domain and hosting decision.
- Favicon and a small logotype/wordmark for the nav.
- SEO basics — title, meta description, Open Graph image for link previews.
- Performance budget for the 3D scenes (target frame rate on a mid-range phone, lazy-loading scenes as they near viewport, a lightweight preloader if initial assets are heavy).
- Accessibility pass beyond reduced motion: color contrast on the dark theme, keyboard navigation through the nav and expandable memo panels, alt text on any static imagery.
- Browser support target (current evergreen browsers is standard; confirm if you need older Safari/Edge support for any reason).
- Analytics, if you want to know who's visiting — optional, worth a decision either way given this is for a job search.

Once you've sent over the memo content, the AutoPilot call, and the palette/photo confirmations, this plan is ready to move into build.
