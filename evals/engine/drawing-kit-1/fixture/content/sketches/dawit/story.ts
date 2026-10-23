import type { StoryDef } from "@/lib/story/story";
import type { Look } from "@/lib/story/looks";
import { blankFormation, type BeatFormation, type Formation } from "@/lib/story/formation";
import { measure, stack } from "@/lib/story/layouts";

export const story = {
  pieces: 1,
  chapters: [
    { id: "where", number: 1, name: "Places", role: "where", beats: [{ id: "where.one", height: 1.6 }] },
    { id: "when", number: 2, name: "Roles", role: "who", beats: [{ id: "when.one", height: 1 }] },
    { id: "runbook", number: 3, name: "Runbook", role: "how", beats: [{ id: "runbook.one", height: 2 }] },
    { id: "database", number: 4, name: "Orders database", role: "what", beats: [{ id: "database.one", height: 2 }] },
    { id: "oncall", number: 5, name: "On-call", role: "outcomes", beats: [{ id: "oncall.one", height: 1 }] },
  ],
} as const satisfies StoryDef;

/** The board's size, and each chapter's sheet, which covers it. */
export const SHEET: [number, number] = [3.6, 2.5];

// One board that turns a little between chapters; each chapter's sheet grows on it.
function formation(turn: number): Formation {
  const pieces = stack(story.pieces, SHEET), bounds = measure(pieces);
  return {
    ...blankFormation(story.pieces), pieces,
    span: bounds.span * 1.08, rise: bounds.rise * 1.08,
    anchor: [0.38, 0.04], turn: [0.05, turn], near: 4, floor: -3,
  };
}

export const formations: Record<string, BeatFormation> = {
  "where.one": { rest: formation(-0.1) },
  "when.one": { rest: formation(0.08) },
  "runbook.one": { rest: formation(-0.08) },
  "database.one": { rest: formation(0.08) },
  "oncall.one": { rest: formation(-0.1) },
};

export const looks = [
  {
    id: "dark", name: "Night operations", ground: "#0b1917", ink: "#e8eee6", faint: "#9fb3a6", accent: "#acec9d",
    surface: { color: "#20372f", roughness: 0.85, glows: false },
    lights: { ambient: 1.8, key: 2, fill: 0.6, rim: 0.6 }, floor: "none", shadows: false,
  },
  {
    id: "light", name: "Paper", ground: "#f2f0e9", ink: "#202932", faint: "#6b7680", accent: "#b4511f",
    surface: { color: "#fffdf8", roughness: 0.9, glows: false },
    lights: { ambient: 1.5, key: 2, fill: 0.5, rim: 0.6 }, floor: "none", shadows: false,
  },
] as const satisfies readonly Look[];
