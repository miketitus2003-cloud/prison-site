// components/SlideGallery.tsx
"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

export type Slide = { src: string; caption: string };

function cx(...c: Array<string | false | undefined>) {
  return c.filter(Boolean).join(" ");
}

export default function SlideGallery({
  slides,
  title,
  subtitle,
}: {
  slides: Slide[];
  title?: string;
  subtitle?: string;
}) {
  const ids = useMemo(() => slides.map((_, i) => `slide-${i}`), [slides]);
  const [active, setActive] = useState(0);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = wrapRef.current;
    if (!root) return;

    const els = ids
      .map((id) => root.querySelector<HTMLDivElement>(`#${id}`))
      .filter(Boolean) as HTMLDivElement[];

    const obs = new IntersectionObserver(
      (entries) => {
        // pick the most visible entry
        const vis = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];
        if (!vis) return;
        const idx = els.indexOf(vis.target as HTMLDivElement);
        if (idx >= 0) setActive(idx);
      },
      { root: null, threshold: [0.25, 0.4, 0.55, 0.7] }
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [ids]);

  return (
    <div ref={wrapRef} className="relative">
      {/* Header */}
      {title || subtitle ? (
        <div className="mb-4">
          {title ? (
            <div className="text-lg md:text-xl font-semibold text-black">{title}</div>
          ) : null}
          {subtitle ? (
            <div className="mt-1 text-sm text-black/65 max-w-3xl">{subtitle}</div>
          ) : null}
        </div>
      ) : null}

      {/* Progress / mini nav */}
      <div className="sticky top-[72px] z-20 mb-4">
        <div className="rounded-2xl bg-white/85 backdrop-blur ring-1 ring-black/10 shadow-[0_16px_60px_rgba(0,0,0,0.06)] px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="text-xs uppercase tracking-widest text-black/45">
              Slide {active + 1} of {slides.length}
            </div>

            <div className="ml-auto flex items-center gap-1">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    document.getElementById(`slide-${i}`)?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }}
                  aria-label={`Go to slide ${i + 1}`}
                  className={cx(
                    "h-2.5 w-2.5 rounded-full transition",
                    i === active ? "bg-neutral-900" : "bg-black/15 hover:bg-black/25"
                  )}
                />
              ))}
            </div>
          </div>

          {/* Thin progress bar */}
          <div className="mt-2 h-1.5 rounded-full bg-black/10 overflow-hidden">
            <div
              className="h-full rounded-full bg-neutral-900 transition-all"
              style={{ width: `${((active + 1) / slides.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Slides: full widescreen panels */}
      <div className="space-y-6">
        {slides.map((s, i) => (
          <div
            key={s.src + i}
            id={`slide-${i}`}
            className="scroll-mt-[120px]"
          >
            <div className="rounded-[28px] overflow-hidden ring-1 ring-black/10 bg-white shadow-[0_18px_70px_rgba(0,0,0,0.08)]">
              {/* Widescreen image area */}
              <div className="relative bg-neutral-900">
                <img
                  src={s.src}
                  alt={s.caption}
                  className="w-full aspect-video object-contain bg-neutral-900"
                  loading="lazy"
                />

                {/* Caption overlay */}
                <div className="absolute left-0 right-0 bottom-0 p-4">
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/90 backdrop-blur px-3 py-1.5 ring-1 ring-black/10">
                    <span className="text-xs font-semibold text-neutral-900">
                      {s.caption}
                    </span>
                    <span className="text-[11px] text-black/45">
                      {i + 1}/{slides.length}
                    </span>
                  </div>
                </div>
              </div>

              {/* Under-card info */}
              <div className="p-4 md:p-5">
                <div className="text-sm text-black/70 leading-relaxed">
                  {s.caption}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Ending CTA */}
      <div className="mt-6 rounded-3xl bg-gradient-to-br from-indigo-50 via-white to-sky-50 ring-1 ring-black/10 p-6">
        <div className="text-sm font-semibold text-black">Tip</div>
        <div className="mt-1 text-sm text-black/70">
          Use the dots to jump between slides. The panels are sized as widescreen so the full slide stays readable.
        </div>
      </div>
    </div>
  );
}
