"use client";

import { Component } from "react";

/**
 * Drops a decorative WebGL surface instead of letting it take the page down.
 *
 * `useWebGLSupported` catches the "no context at all" case up front; this
 * catches what a capability probe can't see: a context that is granted but
 * fails at shader compile/link (driver blocklists, WebGL1-only devices), or a
 * `dynamic()` chunk that never loads. Without it these throw during commit,
 * find no boundary, and React unmounts the whole tree.
 *
 * Note it cannot catch throws from inside a requestAnimationFrame loop, so a
 * context lost mid-session still escapes; that needs a `webglcontextlost`
 * listener on the canvas itself.
 */
export class WebGLBoundary extends Component<
  { children: React.ReactNode; onError?: () => void },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: unknown) {
    console.warn("Dropping a WebGL effect that failed to start:", error);
    this.props.onError?.();
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}
