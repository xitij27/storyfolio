import { beatsOf, checkStory } from "../../lib/story/story.ts";
import type { StoryBundle } from "./types.ts";

/** Validate the parts of a bundle that are not part of the pure story data. */
export function checkBundle(bundle: StoryBundle): string[] {
  const problems = checkStory(bundle.story, bundle.formations, bundle.faces);
  const beats = new Set(beatsOf(bundle.story).map(beat => beat.id));
  const chapters = new Set(bundle.story.chapters.map(chapter => chapter.id));
  const unique = (ids: readonly string[], kind: string) => {
    const seen = new Set<string>();
    for (const id of ids) {
      if (!id.trim()) problems.push(`${kind} id must not be empty`);
      if (seen.has(id)) problems.push(`${kind} id used twice: ${id}`);
      seen.add(id);
    }
  };
  unique(bundle.faces.map(face => face.id), "face");
  unique(bundle.looks.map(look => look.id), "look");
  if (!bundle.looks.length) problems.push("bundle must have a look");
  if (bundle.defaultLook && !bundle.looks.some(look => look.id === bundle.defaultLook)) problems.push(`default look is missing: ${bundle.defaultLook}`);
  const assigned = new Set<string>();
  for (const face of bundle.faces) {
    const key = `${face.beat}:${face.piece}`;
    if (assigned.has(key)) problems.push(`two faces assigned to ${key}`);
    assigned.add(key);
    if (!face.src && !face.draw) problems.push(`face has no source or drawing: ${face.id}`);
  }
  for (const link of bundle.links ?? []) {
    if (!beats.has(link.beat)) problems.push(`link names missing beat: ${link.beat}`);
    if (!Number.isInteger(link.piece) || link.piece < 0 || link.piece >= bundle.story.pieces) problems.push(`link names missing piece: ${link.piece}`);
    if (!link.label.trim() || !link.href.trim()) problems.push("link must have a label and destination");
  }
  for (const extra of bundle.extras ?? []) if (!chapters.has(extra.chapter)) problems.push(`extra names missing chapter: ${extra.chapter}`);
  return problems;
}
