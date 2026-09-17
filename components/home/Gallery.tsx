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
  signoff: { src: signoff, alt: "A technician checking fabric at a cutting table" },
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
 * narrowed panels drop their labels. Below lg the panels stack, overlays open.
 */
export function Gallery() {
  const [active, setActive] = useState<Key | null>(null);
  const grow = (keys: Key[]): CSSProperties => ({ flexGrow: active ? (keys.includes(active) ? 10 : 1) : 1 });

  return (
    <section id="gallery" data-nav-theme="light" className="scroll-mt-24 bg-canvas pb-24 pt-28 sm:pt-32">
      <Frame wide>
        <div className="mx-auto flex max-w-[64rem] flex-col items-center text-center">
          <Display className="text-[clamp(2rem,1.2rem+2.4vw,3.2rem)] leading-[1.1] text-ink-2">{GALLERY.title}</Display>
          <p className="mt-5 max-w-[48rem] text-[clamp(1rem,0.9rem+0.4vw,1.35rem)] leading-relaxed text-ink-2/80">{GALLERY.sub}</p>
        </div>

        <div
          className="mt-14 flex flex-col gap-4 lg:h-[600px] lg:flex-row lg:gap-6"
          onPointerLeave={() => setActive(null)}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setActive(null);
          }}
        >
          {COLUMNS.map((col) =>
            Array.isArray(col) ? (
              <div key={col.join("-")} className={`flex min-w-0 flex-col gap-4 transition-[flex-grow] lg:basis-0 lg:gap-6 ${EASE}`} style={grow(col)}>
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
      className={`relative isolate block min-h-[22rem] min-w-0 overflow-hidden rounded-[2.5rem] bg-tile transition-[flex-grow,transform] lg:min-h-0 lg:basis-0 ${EASE} ${
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
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-black/70 via-black/15 to-black/5" />

      {/* Resting label: visible until any panel opens. */}
      <p
        aria-hidden="true"
        className={`absolute bottom-7 left-7 whitespace-nowrap text-[2rem] font-light leading-none tracking-[-0.03em] text-white transition-opacity duration-300 max-lg:hidden ${
          state === "rest" ? "opacity-100" : "opacity-0"
        }`}
      >
        {panel.title}
      </p>

      {/* Full overlay: title, points and arrow. Always shown when stacked. */}
      <div
        className={`absolute inset-x-0 bottom-0 p-7 text-white transition-[opacity,transform] sm:p-8 ${EASE} ${
          open ? "lg:translate-y-0 lg:opacity-100" : "lg:pointer-events-none lg:translate-y-5 lg:opacity-0"
        }`}
      >
        <div className="flex items-end justify-between gap-6">
          <div className="min-w-0">
            <h3 className="text-[2rem] font-light leading-none tracking-[-0.03em]">{panel.title}</h3>
            <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5 text-[0.98rem] text-white/85">
              {panel.points.map((p) => (
                <li key={p} className="whitespace-nowrap">
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <span className="grid size-12 shrink-0 place-items-center rounded-full bg-white text-ink">
            <ArrowUpRight className="size-5" />
          </span>
        </div>
      </div>
    </a>
  );
}
