"use client";
import { useEffect } from "react";
import { useControls, useControl, useSceneOff } from "@/components/story/controls";
import type { ExtraProps } from "@/components/story/types";
import { identity } from "./identity";

export default function Extra({ controls: propControls }: ExtraProps) {
  const controls = useControls();
  const value = useControl("inspection");
  const sceneOff = useSceneOff();
  useEffect(() => {
    for (const node of document.querySelectorAll<HTMLElement>("[data-html-store]")) {
      if (node.dataset.htmlStore !== String(identity(controls))) continue;
      node.dataset.extraStore = String(identity(controls));
      node.dataset.extraValue = String(value);
      node.dataset.extraSceneOff = String(sceneOff);
      node.dataset.extraPropSame = String(controls === propControls);
    }
  }, [controls, propControls, sceneOff, value]);
  return null;
}
