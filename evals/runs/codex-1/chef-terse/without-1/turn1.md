I’ll review the material folder and project setup, then plan the portfolio’s content, visual direction, and scroll interactions. I won’t build anything yet.


I’d build this around **“The Living Larder”**: a tactile, editorial portfolio where visitors explore your cooking through a wall of preserving jars. The 3D should feel specific to your work—glass, handwritten labels, vegetables, time.

The material gives it a strong story: **Ines Okafor, chef, preserver and teacher in Leeds.** The central idea is how you turn overlooked ingredients into something worth keeping.

### Page plan

| Section | Content | Visual and scroll treatment |
|---|---|---|
| **Opening: The Living Larder** | Your name, role, and a short introduction. Suggested headline: “Most of my cooking happens before service.” | A 3D cluster of jars with subtle glass reflections. Scrolling moves the camera closer, revealing the next section. |
| **At Saltmarsh** | The 40-seat restaurant, weekly changing menu, and your approach to whole-vegetable cooking. | Large dish photographs paired with larder details. Images move gently at different speeds. |
| **What we keep** | 40+ rotating ferments, vinegars and garums; kitchen food waste reduced from 14 kg to 5 kg a week. | The jar arrangement becomes a shelf alongside a clear before-and-after graphic. Selected jars could reveal real ingredient stories once supplied. |
| **A kitchen that teaches** | Two apprentices a year since 2023, staff meal, and workshops on the first Monday of the month. | Documentary-style photographs and short captions; calmer movement keeps the people central. |
| **Brine** | All four issues of your preserving zine, with Olu’s drawings credited. | Scanned covers arranged as a shallow 3D stack; selecting an issue opens an accessible reader. |
| **Where it started / What comes next** | Your grandmother’s ogiri pot, formative books, a concise career timeline, Sunday Pot, and contact. | A quiet photographic ending, with Callum Reyes’s recommendation and a clear enquiry link. |

### Visual direction

Warm paper, dark ink, brine green and restrained amber. Oversized editorial serif headlines, clean body text, and small labels inspired by your actual jars. Priya Nair’s photography should carry as much weight as the 3D.

Avoid generic developer-portfolio styling: your dishes, drawings and larder already provide a distinctive visual language.

### How the movement should work

- **One main 3D scene**, reused through the opening sections for a coherent journey.
- Natural scrolling, with a short desktop sequence where the jars stay in view as the story changes.
- Subtle image reveals and depth elsewhere; essential text stays easy to read.
- Mobile gets a simpler composition. Reduced-motion settings get static scenes and immediate content.
- A photographic fallback appears while 3D loads or if it cannot run.

### Build approach, when approved

Use **Next.js, React Three Fiber and GSAP ScrollTrigger**. Keep text and navigation in ordinary HTML, load 3D progressively, and optimize photographs for fast loading. Build the readable page first, then add the 3D and scroll choreography.

### Details to resolve before building

The folder contains two text files; the photographs and scans are described but aren’t included yet. We’ll need the selected assets, publication permissions and credits, plus a contact address and workshop enquiry destination.

There’s also a date discrepancy: LinkedIn lists your head-chef role from **March 2022**, while your notes say you took over the kitchen in **September 2022**. I’d leave the precise date out of public copy until clarified.

**Nothing has been built or changed.**
