# Portfolio Site — Full Plan

**Concept:** "Signal from noise." Every section opens on something scattered and unclear and ends on something resolved and legible — because that's the actual shape of your work (scattered samples → a dashboard, scattered transactions → a model, scattered listings → a map). Dark-mode-first, one accent color, nothing animated that isn't attached to a real fact.

---

## 1. Hero

**Idea:** A field of loose, drifting points fills the screen — no shape yet. As the visitor starts scrolling, the points pull together into a clean grid/line pattern. Your name sets in as the resolve completes, with the line "I make dashboards people actually use" and "Product Analyst, Lisbon."

**3D:** Particle field (WebGL), scroll-scrubbed resolve from scattered → ordered grid. Runs once; doesn't replay on scroll-back.

**Clickable:** A single down-arrow / "scroll" hint. No other interactive elements — hero should feel calm, not busy.

## 2. The thread (what you do)

**Idea:** Replaces a conventional "About" paragraph. A single bending line in 3D space, laid out as a timeline from 2018 to today, with four nodes: DataTugas → Atlantico Telecom → Helix Genomics → Meridian Bank.

**3D:** The line itself is a 3D curve the camera travels along as you scroll horizontally-within-vertical-scroll (scroll down moves you "through" the timeline). Each node lights up as it reaches center.

**Clickable:** Each node is a jump-link that scrolls you to its full section further down. Nothing else — this is an overview, not a case study.

## 3. Case study — Helix Genomics Institute (lead case study)

**Idea:** Full memo structure, your real words: *Question* (the sequencing core kept double-booking machines and losing a day to manual tracking) → *Data* (sample logs, machine schedules) → *What I did* (built a dashboard tracking samples through the core, rebuilt the weekly scheduling report) → *What I found/shipped* (5hrs → 2hrs on the weekly report, 60% cut) → *What I'd do next* (your own framing, one line).

**3D:** A cluster of disordered points (representing scattered sample records) resolves into a clean grid/table shape as the visitor scrolls through the memo steps — one resolve step per scroll beat, so the animation literally tracks the memo's progression from mess to dashboard. No genomics/DNA/helix imagery — it's not that kind of work, and using that imagery would misrepresent what you did.

**Clickable:** 
- A toggle/expand: "Read the memo in full" — opens the four-step text inline for anyone who wants more than the summary.
- Beatriz Lima's quote, shown as a static pull-quote with her name and title — not a link (no public profile to send traffic to).

**Note:** Since you built this dashboard yourself (not a bank product under NDA), I'll design an illustrative mock-up of a sample-tracking dashboard rather than a literal recreation — confirm Helix doesn't have its own confidentiality terms before I make this too close to their actual UI.

## 4. Case study — Lisbon Rent Map

**Idea:** Your strongest fully-public, fully-yours proof — a visitor can click straight through to the live thing. Same memo structure: *Question* (what does a room actually cost, parish by parish?) → *Data* (listings) → *What you did* (built and shipped the map) → *What you found* (~3,000 visitors/month) → *What's next*.

**3D:** An actual stylized 3D map of Lisbon's parishes that rotates/tilts as you scroll, color-coded by rent — the one section where a literal map is the honest visual, since the project is a map.

**Clickable:** 
- "View the live site" — links out to the real URL.
- Parish color key doubles as a small legend, hoverable on desktop (shows a sample price), static on touch.

## 5. Current role — Meridian Bank

**Idea:** Deliberately short and text-forward, not a full case study, because of your confidentiality agreement. One or two lines: "Product Analyst, Meridian Bank, Lisbon — Feb 2024 to present. Dashboards used by 200+ staff across the bank." No further figures, no screenshots, no recreated UI.

**3D:** Minimal — the resolved grid pattern from the hero reappears briefly, static, no new animation. This section should visually feel quieter than the others, which honestly reflects that it's the one you can't show.

**Clickable:** Nothing — no demo, no link, by design.

## 6. Project — AutoPilot

**Idea:** A script, not a platform: pulls your team's weekly report from SQL automatically. Visual metaphor: several small manual steps collapsing into one arrow — small claim, real adoption.

**3D:** A short sequence of small nodes (the manual steps) merging into one, triggered once on scroll-into-view. Lightweight — this section shouldn't try to look bigger than it is.

**Clickable:** None needed — maybe a hover reveal of "6 people on my team use this weekly."

## 7. Project — FraudShield

**Idea:** Framed honestly as your MSc capstone: a fraud-detection model trained on a public card-transactions dataset. Not deployed, not real-time — the value here is the modeling/analysis skill, not a fictional production system.

**3D:** A static-feeling scatter of transaction points with a boundary line forming between "normal" and "flagged" clusters as you scroll — illustrates classification, not a live data stream (since it never was one).

**Clickable:** None, or an optional "view the notebook" link if you want to make it public (ask you later).

## 8. Origins — the hackathon & DataTugas

**Idea:** One compact section, placed as foundation rather than padding. "Health Data Hackathon 2023 — part of a 5-person team; I built the visualizations that won." / "Before that, I started DataTugas, a 12-person study group at university."

**3D:** None, or a very small, low-cost particle flourish — this section should feel like a footnote, not another case study.

**Clickable:** None.

## 9. Education & skills

**Idea:** Plain, confident list — no invented proficiency bars. MSc Data Science (2020–2022) and BSc Economics (2017–2020), Universidade do Douro. Skills: SQL, Python, Tableau, Power BI, dbt, Statistics.

**3D:** None — this section is intentionally still, a breath before the close.

**Clickable:** None.

## 10. Contact / close

**Idea:** The hero's particle field returns, fully resolved, and holds still — the payoff of the opening idea. "Let's talk dashboards."

**3D:** Same grid pattern as the hero's end-state, static, maybe a very slow idle drift (not scroll-tied) so the page doesn't feel dead.

**Clickable:** Email (mailto), LinkedIn link, optional resume/CV download. These need to be real addresses from you before build — resume.md currently has a placeholder email.

---

## Persistent UI (present throughout)

- A minimal fixed nav: small mark top-left, a row of section dots or a thin progress bar showing scroll position, "Contact" link top-right. Lets people skip around instead of being forced through the full scroll every time.
- All 3D/motion is scroll-scrubbed (tied to scroll position), never autoplaying on a timer — so it holds up whether someone scrolls fast or slow.

## The look

- **Mode:** Dark by default (`#0B0D10`-ish near-black), with a light-mode toggle (`#F5F3EF`-ish off-white) — both work for a data/analytics identity.
- **Accent:** One color only, used consistently for "resolved" states — a cyan or amber. No multi-color gradients.
- **Type:** Tabular-figure monospace or grotesk for numbers/stats (so the 60%, 200+, 3,000 don't jitter when animated), paired with a clean humanist sans for body copy. Nothing decorative.

## On a phone

- Hero: same resolve concept, but as a lighter 2D canvas/SVG animation (no WebGL), plays once on load rather than tied to scroll.
- Timeline (section 2): the 3D camera-travel becomes a simple vertical list of the same four nodes.
- Helix and Rent Map visuals: become static illustrations or short, muted, autoplay-on-view loops instead of interactive 3D.
- Rent Map: renders as a flat SVG map, no 3D tilt — the color-coding and legend still work, the link-out still works.
- AutoPilot/FraudShield flourishes: simplified to a single static illustration each.
- Nav dots become a simple hamburger/section-jump menu.

## Without the 3D (reduced motion / low-power / no WebGL)

This isn't just a phone thing — it also covers `prefers-reduced-motion`, older browsers, and low-power laptops:
- Every scroll-scrubbed 3D animation has a static end-state image as its fallback — visitors just see the "resolved" version directly, no animation, no motion at all.
- Counters (60%, 200+, 3,000) still animate as simple number count-ups if motion is reduced-but-allowed, or appear instantly as final numbers if motion is fully off.
- No parallax, no autoplay video, no vestibular-trigger movement under any of these conditions.
- The site must be fully readable and navigable with zero JavaScript as a baseline (semantic HTML + CSS), with 3D/motion as a progressive enhancement layered on top — not a requirement to read the content.

## Everything else the site needs before build

- **Real contact details** — a usable email (not the placeholder `rafael@example.com`) and your LinkedIn URL.
- **Confirmation on Helix's own confidentiality terms** — before I design even an illustrative dashboard mock-up.
- **Decision on FraudShield's notebook** — public link or not.
- **A resume/CV file** if you want it downloadable from the contact section.
- **Asset production**: the dashboard illustration (Helix), the Lisbon parish map data/SVG, the particle/resolve animation — these need to be built or sourced before the page can use them.
- **Domain and hosting choice.**
- **CMS or static?** — static is simpler to start; a CMS only matters if you'll update case studies yourself often.
- **Performance budget / target device floor** — tells me how heavy the 3D scenes can be.
- **Basic SEO (title/meta/OG image) and privacy-respecting analytics**, so you can tell if it's working.
- **Accessibility pass criteria** — contrast, keyboard navigation, reduced-motion (covered above), alt text for the illustrations.

Still no build — tell me when you want me to start, and whether to begin with the hero/structure or with one case study as a proof of concept first.
