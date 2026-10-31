import type { StoryBundle } from "@/components/story/types";
import { story } from "./story";
import { formations } from "./formations";
import { faces } from "./faces";
import { looks } from "./looks";
import { copy } from "./copy";
import { extras } from "./extras";
import { links } from "./links";

export const bundle = { story, formations, faces, looks, copy, extras, links, defaultLook: "light" } satisfies StoryBundle;
