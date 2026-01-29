// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import SiteShell from "@/components/SiteShell";

export const metadata: Metadata = {
  title: "Prison Education and Recidivism - Michael Parham",
  description:
    "Research brief on recidivism and reentry support using post-release employment as a proxy, plus short policy notes on youth sentencing and solitary confinement.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
// components/SiteShell.tsx
"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Github, Menu, X } from "lucide-react";

const CONTENT = {
  siteTitle: "Prison Education and Recidivism",
  subTitle: "Research brief + policy notes",
  author: "Michael Parham",
  githubProfile: "https://github.com/miketitus2003-cloud",
};

function cx(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const nav = useMemo(
    () => [
      { href: "/", label: "Home" },
      { href: "/research", label: "Research" },
      { href: "/policy", label: "Policy" },
      { href: "/sources", label: "Sources" },
      { href: "/about", label: "About" },
    ],
    []
  );

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      {/* subtle background */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:64px_64px]" />
        <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-white/5 blur-3xl" />
        <div className="absolute top-1/2 -right-56 h-[620px] w-[620px] rounded-full bg-white/4 blur-3xl" />
      </div>

      <header className="sticky top-0 z-50 border-b border-white/10 bg-neutral-950/75 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-2xl bg-white/10 ring-1 ring-white/10" />
            <div className="min-w-0">
              <div className="text-sm font-semibold leading-none truncate">
                {CONTENT.siteTitle}
              </div>
              <div className="text-xs text-white/60 truncate">{CONTENT.subTitle}</div>
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
                    active ? "bg-white/10 ring-1 ring-white/10" : "text-white/70 hover:text-white hover:bg-white/5"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={CONTENT.githubProfile}
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/15 ring-1 ring-white/10 text-sm"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>

            <button
              className="md:hidden inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/15 ring-1 ring-white/10 text-sm"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      {open ? (
        <div className="fixed inset-0 z-50 bg-neutral-950/85 backdrop-blur">
          <div className="max-w-6xl mx-auto px-4 py-4">
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
                      active ? "bg-white/10" : "bg-white/5 hover:bg-white/10"
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <a
                href={CONTENT.githubProfile}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-3 rounded-2xl ring-1 ring-white/10 bg-white/5 hover:bg-white/10 flex items-center justify-between"
              >
                GitHub <Github className="h-4 w-4 opacity-80" />
              </a>
            </div>
          </div>
        </div>
      ) : null}

      <main className="relative">{children}</main>

      <footer className="relative border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-10 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          <div className="text-sm text-white/60">
            © {new Date().getFullYear()} {CONTENT.author}
          </div>
          <div className="flex gap-3">
            <a
              href={CONTENT.githubProfile}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 ring-1 ring-white/10 text-sm"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
// components/UI.tsx
import React from "react";

export function Card({ children }: { children: React.ReactNode }) {
  return <div className="rounded-3xl bg-white/5 ring-1 ring-white/10 p-6">{children}</div>;
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="max-w-3xl">
      {eyebrow ? <div className="text-xs uppercase tracking-widest text-white/60">{eyebrow}</div> : null}
      <h1 className="mt-2 text-2xl md:text-3xl font-semibold text-white">{title}</h1>
      {subtitle ? <p className="mt-3 text-white/70 leading-relaxed">{subtitle}</p> : null}
    </div>
  );
}

export function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 space-y-2 text-sm text-white/75 leading-relaxed">
      {items.map((b) => (
        <li key={b} className="flex gap-3">
          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-white/60" />
          <span>{b}</span>
        </li>
      ))}
    </ul>
  );
}
// components/SlideGallery.tsx
"use client";

import React from "react";
import { Card } from "@/components/UI";

type Slide = { src: string; caption: string };

export default function SlideGallery({ slides }: { slides: Slide[] }) {
  return (
    <Card>
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="font-semibold">Slide highlights</div>
          <div className="text-sm text-white/65 mt-1">
            These load from public/assets as slide_01.png to slide_07.png.
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {slides.map((s) => (
          <div
            key={s.src}
            className="rounded-2xl bg-white/5 ring-1 ring-white/10 overflow-hidden"
          >
            <div className="aspect-[16/9] bg-white/5">
              <img
                src={s.src}
                alt={s.caption}
                className="h-full w-full object-cover"
                loading="lazy"
                onError={(e) => {
                  const wrap = e.currentTarget.closest("div.rounded-2xl") as HTMLElement | null;
                  if (wrap) wrap.style.display = "none";
                }}
              />
            </div>
            <div className="p-3 text-xs text-white/70 leading-relaxed">{s.caption}</div>
          </div>
        ))}
      </div>
    </Card>
  );
}
// app/page.tsx
import Link from "next/link";
import { ExternalLink, LineChart, ShieldAlert } from "lucide-react";
import { Card } from "@/components/UI";

const LINKS = {
  repo: "https://github.com/miketitus2003-cloud/prison-education-recidivism-analysis-standalone",
  github: "https://github.com/miketitus2003-cloud",
};

export default function HomePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 pt-12 md:pt-16 pb-12">
      <div className="grid md:grid-cols-12 gap-10 items-start">
        <div className="md:col-span-7">
          <div className="text-xs uppercase tracking-widest text-white/60">Research brief</div>
          <h1 className="mt-2 text-3xl md:text-5xl font-semibold leading-tight">
            Prison Education and Recidivism
          </h1>
          <p className="mt-4 text-white/75 text-base md:text-lg leading-relaxed">
            I studied how post-release employment (a proxy for education and reentry support) relates to
            recidivism, then added short policy notes on youth sentencing and solitary confinement.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/research"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white text-neutral-950 font-semibold hover:opacity-90"
            >
              Read research <LineChart className="h-4 w-4" />
            </Link>
            <Link
              href="/policy"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/10 ring-1 ring-white/10 hover:bg-white/15 text-white font-semibold"
            >
              Policy notes <ShieldAlert className="h-4 w-4 opacity-80" />
            </Link>
            <a
              href={LINKS.repo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/5 ring-1 ring-white/10 hover:bg-white/10 text-white font-semibold"
            >
              View code <ExternalLink className="h-4 w-4 opacity-80" />
            </a>
          </div>

          <div className="mt-10 grid sm:grid-cols-3 gap-3">
            {[
              { label: "Re-arrest rate", value: "62% within 3 years", note: "34 states, 2012 cohort" },
              { label: "Education link", value: "43% lower odds", note: "reported in prior research" },
              { label: "Proxy", value: "Employment after release", note: "measurable reentry signal" },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-4">
                <div className="text-xs text-white/60">{s.label}</div>
                <div className="text-sm font-semibold mt-1">{s.value}</div>
                <div className="text-xs text-white/55 mt-1">{s.note}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="md:col-span-5">
          <Card>
            <div className="text-sm font-semibold">Start here</div>
            <div className="mt-4 grid gap-3">
              <Link
                href="/research"
                className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-4 hover:bg-white/10 transition"
              >
                <div className="font-semibold">Research</div>
                <div className="text-sm text-white/70 mt-1">Question, method, findings, slides</div>
              </Link>

              <Link
                href="/policy"
                className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-4 hover:bg-white/10 transition"
              >
                <div className="font-semibold">Policy</div>
                <div className="text-sm text-white/70 mt-1">Short briefs, no essay walls</div>
              </Link>

              <Link
                href="/sources"
                className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-4 hover:bg-white/10 transition"
              >
                <div className="font-semibold">Sources</div>
                <div className="text-sm text-white/70 mt-1">Direct links to core references</div>
              </Link>

              <a
                href={LINKS.github}
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-4 hover:bg-white/10 transition"
              >
                <div className="font-semibold">GitHub</div>
                <div className="text-sm text-white/70 mt-1">Profile and projects</div>
              </a>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
// app/research/page.tsx
import { ExternalLink, LineChart, Scale, ShieldAlert } from "lucide-react";
import SlideGallery from "@/components/SlideGallery";
import { BulletList, Card, SectionHeader } from "@/components/UI";

const LINKS = {
  repo: "https://github.com/miketitus2003-cloud/prison-education-recidivism-analysis-standalone",
};

const SLIDES = [
  { src: "/assets/slide_01.png", caption: "Project title" },
  { src: "/assets/slide_02.png", caption: "Why recidivism needs a closer look" },
  { src: "/assets/slide_03.png", caption: "Research question and variables" },
  { src: "/assets/slide_04.png", caption: "Method overview (Logit model)" },
  { src: "/assets/slide_05.png", caption: "Results summary" },
  { src: "/assets/slide_06.png", caption: "Implications and next steps" },
  { src: "/assets/slide_07.png", caption: "Add a real caption here" },
];

export default function ResearchPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 pt-12 md:pt-16 pb-12">
      <SectionHeader
        eyebrow="Research"
        title="Prison education and recidivism"
        subtitle="Using post-release employment as a proxy for education and reentry support."
      />

      <div className="mt-8 grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-2xl bg-white/10 ring-1 ring-white/10 flex items-center justify-center">
                <LineChart className="h-5 w-5" />
              </div>
              <div>
                <div className="font-semibold">Why this matters</div>
                <div className="text-xs text-white/60 mt-1">Problem, gap, and the proxy choice</div>
              </div>
            </div>

            <BulletList
              items={[
                "Recidivism is not just a statistic. It affects families and community safety.",
                "Education programs are linked to lower reoffending, but public datasets often miss program type and dosage.",
                "Employment after release is measurable and connected to education and reentry support in prior research.",
              ]}
            />
          </Card>

          <Card>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-2xl bg-white/10 ring-1 ring-white/10 flex items-center justify-center">
                <Scale className="h-5 w-5" />
              </div>
              <div>
                <div className="font-semibold">Research question</div>
                <div className="text-xs text-white/60 mt-1">What I tested</div>
              </div>
            </div>

            <p className="mt-4 text-sm text-white/75 leading-relaxed">
              What is the relationship between employment (proxy), offense type, time served, and recidivism?
            </p>

            <a
              href={LINKS.repo}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white hover:opacity-90"
            >
              Open repo <ExternalLink className="h-4 w-4 opacity-70" />
            </a>
          </Card>
        </div>

        <Card>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-white/10 ring-1 ring-white/10 flex items-center justify-center">
              <ShieldAlert className="h-5 w-5" />
            </div>
            <div>
              <div className="font-semibold">Method</div>
              <div className="text-xs text-white/60 mt-1">Quick, readable setup</div>
            </div>
          </div>

          <BulletList
            items={[
              "Outcome: recidivism (1 = reoffended, 0 = did not)",
              "Predictors: employed (yes/no), offense type (violent vs drug), time served (years)",
              "Model: logistic regression (statsmodels Logit) in Python",
              "Data: simulated dataset based on national patterns (directional illustration, not causal estimate)",
            ]}
          />
        </Card>
      </div>

      <div className="mt-6 grid md:grid-cols-3 gap-4">
        <Card>
          <div className="font-semibold">Key results</div>
          <BulletList
            items={[
              "Employed after release was associated with a much lower likelihood of reoffending",
              "Violent offense type was associated with a higher likelihood of return",
              "Time served was not statistically significant in this run",
            ]}
          />
        </Card>

        <Card>
          <div className="font-semibold">Implications</div>
          <BulletList
            items={[
              "Shift focus from sentence length to in-prison programs and reentry support",
              "Programs that lead to jobs can reduce returns and improve safety",
            ]}
          />
        </Card>

        <Card>
          <div className="font-semibold">Limitations</div>
          <BulletList
            items={[
              "Simulated data shows direction of effects, not causality",
              "Employment is a proxy, not direct education participation data",
              "Replication needs richer controls and administrative records",
            ]}
          />
        </Card>
      </div>

      <div className="mt-6">
        <SlideGallery slides={SLIDES} />
      </div>
    </div>
  );
}
// app/policy/page.tsx
import { BookOpen, ExternalLink, Scale, ShieldAlert } from "lucide-react";
import { BulletList, Card, SectionHeader } from "@/components/UI";

type Policy = {
  title: string;
  icon: React.ElementType;
  oneLine: string;
  bullets: string[];
  bottomLine: string;
  pdfHref?: string; // add /docs/... if you upload PDFs
};

const POLICIES: Policy[] = [
  {
    title: "Teens and extreme punishment",
    icon: Scale,
    oneLine:
      "Teenagers should not face punishments as final as the death penalty because the system is flawed, youth are easier to pressure, and the risk of irreversible harm is too high.",
    bullets: [
      "The system gets it wrong: wrongful convictions and false confessions happen",
      "Bias raises the risk: extreme sentencing has not been applied equally",
      "The punishment is cruel: executions are not reliably humane or reversible",
    ],
    bottomLine: "If a system can be wrong, it should never be allowed to permanently end a child's life.",
    // pdfHref: "/docs/teens-death-penalty.pdf",
  },
  {
    title: "What solitary does to kids",
    icon: ShieldAlert,
    oneLine:
      "Solitary can mean 22 to 24 hours a day alone. For youth, isolation hits harder and can cause serious harm.",
    bullets: [
      "Linked to anxiety, depression, panic, and paranoia",
      "Higher risk of self-harm and suicide",
      "Long-term psychological damage and trauma symptoms",
      "Often used for staffing, rules, or so-called protection, not because it helps kids",
    ],
    bottomLine: "Kids end up paying for a system that lacks safe alternatives.",
    // pdfHref: "/docs/kids-solitary.pdf",
  },
  {
    title: "Why solitary should not be used",
    icon: BookOpen,
    oneLine:
      "Solitary may control a situation short term, but long-term isolation can cause damage and make reentry harder.",
    bullets: [
      "Public safety problem: most people return home, and isolation can increase instability after release",
      "Rehabilitation problem: if a practice worsens mental health, it works against reducing future harm",
      "Better path: step-down programs, clinical care, strict limits, oversight, and transparency",
    ],
    bottomLine: "If a punishment increases risk after release, it is not real safety.",
    // pdfHref: "/docs/solitary-confinement.pdf",
  },
];

function IconBadge({ Icon }: { Icon: React.ElementType }) {
  return (
    <div className="h-10 w-10 rounded-2xl bg-white/10 ring-1 ring-white/10 flex items-center justify-center">
      <Icon className="h-5 w-5" />
    </div>
  );
}

function cx(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function PolicyPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 pt-12 md:pt-16 pb-12">
      <SectionHeader
        eyebrow="Policy"
        title="Policy notes"
        subtitle="Short points people will actually read. No full essay walls."
      />

      <div className="mt-8 grid md:grid-cols-3 gap-4">
        {POLICIES.map((p) => {
          const enabled = Boolean(p.pdfHref);
          return (
            <Card key={p.title}>
              <div className="flex items-center gap-3">
                <IconBadge Icon={p.icon} />
                <div className="font-semibold">{p.title}</div>
              </div>

              <p className="mt-3 text-sm text-white/75 leading-relaxed">{p.oneLine}</p>

              <BulletList items={p.bullets} />

              <div className="mt-4 rounded-2xl bg-white/5 ring-1 ring-white/10 p-4 text-sm text-white/75 leading-relaxed">
                <span className="text-white font-semibold">Bottom line: </span>
                {p.bottomLine}
              </div>

              <a
                href={enabled ? p.pdfHref : "#"}
                target={enabled ? "_blank" : undefined}
                rel={enabled ? "noreferrer" : undefined}
                className={cx(
                  "mt-4 inline-flex items-center gap-2 text-sm font-semibold",
                  enabled ? "text-white hover:opacity-90" : "text-white/40 pointer-events-none"
                )}
              >
                Full paper (PDF) <ExternalLink className="h-4 w-4 opacity-70" />
              </a>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
// app/sources/page.tsx
import { ExternalLink } from "lucide-react";
import { Card, SectionHeader } from "@/components/UI";

const SOURCES = [
  { label: "BJS - Recidivism topic page", href: "https://bjs.ojp.gov/topics/recidivism" },
  { label: "RAND (2013) - Correctional Education report", href: "https://www.rand.org/pubs/research_reports/RR266.html" },
  {
    label: "BJS publications search - recidivism",
    href: "https://bjs.ojp.gov/library/publications/list?field_keywords_target_id%5B0%5D=Recidivism",
  },
];

export default function SourcesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 pt-12 md:pt-16 pb-12">
      <SectionHeader
        eyebrow="Sources"
        title="Sources used"
        subtitle="Direct links to the core references used for research framing."
      />

      <div className="mt-8">
        <Card>
          <div className="grid gap-3">
            {SOURCES.map((s) => (
              <a
                key={s.href}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-4 hover:bg-white/10 transition flex items-start justify-between gap-3"
              >
                <div className="text-sm text-white/80">{s.label}</div>
                <ExternalLink className="h-4 w-4 opacity-70 mt-0.5" />
              </a>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
// app/about/page.tsx
import { Github, ExternalLink } from "lucide-react";
import { BulletList, Card, SectionHeader } from "@/components/UI";

const LINKS = {
  github: "https://github.com/miketitus2003-cloud",
  repo: "https://github.com/miketitus2003-cloud/prison-education-recidivism-analysis-standalone",
};

export default function AboutPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 pt-12 md:pt-16 pb-12">
      <SectionHeader
        eyebrow="About"
        title="About this site"
        subtitle="A clean portfolio format: research first, policy second, sources always."
      />

      <div className="mt-8 grid md:grid-cols-12 gap-6">
        <div className="md:col-span-8">
          <Card>
            <div className="font-semibold">What this is</div>
            <BulletList
              items={[
                "A readable research brief with a clear question, method, and findings",
                "Policy notes that pull the best points without copying full essays",
                "Built to be easy to scan and easy to cite",
              ]}
            />

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={LINKS.repo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white text-neutral-950 font-semibold hover:opacity-90"
              >
                Repo <ExternalLink className="h-4 w-4 opacity-70" />
              </a>
              <a
                href={LINKS.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/10 ring-1 ring-white/10 hover:bg-white/15 text-sm font-semibold"
              >
                <Github className="h-4 w-4" />
                GitHub profile <ExternalLink className="h-4 w-4 opacity-70" />
              </a>
            </div>
          </Card>
        </div>

        <div className="md:col-span-4">
          <Card>
            <div className="text-sm font-semibold">Next upgrades</div>
            <BulletList
              items={[
                "Add PDFs in public/docs and enable the PDF buttons on Policy",
                "Rename the slide_07 caption to match what the slide shows",
                "Add one interactive chart later (optional)",
              ]}
            />
          </Card>
        </div>
      </div>
    </div>
  );
}
