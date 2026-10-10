I'll start by looking through your material folder to understand your background and work.

Went through your resume and LinkedIn export. Here's the plan — no build yet.

## The idea

Your thread across Meridian Bank, Helix Genomics, Atlantico Telecom and DataTugas is the same job every time: scattered, chaotic organizational data → a dashboard or map that a real person actually opens every day. "I make dashboards people actually use" is your own line and it's the whole site in one sentence.

So the visual concept is **signal out of noise**: the site opens as scattered, unorganized points of light/data, and as you scroll they progressively resolve into structure — grids, charts, tiles — mirroring what you actually do for a living. It's literal, not decorative, which is what keeps it from feeling like a generic "3D blob" template.

One personal touch I'd build in: a Lisbon azulejo (tile) grid as a recurring motif — it's a real, specific reference to where you're based and it doubles visually as a data-grid/spreadsheet pattern. That's the kind of detail that makes it feel like you and not a Dribbble shot.

## Scrolling from top to bottom

1. **Hero** — Your name, "Founder & Product Analyst," your line about dashboards. Dark space, a loose field of glowing particles drifting, reacting gently to cursor/tilt. Nothing organized yet — this is the "noise" state.
2. **Thesis** — A few lines on the throughline (banking → genomics → telecom → a founder project, always the same job: unmanageable data into something people use daily). The particle field behind the text starts faintly aligning into a grid as you scroll.
3. **Experience, scroll-scrubbed** — Meridian Bank, Helix Genomics, Atlantico Telecom, DataTugas as a pinned sequence. Each one, the particles resolve further into an actual simple chart shape tied to that job's real metric (e.g. the efficiency gain at Meridian, the reporting-time cut at Helix). Animation = your actual results, not abstract motion.
4. **Projects, case-study style** — FraudShield, AutoPilot, Lisbon Rent Map, each pinned with its own visual: a pulse/alert animation for FraudShield (real-time fraud detection), flowing pipeline lines for AutoPilot, the azulejo tile grid morphing into an actual map for Lisbon Rent Map.
5. **Proof** — The Health Data Hackathon win and Beatriz Lima's recommendation (the sequencer double-booking line is genuinely good social proof, worth quoting directly). Your toolset (SQL, Python, Tableau, Power BI, dbt, Statistics) shown as filled-in azulejo tiles — same visual system, not a generic skill-bar widget.
6. **Close** — Contact, resume download, links. The particles/tiles resolve into one final clean shape as a bookend to the opening chaos.

## Colour and type

- Background: near-black ink, not pure black, so the 3D depth reads.
- One confident accent: an azulejo cobalt blue, with a warm terracotta/amber as a secondary highlight for CTAs — ties to Lisbon rather than default SaaS purple/teal.
- Display type: something with real character for headlines (e.g. Fraunces or Instrument Serif) — paired with a mono or grotesk for numbers and labels (e.g. IBM Plex Mono / Spline Sans Mono) with tabular figures, since you're an analyst and the stats should look deliberately "data-like." Body copy in a plain neutral sans.

## On a phone

The scroll-scrubbed pinning and particle simulation get expensive and often broken on mobile. Plan is: same narrative order, but sections become normal stacked fade/slide-ins rather than pinned/scrubbed; the particle field becomes a lighter static or CSS-only version; respect `prefers-reduced-motion` throughout; everything tested on an actual mid-tier phone for load time and jank, not just a resized browser.

## What else the site needs before it's built

- **A real photo**, a downloadable resume, confirmed contact email, and whatever profile links you want shown (LinkedIn/GitHub/etc.) — material folder has a placeholder email.
- **Visuals for the case studies.** Lisbon Rent Map has a live URL, so that one can use a real screenshot. FraudShield and AutoPilot have no public artifacts in what you gave me — I'd need a few lines from you on what they actually looked like (a chart, a flow, a screenshot) so those sections aren't just invented abstractions.
- **A confidentiality check** on Meridian Bank and Helix Genomics — is it fine to publicly state those metrics and name the employer, or does anything need to be anonymized/approved first?

## One thing to flag before we write any copy

Your `resume.md` and the LinkedIn export disagree on two numbers:

- Helix Genomics reporting-time reduction: resume says **40%**, LinkedIn export says **60%**.
- Lisbon Rent Map traffic: resume says **5,000 visitors/month**, LinkedIn export says **3,000 visitors/month**.

I don't want to put a number on the site that isn't actually true, so I'd rather you tell me which figure is correct for each (or a current one, if both are stale) than have me pick the more impressive one by default.

Let me know on those two numbers, the confidentiality question, and what you can share for FraudShield/AutoPilot visuals — then I can turn this into a build plan.
