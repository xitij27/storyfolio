"use client";
import Link from "next/link";
import type { ReactNode } from "react";
import { Story } from "@/components/story/story";
import { bundle } from "./index";
import { story } from "./story";
function Header(){return <header className="site-header"><Link prefetch={false} className="site-mark" href="/">DB<span>DAWIT BEKELE</span></Link>
  <details className="chapter-menu"><summary>Chapters</summary><nav aria-label="All chapters">{story.chapters.map(c=><a key={c.id} href={`#${c.id}`} onClick={event=>event.currentTarget.closest("details")?.removeAttribute("open")}>{c.number.toString().padStart(2,"0")} / {c.name}</a>)}</nav></details>
  <nav className="primary-nav" aria-label="Main navigation">{story.chapters.map(c=><a data-quick={c.id==="projects"||c.id==="contact"?"true":undefined} key={c.id} href={`#${c.id}`}>{c.name}</a>)}<Link prefetch={false} data-quick="true" href="/cv">CV ↗</Link></nav>
</header>;}
export function Experience({children}:{children:ReactNode}){return <Story bundle={bundle} header={<Header/>}>{children}</Story>;}
