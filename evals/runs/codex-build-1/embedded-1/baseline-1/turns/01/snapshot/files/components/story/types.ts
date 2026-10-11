import type { ComponentType, RefObject } from "react";
import type { MeshStandardMaterial } from "three";
import type { BeatFormation } from "@/lib/story/formation";
import type { StoryDef } from "@/lib/story/story";
import type { Look } from "@/lib/story/looks";
import type { Controls } from "@/lib/story/controls";
import type { Frame } from "./conductor";

export type FaceDef = {
  id: string;
  beat: string;
  piece: number;
  src?: string;
  /** Printed width / height; defaults to the starter portrait card ratio. */
  aspect?: number;
  draw?: (context: CanvasRenderingContext2D, width: number, height: number, look: Look) => void;
};
export type StoryLink = { beat: string; piece: number; href: string; label: string };
/** Frame callbacks in optional extras use useExtraFrame to contain failures. */
export type ExtraProps = { frameRef: RefObject<Frame>; look: Look; still: boolean; controls: Controls };
export type PieceProps = { index: number; material: MeshStandardMaterial; look: Look };
export type StoryBundle = {
  story: StoryDef;
  formations: Record<string, BeatFormation>;
  faces: readonly FaceDef[];
  looks: readonly Look[];
  defaultLook?: string;
  copy: { railLabel: string; lookLabel: string; fpsLabel?: string };
  extras?: readonly { chapter: string; load: () => Promise<{ default: ComponentType<ExtraProps> }> }[];
  links?: readonly StoryLink[];
  Piece?: ComponentType<PieceProps>;
};
