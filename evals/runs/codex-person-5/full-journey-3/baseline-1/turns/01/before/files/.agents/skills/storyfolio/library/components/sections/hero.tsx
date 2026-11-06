"use client";

import { ArrowDown, ArrowRight, FileText } from "lucide-react";
import dynamic from "next/dynamic";
import { useReducedMotion } from "motion/react";

import { RotatingText } from "@/components/pieces/rotating-text";
import { useWebGLSupported } from "@/components/use-webgl-supported";
import { WebGLBoundary } from "@/components/webgl-boundary";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { person } from "@/content/sample";

const Starfield = dynamic(() => import("@/components/pieces/starfield"), {
  ssr: false,
});

/** Place in the CSS entrance stagger (`.rise-in` in globals.css). */
const rise = (i: number) => ({ "--i": i }) as React.CSSProperties;

export function Hero() {
  const t = person.hero;
  const reduceMotion = useReducedMotion();
  const webgl = useWebGLSupported();

  return (
    <div>
      <div className="relative isolate flex min-h-[92dvh] flex-col items-center justify-center overflow-hidden">
        {!reduceMotion && webgl === true && (
          <div aria-hidden className="absolute inset-0 z-0">
            <WebGLBoundary>
              <Starfield hue={240} saturation={0.4} twinkle={0.4} />
            </WebGLBoundary>
          </div>
        )}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-transparent via-background/20 to-background"
        />

        <div className="relative z-10 mx-auto w-full max-w-6xl px-page py-24 text-center">
          <p
            style={rise(0)}
            className="rise-in text-sm font-medium tracking-wide text-muted-foreground"
          >
            {t.greeting}
          </p>

          <h1
            style={rise(1)}
            className="rise-in mt-3 font-heading text-5xl font-bold tracking-tight text-balance sm:text-7xl"
          >
            <span className="text-gradient">{person.name}</span>
          </h1>

          <div
            style={rise(2)}
            className="rise-in mt-4 flex items-center justify-center gap-2 text-xl font-semibold sm:text-2xl"
          >
            <span aria-hidden className="text-brand">
              {"</>"}
            </span>
            <RotatingText words={t.roles} />
          </div>

          <p
            style={rise(3)}
            className="rise-in mx-auto mt-6 max-w-2xl text-pretty text-muted-foreground sm:text-lg"
          >
            {t.tagline}
          </p>

          <div
            style={rise(4)}
            className="rise-in mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <a
              href="#projects"
              className={cn(
                buttonVariants({ size: "lg" }),
                "h-11 w-full px-6 text-sm sm:w-auto",
              )}
            >
              {t.cta}
              <ArrowRight className="size-4" />
            </a>
            <a
              href={person.cvPath}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-11 w-full px-6 text-sm sm:w-auto",
              )}
            >
              <FileText className="size-4" />
              {t.resume}
            </a>
          </div>

          <div
            style={rise(5)}
            className="rise-in mt-8 flex items-center justify-center gap-1"
          >
            {person.socials.map((s) => (
              <a
                key={s.id}
                href={s.href}
                target={s.id === "email" ? undefined : "_blank"}
                rel="noopener noreferrer"
                aria-label={s.label}
                className={cn(buttonVariants({ variant: "ghost", size: "icon" }))}
              >
                <s.icon className="size-5" />
              </a>
            ))}
          </div>
        </div>

        {/* Still, not bouncing: it's a way down, and a loop that never
            stops only competes with the page for attention. */}
        <a
          href="#about"
          aria-label={t.scroll}
          className="group relative z-10 mt-8 rounded-full p-2 text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowDown className="size-5 transition-transform duration-200 ease-out-quint group-hover:translate-y-0.5" />
        </a>
      </div>
    </div>
  );
}
