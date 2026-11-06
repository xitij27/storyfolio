"use client";

import * as React from "react";
import { ChevronDown, Filter } from "lucide-react";

import { ExpandingCards } from "@/components/pieces/expanding-cards";
import { GooeySearch } from "@/components/pieces/gooey-search";
import { Section, SectionHeading } from "@/components/sections/section-heading";
import { toCard } from "@/components/sections/project-card";
import { Button } from "@/components/ui/button";
import { person, type Project, type ProjectCategory } from "@/content/sample";
import { cn } from "@/lib/utils";

const COLLAPSED_COUNT = 6;
const t = person.projects;
const projects = person.projectList;

// Categories in the order they first appear, for a stable filter bar.
const CATEGORIES = Array.from(new Set(projects.map((p) => p.category))) as ProjectCategory[];

function projectSearchText(project: Project): string {
  return [
    project.title,
    project.tech.join(" "),
    project.highlights?.join(" ") ?? "",
    t.categories[project.category],
    project.description,
  ]
    .join(" ")
    .toLowerCase();
}

export function Projects() {
  const [active, setActive] = React.useState<ProjectCategory | "all">("all");
  const [search, setSearch] = React.useState("");
  const [expanded, setExpanded] = React.useState(false);

  React.useEffect(() => {
    setExpanded(false);
  }, [active, search]);

  const query = search.trim().toLowerCase();

  const filtered = projects.filter((project) => {
    const matchesCategory = active === "all" || project.category === active;
    const matchesQuery = query === "" || projectSearchText(project).includes(query);
    return matchesCategory && matchesQuery;
  });

  const filters: (ProjectCategory | "all")[] = ["all", ...CATEGORIES];
  const filterName = (f: ProjectCategory | "all") => (f === "all" ? t.all : t.categories[f]);

  const cards = (expanded ? filtered : filtered.slice(0, COLLAPSED_COUNT)).map(toCard);

  const toggleButtonRef = React.useRef<HTMLButtonElement>(null);
  const pinnedOffsetRef = React.useRef<number | null>(null);

  const handleToggle = () => {
    if (expanded) {
      // Collapsing: pin the button so the shrinking grid doesn't scroll it
      // out of view. Expanding needs no correction: the page just grows.
      pinnedOffsetRef.current = toggleButtonRef.current?.getBoundingClientRect().top ?? null;
    }
    setExpanded((v) => !v);
  };

  React.useLayoutEffect(() => {
    if (pinnedOffsetRef.current === null || !toggleButtonRef.current) return;
    const newTop = toggleButtonRef.current.getBoundingClientRect().top;
    window.scrollBy(0, newTop - pinnedOffsetRef.current);
    pinnedOffsetRef.current = null;
  }, [expanded]);

  return (
    <Section id="projects" className="bg-muted/20">
      <SectionHeading eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} />

      <div className="mb-8 flex items-center justify-between gap-4 sm:flex-wrap">
        {/* On a phone the filters fold into one round button over a native
            select, so the current filter is announced and picked from the
            system's own list. The dot is the only other sign a filter is on. */}
        <label className="relative inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-border/60 bg-background text-muted-foreground focus-within:ring-2 focus-within:ring-brand sm:hidden">
          <Filter className="size-4" aria-hidden />
          <select
            aria-label={t.filterLabel}
            value={active}
            onChange={(event) => setActive(event.target.value as ProjectCategory | "all")}
            className="absolute inset-0 cursor-pointer appearance-none opacity-0"
          >
            {filters.map((f) => (
              <option key={f} value={f}>
                {filterName(f)}
              </option>
            ))}
          </select>
          {active !== "all" ? <span className="absolute right-0.5 top-0.5 size-2 rounded-full bg-brand" /> : null}
        </label>

        <div role="group" aria-label={t.filterLabel} className="hidden flex-wrap justify-center gap-2 sm:flex">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setActive(f)}
              aria-pressed={active === f}
              className={cn(
                "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
                active === f
                  ? "border-transparent bg-primary text-primary-foreground"
                  : "border-border/60 bg-background text-muted-foreground hover:border-brand/40 hover:text-foreground",
              )}
            >
              {filterName(f)}
            </button>
          ))}
        </div>

        <GooeySearch
          placeholder={t.searchPlaceholder}
          ariaLabel={t.searchLabel}
          value={search}
          onValueChange={setSearch}
          width={170}
        />
      </div>

      {cards.length ? (
        <ExpandingCards
          cards={cards}
          labels={{ close: t.close, previous: t.previous, next: t.next, featured: t.featured }}
        />
      ) : (
        <p className="text-center text-sm text-muted-foreground">{t.noResults}</p>
      )}
      {/* Always mounted, so a search that comes up empty is announced; a
          live region added along with its text usually isn't. */}
      <p aria-live="polite" className="sr-only">
        {cards.length ? "" : t.noResults}
      </p>

      {filtered.length > COLLAPSED_COUNT && (
        <div className="mt-8 flex justify-center">
          <Button ref={toggleButtonRef} variant="outline" onClick={handleToggle} aria-expanded={expanded}>
            {expanded ? t.showLess : t.showMore}
            <ChevronDown className={`size-4 transition-transform ${expanded ? "rotate-180" : ""}`} aria-hidden />
          </Button>
        </div>
      )}
    </Section>
  );
}
