"use client";
import { useEffect, useMemo, useRef, type ReactNode, type RefObject } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { atRest, blankFormation, lerp, mixFormation, swing, type Formation, type Pose, type Vec3 } from "@/lib/story/formation";
import { bandFit, bandShare, cameraDistance, overAnchor, overScale, roomBeside, stageLift, viewHalf, type Stage } from "@/lib/story/camera";
import { pieceOnScreen } from "@/lib/story/overlay";
import { beatsOf } from "@/lib/story/story";
import type { Look } from "@/lib/story/looks";
import type { Controls } from "@/lib/story/controls";
import type { Frame } from "./conductor";
import { createFaces } from "./faces";
import { faceMaterial } from "./face-material";
import type { PieceProps, StoryBundle } from "./types";

export const FOV = 38;
export const CAMERA_Z = 12;
export type Pointer = { x: number; y: number };
function Card({ material, look }: PieceProps) {
  // Bias the thin box sides behind printed faces to avoid MSAA edge speckles.
  return <><mesh castShadow receiveShadow frustumCulled={false}><boxGeometry args={[1, 1, 0.045]} /><meshStandardMaterial color={look.surface.color} roughness={look.surface.roughness} polygonOffset polygonOffsetFactor={1} polygonOffsetUnits={1} /></mesh><mesh position={[0, 0, 0.03]} material={material} frustumCulled={false}><planeGeometry args={[1, 1]} /></mesh></>;
}
export function Pieces({ bundle, frameRef, stageRef, pointerRef, formationRef, controls, look, coarse, still, rootRef, onError, children }: {
  bundle: StoryBundle; frameRef: RefObject<Frame>; stageRef: RefObject<Stage>; pointerRef: RefObject<Pointer>;
  formationRef: RefObject<Formation>; controls: Controls; look: Look; coarse: boolean; still: boolean;
  rootRef: RefObject<HTMLDivElement | null>; onError: () => void; children?: ReactNode;
}) {
  const group = useRef<THREE.Group>(null);
  const groups = useRef<(THREE.Group | null)[]>([]);
  const count = bundle.story.pieces;
  const beats = useMemo(() => beatsOf(bundle.story), [bundle.story]);
  const from = useRef(blankFormation(count));
  const to = useRef(blankFormation(count));
  const swung = useRef<Vec3>([0, 0, 0]);
  const projected = useRef([0, 0, 0, 0, 0, 0]);
  const overlayPose = useRef<Pose>({ position: [0, 0, 0], rotation: [0, 0, 0], size: [1, 1] });
  const blank = useMemo(() => {
    const value = look.surface.glows ? 0 : 255;
    const texture = new THREE.DataTexture(new Uint8Array([value, value, value, 255]), 1, 1);
    texture.colorSpace = THREE.SRGBColorSpace; texture.needsUpdate = true; return texture;
  }, [look]);
  const materials = useMemo(() => Array.from({ length: count }, () => faceMaterial(look, blank)), [look, blank, count]);
  const faces = useRef<ReturnType<typeof createFaces> | null>(null);
  const links = useRef<HTMLElement[]>([]);
  useEffect(() => {
    const store = createFaces(bundle.faces, look, coarse);
    faces.current = store;
    links.current = Array.from(rootRef.current?.querySelectorAll<HTMLElement>("[data-story-link]") ?? []);
    return () => { faces.current = null; store.dispose(); for (const link of links.current) { link.style.visibility = "hidden"; link.tabIndex = -1; } };
  }, [bundle.faces, look, coarse, rootRef]);
  useEffect(() => () => { for (const face of materials) face.material.dispose(); blank.dispose(); }, [materials, blank]);

  useFrame(state => {
    const frame = frameRef.current;
    const source = bundle.formations[beats[frame.from].id];
    const target = bundle.formations[beats[frame.to].id];
    const dwell = still ? (frame.dwell < 0.5 ? 0 : 1) : frame.dwell;
    // Resolve the dwell first. Travel leaves the completed within formation.
    atRest(from.current, source, dwell);
    atRest(to.current, target, frame.to === frame.from ? dwell : 0);
    const now = mixFormation(formationRef.current, from.current, to.current, frame.t, frame.each);
    const stage = stageRef.current;
    const caption = lerp(stage.captions[frame.from] ?? 0, stage.captions[frame.to] ?? 0, frame.t);
    const shareX = frame.narrow ? 1 : roomBeside(now.anchor[0]);
    const shareY = frame.narrow ? bandShare(stage.viewport, stage.header, caption) : roomBeside(now.anchor[1]);
    const swing3 = swing(swung.current, from.current, to.current, frame.t, still ? 0.5 : frame.dwell);
    const over = frame.narrow ? 0 : now.over;
    const smaller = over > 0 ? lerp(1, overScale(stage.viewport, stage.header, caption), over) : 1;
    const anchorY = over > 0 ? lerp(now.anchor[1], overAnchor(now.anchor[1], stage.viewport, stage.header, caption), over) : now.anchor[1];
    const fit = frame.narrow ? bandFit(stage.viewport, stage.header, caption) : 1;
    const aspect = state.size.width / state.size.height;
    const z = cameraDistance(now.span, now.rise, aspect, shareX, shareY, FOV, now.near + swing3[2]) / (smaller * (fit || 1));
    state.camera.position.z = z;
    const [halfWidth, halfHeight] = viewHalf(z, FOV, aspect);
    const stack = group.current;
    if (!stack) return;
    stack.visible = fit > 0;
    stack.rotation.set(now.turn[0] + swing3[0] - (still ? 0 : pointerRef.current.y * 0.04), now.turn[1] + swing3[1] + (still ? 0 : pointerRef.current.x * 0.07), 0);
    if (frame.narrow) stack.position.set(0, 2 * halfHeight * stageLift(stage.viewport, stage.header, caption), 0);
    else stack.position.set(now.anchor[0] * halfWidth, anchorY * halfHeight, 0);
    stack.updateMatrix();
    try { faces.current?.draw(); } catch { onError(); return; }
    for (let i = 0; i < count; i++) {
      const piece = groups.current[i];
      const pose = now.pieces[i];
      if (!piece) continue;
      const drift = still ? 0 : Math.sin(frame.time * 0.5 + i) * now.drift * 0.025;
      const lift = !still && controls.get("piece") === i ? 0.025 : 0;
      piece.position.set(pose.position[0], pose.position[1] + drift, pose.position[2] + lift);
      piece.rotation.set(...pose.rotation);
      piece.scale.set(pose.size[0], pose.size[1], 1);
      const store = faces.current;
      if (store) materials[i].set(store.get(beats[frame.from].id, i), store.get(beats[frame.to].id, i), bundle.faceTransition === "cut" ? (frame.each[i] < .5 ? 0 : 1) : frame.each[i]);
    }
    for (let i = 0; i < (bundle.links?.length ?? 0); i++) {
      const link = links.current[i];
      const def = bundle.links![i];
      if (!link) continue;
      const active = fit > 0 && frame.from === frame.to && beats[frame.from].id === def.beat;
      const mesh = groups.current[def.piece];
      const pose = now.pieces[def.piece];
      if (mesh && pose) {
        overlayPose.current.position[0] = mesh.position.x;
        overlayPose.current.position[1] = mesh.position.y;
        overlayPose.current.position[2] = mesh.position.z + 0.03;
        overlayPose.current.rotation = pose.rotation;
        overlayPose.current.size = pose.size;
      }
      const p = active && mesh && pose ? pieceOnScreen(projected.current, overlayPose.current, { distance: z, fov: FOV, aspect, fromStack: stack.matrix.elements }) : null;
      const visible = p && p.every(Number.isFinite) && Math.abs(p[0]) < 1.2 && Math.abs(p[1]) < 1.2;
      link.style.visibility = visible ? "visible" : "hidden"; link.tabIndex = visible ? 0 : -1;
      if (visible && p) {
        const w = state.size.width / 2; const h = state.size.height / 2;
        link.style.transform = `matrix(${p[2] * w / 50},${-p[3] * h / 50},${-p[4] * w / 50},${p[5] * h / 50},${w + p[0] * w},${h - p[1] * h})`;
      }
    }
  });
  const Shape = bundle.Piece ?? Card;
  return <group ref={group}>{Array.from({ length: count }, (_, index) => <group key={index} ref={node => { groups.current[index] = node; }}><Shape index={index} material={materials[index].material} look={look} /></group>)}{children}</group>;
}
