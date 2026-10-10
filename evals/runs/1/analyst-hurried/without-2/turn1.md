I'll start by finding the material folder to see what content and work I have to build the plan around.

Let me read through the material to understand who this is for.

I've gone through the resume, LinkedIn export, and project data. Before the plan, two things need your attention:

**A privacy flag:** `messages.csv` contains private DMs — one is a confidential salary negotiation where you explicitly asked a contact to keep your job search secret from your manager. That file is not portfolio material and I'm excluding it entirely from any plan or future build. Worth deleting from the `material` folder, or at least separating it from what gets fed into the build.

**Data conflicts to resolve before anything is written as copy** (sources disagree with each other):
- Meridian Bank efficiency gain: resume says 35%, same in Positions.csv (consistent — fine).
- Helix Genomics reporting-time reduction: resume says 40%, Positions.csv says 60%.
- Lisbon Rent Map traffic: resume says 5,000 visitors/month, Projects.csv says 3,000.
- MSc Data Science dates: resume says 2020–2021, Education.csv says 2020–2022.
- Email on the resume (`rafael@example.com`) is a placeholder, not real.

I'll build the plan around the material as-is, but flag the exact spots where these numbers appear so you can tell me the real figures before copy is final.

---

## The idea

Your actual throughline, reading across a genomics lab, a bank, a telecom churn study, and a side project mapping Lisbon rents, is the same move every time: you take something messy and operational — sequencer schedules, staff workflows, customer churn, a city's rental data — and turn it into something people actually look at and act on. "I make dashboards people actually use" isn't just a tagline, it's the whole site's concept.

So the central visual metaphor is **signal from noise**: a single 3D object made of scattered, chaotic points that resolves into clean, ordered structure as you scroll — a bar chart, a helix, a network graph, a map grid. Same particles, different shape each time, because it's the same skill (you) applied to a different domain. It's tied directly to what you do for work, not a generic "cool 3D blob" — so it won't read as a template.

## Scroll narrative, top to bottom

**1. Hero** — Your name, "Founder & Product Analyst, Lisbon." A cloud of particles drifts in loose, unordered motion in 3D space — representing raw, unstructured data. No chart yet. One line under your name: *I make dashboards people actually use.* Scroll cue.

**2. The thesis** — As you start scrolling, the particle cloud begins to organize. Short statement of what you actually do and the range of places you've done it (genomics, banking, telecom, your own city). This is the only purely "about" text on the site — keep it to 2–3 sentences, let the visual carry the rest.

**3. Meridian Bank (current role)** — The particles resolve into a bar-chart/dashboard grid. Copy: Product Analyst, Lisbon, Feb 2024–present. Dashboards used by 200+ staff; efficiency improved by [35%]. This section should feel like the "now" chapter — present tense, active.

**4. Helix Genomics Institute** — The same particle field reshapes into a DNA helix / sequencer-array form. Copy: Data Analyst, Porto, 2021–2024. Sequencing operations support, reporting time cut by [40–60%, confirm], co-authored paper in the *Journal of Genomic Methods*. This is a good spot to pull in the recommendation quote from Beatriz Lima ("the reason we stopped double-booking the sequencers") as a credibility beat rather than a generic testimonial block.

**5. Atlantico Telecom + DataTugas** — Shorter, quieter chapter — the formative years. Particles form a simple flow/funnel shape (churn analysis). Brief mention of founding DataTugas alongside it. This section should be visually calmer — it's foundation, not a highlight.

**6. Projects** — The one section that can break from the particle-morph pattern, because it's your proof-of-work rather than narrative. Three cards: **FraudShield** (fraud detection), **AutoPilot** (automation platform), and **Lisbon Rent Map**. The Rent Map is your strongest asset here — it's public, has a URL, and is literally a map, so this is the natural place for a genuinely interactive element: an actual mini Lisbon map (not 3D-gimmick, just real and well-made), maybe shaded by the rent data if you can share it. This section should feel like the payoff of everything shown so far.

**7. Recognition** — Small, confident, not a trophy case: Health Data Hackathon winner, 2023. One line, maybe tied visually to the particles briefly sharpening into a single clear point.

**8. Education** — Compact, almost a footnote: MSc Data Science and BSc Economics, Universidade do Douro. This doesn't need visual weight — it's credential, not narrative.

**9. Contact / close** — The particles that have been chaotic-then-ordered throughout now gently settle, inviting the scroll to end on calm. Real email, LinkedIn, resume download. No more animation tricks here — the one place the site should feel quiet and easy to act on (copy email, click a link).

## Colour and type

Avoid the two clichés this field defaults to: neon-cyberpunk data-viz, and sterile corporate-blue SaaS. Suggested direction:

- **Base:** near-black ink (not pure black — something like a very dark warm charcoal) for depth in the 3D scene.
- **Accent:** one warm copper/amber — nods to Lisbon light and azulejo tilework without being literal or twee. Used for the "resolved" state of the particles and for key numbers.
- **Secondary:** a desaturated teal, used sparingly and only in the genomics chapter, to let that section feel distinct without introducing a third unrelated colour.
- **Type:** a confident display serif for headlines — something with editorial weight, so it doesn't read as a SaaS landing page — paired with a clean grotesk for body copy. Numbers and metrics (35%, 200+, 2023) get a monospace treatment throughout; it's a small detail that keeps reinforcing "this person works with data" without saying it outright.

## On a phone

A scroll-linked camera path through a 3D scene is the first thing to simplify on mobile — it's expensive and fiddly with touch scroll momentum. Plan:

- Replace the continuous 3D camera path with the same particle-morph concept rendered as a lighter 2D canvas or cheaper WebGL pass per section, triggered by simple scroll-into-view rather than scrubbed to scroll position.
- Cut particle count substantially; test on a mid-range Android device, not just your own phone.
- Respect `prefers-reduced-motion` everywhere — swap morphs for simple fades/slides.
- The Lisbon Rent Map widget becomes a static image with tap-to-expand rather than a live interactive map.
- Section pacing shortens — long scroll-scrubbed chapters that work on a 27" monitor feel endless on a 6" screen, so mobile should reach each chapter faster.

## What else the site needs before build

- A real contact email (the resume one is a placeholder).
- The four conflicting numbers resolved (above).
- A short screenshot or two of the Rent Map, FraudShield, and AutoPilot — right now these are one-line descriptions with no visual proof.
- Confirmation you're comfortable publishing Beatriz Lima's quote publicly (it's already on LinkedIn, but worth a quick check before it's on your own site).
- A resume PDF to link from the contact section.
- Basic SEO/social: page title, meta description, an Open Graph preview image.
- A domain and hosting decision.
- Accessibility pass: alt text, colour contrast against the dark background, keyboard navigation for any interactive element (the map especially).

That's the full plan. Let me know what you want to adjust, and send over the real numbers/email when you have them — I won't start building until you say go.
