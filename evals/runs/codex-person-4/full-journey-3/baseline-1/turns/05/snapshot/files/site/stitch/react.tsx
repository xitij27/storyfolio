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
  const chosenText = JSON.stringify(chosen ?? {});
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const spacerRef = useRef<HTMLDivElement>(null);
  const capRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const handle = useRef<Handle | null>(null);
  const nearRef = useRef(0);
  const [near, setNear] = useState(0);
  const [scene, setScene] = useState<"wait" | "on" | "off">("wait");
  const [project, setProject] = useState<Project | null>(null);
  const [textOnly, setTextOnly] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current, spacer = spacerRef.current;
    if (!canvas || !spacer || textOnly) return;
    let alive = true;
    const onState = (st: ScrollState) => {
      const n = st.t < 0.5 ? st.from : st.to;
      if (n !== nearRef.current) { nearRef.current = n; setNear(n); }
      const fade = st.to === st.from ? 1 : 1 - smooth(0.05, 0.35, st.raw) + smooth(0.65, 0.95, st.raw);
      if (capRef.current) capRef.current.style.opacity = fade.toFixed(3);
      if (hintRef.current) hintRef.current.style.opacity = st.s < 0.15 ? "1" : "0";

    };
    const onContextLost = (event: Event) => { event.preventDefault(); if (alive) setScene("off"); };
    canvas.addEventListener("webglcontextlost", onContextLost);
    import("./stage.ts")
      .then(({ mountStitch }) => mountStitch(canvas, { person, mix: parseMix(mixText)!, palette: LOOKS[look], words: JSON.parse(chosenText), spacer, onState, onProject: setProject }))
      .then((h) => {
        if (!alive) { h.dispose(); return; }
        handle.current = h;
        setScene("on");
        const at = keys.indexOf((window.location.hash.slice(1) || start) as ChapterKey);
        if (at >= 0) h.goTo(at, true);
      })
      .catch((e) => { console.error(e); if (alive) setScene("off"); });
    return () => { alive = false; canvas.removeEventListener("webglcontextlost", onContextLost); handle.current?.dispose(); handle.current = null; };
  }, [person, mixText, keys, start, look, chosenText, textOnly]);

  useEffect(() => {
    const syncHash = () => {
      const index = keys.indexOf(window.location.hash.slice(1) as ChapterKey);
      if (index >= 0) handle.current?.goTo(index, true);
    };
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, [keys]);

  useEffect(() => {
    const cap = capRef.current, root = rootRef.current, header = headerRef.current;
    if (!cap || !root) return;
    const fit = () => {
      root.style.setProperty("--caption-height", `${cap.offsetHeight + 24}px`);
      if (header) root.style.setProperty("--header-height", `${header.offsetHeight}px`);
    };
    const observer = new ResizeObserver(fit);
    observer.observe(cap); if (header) observer.observe(header); fit();
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (textOnly) {
      document.getElementById("story-text")?.focus();
      window.scrollTo(0, 0);
    }
  }, [textOnly]);

  const jump = (event: React.MouseEvent<HTMLAnchorElement>, chapter: ChapterKey) => {
    if (scene !== "on" || textOnly || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0) return;
    event.preventDefault();
    window.history.pushState(null, "", `#${chapter}`);
    handle.current?.goTo(keys.indexOf(chapter));
  };

  const key = keys[near];
  return (
    <div ref={rootRef} className={`stitch${showWords ? "" : " nowords"}`} data-scene={textOnly ? "off" : scene} style={lookStyle(palette)}>
      <header ref={headerRef} className="topbar">
        <a className="brand" href="#hello" onClick={e => jump(e, "hello")}>{person.name}</a>
        <nav aria-label="Main"><a href="#made" onClick={e => jump(e, "made")}>Work</a><a href="#contact" onClick={e => jump(e, "contact")}>Contact</a>{cv && <a href={cv}>CV</a>}
          {!textOnly && <a href="#story-text" onClick={event => { event.preventDefault(); setTextOnly(true); }}>Read text</a>}
        </nav>
      </header>
      <canvas ref={canvasRef} className="gl" aria-hidden="true" />
      <div ref={spacerRef} className="spacer" />
      <div className="ui">
        <nav className="rail" aria-label="Chapters">
          {keys.map((k, i) => (
            <a key={k} href={`#${k}`} aria-label={titleOf(k)} aria-current={i === near ? "step" : undefined} className={i === near ? "on" : ""} onClick={e => jump(e, k)}>
              <i /><span>{titleOf(k)}</span>
            </a>
          ))}
        </nav>
        <div ref={capRef} className={`cap${mix[key] === "book" ? " inbook" : ""}`} aria-live="polite">
          <div className="num">{String(near + 1).padStart(2, "0")}</div>
          <h2>{titleOf(key)}</h2>
          <p>{words[key]}</p>
          {key === "hello" && <p className="proof">310 services · 14 waves · 26 months.<br />Order API availability: 99.98% over those 26 months.</p>}
          {key === "good" && <p className="tools">Runbook · cutover checklist · rollback plan. Postgres, replication and checksums; SLO-based alerting. Learning: Google SRE book; Release It! by Michael Nygard.</p>}
          {key === "made" && <div className="project-links" aria-label="Open a work item">{person.projects.map(p => <button key={p.title} type="button" onClick={() => setProject(p)} aria-label={`${p.title}. ${p.line}`}>{p.title}</button>)}</div>}
          {key === "contact" && <div className="actions"><a href={`mailto:${person.contact.email}`}>Email {person.first}</a>{cv && <a href={cv}>Printable CV</a>}</div>}
        </div>
        <div ref={hintRef} className="hint">Scroll</div>
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
    <section id="story-text" tabIndex={-1} className="text" aria-label={`${person.name}, in words`}>
      <h1>{person.name}</h1>
      {keys.map((k) => (
        <article key={k} id={k}>
          <h2>{titleOf(k)}</h2>
          <p>{words[k]}</p>
          {k === "hello" && <p>310 services, 14 waves, 26 months. Measured order API availability: 99.98% over those 26 months.</p>}
          {k === "studied" && person.study.map(s => <p key={s.place}>{s.place}, {s.city}. {s.note}</p>)}
          {k === "worked" && person.work.map(w => <p key={w.org}><strong>{w.org}</strong>: {w.did}</p>)}
          {k === "good" && person.skills.map(g => <p key={g.group}><strong>{g.group}</strong>: {g.items.join(", ")}</p>)}
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
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const el = pic.current, modal = dialog.current;
    if (!el || !modal) return;
    const returnTo = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const c = paintCanvas(800, 300, (ctx, w, h) => miniPicture(ctx, palette, project.kind, 0, 0, w, h, project.title.length));
    el.replaceChildren(c);
    modal.showModal();
    return () => {
      modal.close();
      document.body.style.overflow = overflow;
      returnTo?.focus({ preventScroll: true });
    };
  }, [project, palette]);
  return (
    <dialog ref={dialog} className="modal" aria-label={project.title} onKeyDown={event => {
      if (event.key !== "Tab") return;
      const focusable = Array.from(event.currentTarget.querySelectorAll<HTMLElement>('button:not(:disabled), a[href], [tabindex="0"]'));
      const first = focusable[0], last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    }} onCancel={e => { e.preventDefault(); onClose(); }} onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="sheet">
        <button type="button" data-close aria-label="Close" onClick={onClose} autoFocus>&times;</button>
        <div className="pic" ref={pic} aria-hidden="true" />
        <div className="body">
          <div className="eyebrow">{project.year} · Illustration</div>
          <h3>{project.title}</h3>
          <p>{project.line}</p>
          {project.more && <p>{project.more}</p>}
          {project.page && <p><a className="more" href={project.page}>More about {project.title}</a></p>}
          <div className="tags">{project.tags.map(t => <span key={t}>{t}</span>)}</div>
        </div>
      </div>
    </dialog>
  );
}
