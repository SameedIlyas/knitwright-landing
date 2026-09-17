"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { NAV_LINKS, SITE } from "@/lib/content";
import { KnitLogo } from "@/components/ui/logo";
import { PillLink } from "./ui";

const EASE = [0.22, 1, 0.36, 1] as const;
type Theme = "dark" | "light";

/**
 * Reads the `data-nav-theme` of whichever section sits under the bar, so the
 * glass turns dark over dark sections and white over light ones.
 */
function useThemeUnderBar(probeY: number): Theme {
  const [theme, setTheme] = useState<Theme>("dark");
  useEffect(() => {
    let frame = 0;
    const read = () => {
      frame = 0;
      const hits = document.elementsFromPoint(window.innerWidth / 2, probeY);
      const section = hits.map((el) => el.closest<HTMLElement>("[data-nav-theme]")).find(Boolean);
      setTheme(section?.dataset.navTheme === "light" ? "light" : "dark");
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(read);
    };
    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [probeY]);
  return theme;
}

export function Nav() {
  const [open, setOpen] = useState(false);
  const theme = useThemeUnderBar(56);
  const sheetRef = useRef<HTMLDivElement>(null);
  const dark = theme === "dark" || open;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    sheetRef.current?.querySelector<HTMLElement>("a")?.focus();
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-[2.8vw] sm:pt-[22px]">
      <nav
        aria-label="Primary"
        className={`pointer-events-auto mx-auto flex h-16 max-w-[1680px] items-center justify-between rounded-full border pl-6 pr-2 backdrop-blur-xl backdrop-saturate-150 transition-[background-color,border-color,color,box-shadow] duration-[450ms] ease-[ease] sm:h-[4.4rem] sm:pl-9 ${
          dark
            ? "border-white/12 bg-[rgba(23,24,27,0.52)] text-white"
            : "border-white bg-white/88 text-ink shadow-[0_18px_40px_-24px_rgba(15,16,18,0.35)]"
        }`}
      >
        <div className="flex items-center gap-12">
          <a href="#top" aria-label={`${SITE.name} home`} className="shrink-0">
            <KnitLogo className="h-[1.3rem] w-auto sm:h-6" />
          </a>
          <ul className="hidden items-center gap-9 lg:flex">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-[1.02rem] opacity-90 transition-opacity hover:opacity-100">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-2 sm:gap-5">
          <PillLink href="#early-access" tone={dark ? "outline-light" : "outline"} size="md" className="hidden sm:inline-flex">
            Join the waitlist
          </PillLink>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="site-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className={`grid size-12 place-items-center rounded-full transition-colors lg:hidden ${dark ? "hover:bg-white/10" : "hover:bg-ink/5"}`}
          >
            <span className="relative block h-3 w-5" aria-hidden="true">
              <span className={`absolute left-0 h-[1.5px] w-5 bg-current transition-all duration-300 ${open ? "top-1.5 rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 h-[1.5px] w-5 bg-current transition-all duration-300 ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
            </span>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="site-menu"
            ref={sheetRef}
            initial={{ opacity: 0, y: -12, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -8, filter: "blur(6px)" }}
            transition={{ duration: 0.35, ease: EASE }}
            className="pointer-events-auto mx-auto mt-2 max-w-[1680px] rounded-[2rem] border border-white/12 bg-[rgba(23,24,27,0.9)] p-3 text-white backdrop-blur-xl lg:hidden"
          >
            <ul className="flex flex-col">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} onClick={() => setOpen(false)} className="block rounded-2xl px-4 py-3.5 text-lg transition-colors hover:bg-white/8">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="p-2 pt-3">
              <PillLink href="#early-access" tone="white" className="w-full justify-between">
                Join the waitlist
              </PillLink>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
