"use client";

import React from "react";
import { Surface, H2, P } from "@/components/ui";
import type { Slide } from "@/components/siteData";

export default function SlideGallery({ slides }: { slides: Slide[] }) {
  return (
    <Surface>
      <div className="flex items-start justify-between gap-3">
        <div>
          <H2>Figures and slide highlights</H2>
          <P>
            These load from public/assets. If an image is missing, it will not display.
          </P>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {slides.map((s) => (
          <div
            key={s.src}
            className="rounded-2xl bg-white/5 ring-1 ring-white/10 overflow-hidden"
          >
            <div className="aspect-[16/9] bg-white/5">
              <img
                src={s.src}
                alt={s.caption}
                className="h-full w-full object-cover"
                loading="lazy"
                onError={(e) => {
                  const wrap = e.currentTarget.closest("div.rounded-2xl") as HTMLElement | null;
                  if (wrap) wrap.style.display = "none";
                }}
              />
            </div>
            <div className="p-3 text-xs text-white/70 leading-relaxed">{s.caption}</div>
          </div>
        ))}
      </div>
    </Surface>
  );
}
