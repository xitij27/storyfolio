import vitals from "file:///tmp/storyfolio-evals/build-embedded-1-GoHJ5r/node_modules/eslint-config-next/dist/core-web-vitals.js";
import typescript from "file:///tmp/storyfolio-evals/build-embedded-1-GoHJ5r/node_modules/eslint-config-next/dist/typescript.js";
export default [...vitals, ...typescript, { ignores: [".next/**", "out/**", "checks/**", "next-env.d.ts"] }];
