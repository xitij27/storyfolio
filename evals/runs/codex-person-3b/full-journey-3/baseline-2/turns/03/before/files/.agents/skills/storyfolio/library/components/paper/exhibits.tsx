"use client";

import { useMemo, useRef, type ReactNode, type RefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Edges, Html, Line } from "@react-three/drei";
import * as THREE from "three";

import { POINT_COUNT, clusterOf, clustered, scattered } from "@/lib/points";

/*
  Three exhibits from the author's V3 paper, lifted out of its pages. In V3
  each one decorates the sheets of paper at one beat; here each brings its
  own sheets and reads one number, how far its section has been scrolled
  (0 to 1, from the Lab's ScrollStage). The shapes are the V3 formations'.
*/

export type Ink = { paper: string; ink: string; accent: string; cool: string; rule: string };
export const DARK: Ink = { paper: "#1a2131", ink: "#f4f6fb", accent: "#f2b84b", cool: "#7aa2ff", rule: "#7f8db0" };

const lerp = THREE.MathUtils.lerp;
const smoothstep = (x: number, a: number, b: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

function Stage({ children, camera = [0, 0.6, 11] }: { children: ReactNode; camera?: [number, number, number] }) {
  return (
    <Canvas dpr={[1, 1.75]} camera={{ fov: 35, position: camera }}>
      <ambientLight intensity={0.9} />
      <directionalLight position={[3, 5, 6]} intensity={1.6} />
      <directionalLight position={[-6, -2, 2]} intensity={0.5} color="#8fa6ff" />
      {children}
    </Canvas>
  );
}

/** Eases towards the scroll, so a fling of the wheel still moves smoothly. */
function useEased(progress: RefObject<number>) {
  const eased = useRef(0);
  return (delta: number) => (eased.current = THREE.MathUtils.damp(eased.current, progress.current ?? 0, 5, delta));
}

/* ============ Data points: scattered ink gathers into clusters ============ */

const SCATTERED = Array.from({ length: POINT_COUNT }, (_, i) => scattered(i));
const CLUSTERED = Array.from({ length: POINT_COUNT }, (_, i) => clustered(i));
const MATRIX = new THREE.Matrix4();
const SCALE = new THREE.Vector3();
const COLOUR = new THREE.Color();

function Points({ progress, ink }: { progress: RefObject<number>; ink: Ink }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const ease = useEased(progress);
  const colours = useMemo(
    () => ({ printed: new THREE.Color(ink.ink), sorted: [ink.accent, ink.cool, ink.ink].map((c) => new THREE.Color(c)) }),
    [ink],
  );

  useFrame((_, delta) => {
    const points = mesh.current;
    if (!points) return;
    // The points begin as dots printed on the desk, flat and in the ink. As the
    // section scrolls they lift off, round out and gather into three clusters,
    // each taking its cluster's colour. Scrolling back lays them down again.
    const amount = smoothstep(ease(delta), 0.1, 0.75);
    const size = lerp(0.6, 1, amount);
    for (let i = 0; i < POINT_COUNT; i++) {
      const from = SCATTERED[i];
      const to = CLUSTERED[i];
      MATRIX.makeTranslation(lerp(from[0], to[0], amount), lerp(from[1], to[1], amount), lerp(0.012, 0.3, amount));
      MATRIX.scale(SCALE.set(size, size, size * lerp(0.12, 1, amount)));
      points.setMatrixAt(i, MATRIX);
      points.setColorAt(i, COLOUR.copy(colours.printed).lerp(colours.sorted[clusterOf(i)], amount));
    }
    points.instanceMatrix.needsUpdate = true;
    if (points.instanceColor) points.instanceColor.needsUpdate = true;
  });

  return (
    // The desk lies flat: a point's (x, y) is across and away, its z is up.
    <group rotation={[-Math.PI / 2.6, 0, 0]}>
      <mesh position={[0, 0, -0.01]}>
        <planeGeometry args={[6, 4.4]} />
        <meshStandardMaterial color={ink.paper} />
      </mesh>
      <instancedMesh ref={mesh} args={[undefined, undefined, POINT_COUNT]}>
        <sphereGeometry args={[0.05, 12, 12]} />
        <meshBasicMaterial toneMapped={false} />
      </instancedMesh>
    </group>
  );
}

export function DataPointsScene({ progress, ink = DARK }: { progress: RefObject<number>; ink?: Ink }) {
  return (
    <Stage camera={[0, 0.4, 9]}>
      <Points progress={progress} ink={ink} />
    </Stage>
  );
}

/* ============ Stack: requests travelling down a three-tier system ============ */

const TIER_Y = [1.75, 0.6, -0.55];
const MIDDLE = (TIER_Y[0] + TIER_Y[2]) / 2;
const REACH = (TIER_Y[0] - TIER_Y[2]) / 2 + 0.45;

function Stack({ progress, ink, tiers, still }: { progress: RefObject<number>; ink: Ink; tiers: string[]; still: boolean }) {
  const group = useRef<THREE.Group>(null);
  const dots = useRef<THREE.Group>(null);
  const labels = useRef<(HTMLDivElement | null)[]>([]);
  const ease = useEased(progress);

  useFrame((state, delta) => {
    const p = ease(delta);
    const shown = smoothstep(p, 0.05, 0.35);
    if (group.current) {
      group.current.rotation.x = lerp(0.15, 0.5, p);
      group.current.rotation.y = lerp(-0.4, 0.6, p);
    }
    const time = still ? 0 : state.clock.elapsedTime;
    dots.current?.children.forEach((dot, i) => {
      dot.position.y = MIDDLE + REACH * Math.cos(time * 1.1 + i * 2.1);
      dot.scale.setScalar(shown);
    });
    for (const label of labels.current) if (label) label.style.opacity = String(shown);
  });

  return (
    <group ref={group}>
      {TIER_Y.map((y) => (
        <mesh key={y} position={[0, y, 0]}>
          <boxGeometry args={[2.9, 0.06, 1.85]} />
          <meshStandardMaterial color={ink.paper} />
          <Edges color={ink.rule} />
        </mesh>
      ))}
      <group ref={dots}>
        {[-1.1, 0, 1.1].map((x) => (
          <mesh key={x} position={[x, MIDDLE, 0.4]}>
            <sphereGeometry args={[0.06, 16, 16]} />
            <meshBasicMaterial color={ink.accent} toneMapped={false} />
          </mesh>
        ))}
      </group>
      {tiers.map((label, i) => (
        <Html key={label} position={[1.65, TIER_Y[i], 1.05]} style={{ pointerEvents: "none" }}>
          <div
            ref={(el) => {
              labels.current[i] = el;
            }}
            style={{ opacity: 0, color: ink.ink }}
            className="font-mono text-xs whitespace-nowrap sm:text-sm"
          >
            {label}
          </div>
        </Html>
      ))}
    </group>
  );
}

export function StackScene({
  progress,
  tiers,
  ink = DARK,
  still = false,
}: {
  progress: RefObject<number>;
  /** Top to bottom: what each tier is, "Interface · React". */
  tiers: [string, string, string];
  ink?: Ink;
  still?: boolean;
}) {
  return (
    <Stage>
      <Stack progress={progress} ink={ink} tiers={tiers} still={still} />
    </Stage>
  );
}

/* ============ Network: an encoder-decoder, with its skip connections ============ */

const N = 9;
const NET_X = (i: number) => -3.6 + (7.2 * i) / (N - 1);
/** Wide at both ends, narrow in the middle: the encoder-decoder silhouette. */
const NET_SIZE = (i: number) => 0.6 + 1.0 * Math.abs(1 - (2 * i) / (N - 1));
const SKIPS = Array.from({ length: 4 }, (_, i) => {
  const a = new THREE.Vector3(NET_X(i), NET_SIZE(i) / 2, 0);
  const b = new THREE.Vector3(NET_X(N - 1 - i), NET_SIZE(N - 1 - i) / 2, 0);
  const crest = new THREE.Vector3(0, 1.75 + (3 - i) * 0.32, 0);
  return new THREE.QuadraticBezierCurve3(a, crest, b).getPoints(40);
});
const SQUARE: [number, number, number][] = [
  [-0.5, -0.5, 0],
  [0.5, -0.5, 0],
  [0.5, 0.5, 0],
  [-0.5, 0.5, 0],
  [-0.5, -0.5, 0],
];

function Network({ progress, ink, still }: { progress: RefObject<number>; ink: Ink; still: boolean }) {
  const group = useRef<THREE.Group>(null);
  const pulse = useRef<THREE.Group>(null);
  const skips = useRef<THREE.Group>(null);
  const ease = useEased(progress);

  useFrame((state, delta) => {
    const p = ease(delta);
    const shown = smoothstep(p, 0.15, 0.5);
    if (group.current) {
      group.current.rotation.x = lerp(0, 0.14, p);
      group.current.rotation.y = lerp(0, -0.62, p);
    }
    if (pulse.current) {
      // A frame passes through the network, shrinking into the bottleneck and
      // growing back out, as the signal does. Under reduced motion it waits there.
      const along = still ? 0.5 : (state.clock.elapsedTime * 0.28) % 1;
      const size = 0.72 + Math.abs(1 - 2 * along);
      pulse.current.visible = shown > 0.02;
      pulse.current.position.set(NET_X(0) + (NET_X(N - 1) - NET_X(0)) * along, 0, 0);
      pulse.current.scale.set(size * shown, size * shown, 1);
    }
    if (skips.current) {
      skips.current.visible = shown > 0.02;
      skips.current.scale.setScalar(0.6 + 0.4 * shown);
    }
  });

  return (
    <group ref={group} position={[0, -0.2, 0]}>
      {Array.from({ length: N }, (_, i) => (
        <mesh key={i} position={[NET_X(i), 0, 0]} rotation={[0, Math.PI / 2, 0]}>
          <planeGeometry args={[NET_SIZE(i), NET_SIZE(i)]} />
          <meshStandardMaterial color={ink.paper} side={THREE.DoubleSide} />
          <Edges color={ink.rule} />
        </mesh>
      ))}
      <group ref={pulse} rotation={[0, Math.PI / 2, 0]} visible={false}>
        <Line points={SQUARE} color={ink.accent} lineWidth={2.5} />
      </group>
      <group ref={skips} visible={false}>
        {SKIPS.map((points, i) => (
          <Line key={i} points={points} color={ink.accent} lineWidth={1} transparent opacity={0.45} />
        ))}
      </group>
    </group>
  );
}

export function NetworkScene({ progress, ink = DARK, still = false }: { progress: RefObject<number>; ink?: Ink; still?: boolean }) {
  return (
    <Stage>
      <Network progress={progress} ink={ink} still={still} />
    </Stage>
  );
}
