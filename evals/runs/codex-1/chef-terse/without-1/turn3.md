I recommend **“Before the menu”**: a portfolio built around the preparation, preserving and teaching that shape your kitchen. A living wall of 3D jars provides the distinctive visual experience; the prep list and ferment log give it substance.

The site should help three audiences act: prospective apprentices understand your kitchen, workshop visitors find a booking route, and food writers find an accurate introduction and contact details.

## 1. Structure and content

Start with one main page, with direct navigation to **The kitchen · Apprentices · Workshops · Brine · About & press**.

### Opening — Before the menu

**Suggested copy**

> Ines Okafor  
> Head Chef at Saltmarsh, Leeds  
>
> **The menu is the last thing we write each week.**
>
> I cook, preserve and teach in a 40-seat restaurant. Most of what matters starts before service—with the prep list, the ferment log and what we decide to keep.

Offer two prominent links: **Apprenticeships** and **Workshops**, with press accessible through navigation.

A small arrangement of 3D jars sits alongside the introduction. The page remains readable and usable while the scene loads.

### The working larder

Show how the kitchen works through three connected moments:

1. **The prep list:** what needs doing today.
2. **The ferment log:** when a jar started, its salt, scheduled checks and readiness.
3. **The plate:** the menu that follows those decisions.

Use an approved, real example from your kitchen. The jars can reveal short ingredient stories through labelled buttons, accessible by keyboard and touch. Any fermentation details should faithfully reflect your records.

Feature the 40+ ferments, vinegars and garums on rotation. Include the koji cupboard at its actual scale; its everyday character is part of the story.

### What we keep

Pair larder and dish photographs with a short explanation of your cooking.

**Proposed waste statement**

> Over one month in 2023, we weighed the whole kitchen’s prep and plate waste and recorded a reduction from 14 kg to 5 kg a week. Bones were excluded because they go to stock.

Present this as a dated observation, without implying the figure is continuously measured or a current guarantee.

Include Callum’s approved quote:

> “Ines turned our bins into a larder. The best thing on the menu most weeks started as something we used to throw away.”

Attribute it to **Callum Reyes, owner of Saltmarsh**.

### Learn in this kitchen

Give prospective apprentices a useful account of the programme:

- Two apprentices a year since 2023.
- What they learn and what a working day involves, once you supply those details.
- How supervision and feedback work.
- How to enquire, and whether applications are open.

Staff meal can help explain the culture through your words and approved photographs. Avoid suggesting there are vacancies until confirmed.

**Primary action:** “Ask about apprenticeships,” adjusted if you have a formal application process.

### First Monday workshops

Make this section practical and easy to reach without completing the scrolling story.

Show the established first-Monday schedule, followed by confirmed information about subjects, location, duration, cost, availability and booking. Include accessibility and dietary information where relevant and known.

**Primary action:** “Book a workshop” when a booking destination exists; otherwise, “Enquire about workshops.”

Do not introduce a custom booking system unless you need one.

### Brine

Introduce *Brine*, your preserving zine, with four issues published between 2022 and 2025.

Initially, this can be a typographic section with approved descriptions. Once Olu agrees, use the scans and credit his drawings explicitly. A simple issue viewer could then offer large pages, keyboard navigation and readable text alternatives.

The plan does not depend on permission arriving.

### About, Sunday Pot and press

Close with your grandmother’s ogiri pot and a short personal account of the influences behind your work, including Sandor Katz’s books.

Include **Sunday Pot**, which you co-founded in 2021: a hot meal every Sunday at St Aidan’s hall, cooked from restaurant surplus.

Keep the career history concise:

| Experience | Public wording |
|---|---|
| Saltmarsh | Head Chef, September 2022–present. Acting head chef from March 2022 can appear in the longer biography. |
| The Corn Exchange Kitchen | Sous Chef, June 2019–February 2022. |
| Brassica | Chef de Partie, September 2016–May 2019. |
| Fjaerland Fermentation Lab | Ten-week unpaid stage in 2018: washed and labelled jars and helped on two batches of garum. |
| Leeds Kitchen College | Diploma in Professional Cookery, 2014–2016. |

Give food writers a short, copyable biography and a clearly labelled press contact. Add downloadable press photographs only once their distribution rights are confirmed.

## 2. Visual direction

Use **warm paper, dark ink, muted green and amber**, with generous space and large documentary photographs.

Pair an expressive serif for headlines with a highly readable sans serif for body text. Small log entries can borrow their layout from kitchen records. Handwritten details should come from your actual labels where possible.

The imagery should move between scales: a whole shelf, a jar label, preparation, a finished dish and your grandmother’s pot. This creates variety while keeping the site recognisably yours.

## 3. 3D and scroll choreography

Use **one main 3D scene**, limited to the opening and working-larder story.

| Moment | Movement | Purpose |
|---|---|---|
| Arrival | Subtle depth and glass reflections | Establish the larder’s physical character. |
| Prep list | Camera shifts toward selected jars | Connect daily work to preserving. |
| Ferment log | One jar comes forward alongside its record | Focus attention on observation and time. |
| Plate | Scene yields to a large dish photograph | Show how preparation informs the menu. |
| Remaining sections | Restrained image and text reveals | Keep apprenticeships and booking easy to read. |

Keep natural scrolling. Avoid scroll hijacking, custom cursors, autoplay sound and continuous decorative spinning.

On mobile, simplify or replace the scene with an optimized still composition. Reduced-motion preferences get static content. Every interaction must work without hover, and essential information must remain outside the 3D canvas.

## 4. Assets, credits and privacy

| Material | Treatment |
|---|---|
| Your phone photographs and pot photograph | Initial visual foundation; inspect for faces, prices and private details. |
| Priya’s restaurant photographs | Confirm permission for this site; credit Priya Nair alongside images or in clearly associated captions. |
| Olu’s drawings and Brine scans containing them | Hold until Olu gives permission; agree attribution and permitted uses. |
| Callum’s quotation | Approved for use with attribution. |
| Prep lists and ferment logs | Publish selected, approved extracts with private information removed. |
| Staff photographs | Use identifiable faces only after you confirm you have asked those people. |
| Supplier prices | Exclude from images, documents, downloads and public assets. |

Sensitive details should be removed from the published files themselves, rather than merely hidden by page styling.

## 5. Technical approach

Use **Next.js** for the site, **React Three Fiber** for the jars, and **GSAP ScrollTrigger** for the coordinated scroll sequence.

Keep the initial version straightforward:

- Pre-rendered, readable HTML for content and navigation.
- Structured content files for easy updates.
- Responsive, compressed photographs.
- Progressively loaded 3D with a static fallback.
- Existing booking and email destinations where available.
- Page metadata and social previews suited to your name, Saltmarsh and Leeds workshops.

A CMS can be added if frequent updates warrant it; it isn’t necessary for the first version.

## 6. Build sequence, once authorized

1. **Prepare content and assets:** settle copy, permissions, selected images and contact destinations.
2. **Design the page:** desktop and mobile layouts, typography, colour and a storyboard for the jar sequence.
3. **Build the readable site:** complete content, navigation and audience actions.
4. **Add 3D and motion:** integrate the jars, scroll transitions and fallbacks.
5. **Verify:** check factual wording, credits, privacy, keyboard access, reduced motion, mobile performance and booking/contact links.
6. **Review for launch:** present the completed site for review before publication.

The site is ready when each audience can reach its next step quickly, every claim has the right context, and the experience remains complete without animation.

## 7. Inputs needed before implementation

- Selected photographs and any usage permissions.
- One approved prep-list and ferment-log example.
- Apprentice programme details and enquiry destination.
- Workshop details and booking destination.
- Public contact details and preferred press contact.
- Olu’s decision if his work is to appear at launch.

**This is the complete recommended plan. Nothing has been built or changed.**
