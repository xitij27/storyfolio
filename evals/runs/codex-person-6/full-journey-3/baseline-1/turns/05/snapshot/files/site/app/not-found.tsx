import Link from "next/link";
export default function NotFound() {
  return <main className="missing-page">
    <Link className="document-brand" href="/">Dawit Bekele</Link>
    <div className="missing-sheet"><p className="document-kicker">404 · Page not found</p><h1>This page isn’t here.</h1><p>You can return to the story, explore the work or get in touch.</p>
    <nav aria-label="Find your way"><Link href="/">Home</Link><Link href="/#made">Work</Link><Link href="/#contact">Contact</Link><Link href="/cv">CV</Link></nav></div>
  </main>;
}
