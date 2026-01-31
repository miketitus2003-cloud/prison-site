// components/SlideGallery.tsx
"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Surface, H2, P } from "@/components/ui";

type Slide = { src: string; caption: string };

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

export default function SlideGallery({
  slides,
  title = "Slide walkthrough",
  subtitle = "Scroll through the story — each panel is a full widescreen slide.",
}: {
  slides: Slide[];
  title?: string;
  subtitle?: string;
}) {
  const ids = useMemo(
    () => slides.map((_, i) => `slide-${String(i + 1).padStart(2, "0")}`),
    [slides]
  );

  const sectionRefs = useRef<Array<HTMLElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const nodes = sectionRefs.current.filter(Boolean) as HTMLElement[];
    if (!nodes.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        // pick the most visible intersecting entry
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];

        if (!visible) return;

        const idx = nodes.findIndex((n) => n === visible.target);
        if (idx >= 0) setActiveIndex(idx);
      },
      {
        root: null,
        threshold: [0.35, 0.5, 0.65],
        rootMargin: "-10% 0px -55% 0px",
      }
    );

    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, [slides]);

  function scrollTo(i: number) {
    const idx = clamp(i, 0, slides.length - 1);
    const el = sectionRefs.current[idx];
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="mt-10">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <H2>{title}</H2>
          <P className="mt-2 max-w-2xl">{subtitle}</P>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs text-black/60">
          <span className="rounded-full border border-black/10 bg-white px-3 py-1">
            {activeIndex + 1} / {slides.length}
          </span>
        </div>
      </div>

      {/* Layout */}
      <div className="mt-6 grid lg:grid-cols-12 gap-6">
        {/* Sticky rail */}
        <div className="hidden lg:block lg:col-span-3">
          <div className="sticky top-24">
            <Surface className="p-5">
              <div className="text-xs font-medium tracking-wide text-black/60">
                Slides
              </div>

              <div className="mt-4 space-y-2">
                {slides.map((s, i) => {
                  const active = i === activeIndex;
                  return (
                    <button
                      key={ids[i]}
                      onClick={() => scrollTo(i)}
                      className={[
                        "w-full text-left rounded-2xl px-3 py-3 transition",
                        "border border-black/10",
                        active
                          ? "bg-black text-white"
                          : "bg-white hover:bg-black/5 text-black",
                      ].join(" ")}
                      aria-label={`Jump to slide ${i + 1}`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="text-sm font-semibold">
                          {String(i + 1).padStart(2, "0")}
                        </div>
                        <div className="text-xs opacity-70 truncate">
                          {s.caption}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-5 flex gap-2">
                <button
                  onClick={() => scrollTo(activeIndex - 1)}
                  className="flex-1 rounded-2xl border border-black/10 bg-white px-3 py-2 text-sm font-semibold hover:bg-black/5 transition"
                >
                  Back
                </button>
                <button
                  onClick={() => scrollTo(activeIndex + 1)}
                  className="flex-1 rounded-2xl bg-black px-3 py-2 text-sm font-semibold text-white hover:opacity-90 transition"
                >
                  Next
                </button>
              </div>
            </Surface>
          </div>
        </div>

        {/* Slide stack */}
        <div className="lg:col-span-9">
          <div
            className={[
              "space-y-6",
              // scroll snap makes it feel “one-by-one”
              "scroll-smooth",
            ].join(" ")}
          >
            {slides.map((s, i) => (
              <section
                key={ids[i]}
                id={ids[i]}
                ref={(el) => {
                  sectionRefs.current[i] = el;
                }}
                className={[
                  "scroll-mt-28",
                  "snap-start",
                ].join(" ")}
              >
                <Surface className="p-0 overflow-hidden">
                  {/* Widescreen frame */}
                  <div className="relative">
                    <div className="aspect-[16/9] bg-black/5">
                      <img
                        src={s.src}
                        alt={s.caption}
                        className="h-full w-full object-contain"
                        loading="lazy"
                      />
                    </div>

                    {/* subtle top gradient for polish */}
                    <div className="pointer-events-none absolute inset-0">
                      <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/10 to-transparent" />
                      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/10 to-transparent" />
                    </div>

                    {/* slide number chip */}
                    <div className="absolute left-4 top-4 rounded-full border border-black/10 bg-white/90 px-3 py-1 text-xs font-semibold text-black backdrop-blur">
                      Slide {String(i + 1).padStart(2, "0")}
                    </div>
                  </div>

                  {/* caption */}
                  <div className="px-6 py-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <div className="text-sm font-semibold text-black">
                          {s.caption}
                        </div>
                        <div className="mt-1 text-xs text-black/60">
                          Scroll to continue the narrative.
                        </div>
                      </div>

                      {/* small nav for mobile */}
                      <div className="flex lg:hidden items-center gap-2">
                        <button
                          onClick={() => scrollTo(i - 1)}
                          className="rounded-xl border border-black/10 bg-white px-3 py-2 text-xs font-semibold hover:bg-black/5 transition"
                        >
                          Back
                        </button>
                        <button
                          onClick={() => scrollTo(i + 1)}
                          className="rounded-xl bg-black px-3 py-2 text-xs font-semibold text-white hover:opacity-90 transition"
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  </div>
                </Surface>
              </section>
            ))}
          </div>
        </div>
      </div>

      {/* enable snapping only where it feels good */}
      <style jsx>{`
        @media (min-width: 768px) {
          .snap-start {
            scroll-snap-align: start;
          }
          .space-y-6 {
            scroll-snap-type: y mandatory;
          }
        }
      `}</style>
    </div>
  );
}
