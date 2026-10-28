import type { Metadata } from "next";
import { person } from "@/content/person";
import { site } from "@/content/site";
import "./globals.css";

// Every page is titled with the person's name and described by what they do,
// unless it gives a title of its own (a project's page, the CV).
export const metadata: Metadata = { title: person.name, description: `${person.role}. ${person.line}` };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang={site.lang ?? "en"}><body>{children}</body></html>;
}
