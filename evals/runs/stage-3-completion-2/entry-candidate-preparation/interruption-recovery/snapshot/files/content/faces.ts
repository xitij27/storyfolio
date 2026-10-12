import type { FaceDef } from "@/components/story/types";
import { story } from "./story";

// Stable face labels avoid illegible old/new text overprint during travel.
export const faces: FaceDef[] = story.chapters.flatMap(chapter => chapter.beats.flatMap(beat =>
  Array.from({ length: story.pieces }, (_, piece): FaceDef => ({
    id: `${beat.id}-${piece}`, beat: beat.id, piece,
    draw(ctx, w, h, look) {
      const dark = look.id === "dark";
      ctx.fillStyle = piece === 1 ? (dark ? "#316853" : "#265f48") : piece === 0 ? look.surface.color : dark ? "#23363c" : "#c7c4b4";
      ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = piece === 1 ? "#bdac66" : dark ? "#78908e" : "#939783";
      ctx.lineWidth = w * 0.006;
      if (piece === 0) {
        ctx.strokeRect(w * .04, h * .04, w * .92, h * .92);
        // Connection paths on the fixture: command → access → observation.
        ctx.beginPath(); ctx.moveTo(w * .18, h * .53); ctx.lineTo(w * .18, h * .76); ctx.lineTo(w * .73, h * .76); ctx.lineTo(w * .73, h * .88); ctx.stroke();
        ctx.fillStyle = look.ink; ctx.font = `600 ${w * .045}px ui-monospace, monospace`; ctx.fillText("BRING-UP FIXTURE", w * .16, h * .13);
        ctx.fillStyle = look.faint; ctx.font = `${w * .027}px ui-monospace, monospace`; ctx.fillText("ADA / ACCESS FOR A BENCH CHECK", w * .07, h * .93);
      } else if (piece === 1) {
        for (let i = 0; i < 5; i++) { ctx.beginPath(); ctx.moveTo(w * (.12 + i * .08), h * .25); ctx.lineTo(w * (.12 + i * .08), h * .46); ctx.lineTo(w * .55, h * .46); ctx.lineTo(w * .55, h * .65); ctx.lineTo(w * .85, h * .65); ctx.stroke(); }
        ctx.fillStyle = "#f4efd4"; ctx.font = `600 ${w * .065}px ui-monospace, monospace`; ctx.fillText("PHYSICAL BOARD", w * .08, h * .78);
        ctx.font = `${w * .038}px ui-monospace, monospace`; ctx.fillText("CIRCUITRY / COLLEAGUE", w * .08, h * .89);
      } else {
        ctx.fillStyle = dark ? "#10201d" : "#e9eedc"; ctx.fillRect(w * .08, h * .13, w * .84, h * .5);
        ctx.fillStyle = dark ? "#c1e2a5" : "#26483a";
        ctx.font = `600 ${w * .105}px ui-monospace, monospace`;
        ctx.fillText(piece === 2 ? "COMMAND" : "OBSERVE", w * .13, h * .35);
        ctx.font = `${w * .063}px ui-monospace, monospace`;
        ctx.fillText(piece === 2 ? "FIRMWARE / ADA" : "BENCH RESPONSE", w * .13, h * .51);
      }
    },
  })),
));
