"use client";
/*
  A piece on the pieces index: a still of it, a recording of it working over
  the still, then its name, what it does and where it comes from. Nothing
  heavy loads up front: the still is a lazy image, and the recording
  (preload none) is fetched only when the card is on screen, plays there,
  and stops when it leaves. With reduced motion, or with no script, the
  still is all there is.
*/
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

export function PieceCard({ href, name, fits, source, video, poster }: {
  href: string; name: string; fits: string; source: string; video: string; poster: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
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
    // No prefetch: 26 piece pages are not fetched in case one is opened.
    <Link href={href} prefetch={false} className="group block rounded-xl">
      <span className="relative block aspect-[8/5] overflow-hidden rounded-xl bg-raised ring-1 ring-rule">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={poster} alt="" width={800} height={500} loading="lazy" decoding="async" className="absolute inset-0 size-full object-cover" />
        <video
          ref={ref}
          muted
          loop
          playsInline
          preload="none"
          width={800}
          height={500}
          aria-hidden="true"
          onPlaying={() => setPlaying(true)}
          className={cn("absolute inset-0 size-full object-cover opacity-0 transition-opacity duration-300 motion-reduce:transition-none", playing && "opacity-100")}
        >
          <source src={video} type="video/webm" />
        </video>
      </span>
      <span className="mt-4 block font-display text-xl font-semibold group-hover:underline group-hover:underline-offset-4">{name}</span>
      <span className="mt-1 block text-pretty text-soft">{fits}</span>
      <span className="mt-1 block text-[15px] text-quiet">{source}</span>
    </Link>
  );
}
