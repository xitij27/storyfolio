"use client";
import { Component, createContext, useContext, useMemo, type ReactNode } from "react";
import { useFrame } from "@react-three/fiber";
import { guardExtraCallback } from "./guard-extra-callback";

const ExtraFailure = createContext<((error: unknown) => void) | null>(null);

/** An optional chapter owns its render, load and supported frame failures. */
export class ExtraBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch(error: unknown) { console.warn("A story extra could not start:", error); }
  private fail = (error: unknown) => {
    console.warn("A story extra stopped after a frame error:", error);
    this.setState({ failed: true });
  };
  render() {
    return this.state.failed ? null : <ExtraFailure.Provider value={this.fail}>{this.props.children}</ExtraFailure.Provider>;
  }
}

/**
 * Extras use this instead of raw useFrame. A synchronous callback exception
 * removes only the nearest extra, without escaping into the shared frame loop.
 */
export function useExtraFrame(callback: Parameters<typeof useFrame>[0]): void {
  const fail = useContext(ExtraFailure);
  if (!fail) throw new Error("useExtraFrame must run inside a story extra");
  const guarded = useMemo(() => guardExtraCallback(callback, fail), [callback, fail]);
  useFrame(guarded);
}
