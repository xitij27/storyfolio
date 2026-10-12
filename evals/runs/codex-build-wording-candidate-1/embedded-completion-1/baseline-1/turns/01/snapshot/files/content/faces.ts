import type { FaceDef } from "@/components/story/types";
import { story, type BeatId } from "./story";
const table = ["Scope / Firmware", "Responsibilities / Ada + colleague", "State / Power scheduling", "Transition / Teaching diagram", "Observation / Bench evidence", "Review / Evidence limits"];
const labels: Record<BeatId, readonly string[]> = {
  "scope.opening": table,
  "responsibilities.split": ["Ada / Firmware", "Ada / Power scheduling", "Ada / Bring-up fixture", "Colleague / PCB", "Colleague / Analogue front end", "Colleague / PCB + analogue"],
  "state.table": table,
  "transition.diagram": ["Sleep", "→ Measure", "Measure", "→ Transmit", "Transmit", "→ Sleep"],
  "observation.fixture": ["Firmware command ↓", "Generic board ↓", "Bring-up fixture ↓", "Bench observation", "Checking basic operation", "Explanatory / No circuit detail"],
  "observation.evidence": ["Assembled / 40 engineering samples", "Bench tested / 6 samples", "Customers / None", "Two years / Projection", "Longest run / 72 hours", "Qualification / Unfinished"],
  "review.close": table,
};
export const faces: FaceDef[] = story.chapters.flatMap(chapter => chapter.beats.flatMap(beat => Array.from({ length: 6 }, (_, piece) => {
  const compact = beat.id === "transition.diagram";
  const height = compact ? 210 : 126;
  return {
    id: `${beat.id}-${piece}`, beat: beat.id, piece, aspect: compact ? (2/.42) : 3.65/.46,
    draw(ctx, width, pixels, look) {
      ctx.scale(width / 1000, pixels / height);
      ctx.fillStyle = look.surface.color; ctx.fillRect(0,0,1000,height);
      ctx.strokeStyle = look.faint; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(130,0); ctx.lineTo(130,height); ctx.moveTo(0,height*.93); ctx.lineTo(1000,height*.93); ctx.stroke();
      ctx.fillStyle = look.accent; ctx.font = `${height*.24}px monospace`; ctx.fillText(String(piece+1).padStart(2,"0"),35,height*.58);
      ctx.fillStyle = look.ink; ctx.font = `${height*.27}px system-ui`; ctx.fillText(labels[beat.id][piece],170,height*.58,800);
    },
  };
})));
