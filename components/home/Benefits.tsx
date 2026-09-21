import Image, { type StaticImageData } from "next/image";
import type { CSSProperties } from "react";
import { BENEFITS, FLOW } from "@/lib/content";
import { ArrowDisc, Display, Frame } from "./ui";
import spec from "@/public/images/r-spec.jpg";
import signoff from "@/public/images/r-signoff.jpg";
import make from "@/public/images/r-make.jpg";
import escrow from "@/public/images/r-escrow.jpg";
import reorder from "@/public/images/r-reorder.jpg";

type Row = (typeof BENEFITS.rows)[number];

interface RowMedia {
  src: StaticImageData;
  alt: string;
  href: string;
  label: string;
  /** Where the subject sits in the photo; the spotlight stays lit around it. */
  spot: { x: string; y: string };
  /** Two short facts that slide in over the dimmed photo, each with its position. */
  callouts: [{ text: string; at: string }, { text: string; at: string }];
}

const ROW_MEDIA: Record<Row["key"], RowMedia> = {
  spec: {
    src: spec,
    alt: "Cutting fabric along a pattern with shears",
    href: "#spec-live",
    label: "See the spec update live",
    spot: { x: "45%", y: "46%" },
    callouts: [
      { text: "Tech pack in under 10 minutes", at: "left-[6%] top-[12%]" },
      { text: "Graded XS to 3XL", at: "right-[6%] bottom-[12%]" },
    ],
  },
  signoff: {
    src: signoff,
    alt: "A machinist stitching a garment",
    href: "#verification",
    label: "How the spec works",
    spot: { x: "52%", y: "60%" },
    callouts: [
      { text: "Sample in 10 working days", at: "left-[6%] top-[12%]" },
      { text: "Changes in plain language", at: "right-[6%] top-[14%]" },
    ],
  },
  make: {
    src: make,
    alt: "A production line of machinists at work",
    href: "#production",
    label: "How production works",
    spot: { x: "50%", y: "62%" },
    callouts: [
      { text: "From 50 pieces per style", at: "left-[6%] top-[12%]" },
      { text: "Price and lead time up front", at: "right-[6%] bottom-[12%]" },
    ],
  },
  escrow: {
    src: escrow,
    alt: "Cartons taped and stacked for shipping",
    href: "#production",
    label: "How escrow works",
    spot: { x: "56%", y: "62%" },
    callouts: [
      { text: "50% held until QC passes", at: "left-[6%] top-[12%]" },
      { text: "You release it", at: "right-[6%] bottom-[12%]" },
    ],
  },
  reorder: {
    src: reorder,
    alt: "Workers folding finished garments",
    href: "#early-access",
    label: "Request early access",
    spot: { x: "50%", y: "50%" },
    callouts: [
      { text: "Same spec, same line", at: "left-[6%] top-[12%]" },
      { text: "Delivered in 3 to 4 weeks", at: "right-[6%] bottom-[12%]" },
    ],
  },
};

/**
 * Alternating rows of a text card beside a large photograph. Hovering a row
 * floods the text card with cobalt from its arrow, dims the photo down to a
 * spotlight around its subject, and slides two glass callouts into view.
 */
export function Benefits() {
  return (
    <section id="how-it-works" data-nav-theme="dark" className="scroll-mt-24 bg-tile pb-12 pt-20 text-white sm:pb-16 sm:pt-32">
      <Frame wide>
        <div className="mb-8 flex flex-col gap-4 px-1 sm:mb-12 sm:gap-5 sm:px-2 lg:flex-row lg:items-end lg:justify-between">
          <Display className="max-w-[16ch] text-[clamp(2.2rem,1.3rem+2.8vw,4rem)] leading-[1.04]">{FLOW.title}</Display>
          <p className="max-w-[30rem] text-[1.05rem] leading-relaxed text-white/65">{FLOW.sub}</p>
        </div>
        <div className="flex flex-col gap-3.5">
          {BENEFITS.rows.map((row, i) => (
            <BenefitRow key={row.key} row={row} flip={i % 2 === 1} />
          ))}
        </div>
      </Frame>
    </section>
  );
}

/** Callouts are always visible when rows stack, and appear on hover or focus at lg. */
const CALLOUT_SHOW = "lg:translate-y-3 lg:opacity-0 lg:group-hover/row:translate-y-0 lg:group-hover/row:opacity-100 lg:group-focus-within/row:translate-y-0 lg:group-focus-within/row:opacity-100";

function BenefitRow({ row, flip }: { row: Row; flip: boolean }) {
  const media = ROW_MEDIA[row.key];
  const spot = { "--sx": media.spot.x, "--sy": media.spot.y } as CSSProperties;
  return (
    <article className={`group/row grid gap-3.5 lg:h-[min(46rem,82vh)] ${flip ? "lg:grid-cols-[2.2fr_1fr]" : "lg:grid-cols-[1fr_2.2fr]"}`}>
      <div
        style={{ "--fx": "calc(100% - 4.2rem)", "--fy": "4.2rem" } as CSSProperties}
        className={`relative isolate flex min-h-[20rem] flex-col justify-between gap-10 overflow-hidden rounded-[2rem] bg-[#3a3b40] p-7 sm:p-8 max-lg:z-10 max-lg:min-h-[32rem] max-lg:justify-end max-lg:gap-4 max-lg:bg-transparent max-lg:p-6 max-lg:[grid-area:1/1] ${flip ? "lg:order-2" : ""}`}
      >
        <span
          aria-hidden="true"
          className="fill-layer bg-cobalt lg:group-hover/row:[clip-path:circle(160%_at_var(--fx)_var(--fy))] lg:group-focus-within/row:[clip-path:circle(160%_at_var(--fx)_var(--fy))]"
        />
        <div className="relative z-10 flex items-start justify-between gap-6">
          <h3 className="text-[clamp(2.2rem,1.4rem+2.4vw,3.6rem)] font-light leading-[1.08] tracking-[-0.035em]">{row.title}</h3>
          <ArrowDisc
            href={media.href}
            label={media.label}
            className="thread-ring bg-cobalt text-white transition-colors duration-500 group-hover/row:bg-white group-hover/row:text-ink"
          />
        </div>
        <p className="relative z-10 max-w-[28rem] text-[1.05rem] leading-relaxed text-white/70 transition-colors duration-500 group-hover/row:text-white max-lg:text-[1rem] max-lg:text-white/90">{row.body}</p>
      </div>

      <div style={spot} className={`relative min-h-[18rem] overflow-hidden rounded-[2rem] bg-tile-2 sm:min-h-[26rem] max-lg:min-h-0 max-lg:[grid-area:1/1] ${flip ? "lg:order-1" : ""}`}>
        <Image
          src={media.src}
          alt={media.alt}
          fill
          sizes="(min-width: 1024px) 66vw, 100vw"
          placeholder="blur"
          className="object-cover transition-[filter] duration-700 lg:group-hover/row:brightness-[0.32] lg:group-focus-within/row:brightness-[0.32]"
        />
        {/* The same photograph again, kept bright inside a soft ellipse around its subject. */}
        <Image
          src={media.src}
          alt=""
          aria-hidden="true"
          fill
          sizes="(min-width: 1024px) 66vw, 100vw"
          className="object-cover opacity-0 transition-opacity duration-700 [mask-image:radial-gradient(ellipse_30%_44%_at_var(--sx)_var(--sy),#000_50%,transparent_100%)] [-webkit-mask-image:radial-gradient(ellipse_30%_44%_at_var(--sx)_var(--sy),#000_50%,transparent_100%)] lg:group-hover/row:opacity-100 lg:group-focus-within/row:opacity-100"
        />
        {/* Phones: a shaded photo with the two facts stacked in its top corner, the
            caption below. From lg the wrapper disappears and each fact is placed on the photo. */}
        <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,16,18,0.5)_0%,rgba(15,16,18,0.05)_28%,rgba(15,16,18,0.55)_52%,rgba(15,16,18,0.94)_100%)] lg:hidden" />
        <div className="absolute left-3.5 top-3.5 flex max-w-[calc(100%-1.75rem)] flex-col items-start gap-2 lg:contents">
          {media.callouts.map((c, n) => (
            <p
              key={c.text}
              style={{ transitionDelay: `${n * 90}ms` }}
              className={`glass-panel absolute max-w-[15rem] rounded-[1.4rem] px-5 py-3.5 text-[0.98rem] font-medium leading-snug text-white transition-[opacity,transform] duration-500 max-lg:static max-lg:rounded-full max-lg:px-4 max-lg:py-2 max-lg:text-sm ${c.at} ${CALLOUT_SHOW}`}
            >
              {c.text}
            </p>
          ))}
        </div>
      </div>
    </article>
  );
}
