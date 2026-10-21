import type { FaceDef } from "@/components/story/types";
import { story } from "./story";
const roles = ["Firmware", "States", "Command", "Fixture", "Observe", "Estimate", "Run"];
function marking(beat: string, piece: number) {
  if (beat === "command.states" && piece === 0) return ["TEACHING", "Sleep", "no time scale"];
  if (beat === "command.states" && piece === 2) return ["TEACHING", "Transmit", "no current scale"];
  if (beat === "command.documents" && piece < 3) return ["WORKING DOCUMENT", ["State table", "Timing diagram", "Current trace"][piece], "name only"];
  if (beat === "observe.open" && piece === 4) return ["OBSERVATION", "Radio awake", "after failed transmission"];
  if (beat === "record.battery" && piece === 5) return ["ESTIMATE", "Two-year", "projection"];
  if (beat === "record.battery" && piece === 6) return ["RUN", "72 hours", "longest run"];
  if (beat === "record.scope" && piece === 0) return ["SAMPLES", "40", "assembled"];
  if (beat === "record.scope" && piece === 3) return ["BENCH", "6", "tested"];
  if (beat === "record.scope" && piece === 4) return ["EMISSIONS", "Preliminary", "check only"];
  if (beat === "access.mosslink" && piece === 3) return ["FIXTURE", "Mosslink", "teaching model"];
  return [String(piece + 1).padStart(2, "0"), roles[piece], ""];
}
export const faces: FaceDef[] = story.chapters.flatMap(chapter => chapter.beats.flatMap(beat => roles.map((_, piece) => ({
  id: `${beat.id}-${piece}`, beat: beat.id, piece,
  ...(beat.id === "command.states" && piece === 1 ? { src: "/assets/power-states-label.svg" } : {}),
  draw(ctx, w, h, look) {
    if (beat.id === "command.states" && piece === 1) return; // Supplied-loop derivative printed on this solid face.
    // Logical landscape drawing prevents long, shallow physical labels from squashing text.
    ctx.scale(w / 900, h / 350);
    ctx.fillStyle = look.id === "dark" ? "#14252b" : "#edf0e8";
    ctx.fillRect(0, 0, 900, 350);
    ctx.fillStyle = look.accent;
    ctx.fillRect(0, 0, 14, 350);
    const [kicker, title, subtitle] = marking(beat.id, piece);
    ctx.font = "500 56px ui-monospace, monospace";
    ctx.fillText(kicker, 45, 76, 810);
    ctx.fillStyle = look.ink;
    ctx.font = "600 108px ui-monospace, monospace";
    ctx.fillText(title, 42, 206, 810);
    if (subtitle) { ctx.font = "500 55px ui-monospace, monospace"; ctx.fillText(subtitle, 45, 300, 810); }
  },
}))));
