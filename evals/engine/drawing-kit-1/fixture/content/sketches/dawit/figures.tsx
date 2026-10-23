"use client";

import { arc, boundsAround, share, type Point } from "@/lib/story/figure";
import type { Pen } from "@/components/story/pen";

/*
  Five of Dawit Bekele's diagrams, each from his own facts
  (evals/builds/full-journey-3), drawn with the engine's pen on a sheet
  1000 wide and 694 tall. `value` is how far the reader has scrolled
  through the beat. On a phone the sheet is about 320 px wide, so no word
  is smaller than 36 units; what does not fit at that size is in the caption.
*/

const BIG = 44, SMALL = 36;

/** Where: the route on a real map, with the Netherlands at a second scale. */
export function where(pen: Pen, value: number) {
  const addis: Point = [9.03, 38.74], amsterdam: Point = [52.37, 4.9], rotterdam: Point = [51.92, 4.48];
  const at = pen.map({ x: 20, y: 20, w: 960, h: 654 }, boundsAround([addis, amsterdam], 0.14));
  const a = at(...addis), b = at(...amsterdam);
  pen.line(arc(a, b, 0.16), { tone: "accent", weight: 5, upTo: share(value, 0.05, 0.7), arrow: value < 0.7 });
  pen.dot(a, { r: 12 });
  pen.text("Addis Ababa", a[0] - 24, a[1] + 12, { size: BIG, weight: 650, align: "right", halo: true });
  pen.text("2009 to 2016", a[0] - 24, a[1] + 56, { size: SMALL, tone: "faint", align: "right", halo: true });

  // The two Dutch cities are 57 km apart, too close at this scale: a second map shows them.
  const inset = { x: 520, y: 30, w: 450, h: 330 };
  pen.line([b, [inset.x, inset.y + inset.h]], { tone: "faint", weight: 2, dash: [6, 6] });
  pen.dot(b, { r: 8, tone: value > 0.7 ? "accent" : "faint" });
  pen.box(inset, { tone: "faint", weight: 2, r: 4 });
  const near = pen.map(inset, { west: 0, east: 6.9, south: 50.6, north: 53.7 });
  const c = near(...amsterdam), d = near(...rotterdam);
  pen.line(arc(c, d, -0.4), { tone: "accent", weight: 5, upTo: share(value, 0.75, 1), arrow: value < 1 });
  pen.dot(c, { r: 10, tone: value > 0.7 ? "accent" : "faint" });
  pen.dot(d, { r: 10, tone: value > 0.97 ? "accent" : "faint" });
  pen.text("Amsterdam", c[0] - 22, c[1] - 46, { size: BIG, weight: 650, align: "right", halo: true });
  pen.text("2016", c[0] - 22, c[1] - 6, { size: SMALL, tone: "faint", align: "right", halo: true });
  pen.text("Rotterdam", d[0] - 22, d[1] + 48, { size: BIG, weight: 650, align: "right", halo: true });
  pen.text("2020", d[0] - 22, d[1] + 88, { size: SMALL, tone: "faint", align: "right", halo: true });
}

const ROLES = [
  { from: 2009, to: 2013, name: "Degree" },
  { from: 2013, to: 2016, name: "Library" },
  { from: 2016 + 2 / 12, to: 2020 + 7 / 12, name: "Lumen Pay" },
  { from: 2020 + 7 / 12, to: 2026 + 10 / 12, name: "Kestrel Freight" },
];

/** When: study and three roles on real dates, the current one in the accent. */
export function when(pen: Pen) {
  const x = pen.timeline({ x: 40, y: 30, w: 920, h: 634 }, 2009, 2027, { size: 32 });
  ROLES.forEach(({ from, to, name }, i) => {
    const y = 140 + i * 112, current = i === ROLES.length - 1;
    const left = x(from), right = x(to), end = left > 500;
    pen.box({ x: left, y, w: right - left, h: 22 }, { weight: 0, fill: current ? "accent" : i === 0 ? "faint" : "ink", r: 11 });
    if (current) pen.line([[right, y + 11], [x(2027), y + 11]], { tone: "accent", weight: 4, dash: [2, 12] });
    pen.text(name, end ? right : left, y - 18, { size: BIG, weight: 650, align: end ? "right" : "left" });
  });
}

const STAGES = [
  { name: "preflight", detail: "dependency map, rollback rehearsed" },
  { name: "shadow", detail: "mirrored read traffic" },
  { name: "dual write", detail: "dual writes for anything with state" },
  { name: "cutover", detail: "1, 10, 50, 100 per cent, against its SLO" },
  { name: "soak", detail: "two weeks" },
  { name: "decommission", detail: "old instances switched off" },
];

/** In what order, with checks: a service goes down the runbook's six stages, held at each gate. */
export function runbook(pen: Pen, value: number) {
  const track = 110, top = 40, tall = (pen.h - 80) / STAGES.length;
  const step = Math.min(STAGES.length - 1e-6, value * STAGES.length);
  const stage = Math.floor(step), within = step - stage;
  // Most of a stage's scroll moves the service; the rest holds it at the gate until the check passes.
  const service = top + tall * (stage + Math.min(1, within / 0.7) * 0.72 + 0.14);
  pen.line([[track, top], [track, top + tall * STAGES.length]], { tone: "faint", weight: 4 });
  pen.line([[track, top], [track, service]], { tone: "accent", weight: 6 });
  STAGES.forEach(({ name }, i) => {
    const gate = top + tall * (i + 1);
    const passed = i < stage || (i === stage && within > 0.9);
    pen.line([[track - 44, gate], [track + 44, gate]], { tone: passed ? "accent" : "ink", weight: passed ? 4 : 7 });
    pen.dot([track + 76, gate], { r: 13, tone: passed ? "accent" : "faint", open: !passed });
    pen.text(name, track + 120, gate - tall / 2 + 15, { size: BIG, weight: 650, tone: i === stage ? "ink" : "faint" });
  });
  pen.box({ x: track - 24, y: service - 24, w: 48, h: 48 }, { weight: 0, fill: "accent", r: 8 });
  pen.text(STAGES[stage].detail, 620, top + tall * (stage + 0.5) + 2, { size: SMALL, tone: "accent", width: 340 });
}

const STEPS = ["replicate", "dual write", "compare", "move reads", "move writes"];

/** How it flows: the orders database cutover, stepped by the scroll. */
export function database(pen: Pen, value: number) {
  const step = Math.min(STEPS.length - 1, Math.floor(value * STEPS.length));
  const service = { x: 20, y: 250, w: 270, h: 120 };
  const ferry = { x: 370, y: 270, w: 160, h: 80 };
  const old = { x: 640, y: 40, w: 340, h: 150 };
  const fresh = { x: 640, y: 420, w: 340, h: 150 };
  const readsNew = step >= 3, retired = step >= 4;

  // Reads: from the service straight to the old database, then to the new one.
  pen.line([[110, service.y], [110, 115], [old.x, 115]], { tone: readsNew ? "faint" : "ink", weight: 4, dash: readsNew ? [6, 10] : undefined, arrow: !readsNew });
  if (readsNew) pen.line([[110, service.y + service.h], [110, 530], [fresh.x, 530]], { tone: "accent", weight: 5, arrow: true });
  pen.text("reads", 130, readsNew ? 515 : 100, { size: SMALL, tone: readsNew ? "accent" : "faint" });

  // Writes: through ferry to the old database, and to both once dual writes begin.
  pen.line([[service.x + service.w, 310], [ferry.x, 310]], { weight: 4, arrow: true });
  pen.line([[ferry.x + ferry.w, 295], [585, 295], [585, 160], [old.x, 160]], { tone: retired ? "faint" : "ink", weight: 4, dash: retired ? [6, 10] : undefined, arrow: !retired });
  if (step >= 1) pen.line([[ferry.x + ferry.w, 325], [585, 325], [585, 460], [fresh.x, 460]], { tone: "accent", weight: 5, arrow: true });

  // Logical replication, old to new, from the first step.
  pen.line([[945, old.y + old.h], [945, fresh.y]], { tone: step === 0 ? "accent" : "faint", weight: 4, arrow: true });
  // Hourly checksums for three weeks: the two sides match.
  if (step >= 2) {
    const tone = step === 2 ? "accent" : "faint";
    pen.line([[760, old.y + old.h], [760, fresh.y]], { tone, weight: 3, dash: [3, 9] });
    pen.box({ x: 650, y: 276, w: 220, h: 60 }, { tone, weight: 3, r: 30 });
    pen.text("checksum", 760, 318, { size: SMALL, tone, align: "center", weight: 600 });
  }

  pen.box(service, { weight: 4 });
  pen.text("orders", service.x + service.w / 2, service.y + 56, { size: BIG, align: "center", weight: 650 });
  pen.text("service", service.x + service.w / 2, service.y + 98, { size: SMALL, align: "center", tone: "faint" });
  pen.box(ferry, { tone: step === 1 || retired ? "accent" : "ink", weight: 4 });
  pen.text("ferry", ferry.x + ferry.w / 2, ferry.y + 54, { size: BIG, align: "center", weight: 650 });
  pen.box(old, { tone: retired ? "faint" : "ink", weight: 4 });
  pen.text("Postgres 11", old.x + 28, old.y + 64, { size: BIG, weight: 650, tone: retired ? "faint" : "ink" });
  pen.text("4 TB", old.x + 28, old.y + 112, { size: SMALL, tone: "faint" });
  pen.box(fresh, { tone: readsNew ? "accent" : "ink", weight: readsNew ? 5 : 4 });
  pen.text("Postgres 15", fresh.x + 28, fresh.y + 64, { size: BIG, weight: 650 });
  pen.text("new cluster", fresh.x + 28, fresh.y + 112, { size: SMALL, tone: "faint" });

  pen.text(`${step + 1} of 5: ${STEPS[step]}`, 20, 660, { size: BIG, tone: "accent", weight: 650 });
}

/** How much: pages a week before and after, one dot a page, at true scale. */
export function oncall(pen: Pen) {
  const across = 17, gap = 42, left = 290;
  const block = (count: number, top: number, tone: "ink" | "accent") => {
    for (let i = 0; i < count; i++) pen.dot([left + (i % across) * gap, top + Math.floor(i / across) * gap], { r: 14, tone });
  };
  pen.text("85", 30, 150, { size: 96, weight: 650 });
  pen.text("pages a week", 30, 200, { size: SMALL, tone: "faint", width: 230 });
  block(85, 90, "ink");
  pen.text("22", 30, 480, { size: 96, weight: 650, tone: "accent" });
  pen.text("about a year later", 30, 530, { size: SMALL, tone: "faint", width: 230 });
  block(22, 430, "accent");
  pen.text("one dot, one page", left - 14, 640, { size: SMALL, tone: "faint" });
}
