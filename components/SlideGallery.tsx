// components/SlideGallery.tsx
"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

type Slide = { src: string; caption: string };

function cx(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function SlideGallery({
  slides,
  title = "Visual walkthrough",
  subtitle = "A scroll-first view of the deck highlights (widescreen, one-by-one).",
}: {
  slides: Slide[];
  title?: string;
  subtitle?: string;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Array<HTMLElement | null>>([]);
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);

  const safeSlides = useMemo(() => slides.filter(Boolean), [slides]);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    const els = itemRefs.current.filter(Boolean) as HTMLElement[];
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        // choose the most visible slide
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];

        if (!visible) return;

        const idx = els.findIndex((el) => el === visible.target);
        if (idx >= 0) setActive(idx);
      },
      {
        root: null,
        threshold: [0.25, 0.4, 0.55, 0.7],
        rootMargin: "-15% 0px -55% 0px",
      }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [safeSlides.length]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (!open) return;
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        setActive((a) => Math.min(a + 1, safeSlides.length - 1));
      }
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        setActive((a) => Math.max(a - 1, 0));
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, safeSlides.length]);

  useEffect(() => {
    if (!open) return;
    // keep the selected slide centered in fullscreen
    const el = itemRefs.current[active];
    el?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [active, open]);

  function scrollTo(i: number) {
    const el = itemRefs.current[i];
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <section className="relative">
      {/* header row */}
      <div className="flex items-start justify-between gap-6">
        <div className="max-w-3xl">
          <div className="text-sm font-semibold text-black/90">{title}</div>
          <div className="mt-1 text-sm text-black/60">{subtitle}</div>
        </div>

        <div className="hidden md:flex items-center gap-2">
          <div className="text-xs text-black/50">
            {active + 1} / {safeSlides.length}
          </div>
          <div className="h-1.5 w-24 rounded-full bg-black/10 overflow-hidden">
            <div
              className="h-full bg-black/60 rounded-full transition-[width] duration-300"
              style={{ width: `${((active + 1) / Math.max(safeSlides.length, 1)) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <div className="mt-6 grid lg:grid-cols-12 gap-6 items-start">
        {/* left: sticky mini-nav */}
        <aside className="hidden lg:block lg:col-span-4 sticky top-24">
          <div className="rounded-3xl bg-white/80 ring-1 ring-black/10 p-4">
            <div className="text-xs uppercase tracking-widest text-black/45">Sections</div>

            <div className="mt-3 grid gap-1.5">
              {safeSlides.map((s, i) => {
                const isActive = i === active;
                return (
                  <button
                    key={s.src}
                    onClick={() => scrollTo(i)}
                    className={cx(
                      "text-left rounded-2xl px-3 py-2 transition ring-1",
                      isActive
                        ? "bg-black/[0.05] ring-black/15"
                        : "bg-white ring-black/10 hover:bg-black/[0.03]"
                    )}
                    aria-current={isActive ? "true" : "false"}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <div className={cx("text-sm font-semibold truncate", isActive ? "text-black" : "text-black/85")}>
                          {s.caption}
                        </div>
                        <div className="text-xs text-black/50 mt-0.5">Slide {String(i + 1).padStart(2, "0")}</div>
                      </div>

                      <div className={cx("h-2 w-2 rounded-full", isActive ? "bg-black/70" : "bg-black/20")} />
                    </div>
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setOpen(true)}
              className="mt-4 w-full rounded-2xl bg-black text-white py-2.5 text-sm font-semibold hover:opacity-95 transition"
            >
              Open fullscreen
            </button>
          </div>
        </aside>

        {/* right: scroll panels */}
        <div className="lg:col-span-8">
          <div
            ref={containerRef}
            className="rounded-3xl bg-white/70 ring-1 ring-black/10 overflow-hidden"
          >
            {/* subtle top bar */}
            <div className="px-4 py-3 border-b border-black/10 flex items-center justify-between gap-4">
              <div className="text-xs text-black/55">
                Scroll • Snap • Click any slide to fullscreen
              </div>

              <button
                onClick={() => setOpen(true)}
                className="md:hidden rounded-xl px-3 py-2 text-xs font-semibold bg-black text-white"
              >
                Fullscreen
              </button>
            </div>

            {/* panels */}
            <div
              className={cx(
                "max-h-[72vh] overflow-y-auto",
                "scroll-smooth",
                "[scrollbar-width:thin] [scrollbar-color:rgba(0,0,0,0.25)_transparent]",
                "snap-y snap-mandatory"
              )}
            >
              {safeSlides.map((s, i) => (
                <article
                  key={s.src}
                  ref={(el) => {
                    itemRefs.current[i] = el;
                  }}
                  className="snap-start"
                >
                  <div className="p-4 md:p-6">
                    <div
                      className={cx(
                        "relative rounded-3xl overflow-hidden ring-1 ring-black/10 bg-black",
                        "shadow-[0_30px_80px_rgba(0,0,0,0.12)]"
                      )}
                    >
                      {/* 16:9 widescreen */}
                      <div className="aspect-video">
                        <img
                          src={s.src}
                          alt={s.caption}
                          className="h-full w-full object-contain bg-black"
                          loading="lazy"
                          onClick={() => setOpen(true)}
                          style={{ cursor: "zoom-in" }}
                        />
                      </div>

                      {/* caption strip */}
                      <div className="absolute left-4 right-4 bottom-4">
                        <div className="rounded-2xl bg-white/90 ring-1 ring-black/10 px-4 py-3 backdrop-blur">
                          <div className="flex items-center justify-between gap-3">
                            <div className="min-w-0">
                              <div className="text-xs uppercase tracking-widest text-black/50">
                                Slide {String(i + 1).padStart(2, "0")}
                              </div>
                              <div className="text-sm font-semibold text-black truncate">
                                {s.caption}
                              </div>
                            </div>

                            <button
                              onClick={() => setOpen(true)}
                              className="shrink-0 rounded-xl px-3 py-2 text-xs font-semibold bg-black text-white hover:opacity-95 transition"
                            >
                              Zoom
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* spacing between panels */}
                    <div className="h-8" />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen overlay */}
      {open ? (
        <div className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm">
          <div className="absolute inset-0" onClick={() => setOpen(false)} />

          <div className="relative h-full w-full p-4 md:p-8">
            <div className="mx-auto max-w-6xl h-full flex flex-col">
              <div className="flex items-center justify-between gap-4 text-white">
                <div className="min-w-0">
                  <div className="text-xs uppercase tracking-widest text-white/60">
                    Slide {String(active + 1).padStart(2, "0")} / {String(safeSlides.length).padStart(2, "0")}
                  </div>
                  <div className="text-sm font-semibold truncate">{safeSlides[active]?.caption}</div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActive((a) => Math.max(a - 1, 0))}
                    className="rounded-xl px-3 py-2 text-xs font-semibold bg-white/10 ring-1 ring-white/15 hover:bg-white/15"
                  >
                    Prev
                  </button>
                  <button
                    onClick={() => setActive((a) => Math.min(a + 1, safeSlides.length - 1))}
                    className="rounded-xl px-3 py-2 text-xs font-semibold bg-white/10 ring-1 ring-white/15 hover:bg-white/15"
                  >
                    Next
                  </button>
                  <button
                    onClick={() => setOpen(false)}
                    className="rounded-xl px-3 py-2 text-xs font-semibold bg-white text-black hover:opacity-95"
                  >
                    Close
                  </button>
                </div>
              </div>

              <div className="mt-4 flex-1 rounded-3xl overflow-hidden bg-black ring-1 ring-white/15">
                <div className="h-full w-full flex items-center justify-center">
                  <img
                    src={safeSlides[active]?.src}
                    alt={safeSlides[active]?.caption}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              </div>

              <div className="mt-4 grid grid-cols-5 sm:grid-cols-7 md:grid-cols-9 gap-2">
                {safeSlides.map((s, i) => (
                  <button
                    key={s.src}
                    onClick={() => setActive(i)}
                    className={cx(
                      "rounded-xl overflow-hidden ring-1 transition",
                      i === active ? "ring-white/70" : "ring-white/15 hover:ring-white/35"
                    )}
                    aria-label={`Go to slide ${i + 1}`}
                  >
                    <div className="aspect-video bg-black">
                      <img src={s.src} alt={s.caption} className="h-full w-full object-cover opacity-90" />
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-3 text-xs text-white/55">
                Tip: use arrow keys in fullscreen • Esc to close
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
