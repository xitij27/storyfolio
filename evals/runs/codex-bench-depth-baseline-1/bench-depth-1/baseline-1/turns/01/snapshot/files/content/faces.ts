import type { FaceDef } from "@/components/story/types";
import { story } from "./story";
const labels = ["BENCH MODEL", "GENERIC BOARD", "FIXTURE ACCESS", "COMMAND", "2 YEARS", "72 HOURS"];
export const faces: FaceDef[] = story.chapters.flatMap(chapter => chapter.beats.flatMap(beat => Array.from({length:story.pieces},(_,piece):FaceDef=>({
  id:`${beat.id}-${piece}`, beat:beat.id, piece,
  draw(ctx,w,height) {
    // Correct the engine's portrait canvas to each physical panel's aspect.
    const aspect = [16.9,1.95,8.6,.926,1.309,1.611][piece];
    const scaleY = height / w * aspect;
    const h = height / scaleY;
    ctx.scale(1,scaleY);
    ctx.fillStyle = piece === 1 || piece >= 3 ? "#193e34" : "#b7c2b8"; ctx.fillRect(0,0,w,h);
    const ink = piece === 1 || piece >= 3 ? "#e9edce" : "#193e34";
    ctx.fillStyle = ink; ctx.textAlign="center";
    ctx.font=`600 ${piece===0 || piece===2 ? h*.22 : w*(piece>=4 ? .13 : .075)}px monospace`;
    ctx.fillText(labels[piece],w*.5,h*(piece===0 || piece===2 ? .35 : .22));
    if (piece===3) {
      const words = beat.id === "scheduling" ? ["SLEEP", "↓ MEASURE", "↓ TRANSMIT", "↳ REPEAT"] : ["FIRMWARE", "↓ COMMAND", "BOARD RESPONSE"];
      ctx.font=`${w*.075}px monospace`; words.forEach((word,i)=>ctx.fillText(word,w*.5,h*(.4+i*.14)));
    }
    if(piece===1) {
      ctx.strokeStyle="#719375";ctx.lineWidth=w*.015;
      for(let i=0;i<4;i++){ctx.beginPath();ctx.moveTo(w*.12,h*(.42+i*.12));ctx.lineTo(w*.33,h*(.42+i*.12));ctx.lineTo(w*.4,h*.6);ctx.stroke();}
      ctx.fillStyle="#101e1a";ctx.fillRect(w*.4,h*.4,w*.25,h*.35);
      ctx.fillStyle=ink;ctx.font=`${w*.065}px monospace`;ctx.fillText("RESPONSE",w*.5,h*.9);
    }
    if(piece>=4){ctx.font=`${w*.1}px monospace`;ctx.fillText(piece===4 ? "PROJECTED" : "OBSERVED",w*.5,h*.55);ctx.font=`${w*.058}px monospace`;ctx.fillText(piece===4 ? "CURRENT + ASSUMPTION" : "CONTINUOUS BENCH RUN",w*.5,h*.75);}
    if(piece===0){ctx.font=`${h*.22}px monospace`;ctx.fillText("ILLUSTRATIVE APPARATUS / NOT ACTUAL HARDWARE",w*.5,h*.66);}
  },
}))));
