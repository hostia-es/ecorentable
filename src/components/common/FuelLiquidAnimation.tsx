import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";

/**
 * Minimal vertical "flow" animation.
 * A single thin line draws itself as the user scrolls,
 * with subtle particles and a refined wordmark in the center.
 * Designed to feel calm, premium and editorial.
 */
export const FuelLiquidAnimation = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Line drawing — slow, deliberate
  const lineScale = useTransform(scrollYProgress, [0.05, 0.6], [0, 1]);
  const lineOpacity = useTransform(scrollYProgress, [0, 0.1, 0.85, 1], [0, 1, 1, 0]);

  // Wordmark fade — appears once the line has drawn most of itself
  const wordmarkOpacity = useTransform(scrollYProgress, [0.25, 0.45, 0.85, 1], [0, 1, 1, 0]);
  const wordmarkY = useTransform(scrollYProgress, [0.25, 0.45], [12, 0]);

  // Horizontal accent line under the wordmark
  const accentScale = useTransform(scrollYProgress, [0.4, 0.6], [0, 1]);

  // Subtle particles drifting upward
  const particleOpacity = useTransform(scrollYProgress, [0.2, 0.4, 0.75, 0.9], [0, 1, 1, 0]);

  return (
    <div
      ref={containerRef}
      className="relative h-[420px] w-full overflow-hidden"
      aria-hidden="true"
    >
      {/* Soft radial glow behind the composition */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 60% at 50% 50%, hsl(148 60% 55% / 0.06), transparent 70%)",
        }}
      />

      {/* Track (faint guide) */}
      <div
        className="absolute left-1/2 top-[12%] bottom-[12%] w-px -translate-x-1/2"
        style={{ background: "hsl(var(--border) / 0.5)" }}
      />

      {/* Animated drawing line */}
      <motion.div
        className="absolute left-1/2 top-[12%] bottom-[12%] w-px -translate-x-1/2 origin-top"
        style={{
          scaleY: reduceMotion ? 1 : lineScale,
          opacity: reduceMotion ? 1 : lineOpacity,
          background:
            "linear-gradient(180deg, transparent 0%, hsl(148 55% 50% / 0.9) 20%, hsl(148 55% 45% / 0.9) 80%, transparent 100%)",
          boxShadow: "0 0 8px hsl(148 60% 50% / 0.35)",
        }}
      />

      {/* Leading dot at the bottom of the drawing line */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 h-1.5 w-1.5 rounded-full"
        style={{
          top: useTransform(scrollYProgress, [0.05, 0.6], ["12%", "88%"]),
          opacity: lineOpacity,
          background: "hsl(148 60% 50%)",
          boxShadow: "0 0 14px hsl(148 60% 50% / 0.6), 0 0 28px hsl(148 60% 50% / 0.25)",
        }}
      />

      {/* Floating particles */}
      {[
        { x: -60, delay: 0, size: 3 },
        { x: 70, delay: 0.4, size: 2 },
        { x: -90, delay: 0.8, size: 2 },
        { x: 95, delay: 1.2, size: 3 },
        { x: -40, delay: 1.6, size: 2 },
        { x: 50, delay: 2.0, size: 2 },
      ].map((p, i) => (
        <motion.div
          key={i}
          className="absolute left-1/2 top-1/2 rounded-full"
          style={{
            width: p.size,
            height: p.size,
            background: "hsl(148 60% 55% / 0.6)",
            opacity: particleOpacity,
          }}
          animate={
            reduceMotion
              ? undefined
              : {
                  x: [p.x, p.x + (p.x > 0 ? 8 : -8), p.x],
                  y: [40, -40, 40],
                }
          }
          transition={{
            duration: 6 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay,
          }}
        />
      ))}

      {/* Centered wordmark */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
        style={{
          opacity: reduceMotion ? 1 : wordmarkOpacity,
          y: reduceMotion ? 0 : wordmarkY,
        }}
      >
        <div className="flex items-center gap-3 mb-3">
          <motion.div
            className="h-px w-8"
            style={{
              background: "hsl(148 55% 50% / 0.5)",
              scaleX: reduceMotion ? 1 : accentScale,
              transformOrigin: "right",
            }}
          />
          <span
            className="text-[10px] font-medium tracking-[0.4em] uppercase"
            style={{ color: "hsl(148 55% 40%)" }}
          >
            Ecología Rentable
          </span>
          <motion.div
            className="h-px w-8"
            style={{
              background: "hsl(148 55% 50% / 0.5)",
              scaleX: reduceMotion ? 1 : accentScale,
              transformOrigin: "left",
            }}
          />
        </div>
        <span className="text-[11px] tracking-[0.25em] uppercase text-muted-foreground/80">
          Tecnología limpia
        </span>
      </motion.div>
    </div>
  );
};
