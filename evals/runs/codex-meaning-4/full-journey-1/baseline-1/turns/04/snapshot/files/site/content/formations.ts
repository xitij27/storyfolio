import {blankFormation,type Pose,type Formation,type BeatFormation} from '../lib/story/formation.ts';
import type {BeatId} from './story.ts';
const p=(x:number,y:number,z:number,w:number,h:number,rz=0):Pose=>({position:[x,y,z],size:[w,h],rotation:[0,0,rz]});
export const assembled=[p(0,1.65,0,3.65,.4),p(0,-1.65,0,3.65,.4),p(-1.65,0,.03,3.65,.4,Math.PI/2),p(1.65,0,.03,3.65,.4,Math.PI/2),p(0,.92,.06,2.2,.34),p(0,-.92,.06,2.2,.34),p(-.92,0,.09,2.2,.34,Math.PI/2),p(.92,0,.09,2.2,.34,Math.PI/2)];
export function frame(pieces:Pose[]):Formation{return {...blankFormation(8),pieces,span:5.2,rise:5.1,anchor:[.48,-.06],turn:[-.2,-.25],near:5,floor:-3.4};}
export const formations={
 'setup.scope':{rest:frame(assembled.map((p,i)=>({...p,position:[p.position[0]*1.12,p.position[1]*1.12,p.position[2]+i*.05]}))),within:frame(assembled)},
 'record.samples':{rest:frame(Array.from({length:8},(_,i)=>p(0,(3.5-i)*.56,0,3.5,.46)))},
 'handover.answer':{rest:frame(assembled)},
} satisfies Record<BeatId,BeatFormation>;
