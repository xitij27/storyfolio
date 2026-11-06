// The looks a stitched story can wear: the colours every world draws with,
// and the colours of the words over it. A look colours the ground, paper,
// ink and accent; a world's own materials (the book's desk and page tints)
// stay the same in every look. Pure.

/** `amber` is the accent in every look, whatever its hue. */
export type Palette = {
  bg: string; paper: string; paperDark: string; card: string; ink: string; muted: string;
  amber: string; teal: string; rose: string; blue: string; line: string;
};
export type LookId = "night" | "daylight" | "blueprint";
export const LOOK_IDS: readonly LookId[] = ["night", "daylight", "blueprint"];

export const LOOKS: Record<LookId, Palette> = {
  night: {
    bg: "#0f1318", paper: "#f2ede2", paperDark: "#e3dccd", card: "#fbf7ee", ink: "#1c222a", muted: "#6d7782",
    amber: "#e9a23b", teal: "#3fa796", rose: "#d8665a", blue: "#4c7fd1", line: "#c9c1b0",
  },
  daylight: {
    bg: "#e7e3da", paper: "#fbf8f2", paperDark: "#ebe5d8", card: "#ffffff", ink: "#1c222a", muted: "#5f6872",
    amber: "#c9741f", teal: "#2f8a7b", rose: "#c4513f", blue: "#3d6fc0", line: "#cfc6b4",
  },
  blueprint: {
    bg: "#0e2236", paper: "#eaf0f5", paperDark: "#d5dfe8", card: "#f6f9fb", ink: "#13202c", muted: "#5a6875",
    amber: "#f2b33d", teal: "#48b3a6", rose: "#e27b6b", blue: "#6a9be0", line: "#b9c6d2",
  },
};

export const parseLook = (text: string | null | undefined): LookId | null =>
  (LOOK_IDS as readonly string[]).includes(String(text)) ? (text as LookId) : null;

const rgb = (hex: string): [number, number, number] => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16)) as [number, number, number];
const hex2 = (n: number) => Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, "0");

/** WCAG relative luminance of #rrggbb. */
export function luminance(hex: string): number {
  const [r, g, b] = rgb(hex).map((v) => { const c = v / 255; return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** The WCAG contrast ratio of two #rrggbb colours, 1 to 21. */
export function contrast(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

/** Whether a look's ground is dark, so the words over it are light. */
export const isDark = (p: Palette): boolean => luminance(p.bg) < 0.2;

/** A #rrggbb colour with a transparency, as CSS and canvas take it. */
export const rgba = (hex: string, a: number): string => `rgba(${rgb(hex).join(",")},${a})`;

/** A colour moved by a fixed amount on each channel. */
const shift = (hex: string, d: [number, number, number]) => `#${rgb(hex).map((v, i) => hex2(v + d[i])).join("")}`;

/** The ground behind the worlds: the backdrop's centre, middle and edge, the map's ground, its grid and its land dots. */
export function groundTones(p: Palette): { centre: string; middle: string; edge: string; map: string; grid: string; land: string } {
  const dark = isDark(p);
  return {
    centre: shift(p.bg, [14, 18, 22]),
    middle: shift(p.bg, [1, 2, 3]),
    edge: shift(p.bg, [-5, -6, -7]),
    map: shift(p.bg, [6, 9, 11]),
    grid: dark ? "rgba(255,255,255,0.05)" : "rgba(28,34,42,0.07)",
    land: dark ? "rgba(150,178,186,0.55)" : "rgba(80,96,104,0.45)",
  };
}

/** The colours of the words, rail, caption glass and buttons over a look's ground. */
export function uiColours(p: Palette): { text: string; soft: string; muted: string; glass: string; line: string; onText: string } {
  return isDark(p)
    ? { text: "#ece6d9", soft: "#c9cfd5", muted: "#9aa4ae", glass: "rgba(12, 16, 21, 0.72)", line: "rgba(236, 230, 217, 0.14)", onText: "#11161c" }
    : { text: p.ink, soft: "#2c333b", muted: "#5a636d", glass: "rgba(255, 255, 255, 0.8)", line: "rgba(28, 34, 42, 0.14)", onText: "#f2ede2" };
}
