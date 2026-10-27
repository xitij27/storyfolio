// Shared pieces for the three examples: the scroll, the words on screen,
// canvas pictures for textures, the map data and a project window.
import * as THREE from "three";
import { PEOPLE, CHAPTERS, captions } from "./people.js";

export { THREE, CHAPTERS };

export const C = {
  bg: "#0f1318",
  paper: "#f2ede2",
  paperDark: "#e3dccd",
  ink: "#1c222a",
  muted: "#6d7782",
  amber: "#e9a23b",
  teal: "#3fa796",
  rose: "#d8665a",
  blue: "#4c7fd1",
  line: "#c9c1b0",
};

export const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
export const lerp = (a, b, t) => a + (b - a) * t;
export const smooth = (a, b, x) => { const t = clamp((x - a) / (b - a)); return t * t * (3 - 2 * t); };
export const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

// ---------- The scroll ----------
// Chapter k owns [k, k + 1) of the scroll: it holds for the first HOLD of
// that, then moves to chapter k + 1. The last chapter only holds.
export const HOLD = 0.5;
const N = CHAPTERS.length;

export function stateAt(s) {
  s = clamp(s, 0, N - 1 + HOLD);
  const k = Math.min(Math.floor(s), N - 1);
  const f = s - k;
  if (k === N - 1 || f < HOLD) return { s, from: k, to: k, t: 0, raw: 0, local: clamp(f / HOLD) };
  const raw = (f - HOLD) / (1 - HOLD);
  return { s, from: k, to: k + 1, t: ease(raw), raw, local: 1 };
}

export function makeScroll() {
  const spacer = document.createElement("div");
  spacer.className = "spacer";
  document.body.appendChild(spacer);
  const unit = () => Math.max(window.innerHeight * 1.1, 600);
  const size = () => { spacer.style.height = `${(N - 1 + HOLD) * unit() + window.innerHeight}px`; };
  size();
  window.addEventListener("resize", size);
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let shown = window.scrollY / unit();
  return {
    target: () => window.scrollY / unit(),
    step() {
      const target = window.scrollY / unit();
      shown = reduce ? target : shown + (target - shown) * 0.14;
      if (Math.abs(target - shown) < 1e-4) shown = target;
      return stateAt(shown);
    },
    goTo(k) { window.scrollTo({ top: k * unit(), behavior: "smooth" }); },
  };
}

// ---------- Words on screen ----------
export function buildUI({ title, how, personKey, example }) {
  const person = PEOPLE[personKey];
  const words = captions(person);
  const ui = document.createElement("div");
  ui.className = "ui";
  ui.innerHTML = `
    <header class="bar">
      <a class="back" href="#">&larr; All examples</a>
      <div class="name"><b>${title}</b><span>${how}</span></div>
      <div class="controls">
        <span class="lbl">Person</span>
        ${Object.entries(PEOPLE).map(([k, p]) => `<a class="pill ${k === personKey ? "on" : ""}" href="#${example}/${k}">${p.first}</a>`).join("")}
        <button class="pill" data-hide>Hide words</button>
      </div>
    </header>
    <nav class="rail">${CHAPTERS.map((c, i) => `<button data-go="${i}"><i></i><span>${c.title}</span></button>`).join("")}</nav>
    <div class="cap"><div class="num"></div><h2></h2><p></p></div>
    <div class="hint">Scroll</div>`;
  document.body.appendChild(ui);
  const cap = ui.querySelector(".cap");
  const rail = [...ui.querySelectorAll(".rail button")];
  ui.querySelector("[data-hide]").addEventListener("click", (e) => {
    document.body.classList.toggle("nowords");
    e.target.textContent = document.body.classList.contains("nowords") ? "Show words" : "Hide words";
  });
  let current = -1;
  return {
    bindScroll(scroll) { rail.forEach((b, i) => b.addEventListener("click", () => scroll.goTo(i))); },
    update(st) {
      const near = st.t < 0.5 ? st.from : st.to;
      if (near !== current) {
        current = near;
        cap.querySelector(".num").textContent = String(near + 1).padStart(2, "0");
        cap.querySelector("h2").textContent = CHAPTERS[near].title;
        cap.querySelector("p").textContent = words[near];
        rail.forEach((b, i) => b.classList.toggle("on", i === near));
      }
      const fade = st.to === st.from ? 1 : 1 - smooth(0.05, 0.35, st.raw) + smooth(0.65, 0.95, st.raw);
      cap.style.opacity = fade.toFixed(3);
      ui.querySelector(".hint").style.opacity = st.s < 0.15 ? 1 : 0;
    },
  };
}

// ---------- The renderer ----------
export function makeStage({ fov = 35 } = {}) {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.setClearColor(0x000000, 0);
  renderer.domElement.className = "gl";
  document.body.appendChild(renderer.domElement);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(fov, 1, 0.05, 200);
  const stage = { renderer, scene, camera, aspect: 1, narrow: false };
  const resize = () => {
    const w = window.innerWidth, h = window.innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    stage.aspect = w / h;
    stage.narrow = w / h < 0.9;
  };
  resize();
  window.addEventListener("resize", resize);
  return stage;
}

/** Distance a camera must stand back to fit a box of width w and height h. */
export function fitDistance(camera, w, h) {
  const v = THREE.MathUtils.degToRad(camera.fov) / 2;
  return Math.max(h / 2 / Math.tan(v), w / 2 / (Math.tan(v) * camera.aspect));
}

// ---------- Pictures on canvases ----------
export async function fontsReady() {
  await Promise.all([
    document.fonts.load('600 40px "Fraunces"'),
    document.fonts.load('400 40px "Fraunces"'),
    document.fonts.load('italic 400 40px "Fraunces"'),
    document.fonts.load('400 40px "Inter"'),
    document.fonts.load('600 40px "Inter"'),
  ]).catch(() => {});
}

export function canvas(w, h, draw) {
  const el = document.createElement("canvas");
  el.width = w; el.height = h;
  const ctx = el.getContext("2d");
  draw(ctx, w, h);
  return el;
}

export function texture(el, renderer) {
  const tex = new THREE.CanvasTexture(el);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = renderer ? renderer.capabilities.getMaxAnisotropy() : 4;
  tex.generateMipmaps = true;
  tex.minFilter = THREE.LinearMipmapLinearFilter;
  return tex;
}

export const serif = (size, weight = 600, style = "") => `${style} ${weight} ${size}px "Fraunces", Georgia, serif`;
export const sans = (size, weight = 400) => `${weight} ${size}px "Inter", system-ui, sans-serif`;

/** Writes text wrapped to a width; returns the y below the last line. */
export function wrap(ctx, text, x, y, maxW, lineH, maxLines = 99) {
  const words = String(text).split(" ");
  let line = "", lines = 0;
  for (let i = 0; i < words.length; i++) {
    const test = line ? `${line} ${words[i]}` : words[i];
    if (ctx.measureText(test).width > maxW && line) {
      lines++;
      if (lines === maxLines) { ctx.fillText(`${line}...`, x, y); return y + lineH; }
      ctx.fillText(line, x, y);
      line = words[i];
      y += lineH;
    } else line = test;
  }
  if (line) { ctx.fillText(line, x, y); y += lineH; }
  return y;
}

export function rrect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

/** A small drawing that stands for a project, by its kind. */
export function miniPicture(ctx, kind, x, y, w, h, seed = 1) {
  ctx.save();
  ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip();
  ctx.fillStyle = "#e8e2d4"; ctx.fillRect(x, y, w, h);
  const rnd = (i) => { const v = Math.sin(seed * 91.7 + i * 12.9898) * 43758.5453; return v - Math.floor(v); };
  ctx.lineWidth = Math.max(2, w / 90);
  if (kind === "chart") {
    ctx.strokeStyle = "#c9c1b0";
    for (let i = 1; i < 4; i++) { ctx.beginPath(); ctx.moveTo(x, y + (h * i) / 4); ctx.lineTo(x + w, y + (h * i) / 4); ctx.stroke(); }
    ctx.strokeStyle = C.ink; ctx.beginPath();
    for (let i = 0; i <= 24; i++) { const px = x + (w * i) / 24, py = y + h * (0.65 - 0.3 * Math.sin(i / 3.5) * (0.6 + 0.4 * rnd(i))); i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); }
    ctx.stroke();
    ctx.strokeStyle = C.amber; ctx.setLineDash([w / 40, w / 60]); ctx.beginPath();
    for (let i = 16; i <= 24; i++) { const px = x + (w * i) / 24, py = y + h * (0.6 - 0.25 * Math.sin(i / 3.5)); i === 16 ? ctx.moveTo(px, py) : ctx.lineTo(px, py); }
    ctx.stroke(); ctx.setLineDash([]);
  } else if (kind === "photo") {
    const g = ctx.createLinearGradient(x, y, x, y + h);
    g.addColorStop(0, "#9cc3d9"); g.addColorStop(0.6, "#e8d4a8"); g.addColorStop(1, "#8a9a6a");
    ctx.fillStyle = g; ctx.fillRect(x, y, w, h);
    ctx.fillStyle = "#c46a4a"; ctx.fillRect(x + w * 0.15, y + h * 0.35, w * 0.25, h * 0.45);
    ctx.fillStyle = "#5d7f9a"; ctx.fillRect(x + w * 0.5, y + h * 0.25, w * 0.3, h * 0.55);
    ctx.fillStyle = "rgba(120,120,120,0.92)"; ctx.fillRect(x, y, w / 2, h);
    ctx.fillStyle = "#7a7a7a"; ctx.fillRect(x + w * 0.15, y + h * 0.35, w * 0.25, h * 0.45);
    ctx.strokeStyle = "#fff"; ctx.beginPath(); ctx.moveTo(x + w / 2, y); ctx.lineTo(x + w / 2, y + h); ctx.stroke();
  } else if (kind === "maze") {
    const n = 7, cw = w / n, ch = h / n;
    ctx.strokeStyle = C.ink;
    for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) {
      ctx.beginPath();
      if (rnd(i * 7 + j) > 0.5) { ctx.moveTo(x + i * cw, y + j * ch); ctx.lineTo(x + (i + 1) * cw, y + j * ch); }
      else { ctx.moveTo(x + i * cw, y + j * ch); ctx.lineTo(x + i * cw, y + (j + 1) * ch); }
      ctx.stroke();
    }
    ctx.strokeStyle = C.amber; ctx.lineWidth *= 1.6; ctx.beginPath();
    ctx.moveTo(x + cw / 2, y + ch / 2); ctx.lineTo(x + cw / 2, y + ch * 3.5); ctx.lineTo(x + cw * 3.5, y + ch * 3.5); ctx.lineTo(x + cw * 3.5, y + ch * 6.5); ctx.lineTo(x + cw * 6.5, y + ch * 6.5);
    ctx.stroke();
  } else if (kind === "route") {
    ctx.strokeStyle = "#d3cbb9";
    for (let i = 0; i < 9; i++) { ctx.beginPath(); ctx.moveTo(x, y + rnd(i) * h); ctx.lineTo(x + w, y + rnd(i + 20) * h); ctx.stroke(); }
    ctx.strokeStyle = C.teal; ctx.lineWidth *= 2; ctx.beginPath();
    ctx.moveTo(x + w * 0.1, y + h * 0.85);
    ctx.bezierCurveTo(x + w * 0.4, y + h * 0.9, x + w * 0.3, y + h * 0.3, x + w * 0.88, y + h * 0.18);
    ctx.stroke();
    ctx.fillStyle = C.rose; ctx.beginPath(); ctx.arc(x + w * 0.88, y + h * 0.18, w / 30, 0, Math.PI * 2); ctx.fill();
  } else if (kind === "bars") {
    for (let i = 0; i < 14; i++) {
      const bh = h * (0.15 + 0.35 * rnd(i)) * (i === 9 ? 1.9 : 1);
      ctx.fillStyle = i === 9 ? C.rose : "#9aa3ab";
      ctx.fillRect(x + (w * (i + 0.15)) / 14, y + h - bh - h * 0.08, (w / 14) * 0.7, bh);
    }
  } else {
    ctx.font = sans(h / 9);
    for (let i = 0; i < 5; i++) {
      const ly = y + h * (0.16 + i * 0.17);
      ctx.strokeStyle = C.ink; ctx.strokeRect(x + w * 0.1, ly, h / 12, h / 12);
      if (i < 2) { ctx.fillStyle = C.teal; ctx.fillRect(x + w * 0.1 + 3, ly + 3, h / 12 - 6, h / 12 - 6); }
      ctx.fillStyle = "#a59e90"; ctx.fillRect(x + w * 0.25, ly + h / 40, w * (0.35 + 0.3 * rnd(i)), h / 30);
    }
  }
  ctx.restore();
}

// ---------- Land ----------
let landPromise = null;
export function loadLand() {
  landPromise ??= fetch("/files/land.json").then((r) => r.json()).catch(() => ({ land: [], borders: [] }));
  return landPromise;
}

/** Fills the land with a projection that maps [lng, lat] to canvas [x, y]. */
export function fillLand(ctx, land, project) {
  ctx.beginPath();
  for (const ring of land.land) {
    for (let i = 0; i < ring.length; i += 2) {
      const [x, y] = project(ring[i], ring[i + 1]);
      i ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
    }
    ctx.closePath();
  }
  ctx.fill();
}

/** Draws the land as dots: a dot wherever the land covers the grid. */
export function dotLand(ctx, land, project, w, h, step, r, color, stretch = () => 1) {
  const mask = canvas(w, h, (m) => { m.fillStyle = "#000"; fillLand(m, land, project); });
  const data = mask.getContext("2d").getImageData(0, 0, w, h).data;
  ctx.fillStyle = color;
  for (let y = step / 2; y < h; y += step) {
    const sx = stretch(y);
    const xs = step * sx;
    for (let x = xs / 2; x < w; x += xs) {
      if (data[(Math.floor(y) * w + Math.floor(x)) * 4 + 3] > 100) {
        ctx.beginPath(); ctx.ellipse(x, y, r * sx, r, 0, 0, Math.PI * 2); ctx.fill();
      }
    }
  }
}

// ---------- A project window, opened on a click ----------
export function openProject(person, project) {
  let el = document.querySelector(".modal");
  if (!el) {
    el = document.createElement("div");
    el.className = "modal";
    el.addEventListener("click", (e) => { if (e.target === el || e.target.closest("[data-close]")) el.classList.remove("open"); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") el.classList.remove("open"); });
    document.body.appendChild(el);
  }
  const pic = canvas(800, 420, (ctx, w, h) => miniPicture(ctx, project.kind, 0, 0, w, h, project.title.length));
  el.innerHTML = `<div class="sheet"><button data-close aria-label="Close">&times;</button>
    <div class="pic"></div>
    <div class="body"><div class="eyebrow">${project.place}, ${project.year}</div><h3>${project.title}</h3><p>${project.line}</p>
    <p class="more">This is where the project's own page would be: the problem, how ${person.first} went about it, what it used and what came of it.</p>
    <div class="tags">${project.tags.map((t) => `<span>${t}</span>`).join("")}</div></div></div>`;
  el.querySelector(".pic").appendChild(pic);
  requestAnimationFrame(() => el.classList.add("open"));
}

/** Clicks on meshes that carry userData.project open that project. */
export function clickable(stage, meshes, person, active) {
  const ray = new THREE.Raycaster();
  const v = new THREE.Vector2();
  const pick = (e) => {
    const r = stage.renderer.domElement.getBoundingClientRect();
    v.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(v, stage.camera);
    const hit = ray.intersectObjects(meshes().filter((m) => m.visible), false)[0];
    return hit && hit.object.userData.project ? hit.object : null;
  };
  window.addEventListener("click", (e) => {
    if (!active() || e.target.closest(".ui, .modal")) return;
    const m = pick(e);
    if (m) openProject(person, m.userData.project);
  });
  window.addEventListener("mousemove", (e) => {
    document.body.style.cursor = active() && pick(e) ? "pointer" : "";
  });
}

/** A flat label that always faces the camera. */
export function label(text, { size = 40, color = C.ink, bg = null, font = sans(size, 600), pad = 14, height = 0.22 } = {}) {
  const probe = document.createElement("canvas").getContext("2d");
  probe.font = font;
  const w = Math.ceil(probe.measureText(text).width + pad * 2), h = Math.ceil(size * 1.5 + pad);
  const el = canvas(w, h, (ctx) => {
    if (bg) { ctx.fillStyle = bg; rrect(ctx, 0, 0, w, h, h / 2); ctx.fill(); }
    ctx.font = font; ctx.fillStyle = color; ctx.textBaseline = "middle"; ctx.fillText(text, pad, h / 2 + 2);
  });
  const tex = texture(el);
  const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false }));
  sprite.scale.set((height * w) / h, height, 1);
  return sprite;
}

/** The contact chapter's buttons, shown as it arrives. */
export function contactButtons(person) {
  const el = document.createElement("div");
  el.className = "cta";
  el.innerHTML = `<a href="mailto:${person.contact.email}">Email ${person.first}</a><a href="#" onclick="return false">Download CV</a>`;
  document.body.appendChild(el);
  return { update(o) { el.style.opacity = o.toFixed(3); el.style.pointerEvents = o > 0.5 ? "auto" : "none"; } };
}

export function personFrom(key) { return PEOPLE[key] ?? PEOPLE.noa; }
