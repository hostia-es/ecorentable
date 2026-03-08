import { useEffect, useState } from "react";
import { useMotionValue, useTransform, useSpring, MotionValue } from "framer-motion";

/**
 * Returns a smoothed scroll progress (0–1) over the full page.
 */
export function useScrollProgress(): MotionValue<number> {
  const scrollY = useMotionValue(0);

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      scrollY.set(max > 0 ? window.scrollY / max : 0);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [scrollY]);

  return useSpring(scrollY, { stiffness: 100, damping: 30, mass: 0.5 });
}

/**
 * Returns a smoothed pixel scrollY value.
 */
export function useParallaxScroll() {
  const scrollY = useMotionValue(0);

  useEffect(() => {
    const update = () => scrollY.set(window.scrollY);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [scrollY]);

  return useSpring(scrollY, { stiffness: 120, damping: 30, mass: 0.3 });
}

/**
 * Creates a parallax transform: maps scroll range to output range.
 */
export function useParallax(scrollY: MotionValue<number>, inputRange: number[], outputRange: number[]) {
  return useTransform(scrollY, inputRange, outputRange);
}

/**
 * Mouse-tracking parallax for elements.
 */
export function useMouseParallax(factor = 0.02) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 20 });
  const springY = useSpring(y, { stiffness: 150, damping: 20 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      x.set((e.clientX - cx) * factor);
      y.set((e.clientY - cy) * factor);
    };
    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, [x, y, factor]);

  return { x: springX, y: springY };
}
