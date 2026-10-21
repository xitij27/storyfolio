import Link from "next/link";
import { SiteHeader, SiteFooter } from "@/components/site/navigation";
export default function NotFound() {
  return <><SiteHeader /><main className="article-page missing-page"><p className="eyebrow">404 / PAGE NOT FOUND</p><h1>This address has no page.</h1><p>The story and the Mosslink project are available below.</p><nav aria-label="Page recovery"><Link href="/">Read Ada’s story →</Link><Link href="/projects/mosslink">Explore Mosslink →</Link><a href="/cv.html">View / print CV →</a><a href="mailto:ada@example.com">Email Ada ↗</a></nav></main><SiteFooter /></>;
}
