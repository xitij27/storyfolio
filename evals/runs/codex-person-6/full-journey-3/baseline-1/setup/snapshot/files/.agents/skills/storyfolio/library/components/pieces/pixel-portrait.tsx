"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

type Dot = { x: number; y: number; r: number; colour: string; dx: number; dy: number };

/**
 * A picture redrawn as a grid of coloured dots, inside a circle, that part
 * round the pointer and settle back. The idea of Aceternity's Pixelated
 * Canvas, written here from scratch.
 */
export function PixelPortrait({
  src,
  alt,
  size = 112,
  cell = 4,
  tint,
  className,
}: {
  src: string;
  alt: string;
  /** Width and height in CSS pixels. */
  size?: number;
  /** Distance between dots in CSS pixels. */
  cell?: number;
  /** A colour mixed a little into every dot. */
  tint?: string;
  className?: string;
}) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = canvas.current;
    const ctx = el?.getContext("2d");
    if (!el || !ctx) return;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    el.width = el.height = size * dpr;
    ctx.scale(dpr, dpr);

    let dots: Dot[] = [];
    let frame = 0;
    const pointer = { x: -1e3, y: -1e3 };

    const image = new Image();
    image.onload = () => {
      // Sample the picture once at one pixel per cell: each pixel is that cell's average.
      const n = Math.floor(size / cell);
      const sample = document.createElement("canvas");
      sample.width = sample.height = n;
      const s = sample.getContext("2d", { willReadFrequently: true });
      if (!s) return;
      s.drawImage(image, 0, 0, n, n);
      const data = s.getImageData(0, 0, n, n).data;
      dots = [];
      for (let y = 0; y < n; y++) {
        for (let x = 0; x < n; x++) {
          const cx = (x + 0.5) * cell;
          const cy = (y + 0.5) * cell;
          if (Math.hypot(cx - size / 2, cy - size / 2) > size / 2 - cell / 2) continue;
          const k = (y * n + x) * 4;
          if (data[k + 3] < 20) continue;
          dots.push({ x: cx, y: cy, r: cell * 0.42, colour: `rgb(${data[k]} ${data[k + 1]} ${data[k + 2]})`, dx: 0, dy: 0 });
        }
      }
      draw();
    };
    image.src = src;

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, size, size);
      let moving = false;
      for (const d of dots) {
        // Pushed away from the pointer within 30 px, then eased back home.
        const px = d.x - pointer.x;
        const py = d.y - pointer.y;
        const dist = Math.hypot(px, py);
        const push = dist < 30 && !reduce ? (30 - dist) / 30 : 0;
        d.dx += ((push * px) / (dist || 1) * 10 - d.dx) * 0.2;
        d.dy += ((push * py) / (dist || 1) * 10 - d.dy) * 0.2;
        if (Math.abs(d.dx) + Math.abs(d.dy) > 0.05) moving = true;
        ctx.fillStyle = d.colour;
        ctx.beginPath();
        ctx.arc(d.x + d.dx, d.y + d.dy, d.r, 0, Math.PI * 2);
        ctx.fill();
      }
      if (tint) {
        ctx.globalCompositeOperation = "source-atop";
        ctx.globalAlpha = 0.15;
        ctx.fillStyle = tint;
        ctx.fillRect(0, 0, size, size);
        ctx.globalAlpha = 1;
        ctx.globalCompositeOperation = "source-over";
      }
      frame = moving ? requestAnimationFrame(draw) : 0;
    }

    const move = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      if (!frame) frame = requestAnimationFrame(draw);
    };
    const leave = () => {
      pointer.x = pointer.y = -1e3;
      if (!frame) frame = requestAnimationFrame(draw);
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, [src, size, cell, tint, reduce]);

  return (
    <canvas
      ref={canvas}
      role="img"
      aria-label={alt}
      style={{ width: size, height: size }}
      className={cn("shrink-0 rounded-full", className)}
    />
  );
}
