import type { ComponentType } from 'react';
import { FixtureSketch, SensorSketch, HarnessSketch } from './concepts';
export const sketches: Record<string, ComponentType> = {fixture:FixtureSketch,sensor:SensorSketch,harness:HarnessSketch};
