import type {FaceDef} from '@/components/story/types';
import {story} from './story';
const whole=['CODE','STATE','BOARD','ACCESS','SIGNAL','CLAIM'];
const observed=['OBSERVED','CAUSE\nUNKNOWN','FIX\nUNKNOWN','RADIO\nAWAKE','TIMING\nUNKNOWN','OUTCOME\nUNKNOWN'];
export const faces:FaceDef[]=story.chapters.flatMap(c=>c.beats.flatMap(b=>Array.from({length:6},(_,piece)=>({id:`${b.id}-${piece}`,beat:b.id,piece,draw(ctx,w,h,look){
 const lines=(b.id==='observe.radio'?observed:whole)[piece].split('\n');
 ctx.fillStyle=look.surface.color;ctx.fillRect(0,0,w,h);
 ctx.strokeStyle=look.accent;ctx.lineWidth=w*.018;ctx.strokeRect(w*.04,h*.045,w*.92,h*.91);
 ctx.fillStyle=look.ink;ctx.textAlign='center';ctx.textBaseline='middle';ctx.font=`700 ${h*(lines.length===1?.34:.26)}px ui-monospace,monospace`;
 lines.forEach((line,i)=>ctx.fillText(line,w/2,h*(lines.length===1?.52:.34+i*.32),w*.83));
}}))));
