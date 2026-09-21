"use client";

import Image, { type StaticImageData } from "next/image";
import { useState, type CSSProperties } from "react";
import { GALLERY } from "@/lib/content";
import { ArrowUpRight, Display, Frame } from "./ui";
import spec from "@/public/images/g-spec.jpg";
import signoff from "@/public/images/g-signoff.jpg";
import costing from "@/public/images/g-costing.jpg";
import make from "@/public/images/g-make.jpg";
import escrow from "@/public/images/g-escrow.jpg";
import reorder from "@/public/images/g-reorder.jpg";

type Panel = (typeof GALLERY.panels)[number];
type Key = Panel["key"];

const PHOTOS: Record<Key, { src: StaticImageData; alt: string }> = {
  spec: { src: spec, alt: "Hands cutting a paper sewing pattern" },
  signoff: { src: signoff, alt: "Pattern pieces laid out on a cutting table" },
  costing: { src: costing, alt: "Folded fabric stacked by colour" },
  make: { src: make, alt: "Hands guiding fabric through a sewing machine" },
  escrow: { src: escrow, alt: "Cartons and packing supplies ready to ship" },
  reorder: { src: reorder, alt: "A stack of folded shirts" },
};

/** Four single columns, with Make and Escrow sharing the fourth. */
const COLUMNS: (Key | [Key, Key])[] = ["spec", "signoff", "costing", ["make", "escrow"], "reorder"];
const byKey = Object.fromEntries(GALLERY.panels.map((p) => [p.key, p])) as Record<Key, Panel>;

const EASE = "ease-[cubic-bezier(0.25,1,0.5,1)] duration-[600ms]";

/**
 * Row of tall photo panels. Hovering (or focusing) one widens it to ten times
 * its neighbours, lifts it, and swaps its label for the full overlay; the
 * narrowed panels drop their labels. Below lg the panels stack and pin under
 * the nav one after another, each new card sliding over the last.
 */
export function Gallery() {
  const [active, setActive] = useState<Key | null>(null);
  const grow = (keys: Key[]): CSSProperties => ({ flexGrow: active ? (keys.includes(active) ? 10 : 1) : 1 });

  return (
    <section id="gallery" data-nav-theme="light" className="scroll-mt-24 bg-canvas pb-16 pt-20 sm:pb-24 sm:pt-32">
      <Frame wide>
        <div className="mx-auto flex max-w-[64rem] flex-col items-center text-center">
          <Display className="text-[clamp(2rem,1.2rem+2.4vw,3.2rem)] leading-[1.1] text-ink-2">{GALLERY.title}</Display>
          <p className="mt-5 max-w-[48rem] text-[clamp(1rem,0.9rem+0.4vw,1.35rem)] leading-relaxed text-ink-2/80">{GALLERY.sub}</p>
        </div>

        <div
          className="mt-10 flex flex-col gap-4 sm:mt-14 lg:h-[600px] lg:flex-row lg:gap-6"
          onPointerLeave={() => setActive(null)}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setActive(null);
          }}
        >
          {COLUMNS.map((col) =>
            Array.isArray(col) ? (
              <div key={col.join("-")} className={`flex min-w-0 flex-col gap-4 transition-[flex-grow] max-lg:contents lg:basis-0 lg:gap-6 ${EASE}`} style={grow(col)}>
                {col.map((k) => (
                  <PanelCard
                    key={k}
                    panel={byKey[k]}
                    state={active === null ? "rest" : active === k ? "open" : "shut"}
                    onActivate={() => setActive(k)}
                    style={{ flexGrow: active === k ? 3 : 1 }}
                  />
                ))}
              </div>
            ) : (
              <PanelCard
                key={col}
                panel={byKey[col]}
                state={active === null ? "rest" : active === col ? "open" : "shut"}
                onActivate={() => setActive(col)}
                style={grow([col])}
              />
            ),
          )}
        </div>
      </Frame>
    </section>
  );
}

type PanelState = "rest" | "open" | "shut";

function PanelCard({
  panel,
  state,
  onActivate,
  style,
}: {
  panel: Panel;
  state: PanelState;
  onActivate: () => void;
  style: CSSProperties;
}) {
  const photo = PHOTOS[panel.key];
  const open = state === "open";
  return (
    <a
      href="#how-it-works"
      aria-label={`${panel.title}: ${panel.points.join(", ")}`}
      onPointerEnter={onActivate}
      onFocus={onActivate}
      style={style}
      className={`relative isolate block max-lg:sticky max-lg:top-24 max-lg:shadow-[0_24px_40px_-26px_rgba(15,16,18,0.55)] min-h-[19rem] min-w-0 overflow-hidden rounded-[2rem] sm:min-h-[22rem] sm:rounded-[2.5rem] bg-tile transition-[flex-grow,transform] lg:min-h-0 lg:basis-0 ${EASE} ${
        open ? "lg:-translate-y-2" : ""
      }`}
    >
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes="(min-width: 1024px) 60vw, 100vw"
        placeholder="blur"
        className={`-z-10 object-cover transition-transform ${EASE} ${open ? "scale-105" : "scale-100"}`}
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-black/55 via-black/10 to-black/5" />

      {/* Resting label: visible until any panel opens. */}
      <p
        aria-hidden="true"
        className={`absolute bottom-7 left-7 whitespace-nowrap text-[2rem] font-light leading-none tracking-[-0.03em] text-white transition-opacity duration-300 max-lg:hidden ${
          state === "rest" ? "opacity-100" : "opacity-0"
        }`}
      >
        {panel.title}
      </p>

      {/* Glass card: title, points and arrow. Always shown when stacked. Hovering
          the card itself tints it cobalt and shifts the text colour. */}
      <div
        className={`absolute inset-x-0 bottom-0 p-4 text-white transition-[opacity,transform] sm:p-5 ${EASE} ${
          open ? "lg:translate-y-0 lg:opacity-100" : "lg:pointer-events-none lg:translate-y-5 lg:opacity-0"
        }`}
      >
        <div className="glass-panel group/glass flex items-end justify-between gap-4 rounded-[1.5rem] p-5 sm:rounded-[1.9rem] sm:gap-6 transition-[background-color,border-color] duration-500 hover:border-white/45 hover:bg-cobalt/75 sm:p-7">
          <div className="min-w-0">
            <h3 className="text-[2rem] font-light leading-none tracking-[-0.03em] transition-colors duration-500 group-hover/glass:text-[#fff1c2]">
              {panel.title}
            </h3>
            <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5 text-[0.98rem] text-white/80 transition-colors duration-500 group-hover/glass:text-white">
              {panel.points.map((p) => (
                <li key={p} className="whitespace-nowrap">
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <span className="grid size-12 shrink-0 place-items-center rounded-full bg-white text-ink transition-[background-color,transform] duration-500 group-hover/glass:rotate-45 group-hover/glass:bg-[#fff1c2]">
            <ArrowUpRight className="size-5" />
          </span>
        </div>
      </div>
    </a>
  );
}
