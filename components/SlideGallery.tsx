"use client";

import React from "react";
import { Card, H2, P, Badge } from "@/components/ui";
import type { Slide } from "@/components/siteData";

export default function SlideGallery({ slides }: { slides: Slide[] }) {
  return (
    <Card className="p-6 sm:p-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <H2>Slide highlights</H2>
          <P className="mt-2">
            Selected figures from the project deck (served from <span className="font-medium">public/assets</span>).
          </P>
        </div>
        <Badge>{slides.length} slides</Badge>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {slides.map((s) => (
          <figure
            key={s.src}
            className="overflow-hidden rounded-2xl border border-[rgb(var(--line))] bg-white"
          >
            <div className="aspect-[16/10] bg-neutral-50">
              <img
                src={s.src}
                alt={s.caption}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            <figcaption className="p-3 text-xs text-[rgb(var(--muted))] leading-relaxed">
              {s.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </Card>
  );
}
