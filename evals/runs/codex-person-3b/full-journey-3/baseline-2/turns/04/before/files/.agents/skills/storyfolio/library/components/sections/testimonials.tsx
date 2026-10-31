"use client";

import { useState } from "react";
import Image from "next/image";
import { Pause, Play, Quote } from "lucide-react";

import { Section, SectionHeading } from "@/components/sections/section-heading";
import { person, type Testimonial } from "@/content/sample";
import { cn } from "@/lib/utils";

export function Testimonials() {
  const t = person.testimonials;
  const testimonials = person.testimonialList;
  // Hover alone can't stop it for keyboard or touch visitors, and anything
  // that moves on its own for more than five seconds needs a way to pause
  // (WCAG 2.2.2).
  const [paused, setPaused] = useState(false);

  if (testimonials.length === 0) return null;

  return (
    <Section id="testimonials">
      <SectionHeading
        eyebrow={t.eyebrow}
        title={t.title}
        subtitle={t.subtitle}
      />

      {/*
        Still, the strip scrolls sideways instead. Clipping a strip that no
        longer moves would leave every card past the edge out of reach, which
        is what paused and reduced-motion visitors used to get.
      */}
      <div
        className={cn(
          "group relative overflow-hidden motion-reduce:overflow-x-auto",
          paused && "overflow-x-auto",
        )}
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}
      >
        <ul
          className={cn(
            "flex w-max gap-5 py-2 animate-marquee group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused] motion-reduce:animate-none",
            paused && "[animation-play-state:paused]",
          )}
          style={{ ["--marquee-duration" as string]: "44s" }}
        >
          {testimonials.map((item) => (
            <TestimonialCard key={item.id} item={item} />
          ))}
          {/* The second copy only exists so the loop is seamless. Hidden
              from assistive tech so every quote is read once, not twice. */}
          {testimonials.map((item) => (
            <TestimonialCard key={`${item.id}-clone`} item={item} clone />
          ))}
        </ul>
      </div>

      <div className="mt-4 flex justify-center motion-reduce:hidden">
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          // No aria-pressed: the label itself flips between pause and play.
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
        >
          {paused ? (
            <Play className="size-3.5" aria-hidden />
          ) : (
            <Pause className="size-3.5" aria-hidden />
          )}
          {paused ? t.play : t.pause}
        </button>
      </div>
    </Section>
  );
}

function TestimonialCard({
  item,
  clone = false,
}: {
  item: Testimonial;
  clone?: boolean;
}) {
  return (
    <li
      aria-hidden={clone || undefined}
      inert={clone}
      className={cn(
        "w-[320px] shrink-0 rounded-2xl border border-border/60 bg-card p-6 shadow-sm sm:w-[380px]",
        // With no loop to keep seamless, the copy is only a duplicate.
        clone && "motion-reduce:hidden",
      )}
    >
      <Quote className="size-6 text-brand/40" aria-hidden />
      <p className="mt-3 text-pretty text-sm leading-relaxed text-foreground/90">
        {item.quote}
      </p>
      <div className="mt-5 flex items-center gap-3">
        <Avatar photo={item.photo} initials={item.initials} />
        <div className="text-sm">
          <div className="font-semibold">{item.name}</div>
          <div className="text-muted-foreground">{item.title}</div>
        </div>
      </div>
    </li>
  );
}

function Avatar({ photo, initials }: { photo?: string; initials: string }) {
  const [failed, setFailed] = useState(false);

  return (
    <span className="relative grid size-10 shrink-0 place-items-center overflow-hidden rounded-full bg-gradient-to-br from-brand to-brand-3 text-xs font-bold text-white">
      {photo && !failed ? (
        <Image
          src={photo}
          // The name is printed right beside it.
          alt=""
          fill
          sizes="40px"
          className="object-cover"
          onError={() => setFailed(true)}
        />
      ) : (
        initials
      )}
    </span>
  );
}
