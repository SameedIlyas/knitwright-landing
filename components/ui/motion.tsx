"use client";

import { motion, useInView, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { Fragment, useRef, type ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Fade + rise + de-blur once, when the element enters the viewport. */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "li" | "section" | "p" | "span";
}) {
  const reduce = useReducedMotion();
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : y, filter: reduce ? "none" : "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      {children}
    </Comp>
  );
}

/** Heading that reveals word by word, each word rising out of a blur. */
export function WordsIn({
  text,
  className,
  delay = 0,
  stagger = 0.06,
  as = "h2",
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  as?: "h1" | "h2" | "h3" | "p";
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();
  const Tag = as;
  const words = text.split(" ");
  return (
    <Tag ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((w, i) => (
          <Fragment key={`${w}-${i}`}>
            <motion.span
              className="inline-block"
              initial={{ opacity: 0, y: reduce ? 0 : "0.35em", filter: reduce ? "none" : "blur(10px)" }}
              animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined}
              transition={{ duration: 0.9, delay: delay + i * stagger, ease: EASE }}
            >
              {w}
            </motion.span>
            {i < words.length - 1 ? " " : null}
          </Fragment>
        ))}
      </span>
    </Tag>
  );
}

/** Paragraph whose words darken from faint to ink as it scrolls through the viewport. */
export function ScrollWords({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = text.split(" ");
  return (
    <p ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((w, i) => (
          <Fragment key={`${w}-${i}`}>
            <ScrollWord progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
              {w}
            </ScrollWord>
            {i < words.length - 1 ? " " : null}
          </Fragment>
        ))}
      </span>
    </p>
  );
}

function ScrollWord({
  children,
  progress,
  range,
}: {
  children: ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  return (
    <motion.span style={{ opacity }}>
      {children}
    </motion.span>
  );
}

export { motion, EASE };
