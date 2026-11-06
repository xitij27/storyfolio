"use client";

import { useId, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Search, X } from "lucide-react";

import { EASE_OUT } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * A round search button that grows a field out of its side, the two shapes
 * melting together like a drop of liquid as it opens. The idea of
 * Aceternity's Gooey Input, written here from scratch: the shapes are drawn
 * behind an SVG blur-and-threshold filter, and the real input and button sit
 * unfiltered on top, so the text stays sharp.
 */
export function GooeySearch({
  value,
  onValueChange,
  placeholder,
  ariaLabel,
  width = 200,
  className,
}: {
  value: string;
  onValueChange: (value: string) => void;
  placeholder: string;
  ariaLabel: string;
  /** Width of the field when open, in pixels. */
  width?: number;
  className?: string;
}) {
  const filter = useId().replace(/:/g, "");
  const input = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const shown = open || value !== "";
  const transition = { duration: reduce ? 0 : 0.5, ease: EASE_OUT };
  const BUTTON = 44;
  const GAP = 6;

  return (
    <div className={cn("relative h-11 shrink-0", className)} style={{ width: shown ? width + BUTTON + GAP : BUTTON }}>
      <svg aria-hidden className="absolute size-0">
        <filter id={filter}>
          <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
          <feColorMatrix in="blur" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -9" />
        </filter>
      </svg>
      <div aria-hidden className="absolute inset-0" style={{ filter: `url(#${filter})` }}>
        <motion.div
          className="absolute top-0 right-0 h-11 rounded-full bg-primary"
          initial={false}
          animate={{ width: shown ? width : BUTTON, right: shown ? BUTTON + GAP : 0 }}
          transition={transition}
        />
        <div className="absolute top-0 right-0 size-11 rounded-full bg-primary" />
      </div>
      <motion.input
        ref={input}
        type="search"
        aria-label={ariaLabel}
        placeholder={placeholder}
        value={value}
        onChange={(event) => onValueChange(event.target.value)}
        onBlur={() => value === "" && setOpen(false)}
        tabIndex={shown ? 0 : -1}
        initial={false}
        animate={{ opacity: shown ? 1 : 0, width: shown ? width - 28 : 0 }}
        transition={transition}
        className="absolute top-0 h-11 bg-transparent text-sm text-primary-foreground outline-none placeholder:text-primary-foreground/60 [&::-webkit-search-cancel-button]:hidden"
        style={{ right: BUTTON + GAP + 14 }}
      />
      <button
        type="button"
        aria-label={value ? `${ariaLabel}: clear` : ariaLabel}
        onClick={() => {
          if (value) onValueChange("");
          setOpen(true);
          input.current?.focus();
        }}
        className="absolute top-0 right-0 grid size-11 place-items-center rounded-full text-primary-foreground outline-none focus-visible:ring-2 focus-visible:ring-brand"
      >
        {value ? <X className="size-4" /> : <Search className="size-4" />}
      </button>
    </div>
  );
}
