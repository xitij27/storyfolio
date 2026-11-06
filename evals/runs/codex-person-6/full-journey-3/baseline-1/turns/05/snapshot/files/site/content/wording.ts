import type { ChapterKey } from "@/stitch/chapters";
export const wording = {
  a: {
    name:"Plain introduction", note:"Recommended: explains the work first, then gives one clear proof.",
    hello:"I’m Dawit Bekele, a platform engineer. I plan moves between computer systems, with checks before the switch and a prepared way back. I wrote the first version of Kestrel Freight’s migration runbook, still own it, and 40 teams use it.",
    contact:"Planning a migration? Write to me about it. Conference organisers are welcome too. I’m going independent in 2027. Reach me at dawit@example.com, or take a copy of my CV.",
  },
  b: {
    name:"The rollback lesson", note:"Leads with the library incident and why a way back matters to you.",
    hello:"I’m Dawit Bekele, a platform engineer. In 2014, I dropped a table at the university library. It is why I care about rollbacks: a prepared way back when a change goes wrong. I wrote the first version of Kestrel Freight’s migration runbook, still own it, and 40 teams use it.",
    contact:"If you’re planning a migration you’re afraid of, write to me. If you’re organising a conference, write about that too. I’m going independent in 2027. My address is dawit@example.com; my CV is here to read or download.",
  },
  c: {
    name:"The migration record", note:"Leads with the scale and carefully scoped measured result.",
    hello:"I’m Dawit Bekele, a platform engineer. At Kestrel Freight, I wrote the plan and sequenced a move of 310 services out of two data centres. About 60 engineers worked across teams. Measured Order API availability was 99.98% over the 26-month programme. My work is migration planning, checks before switching systems, and a prepared way back.",
    contact:"Write to dawit@example.com about a migration you’re planning or a conference talk. I’m going independent in 2027. You can read, print or download my CV here.",
  },
} satisfies Record<string, {name:string;note:string} & Record<"hello"|"contact",string>>;
export const illustrationNote = "Original scene graphics are illustrations.";
export type WordingId = keyof typeof wording;
export const wordingId = (id:string|null): WordingId|null => id && Object.hasOwn(wording,id) ? id as WordingId : null;
export function previewWords(id:WordingId): Partial<Record<ChapterKey,string>> {
  return {hello:`${wording[id].hello} ${illustrationNote}`,contact:wording[id].contact};
}
