Recommendation: **Lenis (smooth scroll) + GSAP ScrollTrigger**, not Framer Motion — GSAP's ScrollTrigger gives finer control for pinning sections and scrubbing 3D camera/jar-fill animations frame-by-frame, which matters more here than Framer Motion's component-transition strengths. Full consolidated plan below.

## Concept
Ines Okafor's portfolio for Saltmarsh, built around the kitchen's real operating logic — the **prep list and ferment log** — rather than a generic chef-bio template. 3D and scroll motion illustrate fermentation itself (jars filling, aging, becoming ready) rather than being decorative.

## Tech stack
- Next.js + TypeScript, Tailwind
- React Three Fiber + drei (hero jars, jar-wall centerpiece)
- Lenis for smooth scroll + GSAP ScrollTrigger for scroll-linked/pinned animation and camera moves
- Static export → Vercel

## Visual direction
Earthy palette: jar-amber and brine tones, dark wood, cream paper for the zine, grain texture. Warm editorial type. No neon/glass "tech portfolio" look.

## Section map

1. **Hero** — "Ines Okafor, Head Chef at Saltmarsh." 3D row of jars, liquid shader, subtle camera drift on scroll.
2. **Philosophy** — "Most of what I care about happens before service" (trim, whey, stems, bones). Plain scroll-reveal text, no 3D — let it breathe. Line about the prep list and ferment log driving the week, menu written last.
3. **The Jar Wall** (centerpiece) — 40+ ferments/vinegars/garums on rotation. Scroll fills jars in sequence; hover/tap a jar opens its **ferment-log card**: start date, salt %, check-in days, ready date. This is the signature interactive moment and it's accurate to how the kitchen actually runs.
4. **The Larder** — gallery of Priya Nair's restaurant/jar-wall photos (credited inline: "Photos: Priya Nair") plus Ines's own phone photos of labels. Parallax/pinned horizontal scroll. No staff faces.
5. **Path to here** — scroll-driven timeline:
   - Leeds Kitchen College, Diploma in Professional Cookery, 2014–2016
   - Chef de Partie, Brassica, Manchester, 2016–2019
   - Stage, Fjaerland Fermentation Lab, Norway, Jan–Mar 2018 — ten weeks, unpaid: washed and labelled jars, helped on two batches of garum (explicitly not framed as research)
   - Sous Chef, The Corn Exchange Kitchen, Leeds, 2019–2022 — brought supplier list from 31 to 12 (no pricing shown)
   - Acting Head Chef, Saltmarsh, from March 2022 → **Head Chef** title from **September 2022**
   - Milestone stat: "we cut prep and plate waste from 14kg to 5kg a week" — whole-kitchen figure, weighed over one month in 2023, bones excluded (go to stock)
6. **Ask me about...** — FAQ in Ines's own words: the jar wall, the koji room ("it's a cupboard"), staff meal, first-Monday workshops.
7. **Brine** — the zine. 3D stacked-pages/flip reveal for the 4 issues. **Built with placeholders until Ines clears Olu's drawings** — do not publish his art without confirmation.
8. **Sunday Pot** — volunteering at St Aidan's hall, co-founded 2021.
9. **Recommendation** — Callum Reyes's quote (cleared to use), full-bleed.
10. **Contact/CTA** — apprentice programme application, press/media contact, workshop booking. No "hire me" framing — she isn't job-seeking.

## Before building
- Need the actual image files (Priya's ~60 photos, Ines's phone photos, the ogiri pot photo) — currently only `notes.md` and `linkedin.md` exist in `material/`.
- Need contact details (email/booking link) for section 10.
- Olu's drawings stay as placeholders until he's confirmed — flag to you again before swapping any in.

Say go and I'll start scaffolding with placeholder imagery where real assets aren't in hand yet.
