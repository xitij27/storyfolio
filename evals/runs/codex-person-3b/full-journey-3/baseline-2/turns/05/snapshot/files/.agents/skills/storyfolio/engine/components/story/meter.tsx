"use client";
import { useEffect, useState, type RefObject } from "react";
export function Meter({ value, label = "FPS" }: { value: RefObject<number>; label?: string }) {
  const [fps, setFps] = useState(0);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const enabled = new URLSearchParams(window.location.search).has("fps");
    const initial = window.setTimeout(() => setVisible(enabled), 0);
    const interval = enabled ? window.setInterval(() => setFps(Math.round(value.current)), 500) : undefined;
    return () => { window.clearTimeout(initial); window.clearInterval(interval); };
  }, [value]);
  return visible ? <output className="story-meter" aria-live="off">{label}: {fps}</output> : null;
}
