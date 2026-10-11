import vitals from "file:///home/kshitij/projects/storyfolio/node_modules/storyfolio-build-dependencies-20261011/node_modules/eslint-config-next/dist/core-web-vitals.js";
import typescript from "file:///home/kshitij/projects/storyfolio/node_modules/storyfolio-build-dependencies-20261011/node_modules/eslint-config-next/dist/typescript.js";
export default [...vitals, ...typescript, { ignores: [".next/**", "out/**", "checks/**", "next-env.d.ts"] }];
