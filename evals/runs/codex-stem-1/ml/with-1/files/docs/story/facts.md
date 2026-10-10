# Tomas Ibarra — source facts

Read on 10 October 2026. Source statements below are retained for audit; the user corrections at the end supersede them. No website has been built.

## Identity and background

| Source statement | Source | Status / question |
| --- | --- | --- |
| Name: Tomas Ibarra | material/resume.md, name line | Confirm preferred public name with the rest of this reading. |
| Machine learning engineer at Copperfen Inspection, 2023 to present | material/resume.md, role line | Confirm official title, dates, and own responsibilities in plain words. |
| Contact: tomas@example.com | material/resume.md, contact line | Confirm whether this is a real public contact address or a placeholder. |
| MSc in computing, 2023 | material/resume.md, final line | Institution absent; confirm institution if degree is to appear. |
| Seeking applied ML engineering roles | material/resume.md, final line | Confirm audience and desired visitor action. |
| No existing personal site | material/evaluation-notes.md, final line | No migration or replacement decision needed based on provided material. |

## Linewatch

| Source statement | Source | Status / question |
| --- | --- | --- |
| Visual quality inspection / defect detection | material/resume.md, Linewatch lines | Supported project topic; exact application and permissible detail unresolved. |
| Tomas built the model and evaluation pipeline | material/resume.md, contribution line | Four collaborators and an existing architecture are also documented; clarify Tomas's precise contribution and each collaborator's role before claiming ownership. |
| Resume says production-ready; project page is described as calling it a pilot | material/resume.md, Linewatch headline; material/evaluation-notes.md, first paragraph | Unresolved readiness/deployment discrepancy. Actual project page is not in supplied material. |
| Headline score 98%; rare-defect score 61%; same model version | material/evaluation-notes.md, first paragraph | Metric column missing. Do not call either accuracy, recall, precision, or any other metric without confirmation. |
| Archived image evaluation using a held-out split | material/evaluation-notes.md, first paragraph | Offline evaluation context documented; dataset size, dates, composition, metric definitions and ownership unresolved. Does not establish live production performance. |
| Four team members named on project; architecture based on an existing implementation | material/evaluation-notes.md, second paragraph | Names, roles, attribution and permission to show architecture unresolved. |
| First split mixed images of the same component between train and test; Tomas rebuilt the split before reporting these scores | material/evaluation-notes.md, second paragraph | Documented sequence. Do not invent the performance before the rebuild or claim an improvement. Confirm public disclosure permission and how the corrected split was constructed. |
| Split manifest, evaluation table, error review notebook available according to notes | material/evaluation-notes.md, second paragraph | Files not supplied. Ownership, publishable excerpts, confidentiality and contents unresolved. |

## Writing and assets

| Source statement | Source | Status / question |
| --- | --- | --- |
| “Linewatch: rare defects under changing illumination,” Applied Inspection Learning Workshop, 2026, listed as a publication | material/resume.md, publication lines | Acceptance/publication not established. |
| Manuscript in submission tracker; draft preprint and approved diagram; no acceptance notice in pack | material/evaluation-notes.md, third paragraph | Confirm submitted/accepted/published status, authorship, approval scope, and permission to link draft or show diagram. The title does not establish the topic of Tomas's other work. |
| Source inspection images are company material | material/evaluation-notes.md, final line | No permission to show them established. |
| No photographs, quotations, drawings or other project files supplied | Inventory: material/resume.md and material/evaluation-notes.md | Do not assume availability or usage rights. |

## Gaps

- Intended visitor, preferred action and verified contact route.
- Personal description of daily work, documents, rituals and influences.
- Precise individual/team contributions and actual deployment status.
- Metric names, definitions, dataset sizes, time period, uncertainty and score ownership.
- Manuscript status and approved public attribution.
- Publicly usable artifacts and employer disclosure boundaries.
- Degree institution; any additional projects or evidence to feature.

## Disagreements

- “Production-ready” in resume versus “pilot” attributed to project page in notes; actual deployment unknown.
- Resume calls 98% “accuracy”; notes say metric column is lost. Metric identity unresolved for both 98% and 61%.
- Resume labels manuscript a publication; notes establish draft/submission tracking but no acceptance evidence.

## To confirm

1. Is this identity/background reading correct? Confirm official role/title/dates, describe own responsibilities, optionally identify MSc institution, and verify whether contact address is public or a placeholder.
2. What is Linewatch's actual status: offline experiment, pilot, deployed tool or something else? What was used where, by whom, and when? What did Tomas and the other three people each do; what came from the existing implementation?
3. What does each score (98%, 61%) measure? Provide recovered metric names/definitions, evaluation period and sample counts, whether measured/modelled/estimated, and individual/team attribution. If unknown, explicitly leave unknown.
4. May the original split issue and correction be described publicly? How was the corrected split constructed, and what may be claimed about it?
5. Is the manuscript drafted, submitted, accepted or published? Confirm authorship, venue/year and public link if any; what does diagram approval permit, and may the preprint appear?
6. What must stay private, and which company images, diagram or excerpts of manifest/table/notebook may be shown? Identify creators/owners, required credits and any people/client details to omit. Are there other projects or assets with permission to use?
7. Who should visit the site and what should they do at its end?
8. What documents, tools, lists and rituals does Tomas use day to day, by their actual names? What people, books, experiences or failures shaped his work?

## User answers

Source: user's follow-up message in this conversation, 10 October 2026. These answers supersede conflicting resume statements.

| Related source fact / question | User answer | Public-copy consequence |
| --- | --- | --- |
| Linewatch readiness and deployment | “Linewatch is an offline prototype, evaluated on archived images. It has not run on a live production line.” | Say offline prototype, archived-image evaluation; remove production-ready. No production deployment, measured savings or prevented-defect claims. |
| Metrics | “98% is overall accuracy in that held-out evaluation. The rare-defect recall is 61%, meaning it found 61% of the rare defects in that test.” | Both belong to the same model version per notes. Always name the metrics and test context together; neither establishes performance under new factory conditions. No sample counts, class proportions, precision, uncertainty estimates or confusion-matrix cells can be inferred. |
| Team and individual contribution | “We were four people. I owned the split manifest, evaluation code and error analysis. The architecture already existed; I did not invent it.” | Attribute individual work precisely and scores to the team's prototype. Do not retain resume's broad model-building ownership claim. |
| Manuscript | “submitted and awaiting a decision”; “not an accepted or peer-reviewed publication” | Label submission / public preprint, never accepted or peer reviewed. |
| Preprint and abstract diagram | “The authors approved the public preprint and the abstract diagram, which can be linked once I give URLs.” | Plan links pending URLs. The diagram is approved; final file and author credits still needed. Do not substitute an invented architecture diagram. |
| Company images and illustrative assets | “Company images cannot be shown. A drawn example with invented components is fine if labelled as such. Do not invent evaluation images or results.” | Exclude company images. Any authored drawn components must be visibly labelled illustrative and unrelated to evaluation images. |
| Audience / purpose | “I want an applied ML engineering team to see how I check whether a score means anything.” | Primary reader: applied ML team. Focus narrative on evaluation judgment and evidence. |
| Working artifacts | “an experiment record, split manifest, confusion matrix and an error review” | Use these as the site's native form/material. They have not been supplied or approved as public excerpts. |
| Confusion matrix | “counts the kinds of right and wrong predictions, not just one headline percentage” | Explain counts by true/predicted labels. Actual cells unavailable; no fabricated counts or proportional animation implying them. |
| Contact / existing site / testimonials | “Email is the contact route. I have no old portfolio or testimonials.” | Email call to action; no migration or testimonials. Actual usable email remains unknown. |
| Delegation | “For anything I have not covered, use your judgement and tell me what you assumed. Carry on.” | Choose concept, look and ordering without another concept-selection stop; disclose choices. Unknown personal facts remain unknown. |

### Remaining unanswered facts (supersedes earlier To confirm list)

- Public contact email; provided example.com address is unverified. Do not publish it as functioning contact.
- Official title/employer/dates and degree details were not explicitly confirmed. Keep in fact sheet, leave unconfirmed credentials out of public script.
- Dataset size, evaluation period, class distribution, raw confusion-matrix counts and additional performance metrics.
- Exact corrected split construction and permission to disclose original split issue remain unanswered. No public narrative of leakage or correction until explicitly cleared; do not infer component-level disjointness.
- Public excerpt permissions for experiment record, manifest, evaluation code and error review. Ownership of work does not establish publication permission.
- Preprint/diagram URLs, diagram file and author credits.
- Personal influences, other projects, collaborator names and roles. No invented biography or extra projects.

### Resolved disagreements

- Deployment: offline prototype supersedes production-ready and pilot shorthand.
- Scores: 98% overall accuracy; 61% rare-defect recall, both held-out archived-image evaluation, without claims about new conditions.
- Manuscript: submitted and awaiting decision; not accepted or peer reviewed.
