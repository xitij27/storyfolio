I recommend **“The Living Larder”**, opening with **“The menu comes last.”** It gives the site a distinctive visual identity while showing what matters in your kitchen: preparation, observation, teaching and making use of ingredients.

This is the complete plan. It stays at the planning stage; no building or file changes.

**1. Purpose and audience**

The site should help three groups:

- **Potential apprentices** understand your kitchen, what they would learn and how to enquire.
- **Workshop visitors** find upcoming sessions and book.
- **Food writers** understand your work and find accurate background and contact information.

Apprenticeships and workshops get the most prominent links. Your career history sits within the background material.

**2. Visual direction**

An editorial website with the texture of a working kitchen notebook: warm off-white backgrounds, dark ink, amber glass and muted green. Large, confident headlines contrast with small, legible log entries and photographic details.

Use your actual handwriting and labels where suitable photographs exist. Your grandmother’s pot, larder photographs and prep materials provide the personal character.

The signature feature is a **3D shelf of preserving jars**. It should feel grounded in your kitchen, with restrained reflections and imperfect labels. We can construct the jars procedurally, avoiding a dependency on commissioned 3D models.

**3. Site structure and homepage story**

A substantial homepage tells the story. Separate apprenticeship and workshop pages provide practical information and stable links that people can share.

| Section | Content | Movement and interaction |
|---|---|---|
| **The menu comes last** | Ines Okafor, Head Chef at Saltmarsh, Leeds. A short introduction to the prep list and ferment log. Links to apprenticeships and workshops. | A softly lit jar shelf establishes the scene. Scrolling moves gently towards it. |
| **The ferment log** | One approved real entry: start date, salt, checking schedule and readiness. Explain how the log guides the work. | A jar comes forward while its log appears beside it. Text remains ordinary, accessible HTML. |
| **Before service** | Prep lists, larder work, the koji cupboard and staff meal. Show the routines and judgement behind the food. | Close-up photographs and notes enter quietly as the reader scrolls. |
| **Learning in the kitchen** | Your apprentice programme, two apprentices a year since 2023, and what working alongside you involves. | A calm section with a clear link to the apprenticeship page. |
| **What we changed** | The measured waste reduction, rotating larder and Callum’s quotation. | Simple typography and a static comparison; no animated counters. |
| **Then, the menu** | Explain that the menu changes weekly and is written last. Show selected dishes with accurate captions. | The tight detail of preparation opens into larger dish photography. |
| **Workshops** | First-Monday workshops, with the next confirmed session and a booking link. | A clear, readable event card, without effects around essential details. |
| **Brine and roots** | The four zine issues, your grandmother’s pot, fermentation books and Sunday Pot. | Gentle layering for permitted images; optional access to individual zine issues. |
| **Contact** | Workshop booking, apprenticeship enquiries and a food-writer contact route. | A straightforward finish. |

Keep a compact navigation visible or easily accessible: **The Kitchen · Apprenticeships · Workshops · About & Contact**. Visitors can skip the storytelling sequence at any point.

**4. Practical pages**

**Apprenticeships**

Explain the programme, the work involved and the learning environment using details you confirm. Include application status, eligibility, pay, schedule and the enquiry or application process when available. Do not imply there is a current vacancy.

**Workshops**

Show confirmed dates, subjects, duration, venue, price, availability, accessibility information and booking arrangements. Link to your existing booking provider if you have one. Build custom booking functionality only if it becomes necessary.

First-Monday scheduling is background information, not evidence that a particular session is available.

**About and contact**

Provide a short biography useful to writers, a compact career timeline, Sunday Pot and contact details. Include approved downloadable photographs only if their reuse terms are clear.

**Brine**

Start with a text introduction and issue information. Add covers, scans or a reader only after Olu’s permission and receipt of the files. Any published scans should have accessible text alongside them.

**5. Content and accuracy rules**

These apply throughout the site:

- List **Head Chef, Saltmarsh — September 2022–present**. Mention acting head chef from March 2022 only where the distinction is useful.
- Describe Fjaerland as a **ten-week unpaid stage**, washing and labelling jars and helping with two batches of garum. Avoid language suggesting research or responsibility beyond that work.
- Attribute waste reduction to **“we”** and identify the measurement period. Proposed wording:  
  > “Over one month in 2023, we weighed the whole kitchen’s prep and plate waste. Weekly waste fell from 14 kg to 5 kg. Bones were excluded because they went into stock.”
- Present that as a historical measurement, not an independently verified current rate.
- Use Callum’s approved quotation with his name and role.
- Exclude supplier prices and staff faces unless you have obtained permission.
- Review photographed lists, logs and labels for private information before publication.
- Use real, approved ferment records. Do not invent recipes, log entries, workshop details or apprentice experiences.

**6. Photography and permissions**

The supplied folder currently contains written material, not the image files themselves.

For the initial design, prioritise your own larder photographs and photograph of the pot. Use restaurant-owned photographs once authorization for your portfolio is confirmed, and credit Priya Nair wherever appropriate.

Hold all of Olu’s drawings until permission is confirmed, including drawings visible within zine covers or scans. The site should still feel complete if those assets remain unavailable.

Select a small, strong set of photographs from the roughly 60 available rather than loading an entire gallery. Prepare responsive crops and compressed versions.

**7. Motion, accessibility and performance**

The jar shelf is the main 3D moment. Later sections become quieter so the photographs and writing have room.

- Preserve normal scrolling; no forced pauses or scroll hijacking.
- Keep navigation, booking links and enquiries immediately usable.
- Make interactions work with keyboard, touch and pointer.
- Keep essential content outside the 3D canvas.
- Offer a composed still image for reduced-motion preferences or unavailable WebGL.
- Simplify the scene on smaller devices and pause rendering when it leaves view.
- Load readable opening content first, then enhance it with 3D.
- Maintain readable contrast, visible focus indicators and useful image descriptions.

**8. Technical approach**

I recommend **Astro, Three.js and GSAP**:

- **Astro** for fast pages and a small amount of browser-side code.
- **Three.js** for the jar shelf.
- **GSAP ScrollTrigger** for the controlled scroll sequence.

Keep workshops, biography and other recurring information in structured content files initially. If you want to update events yourself through a browser, select a small CMS before implementation.

Use an existing booking service where possible. Choose hosting and the public domain later; they do not need to determine the visual concept.

**9. Implementation sequence, once building is authorized**

1. **Prepare content and assets:** establish approved wording, image permissions, log material and contact routes.
2. **Design the static experience:** page layouts, typography, image selection and mobile structure.
3. **Prototype the jar sequence:** validate appearance, scrolling and performance on desktop and mobile.
4. **Build the complete pages:** integrate approved content, navigation, workshops and enquiries.
5. **Add restrained motion:** preserve the quality of the static and reduced-motion versions.
6. **Verify and review:** check content accuracy, permissions, booking links, keyboard access, mobile layouts and loading performance.
7. **Prepare for launch:** supply a reviewable site and resolve publication details before deployment.

**10. Inputs needed before implementation**

The practical gaps are:

- Actual image files and any permission confirmations.
- A ferment-log entry and prep-list extract suitable for public display.
- Apprenticeship details and current enquiry status.
- Confirmed workshop information and booking route.
- Public contact details.
- Whether you want to edit workshop listings yourself.

The finished site should make your way of working memorable, while letting an apprentice, workshop visitor or writer reach the information they need directly.
