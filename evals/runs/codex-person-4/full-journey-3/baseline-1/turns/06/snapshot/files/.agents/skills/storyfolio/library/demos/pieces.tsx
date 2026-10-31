"use client";

import { useState } from "react";

import { ExpandingCards } from "@/components/pieces/expanding-cards";
import { GooeySearch } from "@/components/pieces/gooey-search";
import { PixelPortrait } from "@/components/pieces/pixel-portrait";
import { RippleGrid } from "@/components/pieces/ripple-grid";
import { RotatingText } from "@/components/pieces/rotating-text";
import { TypedTerminal } from "@/components/pieces/typed-terminal";
import { toCard } from "@/components/sections/project-card";
import { person } from "@/content/sample";

/* The pieces that draw without WebGL, each shown with the made-up person. */

const Frame = ({ children }: { children: React.ReactNode }) => (
  <div className="mx-auto grid min-h-[60dvh] max-w-5xl place-items-center px-page py-16">{children}</div>
);

export function RotatingTextDemo() {
  return (
    <Frame>
      <h2 className="text-center font-heading text-4xl font-bold tracking-tight sm:text-6xl">
        {person.name} is a <br />
        <RotatingText words={person.hero.roles} className="text-gradient" />
      </h2>
    </Frame>
  );
}

export function PixelPortraitDemo() {
  return (
    <Frame>
      <div className="flex flex-col items-center gap-6">
        <PixelPortrait src={person.portrait} alt={person.about.portraitAlt} size={240} cell={5} tint="#8b7cf6" className="border border-border/60 shadow-xl" />
        <p className="text-sm text-muted-foreground">Move the pointer over the portrait.</p>
      </div>
    </Frame>
  );
}

export function TypedTerminalDemo() {
  return (
    <Frame>
      <TypedTerminal
        className="w-full max-w-2xl"
        lines={[
          { kind: "command", text: "whoami" },
          { kind: "output", text: `${person.name}, ${person.hero.roles[0].toLowerCase()}` },
          { kind: "command", text: "cat now.txt" },
          { kind: "output", text: person.hero.tagline },
          { kind: "command", text: "ls projects/" },
          { kind: "output", text: person.projectList.map((p) => p.id).join("  ") },
        ]}
      />
    </Frame>
  );
}

export function GooeySearchDemo() {
  const [search, setSearch] = useState("");
  const found = person.projectList.filter((p) => p.title.toLowerCase().includes(search.trim().toLowerCase()));
  return (
    <Frame>
      <div className="flex w-full max-w-md flex-col items-end gap-6">
        <GooeySearch value={search} onValueChange={setSearch} placeholder="Search projects" ariaLabel="Search projects" width={220} />
        <ul className="w-full space-y-2" aria-live="polite">
          {found.map((p) => (
            <li key={p.id} className="rounded-lg border border-border/60 bg-card px-4 py-2 text-sm">{p.title}</li>
          ))}
        </ul>
      </div>
    </Frame>
  );
}

export function ExpandingCardsDemo() {
  const t = person.projects;
  return (
    <div className="mx-auto max-w-6xl px-page py-16">
      <ExpandingCards
        cards={person.projectList.slice(0, 6).map(toCard)}
        labels={{ close: t.close, previous: t.previous, next: t.next, featured: t.featured }}
      />
    </div>
  );
}

export function RippleGridDemo() {
  return (
    <section className="relative isolate grid h-[70dvh] place-items-center overflow-hidden">
      <RippleGrid />
      <div className="pointer-events-none relative text-center">
        <h2 className="font-heading text-4xl font-bold tracking-tight">{person.contact.title}</h2>
        <p className="mt-3 text-muted-foreground">Click anywhere on the grid.</p>
      </div>
    </section>
  );
}
