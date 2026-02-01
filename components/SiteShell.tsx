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

export default function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#06080f] text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/35 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4">
          <Link href="/" className="flex items-center gap-3">
            <span className="h-10 w-10 rounded-full ring-1 ring-white/10 bg-white/5 shadow-sm" />
            <span className="leading-tight">
              <span className="block text-sm font-semibold text-white/90">
                Prison Policy Data Platform
              </span>
              <span className="block text-xs text-white/55">
                Dashboards · Policy briefs · Source-verified insights
              </span>
            </span>
          </Link>

          <nav className="ml-auto hidden lg:flex items-center gap-1">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="px-3 py-2 rounded-full text-sm font-semibold text-white/75 hover:text-white hover:bg-white/8 ring-1 ring-transparent hover:ring-white/10 transition"
              >
                {n.label}
              </Link>
            ))}
          </nav>

          {/* Mobile: obvious dashboard button */}
          <div className="ml-auto lg:hidden">
            <Link
              href="/stats"
              className="px-3 py-2 rounded-full text-sm font-semibold bg-white text-black hover:opacity-90 transition"
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
            Charts and claims link to Sources. Descriptive reporting, not causal.
          </div>
        </div>
      </footer>
    </div>
  );
}
