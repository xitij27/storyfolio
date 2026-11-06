"use client";

import dynamic from "next/dynamic";
import { useReducedMotion } from "motion/react";

import { PixelPortrait } from "@/components/pieces/pixel-portrait";
import { Section } from "@/components/sections/section-heading";
import { useWebGLSupported } from "@/components/use-webgl-supported";
import { WebGLBoundary } from "@/components/webgl-boundary";
import { person } from "@/content/sample";
import { cn } from "@/lib/utils";

const DotGlobe = dynamic(() => import("@/components/pieces/dot-globe"), { ssr: false });

export function About() {
  const t = person.about;
  const webgl = useWebGLSupported();
  const showGlobe = webgl === true;
  const reduceMotion = useReducedMotion() ?? false;

  // Counts the page can stand behind: each comes from the confirmed lists, never rounded up.
  const stats = [
    { value: t.years, label: t.stats.experience },
    { value: person.projectList.length, label: t.stats.completed },
    { value: person.experiences.length, label: t.stats.workedIn },
  ];

  return (
    <Section id="about" className="overflow-x-clip">
      {/*
        Mobile: the globe is a right-floated element pushed two-thirds off the
        screen edge, so only a semicircle peeks in. `shape-outside` makes the
        body copy curve around its visible edge instead of the globe sitting in
        a separate block below the text (which broke the reading flow).
        `lg`: reverts to the two-column grid with the full globe.
      */}
      <div
        className={cn(
          "relative isolate",
          // Without the globe there is nothing to put in column two, and every
          // text child is pinned to col-start-1: keeping the grid would squeeze
          // the copy into half the width against an empty column.
          showGlobe && "lg:grid lg:grid-cols-2 lg:gap-x-10",
        )}
      >
        <div className="relative z-10 flex items-center gap-5 lg:col-start-1 lg:row-start-1">
          <PixelPortrait
            src={person.portrait}
            alt={t.portraitAlt}
            size={112}
            cell={3}
            tint="#e9a23b"
            className="border border-border/60 shadow-lg"
          />
          <h2 className="text-left font-heading text-4xl leading-[1.08] font-semibold text-balance sm:text-5xl">
            {t.title}
          </h2>
        </div>

        {/*
          Decorative here, so it takes no pointer events on touch (dragging over
          the copy would turn the globe, not scroll) and is hidden from
          assistive tech: the copy beside it already tells the journey.
        */}
        {showGlobe && (
          <div
            aria-hidden
            className="pointer-events-none relative z-0 float-right mt-8 h-[30rem] w-[30rem] [margin-right:-18rem] clear-right [shape-margin:2rem] [shape-outside:circle(10rem_at_50%_50%)_border-box] sm:h-[36rem] sm:w-[36rem] sm:[margin-right:-22rem] sm:[shape-outside:circle(12rem_at_50%_50%)_border-box] lg:col-start-2 lg:row-span-3 lg:row-start-1 lg:mt-0 lg:h-[34rem] lg:w-full lg:self-center lg:clear-none lg:float-none lg:[margin-right:0] lg:[shape-outside:none]"
          >
            <WebGLBoundary>
              <DotGlobe places={person.journey} still={reduceMotion} />
            </WebGLBoundary>
          </div>
        )}

        <div className="relative z-10 lg:col-start-1 lg:row-start-2">
          <p className="mt-8 text-pretty text-lg leading-relaxed text-muted-foreground">{t.body}</p>
        </div>

        <dl className="relative z-10 mt-10 grid grid-cols-3 gap-6 border-t border-border pt-6 clear-right lg:col-start-1 lg:row-start-3 lg:clear-none">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col-reverse">
              <dt className="mt-1 text-sm text-muted-foreground">{s.label}</dt>
              <dd className="font-heading text-4xl font-semibold tabular-nums sm:text-5xl">{s.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}
