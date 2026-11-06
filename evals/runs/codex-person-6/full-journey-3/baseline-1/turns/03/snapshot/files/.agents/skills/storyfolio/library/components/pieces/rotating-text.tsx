"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { EASE_OUT } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * One word at a time from a list, each sliding up into the place of the
 * last. The idea of React Bits' Rotating Text and Aceternity's Container
 * Text Flip, written here from scratch. A screen reader hears the whole
 * list once instead of every change.
 */
export function RotatingText({
  words,
  interval = 2400,
  className,
}: {
  words: string[];
  interval?: number;
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (words.length < 2) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % words.length), interval);
    return () => clearInterval(id);
  }, [words.length, interval]);

  const word = words[index] ?? "";
  return (
    <span className={cn("relative inline-grid overflow-hidden py-1 align-bottom", className)}>
      <span className="sr-only">{words.join(", ")}</span>
      {/* Every word in the same cell, unseen, so the width is the longest one's and nothing beside it jumps. */}
      {words.map((w) => (
        <span key={w} aria-hidden className="invisible col-start-1 row-start-1">
          {w}
        </span>
      ))}
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={word}
          aria-hidden
          initial={reduce ? { opacity: 0 } : { y: "110%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={reduce ? { opacity: 0 } : { y: "-110%", opacity: 0 }}
          transition={{ duration: 0.45, ease: EASE_OUT }}
          className="col-start-1 row-start-1 text-start"
        >
          {word}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
