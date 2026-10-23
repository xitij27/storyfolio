"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy, Mail } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { Section } from "@/components/sections/section-heading";
import { buttonVariants } from "@/components/ui/button";
import { EASE_OUT } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { person } from "@/content/sample";

const EMAIL = person.email;

const COPIED_MS = 1600;

export function Contact() {
  const t = person.contact;
  const [copied, setCopied] = useState(false);
  const resetTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(resetTimer.current), []);

  // mailto: does nothing for the many desktop visitors with no mail app set
  // up, so the address can also be copied, with a check to say it worked.
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      clearTimeout(resetTimer.current);
      resetTimer.current = setTimeout(() => setCopied(false), COPIED_MS);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  }

  return (
    <Section id="contact">
      <div className="relative overflow-hidden rounded-3xl bg-slate-900 p-1">
        <div className="relative overflow-hidden rounded-[1.68rem] bg-slate-950 p-8 text-center shadow-sm sm:p-14">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 -top-24 mx-auto h-48 w-2/3 rounded-full bg-gradient-to-r from-brand via-brand-2 to-brand-3 opacity-20 blur-3xl"
          />

          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium tracking-wide text-brand uppercase">
              {t.eyebrow}
            </span>
            <h2 className="mx-auto mt-4 max-w-xl font-heading text-3xl font-bold tracking-tight text-balance text-white sm:text-4xl">
              {t.title}
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-pretty text-slate-300">
              {t.subtitle}
            </p>

            <div className="mt-8 flex flex-col items-center gap-5">
              <div className="flex flex-col items-center gap-3 sm:flex-row">
                <a
                  href={`mailto:${EMAIL}`}
                  className={cn(buttonVariants({ size: "lg" }), "h-11 px-6 text-sm")}
                >
                  <Mail className="size-4" />
                  {t.emailCta}
                </a>
                <button
                  type="button"
                  onClick={copyEmail}
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "h-11 px-5 font-mono text-sm",
                  )}
                >
                  <span className="relative grid size-4 place-items-center">
                    <AnimatePresence mode="popLayout" initial={false}>
                      <motion.span
                        key={copied ? "check" : "copy"}
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                        transition={{ duration: 0.18, ease: EASE_OUT }}
                        className="grid place-items-center"
                      >
                        {copied ? (
                          <Check className="size-4" />
                        ) : (
                          <Copy className="size-4" />
                        )}
                      </motion.span>
                    </AnimatePresence>
                  </span>
                  {/* Says what the button does without replacing the address
                      as its name, so asking for it by what's on screen still
                      works. */}
                  <span className="sr-only">{t.copyEmail}:</span>
                  {EMAIL}
                </button>
              </div>
              {/* Announces the copy; the button's own text is the address. */}
              <span aria-live="polite" className="sr-only">
                {copied ? t.copied : ""}
              </span>

              <div className="flex flex-col items-center gap-3">
                <span className="text-xs text-slate-400">{t.or}</span>
                <div className="flex items-center gap-2">
                  {person.socials
                    .filter((s) => s.id !== "email")
                    .map((s) => (
                      <a
                        key={s.id}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={s.label}
                        className={cn(
                          buttonVariants({ variant: "outline", size: "icon" }),
                        )}
                      >
                        <s.icon className="size-5" />
                      </a>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
