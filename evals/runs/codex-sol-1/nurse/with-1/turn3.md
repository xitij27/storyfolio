I’ll record ISBAR as the approved direction and expand the plan into a complete page specification, including each interaction, the mobile and fallback experience, and the supporting site requirements. This remains planning only.


The direction is **a handover into clinical informatics**: one page, five ISBAR chapters, and one continuing 3D object made from a handover sheet.

The complete specification is saved in [storyboard.md](/tmp/storyfolio-evals/codex-nurse-with-iFdKnx/docs/story/storyboard.md). Here is the whole plan. Nothing has been built.

**The idea**

The page answers: **How can nursing experience help make clinical systems easier to use safely?**

Your work supplies the evidence: forty hours of observation, identifying three workarounds, getting scanners moved, and leading a five-person handover redesign group. The site makes your contribution clear while crediting the scanning result to pharmacy, IT, night staff and you.

The object is a stylised blank ISBAR sheet divided into five connected paper panels. Its arrangement changes to explain each chapter. It remains recognisable throughout and becomes whole again at the close.

**The page, in order**

1. **Identify — who you are**

   The first screen shows Aoife Brennan, CNM1, and Nursing Informatics Link Nurse, one day a week, at St Brendan’s University Hospital. It introduces your clinical-informatics focus and immediately gives one concrete proof: you led a five-person group redesigning the ISBAR handover form.

   The five panels form a complete sheet in shallow perspective. A brief assembly can introduce it, but your name and evidence appear immediately—there is no loading ceremony.

   Visitors can click **Work**, **Contact**, **CV** once supplied, or any ISBAR chapter. Someone who does not scroll still understands your role, sees evidence and knows where to go next.

2. **Situation — the move you want to make**

   This section explains your intention to move into full-time clinical informatics, addressing hiring teams in hospitals and companies supplying clinical systems. It distinguishes your current one-day-a-week informatics role from your intended next role.

   The Situation panel moves slightly forward; the other four remain connected behind it. This gives the current professional situation a clear place within the handover.

   Visitors can jump straight to your contributions or contact. Optional inline links for **Hospital teams** and **System suppliers** explain the relevance of the same verified work to each audience. They do not create separate versions of your story.

3. **Background — watching how work actually happens**

   This has two beats.

   First, the page establishes your forty hours of observation. Then it shows the three workarounds described in your abstract: wristbands failing to scan after showers, scanners kept away from the medication room, and printed barcode sheets carried in pockets.

   The five panels spread into an organised evidence row. Three carry the workaround headings, one carries the observation contribution, and one retains the ISBAR context. Simple connecting rules make relationships visible without inventing a ward floor plan.

   Visitors can open three labelled explanations. Each opens beside its control and highlights the corresponding panel. No camera flight, forced scrolling or hover-only information. The explanations also work with a keyboard.

   The patient incident does not appear anywhere.

4. **Assessment — what you contributed and what changed**

   This is the largest chapter, with two distinct exhibits.

   **Medication scanning:** your forty hours of watching, identification of the three workarounds, and scanner relocation are presented under **Aoife’s contribution**. The reported **71% → 94%** scanning result appears separately under **Ward-team result**, with pharmacy, IT and night staff credited alongside you.

   The panels align these two categories so attribution is visible. The percentages remain readable, static evidence; they do not count up theatrically. We make no claim that you alone caused the improvement or that the figures demonstrate fewer medication errors.

   Visitors can expand the contribution details without changing the scene or losing their place.

   **ISBAR redesign:** the page shows your leadership of a group of five and the five familiar ISBAR sections. Once supplied, the permitted empty old and new forms appear together.

   Two panels become the form comparison; the remaining three carry context and attribution. Desktop visitors see **Old** and **New** side by side. Each can be enlarged with clear close controls and keyboard support. There is no drag-only comparison slider.

   Until the actual blank sheets arrive, the plan uses a clearly labelled conceptual ISBAR structure. It does not invent layout changes, benefits or adoption figures.

5. **Recommendation — the professional handover**

   The close brings together the supported pattern in your work: observing practice, identifying workarounds, helping implement changes, and leading a handover redesign group.

   It connects that evidence to your intention to work in clinical informatics full time. The five panels reconnect into the complete sheet, with Recommendation facing the visitor.

   Visitors can use a direct email link, read and copy the address, download your current CV, or return to the work. A LinkedIn link can be included once its public address is supplied.

   A small footer holds your name, return-to-top link and any required legal/privacy link.

**Scrolling and navigation**

On a wide screen, readable text sits beside a sticky scene occupying roughly 40% of the layout. The page targets about eight screen-heights, adjusted to the actual content. Transitions are short; settled states give people time to read.

Scrolling remains native. There is no scroll hijacking, automatic advancement, continuous spinning or required object manipulation. Scrolling backwards returns predictably to earlier arrangements.

A five-item ISBAR rail provides chapter jumps and indicates the current section. Each section has a direct link, so someone can share Assessment or arrive there without watching the opening.

**The look**

The selected palette comes from paper and ink:

| Use | Colour |
|---|---|
| Page and paper ground | Warm off-white `#F4F1E9` |
| Main text and rules | Dark ink `#18302F` |
| Links, selection and emphasis | Deep teal `#096C67` |

The panels have matte surfaces, fine form rules and restrained shadows. Depth comes from spacing and light. Generous margins keep the clinical-document reference readable.

**Source Sans 3** carries the prose; **IBM Plex Sans** carries form labels and panel headings. Body text is approximately 18px on desktop and 16–18px on phones, with comfortable line spacing. Essential text never becomes tiny merely to resemble a printed form.

No hospital logo or whiteboard photograph is used. A portrait is optional; the concept does not depend on one.

**On a phone**

The phone version preserves all five chapters in the same order, using a single column and flat ISBAR illustrations at chapter boundaries.

A compact menu replaces the desktop chapter rail. Forms stack vertically with explicit Old/New labels. Controls have generous tap targets, and details expand inline.

There is no sticky full-screen canvas, sideways page movement or long stretch of scrolling devoted only to an animation. The page becomes shorter because it follows the content’s height rather than reproducing desktop animation distances.

**Without 3D or motion**

| Condition | Experience |
|---|---|
| Reduced motion | Static document arrangements; no rotation, parallax or animated transitions. |
| WebGL unavailable | Flat SVG/HTML panels explain the same observations, contributions and attribution. |
| JavaScript unavailable | Complete HTML sections, anchor navigation, ordinary images, native disclosures and working contact/CV links. |
| Scene or image fails | Text and evidence remain readable; the scene has a flat fallback and images have useful descriptions. |

All essential information lives in ordinary HTML. Keyboard navigation, visible focus, a skip link, clear headings, accessible contrast and zoom support are requirements. A printable version presents the work, attribution and contact details without the canvas.

**Everything else the site needs**

| Item | Initial scope |
|---|---|
| Navigation | Header, ISBAR chapter links, work/contact shortcuts and direct section URLs. |
| Project detail | Inline details for scanning and handover work. Separate project pages can come later. |
| Other work | Dashboards, poster and further projects added only when contribution and permissions are clear. |
| Contact and CV | Direct contact and an accessible downloadable CV; no published placeholders. |
| Testimonials | Later, if approved quotations are supplied. |
| Language | English initially. |
| Search visibility | Indexable HTML, accurate titles/descriptions, canonical URL and sitemap. |
| Shared links | Preview featuring your name, official titles and an original empty ISBAR illustration. |
| Site icon | A simple original mark derived from the form. |
| Missing-page screen | Clear route back to the portfolio and contact. |
| Accessibility | Keyboard, screen-reader, reduced-motion, zoom and fallback checks. |
| Performance | Text loads before the scene; simple geometry, reserved image dimensions and rendering that stops when idle/offscreen. |
| Privacy/legal information | Determined by the actual hosting and data handling. |
| Analytics/contact form | Deferred; direct contact is sufficient initially. |
| Blog and chat | Outside the initial scope. |
| Maintenance | Clearly separated editable role text, contact details, CV, evidence and permitted assets. |
| Domain and hosting | Selected before a future launch; no purchase or publication now. |

**Assumptions and remaining inputs**

I assumed English, direct contact as the final action, and no portrait requirement. Those choices can change without changing the concept.

The practical inputs still needed are your public contact method, current CV and permitted blank handover sheets. Detailed statistical wording needs the scanning measure and dates confirmed. Unconfirmed education status, career totals, adoption figures and dashboard outcomes remain outside the proposed content.

The direction is approved and the planning handover is complete. Building is outside this planning version and has not started.
