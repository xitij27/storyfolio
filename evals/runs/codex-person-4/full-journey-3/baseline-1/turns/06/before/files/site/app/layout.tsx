import type { Metadata } from "next";
import { person } from "@/content/person";
import { site } from "@/content/site";
import "./globals.css";

// Every page is titled with the person's name and described by what they do,
// unless it gives a title of its own (a project's page, the CV).
export const metadata: Metadata = {
  title: `${person.name} — Migrations, databases, reliability`,
  description: "Dawit Bekele: migration planning, database cutovers and reliability. Going independent in 2027. Migration and conference enquiries.",
  openGraph: { type: "website", title: "Dawit Bekele — Migrations, databases, reliability", description: "Migration planning, database cutovers and reliability. Rotterdam. Going independent in 2027." },
  twitter: { card: "summary_large_image", title: "Dawit Bekele — Migrations, databases, reliability", images: ["/opengraph-image.png"] },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang={site.lang ?? "en"}><body>{children}</body></html>;
}
