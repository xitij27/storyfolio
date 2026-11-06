"use client";
import { Component, type ReactNode } from "react";
export class WebGLBoundary extends Component<{ children: ReactNode; onError?: () => void }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch(error: unknown) {
    console.warn("A story effect could not start:", error);
    this.props.onError?.();
  }
  render() { return this.state.failed ? null : this.props.children; }
}
