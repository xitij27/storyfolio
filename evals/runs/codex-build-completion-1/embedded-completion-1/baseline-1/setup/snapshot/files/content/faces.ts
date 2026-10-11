import type { FaceDef } from "@/components/story/types";
import { story } from "./story";
const table = ["Scope / Firmware", "Responsibilities / Ada + colleague", "State / Power scheduling", "Transition / Teaching diagram", "Observation / Bench evidence", "Review / Evidence limits"];
const transition = ["Sleep", "→ Measure", "Measure", "→ Transmit", "Transmit", "→ Sleep"];
export const faces: FaceDef[] = story.chapters.flatMap(chapter => chapter.beats.flatMap(beat => Array.from({ length: 6 }, (_, piece) => ({
  id: `${beat.id}-${piece}`, beat: beat.id, piece, aspect: beat.id === "transition.diagram" ? 2/.42 : 3.65/.46,
  draw(ctx, width, height, look) {
    ctx.scale(width / 1000, height / (beat.id === "transition.diagram" ? 210 : 126));
    width = 1000; height = beat.id === "transition.diagram" ? 210 : 126;
    ctx.fillStyle = look.surface.color; ctx.fillRect(0,0,width,height);
    ctx.strokeStyle = look.faint; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(width*.13,0); ctx.lineTo(width*.13,height); ctx.moveTo(0,height*.93); ctx.lineTo(width,height*.93); ctx.stroke();
    ctx.fillStyle = look.accent; ctx.font = `${height*.24}px monospace`; ctx.fillText(String(piece+1).padStart(2,"0"),width*.035,height*.58);
    ctx.fillStyle = look.ink; ctx.font = `${height*.27}px system-ui`; ctx.fillText(beat.id === "transition.diagram" ? transition[piece] : table[piece],width*.17,height*.58);
  },
}))));
