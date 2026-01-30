// components/SiteShell.tsx
"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const CONTENT = {
  siteTitle: "Prison Education and Recidivism",
  subTitle: "Research brief and policy notes",
  author: "Michael Parham",
  contactEmail: "michaelparham2003@gmail.com",
};

function cx(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const nav = useMemo(
    () => [
      { href: "/", label: "Overview" },
      { href: "/research", label: "Research" },
      { href: "/policy", label: "Policy" },
      { href: "/sources", label: "Sources" },
      { href: "/about", label: "About" },
    ],
    []
  );

  return (
    <div className="min-h-screen text-white">
      {/* background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_20%_10%,rgba(255,255,255,0.08),transparent_55%),radial-gradient(900px_500px_at_85%_30%,rgba(255,255,255,0.06),transparent_55%),radial-gradient(1000px_700px_at_50%_110%,rgba(255,255,255,0.05),transparent_60%)]" />
        <div className="absolute inset-0 bg-neutral-950" />
        <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:72px_72px]" />
        <div className="absolute inset-0 opacity-[0.07] [background-image:url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22300%22 height=%22300%22%3E%3Cfilter id=%22n%22 x=%220%22 y=%220%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22300%22 height=%22300%22 filter=%22url(%23n)%22 opacity=%220.30%22/%3E%3C/svg%3E')]" />
      </div>

      {/* header */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-neutral-950/70 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3 min-w-0">
            <div className="h-9 w-9 rounded-2xl bg-white/10 ring-1 ring-white/10" />
            <div className="min-w-0">
              <div className="text-sm font-semibold leading-none truncate">
                {CONTENT.siteTitle}
              </div>
              <div className="text-xs text-white/60 truncate">{CONTENT.subTitle}</div>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {nav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cx(
                    "px-3 py-2 rounded-xl text-sm transition",
                    active
                      ? "bg-white/10 ring-1 ring-white/10"
                      : "text-white/70 hover:text-white hover:bg-white/5"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <button
            className="md:hidden inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/15 ring-1 ring-white/10 text-sm"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-4 w-4" />
          </button>
        </div>
      </header>

      {/* mobile menu */}
      {open ? (
        <div className="fixed inset-0 z-50 bg-neutral-950/85 backdrop-blur">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold">Menu</div>
              <button
                className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/15 ring-1 ring-white/10 text-sm"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-4 grid gap-2">
              {nav.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cx(
                      "px-4 py-3 rounded-2xl ring-1 ring-white/10",
                      active ? "bg-white/10" : "bg-white/5 hover:bg-white/10"
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      ) : null}

      <main className="relative">{children}</main>

      {/* footer (no template line, no GitHub buttons) */}
      <footer className="relative border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-10 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          <div className="text-sm text-white/60">
            © {new Date().getFullYear()} {CONTENT.author}
          </div>

          <a
            href={`mailto:${CONTENT.contactEmail}`}
            className="text-sm text-white/70 hover:text-white underline underline-offset-4 decoration-white/20"
          >
            Contact: {CONTENT.contactEmail}
          </a>
        </div>
      </footer>
    </div>
  );
}
