I'll start by locating and reviewing your material folder so the plan actually reflects your work, not generic placeholder content.

Read everything in `material/`. Before the plan, one flag: your resume and LinkedIn export disagree on a few numbers —

- Reporting time reduced: resume says **40%**, LinkedIn says **60%**
- Lisbon Rent Map traffic: resume says **5,000/mo**, LinkedIn says **3,000/mo**
- MSc end date: resume says **2021**, LinkedIn says **2022**
- Resume email is a placeholder (`rafael@example.com`)

I'll plan around this content as-is, but you should reconcile these before anything goes live — I'll call out where they land in the site so you know what to fix.

---

## The idea

Your work doesn't live in one lane — bank dashboards, genomics ops, telecom churn, a public rent map, a hackathon win, your own startup (DataTugas). The thread connecting all of it isn't a tool or an industry, it's a move you keep making: **you walk into operational chaos — sequencers double-booked, fraud buried in transactions, no one knowing what a room costs in Lisbon — and you leave behind something a non-analyst can run without you in the room.** Beatriz Lima's recommendation says this almost word for word.

So the site's concept is **signal from noise**, taken literally as the site's physics, not a slogan on a slide. It opens in disorder — scattered points, numbers, fragments drifting in 3D with no structure — and as you scroll, each section is the moment one piece of that chaos resolves into something ordered and legible: a dashboard panel assembling, a sequencing schedule combing itself straight, a flat list of rents rising into a readable 3D map of Lisbon. By the end, everything's settled. That's the hook that makes the 3D mean something instead of decorating a template.

## The scroll journey

One continuous camera move through a single 3D space, not stacked cards that fade in. Each section is a stop along that camera path.

**1. Hero — the noise.**
Black/near-dark field full of drifting, unlabeled data points, digits, fragments of chart axes — no order yet. Your name and one line land on top: something like *"I make dashboards people actually use."* No explanation yet, just tone-setting. Scroll input starts dragging the camera forward into the field.

**2. The thesis.**
A short, direct paragraph on what you actually do — the "walks into chaos, leaves structure" idea — with a quiet stat strip (orgs, domains, people using what you built) *once we've fixed the numbers above*. Visually, this is where the noise field starts showing the first hint of a grid underneath it, like structure trying to emerge.

**3. Case study — Meridian Bank.**
Problem: no shared visibility across 200+ staff. The chaos resolves into a dashboard panel assembling itself piece by piece as you scroll — filters snapping in, a chart drawing itself from scattered points. Close on the outcome number (once confirmed) and a one-line "what changed."

**4. Case study — Helix Genomics.**
Problem: sequencer scheduling collisions, slow reporting. Visual: tangled thread-like strands (sequencing reads) combing out into parallel ordered tracks — a motif that's actually genomics-literal, not generic. Beatriz's quote lands here as a pull-quote, right where it's earned.

**5. Case study — Lisbon Rent Map (flagship side project).**
This is your best "stands out" opportunity because it's public, visual, and already geographic. Flat, scattered rent listings lift into a 3D extruded map of Lisbon's parishes, height/color mapped to price, as you scroll — effectively a live rendering of the real project, not a screenshot. Link out to the live map.

**6. Other work — lighter pass.**
FraudShield, AutoPilot, DataTugas, Atlantico churn work — not full case studies, a tighter grid/strip (title, one line, outcome) so the site doesn't sprawl into six equal-weight stories. These ride the same settling-structure visual but smaller, faster, no pinned camera stop.

**7. Toolkit.**
SQL, Python, Tableau, Power BI, dbt, Statistics — shown as the last few loose particles from the hero snapping into place around a small cluster, not a badge wall.

**8. Credibility.**
Hackathon win, MSc/BSc, maybe the recommendation again if not already used. Calm, text-forward, no spectacle — this is the "trust me" beat, it shouldn't compete with the case studies.

**9. Contact — full stillness.**
The noise field is now completely settled: a clean, still grid. Real contact method (needs a real email/handle from you), resume download, social links. Mirrors the hero — the chaos-to-order arc closes.

## Colour and type

Avoid the generic "dark 3D portfolio" neon-gradient look — your work is trustworthy/analytical, not a startup pitch deck. Proposed palette:

- **Base:** near-black ink background, off-white text — not pure black/white, keeps it feeling designed rather than default-dark-mode.
- **Accent 1 (warm):** a terracotta/amber, a quiet nod to Lisbon tilework — used sparingly, for the Rent Map section and key highlights.
- **Accent 2 (cool):** a signal teal/green — this is the "resolved" colour, used whenever noise snaps into structure (the moment of payoff in each section).
- No more than those two accents. Resisting a third "fun" colour is what keeps it feeling like you, not a template.

**Type:** pair a neutral, technically-credible grotesk (something in the Inter/Söhne territory) for body and UI with a higher-personality display face for the big scroll-triggered headlines — either a tighter display grotesk or a serif with some editorial weight, since a couple of your projects (Rent Map, genomics paper) have a data-journalism feel that a pure tech sans won't capture. I'd pick the exact pairing once we're building, so licensing/self-hosting can be checked.

## Phone behaviour

Pinned-camera, scroll-scrubbed 3D is the thing that most often breaks or just feels bad on mobile — janky scroll-jacking, battery drain, low frame rates on mid-range Android. Plan:

- Mobile drops the pinned 3D camera moves entirely. Each case study becomes a normal vertical scroll with a lighter, pre-baked animation (CSS/Lottie-style) standing in for the 3D moment — same idea (assembling dashboard, combing strands, rising map), much cheaper to render.
- Particle counts in the noise field get capped hard on mobile; same visual idea, far fewer points.
- Test on a real mid-range Android, not just an iPhone — that's usually where these sites fall apart.
- `prefers-reduced-motion` is respected everywhere, not just on mobile — some people turn this on regardless of device.

## What else the site needs before we build

- **Real numbers** — your call on 40% vs 60%, 5,000 vs 3,000, 2021 vs 2022.
- **Real contact info** — the resume email is a placeholder.
- **Visual assets for the case studies** — you likely can't show real Meridian Bank or Helix Genomics dashboard screenshots (confidentiality). We'll need either sanitized mockups or to lean fully on the abstract 3D visual instead of screenshots.
- **A touch more written detail per case study** than the one-liners in the CSVs — even 3-4 sentences each on what you actually built and decided, not just the outcome.
- **A resume/CV file** to link for download.
- **Performance/accessibility plan** — lazy-load the 3D, keep a non-WebGL fallback for devices/browsers that choke on it, respect reduced-motion, keep contrast readable against the dark background for both accent colours.

Let me know which numbers are correct and whether you've got real screenshots/mockups to work with — once that's settled I can start building section by section.

Plan's above, nothing built yet. Let me know the correct numbers/contact info and whether you have real dashboard visuals to work with, and I'll start building section by section.
