// One map: every chapter stands where it happened, on one map of the
// person's life, and the camera flies from place to place. Places, sizes and
// words all come from the person's data. Browser only.
import * as THREE from "three";
import { CHAPTERS, yearText, type ChapterKey } from "./chapters.ts";
import { NOW, type Person, type Project } from "./person.ts";
import { canvas, dieCut, label, miniPicture, rrect, sans, serif, texture, wrap } from "./paint.ts";
import { dotLand } from "./land.ts";
import { groundTones, rgba, type Palette } from "./look.ts";
import { fitDistance, mapFrame, rise, spots } from "./frame.ts";
import { clamp, ease, lerp, smooth } from "./scroll.ts";
import { holding, type Anchor, type World, type WorldFactory, type WorldView } from "./world.ts";

const FOV = 38;
const order = (k: ChapterKey) => CHAPTERS.findIndex((c) => c.key === k);
/** How much a place's name grows seen from this far, to keep its size on screen. */
const grow = (d: number) => Math.max(1, d / 4);

function card(C: Palette, w: number, h: number, draw: (ctx: CanvasRenderingContext2D, w: number, h: number) => void, radius = 28) {
  return canvas(w, h, (ctx) => {
    ctx.fillStyle = C.paper; rrect(ctx, 0, 0, w, h, radius); ctx.fill();
    draw(ctx, w, h);
  });
}

type Stand = { hinge: THREE.Group; mesh: THREE.Mesh; chapter: ChapterKey; delay: number };
type Shot = {
  target: THREE.Vector3; dist: number; pitch: number;
  /** On a narrow screen: what to centre and how wide it is, so it fills the width instead. */
  phone?: { target: THREE.Vector3; width: number; back?: number };
  /** Already fitted to this screen's shape, so a narrow screen takes it as it is. */
  fitted?: boolean;
};
/** A place's name: where it stands, its own size, and how many names of its spot stand below it. */
type CityTag = { tag: THREE.Sprite; base: THREE.Vector3; foot: THREE.Vector3; stack: number };

export const createMap: WorldFactory = async (env, chapters) => {
  const P: Person = env.person, C = env.palette, tones = groundTones(C);
  const own = new Set(chapters);
  const tex = (el: HTMLCanvasElement) => texture(el, env.renderer);
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(tones.map);
  const camera = new THREE.PerspectiveCamera(FOV, 1, 0.05, 200);

  // ---------- The map ----------
  const f = mapFrame(P.places);
  const at = (lat: number, lng: number) => { const [x, z] = f.at(lat, lng); return new THREE.Vector3(x, 0, z); };
  const home = P.places[P.places.length - 1];
  const homeV = home ? at(home.lat, home.lng) : new THREE.Vector3();
  const where = (name: string) => {
    const p = P.places.find((x) => x.name === name) ?? home;
    return p ? at(p.lat, p.lng) : new THREE.Vector3();
  };
  // Places closer than a unit share one spot: their names stack, and what stands there stands in one row.
  const spotOf = spots(P.places.map((p) => f.at(p.lat, p.lng)), 1);
  const spotIndex = (name: string) => {
    const i = P.places.findIndex((x) => x.name === name);
    return spotOf[i < 0 ? P.places.length - 1 : i] ?? -1;
  };
  const spotAt = (name: string) => { const p = P.places[spotIndex(name)]; return p ? at(p.lat, p.lng) : new THREE.Vector3(); };
  /** Counts what stands at each spot, so the next thing there stands beside the last. */
  const turns = () => { const n: Record<number, number> = {}; return (name: string) => { const s = spotIndex(name); return (n[s] = (n[s] ?? 0) + 1) - 1; }; };

  const padX = (f.spanX * f.k) / 2 + 9, padZ = (f.spanZ * f.k) / 2 + 7;
  const mapW = padX * 2, mapD = padZ * 2;
  const pxW = 4096, pxH = Math.round((4096 * mapD) / mapW);
  const mapPic = canvas(pxW, pxH, (ctx, w, h) => {
    const project = (lng: number, lat: number): [number, number] => {
      const v = at(lat, lng);
      return [((v.x + padX) / mapW) * w, ((v.z + padZ) / mapD) * h];
    };
    ctx.fillStyle = tones.map; ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = tones.grid; ctx.lineWidth = 2;
    for (let lng = -180; lng <= 180; lng += 5) { const [x] = project(lng, f.lat0); ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke(); }
    for (let lat = -80; lat <= 80; lat += 5) { const [, y] = project(f.lng0, lat); ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }
    dotLand(ctx, env.land, project, w, h, 11, 3.2, tones.land);
    // Fade the edges into the ground's own colour.
    const g = ctx.createRadialGradient(w / 2, h / 2, Math.min(w, h) * 0.3, w / 2, h / 2, Math.max(w, h) * 0.62);
    g.addColorStop(0, rgba(tones.map, 0)); g.addColorStop(1, rgba(tones.map, 1));
    ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
    // And wholly at each edge over its last 4 units, so a camera far back never sees where the ground ends.
    const fx = (4 / mapW) * w, fz = (4 / mapD) * h;
    for (const [x0, y0, x1, y1, rx, ry, rw, rh] of [[fx, 0, 0, 0, 0, 0, fx, h], [w - fx, 0, w, 0, w - fx, 0, fx, h], [0, fz, 0, 0, 0, 0, w, fz], [0, h - fz, 0, h, 0, h - fz, w, fz]]) {
      const e = ctx.createLinearGradient(x0, y0, x1, y1);
      e.addColorStop(0, rgba(tones.map, 0)); e.addColorStop(1, rgba(tones.map, 1));
      ctx.fillStyle = e; ctx.fillRect(rx, ry, rw, rh);
    }
  });
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(mapW, mapD), new THREE.MeshBasicMaterial({ map: tex(mapPic), depthWrite: false }));
  ground.rotation.x = -Math.PI / 2;
  scene.add(ground);
  scene.add(new THREE.AmbientLight(0xffffff, 1.6));
  const sun = new THREE.DirectionalLight(0xffffff, 2.2);
  sun.position.set(-4, 8, 6).multiplyScalar(3);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  const reach = Math.max(mapW, mapD) * 0.55;
  Object.assign(sun.shadow.camera, { left: -reach, right: reach, top: reach, bottom: -reach, near: 1, far: 90 });
  sun.shadow.bias = -0.0006; sun.shadow.normalBias = 0.03;
  scene.add(sun, sun.target);
  const shade = new THREE.Mesh(new THREE.PlaneGeometry(mapW, mapD), new THREE.ShadowMaterial({ opacity: 0.6 }));
  shade.rotation.x = -Math.PI / 2; shade.position.y = 0.003; shade.receiveShadow = true;
  scene.add(shade);

  // Pins and names at every place; the names keep their size on screen.
  const cityTags: CityTag[] = [];
  for (const [i, p] of P.places.entries()) {
    const v = at(p.lat, p.lng);
    const pin = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.22, 12), new THREE.MeshStandardMaterial({ color: C.rose }));
    pin.castShadow = true;
    pin.position.copy(v).setY(0.11);
    const ring = new THREE.Mesh(new THREE.RingGeometry(0.07, 0.1, 32), new THREE.MeshBasicMaterial({ color: C.rose, side: THREE.DoubleSide }));
    ring.rotation.x = -Math.PI / 2; ring.position.copy(v).setY(0.01);
    const tag = label(p.name, { size: 40, color: "#fff", bg: "rgba(20,26,32,0.85)", height: 0.16 });
    const foot = v.clone().add(new THREE.Vector3(0, 0.34, 0));
    tag.position.copy(foot);
    tag.center.set(0.5, 0);
    scene.add(pin, ring, tag);
    // Names of one spot stack, the southernmost (nearest the camera) lowest.
    const stack = P.places.filter((q, j) => j !== i && spotOf[j] === spotOf[i] && (q.lat < p.lat || (q.lat === p.lat && j < i))).length;
    cityTags.push({ tag, base: tag.scale.clone(), foot, stack });
  }
  /** A name seen from `eye`, `up` being the screen's up: its size (on a narrow screen, kept to its width), and its foot, stacked above the names below it. */
  const tagSeen = ({ base, foot, stack }: CityTag, eye: THREE.Vector3, up: THREE.Vector3) => {
    const s = grow(eye.distanceTo(foot)) * Math.min(1, camera.aspect / 0.9);
    return { s, pos: foot.clone().addScaledVector(up, stack * base.y * s * 1.2) };
  };

  // The route between the places, drawn as the reader scrolls.
  let route: THREE.Mesh<THREE.TubeGeometry, THREE.MeshBasicMaterial> | null = null;
  if (own.has("from") && P.places.length >= 2) {
    const routePts: THREE.Vector3[] = [];
    for (let i = 0; i < P.places.length - 1; i++) {
      const a = at(P.places[i].lat, P.places[i].lng), b = at(P.places[i + 1].lat, P.places[i + 1].lng);
      const hgt = 0.15 + a.distanceTo(b) * 0.12;
      for (let s = 0; s <= 30; s++) { const t = s / 30; routePts.push(a.clone().lerp(b, t).setY(0.03 + hgt * Math.sin(Math.PI * t))); }
    }
    route = new THREE.Mesh(
      new THREE.TubeGeometry(new THREE.CatmullRomCurve3(routePts), routePts.length * 2, 0.012, 8, false),
      new THREE.MeshBasicMaterial({ color: C.amber, transparent: true }),
    );
    scene.add(route);
  }

  // ---------- What stands on the map, chapter by chapter ----------
  // A card that stands up from the ground, hinged at its foot.
  const stands: Stand[] = [];
  const standing = (pic: HTMLCanvasElement, w: number, h: number, pos: THREE.Vector3, chapter: ChapterKey, delay = 0, project: Project | null = null) => {
    const hinge = new THREE.Group();
    hinge.position.copy(pos);
    // Cut from printed card: a white edge round it, and the card's own shape in its shadow.
    const cut = dieCut(pic, C, 14);
    const cw = (w * cut.width) / pic.width, ch = (h * cut.height) / pic.height;
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(cw, ch), new THREE.MeshBasicMaterial({ map: tex(cut), transparent: true, alphaTest: 0.5, side: THREE.DoubleSide }));
    mesh.position.y = ch / 2 - (h * 14) / pic.height;
    mesh.castShadow = true;
    mesh.userData.project = project;
    hinge.add(mesh);
    scene.add(hinge);
    const item = { hinge, mesh, chapter, delay };
    stands.push(item);
    return item;
  };

  // Hello: a sign where they live now.
  const signAt = homeV.clone().add(new THREE.Vector3(-1.0, 0, -0.3));
  if (own.has("hello")) standing(card(C, 1000, 760, (ctx, w) => {
    ctx.fillStyle = C.amber; ctx.font = sans(34, 600); ctx.fillText("HELLO, I'M", 64, 120);
    ctx.fillStyle = C.ink; ctx.font = serif(92); wrap(ctx, P.name, 64, 230, w - 128, 100, 2);
    ctx.fillStyle = C.muted; ctx.font = sans(36, 600); ctx.fillText(P.role.toUpperCase(), 64, 470);
    ctx.fillStyle = C.ink; ctx.font = serif(38, 400, "italic"); wrap(ctx, P.line, 64, 540, w - 128, 50, 2);
    if (home) { ctx.fillStyle = C.muted; ctx.font = sans(28); ctx.fillText(`${home.name}, now`, 64, 700); }
  }), 1.5, 1.14, signAt, "hello");

  // Studied: the diploma at the school.
  const s0 = P.study[0];
  const diplomaAt = (s0 ? where(s0.place) : homeV.clone()).add(new THREE.Vector3(-0.75, 0, 0.1));
  if (own.has("studied") && s0) standing(card(C, 1000, 700, (ctx, w) => {
    ctx.strokeStyle = C.amber; ctx.lineWidth = 6; ctx.strokeRect(30, 30, w - 60, 640);
    ctx.textAlign = "center";
    ctx.fillStyle = C.muted; ctx.font = sans(30, 600); ctx.fillText(`${s0.place.toUpperCase()}  ·  ${s0.from} TO ${s0.to}`, w / 2, 120);
    ctx.fillStyle = C.ink; ctx.font = serif(46); ctx.fillText(P.name, w / 2, 220);
    ctx.font = serif(66); ctx.fillText(s0.degree, w / 2, 340);
    ctx.font = serif(44, 400); ctx.fillText(`in ${s0.field}`, w / 2, 410);
    if (s0.note) { ctx.fillStyle = C.muted; ctx.font = sans(28); wrap(ctx, s0.note, w / 2, 500, w - 160, 36, 2); }
    ctx.fillStyle = C.amber; ctx.beginPath(); ctx.arc(w / 2, 610, 40, 0, Math.PI * 2); ctx.fill();
  }, 8), 1.2, 0.84, diplomaAt, "studied");

  // Worked: a building for each job, as tall as the years. Good at: what each job used, on its roof.
  // The buildings rise with the first of the two chapters this map holds.
  const buildingsChapter: ChapterKey | null = own.has("worked") ? "worked" : own.has("good") ? "good" : null;
  const buildingTurn = turns();
  const longest = Math.max(0, ...P.work.map((w) => (w.to ?? NOW) - w.from));
  const buildings = (buildingsChapter ? P.work : []).map((w) => {
    const n = buildingTurn(w.place);
    const hgt = rise((w.to ?? NOW) - w.from, longest);
    // Where the camera looks for this job; the building stands just behind and to the east.
    const foot = spotAt(w.place).add(new THREE.Vector3(n * 0.78, 0, 0));
    const pos = foot.clone().add(new THREE.Vector3(0.2, 0, -0.45));
    const group = new THREE.Group();
    group.position.copy(pos);
    const body = new THREE.Mesh(new THREE.BoxGeometry(0.66, hgt, 0.5), new THREE.MeshStandardMaterial({ color: "#e6dfd0", roughness: 0.9 }));
    body.castShadow = true;
    body.position.y = hgt / 2;
    const fh = Math.min(0.62, hgt - 0.04);
    const face = new THREE.Mesh(new THREE.PlaneGeometry(0.62, fh), new THREE.MeshBasicMaterial({
      map: tex(card(C, 620, 620, (ctx, cw) => {
        ctx.fillStyle = C.ink; ctx.font = serif(64); wrap(ctx, w.org, 40, 100, cw - 80, 70, 2);
        ctx.fillStyle = C.muted; ctx.font = sans(40); wrap(ctx, w.role, 40, 300, cw - 80, 48, 2);
        ctx.fillStyle = C.amber; ctx.font = sans(44, 600); ctx.fillText(yearText(w), 40, 540);
      }, 0)),
    }));
    face.position.set(0, hgt - fh / 2 - 0.02, 0.251);
    group.add(body, face);
    scene.add(group);
    const tags = own.has("good") ? w.uses.map((u, j) => {
      const t = label(u, { size: 40, color: C.ink, bg: C.paper, height: 0.16 });
      t.position.set(0, hgt + 0.16 + j * 0.2, 0);
      group.add(t);
      return t;
    }) : [];
    return { group, hgt, tags, pos, foot, from: w.from };
  });
  // Someone with skills and no jobs: the skills stand in a stack at home.
  const looseTags = own.has("good") && !buildings.length ? P.skills.flatMap((g) => g.items).slice(0, 10).map((u, j) => {
    const t = label(u, { size: 40, color: C.ink, bg: C.paper, height: 0.16 });
    t.position.copy(homeV).add(new THREE.Vector3(0.4, 0.3 + j * 0.2, -0.4));
    scene.add(t);
    return t;
  }) : [];

  // Made: every project where it was made.
  const plateTurn = turns();
  const plates = own.has("made") ? P.projects.map((p, i) => {
    const n = plateTurn(p.place);
    const pic = card(C, 800, 640, (ctx, w, h) => {
      miniPicture(ctx, C, p.kind, 28, 28, w - 56, 330, i + 3);
      ctx.fillStyle = C.ink; ctx.font = serif(52); ctx.fillText(p.title, 34, 440);
      ctx.fillStyle = C.muted; ctx.font = sans(30); wrap(ctx, p.line, 34, 492, w - 68, 36, 2);
      ctx.fillStyle = C.amber; ctx.font = sans(28, 600); ctx.fillText(`${p.year}`, 34, h - 30);
    }, 10);
    return { item: standing(pic, 0.9, 0.72, spotAt(p.place).add(new THREE.Vector3(-0.9 + n * 1.0, 0, 0.75)), "made", n * 0.12, p), year: p.year };
  }) : [];

  // Others say: every quote, floating where those people worked with them.
  const saidTurn = turns();
  const bubbles = own.has("say") ? P.quotes.map((q) => {
    const n = saidTurn(q.place);
    const pic = canvas(1100, 560, (ctx, w) => {
      ctx.fillStyle = C.paper; rrect(ctx, 0, 0, w, 470, 40); ctx.fill();
      ctx.beginPath(); ctx.moveTo(120, 460); ctx.lineTo(90, 560); ctx.lineTo(220, 460); ctx.fill();
      ctx.fillStyle = C.ink; ctx.font = serif(40, 400, "italic"); const y = wrap(ctx, `“${q.text}”`, 50, 90, w - 100, 52, 5);
      ctx.fillStyle = C.ink; ctx.font = sans(30, 600); ctx.fillText(q.who, 50, Math.min(y + 30, 430));
      ctx.fillStyle = C.muted; ctx.font = sans(26); ctx.fillText(q.from, 50 + ctx.measureText(q.who).width * 1.25 + 20, Math.min(y + 30, 430));
    });
    const base = spotAt(q.place).add(new THREE.Vector3(-0.9 + n * 1.85, 2.9 + n * 0.35, -0.3 - n * 0.2));
    const cut = dieCut(pic, C, 16);
    const m = new THREE.Mesh(new THREE.PlaneGeometry((1.75 * cut.width) / pic.width, (0.89 * cut.height) / pic.height),
      new THREE.MeshBasicMaterial({ map: tex(cut), transparent: true, alphaTest: 0.5, side: THREE.DoubleSide }));
    m.castShadow = true;
    m.position.copy(base);
    scene.add(m);
    return { m, base };
  }) : [];

  // Contact: back home, a card to write to them.
  const contactAt = homeV.clone().add(new THREE.Vector3(1.55, 0, -0.25));
  if (own.has("contact")) standing(card(C, 1000, 700, (ctx, w) => {
    ctx.fillStyle = C.amber; ctx.font = sans(34, 600); ctx.fillText("GET IN TOUCH", 64, 120);
    ctx.fillStyle = C.ink; ctx.font = serif(80); ctx.fillText(`Write to ${P.first}`, 64, 240);
    ctx.font = serif(48, 400); ctx.fillText(P.contact.email, 64, 340);
    ctx.fillStyle = C.muted; ctx.font = sans(32); wrap(ctx, `${P.seeking}.`, 64, 430, w - 128, 42, 3);
    ctx.fillStyle = C.ink; ctx.font = sans(32, 600); ctx.fillText(P.contact.links.join("   "), 64, 620);
  }), 1.5, 1.05, contactAt, "contact");

  // ---------- The camera, chapter by chapter ----------
  const centroid = (vs: THREE.Vector3[]) => vs.length ? vs.reduce((a, v) => a.add(v), new THREE.Vector3()).multiplyScalar(1 / vs.length) : homeV.clone();
  const workOrder = [...buildings].sort((a, b) => a.from - b.from).map((b) => b.foot.clone());
  const madeOrder = [...plates].sort((a, b) => a.year - b.year).map((p) => p.item.hinge.position.clone());
  const along = (pts: THREE.Vector3[], local: number) => {
    if (!pts.length) return homeV.clone();
    if (pts.length === 1) return pts[0].clone();
    const s = clamp(local) * (pts.length - 1), i = Math.min(pts.length - 2, Math.floor(s));
    return pts[i].clone().lerp(pts[i + 1], ease(s - i));
  };
  /** "Where from": every pin and name in view on this screen, seen from `pitch`, looking at the middle of the places' span (the map's middle). */
  const fromDistance = (pitch: number) => {
    const up = new THREE.Vector3(0, Math.cos(pitch), -Math.sin(pitch)), back = new THREE.Vector3(0, Math.sin(pitch), Math.cos(pitch));
    // The names grow with the distance, so fit them as seen from the last fit; from the far end, each fit is still wide enough.
    let dist = 200;
    for (let i = 0; i < 4; i++) {
      const eye = back.clone().multiplyScalar(dist);
      const pts = cityTags.flatMap((t) => {
        const { s, pos } = tagSeen(t, eye, up), w = (t.base.x * s) / 2, top = pos.addScaledVector(up, t.base.y * s);
        return [[t.foot.x, 0, t.foot.z], [top.x - w, top.y, top.z], [top.x + w, top.y, top.z]];
      });
      dist = Math.max(4, fitDistance(pts, pitch, FOV, camera.aspect, 0.85));
    }
    return dist;
  };
  // Each shot: what to look at, how far, how high (radians above the ground).
  const SHOTS: Record<ChapterKey, (l: number) => Shot> = {
    hello: () => ({ target: homeV.clone().add(new THREE.Vector3(-0.55, 0.55, 0)), dist: 3.6, pitch: 0.22,
      phone: { target: signAt.clone().setY(0.57), width: 1.5 } }),
    // Drifting in over the hold, never nearer than the fit once the lean in (to 0.92) is taken.
    from: (l) => ({ target: new THREE.Vector3(), dist: (fromDistance(0.95) / 0.92) * (1.12 - 0.12 * l) * (window.innerHeight < 750 && camera.aspect >= 0.9 ? 1.7 : 1), pitch: 0.95, fitted: true }),
    studied: () => ({ target: (s0 ? where(s0.place) : homeV.clone()).add(new THREE.Vector3(-0.5, 0.45, 0)), dist: 3.2, pitch: 0.3,
      phone: { target: diplomaAt.clone().setY(0.42), width: 1.2 } }),
    worked: (l) => ({ target: along(workOrder, l).add(new THREE.Vector3(0.5, 0.7, 0)), dist: 4.4, pitch: 0.36 }),
    good: () => ({ target: centroid(buildings.map((b) => b.pos.clone())).add(new THREE.Vector3(0.3, 1.1, 0)), dist: 5.2 + buildings.length * 0.3, pitch: 0.42 }),
    made: (l) => ({ target: along(madeOrder, l).add(new THREE.Vector3(0, 0.4, 0)), dist: 3.6, pitch: 0.34 }),
    // On a phone the quotes are read one at a time, the camera going from one to the next.
    say: (l) => ({ target: centroid(bubbles.map((b) => b.base.clone())), dist: 3.6 + bubbles.length * 0.45, pitch: 0.12,
      phone: { target: along(bubbles.map((b) => b.base.clone()), smooth(0.1, 0.9, l)), width: 1.75 } }),
    contact: (l) => ({ target: homeV.clone().add(new THREE.Vector3(0.7, 0.5 + l * 0.6, 0)), dist: 4.2 + l * 9, pitch: 0.3 + l * 0.6,
      phone: { target: contactAt.clone().setY(0.525).lerp(homeV.clone().add(new THREE.Vector3(0.7, 1.1, 0)), smooth(0, 1, l)), width: 1.5, back: l * 9 * 1.7 } }),
  };
  /** A chapter's shot for this screen: on a narrow one, its card centred and as wide as the view, or simply further back. */
  const shotFor = (k: ChapterKey, l: number): Shot => {
    const s = SHOTS[k](l);
    if (!env.narrow() || s.fitted) return s;
    if (!s.phone) return { ...s, dist: s.dist * 1.7 };
    const fit = (s.phone.width / 2) * 1.15 / (Math.tan(THREE.MathUtils.degToRad(FOV / 2)) * camera.aspect);
    return { target: s.phone.target, dist: fit + (s.phone.back ?? 0), pitch: s.pitch };
  };
  const place = (shot: Shot) =>
    shot.target.clone().add(new THREE.Vector3(0, Math.sin(shot.pitch) * shot.dist, Math.cos(shot.pitch) * shot.dist));

  // How far a chapter's things have risen: all the way once the story is past it.
  const risen = (chapter: ChapterKey, v: WorldView, rate: number, offset: number, delay: number) => {
    const c = order(chapter);
    if (c <= order(v.from)) return 1;
    if (v.to === chapter && v.from !== v.to) return clamp(v.raw * rate - offset - delay);
    return 0;
  };

  function pose(v: WorldView) {
    const moving = v.from !== v.to;
    // Fly: blend the two shots, rising on long journeys.
    // Lean in on each hold; the flight between stands back.
    const lean = lerp(0.92, 1, Math.sin(Math.PI * v.raw));
    const a = shotFor(v.from, moving ? 1 : v.local), b = shotFor(v.to, 0);
    a.dist *= lean; b.dist *= lean;
    const target = a.target.clone().lerp(b.target, v.t);
    const pos = place(a).lerp(place(b), v.t);
    pos.y += Math.sin(Math.PI * v.t) * Math.min(a.target.distanceTo(b.target) * 0.75, 12);
    camera.position.copy(pos);
    camera.lookAt(target);
    camera.updateMatrixWorld();

    // Rise what each chapter brings, and keep it standing after.
    for (const it of stands) {
      const r = ease(risen(it.chapter, v, 1.4, 0.25, it.delay));
      it.hinge.visible = r > 0.001;
      it.hinge.rotation.x = -(1 - r) * (Math.PI / 2);
    }
    buildings.forEach((bd, i) => {
      const r = ease(risen(buildingsChapter!, v, 1.6, 0.3, i * 0.15));
      bd.group.visible = r > 0.001;
      bd.group.scale.set(1, Math.max(r, 0.001), 1);
      bd.tags.forEach((t, j) => {
        const tr = risen("good", v, 2, 0.4, j * 0.15);
        t.visible = tr > 0.01;
        (t.material as THREE.SpriteMaterial).opacity = tr;
        const img = (t.material as THREE.SpriteMaterial).map!.image as HTMLCanvasElement;
        t.scale.y = 0.16 / Math.max(r, 0.001);
        t.scale.x = (img.width / img.height) * 0.16;
      });
    });
    looseTags.forEach((t, j) => {
      const tr = risen("good", v, 2, 0.4, j * 0.08);
      t.visible = tr > 0.01;
      (t.material as THREE.SpriteMaterial).opacity = tr;
    });
    // On a phone the camera reads one quote at a time; the others fade so none stands in front of it.
    const focus = v.from === "say" && !moving ? smooth(0.1, 0.9, v.local) * (bubbles.length - 1)
      : v.from === "say" ? bubbles.length - 1 : 0;
    const narrow = env.narrow();
    bubbles.forEach(({ m, base }, i) => {
      const r = ease(risen("say", v, 1.6, 0.3, i * 0.12));
      m.visible = r > 0.001;
      m.scale.setScalar(Math.max(r, 0.001));
      m.position.copy(base).add(new THREE.Vector3(0, (1 - r) * -1.2, 0));
      (m.material as THREE.MeshBasicMaterial).opacity = narrow ? 1 - 0.96 * smooth(0.35, 0.9, Math.abs(focus - i)) : 1;
    });
    if (route) {
      const fromAt = order("from"), now = order(v.from);
      const shown = now > fromAt ? 1 : v.from === "from" && !moving ? clamp(v.local * 1.25) : v.from === "from" ? 1 : 0;
      route.geometry.setDrawRange(0, Math.floor((route.geometry.index!.count / 6) * shown) * 6);
      route.material.opacity = now <= fromAt ? 1 : 0.5;
    }
    const screenUp = new THREE.Vector3(0, 1, 0).applyQuaternion(camera.quaternion);
    for (const t of cityTags) {
      const { s, pos } = tagSeen(t, camera.position, screenUp);
      t.tag.scale.copy(t.base).multiplyScalar(s);
      t.tag.position.copy(pos);
    }
  }

  const ray = new THREE.Raycaster();
  const world: World = {
    id: "map",
    scene,
    camera,
    pose,
    anchor(chapter): Anchor {
      // The card stands on the ground in front of the chapter's place, facing the
      // camera, as tall as about half of what the camera sees there.
      pose(holding(chapter, 1));
      const shot = shotFor(chapter, 1);
      const toward = place(shot).sub(shot.target).setY(0).normalize();
      const foot = shot.target.clone().addScaledVector(toward, 0.3 * shot.dist).setY(0);
      const seen = 2 * Math.tan(THREE.MathUtils.degToRad(FOV / 2)) * camera.position.distanceTo(foot);
      const size = { w: 0.75 * seen * camera.aspect, h: 0.6 * seen };
      const up = new THREE.Vector3(0, 1, 0).applyQuaternion(camera.quaternion);
      return { position: foot.addScaledVector(up, size.h / 2), quaternion: camera.quaternion.clone(), size, rest: true };
    },
    pick(ndc, chapter) {
      if (chapter !== "made") return null;
      ray.setFromCamera(ndc, camera);
      const hit = ray.intersectObjects(plates.map((p) => p.item.mesh).filter((m) => m.parent?.visible), false)[0];
      return hit ? (hit.object.userData.project as Project) : null;
    },
    resize(aspect) { camera.aspect = aspect; camera.updateProjectionMatrix(); },
    dispose() {
      scene.traverse((o) => {
        const m = o as THREE.Mesh;
        m.geometry?.dispose();
        const mats = Array.isArray(m.material) ? m.material : m.material ? [m.material] : [];
        for (const x of mats) { (x as THREE.MeshBasicMaterial).map?.dispose(); x.dispose(); }
      });
    },
  };
  return world;
};
