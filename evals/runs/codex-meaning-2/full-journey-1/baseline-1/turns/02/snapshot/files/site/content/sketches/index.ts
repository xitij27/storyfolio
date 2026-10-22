import type { ComponentType } from "react";
import { FixtureSketch, SamplesSketch, TerminalSketch } from "./concepts";
export const sketches: Record<string, ComponentType> = {fixture:FixtureSketch,samples:SamplesSketch,terminal:TerminalSketch};
