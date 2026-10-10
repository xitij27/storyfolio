I recommend **“Mina Park — workshop logbook”**, with the bike-parts inventory as the signature visual. It draws on how you actually work and gives a placement reviewer a clear view of your contribution, judgment, and progress in two minutes.

The site would be a single scrolling portfolio, with expandable project details. 3D and motion would support the work, while every important fact remains easy to read.

### 1. Audience and purpose

The primary visitor is the person reviewing placement applications at an engineering firm.

Within the first 20 seconds, they should understand:

- You are a second-year mechanical engineering student seeking a placement.
- You have experience designing components and diagnosing mechanical problems.
- You distinguish between a proposed design, a simulation result, and a physically tested outcome.

Within two minutes, they should be able to assess your strongest project, understand your individual contributions, and find your CV and contact details.

### 2. Content and page order

**Introduction**

Suggested headline:

> **Mina Park**  
> Mechanical engineering student. Saturday bike mechanic.

Supporting copy:

> I study mechanical engineering at Hallam Institute of Technology in Sheffield. I work from job cards and workshop notes: finding the problem, recording what I changed, and checking the result.

Display placement availability once the intended season is confirmed. Include three direct links: **Selected work**, **CV**, and **Email Mina**.

The opening visual uses your photograph of bike parts laid out on the garage floor. It should establish your personality without pushing the work below an oversized introduction.

**Project 01 — Pedal-box mounting bracket**

Lead with the project most directly relevant to mechanical design placements.

The summary includes:

- **Role:** Hallam Racing chassis sub-team member, joined October 2025.
- **Work:** Pedal-box mounting bracket redesign.
- **Result so far:** 18% lighter in CAD; simulation completed.
- **Status:** Not manufactured or physically tested. Machining planned for November, with the year confirmed before publication.

Structure the detail as:

1. What the bracket needed to do.
2. The original design and comparison baseline.
3. What you changed and why.
4. What the simulation evaluated, including relevant assumptions.
5. What remains to be checked after manufacture.

Use before-and-after CAD images, annotations, and an optional interactive model. Only show loads, materials, safety factors, or other technical values if you provide them.

Omit the July 2025 team placing: it predates your involvement and adds little evidence about your work.

**Project 02 — 1984 steel road-bike restoration**

This is the most personal and visually distinctive section.

Introduce the project with the full parts inventory. Visitors can select a few highlighted components to open short repair records using your job-card structure:

> **Reported problem → What I found → Parts → Work carried out → Check or test ride**

Adapt the labels where a restoration task began with your own inspection rather than a customer report. Leave unknown or unfinished checks explicitly pending.

The supplied blog material suggests promising stories:

- The seized bottom bracket.
- The cracked rear-hub flange.
- Stripping the old paint.
- Sorting parts into keep, fix, or replace.

The titles and summaries provide starting points; the full repair accounts need your notes. No diagnoses, outcomes, or test rides would be invented.

Place your co-op experience beside this project:

> Saturday mechanic, Second Gear Bike Co-op, 2023–present.

Describe the work using confirmed examples, without “hundreds of bikes” or another unsupported total.

**Project 03 — Hand-crank phone charger**

Keep this shorter, with one strong photograph or diagram.

State the scope clearly:

> First-year design module, 2025. Team of four. My contribution: gear train and housing.

Give the outcome plainly:

> It worked, but poorly: four minutes of cranking for one percent of charge.

Present that as your reported observation, without turning it into an efficiency figure. Follow with your explanation of the limitations, what you learned, and what you would change once those details are available.

**About, notes, and contact**

Close with a compact section covering:

- Degree and institution.
- SolidWorks, MATLAB, some Python.
- Lathe and mill workshop induction.
- A small selection of Slow Miles entries, linked once the live address is confirmed.
- CV download and email.

No separate testimonials section, decorative achievement counters, or fabricated endorsements.

### 3. Visual design

Use the visual language of a carefully kept workshop logbook:

- Warm paper-white backgrounds and graphite text.
- One restrained orange accent for links, selected parts, and annotations.
- Large, clear headings with small technical captions.
- Real workshop photographs, including wear, grease, and imperfect surroundings.
- Thin rules and consistent labels to help reviewers scan.

Avoid excessive engineering decoration. Dimensions, measurements, and technical markings should communicate real information.

Photography should carry much of the identity. Use wide inventory images for context and close-ups for evidence.

### 4. 3D and scroll behaviour

**Signature interaction: the parts inventory**

Start with the complete garage-floor photograph. As the section enters view, a handful of photographed parts gently lift into separate depth layers, with labels appearing beside them.

This would be a photographic scene arranged in 3D space. It preserves the actual appearance of your bike parts without pretending they are fully modelled components.

Selecting a highlighted part opens its repair record. A visible list provides another way to reach every record.

**Secondary interaction: the bracket**

If a suitable CAD export is available, provide a rotatable bracket model with a few annotations tied to actual design changes. Keep the manufacturing and testing status visible beside it.

Do not invent an exploded assembly if the supplied model does not support one. Before-and-after stills remain a complete presentation if a model is unavailable.

**Motion rules**

- Preserve normal scrolling.
- Keep project summaries visible without interaction.
- Use short, restrained transitions between sections.
- Avoid long pinned sequences and automatic camera journeys.
- Support keyboard controls and clear focus states.
- Provide static layouts for reduced-motion preferences and devices where 3D performs poorly.
- Avoid autoplay rotation that continues while someone is reading.

### 5. Information depth

The main page carries the two-minute story. Expandable details hold supporting photographs, design reasoning, and notes.

Each project summary consistently answers:

| Field | Purpose |
|---|---|
| **Context** | What the project was for |
| **My contribution** | What you personally did |
| **Status** | Designed, simulated, made, or tested |
| **Result so far** | What the available evidence supports |
| **Next step** | What remains unresolved |

Use the structure flexibly so it reads naturally rather than like a form.

### 6. Assets and facts needed

The material folder currently contains text only. Before implementation, assemble:

- Original bike inventory photograph and selected repair close-ups.
- Bracket CAD images, an optional export suitable for web conversion, and simulation screenshots.
- Bracket comparison baseline, design constraints, and simulation details.
- Charger photographs or drawings and your reflections on its performance.
- An updated CV consistent with the website’s claims.
- Confirmed placement season, machining date, email, and blog address.

These are content preparation items. The site should omit unavailable evidence or identify unfinished work rather than fill gaps with invented material.

### 7. Technical approach

Use **React with a lightweight Vite setup**, **React Three Fiber** for the inventory scene and optional bracket viewer, and **GSAP** where coordinated scroll motion is useful.

Keep the site static, with project content stored separately from presentation code so updates are straightforward. A backend or CMS is unnecessary initially.

Load text and primary images first. Load 3D when needed, compress images and models, and ensure the page remains useful if WebGL fails. Use semantic HTML for all meaningful text and navigation.

Include basic search metadata, a social preview image, and a downloadable accessible CV.

### 8. Build sequence after approval

1. **Content and asset selection:** confirm claims, select photographs, and draft the three project summaries.
2. **Wireframes:** establish desktop and mobile reading order, including one expanded job card.
3. **Visual design:** resolve typography, colour, photography treatment, and the inventory composition.
4. **Static implementation:** complete the readable, responsive portfolio and project details.
5. **Motion and 3D:** add the inventory interaction, then the bracket viewer if assets support it.
6. **Verification:** check factual wording, links, CV download, keyboard access, reduced motion, mobile layouts, and loading performance.
7. **Publication preparation:** confirm hosting and domain, prepare the final preview, and resolve any remaining content gaps.

### 9. Completion criteria

The portfolio is ready when a reviewer can quickly identify your level, contribution, and project status; every claim is supported; and contact details are easy to reach. The complete story must remain available on mobile, with reduced motion, and without 3D.

This is the full proposed plan. **No building or file changes have been made.**
