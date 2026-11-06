"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Code2, Server, BrainCircuit, Cloud, type LucideIcon } from "lucide-react";

import { person, type SkillGroup } from "@/content/sample";
import type { Evidence } from "@/lib/evidence";
import { EASE_OUT } from "@/lib/motion";
import { cn } from "@/lib/utils";

const count = (n: number, word: string) => (n === 0 ? `no ${word}s` : `${n} ${word}${n === 1 ? "" : "s"}`);
const summary = (skill: string, roles: number, projects: number) =>
  `${skill} shows up in ${count(roles, "role")} and ${count(projects, "project")}.`;

const GROUP_ICON: Record<SkillGroup["id"], LucideIcon> = {
  frontend: Code2,
  backend: Server,
  data: BrainCircuit,
  cloud: Cloud,
};

/**
 * Each skill carries a count of the roles and projects it shows up in, and
 * picking one opens that evidence inside its group's card, so a list of
 * claims becomes something a reader can check. Skills that no listed role or
 * project mentions stay visible but dashed and inert.
 */
export function SkillGroups({
  evidence,
  periods,
}: {
  evidence: Record<string, Evidence>;
  /** Each role's dates, already localised (see lib/periods.ts). */
  periods: Record<string, string>;
}) {
  const t = person.skills;
  const reduceMotion = useReducedMotion();
  const [selected, setSelected] = React.useState<string | null>(null);

  const selectedEvidence = selected ? evidence[selected] : null;

  return (
    <>
      <p className="mx-auto -mt-6 mb-10 max-w-2xl text-pretty text-center text-sm text-muted-foreground">
        {t.hint}
      </p>

      {/* items-start: an open card grows on its own instead of stretching
          its neighbour in the row. */}
      <div className="grid items-start gap-4 sm:grid-cols-2">
        {person.skillGroups.map((group) => {
          const Icon = GROUP_ICON[group.id];
          const open = selected !== null && group.skills.includes(selected);
          return (
            <div
              key={group.id}
              className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm"
            >
              <div className="mb-4 flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-brand/15 to-brand-3/15 text-brand ring-1 ring-brand/20">
                  <Icon className="size-5" />
                </span>
                <h3 className="font-heading text-lg font-semibold">
                  {group.name}
                </h3>
              </div>

              <ul className="flex flex-wrap gap-2">
                {group.skills.map((skill) => {
                  const ev = evidence[skill];
                  const count = ev.roleIds.length + ev.projectIds.length;
                  if (count === 0) {
                    return (
                      <li
                        key={skill}
                        className="rounded-lg border border-dashed border-border px-2.5 py-1 text-sm text-muted-foreground/70"
                      >
                        {skill}
                      </li>
                    );
                  }
                  const pressed = selected === skill;
                  return (
                    <li key={skill}>
                      <button
                        type="button"
                        aria-pressed={pressed}
                        onClick={() =>
                          setSelected((s) => (s === skill ? null : skill))
                        }
                        className={cn(
                          "inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-sm transition-[color,background-color,border-color,transform] duration-150 ease-out active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand",
                          pressed
                            ? "border-brand bg-brand/10 text-foreground"
                            : "border-border/60 bg-background/60 text-muted-foreground hover:border-brand/40 hover:text-foreground",
                        )}
                      >
                        {skill}
                        <span className="font-mono text-[11px] text-muted-foreground tabular-nums">
                          {count}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>

              <AnimatePresence initial={false}>
                {open && selected && selectedEvidence ? (
                  <motion.div
                    key="evidence"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: reduceMotion ? 0 : 0.25, ease: EASE_OUT }}
                    className="relative overflow-hidden"
                  >
                    <EvidencePanel
                      skill={selected}
                      evidence={selectedEvidence}
                      periods={periods}
                    />
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* One short announcement per pick; the panel itself is too long to be
          read out every time. */}
      <p aria-live="polite" className="sr-only">
        {selected && selectedEvidence
          ? summary(selected, selectedEvidence.roleIds.length, selectedEvidence.projectIds.length)
          : ""}
      </p>
    </>
  );
}

function EvidencePanel({
  skill,
  evidence,
  periods,
}: {
  skill: string;
  evidence: Evidence;
  periods: Record<string, string>;
}) {
  const t = person.skills;
  const reduceMotion = useReducedMotion();

  const roles = person.experiences.filter((e) => evidence.roleIds.includes(e.id));
  const usedIn = person.projectList.filter((p) => evidence.projectIds.includes(p.id));

  return (
    // Switching skills within a card crossfades the contents rather than
    // closing and reopening the panel.
    <AnimatePresence mode="popLayout" initial={false}>
      <motion.div
        key={skill}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: reduceMotion ? 0 : 0.15 }}
        className="mt-5 space-y-4 border-t border-border/60 pt-4"
      >
        <p className="text-sm font-medium">
          {summary(skill, roles.length, usedIn.length)}
        </p>

        {roles.length > 0 ? (
          <div>
            <h4 className="text-xs font-medium text-muted-foreground">
              {t.rolesHeading}
            </h4>
            <ul className="mt-1.5 space-y-1.5">
              {roles.map((r) => (
                <li
                  key={r.id}
                  className="flex flex-wrap items-baseline justify-between gap-x-3 text-sm"
                >
                  <span>
                    <span className="font-medium">{r.company}</span>{" "}
                    <span className="text-muted-foreground">
                      {r.role}
                    </span>
                  </span>
                  <span className="text-xs text-muted-foreground tabular-nums">
                    {periods[r.id]}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {usedIn.length > 0 ? (
          <div>
            <h4 className="text-xs font-medium text-muted-foreground">
              {t.projectsHeading}
            </h4>
            <ul className="mt-1.5 space-y-1.5">
              {usedIn.map((p) => (
                <li
                  key={p.id}
                  className="flex flex-wrap items-baseline justify-between gap-x-3 text-sm"
                >
                  <span className="font-medium">{p.title}</span>
                  <span className="text-xs text-muted-foreground">
                    {person.projects.categories[p.category]}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </motion.div>
    </AnimatePresence>
  );
}
