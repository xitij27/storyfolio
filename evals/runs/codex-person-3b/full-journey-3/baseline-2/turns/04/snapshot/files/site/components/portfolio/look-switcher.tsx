"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LOOK_IDS, type LookId } from "@/stitch/look";

export function LookSwitcher({ look, query }: { look: LookId; query: string }) {
  const router = useRouter();
  return <nav className="look-switcher" aria-label="Compare appearances">
    <span>Appearance</span>
    {LOOK_IDS.map((id) => {
      const params = new URLSearchParams(query);
      params.set("look", id);
      const href = `/preview?${params}`;
      return <Link prefetch={false} key={id} href={href} scroll={false} aria-current={look === id ? "true" : undefined}
        onClick={(event) => {
          if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
          event.preventDefault();
          router.replace(href + window.location.hash, { scroll: false });
        }}><i data-swatch={id} />{id[0].toUpperCase() + id.slice(1)}</Link>;
    })}
  </nav>;
}
