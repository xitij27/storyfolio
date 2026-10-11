"use client";
import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Mesh, MeshBasicMaterial } from "three";
import { Story } from "@/components/story/story";
import { Beat, Body, Chapter, Title } from "@/components/story/chapter";
import { useControl, useControls, useSceneOff } from "@/components/story/controls";
import type { StoryBundle } from "@/components/story/types";
import { blankFormation } from "@/lib/story/formation";
import { looks } from "@/content/looks";
import { identity } from "./identity";

function Shape({ name }: { name: string }) {
  const controls = useControls();
  const value = useControl("inspection");
  const request = useControl("scene-request");
  const sceneOff = useSceneOff();
  const mesh = useRef<Mesh<never, MeshBasicMaterial>>(null);
  const frames = useRef(0);
  useEffect(() => {
    if (request === 1) {
      controls.set("inspection", 2);
      controls.set("scene-request", null);
    }
  }, [controls, request]);
  useFrame(() => {
    const node = document.getElementById(`diagnostic-${name}`);
    if (!node || !mesh.current) return;
    node.dataset.sceneStore = String(identity(controls));
    node.dataset.sceneValue = String(value);
    node.dataset.sceneOff = String(sceneOff);
    node.dataset.frames = String(++frames.current);
    node.dataset.meshColor = mesh.current.material.color.getHexString();
    node.dataset.worldMatrix = JSON.stringify(mesh.current.matrixWorld.elements);
  });
  return <mesh ref={mesh} rotation={[0.1, 0.2, 0]}>
    <boxGeometry args={[1.6, 1.1, 0.7]} />
    <meshBasicMaterial color={value === 1 ? "#d88716" : value === 2 ? "#206bc4" : "#687580"} />
  </mesh>;
}

function makeBundle(name: string): StoryBundle {
  const rest = { ...blankFormation(1), span: 2.1, rise: 1.8, near: 2,
    anchor: [0.52, 0.2] as [number, number], floor: -4,
    pieces: [{ position: [0, 0, 0] as [number, number, number], rotation: [0, 0, 0] as [number, number, number], size: [1, 1] as [number, number] }] };
  return {
    story: { pieces: 1, chapters: [{ id: name, number: 1, name, role: "opening", beats: [{ id: `${name}.inspect`, height: 1.2 }] }] },
    formations: { [`${name}.inspect`]: { rest } }, faces: [], looks,
    copy: { railLabel: `${name} chapters`, lookLabel: `${name} appearance` },
    Piece: () => <Shape name={name} />,
    extras: [{ chapter: name, load: () => import("./extra") }],
  };
}
const bundles = { alpha: makeBundle("alpha"), beta: makeBundle("beta") };

function Controls({ name }: { name: string }) {
  const controls = useControls();
  const value = useControl("inspection");
  const sceneOff = useSceneOff();
  useEffect(() => {
    const node = document.getElementById(`diagnostic-${name}`);
    if (node) node.dataset.htmlStore = String(identity(controls));
  }, [controls, name]);
  return <>
    <p id={`diagnostic-${name}`} data-html-value={String(value)} data-html-scene-off={String(sceneOff)}>
      Selection: <output>{value === 1 ? "amber" : value === 2 ? "blue" : "none"}</output>. Scene: {sceneOff ? "off" : "on"}.
    </p>
    <div className="story-control" style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
      <button type="button" onClick={() => controls.set("inspection", 1)}>Set {name} amber</button>
      <button type="button" onClick={() => controls.set("inspection", 2)}>Set {name} blue</button>
      <button type="button" disabled={sceneOff} onClick={() => controls.set("scene-request", 1)}>Ask {name} scene</button>
    </div>
  </>;
}

export function Probe({ name }: { name: "alpha" | "beta" }) {
  const bundle = bundles[name];
  return <div data-probe={name}><Story bundle={bundle}>
    <Chapter id={name}><Beat story={bundle.story} id={`${name}.inspect`}
      fallback={<p>{name} fallback: amber and blue are inspection states of this illustrative box. The same selection remains readable here.</p>}>
      <Title as="h2" id={`${name}-title`}>{name} controls probe</Title>
      <Body>HTML buttons and the scene must share this story&apos;s selection. The other story must remain independent.</Body>
      <Controls name={name} />
    </Beat></Chapter>
  </Story></div>;
}
