"use client";

import { useMemo, useRef, type RefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Edges, Html, Line } from "@react-three/drei";
import * as THREE from "three";
import type { Line2 } from "three-stdlib";

import { person } from "@/content/sample";
import { LAND } from "@/content/land";
import { landDots } from "@/lib/globe";
import { blend, pointAt, resample, smoothstep, subPath, type P } from "@/lib/morph";
import { rand } from "@/lib/rand";

import type { WayId } from "./ways";

/*
  One seam between two chapters, joined four ways. Picture A is a data
  pipeline: timetables flow from a store in Zurich into a forecast store.
  Picture B is where the person has lived: a route across a dot map,
  Gothenburg, Delft, Zurich, Montreal. Both read one number, how far the
  section has been scrolled, so every way runs backwards as well as forwards.
*/

const BG = "#0b1416";
const GRID = "#1b302f";
const INK = "#dfeee0";
const MUTED = "#5f8079";
const ACCENT = "#f2b84b";
const STORE = "#cfe3d6";

/** Longitude and latitude onto the floor, equirectangular, narrowed for latitude 52. */
const project = (lng: number, lat: number): P => [(lng + 27.5) * 0.08, 0, -(lat - 51.5) * 0.13];
const lerp3 = (a: P, b: P, t: number): P => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
const len = (path: P[]) => path.slice(1).reduce((s, p, i) => s + Math.hypot(p[0] - path[i][0], p[1] - path[i][1], p[2] - path[i][2]), 0);

/* ---------- Picture B: the route ---------- */

const CITIES = person.journey.map((place) => ({ name: place.name, at: project(place.lng, place.lat) }));
const [G, D, Z, M] = CITIES.map((c) => c.at);
const straight = (a: P, b: P, n: number) => Array.from({ length: n }, (_, i) => lerp3(a, b, i / (n - 1)));
// The ocean crossing is lifted into an arc, as a flight is drawn.
const CROSSING = Array.from({ length: 48 }, (_, i) => {
  const u = i / 47;
  const p = lerp3(Z, M, u);
  return [p[0], 1.1 * Math.sin(Math.PI * u), p[2] - 0.5 * Math.sin(Math.PI * u)] as P;
});
const ROUTE: P[] = [...straight(G, D, 8), ...straight(D, Z, 8).slice(1), ...CROSSING.slice(1)].map(([x, y, z]) => [x, y + 0.02, z]);
/** How far along the route each city is, 0 to 1. */
const ALONG = [0, len(straight(G, D, 8)) / len(ROUTE), (len(straight(G, D, 8)) + len(straight(D, Z, 8))) / len(ROUTE), 1];

const LAND_DOTS = landDots(LAND)
  .filter(({ lat, lng }) => lng > -80 && lng < 25 && lat > 36 && lat < 66)
  .map(({ lat, lng }) => project(lng, lat));
const FAR = Math.max(...LAND_DOTS.map((p) => Math.hypot(p[0] - Z[0], p[2] - Z[2])));

/* ---------- Picture A: the pipeline ---------- */

const SOURCE: P = [Z[0], 0.2, Z[2]];
const FORECAST: P = [-2.9, 0.2, 0.6];
const PIPE: P[] = new THREE.CatmullRomCurve3(
  [[Z[0], 0.25, Z[2]], [1.2, 0.25, -0.6], [-1, 0.25, 1.2], [FORECAST[0], 0.25, FORECAST[2]]].map(([x, y, z]) => new THREE.Vector3(x, y, z)),
)
  .getPoints(80)
  .map((v) => [v.x, v.y, v.z] as P);

/* Both lines as the same number of evenly spaced points, so one can become the other. */
const N = 96;
const PIPE_N = resample(PIPE, N);
const ROUTE_N = resample(ROUTE, N);

/* ---------- The camera dive: picture B lies small on the source store's lid ---------- */

/** The map's plate, in its own units; at DIVE scale it just fits inside the round lid. */
const PLATE = { w: 9.6, d: 4.8, z: 0.1 };
const DIVE = 0.08;
const LID: P = [SOURCE[0], 0.405, SOURCE[2]];
const B_AT = new THREE.Vector3(LID[0], LID[1], LID[2] - DIVE * PLATE.z);

const LOOK = new THREE.Vector3(-0.25, 0, 0.9);
const VIEW = LOOK.clone().add(new THREE.Vector3(0.2, 4.6, 5.6));

const flat = (path: P[]) => path.flat();
const RECORDS = 6;
const dummy = new THREE.Object3D();

function Label({ at, text, set }: { at: P; text: string; set: (el: HTMLDivElement | null) => void }) {
  return (
    <Html position={at} center style={{ pointerEvents: "none" }}>
      <div ref={set} style={{ color: INK, opacity: 0 }} className="font-mono text-[11px] whitespace-nowrap sm:text-xs">
        {text}
      </div>
    </Html>
  );
}

function World({ way, progress, still }: { way: WayId; progress: RefObject<number>; still: boolean }) {
  const eased = useRef<number | null>(null);
  const groupA = useRef<THREE.Group>(null);
  const groupB = useRef<THREE.Group>(null);
  const gridA = useRef<THREE.GridHelper>(null);
  const gridB = useRef<THREE.GridHelper>(null);
  const plate = useRef<THREE.Mesh>(null);
  const source = useRef<THREE.Mesh>(null);
  const forecast = useRef<THREE.Mesh>(null);
  const pipe = useRef<Line2>(null);
  const routeBack = useRef<Line2>(null);
  const routeOn = useRef<Line2>(null);
  const records = useRef<THREE.Group>(null);
  const land = useRef<THREE.InstancedMesh>(null);
  const markers = useRef<(THREE.Group | null)[]>([]);
  const labelsA = useRef<(HTMLDivElement | null)[]>([]);
  const labelsB = useRef<(HTMLDivElement | null)[]>([]);
  const stagger = useMemo(() => LAND_DOTS.map((_, i) => rand(i, 3) * 0.3), []);

  useFrame((state, delta) => {
    const target = progress.current ?? 0;
    eased.current = eased.current === null ? target : THREE.MathUtils.damp(eased.current, target, 5, delta);
    let t = smoothstep(eased.current, 0.28, 0.72);
    // Under reduced motion there is no travel: the scene cuts at the middle.
    if (still) t = t < 0.5 ? 0 : 1;
    const time = still ? 0 : state.clock.elapsedTime;

    // A narrow screen needs the camera further back to hold the same width.
    const back = 1 / Math.min(1, state.size.width / state.size.height / 1.7);
    const offset = VIEW.clone().sub(LOOK).multiplyScalar(back);

    // What each part shows, from 0 to 1, set by the way below.
    // Every line keeps N points: a thick line redrawn with fewer reads past its new end.
    let pipePath: P[] = PIPE_N;
    let routeBackPath: P[] = ROUTE_N;
    let routeOnPath: P[] | null = null;
    let sourceScale = 1;
    let forecastScale = 1;
    let recordsShown = 1;
    let aLabels = 1;
    let landAt = (_i: number) => 1;
    let markerAt = (_k: number) => 1;
    let bLabels = (_k: number) => 1;
    let aScale = 1;
    let bScale = 1;
    let aFade = 1;
    let pipeShown = true;
    let routeShown = true;
    let width = 2.5;

    if (way === "swap") {
      // The engine today: each picture is scaled by its own presence, one shrinking as the other grows.
      aScale = 1 - t;
      bScale = t;
      aLabels = 1 - t;
      bLabels = () => t;
    } else if (way === "line") {
      // The one line carries over: the pipeline's line bends into the route.
      pipePath = blend(PIPE_N, ROUTE_N, t);
      routeShown = false;
      sourceScale = forecastScale = 1 - smoothstep(t, 0, 0.45);
      recordsShown = 1 - smoothstep(t, 0.55, 0.95);
      aLabels = 1 - smoothstep(t, 0, 0.35);
      landAt = (i) => smoothstep(t, 0.4 + stagger[i], 0.7 + stagger[i]);
      markerAt = () => smoothstep(t, 0.6, 0.95);
      bLabels = () => smoothstep(t, 0.75, 1);
    } else if (way === "handoff") {
      // The source store stays where it is and becomes Zurich; the map builds outward from it.
      const u = smoothstep(t, 0, 0.5);
      const v = smoothstep(t, 0.45, 1);
      pipePath = resample(subPath(PIPE, 0, 1 - u), N);
      pipeShown = u < 0.99;
      // A line of no length breaks the thick-line shader, so a route waits until it has some.
      routeShown = v > 0.01;
      forecastScale = 1 - smoothstep(u, 0, 0.6);
      sourceScale = 1 - u;
      recordsShown = 1 - u;
      aLabels = 1 - u;
      routeBackPath = resample(subPath(ROUTE, ALONG[2] * (1 - v), ALONG[2]), N);
      routeOnPath = resample(subPath(ROUTE, ALONG[2], ALONG[2] + v * (1 - ALONG[2])), N);
      // A city appears when the route drawn from Zurich reaches it.
      const reached = (k: number) =>
        k === 2 ? u : k < 2 ? Math.min(1, Math.max(0, (v - (1 - ALONG[k] / ALONG[2])) / 0.12 + 1)) : smoothstep(v, 0.85, 1);
      markerAt = reached;
      bLabels = reached;
      landAt = (i) => {
        const d = Math.hypot(LAND_DOTS[i][0] - Z[0], LAND_DOTS[i][2] - Z[2]) / FAR;
        return smoothstep(v, d * 0.75, d * 0.75 + 0.25);
      };
    } else {
      // The camera flies into the source store, whose lid holds the map, until the map is all there is.
      const w = (1 - DIVE ** t) / (1 - DIVE);
      const look = LOOK.clone().lerp(B_AT.clone().add(LOOK.clone().multiplyScalar(DIVE)), w);
      state.camera.position.copy(look).add(offset.clone().multiplyScalar(DIVE ** t));
      state.camera.lookAt(look);
      aFade = 1 - smoothstep(t, 0.7, 0.95);
      aLabels = 1 - smoothstep(t, 0, 0.3);
      bLabels = () => smoothstep(t, 0.8, 1);
      width = Math.max(0.6, 2.5 * DIVE ** (1 - t));
    }

    if (way !== "dive") {
      state.camera.position.copy(LOOK).add(offset);
      state.camera.lookAt(LOOK);
    }

    if (groupA.current) {
      groupA.current.scale.setScalar(Math.max(aScale, 1e-4));
      groupA.current.visible = aFade > 0.01;
      groupA.current.traverse((o) => {
        const material = (o as THREE.Mesh).material as THREE.Material | undefined;
        if (material && "opacity" in material) {
          material.transparent = true;
          material.opacity = aFade;
        }
      });
    }
    if (groupB.current) {
      if (way === "dive") {
        groupB.current.position.copy(B_AT);
        groupB.current.scale.setScalar(DIVE);
      } else groupB.current.scale.setScalar(Math.max(bScale, 1e-4));
    }
    for (const grid of [gridA.current, gridB.current]) {
      const material = grid?.material as THREE.LineBasicMaterial | undefined;
      if (material) material.transparent = true;
    }
    if (gridA.current) (gridA.current.material as THREE.LineBasicMaterial).opacity = aFade;
    if (gridB.current) {
      gridB.current.visible = way === "dive";
      if (plate.current) plate.current.visible = way === "dive";
      (gridB.current.material as THREE.LineBasicMaterial).opacity = smoothstep(t, 0.72, 0.95);
    }

    for (const [mesh, scale] of [[source.current, sourceScale], [forecast.current, forecastScale]] as const) {
      mesh?.scale.setScalar(Math.max(scale, 1e-4));
    }
    // In the line morph the stores ride the ends of the line as it moves.
    if (way === "line") {
      source.current?.position.set(pipePath[0][0], 0.2, pipePath[0][2]);
      forecast.current?.position.set(pipePath[N - 1][0], 0.2, pipePath[N - 1][2]);
    } else {
      source.current?.position.set(...SOURCE);
      forecast.current?.position.set(...FORECAST);
    }

    if (pipe.current) {
      pipe.current.visible = pipeShown;
      pipe.current.geometry.setPositions(flat(pipePath));
      pipe.current.material.linewidth = 2.5;
    }
    for (const [line, path] of [[routeBack.current, routeBackPath], [routeOn.current, routeOnPath]] as const) {
      if (!line) continue;
      line.visible = routeShown && path !== null;
      if (path) line.geometry.setPositions(flat(path));
      line.material.linewidth = width;
    }

    records.current?.children.forEach((record, i) => {
      record.position.set(...pointAt(pipePath, (time * 0.12 + i / RECORDS) % 1));
      record.scale.setScalar(Math.max(recordsShown, 1e-4));
    });

    const dots = land.current;
    if (dots) {
      LAND_DOTS.forEach((p, i) => {
        dummy.position.set(p[0], 0.02, p[2]);
        dummy.rotation.set(-Math.PI / 2, 0, 0);
        dummy.scale.setScalar(Math.max(landAt(i), 1e-4));
        dummy.updateMatrix();
        dots.setMatrixAt(i, dummy.matrix);
      });
      dots.instanceMatrix.needsUpdate = true;
    }
    markers.current.forEach((m, k) => m?.scale.setScalar(Math.max(markerAt(k), 1e-4)));
    labelsA.current.forEach((el) => el && (el.style.opacity = String(aLabels)));
    labelsB.current.forEach((el, k) => el && (el.style.opacity = String(bLabels(k))));
  });

  return (
    <>
      <color attach="background" args={[BG]} />
      <ambientLight intensity={1.1} />
      <directionalLight position={[3, 6, 5]} intensity={1.4} />
      <gridHelper ref={gridA} args={[18, 36, GRID, GRID]} />

      <group ref={groupA}>
        {[source, forecast].map((ref, i) => (
          <mesh key={i} ref={ref} position={i ? FORECAST : SOURCE}>
            <cylinderGeometry args={[0.45, 0.45, 0.4, 48]} />
            <meshStandardMaterial color={STORE} roughness={0.7} transparent />
            <Edges color={MUTED} />
          </mesh>
        ))}
        <Line ref={pipe} points={PIPE_N} color={ACCENT} lineWidth={2.5} transparent />
        <group ref={records}>
          {Array.from({ length: RECORDS }, (_, i) => (
            <mesh key={i}>
              <sphereGeometry args={[0.05, 12, 12]} />
              <meshBasicMaterial color={INK} transparent toneMapped={false} />
            </mesh>
          ))}
        </group>
        <Label at={[SOURCE[0], 0.75, SOURCE[2]]} text="timetables" set={(el) => void (labelsA.current[0] = el)} />
        <Label at={[FORECAST[0], 0.75, FORECAST[2]]} text="forecasts" set={(el) => void (labelsA.current[1] = el)} />
      </group>

      <group ref={groupB}>
        {/* In the dive the map lies on the store's lid: a dark plate, like a screen, so it reads. */}
        <mesh ref={plate} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, PLATE.z]} visible={false}>
          <planeGeometry args={[PLATE.w, PLATE.d]} />
          <meshBasicMaterial color={BG} toneMapped={false} />
        </mesh>
        <gridHelper ref={gridB} args={[18, 36, GRID, GRID]} position={[0, 0.01, 0]} visible={false} />
        <instancedMesh ref={land} args={[undefined, undefined, LAND_DOTS.length]}>
          <circleGeometry args={[0.035, 8]} />
          <meshBasicMaterial color={MUTED} toneMapped={false} />
        </instancedMesh>
        <Line ref={routeBack} points={ROUTE_N} color={ACCENT} lineWidth={2.5} />
        {/* No visible prop: drei hands it to the material too, which would hide this line for good. */}
        <Line ref={routeOn} points={ROUTE_N} color={ACCENT} lineWidth={2.5} />
        {CITIES.map((city, k) => (
          <group key={city.name} ref={(el) => void (markers.current[k] = el)} position={[city.at[0], 0.012, city.at[2]]} rotation={[-Math.PI / 2, 0, 0]}>
            <mesh>
              <ringGeometry args={[0.09, 0.12, 32]} />
              <meshBasicMaterial color={ACCENT} toneMapped={false} />
            </mesh>
            <mesh>
              <circleGeometry args={[0.045, 16]} />
              <meshBasicMaterial color={INK} toneMapped={false} />
            </mesh>
          </group>
        ))}
        {CITIES.map((city, k) => (
          <Label key={city.name} at={[city.at[0], 0.35, city.at[2] - 0.05]} text={city.name} set={(el) => void (labelsB.current[k] = el)} />
        ))}
      </group>
    </>
  );
}

export default function Seam({ way, progress, still = false }: { way: WayId; progress: RefObject<number>; still?: boolean }) {
  return (
    <Canvas dpr={[1, 1.75]} camera={{ fov: 40, near: 0.02, far: 100, position: [0, 5.6, 8.2] }}>
      <World way={way} progress={progress} still={still} />
    </Canvas>
  );
}
