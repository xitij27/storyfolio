I'll start by looking through your material folder to understand your background and work.

I went through your resume, LinkedIn, and old site. Here's the thing that jumped out: you already wrote the structure for this site without meaning to. Your own migration runbook — **preflight, shadow, dual write, cutover, soak, decommission** — is a six-act story. That's the concept: the site itself is a migration. Scrolling down is the visitor moving a system from legacy to stable, the same way you move Kestrel Freight's services. It's not a 3D gimmick bolted onto a bio — the motion *is* the content.

## The idea

A dark, mission-control site where scrolling drives a live system migration happening behind the text. On-prem nodes (warm amber/red) physically travel across to a cloud cluster (cool cyan) as you scroll. Counters tick for real numbers from your career — 310 services, 4TB, 99.98%, 85→22 pages/week. By the bottom, everything is calm, green, boring — which is the whole point of your work and your tagline: "I like migrations that are boring on the day." The site proves that philosophy instead of stating it.

## The scroll journey

**1. Hero — "Status: Migrating"**
Full-screen. A 3D node graph, mostly red/amber, jittery, slightly chaotic — representing the on-prem estate. Headline: "I move systems that are not allowed to stop." A persistent top-corner status readout ("services migrated: 0/310") that updates for the rest of the scroll — this is your scrollbar, basically, disguised as ops telemetry.

**2. Preflight — who you are**
Short, confident bio pulled from your About. Stat strip appears: 310 services, 4TB Postgres, 99.98% uptime, zero downtime — each number counts up as it enters view. This section is the "before" snapshot.

**3. Shadow — the Kestrel Freight migration**
Deep-dive case study. The node graph starts actively moving: nodes detach from the red cluster and arc toward the cyan one, one at a time, timed to scroll position. Text alongside explains the 26-month, two-datacenter move. This is the centerpiece 3D moment — it should feel inevitable and controlled, not explosive.

**4. Dual Write — the Postgres upgrade**
A tighter, more technical visual: two database cylinders (v11, v15) with data flowing into both simultaneously, then one fading out. This is where you show depth for engineers reading closely — the 4TB-with-no-maintenance-window detail is your best credibility signal, give it room.

**5. Cutover — reliability, on-call**
A line chart/sparkline animates live as you scroll: pages-per-week dropping from 85 to 22. The node graph is now mostly cyan. This is the emotional payoff section — the chaos from the hero is resolved here.

**6. Soak — ferry and the talk**
Calmer, lighter section. ferry (1.2k★, dual-write cutover tool) gets a real card with a link to GitHub. "Boring Migrations" talk embeds or links to video. This is "what I give back," not another case study — pace changes to signal that.

**7. Decommission — contact**
The old 2019 one-line site gets a small, self-aware nod ("retired: dawit@... 2019") — a wink at where you came from. Then a clean, quiet contact block. All red is gone from the visual by now; everything's cyan/green and still. Status readout reads "310/310 — stable."

## Colour and type

- **Base:** near-black charcoal/navy (`#0a0e14`-ish), not pure black — keeps the 3D elements from looking like a tech demo on a void.
- **Accent pair:** warm amber/red (`legacy`) → cool cyan/teal (`stable`), interpolating as you scroll. This is the whole visual argument of the site, so no other accent colors compete with it.
- **Type:** a monospace face (IBM Plex Mono or JetBrains Mono) for all numbers, stats, and the status readout — it should look like terminal output. A clean grotesk (Inter or Neue Montreal) for headlines and body copy. Two fonts, strict roles, no decorative type.

## On a phone

- The node-graph migration becomes a simplified 2D canvas animation (same red→cyan logic, far fewer particles) — full WebGL node physics isn't worth the battery/frame-rate cost on mobile.
- Stat counters and the status readout still work great on mobile — they're cheap and high-impact, so they carry more of the storytelling weight there.
- Section pacing shortens — less horizontal padding, case study copy trimmed to the one sentence that matters, "read more" expansion for the rest.
- `prefers-reduced-motion` gets a real fallback: static before/after diagrams instead of animated transitions, not just "turn off the easing."

## What else it needs before this is real

- **Real contact info.** The material has placeholder emails (`dawit@example.com`) and no talk video URL — needs the actual links before anything ships.
- **Case study assets.** Right now the migration visuals would be generative/abstract (nodes, not real architecture diagrams) since actual Kestrel infra is presumably confidential — worth confirming that's fine, or whether you have sanitized diagrams to use instead.
- **Performance budget.** Lazy-load the 3D library, cap it to the hero + shadow sections, keep everything else lightweight canvas/SVG — an award-site that stutters undercuts "I keep things running."
- **Accessibility pass.** Reduced-motion fallback (above), color contrast on the amber-on-charcoal text, alt text for anything the 3D scene communicates.
- **SEO/meta + social card.** Single-page sites need an OG image and real `<title>`/description or they're invisible when shared.
- **Resume download** as a plain PDF/link — recruiters skimming won't scroll-animate through six acts first.
- **Hosting/stack decision** — e.g., Next.js + Vercel is the easy default for this kind of scroll-driven 3D site; flag if you have a preference.

Let me know if you want to adjust the structure, and give me the real contact details + confirm the diagram approach — then I can start building section by section.
