import type { ReactNode } from "react";

/** Numbered pill that opens every section: `003 ● WHAT KNITWRIGHT DOES`. */
export function SectionLabel({ n, children, dark = false }: { n: number; children: ReactNode; dark?: boolean }) {
  return (
    <span
      className={`eyebrow inline-flex items-center gap-2 rounded-full px-3 py-1.5 ${
        dark ? "bg-white/8 text-chalk" : "bg-shell text-ink"
      }`}
    >
      <span className={dark ? "text-chalk-muted" : "text-muted"}>{String(n).padStart(3, "0")}</span>
      <span aria-hidden="true" className={`size-1.5 rounded-full ${dark ? "bg-chalk" : "bg-ink"}`} />
      {children}
    </span>
  );
}

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1240px] px-5 sm:px-8 ${className}`}>{children}</div>;
}

export function ArrowIcon({ className = "size-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <path d="M3 8h9.5M8.5 4 12.5 8l-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Dark pill with an iridescent ring and an arrow chip — the one primary CTA shape. */
export function PrimaryButton({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={`thread-ring group inline-flex h-13 items-center gap-3 rounded-full bg-ink pl-6 pr-2 text-[0.95rem] font-medium text-white transition-transform duration-300 ease-out hover:-translate-y-0.5 active:translate-y-0 ${className}`}
    >
      {children}
      <span className="grid size-9 place-items-center rounded-full bg-white/12 transition-transform duration-300 ease-out group-hover:translate-x-0.5">
        <ArrowIcon />
      </span>
    </a>
  );
}

export function GlassButton({ href, children, light = false }: { href: string; children: ReactNode; light?: boolean }) {
  return (
    <a
      href={href}
      className={`${light ? "glass-light text-ink" : "glass text-white"} inline-flex h-13 items-center gap-2 rounded-full px-6 text-[0.95rem] font-medium transition-transform duration-300 ease-out hover:-translate-y-0.5`}
    >
      {children}
    </a>
  );
}

/** Section heading block: label pill, big headline, optional sub. Centered by default. */
export function SectionHead({
  n,
  label,
  title,
  sub,
  dark = false,
  align = "center",
  titleClass = "",
  children,
}: {
  n: number;
  label: string;
  title: ReactNode;
  sub?: ReactNode;
  dark?: boolean;
  align?: "center" | "left";
  titleClass?: string;
  children?: ReactNode;
}) {
  const center = align === "center";
  return (
    <div className={`flex flex-col gap-6 ${center ? "items-center text-center" : "items-start text-left"}`}>
      <SectionLabel n={n} dark={dark}>
        {label}
      </SectionLabel>
      {title}
      {sub ? (
        <p className={`max-w-[38rem] text-[1.0625rem] leading-relaxed ${dark ? "text-chalk-muted" : "text-muted"} ${titleClass}`}>
          {sub}
        </p>
      ) : null}
      {children}
    </div>
  );
}
