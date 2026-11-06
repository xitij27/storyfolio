"use client";
import { useRef, type RefObject } from "react";
import { useFrame } from "@react-three/fiber";
import { SPREAD, smoothstep, stagger } from "@/lib/story/formation";
import { approach, phase, place, settle, type Playhead } from "@/lib/story/timeline";
export type Frame = { beat: number; from: number; to: number; t: number; raw: number; each: Float32Array; dwell: number; time: number; narrow: boolean };
export function newFrame(pieces: number): Frame { return { beat: 0, from: 0, to: 0, t: 0, raw: 0, each: new Float32Array(pieces), dwell: 0, time: 0, narrow: false }; }
export function Conductor({ headRef, frameRef, still, beats }: { headRef: RefObject<Playhead>; frameRef: RefObject<Frame>; still: boolean; beats: number }) {
  const eased = useRef<number | null>(null);
  useFrame((state, delta) => {
    const target = phase(headRef.current);
    const u = still ? settle(target) : approach(eased.current, target, 5, delta);
    eased.current = u;
    const at = place(u, beats);
    const frame = frameRef.current;
    frame.from = at.from; frame.to = at.to; frame.raw = at.t; frame.t = smoothstep(at.t, 0, 1);
    for (let i = 0; i < frame.each.length; i++) frame.each[i] = smoothstep(stagger(at.t, i, frame.each.length, SPREAD), 0, 1);
    frame.beat = at.from + frame.t; frame.dwell = at.dwell;
    frame.time = still ? 0 : state.clock.elapsedTime;
    frame.narrow = state.size.width < 768 || state.size.width < state.size.height;
  });
  return null;
}
