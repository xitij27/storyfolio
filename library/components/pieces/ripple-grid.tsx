"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

/**
 * A grid of faint cells behind a section; a click sends a ripple out across
 * it from the cell that was clicked. The idea of Aceternity's Background
 * Ripple Effect, written here from scratch. Each cell is delayed by its
 * distance from the click, and the animation is plain CSS (`ripple-cell`
 * in globals.css), so nothing runs between ripples. Decorative.
 */
export function RippleGrid({ cell = 52, className }: { cell?: number; className?: string }) {
  const box = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ cols: 0, rows: 0 });
  // A new wave remounts the cells, which restarts their animation.
  const [wave, setWave] = useState({ id: 0, col: -1, row: -1 });

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      const cols = Math.ceil(width / cell);
      const rows = Math.ceil(height / cell);
      setSize({ cols, rows });
      setWave((w) => (w.id ? w : { id: 1, col: cols >> 1, row: rows >> 1 }));
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [cell]);

  return (
    <div
      ref={box}
      aria-hidden
      onPointerDown={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setWave((w) => ({
          id: w.id + 1,
          col: Math.floor((event.clientX - rect.left) / cell),
          row: Math.floor((event.clientY - rect.top) / cell),
        }));
      }}
      className={cn("absolute inset-0 overflow-hidden", className)}
      style={{
        maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
      }}
    >
      <div
        key={wave.id}
        className="grid"
        style={{ gridTemplateColumns: `repeat(${size.cols}, ${cell}px)`, gridAutoRows: `${cell}px` }}
      >
        {Array.from({ length: size.cols * size.rows }, (_, i) => {
          const d = Math.hypot((i % size.cols) - wave.col, Math.floor(i / size.cols) - wave.row);
          return (
            <span
              key={i}
              className={cn("border-[0.5px] border-foreground/10", wave.col >= 0 && "ripple-cell")}
              style={{ "--d": d } as React.CSSProperties}
            />
          );
        })}
      </div>
    </div>
  );
}
