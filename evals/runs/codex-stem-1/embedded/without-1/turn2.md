The portfolio should center on **how you connect firmware decisions to measurable signals**. The 3D device establishes context; the state table, timing diagram, and current trace demonstrate your engineering judgment. I’m continuing the planning only.

The revised page would follow this structure:

1. **Introduction**

   **Ada Mensah — Embedded firmware engineer**  
   “I connect code to measurable signals.”

   Supporting copy: “Firmware, power-state scheduling, and board bring-up for physical devices.” Include your Reedglass Sensing experience, interest in firmware roles, and email and CV links.

   A restrained, stylized 3D sensor introduces the physical system. It would be presented as an illustration, without implying you designed the PCB.

2. **Mosslink: from firmware state to current trace**

   This would be the main scroll sequence:

   - **Establish the system.** Explain the environmental sensor and divide responsibilities clearly: you wrote firmware, scheduled power states, and built the bring-up fixture; your colleague designed the PCB and analogue front end.
   - **Explain expected behavior.** Your public-use power-state diagram introduces the operating cycle. A state table and timing diagram show how firmware controls when components wake and sleep.
   - **Reveal the observation.** Scrolling aligns a failed-transmission event with the current trace, showing the radio remaining awake. Annotations connect the software transition to the measured electrical behavior.
   - **Show your method.** Explain how you used working documents and bench measurements to investigate the issue. Include your fixture photo and define bring-up plainly as checking a new board’s basic operation.

   Until supporting measurements are available, any recreated trace would be labeled illustrative. We would make no claims about a completed fix or measured improvement without evidence.

3. **Project evidence and limits**

   Present these beside the relevant story, in readable text:

   - **Battery:** projected two-year life from bench current readings and an assumed reporting cycle. Longest continuous run: 72 hours. No field-endurance or weather validation.
   - **Hardware:** forty engineering samples assembled; six tested on the bench. No customer deployment.
   - **Emissions:** one preliminary check passed; the full qualification programme remains unfinished.

   The downloadable CV should use these same statements and accurately describe your firmware and fixture responsibilities.

4. **Visuals and interaction**

   Keep the dark workbench direction, with copper accents and green current traces. As the user scrolls, the device recedes and the engineering documents become the focus. Motion should guide attention between a code event, a state transition, and a signal.

   Use your permitted fixture photo and simplified power-state diagram. Exclude your colleague’s circuit diagram. On mobile and with reduced motion enabled, show the complete narrative as readable static sections.

5. **Closing and eventual build order**

   Finish with a compact experience section, **Email Ada**, and **Download CV**.

   After plan approval: finalize accurate copy and CV content, lay out the case study, integrate permitted assets, add 3D and scroll animation, then check mobile usability, accessibility, and performance.

Nothing has been built or changed.
