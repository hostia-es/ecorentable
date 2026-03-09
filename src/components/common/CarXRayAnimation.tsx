import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import carXray from "@/assets/car-xray-flexfuel.png";

export function CarXRayAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // 3D rotation on scroll
  const rotateY = useTransform(scrollYProgress, [0, 0.5, 1], [-25, 0, 25]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [8, 0, -8]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1, 0.85]);

  return (
    <div ref={containerRef} className="w-full relative" style={{ perspective: "1200px" }}>
      <motion.div
        className="relative mx-auto max-w-4xl"
        style={{
          rotateY,
          rotateX,
          scale,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Car image */}
        <img
          src={carXray}
          alt="Visualización del proceso de descarbonización Flex Fuel"
          className="w-full h-auto relative z-10 drop-shadow-2xl"
        />

        {/* Animated flow particles overlay */}
        <div className="absolute inset-0 z-20 overflow-hidden pointer-events-none">
          {/* Flow line 1 — engine area */}
          <motion.div
            className="absolute top-[42%] left-[8%] h-[3px] rounded-full"
            style={{
              background: "linear-gradient(90deg, transparent, hsl(148 70% 55% / 0.9), hsl(148 70% 60% / 0.6), transparent)",
              boxShadow: "0 0 12px hsl(148 70% 50% / 0.6), 0 0 24px hsl(148 70% 50% / 0.3)",
            }}
            animate={{
              width: ["0%", "35%", "0%"],
              left: ["8%", "15%", "50%"],
              opacity: [0, 1, 0],
            }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Flow line 2 — exhaust path */}
          <motion.div
            className="absolute top-[55%] h-[3px] rounded-full"
            style={{
              background: "linear-gradient(90deg, transparent, hsl(148 70% 55% / 0.8), hsl(148 70% 60% / 0.5), transparent)",
              boxShadow: "0 0 10px hsl(148 70% 50% / 0.5), 0 0 20px hsl(148 70% 50% / 0.25)",
            }}
            animate={{
              width: ["0%", "45%", "0%"],
              left: ["25%", "35%", "80%"],
              opacity: [0, 1, 0],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
          />

          {/* Glow particles */}
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: 4 + Math.random() * 6,
                height: 4 + Math.random() * 6,
                top: `${35 + Math.random() * 30}%`,
                background: `radial-gradient(circle, hsl(148 70% 60% / 0.9), hsl(148 70% 50% / 0.3))`,
                boxShadow: `0 0 8px hsl(148 70% 55% / 0.7)`,
              }}
              animate={{
                left: [`${5 + Math.random() * 15}%`, `${60 + Math.random() * 30}%`],
                opacity: [0, 1, 1, 0],
                scale: [0.5, 1.2, 1, 0.3],
              }}
              transition={{
                duration: 2.5 + Math.random() * 2,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeInOut",
              }}
            />
          ))}

          {/* Scanning ring glow */}
          <motion.div
            className="absolute top-[20%] bottom-[20%] w-[2px] z-30"
            style={{
              background: "linear-gradient(180deg, transparent, hsl(148 70% 55% / 0.8), transparent)",
              boxShadow: "0 0 20px 4px hsl(148 70% 50% / 0.4)",
            }}
            animate={{
              left: ["5%", "90%", "5%"],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        {/* Subtle glow underneath */}
        <div
          className="absolute -bottom-8 left-[10%] right-[10%] h-16 blur-2xl rounded-full z-0"
          style={{ background: "hsl(148 70% 40% / 0.2)" }}
        />
      </motion.div>
    </div>
  );
}
