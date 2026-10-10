I’ll review the material folder and project context, then outline a distinctive portfolio concept with 3D, scroll interactions, and a practical build plan. I won’t build anything yet.


I’d build your portfolio around **“From biological questions to reproducible tools.”** It would present you as a computational biologist whose research, software, and teaching reinforce one another—useful for both postdoctoral and research software applications.

The visual centerpiece would be an interactive 3D dependency graph: an abstract representation of how a question becomes an analysis, a result, a reproducible workflow, and a teaching exercise. As visitors scroll, the graph changes alongside your story. It would be clearly illustrative, rather than presented as scientific data.

### Visual direction

A warm off-white background, ink-colored typography, and restrained teal and coral accents. Large editorial headlines would sit alongside notebook excerpts, code, and diagrams, giving the site the feel of a polished research workspace.

The 3D graph would make the opening memorable. The actual artifacts and explanations would make the portfolio convincing.

### Page structure and scroll experience

| Section | Content | Motion |
|---|---|---|
| **Opening** | “Mira Solano — Computational biology, reproducible software, and teaching.” Bellweather University; seeking postdoctoral or research software roles. | A slowly rotating graph beside the introduction. Scrolling draws the camera toward its first node. |
| **The research question** | The marker-variation and inflammatory-outcomes study: question, retrospective approach, finding, and limitations. | Relevant nodes illuminate as the explanation progresses. |
| **Making the work reproducible** | Analysis notebook, workflow, sensitivity checks, reproducibility checklist, and public synthetic example dataset. | The graph unfolds into a readable pipeline, with artifact previews beside each step. |
| **Making methods teachable** | Adapted practical exercises and two teaching sections in Computational Biology Methods, 2024 and 2025. | The pipeline branches into practical exercises, visually connecting teaching to the methods above. |
| **Next chapter** | Research interests, the roles you’re seeking, a concise academic timeline, and contact. | The graph settles into a complete overview; movement becomes quiet. |

A persistent navigation would let visitors jump directly to Research, Software, Teaching, or Contact. Preprint, repository, and CV links would be easy to find without scrolling through the entire experience.

### Content decisions

The research notes clarify several CV claims. I would use these formulations:

- **“Identified a marker associated with inflammatory outcomes”**, reflecting the retrospective study rather than claiming disease causation.
- **“Manuscript under review”**, with second-author credit on a six-author preprint; avoid implying an accepted publication.
- **“PhD in progress; thesis submission targeted for December 2026”**, without inventing a defence date.
- **“Adapted practical exercises and taught two sections within a course enrolling 120 students”**, accurately describing your contribution.

The participant contact export is excluded from all website content and assets.

### Build approach, when authorized

Use Astro for a fast, content-focused site, with a small Three.js component for the graph and GSAP for coordinated scroll animation. Keep the narrative readable independently of the 3D component.

On mobile, simplify the graph and camera movement. With reduced motion enabled, show a static diagram and ordinary section transitions. Support keyboard navigation, visible focus states, readable contrast, and direct artifact links.

Implementation would proceed in four stages:

1. Finalize copy and artifact selection.
2. Build the responsive page and navigation.
3. Add the 3D graph and scroll choreography.
4. Check accessibility, mobile performance, and factual accuracy.

Before implementation, the main missing inputs are the public repository and preprint URLs, shareable artifact excerpts, and any more specific research interests you want to foreground. No site files have been created or changed.
