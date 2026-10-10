I recommend **“Mina Park — Workshop Logbook”**: a portfolio built around real engineering decisions, with your bracket as the 3D centrepiece and your bike restoration as a photographic record.

It should feel distinctive immediately and let a placement reviewer understand your experience within two minutes.

### 1. Purpose and priorities

The site should answer five questions quickly:

- Who are you?
- What have you worked on?
- Which parts were yours?
- What evidence supports the results?
- How can someone contact you?

Your second-year status belongs near the top. The strength of the portfolio is your practical experience and clear account of your work.

### 2. Visual identity

Use a workshop-logbook aesthetic:

- Warm off-white background, graphite text, and orange accents.
- Large, readable headings paired with compact technical labels.
- Fine rules and restrained drawing annotations.
- CAD imagery alongside photographs of worn parts and workshop surfaces.
- Generous spacing so the page remains easy to scan.

Avoid simulated wear, decorative instrument panels, and technical labels that imply measurements you haven’t supplied. The actual parts and photographs should provide the character.

### 3. Page structure and content

Build one main page with **Work, About, Contact**, plus a visible CV link.

**Introduction**

Suggested opening:

> **Mina Park**  
> Second-year mechanical engineering student.  
> I design parts, repair bikes, and document what I find.

Include Hallam Institute of Technology, Sheffield, a placement-interest line once the target dates are confirmed, and **View my work / Download CV / Email me**.

The bracket appears beside this introduction. Readers can continue immediately while it loads.

**Project 1 — Pedal-box mounting bracket**

This is the lead engineering project.

Its first visible summary should state:

> **18% lighter in CAD**  
> Hallam Racing · Chassis sub-team · October 2025–present  
> Simulation complete. Manufacture planned for November. Physical testing pending.

Then use the logbook structure:

| Entry | Content |
|---|---|
| Brief | What the bracket needed to do and the reason for redesigning it |
| Findings | Constraints and issues identified in the existing design |
| My work | The design changes you personally made |
| Evidence | CAD comparison and simulation results, with their conditions |
| Next step | Machining, followed by physical checks and testing |

Only include details you can substantiate. Do not describe the weight reduction as a manufactured or tested result. Omit the team’s July 2025 placing.

**Project 2 — Restoring a 1984 steel road bike**

Open with a real photograph of the parts laid out on the garage floor. This becomes the site’s second memorable visual.

Use selected entries rather than an exhaustive gallery:

- **Inventory:** how you decided to keep, fix, or replace parts.
- **Bottom bracket:** the seized cup and what you should have checked first.
- **Rear wheel:** finding the cracked hub flange.
- **Paint removal:** what you discovered and would approach differently.

Each entry follows the same sequence: problem, finding, work, check, current status. Where a check or repair remains incomplete, say so.

Include the five supplied Slow Miles post titles as links once their URLs are available. The supplied titles and excerpts are enough to plan this section; full repair accounts still need your notes.

**Project 3 — Hand-crank phone charger**

A compact section with a photograph, CAD view, or gear-train diagram.

Make attribution and performance prominent:

> First-year group project · Four students  
> My contribution: gear train and housing  
> Observed result: four minutes of cranking for one percent of charge.

Follow with the design decisions you made and what you learned. Any explanation of the poor performance should come from your evidence, not an assumed diagnosis.

**About and practical experience**

A short paragraph about your degree and Saturday mechanic work at Second Gear Bike Co-op.

Describe the work through your actual process: customer report, inspection, parts, repair, and test ride. Avoid a numerical bike count.

List skills accurately:

- SolidWorks
- MATLAB
- Some Python
- Lathe and mill workshop induction

**Contact**

Finish with a direct placement-interest statement, email, CV download, and Slow Miles link. Keep contact available from the top as well.

### 4. 3D and scroll behaviour

The motion should reveal information without making readers wait.

**Bracket**

Use your actual CAD geometry, prepared as a lightweight web model. Scroll gently rotates it between an overall view and a useful detail view. An optional drag interaction allows closer inspection.

Annotations should point to changes you actually made. Any before/after geometry must come from the real designs. Keep the full project summary outside the animated scene.

**Bike**

Begin with the parts-inventory photograph. As readers scroll, selected close-ups enter alongside their logbook entries. A restrained transition can connect the overview to the relevant component without requiring a long pinned sequence.

**Elsewhere**

Use subtle image and text reveals, clear hover states, and brief transitions. Avoid scroll hijacking, automatic continuous spinning, and an introductory loading sequence.

### 5. Mobile and accessibility

Mobile gets the same content order with stacked images and concise summaries. Use a static bracket render by default if interactive 3D would compromise responsiveness.

Support reduced-motion preferences, keyboard navigation, visible focus states, readable contrast, and descriptive image text. No essential information should depend on animation, dragging, or hovering.

### 6. Assets and factual preparation

Before implementation, assemble:

- Bracket CAD export, preferably STEP or a suitable mesh, plus static renders.
- Original and revised bracket views, if available.
- Simulation screenshots and notes explaining the comparison and conditions.
- Bike inventory photograph and selected repair close-ups.
- Charger images and brief notes on your design decisions.
- Current CV and working blog URLs.
- Confirmed placement dates and the year of the planned November machining.

Choose images for what they demonstrate. Captions should explain why each image matters.

### 7. Technical approach

Use React with a lightweight build setup, React Three Fiber for the bracket, and GSAP for coordinated scroll movement. Keep written project content separate from animation code so it is easy to update.

Load text and primary images first; load 3D afterward. Compress images and model geometry, provide a static fallback, and avoid unnecessary effects or dependencies.

The site needs no backend initially.

### 8. Implementation sequence and acceptance criteria

Once building is authorised:

1. Finalise factual copy and select assets.
2. Lay out the complete static page for desktop and mobile.
3. Prepare and integrate the bracket model.
4. Add scroll effects and reduced-motion alternatives.
5. Check accessibility, performance, links, and content accuracy.

The finished site should let a reviewer identify your student status, bracket contribution and validation limits, practical repair experience, and contact details within two minutes. It should remain useful with animation disabled and on a phone.

**This is the complete proposed plan. No files have been changed and nothing has been built.**
