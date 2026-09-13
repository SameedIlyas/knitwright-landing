"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";
import flats from "@/lib/data/flats.json";

export type FlatStyle = "crew" | "raglan" | "polo";

interface Callout {
  marker: string;
  label: string;
  rule: string;
  ticks: string[];
  leader: string;
  dot: { x: number; y: number };
  chip: { x: number; y: number; w: number; h: number };
}

interface FlatData {
  viewBox: { minX: number; minY: number; w: number; h: number };
  silhouette: string;
  collar: string;
  placket: string | null;
  seams: string[];
  construction: string[];
  callouts: Callout[];
}

const DATA = flats as unknown as Record<FlatStyle, FlatData>;
const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Annotated technical flat. Geometry is exported from the Knitwright app's own
 * garment IR (lib/garment) — the same drawing the product renders, not a stand-in.
 * Lines draw themselves in; callouts follow once the silhouette is complete.
 */
export function Flat({
  style = "crew",
  highlight = null,
  tint,
  animate = true,
  className = "",
  strokeClass = "stroke-ink",
}: {
  style?: FlatStyle;
  highlight?: string | null;
  tint?: string;
  animate?: boolean;
  className?: string;
  strokeClass?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const d = DATA[style];
  const { minX, minY, w, h } = d.viewBox;
  const draw = animate && !reduce;
  const shown = !draw || inView;
  const line = (delay: number, duration = 1.4) =>
    draw
      ? {
          initial: { pathLength: 0, opacity: 0 },
          animate: shown ? { pathLength: 1, opacity: 1 } : undefined,
          transition: { pathLength: { duration, delay, ease: EASE }, opacity: { duration: 0.2, delay } },
        }
      : {};

  return (
    <svg
      ref={ref}
      viewBox={`${minX} ${minY} ${w} ${h}`}
      fill="none"
      role="img"
      aria-label={`Annotated technical flat, ${style}, front view`}
      className={className}
    >
      {tint ? (
        <motion.path
          key={`tint-${style}-${tint}`}
          d={d.silhouette}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.14 }}
          transition={{ duration: 0.6 }}
          style={{ fill: tint }}
        />
      ) : null}
      <g className={strokeClass} strokeLinejoin="round" strokeLinecap="round">
        <motion.path key={`sil-${style}`} d={d.silhouette} strokeWidth={2.2} {...line(0, 1.8)} />
        <motion.path key={`col-${style}`} d={d.collar} strokeWidth={1.2} opacity={0.5} {...line(0.9, 0.8)} />
        {d.placket ? <motion.path key={`plk-${style}`} d={d.placket} strokeWidth={1.6} {...line(1, 0.8)} /> : null}
        {d.seams.map((s, i) => (
          <motion.path key={`seam-${style}-${i}`} d={s} strokeWidth={1.4} {...line(1 + i * 0.1, 0.8)} />
        ))}
      </g>
      <g className={strokeClass} strokeWidth={1} strokeDasharray="3 4" opacity={0.35}>
        {d.construction.map((c, i) => (
          <path key={`con-${style}-${i}`} d={c} />
        ))}
      </g>
      {d.callouts.map((c, i) => {
        const linked = highlight === c.marker;
        return (
          <motion.g
            key={`${style}-${c.marker}`}
            initial={draw ? { opacity: 0 } : false}
            animate={shown ? { opacity: 1 } : undefined}
            transition={{ duration: 0.5, delay: draw ? 1.4 + i * 0.15 : 0 }}
          >
            <g className="stroke-cobalt" strokeLinecap="round">
              <path d={c.rule} strokeWidth={linked ? 2.6 : 1.2} />
              {c.ticks.map((t, j) => (
                <path key={j} d={t} strokeWidth={linked ? 2.6 : 1.2} />
              ))}
              <path d={c.leader} strokeWidth={linked ? 1.6 : 1} opacity={0.9} />
            </g>
            <circle cx={c.dot.x} cy={c.dot.y} r={linked ? 3.8 : 2.6} className="fill-cobalt" />
            <rect
              x={c.chip.x}
              y={c.chip.y}
              width={c.chip.w}
              height={c.chip.h}
              rx={4}
              className={linked ? "fill-cobalt" : "fill-cobalt-wash"}
              style={{ transition: "fill 200ms ease-out" }}
            />
            <text
              x={c.chip.x + c.chip.w / 2}
              y={c.chip.y + c.chip.h / 2 + 4}
              textAnchor="middle"
              fontSize="12"
              fontWeight="500"
              className={`font-mono ${linked ? "fill-white" : "fill-cobalt"}`}
              style={{ transition: "fill 200ms ease-out" }}
            >
              {c.label}
            </text>
          </motion.g>
        );
      })}
    </svg>
  );
}

export function flatMeasures(style: FlatStyle) {
  return (flats as unknown as Record<FlatStyle, { measures: Measure[] }>)[style].measures;
}

export interface Measure {
  id: string;
  marker: string;
  point: string;
  sizes: { s: number; m: number; l: number };
  tol: { plus: number; minus: number };
  unit: "cm";
}
