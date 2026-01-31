// components/SiteShell.tsx
import Link from "next/link";
import { ReactNode } from "react";
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

export default function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f7f8fb] text-black">
      <header className="sticky top-0 z-50 border-b border-black/10 bg-white/70 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4">
          <Link href="/" className="flex items-center gap-3">
            <span className="h-10 w-10 rounded-full border border-black/10 bg-white shadow-sm" />
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
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="px-3 py-2 rounded-full text-sm font-semibold text-black/70 hover:bg-black/5 border border-transparent hover:border-black/10 transition"
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto lg:hidden">
            <Link
              href="/stats"
              className="px-3 py-2 rounded-full text-sm font-semibold bg-black text-white hover:opacity-90 transition"
            >
              Stats
            </Link>
          </div>
        </div>
      </header>

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
