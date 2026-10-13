import type { ComponentType } from "react";
import { FixtureSketch, EnclosureSketch, ProbeSketch } from "./concepts";
export const sketches: Record<string, ComponentType> = {fixture:FixtureSketch,enclosure:EnclosureSketch,probe:ProbeSketch};
