"use client";
import { useRef } from "react";
import * as THREE from "three";
import { useExtraFrame } from "@/components/story/extra-frame";
import type { ExtraProps } from "@/components/story/types";
import { atRest, blankFormation, mixFormation } from "@/lib/story/formation";
import { formations } from "../formations";

const beats = ["opening.assembly", "middle.relationship", "close.evidence"] as const;
const headLength = .13;
export default function Connections({ frameRef, controls }: ExtraProps) {
  const root = useRef<THREE.Group>(null);
  const rods = useRef<(THREE.Mesh | null)[]>([]);
  const heads = useRef<(THREE.Mesh | null)[]>([]);
  const scratch = useRef({ from: blankFormation(4), to: blankFormation(4), current: blankFormation(4), a: new THREE.Vector3(), b: new THREE.Vector3(), direction: new THREE.Vector3(), up: new THREE.Vector3(0, 1, 0) });
  useExtraFrame(() => {
    const state = scratch.current;
    const f = frameRef.current;
    const amount = f.from === 1 && f.to === 1 ? 1 : f.to === 1 ? f.t : f.from === 1 ? 1 - f.t : 0;
    if (!root.current) return;
    root.current.visible = amount > .05;
    atRest(state.from, formations[beats[f.from]], f.dwell);
    atRest(state.to, formations[beats[f.to]], f.to === f.from ? f.dwell : 0);
    mixFormation(state.current, state.from, state.to, f.t, f.each);
    const selected = controls.get("inspect") ?? 0;
    for (let i = 0; i < 3; i++) {
      const a = state.current.pieces[i], b = state.current.pieces[i + 1];
      const rod = rods.current[i], head = heads.current[i];
      if (!rod || !head) continue;
      state.a.set(...a.position); state.b.set(...b.position);
      state.a.z += .22; state.b.z += .22;
      state.direction.subVectors(state.b, state.a).normalize();
      // Stop outside the module's edge. This is a conceptual connector, not a cable.
      const edgeA = i === 1 ? a.size[1] * .57 : a.size[0] * .57;
      const edgeB = i === 1 ? b.size[1] * .57 : b.size[0] * .57;
      const gap = state.a.distanceTo(state.b) - edgeA - edgeB;
      // A distance between already trimmed endpoints loses the sign when
      // modules overlap. Only draw once the gap fits a forward-facing arrow.
      rod.visible = head.visible = gap > headLength;
      if (!rod.visible) continue;
      state.a.addScaledVector(state.direction, edgeA);
      state.b.addScaledVector(state.direction, -edgeB - headLength);
      const length = gap - headLength;
      rod.position.copy(state.a).lerp(state.b, .5);
      rod.quaternion.setFromUnitVectors(state.up, state.direction);
      rod.scale.set(1, length, 1);
      head.position.copy(state.b).addScaledVector(state.direction, headLength / 2); head.quaternion.copy(rod.quaternion);
      const mat = rod.material as THREE.MeshBasicMaterial;
      const tip = head.material as THREE.MeshBasicMaterial;
      mat.opacity = tip.opacity = amount * (selected === i || selected === i + 1 ? 1 : .4);
    }
  });
  return <group ref={root}>{[0, 1, 2].map(i => <group key={i}>
    <mesh ref={el => { rods.current[i] = el; }}><cylinderGeometry args={[.016, .016, 1, 8]}/><meshBasicMaterial color="#a84c2d" transparent toneMapped={false}/></mesh>
    <mesh ref={el => { heads.current[i] = el; }}><coneGeometry args={[.065, headLength, 12]}/><meshBasicMaterial color="#a84c2d" transparent toneMapped={false}/></mesh>
  </group>)}</group>;
}
