I’ll make the design decisions and give you the full plan. I’ll keep unresolved figures and permissions out of the proposed public content, so the concept can move forward without guessing about your work.


I’ve chosen **The Working Dashboard**: one continuous story carried by eight 3D panels that assemble, separate and return to a complete dashboard. It grows directly from your own description: “I make dashboards people actually use.”

The complete plan is saved in [storyboard.md](/tmp/storyfolio-evals/codex-analyst-hurried-with-gARoHB/docs/story/storyboard.md). Nothing has been built, and no further answers are needed to review it.

Three things remain dependencies for a future launch:

1. Conflicting or unexplained figures stay out of the public copy.
2. Project screenshots, employer work and the recommendation need appropriate factual context and permission before appearing.
3. The supplied example email and project URL need working public replacements.

## The idea

The page asks: **What makes a dashboard useful to the people using it?**

Visitors experience the answer through the site itself: a clear overview, enough context to understand the details, and an obvious next action.

The dashboard contains eight persistent panels: your identity, banking, genomics, Lisbon Rent Map, FraudShield, AutoPilot, career chronology and contact. Their faces carry your actual project names, career information and, when available, approved work images.

The distinctive element is how these subjects connect. Banking, sequencing operations and Lisbon room rents give the page a specific identity. The 3D arrangement helps visitors move between the whole picture and individual pieces of work.

I considered a Lisbon rent atlas and an analytical brief. I chose the dashboard because it connects most directly to your stated work and can remain coherent without unavailable map images or report artifacts. These alternatives are recorded in [concepts.md](/tmp/storyfolio-evals/codex-analyst-hurried-with-gARoHB/docs/story/concepts.md).

## From top to bottom

| Chapter | What visitors see | What happens as they scroll |
|---|---|---|
| **Overview** | Your name, Lisbon, your dashboard statement, and a compact index of experience and projects. Work and Contact are immediately available. | The complete dashboard appears at a shallow angle, then settles face-on. Narrow gaps open between its panels. |
| **Context** | Atlantico in 2020, Helix from 2021–2024, Meridian from February 2024. Your listed tools appear alongside the chronology. | The career and domain panels arrange into a dated sequence. The other panels remain visible as a compact overview. |
| **Inventory** | All three named projects: Lisbon Rent Map, FraudShield and AutoPilot. | Their panels slide into a readable row. Selecting a project opens its ordinary HTML detail alongside the scene. |
| **Detail** | Lisbon Rent Map leads, using its supplied description: room costs by Lisbon parish. Other projects receive equal access through clear controls. | One panel moves forward while the remaining seven hold the overview. Approved screenshots can later occupy its face. |
| **Evidence** | A short factual record now; properly defined results and genuine artifacts when available. | Relevant panels align into evidence cards. This chapter stays brief—or disappears if it repeats earlier content. |
| **Next action** | The page resolves its question through the design principle of clear context and a clear next action. Contact and CV access finish the journey. | All eight panels reassemble. The contact panel aligns with the actual contact link. |

The desktop journey should take roughly **eight to nine screen heights**, adjusted to the content. There is no need to stretch a thin project record into a long cinematic sequence.

The project detail structure will accommodate **what it was, your contribution, collaborators, an artifact and evidence**. Missing facts collapse those fields; they do not become invented case studies. The current material supports a curated project index more strongly than complete case studies.

## Motion and interaction

The movement is restrained but consequential: assembling, ordering, focusing and returning.

Most motion happens in the panels. The camera changes angle slightly, avoiding disorienting fly-throughs. A couple of sticky sequences let important transformations breathe; normal scrolling remains available throughout.

A chapter rail lets desktop visitors jump anywhere. Work and Contact offer the quick route. Project controls work with mouse, touch and keyboard, and readable content sits in HTML beside the 3D scene.

Someone with thirty seconds can get your name, stated focus, documented experience and project index immediately. Genuine work artifacts will strengthen that first impression when available.

## Colours and type

I’ve selected a **warm, matte dashboard surface**:

| Use | Colour |
|---|---|
| Background | Warm ivory `#F2F0E9` |
| Main text | Deep green-black `#192B2A` |
| Selection and action accent | Rust `#B84A32` |
| Panel surfaces | Soft white `#FBFAF6` |

Fine rules, shallow bevels and quiet shadows make the panels feel tangible. The accent marks selected projects and the contact action.

**Manrope** handles headings and reading text. **IBM Plex Mono** handles short panel labels, dates and metadata. Body text remains generous, with short line lengths and readable labels. Final contrast checks belong in implementation.

## On a phone

The same story becomes a comfortable single-column page.

A compact, face-on dashboard introduces the site. The chronology becomes a vertical list, project panels become stacked records, and project details open inline. Touch targets are at least 44px.

Mobile motion is limited to small transitions when the device handles them smoothly. There are no long pinned camera sequences. Contact remains easy to reach.

The fallback experience is part of the design:

- **Reduced motion:** static panel arrangements and normal anchors.
- **No WebGL:** lightweight dashboard illustrations beside the same content.
- **No JavaScript:** complete readable HTML, navigation and links.
- **Rendering failure:** the illustration replaces the scene immediately.

## Everything else the site needs

The initial scope is one English-language page with accessible navigation, a usable contact destination, corrected CV access, a static sharing image, a panel-based favicon and a helpful 404 page.

It also needs semantic headings, search metadata, keyboard access, visible focus states and descriptive image alternatives. Text should load before the optional 3D layer; simple geometry and compressed assets keep the experience practical on phones.

Separate project pages come later, when there is enough evidence to support them. Portuguese, testimonials and a blog can follow when their content is ready. Direct email serves the initial contact need. Analytics can wait until there is a clear purpose.

The narrative and content should live separately from the animation, so updating a project does not require rebuilding the scene.

All delegated choices and their rationale are saved in [decided-for-you.md](/tmp/storyfolio-evals/codex-analyst-hurried-with-gARoHB/docs/story/decided-for-you.md). The result is a complete planning handover; implementation remains outside this request.
