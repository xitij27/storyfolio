import {blankFormation,type Formation,type Pose,type BeatFormation} from '../lib/story/formation.ts';
import type {BeatId} from './story.ts';
function whole():Pose[]{return Array.from({length:6},(_,i)=>({position:[(i%3-1)*1.08,i<3?.46:-.46,0],rotation:[0,0,0],size:[1,1]}));}
function make(pieces:Pose[],observe=false):Formation{return {...blankFormation(6),pieces,span:observe?5.1:4.3,rise:observe?3.1:2.9,anchor:[.51,.15],turn:[.16,-.2],near:5,floor:-3,drift:0,sway:[0,0,0]};}
const observed:Pose[]=Array.from({length:6},(_,i)=>({position:i%3===0?[-1.4,i<3?.52:-.52,.35]:[.55+((i%3)-1)*1.13,i<3?.52:-.52,-.3],rotation:[0,0,0],size:[1,1]}));
export const formations={
 'purpose.fixture':{rest:make(whole()),within:make(whole())},
 'observe.radio':{rest:make(observed,true)},
 'handover.whole':{rest:make(whole())}
} satisfies Record<BeatId,BeatFormation>;
