"use client";

import { useEffect, useRef } from "react";

import { use2DFigure, ease, monoFont, type Draw2D } from "@/components/figures/canvas2d";
import { MAZE, MAZE_HEIGHT, MAZE_WIDTH, SOLVE } from "@/lib/maze";
import { cn } from "@/lib/utils";

/**
 * Fills a slide in the project modal's carousel. The side padding keeps the
 * drawing clear of the carousel's arrows, and the bottom padding clears its
 * dots, so neither ever sits on top of a label.
 */
function FigureFrame({
  canvasRef,
  label,
  caption,
  canvasClassName,
  children,
}: {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  label: string;
  caption: string;
  canvasClassName?: string;
  /** A control for the figure, placed ahead of the canvas as its `peer`. */
  children?: React.ReactNode;
}) {
  return (
    <figure className="fig flex h-full flex-col px-12 pt-4">
      {children}
      <canvas
        ref={canvasRef}
        role="img"
        aria-label={label}
        className={cn("block min-h-0 w-full flex-1 touch-pan-y", canvasClassName)}
      />
      <figcaption className="pb-7 pt-2 text-center font-mono text-[11px] leading-snug text-muted-foreground">
        {caption}
      </figcaption>
    </figure>
  );
}

/* ============ FEAL: a differential propagating through the network ============
   Schematic, not an implementation. The round function here is a fixed
   rotate-and-xor, not FEAL's, and the point is the shape of the thing: a
   one-bit input difference spreading across the state round by round, which is
   what differential cryptanalysis watches. The caption says so.
*/

const ROUNDS = 6;
const rol = (x: number, n: number) => ((x << n) | (x >>> (8 - n))) & 0xff;
const F = (x: number) => (rol(x, 1) ^ rol(x, 3) ^ 0x0b) & 0xff;

/** Difference state per round, computed once. */
const DIFFS: { l: number; r: number }[] = (() => {
  const out = [{ l: 0x80, r: 0x00 }];
  for (let i = 0; i < ROUNDS; i++) {
    const { l, r } = out[out.length - 1];
    out.push({ l: r, r: (l ^ F(r)) & 0xff });
  }
  return out;
})();

const drawFeistel: Draw2D = (f) => {
  const { ctx, w, h, T } = f;
  ctx.clearRect(0, 0, w, h);
  const e = ease(f.boot);

  const padX = 34, padTop = 14, padBot = 16;
  const rowH = (h - padTop - padBot) / DIFFS.length;
  const cell = Math.min(9, (w - padX * 2 - 22) / 16);
  const gap = 14;
  const halfW = cell * 8;
  const lx = padX;
  const rx = padX + halfW + gap;

  // how many rounds are revealed, looping
  const reveal = e < 1 ? 0 : ((f.t * 0.55) % (DIFFS.length + 2));

  ctx.font = monoFont(T, 8);
  ctx.textBaseline = "middle";

  for (let i = 0; i < DIFFS.length; i++) {
    const y = padTop + i * rowH;
    const cy = y + rowH * 0.42;
    const shown = reveal - i;
    if (shown <= 0) continue;
    const a = Math.min(1, shown);

    ctx.globalAlpha = a;
    ctx.textAlign = "right";
    ctx.fillStyle = T.ink2;
    ctx.fillText(i === 0 ? "IN" : `R${i}`, padX - 6, cy);

    for (const [ox, val] of [[lx, DIFFS[i].l], [rx, DIFFS[i].r]] as const) {
      for (let b = 0; b < 8; b++) {
        const on = (val >> (7 - b)) & 1;
        const bx = ox + b * cell;
        if (on) {
          ctx.fillStyle = T.signal;
          ctx.fillRect(bx + 0.5, cy - cell / 2 + 0.5, cell - 1, cell - 1);
        } else {
          ctx.strokeStyle = T.rule;
          ctx.lineWidth = 1;
          ctx.strokeRect(bx + 0.5, cy - cell / 2 + 0.5, cell - 1, cell - 1);
        }
      }
    }

    // the round wiring: R feeds F, result xors into L, halves swap
    if (i < DIFFS.length - 1 && shown > 0.6) {
      const ny = padTop + (i + 1) * rowH + rowH * 0.42;
      const my = (cy + ny) / 2;
      ctx.strokeStyle = T.rule;
      ctx.lineWidth = 1;
      ctx.globalAlpha = a * 0.9;
      ctx.beginPath();
      ctx.moveTo(lx + halfW / 2, cy + cell / 2);
      ctx.lineTo(rx + halfW / 2, ny - cell / 2);
      ctx.moveTo(rx + halfW / 2, cy + cell / 2);
      ctx.lineTo(lx + halfW / 2, ny - cell / 2);
      ctx.stroke();
      ctx.fillStyle = T.paper;
      ctx.strokeStyle = T.trace;
      ctx.beginPath();
      ctx.arc(rx + halfW / 2, my, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = T.trace;
      ctx.textAlign = "center";
      ctx.fillText("F", rx + halfW / 2, my + 0.5);
    }
  }
  ctx.globalAlpha = 1;

  ctx.font = monoFont(T, 8);
  ctx.fillStyle = T.ink2;
  ctx.textAlign = "left";
  ctx.textBaseline = "bottom";
  ctx.fillText("ΔL", lx, padTop - 3);
  ctx.fillText("ΔR", rx, padTop - 3);
  const bits = DIFFS[Math.max(0, Math.min(DIFFS.length - 1, Math.floor(reveal) - 1))];
  const active = (bits.l.toString(2).split("1").length - 1) + (bits.r.toString(2).split("1").length - 1);
  ctx.textAlign = "right";
  ctx.fillText(`${active}/16 BITS ACTIVE`, w - 2, h - 2);
};

export function FeistelFigure({
  label,
  caption,
}: {
  label: string;
  caption: string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  use2DFigure(ref, drawFeistel, { bootSeconds: 0.8 });
  return (
    <FigureFrame
      canvasRef={ref}
      label={label}
      caption={caption}
    />
  );
}

/* ============ maze: the self-navigating robot ============ */

// The maze and its solution are shared with the 3D exhibit in the V3 paper.
const MW = MAZE_WIDTH, MH = MAZE_HEIGHT;

const drawMaze: Draw2D = (f) => {
  const { ctx, w, h, T } = f;
  ctx.clearRect(0, 0, w, h);
  const e = ease(f.boot);

  const pad = 10;
  const cw = Math.min((w - pad * 2) / MW, (h - pad * 2 - 12) / MH);
  const ox = (w - cw * MW) / 2, oy = (h - 12 - cw * MH) / 2;
  const cx = (i: number) => ox + (i % MW) * cw;
  const cy = (i: number) => oy + ((i / MW) | 0) * cw;

  // phases: explore, then run, then hold, then loop
  const CYCLE = 9;
  const p = e < 1 ? 0 : (f.t % CYCLE) / CYCLE;
  const explored = Math.min(1, p / 0.45) * SOLVE.order.length;
  const runT = Math.max(0, Math.min(1, (p - 0.5) / 0.4));

  // visited cells
  ctx.fillStyle = T.rule2;
  for (let i = 0; i < Math.floor(explored); i++) {
    const c = SOLVE.order[i];
    ctx.fillRect(cx(c) + 1, cy(c) + 1, cw - 2, cw - 2);
  }

  // walls
  ctx.strokeStyle = T.ink2;
  ctx.lineWidth = 1;
  ctx.globalAlpha = 0.85;
  ctx.beginPath();
  for (let i = 0; i < MW * MH; i++) {
    const x = cx(i), y = cy(i), m = MAZE[i];
    if (m & 1) { ctx.moveTo(x, y); ctx.lineTo(x + cw, y); }
    if (m & 2) { ctx.moveTo(x + cw, y); ctx.lineTo(x + cw, y + cw); }
    if (m & 4) { ctx.moveTo(x, y + cw); ctx.lineTo(x + cw, y + cw); }
    if (m & 8) { ctx.moveTo(x, y); ctx.lineTo(x, y + cw); }
  }
  ctx.stroke();
  ctx.globalAlpha = 1;

  // solved path
  if (runT > 0) {
    const upTo = Math.max(1, Math.floor(SOLVE.path.length * runT));
    ctx.strokeStyle = T.trace;
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    for (let i = 0; i < upTo; i++) {
      const c = SOLVE.path[i];
      const px = cx(c) + cw / 2, py = cy(c) + cw / 2;
      if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
    }
    ctx.stroke();

    // the robot, with sensor whiskers along its open sides
    const c = SOLVE.path[upTo - 1];
    const rx = cx(c) + cw / 2, ry = cy(c) + cw / 2;
    ctx.fillStyle = T.signal;
    ctx.fillRect(rx - cw * 0.18, ry - cw * 0.18, cw * 0.36, cw * 0.36);
    ctx.strokeStyle = T.signal;
    ctx.globalAlpha = 0.5;
    ctx.lineWidth = 1;
    ctx.beginPath();
    const DX = [0, 1, 0, -1], DY = [-1, 0, 1, 0], BIT = [1, 2, 4, 8];
    for (let d = 0; d < 4; d++) {
      if (MAZE[c] & BIT[d]) continue;
      ctx.moveTo(rx, ry);
      ctx.lineTo(rx + DX[d] * cw * 0.62, ry + DY[d] * cw * 0.62);
    }
    ctx.stroke();
    ctx.globalAlpha = 1;
  }

  // start and goal
  ctx.fillStyle = T.trace;
  ctx.fillRect(ox + 2, oy + 2, cw - 4, cw - 4);
  ctx.fillStyle = T.signal;
  ctx.fillRect(cx(MW * MH - 1) + 2, cy(MW * MH - 1) + 2, cw - 4, cw - 4);

  ctx.font = monoFont(T, 8);
  ctx.fillStyle = T.ink2;
  ctx.textAlign = "left";
  ctx.textBaseline = "bottom";
  const label = runT > 0 ? `PATH ${SOLVE.path.length} CELLS` : `EXPLORED ${Math.floor(explored)}/${SOLVE.order.length}`;
  ctx.fillText(label, ox, h - 2);
};

export function MazeFigure({
  label,
  caption,
}: {
  label: string;
  caption: string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  use2DFigure(ref, drawMaze, { bootSeconds: 0.6 });
  return (
    <FigureFrame
      canvasRef={ref}
      label={label}
      caption={caption}
    />
  );
}

/* ============ colourization: a scrubbable before/after ============ */

export function ColouriseFigure({
  before,
  after,
  label,
  sliderLabel,
  caption,
  hint,
}: {
  before: string;
  after: string;
  label: string;
  sliderLabel: string;
  caption: string;
  hint: string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  // Where the keyboard last put the seam, 0 to 1. Null until the slider is
  // used; a pointer over the canvas still takes over while it is there.
  const keyed = useRef<number | null>(null);
  const imgs = useRef<{ a: HTMLImageElement | null; b: HTMLImageElement | null }>({ a: null, b: null });

  useEffect(() => {
    const a = new Image();
    const b = new Image();
    a.src = before;
    b.src = after;
    a.onload = () => { imgs.current.a = a; };
    b.onload = () => { imgs.current.b = b; };
    return () => { a.onload = null; b.onload = null; };
  }, [before, after]);

  const draw: Draw2D = (f) => {
    const { ctx, w, h, T } = f;
    ctx.clearRect(0, 0, w, h);
    const { a, b } = imgs.current;

    // seam follows the pointer, then the keyboard, otherwise drifts
    const auto = 0.5 + 0.34 * Math.sin(f.t * 0.5);
    const seam =
      f.px >= 0
        ? Math.max(0, Math.min(1, f.px / w))
        : (keyed.current ?? auto);
    const sx = seam * w;

    if (!a || !b) {
      ctx.strokeStyle = T.rule;
      ctx.lineWidth = 1;
      ctx.strokeRect(0.5, 0.5, w - 1, h - 1);
      ctx.font = monoFont(T, 9);
      ctx.fillStyle = T.ink2;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("LOADING PLATE", w / 2, h / 2);
      return;
    }

    // cover-fit both images to the same box so the seam lines up
    const fit = (img: HTMLImageElement) => {
      const s = Math.max(w / img.width, h / img.height);
      const dw = img.width * s, dh = img.height * s;
      return [(w - dw) / 2, (h - dh) / 2, dw, dh] as const;
    };

    ctx.save();
    ctx.beginPath(); ctx.rect(0, 0, sx, h); ctx.clip();
    ctx.drawImage(a, ...fit(a));
    ctx.restore();

    ctx.save();
    ctx.beginPath(); ctx.rect(sx, 0, w - sx, h); ctx.clip();
    ctx.drawImage(b, ...fit(b));
    ctx.restore();

    // the seam
    ctx.strokeStyle = T.signal;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(sx, 0);
    ctx.lineTo(sx, h);
    ctx.stroke();
    ctx.fillStyle = T.signal;
    ctx.beginPath();
    ctx.arc(sx, h / 2, 4, 0, Math.PI * 2);
    ctx.fill();

    // White with a soft shadow, so the hint reads on any part of the photo
    // in either theme.
    ctx.font = monoFont(T, 8);
    ctx.textBaseline = "top";
    ctx.textAlign = "left";
    ctx.shadowColor = "rgba(0, 0, 0, 0.6)";
    ctx.shadowBlur = 3;
    ctx.fillStyle = "#fff";
    ctx.fillText(hint.toUpperCase(), 6, 6);
    ctx.shadowBlur = 0;
    ctx.shadowColor = "transparent";
  };

  const redraw = use2DFigure(ref, draw, { pointer: true, bootSeconds: 0.4 });

  return (
    <FigureFrame
      canvasRef={ref}
      label={label}
      caption={caption}
      canvasClassName="cursor-ew-resize rounded-sm peer-focus-visible:ring-2 peer-focus-visible:ring-brand"
    >
      {/* The seam for anyone not using a pointer. Off screen itself, so the
          canvas wears its focus ring. */}
      <input
        type="range"
        min={0}
        max={100}
        step={5}
        defaultValue={50}
        aria-label={sliderLabel}
        onChange={(e) => {
          keyed.current = Number(e.target.value) / 100;
          redraw.current();
        }}
        className="peer sr-only"
      />
    </FigureFrame>
  );
}
