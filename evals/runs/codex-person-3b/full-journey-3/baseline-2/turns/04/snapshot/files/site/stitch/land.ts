// The world's land and borders (Natural Earth, public domain), for the
// globe, the map and the book. It is a megabyte, so it is loaded the first
// time a world asks; without it a world keeps its places. Browser only.
import { canvas } from "./paint.ts";

/** Each line is flat longitude, latitude pairs. */
export type Land = { land: number[][]; borders: number[][] };
export type Project = (lng: number, lat: number) => [number, number];

let loading: Promise<Land> | null = null;

export function loadLand(): Promise<Land> {
  loading ??= import("./land.json")
    .then((m) => (m.default ?? m) as Land)
    .catch(() => ({ land: [], borders: [] }));
  return loading;
}

/** Fills the land with a projection that maps [lng, lat] to canvas [x, y]. */
export function fillLand(ctx: CanvasRenderingContext2D, land: Land, project: Project) {
  ctx.beginPath();
  for (const ring of land.land) {
    for (let i = 0; i < ring.length; i += 2) {
      const [x, y] = project(ring[i], ring[i + 1]);
      if (i) ctx.lineTo(x, y); else ctx.moveTo(x, y);
    }
    ctx.closePath();
  }
  ctx.fill();
}

/** Draws the land as dots: a dot wherever the land covers the grid. */
export function dotLand(
  ctx: CanvasRenderingContext2D, land: Land, project: Project, w: number, h: number,
  step: number, r: number, color: string, stretch: (y: number) => number = () => 1,
) {
  const mask = canvas(w, h, (m) => { m.fillStyle = "#000"; fillLand(m, land, project); });
  const data = mask.getContext("2d")!.getImageData(0, 0, w, h).data;
  ctx.fillStyle = color;
  for (let y = step / 2; y < h; y += step) {
    const sx = stretch(y);
    const xs = step * sx;
    for (let x = xs / 2; x < w; x += xs) {
      if (data[(Math.floor(y) * w + Math.floor(x)) * 4 + 3] > 100) {
        ctx.beginPath(); ctx.ellipse(x, y, r * sx, r, 0, 0, Math.PI * 2); ctx.fill();
      }
    }
  }
}
