import type { Metadata, Viewport } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Storyfolio library", template: "%s · Storyfolio library" },
  description: "Portfolio components to see running and copy: each with the chapter of a site it serves.",
};

export const viewport: Viewport = { themeColor: "#0c0c0f", viewportFit: "cover" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body>{children}</body>
    </html>
  );
}
