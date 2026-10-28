// What every world (the sheet, the map, the book) offers the stage.
import type * as THREE from "three";
import type { ChapterKey } from "./chapters.ts";
import type { WorldId } from "./mix.ts";
import type { Person, Project } from "./person.ts";
import type { Land } from "./land.ts";
import type { Palette } from "./look.ts";

export type WorldEnv = { person: Person; palette: Palette; renderer: THREE.WebGLRenderer; land: Land; narrow: () => boolean };

/** Where the story stands inside one world: chapter keys, the eased move t, its raw share, the hold's share and the clock. */
export type WorldView = { from: ChapterKey; to: ChapterKey; t: number; raw: number; local: number; time: number };

/** Where a window to the next world opens: its middle, which way it faces (+z), and how high it is. */
export type Anchor = { position: THREE.Vector3; quaternion: THREE.Quaternion; height: number };

export interface World {
  readonly id: WorldId;
  /** Has an opaque background of its own. */
  readonly scene: THREE.Scene;
  readonly camera: THREE.PerspectiveCamera;
  /** Stateless: the same view always gives the same picture. */
  pose(view: WorldView): void;
  /** Where a window to the next world opens, at that chapter's hold. */
  anchor(chapter: ChapterKey): Anchor;
  /** The project under a point on the screen (-1 to 1 each way) while a chapter holds. */
  pick(ndc: THREE.Vector2, chapter: ChapterKey): Project | null;
  resize(aspect: number): void;
  dispose(): void;
}

export type WorldFactory = (env: WorldEnv, chapters: ChapterKey[]) => Promise<World>;

/** A view that holds a chapter. */
export const holding = (key: ChapterKey, local: number, time = 0): WorldView => ({ from: key, to: key, t: 0, raw: 0, local, time });
