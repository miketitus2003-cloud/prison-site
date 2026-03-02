"use client";

// components/SiteShell.tsx
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useState } from "react";
import { SITE } from "@/components/siteData";

const NAV = [
  { href: "/", label: "Overview" },
  { href: "/stats", label: "Dashboard" },
  { href: "/research", label: "Insights" },
  { href: "/policy", label: "Policy briefs" },
  { href: "/sources", label: "Sources" },
];

function cx(...c: Array<string | false | undefined>) {
  return c.filter(Boolean).join(" ");
}

export default function SiteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }

  return (
    <div className="min-h-screen bg-[#06080f] text-white">
      {/* Top glow (subtle) */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(900px 420px at 20% 0%, rgba(99,102,241,0.20), transparent 60%), radial-gradient(850px 360px at 85% 0%, rgba(56,189,248,0.18), transparent 60%)",
        }}
      />

      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#06080f]/75 backdrop-blur">
        <div className="relative z-10 max-w-6xl mx-auto px-4 py-3 flex items-center gap-4">
          <Link href="/" className="flex items-center gap-3 min-w-0" onClick={() => setMenuOpen(false)}>
            <span className="h-10 w-10 rounded-full bg-white/10 ring-1 ring-white/12 shadow-sm flex-shrink-0" />
            <span className="leading-tight min-w-0">
              <span className="block text-sm font-semibold text-white/90 truncate">
                Prison Policy Data Platform
              </span>
              <span className="block text-xs text-white/55 truncate">
                Dashboards • Policy briefs • Source-verified insights
              </span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="ml-auto hidden lg:flex items-center gap-1">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className={cx(
                  "px-3 py-2 rounded-full text-sm font-semibold transition",
                  isActive(n.href)
                    ? "bg-white/14 text-white ring-1 ring-white/20"
                    : "text-white/70 hover:text-white hover:bg-white/10 ring-1 ring-transparent hover:ring-white/12"
                )}
              >
                {n.label}
              </Link>
            ))}
          </nav>

          {/* Mobile: hamburger */}
          <button
            className="ml-auto lg:hidden flex flex-col gap-[5px] p-2 rounded-xl hover:bg-white/10 transition"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <span
              className={cx(
                "block h-0.5 w-5 bg-white/80 rounded-full transition-all duration-200",
                menuOpen && "translate-y-[7px] rotate-45"
              )}
            />
            <span
              className={cx(
                "block h-0.5 w-5 bg-white/80 rounded-full transition-all duration-200",
                menuOpen && "opacity-0"
              )}
            />
            <span
              className={cx(
                "block h-0.5 w-5 bg-white/80 rounded-full transition-all duration-200",
                menuOpen && "-translate-y-[7px] -rotate-45"
              )}
            />
          </button>
        </div>

        {/* Mobile nav dropdown */}
        {menuOpen ? (
          <div className="lg:hidden border-t border-white/10 bg-[#06080f]/95 backdrop-blur px-4 py-3 space-y-1">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setMenuOpen(false)}
                className={cx(
                  "block px-4 py-3 rounded-2xl text-sm font-semibold transition",
                  isActive(n.href)
                    ? "bg-white/14 text-white"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                )}
              >
                {n.label}
              </Link>
            ))}
          </div>
        ) : null}
      </header>

      <main className="relative z-10">{children}</main>

      <footer className="relative z-10 border-t border-white/10 mt-16">
        <div className="max-w-6xl mx-auto px-4 py-10">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div>
              <div className="text-sm font-semibold text-white/80">Prison Policy Data Platform</div>
              <div className="mt-1 text-xs text-white/45">© 2026 {SITE.author}</div>
            </div>

            <nav className="flex flex-wrap gap-x-5 gap-y-2">
              {NAV.map((n) => (
                <Link
                  key={n.href}
                  href={n.href}
                  className="text-sm text-white/50 hover:text-white/80 transition"
                >
                  {n.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="mt-6 pt-6 border-t border-white/8 text-xs text-white/35">
            Evidence and citations are centralized on Sources and Dashboard. Descriptive statistics only — no causal claims.
          </div>
        </div>
      </footer>
    </div>
  );
}
