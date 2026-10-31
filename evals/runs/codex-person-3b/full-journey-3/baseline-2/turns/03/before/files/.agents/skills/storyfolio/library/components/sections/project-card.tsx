"use client";

import * as React from "react";

import type { CardLink, CardSlide, ExpandingCard } from "@/components/pieces/expanding-cards";
import { ColouriseFigure, FeistelFigure, MazeFigure } from "@/components/figures/project-figures";
import { person, type Project, type ProjectCategory } from "@/content/sample";

/*
  A project as the project window shows it. Used by the Projects section's
  grid and by the V3 project window, which opens the same window from text.
*/

const t = person.projects;

const CATEGORY_GRADIENT: Record<ProjectCategory, string> = {
  "data-science": "from-fuchsia-500 to-pink-500",
  swe: "from-indigo-500 to-violet-500",
  cybersecurity: "from-amber-500 to-red-500",
};

export function toCard(project: Project): ExpandingCard {
  const links: CardLink[] = [];
  if (project.github) links.push({ label: t.viewCode, href: project.github, kind: "github" });
  if (project.demo) links.push({ label: t.viewLive, href: project.demo, kind: "external" });

  const figure = projectFigure(project);
  const slides: CardSlide[] = [
    ...(figure ? [{ type: "node" as const, node: figure }] : []),
    ...project.images.map((src) => ({ type: "image" as const, src })),
  ];

  return {
    id: project.id,
    title: project.title,
    description: project.description,
    slides,
    categoryLabel: t.categories[project.category],
    accentClassName: CATEGORY_GRADIENT[project.category],
    highlights: project.highlights ?? [],
    tags: project.tech,
    links,
    featured: project.featured,
  };
}

/**
 * A live figure that shows how the project works, opening its window ahead
 * of the screenshots. Only where a drawing can show the mechanism better than
 * a screenshot does: the rest keep their images.
 */
function projectFigure(project: Project): React.ReactNode {
  switch (project.id) {
    case "toy-cipher":
      return <FeistelFigure label={t.figs.feistelAlt} caption={t.figs.feistel} />;
    case "maze-robot":
      return <MazeFigure label={t.figs.mazeAlt} caption={t.figs.maze} />;
    case "photo-colouriser":
      return project.compare ? (
        <ColouriseFigure
          before={project.compare.before}
          after={project.compare.after}
          label={t.figs.colouriseAlt}
          sliderLabel={t.figs.colouriseSlider}
          caption={t.figs.colourise}
          hint={t.figs.colouriseHint}
        />
      ) : null;
    default:
      return null;
  }
}
