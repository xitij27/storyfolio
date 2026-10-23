// Packs Natural Earth land and border GeoJSON into flat rounded arrays.
// node land.mjs <land.geojson> <borders.geojson> <out.json>
import { readFileSync, writeFileSync } from "node:fs";
const [landPath, bordersPath, out] = process.argv.slice(2);
const round = (n) => Math.round(n * 100) / 100;
function flat(ring) {
  const result = [];
  for (const [lng, lat] of ring) {
    const x = round(lng), y = round(lat);
    if (result.length && result.at(-2) === x && result.at(-1) === y) continue;
    result.push(x, y);
  }
  return result;
}
const lines = (path, polygonal) => JSON.parse(readFileSync(path, "utf8")).features.flatMap(({ geometry: g }) => {
  const parts = g.type.startsWith("Multi") ? g.coordinates : [g.coordinates];
  return polygonal ? parts.flatMap((polygon) => polygon.map(flat)) : parts.map(flat);
}).filter((ring) => ring.length >= 4);
const data = { land: lines(landPath, true), borders: lines(bordersPath, false) };
writeFileSync(out, JSON.stringify(data));
console.log(out, data.land.length, "land rings", data.borders.length, "borders", JSON.stringify(data).length, "bytes");
