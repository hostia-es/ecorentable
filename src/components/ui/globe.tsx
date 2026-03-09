"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import createGlobe, { COBEOptions } from "cobe";
import { cn } from "@/lib/utils";

const GLOBE_CONFIG: COBEOptions = {
  width: 800,
  height: 800,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 1,
  diffuse: 0.4,
  mapSamples: 16000,
  mapBrightness: 1.2,
  baseColor: [0.15, 0.4, 0.2],
  markerColor: [34 / 255, 197 / 255, 94 / 255],
  glowColor: [0.1, 0.3, 0.15],
  markers: [
    // Spain
    { location: [40.4168, -3.7038], size: 0.1 },   // Madrid
    { location: [41.3874, 2.1686], size: 0.08 },    // Barcelona
    { location: [37.3891, -5.9845], size: 0.06 },   // Sevilla
    { location: [39.4699, -0.3763], size: 0.06 },   // Valencia
    { location: [43.2627, -2.9253], size: 0.05 },   // Bilbao
    { location: [36.7213, -4.4214], size: 0.05 },   // Málaga
    // Europe
    { location: [48.8566, 2.3522], size: 0.07 },    // Paris
    { location: [51.5074, -0.1278], size: 0.06 },   // London
    { location: [52.52, 13.405], size: 0.05 },       // Berlin
    { location: [41.9028, 12.4964], size: 0.05 },   // Roma
    { location: [38.7223, -9.1393], size: 0.06 },   // Lisboa
    // Americas
    { location: [-23.5505, -46.6333], size: 0.08 },  // São Paulo
    { location: [19.4326, -99.1332], size: 0.06 },   // México
    { location: [40.7128, -74.006], size: 0.05 },    // New York
    // Africa & Middle East
    { location: [33.5731, -7.5898], size: 0.05 },   // Casablanca
    { location: [30.0444, 31.2357], size: 0.04 },   // Cairo
  ],
};

export function Globe({
  className,
  config = GLOBE_CONFIG,
}: {
  className?: string;
  config?: COBEOptions;
}) {
  let phi = 0;
  let width = 0;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  const [r, setR] = useState(0);

  const updatePointerInteraction = (value: number | null) => {
    pointerInteracting.current = value;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value ? "grabbing" : "grab";
    }
  };

  const updateMovement = (clientX: number) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current;
      pointerInteractionMovement.current = delta;
      setR(delta / 200);
    }
  };

  const onRender = useCallback(
    (state: Record<string, any>) => {
      if (!pointerInteracting.current) phi += 0.005;
      state.phi = phi + r;
      state.width = width * 2;
      state.height = width * 2;
    },
    [r],
  );

  const onResize = () => {
    if (canvasRef.current) {
      width = canvasRef.current.offsetWidth;
    }
  };

  useEffect(() => {
    window.addEventListener("resize", onResize);
    onResize();

    const globe = createGlobe(canvasRef.current!, {
      ...config,
      width: width * 2,
      height: width * 2,
      onRender,
    });

    setTimeout(() => {
      if (canvasRef.current) canvasRef.current.style.opacity = "1";
    });
    return () => {
      globe.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div className={cn("absolute inset-0 mx-auto aspect-[1/1] w-full max-w-[600px]", className)}>
      <canvas
        className="size-full opacity-0 transition-opacity duration-500 [contain:layout_paint_size]"
        ref={canvasRef}
        onPointerDown={(e) =>
          updatePointerInteraction(e.clientX - pointerInteractionMovement.current)
        }
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(e) => updateMovement(e.clientX)}
        onTouchMove={(e) =>
          e.touches[0] && updateMovement(e.touches[0].clientX)
        }
      />
    </div>
  );
}

export { GLOBE_CONFIG };
