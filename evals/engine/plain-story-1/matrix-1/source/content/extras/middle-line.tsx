"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Mesh } from "three";
import type { ExtraProps } from "@/components/story/types";

export default function MiddleLine({ frameRef, look }: ExtraProps) {
  const lineRef = useRef<Mesh>(null);
  useFrame(() => {
    if (lineRef.current) lineRef.current.visible = frameRef.current.from === 1 && frameRef.current.to === 1;
  });
  return <mesh ref={lineRef} position={[0, -1.6, 0]}>
    <boxGeometry args={[3.0, 0.025, 0.025]} />
    <meshBasicMaterial color={look.accent} />
  </mesh>;
}
