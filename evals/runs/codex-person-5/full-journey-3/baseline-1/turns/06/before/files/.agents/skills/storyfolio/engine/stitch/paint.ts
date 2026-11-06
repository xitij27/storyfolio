// Pictures drawn on canvases for the worlds' textures, and the colours they
// share. Browser only.
import * as THREE from "three";

import { groundTones, type Palette } from "./look.ts";

/** System fonts, so a site builds with no remote fonts. */
export const serif = (size: number, weight = 600, style = "") => `${style} ${weight} ${size}px Georgia, "Times New Roman", serif`;
export const sans = (size: number, weight = 400) => `${weight} ${size}px system-ui, sans-serif`;

export function canvas(w: number, h: number, draw: (ctx: CanvasRenderingContext2D, w: number, h: number) => void): HTMLCanvasElement {
  const el = document.createElement("canvas");
  el.width = w; el.height = h;
  draw(el.getContext("2d")!, w, h);
  return el;
}

export function texture(el: HTMLCanvasElement, renderer?: THREE.WebGLRenderer): THREE.CanvasTexture {
  const tex = new THREE.CanvasTexture(el);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = renderer ? renderer.capabilities.getMaxAnisotropy() : 4;
  tex.generateMipmaps = true;
  tex.minFilter = THREE.LinearMipmapLinearFilter;
  return tex;
}

/** Writes text wrapped to a width; returns the y below the last line. */
export function wrap(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxW: number, lineH: number, maxLines = 99): number {
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

export function rrect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

/** A repeatable random number in [0, 1) for a seed and an index. */
export const rand = (seed: number, i: number) => { const v = Math.sin(seed * 91.7 + i * 12.9898) * 43758.5453; return v - Math.floor(v); };

/** A small drawing that stands for a project, by its kind. */
export function miniPicture(ctx: CanvasRenderingContext2D, C: Palette, kind: string, x: number, y: number, w: number, h: number, seed = 1) {
  ctx.save();
  ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip();
  ctx.fillStyle = "#e8e2d4"; ctx.fillRect(x, y, w, h);
  const rnd = (i: number) => rand(seed, i);
  ctx.lineWidth = Math.max(2, w / 90);
  if (kind === "chart") {
    ctx.strokeStyle = "#c9c1b0";
    for (let i = 1; i < 4; i++) { ctx.beginPath(); ctx.moveTo(x, y + (h * i) / 4); ctx.lineTo(x + w, y + (h * i) / 4); ctx.stroke(); }
    ctx.strokeStyle = C.ink; ctx.beginPath();
    for (let i = 0; i <= 24; i++) { const px = x + (w * i) / 24, py = y + h * (0.65 - 0.3 * Math.sin(i / 3.5) * (0.6 + 0.4 * rnd(i))); if (i) ctx.lineTo(px, py); else ctx.moveTo(px, py); }
    ctx.stroke();
    ctx.strokeStyle = C.amber; ctx.setLineDash([w / 40, w / 60]); ctx.beginPath();
    for (let i = 16; i <= 24; i++) { const px = x + (w * i) / 24, py = y + h * (0.6 - 0.25 * Math.sin(i / 3.5)); if (i === 16) ctx.moveTo(px, py); else ctx.lineTo(px, py); }
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

/** Paper's fleck, the same for the same seed so a picture does not change between visits. */
export function grain(ctx: CanvasRenderingContext2D, w: number, h: number, n = 9000, seed = 7) {
  for (let i = 0; i < n; i++) {
    ctx.fillStyle = rand(seed, i * 3) < 0.5 ? "rgba(90,70,40,0.05)" : "rgba(255,255,255,0.06)";
    ctx.fillRect(rand(seed, i * 3 + 1) * w, rand(seed, i * 3 + 2) * h, 2, 2);
  }
}

export type DieCut = HTMLCanvasElement & { edge: number };

/** A cut-out with a white card edge round it, as if die-cut from printed card. */
export function dieCut(src: HTMLCanvasElement, C: Palette, r = 12): DieCut {
  const sil = canvas(src.width, src.height, (c) => {
    c.drawImage(src, 0, 0);
    c.globalCompositeOperation = "source-in";
    c.fillStyle = C.card; c.fillRect(0, 0, src.width, src.height);
  });
  const out = canvas(src.width + 2 * r, src.height + 2 * r, (ctx) => {
    for (let a = 0; a < 24; a++) ctx.drawImage(sil, r + Math.cos((a / 24) * Math.PI * 2) * r, r + Math.sin((a / 24) * Math.PI * 2) * r);
    ctx.drawImage(sil, r, r);
    ctx.drawImage(src, r, r);
  }) as DieCut;
  out.edge = r;
  return out;
}

/** A flat label that always faces the camera. */
export function label(text: string, { size = 40, color = "#ffffff", bg = null as string | null, font = "", pad = 14, height = 0.22 } = {}): THREE.Sprite {
  const f = font || sans(size, 600);
  const probe = document.createElement("canvas").getContext("2d")!;
  probe.font = f;
  const w = Math.ceil(probe.measureText(text).width + pad * 2), h = Math.ceil(size * 1.5 + pad);
  const el = canvas(w, h, (ctx) => {
    if (bg) { ctx.fillStyle = bg; rrect(ctx, 0, 0, w, h, h / 2); ctx.fill(); }
    ctx.font = f; ctx.fillStyle = color; ctx.textBaseline = "middle"; ctx.fillText(text, pad, h / 2 + 2);
  });
  const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: texture(el), transparent: true, depthWrite: false }));
  sprite.scale.set((height * w) / h, height, 1);
  return sprite;
}

/** The backdrop behind a world, darker towards its edges, in the look's ground. */
export function backdrop(C: Palette): HTMLCanvasElement {
  const t = groundTones(C);
  return canvas(1024, 640, (ctx, w, h) => {
    const g = ctx.createRadialGradient(w / 2, h * 0.38, 0, w / 2, h * 0.38, w * 0.62);
    g.addColorStop(0, t.centre); g.addColorStop(0.55, t.middle); g.addColorStop(1, t.edge);
    ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
  });
}
