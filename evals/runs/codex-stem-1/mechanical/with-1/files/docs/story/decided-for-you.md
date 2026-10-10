# Planning decisions

- Read both material files together and preserve the design notes' qualifications alongside CV claims. Reason: avoid suggesting measured cooling performance, a machined prototype, or sole inventorship. Change by supplying corrected facts and attribution.
- Store planning records in docs/story; do not create site code. Reason: the user explicitly requests planning before construction. Change only on a later request to build.
- Provisionally treat senior mechanical role hiring managers and engineering leads as the audience. Reason: the CV explicitly states the application goal. Change by naming a different audience.
- Do not ask again for working document names or an existing-site decision: both are supplied. Reason: requirements table, tolerance stack, verification plan, and absence of a previous site are explicit in the design notes. Change if those facts are outdated.

## Decisions after the user's delegation

Authority: "For anything I have not covered, use your judgement and tell me what you assumed. Carry on." Unknown facts remain unknown.

| Decision | Why | How to change |
|---|---|---|
| Choose verification matrix over requirements review or assembly-variation story | Best covers requirement → design choice → verification plan for the mechanical design lead | Choose concept 2 or 3 in concepts.md, or revise the central question |
| Use six matrix-row panels as one 3D object | A confirmed working artifact explains relationships without disclosing confidential hardware | Adjust panel layout; don't infer actual component count or reconstruct confidential CAD |
| Use seven chapters and about nine desktop screens | Gives decisions and evidence room without padding a single project | Shorten transitions or merge beats; keep evidence limits visible |
| Select Inspection sheet palette and IBM Plex Sans/Mono | A readable review document connects to the actual artifact | Select Drawing desk or Review room, or request another look |
| Use ordinary browser scrolling and static-first phone diagrams | Reading should work immediately and without motion | Add modest optional phone animation only after performance/accessibility checks |
| Omit the numerical 18°C claim for now | Temperature quantity/location and baseline remain undefined despite confirmed simulated status and units | Supply definitions; include only with simulated conditions, attribution, and evidence limits |
| Exclude confidential files and uncleared photo/slides | Render approval does not extend to other assets | Supply explicit public rights; don't place confidential assets in public build inputs |
| Use schematic diagrams only as labeled simplified explanations | User permits new dimensionless drawings; no accurate geometry is available to recreate publicly | User authors/reviews the simplified drawing; retain the label |
| Propose pressure/leak integrity as a possible verification topic | User confirms it has not been tested; it is relevant to the evidence discussion | Remove or revise; never call it part of the employer's existing plan without confirmation |
| Omit invented requirement values, reasons, tolerance results, pass/fail status, and personal lessons | No supporting facts supplied | Add verified, publicly permissible facts later |
| Keep one supported project, English, and email; defer public CV | Current material and user intent support these; CV claims need updated qualifiers | Add cleared work/translations/a corrected CV when available |
| No current testimonials, chat, blog, or tracking | No supporting material or requirement | Add only with content and an actual need |
| Treat nadia@example.com as a planning placeholder | Supplied address uses example.com; exact public address not confirmed | Confirm or replace before publication |
| Do not treat completing the visual matrix as completing engineering tests | Thermal/pressure evidence does not exist | Keep outstanding evidence labels even in the closing arrangement |

Assumptions reported to the user: senior-role hiring conversation; concise review as the visitor's preferred format; no additional public work/biography available; approved external render is the only cleared existing visual. No guessed claim is used to fill missing facts.

The user subsequently confirmed the recommended direction and requested the complete plan. Interaction decisions: put all controls in HTML; provide native links/disclosures; keep essential evidence visible without clicking; prefer a linked full-size render to an unnecessary modal; use selectable email text when clipboard enhancement is unavailable. These decisions preserve the reading experience and can be changed without changing project facts.
