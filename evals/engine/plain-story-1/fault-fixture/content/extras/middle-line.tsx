"use client";

import { useRef } from "react";
import { useExtraFrame } from "@/components/story/extra-frame";
import type { Mesh } from "three";
import type { ExtraProps } from "@/components/story/types";

export default function MiddleLine({ look }: ExtraProps) {
  const lineRef = useRef<Mesh>(null);
  useExtraFrame(() => {
    throw new Error("Intentional extra frame failure for verification");
  });
  return <mesh ref={lineRef} position={[0, -1.6, 0]}>
    <boxGeometry args={[3.0, 0.025, 0.025]} />
    <meshBasicMaterial color={look.accent} />
  </mesh>;
}
