import type { FaceDef } from "@/components/story/types";
import { story, type BeatId } from "./story";
const table = ["Scope / Firmware", "Responsibilities / Ada + colleague", "State / Power scheduling", "Transition / Teaching diagram", "Observation / Bench evidence", "Review / Evidence limits"];
const labels: Record<BeatId, readonly string[]> = {
  "scope.opening": table,
  "responsibilities.split": ["Ada / Firmware", "Ada / Power scheduling", "Ada / Bring-up fixture", "Colleague / PCB", "Colleague / Analogue front end", "Colleague / Circuitry"],
  "state.table": ["Working document / State table", "Working document / Timing diagram", "Working document / Current trace", "Ada / Power scheduling", "Illustration / Narrative rows", "Actual firmware entries / Not shown"],
  "transition.diagram": ["Sleep", "→ Measure", "Measure", "→ Transmit", "Transmit", "→ Sleep"],
  "observation.fixture": ["Bring-up / Basic operation", "Teaching diagram / Firmware command", "Teaching diagram / Generic board", "Teaching diagram / Fixture", "Teaching diagram / Bench observation", "Limit / No circuit detail"],
  "observation.evidence": ["Assembled / 40 engineering samples", "Bench tested / 6 samples", "Customers / None", "Projected / 2 years", "Longest run / 72 hours", "Full qualification / Unfinished"],
  "review.close": table,
};
export const faces: FaceDef[] = story.chapters.flatMap(chapter => chapter.beats.flatMap(beat => Array.from({ length: 6 }, (_, piece) => {
  const aspect = beat.id === "transition.diagram" ? 2/.42 : beat.id === "responsibilities.split" ? 2.3/.46 : 3.65/.46;
  return {
    id: `${beat.id}-${piece}`, beat: beat.id, piece, aspect,
    draw(ctx, width, height, look) {
      const printedHeight = 1000/aspect;
      ctx.scale(width/1000, height/printedHeight);
      width = 1000; height = printedHeight;
      ctx.fillStyle = look.surface.color; ctx.fillRect(0,0,width,height);
      ctx.strokeStyle = look.faint; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(width*.13,0); ctx.lineTo(width*.13,height); ctx.moveTo(0,height*.93); ctx.lineTo(width,height*.93); ctx.stroke();
      ctx.fillStyle = look.accent; ctx.font = `${height*.24}px monospace`; ctx.fillText(String(piece+1).padStart(2,"0"),width*.035,height*.58);
      ctx.fillStyle = look.ink; ctx.font = `${height*.27}px system-ui`; ctx.fillText(labels[beat.id][piece],width*.17,height*.58, width*.79);
    },
  };
})));
