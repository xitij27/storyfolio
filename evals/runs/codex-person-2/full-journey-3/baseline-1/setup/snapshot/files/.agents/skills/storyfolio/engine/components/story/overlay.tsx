"use client";
import type { Controls } from "@/lib/story/controls";
import type { StoryLink } from "./types";
export function Overlay({ links, controls }: { links: readonly StoryLink[]; controls: Controls }) {
  return <div className="story-overlay">{links.map((link, i) => <a key={`${link.beat}-${link.piece}-${i}`} className="story-piece-link story-control" data-story-link={i} href={link.href} aria-label={link.label} tabIndex={-1} onPointerEnter={() => controls.set("piece", link.piece)} onPointerLeave={() => controls.set("piece", null)} onFocus={() => controls.set("piece", link.piece)} onBlur={() => controls.set("piece", null)}><span className="story-visually-hidden">{link.label}</span></a>)}</div>;
}
