I recommend **a single-page portfolio built around an animated dependency graph**, with the theme **“From research questions to reproducible analysis.”** It gives the site a distinctive visual identity while showing what postdoc supervisors and research software teams need: your contribution, evidence of your work, and the limits of the findings.

This is the complete plan. No building or file changes yet.

### 1. Identity and opening

The opening copy would be:

> **Mira Solano**  
> Doctoral candidate in computational biology at Bellweather University  
> I develop reproducible analysis workflows, examine how results change when assumptions change, and adapt computational methods for practical teaching.

Below it: **Explore the work**, **View CV**, and **Email Mira**.

A 3D dependency graph would occupy the other half of the opening screen. Its nodes would represent questions, analysis, checks, software, and exercises. It would be labelled as an illustrative workflow, without implying it depicts biological mechanisms or actual study data.

### 2. Visual design

Use a warm off-white background, dark ink text, teal for workflow connections, and coral for selected nodes. Pair an expressive serif heading font with a readable sans-serif body font; use monospace sparingly for code and notebook details.

Large typography and generous spacing would make the introduction memorable. Notebook excerpts, diagrams, and exercise previews would give the rest of the page substance. Avoid invented imagery, institutional endorsements, achievement counters, or stock laboratory photography.

### 3. Content and page structure

**Research: the question, finding, and limits**

Introduce *Marker variation and inflammatory outcomes* as a six-author preprint under review, with you credited as second author.

Present three clearly visible elements:

- **Finding:** a marker was associated with inflammatory outcomes in one retrospective dataset.
- **Your contribution:** ownership of the reproducibility workflow and sensitivity analysis.
- **Limits:** no experiment establishing causation and no clinical validation.

The preprint link would sit alongside this explanation. The site would not use “disease-driving” or imply you led the whole study or collected the data.

**Software: making the analysis reproducible**

Show how someone else can understand and rerun the public workflow. The main evidence would be:

- An analysis notebook excerpt.
- A dependency graph.
- Reproducibility checks.
- A small public synthetic example dataset.

Each artifact would explain its purpose, your contribution, and where to inspect the public source. Licence and credit information would accompany reused material. Claims about reproducibility would match what the repository actually documents.

**Sensitivity analysis: examining robustness**

Use the plain-language introduction:

> Sensitivity analysis checks how a result changes when assumptions change.

Show a documented public example if one is available. A small comparison could let visitors switch between assumptions and inspect the resulting change, using only the public synthetic dataset. Its synthetic nature and explanatory purpose would be explicit.

If the public material cannot support an accurate interactive comparison, use an annotated static example instead.

**Teaching: methods people can practise**

Describe your work adapting exercises and teaching two practical sections with 24 students total in 2024 and 2025.

Preview a shareable exercise and explain what students were asked to practise. Credit the course leader for designing and leading the full 120-student course. Include no evaluation scores or awards.

**Profile and next steps**

Finish with a concise profile:

- Doctoral candidate at Bellweather University.
- Thesis submission planned for December 2026.
- Seeking postdoctoral or research software roles.

Provide prominent links to the preprint, repository, CV, and email. Do not imply that a defence is scheduled or the degree awarded.

### 4. Scroll and 3D choreography

The graph would connect the sections into one story:

| Scroll position | Visual behavior | Purpose |
|---|---|---|
| Opening | Gentle graph rotation | Establish the portfolio’s identity |
| Research | Question and analysis nodes illuminate | Introduce the study |
| Software | The graph unfolds into a dependency pipeline | Explain the reproducibility workflow |
| Sensitivity analysis | Alternative assumption branches appear | Show what sensitivity checks examine |
| Teaching | Exercise nodes connect to the methods | Connect your teaching with computational practice |
| Contact | The complete graph settles into view | Leave visitors with a coherent picture of your work |

Desktop would use a sticky graph beside scrolling content. Camera movements would be slow and restrained, with no scroll hijacking. Brief hover or focus interactions could reveal node labels; essential information would also appear in ordinary page text.

### 5. Navigation and accessibility

A compact navigation would link to Research, Software, Teaching, and Contact, with a direct CV link.

On mobile, the diagram would sit above the relevant content and use simpler transitions. Reduced-motion settings would replace camera movements with a static diagram. The site would support keyboard navigation, visible focus states, readable contrast, and meaningful link labels.

The page would remain useful if 3D rendering fails or JavaScript is unavailable. Publications, code, CV, and email would never depend on completing the animated sequence.

### 6. Technical approach

When building is authorized, I recommend:

- **Astro** for the content, page structure, and fast initial rendering.
- **Three.js** for the lightweight 3D graph.
- **GSAP ScrollTrigger** for coordinated scroll transitions.
- Static hosting, with no backend needed for the initial portfolio.

The graph would use simple geometry rather than large models or video. Load the 3D component separately, limit rendering work when it is off-screen, and provide a static fallback.

Contact would use an email link. Analytics would be omitted initially because they are unnecessary for this portfolio.

### 7. Public materials and editorial rules

Only explicitly selected public assets would enter the website. The material folder would not be copied wholesale into the site or deployment.

The participant contact export and restricted participant data would be excluded. No participant records would be reconstructed. Public code and synthetic data would retain their applicable licences and credits.

Every research artifact would distinguish **the study’s finding**, **your contribution**, and **what the evidence supports**. Those distinctions would remain visible alongside the work, rather than buried in footnotes.

### 8. Inputs needed before implementation

The remaining inputs are:

- Public preprint and repository URLs.
- Applicable licences and author or contributor credits.
- Shareable notebook, dependency graph, reproducibility-check, and exercise excerpts.
- A CV suitable for public download, with the corrected status and contribution wording.
- Confirmation that the supplied email address is the intended public contact.

A portrait is optional; this design works without one.

### 9. Implementation sequence and completion criteria

Once you authorize building:

1. Verify public sources, select artifacts, and finalize accurate copy.
2. Build the responsive page, navigation, and artifact presentations.
3. Add the 3D graph and scroll choreography.
4. Check keyboard access, reduced motion, mobile behavior, rendering fallbacks, performance, credits, and links.
5. Prepare a reviewable preview before any publication.

The finished site should let a visitor quickly identify your doctoral status, understand your actual contribution, inspect the public work, recognize the result’s limits, and contact you. The animation should make that story memorable while keeping the evidence easy to reach.
