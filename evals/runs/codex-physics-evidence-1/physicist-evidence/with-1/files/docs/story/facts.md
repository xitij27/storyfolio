# Iris Voss — source-backed facts

Status: source review complete; awaiting the first fact-check response. No concept, storyboard or implementation has been created.

## Identity and direction

- Name: Iris Voss. Source: `material/academic-cv.md`; `material/reference-check.md`.
- Listed role: postdoctoral researcher, Northmere Institute for Measurement. Source: `material/academic-cv.md`. Employment dates and preferred public title remain to confirm.
- PhD in experimental physics, 2022. Source: `material/academic-cv.md`. Institution not supplied.
- Seeking experimental instrumentation and research fellow positions. Source: `material/academic-cv.md`. Priority audience and desired visitor action remain to confirm.
- Contact supplied: iris@example.com. Source: `material/academic-cv.md`. Confirm whether this is a publishable contact address or a placeholder.
- No existing personal site. Source: `material/research-notes.md`.

## Timing calibration: work, decision and evidence

Source for every item in this section: `material/reference-check.md`.

- Lab-approved, simplified reference-source calibration extract; not consortium science data.
- Reference pulses travel through three logical timing paths, A, B and C. Each path's reported time is compared with the same reference time for each pulse.
- Signed residual = reported time minus reference time; positive means late and negative means early. Units: nanoseconds (ns).
- Schematic line lengths do not represent cable lengths; positions do not represent detector geometry.
- A and C reported late; B reported early. A common shift would leave their differences unchanged.
- Iris chose fixed, per-path corrections, implemented the correction table and its application, and performed the held-back reference check.
- A lab engineer supplied reference distribution hardware. Iris did not design the whole detector and is not established as leader of the consortium science analysis.
- First-group mean signed residuals supplied saved corrections. Values were frozen before inspecting a second, held-back pulse group. Both before and after check columns refer to that same second group.

| Path | Saved first-group correction | Held-back mean before | Held-back mean after |
| --- | ---: | ---: | ---: |
| A | +1.8 ns | +2.0 ns | +0.2 ns |
| B | -0.9 ns | -1.0 ns | -0.1 ns |
| C | +2.7 ns | +3.0 ns | +0.3 ns |

- Remaining residual = raw residual minus saved correction. Subtracting B's negative correction moves its time later.
- Summary measure: equal-weight mean absolute value of the three path means. Before: (2.0 + 1.0 + 3.0)/3 = 2.0 ns. After: (0.2 + 0.1 + 0.3)/3 = 0.2 ns. Ratio: 10.
- This supports a tenfold reduction of that specified reference-check measure. It does not establish detector precision, scientific sensitivity, a new physical effect, performance on scientific data, the physical cause of offsets, or continued performance after conditions change.
- Numerical summary is rounded. Remaining residuals are nonzero. No pulse-to-pulse variation, uncertainty estimate, raw sample count or quantified uncertainty budget is supplied.
- Public reproduction or redrawing of this extract and schematic is approved with exact credit: "Timing calibration extract and schematic: Iris Voss, Northmere Institute for Measurement".
- Raw records and unpublished internal plots are restricted and not supplied. No photograph or exact hardware drawing is supplied.

## Publications

- "Timing structure in the Vela array", 2024. CV lists Iris as author; notes specify 84 consortium authors and Iris's contribution statement as timing calibration and validation. Sources: `material/academic-cv.md`, `material/research-notes.md`. Exact citation, author list, link and formal publication status require confirmation. Do not describe Iris as sole author or lead author.
- "Reference-source calibration for modular detectors", 2026. CV calls this a journal paper; notes specify a public preprint and a submission-tracker entry marked "under review". Sources: `material/academic-cv.md`, `material/research-notes.md`. Current status, author list and public link require confirmation. Do not claim journal publication from these sources.

## Funding

- ArrayTime grant, €1.8 million total, 2025–2028, appears under research funding in the CV. Source: `material/academic-cv.md`.
- Grant page names Iris's supervisor as lead; Iris wrote the calibration work-package section. Source: `material/research-notes.md`.
- Do not describe the full award as funding Iris personally secured or led. Confirm preferred attribution and public grant citation before site wording.

## Working materials and assets

- Iris works with a lab notebook, uncertainty budget and calibration protocol. Source: `material/research-notes.md`.
- Public schematics and preprint figures are available according to the notes. Source: `material/research-notes.md`. Creators, specific items and reuse rights are not identified; public availability alone does not establish reuse permission.
- Only the supplied reference-check schematic, procedure and summary have explicit portfolio reuse approval. Source: `material/reference-check.md`.
- Raw consortium data are restricted. Source: `material/research-notes.md`.
- No testimonials, influences, personal learning story, photograph or other project details supplied.

## Gaps

- Current employment dates, PhD institution and links for citations, preprint, grant and any public professional profiles.
- Specific audience priority and final visitor action.
- Valid public contact details.
- Other assets' creators and reuse permissions, if any are proposed later.
- Learning influences and an example of the daily use of the listed working materials.
- Any further exclusions beyond restricted research records.

## Disagreements

1. CV calls the tenfold result "detector precision"; notes and the approved extract narrow it to the defined reference-source residual measure. The extract supplies the supported scope; the broad CV phrase must stay out of site copy.
2. CV calls the 2026 manuscript a "journal paper"; notes say public preprint and under review. Current status remains to confirm; publication must not be inferred.
3. CV funding placement may suggest personal ownership; notes identify supervisor leadership and Iris's work-package writing contribution. The grant total is not established as a personal award.

## To confirm

1. Preferred public role title, employment dates, PhD institution and whether the supplied email is a real public contact.
2. Current publication status, exact citations, authorship and public links for both papers, especially the 2026 preprint versus journal-publication distinction.
3. Preferred funding attribution: calibration work-package section contributor to the supervisor-led €1.8 million ArrayTime grant, 2025–2028; public grant link if available.
4. Who the site is for first and what visitors should do at the end.
5. What else must stay off the site; which additional public figures or schematics, if any, Iris has permission to reuse, with their creators and required credits. The supplied reference-check extract already has approval.
6. How Iris uses the lab notebook, uncertainty budget and calibration protocol in daily work, in her own terms.
7. A book, person, experience or failure Iris learned from, and what it changed in her work.

## User confirmations and disposition of questions

Source for this section: the user's follow-up message in this conversation.

- Timing-result scope confirmed: laboratory reference-source timing calibration residual, not scientific sensitivity or new physics. For the approved extract, use the more precise measure already documented above: equal-weight mean absolute value of the three path means on the same held-back group, 2.0 ns before and 0.2 ns after.
- 2024 paper confirmed published, 84 consortium authors; Iris is not first author and did not lead scientific analysis. Personal contribution: timing calibration and validation.
- 2026 manuscript confirmed separate public preprint, under review, not accepted. This resolves the CV's journal-paper wording for planning.
- ArrayTime confirmed awarded lab grant, €1.8 million, supervisor as principal investigator. Iris wrote the calibration work-package section and did not win or lead the grant personally. This resolves the funding attribution for planning.
- Audience confirmed: physicist and wider hiring panel considering fellowship or research instrumentation positions; they should see what Iris personally made trustworthy.
- End actions confirmed: publication links with status, CV and email.
- Working forms confirmed: protocol, uncertainty budget and notebook. User defines uncertainty budget as recording sources of doubt in a measurement; no quantified budget supplied.
- Public schematics and preprint figures may be used with credits. Specific additional images, credits and links still absent. Only use the supplied approved extract in the present storyboard.
- Extract's reproduction/redrawing permission, exact stated credit, logical rather than physical geometry, fixed first-group corrections and held-back second-group procedure all reconfirmed.
- Iris's procedure choice, implementation and reference check reconfirmed. Engineer's hardware contribution and lack of whole-detector design ownership reconfirmed.
- Nonzero residuals, unknown causes/hardware/sample counts, absent quantified uncertainty budget and limits under changed conditions reconfirmed. No restricted material is supplied or permitted.
- No existing portfolio, teaching award or independent grant; do not invent any.
- User authorizes judgment for uncovered matters and asks that assumptions be disclosed. This authorizes selecting concept and visual taste; it does not supply missing facts.

Remaining missing facts: employment dates, PhD institution, public email validity, exact publication URLs/citations, public grant link and learning influences. Do not infer these. They are unnecessary to choose a concept; links, CV asset and public email are handover dependencies. No personal learning anecdote is planned. Job title and institution may appear as listed in the CV without inferred duties or dates.
