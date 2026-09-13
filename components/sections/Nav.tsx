"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { NAV_LINKS, SITE } from "@/lib/content";
import { KnitMark } from "@/components/ui/primitives";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Floating pill nav: mark · Menu · Join the waitlist. Menu opens a frosted sheet. */
export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const sheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    sheetRef.current?.querySelector<HTMLElement>("a")?.focus();
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-5">
      <div className="pointer-events-auto relative flex flex-col items-center">
        <motion.nav
          aria-label="Primary"
          initial={{ y: -24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
          className="flex items-center gap-1.5"
        >
          <a
            href="#top"
            aria-label={`${SITE.name} home`}
            className={`glass grid size-14 place-items-center rounded-full text-white transition-colors duration-500 ${scrolled ? "bg-ink/80" : ""}`}
          >
            <KnitMark className="size-6" />
          </a>
          <div className={`glass flex h-14 items-center gap-1 rounded-full p-1.5 transition-colors duration-500 ${scrolled ? "bg-ink/80" : ""}`}>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="site-menu"
              className="flex h-11 items-center gap-2.5 rounded-full px-4 text-[0.95rem] font-medium text-white transition-colors hover:bg-white/10"
            >
              <span className="relative block h-3 w-4" aria-hidden="true">
                <span className={`absolute left-0 h-[1.5px] w-4 bg-current transition-all duration-300 ${open ? "top-1.5 rotate-45" : "top-0.5"}`} />
                <span className={`absolute left-0 h-[1.5px] w-4 bg-current transition-all duration-300 ${open ? "top-1.5 -rotate-45" : "top-2.5"}`} />
              </span>
              {open ? "Close" : "Menu"}
            </button>
            <a
              href="#early-access"
              className="flex h-11 items-center rounded-full bg-white/90 px-5 text-[0.95rem] font-medium text-ink transition-colors hover:bg-white"
            >
              <span className="hidden sm:inline">Join the waitlist</span>
              <span className="sm:hidden">Waitlist</span>
            </a>
          </div>
        </motion.nav>

        <AnimatePresence>
          {open ? (
            <motion.div
              id="site-menu"
              ref={sheetRef}
              initial={{ opacity: 0, y: -10, scale: 0.97, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -8, scale: 0.98, filter: "blur(6px)" }}
              transition={{ duration: 0.35, ease: EASE }}
              className="glass mt-2 w-[min(22rem,calc(100vw-2rem))] origin-top rounded-[1.75rem] bg-ink/85 p-2"
            >
              <ul className="flex flex-col">
                {NAV_LINKS.map((l, i) => (
                  <motion.li
                    key={l.href}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.05, duration: 0.4, ease: EASE }}
                  >
                    <a
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between rounded-2xl px-4 py-3.5 text-lg font-medium tracking-tight text-white transition-colors hover:bg-white/8"
                    >
                      {l.label}
                      <span className="font-mono text-xs text-white/40">0{i + 1}</span>
                    </a>
                  </motion.li>
                ))}
              </ul>
              <p className="eyebrow px-4 pb-3 pt-2 text-white/45">{SITE.lockup}</p>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </header>
  );
}
