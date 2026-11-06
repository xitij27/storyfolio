"use client";

import { Suspense, useRef, type RefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Edges, Html, Line, useTexture } from "@react-three/drei";
import * as THREE from "three";

/*
  "Layers", from the author's Lab sketches.

  One object carried through the whole scroll: nine planes. They drift, line
  up as an encoder-decoder network, re-stack as a software system, then fan
  out as project screenshots. Layers are the thing a network and a stack have
  in common, which is the point of the sketch.
*/

const N = 9;
const ACCENT = "#f2b84b";
const EDGE = "#7f8db0";

type Pose = {
  pos: [number, number, number];
  rot: [number, number, number];
  scale: [number, number];
};

/** Deterministic stand-in for Math.random, so the drift is the same each load. */
const rand = (i: number, salt: number) => {
  const x = Math.sin(i * 127.1 + salt * 311.7) * 43758.5453;
  return x - Math.floor(x);
};

const NET_X = (i: number) => -3.6 + (7.2 * i) / (N - 1);
/** Wide at both ends, narrow in the middle: the encoder-decoder silhouette. */
const NET_SIZE = (i: number) => 0.6 + 1.0 * Math.abs(1 - (2 * i) / (N - 1));

const DRIFT: Pose[] = Array.from({ length: N }, (_, i) => ({
  pos: [rand(i, 1) * 6.4 - 1.6, rand(i, 2) * 3.2 - 0.7, (rand(i, 3) - 0.5) * 3],
  rot: [(rand(i, 4) - 0.5) * 0.9, (rand(i, 5) - 0.5) * 1.2, (rand(i, 6) - 0.5) * 0.5],
  scale: [1.5, 0.95],
}));

const NETWORK: Pose[] = Array.from({ length: N }, (_, i) => ({
  pos: [NET_X(i), 0.35, 0],
  rot: [0, Math.PI / 2, 0],
  scale: [NET_SIZE(i), NET_SIZE(i)],
}));

const TIER_Y = [1.75, 0.6, -0.55];
const STACK: Pose[] = Array.from({ length: N }, (_, i) => {
  const tier = Math.floor(i / 3);
  return {
    pos: [0, TIER_Y[tier] + ((i % 3) - 1) * 0.14, 0],
    rot: [-Math.PI / 2, 0, 0],
    scale: [2.9, 1.85],
  };
});

const GALLERY: Pose[] = Array.from({ length: N }, (_, i) => {
  const col = (i % 3) - 1;
  const row = Math.floor(i / 3) - 1;
  return {
    pos: [col * 2.0, 0.35 - row * 1.22, col === 0 ? 0.3 : 0],
    rot: [0, -col * 0.2, 0],
    scale: [1.72, 1.05],
  };
});

const KEYS = [DRIFT, NETWORK, STACK, GALLERY];
/** How the whole group is turned at each beat: [x, y]. */
const GROUP_ROT: [number, number][] = [
  [0, 0],
  [0.14, -0.62],
  [0.5, 0.6],
  [0, 0],
];

export type LayersContent = {
  /** Two pictures the network passes between: its input and output. */
  networkImages: [string, string];
  /** Nine project pictures for the closing gallery. */
  projectImages: string[];
  /** The three tiers of the stack, top to bottom. */
  tiers: [string, string, string];
};

const smoothstep = (x: number, a: number, b: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};
const lerp = THREE.MathUtils.lerp;

/** Crops a texture to fill a plane of the given aspect, like object-fit: cover. */
function cover(texture: THREE.Texture, planeAspect: number) {
  const image = texture.image as { width: number; height: number };
  const imageAspect = image.width / image.height;
  texture.colorSpace = THREE.SRGBColorSpace;
  if (imageAspect > planeAspect) {
    texture.repeat.set(planeAspect / imageAspect, 1);
    texture.offset.set((1 - planeAspect / imageAspect) / 2, 0);
  } else {
    texture.repeat.set(1, imageAspect / planeAspect);
    texture.offset.set(0, (1 - imageAspect / planeAspect) / 2);
  }
}

/** Skip connections: each encoder layer hands its detail to its mirror. */
const SKIPS = Array.from({ length: 4 }, (_, i) => {
  const a = new THREE.Vector3(NET_X(i), 0.35 + NET_SIZE(i) / 2, 0);
  const b = new THREE.Vector3(NET_X(N - 1 - i), 0.35 + NET_SIZE(N - 1 - i) / 2, 0);
  const mid = new THREE.Vector3(0, 2.1 + (3 - i) * 0.32, 0);
  return new THREE.QuadraticBezierCurve3(a, mid, b).getPoints(40);
});

const SQUARE: [number, number, number][] = [
  [-0.5, -0.5, 0],
  [0.5, -0.5, 0],
  [0.5, 0.5, 0],
  [-0.5, 0.5, 0],
  [-0.5, -0.5, 0],
];

function Planes({
  progress,
  still,
  content,
}: {
  progress: RefObject<number>;
  still: boolean;
  content: LayersContent;
}) {
  const group = useRef<THREE.Group>(null);
  const planes = useRef<(THREE.Group | null)[]>([]);
  const netImages = useRef<(THREE.MeshBasicMaterial | null)[]>([]);
  const projImages = useRef<(THREE.MeshBasicMaterial | null)[]>([]);
  const pulse = useRef<THREE.Group>(null);
  const skips = useRef<THREE.Group>(null);
  const dots = useRef<THREE.Group>(null);
  const labels = useRef<(HTMLDivElement | null)[]>([]);
  const eased = useRef(0);

  const netTextures = useTexture(content.networkImages, (loaded) => {
    for (const t of loaded) cover(t, 1);
  });
  const projTextures = useTexture(content.projectImages, (loaded) => {
    for (const t of loaded) cover(t, GALLERY[0].scale[0] / GALLERY[0].scale[1]);
  });

  useFrame((state, delta) => {
    eased.current = THREE.MathUtils.damp(eased.current, progress.current ?? 0, 5, delta);
    const at = eased.current * (KEYS.length - 1);
    const k = Math.min(Math.floor(at), KEYS.length - 2);
    const t = smoothstep(at - k, 0.2, 0.8);
    const weight = (key: number) => (key === k ? 1 - t : key === k + 1 ? t : 0);
    const time = still ? 0 : state.clock.elapsedTime;

    const g = group.current;
    if (g) {
      g.rotation.x = lerp(GROUP_ROT[k][0], GROUP_ROT[k + 1][0], t) - state.pointer.y * 0.04;
      g.rotation.y = lerp(GROUP_ROT[k][1], GROUP_ROT[k + 1][1], t) + state.pointer.x * 0.07;
      // A narrow screen needs the camera further back to hold the same width.
      const aspect = state.size.width / state.size.height;
      state.camera.position.z = 11 / Math.min(1, aspect / 1.35);
    }

    const drift = weight(0);
    for (let i = 0; i < N; i++) {
      const p = planes.current[i];
      if (!p) continue;
      const a = KEYS[k][i];
      const b = KEYS[k + 1][i];
      p.position.set(
        lerp(a.pos[0], b.pos[0], t),
        lerp(a.pos[1], b.pos[1], t) + Math.sin(time * 0.6 + i * 1.7) * 0.14 * drift,
        lerp(a.pos[2], b.pos[2], t),
      );
      p.rotation.set(
        lerp(a.rot[0], b.rot[0], t),
        lerp(a.rot[1], b.rot[1], t),
        lerp(a.rot[2], b.rot[2], t) + Math.sin(time * 0.4 + i * 2.3) * 0.05 * drift,
      );
      p.scale.set(lerp(a.scale[0], b.scale[0], t), lerp(a.scale[1], b.scale[1], t), 1);

      const net = netImages.current[i];
      if (net) {
        net.opacity = weight(1);
        net.visible = net.opacity > 0.01;
      }
      const proj = projImages.current[i];
      if (proj) {
        proj.opacity = weight(3);
        proj.visible = proj.opacity > 0.01;
      }
    }

    // The signal: a frame that passes through the network, shrinking into the
    // bottleneck and growing back out.
    const net = weight(1);
    if (pulse.current) {
      const along = still ? 0.5 : (time * 0.28) % 1;
      const size = 0.6 + 1.0 * Math.abs(1 - 2 * along) + 0.12;
      pulse.current.visible = net > 0.02;
      pulse.current.position.set(-3.6 + 7.2 * along, 0.35, 0);
      pulse.current.scale.set(size * net, size * net, 1);
    }
    if (skips.current) {
      skips.current.visible = net > 0.02;
      skips.current.scale.setScalar(0.6 + 0.4 * net);
    }

    // Requests travelling down the stack and back.
    const stack = weight(2);
    if (dots.current) {
      dots.current.visible = stack > 0.02;
      dots.current.children.forEach((dot, i) => {
        dot.position.y = 0.6 + 1.6 * Math.cos(time * 1.1 + i * 2.1);
        dot.scale.setScalar(stack);
      });
    }
    for (const label of labels.current) {
      if (label) label.style.opacity = String(stack);
    }
  });

  return (
    <group ref={group} position={[0, 0.4, 0]}>
      {Array.from({ length: N }, (_, i) => {
        const netTexture = i === 0 ? netTextures[0] : i === N - 1 ? netTextures[1] : null;
        return (
          <group
            key={i}
            ref={(el) => {
              planes.current[i] = el;
            }}
          >
            <mesh>
              <boxGeometry args={[1, 1, 0.03]} />
              <meshStandardMaterial color="#151c2c" roughness={0.55} metalness={0.25} />
              <Edges color={EDGE} />
            </mesh>
            {netTexture ? (
              <mesh position={[0, 0, 0.019]}>
                <planeGeometry args={[1, 1]} />
                <meshBasicMaterial
                  ref={(el) => {
                    netImages.current[i] = el;
                  }}
                  map={netTexture}
                  transparent
                  opacity={0}
                  toneMapped={false}
                />
              </mesh>
            ) : null}
            <mesh position={[0, 0, 0.017]}>
              <planeGeometry args={[1, 1]} />
              <meshBasicMaterial
                ref={(el) => {
                  projImages.current[i] = el;
                }}
                map={projTextures[i]}
                transparent
                opacity={0}
                toneMapped={false}
              />
            </mesh>
          </group>
        );
      })}

      <group ref={pulse} rotation={[0, Math.PI / 2, 0]}>
        <Line points={SQUARE} color={ACCENT} lineWidth={2.5} />
      </group>

      <group ref={skips}>
        {SKIPS.map((points, i) => (
          <Line
            key={i}
            points={points}
            color={ACCENT}
            lineWidth={1}
            transparent
            opacity={0.45}
          />
        ))}
      </group>

      <group ref={dots}>
        {[-1.1, 0, 1.1].map((x) => (
          <mesh key={x} position={[x, 0, 1.25]}>
            <sphereGeometry args={[0.06, 16, 16]} />
            <meshBasicMaterial color={ACCENT} toneMapped={false} />
          </mesh>
        ))}
      </group>

      {content.tiers.map((label, i) => (
        <Html key={label} position={[1.65, TIER_Y[i], 1.05]} style={{ pointerEvents: "none" }}>
          <div
            ref={(el) => {
              labels.current[i] = el;
            }}
            style={{ opacity: 0 }}
            className="font-mono text-xs whitespace-nowrap text-white/80 sm:text-sm"
          >
            {label}
          </div>
        </Html>
      ))}
    </group>
  );
}

export default function LayersScene({
  progress,
  still,
  content,
}: {
  progress: RefObject<number>;
  still: boolean;
  content: LayersContent;
}) {
  return (
    <Canvas dpr={[1, 1.75]} camera={{ fov: 35, position: [0, 0.6, 11] }}>
      <ambientLight intensity={0.9} />
      <directionalLight position={[3, 5, 6]} intensity={1.6} />
      <directionalLight position={[-6, -2, 2]} intensity={0.5} color="#8fa6ff" />
      <Suspense fallback={null}>
        <Planes progress={progress} still={still} content={content} />
      </Suspense>
    </Canvas>
  );
}
