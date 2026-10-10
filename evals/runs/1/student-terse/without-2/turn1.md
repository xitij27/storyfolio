I'll look through the material folder first to see what content I have to work with.

Read through the material — here's what I have to work with, and a flag before the plan.

**Content available:** Mina Park, 2nd-year Mechanical Engineering (Hallam, Sheffield), looking for a summer 2026 placement. Two projects (Formula Student pedal bracket, hand-crank charger), one job (bike co-op mechanic), basic skills list, and a 5-post blog about restoring a 1984 bike. No image files are in the folder yet — only text.

**Tension to flag:** `message.md` explicitly says not to make this look like more than a second-year is — but you're asking for a site that "really stands out" with 3D/scroll effects. Those aren't incompatible, but it means the flashiness should come from craft and relevance (e.g., a 3D treatment of the actual pedal bracket, scroll-driven storytelling through the bike restoration) rather than generic showy WebGL. I'd lean restrained-but-polished rather than maximalist.

**Proposed plan:**

1. **Stack:** React + Vite, `react-three-fiber`/Three.js for the 3D piece, Framer Motion (or GSAP ScrollTrigger) for scroll-linked animation. Static site, deployable anywhere (Vercel/Netlify/GitHub Pages).
2. **Structure:**
   - **Hero** — name, year/program, one-line placement goal. Centerpiece: a stylized 3D object evoking the pedal bracket (low-poly/wireframe, since we only have CAD *screenshots*, not real geometry — I won't fake it as her actual model).
   - **About** — short, honest bio pulled straight from the CV.
   - **Projects** — Formula Student bracket (18% weight reduction, team result) and the hand-crank charger, each with a small supporting visual.
   - **Work** — bike co-op mechanic, framed as hands-on mechanical experience.
   - **The restoration story** — scrollytelling section built from the 5 blog posts in chronological order (bought broken bike → inventory → paint stripping → wheel truing → bottom bracket), since that's literally a narrative arc and the strongest "stands out" opportunity. Parallax/layered photos as you scroll rather than full 3D here, to keep it light and in good taste.
   - **Skills** — simple badge/list treatment.
   - **Contact/footer** — email, link to the Slow Miles blog.
3. **Guardrails:** respect `prefers-reduced-motion`, degrade gracefully on mobile/low-power devices, keep 3D scoped to one or two moments rather than everywhere.

**Before I build, a few things I need:**
- Do you have actual photos (bike, bracket CAD screenshots) to drop in, or should I use placeholders for now?
- Any visual direction — e.g. blueprint/engineering drafting aesthetic, or steel/bike-restoration aesthetic?
- OK with linking out to the real Slow Miles blog rather than reproducing full post text?
- Any hosting preference, or should I just set it up to run locally first?
