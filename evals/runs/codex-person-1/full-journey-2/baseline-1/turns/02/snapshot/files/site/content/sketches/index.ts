import type { ComponentType } from "react";
import { RunbookSketch, ChecklistSketch, RollbackSketch } from "./concept";
export const sketches: Record<string, ComponentType> = {
  runbook: RunbookSketch,
  checklist: ChecklistSketch,
  rollback: RollbackSketch,
};
