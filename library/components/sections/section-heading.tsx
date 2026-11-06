import { cn } from "@/lib/utils";

/** A section's own heading: a plain head and, under it, one line on what follows. */
export function SectionHeading({
  title,
  subtitle,
  align = "left",
}: {
  title: string;
  subtitle?: string;
  align?: "center" | "left";
}) {
  return (
    <div
      className={cn(
        "mb-12 max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left",
      )}
    >
      <h2 className="font-heading text-4xl leading-[1.08] font-semibold text-balance sm:text-5xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-4 text-lg text-pretty text-muted-foreground">{subtitle}</p>
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
