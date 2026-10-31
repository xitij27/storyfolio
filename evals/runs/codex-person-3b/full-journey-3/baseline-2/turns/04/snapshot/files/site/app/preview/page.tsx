import type { Metadata } from "next";
import { Portfolio } from "@/components/portfolio";
import { parseLook } from "@/stitch/look";
import { parseMix } from "@/stitch/mix";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "Dawit Bekele — appearance preview", robots: { index: false, follow: false } };
export default async function PreviewPage({ searchParams }: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const values = await searchParams;
  const single = (key: string) => typeof values[key] === "string" ? values[key] as string : undefined;
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(values)) {
    if (typeof value === "string") query.set(key, value);
    else value?.forEach((item) => query.append(key, item));
  }
  return <Portfolio preview look={parseLook(single("look")) ?? site.look} mix={parseMix(single("mix") ?? "") ?? undefined}
    query={query.toString()} textOnly={single("view") === "text"} />;
}
