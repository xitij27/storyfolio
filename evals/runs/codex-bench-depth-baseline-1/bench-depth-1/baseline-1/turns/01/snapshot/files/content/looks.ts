import type { Look } from "../lib/story/looks.ts";
export const looks = [{
  id: "light", name: "Bench", ground: "#eeeae0", ink: "#162d2b", faint: "#52625d", accent: "#96502d",
  surface: { color: "#c4ccbf", roughness: 0.72, glows: false },
  lights: { ambient: 1.6, key: 2.4, fill: 0.9, rim: 1 }, floor: "none", shadows: true,
}] as const satisfies readonly Look[];
