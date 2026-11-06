import { test } from "node:test";
import assert from "node:assert/strict";
import { LOOKS, LOOK_IDS, contrast, groundTones, parseLook, rgba, uiColours } from "./look.ts";

test("night is today's palette, unchanged", () => {
  assert.deepEqual(LOOKS.night, { bg: "#0f1318", paper: "#f2ede2", paperDark: "#e3dccd", card: "#fbf7ee", ink: "#1c222a",
    muted: "#6d7782", amber: "#e9a23b", teal: "#3fa796", rose: "#d8665a", blue: "#4c7fd1", line: "#c9c1b0" });
});

test("night's ground and words over it are today's", () => {
  assert.deepEqual(groundTones(LOOKS.night), { centre: "#1d252e", middle: "#10151b", edge: "#0a0d11", map: "#151c23",
    grid: "rgba(255,255,255,0.05)", land: "rgba(150,178,186,0.55)" });
  assert.deepEqual(uiColours(LOOKS.night), { text: "#ece6d9", soft: "#c9cfd5", muted: "#9aa4ae",
    glass: "rgba(12, 16, 21, 0.72)", line: "rgba(236, 230, 217, 0.14)", onText: "#11161c" });
});

test("every look gives every colour as #rrggbb", () => {
  for (const id of LOOK_IDS) for (const v of Object.values(LOOKS[id])) assert.match(v, /^#[0-9a-f]{6}$/);
});

test("ink reads on paper, and the words over the ground read, in every look", () => {
  for (const id of LOOK_IDS) {
    const p = LOOKS[id], ui = uiColours(p);
    assert.ok(contrast(p.ink, p.paper) >= 7, `${id}: ink on paper`);
    assert.ok(contrast(ui.text, p.bg) >= 7, `${id}: words on the ground`);
    assert.ok(contrast(ui.muted, p.bg) >= 4.5, `${id}: the rail on the ground`);
    assert.ok(contrast(ui.onText, ui.text) >= 4.5, `${id}: words on the second button`);
    assert.ok(contrast("#11161c", p.amber) >= 4.5, `${id}: words on the contact button`);
  }
});

test("a light ground gets dark words, and its ground tones stay in range", () => {
  assert.equal(uiColours(LOOKS.daylight).text, LOOKS.daylight.ink);
  for (const v of Object.values(groundTones(LOOKS.daylight))) assert.match(v, /^#[0-9a-f]{6}$|^rgba\(/);
});

test("parseLook takes the three names and nothing else", () => {
  assert.equal(parseLook("daylight"), "daylight");
  for (const x of ["pink", "", null, undefined, "Night"]) assert.equal(parseLook(x), null);
});

test("contrast is the WCAG ratio", () => {
  assert.equal(Math.round(contrast("#000000", "#ffffff")), 21);
  assert.equal(contrast("#777777", "#777777"), 1);
});

test("rgba writes a #rrggbb colour with a transparency, as the map's edge fade needs", () => {
  assert.equal(rgba("#151c23", 0), "rgba(21,28,35,0)");
  assert.equal(rgba("#151c23", 1), "rgba(21,28,35,1)");
});
