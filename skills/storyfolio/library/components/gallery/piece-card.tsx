"use client";
/*
  A piece on the pieces index: a recording of it working, then its name, what
  it does and where it comes from. The recording plays while the card is on
  screen and stops when it leaves; with reduced motion, or before the page's
  script runs, the poster stands still.
*/
import Link from "next/link";
import { useEffect, useRef } from "react";

export function PieceCard({ href, name, fits, source, video, poster }: {
  href: string; name: string; fits: string; source: string; video: string; poster: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) v.play().catch(() => {});
      else v.pause();
    }, { threshold: 0.35 });
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <Link href={href} className="group block rounded-xl">
      <video
        ref={ref}
        muted
        loop
        playsInline
        preload="none"
        poster={poster}
        width={800}
        height={500}
        aria-hidden="true"
        className="block aspect-[8/5] h-auto w-full rounded-xl bg-raised object-cover ring-1 ring-rule"
      >
        <source src={video} type="video/webm" />
      </video>
      <span className="mt-4 block font-display text-xl font-semibold group-hover:underline group-hover:underline-offset-4">{name}</span>
      <span className="mt-1 block text-pretty text-soft">{fits}</span>
      <span className="mt-1 block text-[15px] text-quiet">{source}</span>
    </Link>
  );
}
