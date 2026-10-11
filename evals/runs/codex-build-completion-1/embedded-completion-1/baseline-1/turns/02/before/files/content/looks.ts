import type { Look } from "../lib/story/looks.ts";
export const looks = [
  { id: "light", name: "Bench paper", ground: "#f2efe6", ink: "#282b29", faint: "#62635c", accent: "#87551c", surface: { color: "#fffaf0", roughness: 1, glows: false }, lights: { ambient: 1.5, key: 2, fill: .5, rim: .6 }, floor: "none", shadows: true },
  { id: "dark", name: "Instrument paper", ground: "#202523", ink: "#f4f0e5", faint: "#bbbeb4", accent: "#e5b875", surface: { color: "#353c38", roughness: 1, glows: false }, lights: { ambient: 1.5, key: 2, fill: .5, rim: .6 }, floor: "none", shadows: true },
  { id: "review", name: "Review sheet", ground: "#e9edf0", ink: "#25313a", faint: "#566773", accent: "#305d83", surface: { color: "#f7f9fa", roughness: 1, glows: false }, lights: { ambient: 1.5, key: 2, fill: .5, rim: .6 }, floor: "none", shadows: true },
] as const satisfies readonly Look[];
