"use client";

import { useEffect, useState } from "react";

export type RailItem = { id: string; number: number; label: string };

/**
 * Chapter markers down the right edge: where the reader is, and a way to
 * jump. Shown on wide screens only; the shell places it.
 */
export function ChapterRail({ label, items }: { label: string; items: RailItem[] }) {
  const [active, setActive] = useState<string | null>(null);

  // Whichever chapter crosses a thin band across the middle of the screen is
  // the one being read. The site header marks its sections the same way.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id;
          if (entry.isIntersecting) setActive(id);
          else setActive((current) => (current === id ? null : current));
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const item of items) {
      const section = document.getElementById(item.id);
      if (section) observer.observe(section);
    }
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav
      aria-label={label}
      className="pointer-events-auto absolute top-1/2 right-4 -translate-y-1/2"
    >
      <ol className="flex flex-col items-end gap-1">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              aria-current={active === item.id ? "location" : undefined}
              className="group flex min-h-9 items-center gap-3 rounded-sm px-2 font-mono text-xs text-paper-faint outline-none hover:text-paper-ink focus-visible:ring-2 focus-visible:ring-paper-accent aria-[current]:text-paper-ink"
            >
              <span className="opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 group-aria-[current]:opacity-100">
                {item.label}
              </span>
              <span className="tabular-nums group-aria-[current]:text-paper-accent">
                {item.number}
              </span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
