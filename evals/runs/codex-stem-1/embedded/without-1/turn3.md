I recommend **“From code to current”**: a portfolio that uses a 3D sensor to introduce the physical device, then follows a firmware event through a state table, timing diagram, and current trace. The memorable part is seeing how you reason about hardware through software.

The site’s primary audience is a firmware hiring manager. Within the first screen, they should understand your specialty; after the Mosslink case study, they should understand your contribution and investigative method.

**1. Page structure and copy**

Build one continuous page with a compact navigation: **Mosslink · Approach · Experience · Contact**.

The opening would read:

> **Ada Mensah**  
> **From code to current.**  
> Embedded firmware engineer working on power-state scheduling, board bring-up, and physical devices.

Include **Explore Mosslink**, **Download CV**, and an email link. Your role at Reedglass Sensing, 2021–present, appears beneath the introduction.

The page then moves through the Mosslink case study, your working methods, a short experience summary, and contact. One well-supported project should carry the portfolio; there’s no need to fill space with invented projects or testimonials.

**2. Visual direction**

Use a charcoal background, warm white text, copper details, and green signal traces. Pair large editorial headlines with small monospace labels for states, events, and measurements.

The opening visual is a lightweight, stylized 3D environmental sensor. Label it as an illustrative model. Its purpose is to establish the physical context without suggesting that you designed the PCB or that the model reproduces the actual board.

Engineering documents become larger and more prominent as the story progresses. Keep body text readable and give diagrams generous space.

**3. The Mosslink scroll story**

| Scene | Content | Scroll behavior |
|---|---|---|
| Meet the device | Environmental sensing project and your responsibilities | The sensor rotates gently into view |
| Establish ownership | You: firmware, power-state scheduling, bring-up fixture. Colleague: PCB and analogue front end | The model settles beside clear responsibility labels |
| Describe expected behavior | Public-use power-state diagram, state table, and timing diagram | Relevant states and transitions highlight in sequence |
| Observe the fault | After a failed transmission, the radio remained awake | The timing event aligns with the current trace; unexpected draw highlights |
| Explain the investigation | How you used bench measurements and working documents to investigate the transition | Documents appear together so the reader can follow the connection |
| Ground the work | Your fixture photo, bench scope, and project limitations | Normal scrolling resumes for a concise evidence summary |

Use one short pinned sequence around the event-to-signal explanation. Keep the rest as normal scrolling, with navigation available throughout.

We will describe the observed fault and investigation. A completed fix, measured improvement, or precise trace values will appear only if supported by the material.

**4. Accurate project presentation**

Use these statements consistently across the page and downloadable CV:

- **Your contribution:** wrote firmware, scheduled power states, and built the bring-up fixture.
- **Battery estimate:** projected two-year battery life from bench current readings and an assumed reporting cycle. The longest continuous run was 72 hours; there was no supporting field-endurance or weather testing.
- **Hardware scope:** forty engineering samples assembled, six tested on the bench, and none deployed to customers.
- **Emissions:** one preliminary check passed; the full qualification programme is unfinished.

Avoid “owned the sensor design,” “field pilot,” “product launch,” “certified,” and “qualified.”

Place limitations beside the claims they qualify. Readers should not have to find a footnote to understand the evidence.

**5. Your working approach**

A compact section would explain three connected activities:

- **Describe behavior:** use state tables to make transitions and failure paths explicit.
- **Check timing:** use timing diagrams to connect firmware events with device activity.
- **Measure the result:** use oscilloscopes, logic analysers, and current measurements to check what the board actually does.

Introduce bring-up as **checking a new board’s basic operation**. Include C as a core tool, without adding languages, protocols, or expertise absent from your material.

**6. Assets and CV**

Use your permitted test-fixture photo and simplified power-state diagram. Exclude your colleague’s circuit diagram.

The files currently available are the CV and lab notes. During the eventual build, we would integrate the permitted visual assets when supplied. Any reconstructed explanatory trace would be visibly labeled **illustrative** and would avoid invented measurements.

Prepare a revised downloadable PDF CV with the corrected ownership, battery, sample, and emissions statements. Keep email and CV access available near both the opening and closing.

**7. Technical implementation**

Use React with TypeScript, React Three Fiber for the sensor, and GSAP for coordinated scroll animation.

The implementation would:

- Render the core text independently of the 3D scene.
- Load the 3D assets after essential page content.
- Use lightweight geometry and limited effects.
- Provide a static visual if WebGL is unavailable.
- Simplify animation on mobile.
- Show static scenes with all explanatory content when reduced motion is enabled.
- Preserve keyboard access, visible focus, readable contrast, and text explanations for diagrams.

**8. Build sequence and completion checks**

Once building is authorized:

1. Finalize page copy and the corrected CV.
2. Create the responsive layout and static case-study diagrams.
3. Integrate the permitted assets and illustrative sensor.
4. Add the scroll sequence connecting events, states, and current.
5. Check factual accuracy, asset permissions, mobile layouts, keyboard navigation, reduced motion, loading performance, email, and CV download.

The finished site should let a hiring manager quickly identify **what you owned, what you observed, how you investigated it, and what the evidence supports**—while giving them a distinctive visual experience.

This is the complete recommended plan. No files have been created or changed.
