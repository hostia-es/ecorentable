"use client";

import React, { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type FeatureTimelineEntry = {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle: string;
  description: string;
  items?: string[];
  image?: string;
  button?: {
    url: string;
    text: string;
  };
};

export interface FeatureTimelineProps {
  title?: string;
  description?: string;
  entries: FeatureTimelineEntry[];
  className?: string;
}

export default function FeatureTimeline({
  title,
  description,
  entries,
  className,
}: FeatureTimelineProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const sentinelRefs = useRef<(HTMLDivElement | null)[]>([]);

  const setSentinelRef = (el: HTMLDivElement | null, i: number) => {
    sentinelRefs.current[i] = el;
  };

  useEffect(() => {
    let frame = 0;
    const updateActiveByProximity = () => {
      frame = requestAnimationFrame(updateActiveByProximity);
      const centerY = window.innerHeight / 3;
      let bestIndex = 0;
      let bestDist = Infinity;
      sentinelRefs.current.forEach((node, i) => {
        if (!node) return;
        const rect = node.getBoundingClientRect();
        const mid = rect.top + rect.height / 2;
        const dist = Math.abs(mid - centerY);
        if (dist < bestDist) {
          bestDist = dist;
          bestIndex = i;
        }
      });
      if (bestIndex !== activeIndex) setActiveIndex(bestIndex);
    };

    frame = requestAnimationFrame(updateActiveByProximity);
    return () => cancelAnimationFrame(frame);
  }, [activeIndex]);

  useEffect(() => {
    setActiveIndex(0);
  }, []);

  return (
    <div className={cn("w-full", className)}>
      {(title || description) && (
        <div className="mb-12 max-w-2xl">
          {title && (
            <h2 className="text-3xl md:text-4xl font-bold leading-tight text-foreground mb-4">
              {title}
            </h2>
          )}
          {description && (
            <p className="text-sm leading-relaxed text-muted-foreground">
              {description}
            </p>
          )}
        </div>
      )}

      <div className="relative">
        {entries.map((entry, index) => {
          const isActive = index === activeIndex;
          const Icon = entry.icon;

          return (
            <div
              key={index}
              className="relative grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 mb-12 last:mb-0"
              aria-current={isActive ? "true" : "false"}
            >
              {/* Sticky meta column */}
              <div className="lg:col-span-3 lg:sticky lg:top-32 lg:self-start">
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 shrink-0",
                      isActive
                        ? "bg-primary text-primary-foreground shadow-md"
                        : "bg-primary/10 text-primary"
                    )}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <p
                      className={cn(
                        "text-sm font-bold truncate transition-colors duration-300",
                        isActive ? "text-foreground" : "text-muted-foreground"
                      )}
                    >
                      {entry.title}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {entry.subtitle}
                    </p>
                  </div>
                </div>
              </div>

              {/* Invisible sentinel */}
              <div
                ref={(el) => setSentinelRef(el, index)}
                aria-hidden
                className="absolute -top-24 left-0 h-12 w-12 opacity-0"
              />

              {/* Content column */}
              <div className="lg:col-span-9">
                {entry.image && (
                  <img
                    src={entry.image}
                    alt={entry.title}
                    className={cn(
                      "w-full rounded-2xl object-cover mb-5 transition-all duration-500 border",
                      isActive
                        ? "h-48 md:h-64 opacity-100 border-primary/20 shadow-xl"
                        : "h-32 md:h-40 opacity-60 border-border shadow-md"
                    )}
                    loading="lazy"
                  />
                )}
                <div
                  className={cn(
                    "rounded-2xl border p-6 transition-all duration-500",
                    isActive
                      ? "bg-card border-primary/20 shadow-xl"
                      : "bg-card/50 border-border shadow-sm"
                  )}
                >
                  <h3
                    className={cn(
                      "font-bold text-base mb-1 transition-colors duration-300 lg:hidden",
                      isActive ? "text-foreground" : "text-muted-foreground"
                    )}
                  >
                    {entry.title}
                  </h3>
                  <hr
                    className={cn(
                      "mb-3 transition-colors duration-300 lg:hidden",
                      isActive ? "border-primary/20" : "border-border"
                    )}
                  />
                  <p
                    className={cn(
                      "text-sm leading-relaxed transition-colors duration-300",
                      isActive ? "text-muted-foreground" : "text-muted-foreground/60"
                    )}
                  >
                    {entry.description}
                  </p>

                  {/* Expandable content */}
                  <div
                    className={cn(
                      "overflow-hidden transition-all duration-500",
                      isActive ? "max-h-[600px] opacity-100 mt-4" : "max-h-0 opacity-0 mt-0"
                    )}
                  >
                    {entry.items && entry.items.length > 0 && (
                      <ul className="space-y-2">
                        {entry.items.map((item, itemIndex) => (
                          <li
                            key={itemIndex}
                            className="flex items-start gap-2 text-sm text-muted-foreground"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}

                    {entry.button && (
                      <div className="mt-5">
                        <Button asChild size="sm" variant="default">
                          <a href={entry.button.url}>
                            {entry.button.text}
                            <ArrowUpRight className="ml-1 w-3.5 h-3.5" />
                          </a>
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
