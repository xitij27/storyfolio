// Pop-up book: each chapter is a spread, words on the left and a scene
// standing up on the right in layers of die-cut card. Turning a page folds
// one scene flat and raises the next. Every word and picture comes from the
// person's data.
import {
  THREE, C, clamp, lerp, smooth, ease, makeScroll, buildUI, makeStage, fitDistance, fontsReady, canvas,
  texture, serif, sans, wrap, rrect, miniPicture, loadLand, dotLand, clickable, personFrom, contactButtons, CHAPTERS,
} from "./kit.js";
import { yearText } from "./people.js";

const PW = 3, PD = 4, SEG = 40, EPS = 0.006, CURL = 1.1, NOW = 2026.8;
const N = CHAPTERS.length;
const CARD = "#fbf7ee";

// ---------- Paper ----------
const PX = 1024, PY = Math.round((1024 * PD) / PW);

function grain(ctx, w, h, n = 9000) {
  for (let i = 0; i < n; i++) {
    ctx.fillStyle = Math.random() < 0.5 ? "rgba(90,70,40,0.05)" : "rgba(255,255,255,0.06)";
    ctx.fillRect(Math.random() * w, Math.random() * h, 2, 2);
  }
}

/** A cut-out with a white card edge round it, as if die-cut from printed card. */
function dieCut(src, r = 12) {
  const sil = canvas(src.width, src.height, (c) => {
    c.drawImage(src, 0, 0);
    c.globalCompositeOperation = "source-in";
    c.fillStyle = CARD; c.fillRect(0, 0, src.width, src.height);
  });
  const out = canvas(src.width + 2 * r, src.height + 2 * r, (ctx) => {
    for (let a = 0; a < 24; a++) ctx.drawImage(sil, r + Math.cos((a / 24) * Math.PI * 2) * r, r + Math.sin((a / 24) * Math.PI * 2) * r);
    ctx.drawImage(sil, r, r);
    ctx.drawImage(src, r, r);
  });
  out.edge = r;
  return out;
}

function leftPage(P, k) {
  const s = P.study[0];
  const bodies = [
    [P.name, P.role, P.line, P.seeking + "."],
    P.places.map((p) => `${p.name}, where ${P.first} ${p.what}.`),
    [`${s.degree} in ${s.field}.`, `${s.place}, ${s.from} to ${s.to}.`, s.note + "."],
    P.work.map((w) => `${w.org}, ${w.place}, ${yearText(w)}. ${w.role}: ${w.did.toLowerCase()}.`),
    P.skills.map((g) => `${g.group}: ${g.items.join(", ")}.`),
    [`${P.projects.length} projects. Open any card on the right to read about it.`, ...P.projects.map((p) => p.title)],
    P.quotes.map((q) => `${q.who}, ${q.from}.`),
    [P.contact.email, P.seeking + ".", P.contact.links.join(", ") + "."],
  ];
  return canvas(PX, PY, (ctx, w, h) => {
    ctx.fillStyle = C.paper; ctx.fillRect(0, 0, w, h);
    grain(ctx, w, h);
    const g = ctx.createLinearGradient(w - 140, 0, w, 0);
    g.addColorStop(0, "rgba(60,40,20,0)"); g.addColorStop(1, "rgba(60,40,20,0.18)");
    ctx.fillStyle = g; ctx.fillRect(w - 140, 0, 140, h);
    const m = 104;
    ctx.fillStyle = C.amber; ctx.font = sans(28, 600); ctx.fillText(`CHAPTER ${k + 1}`, m, 200);
    ctx.fillStyle = C.ink; ctx.font = serif(96); let y = wrap(ctx, CHAPTERS[k].title, m, 320, w - 2 * m, 104);
    ctx.fillStyle = C.amber; ctx.fillRect(m, y + 6, 90, 6);
    y += 110;
    bodies[k].forEach((line, i) => {
      const lead = i === 0 && k === 0;
      ctx.fillStyle = lead ? C.ink : "#3a424c";
      ctx.font = lead ? serif(58) : serif(40, 400);
      y = wrap(ctx, line, m, y, w - 2 * m, lead ? 66 : 56) + 24;
    });
    ctx.fillStyle = C.muted; ctx.font = serif(30, 400, "italic"); ctx.textAlign = "center"; ctx.fillText(String(k * 2 + 1), w / 2, h - 86);
  });
}

function rightPage(P, k, land) {
  return canvas(PX, PY, (ctx, w, h) => {
    ctx.fillStyle = C.paper; ctx.fillRect(0, 0, w, h);
    grain(ctx, w, h);
    const g = ctx.createLinearGradient(0, 0, 140, 0);
    g.addColorStop(0, "rgba(60,40,20,0.18)"); g.addColorStop(1, "rgba(60,40,20,0)");
    ctx.fillStyle = g; ctx.fillRect(0, 0, 140, h);
    // A printed ground for the scene to stand on.
    const ground = ["#efe3c8", "#e7e0d1", "#dfe8df", "#e9e2d2", "#efe3c8", "#e9e2d2", "#ece4d6", "#efe3c8"][k];
    ctx.fillStyle = ground; rrect(ctx, 70, 110, w - 140, h - 230, 34); ctx.fill();
    if (k === 1) {
      const { project } = placeMap(P);
      const pj = (lng, lat) => { const [s, z] = project(lat, lng); return [(s / PW) * w, ((z + PD / 2) / PD) * h]; };
      ctx.save(); rrect(ctx, 70, 110, w - 140, h - 230, 34); ctx.clip();
      ctx.fillStyle = "#cfe0e3"; ctx.fillRect(0, 0, w, h);
      dotLand(ctx, land, pj, w, h, 12, 4.2, "rgba(48,76,70,0.75)");
      ctx.strokeStyle = C.rose; ctx.lineWidth = 7; ctx.setLineDash([20, 14]); ctx.beginPath();
      P.places.forEach((p, i) => { const [x, y] = pj(p.lng, p.lat); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); });
      ctx.stroke(); ctx.restore();
    } else {
      ctx.strokeStyle = "rgba(120,100,70,0.12)"; ctx.lineWidth = 3;
      for (let y = 180; y < h - 140; y += 64) { ctx.beginPath(); ctx.moveTo(110, y); ctx.lineTo(w - 110, y); ctx.stroke(); }
    }
    ctx.fillStyle = C.muted; ctx.font = serif(30, 400, "italic"); ctx.textAlign = "center"; ctx.fillText(String(k * 2 + 2), w / 2, h - 50);
  });
}

/** Where each place falls on the right page: s from the spine, z down the page. */
function placeMap(P) {
  const lats = P.places.map((p) => p.lat), lngs = P.places.map((p) => p.lng);
  const lat0 = (Math.min(...lats) + Math.max(...lats)) / 2, lng0 = (Math.min(...lngs) + Math.max(...lngs)) / 2;
  const cosL = Math.cos((lat0 * Math.PI) / 180);
  const sx = (Math.max(...lngs) - Math.min(...lngs)) * cosL || 1, sz = Math.max(...lats) - Math.min(...lats) || 1;
  const k = Math.min(1.9 / sx, 2.3 / sz);
  return { project: (lat, lng) => [PW / 2 + (lng - lng0) * cosL * k, -(lat - lat0) * k + 0.25] };
}

// ---------- The scenes, in layers of card ----------
const cut = (w, h, draw) => canvas(w, h, draw);

function tree(ctx, x, base, s, color) {
  ctx.fillStyle = "#6b5a46"; ctx.fillRect(x - s * 0.06, base - s * 0.5, s * 0.12, s * 0.5);
  ctx.fillStyle = color; ctx.beginPath(); ctx.arc(x, base - s * 0.75, s * 0.42, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(x - s * 0.25, base - s * 0.55, s * 0.3, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(x + s * 0.27, base - s * 0.58, s * 0.3, 0, Math.PI * 2); ctx.fill();
}

function scenes(P) {
  const s0 = P.study[0];
  const list = [];
  const add = (chapter, pic, w, s, z, extra = {}) => {
    const card = dieCut(pic, extra.edge ?? 12);
    const h = (w * card.height) / pic.width;
    list.push({ chapter, pic: card, w: (w * card.width) / pic.width, h, s, z, ...extra });
  };

  // 0. Hello: a sunburst, the person, their name.
  add(0, cut(900, 760, (ctx, w, h) => {
    ctx.fillStyle = "#f2c46b"; ctx.beginPath(); ctx.moveTo(0, h); ctx.lineTo(0, w / 2); ctx.arc(w / 2, w / 2, w / 2, Math.PI, 0); ctx.lineTo(w, h); ctx.fill();
    ctx.save(); ctx.clip();
    ctx.fillStyle = "rgba(233,162,59,0.55)";
    for (let i = 0; i < 18; i++) { const a = Math.PI + (i / 18) * Math.PI; ctx.beginPath(); ctx.moveTo(w / 2, h); ctx.lineTo(w / 2 + Math.cos(a) * 900, h + Math.sin(a) * 900); ctx.lineTo(w / 2 + Math.cos(a + 0.08) * 900, h + Math.sin(a + 0.08) * 900); ctx.fill(); }
    ctx.restore();
  }), 2.3, 1.5, -1.05);
  add(0, cut(560, 720, (ctx, w, h) => {
    ctx.fillStyle = "#2f6f73"; ctx.beginPath(); ctx.moveTo(40, h); ctx.bezierCurveTo(40, 470, 130, 430, w / 2, 430); ctx.bezierCurveTo(w - 130, 430, w - 40, 470, w - 40, h); ctx.fill();
    ctx.fillStyle = "#f6efe2"; ctx.beginPath(); ctx.moveTo(w / 2 - 70, 430); ctx.lineTo(w / 2, 540); ctx.lineTo(w / 2 + 70, 430); ctx.fill();
    ctx.fillStyle = "#c98f6b"; ctx.fillRect(w / 2 - 42, 340, 84, 110);
    ctx.beginPath(); ctx.ellipse(w / 2, 260, 108, 128, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#2a2522"; ctx.beginPath(); ctx.ellipse(w / 2, 200, 122, 92, 0, Math.PI, 0); ctx.fill();
    ctx.beginPath(); ctx.ellipse(w / 2 - 92, 250, 34, 80, 0.2, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(w / 2 + 92, 250, 34, 80, -0.2, 0, Math.PI * 2); ctx.fill();
  }), 1.15, 1.5, -0.35);
  add(0, cut(1100, 300, (ctx, w, h) => {
    ctx.fillStyle = C.rose; ctx.beginPath(); ctx.moveTo(0, 60); ctx.lineTo(70, 150); ctx.lineTo(0, 240); ctx.lineTo(110, 240); ctx.lineTo(110, 60); ctx.fill();
    ctx.beginPath(); ctx.moveTo(w, 60); ctx.lineTo(w - 70, 150); ctx.lineTo(w, 240); ctx.lineTo(w - 110, 240); ctx.lineTo(w - 110, 60); ctx.fill();
    ctx.fillStyle = "#e57d6f"; rrect(ctx, 80, 20, w - 160, 220, 16); ctx.fill();
    ctx.fillStyle = "#fff"; ctx.font = serif(92); ctx.textAlign = "center"; ctx.fillText(P.name, w / 2, 135);
    ctx.font = sans(34, 600); ctx.fillText(P.role.toUpperCase(), w / 2, 205);
  }), 2.5, 1.5, 0.95);

  // 1. Where from: a flag at each place on the printed map.
  const { project } = placeMap(P);
  P.places.forEach((p, i) => {
    const [s, z] = project(p.lat, p.lng);
    const last = i === P.places.length - 1;
    add(1, cut(520, 640, (ctx) => {
      ctx.fillStyle = "#4b3b2c"; ctx.fillRect(14, 24, 14, 616);
      ctx.fillStyle = "#e7c26b"; ctx.beginPath(); ctx.arc(21, 22, 18, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = last ? C.amber : C.rose;
      ctx.beginPath(); ctx.moveTo(28, 40); ctx.bezierCurveTo(200, 0, 330, 90, 500, 50); ctx.lineTo(500, 290); ctx.bezierCurveTo(330, 330, 200, 240, 28, 280); ctx.fill();
      ctx.fillStyle = "#fff"; ctx.font = serif(72); ctx.fillText(p.name, 56, 160);
      ctx.font = sans(40, 600); ctx.fillText(p.what, 56, 240);
    }), 0.62, s + 0.29, z, { delay: i * 0.1, edge: 10 });
  });

  // 2. Studied: trees, the school, the diploma.
  add(2, cut(1200, 420, (ctx, w, h) => {
    for (let i = 0; i < 7; i++) tree(ctx, 90 + i * 170, h, 300 + (i % 3) * 70, i % 2 ? "#5f9a7c" : "#4f876b");
  }), 2.8, 1.5, -1.3);
  add(2, cut(1000, 760, (ctx, w, h) => {
    ctx.fillStyle = "#efe6d4"; ctx.fillRect(60, 260, w - 120, h - 330);
    ctx.fillStyle = "#d8ccb4"; ctx.beginPath(); ctx.moveTo(30, 270); ctx.lineTo(w / 2, 50); ctx.lineTo(w - 30, 270); ctx.fill();
    ctx.fillStyle = "#e9dfcb"; ctx.beginPath(); ctx.moveTo(90, 250); ctx.lineTo(w / 2, 90); ctx.lineTo(w - 90, 250); ctx.fill();
    ctx.fillStyle = C.ink; ctx.font = serif(44); ctx.textAlign = "center"; ctx.fillText(s0.place.toUpperCase(), w / 2, 220);
    for (let i = 0; i < 6; i++) {
      const x = 120 + i * 148;
      const g = ctx.createLinearGradient(x, 0, x + 64, 0);
      g.addColorStop(0, "#fbf6ea"); g.addColorStop(1, "#cbbd9f");
      ctx.fillStyle = g; ctx.fillRect(x, 300, 64, h - 400);
      ctx.fillStyle = "#d8ccb4"; ctx.fillRect(x - 10, 290, 84, 16); ctx.fillRect(x - 10, h - 110, 84, 16);
    }
    ctx.fillStyle = "#5b4b3a"; ctx.fillRect(w / 2 - 50, h - 250, 100, 150);
    ctx.fillStyle = "#d8ccb4"; for (let i = 0; i < 3; i++) ctx.fillRect(30 + i * 20, h - 90 + i * 30, w - 60 - i * 40, 30);
  }), 2.2, 1.5, -0.55);
  add(2, cut(1000, 520, (ctx, w, h) => {
    ctx.fillStyle = "#fbf8f1"; ctx.fillRect(60, 30, w - 120, h - 60);
    ctx.fillStyle = "#e9dcc2"; ctx.beginPath(); ctx.ellipse(60, h / 2, 40, h / 2 - 30, 0, 0, Math.PI * 2); ctx.fill(); ctx.beginPath(); ctx.ellipse(w - 60, h / 2, 40, h / 2 - 30, 0, 0, Math.PI * 2); ctx.fill();
    ctx.textAlign = "center"; ctx.fillStyle = C.ink;
    ctx.font = serif(44, 400, "italic"); ctx.fillText(P.name, w / 2, 120);
    ctx.font = serif(66); ctx.fillText(s0.degree, w / 2, 230);
    ctx.font = serif(46, 400); ctx.fillText(`in ${s0.field}`, w / 2, 300);
    ctx.fillStyle = C.muted; ctx.font = sans(32, 600); ctx.fillText(`${s0.from} TO ${s0.to}`, w / 2, 385);
    ctx.fillStyle = C.rose; ctx.fillRect(w / 2 + 160, 360, 26, 140); ctx.fillRect(w / 2 + 200, 360, 26, 120);
    ctx.fillStyle = C.amber; ctx.beginPath(); ctx.arc(w / 2 + 193, 380, 50, 0, Math.PI * 2); ctx.fill();
  }), 1.7, 1.5, 0.95);

  // 3. Worked: a skyline behind, a building per job in front, as tall as the years.
  add(3, cut(1200, 460, (ctx, w, h) => {
    ctx.fillStyle = "#cdd6d9";
    let x = 0;
    for (let i = 0; x < w; i++) { const bw = 70 + ((i * 53) % 90), bh = 160 + ((i * 97) % 260); ctx.fillRect(x, h - bh, bw, bh); x += bw + 8; }
  }), 2.8, 1.5, -1.45);
  const jobs = [...P.work].sort((a, b) => a.from - b.from);
  jobs.forEach((w, i) => {
    const years = (w.to ?? NOW) - w.from, hgt = 0.8 + years * 0.32, wid = 0.84;
    const px = Math.round((600 * hgt) / wid);
    const roof = i % 3;
    add(3, cut(600, px + 120, (ctx, cw, ch) => {
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
    }), wid, 0.55 + (i * 1.9) / Math.max(1, jobs.length - 1), i % 2 ? 0.45 : -0.45, { delay: i * 0.12 });
  });

  // 4. Good at: tabbed cards, one per group.
  P.skills.slice(0, 4).forEach((g, i) => {
    add(4, cut(800, 680, (ctx, w, h) => {
      ctx.fillStyle = ["#f6efe2", "#f2d8a0", "#cfe3dc", "#efcfc7"][i];
      const tx = 40 + i * 160;
      ctx.beginPath(); ctx.moveTo(0, 110); ctx.lineTo(tx, 110); ctx.lineTo(tx + 24, 0); ctx.lineTo(tx + 300, 0); ctx.lineTo(tx + 324, 110); ctx.lineTo(w, 110); ctx.lineTo(w, h); ctx.lineTo(0, h); ctx.fill();
      ctx.fillStyle = C.ink; ctx.font = sans(38, 600); ctx.fillText(g.group, tx + 40, 74);
      ctx.font = serif(54, 400); g.items.forEach((it, j) => ctx.fillText(it, 60, 240 + j * 104));
      ctx.fillStyle = C.amber; g.items.forEach((_, j) => { ctx.beginPath(); ctx.arc(34, 222 + j * 104, 9, 0, Math.PI * 2); ctx.fill(); });
    }), 1.32, i % 2 ? 2.2 : 0.8, i < 2 ? -0.8 : 0.7, { delay: i * 0.1 });
  });

  // 5. Made: a card for each project, to open.
  P.projects.slice(0, 6).forEach((p, i) => {
    add(5, cut(700, 620, (ctx, w, h) => {
      ctx.fillStyle = "#fbf8f1"; rrect(ctx, 0, 0, w, h, 18); ctx.fill();
      miniPicture(ctx, p.kind, 22, 22, w - 44, 340, i + 3);
      ctx.fillStyle = C.ink; ctx.font = serif(50); wrap(ctx, p.title, 28, 440, w - 56, 54, 2);
      ctx.fillStyle = C.amber; ctx.font = sans(28, 600); ctx.fillText(`${p.place.toUpperCase()}  ${p.year}`, 28, h - 28);
    }), 0.9, 0.55 + (i % 3) * 0.95, i < 3 ? -0.75 : 0.75, { delay: (i % 3) * 0.08, project: p });
  });

  // 6. Others say: speech bubbles.
  P.quotes.slice(0, 3).forEach((q, i) => {
    add(6, cut(1500, 520, (ctx, w, h) => {
      ctx.fillStyle = ["#fbf8f1", "#f2d8a0", "#cfe3dc"][i]; rrect(ctx, 0, 0, w, h - 70, 46); ctx.fill();
      ctx.beginPath(); ctx.moveTo(150 + i * 320, h - 75); ctx.lineTo(110 + i * 320, h); ctx.lineTo(270 + i * 320, h - 75); ctx.fill();
      ctx.fillStyle = C.ink; ctx.font = serif(46, 400, "italic");
      const y = wrap(ctx, `“${q.text}”`, 56, 86, w - 112, 58, 4);
      ctx.font = sans(34, 600); ctx.fillText(`${q.who}, ${q.from}`, 56, Math.min(y + 22, h - 100));
    }), 2.6, 1.5, -1.25 + i * 1.05, { delay: i * 0.12 });
  });

  // 7. Get in touch: the letter, and the envelope it came out of.
  add(7, cut(1000, 760, (ctx, w, h) => {
    ctx.fillStyle = "#fbf8f1"; ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = "rgba(120,100,70,0.15)"; ctx.lineWidth = 3;
    for (let y = 470; y < h - 40; y += 56) { ctx.beginPath(); ctx.moveTo(60, y); ctx.lineTo(w - 60, y); ctx.stroke(); }
    ctx.fillStyle = C.amber; ctx.font = sans(36, 600); ctx.fillText("GET IN TOUCH", 60, 110);
    ctx.fillStyle = C.ink; ctx.font = serif(84); ctx.fillText(`Write to ${P.first}`, 60, 230);
    ctx.font = serif(52, 400); ctx.fillText(P.contact.email, 60, 330);
    ctx.fillStyle = C.muted; ctx.font = sans(34); wrap(ctx, `${P.seeking}.`, 60, 410, w - 120, 44);
  }), 2.0, 1.5, -0.45);
  add(7, cut(1000, 560, (ctx, w, h) => {
    ctx.fillStyle = "#e9c48a"; ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "#dfb576"; ctx.beginPath(); ctx.moveTo(0, h); ctx.lineTo(w / 2, h * 0.4); ctx.lineTo(w, h); ctx.fill();
    ctx.fillStyle = "#e3bc80"; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(w * 0.42, h * 0.62); ctx.lineTo(0, h); ctx.fill(); ctx.beginPath(); ctx.moveTo(w, 0); ctx.lineTo(w * 0.58, h * 0.62); ctx.lineTo(w, h); ctx.fill();
    ctx.fillStyle = C.rose; ctx.fillRect(w - 170, 40, 120, 140); ctx.fillStyle = "#fff"; ctx.fillRect(w - 158, 52, 96, 116);
    ctx.fillStyle = C.rose; ctx.beginPath(); ctx.arc(w - 110, 110, 30, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = C.ink; ctx.font = sans(40, 600); ctx.textAlign = "center"; ctx.fillText(P.contact.links.join("   "), w / 2, h - 50);
  }), 2.3, 1.5, 0.75);
  return list;
}

// ---------- The book ----------
function desk() {
  return canvas(1024, 1024, (ctx, w, h) => {
    ctx.fillStyle = "#2c2119"; ctx.fillRect(0, 0, w, h);
    for (let i = 0; i < 260; i++) {
      const y = Math.random() * h, a = 0.03 + Math.random() * 0.07;
      ctx.strokeStyle = Math.random() < 0.5 ? `rgba(0,0,0,${a})` : `rgba(160,110,70,${a})`;
      ctx.lineWidth = 1 + Math.random() * 3;
      ctx.beginPath(); ctx.moveTo(0, y);
      for (let x = 0; x <= w; x += 32) ctx.lineTo(x, y + Math.sin(x / 140 + i) * 6);
      ctx.stroke();
    }
  });
}

function edges() {
  return canvas(256, 64, (ctx, w, h) => {
    ctx.fillStyle = "#efe7d6"; ctx.fillRect(0, 0, w, h);
    for (let y = 0; y < h; y += 3) { ctx.fillStyle = `rgba(120,100,70,${0.08 + Math.random() * 0.12})`; ctx.fillRect(0, y, w, 1); }
  });
}

/** How far a page rises from the spine: it dips into the gutter, then lies flat. */
const bow = (s) => 0.11 * (1 - Math.pow(1 - Math.min(s, 0.7) / 0.7, 2));

/** A page turned by angle a about the spine: the point s from the spine, its tangent and normal. */
function curve(a, s, lift) {
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
  const uvF = new Float32Array(n * 2), uvB = new Float32Array(n * 2), idx = [];
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

export async function start({ personKey }) {
  const P = personFrom(personKey);
  await fontsReady();
  const land = await loadLand();
  const stage = makeStage({ fov: 28 });
  document.body.classList.add("book");
  const { scene, camera, renderer } = stage;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  const ui = buildUI({ title: "Pop-up book", how: "Turning the page folds one scene flat and raises the next", personKey, example: "book" });
  const scroll = makeScroll();
  ui.bindScroll(scroll);
  const cta = contactButtons(P);
  const tex = (el) => texture(el, renderer);

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
  for (const side of [-1, 1]) {
    const cover = new THREE.Mesh(new THREE.BoxGeometry(PW + 0.16, 0.05, PD + 0.24), cloth);
    cover.position.set(side * (PW / 2 + 0.02), -0.175, 0); cover.castShadow = cover.receiveShadow = true;
    const edgeTex = tex(edges());
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
  const insideMesh = new THREE.Mesh(insideGeo, new THREE.MeshLambertMaterial({ map: tex(leftPage(P, 0)), side: THREE.BackSide }));
  insideMesh.receiveShadow = true;
  scene.add(insideMesh);
  {
    const pos = insideGeo.attributes.position.array, uv = insideGeo.attributes.uv.array;
    for (let i = 0; i <= SEG; i++) {
      const { p } = curve(Math.PI, (i / SEG) * PW, 0.002);
      for (let j = 0; j <= 1; j++) { const v = (i * 2 + j) * 3; pos[v] = p.x; pos[v + 1] = p.y; pos[v + 2] = j ? PD / 2 : -PD / 2; uv[(i * 2 + j) * 2] = 1 - i / SEG; }
    }
    insideGeo.computeVertexNormals();
  }

  // One sheet per chapter: its front is that chapter's right page, its back the next chapter's left page.
  const blank = canvas(PX, PY, (ctx, w, h) => { ctx.fillStyle = C.paper; ctx.fillRect(0, 0, w, h); grain(ctx, w, h); });
  const sheets = [];
  for (let k = 0; k < N; k++) {
    const { front, back } = sheetGeometries();
    const f = new THREE.Mesh(front, new THREE.MeshLambertMaterial({ map: tex(rightPage(P, k, land)), side: THREE.FrontSide }));
    const b = new THREE.Mesh(back, new THREE.MeshLambertMaterial({ map: tex(k < N - 1 ? leftPage(P, k + 1) : blank), side: THREE.BackSide }));
    f.castShadow = true; f.receiveShadow = b.receiveShadow = true;
    f.material.shadowSide = THREE.DoubleSide;
    scene.add(f, b);
    sheets.push({ geo: front, meshes: [f, b], angle: -1 });
  }

  // The scenes: each card hinged to its chapter's page.
  const pops = scenes(P).map((it) => {
    const g = new THREE.PlaneGeometry(it.w, it.h);
    g.translate(0, it.h / 2 - 0.012, 0);
    const m = new THREE.Mesh(g, new THREE.MeshLambertMaterial({ map: tex(it.pic), transparent: true, alphaTest: 0.5, side: THREE.DoubleSide }));
    m.castShadow = true; m.receiveShadow = true;
    m.matrixAutoUpdate = false;
    if (it.project) m.userData.project = it.project;
    scene.add(m);
    return { ...it, m };
  });

  let current = { from: 0, to: 0 };
  clickable(stage, () => pops.filter((p) => p.chapter === 5).map((p) => p.m), P, () => current.from === 5 && current.to === 5);

  const angleOf = (k, st) => (k < st.from ? Math.PI : k === st.from && st.to !== st.from ? Math.PI * st.t : 0);
  const liftOf = (k, a) => lerp((N - k) * EPS, (k + 1) * EPS, a / Math.PI);
  // A chapter's scene stands while its spread is open, and folds as the page lifts.
  const raiseOf = (k, st) => {
    if (st.from === st.to) return k === st.from ? 1 : 0;
    if (k === st.from) return 1 - smooth(0.02, 0.45, st.raw);
    if (k === st.to) return smooth(0.5, 0.97, st.raw);
    return 0;
  };

  const basis = new THREE.Matrix4(), up = new THREE.Vector3(), face = new THREE.Vector3();
  const Z = new THREE.Vector3(0, 0, 1);
  const clock = new THREE.Clock();

  function frame() {
    const st = scroll.step();
    current = st;
    ui.update(st);
    const time = clock.getElapsedTime();

    sheets.forEach((sh, k) => {
      const a = angleOf(k, st);
      if (Math.abs(a - sh.angle) < 1e-6) return;
      sh.angle = a;
      const pos = sh.geo.attributes.position.array, lift = liftOf(k, a);
      for (let i = 0; i <= SEG; i++) {
        const { p } = curve(a, (i / SEG) * PW, lift);
        for (let j = 0; j <= 1; j++) { const v = (i * 2 + j) * 3; pos[v] = p.x; pos[v + 1] = p.y; pos[v + 2] = j ? PD / 2 : -PD / 2; }
      }
      sh.geo.attributes.position.needsUpdate = true;
      sh.geo.computeVertexNormals();
      sh.geo.attributes.normal.needsUpdate = true;
      sh.geo.computeBoundingSphere();
      sh.meshes[1].geometry.boundingSphere = sh.geo.boundingSphere;
    });

    for (const it of pops) {
      const k = it.chapter, a = angleOf(k, st);
      const r = ease(clamp(raiseOf(k, st) * (1 + (it.delay ?? 0)) - (it.delay ?? 0)));
      it.m.visible = r > 0.002;
      if (!it.m.visible) continue;
      const c = curve(a, it.s, liftOf(k, a) + 0.004);
      const th = (1 - r) * (Math.PI / 2);
      up.copy(c.n).multiplyScalar(Math.cos(th)).addScaledVector(Z, -Math.sin(th));
      face.crossVectors(c.t, up);
      basis.makeBasis(c.t, up, face).setPosition(c.p.x, c.p.y, it.z);
      it.m.matrix.copy(basis);
      it.m.matrixWorldNeedsUpdate = true;
    }

    // Lean in on each open spread; stand back while a page turns.
    const narrow = stage.narrow;
    const turning = Math.sin(Math.PI * st.raw);
    const target = new THREE.Vector3(narrow ? PW / 2 : lerp(0.35, 0, turning), lerp(0.55, 0.45, turning), lerp(0.05, 0.15, turning));
    const d = fitDistance(camera, narrow ? PW + 0.5 : lerp(2 * PW + 0.5, 2 * PW + 1.8, turning), PD + 1.7);
    const pitch = lerp(0.74, 0.86, turning) + 0.015 * Math.sin(time * 0.3);
    const yaw = 0.04 * Math.sin(time * 0.21);
    camera.position.set(target.x + Math.sin(yaw) * Math.cos(pitch) * d, target.y + Math.sin(pitch) * d, target.z + Math.cos(yaw) * Math.cos(pitch) * d);
    camera.lookAt(target);

    cta.update(st.from === 7 ? 1 : st.to === 7 ? smooth(0.7, 1, st.raw) : 0);
    renderer.render(scene, camera);
    requestAnimationFrame(frame);
  }
  frame();
}
