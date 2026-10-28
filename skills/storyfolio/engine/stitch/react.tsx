"use client";
// A stitched story on a page: the 3D behind, the chapter's words, the
// chapter rail, the contact buttons and a project window. The words are
// also written out in full for anyone without the 3D.
import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { titleOf, wordsFor, type ChapterKey } from "./chapters.ts";
import { chaptersFor, type Person, type Project } from "./person.ts";
import { formatMix, parseMix, type Mix } from "./mix.ts";
import { LOOKS, uiColours, type LookId, type Palette } from "./look.ts";
import { miniPicture, canvas as paintCanvas } from "./paint.ts";
import { smooth, type ScrollState } from "./scroll.ts";
import "./stitch.css";

type Handle = { dispose(): void; goTo(index: number, instant?: boolean): void };

/** The custom properties stitch.css colours the words, rail, caption and buttons with. */
function lookStyle(p: Palette): CSSProperties {
  const ui = uiColours(p);
  return { "--st-bg": p.bg, "--st-ink": ui.text, "--st-soft": ui.soft, "--st-muted": ui.muted, "--st-glass": ui.glass,
    "--st-line": ui.line, "--st-on-ink": ui.onText, "--st-amber": p.amber } as CSSProperties;
}

/**
 * `start` opens the story at that chapter when the page is at its top, as a link to one chapter's piece does.
 * `words` are the person's own words for any chapter; `cv` is where their CV is, and its button shows only with it.
 */
export function StitchedStory({ person, mix, showWords = true, start, look = "night", words: chosen, cv }: {
  person: Person; mix: Mix; showWords?: boolean; start?: ChapterKey; look?: LookId; words?: Partial<Record<ChapterKey, string>>; cv?: string;
}) {
  const palette = LOOKS[look];
  const keys = useMemo(() => chaptersFor(person), [person]);
  const words = useMemo(() => wordsFor(person, keys, chosen), [person, keys, chosen]);
  const mixText = formatMix(mix);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const spacerRef = useRef<HTMLDivElement>(null);
  const capRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const handle = useRef<Handle | null>(null);
  const nearRef = useRef(0);
  const [near, setNear] = useState(0);
  const [scene, setScene] = useState<"wait" | "on" | "off">("wait");
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current, spacer = spacerRef.current;
    if (!canvas || !spacer) return;
    let alive = true;
    const last = keys.length - 1;
    const onState = (st: ScrollState) => {
      const n = st.t < 0.5 ? st.from : st.to;
      if (n !== nearRef.current) { nearRef.current = n; setNear(n); }
      const fade = st.to === st.from ? 1 : 1 - smooth(0.05, 0.35, st.raw) + smooth(0.65, 0.95, st.raw);
      if (capRef.current) capRef.current.style.opacity = fade.toFixed(3);
      if (hintRef.current) hintRef.current.style.opacity = st.s < 0.15 ? "1" : "0";
      const cta = st.from === last ? 1 : st.to === last ? smooth(0.7, 1, st.raw) : 0;
      if (ctaRef.current) { ctaRef.current.style.opacity = cta.toFixed(3); ctaRef.current.style.pointerEvents = cta > 0.5 ? "auto" : "none"; }
    };
    import("./stage.ts")
      .then(({ mountStitch }) => mountStitch(canvas, { person, mix: parseMix(mixText)!, palette: LOOKS[look], spacer, onState, onProject: setProject }))
      .then((h) => {
        if (!alive) { h.dispose(); return; }
        handle.current = h;
        setScene("on");
        const at = start ? keys.indexOf(start) : -1;
        if (at > 0 && window.scrollY < 2) h.goTo(at, true);
      })
      .catch((e) => { console.error(e); if (alive) setScene("off"); });
    return () => { alive = false; handle.current?.dispose(); handle.current = null; };
  }, [person, mixText, keys, start, look]);

  useEffect(() => {
    if (!project) return;
    const close = (e: KeyboardEvent) => { if (e.key === "Escape") setProject(null); };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [project]);

  const key = keys[near];
  return (
    <div className={`stitch${showWords ? "" : " nowords"}`} data-scene={scene} style={lookStyle(palette)}>
      <canvas ref={canvasRef} className="gl" aria-hidden="true" />
      <div ref={spacerRef} className="spacer" />
      <div className="ui">
        <nav className="rail" aria-label="Chapters">
          {keys.map((k, i) => (
            <button key={k} type="button" className={i === near ? "on" : ""} onClick={() => handle.current?.goTo(i)}>
              <i /><span>{titleOf(k)}</span>
            </button>
          ))}
        </nav>
        <div ref={capRef} className={`cap${mix[key] === "book" ? " inbook" : ""}`} aria-live="polite">
          <div className="num">{String(near + 1).padStart(2, "0")}</div>
          <h2>{titleOf(key)}</h2>
          <p>{words[key]}</p>
        </div>
        <div ref={hintRef} className="hint">Scroll</div>
      </div>
      <div ref={ctaRef} className="cta">
        <a href={`mailto:${person.contact.email}`}>Email {person.first}</a>
        {cv && <a href={cv}>CV</a>}
      </div>
      <Chapters person={person} keys={keys} words={words} cv={cv} />
      {project && <ProjectWindow project={project} palette={palette} onClose={() => setProject(null)} />}
    </div>
  );
}

/** Every chapter's words in order, shown when there is no 3D and read by screen readers. */
function Chapters({ person, keys, words, cv }: { person: Person; keys: ChapterKey[]; words: Partial<Record<ChapterKey, string>>; cv?: string }) {
  return (
    <section className="text" aria-label={`${person.name}, in words`}>
      <h1>{person.name}</h1>
      {keys.map((k) => (
        <article key={k}>
          <h2>{titleOf(k)}</h2>
          <p>{words[k]}</p>
          {k === "made" && <ul>{person.projects.map((p) => <li key={p.title}><b>{p.page ? <a href={p.page}>{p.title}</a> : p.title}</b>. {p.line}</li>)}</ul>}
          {k === "say" && <ul>{person.quotes.map((q) => <li key={q.who}>&ldquo;{q.text}&rdquo; {q.who}, {q.from}</li>)}</ul>}
          {k === "contact" && <p><a href={`mailto:${person.contact.email}`}>{person.contact.email}</a>{cv && <>. <a href={cv}>CV</a></>}</p>}
        </article>
      ))}
    </section>
  );
}

function ProjectWindow({ project, palette, onClose }: { project: Project; palette: Palette; onClose: () => void }) {
  const pic = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = pic.current;
    if (!el) return;
    const c = paintCanvas(800, 420, (ctx, w, h) => miniPicture(ctx, palette, project.kind, 0, 0, w, h, project.title.length));
    el.replaceChildren(c);
  }, [project, palette]);
  return (
    <div className="modal open" role="dialog" aria-modal="true" aria-label={project.title} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="sheet">
        <button type="button" data-close aria-label="Close" onClick={onClose}>&times;</button>
        <div className="pic" ref={pic} />
        <div className="body">
          <div className="eyebrow">{project.place}, {project.year}</div>
          <h3>{project.title}</h3>
          <p>{project.line}</p>
          {project.more && <p>{project.more}</p>}
          {project.page && <p><a className="more" href={project.page}>More about {project.title}</a></p>}
          <div className="tags">{project.tags.map((t) => <span key={t}>{t}</span>)}</div>
        </div>
      </div>
    </div>
  );
}
