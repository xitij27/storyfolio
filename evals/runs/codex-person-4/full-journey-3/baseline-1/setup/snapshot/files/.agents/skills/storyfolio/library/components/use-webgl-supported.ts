"use client";

import { useSyncExternalStore } from "react";

let cached: boolean | undefined;

/**
 * Whether this browser can hand out a WebGL context at all, the common
 * "WebGL is off" cases being Firefox's `webgl.disabled`, enterprise policies,
 * blocklisted drivers and VMs. Memoised: the answer can't change mid-session.
 */
export function detectWebGL(): boolean {
  if (cached !== undefined) return cached;

  try {
    const canvas = document.createElement("canvas");
    const gl = (canvas.getContext("webgl2") ??
      canvas.getContext("webgl")) as WebGLRenderingContext | null;

    // Browsers cap live contexts (~16) and drop the oldest when you overshoot,
    // so hand this one back before the real effects ask for theirs.
    gl?.getExtension("WEBGL_lose_context")?.loseContext();

    cached = gl !== null;
  } catch {
    // Some browsers throw from getContext rather than returning null.
    cached = false;
  }

  return cached;
}

// The answer never changes within a session, so there is nothing to subscribe
// to, but useSyncExternalStore still wants a stable unsubscribe.
const subscribe = () => () => {};

/**
 * `null` on the server and through hydration, so the markup React hydrates
 * matches what the server sent; the real answer arrives on the render right
 * after. Callers must branch on `=== true`, never on `!== false`.
 */
export function useWebGLSupported(): boolean | null {
  return useSyncExternalStore<boolean | null>(subscribe, detectWebGL, () => null);
}
