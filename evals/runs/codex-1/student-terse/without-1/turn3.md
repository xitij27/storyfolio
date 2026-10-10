I recommend **“The Workshop Logbook”**: a portfolio built around how you actually work—record the problem, investigate it, make a change, check the result.

It should feel like Mina’s working record, with real parts, CAD, photographs, and honest conclusions. An engineering placement reviewer should understand your strongest work in two minutes, with deeper detail available when they want it.

**1. Audience and priorities**

The page needs to answer five questions quickly:

- Who are you, and what placement are you seeking?
- What have you personally contributed?
- How do you approach an engineering problem?
- What has been demonstrated, and what remains untested?
- How can someone contact you or download your CV?

Use one main page with optional expandable project notes. Essential information must be visible without opening anything or waiting for animations.

**2. Page structure and proposed content**

| Section | Content | Purpose |
|---|---|---|
| Introduction | Name, course, Sheffield, placement interest, contact and CV links | Establish who you are immediately |
| Bracket | Your contribution, CAD weight reduction, simulation, manufacturing status | Lead with relevant engineering work |
| Bike restoration | Parts inventory and one diagnostic story | Show observation and practical judgment |
| Phone charger | Your scope, outcome, lessons | Demonstrate teamwork and reflection |
| Experience and skills | Co-op work, tools, workshop experience | Give concise supporting evidence |
| Contact | Placement invitation and email | Make the next step easy |

The opening copy would be close to:

> **Mina Park**  
> Second-year mechanical engineering student in Sheffield.  
> I work on chassis components with Hallam Racing, repair bikes at a co-op, and am restoring a 1984 steel road bike. I’m looking for a placement in mechanical or product design.

The placement period must be confirmed before publication; the original summer 2026 target is past.

**3. Main project: pedal-box mounting bracket**

Give this the most space. The summary should state:

> **Pedal-box mounting bracket — Hallam Racing**  
> Chassis sub-team member since October 2025.  
> Redesigned bracket: 18% lighter in CAD, with simulation work completed. Not yet manufactured or physically tested; machining planned for November.

Use a consistent logbook structure:

- **Requirement:** what the mounting bracket needed to do and which constraints mattered.
- **My work:** the changes you personally made.
- **Design record:** annotated CAD views explaining those changes.
- **Evidence:** the mass comparison and relevant simulation results, with assumptions and limitations.
- **Next check:** machining and physical verification.

The precise engineering explanations depend on your records; they should not be inferred from images. Keep the untested status beside the result, rather than burying it in a footnote.

Leave out the July 2025 team placing. It predates your membership and contributes little to this story.

**4. Bike restoration: the photographic centrepiece**

Use your garage-floor parts photographs to create a visual inventory. This is the strongest opportunity to make the site unmistakably yours.

Start with the complete layout, then focus on a few components. Each selected component can carry a short note drawn from your records: condition, finding, action, and outcome.

Feature the cracked hub flange as a diagnostic story if your photographs and write-up support it:

> **Why the rear wheel was never true**  
> The fault was a cracked hub flange hidden under grease.

Below it, follow your job-card method: initial symptom, inspection, finding, parts, work performed, and final check. Only include a completed repair or test ride if it actually happened.

Show the five Slow Miles post titles as a compact reading list. Their full text and individual URLs are not in the supplied material, so these need to be provided before working links and excerpts are finalised.

**5. Phone charger: a concise, candid review**

Proposed summary:

> **Hand-crank phone charger**  
> First-year design module, team of four.  
> My contribution: gear train and housing.  
> It worked poorly: four minutes of cranking produced one percent of charge.

Treat that charging result as a reported observation, not a controlled efficiency measurement. Add test conditions if you recorded them.

Use images of the mechanism and housing, then explain your design choices, what you observed, and what you would investigate next. Avoid inventing a cause for the poor performance. This section should be shorter than the bracket and bike stories.

**6. Experience, skills, and contact**

Describe the co-op role through its actual workflow:

> **Saturday mechanic, Second Gear Bike Co-op — 2023–present**  
> Working from job cards: customer-reported faults, inspection findings, parts, repair notes, and test rides.

Omit “hundreds of bikes” unless you later verify it.

List skills plainly: SolidWorks, MATLAB, some Python, and lathe and mill workshop induction. Avoid ratings and progress bars.

End with a short placement invitation, a verified email address, and an accessible PDF CV. The supplied email and blog address appear to be placeholders and need checking before publication.

**7. Visual direction**

Use warm off-white backgrounds, dark graphite text, and a restrained engineering-orange accent. Large, clean headings give the page confidence; small monospaced labels suit dates, part names, and project status.

The job-card influence should appear through orderly fields, fine rules, annotations, and numbered photographs. Keep body text comfortably readable. Let workshop photographs supply texture.

Use real imagery prominently. No stock workshop scenes, fabricated endorsements, or decorative statistics.

**8. 3D and scroll choreography**

Use two substantial visual sequences:

| Sequence | Behaviour | What it explains |
|---|---|---|
| Bracket model | Scroll rotates the actual CAD-derived model through a few selected views; annotations appear beside relevant features | Geometry and your design changes |
| Bike inventory | The complete photographic layout gives way to closer views of selected parts | How inspection moves from the whole bike to a specific fault |

The introduction can show a lightweight preview of the bracket that continues into its project section. Load the interactive model after the introductory text is available.

Use subtle transitions elsewhere. Maintain normal page scrolling and keep project summaries visible independently of the effects. Avoid an exploded view unless the actual assembly supports one.

If usable CAD is unavailable, use annotated renders with scroll transitions until a faithful model can be prepared.

**9. Mobile, accessibility, and performance**

On mobile, stack project summaries and images in reading order and simplify the 3D sequence. Provide still images when WebGL is unavailable or reduced motion is requested.

All navigation and expandable notes must work with a keyboard. Keep text in HTML, provide useful image descriptions, maintain readable contrast, and avoid hover-only information.

Optimise photographs, simplify the CAD export, and load heavy assets only when needed. Contact details and the main project evidence must remain available even if the 3D fails.

**10. Assets and information needed**

Before implementation, assemble:

- **Bracket:** usable CAD export or renders, comparison mass values, simulation evidence and assumptions, your design notes, and confirmation of the November machining schedule.
- **Bike:** full parts-layout photograph, selected component close-ups, before/after images, and the records supporting the chosen repair story.
- **Charger:** mechanism and housing images, your contribution notes, and any recorded test conditions.
- **General:** current placement dates, verified contact and blog URLs, and a revised CV.

Captions and project copy should be checked against these records. Missing evidence can remain a clearly stated gap.

**11. Technical approach and build sequence**

I recommend React with TypeScript and Vite, React Three Fiber for the bracket, and GSAP ScrollTrigger for the two scroll sequences. Project text should live in straightforward content files so it can be updated after machining and testing.

Once building is authorised, proceed in this order:

1. Finalise the factual copy and select supporting assets.
2. Produce desktop and mobile wireframes.
3. Establish typography, colour, and one finished project layout.
4. Build the complete responsive page with static imagery.
5. Add the CAD model and scroll behaviour.
6. Check accessibility, loading performance, and fallback views.
7. Review every claim, link, and project status before publication.

The finished site should pass a simple review: within two minutes, someone can identify your contribution, understand the bracket’s untested status, see how you diagnose problems, and find your contact details.

This is the complete proposed plan. No files have been changed and no implementation has begun.
