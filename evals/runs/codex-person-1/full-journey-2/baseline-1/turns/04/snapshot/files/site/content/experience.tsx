"use client";
import Link from "next/link";
import type { ReactNode } from "react";
import { Story } from "@/components/story/story";
import { bundle } from "./index";
function Header(){return <header className="site-header"><Link className="site-mark" href="/">DB<span>DAWIT BEKELE</span></Link><nav aria-label="Main navigation"><a href="#hello">Hello</a><a href="#projects">Migration</a><a href="#contact">Contact</a><Link href="/cv">CV ↗</Link></nav></header>;}
export function Experience({children}:{children:ReactNode}){return <Story bundle={bundle} header={<Header/>}>{children}</Story>;}
