I'll start by locating the material folder so the plan is grounded in your actual work, not generic placeholders.

Found it — a resume plus a full LinkedIn export. Let me read through all of it.

I read through everything — resume.md and the full LinkedIn export (profile, positions, projects, skills, education, honors, recommendation). Before laying out the plan, one thing needs your input: **the two source files disagree on three numbers**, and I don't want to put a wrong stat on a site that's partly about your data-accuracy work:

| Claim | resume.md | LinkedIn export |
|---|---|---|
| Helix Genomics reporting-time reduction | 40% | 60% |
| Lisbon Rent Map traffic | 5,000 visitors/month | 3,000 visitors/month |
| MSc Data Science end year | 2021 | 2022 |

Which is right for each? I'll use placeholder brackets for these three in the plan below until you confirm, rather than picking the more impressive-sounding figure.

---

## The idea

You're not a designer-portfolio type — you're the person who turns messy operational chaos (sequencer scheduling, fraud transactions, rent listings) into a dashboard people actually open every day. The site's concept: **"Signal from noise."** Every section opens on raw, scattered data — points, numbers, lines in disarray — and your work is the moment it resolves into something legible and usable. That's a true story about what a Product/Data Analyst does, not a borrowed aesthetic.

This also gives an honest reason for the 3D/motion language: particles and data points that drift and reassemble as you scroll, rather than decoration bolted onto a template.

## Scroll narrative, top to bottom

**1. Hero.** Full-viewport canvas of scattered points/particles in a loose 3D field — ambiguous, noisy. As the user starts scrolling (or after ~1.5s idle), the particles pull into a clean grid/line-chart shape. Your name, "Rafael Costa," and the one line from your LinkedIn summary — *"I make dashboards people actually use"* — sets in as the resolve completes. A quiet subhead: Lisbon-based, Product Analyst at Meridian Bank.

**2. What I do / the thread.** Short, three-beat statement, not a bio paragraph: genomics operations → banking dashboards → a civic side project about rent. One horizontal scroll-linked timeline (2020 → present) rendered as a single bending line in 3D space, with Atlantico Telecom, DataTugas, Helix Genomics, and Meridian Bank as nodes you pass through. This replaces a conventional "About" wall of text with the actual career shape.

**3. Case study — Meridian Bank (current, leads).** Dashboards used by 200+ staff, 35% efficiency improvement. Visual: an abstracted dashboard UI mockup that assembles itself panel-by-panel as you scroll, tied to a scroll-scrubbed counter animating 0→200 staff and 0→35%. This is your current, strongest, most verifiable work — it opens the case studies.

**4. Case study — Helix Genomics.** Sequencing-ops reporting, the [40%/60%] reduction in reporting time, and the Journal of Genomic Methods contribution. Visual: a different register from the bank dashboard — more scientific, a helix/sequence motif made of line segments that straighten into a report timeline. Include Beatriz Lima's quote here verbatim, attributed with her title (Head of the Sequencing Core) — it's a real, specific testimonial and should sit next to the work it's about, not in a generic "testimonials" carousel.

**5. Project — FraudShield.** Real-time fraud detection. Visual: transaction points flowing as a stream, red flags igniting on anomalies — this is where the "things that move as you scroll" earns its keep, because fraud detection *is* movement and anomaly, not just a nice effect.

**6. Project — Lisbon Rent Map.** [3,000/5,000] visitors/month, live link. Visual: an actual stylized map of Lisbon's parishes, color-coded by rent, that scroll-rotates in 3D — this is the one place a literal map makes sense since the project is a map. Link out to the live site.

**7. Project — AutoPilot.** Automation platform for analytics teams. Shorter treatment (no public metrics given) — a diagram of tasks collapsing from many manual steps into one automated pipeline.

**8. Origins — DataTugas & the hackathon win.** Founder, DataTugas (2018–2020), and Health Data Hackathon 2023 win. One compact section, not a full case study — this is "how I got here," placed late so it reads as foundation, not padding.

**9. Education + skills.** MSc Data Science, BSc Economics, both at Universidade do Douro. Skills (SQL, Python, Tableau, Power BI, dbt, Statistics) shown as a tight, understated list or small node cluster — not a skill-bar gimmick, you're past that stage of career.

**10. Contact / close.** The opening particle field returns, now fully resolved into a simple grid, and holds still. Email, LinkedIn, a direct CTA ("Let's talk dashboards"). The stillness at the end is the payoff of the noise-to-signal idea from the hero.

## Colour and type

- **Base:** near-black (`#0B0D10`) or off-white (`#F5F3EF`) background depending on which you prefer as default mode — given the data/fintech/scientific mix, I'd lean dark-mode-first with a light-mode toggle, since dashboards and sequencing visuals both read well on dark.
- **Accent:** a single confident accent used consistently for "resolved signal" moments — a cyan or amber works well against near-black and reads as "dashboard/data," not "generic startup gradient." Avoid multi-color gradients; one accent keeps it feeling like your work, not a template.
- **Type:** a monospace or grotesk-leaning sans for numbers/stats (reinforces the data identity — something like a tabular-figure font so the animated counters don't jitter), paired with a clean humanist sans for body copy. Avoid anything display/decorative — your material is substantive, not playful.

## Motion and 3D, specifically

Everything above is scroll-driven (scroll-scrubbed, not autoplay) so it holds up for people who skim by scrolling fast and people who read slowly. No motion effect appears unless it's attached to a real fact (a counter, a timeline, a map, a data stream) — nothing is there purely to look like an awwwards site.

## Mobile

3D particle fields and canvas scenes are expensive — on mobile this becomes:
- Hero: a simplified 2D canvas or even a static SVG version of the same resolve animation (CSS/JS, no WebGL), triggered once on load rather than scroll-tied.
- Timeline (section 2): switches from horizontal 3D scroll to a vertical stacked list of the same nodes.
- Case study visuals: become static illustrations or short autoplay-on-view Lottie/video loops instead of interactive 3D, muted and looped, under a couple seconds.
- Counters and the rent map keep their animation (cheap) but the map renders as a flat SVG, not a 3D rotation.
- Everything respects `prefers-reduced-motion` — reduces to crossfades, no vestibular-trigger movement, on any device.

## What else the site needs before this can be built

- **Confirm the three stat discrepancies above.**
- **Real assets:** actual (even if lightly anonymized/blurred for confidentiality) screenshots of the Meridian Bank and Helix dashboards, or at minimum a faithful abstracted recreation — don't fabricate UI that misrepresents the real work.
- **A real email and LinkedIn URL** for the contact section (resume.md has `rafael@example.com`, which is a placeholder, not a usable address).
- **Permission/confirmation on the Beatriz Lima quote** — confirm she's fine with it appearing publicly, since LinkedIn recommendations aren't automatically cleared for reuse on an external site.
- **Resolution on the FraudShield and AutoPilot write-ups** — both currently have only a one-line description; a couple of real specifics (your role, scale, outcome) will make those sections as strong as Meridian/Helix instead of thinner by comparison.
- **Performance budget decision:** target device/connection floor for the 3D scenes (so I know how aggressive to be with particle counts and WebGL use).
- **Domain and hosting preference**, and whether this needs a CMS (so you can update case studies yourself later) or is fine as a hand-coded static site.
- **Basic SEO/meta and analytics** (even just privacy-respecting pageview counts) so you know if it's working.

Once you confirm the three numbers and the asset/contact questions, I'll turn this into a build plan with actual sections and components — happy to start whenever you're ready.
