# Portfolio Plan — Final

One continuous idea runs top to bottom: a field of particles starts as noise and resolves into order — a different shape each chapter — because that's the actual throughline of your work: turning something messy into something people can read and act on. Tagline: *I make dashboards people actually use.*

---

## 1. Hero

**On screen:** Your name, "Founder & Product Analyst, Lisbon," the tagline. Nothing else — no nav bar yet, just a scroll cue at the bottom.

**3D:** A loose, slow-drifting cloud of particles in 3D space, fully unordered. No shape, no colour yet — just charcoal-on-charcoal motion, barely visible, to signal "before."

**Clickable:** Scroll-down indicator only (click or scroll advances). No nav, no links — the hero's job is to set tone, not to route traffic.

---

## 2. Thesis

**On screen:** Two to three sentences: what you do, and the range it spans (a bank, a genomics lab, a telecom, your own city). This is the only section that's pure prose.

**3D:** Particles begin responding to scroll — drifting toward loose alignment, not yet a recognizable shape. First hint of the copper accent colour appearing at the particles' edges.

**Clickable:** Nothing yet. Nav bar fades in quietly at the top from here on (logo/initials left, section jump-links right: Work, Projects, Contact), persistent but unobtrusive for the rest of the site.

---

## 3. Meridian Bank — current role

**On screen:** "Product Analyst, Meridian Bank · Lisbon · Feb 2024–present." Dashboards used by 200+ staff. Efficiency improved 35%.

**3D:** Particles resolve into a bar-chart/dashboard grid — bars rising in sequence as the copy reveals, in copper against charcoal. This is the first time the shape is fully legible.

**Clickable:** The "200+" and "35%" figures are set in monospace and animate counting up on scroll-into-view (not clickable themselves, just kinetic typography — a small reward for reading). No external link here (no public case study exists for this role).

---

## 4. Helix Genomics Institute

**On screen:** "Data Analyst · Porto · Sep 2021–Jan 2024." Reporting time cut 40%. Co-authored paper in the *Journal of Genomic Methods*. Beatriz Lima's quote: *"Rafael's dashboards changed how the core plans its week. He is the reason we stopped double-booking the sequencers."*

**3D:** The bar grid dissolves and reforms into a double-helix / sequencer-array shape, rendered in the desaturated teal — the one section that breaks from copper, marking it as a distinct domain.

**Clickable:** The journal paper title is a hover-underline link (link to be supplied by you before launch — none exists in the material yet, so this renders as plain text until you provide it). The quote sits in its own card with Beatriz Lima's name and title — not clickable, just a credibility beat.

---

## 5. Atlantico Telecom + DataTugas

**On screen:** Two compact entries side by side rather than stacked full chapters: "Intern, Atlantico Telecom — churn analysis, 2020" and "Founder, DataTugas, 2018–2020."

**3D:** Teal helix collapses into a simple funnel/flow shape (representing churn), rendered smaller and dimmer than the two chapters above it — visually signaling "foundation," not "highlight." Motion slows here; this is the calmest point before Projects.

**Clickable:** Nothing — no links exist for either entry, and neither needs one.

---

## 6. Projects

**On screen:** Three cards: **FraudShield** (real-time fraud detection), **AutoPilot** (automation platform for analytics teams), **Lisbon Rent Map** (what a room costs in every parish of Lisbon, 3,000 visitors/month).

**3D:** This section intentionally breaks the morph pattern — the particle field steps back and each card gets its own small, self-contained visual instead of one continuous shape:
- FraudShield: a tight cluster of particles with one flagged in copper (anomaly detection, visualized).
- AutoPilot: particles moving along an automated, looping path.
- Lisbon Rent Map: a real, live mini-map of Lisbon's parishes — this is the one genuinely interactive 3D/WebGL element on the site beyond the particle field, since it's your only public, linkable, inherently geographic project.

**Clickable:** 
- Lisbon Rent Map card opens the live site in a new tab (URL already in your material) and the mini-map itself is pannable/zoomable inline.
- FraudShield and AutoPilot cards are not links (no public URLs exist) — they expand in place on click to show the one-line description larger, rather than going nowhere.

---

## 7. Recognition

**On screen:** "Winner, Health Data Hackathon, 2023." One line.

**3D:** The particle field briefly sharpens to a single bright point of copper light, then releases — the one moment of visual punctuation on the whole site.

**Clickable:** Nothing.

---

## 8. Education

**On screen:** "MSc Data Science, Universidade do Douro, 2020–2021" / "BSc Economics, Universidade do Douro, 2017–2020." Two lines, small type, no visual weight.

**3D:** Particles continue settling, becoming sparser and slower — the field is winding down toward the close.

**Clickable:** Nothing.

---

## 9. Contact / close

**On screen:** "Let's talk." A contact form (name, email, message) and a LinkedIn link. No public email address is published.

**3D:** Particles come to rest — slow, barely-moving, warm copper glow at low intensity. The only section where motion fully stops; it's meant to feel quiet and easy to act on.

**Clickable:** Contact form submit button, LinkedIn icon/link, and a "Download résumé (PDF)" link.

---

## The look

- **Base:** near-black warm charcoal, not pure black.
- **Accent:** warm copper/amber — used for the resolved particle states and all numbers.
- **Secondary:** desaturated teal, confined to the Helix Genomics chapter only.
- **Type:** editorial display serif for headlines (gives it weight a template wouldn't have); clean grotesk for body copy; monospace for every figure and date (35%, 200+, 2023, 3,000) so the numbers always read as data.

---

## On a phone

- The continuous scroll-scrubbed camera path is replaced by the same shapes rendered as a lighter canvas pass per section, triggered when the section scrolls into view — not continuously tied to scroll position, which fights touch momentum.
- Particle counts cut substantially; tuned against a mid-range Android device, not just a high-end phone.
- Lisbon Rent Map becomes a static image of the map with a "tap to open live map" link, rather than an inline pannable WebGL map.
- Nav collapses to a simple menu icon.
- Section pacing shortens — each chapter resolves faster than it would on a desktop-size scroll, so the page doesn't feel endless on a small screen.

## Without the 3D

For `prefers-reduced-motion`, low-power devices, or any environment where WebGL isn't available, every section degrades to the same content with the 3D layer removed entirely:
- Each chapter's shape (bar grid, helix, funnel, etc.) is replaced by a static illustration or simple CSS-based reveal (fade/slide into place) rather than any canvas/WebGL render.
- The Lisbon Rent Map falls back straight to a static image with a link out — same as the phone fallback.
- The counting-up numbers become instant (no animation), just correct values on render.
- Nothing is lost informationally — the fallback path shows every fact and every link the 3D path shows, just without motion.

---

## Everything else the site needs

- Résumé PDF, generated from resume.md.
- Contact form (with basic spam protection) wired to an inbox you check — needs a destination email even though nothing is published on-page.
- The journal paper link for the Helix Genomics mention — currently has none in your material.
- A domain name and hosting decision (static deploy, e.g. Vercel-style).
- SEO basics: page title, meta description, Open Graph preview image.
- Accessibility pass: alt text on all visuals, contrast check against the dark base, full keyboard navigation for the Lisbon Rent Map and the contact form.
- Analytics (optional but recommended, given the site is partly a case study in dashboards).
- `messages.csv` stays excluded from the project entirely — already set aside, not part of this build.

This is the complete, final plan — ready to build on your go-ahead.
