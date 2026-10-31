"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ChevronDown, MapPin } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { Button } from "@/components/ui/button";
import { person, type Experience as ExperienceEntry } from "@/content/sample";
import { EASE_OUT } from "@/lib/motion";
import { cn } from "@/lib/utils";

const COLLAPSED_COUNT = 2;
const TOGGLE_SECONDS = 0.28;

/**
 * Holds an element at its current spot on screen while the content above it
 * animates shorter, by scrolling up exactly as much as it would have moved.
 * Without it, collapsing the list would carry the button (and the reader's
 * place) far up out of view.
 */
function pinWhileCollapsing(el: HTMLElement, ms: number) {
  const target = el.getBoundingClientRect().top;
  const start = performance.now();
  const step = (now: number) => {
    const drift = el.getBoundingClientRect().top - target;
    // `instant`: the root sets scroll-behavior: smooth, which would otherwise
    // ease every correction and let the button visibly slide.
    if (drift) window.scrollBy({ top: drift, behavior: "instant" });
    if (now - start < ms + 60) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

/** The timeline itself; `periods` are each role's dates, already localised. */
export function ExperienceTimeline({
  periods,
}: {
  periods: Record<string, string>;
}) {
  const t = person.experience;
  const experiences = person.experiences;
  const reduceMotion = useReducedMotion();
  const [expanded, setExpanded] = useState(false);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);

  const duration = reduceMotion ? 0 : TOGGLE_SECONDS;
  const shown = experiences.slice(0, COLLAPSED_COUNT);
  const more = experiences.slice(COLLAPSED_COUNT);

  const handleToggle = () => {
    if (expanded && toggleButtonRef.current) {
      pinWhileCollapsing(toggleButtonRef.current, duration * 1000);
    }
    setExpanded((v) => !v);
  };

  return (
    <div className="relative mx-auto max-w-3xl">
      {/* The faint full-length track. Each entry draws its own segment of
          the spine over it as it scrolls past (see .exp-entry in
          globals.css). */}
      <div
        aria-hidden
        className="absolute left-6 top-2 bottom-2 w-px bg-border/70 sm:left-8"
      />

      <ol>
        {shown.map((exp) => (
          <li key={exp.id}>
            <Entry exp={exp} period={periods[exp.id]} />
          </li>
        ))}
        <AnimatePresence initial={false}>
          {expanded &&
            more.map((exp) => (
              <motion.li
                key={exp.id}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration, ease: EASE_OUT }}
                className="overflow-hidden"
              >
                <Entry exp={exp} period={periods[exp.id]} />
              </motion.li>
            ))}
        </AnimatePresence>
      </ol>

      {more.length > 0 && (
        <div className="mt-2 flex justify-center">
          <Button
            ref={toggleButtonRef}
            variant="outline"
            onClick={handleToggle}
            aria-expanded={expanded}
          >
            {expanded ? t.showLess : t.showMore}
            <ChevronDown
              className={cn(
                "size-4 transition-transform duration-200 ease-out-quint",
                expanded && "rotate-180",
              )}
              aria-hidden
            />
          </Button>
        </div>
      )}
    </div>
  );
}

function Entry({ exp, period }: { exp: ExperienceEntry; period: string }) {
  const t = person.experience;
  const bullets = exp.bullets;
  const last = exp.id === person.experiences[person.experiences.length - 1].id;

  return (
    <div className="exp-entry relative pb-8 pl-16 sm:pl-20">
      {/* This entry's stretch of the spine, from under its logo to the next
          entry. The last one fades out instead of pointing at nothing. */}
      <span
        aria-hidden
        className={cn(
          "exp-spine absolute left-6 top-12 bottom-0 w-px sm:left-8 sm:top-16",
          last
            ? "bg-gradient-to-b from-brand/60 to-transparent"
            : "bg-brand/60",
        )}
      />
      <span className="exp-logo absolute left-0 top-0 size-12 overflow-hidden rounded-2xl border border-border/60 bg-white shadow-md sm:size-16">
        {exp.logo ? (
          <Image
            src={exp.logo}
            alt=""
            fill
            sizes="64px"
            className="object-contain p-2"
          />
        ) : (
          <span className="grid size-full place-items-center bg-gradient-to-br from-brand to-brand-3 text-xs font-bold text-white sm:text-sm">
            {exp.logoInitials}
          </span>
        )}
      </span>
      <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-sm">
        <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
          <h3 className="font-heading text-lg font-semibold">
            {exp.role}
          </h3>
          <span className="text-sm font-medium text-brand tabular-nums">
            {period}
          </span>
        </div>
        <div className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-sm text-muted-foreground">
          <span className="font-medium text-foreground/80">{exp.company}</span>
          <span className="rounded-full border border-border/60 bg-muted/40 px-2 py-0.5 text-[0.65rem] font-medium tracking-wide text-brand uppercase">
            {t.orgTypes[exp.orgType]}
          </span>
          <span aria-hidden>·</span>
          <span className="inline-flex items-center gap-1">
            <MapPin className="size-3.5" />
            {exp.location}
          </span>
        </div>
        <ul className="mt-3 space-y-1.5">
          {bullets.map((b, bi) => (
            <li key={bi} className="flex gap-2 text-sm text-muted-foreground">
              <span
                aria-hidden
                className="mt-2 size-1.5 shrink-0 rounded-full bg-brand/70"
              />
              <span className="text-pretty">{b}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
