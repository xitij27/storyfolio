import {blankFormation,type Pose,type Formation,type BeatFormation} from '../lib/story/formation.ts';
import type {BeatId} from './story.ts';
const p=(x:number,y:number,z:number,w:number,h:number,rz=0):Pose=>({position:[x,y,z],size:[w,h],rotation:[0,0,rz]});
export const assembled=[p(0,1.65,0,3.65,.4),p(0,-1.65,0,3.65,.4),p(-1.65,0,.03,3.65,.4,Math.PI/2),p(1.65,0,.03,3.65,.4,Math.PI/2),p(0,.92,.06,2.2,.34),p(0,-.92,.06,2.2,.34),p(-.92,0,.09,2.2,.34,Math.PI/2),p(.92,0,.09,2.2,.34,Math.PI/2)];
export function frame(pieces:Pose[]):Formation{return {...blankFormation(8),pieces,span:5.4,rise:5.25,anchor:[.48,-.06],turn:[-.2,-.25],near:5,floor:-3.4};}
const access=[p(-1.65,0,0,3.6,.4,Math.PI/2),p(1.65,0,0,3.6,.4,Math.PI/2),...Array.from({length:6},(_,i)=>p(0,(2.5-i)*.58,.05,2.75,.35))];
const openWindow=[p(-1.22,1.6,0,1.8,.4),p(1.22,1.6,0,1.8,.4),p(-1.22,-1.6,0,1.8,.4),p(1.22,-1.6,0,1.8,.4),p(-1.9,.8,0,1.5,.4,Math.PI/2),p(-1.9,-.8,0,1.5,.4,Math.PI/2),p(1.9,.8,0,1.5,.4,Math.PI/2),p(1.9,-.8,0,1.5,.4,Math.PI/2)];
export const formations={
 'setup.scope':{rest:frame(assembled.map((p,i)=>({...p,position:[p.position[0]*1.12,p.position[1]*1.12,p.position[2]+i*.05]}))),within:frame(assembled)},
 'command.documents':{rest:frame(access)},
 'command.states':{rest:frame([...Array.from({length:6},(_,i)=>p(0,(1-Math.floor(i/2))*1.3+(i%2===0?.23:-.23),.04,2.45,.34)),p(-1.65,0,0,3.5,.35,Math.PI/2),p(1.65,0,0,3.5,.35,Math.PI/2)])},
 'observe.bringup':{rest:frame(access.map((v,i)=>i<2?v:{...v,position:[i%2===0?-.95:.95,(2.5-(i-2))*.55,.05],size:[1.4,.35]}))},
 'observe.radio':{rest:frame(openWindow)},
 'record.samples':{rest:frame(Array.from({length:8},(_,i)=>p(0,(3.5-i)*.56,0,3.5,.46)))},
 'record.endurance':{rest:frame(Array.from({length:8},(_,i)=>p(i<4?-1.15:1.15,(1.5-i%4)*.64,0,1.8,.43)))},
 'record.emissions':{rest:{...frame(assembled.map((v,i)=>i===0?{...v,position:[0,2.15,.7],rotation:[-.5,0,0]}:v)),span:6,rise:6.1,anchor:[.48,-.16]}},
 'handover.answer':{rest:frame(assembled)},
} satisfies Record<BeatId,BeatFormation>;
