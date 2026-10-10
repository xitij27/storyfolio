I’ll review the material folder and project context, then propose a visual direction, scroll interactions, and implementation plan. I won’t build anything yet.


I’d build the portfolio around **“Mina Park — learning by making.”** A scroll-led engineering workbench, with a rotating mechanical object, annotated project imagery, and details that reveal themselves as you move down the page. Distinctive, tactile, and honest about being a second-year student.

Your materials give it a strong focus: the pedal-box bracket, hands-on bike repair, and the 1984 road-bike restoration.

1. **Open with a moving workbench scene.**  
   Your name, “Mechanical engineering student in Sheffield,” and a short introduction alongside a slowly rotating 3D mechanical object. Scrolling changes its angle and brings measurement-style annotations into view. Ideally, use your actual bracket CAD; a clearly illustrative model can serve as a fallback. Keep “View my work” and contact immediately accessible.

2. **Make the bracket the main engineering story.**  
   A large project section follows the design from context to your contribution and the reported **18% weight reduction**. CAD views move between overview and detail as the reader scrolls. Explain what you changed, why, and how the result was measured once those details are available. Identify you accurately as a chassis sub-team member.

3. **Give the bike restoration its own visual identity.**  
   A photographic parts layout inspired by your “An inventory” post, with subtle depth and annotations. Introduce the restoration through the seized bottom bracket and cracked hub flange: specific experiences that reveal how you investigate problems. Link to the five Slow Miles posts once their real URLs are available.

4. **Keep supporting experience concise.**  
   A smaller card for the hand-crank charger, explicitly noting the group of four and your gear-train and housing work. Follow with Saturday work at Second Gear Bike Co-op, then a compact skills list with your stated experience levels. No skill percentage bars, invented testimonials, or inflated project claims.

5. **Finish with a direct placement invitation.**  
   A short about paragraph, current placement interests, and email contact. Add a downloadable CV when a suitable file exists.

The visual language would use warm off-white, graphite, and one vivid orange accent, with large clean typography and small technical annotations. Real workshop photography should bring texture and personality. Avoid a generic futuristic dashboard aesthetic.

Motion would concentrate on the opening 3D scene and bracket story, with lighter transitions elsewhere. Preserve normal scrolling, readable text, keyboard navigation, and reduced-motion preferences. Mobile would use simpler compositions; devices without WebGL would get a static image. Essential content would remain available while 3D loads.

For implementation, I’d use **React, Three.js through React Three Fiber, and GSAP ScrollTrigger**, with semantic HTML for all portfolio content. Build in this order: content and layout → responsive static page → project imagery → 3D and scroll choreography → accessibility and performance checks.

Before building, three content issues need resolving:

- The folder contains text only. The referenced bike photos and CAD images/model would supply the main visuals.
- “Summer 2026 placement” is now past; the current placement target needs updating.
- The team’s July 2025 competition result predates your October 2025 joining date. I’d omit it unless clearly presented as historical team context.

No files have been changed and nothing has been built.
