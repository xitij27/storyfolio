"use client";

import { useEffect, useRef } from "react";

/*
  Shared plumbing for the Canvas 2D project figures. Handles DPR sizing, theme
  tokens, pointer, the animation loop and pausing off-screen, so each figure is
  just a draw call.
*/

export type Tokens = {
  ink: string; ink2: string; rule: string;
  rule2: string; trace: string; signal: string; paper: string;
  /** Resolved font-family list for labels. */
  mono: string;
};

/** Colour tokens live on `.fig` in globals.css. Read them off the element and
 *  let the cascade resolve, so a figure picks up the theme it is actually
 *  sitting in. */
export function readTokens(el: HTMLElement): Tokens {
  const cs = getComputedStyle(el);
  const g = (n: string, fallback = "#808080") =>
    cs.getPropertyValue(n).trim() || fallback;
  return {
    ink: g("--fig-ink"), ink2: g("--fig-ink-2"), rule: g("--fig-rule"),
    rule2: g("--fig-rule-2"), trace: g("--fig-trace"), signal: g("--fig-signal"),
    paper: g("--fig-paper"),
    // Canvas can't resolve var() inside ctx.font, so read the family that
    // next/font put in --font-mono and hand it over as a literal.
    mono: g("--font-mono", "ui-monospace, monospace"),
  };
}

export type Frame2D = {
  ctx: CanvasRenderingContext2D;
  w: number; h: number;
  T: Tokens;
  /** Seconds since mount. Frozen at `staticTime` under reduced motion. */
  t: number;
  /** 0 to 1, eased, for the settle-in. Always 1 under reduced motion. */
  boot: number;
  frame: number;
  /** Pointer in CSS pixels, or -1 when it is not over the canvas. */
  px: number; py: number;
  down: boolean;
  reduced: boolean;
};

export type Draw2D = (f: Frame2D) => void;

/**
 * Returns a ref to a redraw function, for input the loop can't see: under
 * reduced motion there is no loop, so a figure driven from the keyboard has
 * to ask for its own frame.
 */
export function use2DFigure(
  ref: React.RefObject<HTMLCanvasElement | null>,
  draw: Draw2D,
  opts: { pointer?: boolean; staticTime?: number; bootSeconds?: number } = {},
) {
  const redraw = useRef<() => void>(() => {});

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const reduced = reduceMq.matches;
    const bootSecs = opts.bootSeconds ?? 1.4;

    const f: Frame2D = {
      ctx, w: 0, h: 0, T: readTokens(canvas),
      t: reduced ? (opts.staticTime ?? 2.4) : 0,
      boot: reduced ? 1 : 0,
      frame: 0, px: -1, py: -1, down: false, reduced,
    };
    let visible = true;

    const render = () => { if (f.w && f.h) draw(f); };
    redraw.current = render;

    const ro = new ResizeObserver(() => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const r = canvas.getBoundingClientRect();
      if (!r.width || !r.height) return;
      f.w = r.width; f.h = r.height;
      canvas.width = Math.round(r.width * dpr);
      canvas.height = Math.round(r.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      render();
    });
    ro.observe(canvas);

    const io = new IntersectionObserver(
      (es) => { visible = es[0].isIntersecting; },
      { rootMargin: "150px" },
    );
    io.observe(canvas);

    const themeObs = new MutationObserver(() => {
      f.T = readTokens(canvas);
      render();
    });
    themeObs.observe(document.documentElement, {
      attributes: true, attributeFilter: ["class"],
    });

    const setPointer = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      f.px = e.clientX - r.left;
      f.py = e.clientY - r.top;
      if (reduced) render();
    };
    const onDown = (e: PointerEvent) => {
      f.down = true; setPointer(e);
      canvas.setPointerCapture(e.pointerId);
    };
    const onUp = (e: PointerEvent) => {
      f.down = false;
      if (canvas.hasPointerCapture(e.pointerId)) canvas.releasePointerCapture(e.pointerId);
    };
    const onLeave = () => { f.px = -1; f.py = -1; f.down = false; if (reduced) render(); };

    if (opts.pointer) {
      canvas.addEventListener("pointermove", setPointer);
      canvas.addEventListener("pointerdown", onDown);
      canvas.addEventListener("pointerup", onUp);
      canvas.addEventListener("pointercancel", onUp);
      canvas.addEventListener("pointerleave", onLeave);
    }

    let raf = 0;
    if (!reduced) {
      let last = performance.now();
      const loop = (now: number) => {
        const dt = Math.min(0.05, (now - last) / 1000);
        last = now;
        if (visible && f.w) {
          if (f.boot < 1) f.boot = Math.min(1, f.boot + dt / bootSecs);
          f.t += dt;
          f.frame++;
          draw(f);
        }
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    }

    return () => {
      redraw.current = () => {};
      cancelAnimationFrame(raf);
      ro.disconnect(); io.disconnect(); themeObs.disconnect();
      if (opts.pointer) {
        canvas.removeEventListener("pointermove", setPointer);
        canvas.removeEventListener("pointerdown", onDown);
        canvas.removeEventListener("pointerup", onUp);
        canvas.removeEventListener("pointercancel", onUp);
        canvas.removeEventListener("pointerleave", onLeave);
      }
    };
    // draw and opts are module-level constants, not reactive inputs.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return redraw;
}

/** Eased 0..1 for settle-in animations. */
export const ease = (b: number) => 1 - Math.pow(1 - b, 3);

/** Mono label helper: every figure labels in the same voice. */
export function monoFont(T: Tokens, px = 9) {
  return `500 ${px}px ${T.mono}, ui-monospace, monospace`;
}
