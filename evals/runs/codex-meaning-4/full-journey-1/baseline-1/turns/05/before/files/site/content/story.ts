import type { StoryDef, BeatIdOf } from '../lib/story/story.ts';
// Spine study: remaining approved beats follow the user's look selection.
export const story = { pieces:8, chapters:[
 {id:'setup',number:1,name:'Set up',role:'opening',beats:[{id:'setup.scope',height:1.25}]},
 {id:'record',number:4,name:'Record',role:'outcomes',beats:[{id:'record.samples',height:1.25}]},
 {id:'handover',number:5,name:'Handover',role:'close',beats:[{id:'handover.answer',height:1}]},
]} as const satisfies StoryDef;
export type BeatId=BeatIdOf<typeof story>;
