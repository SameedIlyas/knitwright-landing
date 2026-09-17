"use client";

import { useInView } from "motion/react";
import { useRef, type ReactNode } from "react";
import { PillLink } from "./ui";

/** An outline pill that plays its chip fill once, the first time it scrolls into view. */
export function InViewPill({ href, children }: { href: string; children: ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null);
  const seen = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  return (
    <span ref={ref} className="inline-flex">
      <PillLink href={href} tone="outline-light" autoFill={seen}>
        {children}
      </PillLink>
    </span>
  );
}
