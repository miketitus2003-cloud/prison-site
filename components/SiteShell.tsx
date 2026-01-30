"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/ui";

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
    <div className="min-h-screen bg-white">
      {/* subtle top gradient wash */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute -top-40 left-1/2 h-[520px] w-[920px] -translate-x-1/2 rounded-full blur-3xl opacity-30"
          style={{
            background:
              "radial-gradient(closest-side, rgba(37,99,235,0.14), transparent 70%)",
          }}
        />
        <div className="absolute top-24 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full blur-3xl opacity-25"
          style={{
            background:
              "radial-gradient(closest-side, rgba(99,102,241,0.12), transparent 70%)",
          }}
        />
      </div>

      <header className="sticky top-0 z-50 border-b border-[rgb(var(--line))] bg-white/85 backdrop-blur">
        <Container>
          <div className="flex items-center justify-between py-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-2xl border border-[rgb(var(--line))] bg-white shadow-sm" />
              <div className="leading-tight">
                <div className="text-sm font-semibold text-[rgb(var(--fg))]">
                  Prison Education & Recidivism
                </div>
                <div className="text-xs text-[rgb(var(--muted))]">
                  Research brief + policy briefs
                </div>
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
                        ? "bg-neutral-100 text-[rgb(var(--fg))]"
                        : "text-[rgb(var(--muted))] hover:text-[rgb(var(--fg))] hover:bg-neutral-50"
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <button
              className="md:hidden px-3 py-2 rounded-xl border border-[rgb(var(--line))] text-sm text-[rgb(var(--fg))] hover:bg-neutral-50"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
            >
              Menu
            </button>
          </div>
        </Container>
      </header>

      {/* mobile menu */}
      {open ? (
        <div className="fixed inset-0 z-50 bg-white">
          <Container>
            <div className="flex items-center justify-between py-4 border-b border-[rgb(var(--line))]">
              <div className="text-sm font-semibold text-[rgb(var(--fg))]">Menu</div>
              <button
                className="px-3 py-2 rounded-xl border border-[rgb(var(--line))] text-sm hover:bg-neutral-50"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
              >
                Close
              </button>
            </div>

            <div className="py-6 grid gap-2">
              {nav.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cx(
                      "px-4 py-3 rounded-2xl border border-[rgb(var(--line))] text-[rgb(var(--fg))]",
                      active ? "bg-neutral-100" : "bg-white hover:bg-neutral-50"
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </Container>
        </div>
      ) : null}

      <main className="relative">{children}</main>

      <footer className="relative mt-16 border-t border-[rgb(var(--line))]">
        <Container>
          <div className="py-10 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
            <div className="text-sm text-[rgb(var(--muted))]">
              © {new Date().getFullYear()} Michael Parham
            </div>
            <div className="text-sm text-[rgb(var(--muted))]">
              Sources and citations are centralized on the Sources page.
            </div>
          </div>
        </Container>
      </footer>
    </div>
  );
}
