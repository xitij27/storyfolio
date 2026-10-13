"use client";
import { createContext, useContext, useSyncExternalStore, type ReactNode } from "react";
import type { Controls } from "@/lib/story/controls";
const Context = createContext<{ controls: Controls; sceneOff: boolean } | null>(null);
export function ControlsProvider({ controls, sceneOff, children }: { controls: Controls; sceneOff: boolean; children: ReactNode }) {
  return <Context.Provider value={{ controls, sceneOff }}>{children}</Context.Provider>;
}
export function useControls() {
  const value = useContext(Context);
  if (!value) throw new Error("Story controls must be inside a Story");
  return value.controls;
}
export function useSceneOff() { return useContext(Context)?.sceneOff ?? true; }
export function useControl(key: string) {
  const controls = useControls();
  return useSyncExternalStore(controls.subscribe, () => controls.get(key), () => null);
}
