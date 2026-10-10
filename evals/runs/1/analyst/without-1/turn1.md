I'll start by looking through your material folder to understand your background and work.

I pulled your background together — here's a point before the plan: your resume and LinkedIn export disagree on a couple of numbers (Helix reporting-time improvement is 35% in one, 60% in the other; Lisbon Rent Map traffic is 5,000/mo vs 3,000/mo). Flagging now so we use the right ones when we build — no need to resolve it yet.

# The idea

Your actual throughline across Meridian Bank, Helix Genomics, and the Lisbon Rent Map isn't "data analyst." It's: **you take data nobody trusts or uses and turn it into something a specific person relies on every day** — a sequencing core that stops double-booking machines, 200+ bank staff with a dashboard they open every morning, renters checking what a room actually costs in their parish. That's the site's spine: not a showcase of charts, but a showcase of *decisions that got easier because you built the thing*.

So the site itself should perform that idea. As you scroll, something genuinely unstructured — scattered points, noise, a mess — resolves into something legible and used. That's the 3D/scroll-driven centerpiece, and it's earned by your actual work rather than being a stock "data particles" demo, because resolving mess into clarity is literally your job.

# The scroll, top to bottom

**1. Hero**
Full-bleed canvas: a field of loose, drifting points/shapes (think scattered readings — genomics data, transaction logs, rent listings — rendered abstractly, not literally). No chart junk, just motion that reads as "raw and unresolved." Your name, "Rafael Costa," and one line of positioning set in large type over it — something like *"I make dashboards people actually use."* (your own words from the LinkedIn summary — genuinely yours, not invented). Scroll cue at the bottom.

**2. The resolve (thesis moment)**
As the user scrolls, the scattered field starts to organize — points snap into a grid, a line, a shape — settling into something that looks like a clean dashboard or chart by the time this section ends. This is the one "wow" 3D moment, used once, meaningfully, not repeated as a gimmick. Short accompanying text: the one-paragraph version of what you do and for whom (banking, genomics, civic data).

**3. Work — three real case studies, not a grid of cards**
Each gets its own full-height beat, scroll-pinned, with the story told as *before → what you built → after*, grounded in the actual stakes:
- **Meridian Bank** — the dashboard 200+ staff use daily. Visual: an abstracted UI panel assembling itself; a counter ticking toward "200+ staff."
- **Helix Genomics** — the sequencing-core scheduling problem, reporting time cut, and the published paper. This is where the testimonial from Beatriz Lima (Head of Sequencing Core) lands verbatim — it's your strongest piece of outside proof, use it as a pull quote, not buried.
- **Lisbon Rent Map** — the public-facing side project. Since it's a real URL, this section can show an actual interactive fragment (a live or screen-captured map of Lisbon with parish-level rent) rather than an abstract visual — a nice texture shift from "enterprise dashboard" to "civic tool for real people."

FraudShield and AutoPilot are lighter-weight projects — don't give them the same full-beat treatment; fold them into a smaller "also built" strip (logos/names, one-line description, maybe a small motion detail each) right after the three case studies so the section doesn't feel padded.

**4. Origins / how you think**
A quieter, mostly-static section: BSc Economics → MSc Data Science, founding DataTugas as a student, the Health Data Hackathon win. This is where the site slows down on purpose — contrast after three high-motion case studies — and explains *why* you build things people use rather than dashboards for their own sake (an economics background reads as "understands the decision behind the data," which is a real differentiator worth surfacing in the copy).

**5. Contact / close**
Return to the opening visual, but now fully resolved and calm — the scattered field has become something ordered and still. Name, how to reach you, links (LinkedIn, the Rent Map, email). Low motion, high clarity — it should feel like arriving somewhere, not another animated beat.

# Visual language

**Motion**: one real 3D/WebGL moment (the hero-to-resolve transition), reused sparingly as a visual motif at section transitions (a few points still drifting faintly in the background of case-study sections, as a texture, not a show). Everything else should be scroll-triggered fades, reveals, and parallax — restrained, fast, no bounce/elastic easing. Nothing should move just to prove it can.

**Color**: Not generic "data dashboard blue." Given banking + genomics + Lisbon civic data, I'd lean into a dark, ink/near-black base (not pure black) with a warm off-white for text, and one accent color that's distinctly *not* SaaS-blue — a deep terracotta or ochre (echoes Lisbon's tiles and warmth) used sparingly for the resolved state, emphasis, and the one "moment" per section. Dark mode as default suits the "raw data resolving into clarity" motif — points glowing against dark, then settling into warm, readable light.

**Type**: A high-contrast serif or slab for your name and section headers (gives it a designed, editorial feel instead of "tech startup sans-everywhere"), paired with a clean grotesk/neutral sans for body copy and data labels. Numbers (200+, 35%, 5,000 visitors) get their own treatment — a monospace or tabular-figure face — so stats read as *measured facts*, reinforcing the "real outcomes" theme.

# On phone

3D/WebGL is the first thing to budget down — on mobile the hero "resolve" animation becomes a shorter, simpler version (fewer particles, a straight CSS/canvas 2D fallback, or just the end-state with a subtle fade-in) rather than full scroll-scrubbed 3D, both for performance and because scroll-jacking on mobile tends to fight the user's own scroll gesture. Case studies stack vertically, lose the pinning, and become straightforward scroll-reveals. Stats and pull quotes become the first thing the eye gets, since fine 3D detail doesn't survive on small screens anyway. One column throughout, generous tap targets for the project/contact links.

# What else the site needs before we build

- **Real contact info and links** — resume lists a placeholder email (`rafael@example.com`) and the Rent Map URL is a placeholder domain; need the real ones, plus LinkedIn/GitHub if you want them linked.
- **Resolve the two numeric conflicts** above (and confirm MSc end year — resume says 2021, LinkedIn export says 2022).
- **Assets**: a screenshot or short screen-capture of the Lisbon Rent Map and of the Meridian Bank dashboard (redacted/anonymized if needed) — real artifacts will make the case studies land much harder than abstract illustrations alone.
- **Scope decision on FraudShield/AutoPilot** — confirm it's fine to treat these as lighter mentions rather than full case studies, or let me know if either deserves equal billing.
- **Tech approach** (my recommendation, open to pushback): React + Three.js/R3F for the hero piece, GSAP ScrollTrigger for the scroll choreography, static-generated for everything else — keeps it fast and avoids a full custom WebGL scene for sections that don't need one.
- **Performance/accessibility guardrails**: reduced-motion fallback for anyone with that OS setting (swap the particle animation for a simple fade), and the site needs to stay legible/usable with motion off entirely — not just as an accessibility checkbox, but because recruiters skimming on a bad connection shouldn't lose the content to a stalled animation.

Let me know what you think of this direction, and send over the real links/numbers when you have them — I won't build anything until you give the go-ahead.
