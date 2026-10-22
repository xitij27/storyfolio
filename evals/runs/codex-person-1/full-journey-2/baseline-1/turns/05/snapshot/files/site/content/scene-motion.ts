import type { Group } from "three";
import { weight } from "../lib/story/timeline.ts";
import type { Frame } from "../components/story/conductor.tsx";
export function reveal(group: Group | null, frame: Frame, index: number) {
  const w = Math.max(0, 2 * weight(frame.beat, index) - 1);
  if (group) { group.visible = w > .001; group.scale.y = Math.max(.001, w); }
}
export function progress(frame: Frame, index: number, still: boolean) {
  const value = frame.from > index ? 1 : frame.from < index ? 0 : frame.dwell;
  return still ? (value < .5 ? 0 : 1) : value;
}
