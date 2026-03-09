import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export const FuelLiquidAnimation = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const liquidHeight = useTransform(scrollYProgress, [0, 0.5, 1], ["0%", "100%", "100%"]);
  const liquidOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const bubbleY1 = useTransform(scrollYProgress, [0.1, 0.5], [100, -20]);
  const bubbleY2 = useTransform(scrollYProgress, [0.15, 0.55], [120, -30]);
  const bubbleY3 = useTransform(scrollYProgress, [0.2, 0.6], [80, -40]);
  const bubbleOpacity = useTransform(scrollYProgress, [0.1, 0.25, 0.5, 0.6], [0, 1, 1, 0]);
  const dropY1 = useTransform(scrollYProgress, [0, 0.3], [-20, 200]);
  const dropY2 = useTransform(scrollYProgress, [0.05, 0.35], [-30, 220]);
  const dropY3 = useTransform(scrollYProgress, [0.1, 0.4], [-10, 180]);
  const splashScale = useTransform(scrollYProgress, [0.4, 0.55], [0, 1]);
  const splashOpacity = useTransform(scrollYProgress, [0.4, 0.5, 0.65], [0, 0.8, 0]);

  return (
    <div ref={containerRef} className="relative h-[400px] w-full overflow-hidden">
      {/* Background subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />

      {/* Central pipe / tube */}
      <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[3px] bg-border/50 rounded-full" />

      {/* Liquid filling the pipe */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 top-0 w-[3px] rounded-full origin-top"
        style={{
          height: liquidHeight,
          opacity: liquidOpacity,
          background: "linear-gradient(180deg, hsl(82 70% 45% / 0.9), hsl(82 65% 40% / 0.7), hsl(45 80% 50% / 0.8))",
          boxShadow: "0 0 12px hsl(82 70% 45% / 0.5), 0 0 30px hsl(82 70% 45% / 0.2)",
        }}
      />

      {/* Fuel drops falling */}
      {[
        { x: "calc(50% - 15px)", y: dropY1, size: 8, delay: 0 },
        { x: "calc(50% + 12px)", y: dropY2, size: 6, delay: 0.1 },
        { x: "calc(50% - 5px)", y: dropY3, size: 10, delay: 0.15 },
      ].map((drop, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: drop.x,
            y: drop.y,
            width: drop.size,
            height: drop.size * 1.4,
            opacity: liquidOpacity,
            background: "radial-gradient(ellipse, hsl(82 70% 50% / 0.9), hsl(45 80% 45% / 0.7))",
            boxShadow: "0 0 8px hsl(82 70% 45% / 0.4)",
            borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
          }}
        />
      ))}

      {/* Bubbles rising */}
      {[
        { x: "calc(50% - 20px)", y: bubbleY1, size: 6 },
        { x: "calc(50% + 18px)", y: bubbleY2, size: 4 },
        { x: "calc(50% - 8px)", y: bubbleY3, size: 5 },
      ].map((bubble, i) => (
        <motion.div
          key={`bubble-${i}`}
          className="absolute rounded-full"
          style={{
            left: bubble.x,
            y: bubble.y,
            width: bubble.size,
            height: bubble.size,
            opacity: bubbleOpacity,
            background: "hsl(82 70% 60% / 0.3)",
            border: "1px solid hsl(82 70% 55% / 0.5)",
            boxShadow: "inset 0 -2px 4px hsl(82 70% 40% / 0.2)",
          }}
        />
      ))}

      {/* Splash effect at bottom */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 bottom-[30%] w-24 h-6"
        style={{ scale: splashScale, opacity: splashOpacity }}
      >
        <div
          className="w-full h-full rounded-[50%]"
          style={{
            background: "radial-gradient(ellipse, hsl(82 70% 50% / 0.4), transparent 70%)",
            boxShadow: "0 0 20px hsl(82 70% 45% / 0.3)",
          }}
        />
      </motion.div>

      {/* "Flex Fuel" label */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"
        style={{ opacity: liquidOpacity }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs font-bold tracking-[0.3em] uppercase" style={{ color: "hsl(82 70% 40%)" }}>
            Flex Fuel
          </span>
          <span className="text-[10px] tracking-wider uppercase text-muted-foreground">
            Tecnología limpia
          </span>
        </div>
      </motion.div>

      {/* Side decorative drips */}
      {[
        { side: "left", offset: "30%", height: "40%" },
        { side: "right", offset: "25%", height: "35%" },
        { side: "left", offset: "60%", height: "25%" },
        { side: "right", offset: "55%", height: "30%" },
      ].map((drip, i) => (
        <motion.div
          key={`drip-${i}`}
          className="absolute w-[2px] rounded-full origin-top"
          style={{
            [drip.side]: `calc(50% ${drip.side === "left" ? "-" : "+"} 40px)`,
            top: drip.offset,
            height: liquidHeight,
            maxHeight: drip.height,
            opacity: useTransform(scrollYProgress, [0.2 + i * 0.05, 0.35 + i * 0.05], [0, 0.5]),
            background: `linear-gradient(180deg, hsl(82 70% 50% / 0.6), hsl(45 75% 50% / 0.3), transparent)`,
          }}
        />
      ))}
    </div>
  );
};
