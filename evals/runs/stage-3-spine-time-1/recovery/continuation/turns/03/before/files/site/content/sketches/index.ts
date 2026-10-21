import type { ComponentType } from "react";
import {FixtureSketch,SensorSketch,LoomSketch} from "./concepts";
export const sketches: Record<string,ComponentType>={fixture:FixtureSketch,sensor:SensorSketch,loom:LoomSketch};
