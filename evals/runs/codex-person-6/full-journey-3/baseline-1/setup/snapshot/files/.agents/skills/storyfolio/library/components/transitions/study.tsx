"use client";

import dynamic from "next/dynamic";
import { useReducedMotion } from "motion/react";

import { ScrollStage } from "@/components/lab/scroll-stage";
import { Guarded } from "@/demos/three";

import type { WayId } from "./ways";

const Seam = dynamic(() => import("./seam"), { ssr: false });

/** The seam as a pinned section: the pipeline at its top, the map at its foot, the way between them in the middle. */
export function Study({ way }: { way: WayId }) {
  const still = useReducedMotion() ?? false;
  return (
    <Guarded>
      <ScrollStage
        screens={3}
        captions={[
          { heading: true, title: "The pipeline", body: "Timetables flow into the delay forecaster Noa built at Fernhill Transit Lab, in Zurich." },
          { title: "Where from", body: "Gothenburg, then Delft, then Zurich. Montreal now." },
        ]}
      >
        {(progress) => <Seam way={way} progress={progress} still={still} />}
      </ScrollStage>
      <div className="h-[40dvh] bg-[#0b1416]" />
    </Guarded>
  );
}
