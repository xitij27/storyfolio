I’ll review the material folder and project setup, then propose a portfolio concept with 3D, scroll interactions, and a clear build plan. I won’t build anything yet.


I’d build the portfolio around **“Mina Park — learning by making.”** A distinctive mechanical design notebook: expressive 3D, workshop photography, and scroll motion grounded in your actual work.

Your note sets the tone: confident about what you’ve done, honest about being a second-year student. No invented testimonials, inflated titles, or oversized claims.

**Visual direction**

Warm off-white backgrounds, graphite text, and a single orange accent inspired by workshop markings. Large editorial headings paired with small technical annotations. Bike photography and CAD images would give it personality.

The signature interaction would be a **3D exploded assembly** that gradually comes together as visitors scroll. Ideally, this would use your actual pedal-box bracket CAD. Until a suitable model is available, the design should work with CAD stills; any decorative 3D should be clearly illustrative.

**Page plan**

| Section | Content | Movement |
|---|---|---|
| Introduction | “Mina Park. Mechanical engineering student, bike mechanic, maker.” Placement interest and direct links to work and contact. | A slowly rotating assembly beside the introduction, responding subtly to the pointer. |
| Pedal-box bracket | Lead project: your chassis sub-team role, the redesign, and the reported 18% weight reduction. | A short scroll sequence separates the assembly, highlights the bracket, then brings it together. Supporting text stays readable. |
| Slow Miles | Your 1984 steel road-bike restoration, connected to your Saturday work at Second Gear Bike Co-op. | Photos progress from the original bike to parts laid out and repair details, with restrained depth effects. |
| Hand-crank charger | A compact project story describing your gear-train and housing work within a group of four. | An annotated image; optional gear motion if the available assets support it. |
| Workshop notes | The five supplied Slow Miles post titles and summaries, including “The bottom bracket fought back.” | Simple reveals and small hover effects. |
| About and contact | Degree, practical experience, accurately described skills, and a clear email link. | A quiet ending with minimal motion. |

The bracket case study would explain **problem → your contribution → design decisions → result → what you learned**. We have enough for its outline, but should gather the missing details before writing that story.

**Motion and usability**

Use one memorable 3D sequence, with lighter movement elsewhere. Keep normal scrolling, avoid scroll hijacking, and make all content accessible without the canvas. On mobile, simplify the scene; for reduced-motion preferences, show static compositions. Load text and primary imagery before the 3D assets.

**Proposed build approach, after approval**

1. Confirm content and choose bike/CAD images.
2. Create desktop and mobile layouts with the actual copy.
3. Build the responsive site using React, with React Three Fiber for 3D and GSAP for scroll choreography.
4. Add motion progressively, then check keyboard access, reduced motion, mobile performance, and contact links.

**Details to resolve before building**

The material folder contains three text files, but no photos or CAD assets yet. The summer **2026** placement target also needs updating or confirming. The Formula Student result predates your listed October 2025 start, so it should not imply your bracket contributed to that result. The supplied email and blog address appear to be placeholders.

Nothing has been built or changed.
