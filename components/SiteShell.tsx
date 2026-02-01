// components/SiteShell.tsx
import Link from "next/link";
import { ReactNode } from "react";
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
  return (
    <div className="min-h-screen bg-[rgb(var(--bg))] text-[rgba(var(--fg),0.92)]">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/35 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4">
          <Link href="/" className="flex items-center gap-3 group">
            <span className="h-10 w-10 rounded-full bg-white/5 ring-1 ring-white/12 shadow-soft grid place-items-center overflow-hidden">
              <span className="h-6 w-6 rounded-full bg-gradient-to-br from-cyan-300/90 via-purple-400/80 to-emerald-300/80" />
            </span>

            <span className="leading-tight">
              <span className="block text-sm font-semibold text-white/90 group-hover:text-white transition">
                Prison Policy Data Platform
              </span>
              <span className="block text-xs text-white/60">
                Dashboards • Policy briefs • Source-verified insights
              </span>
            </span>
          </Link>

          <nav className="ml-auto hidden lg:flex items-center gap-2">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className={cx(
                  "px-3 py-2 rounded-full text-sm font-semibold transition",
                  "text-white/70 hover:text-white hover:bg-white/7",
                  "ring-1 ring-transparent hover:ring-white/10"
                )}
              >
                {n.label}
              </Link>
            ))}
          </nav>

          {/* Mobile: one strong CTA */}
          <div className="ml-auto lg:hidden">
            <Link
              href="/stats"
              className="px-3 py-2 rounded-full text-sm font-semibold text-black bg-white hover:opacity-90 transition"
            >
              Dashboard
            </Link>
          </div>
        </div>
      </header>

      <main className="relative">{children}</main>

      <footer className="border-t border-white/10 mt-16">
        <div className="max-w-6xl mx-auto px-4 py-10 text-sm text-white/55 flex flex-wrap items-center justify-between gap-3">
          <div>© 2026 {SITE.author}</div>
          <div className="text-white/45">
            Verification: Dashboard + Sources. Association, not causation.
          </div>
        </div>
      </footer>
    </div>
  );
}
