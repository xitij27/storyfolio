import type { StoryDef } from '@/lib/story/story';
import { blankFormation } from '@/lib/story/formation';
export const sketchStory = {pieces:1, chapters:[
 {id:'opening',number:1,name:'Where it began',role:'opening',beats:[{id:'opening.one',height:1.5}]},
 {id:'middle',number:2,name:'A cutover',role:'what',beats:[{id:'middle.one',height:1.6}]},
 {id:'close',number:3,name:'Get in touch',role:'close',beats:[{id:'close.one',height:1.2}]}
]} as const satisfies StoryDef;
const pose = {...blankFormation(1),span:7.8,rise:5.8,near:7,anchor:[0.46,0.06] as [number,number],turn:[0.12,-0.23] as [number,number],floor:-3.3};
export const sketchFormations = Object.fromEntries(['opening.one','middle.one','close.one'].map(id=>[id,{rest:pose}]));
export const concepts = {
 route:{number:'01',name:'The return path',world:'A continuous route through live systems',accent:'#71e9c1',ground:'#101e25',ink:'#f2f1e8',faint:'#b3c7cb',opening:'Always a way back.',middle:'Move the writes. Keep the way back.',ending:'Planning a migration?',description:'Follow the path of a write: through a restore, across a dual-write cutover, and back to a complete system.'},
 bench:{number:'02',name:'The cutover bench',world:'A working test rig, opened up for inspection',accent:'#a43d19',ground:'#eeeae0',ink:'#1c2d30',faint:'#526166',opening:'What happens when it goes wrong?',middle:'Rehearse the switch.',ending:'Let’s look at your migration.',description:'An exploded technical bench makes the checks, the write selector and the retained fallback tangible.'},
 runbook:{number:'03',name:'Inside the runbook',world:'A checklist becomes a walkable working diagram',accent:'#dedc87',ground:'#202a23',ink:'#f5f0df',faint:'#bac6b8',opening:'A rollback starts before the cutover.',middle:'Checks before the switch.',ending:'Bring the difficult migration.',description:'A continuous folded runbook opens into a sequence of exit checks, with a database cutover running inside it.'}
} as const;
export type Concept = keyof typeof concepts;
