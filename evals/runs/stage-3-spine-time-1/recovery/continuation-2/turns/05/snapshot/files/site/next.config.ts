import type { NextConfig } from "next";
const config: NextConfig = { distDir: process.env.STORYFOLIO_DIST_DIR ?? ".next" };
export default config;
