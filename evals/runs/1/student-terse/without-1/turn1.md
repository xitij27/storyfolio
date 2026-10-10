I'll look at the material folder to understand what content is available before planning.

I reviewed the three files. Here's the content and the plan.

**What's actually in the material folder**
- `cv.md`: Mina Park, 2nd-year BEng Mechanical Engineering (Hallam, Sheffield), seeking a **summer 2026 placement**. Two projects (Formula Student pedal-box bracket redesign, 18% lighter, team placed 12th/68; a group hand-crank charger project), one job (bike co-op mechanic since 2023), modest skill list (SolidWorks, MATLAB, some Python, lathe/mill).
- `blog.md`: "Slow Miles" — 5 posts chronicling a 1984 steel bike restoration (inventory, paint stripping, wheel truing, bottom bracket).
- `message.md`: a direct note from Mina — she has bike photos and CAD screenshots of the bracket, **no one has written testimonials about her**, and she explicitly asks that the site **not make her look like more than a second-year.**

**There's a real tension to flag before I plan further:** you asked for a site that "really stands out" with 3D and scroll effects, but Mina's own instruction is to avoid overselling. I don't think these conflict if the motion/3D is tied to *real* content (the actual bracket CAD, the actual bike restoration) rather than generic flashy-portfolio tropes — but I want to design toward "honest and well-crafted," not "trying to look senior."

**Proposed structure**
1. **Hero** — name, "2nd-year Mechanical Engineering, looking for a summer 2026 placement," subtle 3D element (e.g., a simple rotating wireframe gear/bracket), scroll-down cue.
2. **About** — short, plain-spoken paragraph pulled straight from her own framing, not inflated.
3. **Formula Student project** — the bracket redesign as the centerpiece: if you can provide the actual CAD export (STL/GLB), I'd render it interactively (rotate/explode on scroll); otherwise a styled image treatment, not a fake 3D model. Stats (18% lighter, 12th/68) shown plainly, not as marketing badges.
4. **Hand-crank charger project** — smaller, simple card.
5. **Workshop skills** — SolidWorks/MATLAB/Python, lathe/mill — understated icons/list, no inflated proficiency bars.
6. **Bike co-op work** — short.
7. **Slow Miles** — this is where scroll storytelling earns its keep: a scrollytelling timeline through the 5 real posts using her actual photos (inventory → paint → wheel → bottom bracket), since this is where she has the most authentic material.
8. **Contact** — email, link to Slow Miles.

**Tech approach**
- React + Vite + Tailwind; Three.js (react-three-fiber) for the one or two real 3D elements; GSAP ScrollTrigger or Framer Motion for scroll-linked reveals; respect `prefers-reduced-motion`.
- Keep 3D scoped to content she actually has (bracket CAD, bike), not decorative generic shapes everywhere.

**Open questions before I build**
1. Do you have the actual bracket CAD file (ideally exported as glTF/GLB/STL) and the bike photos as files, or just descriptions? Real 3D needs real assets.
2. Any color/visual direction (workshop/industrial, bike-y, minimal)?
3. Deploy target — GitHub Pages, Vercel, Netlify, or just local?

Let me know on those and whether this structure feels right, then I'll build.
