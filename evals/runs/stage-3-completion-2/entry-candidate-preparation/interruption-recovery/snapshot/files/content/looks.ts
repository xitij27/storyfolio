import type { Look } from "../lib/story/looks.ts";
export const looks = [
  {
    id: "light", name: "Workbench", ground: "#eeeae0", ink: "#20362f", faint: "#526158", accent: "#9c4526",
    surface: { color: "#e4dac4", roughness: 0.78, glows: false },
    lights: { ambient: 1.6, key: 2.8, fill: 0.8, rim: 1.2 }, floor: "matte", shadows: true,
  },
  {
    id: "dark", name: "Instrument", ground: "#101d22", ink: "#edf1de", faint: "#acbdb6", accent: "#b9e697",
    surface: { color: "#33484e", roughness: 0.65, glows: false },
    lights: { ambient: 1.7, key: 3, fill: 1, rim: 1.5 }, floor: "matte", shadows: true,
  },
] as const satisfies readonly Look[];
