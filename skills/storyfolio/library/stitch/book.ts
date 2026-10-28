// Pop-up book: each chapter is a spread, words on the left and a scene
// standing up on the right in layers of die-cut card. Turning a page folds
// one scene flat and raises the next. Every word and picture comes from the
// person's data. Browser only.
import * as THREE from "three";
import { titleOf, yearText, type ChapterKey } from "./chapters.ts";
import { NOW, chaptersFor, slots, type Person, type Project } from "./person.ts";
import { backdrop, canvas, dieCut, grain, miniPicture, rand, rrect, sans, serif, texture, wrap } from "./paint.ts";
import { dotLand, type Land } from "./land.ts";
import type { Palette } from "./look.ts";
import { pageFrame } from "./frame.ts";
import { clamp, ease, lerp, smooth } from "./scroll.ts";
import type { Anchor, World, WorldFactory, WorldView } from "./world.ts";

const PW = 3, PD = 4, SEG = 40, EPS = 0.006, CURL = 1.1;
const FOV = 28;
const PX = 1024, PY = Math.round((1024 * PD) / PW);

// ---------- The pages ----------
/** The words of one chapter, as lines for the left page. */
function bodyOf(P: Person, k: ChapterKey): string[] {
  const more = (n: number) => (n ? [`And ${n} more.`] : []);
  switch (k) {
    case "hello": return [P.name, P.role, P.line, P.seeking + "."];
    case "from": return P.places.slice(0, 6).map((p) => `${p.name}, where ${P.first} ${p.what}.`).concat(more(Math.max(0, P.places.length - 6)));
    case "studied": return P.study.slice(0, 2).flatMap((s) => [`${s.degree} in ${s.field}.`, `${s.place}, ${s.from} to ${s.to}.`, ...(s.note ? [s.note + "."] : [])]).concat(more(Math.max(0, P.study.length - 2)));
    case "worked": return P.work.slice(0, 5).map((w) => `${w.org}, ${w.place}, ${yearText(w)}. ${w.role}: ${w.did.charAt(0).toLowerCase()}${w.did.slice(1)}.`).concat(more(Math.max(0, P.work.length - 5)));
    case "good": return P.skills.slice(0, 6).map((g) => `${g.group}: ${g.items.join(", ")}.`).concat(more(Math.max(0, P.skills.length - 6)));
    case "made": {
      const s = slots(P.projects, 6);
      return [`${P.projects.length} ${P.projects.length === 1 ? "project" : "projects"}. Open any card on the right to read about it.`,
        ...s.shown.filter((p): p is Project => !!p).map((p) => p.title), ...more(s.more)];
    }
    case "say": {
      const s = slots(P.quotes, 3);
      return [...s.shown.filter((q) => !!q).map((q) => `${q!.who}, ${q!.from}.`), ...more(s.more)];
    }
    case "contact": return [P.contact.email, P.seeking + ".", P.contact.links.join(", ") + "."];
  }
}

function leftPage(P: Person, C: Palette, k: ChapterKey, number: number) {
  return canvas(PX, PY, (ctx, w, h) => {
    ctx.fillStyle = C.paper; ctx.fillRect(0, 0, w, h);
    grain(ctx, w, h, 9000, number * 7 + 1);
    const g = ctx.createLinearGradient(w - 140, 0, w, 0);
    g.addColorStop(0, "rgba(60,40,20,0)"); g.addColorStop(1, "rgba(60,40,20,0.18)");
    ctx.fillStyle = g; ctx.fillRect(w - 140, 0, 140, h);
    const m = 104;
    ctx.fillStyle = C.amber; ctx.font = sans(28, 600); ctx.fillText(`CHAPTER ${number}`, m, 200);
    ctx.fillStyle = C.ink; ctx.font = serif(96); let y = wrap(ctx, titleOf(k), m, 320, w - 2 * m, 104, 2);
    ctx.fillStyle = C.amber; ctx.fillRect(m, y + 6, 90, 6);
    y += 110;
    bodyOf(P, k).forEach((line, i) => {
      if (y > h - 180) return;
      const lead = i === 0 && k === "hello";
      ctx.fillStyle = lead ? C.ink : "#3a424c";
      ctx.font = lead ? serif(58) : serif(40, 400);
      y = wrap(ctx, line, m, y, w - 2 * m, lead ? 66 : 56, 4) + 24;
    });
    ctx.fillStyle = C.muted; ctx.font = serif(30, 400, "italic"); ctx.textAlign = "center"; ctx.fillText(String(number * 2 - 1), w / 2, h - 86);
  });
}

const GROUNDS: Record<ChapterKey, string> = {
  hello: "#efe3c8", from: "#e7e0d1", studied: "#dfe8df", worked: "#e9e2d2", good: "#efe3c8", made: "#e9e2d2", say: "#ece4d6", contact: "#efe3c8",
};

function rightPage(P: Person, C: Palette, k: ChapterKey, number: number, land: Land) {
  return canvas(PX, PY, (ctx, w, h) => {
    ctx.fillStyle = C.paper; ctx.fillRect(0, 0, w, h);
    grain(ctx, w, h, 9000, number * 7 + 2);
    const g = ctx.createLinearGradient(0, 0, 140, 0);
    g.addColorStop(0, "rgba(60,40,20,0.18)"); g.addColorStop(1, "rgba(60,40,20,0)");
    ctx.fillStyle = g; ctx.fillRect(0, 0, 140, h);
    // A printed ground for the scene to stand on.
    ctx.fillStyle = GROUNDS[k]; rrect(ctx, 70, 110, w - 140, h - 230, 34); ctx.fill();
    if (k === "from") {
      const project = pageFrame(P.places, PW);
      const pj = (lng: number, lat: number): [number, number] => { const [s, z] = project(lat, lng); return [(s / PW) * w, ((z + PD / 2) / PD) * h]; };
      ctx.save(); rrect(ctx, 70, 110, w - 140, h - 230, 34); ctx.clip();
      ctx.fillStyle = "#cfe0e3"; ctx.fillRect(0, 0, w, h);
      dotLand(ctx, land, pj, w, h, 12, 4.2, "rgba(48,76,70,0.75)");
      ctx.strokeStyle = C.rose; ctx.lineWidth = 7; ctx.setLineDash([20, 14]); ctx.beginPath();
      P.places.forEach((p, i) => { const [x, y] = pj(p.lng, p.lat); if (i) ctx.lineTo(x, y); else ctx.moveTo(x, y); });
      ctx.stroke(); ctx.restore();
    } else {
      ctx.strokeStyle = "rgba(120,100,70,0.12)"; ctx.lineWidth = 3;
      for (let y = 180; y < h - 140; y += 64) { ctx.beginPath(); ctx.moveTo(110, y); ctx.lineTo(w - 110, y); ctx.stroke(); }
    }
    ctx.fillStyle = C.muted; ctx.font = serif(30, 400, "italic"); ctx.textAlign = "center"; ctx.fillText(String(number * 2), w / 2, h - 50);
  });
}

// ---------- The scenes, in layers of card ----------
type Pop = { chapter: ChapterKey; pic: HTMLCanvasElement; w: number; h: number; s: number; z: number; delay: number; project: Project | null };
type Draw = (ctx: CanvasRenderingContext2D, w: number, h: number) => void;

function tree(ctx: CanvasRenderingContext2D, x: number, base: number, s: number, color: string) {
  ctx.fillStyle = "#6b5a46"; ctx.fillRect(x - s * 0.06, base - s * 0.5, s * 0.12, s * 0.5);
  ctx.fillStyle = color; ctx.beginPath(); ctx.arc(x, base - s * 0.75, s * 0.42, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(x - s * 0.25, base - s * 0.55, s * 0.3, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(x + s * 0.27, base - s * 0.58, s * 0.3, 0, Math.PI * 2); ctx.fill();
}

function scenes(P: Person, C: Palette, own: Set<ChapterKey>): Pop[] {
  const list: Pop[] = [];
  const add = (chapter: ChapterKey, w0: number, h0: number, draw: Draw, w: number, s: number, z: number, o: { delay?: number; edge?: number; project?: Project } = {}) => {
    if (!own.has(chapter)) return;
    const pic = canvas(w0, h0, draw);
    const card = dieCut(pic, C, o.edge ?? 12);
    list.push({ chapter, pic: card, w: (w * card.width) / pic.width, h: (w * card.height) / pic.width, s, z, delay: o.delay ?? 0, project: o.project ?? null });
  };

  // Hello: a sunburst, the person, their name.
  add("hello", 900, 760, (ctx, w, h) => {
    ctx.fillStyle = "#f2c46b"; ctx.beginPath(); ctx.moveTo(0, h); ctx.lineTo(0, w / 2); ctx.arc(w / 2, w / 2, w / 2, Math.PI, 0); ctx.lineTo(w, h); ctx.fill();
    ctx.save(); ctx.clip();
    ctx.fillStyle = "rgba(233,162,59,0.55)";
    for (let i = 0; i < 18; i++) { const a = Math.PI + (i / 18) * Math.PI; ctx.beginPath(); ctx.moveTo(w / 2, h); ctx.lineTo(w / 2 + Math.cos(a) * 900, h + Math.sin(a) * 900); ctx.lineTo(w / 2 + Math.cos(a + 0.08) * 900, h + Math.sin(a + 0.08) * 900); ctx.fill(); }
    ctx.restore();
  }, 2.3, 1.5, -1.05);
  add("hello", 560, 720, (ctx, w, h) => {
    ctx.fillStyle = "#2f6f73"; ctx.beginPath(); ctx.moveTo(40, h); ctx.bezierCurveTo(40, 470, 130, 430, w / 2, 430); ctx.bezierCurveTo(w - 130, 430, w - 40, 470, w - 40, h); ctx.fill();
    ctx.fillStyle = "#f6efe2"; ctx.beginPath(); ctx.moveTo(w / 2 - 70, 430); ctx.lineTo(w / 2, 540); ctx.lineTo(w / 2 + 70, 430); ctx.fill();
    ctx.fillStyle = "#c98f6b"; ctx.fillRect(w / 2 - 42, 340, 84, 110);
    ctx.beginPath(); ctx.ellipse(w / 2, 260, 108, 128, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#2a2522"; ctx.beginPath(); ctx.ellipse(w / 2, 200, 122, 92, 0, Math.PI, 0); ctx.fill();
    ctx.beginPath(); ctx.ellipse(w / 2 - 92, 250, 34, 80, 0.2, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(w / 2 + 92, 250, 34, 80, -0.2, 0, Math.PI * 2); ctx.fill();
  }, 1.15, 1.5, -0.35);
  add("hello", 1100, 300, (ctx, w) => {
    ctx.fillStyle = C.rose; ctx.beginPath(); ctx.moveTo(0, 60); ctx.lineTo(70, 150); ctx.lineTo(0, 240); ctx.lineTo(110, 240); ctx.lineTo(110, 60); ctx.fill();
    ctx.beginPath(); ctx.moveTo(w, 60); ctx.lineTo(w - 70, 150); ctx.lineTo(w, 240); ctx.lineTo(w - 110, 240); ctx.lineTo(w - 110, 60); ctx.fill();
    ctx.fillStyle = "#e57d6f"; rrect(ctx, 80, 20, w - 160, 220, 16); ctx.fill();
    ctx.fillStyle = "#fff"; ctx.textAlign = "center";
    let size = 92; ctx.font = serif(size); while (ctx.measureText(P.name).width > w - 220 && size > 40) ctx.font = serif((size -= 4));
    ctx.fillText(P.name, w / 2, 135);
    ctx.font = sans(34, 600); ctx.fillText(P.role.toUpperCase(), w / 2, 205);
  }, 2.5, 1.5, 0.95);

  // Where from: a flag at each place on the printed map.
  const project = pageFrame(P.places, PW);
  P.places.forEach((p, i) => {
    const [s, z] = project(p.lat, p.lng);
    const last = i === P.places.length - 1;
    add("from", 520, 640, (ctx) => {
      ctx.fillStyle = "#4b3b2c"; ctx.fillRect(14, 24, 14, 616);
      ctx.fillStyle = "#e7c26b"; ctx.beginPath(); ctx.arc(21, 22, 18, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = last ? C.amber : C.rose;
      ctx.beginPath(); ctx.moveTo(28, 40); ctx.bezierCurveTo(200, 0, 330, 90, 500, 50); ctx.lineTo(500, 290); ctx.bezierCurveTo(330, 330, 200, 240, 28, 280); ctx.fill();
      ctx.fillStyle = "#fff"; ctx.font = serif(72); ctx.fillText(p.name, 56, 160, 430);
      ctx.font = sans(40, 600); ctx.fillText(p.what, 56, 240, 430);
    }, 0.62, s + 0.29, z, { delay: i * 0.1, edge: 10 });
  });

  // Studied: trees, the school, the diploma.
  const s0 = P.study[0];
  add("studied", 1200, 420, (ctx, w, h) => {
    for (let i = 0; i < 7; i++) tree(ctx, 90 + i * 170, h, 300 + (i % 3) * 70, i % 2 ? "#5f9a7c" : "#4f876b");
  }, 2.8, 1.5, -1.3);
  if (s0) {
    add("studied", 1000, 760, (ctx, w, h) => {
      ctx.fillStyle = "#efe6d4"; ctx.fillRect(60, 260, w - 120, h - 330);
      ctx.fillStyle = "#d8ccb4"; ctx.beginPath(); ctx.moveTo(30, 270); ctx.lineTo(w / 2, 50); ctx.lineTo(w - 30, 270); ctx.fill();
      ctx.fillStyle = "#e9dfcb"; ctx.beginPath(); ctx.moveTo(90, 250); ctx.lineTo(w / 2, 90); ctx.lineTo(w - 90, 250); ctx.fill();
      ctx.fillStyle = C.ink; ctx.font = serif(44); ctx.textAlign = "center"; ctx.fillText(s0.place.toUpperCase(), w / 2, 220, 520);
      for (let i = 0; i < 6; i++) {
        const x = 120 + i * 148;
        const g = ctx.createLinearGradient(x, 0, x + 64, 0);
        g.addColorStop(0, "#fbf6ea"); g.addColorStop(1, "#cbbd9f");
        ctx.fillStyle = g; ctx.fillRect(x, 300, 64, h - 400);
        ctx.fillStyle = "#d8ccb4"; ctx.fillRect(x - 10, 290, 84, 16); ctx.fillRect(x - 10, h - 110, 84, 16);
      }
      ctx.fillStyle = "#5b4b3a"; ctx.fillRect(w / 2 - 50, h - 250, 100, 150);
      ctx.fillStyle = "#d8ccb4"; for (let i = 0; i < 3; i++) ctx.fillRect(30 + i * 20, h - 90 + i * 30, w - 60 - i * 40, 30);
    }, 2.2, 1.5, -0.55);
    add("studied", 1000, 520, (ctx, w, h) => {
      ctx.fillStyle = "#fbf8f1"; ctx.fillRect(60, 30, w - 120, h - 60);
      ctx.fillStyle = "#e9dcc2"; ctx.beginPath(); ctx.ellipse(60, h / 2, 40, h / 2 - 30, 0, 0, Math.PI * 2); ctx.fill(); ctx.beginPath(); ctx.ellipse(w - 60, h / 2, 40, h / 2 - 30, 0, 0, Math.PI * 2); ctx.fill();
      ctx.textAlign = "center"; ctx.fillStyle = C.ink;
      ctx.font = serif(44, 400, "italic"); ctx.fillText(P.name, w / 2, 120, 760);
      ctx.font = serif(66); ctx.fillText(s0.degree, w / 2, 230, 760);
      ctx.font = serif(46, 400); ctx.fillText(`in ${s0.field}`, w / 2, 300, 760);
      ctx.fillStyle = C.muted; ctx.font = sans(32, 600); ctx.fillText(`${s0.from} TO ${s0.to}`, w / 2, 385);
      ctx.fillStyle = C.rose; ctx.fillRect(w / 2 + 160, 360, 26, 140); ctx.fillRect(w / 2 + 200, 360, 26, 120);
      ctx.fillStyle = C.amber; ctx.beginPath(); ctx.arc(w / 2 + 193, 380, 50, 0, Math.PI * 2); ctx.fill();
    }, 1.7, 1.5, 0.95);
  }

  // Worked: a skyline behind, a building per job in front, as tall as the years.
  add("worked", 1200, 460, (ctx, w, h) => {
    ctx.fillStyle = "#cdd6d9";
    let x = 0;
    for (let i = 0; x < w; i++) { const bw = 70 + ((i * 53) % 90), bh = 160 + ((i * 97) % 260); ctx.fillRect(x, h - bh, bw, bh); x += bw + 8; }
  }, 2.8, 1.5, -1.45);
  const jobs = [...P.work].sort((a, b) => a.from - b.from).slice(-6);
  jobs.forEach((w, i) => {
    const years = (w.to ?? NOW) - w.from, hgt = Math.min(3.2, 0.8 + years * 0.32), wid = 0.84;
    const px = Math.round((600 * hgt) / wid);
    const roof = i % 3;
    add("worked", 600, px + 120, (ctx, cw, ch) => {
      const top = 120, now = i === jobs.length - 1;
      ctx.fillStyle = now ? "#f0d9a8" : ["#e6dccb", "#d9e2e3", "#eadad3"][i % 3];
      ctx.fillRect(20, top, cw - 40, ch - top);
      ctx.fillStyle = "#8c7c69";
      if (roof === 0) { ctx.beginPath(); ctx.moveTo(10, top + 4); ctx.lineTo(cw / 2, 10); ctx.lineTo(cw - 10, top + 4); ctx.fill(); }
      else if (roof === 1) ctx.fillRect(10, top - 30, cw - 20, 34);
      else for (let j = 0; j < 3; j++) { ctx.beginPath(); ctx.moveTo(20 + j * 187, top); ctx.lineTo(20 + j * 187, top - 90); ctx.lineTo(20 + (j + 1) * 187, top); ctx.fill(); }
      ctx.fillStyle = C.ink; ctx.font = serif(60); wrap(ctx, w.org, 50, top + 90, cw - 100, 64, 2);
      ctx.fillStyle = C.amber; ctx.font = sans(42, 600); ctx.fillText(yearText(w), 50, top + 250);
      for (let y = top + 320; y < ch - 170; y += 105) for (let x = 60; x < cw - 90; x += 125) {
        ctx.fillStyle = now && (x + y) % 3 ? "#f2b84b" : "rgba(40,50,60,0.35)"; ctx.fillRect(x, y, 70, 64);
      }
      ctx.fillStyle = "#5b4b3a"; ctx.fillRect(cw / 2 - 45, ch - 150, 90, 150);
    }, wid, 0.55 + (i * 1.9) / Math.max(1, jobs.length - 1), i % 2 ? 0.45 : -0.45, { delay: i * 0.12 });
  });

  // Good at: tabbed cards, one per group.
  P.skills.slice(0, 4).forEach((g, i) => {
    add("good", 800, 680, (ctx, w, h) => {
      ctx.fillStyle = ["#f6efe2", "#f2d8a0", "#cfe3dc", "#efcfc7"][i];
      const tx = 40 + i * 160;
      ctx.beginPath(); ctx.moveTo(0, 110); ctx.lineTo(tx, 110); ctx.lineTo(tx + 24, 0); ctx.lineTo(tx + 300, 0); ctx.lineTo(tx + 324, 110); ctx.lineTo(w, 110); ctx.lineTo(w, h); ctx.lineTo(0, h); ctx.fill();
      ctx.fillStyle = C.ink; ctx.font = sans(38, 600); ctx.fillText(g.group, tx + 40, 74, 250);
      const items = slots(g.items, 4);
      ctx.font = serif(54, 400); items.shown.forEach((it, j) => { if (it) ctx.fillText(it, 60, 240 + j * 104, w - 90); });
      ctx.fillStyle = C.amber; items.shown.forEach((it, j) => { if (!it) return; ctx.beginPath(); ctx.arc(34, 222 + j * 104, 9, 0, Math.PI * 2); ctx.fill(); });
      if (items.more) { ctx.fillStyle = C.muted; ctx.font = sans(32, 600); ctx.fillText(`and ${items.more} more`, 60, h - 30); }
    }, 1.32, i % 2 ? 2.2 : 0.8, i < 2 ? -0.8 : 0.7, { delay: i * 0.1 });
  });

  // Made: a card for each project, to open.
  slots(P.projects, 6).shown.forEach((p, i) => {
    if (!p) return;
    add("made", 700, 620, (ctx, w, h) => {
      ctx.fillStyle = "#fbf8f1"; rrect(ctx, 0, 0, w, h, 18); ctx.fill();
      miniPicture(ctx, C, p.kind, 22, 22, w - 44, 340, i + 3);
      ctx.fillStyle = C.ink; ctx.font = serif(50); wrap(ctx, p.title, 28, 440, w - 56, 54, 2);
      ctx.fillStyle = C.amber; ctx.font = sans(28, 600); ctx.fillText(`${p.place.toUpperCase()}  ${p.year}`, 28, h - 28);
    }, 0.9, 0.55 + (i % 3) * 0.95, i < 3 ? -0.75 : 0.75, { delay: (i % 3) * 0.08, project: p });
  });

  // Others say: speech bubbles.
  slots(P.quotes, 3).shown.forEach((q, i) => {
    if (!q) return;
    add("say", 1500, 520, (ctx, w, h) => {
      ctx.fillStyle = ["#fbf8f1", "#f2d8a0", "#cfe3dc"][i]; rrect(ctx, 0, 0, w, h - 70, 46); ctx.fill();
      ctx.beginPath(); ctx.moveTo(150 + i * 320, h - 75); ctx.lineTo(110 + i * 320, h); ctx.lineTo(270 + i * 320, h - 75); ctx.fill();
      ctx.fillStyle = C.ink; ctx.font = serif(46, 400, "italic");
      const y = wrap(ctx, `“${q.text}”`, 56, 86, w - 112, 58, 4);
      ctx.font = sans(34, 600); ctx.fillText(`${q.who}, ${q.from}`, 56, Math.min(y + 22, h - 100), w - 112);
    }, 2.6, 1.5, -1.25 + i * 1.05, { delay: i * 0.12 });
  });

  // Get in touch: the letter, and the envelope it came out of.
  add("contact", 1000, 760, (ctx, w, h) => {
    ctx.fillStyle = "#fbf8f1"; ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = "rgba(120,100,70,0.15)"; ctx.lineWidth = 3;
    for (let y = 470; y < h - 40; y += 56) { ctx.beginPath(); ctx.moveTo(60, y); ctx.lineTo(w - 60, y); ctx.stroke(); }
    ctx.fillStyle = C.amber; ctx.font = sans(36, 600); ctx.fillText("GET IN TOUCH", 60, 110);
    ctx.fillStyle = C.ink; ctx.font = serif(84); ctx.fillText(`Write to ${P.first}`, 60, 230, w - 120);
    ctx.font = serif(52, 400); ctx.fillText(P.contact.email, 60, 330, w - 120);
    ctx.fillStyle = C.muted; ctx.font = sans(34); wrap(ctx, `${P.seeking}.`, 60, 410, w - 120, 44, 2);
  }, 2.0, 1.5, -0.45);
  add("contact", 1000, 560, (ctx, w, h) => {
    ctx.fillStyle = "#e9c48a"; ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "#dfb576"; ctx.beginPath(); ctx.moveTo(0, h); ctx.lineTo(w / 2, h * 0.4); ctx.lineTo(w, h); ctx.fill();
    ctx.fillStyle = "#e3bc80"; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(w * 0.42, h * 0.62); ctx.lineTo(0, h); ctx.fill(); ctx.beginPath(); ctx.moveTo(w, 0); ctx.lineTo(w * 0.58, h * 0.62); ctx.lineTo(w, h); ctx.fill();
    ctx.fillStyle = C.rose; ctx.fillRect(w - 170, 40, 120, 140); ctx.fillStyle = "#fff"; ctx.fillRect(w - 158, 52, 96, 116);
    ctx.fillStyle = C.rose; ctx.beginPath(); ctx.arc(w - 110, 110, 30, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = C.ink; ctx.font = sans(40, 600); ctx.textAlign = "center"; ctx.fillText(P.contact.links.join("   "), w / 2, h - 50, w - 80);
  }, 2.3, 1.5, 0.75);
  return list;
}

// ---------- The book ----------
function desk() {
  return canvas(1024, 1024, (ctx, w, h) => {
    ctx.fillStyle = "#2c2119"; ctx.fillRect(0, 0, w, h);
    for (let i = 0; i < 260; i++) {
      const y = rand(3, i * 4) * h, a = 0.03 + rand(3, i * 4 + 1) * 0.07;
      ctx.strokeStyle = rand(3, i * 4 + 2) < 0.5 ? `rgba(0,0,0,${a})` : `rgba(160,110,70,${a})`;
      ctx.lineWidth = 1 + rand(3, i * 4 + 3) * 3;
      ctx.beginPath(); ctx.moveTo(0, y);
      for (let x = 0; x <= w; x += 32) ctx.lineTo(x, y + Math.sin(x / 140 + i) * 6);
      ctx.stroke();
    }
  });
}

function edges() {
  return canvas(256, 64, (ctx, w, h) => {
    ctx.fillStyle = "#efe7d6"; ctx.fillRect(0, 0, w, h);
    for (let y = 0; y < h; y += 3) { ctx.fillStyle = `rgba(120,100,70,${0.08 + rand(5, y) * 0.12})`; ctx.fillRect(0, y, w, 1); }
  });
}

/** How far a page rises from the spine: it dips into the gutter, then lies flat. */
const bow = (s: number) => 0.11 * (1 - Math.pow(1 - Math.min(s, 0.7) / 0.7, 2));

/** A page turned by angle a about the spine: the point s from the spine, its tangent and normal. */
function curve(a: number, s: number, lift: number) {
  const b = (-CURL * Math.sin(a)) / PW;
  const phi = a + b * s;
  const x = Math.abs(b) < 1e-6 ? s * Math.cos(a) : (Math.sin(phi) - Math.sin(a)) / b;
  const y = Math.abs(b) < 1e-6 ? s * Math.sin(a) : (Math.cos(a) - Math.cos(phi)) / b;
  return {
    p: new THREE.Vector3(x, y + lift + bow(s) * Math.abs(Math.cos(a)), 0),
    t: new THREE.Vector3(Math.cos(phi), Math.sin(phi), 0),
    n: new THREE.Vector3(-Math.sin(phi), Math.cos(phi), 0),
  };
}

function sheetGeometries() {
  const n = (SEG + 1) * 2;
  const front = new THREE.BufferGeometry(), back = new THREE.BufferGeometry();
  const uvF = new Float32Array(n * 2), uvB = new Float32Array(n * 2), idx: number[] = [];
  for (let i = 0; i <= SEG; i++) for (let j = 0; j <= 1; j++) {
    const k = i * 2 + j;
    uvF[k * 2] = i / SEG; uvF[k * 2 + 1] = 1 - j;
    uvB[k * 2] = 1 - i / SEG; uvB[k * 2 + 1] = 1 - j;
  }
  for (let i = 0; i < SEG; i++) { const a = i * 2; idx.push(a, a + 1, a + 2, a + 1, a + 3, a + 2); }
  const pos = new THREE.BufferAttribute(new Float32Array(n * 3), 3);
  front.setAttribute("position", pos); front.setAttribute("uv", new THREE.BufferAttribute(uvF, 2)); front.setIndex(idx);
  front.computeVertexNormals();
  back.setAttribute("position", pos); back.setAttribute("uv", new THREE.BufferAttribute(uvB, 2)); back.setIndex(idx);
  back.setAttribute("normal", front.attributes.normal);
  return { front, back };
}

export const createBook: WorldFactory = async (env, chapters) => {
  const P = env.person, C = env.palette;
  const own = new Set(chapters);
  const N = chapters.length;
  const site = chaptersFor(P);
  const numberOf = (k: ChapterKey) => site.indexOf(k) + 1;
  const tex = (el: HTMLCanvasElement) => texture(el, env.renderer);
  const scene = new THREE.Scene();
  const bg = texture(backdrop(C));
  scene.background = bg;
  const camera = new THREE.PerspectiveCamera(FOV, 1, 0.05, 200);

  // A desk, lit by a lamp from the upper left.
  const deskTex = tex(desk());
  deskTex.wrapS = deskTex.wrapT = THREE.RepeatWrapping; deskTex.repeat.set(4, 4);
  const table = new THREE.Mesh(new THREE.PlaneGeometry(40, 40), new THREE.MeshLambertMaterial({ map: deskTex }));
  table.rotation.x = -Math.PI / 2; table.position.y = -0.2; table.receiveShadow = true;
  scene.add(table);
  scene.add(new THREE.HemisphereLight(0xfff4e6, 0x2c2119, 1.25));
  const lamp = new THREE.DirectionalLight(0xfff0da, 2.1);
  lamp.position.set(-3.5, 7, 3.2);
  lamp.castShadow = true;
  lamp.shadow.mapSize.set(2048, 2048);
  Object.assign(lamp.shadow.camera, { left: -6, right: 6, top: 6, bottom: -6, near: 1, far: 20 });
  lamp.shadow.bias = -0.0004; lamp.shadow.normalBias = 0.02;
  scene.add(lamp);

  // Covers, a spine and the block of pages beneath the turning ones.
  const cloth = new THREE.MeshLambertMaterial({ color: "#24414c" });
  const edgeTex = tex(edges());
  for (const side of [-1, 1]) {
    const cover = new THREE.Mesh(new THREE.BoxGeometry(PW + 0.16, 0.05, PD + 0.24), cloth);
    cover.position.set(side * (PW / 2 + 0.02), -0.175, 0); cover.castShadow = cover.receiveShadow = true;
    const block = new THREE.Mesh(new THREE.BoxGeometry(PW - 0.06, 0.13, PD - 0.02), [
      new THREE.MeshLambertMaterial({ map: edgeTex }), new THREE.MeshLambertMaterial({ map: edgeTex }),
      new THREE.MeshLambertMaterial({ color: C.paper }), new THREE.MeshLambertMaterial({ color: C.paper }),
      new THREE.MeshLambertMaterial({ map: edgeTex }), new THREE.MeshLambertMaterial({ map: edgeTex }),
    ]);
    block.position.set(side * (PW / 2 + 0.03), -0.09, 0); block.castShadow = block.receiveShadow = true;
    scene.add(cover, block);
  }
  const spine = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, PD + 0.24, 24, 1, false, Math.PI / 2, Math.PI), cloth);
  spine.rotation.x = Math.PI / 2; spine.position.y = -0.2;
  scene.add(spine);

  // The inside of the front cover carries the first chapter's words.
  const insideGeo = sheetGeometries().front;
  const inside = new THREE.Mesh(insideGeo, new THREE.MeshLambertMaterial({ map: tex(leftPage(P, C, chapters[0], numberOf(chapters[0]))), side: THREE.BackSide }));
  inside.receiveShadow = true;
  scene.add(inside);
  {
    const pos = insideGeo.attributes.position.array as Float32Array, uv = insideGeo.attributes.uv.array as Float32Array;
    for (let i = 0; i <= SEG; i++) {
      const { p } = curve(Math.PI, (i / SEG) * PW, 0.002);
      for (let j = 0; j <= 1; j++) { const v = (i * 2 + j) * 3; pos[v] = p.x; pos[v + 1] = p.y; pos[v + 2] = j ? PD / 2 : -PD / 2; uv[(i * 2 + j) * 2] = 1 - i / SEG; }
    }
    insideGeo.computeVertexNormals();
  }

  // One sheet per chapter this book holds: its front is that chapter's right page, its back the next one's left page.
  const blank = canvas(PX, PY, (ctx, w, h) => { ctx.fillStyle = C.paper; ctx.fillRect(0, 0, w, h); grain(ctx, w, h); });
  const sheets = chapters.map((k, j) => {
    const { front, back } = sheetGeometries();
    const next = chapters[j + 1];
    const f = new THREE.Mesh(front, new THREE.MeshLambertMaterial({ map: tex(rightPage(P, C, k, numberOf(k), env.land)), side: THREE.FrontSide }));
    const b = new THREE.Mesh(back, new THREE.MeshLambertMaterial({ map: tex(next ? leftPage(P, C, next, numberOf(next)) : blank), side: THREE.BackSide }));
    f.castShadow = true; f.receiveShadow = b.receiveShadow = true;
    f.material.shadowSide = THREE.DoubleSide;
    scene.add(f, b);
    return { geo: front, back, angle: -1 };
  });

  // The scenes: each card hinged to its chapter's page.
  const pops = scenes(P, C, own).map((it) => {
    const g = new THREE.PlaneGeometry(it.w, it.h);
    g.translate(0, it.h / 2 - 0.012, 0);
    const m = new THREE.Mesh(g, new THREE.MeshLambertMaterial({ map: tex(it.pic), transparent: true, alphaTest: 0.5, side: THREE.DoubleSide }));
    m.castShadow = true; m.receiveShadow = true;
    m.matrixAutoUpdate = false;
    m.userData.project = it.project;
    scene.add(m);
    return { ...it, m, j: chapters.indexOf(it.chapter) };
  });

  // Where the story stands in this book's own chapters.
  const at = (v: WorldView) => ({ from: chapters.indexOf(v.from), to: chapters.indexOf(v.to) });
  const angleOf = (j: number, i: { from: number; to: number }, t: number) => (j < i.from ? Math.PI : j === i.from && i.to !== i.from ? Math.PI * t : 0);
  const liftOf = (j: number, a: number) => lerp((N - j) * EPS, (j + 1) * EPS, a / Math.PI);
  // A chapter's scene stands while its spread is open, and folds as the page lifts.
  const raiseOf = (j: number, i: { from: number; to: number }, raw: number) => {
    if (i.from === i.to) return j === i.from ? 1 : 0;
    if (j === i.from) return 1 - smooth(0.02, 0.45, raw);
    if (j === i.to) return smooth(0.5, 0.97, raw);
    return 0;
  };
  const fitDistance = (w: number, h: number) => {
    const v = THREE.MathUtils.degToRad(camera.fov) / 2;
    return Math.max(h / 2 / Math.tan(v), w / 2 / (Math.tan(v) * camera.aspect));
  };

  const basis = new THREE.Matrix4(), up = new THREE.Vector3(), face = new THREE.Vector3();
  const Z = new THREE.Vector3(0, 0, 1);

  function pose(v: WorldView) {
    const i = at(v);
    const moving = i.from !== i.to;
    sheets.forEach((sh, j) => {
      const a = angleOf(j, i, v.t);
      if (Math.abs(a - sh.angle) < 1e-9) return;
      sh.angle = a;
      const pos = sh.geo.attributes.position.array as Float32Array, lift = liftOf(j, a);
      for (let q = 0; q <= SEG; q++) {
        const { p } = curve(a, (q / SEG) * PW, lift);
        for (let r = 0; r <= 1; r++) { const x = (q * 2 + r) * 3; pos[x] = p.x; pos[x + 1] = p.y; pos[x + 2] = r ? PD / 2 : -PD / 2; }
      }
      sh.geo.attributes.position.needsUpdate = true;
      sh.geo.computeVertexNormals();
      sh.geo.attributes.normal.needsUpdate = true;
      sh.geo.computeBoundingSphere();
      sh.back.boundingSphere = sh.geo.boundingSphere;
    });

    for (const it of pops) {
      const a = angleOf(it.j, i, v.t);
      const r = ease(clamp(raiseOf(it.j, i, v.raw) * (1 + it.delay) - it.delay));
      it.m.visible = r > 0.002;
      if (!it.m.visible) continue;
      const c = curve(a, it.s, liftOf(it.j, a) + 0.004);
      const th = (1 - r) * (Math.PI / 2);
      up.copy(c.n).multiplyScalar(Math.cos(th)).addScaledVector(Z, -Math.sin(th));
      face.crossVectors(c.t, up);
      basis.makeBasis(c.t, up, face).setPosition(c.p.x, c.p.y, it.z);
      it.m.matrix.copy(basis);
      it.m.matrixWorldNeedsUpdate = true;
    }

    // Lean in on each open spread; stand back while a page turns. On a phone, read the
    // words on the left page first, then pan to the scene on the right.
    const narrow = env.narrow();
    const turning = Math.sin(Math.PI * v.raw);
    const x = narrow ? (moving ? lerp(PW / 2, -PW / 2, v.t) : lerp(-PW / 2, PW / 2, smooth(0.3, 0.7, v.local))) : lerp(0.35, 0, turning);
    const target = new THREE.Vector3(x, lerp(0.55, 0.45, turning), lerp(0.05, 0.15, turning));
    const d = fitDistance(narrow ? PW + 0.5 : lerp(2 * PW + 0.5, 2 * PW + 1.8, turning), PD + 1.7);
    const pitch = lerp(0.74, 0.86, turning) + 0.015 * Math.sin(v.time * 0.3);
    const yaw = 0.04 * Math.sin(v.time * 0.21);
    camera.position.set(target.x + Math.sin(yaw) * Math.cos(pitch) * d, target.y + Math.sin(pitch) * d, target.z + Math.cos(yaw) * Math.cos(pitch) * d);
    camera.lookAt(target);
    camera.updateMatrixWorld();
  }

  const ray = new THREE.Raycaster();
  const flat = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), -Math.PI / 2);
  const world: World = {
    id: "book",
    scene,
    camera,
    pose,
    // The window lies on the open book, facing up: on a phone on the right page, else across the spread.
    anchor(): Anchor {
      const narrow = env.narrow();
      const height = 0.9 * Math.min(PD, (narrow ? PW : 2 * PW) / camera.aspect);
      return { position: new THREE.Vector3(narrow ? PW / 2 : 0, 0.1, 0), quaternion: flat.clone(), height };
    },
    pick(ndc, chapter) {
      if (chapter !== "made") return null;
      scene.updateMatrixWorld();
      ray.setFromCamera(ndc, camera);
      const hit = ray.intersectObjects(pops.filter((p) => p.chapter === "made" && p.m.visible).map((p) => p.m), false)[0];
      return hit ? (hit.object.userData.project as Project | null) : null;
    },
    resize(aspect) { camera.aspect = aspect; camera.updateProjectionMatrix(); },
    dispose() {
      scene.traverse((o) => {
        const m = o as THREE.Mesh;
        m.geometry?.dispose();
        const mats = Array.isArray(m.material) ? m.material : m.material ? [m.material] : [];
        for (const x of mats) { (x as THREE.MeshBasicMaterial).map?.dispose(); x.dispose(); }
      });
      bg.dispose();
    },
  };
  return world;
};
