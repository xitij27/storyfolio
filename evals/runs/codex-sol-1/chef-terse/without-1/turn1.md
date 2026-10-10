I’ll review the material folder and the project setup, then propose a visual direction and build plan without changing any files.


I’d build this around **“The Living Larder”**: a portfolio that feels like stepping into your kitchen, with a 3D wall of preserving jars as its centrepiece. Fermentation, resourcefulness and teaching give it a distinctive story.

The material describes your photos and *Brine* scans, but only the two text files are currently present. The design would reserve space for those assets.

**Visual direction**

Warm cream, deep brown, muted seaweed green and amber glass. Large editorial typography paired with handwritten jar labels, dates and small annotations. Your food photography would supply the colour and texture; the 3D would make the larder feel alive.

**The scrolling experience**

1. **An opening with presence.** “Ines Okafor — Chef, preserver, teacher.” A small collection of 3D jars slowly rotates behind the introduction. Scrolling moves the camera toward the shelf.

2. **Inside the larder.** Jars come into focus as you scroll, introducing your 40+ ferments, vinegars and garums. Selecting a jar reveals a real photograph and a short story once you’ve supplied the details. The same content works through ordinary links on mobile.

3. **What happens before service.** An illustrated sequence follows trim, stems and whey into the preserving process. The strongest evidence anchors this section: kitchen food waste reduced from **14 kg to 5 kg per week**. Callum’s quote sits alongside it.

4. **At the table.** Large dish photographs and concise captions show the work at Saltmarsh. Gentle image movement and overlapping layouts provide rhythm without making visitors wait through animations.

5. **Passing it on.** Apprentices, the first-Monday workshops and Sunday Pot introduce your work beyond service. Your grandmother’s ogiri pot could become the personal centre of this section, with your own words explaining its significance.

6. **Brine and contact.** Four zine covers form a browsable stack, opening into readable excerpts or scans. Finish with a compact career history and clear routes for workshop enquiries, collaborations and contact.

**How I’d build it**

- Use React with Three.js through React Three Fiber for the jars, and GSAP for coordinated scroll animation.
- Keep the writing, photographs and navigation in regular HTML so the portfolio stays usable while the 3D loads.
- Create one focused 3D scene and reuse it across the opening and larder sections.
- Provide lighter effects on phones, reduced-motion support and a static fallback.
- Avoid scroll hijacking, custom cursors and effects that interfere with reading.

**Build sequence**

First, settle the page structure and draft the copy from your material. Next, design the opening and a representative content section for review. Then prototype the jar scene, assemble the full page, add the actual imagery and test performance, accessibility and mobile behaviour.

Before implementation, we should settle the main contact goal and gather the photos, zine scans and jar stories. There’s also one date discrepancy to resolve: LinkedIn lists Head Chef from March 2022, while your notes say you took over the kitchen in September 2022.

No files have been changed or built.
