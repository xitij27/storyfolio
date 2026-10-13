import Link from 'next/link';
export function SiteNav(){return <header className="site-nav"><Link className="site-name" href="/">Ada Mensah<span> / firmware</span></Link><nav aria-label="Site navigation"><Link href="/projects/mosslink">Mosslink</Link><Link href="/cv">CV</Link><a href="mailto:ada@example.com">Email</a></nav></header>}
