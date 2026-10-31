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
export function StitchedStory({ person, mix, showWords = true, start, look = "night", words: chosen, cv, textOnly = false }: {
  person: Person; mix: Mix; showWords?: boolean; start?: ChapterKey; look?: LookId; words?: Partial<Record<ChapterKey, string>>; cv?: string; textOnly?: boolean;
}) {
  const palette = LOOKS[look];
  const keys = useMemo(() => chaptersFor(person), [person]);
  const words = useMemo(() => wordsFor(person, keys, chosen), [person, keys, chosen]);
  const mixText = formatMix(mix);
  const chosenText = JSON.stringify(chosen ?? {});
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const spacerRef = useRef<HTMLDivElement>(null);
  const capRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const handle = useRef<Handle | null>(null);
  const nearRef = useRef(0);
  const initialAnchorHandled = useRef(false);
  const [near, setNear] = useState(0);
  const [scene, setScene] = useState<"wait" | "on" | "off">("wait");
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current, spacer = spacerRef.current;
    if (!canvas || !spacer || textOnly) return;
    let alive = true;
    const last = keys.length - 1;
    const onState = (st: ScrollState) => {
      if (!alive) return;
      const n = st.t < 0.5 ? st.from : st.to;
      if (n !== nearRef.current) { nearRef.current = n; setNear(n); }
      const fade = st.to === st.from ? 1 : 1 - smooth(0.05, 0.35, st.raw) + smooth(0.65, 0.95, st.raw);
      if (capRef.current) capRef.current.style.opacity = fade.toFixed(3);
      if (hintRef.current) hintRef.current.style.opacity = st.s < 0.15 ? "1" : "0";
      const cta = st.from === last ? 1 : st.to === last ? smooth(0.7, 1, st.raw) : 0;
      if (ctaRef.current) { ctaRef.current.style.opacity = cta.toFixed(3); ctaRef.current.style.pointerEvents = cta > 0.5 ? "auto" : "none"; }
    };
    import("./stage.ts")
      .then(({ mountStitch }) => mountStitch(canvas, { person, mix: parseMix(mixText)!, palette: LOOKS[look], words: JSON.parse(chosenText), spacer, onState, onProject: setProject }))
      .then((h) => {
        if (!alive) { h.dispose(); return; }
        handle.current = h;
        setScene("on");
        const hash = decodeURIComponent(window.location.hash.slice(1));
        const at = start ? keys.indexOf(start) : keys.indexOf(hash as ChapterKey);
        if (!initialAnchorHandled.current && at >= 0) h.goTo(at, true);
        initialAnchorHandled.current = true;
      })
      .catch((e) => { console.error(e); if (alive) setScene("off"); });
    return () => { alive = false; handle.current?.dispose(); handle.current = null; };
  }, [person, mixText, keys, start, look, chosenText, textOnly]);

  useEffect(() => {
    const navigate = (event: MouseEvent) => {
      const anchor = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>("a[data-chapter-link]") : null;
      if (!anchor || textOnly || scene !== "on" || !handle.current || event.button !== 0 || event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
      const index = keys.indexOf(anchor.dataset.chapterLink as ChapterKey);
      if (index < 0) return;
      event.preventDefault();
      window.history.replaceState(null, "", anchor.hash);
      handle.current.goTo(index);
    };
    document.addEventListener("click", navigate);
    return () => document.removeEventListener("click", navigate);
  }, [keys, scene, textOnly]);

  useEffect(() => {
    if (!project) return;
    const close = (e: KeyboardEvent) => { if (e.key === "Escape") setProject(null); };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [project]);

  const key = keys[near];
  return (
    <div className={`stitch${showWords ? "" : " nowords"}`} data-scene={textOnly ? "off" : scene} data-chapter={key} style={lookStyle(palette)}>
      <canvas ref={canvasRef} className="gl" aria-hidden="true" />
      <div ref={spacerRef} className="spacer" />
      <div className="ui">
        <nav className="rail" aria-label="Chapters">
          {keys.map((k, i) => (
            <a key={k} href={`#${k}`} data-chapter-link={k} className={i === near ? "on" : ""} aria-current={i === near ? "step" : undefined}>
              <i /><span>{titleOf(k)}</span>
            </a>
          ))}
        </nav>
        <div ref={capRef} className={`cap${mix[key] === "book" ? " inbook" : ""}`} aria-live="polite">
          <div className="num">{String(near + 1).padStart(2, "0")}</div>
          <h2>{titleOf(key)}</h2>
          <p>{words[key]}</p>
        </div>
        <div ref={hintRef} className="hint">Scroll</div>
      </div>
      <div ref={ctaRef} className="cta" inert={key !== "contact"}>
        <a href={`mailto:${person.contact.email}`}>Email {person.first}</a>
        {cv && <a href={cv}>CV</a>}
      </div>
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
          {k === "studied" && person.study.map((study) => <p key={study.degree}>{study.note}</p>)}
          {k === "worked" && <ul>{person.work.map((job) => <li key={job.org}><b>{job.role}, {job.org}</b>. {job.did}</li>)}</ul>}
          {k === "good" && <ul>{person.skills.map((group) => <li key={group.group}>{group.group}: {group.items.join(", ")}</li>)}</ul>}
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
