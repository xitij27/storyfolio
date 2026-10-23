"use client";
export type RailItem = { id: string; number: number; label: string };
export function ChapterRail({ label, items, active }: { label: string; items: RailItem[]; active?: string }) {
  return <nav className="story-rail" aria-label={label}><ol>{items.map(item => <li key={item.id}><a href={`#${item.id}`} aria-label={`${item.number}. ${item.label}`} aria-current={active === item.id ? "location" : undefined}><span>{item.label}</span><span>{item.number}</span></a></li>)}</ol></nav>;
}
