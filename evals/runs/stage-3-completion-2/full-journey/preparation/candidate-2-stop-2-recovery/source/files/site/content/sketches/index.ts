import type { ComponentType } from "react";
import { FixtureSketch, StateSketch, LeadSketch } from "./concepts";
export const sketches: Record<string, ComponentType> = {fixture:FixtureSketch,states:StateSketch,lead:LeadSketch};
