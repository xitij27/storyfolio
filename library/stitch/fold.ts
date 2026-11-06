// The sheet folded up like a fan: a narrow packet as high as the sheet, each
// panel keeping its own width of paper. Pure, so it is tested without a browser.

/** Where the point (U, V) of a sheet w wide and h high lies, folded into `panels` panels packed `width` across. */
export function fan(U: number, V: number, w: number, h: number, panels = 8, width = 0.5): [number, number, number] {
  const s = Math.min(U * panels, panels - 1e-9), i = Math.floor(s), f = s - i;
  const depth = Math.sqrt(Math.max(0, (w / panels) ** 2 - (width / panels) ** 2));
  return [(U - 0.5) * width, (V - 0.5) * h, ((i % 2 ? 1 - f : f) - 0.5) * depth];
}
