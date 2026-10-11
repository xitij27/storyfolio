import { createRequire } from "node:module";
import { readdir, writeFile } from "node:fs/promises";
const sharp = createRequire(import.meta.url)("/tmp/storyfolio-engine-acceptance-20261011/node_modules/sharp");

// This reads PNG pixels without editing or resampling any evidence image.
const region = { left: 250, top: 335, rightExclusive: 275, bottomExclusive: 365, redBelow: 230 };
const results = [];
const acceptance = process.argv.includes("--acceptance");
for (const directory of acceptance ? ["matrix-2/dark-phone", "matrix-3/dark-phone"] : ["diagnostic-runtime", "diagnostic-runtime-no-antialias"]) {
  const root = new URL(`./${directory}/`, import.meta.url);
  const files = acceptance ? ["01-middle.fan.png"] : (await readdir(root)).filter(name => name.endsWith(".png") && !name.startsWith("texture-"));
  for (const file of files) {
    const { data, info } = await sharp(new URL(file, root).pathname).raw().toBuffer({ resolveWithObject: true });
    let darkPixels = 0;
    let minimumRed = 255;
    for (let y = region.top; y < region.bottomExclusive; y++) for (let x = region.left; x < region.rightExclusive; x++) {
      const red = data[(y * info.width + x) * info.channels];
      if (red < region.redBelow) darkPixels++;
      minimumRed = Math.min(minimumRed, red);
    }
    results.push({ path: `${directory}/${file}`, darkPixels, minimumRed });
  }
}
const report = { region, results };
await writeFile(new URL(acceptance ? "./phone-acceptance-pixels.json" : "./phone-pixel-comparison.json", import.meta.url), JSON.stringify(report, null, 2) + "\n");
console.log(JSON.stringify(report, null, 2));
