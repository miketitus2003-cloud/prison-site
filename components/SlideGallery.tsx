// components/SlideGallery.tsx
import Image from "next/image";
import React from "react";

type Slide = { src: string; caption: string };

export default function SlideGallery({
  slides,
  title,
  subtitle,
}: {
  slides: Slide[];
  title?: string;
  subtitle?: string;
}) {
  return (
    <section className="w-full">
      {(title || subtitle) && (
        <div className="mb-5">
          {title ? (
            <h2 className="text-xl md:text-2xl font-semibold text-black">
              {title}
            </h2>
          ) : null}
          {subtitle ? (
            <p className="mt-2 text-black/70 leading-relaxed max-w-3xl">
              {subtitle}
            </p>
          ) : null}
        </div>
      )}

      {/* Story scroller */}
      <div
        className="
          rounded-3xl border border-black/10 bg-white shadow-sm
          overflow-hidden
        "
      >
        <div
          className="
            max-h-[78vh] overflow-y-auto
            scroll-smooth
            [scrollbar-gutter:stable]
            snap-y snap-mandatory
          "
        >
          {slides.map((s) => (
            <div
              key={s.src}
              className="
                snap-start
                px-4 sm:px-6 md:px-8
                py-8 md:py-10
                border-b border-black/10
                bg-white
              "
            >
              {/* 16:9 panel */}
              <div className="relative w-full aspect-[16/9] overflow-hidden rounded-2xl border border-black/10 bg-black/[0.02]">
                <Image
                  src={s.src}
                  alt={s.caption}
                  fill
                  className="object-contain"
                  sizes="(min-width: 1024px) 900px, 100vw"
                  priority={false}
                />
              </div>

              {/* Caption */}
              <div className="mt-4 flex items-center justify-between gap-4">
                <div className="text-sm text-black/80">{s.caption}</div>
                <div className="text-xs text-black/40">
                  {slides.indexOf(s) + 1} / {slides.length}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3 text-xs text-black/40">
        Tip: scroll inside the panel, it snaps one slide at a time.
      </div>
    </section>
  );
}
