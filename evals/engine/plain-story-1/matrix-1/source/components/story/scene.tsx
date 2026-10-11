"use client";
import { Suspense, lazy, useEffect, useMemo, useRef, useState, type RefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { blankFormation } from "@/lib/story/formation";
import type { Stage } from "@/lib/story/camera";
import type { Controls } from "@/lib/story/controls";
import { beatsOf, chapterNear } from "@/lib/story/story";
import { createQuality, type Quality } from "@/lib/story/quality";
import type { Look } from "@/lib/story/looks";
import type { Playhead } from "@/lib/story/timeline";
import { Conductor, newFrame, type Frame } from "./conductor";
import { Pieces, CAMERA_Z, FOV, type Pointer } from "./pieces";
import { Lighting, Floor } from "./stage";
import { WebGLBoundary } from "./webgl-boundary";
import type { StoryBundle } from "./types";

function Monitor({ bundle, frameRef, onNear, onError, onQuality, coarse, fpsRef }: { bundle: StoryBundle; frameRef: RefObject<Frame>; onNear: (near: string) => void; onError: () => void; onQuality: (quality: Quality) => void; coarse: boolean; fpsRef: RefObject<number> }) {
  const gl = useThree(state => state.gl);
  // Quality remembers the device's budget; each look chooses whether to use it.
  const quality = useRef(createQuality({ dpr: Math.min(window.devicePixelRatio, coarse ? 1.5 : 1.75), shadows: true }));
  const near = useRef(""); const step = useRef(0);
  useEffect(() => {
    const lost = (event: Event) => { event.preventDefault(); onError(); };
    gl.domElement.addEventListener("webglcontextlost", lost);
    return () => gl.domElement.removeEventListener("webglcontextlost", lost);
  }, [gl, onError]);
  useFrame((_, delta) => {
    if (delta > 0 && !document.hidden) {
      fpsRef.current = fpsRef.current ? fpsRef.current * 0.9 + (1 / delta) * 0.1 : 1 / delta;
      const next = quality.current.sample(Math.min(delta * 1000, 250));
      if (next.step !== step.current) { step.current = next.step; onQuality(next); }
    }
    const value = (bundle.extras ?? []).map((extra, index) => chapterNear(bundle.story, extra.chapter, frameRef.current.beat, 0.5) ? index : "").filter(String).join(",");
    if (value !== near.current) { near.current = value; onNear(value); }
  });
  return null;
}
export default function Scene({ bundle, headRef, stageRef, pointerRef, controls, look, still, running, rootRef, fpsRef, onError }: { bundle: StoryBundle; headRef: RefObject<Playhead>; stageRef: RefObject<Stage>; pointerRef: RefObject<Pointer>; controls: Controls; look: Look; still: boolean; running: boolean; rootRef: RefObject<HTMLDivElement | null>; fpsRef: RefObject<number>; onError: () => void }) {
  const frameRef = useRef(newFrame(bundle.story.pieces));
  const formationRef = useRef(blankFormation(bundle.story.pieces));
  const [coarse] = useState(() => window.matchMedia("(pointer: coarse)").matches);
  const [quality, setQuality] = useState<Quality>(() => ({ dpr: Math.min(window.devicePixelRatio, coarse ? 1.5 : 1.75), shadows: true, step: 0 }));
  const [near, setNear] = useState("");
  const extras = useMemo(() => (bundle.extras ?? []).map(extra => ({ ...extra, Component: lazy(extra.load) })), [bundle.extras]);
  const active = near ? near.split(",").map(Number) : [];
  return <Canvas shadows={quality.shadows && look.shadows} dpr={quality.dpr} camera={{ fov: FOV, position: [0, 0, CAMERA_Z] }} frameloop={running ? "always" : "never"}>
    <Conductor headRef={headRef} frameRef={frameRef} still={still} beats={beatsOf(bundle.story).length} />
    <Monitor bundle={bundle} frameRef={frameRef} onNear={setNear} onError={onError} onQuality={setQuality} coarse={coarse} fpsRef={fpsRef} />
    <Lighting look={look} />
    <Pieces key={look.id} bundle={bundle} frameRef={frameRef} stageRef={stageRef} pointerRef={pointerRef} formationRef={formationRef} controls={controls} look={look} coarse={coarse} still={still} rootRef={rootRef} onError={onError}>
      {extras.map(({ chapter, Component }, index) => <WebGLBoundary key={`${chapter}-${index}`}><Suspense fallback={null}>{active.includes(index) ? <Component frameRef={frameRef} look={look} still={still} controls={controls} /> : null}</Suspense></WebGLBoundary>)}
    </Pieces>
    <Floor look={look} formationRef={formationRef} />
  </Canvas>;
}
