export const fixedWords={
 openingKicker:"Dawit Bekele / migrations & reliability",
 proofNumber:"40 teams",proof:"use the migration runbook whose first version I wrote and still own.",
 audience:"For engineering leaders and conference organisers.",openingScene:"↓ Follow the recovery path",
 closingKicker:"Rotterdam / get in touch",email:"dawit@example.com",speaking:"For migration conversations and speaking enquiries.",talk:"Boring Migrations · SRE North 2024.",
 cvView:"View printable CV ↗",cvDownload:"Download HTML CV ↓",closingScene:"Forward path & return route",
};
// Dawit selected A opening and A closing on 2026-10-23. B/C are archived alternatives.
export const wording={
 a:{name:"The return route",opening:{title:"Keep a way back.",body:"I plan migrations: moving running systems to a new home, with checks before the switch and a rollback plan.",action:"Talk about a migration"},closing:{title:"Let’s talk about your migration.",body:"I wrote and sequenced Kestrel Freight’s 310-service migration plan. I own the runbook used by 40 teams and maintain ferry."}},
 b:{name:"The working method",opening:{title:"Plan the move. Keep the return route.",body:"I work from a runbook, a cutover checklist and a rollback plan. A migration moves a running system to a new home.",action:"Write to Dawit"},closing:{title:"Bring the migration you’re worried about.",body:"I’m going independent in 2027. Write to me about migration planning or a conference talk."}},
 c:{name:"The person and the work",opening:{title:"Migrations, with a way back.",body:"I’m Dawit Bekele. I plan migrations and database cutovers, with checks before switching and a rollback plan.",action:"Start a conversation"},closing:{title:"For the next migration.",body:"My work includes the 310-service migration plan at Kestrel Freight, a runbook used by 40 teams, and ferry’s cutover command. Write to me about your migration or speaking event."}},
} as const;
export type WordingId=keyof typeof wording;
