import type { NextConfig } from "next";

// GitHub Pages serves the site under the repository's name: build with BASE_PATH=/storyfolio there.
const basePath = process.env.BASE_PATH ?? "";

const config: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default config;
