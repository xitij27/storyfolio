import type { FaceDef } from "@/components/story/types";
import { story } from "./story";
// Fixed inscriptions keep the physical parts recognizable and avoid crossfading words.
export const faces: FaceDef[] = story.chapters.flatMap(chapter => chapter.beats.flatMap(beat => Array.from({length:story.pieces},(_,piece): FaceDef => ({
  id:`${beat.id}-${piece}`, beat:beat.id, piece,
  draw(ctx,w,h,look) {
    const board = piece === 1;
    const bg = board ? "#244d42" : look.surface.color;
    const ink = board ? "#fff8dd" : look.ink;
    ctx.fillStyle=bg; ctx.fillRect(0,0,w,h);
    ctx.fillStyle=ink; ctx.textAlign="center";
    const text=(s:string,y:number,size:number,mono=false)=>{ctx.save();ctx.translate(w/2,h*y);ctx.scale(1,h/w*[4.5,1.65,.78,1.3,1.3][piece]);ctx.font=`${size*w}px ${mono ? 'monospace' : 'system-ui'}`;ctx.fillText(s,0,0,w*0.94);ctx.restore();};
    if(piece===0) {text("BRING-UP FIXTURE",0.4,0.072,true);text("Ada · physical board access",0.73,0.06);}
    if(board) {
      text("BOARD / CIRCUITRY: COLLEAGUE",0.14,0.048,true);
      const xs=[0.18,0.5,0.82]; const names=["SLEEP","MEASURE","TRANSMIT"];
      xs.forEach((x,i)=>{
        ctx.strokeStyle="#c5b681";ctx.lineWidth=w*0.005;ctx.strokeRect(w*(x-0.135),h*0.34,w*0.27,h*0.26);
        ctx.fillStyle=ink;ctx.font=`bold ${w*0.05}px monospace`;ctx.save();ctx.translate(w*x,h*.51);ctx.scale(1,h/w*1.65);ctx.fillText(names[i],0,0);ctx.restore();
      });
      ctx.strokeStyle="#d7b876";ctx.lineWidth=w*0.009;
      ctx.beginPath();ctx.moveTo(w*.32,h*.47);ctx.lineTo(w*.365,h*.47);ctx.moveTo(w*.64,h*.47);ctx.lineTo(w*.685,h*.47);
      ctx.moveTo(w*.82,h*.63);ctx.lineTo(w*.82,h*.74);ctx.lineTo(w*.18,h*.74);ctx.lineTo(w*.18,h*.63);ctx.stroke();
      ctx.fillStyle="#d7b876";
      [.36,.68].forEach(x=>{ctx.beginPath();ctx.moveTo(w*x,h*.47);ctx.lineTo(w*(x-.015),h*.445);ctx.lineTo(w*(x-.015),h*.495);ctx.fill();});
      ctx.beginPath();ctx.moveTo(w*.18,h*.63);ctx.lineTo(w*.165,h*.66);ctx.lineTo(w*.195,h*.66);ctx.fill();
      text("ILLUSTRATIVE CYCLE · NOT TIMING",.93,.043,true);
    }
    if(piece===2) {text("ADA / FIRMWARE",.17,.067,true);text("COMMAND",.46,.105,true);text("power-state",.65,.072);text("scheduling",.79,.072);}
    if(piece===3) {text("MEASURED CURRENT",.15,.06,true);text("sleep + transmit",.30,.059);text("+ assumed interval",.44,.059);text("2 years",.65,.13);text("PROJECTED",.82,.075,true);}
    if(piece===4) {text("CONTINUOUS BENCH RUN",.17,.058,true);text("72 hours",.53,.13);text("OBSERVED",.76,.075,true);}
  },
}))));
