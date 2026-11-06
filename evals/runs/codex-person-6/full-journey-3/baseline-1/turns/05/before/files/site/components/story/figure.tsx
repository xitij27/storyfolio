"use client";

import { useEffect, useMemo } from "react";
import { useThree, type ThreeElements } from "@react-three/fiber";
import { CanvasTexture, SRGBColorSpace } from "three";
import type { Look } from "@/lib/story/looks";
import { useExtraFrame } from "./extra-frame";
import { faceMaterial } from "./face-material";
import { onLand } from "./land";
import { pen, type Pen } from "./pen";

/** A drawing is made again only when its value moves by more than this. */
const STEP = 1 / 400;

export type Draw = (pen: Pen, value: number) => void;

export type FigureProps = Omit<ThreeElements["group"], "children"> & {
  look: Look;
  /** Draws the figure. `value` is what `progress` gives, or 0. */
  draw: Draw;
  /** Read every frame, for a figure that the scroll draws: often the share of its beat scrolled. */
  progress?: () => number;
  /** Size in the scene. */
  width?: number;
  height?: number;
  /** Canvas pixels across. */
  resolution?: number;
  /** The typeface of its words. */
  family?: string;
};

/** A canvas, its texture and material, drawn again only when something it shows has changed. */
function createSheet(look: Look, across: number, down: number, anisotropy: number) {
  const canvas = document.createElement("canvas");
  canvas.width = across; canvas.height = down;
  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace; texture.anisotropy = anisotropy;
  const face = faceMaterial(look, texture);
  face.set(texture, texture, 0);
  let drawn = NaN, made: { draw: Draw; family?: string } | null = null;
  return {
    material: face.material,
    invalidate() { drawn = NaN; },
    paint(draw: Draw, value: number, family?: string) {
      if (value === drawn && made?.draw === draw && made.family === family) return;
      drawn = value; made = { draw, family };
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.save();
      const drawing = pen(ctx, across, down, look, family);
      drawing.paper();
      draw(drawing, value);
      ctx.restore();
      texture.needsUpdate = true;
    },
    dispose() { texture.dispose(); face.material.dispose(); },
  };
}

/**
 * A flat figure drawn with the pen on a sheet in a chapter's scene, lit like
 * the pieces. Use it inside an extra.
 */
export function Figure({ look, draw, progress, width = 3, height = 2, resolution = 1024, family, ...group }: FigureProps) {
  const anisotropy = useThree((state) => Math.min(8, state.gl.capabilities.getMaxAnisotropy()));
  const sheet = useMemo(
    () => createSheet(look, resolution, Math.round((resolution * height) / width), anisotropy),
    [look, resolution, width, height, anisotropy],
  );
  useEffect(() => {
    let live = true;
    void document.fonts.ready.then(() => { if (live) sheet.invalidate(); });
    const stop = onLand(() => sheet.invalidate());
    return () => { live = false; stop(); sheet.dispose(); };
  }, [sheet]);
  useExtraFrame(() => sheet.paint(draw, progress ? Math.round(progress() / STEP) * STEP : 0, family));
  return <group {...group}>
    <mesh material={sheet.material}>
      <planeGeometry args={[width, height]} />
    </mesh>
  </group>;
}
