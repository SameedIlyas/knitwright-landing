import Image, { type StaticImageData } from "next/image";
import { BENEFITS, FLOW } from "@/lib/content";
import { ArrowDisc, Display, Frame } from "./ui";
import spec from "@/public/images/r-spec.jpg";
import signoff from "@/public/images/r-signoff.jpg";
import make from "@/public/images/r-make.jpg";
import escrow from "@/public/images/r-escrow.jpg";
import reorder from "@/public/images/r-reorder.jpg";

type Row = (typeof BENEFITS.rows)[number];

const ROW_MEDIA: Record<Row["key"], { src: StaticImageData; alt: string; href: string; label: string }> = {
  spec: { src: spec, alt: "Cutting fabric along a pattern with shears", href: "#spec-live", label: "See the spec update live" },
  signoff: { src: signoff, alt: "A machinist stitching a garment", href: "#verification", label: "How verification works" },
  make: { src: make, alt: "A production line of machinists at work", href: "#production", label: "How production works" },
  escrow: { src: escrow, alt: "Cartons taped and stacked for shipping", href: "#production", label: "How escrow works" },
  reorder: { src: reorder, alt: "Workers folding finished garments", href: "#early-access", label: "Request early access" },
};

/** Alternating rows: a text card with an arrow disc beside a large photograph. */
export function Benefits() {
  return (
    <section id="how-it-works" data-nav-theme="dark" className="scroll-mt-24 bg-tile pb-16 pt-28 text-white sm:pt-32">
      <Frame wide>
        <div className="mb-12 flex flex-col gap-5 px-2 lg:flex-row lg:items-end lg:justify-between">
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

function BenefitRow({ row, flip }: { row: Row; flip: boolean }) {
  const media = ROW_MEDIA[row.key];
  return (
    <article className={`grid gap-3.5 lg:h-[min(46rem,82vh)] ${flip ? "lg:grid-cols-[2.2fr_1fr]" : "lg:grid-cols-[1fr_2.2fr]"}`}>
      <div className={`flex min-h-[20rem] flex-col justify-between gap-10 rounded-[2rem] bg-[#3a3b40] p-7 sm:p-8 ${flip ? "lg:order-2" : ""}`}>
        <div className="flex items-start justify-between gap-6">
          <h3 className="text-[clamp(2.2rem,1.4rem+2.4vw,3.6rem)] font-light leading-[1.08] tracking-[-0.035em]">{row.title}</h3>
          <ArrowDisc href={media.href} label={media.label} className="thread-ring bg-cobalt text-white" />
        </div>
        <p className="max-w-[28rem] text-[1.05rem] leading-relaxed text-white/70">{row.body}</p>
      </div>
      <div className={`relative min-h-[18rem] overflow-hidden rounded-[2rem] sm:min-h-[26rem] ${flip ? "lg:order-1" : ""}`}>
        <Image src={media.src} alt={media.alt} fill sizes="(min-width: 1024px) 66vw, 100vw" placeholder="blur" className="object-cover" />
      </div>
    </article>
  );
}
