"use client";
import { useEffect } from "react";

/** Give the bare story URL an explicit opening chapter so Back has a scene target. */
export function ChapterEntry() {
  useEffect(() => {
    const opening = () => {
      if (window.location.hash) return;
      window.history.replaceState(window.history.state, "", `${window.location.pathname}${window.location.search}#hello`);
      window.dispatchEvent(new HashChangeEvent("hashchange"));
    };
    opening();
    window.addEventListener("popstate", opening);
    return () => window.removeEventListener("popstate", opening);
  }, []);
  return null;
}
