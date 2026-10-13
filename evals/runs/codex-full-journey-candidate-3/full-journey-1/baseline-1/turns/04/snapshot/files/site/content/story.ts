import type {StoryDef,BeatIdOf} from '../lib/story/story.ts';
// Approved opening, observation and ending spine. Remaining chapters follow look selection.
export const story={pieces:6,chapters:[
 {id:'purpose',number:1,name:'Purpose',role:'opening',beats:[{id:'purpose.fixture',height:1.5}]},
 {id:'observe',number:4,name:'Observe',role:'what',beats:[{id:'observe.radio',height:1.5}]},
 {id:'handover',number:6,name:'Handover',role:'close',beats:[{id:'handover.whole',height:1.25}]}
]} as const satisfies StoryDef;
export type BeatId=BeatIdOf<typeof story>;
