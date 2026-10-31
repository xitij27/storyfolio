import type { Metadata } from "next";
import { person } from "@/content/person";
import { site } from "@/content/site";
import "./globals.css";

// Every page is titled with the person's name and described by what they do,
// unless it gives a title of its own (a project's page, the CV).
export const metadata: Metadata = {
  // Local image origin; the public origin is deferred until publishing is chosen.
  metadataBase: new URL("http://127.0.0.1:3000"),
  title: person.name,
  description: "Dawit Bekele. Platform engineering, migrations, databases and reliability.",
  openGraph: { title: "Dawit Bekele — Staff Platform Engineer", description: "Migrations, databases and reliability.", type: "website", locale: "en_GB" },
  twitter: { card: "summary_large_image", title: "Dawit Bekele — Staff Platform Engineer", description: "Migrations, databases and reliability." },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang={site.lang ?? "en"}><body>{children}</body></html>;
}
