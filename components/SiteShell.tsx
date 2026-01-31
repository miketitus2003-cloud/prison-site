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

function cx(...c: Array<string | false | undefined>) {
  return c.filter(Boolean).join(" ");
}

export default function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f7f8fb] text-black">
      {/* background visuals */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-gradient-to-br from-indigo-200/55 via-sky-200/45 to-emerald-200/35 blur-3xl" />
        <div className="absolute -bottom-48 -right-48 h-[560px] w-[560px] rounded-full bg-gradient-to-br from-rose-200/50 via-amber-200/35 to-indigo-200/35 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.12]" style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(0,0,0,0.12) 1px, transparent 0)",
          backgroundSize: "22px 22px",
        }} />
      </div>

      <header className="sticky top-0 z-50 border-b border-black/10 bg-white/72 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4">
          <Link href="/" className="flex items-center gap-3 min-w-0">
            <span className="h-10 w-10 rounded-2xl border border-black/10 bg-white shadow-sm overflow-hidden grid place-items-center">
              <span className="h-7 w-7 rounded-xl bg-gradient-to-br from-indigo-400 via-sky-300 to-emerald-300" />
            </span>

            <span className="leading-tight min-w-0">
              <span className="block text-sm font-semibold text-black/90 truncate">
                {SITE.overview.title}
              </span>
              <span className="block text-xs text-black/55 truncate">
                {SITE.overview.subtitle}
              </span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="ml-auto hidden lg:flex items-center gap-1">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="px-3 py-2 rounded-full text-sm font-semibold text-black/70 hover:bg-black/5 border border-transparent hover:border-black/10 transition"
              >
                {n.label}
              </Link>
            ))}

            <Link
              href="/stats"
              className="ml-1 px-4 py-2 rounded-full text-sm font-semibold bg-neutral-900 text-white hover:bg-neutral-800 transition shadow-sm"
            >
              Stats Lab
            </Link>
          </nav>

          {/* Mobile menu */}
          <div className="ml-auto lg:hidden flex items-center gap-2">
            <Link
              href="/stats"
              className="px-3 py-2 rounded-full text-sm font-semibold bg-neutral-900 text-white hover:bg-neutral-800 transition"
            >
              Stats
            </Link>

            <details className="relative">
              <summary
                className={cx(
                  "list-none cursor-pointer select-none",
                  "px-3 py-2 rounded-full text-sm font-semibold",
                  "bg-white ring-1 ring-black/10 hover:bg-neutral-50 transition"
                )}
              >
                Menu
              </summary>

              <div className="absolute right-0 mt-2 w-[260px] rounded-3xl bg-white ring-1 ring-black/10 shadow-[0_22px_80px_rgba(0,0,0,0.16)] overflow-hidden">
                <div className="p-2">
                  {NAV.map((n) => (
                    <Link
                      key={n.href}
                      href={n.href}
                      className="block px-4 py-3 rounded-2xl text-sm font-semibold text-black/80 hover:bg-neutral-50 transition"
                    >
                      {n.label}
                    </Link>
                  ))}
                </div>
              </div>
            </details>
          </div>
        </div>
      </header>

      <main className="relative">{children}</main>

      <footer className="border-t border-black/10 mt-16 bg-white/60">
        <div className="max-w-6xl mx-auto px-4 py-10 text-sm text-black/55 flex flex-wrap items-center justify-between gap-3">
          <div>© 2026 {SITE.author}</div>
          <div className="text-black/45">
            Evidence is centralized on Sources and Stats Lab.
          </div>
        </div>
      </footer>
    </div>
  );
}
