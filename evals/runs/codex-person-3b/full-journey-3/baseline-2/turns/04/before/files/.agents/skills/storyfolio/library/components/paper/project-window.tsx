"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

import { CardWindow } from "@/components/pieces/expanding-cards";
import { toCard } from "@/components/sections/project-card";
import { person } from "@/content/sample";

/*
  From the author's V3 paper: a project named in the running text opens in
  the same window the Projects grid uses, with its pictures, what it is, what
  it was built with and where its code is. The window is the browser's modal
  dialog, which hands focus back to the link when it closes.
*/

const Context = createContext<((id: string) => void) | null>(null);

/** Put round the text whose project links should open the window. */
export function ProjectWindowProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState<string | null>(null);
  const project = person.projectList.find((p) => p.id === open);
  const t = person.projects;
  return (
    <Context.Provider value={setOpen}>
      {children}
      {project ? (
        <CardWindow
          card={toCard(project)}
          labels={{ close: t.close, previous: t.previous, next: t.next, featured: t.featured }}
          onClose={() => setOpen(null)}
        />
      ) : null}
    </Context.Provider>
  );
}

/** A project's name in the text, as a button that opens its window. */
export function ProjectLink({ id, children }: { id: string; children: ReactNode }) {
  const open = useContext(Context);
  return (
    <button
      type="button"
      aria-haspopup="dialog"
      onClick={() => open?.(id)}
      className="underline decoration-paper-accent decoration-2 underline-offset-4 outline-none hover:text-paper-accent focus-visible:ring-2 focus-visible:ring-paper-accent"
    >
      {children}
    </button>
  );
}
