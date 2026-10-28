// The stage: follows the scroll, builds the worlds a mix uses, and each
// frame draws the world that holds the story. Two chapters in one world
// join by that world's own move; in two worlds, by a dive. Browser only.
import * as THREE from "three";
import type { ChapterKey } from "./chapters.ts";
import { chaptersFor, type Person, type Project } from "./person.ts";
import { chaptersOf, worldsOf, type Mix, type WorldId } from "./mix.ts";
import { follow, stateAt, totalUnits, unitPx, type ScrollState } from "./scroll.ts";
import { loadLand } from "./land.ts";
import { holding, type World, type WorldFactory } from "./world.ts";
import { diveSteps, fillPose } from "./dive.ts";
import { createSheet } from "./sheet.ts";
import { createMap } from "./map.ts";

const FACTORIES: Partial<Record<WorldId, WorldFactory>> = { sheet: createSheet, map: createMap };

export type StitchOptions = {
  person: Person;
  mix: Mix;
  /** The element whose height is the story's scrolling; made after the canvas when not given. */
  spacer?: HTMLElement;
  onState?: (st: ScrollState, keys: ChapterKey[]) => void;
  onProject?: (p: Project) => void;
};
export type Stitch = { dispose(): void; goTo(index: number): void };

/** What scripts/stitch-check.mjs reads. One story per page. */
type Probe = {
  ready: boolean; error?: string; keys: ChapterKey[];
  unit(): number; top(): number; sample(): number; state(): ScrollState | null;
};
declare global { interface Window { __stitch?: Probe } }

export async function mountStitch(canvas: HTMLCanvasElement, o: StitchOptions): Promise<Stitch> {
  const keys = chaptersFor(o.person);
  const probe: Probe = { ready: false, keys, unit: () => unitPx(window.innerHeight), top: () => 0, sample: () => 0, state: () => null };
  window.__stitch = probe;
  try {
    return await mount(canvas, o, keys, probe);
  } catch (e) {
    probe.error = e instanceof Error ? e.message : String(e);
    throw e;
  }
}

function spacerOf(canvas: HTMLCanvasElement, o: StitchOptions): HTMLElement {
  if (o.spacer) return o.spacer;
  const el = document.createElement("div");
  el.className = "spacer";
  canvas.after(el);
  return el;
}

async function mount(canvas: HTMLCanvasElement, o: StitchOptions, keys: ChapterKey[], probe: Probe): Promise<Stitch> {
  const n = keys.length;
  for (const id of worldsOf(o.mix, keys)) if (!FACTORIES[id]) throw new Error(`No world: ${id}`);

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  const spacer = spacerOf(canvas, o);
  const narrow = () => canvas.clientWidth / Math.max(1, canvas.clientHeight) < 0.9;
  const land = await loadLand();
  const env = { person: o.person, renderer, land, narrow };

  const worlds = new Map<WorldId, World>();
  for (const id of worldsOf(o.mix, keys)) worlds.set(id, await FACTORIES[id]!(env, chaptersOf(o.mix, keys, id)));
  const worldAt = (k: ChapterKey) => worlds.get(o.mix[k])!;

  const unit = () => unitPx(window.innerHeight);
  const top = () => spacer.getBoundingClientRect().top + window.scrollY;
  const target = () => (window.scrollY - top()) / unit();

  // The window a dive opens: the next world drawn into a picture the size of
  // the screen, on a plane in the last world that the camera flies into.
  const view = new THREE.WebGLRenderTarget(1, 1, { type: THREE.HalfFloatType, samples: 4 });
  const window_ = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1),
    new THREE.MeshBasicMaterial({ map: view.texture, transparent: true, depthTest: false, depthWrite: false, toneMapped: false }),
  );
  window_.renderOrder = 1000;
  window_.frustumCulled = false;
  let aspect = 1;

  const resize = () => {
    const w = canvas.clientWidth || window.innerWidth, h = canvas.clientHeight || window.innerHeight;
    renderer.setSize(w, h, false);
    aspect = w / h;
    const size = renderer.getDrawingBufferSize(new THREE.Vector2());
    view.setSize(size.x, size.y);
    for (const world of worlds.values()) world.resize(aspect);
    spacer.style.height = `${totalUnits(n) * unit() + window.innerHeight}px`;
  };
  resize();
  window.addEventListener("resize", resize);

  const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let shown = Math.max(0, target());
  let last = performance.now();

  let current: ScrollState | null = null;

  /** Poses and draws the story standing at s. */
  function draw(s: number, time: number) {
    const st = stateAt(s, n);
    current = st;
    const a = keys[st.from], b = keys[st.to];
    const wa = worldAt(a);
    window_.removeFromParent();
    if (st.from === st.to) wa.pose(holding(a, st.local, time));
    else if (o.mix[a] === o.mix[b]) wa.pose({ from: a, to: b, t: st.t, raw: st.raw, local: 1, time });
    else dive(wa, a, worldAt(b), b, st.raw);
    renderer.setRenderTarget(null);
    renderer.render(wa.scene, wa.camera);
    window_.removeFromParent();
    o.onState?.(st, keys);
  }

  const p0 = new THREE.Vector3(), q0 = new THREE.Quaternion(), normal = new THREE.Vector3();
  /** Poses a dive from world A holding chapter a into world B at chapter b, ready to draw A. */
  function dive(wa: World, a: ChapterKey, wb: World, b: ChapterKey, raw: number) {
    // B as it will first be seen, into the window's picture.
    wb.pose(holding(b, 0));
    renderer.setRenderTarget(view);
    renderer.render(wb.scene, wb.camera);
    renderer.setRenderTarget(null);
    // A holds; the window opens at its anchor, and the camera flies into it.
    const anchor = wa.anchor(a);
    const { fade, fly } = diveSteps(raw);
    window_.position.copy(anchor.position);
    window_.quaternion.copy(anchor.quaternion);
    window_.scale.set(anchor.height * aspect, anchor.height, 1);
    window_.material.opacity = fade;
    wa.scene.add(window_);
    normal.set(0, 0, 1).applyQuaternion(anchor.quaternion);
    const end = fillPose({ position: anchor.position.toArray(), normal: normal.toArray() }, wa.camera.fov, anchor.height);
    p0.copy(wa.camera.position); q0.copy(wa.camera.quaternion);
    wa.camera.position.lerpVectors(p0, new THREE.Vector3(...end), fly);
    wa.camera.quaternion.slerpQuaternions(q0, anchor.quaternion, fly);
    wa.camera.updateMatrixWorld();
  }

  let raf = 0;
  const frame = (now: number) => {
    const dt = Math.min(0.1, (now - last) / 1000);
    last = now;
    shown = follow(shown, Math.max(0, target()), dt, motion.matches);
    draw(shown, now / 1000);
    raf = requestAnimationFrame(frame);
  };

  const ndcOf = (e: MouseEvent) => {
    const r = canvas.getBoundingClientRect();
    return new THREE.Vector2(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
  };
  const projectAt = (e: MouseEvent) => {
    if (!current || current.from !== current.to) return null;
    const k = keys[current.from];
    return worldAt(k).pick(ndcOf(e), k);
  };
  const onClick = (e: MouseEvent) => { const p = projectAt(e); if (p) o.onProject?.(p); };
  const onMove = (e: MouseEvent) => { canvas.style.cursor = projectAt(e) ? "pointer" : ""; };
  canvas.addEventListener("click", onClick);
  canvas.addEventListener("mousemove", onMove);

  // For the check: draws now and says what share of the picture differs clearly from its corner.
  probe.sample = () => {
    draw(shown, performance.now() / 1000);
    const gl = renderer.getContext();
    const w = gl.drawingBufferWidth, h = gl.drawingBufferHeight;
    const px = new Uint8Array(w * h * 4);
    gl.readPixels(0, 0, w, h, gl.RGBA, gl.UNSIGNED_BYTE, px);
    let differ = 0, all = 0;
    for (let y = 2; y < h; y += Math.max(1, Math.floor(h / 60))) {
      for (let x = 2; x < w; x += Math.max(1, Math.floor(w / 80))) {
        const i = (y * w + x) * 4;
        const d = Math.abs(px[i] - px[0]) + Math.abs(px[i + 1] - px[1]) + Math.abs(px[i + 2] - px[2]);
        all++; if (d > 90) differ++;
      }
    }
    return differ / all;
  };

  probe.top = top;
  probe.state = () => current;
  draw(shown, performance.now() / 1000);
  raf = requestAnimationFrame(frame);
  probe.ready = true;

  return {
    goTo(index: number) {
      window.scrollTo({ top: top() + index * unit(), behavior: motion.matches ? "auto" : "smooth" });
    },
    dispose() {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("click", onClick);
      canvas.removeEventListener("mousemove", onMove);
      for (const world of worlds.values()) world.dispose();
      view.dispose();
      window_.geometry.dispose();
      window_.material.dispose();
      renderer.dispose();
      if (window.__stitch === probe) delete window.__stitch;
    },
  };
}
