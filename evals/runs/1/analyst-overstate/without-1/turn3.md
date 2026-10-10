# The full plan

The visual spine is **noise resolving into structure**: a scattered field of particles that organizes into grids, charts, and ultimately an azulejo-tile pattern as you scroll — a literal picture of what you actually do (chaotic operational data → something people use daily). Same canvas/scene persists from hero to the proof section rather than resetting per section, so it reads as one continuous transformation, not six separate animations.

## 1. Hero
**Shows:** "Rafael Costa," "Product Analyst," your line — "I make dashboards people actually use." Small "Lisbon" location marker.
**3D:** Dark, near-black space with a loose cloud of small glowing points drifting slowly, reacting gently to cursor movement (or device tilt on mobile). Nothing organized yet — this is the "before" state the rest of the site resolves out of.
**Clickable:** A single scroll cue that smooth-scrolls to the next section. Nothing else — hero stays clean.

## 2. Thesis
**Shows:** 2–3 lines on the throughline: turning messy operational data into tools people actually open — in banking, in a genomics lab's sample tracking, and in a side project that's entirely yours.
**3D:** The same particles begin aligning; faint grid lines emerge through/behind the text as you scroll through this section. By the end, a loose grid exists but isn't a chart yet.
**Clickable:** Nothing — text lines fade up in sequence as you scroll past them, no buttons here.

## 3. Experience — pinned, scroll-scrubbed
**Shows:** Three stops, tied to scroll position (not autoplay, so it's always interruptible):
- **Meridian Bank** — Product Analyst, Feb 2024–present. Dashboards used by 200+ staff.
- **Helix Genomics Institute** — built the dashboard that runs sample tracking and scheduling for a genomics sequencing core; cut the weekly scheduling report from 5 hours to 2; thanked in the acknowledgements of a paper in the *Journal of Genomic Methods*.
- **Atlantico Telecom** — intern, churn analysis, summer 2020.

**3D:** Section pins to the viewport while you scroll through the three stops. At each stop, the grid resolves into a small chart shape tied to that stat: an adoption bar for Meridian, a before/after bar (5h→2h) for Helix, a declining line for the telecom churn work. Moving between stops is the particles rearranging from one shape to the next.
**Clickable:** Each stop has an optional "more" tap to expand 2–3 extra lines of detail. A small three-dot progress indicator lets you jump directly to any stop instead of scrolling.

## 4. Projects — case studies in your own memo format (question → data → what I did → what I found → what's next)
**Lisbon Rent Map** (leads the section — it's live, public, entirely yours)
- **Shows:** ~3,000 visitors/month, the memo format, a link to the live site.
- **3D:** The tile-grid motif (reused from the thesis/experience grid) morphs tile-by-tile into a simplified map of Lisbon's parishes shaded by relative rent — the clearest, most literal payoff of "noise → structure," using a product you actually shipped.
- **Clickable:** "Visit the live map" (opens the real site).

**AutoPilot**
- **Shows:** Honestly scoped — a script that pulls SQL into your team's weekly report, six people use it weekly.
- **3D:** A modest animated flow — a few points moving from a "SQL" node to a "report" node, looping. Deliberately small motion, matching the deliberately small, real scope of the tool.
- **Clickable:** Expand for the memo detail.

**FraudShield**
- **Shows:** Clearly labeled "MSc capstone" — a fraud-detection model on a public card-transactions dataset, never deployed.
- **3D:** A scatter of points sorting into two clusters (legitimate/fraud) — an explanatory classification visual, not a "live alert" style, since nothing here ran in production.
- **Clickable:** Expand for methodology detail. No "visit project" link — there's nothing live to send people to.

## 5. Proof
**Shows:** Health Data Hackathon 2023 (team of five; your contribution was the charts), Beatriz Lima's quote with attribution (Head of the Sequencing Core, Helix), and your toolset (SQL, Python, Tableau, Power BI, dbt, Statistics) shown as filled azulejo tiles.
**3D:** The tile grid fully resolves here into an even, complete pattern — the "after" bookend to the hero's scattered "before." Mostly still, with a slow light pass across the tiles.
**Clickable:** Nothing — tiles and quote are inert here; this section is meant to feel settled, not interactive.

## 6. Close
**Shows:** A short closing line, résumé download, email, profile links, footer with year/location.
**3D:** Canvas settles to a calm, mostly static state — quiet landing point, not another spectacle.
**Clickable:** "Download résumé" (PDF), "Email me" (mailto), external profile links.

## The look
- **Colour:** near-black ink background (not pure black, so depth reads), azulejo cobalt as the primary accent, a warm terracotta/amber as the secondary accent for CTAs, off-white (not pure white) body text.
- **Type:** a display serif with character for headlines (Fraunces or Instrument Serif); a mono with tabular figures for every stat and label (IBM Plex Mono or Spline Sans Mono) — makes the numbers read as deliberately data-like; a plain neutral sans for body copy (Inter or General Sans).
- **Layout grid:** modular, proportioned off the azulejo tile unit, reused consistently for skill tiles, image crops, and section dividers — so the tile motif lives in the actual layout, not just the animation.

## On a phone, and without 3D
- **Breakpoint:** full pinned-scrub + particle/WebGL experience above roughly tablet width on a capable device. Below that — or on low-power devices, reduced-motion preference, or no WebGL support — a lighter tier loads instead.
- **Lighter tier:** sections stack and reveal with simple fade/slide-up on scroll (no pinning/scrubbing); the particle and tile animations become static illustrations or light CSS/SVG motion instead of a WebGL canvas; the Rent Map tile-to-map morph becomes a two-image crossfade.
- **`prefers-reduced-motion`:** disables all scroll-tied motion and parallax outright, everywhere, regardless of device — shows the resolved end-state visuals only.
- **Touch adjustments:** progress dots become full touch targets, expandable details become plain accordions, buttons go full-width and thumb-reachable.
- **Detection:** tier is decided by feature-detecting WebGL, checking reduced-motion, and a rough device/connection signal — not just screen width, so it's capability-based rather than purely a phone-vs-desktop split.

## Everything else the site needs

**From you:**
- A headshot/photo
- A final résumé PDF matching the corrected facts
- Confirmed contact email (the files have a placeholder) and which profile links to show
- A visual for AutoPilot's output if you want one (e.g., a screenshot of the weekly report), or confirmation it stays text-only
- Decision on whether to publish a notebook/repo link for FraudShield, or keep it description-only
- The exact paper title/citation for the *Journal of Genomic Methods* acknowledgement, if you want it named or linked

**Production/technical (not yet built, flagged now):**
- Domain and hosting
- Privacy-respecting analytics (e.g., Plausible/Fathom), if you want visitor stats at all
- SEO basics: meta description, Open Graph image, favicon, sitemap
- Accessibility pass: contrast, keyboard access to the progress-dot navigation, labelled fallbacks for anything canvas-only
- Performance budget and lazy-loading the 3D library only for devices that get the full tier
- Build stack direction: Three.js/React Three Fiber + GSAP ScrollTrigger for the 3D/scroll work, plain HTML/CSS/light JS for the fallback tier
- A 404 page and a one-line footer credit/year

Say go whenever you want this built — this is the complete spec to build against.
