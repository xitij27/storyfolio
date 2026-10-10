I've reviewed both files in `material/` — this is for **Ines Okafor**, Head Chef at Saltmarsh (Leeds), a fermentation-focused restaurant. Here's the plan.

## Concept
Build the site around the kitchen's actual metaphor — **the jar wall / larder** — rather than a generic dev-portfolio template. 3D and scroll-motion should illustrate fermentation (things filling, aging, transforming) rather than be decorative.

## Section map (content → treatment)

1. **Hero** — "Ines Okafor / Head Chef at Saltmarsh" + one-line about. 3D: a row of jars rendered in WebGL, liquid shader catching light as the camera drifts slightly on scroll.
2. **Philosophy** — "Most of what I care about happens before service" (trim, whey, stems, bones). Simple scroll-triggered text reveal, no 3D needed — let it breathe.
3. **The Jar Wall** (interactive centerpiece) — 40+ ferments/vinegars/garums "on rotation." Scroll fills jars one by one; hover/tap a jar reveals a label (ferment name, what it's made from). This is the signature 3D moment.
4. **The Larder** — photo gallery: restaurant shots (by Priya Nair, credited), her own phone photos of labels. Scroll-pinned horizontal scroll or masonry with parallax depth.
5. **Path to here** (Experience) — timeline from Leeds Kitchen College (2014) → Brassica, Manchester → Fjaerland Fermentation Lab, Norway → Corn Exchange Kitchen → Saltmarsh. Treated as a route/journey the camera travels down as you scroll, with the food-waste and supplier-count stats surfacing as milestones (14kg→5kg, 31→12 suppliers, 2 apprentices/year since 2023).
6. **Ask me about...** — FAQ-style section: the jar wall, the koji room ("it's a cupboard" — keep her voice/humor), staff meal, first-Monday workshops.
7. **Brine** — the zine. 3D flip-book or stacked-pages reveal of the 4 scanned issues, Olu's drawings as the visual anchor.
8. **Sunday Pot** — volunteering, St Aidan's hall. Quieter section, grounds the story in community.
9. **Recommendation** — Callum Reyes quote, simple full-bleed treatment.
10. **Contact / footer.**

## Visual direction
Earthy palette (glass jar amber/brine tones, dark wood, cream paper for the zine), warm editorial typography, grain texture — avoid generic "tech portfolio" neon/glass look.

## Tech stack
- Next.js + TypeScript, Tailwind
- React Three Fiber + drei for the jar wall / hero 3D
- GSAP ScrollTrigger (or Lenis smooth-scroll + Framer Motion) for scroll-linked motion
- Static export, deployable to Vercel

## Gaps before building
- **No actual images in `material/`** — only the two markdown files. I'll need the ~60 restaurant photos, phone photos of labels, the 4 Brine scans, and the ogiri pot photo (or placeholders to swap in later).
- No contact info / email / social links in the notes — need those for the footer.
- Should confirm: is this Ines's own site to self-publish, or are you building it on her behalf for a project? (Doesn't change the build, just curious for framing/tone.)

Let me know if you want to adjust the section order or emphasis, and whether to proceed with placeholder imagery or wait for real assets.
