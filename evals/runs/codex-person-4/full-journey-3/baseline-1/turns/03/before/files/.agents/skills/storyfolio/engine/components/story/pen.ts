import type { Look } from "@/lib/story/looks";
import { along, mapProjection, type Bounds, type Box, type Point } from "@/lib/story/figure";
import { wrapText } from "@/lib/story/typeset";
import { getLand, type Line } from "./land";

/*
  A pen for flat figures on a surface: crisp lines in the look's ink, its one
  accent for the subject, faint for everything around it. Everything is
  measured in units of a canvas 1000 wide, whatever its resolution, so
  `pen.w` is 1000 and `pen.h` follows the canvas's shape.
*/

export type Tone = "ink" | "accent" | "faint";
export type Pen = ReturnType<typeof pen>;
export type LineStyle = { tone?: Tone; weight?: number; dash?: readonly number[]; upTo?: number; arrow?: boolean };
export type TextStyle = { size?: number; tone?: Tone; align?: CanvasTextAlign; baseline?: CanvasTextBaseline; weight?: number; width?: number; halo?: boolean; family?: string };

const STEPS = [1, 2, 5, 10, 20, 50, 100];

export function pen(ctx: CanvasRenderingContext2D, width: number, height: number, look: Look, family = "system-ui, sans-serif") {
  ctx.setTransform(width / 1000, 0, 0, width / 1000, 0, 0);
  const h = (1000 * height) / width;
  const paper = look.surface.glows ? "#000000" : look.surface.color;
  const stroke = (tone: Tone, weight: number, dash: readonly number[] = []) => {
    ctx.strokeStyle = look[tone]; ctx.lineWidth = weight; ctx.setLineDash(dash);
    ctx.lineCap = "round"; ctx.lineJoin = "round";
  };
  const path = (points: readonly Point[]) => {
    ctx.beginPath();
    points.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
  };

  const self = {
    ctx, w: 1000, h, look,

    /** Fills the canvas with the look's surface. A glowing look's is black, since its drawing is light. */
    paper() {
      ctx.fillStyle = paper; ctx.fillRect(0, 0, 1000, h);
    },

    /** A line through points, drawn to `upTo` of its length; an arrow points where the drawn part ends. */
    line(points: readonly Point[], { tone = "ink", weight = 3, dash, upTo = 1, arrow = false }: LineStyle = {}) {
      const drawn = along(points, upTo);
      if (drawn.length < 2) return;
      const [ax, ay] = drawn[drawn.length - 2], [bx, by] = drawn[drawn.length - 1];
      const angle = Math.atan2(by - ay, bx - ax), head = 8 + weight * 2.5;
      // The line stops inside the head, so its round end does not show through the point.
      if (arrow) drawn[drawn.length - 1] = [bx - Math.cos(angle) * head * 0.6, by - Math.sin(angle) * head * 0.6];
      stroke(tone, weight, dash); path(drawn); ctx.stroke(); ctx.setLineDash([]);
      if (!arrow) return;
      ctx.fillStyle = look[tone];
      path([[bx, by], [bx - head * Math.cos(angle - 0.45), by - head * Math.sin(angle - 0.45)], [bx - head * Math.cos(angle + 0.45), by - head * Math.sin(angle + 0.45)]]);
      ctx.fill();
    },

    /** A dot, or a ring when `open`: a place, a node, a step not reached yet. */
    dot([x, y]: Point, { r = 8, tone = "accent", open = false, weight = 3 }: { r?: number; tone?: Tone; open?: boolean; weight?: number } = {}) {
      ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fillStyle = open ? paper : look[tone]; ctx.fill();
      if (open) { stroke(tone, weight); ctx.stroke(); }
    },

    /** A box, filled with the paper unless `fill` says otherwise, so lines behind it stop at its edge. */
    box({ x, y, w, h: tall }: Box, { tone = "ink", weight = 3, fill, r = 6, dash }: { tone?: Tone; weight?: number; fill?: Tone; r?: number; dash?: readonly number[] } = {}) {
      ctx.beginPath(); ctx.roundRect(x, y, w, tall, r);
      ctx.fillStyle = fill ? look[fill] : paper; ctx.fill();
      if (weight > 0) { stroke(tone, weight, dash); ctx.stroke(); ctx.setLineDash([]); }
    },

    /**
     * Words at a point; given a `width`, they wrap. `halo` edges them in the
     * paper, to stay readable over lines. Returns the baseline below the last line.
     */
    text(words: string, x: number, y: number, { size = 34, tone = "ink", align = "left", baseline = "alphabetic", weight = 500, width, halo = false, family: face = family }: TextStyle = {}) {
      ctx.font = `${weight} ${size}px ${face}`; ctx.textAlign = align; ctx.textBaseline = baseline;
      const lines = width ? wrapText(words, width, (line) => ctx.measureText(line).width) : [words];
      lines.forEach((line, i) => {
        if (halo) { ctx.strokeStyle = paper; ctx.lineWidth = size * 0.3; ctx.lineJoin = "round"; ctx.setLineDash([]); ctx.strokeText(line, x, y + i * size * 1.25); }
        ctx.fillStyle = look[tone]; ctx.fillText(line, x, y + i * size * 1.25);
      });
      return y + lines.length * size * 1.25;
    },

    /** Fine lines every `step` across a box: the ground a figure is drawn on. */
    grid({ x, y, w, h: tall }: Box, step = 50, { tone = "faint", weight = 1, alpha = 0.3 }: { tone?: Tone; weight?: number; alpha?: number } = {}) {
      ctx.save(); ctx.globalAlpha = alpha; stroke(tone, weight); ctx.beginPath();
      for (let gx = x; gx <= x + w + 0.01; gx += step) { ctx.moveTo(gx, y); ctx.lineTo(gx, y + tall); }
      for (let gy = y; gy <= y + tall + 0.01; gy += step) { ctx.moveTo(x, gy); ctx.lineTo(x + w, gy); }
      ctx.stroke(); ctx.restore();
    },

    /**
     * A time axis along the bottom of a box from one year to another, with
     * years marked as often as their labels fit, and faint guides up the box.
     * Gives the x of a date in years: April 2016 is 2016.25.
     */
    timeline({ x, y, w, h: tall }: Box, from: number, to: number, { tone = "faint", size = 26 }: { tone?: Tone; size?: number } = {}) {
      const at = (year: number) => x + ((year - from) / (to - from)) * w;
      const base = y + tall - size * 1.7;
      const every = STEPS.find((step) => (w / (to - from)) * step >= size * 3.2) ?? 100;
      ctx.save();
      for (let year = Math.ceil(from / every) * every; year <= to; year += every) {
        ctx.globalAlpha = 0.3; self.line([[at(year), y], [at(year), base]], { tone, weight: 1 });
        ctx.globalAlpha = 1; self.line([[at(year), base], [at(year), base + 10]], { tone, weight: 2 });
        self.text(String(year), at(year), y + tall - size * 0.15, { size, tone, align: "center" });
      }
      ctx.restore();
      self.line([[x, base], [x + w, base]], { tone, weight: 2 });
      return at;
    },

    /**
     * A map of `bounds` filling a box, in true proportions, from the world's
     * real coastlines and borders. Gives the point for a latitude and longitude.
     */
    map(box: Box, bounds: Bounds, { tone = "faint", borders = true }: { tone?: Tone; borders?: boolean } = {}) {
      const { at, shows } = mapProjection(bounds, box);
      const land = getLand();
      if (!land) return at;
      const seen = (line: Line) => line.east >= shows.west && line.west <= shows.east && line.north >= shows.south && line.south <= shows.north;
      const trace = (line: Line, closed: boolean) => {
        for (let i = 0; i < line.points.length; i += 2) {
          const [px, py] = at(line.points[i + 1], line.points[i]);
          if (i) ctx.lineTo(px, py); else ctx.moveTo(px, py);
        }
        if (closed) ctx.closePath();
      };
      ctx.save();
      ctx.beginPath(); ctx.rect(box.x, box.y, box.w, box.h); ctx.clip();
      ctx.beginPath();
      for (const line of land.land) if (seen(line)) trace(line, true);
      ctx.fillStyle = look[tone]; ctx.globalAlpha = 0.14; ctx.fill("evenodd");
      ctx.globalAlpha = 0.75; stroke(tone, 1.5); ctx.stroke();
      if (borders) {
        ctx.beginPath();
        for (const line of land.borders) if (seen(line)) trace(line, false);
        ctx.globalAlpha = 0.5; stroke(tone, 1, [4, 4]); ctx.stroke();
      }
      ctx.restore();
      return at;
    },
  };
  return self;
}
