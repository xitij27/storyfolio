/*
  Writes content/land.ts: one bit for each of the globe's dots, set where the
  dot is on land. Run once, from a GeoJSON file of country outlines:

    node scripts/land-mask.ts <countries.geojson>

  content/land.ts was made from Natural Earth's 1:110m countries (public
  domain), the file the author's portfolio keeps at content/data/globe.json.
*/
import { readFileSync, writeFileSync } from "node:fs";

import { DOTS, spherePoint } from "../lib/globe.ts";

type Ring = [number, number][];
type Geometry = { type: "Polygon"; coordinates: Ring[] } | { type: "MultiPolygon"; coordinates: Ring[][] };

function inRing(lng: number, lat: number, ring: Ring): boolean {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [xi, yi] = ring[i];
    const [xj, yj] = ring[j];
    if (yi > lat !== yj > lat && lng < ((xj - xi) * (lat - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}

const inPolygon = (lng: number, lat: number, [outer, ...holes]: Ring[]) =>
  inRing(lng, lat, outer) && !holes.some((hole) => inRing(lng, lat, hole));

const file = process.argv[2];
if (!file) throw new Error("Usage: node scripts/land-mask.ts <countries.geojson>");
const { features } = JSON.parse(readFileSync(file, "utf8")) as { features: { geometry: Geometry }[] };
const polygons = features.flatMap(({ geometry }) =>
  geometry.type === "Polygon" ? [geometry.coordinates] : geometry.coordinates,
);

const bytes = new Uint8Array(Math.ceil(DOTS / 8));
let land = 0;
for (let i = 0; i < DOTS; i++) {
  const { lat, lng } = spherePoint(i);
  if (polygons.some((polygon) => inPolygon(lng, lat, polygon))) {
    bytes[i >> 3] |= 1 << (i & 7);
    land++;
  }
}

const out = new URL("../content/land.ts", import.meta.url);
writeFileSync(
  out,
  `/*\n  Which of the globe's ${DOTS} dots are on land, one bit each (lib/globe.ts).\n  Made by scripts/land-mask.ts from Natural Earth 1:110m countries (public\n  domain). ${land} dots are land.\n*/\nexport const LAND =\n  "${Buffer.from(bytes).toString("base64")}";\n`,
);
console.log(`${land} of ${DOTS} dots are land`);
