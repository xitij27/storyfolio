import type {StoryDef,BeatIdOf} from '../lib/story/story.ts';
export const story={pieces:8,chapters:[
 {id:'setup',number:1,name:'Set up',role:'opening',beats:[{id:'setup.scope',height:1.25}]},
 {id:'command',number:2,name:'Command',role:'how',beats:[{id:'command.documents',height:1},{id:'command.states',height:1.25}]},
 {id:'observe',number:3,name:'Observe',role:'what',beats:[{id:'observe.bringup',height:1},{id:'observe.radio',height:1}]},
 {id:'record',number:4,name:'Record',role:'outcomes',beats:[{id:'record.samples',height:1.25},{id:'record.endurance',height:1.25},{id:'record.emissions',height:1}]},
 {id:'handover',number:5,name:'Handover',role:'close',beats:[{id:'handover.answer',height:1}]},
]} as const satisfies StoryDef;
export type BeatId=BeatIdOf<typeof story>;
