// Pop-up book: each chapter is a spread, words on the left and a picture
// standing up on the right. Turning a page folds one picture flat and raises
// the next. Every word and picture comes from the person's data.
import {
  THREE, C, clamp, lerp, smooth, ease, makeScroll, buildUI, makeStage, fitDistance, fontsReady, canvas,
  texture, serif, sans, wrap, rrect, miniPicture, loadLand, dotLand, clickable, personFrom, contactButtons, CHAPTERS,
} from "./kit.js";
import { yearText } from "./people.js";

const PW = 3, PD = 4, SEG = 30, EPS = 0.006, CURL = 1.1, NOW = 2026.8;
const N = CHAPTERS.length;

// ---------- Pages ----------
const PX = 1024, PY = Math.round((1024 * PD) / PW);

function leftPage(P, k) {
  const s = P.study[0];
  const bodies = [
    [P.name, P.role, P.line, P.seeking + "."],
    P.places.map((p) => `${p.name}, where ${P.first} ${p.what === "lives now" ? "lives now" : p.what}.`),
    [`${s.degree} in ${s.field}.`, `${s.place}, ${s.from} to ${s.to}.`, s.note + "."],
    P.work.map((w) => `${w.org}, ${w.place}, ${yearText(w)}. ${w.role}: ${w.did.toLowerCase()}.`),
    P.skills.map((g) => `${g.group}: ${g.items.join(", ")}.`),
    [`${P.projects.length} projects. Open any card on the right to read about it.`, ...P.projects.map((p) => p.title)],
    P.quotes.map((q) => `${q.who}, ${q.from}.`),
    [P.contact.email, P.seeking + ".", P.contact.links.join(", ") + "."],
  ];
  return canvas(PX, PY, (ctx, w, h) => {
    ctx.fillStyle = C.paper; ctx.fillRect(0, 0, w, h);
    const g = ctx.createLinearGradient(w - 90, 0, w, 0);
    g.addColorStop(0, "rgba(0,0,0,0)"); g.addColorStop(1, "rgba(0,0,0,0.12)");
    ctx.fillStyle = g; ctx.fillRect(w - 90, 0, 90, h);
    const m = 96;
    ctx.fillStyle = C.amber; ctx.font = sans(30, 600); ctx.fillText(`CHAPTER ${k + 1}`, m, 190);
    ctx.fillStyle = C.ink; ctx.font = serif(92); let y = wrap(ctx, CHAPTERS[k].title, m, 310, w - 2 * m, 100);
    ctx.fillStyle = C.line; ctx.fillRect(m, y + 10, 120, 5);
    y += 110;
    bodies[k].forEach((line, i) => {
      ctx.fillStyle = i === 0 && k === 0 ? C.ink : "#3a424c";
      ctx.font = i === 0 && k === 0 ? serif(56) : sans(38);
      y = wrap(ctx, line, m, y, w - 2 * m, i === 0 && k === 0 ? 64 : 54) + 26;
    });
    ctx.fillStyle = C.muted; ctx.font = sans(28); ctx.textAlign = "center"; ctx.fillText(String(k * 2 + 1), w / 2, h - 80);
  });
}

function rightPage(P, k, land) {
  return canvas(PX, PY, (ctx, w, h) => {
    ctx.fillStyle = C.paper; ctx.fillRect(0, 0, w, h);
    const g = ctx.createLinearGradient(0, 0, 90, 0);
    g.addColorStop(0, "rgba(0,0,0,0.12)"); g.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = g; ctx.fillRect(0, 0, 90, h);
    if (k === 1) {
      const { project } = placeMap(P);
      const pj = (lng, lat) => { const [s, z] = project(lat, lng); return [(s / PW) * w, ((z + PD / 2) / PD) * h]; };
      ctx.save(); ctx.beginPath(); rrect(ctx, 60, 120, w - 120, h - 240, 30); ctx.clip();
      ctx.fillStyle = "#e7e0d1"; ctx.fillRect(0, 0, w, h);
      dotLand(ctx, land, pj, w, h, 13, 4, "rgba(28,34,42,0.55)");
      ctx.strokeStyle = C.amber; ctx.lineWidth = 8; ctx.setLineDash([22, 16]); ctx.beginPath();
      P.places.forEach((p, i) => { const [x, y] = pj(p.lng, p.lat); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); });
      ctx.stroke(); ctx.restore();
    } else if (k === 3) {
      ctx.fillStyle = C.line; ctx.fillRect(80, h * 0.86, w - 160, 6);
    } else if (k !== 7) {
      ctx.strokeStyle = "rgba(201,193,176,0.6)"; ctx.lineWidth = 3;
      for (let y = 200; y < h - 150; y += 120) { ctx.beginPath(); ctx.moveTo(120, y); ctx.lineTo(w - 120, y); ctx.stroke(); }
    }
    ctx.fillStyle = C.muted; ctx.font = sans(28); ctx.textAlign = "center"; ctx.fillText(String(k * 2 + 2), w / 2, h - 80);
  });
}

/** Where each place falls on the right page: s from the spine, z down the page. */
function placeMap(P) {
  const lats = P.places.map((p) => p.lat), lngs = P.places.map((p) => p.lng);
  const lat0 = (Math.min(...lats) + Math.max(...lats)) / 2, lng0 = (Math.min(...lngs) + Math.max(...lngs)) / 2;
  const cosL = Math.cos((lat0 * Math.PI) / 180);
  const sx = (Math.max(...lngs) - Math.min(...lngs)) * cosL || 1, sz = Math.max(...lats) - Math.min(...lats) || 1;
  const k = Math.min(1.9 / sx, 2.4 / sz);
  return { project: (lat, lng) => [PW / 2 + (lng - lng0) * cosL * k, -(lat - lat0) * k + 0.2] };
}

// ---------- Pop-ups: cut-outs on transparent canvases ----------
const cut = (w, h, draw) => canvas(w, h, draw);

function popups(P) {
  const s0 = P.study[0];
  const list = [];
  const add = (chapter, pic, w, h, s, z, extra = {}) => list.push({ chapter, pic, w, h, s, z, ...extra });

  // 0. The person and their name.
  add(0, cut(600, 800, (ctx, w, h) => {
    ctx.fillStyle = C.amber; ctx.beginPath(); ctx.moveTo(40, h); ctx.lineTo(40, 300); ctx.arc(w / 2, 300, w / 2 - 40, Math.PI, 0); ctx.lineTo(w - 40, h); ctx.fill();
    ctx.fillStyle = C.ink; ctx.beginPath(); ctx.arc(w / 2, 330, 110, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.moveTo(110, h); ctx.quadraticCurveTo(110, 470, w / 2, 470); ctx.quadraticCurveTo(w - 110, 470, w - 110, h); ctx.fill();
  }), 1.35, 1.8, 1.5, -0.55);
  add(0, cut(1100, 320, (ctx, w, h) => {
    ctx.fillStyle = C.paper; rrect(ctx, 0, 0, w, h, 24); ctx.fill();
    ctx.strokeStyle = C.ink; ctx.lineWidth = 6; rrect(ctx, 14, 14, w - 28, h - 28, 18); ctx.stroke();
    ctx.fillStyle = C.ink; ctx.font = serif(96); ctx.textAlign = "center"; ctx.fillText(P.name, w / 2, 150);
    ctx.fillStyle = C.amber; ctx.font = sans(40, 600); ctx.fillText(P.role.toUpperCase(), w / 2, 240);
  }), 2.3, 0.67, 1.5, 0.95);

  // 1. A flag at each place.
  const { project } = placeMap(P);
  P.places.forEach((p, i) => {
    const [s, z] = project(p.lat, p.lng);
    add(1, cut(520, 640, (ctx) => {
      ctx.fillStyle = C.ink; ctx.fillRect(10, 20, 14, 620);
      ctx.fillStyle = i === P.places.length - 1 ? C.amber : C.rose; ctx.beginPath(); ctx.moveTo(24, 20); ctx.lineTo(500, 20); ctx.lineTo(450, 150); ctx.lineTo(500, 280); ctx.lineTo(24, 280); ctx.fill();
      ctx.fillStyle = "#fff"; ctx.font = serif(76); ctx.fillText(p.name, 50, 130);
      ctx.font = sans(44, 600); ctx.fillText(p.what, 50, 220);
    }), 0.62, 0.76, s + 0.31 - 0.012, z, { delay: i * 0.08 });
  });

  // 2. The school and the diploma.
  add(2, cut(1000, 760, (ctx, w, h) => {
    ctx.fillStyle = C.paperDark; ctx.beginPath(); ctx.moveTo(60, 250); ctx.lineTo(w / 2, 40); ctx.lineTo(w - 60, 250); ctx.fill();
    ctx.fillStyle = C.paper; ctx.fillRect(60, 250, w - 120, 50); ctx.fillRect(30, h - 70, w - 60, 70);
    ctx.fillStyle = "#d9d1c1"; for (let i = 0; i < 6; i++) ctx.fillRect(110 + i * 150, 300, 60, h - 370);
    ctx.fillStyle = C.ink; ctx.font = serif(52); ctx.textAlign = "center"; ctx.fillText(s0.place.toUpperCase(), w / 2, 200);
    ctx.strokeStyle = C.ink; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(60, 250); ctx.lineTo(w / 2, 40); ctx.lineTo(w - 60, 250); ctx.closePath(); ctx.stroke();
  }), 2.4, 1.8, 1.5, -0.75);
  add(2, cut(900, 620, (ctx, w, h) => {
    ctx.fillStyle = "#fbf8f1"; ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = C.amber; ctx.lineWidth = 8; ctx.strokeRect(20, 20, w - 40, h - 40);
    ctx.textAlign = "center"; ctx.fillStyle = C.ink;
    ctx.font = serif(50); ctx.fillText(P.name, w / 2, 150);
    ctx.font = serif(64); ctx.fillText(s0.degree, w / 2, 280);
    ctx.font = serif(44, 400); ctx.fillText(`in ${s0.field}`, w / 2, 350);
    ctx.fillStyle = C.muted; ctx.font = sans(34, 600); ctx.fillText(`${s0.from} TO ${s0.to}`, w / 2, 450);
    ctx.fillStyle = C.amber; ctx.beginPath(); ctx.arc(w / 2, 530, 36, 0, Math.PI * 2); ctx.fill();
  }), 1.5, 1.03, 1.5, 1.0);

  // 3. A building for each job, as tall as the years, in time order.
  const jobs = [...P.work].sort((a, b) => a.from - b.from);
  jobs.forEach((w, i) => {
    const years = (w.to ?? NOW) - w.from, hgt = 0.75 + years * 0.33, wid = 0.82;
    const px = Math.round((600 * hgt) / wid);
    add(3, cut(600, px, (ctx, cw, ch) => {
      ctx.fillStyle = i === jobs.length - 1 ? "#f3dfb6" : C.paperDark; ctx.fillRect(0, 0, cw, ch);
      ctx.strokeStyle = C.ink; ctx.lineWidth = 8; ctx.strokeRect(4, 4, cw - 8, ch - 8);
      ctx.fillStyle = "rgba(28,34,42,0.18)";
      for (let y = 330; y < ch - 120; y += 110) for (let x = 60; x < cw - 60; x += 130) ctx.fillRect(x, y, 70, 60);
      ctx.fillStyle = C.ink; ctx.font = serif(66); wrap(ctx, w.org, 40, 100, cw - 80, 70, 2);
      ctx.fillStyle = C.amber; ctx.font = sans(46, 600); ctx.fillText(yearText(w), 40, 270);
    }), wid, hgt, 0.55 + (i * 1.9) / Math.max(1, jobs.length - 1), i % 2 ? 0.35 : -0.55, { delay: i * 0.1 });
  });

  // 4. Tabbed cards, one per group of skills.
  P.skills.slice(0, 4).forEach((g, i) => {
    add(4, cut(800, 680, (ctx, w, h) => {
      ctx.fillStyle = [C.paper, "#f3dfb6", "#dcebe6", "#efd9d3"][i];
      ctx.beginPath(); ctx.moveTo(0, 110); ctx.lineTo(60 + i * 150, 110); ctx.lineTo(80 + i * 150, 0); ctx.lineTo(330 + i * 150, 0); ctx.lineTo(350 + i * 150, 110); ctx.lineTo(w, 110); ctx.lineTo(w, h); ctx.lineTo(0, h); ctx.fill();
      ctx.fillStyle = C.ink; ctx.font = sans(40, 600); ctx.fillText(g.group, 100 + i * 150, 75);
      ctx.font = sans(52); g.items.forEach((it, j) => ctx.fillText(`• ${it}`, 50, 220 + j * 100));
    }), 1.3, 1.1, i % 2 ? 2.2 : 0.8, i < 2 ? -0.75 : 0.75, { delay: i * 0.08 });
  });

  // 5. A card for each project, to open.
  P.projects.slice(0, 6).forEach((p, i) => {
    add(5, cut(700, 600, (ctx, w, h) => {
      ctx.fillStyle = C.paper; rrect(ctx, 0, 0, w, h, 20); ctx.fill();
      ctx.strokeStyle = C.line; ctx.lineWidth = 4; rrect(ctx, 2, 2, w - 4, h - 4, 20); ctx.stroke();
      miniPicture(ctx, p.kind, 24, 24, w - 48, 330, i + 3);
      ctx.fillStyle = C.ink; ctx.font = serif(52); wrap(ctx, p.title, 30, 430, w - 60, 56, 2);
      ctx.fillStyle = C.amber; ctx.font = sans(30, 600); ctx.fillText(`${p.place.toUpperCase()}  ${p.year}`, 30, h - 30);
    }), 0.88, 0.75, 0.55 + (i % 3) * 0.95, i < 3 ? -0.7 : 0.75, { delay: (i % 3) * 0.06, project: p });
  });

  // 6. Speech bubbles.
  P.quotes.slice(0, 3).forEach((q, i) => {
    add(6, cut(1500, 520, (ctx, w, h) => {
      ctx.fillStyle = [C.paper, "#f3dfb6", "#dcebe6"][i]; rrect(ctx, 0, 0, w, h - 70, 40); ctx.fill();
      ctx.beginPath(); ctx.moveTo(140 + i * 300, h - 75); ctx.lineTo(110 + i * 300, h); ctx.lineTo(260 + i * 300, h - 75); ctx.fill();
      ctx.fillStyle = C.ink; ctx.font = serif(44, 400, "italic");
      const y = wrap(ctx, `“${q.text}”`, 50, 80, w - 100, 56, 4);
      ctx.font = sans(34, 600); ctx.fillText(`${q.who}, ${q.from}`, 50, Math.min(y + 20, h - 100));
    }), 2.6, 0.9, 1.5, -1.3 + i * 1.05, { delay: i * 0.1 });
  });

  // 7. An envelope, and the letter out of it.
  add(7, cut(1000, 760, (ctx, w, h) => {
    ctx.fillStyle = "#fbf8f1"; ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = C.line; ctx.lineWidth = 6; ctx.strokeRect(3, 3, w - 6, h - 6);
    ctx.fillStyle = C.amber; ctx.font = sans(36, 600); ctx.fillText("GET IN TOUCH", 60, 110);
    ctx.fillStyle = C.ink; ctx.font = serif(84); ctx.fillText(`Write to ${P.first}`, 60, 230);
    ctx.font = serif(52, 400); ctx.fillText(P.contact.email, 60, 330);
    ctx.fillStyle = C.muted; ctx.font = sans(34); wrap(ctx, `${P.seeking}.`, 60, 420, w - 120, 44);
  }), 2.0, 1.52, 1.5, -0.45);
  add(7, cut(1000, 560, (ctx, w, h) => {
    ctx.fillStyle = "#e9c48a"; ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "#deb371"; ctx.beginPath(); ctx.moveTo(0, h); ctx.lineTo(w / 2, h * 0.38); ctx.lineTo(w, h); ctx.fill();
    ctx.strokeStyle = "rgba(0,0,0,0.12)"; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(w / 2, h * 0.55); ctx.lineTo(w, 0); ctx.stroke();
    ctx.fillStyle = C.ink; ctx.font = sans(40, 600); ctx.textAlign = "center"; ctx.fillText(P.contact.links.join("   "), w / 2, h - 50);
  }), 2.3, 1.29, 1.5, 0.75);
  return list;
}

// ---------- The page sheet ----------
const VERT = `
varying vec2 vUv; varying vec3 vN;
void main() { vUv = uv; vN = normalize(normalMatrix * normal); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`;
const FRAG = `
uniform sampler2D F; uniform sampler2D B;
varying vec2 vUv; varying vec3 vN;
void main() {
  vec3 n = normalize(vN); if (!gl_FrontFacing) n = -n;
  float light = 0.6 + 0.45 * max(dot(n, normalize(vec3(-0.3, 0.8, 0.5))), 0.0);
  vec3 col = gl_FrontFacing ? texture2D(F, vUv).rgb : texture2D(B, vec2(1.0 - vUv.x, vUv.y)).rgb;
  gl_FragColor = vec4(col * light, 1.0);
  #include <colorspace_fragment>
}`;

function sheetGeometry() {
  const n = (SEG + 1) * 2;
  const g = new THREE.BufferGeometry();
  const uv = new Float32Array(n * 2), idx = [];
  for (let i = 0; i <= SEG; i++) for (let j = 0; j <= 1; j++) {
    const k = i * 2 + j; uv[k * 2] = i / SEG; uv[k * 2 + 1] = 1 - j;
  }
  for (let i = 0; i < SEG; i++) { const a = i * 2; idx.push(a, a + 1, a + 2, a + 1, a + 3, a + 2); }
  g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(n * 3), 3));
  g.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
  g.setIndex(idx);
  return g;
}

/** A page turned by angle a about the spine: the point s from the spine, its tangent and normal. */
function curve(a, s, lift) {
  const b = (-CURL * Math.sin(a)) / PW;
  const phi = a + b * s;
  const x = Math.abs(b) < 1e-6 ? s * Math.cos(a) : (Math.sin(phi) - Math.sin(a)) / b;
  const y = Math.abs(b) < 1e-6 ? s * Math.sin(a) : (Math.cos(a) - Math.cos(phi)) / b;
  return { p: new THREE.Vector3(x, y + lift, 0), t: new THREE.Vector3(Math.cos(phi), Math.sin(phi), 0), n: new THREE.Vector3(-Math.sin(phi), Math.cos(phi), 0) };
}

export async function start({ personKey }) {
  const P = personFrom(personKey);
  await fontsReady();
  const land = await loadLand();
  const stage = makeStage({ fov: 28 });
  document.body.classList.add("book");
  const { scene, camera, renderer } = stage;
  const ui = buildUI({ title: "Pop-up book", how: "Turning the page folds one picture flat and raises the next", personKey, example: "book" });
  const scroll = makeScroll();
  ui.bindScroll(scroll);
  const cta = contactButtons(P);
  const tex = (el) => texture(el, renderer);

  // Covers under the pages.
  const board = (x) => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(PW + 0.12, 0.06, PD + 0.2), new THREE.MeshStandardMaterial({ color: "#2b3a4a", roughness: 0.8 }));
    m.position.set(x, -0.035, 0);
    scene.add(m);
  };
  board(-PW / 2 - 0.04); board(PW / 2 + 0.04);
  scene.add(new THREE.AmbientLight(0xffffff, 1.4));
  const sun = new THREE.DirectionalLight(0xffffff, 1.6); sun.position.set(-2, 6, 4); scene.add(sun);

  // The inside of the front cover carries the first chapter's words.
  const inside = new THREE.Mesh(new THREE.PlaneGeometry(PW, PD), new THREE.MeshBasicMaterial({ map: tex(leftPage(P, 0)) }));
  inside.rotation.x = -Math.PI / 2; inside.position.set(-PW / 2, 0.001, 0);
  scene.add(inside);

  // One sheet per chapter: its front is that chapter's right page, its back the next chapter's left page.
  const blank = canvas(PX, PY, (ctx, w, h) => { ctx.fillStyle = C.paper; ctx.fillRect(0, 0, w, h); });
  const sheets = [];
  for (let k = 0; k < N; k++) {
    const mat = new THREE.ShaderMaterial({ vertexShader: VERT, fragmentShader: FRAG, side: THREE.DoubleSide,
      uniforms: { F: { value: tex(rightPage(P, k, land)) }, B: { value: tex(k < N - 1 ? leftPage(P, k + 1) : blank) } } });
    const geo = sheetGeometry();
    const mesh = new THREE.Mesh(geo, mat);
    scene.add(mesh);
    sheets.push({ mesh, geo, angle: -1 });
  }

  // Pop-ups, each a cut-out hinged to its chapter's page.
  const pops = popups(P).map((it) => {
    const g = new THREE.PlaneGeometry(it.w, it.h);
    g.translate(0, it.h / 2, 0);
    const m = new THREE.Mesh(g, new THREE.MeshBasicMaterial({ map: tex(it.pic), transparent: true, alphaTest: 0.4, side: THREE.DoubleSide }));
    m.matrixAutoUpdate = false;
    if (it.project) m.userData.project = it.project;
    scene.add(m);
    return { ...it, m };
  });

  let current = { from: 0, to: 0 };
  clickable(stage, () => pops.filter((p) => p.chapter === 5).map((p) => p.m), P, () => current.from === 5 && current.to === 5);

  const angleOf = (k, st) => (k < st.from ? Math.PI : k === st.from && st.to !== st.from ? Math.PI * st.t : 0);
  const liftOf = (k, a) => lerp((N - k) * EPS, (k + 1) * EPS, a / Math.PI);
  // How far a chapter's pop-ups stand: up when its spread is open.
  const raiseOf = (k, st) => {
    if (st.from === st.to) return k === st.from ? 1 : 0;
    if (k === st.from) return 1 - smooth(0.02, 0.45, st.raw);
    if (k === st.to) return smooth(0.5, 0.95, st.raw);
    return 0;
  };

  const basis = new THREE.Matrix4(), up = new THREE.Vector3(), face = new THREE.Vector3();
  const Z = new THREE.Vector3(0, 0, 1);

  function frame() {
    const st = scroll.step();
    current = st;
    ui.update(st);

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
      sh.geo.computeBoundingSphere();
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

    // Look at the open book; on a phone, at the right-hand page.
    const narrow = stage.narrow;
    const target = new THREE.Vector3(narrow ? PW / 2 : 0, 0.55, 0.1);
    const d = fitDistance(camera, narrow ? PW + 0.5 : 2 * PW + 1.6, PD + 1.9);
    const pitch = 0.82;
    camera.position.set(target.x, target.y + Math.sin(pitch) * d, target.z + Math.cos(pitch) * d);
    camera.lookAt(target);

    cta.update(st.from === 7 ? 1 : st.to === 7 ? smooth(0.7, 1, st.raw) : 0);
    renderer.render(scene, camera);
    requestAnimationFrame(frame);
  }
  frame();
}
