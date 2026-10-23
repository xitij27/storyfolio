"use client";

import { useRef, useState, type ReactNode } from "react";
import dynamic from "next/dynamic";
import { useReducedMotion } from "motion/react";

import { ScrollStage, type Caption } from "@/components/lab/scroll-stage";
import { useWebGLSupported } from "@/components/use-webgl-supported";
import { WebGLBoundary } from "@/components/webgl-boundary";
import { asset, person } from "@/content/sample";

/* The pieces drawn in WebGL, each shown with the made-up person. */

const Starfield = dynamic(() => import("@/components/pieces/starfield"), { ssr: false });
const DotGlobe = dynamic(() => import("@/components/pieces/dot-globe"), { ssr: false });
const RouteScene = dynamic(() => import("@/components/lab/route-scene"), { ssr: false });
const LayersScene = dynamic(() => import("@/components/lab/layers-scene"), { ssr: false });
const SpectrogramScene = dynamic(() => import("@/components/lab/spectrogram-scene"), { ssr: false });
const DataPointsScene = dynamic(() => import("@/components/paper/exhibits").then((m) => m.DataPointsScene), { ssr: false });
const StackScene = dynamic(() => import("@/components/paper/exhibits").then((m) => m.StackScene), { ssr: false });
const NetworkScene = dynamic(() => import("@/components/paper/exhibits").then((m) => m.NetworkScene), { ssr: false });

export function Guarded({ children }: { children: ReactNode }) {
  const webgl = useWebGLSupported();
  if (webgl === false) {
    return <p className="mx-auto max-w-6xl px-page py-24 text-muted-foreground">This piece needs WebGL, which this browser has switched off.</p>;
  }
  return webgl ? <WebGLBoundary>{children}</WebGLBoundary> : null;
}

/** A scroll scene, with room after it to scroll it to its end. */
function Scrolled({ screens, captions, controls, children }: { screens: number; captions: Caption[]; controls?: ReactNode; children: Parameters<typeof ScrollStage>[0]["children"] }) {
  return (
    <Guarded>
      <ScrollStage screens={screens} captions={captions} controls={controls}>
        {children}
      </ScrollStage>
      <div className="h-[30dvh] bg-[#0c1018]" />
    </Guarded>
  );
}

export function StarfieldDemo() {
  const still = useReducedMotion() ?? false;
  return (
    <section className="relative isolate grid h-[75dvh] place-items-center overflow-hidden">
      <div aria-hidden className="absolute inset-0 -z-10">
        <Guarded>
          <Starfield still={still} />
        </Guarded>
      </div>
      <h2 className="font-heading text-5xl font-bold tracking-tight sm:text-7xl">
        <span className="text-gradient">{person.name}</span>
      </h2>
    </section>
  );
}

export function DotGlobeDemo() {
  const still = useReducedMotion() ?? false;
  return (
    <div className="mx-auto h-[75dvh] max-w-3xl">
      <Guarded>
        <DotGlobe places={person.journey} still={still} />
      </Guarded>
    </div>
  );
}

const ROUTE: Caption[] = [
  { heading: true, title: "Gothenburg", body: "Where Noa grew up." },
  { title: "Delft", body: "Studied computer science, with an internship at Tidewater Data." },
  { title: "Zurich", body: "Software engineer at Larkspur Robotics, then research engineer at Fernhill Transit Lab." },
  { title: "Montreal", body: "Where Noa lives now." },
];

export function RouteDemo() {
  const still = useReducedMotion() ?? false;
  return (
    <Scrolled screens={4} captions={ROUTE}>
      {(progress) => <RouteScene progress={progress} stops={person.journey} still={still} />}
    </Scrolled>
  );
}

const LAYERS: Caption[] = [
  { heading: true, title: person.name, body: person.hero.tagline },
  { title: "Models", body: "A delay forecaster for regional trains, in Python and PyTorch." },
  { title: "Systems", body: "A fleet dashboard in React and TypeScript, its services in Node.js and Docker." },
  { title: "Made", body: person.projects.subtitle },
];

export function LayersDemo() {
  const still = useReducedMotion() ?? false;
  return (
    <Scrolled screens={5} captions={LAYERS}>
      {(progress) => (
        <LayersScene
          progress={progress}
          still={still}
          content={{
            networkImages: [asset("/sample/street-gray.svg"), asset("/sample/street.svg")],
            projectImages: Array.from({ length: 9 }, (_, i) => asset(`/sample/screens/${i + 1}.svg`)),
            tiers: ["Interface · React", "API · Node.js", "Hosting · Docker on AWS"],
          }}
        />
      )}
    </Scrolled>
  );
}

const EXHIBIT: Caption[] = [
  {
    heading: true,
    title: "Speech in noise",
    body: "A final-year project: models that find speech in noisy audio. This is sound seen from above, time running left to right.",
    note: "Amber marks where the detector hears speech; the pale strip is where speech actually is. Add noise and watch them drift apart.",
  },
  {
    title: "The same sound, as terrain",
    body: "Each ridge is energy at one pitch. Speech has peaks; noise is flat. That difference is what a detector learns to see.",
    note: "Schematic: the audio is synthesised, and a simple spectral-peak rule stands in for a trained model.",
  },
];

export function SpectrogramDemo() {
  const still = useReducedMotion() ?? false;
  const noise = useRef(0.15);
  const [label, setLabel] = useState(15);
  return (
    <Scrolled
      screens={2.5}
      captions={EXHIBIT}
      controls={
        <label className="flex items-center gap-3 rounded-md border border-white/15 bg-black/40 px-3 py-2 text-sm text-white/80">
          Noise
          <input
            type="range"
            name="noise"
            min={0}
            max={100}
            step={1}
            defaultValue={15}
            onChange={(e) => {
              noise.current = Number(e.target.value) / 100;
              setLabel(Number(e.target.value));
            }}
            className="w-40 accent-[#f2b84b]"
          />
          <span className="w-10 text-right tabular-nums">{label}%</span>
        </label>
      }
    >
      {(progress) => <SpectrogramScene progress={progress} noise={noise} still={still} />}
    </Scrolled>
  );
}

export function DataPointsDemo() {
  return (
    <Scrolled
      screens={2.5}
      captions={[
        { heading: true, title: "Scattered", body: "Readings printed over the desk, before anyone has looked at them." },
        { title: "Sorted", body: "Scrolled through, they lift off the page and gather into three clusters. Scroll back and they lie down again." },
      ]}
    >
      {(progress) => <DataPointsScene progress={progress} />}
    </Scrolled>
  );
}

export function StackDemo() {
  const still = useReducedMotion() ?? false;
  return (
    <Scrolled
      screens={2.5}
      captions={[
        { heading: true, title: "The system", body: "The fleet dashboard Noa built at Larkspur Robotics, as three tiers." },
        { title: "Requests", body: "Each dot is a request travelling down through the tiers and back." },
      ]}
    >
      {(progress) => <StackScene progress={progress} still={still} tiers={["Interface · React", "Services · Node.js", "Hosting · Docker on AWS"]} />}
    </Scrolled>
  );
}

export function NetworkDemo() {
  const still = useReducedMotion() ?? false;
  return (
    <Scrolled
      screens={2.5}
      captions={[
        { heading: true, title: "An encoder-decoder", body: "Wide at both ends, narrow in the middle: the shape of the photo colouriser's network." },
        { title: "Skip connections", body: "Each layer on the way in hands its detail straight across to its mirror on the way out." },
      ]}
    >
      {(progress) => <NetworkScene progress={progress} still={still} />}
    </Scrolled>
  );
}
