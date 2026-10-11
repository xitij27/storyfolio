import type { NextConfig } from "next";
import path from "node:path";
// This in-repository study may reuse the repository's installed dependency cache.
const config: NextConfig = { agentRules: false, devIndicators: false, turbopack: { root: path.resolve(__dirname, "../..") } };
export default config;
