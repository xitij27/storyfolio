I’ll review the material folder and project context, then propose a visual direction, scroll interactions, and a build plan. I won’t create or change any files.


I’d build this around **“Making the invisible visible”**: a portfolio where a 3D sensor and an animated current trace reveal how you diagnose physical devices. That gives the motion a purpose and makes the site distinctly yours.

I reviewed [your CV](/tmp/storyfolio-evals/codex-embedded-without-jCEJRF/material/cv.md) and [your lab notes](/tmp/storyfolio-evals/codex-embedded-without-jCEJRF/material/lab-notes.md). Here’s the proposed plan.

1. **Visual direction**

   A dark engineering workbench: charcoal backgrounds, warm white typography, copper accents, and luminous green traces. Large, clear headlines paired with small instrument-style labels.

   The central visual would be a stylized 3D environmental sensor, slowly rotating beside your introduction:

   **Ada Mensah**  
   *Embedded systems engineer*  
   “I bring physical devices to life—and trace the faults that keep them awake.”

   Your role at Reedglass Sensing, firmware career interests, and links to the case study and contact would be immediately visible.

2. **A scroll-driven Mosslink story**

   One substantial case study would carry the site. Scrolling would move the sensor through three scenes:

   - **The device:** an exploded view introduces sensing, radio, and power management, alongside your ownership of low-power design, bring-up, and verification.
   - **The investigation:** the camera moves toward a current trace. A failed transmission leaves the radio awake; the trace highlights the unexpected draw.
   - **The engineering process:** a state table and timing diagram explain how you investigated the transition, supported by bench checklists.

   The notes don’t document the final fix or a verified before-and-after result. The story should explain the observed fault and your diagnostic approach without inventing an outcome.

3. **Careful, credible project claims**

   The lab notes qualify several CV statements. The site should use the more precise wording:

   | Topic | Planned wording |
   |---|---|
   | Battery life | Estimated two-year battery life from measured current and an assumed reporting interval; longest recorded continuous run: 72 hours |
   | Hardware scale | Forty engineering samples assembled; six represented in the bench log |
   | Emissions | Preliminary emissions report available; final qualification status unconfirmed |
   | Ownership | Owned low-power sensor design, bring-up, and verification |

   Only two Markdown files are present. The photo, traces, and reports mentioned in the notes aren’t included, so initial visuals would be clearly illustrative. A schematic-style 3D model would avoid implying we have the actual PCB geometry.

4. **Supporting sections**

   After Mosslink, a compact “How I work” section would connect C, oscilloscopes, logic analysers, state tables, and timing diagrams to practical engineering work.

   A short experience section would show Reedglass Sensing, 2021–present. The closing contact section would state that you’re seeking embedded firmware roles involving physical devices, with an email link.

5. **Motion and implementation**

   Proposed stack: React with TypeScript, Three.js through React Three Fiber, and GSAP for coordinated scroll animation.

   Most of the page would use normal scrolling, with one short pinned sequence for the investigation. Text would remain readable independently of the animation. Mobile would use a simpler device view; reduced-motion mode would show static scenes and the complete story. Lightweight geometry, deferred 3D loading, and a static fallback would keep the site responsive.

   Once you approve the direction, the build would proceed through content and layout, the 3D sensor scene, scroll choreography, then mobile, accessibility, and performance checks.

**Nothing has been built or changed.**
