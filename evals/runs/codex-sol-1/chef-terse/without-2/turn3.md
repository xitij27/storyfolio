I recommend **The Living Larder**: a single-page portfolio built around the order your kitchen actually works in—**the prep list, the ferment log, then the menu**.

It should feel tactile, thoughtful, and alive, with a 3D jar wall as its signature moment. Its purpose is to attract prospective apprentices, help people book workshops, and give food writers a clear account of your work. This is the full plan; no building has been done.

### 1. Visual direction

Use the visual language of a working larder: amber glass, handwritten labels, paper, shelves, and close-up photographs.

- **Colours:** warm cream, charcoal, dark green, and amber.
- **Typography:** a characterful serif for headlines, a clear sans serif for reading, and compact monospaced text for log entries.
- **Layout:** generous photographs alongside small, precise annotations. Alternate immersive sections with quieter reading.
- **Voice:** practical, personal, and specific. Use “I” for your experience and “we” for collective kitchen work.

The site can take inspiration from preserving labels without reproducing Olu’s artwork before permission.

### 2. Navigation and visitor routes

A compact navigation stays available throughout:

**The kitchen · Apprenticeships · Workshops · For writers**

Each audience gets a direct route from the opening. Contact details and booking links should remain accessible independently of the 3D experience.

### 3. Page structure and content

| Section | What visitors see | Purpose |
|---|---|---|
| **Opening** | Your name, role, Leeds location, an introductory jar scene, and three audience links | Establish who you are and help visitors choose a route |
| **The prep list** | Your working approach, larder photographs, and selected preparation stories | Explain what drives the kitchen |
| **The ferment log** | An interactive jar wall with selected real log entries | Make your process tangible |
| **The menu comes last** | Finished dishes connected to their preparations and ferments | Show the cooking that results |
| **Apprenticeships** | What learning in your kitchen involves and how to enquire | Help prospective applicants assess the opportunity |
| **Workshops** | First-Monday workshops, practical details, and a booking route | Turn interest into bookings |
| **Passed on** | Your grandmother’s pot, Sunday Pot, and *Brine* | Explain the personal and community roots of your work |
| **For writers** | Short biography, verified facts, Callum’s quote, and press contact | Make accurate coverage easier |

**Opening copy direction**

> **Before the menu, there’s the larder.**  
> I’m Ines Okafor, Head Chef at Saltmarsh in Leeds. Our week starts with the prep list and the ferment log. The menu comes last.

This is proposed copy, ready for refinement before implementation.

**The prep list**

Use two or three real examples to explain what happens before service. Each story should follow a simple sequence: what was available, what the kitchen did with it, and what it became.

Include the waste result with its measurement context:

> In a one-month measurement period in 2023, we reduced the whole kitchen’s weekly prep and plate waste from 14 kg to 5 kg.

Bones belong in a separate stock-making story because they were never included in that waste measurement.

**The ferment log**

Feature a manageable selection of actual jars from the 40+ ferments, vinegars, and garums on rotation. Each entry includes:

- What it is and a brief explanation.
- Date started.
- Salt recorded in the log, with its unit or basis made clear.
- Check schedule.
- When it is ready.
- How it is used, where there is a confirmed example.

These should be dated examples. They should not appear to be a live view of the kitchen unless maintained as one.

**The menu comes last**

Choose four to six dishes with strong photographs and meaningful connections to the preparation stories. Captions explain those connections. Label the selection so visitors understand that the menu changes weekly.

**Apprenticeships**

Explain the programme using your actual practices: preparation, checking and labelling ferments, service, and kitchen responsibilities where confirmed. Include the fact that you have taken two apprentices a year since 2023.

Before writing application instructions, confirm eligibility, timing, terms, current availability, and the enquiry route. Avoid implying applications are open without confirmation.

**Workshops**

Give this section a clear practical structure: what participants do, who it suits, location, duration, price, accessibility information, and booking link. The first-Monday schedule is confirmed; the other details still need supplying.

**Passed on**

Use your grandmother’s ogiri pot photograph alongside your account of her influence. Include Sunday Pot’s weekly meal at St Aidan’s hall and the four issues of *Brine*, published between 2022 and 2025.

Zine scans and drawings remain conditional on Olu’s permission. The section can use text descriptions in the meantime.

**For writers**

Provide a readable short biography and selected background:

- Head Chef, Saltmarsh: September 2022–present.
- Acting head chef from March 2022.
- Earlier roles at The Corn Exchange Kitchen and Brassica.
- Fjaerland: a ten-week unpaid stage, washing and labelling jars and helping with two batches of garum.
- Apprenticeships, *Brine*, and Sunday Pot.
- Callum’s approved quotation, attributed to him as Saltmarsh’s owner.

### 4. The 3D and scroll experience

**Opening:** a single amber jar establishes the visual identity. A small amount of scroll-linked rotation reveals its label.

**Prep list:** photographs and annotations enter gently as visitors read. Keep the text stationary once revealed.

**Ferment log:** the view opens onto a dimensional shelf. Scrolling changes the viewing angle slightly; selecting a jar opens its readable log beside the scene. Provide the same entries as a normal list.

**Menu:** transition from jars to dish photography, showing the relationship between preservation and the plate.

**Remaining sections:** reduce movement so visitors can read apprenticeship information and book workshops easily.

Scrolling remains natural. Jar selection works with mouse, touch, and keyboard. Essential information never depends on animation.

### 5. Photography, permissions, and privacy

| Material | Planned use | Publication condition |
|---|---|---|
| Your phone photographs | Prep list, larder, labels | Check visible details and staff faces |
| Your pot photograph | Personal story | Available from you |
| Priya’s restaurant photographs | Opening alternatives and dishes | Confirm restaurant permission; credit Priya Nair |
| *Brine* scans and Olu’s drawings | Zine section | Obtain Olu’s permission before use |
| Callum’s quote | Writer section | Approved, with attribution |

Check every selected image for supplier prices and identifying staff faces. Crop, obscure, or choose another image where needed. The files currently contain descriptions of these assets; the photographs and scans still need to be selected and supplied.

### 6. Mobile, accessibility, and performance

On mobile, use a smaller jar scene and vertically stacked content. Jar details open through clear buttons, with no hover requirement.

Support reduced-motion preferences with still images and direct transitions. Include visible keyboard focus, readable contrast, image descriptions, and properly labelled controls.

Load the page text and opening image first, then enhance with 3D. Use optimized photographs, load later sections as needed, and provide a static jar-wall fallback if 3D cannot run smoothly.

### 7. Technical approach

When building is authorized, use **Astro for the content-led site**, with a small **Three.js component** for the jar scene and targeted scroll animations.

Keep biographies, jar entries, dishes, and workshop information separate from presentation code so they are easy to update. Start with ordinary contact and booking links using your chosen services. Hosting can be selected once those services and the domain are known.

### 8. Work sequence after approval

1. **Content and asset selection:** choose jar stories, dishes, photographs, contact routes, and workshop details; resolve permissions.
2. **Copy and wireframes:** draft the whole page and lay out desktop and mobile versions.
3. **Visual design:** finalize typography, colours, photography treatment, and the jar scene’s appearance.
4. **Motion prototype:** demonstrate the opening and jar-wall interactions, including the static alternative.
5. **Implementation:** build the page and connect the confirmed enquiry and booking routes.
6. **Verification:** check factual wording, credits, image privacy, keyboard access, reduced motion, mobile performance, and links.
7. **Publication review:** review the completed site before launch.

The recommended scope is **one carefully composed page, one signature 3D experience, and three clear visitor routes**. The content and interactions should make your working methods memorable while keeping apprenticeships, workshops, and press enquiries straightforward.
