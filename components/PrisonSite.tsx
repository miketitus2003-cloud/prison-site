"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ExternalLink,
  FileText,
  Github,
  LineChart,
  Menu,
  Scale,
  ShieldAlert,
  X,
} from "lucide-react";

type Slide = { src: string; caption: string };

const CONTENT = {
  siteTitle: "Prison Education and Recidivism",
  subTitle: "Research brief + policy notes",
  tagline:
    "I studied how post-release employment (a proxy for education and reentry support) relates to recidivism, then added short, readable policy notes on youth sentencing and solitary confinement.",
  links: {
    githubProfile: "https://github.com/miketitus2003-cloud",
    recidivismRepo:
      "https://github.com/miketitus2003-cloud/prison-education-recidivism-analysis-standalone",
    // Optional: add PDFs later (drop into public/docs)
    deathPenaltyPdf: "", // example: "/docs/teens-death-penalty.pdf"
    solitaryPdf: "", // example: "/docs/solitary-confinement.pdf"
  },

  highlights: [
    { label: "Re-arrest rate", value: "62% within 3 years", note: "34 states, 2012" },
    { label: "Education effect", value: "43% lower odds", note: "linked to less reoffending" },
    { label: "Proxy used here", value: "Employment after release", note: "measurable reentry signal" },
  ],

  research: {
    title: "Research brief",
    overview:
      "Correctional education is linked to lower recidivism, but public datasets often do not track program type, time in program, or dosage. To keep the analysis measurable, I used employment after release as a proxy for education and reentry support.",
    question:
      "What is the relationship between employment (proxy), offense type, time served, and recidivism?",
    method: [
      "Outcome: recidivism (1 = reoffended, 0 = did not)",
      "Predictors: employed (yes/no), offense type (violent vs drug), time served (years)",
      "Model: logistic regression (statsmodels Logit) in Python",
    ],
    results: [
      "Employed after release was associated with a much lower likelihood of reoffending",
      "Violent offense type was associated with a higher likelihood of return",
      "Time served was not statistically significant in this run",
    ],
    limitations: [
      "This run uses simulated data modeled on national patterns, so it illustrates direction of effects, not causality",
      "Employment is a proxy, not a direct measurement of education participation",
      "Real-world replication needs program participation data plus richer controls",
    ],
    implications: [
      "Policy focus should move from sentence length to in-prison programming and reentry support",
      "Programs that improve job outcomes can reduce returns and improve community safety",
    ],
    nextSteps: [
      "Add real education participation data when available",
      "Test with state or local administrative records",
      "Include parole status, demographics, and support systems",
    ],
    sources: ["BJS (2013, 2018, 2021)", "RAND (2013)"],
    slides: [
      { src: "/assets/slide_01.png", caption: "Project title" },
      { src: "/assets/slide_02.png", caption: "Why it matters and why employment is a proxy" },
      { src: "/assets/slide_03.png", caption: "Research question and variables" },
      { src: "/assets/slide_04.png", caption: "Method: logistic regression (Logit)" },
      { src: "/assets/slide_05.png", caption: "Results summary" },
      { src: "/assets/slide_06.png", caption: "Implications and next steps" },
    { src: "/assets/slide_07.png", caption: "Slide 7" },
    ] as Slide[],
  },

  policy: {
    title: "Policy notes",
    subtitle: "Short sections that connect the research to youth punishment and solitary confinement.",
    cards: [
      {
        title: "Teens and extreme punishment",
        icon: Scale,
        oneLine:
          "Teenagers should not face punishments as final as the death penalty because the system is flawed, kids are easier to pressure, and the risk of irreversible harm is too high.",
        bullets: [
          "Wrongful convictions and false confessions happen, and youth are more vulnerable under pressure",
          "Bias increases risk in extreme sentencing and outcomes",
          "Extreme punishments are not reliably humane or reversible",
        ],
        bottomLine: "If a system can be wrong, it should never be allowed to permanently end a child's life.",
        pdfKey: "deathPenaltyPdf" as const,
        pdfLabel: "Full paper (PDF)",
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
          "Often used because of staffing, rules, or so-called protection, not because it helps kids",
        ],
        bottomLine: "Kids end up paying for a system that lacks safe alternatives.",
        pdfKey: "solitaryPdf" as const,
        pdfLabel: "Full paper (PDF)",
      },
      {
        title: "Why solitary should not be used",
        icon: FileText,
        oneLine:
          "Solitary may control a situation short term, but long-term isolation causes damage and can make reentry harder.",
        bullets: [
          "Most incarcerated people return home, and isolation can increase instability after release",
          "If a practice worsens mental health, it works against rehabilitation",
          "Better options include step-down programs, clinical care, and strict limits with oversight",
        ],
        bottomLine: "If a punishment increases risk after release, it is not real safety.",
        pdfKey: "solitaryPdf" as const,
        pdfLabel: "Full paper (PDF)",
      },
    ],
  },

  about: {
    title: "About",
    text: [
      "This site is built as a clean research brief: one main project, clear sections, and short policy notes.",
      "The goal is simple: explain the problem, show the method and results, and point to what should be tested next with real data.",
    ],
  },
};

function cx(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function IconBadge({ Icon }: { Icon: React.ElementType }) {
  return (
    <div className="h-10 w-10 rounded-2xl bg-white/10 ring-1 ring-white/10 flex items-center justify-center">
      <Icon className="h-5 w-5" />
    </div>
  );
}

function Section({
  id,
  eyebrow,
  title,
  subtitle,
  children,
}: {
  id: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28 py-14 md:py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="max-w-3xl">
          {eyebrow ? (
            <div className="text-xs uppercase tracking-widest text-white/60">{eyebrow}</div>
          ) : null}
          <h2 className="mt-2 text-2xl md:text-3xl font-semibold text-white">{title}</h2>
          {subtitle ? <p className="mt-3 text-white/70 leading-relaxed">{subtitle}</p> : null}
        </div>
        <div className="mt-8">{children}</div>
      </div>
    </section>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="mt-3 space-y-2 text-sm text-white/75 leading-relaxed">
      {items.map((b) => (
        <li key={b} className="flex gap-3">
          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-white/60" />
          <span>{b}</span>
        </li>
      ))}
    </ul>
  );
}

export default function PrisonSite() {
  const nav = useMemo(
    () => [
      { id: "home", label: "Home" },
      { id: "research", label: "Research" },
      { id: "policy", label: "Policy" },
      { id: "sources", label: "Sources" },
      { id: "about", label: "About" },
    ],
    []
  );

  const [menuOpen, setMenuOpen] = useState(false);

  const pdfHref = (key: "deathPenaltyPdf" | "solitaryPdf") => {
    const v = (CONTENT.links as any)[key] as string;
    if (!v) return "";
    return v;
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      {/* soft background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-white/6 blur-3xl" />
        <div className="absolute top-1/2 -right-56 h-[620px] w-[620px] rounded-full bg-white/5 blur-3xl" />
      </div>

      {/* header */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-neutral-950/75 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <a href="#home" className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-2xl bg-white/10 ring-1 ring-white/10" />
            <div>
              <div className="text-sm font-semibold leading-none">{CONTENT.siteTitle}</div>
              <div className="text-xs text-white/60">{CONTENT.subTitle}</div>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-2">
            {nav.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="px-3 py-2 rounded-xl text-sm text-white/70 hover:text-white hover:bg-white/5"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={CONTENT.links.githubProfile}
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/15 ring-1 ring-white/10 text-sm"
            >
              <Github className="h-4 w-4" />
              GitHub
              <ExternalLink className="h-4 w-4 opacity-70" />
            </a>

            <button
              className="md:hidden inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/15 ring-1 ring-white/10 text-sm"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      {/* mobile menu */}
      {menuOpen ? (
        <div className="fixed inset-0 z-50 bg-neutral-950/80 backdrop-blur">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold">Menu</div>
              <button
                className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/15 ring-1 ring-white/10 text-sm"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-4 grid gap-2">
              {nav.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setMenuOpen(false)}
                  className="px-4 py-3 rounded-2xl ring-1 ring-white/10 bg-white/5 text-white hover:bg-white/10"
                >
                  {item.label}
                </a>
              ))}
              <a
                href={CONTENT.links.githubProfile}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-3 rounded-2xl ring-1 ring-white/10 bg-white/5 text-white hover:bg-white/10 flex items-center justify-between"
              >
                GitHub <ExternalLink className="h-4 w-4 opacity-70" />
              </a>
            </div>
          </div>
        </div>
      ) : null}

      {/* main */}
      <main id="home" className="scroll-mt-28">
        {/* hero */}
        <div className="max-w-6xl mx-auto px-4 pt-12 md:pt-16 pb-10">
          <div className="grid md:grid-cols-12 gap-10 items-start">
            <div className="md:col-span-7">
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                className="text-3xl md:text-5xl font-semibold leading-tight"
              >
                {CONTENT.siteTitle}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.05 }}
                className="mt-4 text-white/75 text-base md:text-lg leading-relaxed"
              >
                {CONTENT.tagline}
              </motion.p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="#research"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white text-neutral-950 font-semibold hover:opacity-90"
                >
                  Read the research <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#policy"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/10 ring-1 ring-white/10 hover:bg-white/15 text-white font-semibold"
                >
                  Policy notes <ArrowRight className="h-4 w-4" />
                </a>
              </div>

              <div className="mt-8 rounded-3xl bg-white/5 ring-1 ring-white/10 p-6">
                <div className="text-sm font-semibold">Key highlights</div>
                <div className="mt-4 grid sm:grid-cols-3 gap-3">
                  {CONTENT.highlights.map((h) => (
                    <div key={h.label} className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-4">
                      <div className="text-xs text-white/60">{h.label}</div>
                      <div className="text-sm font-semibold mt-1">{h.value}</div>
                      <div className="text-xs text-white/55 mt-1">{h.note}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="md:col-span-5">
              <div className="rounded-3xl bg-white/5 ring-1 ring-white/10 p-6">
                <div className="text-sm font-semibold">Project links</div>
                <div className="mt-4 grid gap-3">
                  <a
                    href={CONTENT.links.recidivismRepo}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-4 hover:bg-white/10 transition"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="font-semibold">Code + analysis</div>
                        <div className="text-sm text-white/70 mt-1">Repo, notebooks, results</div>
                      </div>
                      <ExternalLink className="h-4 w-4 opacity-70 mt-1" />
                    </div>
                  </a>

                  <a
                    href="#sources"
                    className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-4 hover:bg-white/10 transition"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="font-semibold">Sources used</div>
                        <div className="text-sm text-white/70 mt-1">BJS and RAND references</div>
                      </div>
                      <ArrowRight className="h-4 w-4 opacity-70 mt-1" />
                    </div>
                  </a>

                  <a
                    href={CONTENT.links.githubProfile}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-4 hover:bg-white/10 transition"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="font-semibold">GitHub profile</div>
                        <div className="text-sm text-white/70 mt-1">All projects</div>
                      </div>
                      <ExternalLink className="h-4 w-4 opacity-70 mt-1" />
                    </div>
                  </a>
                </div>

                <div className="mt-5 text-xs text-white/55 leading-relaxed">
                  Tip: add slide images in public/assets as slide_01.png, slide_02.png, etc.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Research */}
        <Section id="research" eyebrow="Research" title={CONTENT.research.title}>
          <div className="grid lg:grid-cols-3 gap-4">
            <div className="rounded-3xl bg-white/5 ring-1 ring-white/10 p-6 lg:col-span-2">
              <div className="flex items-center gap-3">
                <IconBadge Icon={LineChart} />
                <div className="font-semibold">Overview</div>
              </div>
              <p className="mt-4 text-sm text-white/75 leading-relaxed">{CONTENT.research.overview}</p>

              <div className="mt-6 rounded-2xl bg-white/5 ring-1 ring-white/10 p-4">
                <div className="text-sm font-semibold">Research question</div>
                <div className="mt-2 text-sm text-white/75">{CONTENT.research.question}</div>
              </div>

              <a
                href={CONTENT.links.recidivismRepo}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white hover:opacity-90"
              >
                View repo <ExternalLink className="h-4 w-4 opacity-70" />
              </a>
            </div>

            <div className="rounded-3xl bg-white/5 ring-1 ring-white/10 p-6">
              <div className="flex items-center gap-3">
                <IconBadge Icon={Scale} />
                <div className="font-semibold">Method</div>
              </div>
              <BulletList items={CONTENT.research.method} />

              <div className="mt-6">
                <div className="font-semibold">Results</div>
                <BulletList items={CONTENT.research.results} />
              </div>
            </div>
          </div>

          {/* Slide gallery */}
          <div className="mt-6 rounded-3xl bg-white/5 ring-1 ring-white/10 p-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="font-semibold">Slide highlights</div>
                <div className="text-sm text-white/70 mt-1">
                  Add images in public/assets to display these.
                </div>
              </div>
              <LineChart className="h-5 w-5 opacity-70" />
            </div>

            <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {CONTENT.research.slides.map((s) => (
                <div key={s.src} className="rounded-2xl bg-white/5 ring-1 ring-white/10 overflow-hidden">
                  <div className="aspect-[16/9] bg-white/5">
                    <img
                      src={s.src}
                      alt={s.caption}
                      className="h-full w-full object-cover"
                      loading="lazy"
                      onError={(e) => {
                        const parent = e.currentTarget.parentElement as HTMLElement | null;
                        if (parent) parent.style.display = "none";
                      }}
                    />
                  </div>
                  <div className="p-4 text-sm text-white/75 leading-relaxed">{s.caption}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 grid md:grid-cols-3 gap-4">
            <div className="rounded-3xl bg-white/5 ring-1 ring-white/10 p-6">
              <div className="font-semibold">Implications</div>
              <BulletList items={CONTENT.research.implications} />
            </div>
            <div className="rounded-3xl bg-white/5 ring-1 ring-white/10 p-6">
              <div className="font-semibold">Limitations</div>
              <BulletList items={CONTENT.research.limitations} />
            </div>
            <div className="rounded-3xl bg-white/5 ring-1 ring-white/10 p-6">
              <div className="font-semibold">Next steps</div>
              <BulletList items={CONTENT.research.nextSteps} />
            </div>
          </div>
        </Section>

        {/* Policy */}
        <Section id="policy" eyebrow="Policy" title={CONTENT.policy.title} subtitle={CONTENT.policy.subtitle}>
          <div className="grid md:grid-cols-3 gap-4">
            {CONTENT.policy.cards.map((p) => {
              const href = pdfHref(p.pdfKey);
              const enabled = Boolean(href);
              return (
                <div key={p.title} className="rounded-3xl bg-white/5 ring-1 ring-white/10 p-6">
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
                    href={enabled ? href : "#"}
                    target={enabled ? "_blank" : undefined}
                    rel={enabled ? "noreferrer" : undefined}
                    className={cx(
                      "mt-4 inline-flex items-center gap-2 text-sm font-semibold",
                      enabled ? "text-white hover:opacity-90" : "text-white/40 pointer-events-none"
                    )}
                  >
                    {enabled ? p.pdfLabel : "Full paper (PDF soon)"}
                    <ExternalLink className="h-4 w-4 opacity-70" />
                  </a>
                </div>
              );
            })}
          </div>
        </Section>

        {/* Sources */}
        <Section id="sources" eyebrow="Sources" title="Sources used" subtitle="High-level references used to frame the research section.">
          <div className="rounded-3xl bg-white/5 ring-1 ring-white/10 p-6">
            <div className="font-semibold">Research framing</div>
            <BulletList items={CONTENT.research.sources} />
            <div className="mt-4 text-xs text-white/55">
              If you want, you can replace this with direct links to the exact reports you used.
            </div>
          </div>
        </Section>

        {/* About */}
        <Section id="about" eyebrow="About" title={CONTENT.about.title}>
          <div className="grid md:grid-cols-12 gap-6">
            <div className="md:col-span-8 rounded-3xl bg-white/5 ring-1 ring-white/10 p-6">
              {CONTENT.about.text.map((t) => (
                <p key={t} className="text-white/75 leading-relaxed mb-4 last:mb-0">
                  {t}
                </p>
              ))}

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={CONTENT.links.recidivismRepo}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white text-neutral-950 font-semibold hover:opacity-90"
                >
                  <Github className="h-4 w-4" />
                  Recidivism repo
                  <ExternalLink className="h-4 w-4 opacity-70" />
                </a>
                <a
                  href={CONTENT.links.githubProfile}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/10 ring-1 ring-white/10 hover:bg-white/15 text-sm font-semibold"
                >
                  GitHub profile
                  <ExternalLink className="h-4 w-4 opacity-70" />
                </a>
              </div>
            </div>

            <div className="md:col-span-4 rounded-3xl bg-white/5 ring-1 ring-white/10 p-6">
              <div className="text-sm font-semibold">What to add next</div>
              <BulletList
                items={[
                  "Export your slides to images and drop them into public/assets",
                  "Replace placeholder sources with direct report links",
                  "Add a small interactive chart or two when you have real data",
                ]}
              />
            </div>
          </div>
        </Section>

        {/* footer */}
        <footer className="border-t border-white/10">
          <div className="max-w-6xl mx-auto px-4 py-10 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
            <div className="text-sm text-white/60">
              © {new Date().getFullYear()} {CONTENT.siteTitle}
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href={CONTENT.links.githubProfile}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 ring-1 ring-white/10 text-sm"
              >
                <Github className="h-4 w-4" />
                GitHub
              </a>
              <a
                href="#home"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 ring-1 ring-white/10 text-sm"
              >
                Back to top <ArrowRight className="h-4 w-4 opacity-70" />
              </a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
