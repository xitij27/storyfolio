import type { FaceDef } from "@/components/story/types";
import { story } from "./story";
// Canvas diagrams are authored teaching illustrations, never recovered lab records.
export const faces: FaceDef[] = story.chapters.flatMap(c=>c.beats.flatMap(b=>Array.from({length:6},(_,piece)=>({
 id:`${b.id}-${piece}`,beat:b.id,piece,aspect:piece===0?7:piece>3?1.65:1,
 draw(ctx:CanvasRenderingContext2D,w:number,h:number) {
 ctx.fillStyle=piece===1?'#163e35':'#e2e8da';ctx.fillRect(0,0,w,h);
 ctx.scale(w/600,h/(piece===0?110:500));
 const ink=piece===1?'#e3ebd7':'#193e38';
 function text(s:string,x:number,y:number,size=30,color=ink){ctx.fillStyle=color;ctx.font=`${size}px ui-monospace, monospace`;ctx.textAlign='center';ctx.fillText(s,x,y);}
 function line(x:number,y:number,a:number,d:number,color='#b56b39'){ctx.strokeStyle=color;ctx.lineWidth=5;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(a,d);ctx.stroke();}
 if(piece===0 && b.id==='scope'){text('6 / 40 BENCH-TESTED · 0 CUSTOMERS',300,32,25);text('1 EMISSIONS PRE-CHECK PASSED',300,64,22);text('FULL QUALIFICATION UNFINISHED',300,95,21);return;}
 if(piece===0){text('ADA · BRING-UP FIXTURE',300,35,32);text('ACCESS TO A PHYSICAL CHECK',300,68,24);text('ILLUSTRATIVE APPARATUS',300,96,18);return;}
 if(piece===1){
 text('BOARD RESPONSE',300,60,30);text('PCB + ANALOGUE: COLLEAGUE',300,110,20);
 const pts=[[135,210],[465,210],[300,370]];
 line(200,210,385,210);line(440,260,355,330);line(245,330,155,260);
 text('→',300,200,34);text('↙',408,302,34);text('↖',192,302,34);
 pts.forEach((p,i)=>{ctx.fillStyle='#2f6253';ctx.fillRect(p[0]-92,p[1]-30,184,60);text(['Sleep','Measure','Transmit'][i],p[0],p[1]+10,27);});
 text('ILLUSTRATIVE LOOP · NO TIMINGS',300,465,20);return;
 }
 if(piece===2){text('ADA',300,85,45);text('FIRMWARE',300,165,54);text('COMMAND',300,280,49);text('→',300,380,70);return;}
 if(piece===3){text('BENCH',300,85,45);text('OBSERVE',300,165,54);text('RESPONSE',300,280,49);text('←',300,380,70);return;}
 if(piece===4){text('PROJECTION',300,65,38);text('2 YEARS',300,175,75);text('Measured current',300,270,35);text('+ assumed interval',300,335,32);text('NOT OBSERVED',300,440,32);return;}
 text('BENCH RUN',300,65,42);text('72 HOURS',300,175,72);text('Observed on bench',300,280,34);text('≠ two-year proof',300,355,34);text('NO FIELD CLAIM',300,440,30);
 }
}))));
