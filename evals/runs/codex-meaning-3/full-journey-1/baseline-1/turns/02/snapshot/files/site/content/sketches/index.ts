import type { ComponentType } from "react";
import { FixtureSketch, DialSketch, RackSketch } from "./concepts";
export const sketches: Record<string, ComponentType> = {fixture:FixtureSketch,dial:DialSketch,rack:RackSketch};
