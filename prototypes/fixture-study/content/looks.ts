import type { Look } from "../lib/story/looks.ts";

export const looks = [
  {
    id: "bench", name: "Bench", ground: "#e9e6de", ink: "#202c2a", faint: "#5e6660", accent: "#a84c2d",
    surface: { color: "#e5e1d5", roughness: .65, glows: false },
    lights: { ambient: 1.2, key: 3, fill: .65, rim: 1.7 }, floor: "none", shadows: true,
  },
] as const satisfies readonly Look[];
