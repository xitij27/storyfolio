"use client";

import { useState } from "react";

import { ColouriseFigure, FeistelFigure, MazeFigure } from "@/components/figures/project-figures";
import { ChapterRail } from "@/components/paper/chapter-rail";
import { LookSwitch, useLook } from "@/components/paper/look-switch";
import { ProjectLink, ProjectWindowProvider } from "@/components/paper/project-window";
import { Slider } from "@/components/paper/slider";
import { asset, person } from "@/content/sample";

/* The author's sections and page pieces, each shown with the made-up person. */

export { About } from "@/components/sections/about";
export { Contact } from "@/components/sections/contact";
export { Experience } from "@/components/sections/experience";
export { Hero } from "@/components/sections/hero";
export { Projects } from "@/components/sections/projects";
export { Skills } from "@/components/sections/skills";
export { Testimonials } from "@/components/sections/testimonials";

export function FiguresDemo() {
  const f = person.projects.figs;
  const figures = [
    <FeistelFigure key="f" label={f.feistelAlt} caption={f.feistel} />,
    <MazeFigure key="m" label={f.mazeAlt} caption={f.maze} />,
    <ColouriseFigure
      key="c"
      before={asset("/sample/street-gray.svg")}
      after={asset("/sample/street.svg")}
      label={f.colouriseAlt}
      sliderLabel={f.colouriseSlider}
      caption={f.colourise}
      hint={f.colouriseHint}
    />,
  ];
  return (
    <div className="mx-auto grid max-w-6xl gap-6 px-page py-16 lg:grid-cols-3">
      {figures.map((figure, i) => (
        <div key={i} className="aspect-[16/10] overflow-hidden rounded-2xl border border-border/60 bg-muted">
          {figure}
        </div>
      ))}
    </div>
  );
}

const RAIL = [
  { id: "rail-hello", number: 1, label: "Hello" },
  { id: "rail-worked", number: 2, label: "Worked" },
  { id: "rail-made", number: 3, label: "Made" },
  { id: "rail-contact", number: 4, label: "Contact" },
];

export function ChapterRailDemo() {
  return (
    <div className="relative bg-paper-bg text-paper-ink">
      <div className="pointer-events-none fixed inset-y-0 right-0 z-20 hidden w-48 lg:block">
        <ChapterRail label="Chapters" items={RAIL} />
      </div>
      {RAIL.map((item) => (
        <section key={item.id} id={item.id} className="mx-auto flex min-h-[80dvh] max-w-3xl flex-col justify-center border-b border-paper-rule px-page">
          <p className="font-mono text-sm text-paper-accent">{item.number}</p>
          <h2 className="mt-2 font-heading text-4xl font-bold">{item.label}</h2>
          <p className="mt-3 text-paper-muted">Scroll: the rail on the right marks this chapter. On a narrow screen it is hidden.</p>
        </section>
      ))}
    </div>
  );
}

const LOOKS = [
  { id: "night", name: "Night" },
  { id: "paper", name: "Paper" },
  { id: "blueprint", name: "Blueprint" },
] as const;

export function LookSwitchDemo() {
  const look = useLook(LOOKS.map((l) => l.id));
  return (
    <div data-look={look} className="bg-paper-bg text-paper-ink transition-colors duration-300">
      <div className="mx-auto flex min-h-[70dvh] max-w-3xl flex-col justify-center gap-6 px-page py-16">
        <LookSwitch label="Look" looks={[...LOOKS]} />
        <h2 className="font-heading text-4xl font-bold">{person.name}</h2>
        <p className="max-w-xl text-paper-muted">{person.hero.tagline}</p>
        <div className="flex items-center gap-3 border-t border-paper-rule pt-6 font-mono text-sm text-paper-faint">
          <span className="size-3 rounded-full bg-paper-accent" /> The look is in the address: try reloading.
        </div>
      </div>
    </div>
  );
}

export function SliderDemo() {
  const [noise, setNoise] = useState(30);
  // A made-up signal: steady peaks, with noise added to every bar.
  const bars = Array.from({ length: 32 }, (_, i) => {
    const signal = Math.max(0, Math.sin(i / 2.2)) * 70;
    const hiss = ((Math.sin(i * 12.9898) * 43758.5453) % 1 + 1) % 1;
    return Math.min(100, 10 + signal + hiss * noise);
  });
  return (
    <div className="bg-paper-bg text-paper-ink">
      <div className="mx-auto flex min-h-[60dvh] max-w-3xl flex-col justify-center px-page py-16">
        <div aria-hidden className="flex h-40 items-end gap-1">
          {bars.map((h, i) => (
            <span key={i} className="flex-1 rounded-t-sm bg-paper-accent/80" style={{ height: `${h}%` }} />
          ))}
        </div>
        <p className="mt-6 max-w-xl text-paper-muted">A caption can carry a control, so the reader changes what the scene shows: here, how much noise sits under the signal.</p>
        <Slider label="Noise" min={0} max={100} step={1} value={noise} onChange={setNoise} readout={`${noise}%`} />
      </div>
    </div>
  );
}

export function ProjectWindowDemo() {
  return (
    <ProjectWindowProvider>
      <div className="bg-paper-bg text-paper-ink">
        <p className="mx-auto max-w-2xl px-page py-24 text-xl leading-relaxed text-paper-muted">
          Noa started with a <ProjectLink id="maze-robot">maze-solving robot</ProjectLink> that maps a maze as it drives. A{" "}
          <ProjectLink id="toy-cipher">toy block cipher</ProjectLink> followed, written to watch an attack recover its key, and then a{" "}
          <ProjectLink id="photo-colouriser">photo colouriser</ProjectLink> that guesses the colours of old photographs.
        </p>
      </div>
    </ProjectWindowProvider>
  );
}
