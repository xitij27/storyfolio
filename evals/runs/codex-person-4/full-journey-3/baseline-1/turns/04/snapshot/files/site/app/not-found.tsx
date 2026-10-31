import Link from "next/link";
export default function NotFound() {
  return <main className="missing-page">
    <p className="eyebrow">Dawit Bekele · 404</p>
    <h1>That page isn’t here.</h1>
    <p>You can return to the story, explore the work, or read the CV.</p>
    <nav aria-label="Find your way"><Link href="/">Start the story</Link><Link href="/#made">View the work</Link><Link href="/cv">Read the CV</Link><a href="mailto:dawit@example.com">Email Dawit</a></nav>
  </main>;
}
