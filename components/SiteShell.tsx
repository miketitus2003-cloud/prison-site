// components/SiteShell.tsx
"use client";

import Link from "next/link";
import { ReactNode, useEffect, useMemo, useState } from "react";
import { SITE } from "@/components/siteData";

const NAV = [
  { href: "/", label: "Overview" },
  { href: "/research", label: "Research" },
  { href: "/policy", label: "Policy" },
  { href: "/stats", label: "Stats Lab" },
  { href: "/injustice", label: "Topics" },
  { href: "/sources", label: "Sources" },
  { href: "/about", label: "About" },
  { href: "/stack", label: "Build" },
];

function cx(...c: Array<string | false | undefined>) {
  return c.filter(Boolean).join(" ");
}

export default function SiteShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  const nav = useMemo(() => NAV, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="min-h-screen bg-[#f7f8fb] text-black">
      <header className="sticky top-0 z-50 border-b border-black/10 bg-white/80 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4">
          <Link href="/" className="flex items-center gap-3">
            <span className="h-10 w-10 rounded-full border border-black/10 bg-white shadow-soft grid place-items-center">
              <span className="h-5 w-5 rounded-full bg-gradient-to-br from-indigo-600 via-sky-500 to-emerald-500" />
            </span>
            <span className="leading-tight">
              <span className="block text-sm font-semibold text-black/85">
                {SITE.overview.title}
              </span>
              <span className="block text-xs text-black/55">
                {SITE.overview.subtitle}
              </span>
            </span>
          </Link>

          <nav className="ml-auto hidden lg:flex items-center gap-2">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="px-3 py-2 rounded-full text-sm font-semibold text-black/70 hover:bg-black/5 border border-transparent hover:border-black/10 transition"
              >
                {n.label}
              </Link>
            ))}
          </nav>

          {/* Mobile */}
          <div className="ml-auto lg:hidden flex items-center gap-2">
            <Link
              href="/stats"
              className="px-3 py-2 rounded-full text-sm font-semibold bg-black text-white hover:opacity-90 transition"
            >
              Stats
            </Link>
            <button
              onClick={() => setOpen(true)}
              className="px-3 py-2 rounded-full text-sm font-semibold bg-white ring-1 ring-black/10 hover:bg-neutral-50 transition"
              aria-label="Open menu"
            >
              Menu
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      {open ? (
        <div className="fixed inset-0 z-[9999] lg:hidden">
          <div
            className="absolute inset-0 bg-black/35"
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-[86vw] max-w-[360px] bg-white shadow-soft ring-1 ring-black/10">
            <div className="p-4 border-b border-black/10 flex items-center justify-between">
              <div className="text-sm font-semibold text-black">Navigation</div>
              <button
                onClick={() => setOpen(false)}
                className="px-3 py-2 rounded-full text-sm font-semibold bg-white ring-1 ring-black/10 hover:bg-neutral-50 transition"
              >
                Close
              </button>
            </div>
            <div className="p-3">
              {nav.map((n) => (
                <Link
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className="block px-4 py-3 rounded-2xl text-sm font-semibold text-black/80 hover:bg-black/5 transition"
                >
                  {n.label}
                </Link>
              ))}
              <div className="mt-3 px-4 py-3 rounded-2xl bg-neutral-50 ring-1 ring-black/10 text-sm text-black/70">
                This site is evidence focused and sources are centralized in Sources and Stats Lab.
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <main className="relative">{children}</main>

      <footer className="border-t border-black/10 mt-16">
        <div className="max-w-6xl mx-auto px-4 py-10 text-sm text-black/55 flex flex-wrap items-center justify-between gap-3">
          <div>© 2026 {SITE.author}</div>
          <div className="text-black/45">
            Evidence and citations are centralized on Sources and Stats Lab.
          </div>
        </div>
      </footer>
    </div>
  );
}
