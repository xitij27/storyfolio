"use client";
import { useSyncExternalStore } from "react";
let supported: boolean | undefined;
export function detectWebGL(): boolean {
  if (supported !== undefined) return supported;
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2");
    supported = gl !== null;
    gl?.getExtension("WEBGL_lose_context")?.loseContext();
  } catch { supported = false; }
  return supported;
}
const subscribe = () => () => {};
export function useWebGLSupported() {
  return useSyncExternalStore<boolean | null>(subscribe, detectWebGL, () => null);
}
