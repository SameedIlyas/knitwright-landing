import type { ReactNode } from "react";

/** Diagonal arrow used in every round chip on the page. */
export function ArrowUpRight({ className = "size-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <path d="M4.5 11.5 11.5 4.5M5.5 4.5h6v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

type Tone = "ink" | "white" | "outline" | "outline-light";

interface ToneStyle {
  pill: string;
  chip: string;
  /** Colour the circular fill paints; outline tones fill on hover. */
  fill?: string;
  filledText?: string;
}

const TONES: Record<Tone, ToneStyle> = {
  ink: { pill: "thread-ring bg-ink text-white", chip: "bg-white text-ink" },
  white: { pill: "bg-white text-ink", chip: "bg-ink text-white" },
  outline: {
    pill: "thread-ring bg-transparent text-ink",
    chip: "bg-[image:var(--thread)] text-ink",
    fill: "bg-ink",
    filledText: "group-hover:text-white group-[.chip-fill-auto]:text-white",
  },
  "outline-light": {
    pill: "thread-ring bg-white/5 text-white",
    chip: "bg-[image:var(--thread)] text-ink",
    fill: "bg-white",
    filledText: "group-hover:text-ink group-[.chip-fill-auto]:text-ink",
  },
};

/**
 * Pill with a round arrow chip on the right — the page's one call-to-action
 * shape. Outline tones fill from the chip outward on hover; pass `autoFill`
 * to play that fill once (used where the button scrolls into view).
 */
export function PillLink({
  href,
  children,
  tone = "ink",
  size = "lg",
  autoFill = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  tone?: Tone;
  size?: "md" | "lg";
  autoFill?: boolean;
  className?: string;
}) {
  const t = TONES[tone];
  const lg = size === "lg";
  const dims = lg ? "h-14 pl-6 pr-1.5 text-[0.98rem] [--chip-x:28px]" : "h-11 pl-5 pr-1 text-[0.92rem] [--chip-x:22px]";
  const chip = lg ? "size-11" : "size-9";
  return (
    <a
      href={href}
      className={`group relative isolate inline-flex items-center gap-3 overflow-hidden whitespace-nowrap rounded-full font-medium ${dims} ${t.pill} ${
        autoFill ? "chip-fill-auto" : ""
      } ${className}`}
    >
      {t.fill ? <span aria-hidden="true" className={`chip-fill ${t.fill}`} /> : null}
      <span className={`transition-colors duration-500 ${t.filledText ?? ""}`}>{children}</span>
      <span
        className={`grid place-items-center rounded-full transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:rotate-45 ${chip} ${t.chip}`}
      >
        <ArrowUpRight />
      </span>
    </a>
  );
}

/** Round arrow disc linking onward. */
export function ArrowDisc({
  href,
  label,
  className = "",
  down = false,
}: {
  href: string;
  label: string;
  className?: string;
  /** Point the arrow down-right, for discs that jump further down the page. */
  down?: boolean;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      className={`group grid size-14 shrink-0 place-items-center rounded-full sm:size-[4.25rem] ${className}`}
    >
      <span className={`transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${down ? "rotate-90 group-hover:rotate-[135deg]" : "group-hover:rotate-45"}`}>
        <ArrowUpRight className="size-6" />
      </span>
    </a>
  );
}

/** Horizontal page frame. The gallery and benefit rows run wider than text sections. */
export function Frame({ children, wide = false, className = "" }: { children: ReactNode; wide?: boolean; className?: string }) {
  return (
    <div className={`mx-auto w-full px-4 sm:px-6 lg:px-10 ${wide ? "max-w-[1680px]" : "max-w-[1440px]"} ${className}`}>{children}</div>
  );
}

/** Section headline with the page's light display setting. Static by design. */
export function Display({
  as: Tag = "h2",
  children,
  className = "",
}: {
  as?: "h1" | "h2" | "h3";
  children: ReactNode;
  className?: string;
}) {
  return <Tag className={`font-light tracking-[-0.045em] ${className}`}>{children}</Tag>;
}
