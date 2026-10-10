I'll start by reviewing the material folder to understand what content we have to work with.

Here's the plan for Ines Okafor's portfolio, built around the material you've given me.

## Concept: "The Larder"
Rather than a generic chef template, the site is structured as a walk through Ines's larder — from raw trim to finished ferment — matching her own framing ("most of what I care about happens before service"). Scroll position maps to fermentation progress, which is also where the 3D/motion work earns its place instead of feeling bolted on.

## Section-by-section

1. **Hero** — A 3D jar wall (WebGL, procedural glass + liquid shader) with subtle parallax/rotation on scroll. Name, title, one-line philosophy, scroll cue.
2. **Philosophy** — Scroll-revealed text on trim/whey/stems/bones ethos. Animated counter for the 14kg→5kg waste reduction.
3. **Timeline** — Brassica → Corn Exchange → Fjaerland (Norway) → Saltmarsh, staged as a single jar whose brine level and contents evolve as you scroll through the years.
4. **The Larder** (signature interactive piece) — 3D shelf grid standing in for the 40+ ferments/vinegars/garums; hover or click reveals a name and note.
5. **Ask Ines** — jar wall, koji cupboard, staff meal, monthly workshops — short answers styled like cards pinned in the kitchen.
6. **Brine** (the zine) — 3D page-turn/flipbook through the four issues.
7. **Apprentices & Sunday Pot** — warmer, community-toned section on the volunteering and mentorship work.
8. **Recommendation** — Callum Reyes's quote, kept simple.
9. **Contact / Workshop CTA** — booking or contact info.

## Tech approach
React + Vite, **react-three-fiber** (Three.js) for the jar/shader work, **GSAP ScrollTrigger** (or Framer Motion + Lenis) for scroll-driven sequencing. Reduced-motion and low-end-device fallbacks (static imagery instead of WebGL) so it doesn't exclude anyone.

## Gaps before I can build this
- **No images exist yet** — `material/` has only text. The 60 restaurant photos, your larder phone photos, the Brine scans, and your grandmother's ogiri pot photo aren't in the folder. I can build with placeholders, but real images matter a lot for a visual site like this.
- **Larder contents** — notes mention "40+ ferments" but no specific names/flavors for the interactive shelf. Do you want me to invent plausible placeholders, or will you supply a real list?
- **Contact/booking info** — no email, phone, Instagram, or workshop sign-up method given.
- **Brand feel** — no color/type preference stated. I'd default to something earthy/warm (ferment tones) unless you want a different direction.

Let me know how you want to handle those gaps, and whether the overall direction above works, before I start building.
