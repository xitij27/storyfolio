import type { StoryDef, BeatIdOf } from "../lib/story/story.ts";
export const story = {
 pieces:1,
 chapters:[
  {id:"opening",number:1,name:"Introduction",role:"opening",beats:[{id:"opening.hello",height:1},{id:"opening.library",height:1}]},
  {id:"places",number:2,name:"Places",role:"where",beats:[{id:"places.route",height:1}]},
  {id:"study",number:3,name:"Study",role:"who",beats:[{id:"study.logger",height:1}]},
  {id:"career",number:4,name:"Work history",role:"who",beats:[{id:"career.library",height:1},{id:"career.lumen",height:1},{id:"career.kestrel",height:1}]},
  {id:"practice",number:5,name:"Practice",role:"how",beats:[{id:"practice.plan",height:1.25},{id:"practice.influences",height:1}]},
  {id:"work",number:6,name:"Selected work",role:"what",beats:[{id:"work.waves",height:1.5},{id:"work.database",height:1.75},{id:"work.runbook",height:1.25},{id:"work.oncall",height:1},{id:"work.ferry",height:1},{id:"work.talk",height:1}]},
  {id:"contact",number:7,name:"Contact",role:"close",beats:[{id:"contact.complete",height:1}]},
 ],
} as const satisfies StoryDef;
export type BeatId=BeatIdOf<typeof story>;
