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
    <div className="min-h-screen bg-[#f7f8fb] text-black">
      <header className="sticky top-0 z-50 border-b border-black/10 bg-white/75 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4">
          <Link href="/" className="flex items-center gap-3">
            <span className="h-10 w-10 rounded-full border border-black/10 bg-gradient-to-br from-indigo-200 via-white to-sky-200 shadow-sm" />
            <span className="leading-tight">
              <span className="block text-sm font-semibold text-black/85">
                {SITE.brand.title}
              </span>
              <span className="block text-xs text-black/55">
                {SITE.brand.subtitle}
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
            <a
              href={SITE.links.analysisRepo}
              target="_blank"
              rel="noreferrer"
              className="px-3 py-2 rounded-full text-sm font-semibold bg-black text-white hover:opacity-90 transition"
            >
              Code
            </a>
          </nav>

          <div className="ml-auto lg:hidden flex items-center gap-2">
            <Link
              href="/stats"
              className="px-3 py-2 rounded-full text-sm font-semibold bg-black text-white hover:opacity-90 transition"
            >
              Dashboard
            </Link>
          </div>
        </div>
      </header>

      <main className="relative">{children}</main>

      <footer className="border-t border-black/10 mt-16">
        <div className="max-w-6xl mx-auto px-4 py-10 text-sm text-black/55 grid md:grid-cols-2 gap-6">
          <div>
            <div className="font-semibold text-black/80">{SITE.author}</div>
            <div className="mt-1">
              Last updated Jan 31, 2026. Evidence and citations are centralized in Sources and Dashboard.
            </div>
          </div>

          <div className="md:text-right">
            <div className="text-black/45">
              Mission: {SITE.brand.mission}
            </div>
            <div className="mt-3 flex md:justify-end flex-wrap gap-2">
              <a
                className="px-3 py-2 rounded-full bg-white ring-1 ring-black/10 hover:bg-neutral-50 transition"
                href={SITE.links.analysisRepo}
                target="_blank"
                rel="noreferrer"
              >
                GitHub repo
              </a>
              <Link
                className="px-3 py-2 rounded-full bg-white ring-1 ring-black/10 hover:bg-neutral-50 transition"
                href="/sources"
              >
                Sources
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
<Link
  className="px-3 py-2 rounded-full bg-white ring-1 ring-black/10 hover:bg-neutral-50 transition"
  href="/about"
>
  About
</Link>
