import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { GalleryStory } from "@/components/transitions/gallery-bar";
import { WORLDS } from "@/components/transitions/pieces";
import { WHOLE } from "@/stitch/mix";

export const dynamicParams = false;
export const generateStaticParams = () => WORLDS.map((w) => ({ world: w.id }));

export async function generateMetadata({ params }: { params: Promise<{ world: string }> }): Promise<Metadata> {
  const { world: id } = await params;
  const world = WORLDS.find((w) => w.id === id);
  return { title: world ? `${world.name} · Transitions` : "Transitions", description: world?.how };
}

export default async function WholePage({ params }: { params: Promise<{ world: string }> }) {
  const { world: id } = await params;
  const world = WORLDS.find((w) => w.id === id);
  if (!world) notFound();
  return (
    <Suspense>
      <GalleryStory title={world.name} how={`${world.how} ${world.joins}`} mix={WHOLE[world.id]} />
    </Suspense>
  );
}
