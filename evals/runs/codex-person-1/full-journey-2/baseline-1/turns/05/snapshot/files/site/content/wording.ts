// Drafts for the explicit whole-beat wording choice. No draft is approved yet.
export const fixedOpening = {
  kicker:"DAWIT BEKELE / MIGRATION WORK",
  proof:"use the runbook whose first version I wrote and which I still own.",
  plan:"Planning to go independent in 2027.",
  contact:"Planning a migration? Get in touch ↗",
  glossary:"Cutover means changing which system is in use. Rollback means returning to an earlier state.",
  illustration:"Illustration · library catalogue on a runbook",
  scroll:"Scroll to open the story ↓",
};
export const fixedClosing = {
  kicker:"GET IN TOUCH",email:"dawit@example.com",viewCV:"View / print CV ↗",downloadCV:"Download HTML CV ↓",
  places:"Addis Ababa → Amsterdam, 2016 → Rotterdam, 2020.",
  illustration:"Illustration · a complete runbook, invitation and CV",back:"Back to the beginning ↑",
};
export const wording = {
  a:{name:"Plain and direct",opening:{title:"Dawit Bekele.",body:"I work on migrations: moving and changing systems. I work from a runbook, a cutover checklist and a rollback plan."},closing:{title:"The next conversation.",body:"I’m planning to go independent in 2027. If your company has a migration it is afraid of, write to me. Conference organisers are welcome too."}},
  b:{name:"Start with the cutover",opening:{title:"Before the cutover.",body:"My work is moving and changing systems. The runbook, the cutover checklist and the rollback plan are what I work from."},closing:{title:"Planning a migration?",body:"I’m planning to go independent in 2027. I want to hear from companies preparing for a migration they are afraid of, and from conference organisers."}},
  c:{name:"Lead with rollback",opening:{title:"A plan for the way back.",body:"I care about rollbacks. I work on migrations, moving and changing systems, with a runbook, a cutover checklist and a rollback plan."},closing:{title:"Let’s talk about the move.",body:"A migration your company is afraid of, or a conference you’re organising: write to me. I’m planning to go independent in 2027."}},
} as const;
export type WordingId=keyof typeof wording;
export function wordingId(value: unknown):WordingId {return typeof value==="string"&&Object.hasOwn(wording,value)?value as WordingId:"a";}
