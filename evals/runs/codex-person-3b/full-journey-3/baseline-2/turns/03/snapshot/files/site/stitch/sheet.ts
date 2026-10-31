// One sheet: the person's CV is one sheet of paper, cut invisibly into six
// tiles, that bends into each chapter's picture. Every picture and every
// word on it is drawn from the person's data. Browser only.
import * as THREE from "three";
import { yearText, type ChapterKey } from "./chapters.ts";
import { NOW, placeViews, slots, yearRange, type Person, type Project } from "./person.ts";
import { backdrop, canvas, grain, label, miniPicture, rrect, sans, serif, texture, wrap } from "./paint.ts";
import { dotLand, type Land } from "./land.ts";
import type { Palette } from "./look.ts";
import { equirect } from "./frame.ts";
import { clamp, ease, lerp, smooth } from "./scroll.ts";
import { holding, type Anchor, type World, type WorldFactory, type WorldView } from "./world.ts";

const COLS = 3, ROWS = 2, SEG = 22;
const W = 3, H = 4.24, R = 1.5;
const FOV = 32;

type Shape = (U: number, V: number, c: number, r: number) => [number, number, number];

// ---------- The shapes, each a function of the sheet's own (U, V) ----------
const page: Shape = (U, V) => [(U - 0.5) * W, (V - 0.5) * H, 0.1 * Math.sin(Math.PI * V)];

const globe: Shape = (U, V) => {
  const lon = (U - 0.5) * 2 * Math.PI, lat = (V - 0.5) * Math.PI;
  return [R * Math.cos(lat) * Math.sin(lon), R * Math.sin(lat), R * Math.cos(lat) * Math.cos(lon)];
};

const DW = 4.7, DH = 3.15, ROLL = 0.075, RR = 0.1;
const diploma: Shape = (U, V) => {
  const y = (V - 0.5) * DH, flat = DW * (1 - 2 * ROLL);
  const curl = (s: number, side: number): [number, number, number] => {
    const th = s / RR, r = RR * (1 - (0.18 * th) / Math.PI);
    return [side * (flat / 2 + r * Math.sin(th)), y, -(r - r * Math.cos(th))];
  };
  if (U < ROLL) return curl((ROLL - U) * DW, -1);
  if (U > 1 - ROLL) return curl((U - (1 - ROLL)) * DW, 1);
  return [-flat / 2 + (U - ROLL) * DW, y, 0];
};

const LR = 10, RH = 1.3;
/** On a phone, the most of the sheet's width in view: its smallest printed words are then about 11 pixels high. */
const READ_W = 2.2;
const ribbon: Shape = (U, V) => [(U - 0.5) * LR, (V - 0.5) * RH, -0.45 * Math.sin((U - 0.5) * Math.PI * 1.6)];

const PW = 1.5, PH = 3.0, FOLD = 0.55;
const leaflet: Shape = (U, V) => {
  const s = clamp(U * 4, 0, 4), k = Math.min(3, Math.floor(s)), f = s - k;
  const dx = PW * Math.cos(FOLD), dz = PW * Math.sin(FOLD);
  const x0 = -2 * dx + k * dx, z0 = k % 2 ? -dz : 0;
  return [x0 + f * dx, (V - 0.5) * PH, (k % 2 ? z0 + f * dz : z0 - f * dz) + dz / 2];
};

const PLW = 1.8, PLH = 1.36, GAP = 0.22;
const wall: Shape = (U, V, c, r) => {
  const lu = U * COLS - c, lv = V * ROWS - r;
  const a = (1 - c) * 0.24, xl = (lu - 0.5) * PLW;
  return [(c - 1) * (PLW + GAP + 0.06) + xl * Math.cos(a), (r - 0.5) * (PLH + GAP) + (lv - 0.5) * PLH,
    -xl * Math.sin(a) + (c === 1 ? 0 : 0.22)];
};

const QW = 2.05, QH = 2.9;
const cards: Shape = (U, V, c) => {
  const lu = U * COLS - c, tilt = (c - 1) * -0.05, xl = (lu - 0.5) * QW, yl = (V - 0.5) * QH;
  return [(c - 1) * 2.35 + xl * Math.cos(tilt) - yl * Math.sin(tilt), xl * Math.sin(tilt) + yl * Math.cos(tilt),
    0.07 * Math.sin(Math.PI * lu) + (c === 1 ? 0.18 : 0)];
};

const SHAPES: Record<ChapterKey, Shape> = { hello: page, from: globe, studied: diploma, worked: ribbon, good: leaflet, made: wall, say: cards, contact: page };
// How each chapter is framed: the box to fit, and how the sheet is turned.
const FRAMES: Record<ChapterKey, { box: [number, number]; rot: [number, number, number] }> = {
  hello: { box: [3.6, 5.0], rot: [-0.08, 0.42, 0.05] },
  from: { box: [3.7, 3.7], rot: [0, 0, 0] },
  studied: { box: [5.2, 3.8], rot: [-0.12, -0.22, 0.02] },
  worked: { box: [6.2, 2.6], rot: [-0.18, 0, 0] },
  good: { box: [6.0, 3.6], rot: [-0.12, 0.28, 0] },
  made: { box: [7.4, 3.6], rot: [0, 0, 0] },
  say: { box: [7.8, 3.8], rot: [0, 0, 0] },
  contact: { box: [3.6, 5.0], rot: [-0.04, -0.3, -0.03] },
};
// In which order the sheet leaves each chapter's shape: 0 moves first.
const ORDER: Record<ChapterKey, (U: number, V: number, c: number, r: number) => number> = {
  hello: (U) => U,
  from: (U) => Math.abs(U - 0.5) * 2,
  studied: (U) => Math.abs(U - 0.5) * 2,
  worked: (U) => 1 - U,
  good: (U, V, c, r) => (c + (1 - r) * 3) / 5,
  made: (U, V, c, r) => 1 - r,
  say: (U) => 1 - Math.abs(U - 0.5) * 2,
  contact: (U) => U,
};

// ---------- The pictures printed on the sheet ----------
/** A picture printed on paper: drawn, then flecked like the paper it is printed on. */
const printed = (w: number, h: number, draw: (ctx: CanvasRenderingContext2D, w: number, h: number) => void) =>
  canvas(w, h, (ctx) => { draw(ctx, w, h); grain(ctx, w, h, Math.round((w * h) / 150), w + h); });

function cvPage(P: Person, C: Palette) {
  return printed(1024, 1448, (ctx, w) => {
    ctx.fillStyle = C.paper; ctx.fillRect(0, 0, w, 1448);
    const m = 84;
    ctx.fillStyle = C.ink; ctx.font = serif(80); ctx.fillText(P.name, m, 170);
    ctx.fillStyle = C.amber; ctx.font = sans(30, 600); ctx.fillText(P.role.toUpperCase(), m, 225);
    ctx.fillStyle = C.ink; ctx.font = serif(32, 400, "italic"); wrap(ctx, P.line, m, 285, w - 2 * m, 42, 2);
    ctx.fillStyle = C.line; ctx.fillRect(m, 345, w - 2 * m, 3);
    const sec = (y: number, head: string, rows: string[]) => {
      if (!rows.length) return y;
      ctx.fillStyle = C.amber; ctx.font = sans(20, 600); ctx.fillText(head.toUpperCase(), m, y);
      ctx.fillStyle = C.ink; ctx.font = sans(24);
      let yy = y;
      for (const row of rows) { yy = wrap(ctx, row, m + 230, yy, w - 2 * m - 230, 32, 3); yy += 4; }
      return Math.max(yy, y + 34) + 26;
    };
    let y = 410;
    y = sec(y, "Places", P.places.length ? [P.places.map((p) => p.name).join("  >  ")] : []);
    y = sec(y, "Education", P.study.map((s) => `${s.degree}, ${s.field}. ${s.place}, ${s.from} to ${s.to}`));
    y = sec(y, "Experience", P.work.slice(0, 5).map((x) => `${x.role}, ${x.org}, ${x.place}. ${yearText(x)}`));
    y = sec(y, "Skills", P.skills.slice(0, 5).map((g) => `${g.group}: ${g.items.join(", ")}`));
    y = sec(y, "Projects", P.projects.length ? [P.projects.map((p) => p.title).join(", ")] : []);
    y = sec(y, "References", P.quotes.slice(0, 4).map((q) => `${q.who}, ${q.from}`));
    sec(y, "Contact", [P.contact.email]);
  });
}

function globeMap(land: Land, C: Palette) {
  return printed(2048, 1024, (ctx, w, h) => {
    ctx.fillStyle = C.paper; ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = "rgba(28,34,42,0.10)"; ctx.lineWidth = 2;
    for (let lng = -180; lng <= 180; lng += 15) { const [x] = equirect(lng, 0, w, h); ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke(); }
    for (let lat = -75; lat <= 75; lat += 15) { const [, y] = equirect(0, lat, w, h); ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }
    const stretch = (y: number) => Math.min(5, 1 / Math.max(0.05, Math.cos(((90 - (y / h) * 180) * Math.PI) / 180)));
    dotLand(ctx, land, (lng, lat) => equirect(lng, lat, w, h), w, h, 7, 2.3, "rgba(28,34,42,0.78)", stretch);
  });
}

function diplomaPicture(P: Person, C: Palette) {
  const s = P.study[0];
  return printed(1500, 1000, (ctx, w, h) => {
    ctx.fillStyle = C.paper; ctx.fillRect(0, 0, w, h);
    const m = w * ROLL + 40;
    ctx.strokeStyle = C.amber; ctx.lineWidth = 6; ctx.strokeRect(m, 50, w - 2 * m, h - 100);
    ctx.lineWidth = 2; ctx.strokeRect(m + 16, 66, w - 2 * m - 32, h - 132);
    ctx.textAlign = "center"; const cx = w / 2;
    ctx.fillStyle = C.muted; ctx.font = sans(26, 600); ctx.fillText(`${s.place.toUpperCase()}  ·  ${s.from} TO ${s.to}`, cx, 170);
    ctx.fillStyle = C.ink; ctx.font = serif(36, 400, "italic"); ctx.fillText("This certifies that", cx, 260);
    ctx.font = serif(84); ctx.fillText(P.name, cx, 360);
    ctx.font = serif(32, 400, "italic"); ctx.fillText("has been awarded the degree of", cx, 440);
    ctx.font = serif(60); ctx.fillText(s.degree, cx, 530);
    ctx.font = serif(44, 400); ctx.fillText(`in ${s.field}`, cx, 595);
    if (s.note) { ctx.fillStyle = C.muted; ctx.font = sans(26); ctx.fillText(s.note, cx, 690); }
    if (P.study.length > 1) { ctx.fillStyle = C.muted; ctx.font = sans(24); ctx.fillText(`and ${P.study.length - 1} more`, cx, 735); }
    ctx.fillStyle = C.amber; ctx.beginPath(); ctx.arc(cx, 820, 62, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = C.paper; ctx.font = sans(24, 600); ctx.fillText(String(s.to), cx, 830);
  });
}

function timeline(P: Person, C: Palette) {
  const [y0, y1] = yearRange(P);
  return printed(4096, 532, (ctx, w, h) => {
    ctx.fillStyle = C.paper; ctx.fillRect(0, 0, w, h);
    const X = (yr: number) => 120 + ((yr - y0) / (y1 - y0)) * (w - 240), axis = 400;
    ctx.fillStyle = C.ink; ctx.fillRect(100, axis, w - 200, 4);
    ctx.font = sans(30, 600); ctx.textAlign = "center";
    const every = Math.ceil((y1 - y0) / 16);
    for (let yr = y0; yr <= y1; yr += every) { ctx.fillRect(X(yr) - 2, axis - 10, 4, 24); ctx.fillText(String(yr), X(yr), axis + 60); }
    ctx.textAlign = "left";
    const bar = (a: number, b: number, row: number, color: string, head: string, sub: string) => {
      const y = 120 + row * 110;
      ctx.fillStyle = color; rrect(ctx, X(a), y + 52, Math.max(30, X(b) - X(a)), 26, 13); ctx.fill();
      ctx.fillStyle = C.ink; ctx.font = serif(40); ctx.fillText(head, X(a), y + 30);
      ctx.fillStyle = C.muted; ctx.font = sans(26); ctx.fillText(sub, X(a), y + 112);
      ctx.strokeStyle = color; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(X(a), y + 78); ctx.lineTo(X(a), axis); ctx.stroke();
    };
    for (const s of P.study) bar(s.from, s.to, 0, "rgba(63,167,150,0.55)", `Studied in ${s.place}`, s.field);
    P.work.forEach((x, i) => bar(x.from, x.to ?? NOW, (i + 1) % 2, i === P.work.length - 1 ? C.amber : C.ink, x.org, `${x.role}, ${x.place}. ${yearText(x)}`));
  });
}

function leafletPicture(P: Person, C: Palette) {
  return printed(2048, 1024, (ctx, w, h) => {
    const pw = w / 4;
    const { shown, more } = slots(P.skills, 4);
    shown.forEach((g, i) => {
      const x = i * pw;
      ctx.fillStyle = i % 2 ? C.paperDark : C.paper; ctx.fillRect(x, 0, pw, h);
      if (!g) return;
      ctx.fillStyle = C.amber; ctx.font = sans(26, 600); ctx.fillText(String(i + 1).padStart(2, "0"), x + 48, 110);
      ctx.fillStyle = C.ink; ctx.font = serif(54); wrap(ctx, g.group, x + 48, 190, pw - 90, 60, 2);
      ctx.font = sans(38);
      const items = slots(g.items, 5);
      items.shown.forEach((it, j) => {
        if (!it) return;
        const y = 360 + j * 112;
        ctx.fillStyle = C.ink; rrect(ctx, x + 44, y - 50, pw - 88, 76, 38); ctx.lineWidth = 3; ctx.strokeStyle = C.ink; ctx.stroke();
        ctx.fillText(it, x + 74, y);
      });
      const extra = items.more + (i === 3 ? more : 0);
      if (extra) { ctx.fillStyle = C.muted; ctx.font = sans(30, 600); ctx.fillText(`and ${extra} more`, x + 48, h - 50); }
    });
  });
}

function wallPicture(P: Person, C: Palette) {
  return printed(2048, 1024, (ctx, w, h) => {
    const cw = w / 3, ch = h / 2;
    const { shown, more } = slots(P.projects, 6);
    shown.forEach((p, i) => {
      const x = (i % 3) * cw, y = Math.floor(i / 3) * ch;
      ctx.fillStyle = C.paper; ctx.fillRect(x, y, cw, ch);
      if (!p) return;
      miniPicture(ctx, C, p.kind, x + 28, y + 28, cw - 56, ch * 0.5, i + 3);
      ctx.fillStyle = C.ink; ctx.font = serif(40); ctx.fillText(p.title, x + 30, y + ch * 0.5 + 92);
      ctx.fillStyle = C.muted; ctx.font = sans(24); wrap(ctx, p.line, x + 30, y + ch * 0.5 + 134, cw - 60, 30, 2);
      ctx.fillStyle = C.amber; ctx.font = sans(22, 600); ctx.fillText(`${p.place.toUpperCase()}  ${p.year}`, x + 30, y + ch - 30);
      if (i === 5 && more) { ctx.fillStyle = C.ink; ctx.textAlign = "right"; ctx.fillText(`AND ${more} MORE`, x + cw - 30, y + ch - 30); ctx.textAlign = "left"; }
    });
  });
}

function quotePicture(P: Person, C: Palette) {
  return printed(2048, 1448, (ctx, w, h) => {
    const cw = w / 3;
    const { shown, more } = slots(P.quotes, 3);
    shown.forEach((q, i) => {
      const x = i * cw;
      ctx.fillStyle = C.paper; ctx.fillRect(x, 0, cw, h);
      if (!q) return;
      ctx.fillStyle = C.amber; ctx.font = serif(220); ctx.fillText("“", x + 40, 250);
      ctx.fillStyle = C.ink; ctx.font = serif(46, 400, "italic");
      const y = wrap(ctx, q.text, x + 56, 330, cw - 112, 62, 11);
      ctx.fillStyle = C.ink; ctx.font = sans(32, 600); ctx.fillText(q.who, x + 56, Math.max(y + 60, h - 220));
      ctx.fillStyle = C.muted; ctx.font = sans(26); wrap(ctx, q.from, x + 56, Math.max(y + 104, h - 176), cw - 112, 32, 2);
      if (i === 2 && more) { ctx.fillStyle = C.amber; ctx.font = sans(26, 600); ctx.fillText(`AND ${more} MORE`, x + 56, h - 70); }
    });
  });
}

function contactPage(P: Person, C: Palette) {
  return printed(1024, 1448, (ctx, w, h) => {
    ctx.fillStyle = C.paper; ctx.fillRect(0, 0, w, h);
    const m = 84;
    ctx.fillStyle = C.amber; ctx.font = sans(26, 600); ctx.fillText("GET IN TOUCH", m, 200);
    ctx.fillStyle = C.ink; ctx.font = serif(86); wrap(ctx, `Write to ${P.first}`, m, 310, w - 2 * m, 96, 2);
    ctx.font = serif(46, 400); ctx.fillText(P.contact.email, m, 470);
    ctx.fillStyle = C.muted; ctx.font = sans(30); wrap(ctx, `${P.seeking}.`, m, 540, w - 2 * m, 40, 2);
    ctx.fillStyle = C.line; ctx.fillRect(m, 620, w - 2 * m, 3);
    ctx.fillStyle = C.ink; ctx.font = sans(34, 600);
    P.contact.links.slice(0, 6).forEach((l, i) => ctx.fillText(`${l}  →`, m, 710 + i * 70));
    ctx.fillStyle = C.muted; ctx.font = serif(30, 400, "italic");
    wrap(ctx, "An illustrated overview. Full details open from the work index.", m, h - 200, w - 2 * m, 42);
  });
}

const PICTURES: Record<ChapterKey, (P: Person, land: Land, C: Palette) => HTMLCanvasElement> = {
  hello: (P, land, C) => cvPage(P, C), from: (P, land, C) => globeMap(land, C), studied: (P, land, C) => diplomaPicture(P, C),
  worked: (P, land, C) => timeline(P, C), good: (P, land, C) => leafletPicture(P, C), made: (P, land, C) => wallPicture(P, C),
  say: (P, land, C) => quotePicture(P, C), contact: (P, land, C) => contactPage(P, C),
};

// ---------- The sheet ----------
const VERT = `
attribute float prog;
varying vec2 vUv; varying float vProg; varying vec3 vN;
void main() {
  vUv = uv; vProg = prog; vN = normalize(normalMatrix * normal);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`;
const FRAG = `
uniform sampler2D A; uniform sampler2D B; uniform vec3 back;
varying vec2 vUv; varying float vProg; varying vec3 vN;
void main() {
  vec3 n = normalize(vN);
  if (!gl_FrontFacing) n = -n;
  float d = max(dot(n, normalize(vec3(-0.35, 0.55, 0.85))), 0.0);
  float light = 0.58 + 0.46 * d;
  vec3 a = texture2D(A, vUv).rgb, b = texture2D(B, vUv).rgb;
  vec3 col = gl_FrontFacing ? mix(a, b, smoothstep(0.38, 0.62, vProg)) : back;
  gl_FragColor = vec4(col * light, 1.0);
  #include <colorspace_fragment>
}`;

function tileGeometry(c: number, r: number) {
  const n = (SEG + 1) * (SEG + 1);
  const pos = new Float32Array(n * 3), uv = new Float32Array(n * 2), prog = new Float32Array(n);
  const idx: number[] = [];
  for (let j = 0; j <= SEG; j++) for (let i = 0; i <= SEG; i++) {
    const k = j * (SEG + 1) + i;
    uv[k * 2] = (c + i / SEG) / COLS; uv[k * 2 + 1] = (r + j / SEG) / ROWS;
    if (i < SEG && j < SEG) idx.push(k, k + 1, k + SEG + 1, k + 1, k + SEG + 2, k + SEG + 1);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  g.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
  g.setAttribute("prog", new THREE.BufferAttribute(prog, 1));
  g.setIndex(idx);
  return g;
}

const toV = (lat: number, lng: number, rad: number) => {
  const la = (lat * Math.PI) / 180, lo = (lng * Math.PI) / 180;
  return new THREE.Vector3(rad * Math.cos(la) * Math.sin(lo), rad * Math.sin(la), rad * Math.cos(la) * Math.cos(lo));
};

type Tile = THREE.Mesh<THREE.BufferGeometry, THREE.ShaderMaterial> & {
  userData: { c: number; r: number; shapes: Partial<Record<ChapterKey, Float32Array>>; project: Project | null };
};

export const createSheet: WorldFactory = async (env, chapters) => {
  const P = env.person, C = env.palette;
  const own = new Set(chapters);
  const scene = new THREE.Scene();
  const bg = texture(backdrop(C));
  scene.background = bg;
  const camera = new THREE.PerspectiveCamera(FOV, 1, 0.05, 200);

  const tex: Partial<Record<ChapterKey, THREE.Texture>> = {};
  for (const k of chapters) tex[k] = texture(PICTURES[k](P, env.land, C), env.renderer);
  const first = tex[chapters[0]]!;
  const mat = new THREE.ShaderMaterial({
    vertexShader: VERT, fragmentShader: FRAG, side: THREE.DoubleSide,
    uniforms: { A: { value: first }, B: { value: first }, back: { value: new THREE.Color(C.paperDark) } },
  });

  const sheet = new THREE.Group();
  scene.add(sheet);
  // A lamp from the upper left, and an unseen floor just under the sheet that takes its shadow.
  const lamp = new THREE.DirectionalLight(0xffffff, 1);
  lamp.position.set(-3, 7, 4);
  lamp.castShadow = true;
  lamp.shadow.mapSize.set(2048, 2048);
  Object.assign(lamp.shadow.camera, { left: -7, right: 7, top: 7, bottom: -7, near: 1, far: 25 });
  lamp.shadow.bias = -0.0004; lamp.shadow.normalBias = 0.02;
  scene.add(lamp, lamp.target);
  // The floor is seen only as the lamp's pool of light, which the sheet's shadow falls into.
  const pool = texture(canvas(512, 512, (ctx, w, h) => {
    const g = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w / 2);
    g.addColorStop(0, "rgba(150,138,118,0.5)"); g.addColorStop(0.55, "rgba(120,110,95,0.22)"); g.addColorStop(1, "rgba(120,110,95,0)");
    ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
  }));
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(14, 9), new THREE.MeshLambertMaterial({ map: pool, transparent: true, depthWrite: false }));
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;
  scene.add(floor);
  const bounds = new THREE.Box3();
  const wallSlots = slots(P.projects, 6).shown;
  const tiles: Tile[] = [];
  for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) {
    const geo = tileGeometry(c, r);
    const uv = geo.attributes.uv.array as Float32Array;
    const n = uv.length / 2;
    // Every shape this sheet takes, worked out once per tile.
    const shapes: Partial<Record<ChapterKey, Float32Array>> = {};
    for (const k of chapters) {
      const a = new Float32Array(n * 3);
      for (let i = 0; i < n; i++) a.set(SHAPES[k](uv[i * 2], uv[i * 2 + 1], c, r), i * 3);
      shapes[k] = a;
    }
    const mesh = new THREE.Mesh(geo, mat) as Tile;
    mesh.castShadow = true;
    mesh.userData = { c, r, shapes, project: wallSlots[(ROWS - 1 - r) * COLS + c] };
    sheet.add(mesh);
    tiles.push(mesh);
  }

  // The places on the globe: a route, a dot and a name for each.
  const deco = new THREE.Group();
  sheet.add(deco);
  deco.visible = false;
  let route: THREE.Mesh<THREE.TubeGeometry, THREE.MeshBasicMaterial> | null = null;
  const marks: { dot: THREE.Mesh<THREE.SphereGeometry, THREE.MeshBasicMaterial>; tag: THREE.Sprite; base: THREE.Vector3 }[] = [];
  if (own.has("from")) {
    const routePts: THREE.Vector3[] = [];
    for (let i = 0; i < P.places.length - 1; i++) {
      const a = toV(P.places[i].lat, P.places[i].lng, 1), b = toV(P.places[i + 1].lat, P.places[i + 1].lng, 1);
      const ang = a.angleTo(b);
      for (let s = 0; s <= 40; s++) {
        const t = s / 40;
        const v = ang < 1e-6 ? a.clone() : a.clone().multiplyScalar(Math.sin((1 - t) * ang) / Math.sin(ang)).add(b.clone().multiplyScalar(Math.sin(t * ang) / Math.sin(ang)));
        routePts.push(v.normalize().multiplyScalar(R * (1.006 + 0.12 * ang * Math.sin(Math.PI * t))));
      }
    }
    if (routePts.length >= 2) {
      route = new THREE.Mesh(
        new THREE.TubeGeometry(new THREE.CatmullRomCurve3(routePts), routePts.length * 2, 0.008, 6, false),
        new THREE.MeshBasicMaterial({ color: C.amber, transparent: true }),
      );
      deco.add(route);
    }
    for (const p of P.places) {
      const dot = new THREE.Mesh(new THREE.SphereGeometry(0.022, 16, 12), new THREE.MeshBasicMaterial({ color: C.rose, transparent: true }));
      dot.position.copy(toV(p.lat, p.lng, R * 1.004));
      const tag = label(`${p.name}  ${p.what}`, { size: 38, color: "#fff", bg: "rgba(28,34,42,0.86)", height: 0.11 });
      tag.position.copy(toV(p.lat, p.lng, R * 1.004)).add(new THREE.Vector3(0, 0.07, 0));
      tag.center.set(-0.06, 0);
      deco.add(dot, tag);
      marks.push({ dot, tag, base: tag.scale.clone() });
    }
  }

  // Where the globe looks, and how near, at each place.
  const views = placeViews(P);
  const viewAt = (local: number) => {
    if (views.length < 2) {
      const v = views[0] ?? { lat: 0, lng: 0, zoom: 1 };
      return { lat: v.lat, lng: v.lng, zoom: 1, routeShown: 1 };
    }
    // First settle on the first place at the whole globe, then go place to place.
    const intro = smooth(0, 0.18, local);
    const s = clamp((local - 0.18) / 0.77) * (views.length - 1);
    const i = Math.min(views.length - 2, Math.floor(s)), f = ease(clamp(s - i));
    const a = views[i], b = views[i + 1];
    let dl = b.lng - a.lng; if (dl > 180) dl -= 360; if (dl < -180) dl += 360;
    const zoom = lerp(1, lerp(a.zoom, b.zoom, f) * (1 - 0.35 * Math.sin(Math.PI * f) * (Math.abs(dl) > 30 ? 1 : 0)), intro);
    return { lat: lerp(a.lat, b.lat, f), lng: a.lng + dl * f, zoom, routeShown: (i + f) / (views.length - 1) };
  };
  const poseOf = (k: ChapterKey, local: number) => {
    if (k === "from") { const v = viewAt(local); return { rot: [((v.lat * Math.PI) / 180) * 0.85, (-v.lng * Math.PI) / 180, 0], scale: v.zoom }; }
    return { rot: FRAMES[k].rot, scale: 1 };
  };
  const fitDistance = (w: number, h: number) => {
    const v = THREE.MathUtils.degToRad(camera.fov) / 2;
    return Math.max(h / 2 / Math.tan(v), w / 2 / (Math.tan(v) * camera.aspect));
  };

  let shaped = "";
  const tmp = new THREE.Vector3(), camDir = new THREE.Vector3();

  function pose(view: WorldView) {
    const { from, to, raw, t, local, time } = view;
    const moving = from !== to;
    const sig = moving ? `${from}>${to}@${raw}` : from;
    if (sig !== shaped) {
      shaped = sig;
      mat.uniforms.A.value = tex[from];
      mat.uniforms.B.value = tex[to];
      const order = ORDER[from];
      for (const m of tiles) {
        const { c, r, shapes } = m.userData;
        const a = shapes[from]!, b = shapes[to]!;
        const pos = m.geometry.attributes.position.array as Float32Array;
        const prog = m.geometry.attributes.prog.array as Float32Array;
        const uv = m.geometry.attributes.uv.array as Float32Array;
        for (let k = 0; k < prog.length; k++) {
          const p = moving ? ease(clamp(raw * 1.7 - 0.7 * order(uv[k * 2], uv[k * 2 + 1], c, r))) : 0;
          prog[k] = p;
          const lift = 0.45 * Math.sin(Math.PI * p);
          pos[k * 3] = lerp(a[k * 3], b[k * 3], p);
          pos[k * 3 + 1] = lerp(a[k * 3 + 1], b[k * 3 + 1], p);
          pos[k * 3 + 2] = lerp(a[k * 3 + 2], b[k * 3 + 2], p) + lift;
        }
        m.geometry.attributes.position.needsUpdate = true;
        m.geometry.attributes.prog.needsUpdate = true;
        m.geometry.computeVertexNormals();
        m.geometry.computeBoundingSphere();
        m.geometry.computeBoundingBox();
      }
    }

    // Turn and frame the sheet.
    const pa = poseOf(from, moving ? 1 : local), pb = poseOf(to, 0);
    sheet.rotation.set(lerp(pa.rot[0], pb.rot[0], t), lerp(pa.rot[1], pb.rot[1], t), lerp(pa.rot[2], pb.rot[2], t));
    const scale = lerp(pa.scale, pb.scale, t);
    sheet.scale.setScalar(scale);
    sheet.position.y = !moving && from === "hello" ? 0.04 * Math.sin(time * 0.8) : 0;
    // On a phone the sheet is read a part at a time: as much of its width as keeps
    // its words readable and all of its height (the globe's words are its own).
    const narrow = env.narrow();
    const seen = (k: ChapterKey): [number, number] => {
      const [w, h] = FRAMES[k].box;
      return narrow && k !== "from" ? [Math.min(w, Math.max(READ_W, h * camera.aspect)), h] : [w, h];
    };
    const box = seen(from), box2 = seen(to);
    // Lean in on each hold; stand back, and look a little down, while the sheet moves.
    const turning = Math.sin(Math.PI * raw);
    const d = lerp(fitDistance(box[0], box[1]), fitDistance(box2[0], box2[1]), t) * lerp(0.95, 1.1, turning);
    camera.position.set(0, d * lerp(0.02, 0.09, turning), d);
    camera.lookAt(0, 0, 0);
    camera.updateMatrixWorld();
    // What is wider than the view, the timeline always and on a phone the rest, is
    // travelled across over the hold, left to right.
    const vw = 2 * d * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.aspect;
    const pan = (k: ChapterKey) => (k === "worked" ? Math.max(0, (LR - vw) / 2 + 0.4) : narrow && k !== "from" ? Math.max(0, (FRAMES[k].box[0] - vw) / 2) : 0);
    const panAt = (k: ChapterKey, l: number) => lerp(pan(k), -pan(k), l);
    sheet.position.x = lerp(panAt(from, moving ? 1 : local), panAt(to, 0), t);

    // The floor stays just under the sheet's lowest point.
    sheet.updateMatrixWorld();
    bounds.makeEmpty();
    for (const tile of tiles) bounds.expandByObject(tile);
    floor.position.y = bounds.min.y - 0.12;

    // The places show only while the sheet is a globe.
    const g = !moving ? (from === "from" ? 1 : 0) : to === "from" ? smooth(0.8, 1, raw) : from === "from" ? 1 - smooth(0, 0.15, raw) : 0;
    deco.visible = g > 0.01 && own.has("from");
    if (deco.visible) {
      const shown = !moving ? viewAt(local).routeShown : to === "from" ? 0 : 1;
      if (route) {
        const count = route.geometry.index!.count;
        route.geometry.setDrawRange(0, Math.floor((count / 6) * shown) * 6);
        route.material.opacity = g;
      }
      sheet.updateMatrixWorld();
      camera.getWorldDirection(camDir);
      marks.forEach(({ dot, tag, base }, i) => {
        dot.getWorldPosition(tmp);
        const facing = -tmp.sub(sheet.position).normalize().dot(camDir);
        const reached = shown * (marks.length - 1) >= i - 0.15 ? 1 : 0;
        const o = g * smooth(0.15, 0.35, facing) * reached;
        dot.material.opacity = o; (tag.material as THREE.SpriteMaterial).opacity = o;
        tag.scale.copy(base).multiplyScalar(1 / scale);
      });
    }
  }

  const ray = new THREE.Raycaster();
  const world: World = {
    id: "sheet",
    scene,
    camera,
    pose,
    // The window opens at the front of the sheet, where the camera looks, half as high as the
    // chapter's picture, so it reads as a window in the picture before the camera flies in.
    anchor(chapter): Anchor {
      pose(holding(chapter, 1));
      sheet.updateMatrixWorld();
      const bb = new THREE.Box3();
      for (const tile of tiles) bb.expandByObject(tile);
      // The card stands on the sheet's face, in front of whatever shape it holds.
      const box = FRAMES[chapter].box;
      return { position: new THREE.Vector3(0, 0, bb.max.z + 0.02), quaternion: camera.quaternion.clone(), size: { w: box[0], h: box[1] } };
    },
    pick(ndc, chapter) {
      if (chapter !== "made") return null;
      // Against the pose last drawn: on a phone the wall pans across the hold.
      scene.updateMatrixWorld();
      ray.setFromCamera(ndc, camera);
      const hit = ray.intersectObjects(tiles, false)[0];
      return hit ? (hit.object as Tile).userData.project : null;
    },
    resize(aspect) { camera.aspect = aspect; camera.updateProjectionMatrix(); },
    dispose() {
      scene.traverse((o) => {
        const m = o as THREE.Mesh;
        m.geometry?.dispose();
        const mats = Array.isArray(m.material) ? m.material : m.material ? [m.material] : [];
        for (const x of mats) { (x as THREE.MeshBasicMaterial).map?.dispose(); x.dispose(); }
      });
      for (const t of Object.values(tex)) t?.dispose();
      bg.dispose();
    },
  };
  return world;
};
