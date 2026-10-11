import type { Look } from "../lib/story/looks.ts";
export const looks = [{
  id: "bench", name: "Bench", ground: "#e8e7df", ink: "#192d30", faint: "#475b5b", accent: "#96502b",
  surface: { color: "#d8ded8", roughness: 0.76, glows: false },
  lights: { ambient: 1.6, key: 3, fill: 1.1, rim: 1.8 }, floor: "none", shadows: true,
}] as const satisfies readonly Look[];
