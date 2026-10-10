I’ll review the material folder and project context, then propose a portfolio concept with a clear 3D and scroll-motion direction. I won’t build anything yet.


The strongest direction is **“Mina Park — Engineering in Progress”**: a portfolio that feels like an interactive workshop, with a mechanical component moving and coming apart as you scroll. It should show your curiosity and practical skills while clearly presenting you as a second-year student.

I reviewed all three files in `material`. No implementation has started.

### Visual concept

Use warm off-white backgrounds, charcoal text, engineering-blue accents, fine measurement lines, and large typography. Combine clean CAD imagery with real workshop photographs so the site feels personal rather than like a generic technology demo.

The main 3D object should be your **pedal box mounting bracket**. It connects the visual spectacle to a real project and your strongest documented result: **18% lighter**.

### Page and motion plan

| Section | Content | Visual and scroll behaviour |
|---|---|---|
| **Introduction** | Mina Park, mechanical engineering student in Sheffield; interested in mechanical and product design | A slowly rotating bracket beside the headline. Scrolling brings it into a side view with measurement-style annotations. |
| **Featured project** | Formula Student bracket redesign, your role, and the weight reduction | The bracket rotates through useful views alongside original-versus-redesigned images. Motion pauses while readers examine the work. |
| **Second project** | Hand-crank phone charger; your work on the gear train and housing within a group of four | An annotated project image, with subtle transitions between design stages. |
| **Slow Miles** | Restoring a 1984 steel road bike | A photographic sequence following the restoration, paired with excerpts from the five posts. |
| **Workshop experience** | Saturday mechanic at Second Gear Bike Co-op; hundreds of bikes repaired | A compact, photographic section connecting repair experience to engineering judgement. |
| **About and contact** | Education, skills, current placement availability, email, and CV | A quiet closing section with an obvious contact action. |

Suggested opening copy:

> **Making things work. Learning why they don’t.**  
> I’m Mina, a second-year mechanical engineering student in Sheffield. I design, repair, and learn by getting hands-on.

### How the 3D should work

Build one polished 3D sequence around the bracket, rather than spreading effects across every section. Use scroll position to control its orientation, with annotations explaining actual design decisions.

Keep text readable and scrolling natural. On mobile, simplify the scene; for reduced-motion settings, show static views. Load the introduction and content immediately, then load the 3D asset separately. A strong still image should serve as the fallback.

### Content approach

Each project should explain **the problem, your contribution, the result, and what you learned**. Clearly credit group work. Avoid invented testimonials, exaggerated expertise, or claims that the bracket caused the team’s competition result.

The restoration gives the portfolio personality: seized parts, diagnosis, mistakes, and persistence are valuable evidence of how you think.

### Before implementation

The next step would be selecting the bracket CAD export and photographs you mentioned; the folder currently contains text only. Useful additions include before-and-after bracket views, charger images, and a small selection of restoration photos.

Two details need checking before publication:

- The CV targets **summer 2026**, which has passed relative to the current date.
- Your Formula Student membership starts in **October 2025**, while the listed team result is from the **2025 competition**. The wording should make your involvement clear.

Once those details and assets are settled, the build sequence would be: content and layout, responsive styling, the bracket’s 3D sequence, then accessibility and performance checks.
