import Link from "next/link";
import type { ReactNode } from "react";
export function PageShell({children}:{children:ReactNode}) {return <div className="document-site">
  <a className="document-skip" href="#document">Skip to content</a>
  <header className="document-header"><Link prefetch={false} className="brand" href="/">Dawit Bekele<span>Staff Platform Engineer</span></Link><nav aria-label="Page navigation"><Link prefetch={false} href="/">Story</Link><Link prefetch={false} href="/work">Work</Link><Link prefetch={false} href="/cv">CV</Link><a href="mailto:dawit@example.com">Email ↗</a></nav></header>
  <main id="document" className="document-main">{children}</main>
  <footer className="document-footer"><span>Dawit Bekele · Rotterdam</span><a href="mailto:dawit@example.com">dawit@example.com</a></footer>
</div>}
