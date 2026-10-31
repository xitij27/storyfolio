"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

export type TerminalLine = { kind: "command" | "output"; text: string };

/**
 * A terminal window that types its commands out and prints what they
 * answer, once it scrolls into view. The idea of Aceternity's Terminal,
 * written here from scratch. The whole text is in the page from the start
 * for screen readers; only the typing is visual.
 */
export function TypedTerminal({
  lines,
  title = "zsh",
  speed = 32,
  className,
}: {
  lines: TerminalLine[];
  title?: string;
  /** Milliseconds per typed character. */
  speed?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const box = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  // How many characters of the whole script are shown; output lines appear at once.
  const [shown, setShown] = useState(0);
  const total = lines.reduce((n, l) => n + l.text.length, 0);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setStarted(true);
        observer.disconnect();
      }
    }, { threshold: 0.3 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    if (reduce) return setShown(total);
    if (shown >= total) return;
    // Find the line the next character is in: commands type, output jumps to its end.
    let at = 0;
    let line = lines[0];
    for (const l of lines) {
      if (shown < at + l.text.length) { line = l; break; }
      at += l.text.length;
    }
    const next = line.kind === "output" ? at + line.text.length : shown + 1;
    const wait = line.kind === "output" ? 260 : speed;
    const id = setTimeout(() => setShown(next), wait);
    return () => clearTimeout(id);
  }, [started, shown, total, lines, speed, reduce]);

  let left = shown;
  return (
    <div ref={box} className={cn("overflow-hidden rounded-xl border border-white/10 bg-[#0d1117] font-mono text-sm text-slate-200 shadow-2xl", className)}>
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
        <span aria-hidden className="size-3 rounded-full bg-[#ff5f57]" />
        <span aria-hidden className="size-3 rounded-full bg-[#febc2e]" />
        <span aria-hidden className="size-3 rounded-full bg-[#28c840]" />
        <span className="ml-2 text-xs text-slate-400">{title}</span>
      </div>
      <pre className="sr-only">{lines.map((l) => (l.kind === "command" ? `$ ${l.text}` : l.text)).join("\n")}</pre>
      <div aria-hidden className="min-h-40 space-y-1 p-4">
        {lines.map((l, i) => {
          const part = l.text.slice(0, Math.max(0, left));
          const typing = left > 0 && left < l.text.length;
          left -= l.text.length;
          if (!part) return null;
          return (
            <div key={i} className={l.kind === "output" ? "text-slate-400" : undefined}>
              {l.kind === "command" ? <span className="text-emerald-400">$ </span> : null}
              {part}
              {typing ? <span className="ml-0.5 inline-block h-4 w-2 translate-y-0.5 animate-pulse bg-slate-200" /> : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
