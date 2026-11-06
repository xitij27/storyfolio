"use client";
/*
  A project's cover when it has no screenshot: a small drawing of what the
  project does (a maze and its path, a forecast, a list), on the story's
  paper, in place of a coloured block with the title on it. Colours are the
  --cover-* tokens in globals.css.
*/
import { useEffect, useRef } from "react";

type Kind = "maze" | "cells" | "photo" | "chart" | "list" | "bars" | "route";

/** What each of the sample person's projects is drawn as. A person's own projects add theirs. */
const KIND: Record<string, Kind> = {
  "maze-robot": "maze",
  "toy-cipher": "cells",
  "photo-colouriser": "photo",
  "delay-forecast": "chart",
  "shopping-list": "list",
  "log-watch": "bars",
  "route-planner": "route",
};

const rand = (seed: number, i: number) => {
  const x = Math.sin(seed * 9301 + i * 49297) * 233280;
  return x - Math.floor(x);
};

function draw(ctx: CanvasRenderingContext2D, kind: Kind, w: number, h: number, seed: number) {
  const css = getComputedStyle(document.documentElement);
  const c = (n: string) => css.getPropertyValue(n).trim();
  const paper = c("--cover-paper"), ink = c("--cover-ink"), rule = c("--cover-rule");
  const amber = c("--cover-amber"), teal = c("--cover-teal"), rose = c("--cover-rose");
  const r = (i: number) => rand(seed, i);
  ctx.fillStyle = paper; ctx.fillRect(0, 0, w, h);
  const pad = Math.round(w * 0.08), x0 = pad, y0 = pad, cw = w - 2 * pad, ch = h - 2 * pad;
  ctx.lineWidth = Math.max(2, w / 160); ctx.lineCap = "round"; ctx.lineJoin = "round";

  if (kind === "chart") {
    ctx.strokeStyle = rule;
    for (let i = 1; i < 4; i++) { ctx.beginPath(); ctx.moveTo(x0, y0 + (ch * i) / 4); ctx.lineTo(x0 + cw, y0 + (ch * i) / 4); ctx.stroke(); }
    const pt = (i: number) => [x0 + (cw * i) / 24, y0 + ch * (0.6 - 0.3 * Math.sin(i / 3.4) * (0.6 + 0.4 * r(i)))] as const;
    ctx.strokeStyle = ink; ctx.beginPath();
    for (let i = 0; i <= 17; i++) { const [px, py] = pt(i); if (i) ctx.lineTo(px, py); else ctx.moveTo(px, py); }
    ctx.stroke();
    ctx.strokeStyle = amber; ctx.setLineDash([w / 50, w / 70]); ctx.beginPath();
    for (let i = 17; i <= 24; i++) { const [px, py] = pt(i); if (i > 17) ctx.lineTo(px, py); else ctx.moveTo(px, py); }
    ctx.stroke(); ctx.setLineDash([]);
  } else if (kind === "bars") {
    const n = 14, bw = cw / n;
    for (let i = 0; i < n; i++) {
      const bh = ch * (i === 9 ? 0.95 : 0.25 + 0.45 * r(i));
      ctx.fillStyle = i === 9 ? rose : rule;
      ctx.fillRect(x0 + i * bw + bw * 0.15, y0 + ch - bh, bw * 0.7, bh);
    }
  } else if (kind === "maze") {
    const cols = 9, rows = 5, s = Math.min(cw / cols, ch / rows), mx = x0 + (cw - s * cols) / 2, my = y0 + (ch - s * rows) / 2;
    ctx.strokeStyle = ink;
    ctx.strokeRect(mx, my, s * cols, s * rows);
    for (let i = 0; i < cols * rows; i++) {
      const cx = mx + (i % cols) * s, cy = my + Math.floor(i / cols) * s;
      ctx.beginPath();
      if (r(i) > 0.55) { ctx.moveTo(cx + s, cy); ctx.lineTo(cx + s, cy + s); } else if (r(i + 99) > 0.5) { ctx.moveTo(cx, cy + s); ctx.lineTo(cx + s, cy + s); }
      ctx.stroke();
    }
    ctx.strokeStyle = amber; ctx.lineWidth *= 1.6; ctx.beginPath();
    ctx.moveTo(mx + s / 2, my + s / 2); ctx.lineTo(mx + s * 3.5, my + s / 2); ctx.lineTo(mx + s * 3.5, my + s * 2.5);
    ctx.lineTo(mx + s * 6.5, my + s * 2.5); ctx.lineTo(mx + s * 6.5, my + s * 4.5); ctx.lineTo(mx + s * 8.5, my + s * 4.5);
    ctx.stroke();
  } else if (kind === "cells") {
    const cols = 16, rows = 6, s = Math.min(cw / cols, ch / rows) * 0.86, gap = s * 0.16;
    const mx = x0 + (cw - cols * (s + gap)) / 2, my = y0 + (ch - rows * (s + gap)) / 2;
    for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) {
      const spread = Math.abs(x - 7.5) < (y + 1) * 1.4; // one flipped bit spreading row by row
      ctx.fillStyle = spread && r(y * cols + x) > 0.35 ? amber : r(y * cols + x + 500) > 0.5 ? ink : rule;
      ctx.fillRect(mx + x * (s + gap), my + y * (s + gap), s, s);
    }
  } else if (kind === "photo") {
    const half = cw / 2;
    for (let i = 0; i < 2; i++) {
      const px = x0 + i * half + (i ? 6 : 0), pw = half - 6;
      // The same street, grey and then coloured: sky, ground, a house.
      ctx.fillStyle = c(i ? "--cover-sky" : "--cover-grey-1"); ctx.fillRect(px, y0, pw, ch * 0.6);
      ctx.fillStyle = c(i ? "--cover-leaf" : "--cover-grey-2"); ctx.fillRect(px, y0 + ch * 0.6, pw, ch * 0.4);
      ctx.fillStyle = c(i ? "--cover-sand" : "--cover-grey-3"); ctx.fillRect(px + pw * 0.25, y0 + ch * 0.32, pw * 0.3, ch * 0.48);
    }
  } else if (kind === "list") {
    const n = 5, lh = ch / n;
    for (let i = 0; i < n; i++) {
      const y = y0 + i * lh + lh * 0.2, box = lh * 0.5;
      ctx.strokeStyle = ink; ctx.strokeRect(x0, y, box, box);
      if (i < 2) { ctx.fillStyle = teal; ctx.fillRect(x0 + box * 0.2, y + box * 0.2, box * 0.6, box * 0.6); }
      ctx.fillStyle = i < 2 ? rule : ink;
      ctx.fillRect(x0 + box * 1.8, y + box * 0.35, cw * (0.35 + 0.35 * r(i)), box * 0.3);
    }
  } else {
    ctx.strokeStyle = rule;
    for (let i = 0; i < 7; i++) { ctx.beginPath(); ctx.moveTo(x0, y0 + ch * r(i)); ctx.bezierCurveTo(x0 + cw * 0.3, y0 + ch * r(i + 7), x0 + cw * 0.6, y0 + ch * r(i + 14), x0 + cw, y0 + ch * r(i + 21)); ctx.stroke(); }
    ctx.strokeStyle = teal; ctx.lineWidth *= 2; ctx.beginPath();
    ctx.moveTo(x0, y0 + ch * 0.8); ctx.bezierCurveTo(x0 + cw * 0.35, y0 + ch * 0.85, x0 + cw * 0.5, y0 + ch * 0.2, x0 + cw * 0.92, y0 + ch * 0.25); ctx.stroke();
    ctx.fillStyle = rose; ctx.beginPath(); ctx.arc(x0 + cw * 0.92, y0 + ch * 0.25, w / 60, 0, Math.PI * 2); ctx.fill();
  }
}

export function ProjectCover({ id, className }: { id: string; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const paint = () => {
      const { width, height } = el.getBoundingClientRect();
      if (!width || !height) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      el.width = Math.round(width * dpr); el.height = Math.round(height * dpr);
      const ctx = el.getContext("2d");
      if (ctx) draw(ctx, KIND[id] ?? "chart", el.width, el.height, id.length);
    };
    paint();
    const ro = new ResizeObserver(paint);
    ro.observe(el);
    return () => ro.disconnect();
  }, [id]);
  return <canvas ref={ref} aria-hidden="true" className={className} />;
}
