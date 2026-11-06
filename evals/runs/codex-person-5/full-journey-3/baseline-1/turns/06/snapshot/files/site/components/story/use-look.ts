"use client";
import { useSyncExternalStore } from "react";
import { lookFromSearch, searchWithLook, type Look } from "@/lib/story/looks";
const event = "story-look";
function subscribe(notify: () => void) {
  window.addEventListener("popstate", notify);
  window.addEventListener(event, notify);
  return () => { window.removeEventListener("popstate", notify); window.removeEventListener(event, notify); };
}
export function useLook(looks: readonly Look[], defaultLook = looks[0].id) {
  return useSyncExternalStore(subscribe, () => lookFromSearch(window.location.search, looks, defaultLook), () => defaultLook);
}
export function chooseLook(id: string, defaultLook: string) {
  const { pathname, search, hash } = window.location;
  window.history.replaceState(window.history.state, "", `${pathname}${searchWithLook(search, id, defaultLook)}${hash}`);
  window.dispatchEvent(new Event(event));
}
