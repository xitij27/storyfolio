import type { Look } from "../lib/story/looks.ts";

export const looks = [
  {
    id: "light", name: "Warm", ground: "#f3efe5", ink: "#273b34", faint: "#58636c", accent: "#985533",
    surface: { color: "#fffdf8", roughness: 0.9, glows: false },
    lights: { ambient: 1.5, key: 2, fill: 0.5, rim: 0.6 }, floor: "none", shadows: true,
  },
  {
    id: "dark", name: "Night", ground: "#151e27", ink: "#f3eee2", faint: "#abb9c4", accent: "#efb475",
    surface: { color: "#283745", roughness: 0.8, glows: false },
    lights: { ambient: 1.4, key: 2, fill: 0.7, rim: 1 }, floor: "none", shadows: true,
  },
] as const satisfies readonly Look[];
