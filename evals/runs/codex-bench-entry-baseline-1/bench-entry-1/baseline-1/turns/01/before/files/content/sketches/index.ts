import type { ComponentType } from "react";

// Each entry is a client component importing its own bundle. Callback-bearing
// bundles cannot cross a server/client prop boundary.
export const sketches: Record<string, ComponentType> = {};
