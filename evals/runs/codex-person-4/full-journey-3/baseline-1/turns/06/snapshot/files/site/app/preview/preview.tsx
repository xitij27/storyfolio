"use client";
import { useSearchParams } from "next/navigation";
import { StitchedStory } from "@/stitch/react";
import { parseMix } from "@/stitch/mix";
import { parseLook } from "@/stitch/look";
import { person } from "@/content/person";
import { mix } from "@/content/mix";
import { site } from "@/content/site";
import { wording } from "@/content/wording";

export function Preview() {
  const params = useSearchParams();
  const chosen = parseMix(params.get("mix") ?? "") ?? mix;
  const look = parseLook(params.get("look")) ?? site.look;
  return <StitchedStory person={person} mix={chosen} look={look} words={wording[params.get("words") ?? ""] ?? site.words} cv={site.cv} />;
}
