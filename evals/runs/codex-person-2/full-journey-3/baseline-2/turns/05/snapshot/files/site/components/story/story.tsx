"use client";
import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from "react";
import dynamic from "next/dynamic";
import type { Stage } from "@/lib/story/camera";
import { createControls } from "@/lib/story/controls";
import { playhead, type BeatBox, type Playhead } from "@/lib/story/timeline";
import { useReducedMotion } from "./use-reduced-motion";
import { useWebGLSupported } from "./use-webgl-supported";
import { useLook } from "./use-look";
import { WebGLBoundary } from "./webgl-boundary";
import { LookSwitch } from "./look-switch";
import { ChapterRail } from "./rail";
import { Overlay } from "./overlay";
import { Meter } from "./meter";
import { ControlsProvider } from "./controls";
import { checkBundle } from "./validate";
import type { StoryBundle } from "./types";
const Scene = dynamic(() => import("./scene"), { ssr: false });

export function Story({ bundle, children }: { bundle: StoryBundle; children: ReactNode }) {
  const issues = useMemo(() => checkBundle(bundle), [bundle]);
  if (issues.length) throw new Error(`Invalid story: ${issues.join("; ")}`);
  const rootRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<Playhead>({ beat: 0, dwell: 0 });
  const stageRef = useRef<Stage>({ viewport: 0, header: 0, captions: [] });
  const pointerRef = useRef({ x: 0, y: 0 });
  const fpsRef = useRef(0);
  const [controls] = useState(createControls);
  const webgl = useWebGLSupported();
  const still = useReducedMotion();
  const [failed, setFailed] = useState(false);
  const [running, setRunning] = useState(true);
  const [activeChapter, setActiveChapter] = useState<string | undefined>(bundle.story.chapters[0]?.id);
  const onError = useCallback(() => setFailed(true), []);
  const id = useLook(bundle.looks, bundle.defaultLook);
  const look = bundle.looks.find(look => look.id === id) ?? bundle.looks[0];
  const on = webgl === true && !failed;
  const items = useMemo(() => bundle.story.chapters.map(chapter => ({ id: chapter.id, number: chapter.number, label: chapter.name })), [bundle.story]);
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    let boxes: BeatBox[] = [];
    const update = () => { headRef.current = playhead(-root.getBoundingClientRect().top, window.innerHeight, boxes); };
    const measure = () => {
      const origin = root.getBoundingClientRect().top;
      const beats = Array.from(root.querySelectorAll<HTMLElement>("[data-beat]"));
      boxes = beats.map(beat => { const box = beat.getBoundingClientRect(); return { top: box.top - origin, height: box.height }; });
      const top = root.querySelector<HTMLElement>("[data-story-top]");
      stageRef.current = { viewport: window.innerHeight, header: top ? Math.max(0, top.getBoundingClientRect().bottom) : 0, captions: beats.map(beat => {
        const caption = beat.querySelector<HTMLElement>(".story-caption");
        const text = beat.querySelector<HTMLElement>(".story-caption-text");
        return caption && text ? text.getBoundingClientRect().height + parseFloat(getComputedStyle(caption).paddingBottom) : 0;
      }) };
      update();
    };
    measure();
    const resize = new ResizeObserver(measure);
    resize.observe(root);
    root.querySelectorAll(".story-caption-text").forEach(node => resize.observe(node));
    let visible = true;
    const visibility = () => setRunning(visible && !document.hidden);
    const seen = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; visibility(); });
    seen.observe(root);
    document.addEventListener("visibilitychange", visibility);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", measure);
    return () => { resize.disconnect(); seen.disconnect(); window.removeEventListener("scroll", update); window.removeEventListener("resize", measure); document.removeEventListener("visibilitychange", visibility); };
  }, [bundle.story, on]);
  useEffect(() => {
    if (still) { pointerRef.current = { x: 0, y: 0 }; return; }
    const move = (event: PointerEvent) => { if (event.pointerType === "mouse") pointerRef.current = { x: event.clientX / window.innerWidth * 2 - 1, y: 1 - event.clientY / window.innerHeight * 2 }; };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [still]);
  const style = { "--story-ground": look.ground, "--story-ink": look.ink, "--story-faint": look.faint, "--story-accent": look.accent } as CSSProperties;
  return <ControlsProvider controls={controls} sceneOff={!on}><div ref={rootRef} className="story" data-scene={on ? "on" : "off"} data-look={look.id} style={style}>
    <noscript><style>{".story-look-switch, .story-control { display: none !important; }"}</style></noscript>
    {on ? <><div className="story-scene" aria-hidden="true"><WebGLBoundary onError={onError}><Scene bundle={bundle} headRef={headRef} stageRef={stageRef} pointerRef={pointerRef} controls={controls} look={look} still={still} running={running} rootRef={rootRef} fpsRef={fpsRef} onError={onError} onChapter={setActiveChapter} /></WebGLBoundary></div><div className="story-rail-holder"><ChapterRail label={bundle.copy.railLabel} items={items} active={activeChapter} /></div><Overlay links={bundle.links ?? []} controls={controls} /></> : null}
    {bundle.looks.length > 1 ? <div className="story-bar"><div data-story-top><LookSwitch looks={bundle.looks} active={look.id} defaultLook={bundle.defaultLook ?? bundle.looks[0].id} label={bundle.copy.lookLabel} /></div></div> : null}
    <div className="story-content">{children}</div><Meter value={fpsRef} label={bundle.copy.fpsLabel} />
  </div></ControlsProvider>;
}
