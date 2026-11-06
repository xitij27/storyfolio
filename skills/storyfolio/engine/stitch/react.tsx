"use client";
// A stitched story on a page: a top bar, the 3D, the chapter rail, a band of
// the chapter's words under it, and a project window. The words are
// also written out in full for anyone without the 3D.
import { useEffect, useMemo, useRef, useState, type CSSProperties, type MouseEvent } from "react";
import { titleOf, wordsFor, type ChapterKey } from "./chapters.ts";
import { chaptersFor, type Person, type Project } from "./person.ts";
import { formatMix, parseMix, type Mix } from "./mix.ts";
import { LOOKS, uiColours, type LookId, type Palette } from "./look.ts";
import { miniPicture, canvas as paintCanvas } from "./paint.ts";
import { smooth, type ScrollState } from "./scroll.ts";
import type { Move } from "./world.ts";
import "./stitch.css";

type Handle = { dispose(): void; goTo(index: number, instant?: boolean): void };

/** The custom properties stitch.css colours the words, rail, caption and buttons with. */
function lookStyle(p: Palette): CSSProperties {
  const ui = uiColours(p);
  return { "--st-bg": p.bg, "--st-ink": ui.text, "--st-soft": ui.soft, "--st-muted": ui.muted, "--st-glass": ui.glass,
    "--st-line": ui.line, "--st-on-ink": ui.onText, "--st-amber": p.amber } as CSSProperties;
}

/**
 * `start` opens the story at that chapter when the page is at its top, as a link to one chapter's piece does; an address ending in `#chapter` opens it there.
 * `words` are the person's own words for any chapter; `cv` is where their CV is, and its link shows only with it.
 * `topbar` is the bar of the person's name and links; a page with its own bar over the story leaves it out.
 */
export function StitchedStory({ person, mix, showWords = true, start, look = "night", words: chosen, cv, move, topbar = true }: {
  person: Person; mix: Mix; showWords?: boolean; start?: ChapterKey; look?: LookId; words?: Partial<Record<ChapterKey, string>>; cv?: string; move?: Move; topbar?: boolean;
}) {
  const palette = LOOKS[look];
  const keys = useMemo(() => chaptersFor(person), [person]);
  const words = useMemo(() => wordsFor(person, keys, chosen), [person, keys, chosen]);
  const mixText = formatMix(mix);
  const chosenText = JSON.stringify(chosen ?? {});
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const spacerRef = useRef<HTMLDivElement>(null);
  const bandRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const handle = useRef<Handle | null>(null);
  const nearRef = useRef(0);
  const [near, setNear] = useState(0);
  const [scene, setScene] = useState<"wait" | "on" | "off">("wait");
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current, spacer = spacerRef.current;
    if (!canvas || !spacer) return;
    let alive = true;
    const onState = (st: ScrollState) => {
      const n = st.t < 0.5 ? st.from : st.to;
      if (n !== nearRef.current) { nearRef.current = n; setNear(n); }
      const fade = st.to === st.from ? 1 : 1 - smooth(0.05, 0.35, st.raw) + smooth(0.65, 0.95, st.raw);
      if (bandRef.current) { bandRef.current.style.opacity = fade.toFixed(3); bandRef.current.style.pointerEvents = fade > 0.5 ? "auto" : "none"; }
      if (hintRef.current) hintRef.current.style.opacity = st.s < 0.15 ? "1" : "0";
    };
    // A lost drawing context leaves the words, as no WebGL does.
    const onLost = (e: Event) => { e.preventDefault(); if (alive) setScene("off"); };
    canvas.addEventListener("webglcontextlost", onLost);
    import("./stage.ts")
      .then(({ mountStitch }) => mountStitch(canvas, { person, mix: parseMix(mixText)!, palette: LOOKS[look], words: JSON.parse(chosenText), move, spacer, onState, onProject: setProject }))
      .then((h) => {
        if (!alive) { h.dispose(); return; }
        handle.current = h;
        setScene("on");
        const asked = keys.indexOf(window.location.hash.slice(1) as ChapterKey);
        const at = start ? keys.indexOf(start) : -1;
        if (asked >= 0) h.goTo(asked, true);
        else if (at > 0 && window.scrollY < 2) h.goTo(at, true);
      })
      .catch((e) => { console.error(e); if (alive) setScene("off"); });
    return () => { alive = false; canvas.removeEventListener("webglcontextlost", onLost); handle.current?.dispose(); handle.current = null; };
  }, [person, mixText, keys, start, look, chosenText, move]);

  // Back and forward through chapter links.
  useEffect(() => {
    const onHash = () => {
      const at = keys.indexOf(window.location.hash.slice(1) as ChapterKey);
      if (at >= 0) handle.current?.goTo(at, true);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, [keys]);

  /** A chapter link: with the story running it flies there; without, it goes to the chapter's words. */
  const jump = (e: MouseEvent<HTMLAnchorElement>, k: ChapterKey) => {
    if (scene !== "on" || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    window.history.pushState(null, "", `#${k}`);
    handle.current?.goTo(keys.indexOf(k));
  };
  const chapterLink = (k: ChapterKey, text: string, className?: string) =>
    <a className={className} href={`#${k}`} onClick={(e) => jump(e, k)}>{text}</a>;

  return (
    <div className={`stitch${showWords ? "" : " nowords"}${keys.every((k) => mix[k] === "book") ? " allbook" : ""}`} data-scene={scene} style={lookStyle(palette)}>
      <div className="frame">
        {topbar && (
          <header className="topbar">
            {chapterLink("hello", person.name, "brand")}
            <nav aria-label="Main">
              {keys.includes("made") && chapterLink("made", "Work")}
              {chapterLink("contact", "Contact")}
              {cv && <a href={cv}>CV</a>}
            </nav>
          </header>
        )}
        <div className="view">
          <canvas ref={canvasRef} className="gl" aria-hidden="true" />
          <nav className="rail" aria-label="Chapters">
            {keys.map((k, i) => (
              <button key={k} type="button" className={i === near ? "on" : ""} onClick={() => handle.current?.goTo(i)}>
                <i /><span>{titleOf(k)}</span>
              </button>
            ))}
          </nav>
          <div ref={hintRef} className="hint">Scroll</div>
        </div>
        {/* Every chapter's caption in one place, so the band is as tall as the tallest and the view never changes size. */}
        <div ref={bandRef} className="band" aria-live="polite">
          {keys.map((k, i) => (
            <div key={k} className={`cap${i === near ? " on" : ""}${mix[k] === "book" ? " inbook" : ""}`} aria-hidden={i !== near}>
              <div className="words">
                <div className="num">{String(i + 1).padStart(2, "0")}</div>
                <h2>{titleOf(k)}</h2>
                <p>{words[k]}</p>
              </div>
              {k === "made" && (
                <div className="links" aria-label="Open a project">
                  {person.projects.map((p) => <button key={p.title} type="button" onClick={() => setProject(p)}>{p.title}</button>)}
                </div>
              )}
              {k === "contact" && (
                <div className="links actions">
                  <a href={`mailto:${person.contact.email}`}>Email {person.first}</a>
                  {cv && <a href={cv}>CV</a>}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div ref={spacerRef} className="spacer" />
      <Chapters person={person} keys={keys} words={words} cv={cv} />
      <Expected person={person} words={words} cv={cv} />
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
        <article key={k} id={k}>
          <h2>{titleOf(k)}</h2>
          <p>{words[k]}</p>
          {k === "made" && <ul>{person.projects.map((p) => <li key={p.title}><b>{p.page ? <a href={p.page}>{p.title}</a> : p.title}</b>. {p.line}{p.more && <> {p.more}</>}</li>)}</ul>}
          {k === "say" && <ul>{person.quotes.map((q) => <li key={q.who}>&ldquo;{q.text}&rdquo; {q.who}, {q.from}</li>)}</ul>}
          {k === "contact" && <p><a href={`mailto:${person.contact.email}`}>{person.contact.email}</a>{cv && <>. <a href={cv}>CV</a></>}</p>}
        </article>
      ))}
    </section>
  );
}

/** What the page must show without its 3D, as JSON for scripts/site-check.mjs to look for. */
function Expected({ person, words, cv }: { person: Person; words: Partial<Record<ChapterKey, string>>; cv?: string }) {
  const wanted = {
    name: person.name,
    words: Object.values(words),
    projects: person.projects.map(({ title, line, more, page }) => ({ title, line, more, page })),
    cv,
  };
  return <script type="application/json" data-stitch-expect dangerouslySetInnerHTML={{ __html: JSON.stringify(wanted).replace(/</g, "\\u003c") }} />;
}

/** A native dialog: the page behind it cannot be reached, Escape closes it, and focus goes back where it was. */
function ProjectWindow({ project, palette, onClose }: { project: Project; palette: Palette; onClose: () => void }) {
  const pic = useRef<HTMLDivElement>(null);
  const box = useRef<HTMLDialogElement>(null);
  // The project at work: its picture plays through what it does, then rests on the result. Reduced motion shows the result.
  useEffect(() => {
    const el = pic.current;
    if (!el) return;
    const draw = (run: number) => (ctx: CanvasRenderingContext2D, w: number, h: number) => {
      ctx.clearRect(0, 0, w, h);
      miniPicture(ctx, palette, project.kind, 0, 0, w, h, project.title.length, run);
    };
    const c = paintCanvas(800, 420, draw(1));
    el.replaceChildren(c);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = c.getContext("2d")!, start = performance.now();
    let raf = 0;
    const frame = (now: number) => {
      const t = ((now - start) / 1000) % 5; // four seconds of work, one at rest
      draw(Math.min(1, t / 4))(ctx, c.width, c.height);
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [project, palette]);
  useEffect(() => {
    const d = box.current;
    if (!d) return;
    const back = document.activeElement as HTMLElement | null;
    d.showModal();
    return () => { d.close(); back?.focus({ preventScroll: true }); };
  }, []);
  return (
    <dialog ref={box} className="modal" aria-label={project.title}
      onClose={onClose} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="sheet">
        <button type="button" data-close aria-label="Close" onClick={onClose}>&times;</button>
        <div className="pic" ref={pic} aria-hidden="true" />
        <div className="body">
          <div className="eyebrow">{project.place}, {project.year}</div>
          <h3>{project.title}</h3>
          <p>{project.line}</p>
          {project.more && <p>{project.more}</p>}
          {project.page && <p><a className="more" href={project.page}>More about {project.title}</a></p>}
          <div className="tags">{project.tags.map((t) => <span key={t}>{t}</span>)}</div>
        </div>
      </div>
    </dialog>
  );
}
