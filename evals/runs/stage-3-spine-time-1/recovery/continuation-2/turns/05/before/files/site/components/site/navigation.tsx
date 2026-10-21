import Link from "next/link";
export function SiteHeader() {
  return <header className="site-header"><Link className="wordmark" href="/" aria-label="Ada Mensah — story">ADA MENSAH<span>Embedded firmware</span></Link>
    <nav aria-label="Main navigation"><Link href="/">Story</Link><Link href="/projects/mosslink">Mosslink</Link><a href="/cv.html">CV</a><a href="mailto:ada@example.com">Email <span aria-hidden="true">↗</span></a></nav>
  </header>;
}
export function ContactLinks() {
  return <div className="contact-links"><a className="contact-primary" href="mailto:ada@example.com">ada@example.com <span aria-hidden="true">↗</span></a><div><a href="/cv.html">View / print CV</a><a href="/cv.html" download="Ada-Mensah-CV.html">Download HTML CV <span aria-hidden="true">↓</span></a></div></div>;
}
export function SiteFooter() {
  return <footer className="site-footer"><span>Ada Mensah · Embedded firmware</span><nav aria-label="Footer navigation"><Link href="/projects/mosslink">Mosslink</Link><a href="/cv.html" download="Ada-Mensah-CV.html">Download CV</a><a href="mailto:ada@example.com">Email</a></nav></footer>;
}
