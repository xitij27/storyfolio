import type { Look } from "../lib/story/looks.ts";
export const looks = [
  { id: "light", name: "Paper / daylight", ground: "#EEE9DC", ink: "#283532", faint: "#5c665c", accent: "#a34326",
    surface: { color: "#f7f0df", roughness: .9, glows: false }, lights: { ambient: 1.5, key: 2.6, fill: .5, rim: .3 }, floor: "matte", shadows: true },
  { id: "dark", name: "Desk / lamplight", ground: "#172321", ink: "#F3EDDF", faint: "#b8c1b6", accent: "#DA9A71",
    surface: { color: "#e5d9ba", roughness: .95, glows: false }, lights: { ambient: .95, key: 2, fill: .25, rim: .7 }, floor: "matte", shadows: true },
] as const satisfies readonly Look[];
