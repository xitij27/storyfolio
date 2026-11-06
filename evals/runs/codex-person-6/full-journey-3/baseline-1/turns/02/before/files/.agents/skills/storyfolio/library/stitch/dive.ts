// The dive: how two chapters in different worlds join. A window showing the
// next world opens in the last one, then the camera flies into it until the
// window fills the view and the next world takes over. Pure.
import { fillDistance } from "./frame.ts";
import { clamp, ease } from "./scroll.ts";

/** The window fades in over the first 0.35 of the move; then the camera flies, easing in and out. */
export const FADE_END = 0.35;
export function diveSteps(raw: number): { fade: number; fly: number } {
  return { fade: clamp(raw / FADE_END), fly: ease(clamp((raw - FADE_END) / (1 - FADE_END))) };
}

type V3 = [number, number, number];

/**
 * The card a dive's window is printed on: the largest that holds a picture
 * the screen's shape (aspect wide to 1 high) with a border of `margin` of the
 * card's height all round, within 0.8 of the element it stands on.
 */
export function fitCard(element: { w: number; h: number }, aspect: number, margin = 0.06): { w: number; h: number; picture: { w: number; h: number } } {
  const wide = aspect * (1 - 2 * margin) + 2 * margin; // the card's width for a height of 1
  const h = Math.min(0.8 * element.h, (0.8 * element.w) / wide);
  return { w: h * wide, h, picture: { w: aspect * (1 - 2 * margin) * h, h: (1 - 2 * margin) * h } };
}

/** Where a camera stands so a window this high, facing along `normal`, fills its view. */
export function fillPose(anchor: { position: V3; normal: V3 }, fovDeg: number, height: number): V3 {
  const [x, y, z] = anchor.position, [a, b, c] = anchor.normal;
  const len = Math.hypot(a, b, c) || 1;
  const d = fillDistance(fovDeg, height);
  return [x + (a / len) * d, y + (b / len) * d, z + (c / len) * d];
}

/** The window's picture: half float where the GPU can draw into it, which keeps dark scenes smooth; plain bytes elsewhere. */
export function windowType(has: (extension: string) => boolean): "half" | "byte" {
  return has("EXT_color_buffer_float") || has("EXT_color_buffer_half_float") ? "half" : "byte";
}
