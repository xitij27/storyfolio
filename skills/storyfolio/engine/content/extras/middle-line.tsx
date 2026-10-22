"use client";

import { useRef } from "react";
import { useExtraFrame } from "@/components/story/extra-frame";
import { chapterPresence } from "@/lib/story/story";
import type { Mesh, MeshBasicMaterial } from "three";
import type { ExtraProps } from "@/components/story/types";
import { story } from "@/content/story";

// The line grows out of nothing as the reader scrolls into the chapter and draws back as they leave.
export default function MiddleLine({ frameRef, look }: ExtraProps) {
  const lineRef = useRef<Mesh>(null);
  useExtraFrame(() => {
    const line = lineRef.current;
    if (!line) return;
    const shown = chapterPresence(story, "middle", frameRef.current.beat);
    line.visible = shown > 0;
    line.scale.x = Math.max(shown, 0.001);
    (line.material as MeshBasicMaterial).opacity = shown;
  });
  return <mesh ref={lineRef} position={[0, -1.6, 0]}>
    <boxGeometry args={[3.0, 0.025, 0.025]} />
    <meshBasicMaterial color={look.accent} transparent />
  </mesh>;
}
