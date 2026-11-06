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
      <div className="border-t border-border pt-12 sm:pt-16">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <h2 className="font-heading text-5xl leading-[1.04] font-semibold text-balance sm:text-6xl">
              {t.title}
            </h2>
            <p className="mt-4 max-w-lg text-lg text-pretty text-muted-foreground">
              {t.subtitle}
            </p>
          </div>

            <div className="flex flex-col items-start gap-6 lg:col-span-6 lg:justify-end">
              <div className="flex flex-col items-start gap-3 sm:flex-row">
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
                    "h-11 px-5 text-sm",
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

              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">{t.or}</span>
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
    </Section>
  );
}
