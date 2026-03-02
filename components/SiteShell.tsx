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
  { href: "/about", label: "About" },
];

const FOOTER_LINKS = [
  { href: "/", label: "Overview" },
  { href: "/stats", label: "Dashboard" },
  { href: "/research", label: "Insights" },
  { href: "/policy", label: "Policy briefs" },
  { href: "/sources", label: "Sources" },
  { href: "/about", label: "About" },
  { href: "/injustice", label: "Context" },
  { href: "/stack", label: "Stack" },
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

      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#06080f]/80 backdrop-blur-xl">
        <div className="relative z-10 max-w-6xl mx-auto px-4 py-3 flex items-center gap-4">
          <Link href="/" className="flex items-center gap-3 min-w-0" onClick={() => setMenuOpen(false)}>
            {/* Logo mark */}
            <span className="h-9 w-9 rounded-full bg-gradient-to-br from-indigo-500/80 to-sky-500/80 ring-1 ring-white/20 shadow-sm flex-shrink-0" />
            <span className="leading-tight min-w-0">
              <span className="block text-sm font-semibold text-white/90 truncate">
                Prison Policy Data Platform
              </span>
              <span className="block text-xs text-white/50 truncate">
                Michael Parham · Evidence-based research
              </span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="ml-auto hidden lg:flex items-center gap-1" aria-label="Main navigation">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className={cx(
                  "px-3 py-2 rounded-full text-sm font-semibold transition",
                  isActive(n.href)
                    ? "bg-white/14 text-white ring-1 ring-white/20"
                    : "text-white/65 hover:text-white hover:bg-white/10 ring-1 ring-transparent hover:ring-white/12"
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
            aria-expanded={menuOpen}
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
          <div className="lg:hidden border-t border-white/10 bg-[#06080f]/98 backdrop-blur-xl px-4 py-3 space-y-1">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setMenuOpen(false)}
                className={cx(
                  "block px-4 py-3 rounded-2xl text-sm font-semibold transition",
                  isActive(n.href)
                    ? "bg-white/14 text-white"
                    : "text-white/65 hover:text-white hover:bg-white/10"
                )}
              >
                {n.label}
              </Link>
            ))}
            <div className="pt-2 pb-1 px-4">
              <a
                href={SITE.links.analysisRepo}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-white/45 hover:text-white/70 transition"
              >
                GitHub repo ↗
              </a>
            </div>
          </div>
        ) : null}
      </header>

      <main className="relative z-10">{children}</main>

      <footer className="relative z-10 border-t border-white/10 mt-16 bg-[#06080f]">
        <div className="max-w-6xl mx-auto px-4 pt-10 pb-8">
          {/* Top footer row */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="h-7 w-7 rounded-full bg-gradient-to-br from-indigo-500/80 to-sky-500/80 ring-1 ring-white/20 flex-shrink-0" />
                <div className="text-sm font-semibold text-white/80">Prison Policy Data Platform</div>
              </div>
              <div className="text-xs text-white/45 leading-relaxed">
                Evidence-based research on recidivism, education, and criminal justice policy.
                Built by {SITE.author}.
              </div>
              <div className="mt-4">
                <a
                  href={SITE.links.analysisRepo}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-white/50 hover:text-white/80 transition underline underline-offset-4"
                >
                  GitHub: Analysis repo ↗
                </a>
              </div>
            </div>

            {/* Navigation */}
            <div>
              <div className="text-xs uppercase tracking-widest text-white/40 mb-3">Pages</div>
              <nav className="grid grid-cols-2 gap-x-4 gap-y-2" aria-label="Footer navigation">
                {FOOTER_LINKS.map((n) => (
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

            {/* Data / methodology */}
            <div>
              <div className="text-xs uppercase tracking-widest text-white/40 mb-3">Data & methodology</div>
              <div className="space-y-2 text-xs text-white/45 leading-relaxed">
                <div>Primary sources: BJS, USSC government statistics</div>
                <div>All charts are descriptive summaries — no causal claims</div>
                <div>Claim → source mapping on the Sources page</div>
                <div>Association language enforced throughout</div>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-8 pt-6 border-t border-white/8 flex flex-wrap items-center justify-between gap-3">
            <div className="text-xs text-white/35">© 2026 {SITE.author} · All rights reserved</div>
            <div className="text-xs text-white/30">
              Descriptive statistics only · No causal claims · Sources linked throughout
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
