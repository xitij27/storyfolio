// One sheet: the person's CV is one sheet of paper, cut invisibly into six
// tiles, that bends into each chapter's picture. Every picture and every
// word on it is drawn from the person's data.
import {
  THREE, C, clamp, lerp, smooth, ease, makeScroll, buildUI, makeStage, fitDistance, fontsReady, canvas,
  texture, serif, sans, wrap, rrect, miniPicture, loadLand, dotLand, clickable, label, personFrom, contactButtons,
} from "./kit.js";
import { yearText } from "./people.js";

const COLS = 3, ROWS = 2, SEG = 22;
const W = 3, H = 4.24, R = 1.5;
const NOW = 2026.8;

// ---------- The shapes, each a function of the sheet's own (U, V) ----------
const page = (U, V) => [(U - 0.5) * W, (V - 0.5) * H, 0.1 * Math.sin(Math.PI * V)];

const globe = (U, V) => {
  const lon = (U - 0.5) * 2 * Math.PI, lat = (V - 0.5) * Math.PI;
  return [R * Math.cos(lat) * Math.sin(lon), R * Math.sin(lat), R * Math.cos(lat) * Math.cos(lon)];
};

const DW = 4.7, DH = 3.15, ROLL = 0.075, RR = 0.1;
const diploma = (U, V) => {
  const y = (V - 0.5) * DH, flat = DW * (1 - 2 * ROLL);
  const curl = (s, side) => {
    const th = s / RR, r = RR * (1 - 0.18 * th / Math.PI);
    return [side * (flat / 2 + r * Math.sin(th)), y, -(r - r * Math.cos(th))];
  };
  if (U < ROLL) return curl((ROLL - U) * DW, -1);
  if (U > 1 - ROLL) return curl((U - (1 - ROLL)) * DW, 1);
  return [-flat / 2 + (U - ROLL) * DW, y, 0];
};

const LR = 10, RH = 1.3;
const ribbon = (U, V) => [(U - 0.5) * LR, (V - 0.5) * RH, -0.45 * Math.sin((U - 0.5) * Math.PI * 1.6)];

const PW = 1.5, PH = 3.0, FOLD = 0.55;
const leaflet = (U, V) => {
  const s = clamp(U * 4, 0, 4), k = Math.min(3, Math.floor(s)), f = s - k;
  const dx = PW * Math.cos(FOLD), dz = PW * Math.sin(FOLD);
  const x0 = -2 * dx + k * dx, z0 = k % 2 ? -dz : 0;
  return [x0 + f * dx, (V - 0.5) * PH, (k % 2 ? z0 + f * dz : z0 - f * dz) + dz / 2];
};

const PLW = 1.8, PLH = 1.36, GAP = 0.22;
const wall = (U, V, c, r) => {
  const lu = U * COLS - c, lv = V * ROWS - r;
  const a = (1 - c) * 0.24, xl = (lu - 0.5) * PLW;
  return [(c - 1) * (PLW + GAP + 0.06) + xl * Math.cos(a), (r - 0.5) * (PLH + GAP) + (lv - 0.5) * PLH,
    -xl * Math.sin(a) + (c === 1 ? 0 : 0.22)];
};

const QW = 2.05, QH = 2.9;
const cards = (U, V, c) => {
  const lu = U * COLS - c, tilt = (c - 1) * -0.05, xl = (lu - 0.5) * QW, yl = (V - 0.5) * QH;
  return [(c - 1) * 2.35 + xl * Math.cos(tilt) - yl * Math.sin(tilt), xl * Math.sin(tilt) + yl * Math.cos(tilt),
    0.07 * Math.sin(Math.PI * lu) + (c === 1 ? 0.18 : 0)];
};

const SHAPES = [page, globe, diploma, ribbon, leaflet, wall, cards, page];
// How each chapter is framed: the box to fit, and how the sheet is turned.
const FRAMES = [
  { box: [3.6, 5.0], rot: [-0.08, 0.42, 0.05] },
  { box: [3.7, 3.7], rot: [0, 0, 0] },
  { box: [5.2, 3.8], rot: [-0.12, -0.22, 0.02] },
  { box: [6.2, 2.6], rot: [-0.18, 0, 0] },
  { box: [6.0, 3.6], rot: [-0.12, 0.28, 0] },
  { box: [7.4, 3.6], rot: [0, 0, 0] },
  { box: [7.8, 3.8], rot: [0, 0, 0] },
  { box: [3.6, 5.0], rot: [-0.04, -0.3, -0.03] },
];
// In which order the sheet moves into the next shape: 0 moves first.
const ORDER = [
  (U) => U,
  (U) => Math.abs(U - 0.5) * 2,
  (U) => Math.abs(U - 0.5) * 2,
  (U) => 1 - U,
  (U, V, c, r) => (c + (1 - r) * 3) / 5,
  (U, V, c, r) => 1 - r,
  (U) => 1 - Math.abs(U - 0.5) * 2,
];

// ---------- The pictures printed on the sheet ----------
function cvPage(P) {
  return canvas(1024, 1448, (ctx, w, h) => {
    ctx.fillStyle = C.paper; ctx.fillRect(0, 0, w, h);
    const m = 84;
    ctx.fillStyle = C.ink; ctx.font = serif(80); ctx.fillText(P.name, m, 170);
    ctx.fillStyle = C.amber; ctx.font = sans(30, 600); ctx.fillText(P.role.toUpperCase(), m, 225);
    ctx.fillStyle = C.ink; ctx.font = serif(32, 400, "italic"); wrap(ctx, P.line, m, 285, w - 2 * m, 42);
    ctx.fillStyle = C.line; ctx.fillRect(m, 345, w - 2 * m, 3);
    const sec = (y, head, rows) => {
      ctx.fillStyle = C.amber; ctx.font = sans(20, 600); ctx.fillText(head.toUpperCase(), m, y);
      ctx.fillStyle = C.ink; ctx.font = sans(24);
      let yy = y;
      for (const row of rows) { yy = wrap(ctx, row, m + 230, yy, w - 2 * m - 230, 32); yy += 4; }
      return Math.max(yy, y + 34) + 26;
    };
    let y = 410;
    y = sec(y, "Places", [P.places.map((p) => p.name).join("  >  ")]);
    y = sec(y, "Education", P.study.map((s) => `${s.degree}, ${s.field}. ${s.place}, ${s.from} to ${s.to}`));
    y = sec(y, "Experience", P.work.map((x) => `${x.role}, ${x.org}, ${x.place}. ${yearText(x)}`));
    y = sec(y, "Skills", P.skills.map((g) => `${g.group}: ${g.items.join(", ")}`));
    y = sec(y, "Projects", [P.projects.map((p) => p.title).join(", ")]);
    y = sec(y, "References", P.quotes.map((q) => `${q.who}, ${q.from}`));
    sec(y, "Contact", [P.contact.email]);
  });
}

function globeMap(land) {
  return canvas(2048, 1024, (ctx, w, h) => {
    ctx.fillStyle = C.paper; ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = "rgba(28,34,42,0.10)"; ctx.lineWidth = 2;
    for (let lng = -180; lng <= 180; lng += 15) { const x = ((lng + 180) / 360) * w; ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke(); }
    for (let lat = -75; lat <= 75; lat += 15) { const y = ((90 - lat) / 180) * h; ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }
    const project = (lng, lat) => [((lng + 180) / 360) * w, ((90 - lat) / 180) * h];
    const stretch = (y) => Math.min(5, 1 / Math.max(0.05, Math.cos(((90 - (y / h) * 180) * Math.PI) / 180)));
    dotLand(ctx, land, project, w, h, 7, 2.3, "rgba(28,34,42,0.78)", stretch);
  });
}

function diplomaPicture(P) {
  const s = P.study[0];
  return canvas(1500, 1000, (ctx, w, h) => {
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
    ctx.fillStyle = C.muted; ctx.font = sans(26); ctx.fillText(s.note, cx, 690);
    ctx.fillStyle = C.amber; ctx.beginPath(); ctx.arc(cx, 820, 62, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = C.paper; ctx.font = sans(24, 600); ctx.fillText(String(s.to), cx, 830);
  });
}

function timeline(P) {
  const s = P.study[0];
  const y0 = Math.min(s.from, ...P.work.map((x) => x.from)), y1 = Math.ceil(NOW);
  return canvas(4096, 532, (ctx, w, h) => {
    ctx.fillStyle = C.paper; ctx.fillRect(0, 0, w, h);
    const X = (yr) => 120 + ((yr - y0) / (y1 - y0)) * (w - 240), axis = 400;
    ctx.fillStyle = C.ink; ctx.fillRect(100, axis, w - 200, 4);
    ctx.font = sans(30, 600); ctx.textAlign = "center";
    for (let yr = y0; yr <= y1; yr++) { ctx.fillRect(X(yr) - 2, axis - 10, 4, 24); ctx.fillText(String(yr), X(yr), axis + 60); }
    ctx.textAlign = "left";
    const bar = (a, b, row, color, head, sub) => {
      const y = 120 + row * 110;
      ctx.fillStyle = color; rrect(ctx, X(a), y + 52, Math.max(30, X(b) - X(a)), 26, 13); ctx.fill();
      ctx.fillStyle = C.ink; ctx.font = serif(40); ctx.fillText(head, X(a), y + 30);
      ctx.fillStyle = C.muted; ctx.font = sans(26); ctx.fillText(sub, X(a), y + 112);
      ctx.strokeStyle = color; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(X(a), y + 78); ctx.lineTo(X(a), axis); ctx.stroke();
    };
    bar(s.from, s.to, 0, "rgba(63,167,150,0.55)", `Studied in ${s.place}`, `${s.field}`);
    P.work.forEach((x, i) => bar(x.from, x.to ?? NOW, (i + 1) % 2, i === P.work.length - 1 ? C.amber : C.ink, x.org, `${x.role}, ${x.place}. ${yearText(x)}`));
  });
}

function leafletPicture(P) {
  return canvas(2048, 1024, (ctx, w, h) => {
    const pw = w / 4;
    P.skills.slice(0, 4).forEach((g, i) => {
      const x = i * pw;
      ctx.fillStyle = i % 2 ? C.paperDark : C.paper; ctx.fillRect(x, 0, pw, h);
      ctx.fillStyle = C.amber; ctx.font = sans(26, 600); ctx.fillText(String(i + 1).padStart(2, "0"), x + 48, 110);
      ctx.fillStyle = C.ink; ctx.font = serif(54); wrap(ctx, g.group, x + 48, 190, pw - 90, 60);
      ctx.font = sans(38);
      g.items.forEach((it, j) => {
        const y = 360 + j * 112;
        ctx.fillStyle = C.ink; rrect(ctx, x + 44, y - 50, pw - 88, 76, 38); ctx.lineWidth = 3; ctx.strokeStyle = C.ink; ctx.stroke();
        ctx.fillText(it, x + 74, y);
      });
    });
  });
}

function wallPicture(P) {
  return canvas(2048, 1024, (ctx, w, h) => {
    const cw = w / 3, ch = h / 2;
    P.projects.slice(0, 6).forEach((p, i) => {
      const x = (i % 3) * cw, y = Math.floor(i / 3) * ch;
      ctx.fillStyle = C.paper; ctx.fillRect(x, y, cw, ch);
      miniPicture(ctx, p.kind, x + 28, y + 28, cw - 56, ch * 0.5, i + 3);
      ctx.fillStyle = C.ink; ctx.font = serif(40); ctx.fillText(p.title, x + 30, y + ch * 0.5 + 92);
      ctx.fillStyle = C.muted; ctx.font = sans(24); wrap(ctx, p.line, x + 30, y + ch * 0.5 + 134, cw - 60, 30, 2);
      ctx.fillStyle = C.amber; ctx.font = sans(22, 600); ctx.fillText(`${p.place.toUpperCase()}  ${p.year}`, x + 30, y + ch - 30);
    });
  });
}

function quotePicture(P) {
  return canvas(2048, 1448, (ctx, w, h) => {
    const cw = w / 3;
    P.quotes.slice(0, 3).forEach((q, i) => {
      const x = i * cw;
      ctx.fillStyle = C.paper; ctx.fillRect(x, 0, cw, h);
      ctx.fillStyle = C.amber; ctx.font = serif(220); ctx.fillText("“", x + 40, 250);
      ctx.fillStyle = C.ink; ctx.font = serif(46, 400, "italic");
      const y = wrap(ctx, q.text, x + 56, 330, cw - 112, 62);
      ctx.fillStyle = C.ink; ctx.font = sans(32, 600); ctx.fillText(q.who, x + 56, Math.max(y + 60, h - 220));
      ctx.fillStyle = C.muted; ctx.font = sans(26); wrap(ctx, q.from, x + 56, Math.max(y + 104, h - 176), cw - 112, 32);
    });
  });
}

function contactPage(P) {
  return canvas(1024, 1448, (ctx, w, h) => {
    ctx.fillStyle = C.paper; ctx.fillRect(0, 0, w, h);
    const m = 84;
    ctx.fillStyle = C.amber; ctx.font = sans(26, 600); ctx.fillText("GET IN TOUCH", m, 200);
    ctx.fillStyle = C.ink; ctx.font = serif(86); wrap(ctx, `Write to ${P.first}`, m, 310, w - 2 * m, 96);
    ctx.font = serif(46, 400); ctx.fillText(P.contact.email, m, 470);
    ctx.fillStyle = C.muted; ctx.font = sans(30); wrap(ctx, `${P.seeking}.`, m, 540, w - 2 * m, 40);
    ctx.fillStyle = C.line; ctx.fillRect(m, 620, w - 2 * m, 3);
    ctx.fillStyle = C.ink; ctx.font = sans(34, 600);
    P.contact.links.forEach((l, i) => ctx.fillText(`${l}  →`, m, 710 + i * 70));
    ctx.fillStyle = C.muted; ctx.font = serif(30, 400, "italic");
    wrap(ctx, `This sheet is ${P.first}'s CV. It folded into every picture above, and it is yours to download.`, m, h - 200, w - 2 * m, 42);
  });
}

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

function tileGeometry(c, r) {
  const n = (SEG + 1) * (SEG + 1);
  const pos = new Float32Array(n * 3), uv = new Float32Array(n * 2), prog = new Float32Array(n);
  const idx = [];
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

export async function start({ personKey }) {
  const P = personFrom(personKey);
  await fontsReady();
  const land = await loadLand();
  const stage = makeStage({ fov: 32 });
  const { scene, camera, renderer } = stage;
  const ui = buildUI({ title: "One sheet", how: "The CV bends into each chapter's picture", personKey, example: "sheet" });
  const scroll = makeScroll();
  ui.bindScroll(scroll);
  const cta = contactButtons(P);

  const pics = [cvPage(P), globeMap(land), diplomaPicture(P), timeline(P), leafletPicture(P), wallPicture(P), quotePicture(P), contactPage(P)];
  const tex = pics.map((p) => texture(p, renderer));
  const mat = new THREE.ShaderMaterial({
    vertexShader: VERT, fragmentShader: FRAG, side: THREE.DoubleSide,
    uniforms: { A: { value: tex[0] }, B: { value: tex[0] }, back: { value: new THREE.Color(C.paperDark) } },
  });

  const sheet = new THREE.Group();
  scene.add(sheet);
  const tiles = [];
  for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) {
    const geo = tileGeometry(c, r);
    const uv = geo.attributes.uv.array;
    const n = uv.length / 2;
    // Every shape, worked out once per tile.
    const shapes = SHAPES.map((f) => {
      const a = new Float32Array(n * 3);
      for (let k = 0; k < n; k++) a.set(f(uv[k * 2], uv[k * 2 + 1], c, r), k * 3);
      return a;
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.userData = { c, r, shapes, project: P.projects[(ROWS - 1 - r) * COLS + c] };
    sheet.add(mesh);
    tiles.push(mesh);
  }

  // The places on the globe: a route, a dot and a name for each.
  const deco = new THREE.Group();
  sheet.add(deco);
  const toV = (lat, lng, rad) => {
    const la = (lat * Math.PI) / 180, lo = (lng * Math.PI) / 180;
    return new THREE.Vector3(rad * Math.cos(la) * Math.sin(lo), rad * Math.sin(la), rad * Math.cos(la) * Math.cos(lo));
  };
  const routePts = [];
  for (let i = 0; i < P.places.length - 1; i++) {
    const a = toV(P.places[i].lat, P.places[i].lng, 1), b = toV(P.places[i + 1].lat, P.places[i + 1].lng, 1);
    const ang = a.angleTo(b);
    for (let s = 0; s <= 40; s++) {
      const t = s / 40;
      const v = ang < 1e-6 ? a.clone() : a.clone().multiplyScalar(Math.sin((1 - t) * ang) / Math.sin(ang)).add(b.clone().multiplyScalar(Math.sin(t * ang) / Math.sin(ang)));
      routePts.push(v.normalize().multiplyScalar(R * (1.006 + 0.12 * ang * Math.sin(Math.PI * t))));
    }
  }
  const routeGeo = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(routePts), routePts.length * 2, 0.008, 6, false);
  const routeMat = new THREE.MeshBasicMaterial({ color: C.amber, transparent: true });
  const route = new THREE.Mesh(routeGeo, routeMat);
  deco.add(route);
  const marks = P.places.map((p) => {
    const dot = new THREE.Mesh(new THREE.SphereGeometry(0.022, 16, 12), new THREE.MeshBasicMaterial({ color: C.rose, transparent: true }));
    dot.position.copy(toV(p.lat, p.lng, R * 1.004));
    const tag = label(`${p.name}  ${p.what}`, { size: 38, color: "#fff", bg: "rgba(28,34,42,0.86)", height: 0.11 });
    tag.position.copy(toV(p.lat, p.lng, R * 1.004)).add(new THREE.Vector3(0, 0.07, 0));
    tag.center.set(-0.06, 0);
    deco.add(dot, tag);
    return { dot, tag, base: tag.scale.clone(), p };
  });

  // Where the globe looks, and how near, at each place.
  const views = P.places.map((p, i) => {
    const near = (j) => (j >= 0 && j < P.places.length ? toV(P.places[j].lat, P.places[j].lng, 1).angleTo(toV(p.lat, p.lng, 1)) : 0);
    const far = Math.max(near(i - 1), near(i + 1));
    return { lat: p.lat, lng: p.lng, zoom: clamp(0.4 / Math.max(far, 0.01), 1, 1.7) };
  });
  const viewAt = (local) => {
    // First settle on the first place at the whole globe, then go place to place.
    const intro = smooth(0, 0.18, local);
    const s = clamp((local - 0.18) / 0.77) * (views.length - 1);
    const i = Math.min(views.length - 2, Math.floor(s)), f = ease(clamp(s - i));
    const a = views[i], b = views[i + 1];
    let dl = b.lng - a.lng; if (dl > 180) dl -= 360; if (dl < -180) dl += 360;
    const zoom = lerp(1, lerp(a.zoom, b.zoom, f) * (1 - 0.35 * Math.sin(Math.PI * f) * (Math.abs(dl) > 30 ? 1 : 0)), intro);
    return { lat: lerp(a.lat, b.lat, f), lng: a.lng + dl * f, zoom, routeShown: (i + f) / (views.length - 1) };
  };
  const poseOf = (k, local) => {
    if (k === 1) { const v = viewAt(local); return { rot: [(v.lat * Math.PI) / 180 * 0.85, (-v.lng * Math.PI) / 180, 0], scale: v.zoom, route: v.routeShown }; }
    return { rot: FRAMES[k].rot, scale: 1, route: k > 1 ? 1 : 0 };
  };

  clickable(stage, () => tiles, P, () => current.from === 5 && current.to === 5);

  let current = { from: -1, to: -1, t: -1 };
  const clock = new THREE.Clock();
  const tmp = new THREE.Vector3(), camDir = new THREE.Vector3();

  function frame() {
    const st = scroll.step();
    ui.update(st);
    const time = clock.getElapsedTime();
    const changed = st.from !== current.from || st.to !== current.to || Math.abs(st.t - current.t) > 1e-5;
    current = st;

    if (changed) {
      mat.uniforms.A.value = tex[st.from];
      mat.uniforms.B.value = tex[st.to];
      const order = ORDER[st.from];
      for (const m of tiles) {
        const { c, r, shapes } = m.userData;
        const a = shapes[st.from], b = shapes[st.to];
        const pos = m.geometry.attributes.position.array, prog = m.geometry.attributes.prog.array, uv = m.geometry.attributes.uv.array;
        for (let k = 0; k < prog.length; k++) {
          let p = 0;
          if (st.to !== st.from) p = ease(clamp(st.raw * 1.7 - 0.7 * order(uv[k * 2], uv[k * 2 + 1], c, r)));
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
      }
    }

    // Turn and frame the sheet.
    const pa = poseOf(st.from, st.from === st.to ? st.local : 1), pb = poseOf(st.to, 0);
    const t = st.t;
    sheet.rotation.set(lerp(pa.rot[0], pb.rot[0], t), lerp(pa.rot[1], pb.rot[1], t), lerp(pa.rot[2], pb.rot[2], t));
    const scale = lerp(pa.scale, pb.scale, t);
    sheet.scale.setScalar(scale);
    sheet.position.y = st.from === 0 && st.to === 0 ? 0.04 * Math.sin(time * 0.8) : 0;
    const box = FRAMES[st.from].box, box2 = FRAMES[st.to].box;
    const d = lerp(fitDistance(camera, box[0], box[1]), fitDistance(camera, box2[0], box2[1]), t);
    camera.position.set(0, 0, d);
    camera.lookAt(0, 0, 0);
    // The timeline is long: travel along it.
    const vw = 2 * d * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.aspect;
    const pan = Math.max(0, (LR - vw) / 2 + 0.4);
    const panAt = (k, local) => (k === 3 ? lerp(pan, -pan, local) : 0);
    sheet.position.x = lerp(panAt(st.from, st.from === st.to ? st.local : 1), panAt(st.to, 0), t);

    // The places show only while the sheet is a globe.
    const g = st.from === 1 && st.to === 1 ? 1 : st.to === 1 ? smooth(0.8, 1, st.raw) : st.from === 1 ? 1 - smooth(0, 0.15, st.raw) : 0;
    deco.visible = g > 0.01;
    if (deco.visible) {
      const shown = st.from === 1 && st.to === 1 ? viewAt(st.local).routeShown : st.to === 1 ? 0 : 1;
      const count = routeGeo.index.count;
      routeGeo.setDrawRange(0, Math.floor((count / 6) * shown) * 6);
      routeMat.opacity = g;
      camera.getWorldDirection(camDir);
      marks.forEach(({ dot, tag, base, p }, i) => {
        dot.getWorldPosition(tmp);
        const facing = -tmp.clone().sub(sheet.position).normalize().dot(camDir);
        const reached = shown * (P.places.length - 1) >= i - 0.15 ? 1 : 0;
        const o = g * smooth(0.15, 0.35, facing) * reached;
        dot.material.opacity = o; tag.material.opacity = o;
        tag.scale.copy(base).multiplyScalar(1 / scale);
      });
    }

    cta.update(st.from === 7 ? 1 : st.to === 7 ? smooth(0.7, 1, st.raw) : 0);
    renderer.render(scene, camera);
    requestAnimationFrame(frame);
  }
  frame();
}
