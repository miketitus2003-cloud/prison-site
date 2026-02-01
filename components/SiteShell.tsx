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
    <div className="min-h-screen bg-[#06080f] text-white">
      {/* Top glow (subtle, no grid) */}
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
          <Link href="/" className="flex items-center gap-3 min-w-0">
            <span className="h-10 w-10 rounded-full bg-white/10 ring-1 ring-white/12 shadow-sm" />
            <span className="leading-tight min-w-0">
              <span className="block text-sm font-semibold text-white/90 truncate">
                {"Prison Policy Data Platform"}
              </span>
              <span className="block text-xs text-white/55 truncate">
                {"Dashboards • Policy briefs • Source-verified insights"}
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
                  "text-white/70 hover:text-white",
                  "hover:bg-white/10 ring-1 ring-transparent hover:ring-white/12"
                )}
              >
                {n.label}
              </Link>
            ))}
          </nav>

          {/* Mobile CTA */}
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

      <main className="relative z-10">{children}</main>

      <footer className="relative z-10 border-t border-white/10 mt-16">
        <div className="max-w-6xl mx-auto px-4 py-10 text-sm text-white/55 flex flex-wrap items-center justify-between gap-3">
          <div>© 2026 {SITE.author}</div>
          <div className="text-white/45">
            Evidence and citations are centralized on Sources and Dashboard.
          </div>
        </div>
      </footer>
    </div>
  );
}
