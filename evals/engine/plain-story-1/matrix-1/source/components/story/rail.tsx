"use client";
import { useEffect, useState } from "react";
export type RailItem = { id: string; number: number; label: string };
export function ChapterRail({ label, items }: { label: string; items: RailItem[] }) {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
    }, { rootMargin: "-45% 0px -50% 0px" });
    for (const item of items) { const el = document.getElementById(item.id); if (el) observer.observe(el); }
    return () => observer.disconnect();
  }, [items]);
  return <nav className="story-rail" aria-label={label}><ol>{items.map(item => <li key={item.id}><a href={`#${item.id}`} aria-current={active === item.id ? "location" : undefined}><span>{item.label}</span><span>{item.number}</span></a></li>)}</ol></nav>;
}
