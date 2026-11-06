"use client";

import { useEffect, useRef, useState, type ReactNode, type RefObject } from "react";

import { cn } from "@/lib/utils";

/*
  From the author's Lab sketches. A tall section with a full-screen stage pinned inside it. How far the section
  has scrolled, 0 to 1, is kept in a ref so the 3D scene can read it every
  frame without re-rendering React. The page scrolls natively: the captions
  are ordinary HTML over the canvas, not text drawn in WebGL.
*/

export type Caption = {
  title: string;
  body: string;
  note?: string;
  /** The first caption of a sketch is the page heading. */
  heading?: boolean;
};

export function ScrollStage({
  screens,
  captions,
  controls,
  children,
}: {
  /** Height of the section in viewport heights. */
  screens: number;
  captions: Caption[];
  controls?: ReactNode;
  children: (progress: RefObject<number>) => ReactNode;
}) {
  const section = useRef<HTMLElement>(null);
  const progress = useRef(0);
  const [beat, setBeat] = useState<number | null>(0);

  useEffect(() => {
    const steps = captions.length;
    const update = () => {
      const el = section.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const span = rect.height - window.innerHeight;
      const p = span > 0 ? Math.min(1, Math.max(0, -rect.top / span)) : 0;
      progress.current = p;

      // A caption shows while the scene rests on its beat and clears while
      // the scene is moving between two.
      const at = steps > 1 ? p * (steps - 1) : 0;
      const nearest = Math.round(at);
      setBeat(Math.abs(at - nearest) < 0.3 ? nearest : null);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [captions.length]);

  return (
    <section
      ref={section}
      style={{ height: `${screens * 100}dvh` }}
      className="relative bg-[#0c1018] text-white"
    >
      <div className="sticky top-0 h-dvh overflow-hidden">
        <div className="absolute inset-0">{children(progress)}</div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0">
          <div className="relative mx-auto h-96 max-w-6xl px-page sm:h-72">
            {captions.map((c, i) => {
              const Title = c.heading ? "h1" : "h2";
              return (
                <div
                  key={c.title}
                  aria-hidden={beat !== i}
                  className={cn(
                    "absolute inset-x-[var(--page-gutter)] bottom-40 max-w-xl sm:bottom-24 transition-[opacity,transform] duration-500 ease-out-quint",
                    beat === i ? "opacity-100" : "translate-y-3 opacity-0",
                  )}
                >
                  <Title className="text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
                    {c.title}
                  </Title>
                  <p className="mt-4 text-pretty text-white/70 sm:text-lg">{c.body}</p>
                  {c.note ? (
                    <p className="mt-3 text-sm text-pretty text-white/45">{c.note}</p>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>

        {controls ? (
          <div className="absolute inset-x-0 top-24">
            <div className="mx-auto flex max-w-6xl justify-end px-page">{controls}</div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
