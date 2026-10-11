import type { FaceDef } from "@/components/story/types";

const beats = ["opening.assembly", "middle.relationship", "close.evidence"] as const;
const panels = [[0.75, 0.565], [0.73, 0.635], [0.65, 0.69], [0.75, 0.67]] as const;
const ink = "#23382f";
const pale = "#e2e7cf";
const orange = "#ac5535";
const mono = "'Courier New', monospace";

function label(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, size: number, color: string, weight = 400) {
  ctx.fillStyle = color;
  ctx.font = `${weight} ${size}px ${mono}`;
  ctx.fillText(text, x, y);
}

function rule(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, color: string, dash = false) {
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.setLineDash(dash ? [7, 10] : []);
  ctx.moveTo(x, y); ctx.lineTo(x + width, y); ctx.stroke();
  ctx.setLineDash([]);
}

function arrow(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, color: string) {
  ctx.strokeStyle = color; ctx.lineWidth = 5;
  ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + width, y);
  ctx.moveTo(x + width - 16, y - 11); ctx.lineTo(x + width, y); ctx.lineTo(x + width - 16, y + 11);
  ctx.stroke();
}

function dot(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, color: string, fill = false) {
  ctx.strokeStyle = color; ctx.fillStyle = color; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.arc(x, y, radius, 0, Math.PI * 2);
  if (fill) ctx.fill(); else ctx.stroke();
}

function header(ctx: CanvasRenderingContext2D, number: string, role: string, height: number, color: string) {
  label(ctx, number, 48, 61, 35, color, 700);
  label(ctx, role, 138, 61, 35, color);
  rule(ctx, 48, 90, 904, color);
  label(ctx, "ILLUSTRATIVE / MOSSLink", 48, height - 37, 25, color);
}

function consoleFace(ctx: CanvasRenderingContext2D, height: number) {
  ctx.fillStyle = "#27392f"; ctx.fillRect(0, 0, 1000, height);
  header(ctx, "01", "FIRMWARE", height, "#a9b798");
  label(ctx, "COMMAND", 48, 220, 123, pale, 700);
  label(ctx, "to the board", 53, 290, 51, "#c4cbb3");
  rule(ctx, 48, 346, 904, "#6d7d62", true);
  label(ctx, "INPUT", 52, 413, 33, "#a9b798");
  label(ctx, "firmware", 52, 485, 54, pale);
  arrow(ctx, 476, 463, 118, "#c3ba7f");
  label(ctx, "board", 637, 485, 54, pale);
  label(ctx, "A command begins the test.", 52, 597, 33, "#c3ba7f");
  rule(ctx, 48, height - 95, 904, "#6d7d62");
}

function boardFace(ctx: CanvasRenderingContext2D, height: number) {
  ctx.fillStyle = "#8c9f8a"; ctx.fillRect(0, 0, 1000, height);
  header(ctx, "02", "BOARD / GENERIC", height, ink);
  label(ctx, "RESPONSE", 49, 228, 122, ink, 700);
  label(ctx, "from hardware", 51, 296, 50, ink);
  const y = 432;
  ctx.strokeStyle = "#4c6351"; ctx.lineWidth = 3;
  ctx.strokeRect(51, y - 47, 295, 155);
  ctx.strokeRect(637, y - 47, 307, 155);
  label(ctx, "command", 77, y + 17, 42, ink);
  label(ctx, "received", 83, y + 69, 33, ink);
  arrow(ctx, 392, y + 29, 185, ink);
  label(ctx, "response", 656, y + 17, 41, ink);
  label(ctx, "to check", 682, y + 69, 33, ink);
  rule(ctx, 51, 614, 893, "#4c6351", true);
  label(ctx, "A response to inspect.", 52, 696, 34, ink);
  label(ctx, "FORM, NOT CIRCUIT TOPOLOGY", 52, height - 111, 26, "#405646");
}

function fixtureFace(ctx: CanvasRenderingContext2D, height: number) {
  ctx.fillStyle = "#2d3c34"; ctx.fillRect(0, 0, 1000, height);
  header(ctx, "03", "BRING-UP FIXTURE", height, "#c1c8ab");
  label(ctx, "ACCESS", 55, 240, 165, pale, 700);
  label(ctx, "POINTS", 55, 376, 165, pale, 700);
  label(ctx, "between board and bench", 56, 458, 37, "#c1c8ab");
  rule(ctx, 55, 516, 890, "#6e7b63", true);
  const nodes = [133, 500, 867];
  for (let i = 0; i < nodes.length; i++) {
    dot(ctx, nodes[i], 643, 28, "#c3ba7f", i === 1);
    if (i < nodes.length - 1) arrow(ctx, nodes[i] + 58, 643, 246, "#a9b798");
  }
  label(ctx, "board", 66, 734, 38, pale);
  label(ctx, "access", 409, 734, 38, pale);
  label(ctx, "bench", 799, 734, 38, pale);
  rule(ctx, 55, 802, 890, "#6e7b63");
  label(ctx, "Make the response observable.", 57, 879, 33, "#c3ba7f");
}

function observationFace(ctx: CanvasRenderingContext2D, height: number) {
  ctx.fillStyle = "#d4dcc0"; ctx.fillRect(0, 0, 1000, height);
  header(ctx, "04", "BENCH OBSERVATION", height, ink);
  label(ctx, "72h", 45, 287, 213, ink, 700);
  ctx.fillStyle = ink; ctx.fillRect(543, 141, 402, 61);
  label(ctx, "OBSERVED", 574, 185, 51, pale, 700);
  label(ctx, "longest run", 549, 272, 43, ink);
  rule(ctx, 47, 337, 902, ink);
  label(ctx, "2yr", 45, 538, 195, orange, 700);
  ctx.strokeStyle = orange; ctx.lineWidth = 3;
  ctx.strokeRect(543, 395, 402, 62);
  label(ctx, "PROJECTED", 558, 439, 44, orange, 700);
  label(ctx, "battery life", 552, 521, 43, ink);
  rule(ctx, 47, 594, 902, "#76836a", true);
  label(ctx, "Observation ≠ projection", 48, 674, 49, ink, 700);
  label(ctx, "Keep both claims in view.", 49, 739, 36, ink);
}

const painters = [consoleFace, boardFace, fixtureFace, observationFace];

export const faces: FaceDef[] = beats.flatMap(beat => panels.map(([panelWidth, panelHeight], piece) => ({
  id: `${beat}-${piece}`,
  beat,
  piece,
  draw(ctx, width, height) {
    // Paint into the physical panel ratio. The engine's portrait texture can
    // then stretch onto a landscape or square panel without distorting type.
    const logicalHeight = 1000 * panelHeight / panelWidth;
    ctx.scale(width / 1000, height / logicalHeight);
    painters[piece](ctx, logicalHeight);
  },
})));
