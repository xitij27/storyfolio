import type { Metadata } from "next";
import Link from "next/link";
import { person } from "@/content/person";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: `Page not found · ${person.name}`,
  description: "This address does not lead to a page. Find Dawit's migration work or get in touch.",
};

export default function NotFound() {
  return (
    <main className="utility-page">
      <div className="utility-sheet">
        <Link className="utility-brand" href="/">{person.name}</Link>
        <p className="utility-label">404 · Page not found</p>
        <h1>This page isn’t here.</h1>
        <p>You can return to the story, explore my migration work, or write to me.</p>
        <nav className="utility-links" aria-label="Find your way">
          <Link href="/">Back to the story</Link>
          <Link href="/#made">Work</Link>
          <Link href="/#contact">Contact</Link>
          {site.cv && <Link href={site.cv}>CV</Link>}
        </nav>
        <a className="utility-email" href={`mailto:${person.contact.email}`}>{person.contact.email}</a>
      </div>
    </main>
  );
}
