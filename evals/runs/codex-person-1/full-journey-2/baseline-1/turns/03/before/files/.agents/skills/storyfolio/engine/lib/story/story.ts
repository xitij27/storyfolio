import type { BeatFormation, Formation } from "./formation.ts";

export type ChapterRole = "opening" | "who" | "where" | "how" | "what" | "outcomes" | "others" | "close";
export type BeatDef = { id: string; height: number };
export type ChapterDef = {
  id: string;
  number: number;
  name: string;
  role: ChapterRole;
  beats: readonly BeatDef[];
};
export type StoryDef = { pieces: number; chapters: readonly ChapterDef[] };
export type BeatIdOf<S extends StoryDef> = S["chapters"][number]["beats"][number]["id"];

/** Beats are flattened in reading order; the story remains the source of truth. */
export function beatsOf<S extends StoryDef>(story: S): S["chapters"][number]["beats"][number][] {
  return story.chapters.flatMap((chapter) => chapter.beats);
}

export function beatIndex(story: StoryDef, id: string): number {
  return beatsOf(story).findIndex((beat) => beat.id === id);
}

export function beatHeight(story: StoryDef, id: string): number {
  const beat = beatsOf(story).find((entry) => entry.id === id);
  if (!beat) throw new Error(`Unknown beat: ${id}`);
  return beat.height;
}

/** The chapter being read, including while travelling between two beats. */
export function chapterAt(story: StoryDef, beat: number): string | undefined {
  const chapters = story.chapters.flatMap((chapter) => chapter.beats.map(() => chapter.id));
  const nearest = Number.isFinite(beat) ? Math.round(beat) : 0;
  return chapters[Math.min(Math.max(nearest, 0), chapters.length - 1)];
}

export function chapterNear(story: StoryDef, id: string, beat: number, reach = 1.5): boolean {
  let first = 0;
  for (const chapter of story.chapters) {
    if (chapter.id === id) {
      return chapter.beats.length > 0 && beat >= first - reach && beat <= first + chapter.beats.length - 1 + reach;
    }
    first += chapter.beats.length;
  }
  return false;
}

export function chapterNumber(story: StoryDef, id: string): number {
  return story.chapters.find((chapter) => chapter.id === id)?.number ?? 0;
}

/** Reports content mistakes before the scene tries to render the bundle. */
export function checkStory(
  story: StoryDef,
  formations: Readonly<Partial<Record<string, BeatFormation>>>,
  faces: readonly { beat: string; piece: number }[] = [],
): string[] {
  const problems: string[] = [];
  if (!Number.isInteger(story.pieces) || story.pieces < 1) problems.push("pieces must be a positive integer");
  if (story.chapters.length === 0) problems.push("story must have a chapter");
  const ids = new Set<string>();
  const beats = new Set<string>();
  const register = (id: string) => {
    if (!id.trim()) problems.push("id must not be empty");
    if (ids.has(id)) problems.push(`id used twice: ${id}`);
    ids.add(id);
  };
  const inspect = (formation: Formation, label: string) => {
    if (formation.pieces.length !== story.pieces) problems.push(`${label}: wrong number of poses (${formation.pieces.length}, expected ${story.pieces})`);
    const values = [
      ...formation.turn, ...formation.anchor, ...formation.sway,
      formation.drift, formation.span, formation.rise, formation.near, formation.floor, formation.over,
      ...formation.pieces.flatMap((pose) => [...pose.position, ...pose.rotation, ...pose.size]),
    ];
    if (!values.every(Number.isFinite)) problems.push(`${label}: formation numbers must be finite`);
    if (formation.pieces.some((pose) => pose.size.some((size) => size <= 0))) problems.push(`${label}: piece sizes must be positive`);
    if (formation.span < 0 || formation.rise < 0 || formation.near < 0) problems.push(`${label}: framing dimensions must not be negative`);
  };
  for (const chapter of story.chapters) {
    register(chapter.id);
    if (!Number.isFinite(chapter.number)) problems.push(`${chapter.id}: chapter number must be finite`);
    if (chapter.beats.length === 0) problems.push(`${chapter.id}: chapter must have a beat`);
    for (const beat of chapter.beats) {
      register(beat.id);
      beats.add(beat.id);
      if (!Number.isFinite(beat.height) || beat.height < 1) problems.push(`${beat.id}: height must be finite and at least 1`);
      const formation = formations[beat.id];
      if (!formation) problems.push(`${beat.id}: missing formation`);
      else {
        inspect(formation.rest, `${beat.id}.rest`);
        if (formation.within) inspect(formation.within, `${beat.id}.within`);
      }
    }
  }
  for (const id of Object.keys(formations)) {
    if (!beats.has(id)) problems.push(`formation names missing beat: ${id}`);
  }
  for (const face of faces) {
    if (!beats.has(face.beat)) problems.push(`face names missing beat: ${face.beat}`);
    if (!Number.isInteger(face.piece) || face.piece < 0 || face.piece >= story.pieces) problems.push(`face names missing piece: ${face.piece}`);
  }
  return problems;
}
