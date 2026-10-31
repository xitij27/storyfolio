"use client";

import { useSyncExternalStore, type MouseEvent } from "react";

/*
  From the author's V3 paper. The look is kept in the address (?look=dark),
  so a link can name one and the page keeps it on reload. Changing it
  rewrites the address in place: no reload, and the reader keeps their place.
*/

/** Fired on the window when the look in the address is changed in place. */
const CHANGED = "look-change";

function subscribe(notify: () => void) {
  window.addEventListener("popstate", notify);
  window.addEventListener(CHANGED, notify);
  return () => {
    window.removeEventListener("popstate", notify);
    window.removeEventListener(CHANGED, notify);
  };
}

/**
 * The look named in the address, or the first. The server and the first
 * paint use the first, so the page hydrates cleanly; the address is read on
 * the render right after.
 */
export function useLook<T extends string>(looks: readonly T[]): T {
  return useSyncExternalStore(
    subscribe,
    () => {
      const asked = new URLSearchParams(window.location.search).get("look");
      return looks.find((look) => look === asked) ?? looks[0];
    },
    () => looks[0],
  );
}

export function chooseLook(look: string) {
  const url = new URL(window.location.href);
  url.searchParams.set("look", look);
  window.history.replaceState(null, "", url);
  window.dispatchEvent(new Event(CHANGED));
}

/** Switches between the looks a page can wear, without leaving the place being read. */
export function LookSwitch<T extends string>({ label, looks }: { label: string; looks: { id: T; name: string }[] }) {
  const look = useLook(looks.map((l) => l.id));

  const choose = (event: MouseEvent, id: T) => {
    // Leave a click meant for a new tab or window to the browser.
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    chooseLook(id);
  };

  return (
    <nav aria-label={label} className="flex w-fit gap-1 rounded-md border border-paper-rule bg-paper-bg/90 p-1 font-mono text-xs">
      {looks.map(({ id, name }) => (
        <a
          key={id}
          href={`?look=${id}`}
          aria-current={id === look ? "true" : undefined}
          onClick={(event) => choose(event, id)}
          className="flex min-h-9 items-center rounded-sm px-3 text-paper-muted outline-none hover:text-paper-ink focus-visible:ring-2 focus-visible:ring-paper-accent aria-[current]:bg-paper-ink aria-[current]:text-paper-bg"
        >
          {name}
        </a>
      ))}
    </nav>
  );
}
