## Final plan — Ines Okafor portfolio

**Concept: "The Larder"** — the site moves like a walk through her kitchen, from raw trim to finished ferment, matching her own framing that most of the work happens before service. Built for apprentice applicants, food writers, and workshop bookers — no "hire me" framing, no supplier pricing, no staff faces without consent.

### Sections

1. **Hero** — 3D jar wall (WebGL glass/liquid shader), subtle parallax on scroll. Name, title, one-line philosophy, scroll cue.
2. **Philosophy** — Scroll-revealed copy on trim/whey/stems/bones. Stat: "We cut prep and plate waste from 14kg to 5kg a week" (prep/plate only, bones excluded, measured over one month in 2023) — worded as a one-time measured result, not a live metric.
3. **Timeline** — Brassica (Sep 2016–May 2019) → Corn Exchange, sous chef (Jun 2019–Feb 2022) → Fjaerland, 10-week unpaid stage: washing/labelling jars, two batches of garum (Jan–Mar 2018, placed in correct chronological slot) → Saltmarsh, acting head chef from March 2022, Head Chef title from September 2022. A single jar's brine level/contents evolve as you scroll through the years.
4. **The Larder** — interactive view of her actual ferment log (date started, salt %, check-in days, ready date), not invented flavor notes. Launches with a small set of placeholder log entries clearly marked as placeholder, swapped for real ones when supplied.
5. **Ask Ines** — jar wall, koji cupboard, staff meal, first-Monday workshops, styled as cards pinned in the kitchen.
6. **Brine** — zine section built text-only/"issues coming soon" until Olu clears use of his drawings; swaps in scans later with no rebuild needed.
7. **Apprentices & Sunday Pot** — apprenticeship programme (two a year since 2023) and the volunteering work, warmer tone, no staff faces by default.
8. **Recommendation** — Callum Reyes's quote, cleared for use.
9. **Contact** — apprenticeship enquiries, workshop booking, press/media — via a simple mailto link as placeholder until a real address or booking link is supplied.

### Visual direction
Earthy, warm ferment tones (jar-glass, brine, charred-wood), no stated brand preference so this is my default rather than a confirmed choice.

### Tech stack
React + Vite, **react-three-fiber** (Three.js) for the jar/shader work, **GSAP ScrollTrigger** for scroll-driven sequencing, reduced-motion and low-end-device fallbacks (static imagery swapped in for WebGL) throughout.

### Still open, not blocking
- Real ferment-log entries, Priya-credited photos, her own phone photos/pot photo, and a real contact/booking address — site builds now with clearly marked placeholders and swaps cleanly once you send these.
- Brine visuals wait on Olu's sign-off.

Say go and I'll start building.
