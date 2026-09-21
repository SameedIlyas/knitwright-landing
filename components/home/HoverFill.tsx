"use client";

import type { PointerEvent, ReactNode } from "react";

/** Point the fill origin at the pointer, so colour floods in from where you entered. */
function aim(e: PointerEvent<HTMLElement>) {
  const el = e.currentTarget;
  const box = el.getBoundingClientRect();
  el.style.setProperty("--fx", `${e.clientX - box.left}px`);
  el.style.setProperty("--fy", `${e.clientY - box.top}px`);
}

interface HoverFillProps {
  children: ReactNode;
  /** Card shell classes. Add `group/fill` text-colour variants on children. */
  className?: string;
  /** Background of the colour that floods in. */
  fillClassName?: string;
}

/**
 * List-item card whose colour floods in from the pointer on hover and drains
 * back out towards where the pointer leaves. Children sit above the fill.
 */
export function HoverFill({ children, className = "", fillClassName = "bg-cobalt" }: HoverFillProps) {
  return (
    <li
      data-fill
      onPointerEnter={aim}
      onPointerLeave={aim}
      className={`group/fill relative isolate overflow-hidden ${className}`}
    >
      <span aria-hidden="true" className={`fill-layer ${fillClassName}`} />
      <div className="relative z-10 flex h-full flex-col justify-between gap-10">{children}</div>
    </li>
  );
}
