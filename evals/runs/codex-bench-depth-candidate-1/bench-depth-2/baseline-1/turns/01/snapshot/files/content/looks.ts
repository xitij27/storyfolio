import type { Look } from "../lib/story/looks.ts";
export const looks = [{
  id: "light", name: "Bench", ground: "#e7e9e3", ink: "#152e30", faint: "#465c5c", accent: "#9a431f",
  surface: { color: "#d5dfd3", roughness: 0.75, glows: false },
  lights: { ambient: 1.6, key: 2.4, fill: 1, rim: 1 }, floor: "none", shadows: true,
}] as const satisfies readonly Look[];
