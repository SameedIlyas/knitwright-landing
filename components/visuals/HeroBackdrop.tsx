"use client";

import dynamic from "next/dynamic";
import { useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

const KnotScene = dynamic(() => import("./KnotScene"), { ssr: false });

function hasWebGL(): boolean {
  try {
    const c = document.createElement("canvas");
    return Boolean(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

/**
 * Grey studio backdrop with the 3D knot. Falls back to a static shaded disc when
 * WebGL is unavailable; the knot stops turning under prefers-reduced-motion.
 */
export function HeroBackdrop() {
  const reduce = useReducedMotion();
  const [gl, setGl] = useState<boolean | null>(null);

  useEffect(() => {
    // One-time capability probe after mount; the canvas can't exist during SSR.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setGl(hasWebGL());
  }, []);

  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_45%,#c7c7ca_0%,#a4a5a9_45%,#8a8b90_100%)]" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="aspect-square h-[min(118vh,1100px)] max-w-none">
          {gl ? (
            <KnotScene still={Boolean(reduce)} />
          ) : (
            <div className="size-full rounded-full bg-[radial-gradient(circle_at_45%_35%,#3a3b40_0%,#141518_60%,transparent_72%)] opacity-80" />
          )}
        </div>
      </div>
      {/* Soft vignette so white type reads over the object. */}
      <div className="absolute inset-0 bg-[radial-gradient(60%_45%_at_50%_52%,rgba(15,16,18,0.28),transparent_70%)]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-white" />
    </div>
  );
}
