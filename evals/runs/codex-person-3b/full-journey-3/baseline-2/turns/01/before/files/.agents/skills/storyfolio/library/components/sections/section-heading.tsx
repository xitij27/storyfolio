import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
}) {
  return (
    <div
      className={cn(
        "mx-auto mb-12 max-w-2xl",
        align === "center" ? "text-center" : "text-left",
      )}
    >
      <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-muted/40 px-3 py-1 text-xs font-medium tracking-wide text-brand uppercase">
        {eyebrow}
      </span>
      <h2 className="mt-4 font-heading text-3xl font-bold tracking-tight text-balance sm:text-4xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-3 text-pretty text-muted-foreground">{subtitle}</p>
      ) : null}
    </div>
  );
}

/**
 * Consistent vertical rhythm + anchor target for a home-page section. The
 * offset for the sticky header comes from scroll-padding-top on <html>.
 */
export function Section({
  id,
  className,
  children,
}: {
  id: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn("py-20 sm:py-28", className)}
    >
      <div className="mx-auto max-w-6xl px-page">{children}</div>
    </section>
  );
}
