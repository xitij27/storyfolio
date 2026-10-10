I recommend **“The Workshop Logbook”**: a portfolio organised around how you investigate, design, repair, and check things. Your job cards and workshop notes give it a distinctive structure; the bracket and bike parts provide the 3D and scroll movement.

Its purpose is to help an engineering placement reviewer understand your contribution and current ability within two minutes. **This is the complete plan; no building has started.**

### 1. Overall structure

Create one main page, with three focused project pages for reviewers who want more detail.

The main page follows this order:

| Section | What the reviewer learns |
|---|---|
| Introduction | Who you are, what you study, and the placement you want |
| Three project cards | Your strongest examples and their current status |
| Featured bracket project | Your individual contribution and the limits of the result |
| Bike restoration | How you observe, diagnose, and document practical work |
| Workshop experience and skills | Your co-op experience and tools you use |
| Contact | Email and downloadable CV |

Keep navigation simple: **Projects · About · Contact**, with a visible **CV** link.

### 2. Opening screen

Suggested copy:

> **Mina Park**  
> **Design. Diagnose. Make. Check.**  
> I’m a second-year mechanical engineering student in Sheffield, looking for a placement in mechanical or product design.

Confirm the placement period before publication.

Show **View projects**, **Download CV**, and **Email Mina** immediately. Beside the text, display an interactive 3D view of your bracket with a clear caption:

> Pedal box mounting bracket  
> CAD and simulation complete · Machining planned for November · Physical testing pending

The introduction must remain useful while the model loads.

### 3. The project summaries

Each card contains an image, your role, one useful finding, and a status.

**Formula Student — pedal box bracket**

> Redesigned the mounting bracket as a chassis sub-team member.  
> 18% lighter in CAD and simulation. Not yet manufactured or physically tested.

**Hand-crank phone charger**

> Designed the gear train and housing within a four-person team.  
> The prototype worked, but required four minutes of cranking for 1% charge.

**1984 steel road bike**

> An ongoing restoration, documented from the first inventory through diagnosis and repair.

Do not use the team’s July 2025 placing as evidence of your work. You joined in October 2025.

### 4. Project-page template

Use the same readable structure throughout:

1. **Brief:** what needed doing and any known constraints.
2. **Initial findings:** what you observed or established.
3. **My contribution:** the specific work you carried out.
4. **Decisions:** options considered and reasons for your choices.
5. **Checks and results:** calculations, simulation, measurements, or physical checks, clearly identified.
6. **Current status and next step:** what remains unresolved or untested.
7. **Reflection:** what you learned and would change.

Put a short summary at the top so nobody has to read the full account to understand the project. Include team credits where applicable. Only publish explanations supported by your notes or your account.

### 5. What each project needs

**Bracket**

Show original and redesigned views, explain the documented changes, and state the basis of the 18% comparison. Describe simulation conditions and findings once supplied. Keep manufacturing and physical testing visibly pending.

**Charger**

Show the gear train, housing, and assembled prototype. Explain your contribution separately from the team’s work. Report the poor charging performance plainly, with test context if available. Discuss its cause only where you have evidence; otherwise frame it as something to investigate.

**Bike restoration**

Use the garage-floor inventory photograph as the centrepiece. Select a few strong stories—such as the seized bottom bracket and cracked hub flange—and connect the photographs to findings and decisions. Link to Slow Miles once the real public URL is confirmed.

### 6. Visual design

Use warm paper tones, charcoal text, and a restrained engineering-blue accent. Pair a clear sans-serif typeface with small monospaced labels for dates, parts, and status.

The visual language should resemble a well-kept workshop record:

- Numbered figures and concise captions.
- Fine annotation lines on photographs and CAD views.
- Generous spacing around the main facts.
- Real grease, wear, and workshop surroundings in the photography.

Keep technical labels readable. Avoid decorative gauges or invented specifications.

### 7. 3D and scroll choreography

Use one substantial 3D scene: **the bracket**.

At the introduction it rotates slowly. As the featured project comes into view, scrolling turns it through a few useful angles, revealing annotations about documented design changes. Any direct drag interaction should be optional and clearly signposted.

For the bike, use the actual inventory photograph as an interactive parts map. Selecting a labelled part opens its photographs and repair account. Scroll transitions can move between inventory, inspection, and reassembly images.

Use restrained image reveals elsewhere. Do not lock the reader into long animations or make essential content depend on scrolling through a sequence. An exploded bracket view is appropriate only if the supplied assembly supports it.

### 8. About, skills, and contact

Keep the biography short: second-year BEng student at Hallam Institute of Technology, Hallam Racing member since October 2025, Saturday mechanic at Second Gear Bike Co-op since 2023, and bike restoration writer.

List skills accurately:

- SolidWorks and MATLAB.
- Some Python.
- Lathe and mill workshop induction.

Describe co-op work through actual examples and the job-card process. Omit “hundreds of bikes” unless records substantiate it.

End with a direct placement enquiry invitation, email link, and CV download. No testimonials or unsupported figures.

### 9. Accessibility and performance

All content should work without the 3D scene. Provide static model images on unsupported devices and for reduced-motion preferences. Support keyboard navigation, readable contrast, image descriptions, and clearly visible focus states.

Compress photographs and the CAD export, load 3D separately, and avoid autoplay video. Test that contact details and project summaries remain easy to reach on a phone and a slower connection.

### 10. Assets and facts to prepare

Before implementation, gather:

- Bracket CAD export, before-and-after views, and comparison/simulation notes.
- Charger photographs, relevant drawings, and available test notes.
- Garage-floor inventory photograph and selected restoration sequences.
- A few repair examples supported by job cards, with customer details removed.
- Updated CV, confirmed placement dates, and real contact/blog links.

The folder currently contains text only. The dates and URLs in it need confirming before publication.

### 11. Proposed implementation and review sequence

When you authorise building:

1. Draft the project copy and confirm factual claims.
2. Create a static layout for the main page and project pages.
3. Review readability, hierarchy, and mobile presentation.
4. Add photography, annotations, and the bike parts interaction.
5. Add the bracket scene using Three.js, with static fallbacks.
6. Check accessibility, performance, links, and every published claim.

A lightweight static site, such as Astro, would suit this content, with JavaScript reserved for the interactive elements.

The final review should answer one practical question: **can a placement reviewer identify your role, the evidence, the limitations, and how to contact you within two minutes?**
