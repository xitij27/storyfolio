import type { FaceDef } from "@/components/story/types";
import { story } from "./story";
const labels = ["FIXTURE", "BOARD", "BENCH", "SLEEP", "MEASURE", "TRANSMIT", "ACCESS"];
const colors = ["#bfc9c4", "#245e55", "#203e42", "#547e81", "#b57937", "#b9573f", "#c4ccc6"];
export const faces: FaceDef[] = story.chapters.flatMap(chapter => chapter.beats.flatMap(beat => labels.map((label,piece) => ({
 id: `${beat.id}-${piece}`, beat: beat.id, piece,
 draw(ctx, w, h) {
   ctx.fillStyle = colors[piece]; ctx.fillRect(0,0,w,h);
   ctx.strokeStyle = "#ffffff35"; ctx.lineWidth = 3; ctx.strokeRect(w*.06,h*.06,w*.88,h*.88);
   ctx.fillStyle = "#faf8ea"; ctx.textAlign = "center";
   ctx.font = `600 ${w*.1}px system-ui`;
   const evidence = ["FIXTURE", "BENCH RUN", "72 h", "CURRENT", "INTERVAL", "2 YEARS", "ACCESS"];
   ctx.fillText(beat.id === "evidence" ? evidence[piece] : label,w*.5,h*.43);
   ctx.font = `${w*.055}px ui-monospace, monospace`;
   const sub = beat.id === "evidence" ? ["ILLUSTRATIVE", "OBSERVED", "OBSERVED", "MEASURED", "ASSUMED", "PROJECTED", "ILLUSTRATIVE"][piece] : piece === 2 ? "OBSERVATION" : "ILLUSTRATIVE";
   ctx.fillText(sub,w*.5,h*.62);
 }
}))));
