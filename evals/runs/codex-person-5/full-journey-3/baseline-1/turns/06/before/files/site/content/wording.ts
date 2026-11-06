// Review candidates only. Do not apply to site.words until the person chooses.
export const openingVersions = [
  {
    id: "A", label: "The work, plainly", recommended: true,
    text: "I plan migrations of running software systems, with checks before the switch and a route back if something fails. At Kestrel Freight, I wrote the plan and sequenced the move of 310 services out of two data centres. All drawings are illustrations.",
  },
  {
    id: "B", label: "Begin with the rollback lesson", recommended: false,
    text: "The first production outage I caused was at the university library in 2014. I dropped a table. It is why I care about rollbacks. I work from the runbook, the cutover checklist and the rollback plan. All drawings are illustrations.",
  },
  {
    id: "C", label: "Lead with the programme", recommended: false,
    text: "At Kestrel Freight, I wrote the plan and sequenced a 310-service migration in 14 waves over 26 months. Measured Order API availability was 99.98% over those 26 months. I work from the runbook, cutover checklist and rollback plan. All drawings are illustrations.",
  },
] as const;

export const closingVersions = [
  {
    id: "A", label: "A direct invitation", recommended: true,
    text: "Planning a migration, or putting together a conference programme? Write to me at dawit@example.com. My CV is available to read, print or download as HTML.",
  },
  {
    id: "B", label: "Name the uncertainty", recommended: false,
    text: "If your company is planning a migration it is afraid of, write to dawit@example.com. Conference organisers are welcome too. Read, print or download my CV.",
  },
  {
    id: "C", label: "Keep it brief", recommended: false,
    text: "For migration enquiries and conference invitations: dawit@example.com. Read the CV, print it, or download the HTML copy.",
  },
] as const;
