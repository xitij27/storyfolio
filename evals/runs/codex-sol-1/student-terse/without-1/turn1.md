I’ll review the material folder, then outline a visual direction, page structure, and approach to the 3D and scroll effects. I won’t build anything yet.


The strongest direction is **“Mina Park — engineering, in progress.”** A portfolio that feels like stepping into your workshop: precise CAD, worn steel, and real work you can inspect.

Your material gives it a clear focus: you’re a second-year mechanical engineering student who designs parts, fixes bikes, and learns by taking things apart. The site should make that compelling while keeping your experience honest.

### Visual direction

Use warm off-white, graphite, and one bright orange accent, with large typography, fine drawing lines, and small technical annotations. Mix clean CAD imagery with bike restoration photography—the contrast gives the site its character.

The centrepiece would be an interactive 3D pedal-box bracket, based on your actual CAD. As visitors scroll, it rotates from an overall view into the mounting details, then settles beside the project explanation. Movement should help people understand the work.

### Page structure

One continuous page, with quick links to **Work / About / Contact**.

1. **Introduction**
   “Mina Park. Mechanical engineering student.”
   A short line about designing, repairing, and understanding how things work. The bracket occupies the main visual area, with clear links to view your work and get in touch.

2. **Formula Student: the bracket**
   Your strongest engineering project comes first. Explain the original problem, your contribution, and the **18% weight reduction**, supported by CAD views and annotations. Show a before/after comparison if you have both versions.
   
   Identify you as a chassis sub-team member; keep team achievements separate from your own contribution.

3. **Slow Miles: the 1984 road bike**
   A photographic restoration story. Scrolling brings individual parts and close-ups into view, with captions about what you discovered.
   
   Feature the seized bottom bracket and cracked hub flange as examples of diagnosis and persistence. Link the five supplied post titles to the blog once working URLs are available.

4. **Hand-crank phone charger**
   A smaller project section showing the gear train and housing, with clear credit for the four-person group and your role.

5. **About and contact**
   Your degree, Saturday mechanic work at Second Gear Bike Co-op, and skills presented at their actual level—including “some Python” and workshop induction.
   
   Finish with placement availability, email, and a downloadable CV.

### Motion and 3D

- One main 3D scene, with scroll-driven camera movement and optional drag-to-rotate.
- Gentle photo reveals and drawing-line animations elsewhere.
- Short, bounded sticky sections; normal scrolling throughout.
- Static imagery for reduced-motion preferences and a lighter presentation on mobile.
- Content remains readable while the 3D model loads or if it cannot run.

A suitable implementation would use React, Three.js through React Three Fiber, and GSAP for coordinated scroll animation.

### Before building

The folder contains text, but no photos or CAD files yet. The design needs bracket exports or renders, bike photographs, and ideally charger images. Without a usable model, CAD renders can carry the same visual concept.

Two details need checking: the summer **2026** placement wording is now dated, and the Formula Student UK 2025 result predates your listed October 2025 start. Neither should become a misleading headline.

Build order would be: confirm content and assets → create the static layout → add 3D and motion → check mobile performance, keyboard access, and reduced motion.

**No files have been changed and nothing has been built.**
