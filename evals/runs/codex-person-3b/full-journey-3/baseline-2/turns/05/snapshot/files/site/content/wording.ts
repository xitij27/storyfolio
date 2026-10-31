export const openingOptions = {
  a: {label:"The work and the way back",words:"I plan migrations of running services and databases, with checks and a prepared way back. A library outage I caused in 2014 is why I care about rollbacks."},
  b: {label:"The starting point",words:"In 2014, I dropped a library catalogue table. Today I work on migrations, databases and reliability, using a runbook, cutover checklist and rollback plan."},
  c: {label:"The work in evidence",words:"My work is planning and sequencing migrations. At Kestrel Freight, I wrote the data-centre exit plan; about 60 engineers across teams delivered the move."},
};
export const closingOptions = {
  a: {label:"An invitation to the intended reader",words:"Going independent in 2027. If your company is planning a migration it is worried about, write to me. Conference organisers are welcome too."},
  b: {label:"A direct invitation",words:"Write to me about a planned migration or a conference talk. I’m going independent in 2027."},
  c: {label:"Start with the work ahead",words:"Bring me the migration you’re planning, or the talk you have in mind. I’m going independent in 2027."},
};
export type WordOption = keyof typeof openingOptions;
export const parseWordOption = (value:unknown):WordOption|undefined => typeof value==="string" && ["a","b","c"].includes(value)?value as WordOption:undefined;
