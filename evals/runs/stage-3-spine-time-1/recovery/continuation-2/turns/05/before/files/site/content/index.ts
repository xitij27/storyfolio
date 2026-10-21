import type { StoryBundle } from "@/components/story/types";
import { story } from "./story";
import { formations } from "./formations";
import { faces } from "./faces";
import { looks } from "./looks";
import { copy } from "./copy";
import { FixtureSegment } from "./fixture/piece";
export const bundle = { story, formations, faces, looks, copy, Piece: FixtureSegment, defaultLook: "light" } satisfies StoryBundle;
