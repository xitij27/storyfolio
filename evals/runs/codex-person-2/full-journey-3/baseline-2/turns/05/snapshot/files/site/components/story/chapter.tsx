import type { CSSProperties, ReactNode } from "react";
import { beatHeight, type StoryDef } from "@/lib/story/story";
export function Chapter({ id, children }: { id: string; children: ReactNode }) {
  return <section id={id} aria-labelledby={`${id}-title`}>{children}</section>;
}
export function Beat({ story, id, children, fallback, anchor }: { story: StoryDef; id: string; children: ReactNode; fallback?: ReactNode; anchor?: string }) {
  return <div id={anchor} data-beat={id} className="story-beat" style={{ "--beat-height": beatHeight(story, id) } as CSSProperties}>
    <div className="story-caption"><div className="story-caption-text">{children}{fallback ? <div className="story-fallback">{fallback}</div> : null}</div></div>
  </div>;
}
export function Kicker({ number, id, as: Tag = "p", children }: { number: number; id?: string; as?: "p" | "h2"; children: ReactNode }) {
  return <Tag id={id} className="story-kicker"><span>{number}</span><span aria-hidden> / </span>{children}</Tag>;
}
export function Title({ as: Tag = "h3", id, children }: { as?: "h1" | "h2" | "h3"; id?: string; children: ReactNode }) {
  return <Tag id={id} className="story-title">{children}</Tag>;
}
export function Body({ children }: { children: ReactNode }) { return <p className="story-body">{children}</p>; }
export function Note({ sceneOnly = false, children }: { sceneOnly?: boolean; children: ReactNode }) {
  return <p className={`story-note${sceneOnly ? " story-note-scene" : ""}`}>{children}</p>;
}
