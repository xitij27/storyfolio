I'll start by locating the material folder to understand your background and work before planning anything.

Found it — three files. Let me read all of them.

Read through all three files. Dawit Bekele — Staff Platform Engineer at Kestrel Freight, Rotterdam. His whole identity is reliability and migrations that don't break anything: 310 services moved off two data centers with zero downtime, a 4TB Postgres major-version upgrade with no maintenance window, a migration runbook used by 40 teams, on-call pages cut from 85/week to 22, an open-source dual-write tool (ferry, 1.2k stars), a talk called "Boring Migrations." One line in his own words: *"I like migrations that are boring on the day."*

One flag before the plan: the email (`dawit@example.com`) and GitHub link (`github.com/example/ferry`) in the material are placeholders, not real values — I'll need the real ones before anything goes live.

Here's the plan.

## The idea

Most "award-winning" portfolio sites are built for designers and show off motion for its own sake. Dawit's entire career is the opposite instinct — his job is to make huge, risky changes invisible. The site should resolve that tension instead of hiding it: it should *look* like an awwwards-tier site (3D, scroll-driven, cinematic) but the subject of all that motion is infrastructure, not abstract blobs — racks, nodes, data flowing between two databases, a cutover switch, an uptime line that never dips. The "wow" comes from precision and scale, not spectacle. Nothing should jank, nothing should stutter — the build quality of the site is itself proof of the pitch.

Recurring motif: a status-page aesthetic (the kind he stares at during on-call) — "all systems operational," a pulsing dot, monospace timestamps — used sparingly as a signature rather than a gimmick.

## The scroll, top to bottom

1. **Hero** — Near-black screen, a dim 3D diagram of two data centers (racks as simple geometric blocks) sitting still, a slow pulse like a heartbeat monitor. Headline: *"I move systems that are not allowed to stop."* A small live-feeling status line underneath ("on-call lead · 99.98% availability"). No scroll-jack yet — just breathing room.

2. **The migration (310 services)** — As the user scrolls, nodes peel off the two data-center racks one at a time and travel across the screen into a cloud shape, scrubbed directly to scroll position so it feels controlled, not autoplaying. Counters tick up next to it: services moved, months elapsed, and — held constant the whole time — **0 downtime**. The zero never moves; everything else does. That's the point of the scene.

3. **The database cutover (Postgres 11→15, 4TB, dual writes)** — Two database icons side by side, writes visibly duplicating between them as small pulses. A horizontal pipeline appears: *preflight → shadow → dual write → cutover → soak → decommission* (his own runbook stages), each stage lighting up as it enters view. At "cutover," a single deliberate switch-flip animation — the one moment of real drama in the whole site, earned by everything calm before it.

4. **On-call, before and after** — A clean line chart, pages-per-week dropping from 85 to 22 as you scroll (built per the dataviz skill's conventions — restrained, legible in both themes, no chart-junk). Paired with a short note on *why*: the runbook he wrote is now used by 40 teams.

5. **ferry (open source)** — A terminal-styled panel, dark, monospace. A short typed-out command demo of a dual-write cutover, GitHub star count, link to the repo. This is where his hands-on craft shows, not just leadership bullet points.

6. **The talk** — "Boring Migrations," SRE North 2024. Video thumbnail/embed, pull-quote from the talk if he has one.

7. **Experience, as a changelog** — Kestrel Freight → Lumen Pay → Entoto Technical University Library → BSc Electrical Engineering, styled like a runbook/git-log rather than a typical glossy timeline — plain, dated, monospace, in keeping with his own voice.

8. **Footer / contact** — A small persistent "status" motif returns: a green dot, "all systems operational," his real email, resume download, GitHub/LinkedIn. Quiet landing, no fireworks.

## What each part is actually proving

Every section maps to a real number or artifact he already has — nothing decorative: scale (310 services, 2 data centers), risk handled (4TB, zero downtime, no maintenance window), process maturity (the runbook, 40 teams), operational impact (85→22 pages), craft (ferry, 1.2k stars), and communication (the talk). If we don't have enough detail for a full case-study treatment of the migration or the Postgres upgrade (problem → approach → result, beyond the resume bullets), I'll flag that separately — the current material is enough for the motion design but fairly thin for deep narrative copy.

## Colour and type

- **Palette**: near-black (not pure black — a slightly blue-black terminal tone) background, warm off-white text, a single calm **status-green** accent for "operational" / success moments, and a restrained **amber** reserved only for the cutover moment. No gradients, no neon — this should read like a well-made internal tool, not a marketing site.
- **Type**: a monospace face for numbers, labels, timestamps, and the terminal section (reinforces the runbook/status-page feel), paired with a plain, confident grotesk for headings and body copy. Left-aligned, document-like layout rather than centered hero-text theatrics — closer to technical docs than an agency site.

## On a phone

Scroll-scrubbed 3D is the riskiest part on mobile, so it gets simplified rather than ported 1:1:
- Heavy WebGL scenes (migration flow, dual-write) become lighter SVG/CSS equivalents with far fewer nodes, or static frames that advance on simple scroll-into-view triggers instead of continuous camera scrubbing.
- Feature-detect WebGL support and device capability; fall back gracefully rather than force a low-end phone to render full 3D.
- Respect `prefers-reduced-motion` everywhere, not just on mobile.
- Timeline and pipeline stages stack vertically; multi-column diagrams collapse to one column.
- Real-device and throttled-network testing before calling it done — 3D assets are easy to make too heavy to load on a train.

## What else the site needs

- **Real contact details and GitHub handle** to replace the placeholders in the material.
- **Resume as a downloadable PDF**, kept in sync with the site copy.
- **Performance budget**: lazy-load the 3D library, code-split by section, compress assets — Lighthouse targets set up front rather than fixed after the fact.
- **Accessibility**: the site must stay fully navigable (including keyboard) if scroll-jacking is used anywhere; color contrast checked against the dark palette; alt text for diagrams.
- **SEO basics**: meta description, OG image, Person structured data, sitemap.
- **Browser matrix**: Safari in particular tends to be the weak link for WebGL performance — worth explicit testing.
- **Hosting/deployment** decision (e.g., Vercel/Netlify) and a domain.
- **Light analytics** (privacy-friendly, e.g. Plausible) if he wants to know anyone's actually looking.
- **An update path**: this will be a static, hand-built site — fine for one person's portfolio, but worth deciding now whether future changes (new talk, new star count) are manual edits or something more automated.

Let me know which parts you'd like to adjust — scene ideas, palette, pacing — and whether you can get me the real contact info and any extra detail on the two flagship migrations before we move to building.
