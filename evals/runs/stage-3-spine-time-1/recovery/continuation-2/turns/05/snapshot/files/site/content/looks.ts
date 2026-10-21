import type { Look } from "../lib/story/looks.ts";
export const lookAlternatives = [
  {
    id: "light", name: "Aluminium", ground: "#f2f0e9", ink: "#202932", faint: "#58636c", accent: "#8d471e",
    surface: { color: "#c8cecb", roughness: 0.65, glows: false },
    lights: { ambient: 1.5, key: 2.4, fill: 0.8, rim: 1 }, floor: "none", shadows: false,
  },
  {
    id: "dark", name: "Anodized", ground: "#14252b", ink: "#f3f0e7", faint: "#b3c5c7", accent: "#83d8c4",
    surface: { color: "#364e55", roughness: 0.65, glows: false },
    lights: { ambient: 1.9, key: 3.4, fill: 1.3, rim: 2.2 }, floor: "none", shadows: false,
  },
] as const satisfies readonly Look[];

// Selected under the user’s explicit delegation; alternatives remain archived.
export const looks = [lookAlternatives[0]] as const;
