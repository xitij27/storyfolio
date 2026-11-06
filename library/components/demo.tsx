"use client";

import type { ComponentType } from "react";
import dynamic from "next/dynamic";

/*
  Which demo shows which piece. Each is fetched on its own, so a page loads
  only its piece, and only a 3D piece brings three.js.
*/

const pieces = (name: keyof typeof import("@/demos/pieces")) =>
  dynamic(() => import("@/demos/pieces").then((m) => m[name] as ComponentType), { ssr: false });
const three = (name: keyof typeof import("@/demos/three")) =>
  dynamic(() => import("@/demos/three").then((m) => m[name] as ComponentType), { ssr: false });
const sections = (name: keyof typeof import("@/demos/sections")) =>
  dynamic(() => import("@/demos/sections").then((m) => m[name] as ComponentType), { ssr: false });

const DEMOS: Record<string, ComponentType> = {
  hero: sections("Hero"),
  "rotating-text": pieces("RotatingTextDemo"),
  starfield: three("StarfieldDemo"),
  "pixel-portrait": pieces("PixelPortraitDemo"),
  "typed-terminal": pieces("TypedTerminalDemo"),
  about: sections("About"),
  "dot-globe": three("DotGlobeDemo"),
  route: three("RouteDemo"),
  spectrogram: three("SpectrogramDemo"),
  "data-points": three("DataPointsDemo"),
  network: three("NetworkDemo"),
  experience: sections("Experience"),
  layers: three("LayersDemo"),
  stack: three("StackDemo"),
  skills: sections("Skills"),
  projects: sections("Projects"),
  "expanding-cards": pieces("ExpandingCardsDemo"),
  "gooey-search": pieces("GooeySearchDemo"),
  figures: sections("FiguresDemo"),
  "project-window": sections("ProjectWindowDemo"),
  testimonials: sections("Testimonials"),
  contact: sections("Contact"),
  "ripple-grid": pieces("RippleGridDemo"),
  "chapter-rail": sections("ChapterRailDemo"),
  "look-switch": sections("LookSwitchDemo"),
  slider: sections("SliderDemo"),
};

export function Demo({ id }: { id: string }) {
  const Shown = DEMOS[id];
  return Shown ? <Shown /> : null;
}

export const DEMO_IDS = Object.keys(DEMOS);
