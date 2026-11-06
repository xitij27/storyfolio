import { notFound } from "next/navigation";
import { sketches } from "@/content/sketches";

export function generateStaticParams() {
  return Object.keys(sketches).map((id) => ({ id }));
}
export default async function Sketch({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const SketchStory = Object.hasOwn(sketches, id) ? sketches[id] : undefined;
  if (!SketchStory) notFound();
  return <SketchStory />;
}
