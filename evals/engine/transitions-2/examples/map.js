// One map: every chapter stands where it happened, on one map of the
// person's life, and the camera flies from place to place. Places, sizes and
// words all come from the person's data.
import {
  THREE, C, clamp, lerp, smooth, ease, makeScroll, buildUI, makeStage, fontsReady, canvas, texture,
  serif, sans, wrap, rrect, miniPicture, loadLand, dotLand, clickable, label, personFrom, contactButtons,
} from "./kit.js";
import { yearText } from "./people.js";

const NOW = 2026.8;

function card(w, h, draw, { radius = 28 } = {}) {
  return canvas(w, h, (ctx) => {
    ctx.fillStyle = C.paper; rrect(ctx, 0, 0, w, h, radius); ctx.fill();
    draw(ctx, w, h);
  });
}

export async function start({ personKey }) {
  const P = personFrom(personKey);
  await fontsReady();
  const land = await loadLand();
  const stage = makeStage({ fov: 38 });
  const { scene, camera, renderer } = stage;
  const ui = buildUI({ title: "One map", how: "Each chapter rises where it happened; the camera flies between them", personKey, example: "map" });
  const scroll = makeScroll();
  ui.bindScroll(scroll);
  const cta = contactButtons(P);
  const tex = (el) => texture(el, renderer);

  // ---------- The map ----------
  const lats = P.places.map((p) => p.lat), lngs = P.places.map((p) => p.lng);
  const lat0 = (Math.min(...lats) + Math.max(...lats)) / 2, lng0 = (Math.min(...lngs) + Math.max(...lngs)) / 2;
  const cosL = Math.cos((lat0 * Math.PI) / 180);
  const spanX = (Math.max(...lngs) - Math.min(...lngs)) * cosL, spanZ = Math.max(...lats) - Math.min(...lats);
  const K = 13 / Math.max(spanX, spanZ, 8);
  const at = (lat, lng) => new THREE.Vector3((lng - lng0) * cosL * K, 0, -(lat - lat0) * K);
  const placeOf = (name) => P.places.find((p) => p.name === name) ?? P.places[P.places.length - 1];
  const where = (name) => { const p = placeOf(name); return at(p.lat, p.lng); };

  const padX = spanX * K / 2 + 9, padZ = spanZ * K / 2 + 7;
  const mapW = padX * 2, mapD = padZ * 2;
  const pxW = 4096, pxH = Math.round((4096 * mapD) / mapW);
  const mapPic = canvas(pxW, pxH, (ctx, w, h) => {
    const project = (lng, lat) => {
      const v = at(lat, lng);
      return [((v.x + padX) / mapW) * w, ((v.z + padZ) / mapD) * h];
    };
    ctx.fillStyle = "#151c23"; ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = "rgba(255,255,255,0.05)"; ctx.lineWidth = 2;
    for (let lng = -180; lng <= 180; lng += 5) { const [x] = project(lng, lat0); ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke(); }
    for (let lat = -80; lat <= 80; lat += 5) { const [, y] = project(lng0, lat); ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }
    dotLand(ctx, land, project, w, h, 11, 3.2, "rgba(150,178,186,0.55)");
    // Fade the edges into the background.
    const g = ctx.createRadialGradient(w / 2, h / 2, Math.min(w, h) * 0.3, w / 2, h / 2, Math.max(w, h) * 0.62);
    g.addColorStop(0, "rgba(0,0,0,0)"); g.addColorStop(1, "rgba(0,0,0,1)");
    ctx.globalCompositeOperation = "destination-out"; ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
  });
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(mapW, mapD), new THREE.MeshBasicMaterial({ map: tex(mapPic), transparent: true, depthWrite: false }));
  ground.rotation.x = -Math.PI / 2;
  scene.add(ground);
  scene.add(new THREE.AmbientLight(0xffffff, 1.6));
  const sun = new THREE.DirectionalLight(0xffffff, 2.2);
  sun.position.set(-4, 8, 6);
  scene.add(sun);

  // Pins and names at every place; the names keep their size on screen.
  const cityTags = [];
  P.places.forEach((p) => {
    const v = at(p.lat, p.lng);
    const pin = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.22, 12), new THREE.MeshStandardMaterial({ color: C.rose }));
    pin.position.copy(v).setY(0.11);
    const ring = new THREE.Mesh(new THREE.RingGeometry(0.07, 0.1, 32), new THREE.MeshBasicMaterial({ color: C.rose, side: THREE.DoubleSide }));
    ring.rotation.x = -Math.PI / 2; ring.position.copy(v).setY(0.01);
    const tag = label(p.name, { size: 40, color: "#fff", bg: "rgba(20,26,32,0.85)", height: 0.16 });
    tag.position.copy(v).add(new THREE.Vector3(0, 0.34, 0));
    tag.center.set(0.5, 0);
    scene.add(pin, ring, tag);
    cityTags.push({ tag, base: tag.scale.clone() });
  });

  // The route between the places, drawn as the reader scrolls.
  const routePts = [];
  for (let i = 0; i < P.places.length - 1; i++) {
    const a = at(P.places[i].lat, P.places[i].lng), b = at(P.places[i + 1].lat, P.places[i + 1].lng);
    const hgt = 0.15 + a.distanceTo(b) * 0.12;
    for (let s = 0; s <= 30; s++) { const t = s / 30; routePts.push(a.clone().lerp(b, t).setY(0.03 + hgt * Math.sin(Math.PI * t))); }
  }
  const routeGeo = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(routePts), routePts.length * 2, 0.012, 8, false);
  const routeMat = new THREE.MeshBasicMaterial({ color: C.amber, transparent: true });
  const route = new THREE.Mesh(routeGeo, routeMat);
  scene.add(route);

  // ---------- What stands on the map, chapter by chapter ----------
  // A card that stands up from the ground, hinged at its foot.
  const stands = [];
  const standing = (pic, w, h, pos, chapter, extra = {}) => {
    const hinge = new THREE.Group();
    hinge.position.copy(pos);
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ map: tex(pic), transparent: true, side: THREE.DoubleSide }));
    m.position.y = h / 2;
    hinge.add(m);
    scene.add(hinge);
    const item = { hinge, mesh: m, chapter, delay: extra.delay ?? 0, kind: "stand" };
    Object.assign(m.userData, extra.userData ?? {});
    stands.push(item);
    return item;
  };

  // 0. A sign where they live now.
  const home = P.places[P.places.length - 1];
  const homeV = at(home.lat, home.lng);
  standing(card(1000, 760, (ctx, w) => {
    ctx.fillStyle = C.amber; ctx.font = sans(34, 600); ctx.fillText("HELLO, I'M", 64, 120);
    ctx.fillStyle = C.ink; ctx.font = serif(92); wrap(ctx, P.name, 64, 230, w - 128, 100);
    ctx.fillStyle = C.muted; ctx.font = sans(36, 600); ctx.fillText(P.role.toUpperCase(), 64, 470);
    ctx.fillStyle = C.ink; ctx.font = serif(38, 400, "italic"); wrap(ctx, P.line, 64, 540, w - 128, 50);
    ctx.fillStyle = C.muted; ctx.font = sans(28); ctx.fillText(`${home.name}, now`, 64, 700);
  }), 1.5, 1.14, homeV.clone().add(new THREE.Vector3(-1.0, 0, -0.3)), 0);

  // 2. The diploma at the school.
  const s0 = P.study[0];
  standing(card(1000, 700, (ctx, w) => {
    ctx.strokeStyle = C.amber; ctx.lineWidth = 6; ctx.strokeRect(30, 30, w - 60, 640);
    ctx.textAlign = "center";
    ctx.fillStyle = C.muted; ctx.font = sans(30, 600); ctx.fillText(`${s0.place.toUpperCase()}  ·  ${s0.from} TO ${s0.to}`, w / 2, 120);
    ctx.fillStyle = C.ink; ctx.font = serif(46); ctx.fillText(P.name, w / 2, 220);
    ctx.font = serif(66); ctx.fillText(s0.degree, w / 2, 340);
    ctx.font = serif(44, 400); ctx.fillText(`in ${s0.field}`, w / 2, 410);
    ctx.fillStyle = C.muted; ctx.font = sans(28); wrap(ctx, s0.note, w / 2, 500, w - 160, 36);
    ctx.fillStyle = C.amber; ctx.beginPath(); ctx.arc(w / 2, 610, 40, 0, Math.PI * 2); ctx.fill();
  }, { radius: 8 }), 1.2, 0.84, where(s0.place).clone().add(new THREE.Vector3(-0.75, 0, 0.1)), 2);

  // 3. A building for each job, as tall as the years; 4. skills on its roof.
  const atPlace = {};
  const buildings = P.work.map((w) => {
    const n = (atPlace[w.place] = (atPlace[w.place] ?? 0) + 1) - 1;
    const years = (w.to ?? NOW) - w.from;
    const hgt = 0.35 + years * 0.32;
    const pos = where(w.place).clone().add(new THREE.Vector3(0.2 + n * 0.78, 0, -0.45));
    const group = new THREE.Group();
    group.position.copy(pos);
    const body = new THREE.Mesh(new THREE.BoxGeometry(0.66, hgt, 0.5), new THREE.MeshStandardMaterial({ color: "#e6dfd0", roughness: 0.9 }));
    body.position.y = hgt / 2;
    const face = new THREE.Mesh(new THREE.PlaneGeometry(0.62, Math.min(0.62, hgt - 0.04)), new THREE.MeshBasicMaterial({
      map: tex(card(620, 620, (ctx, cw) => {
        ctx.fillStyle = C.ink; ctx.font = serif(64); wrap(ctx, w.org, 40, 100, cw - 80, 70, 2);
        ctx.fillStyle = C.muted; ctx.font = sans(40); wrap(ctx, w.role, 40, 300, cw - 80, 48, 2);
        ctx.fillStyle = C.amber; ctx.font = sans(44, 600); ctx.fillText(yearText(w), 40, 540);
      }, { radius: 0 })),
    }));
    face.position.set(0, hgt - Math.min(0.62, hgt - 0.04) / 2 - 0.02, 0.251);
    group.add(body, face);
    scene.add(group);
    // Skills used there, stacked above the roof.
    const tags = w.uses.map((u, j) => {
      const t = label(u, { size: 40, color: C.ink, bg: C.paper, height: 0.16 });
      t.position.set(0, hgt + 0.16 + j * 0.2, 0);
      group.add(t);
      return t;
    });
    return { group, hgt, tags, w, pos };
  });

  // 5. Projects where they were made.
  const madeAt = {};
  const plates = P.projects.map((p, i) => {
    const n = (madeAt[p.place] = (madeAt[p.place] ?? 0) + 1) - 1;
    const pic = card(800, 640, (ctx, w, h) => {
      miniPicture(ctx, p.kind, 28, 28, w - 56, 330, i + 3);
      ctx.fillStyle = C.ink; ctx.font = serif(52); ctx.fillText(p.title, 34, 440);
      ctx.fillStyle = C.muted; ctx.font = sans(30); wrap(ctx, p.line, 34, 492, w - 68, 36, 2);
      ctx.fillStyle = C.amber; ctx.font = sans(28, 600); ctx.fillText(`${p.year}`, 34, h - 30);
    }, { radius: 10 });
    return standing(pic, 0.9, 0.72, where(p.place).clone().add(new THREE.Vector3(-0.9 + n * 1.0, 0, 0.75)), 5, { delay: n * 0.12, userData: { project: p } });
  });

  // 6. Quotes, floating where those people worked with them.
  const saidAt = {};
  const bubbles = P.quotes.map((q) => {
    const n = (saidAt[q.place] = (saidAt[q.place] ?? 0) + 1) - 1;
    const pic = canvas(1100, 560, (ctx, w) => {
      ctx.fillStyle = C.paper; rrect(ctx, 0, 0, w, 470, 40); ctx.fill();
      ctx.beginPath(); ctx.moveTo(120, 460); ctx.lineTo(90, 560); ctx.lineTo(220, 460); ctx.fill();
      ctx.fillStyle = C.ink; ctx.font = serif(40, 400, "italic"); const y = wrap(ctx, `“${q.text}”`, 50, 90, w - 100, 52, 5);
      ctx.fillStyle = C.ink; ctx.font = sans(30, 600); ctx.fillText(q.who, 50, Math.min(y + 30, 430));
      ctx.fillStyle = C.muted; ctx.font = sans(26); ctx.fillText(q.from, 50 + ctx.measureText(q.who).width * 1.25 + 20, Math.min(y + 30, 430));
    });
    const base = where(q.place).clone().add(new THREE.Vector3(-0.9 + n * 1.85, 2.9 + n * 0.35, -0.3 - n * 0.2));
    const m = new THREE.Mesh(new THREE.PlaneGeometry(1.75, 0.89), new THREE.MeshBasicMaterial({ map: tex(pic), transparent: true, side: THREE.DoubleSide }));
    m.position.copy(base);
    scene.add(m);
    return { m, base };
  });

  // 7. Back home: a card to write to them.
  standing(card(1000, 700, (ctx, w) => {
    ctx.fillStyle = C.amber; ctx.font = sans(34, 600); ctx.fillText("GET IN TOUCH", 64, 120);
    ctx.fillStyle = C.ink; ctx.font = serif(80); ctx.fillText(`Write to ${P.first}`, 64, 240);
    ctx.font = serif(48, 400); ctx.fillText(P.contact.email, 64, 340);
    ctx.fillStyle = C.muted; ctx.font = sans(32); wrap(ctx, `${P.seeking}.`, 64, 430, w - 128, 42);
    ctx.fillStyle = C.ink; ctx.font = sans(32, 600); ctx.fillText(P.contact.links.join("   "), 64, 620);
  }), 1.5, 1.05, homeV.clone().add(new THREE.Vector3(1.55, 0, -0.25)), 7);

  // ---------- The camera, chapter by chapter ----------
  const centroid = (vs) => vs.reduce((a, v) => a.add(v), new THREE.Vector3()).multiplyScalar(1 / vs.length);
  const workOrder = [...P.work].sort((a, b) => a.from - b.from).map((w) => where(w.place));
  const madeOrder = [...P.projects].sort((a, b) => a.year - b.year).map((p) => where(p.place).clone().add(new THREE.Vector3(0, 0, 0.75)));
  const along = (pts, local) => {
    if (pts.length === 1) return pts[0].clone();
    const s = clamp(local) * (pts.length - 1), i = Math.min(pts.length - 2, Math.floor(s));
    return pts[i].clone().lerp(pts[i + 1], ease(s - i));
  };
  const allSpan = Math.max(spanX, spanZ) * K;
  // Each shot: what to look at, how far, how high (radians above the ground).
  const shots = [
    () => ({ target: homeV.clone().add(new THREE.Vector3(-0.55, 0.55, 0)), dist: 3.6, pitch: 0.22 }),
    (l) => ({ target: centroid(P.places.map((p) => at(p.lat, p.lng))), dist: allSpan * 0.95 + 4 - l * 1.5, pitch: 0.95 }),
    () => ({ target: where(s0.place).clone().add(new THREE.Vector3(-0.5, 0.45, 0)), dist: 3.2, pitch: 0.3 }),
    (l) => ({ target: along(workOrder, l).add(new THREE.Vector3(0.5, 0.7, 0)), dist: 4.4, pitch: 0.36 }),
    () => ({ target: centroid(buildings.map((b) => b.pos)).add(new THREE.Vector3(0.3, 1.1, 0)), dist: 5.2 + buildings.length * 0.3, pitch: 0.42 }),
    (l) => ({ target: along(madeOrder, l).add(new THREE.Vector3(0, 0.4, 0)), dist: 3.6, pitch: 0.34 }),
    () => ({ target: centroid(bubbles.map((b) => b.base)), dist: 3.6 + bubbles.length * 0.45, pitch: 0.12 }),
    (l) => ({ target: homeV.clone().add(new THREE.Vector3(0.7, 0.5 + l * 0.6, 0)), dist: 4.2 + l * 9, pitch: 0.3 + l * 0.6 }),
  ];
  const place = (shot) => {
    const d = shot.dist * (stage.narrow ? 1.7 : 1);
    return shot.target.clone().add(new THREE.Vector3(0, Math.sin(shot.pitch) * d, Math.cos(shot.pitch) * d));
  };

  let current = { from: 0, to: 0 };
  clickable(stage, () => plates.map((p) => p.mesh), P, () => current.from === 5 && current.to === 5);

  function frame() {
    const st = scroll.step();
    current = st;
    ui.update(st);

    // Fly: blend the two shots, rising on long journeys.
    const a = shots[st.from](st.from === st.to ? st.local : 1), b = shots[st.to](0);
    const target = a.target.clone().lerp(b.target, st.t);
    const pa = place(a), pb = place(b);
    const pos = pa.clone().lerp(pb, st.t);
    const travel = a.target.distanceTo(b.target);
    pos.y += Math.sin(Math.PI * st.t) * Math.min(travel * 0.75, 12);
    camera.position.copy(pos);
    camera.lookAt(target);

    // Rise what each chapter brings, and keep it standing after.
    for (const it of stands) {
      const r = ease(clamp((it.chapter <= st.from ? 1 : st.to === it.chapter ? st.raw * 1.4 - 0.25 - it.delay : 0)));
      it.hinge.visible = r > 0.001;
      it.hinge.rotation.x = -(1 - r) * (Math.PI / 2);
    }
    const bRise = (i) => clamp(3 <= st.from ? 1 : st.to === 3 ? st.raw * 1.6 - 0.3 - i * 0.15 : 0);
    buildings.forEach((b, i) => {
      const r = ease(bRise(i));
      b.group.visible = r > 0.001;
      b.group.scale.set(1, Math.max(r, 0.001), 1);
      b.tags.forEach((t, j) => {
        const tr = clamp(4 <= st.from ? 1 : st.to === 4 ? st.raw * 2 - 0.4 - j * 0.15 : 0);
        t.visible = tr > 0.01;
        t.material.opacity = tr;
        t.scale.y = 0.16 / Math.max(r, 0.001);
        t.scale.x = (t.material.map.image.width / t.material.map.image.height) * 0.16;
      });
    });
    bubbles.forEach(({ m, base }, i) => {
      const r = ease(clamp(6 <= st.from ? 1 : st.to === 6 ? st.raw * 1.6 - 0.3 - i * 0.12 : 0));
      m.visible = r > 0.001;
      m.scale.setScalar(Math.max(r, 0.001));
      m.position.copy(base).add(new THREE.Vector3(0, (1 - r) * -1.2, 0));
    });
    const routeShown = st.from >= 2 ? 1 : st.from === 1 && st.to === 1 ? clamp(st.local * 1.25) : 0;
    routeGeo.setDrawRange(0, Math.floor((routeGeo.index.count / 6) * routeShown) * 6);
    routeMat.opacity = st.from <= 1 ? 1 : 0.5;
    for (const { tag, base } of cityTags) tag.scale.copy(base).multiplyScalar(clamp(camera.position.distanceTo(tag.position) / 4, 1, 5));

    cta.update(st.from === 7 ? 1 : st.to === 7 ? smooth(0.7, 1, st.raw) : 0);
    renderer.render(scene, camera);
    requestAnimationFrame(frame);
  }
  frame();
}
