import type { ComponentType } from "react";
import { FixtureConcept, HarnessConcept, EnclosureConcept } from "./concepts";
export const sketches: Record<string, ComponentType> = {fixture:FixtureConcept,harness:HarnessConcept,enclosure:EnclosureConcept};
