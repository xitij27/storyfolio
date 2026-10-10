I'll start by looking through your material folder to understand your background and work before planning anything.

I read through your resume and LinkedIn export. Here's the plan — concept first, then the scroll-by-scroll, then colors/type, mobile, and what's still missing. Nothing built yet.

## The idea

Your own LinkedIn summary already has the line: **"I make dashboards people actually use."** That's the whole site in one sentence, and it's specific to you — not something a template could say. The throughline I'd build around it: **turning noisy, ungoverned data into something legible.** Bank transactions, genomic sequencing reads, telecom churn logs, Lisbon rent listings — all of it starts as noise, and your actual job across three very different domains has been making it readable for people who aren't data people.

That gives the 3D/motion concept a *reason to exist* instead of being decoration bolted onto a resume: the site opens with scattered, disordered points, and as you scroll or move the cursor, they resolve into the shapes of your actual work — a chart axis, a trend line, the outline of Lisbon's parishes. It's the "signal from noise" idea, dramatized. Every moving part on the site should trace back to that, which is what keeps it from reading as a generic agency demo.

## Scroll journey, top to bottom

**1. Hero — the noise.**
Full-bleed scene: a field of drifting, disordered points (think scattered data, not generic particles — label them loosely as transactions/reads/listings if we want a wink without being literal). Your name, headline, and the tagline sit over it. As the user scrolls a little, the points begin organizing — first hint of order — setting up the motif that pays off through the rest of the site.

**2. Who you are — one paragraph, no fluff.**
Economist who moved into data science, Lisbon-based. This is where the points fully resolve into a simple line or shape mid-scroll, closing the hero's open loop. Short, confident, not a bio paragraph that reads like a LinkedIn "About."

**3. Work — the case studies (the core of the site).**
Three or four deep pieces, not a grid of cards. Each one gets its own scroll-length scene, and each scene's visual motif matches what the project actually is, not a reused effect:
   - **Lisbon Rent Map** — a live, public, visual project, so this is the natural anchor. Scene: an actual map of Lisbon's parishes with a price heat gradient building in as you scroll. Links out to the live site.
   - **FraudShield** — real-time fraud detection. Scene: a stream of transaction points flowing past, most calm, a few flagged and pulled out as anomalies — this *is* the noise-to-signal idea applied directly.
   - **AutoPilot** — automation platform for analytics teams. Scene: a pipeline/flow diagram assembling itself — inputs collapsing into one clean automated path.
   - **Meridian Bank dashboards** (framed as experience/impact rather than a showcased build, since this is proprietary work) — the "200+ staff use this daily" story, told through numbers and quotes rather than screenshots.
   - **Helix Genomics** — sequencing operations, the published paper, the recommendation from the Head of the Sequencing Core about no longer double-booking sequencers. This one's almost entirely a human story backed by one good metric.

**4. Experience timeline.**
Compact, chronological, geographic: Porto → Lisbon. Atlantico Telecom → DataTugas (your own founded thing) → Helix Genomics → Meridian Bank. A thin path/line the camera travels along as you scroll, nodes lighting up — ties back to the "journey" framing without needing a literal map twice.

**5. Toolkit.**
Not a skills grid with progress bars (that's the most template-feeling pattern there is). Instead, SQL / Python / Tableau / Power BI / dbt / Statistics appear as small tags attached to whichever case study used them, reinforcing that these are tools you've shipped with, not a checklist.

**6. Recognition.**
Hackathon win (Health Data Hackathon 2023), the journal paper, Beatriz Lima's recommendation quote — three short, credible proof points, not a testimonials carousel.

**7. Education.**
One line each, de-emphasized — MSc Data Science, BSc Economics, Universidade do Douro. This is supporting evidence, not a headline.

**8. Close / contact.**
Email, and whatever professional links you want live (see open questions below). Maybe the noise field reappears one last time, now fully resolved and still — a quiet bookend.

## Colors and type

**Palette:** near-black ink background (not pure black — something like a very dark charcoal, `#0B0D10`-ish), bone/off-white text, and **one signal accent color** used sparingly — for flagged anomalies, chart highlights, hover states, the cursor trail in the hero. I'd lean toward an oscilloscope/terminal amber or a muted spectral green rather than the electric blue/indigo gradient that every SaaS and "creative dev" site already uses — it reads more like instrumentation than marketing, which fits a fraud-detection/genomics/trading-floor background. Everything else stays monochrome so that one accent actually means something when it appears, instead of being everywhere.

**Type:** a geometric/grotesk sans for headlines (structural, confident — something like Neue Montreal, General Sans, or Suisse) paired with a monospace for anything numeric or labeled — stats, section tags, project metadata (JetBrains Mono or IBM Plex Mono). The mono pairing is doing real work here: it's the visual signature of someone who lives in SQL and terminals, not a decorative choice.

## How it holds up on a phone

- Scroll-triggered reveals (fade/translate) stay; true parallax depth and cursor-based interaction get dropped — there's no cursor on a phone, and depth cues are the first thing to feel janky on touch.
- The heavier WebGL/particle scenes get a simplified version on mobile — fewer points, or in some cases swapped for a lighter Canvas/SVG animation that gets the same idea across without tanking frame rate or battery.
- Horizontal-feeling sections (the timeline) become a simple vertical stack.
- `prefers-reduced-motion` is respected throughout — anyone with that set gets the fully resolved, static version of every scene instead of the animated build-up.
- Standard touch-target sizing, a collapsed single-column nav, and real performance testing on a mid-range phone, not just desktop Chrome.

## What else the site needs — and a few things to flag first

Before I'd lock in copy, two things in your material don't agree with each other:
- Resume says Helix reporting time dropped **40%**; the LinkedIn Positions export says **60%**.
- Resume says the Lisbon Rent Map gets **5,000** visitors/month; the LinkedIn Projects export says **3,000**.
- Resume lists your MSc as 2020–2021; the LinkedIn Education export says 2020–2022.

Worth confirming the real numbers before anything goes on the page — a portfolio built on "dashboards people actually use" loses credibility fast if its own stats don't check out.

Also still missing, and needed before build:
- **A photo or none-at-all decision** — no headshot in the material.
- **Social/professional links** — no GitHub or LinkedIn URL in the export to link out to.
- **Resume file** — a downloadable PDF, or just rely on the site itself.
- **Visuals for Meridian Bank's dashboards** — likely can't show real screenshots (proprietary, internal); plan is to represent that work through numbers/quotes rather than imagery, but worth confirming there's no NDA issue even with an abstracted recreation.
- **Domain and hosting** decision.
- **A real screenshot or short clip of the Lisbon Rent Map**, since that's the one live, public thing worth showing directly.

Let me know what you think of the direction — especially the "noise → signal" concept and the accent color choice — before I go further, and send over anything on the open-questions list whenever you have it.
