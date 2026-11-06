"use client";
/*
  The front page's moving picture: a recording of the sheet's fold, muted and
  looping, with a button to pause it. It starts only once the page's script
  runs and the reader has not asked for reduced motion; until then, and with
  no script, the poster stands still.
*/
import { useEffect, useRef, useState } from "react";

export function HeroLoop({ src, poster, label, caption }: { src: string; poster: string; label: string; caption: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
    const video = ref.current;
    if (!video || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    video.play().then(() => setPlaying(true), () => setPlaying(false));
  }, []);

  const toggle = () => {
    const video = ref.current;
    if (!video) return;
    if (video.paused) video.play().then(() => setPlaying(true), () => setPlaying(false));
    else { video.pause(); setPlaying(false); }
  };

  return (
    <figure className="min-w-0">
      <div className="relative overflow-hidden rounded-2xl bg-raised">
        <video ref={ref} muted loop playsInline preload="metadata" poster={poster} aria-label={label} width={1280} height={800} className="block aspect-[8/5] h-auto w-full">
          <source src={src} type="video/webm" />
        </video>
        {ready ? (
          <button
            type="button"
            onClick={toggle}
            className="absolute right-4 bottom-4 h-11 rounded-full bg-ground px-5 text-[15px] font-semibold text-ink hover:bg-raised active:translate-y-px"
          >
            {playing ? "Pause" : "Play"}
          </button>
        ) : null}
      </div>
      <figcaption className="mt-4 max-w-[60ch] text-[15px] text-quiet">{caption}</figcaption>
    </figure>
  );
}
