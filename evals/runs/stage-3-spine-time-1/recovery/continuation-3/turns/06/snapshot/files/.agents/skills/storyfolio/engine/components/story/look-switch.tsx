"use client";
import type { Look } from "@/lib/story/looks";
import { chooseLook } from "./use-look";
export function LookSwitch({ looks, active, defaultLook, label }: { looks: readonly Look[]; active: string; defaultLook: string; label: string }) {
  return <div className="story-look-switch" role="group" aria-label={label}>
    {looks.map(look => <button key={look.id} type="button" aria-pressed={active === look.id} onClick={() => chooseLook(look.id, defaultLook)}>{look.name ?? look.id}</button>)}
  </div>;
}
