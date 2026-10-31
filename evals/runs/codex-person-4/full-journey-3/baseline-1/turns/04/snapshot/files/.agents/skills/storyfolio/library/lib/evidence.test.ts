import assert from "node:assert/strict";
import { test } from "node:test";

import { getEvidence } from "./evidence.ts";

const role = (id: string, bullets: string[]) => ({
  id, bullets, company: id, role: "", orgType: "mnc" as const, location: "", start: "2020-01", end: null, logoInitials: "",
});
const project = (id: string, tech: string[]) => ({
  id, tech, title: id, category: "swe" as const, description: "", images: [],
});

test("a skill is traced to the roles and projects that name it", () => {
  const evidence = getEvidence(
    [{ id: "backend", name: "Backend", skills: ["Java", "Node.js", "Rust"] }],
    [project("p1", ["JavaScript"]), project("p2", ["Java", "Node"])],
    [role("r1", ["Wrote services in Node."]), role("r2", ["Moved off JavaScript."])],
  );
  assert.deepEqual(evidence["Java"], { projectIds: ["p2"], roleIds: [] });
  assert.deepEqual(evidence["Node.js"], { projectIds: ["p2"], roleIds: ["r1"] });
  assert.deepEqual(evidence["Rust"], { projectIds: [], roleIds: [] });
});
