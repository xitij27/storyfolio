Understood — no more questions. Here are the calls I made so the plan is final:

- **Helix Genomics reporting-time reduction:** going with **40%** (resume.md), not the 60% in the LinkedIn export — it's the more conservative of two numbers you wrote yourself, safer to publish.
- **Lisbon Rent Map traffic:** going with **3,000 visitors/month** (Projects.csv) over the resume's 5,000 — same logic, the lower and more specific figure.
- **MSc Data Science dates:** going with **2020–2021** (resume.md) — it's the version that lines up with you starting the Helix job in Sep 2021.
- **Contact:** not publishing an email at all, since the only one on file (`rafael@example.com`) is a placeholder and I won't invent a working address for you. The site uses a contact form plus your LinkedIn link instead. Swap in a real email later if you want one shown directly.
- **Recommendation quote:** including Beatriz Lima's quote — it's already public on your LinkedIn.
- **Project visuals:** no real screenshots exist in the material, so FraudShield and AutoPilot get designed abstract visuals in the site's own particle-morph language rather than fake product screenshots. Swap in real screenshots whenever you have them.
- **Resume PDF:** generated from resume.md as a downloadable asset.
- **Hosting/domain:** plan assumes a static deploy (Vercel-style) on a domain you already own or will buy; not picking one for you.
- **`messages.csv`:** excluded entirely, as flagged before — it's private salary/job-search correspondence, not portfolio content.

Everything else below is unchanged from the plan already laid out and is now final.

## The idea

**Signal from noise.** One 3D particle field runs the whole site. It starts as scattered, chaotic points and resolves into ordered structure — a bar chart, a helix, a network, a map grid — as you scroll through each chapter of your work. Same raw material, different shape each time, because that's the actual job: taking something messy (sequencer schedules, bank workflows, churn data, a city's rents) and making it legible. Tagline carried through: *I make dashboards people actually use.*

## Scroll narrative

1. **Hero** — Name, title, tagline. Particle cloud drifts, unordered. Scroll cue.
2. **Thesis** — Cloud begins organizing. Two to three sentences on the range (genomics, banking, telecom, your own city) — the only pure "about" text on the site.
3. **Meridian Bank (current)** — Particles resolve into a dashboard/bar-grid. Product Analyst, Lisbon, Feb 2024–present. 200+ staff using the dashboards, 35% efficiency gain.
4. **Helix Genomics Institute** — Particles reshape into a helix/sequencer-array form. Data Analyst, Porto, 2021–2024. Reporting time cut 40%, co-authored paper in the *Journal of Genomic Methods*. Beatriz Lima's quote lands here as the credibility beat.
5. **Atlantico Telecom + DataTugas** — Quieter, simpler funnel shape. Churn analysis internship plus founding DataTugas — foundation years, lower visual intensity than the two roles above.
6. **Projects** — Breaks the morph pattern for proof-of-work cards: FraudShield, AutoPilot, and Lisbon Rent Map. Rent Map gets a real interactive mini-map (your strongest public, linkable asset), shaded if you can supply the underlying rent data later; FraudShield/AutoPilot get designed abstract visuals for now.
7. **Recognition** — Health Data Hackathon winner, 2023. One line, particles briefly sharpen to a single clear point.
8. **Education** — Compact footnote: MSc Data Science (2020–2021) and BSc Economics (2017–2020), Universidade do Douro.
9. **Contact/close** — Particles settle, calm. Contact form, LinkedIn, resume download. No more animation tricks here.

## Colour and type

- **Base:** near-black warm charcoal, not pure black.
- **Accent:** warm copper/amber — Lisbon light, azulejo tilework, without being literal.
- **Secondary:** desaturated teal, used only in the genomics chapter.
- **Type:** editorial display serif for headlines; clean grotesk for body; monospace for every number and metric (35%, 200+, 2023) to keep reinforcing the data identity.

## On a phone

- Scroll-scrubbed 3D camera path is replaced by a lighter canvas/WebGL pass per section, triggered on scroll-into-view rather than scrubbed continuously.
- Particle counts cut hard; tested against a mid-range Android device.
- `prefers-reduced-motion` respected everywhere — morphs become fades/slides.
- Rent Map becomes a static image with tap-to-expand instead of a live interactive map.
- Chapter pacing shortens so the scroll doesn't feel endless on a small screen.

## Other build requirements, finalized

- Resume PDF generated from resume.md.
- Contact form (no public email) + LinkedIn link.
- Designed placeholder visuals for FraudShield/AutoPilot; real interactive map for Lisbon Rent Map.
- SEO basics: title, meta description, Open Graph image.
- Accessibility pass: alt text, contrast against the dark background, keyboard navigation for the map.
- `messages.csv` left out of the build entirely.

This is the final plan — ready to build whenever you say go.
