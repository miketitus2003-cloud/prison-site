"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container, cx } from "@/components/ui";
import { SITE } from "@/components/siteData";
import { Menu, X } from "lucide-react";

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
    <div className="min-h-screen bg-neutral-950 text-white">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:72px_72px]" />
        <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-white/5 blur-3xl" />
        <div className="absolute top-1/2 -right-56 h-[620px] w-[620px] rounded-full bg-white/4 blur-3xl" />
      </div>

      <header className="sticky top-0 z-50 border-b border-white/10 bg-neutral-950/70 backdrop-blur">
        <Container>
          <div className="py-4 flex items-center justify-between gap-4">
            <Link href="/" className="flex items-center gap-3 min-w-0">
              <div className="h-9 w-9 rounded-2xl bg-white/10 ring-1 ring-white/10" />
              <div className="min-w-0">
                <div className="text-sm font-semibold leading-none truncate">{SITE.title}</div>
                <div className="text-xs text-white/60 truncate">{SITE.subtitle}</div>
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
        </Container>
      </header>

      {open ? (
        <div className="fixed inset-0 z-50 bg-neutral-950/85 backdrop-blur">
          <Container>
            <div className="py-4">
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
                        active ? "text-white" : "text-white/70 hover:text-white" )}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          </Container>
        </div>
      ) : null}

      <main className="relative">{children}</main>

      <footer className="relative border-t border-white/10">
        <Container>
          <div className="py-10 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
            <div className="text-sm text-white/60">
              © {new Date().getFullYear()} {SITE.author}
            </div>
            <div className="text-xs text-white/50">
              Built as a research brief and policy notes. Designed for clarity.
            </div>
          </div>
        </Container>
      </footer>
    </div>
  );
}
