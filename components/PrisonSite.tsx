"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  ExternalLink,
  FileText,
  Github,
  LineChart,
  Menu,
  Scale,
  ShieldAlert,
  X,
} from "lucide-react";

type LinkItem = { label: string; href: string };
type Slide = { src: string; caption: string };
type PolicyCard = {
  title: string;
  icon: React.ElementType;
  oneLine: string;
  bullets: string[];
  bottomLine: string;
  pdfHref?: string; // put a /docs/... link here if you have it
};

const CONTENT = {
  title: "Prison Education and Recidivism",
  subtitle: "Research brief + policy notes",
  authorLine: "Michael Parham",
  abstract:
    "Using post-release employment as a proxy for education and reentry support, I tested how employment, offense type, and time served relate to recidivism. The policy notes connect the research to youth punishment and solitary confinement.",
  links: {
    githubProfile: "https://github.com/miketitus2003-cloud",
    repo: "https://github.com/miketitus2003-cloud/prison-education-recidivism-analysis-standalone",
  },

  stats: [
    { label: "Re-arrest rate", value: "62% within 3 years", note: "34 states, 2012 cohort" },
    { label: "Education link", value: "43% lower odds", note: "reported in prior research" },
    { label: "Proxy used here", value: "Employment after release", note: "measurable reentry signal" },
  ],

  research: {
    sections: [
      {
        title: "Why this topic matters",
        body: [
          "Recidivism is not just a number. It affects people, families, and community safety.",
          "Education in prison is linked to lower recidivism, but many public datasets do not track program type, time in program, or dosage.",
          "To keep the analysis measurable, I used employment after release as a proxy for education and reentry support.",
        ],
      },
      {
        title: "Research question",
        body: ["What is the relationship between employment (proxy), offense type, time served, and recidivism?"],
      },
    ],
    method: [
      "Outcome: recidivism (1 = reoffended, 0 = did not)",
      "Predictors: employed (yes/no), offense type (violent vs drug), time served (years)",
      "Model: logistic regression (statsmodels Logit) in Python",
      "Data: simulated dataset modeled on national patterns (directional illustration, not causal estimate)",
    ],
    keyFindings: [
      "Employed after release was associated with a much lower likelihood of reoffending",
      "Violent offense type was associated with a higher likelihood of return",
      "Time served was not statistically significant in this run",
    ],
    implications: [
      "Shift attention from sentence length to in-prison programming and reentry support",
      "Programs that improve job outcomes can reduce returns and improve community safety",
    ],
    nextSteps: [
      "Add real education participation data when available",
      "Test with state or local administrative records",
      "Include parole status, demographics, and support systems",
    ],
    // You have slides 01-07 in public/assets already
    slides: [
      { src: "/assets/slide_01.png", caption: "Project title" },
      { src: "/assets/slide_02.png", caption: "Background and motivation" },
      { src: "/assets/slide_03.png", caption: "Research question and variables" },
      { src: "/assets/slide_04.png", caption: "Method overview (Logit model)" },
      { src: "/assets/slide_05.png", caption: "Results summary" },
      { src: "/assets/slide_06.png", caption: "Implications and next steps" },
      { src: "/assets/slide_07.png", caption: "Slide 7" },
    ] as Slide[],
  },

  policy: {
    intro:
      "Short, readable points. No full essay walls. If you add PDFs in public/docs, link them here for the full version.",
    cards: [
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
        // pdfHref: "/docs/solitary-confinement.pdf",
      },
      {
        title: "Why solitary should not be used",
        icon: FileText,
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
    ] as PolicyCard[],
  },

  sources: [
    {
      label: "BJS - Recidivism (topic page)",
      href: "https://bjs.ojp.gov/topics/recidivism",
    },
    {
      label: "RAND (2013) - Evaluating the Effectiveness of Correctional Education",
      href: "https://www.rand.org/pubs/research_reports/RR266.html",
    },
    {
      label: "BJS - Prisoner Recidivism Study updates (BJS publications page)",
      href: "https://bjs.ojp.gov/library/publications/list?field_keywords_target_id%5B0%5D=Recidivism",
    },
  ] as LinkItem[],

  about: {
    title: "About this site",
    bullets: [
      "Built as a clean research brief: clear question, method, findings, and next steps",
      "Designed to be readable first, then link out to code and longer writing",
      "Everything here is educational, not legal advice",
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

function BulletList({ items, dense }: { items: string[]; dense?: boolean }) {
  return (
    <ul className={cx("text-white/75 leading-relaxed", dense ? "space-y-1.5" : "space-y-2.5")}>
      {items.map((b) => (
        <li key={b} className="flex gap-3">
          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-white/60" />
          <span>{b}</span>
        </li>
      ))}
    </ul>
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
          {eyebrow ? <div className="text-xs uppercase tracking-widest text-white/60">{eyebrow}</div> : null}
          <h2 className="mt-2 text-2xl md:text-3xl font-semibold text-white">{title}</h2>
          {subtitle ? <p className="mt-3 text-white/70 leading-relaxed">{subtitle}</p> : null}
        </div>
        <div className="mt-8">{children}</div>
      </div>
    </section>
  );
}

function CardShell({ children }: { children: React.ReactNode }) {
  return <div className="rounded-3xl bg-white/5 ring-1 ring-white/10 p-6">{children}</div>;
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

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      {/* background */}
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
              <div className="text-sm font-semibold leading-none">{CONTENT.title}</div>
              <div className="text-xs text-white/60">{CONTENT.subtitle}</div>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-1">
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
                {CONTENT.title}
              </motion.h1>

              <div className="mt-3 text-sm text-white/60">{CONTENT.authorLine}</div>

              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.06 }}
                className="mt-4 text-white/75 text-base md:text-lg leading-relaxed"
              >
                {CONTENT.abstract}
              </motion.p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="#research"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white text-neutral-950 font-semibold hover:opacity-90"
                >
                  Read the research <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href={CONTENT.links.repo}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/10 ring-1 ring-white/10 hover:bg-white/15 text-white font-semibold"
                >
                  View code <ExternalLink className="h-4 w-4 opacity-70" />
                </a>
              </div>

              <div className="mt-8 rounded-3xl bg-white/5 ring-1 ring-white/10 p-6">
                <div className="text-sm font-semibold">At a glance</div>
                <div className="mt-4 grid sm:grid-cols-3 gap-3">
                  {CONTENT.stats.map((s) => (
                    <div key={s.label} className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-4">
                      <div className="text-xs text-white/60">{s.label}</div>
                      <div className="text-sm font-semibold mt-1">{s.value}</div>
                      <div className="text-xs text-white/55 mt-1">{s.note}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="md:col-span-5">
              <CardShell>
                <div className="text-sm font-semibold">Quick navigation</div>
                <div className="mt-4 grid gap-3">
                  <a
                    href="#research"
                    className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-4 hover:bg-white/10 transition"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="font-semibold">Research brief</div>
                        <div className="text-sm text-white/70 mt-1">Question, method, findings</div>
                      </div>
                      <LineChart className="h-4 w-4 opacity-70 mt-1" />
                    </div>
                  </a>

                  <a
                    href="#policy"
                    className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-4 hover:bg-white/10 transition"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="font-semibold">Policy notes</div>
                        <div className="text-sm text-white/70 mt-1">Youth punishment, solitary</div>
                      </div>
                      <ShieldAlert className="h-4 w-4 opacity-70 mt-1" />
                    </div>
                  </a>

                  <a
                    href="#sources"
                    className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-4 hover:bg-white/10 transition"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="font-semibold">Sources</div>
                        <div className="text-sm text-white/70 mt-1">BJS and RAND links</div>
                      </div>
                      <BookOpen className="h-4 w-4 opacity-70 mt-1" />
                    </div>
                  </a>
                </div>

                <div className="mt-5 text-xs text-white/55">
                  Slide images load from public/assets as slide_01.png to slide_07.png.
                </div>
              </CardShell>
            </div>
          </div>
        </div>

        {/* research */}
        <Section id="research" eyebrow="Research" title="Research brief">
          <div className="grid lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 space-y-4">
              {CONTENT.research.sections.map((s) => (
                <CardShell key={s.title}>
                  <div className="font-semibold">{s.title}</div>
                  <div className="mt-3 space-y-2 text-sm text-white/75 leading-relaxed">
                    {s.body.map((p) => (
                      <p key={p}>{p}</p>
                    ))}
                  </div>
                </CardShell>
              ))}
            </div>

            <CardShell>
              <div className="flex items-center gap-3">
                <IconBadge Icon={Scale} />
                <div>
                  <div className="font-semibold">Method</div>
                  <div className="text-xs text-white/60 mt-1">How the test was set up</div>
                </div>
              </div>
              <div className="mt-4">
                <BulletList items={CONTENT.research.method} dense />
              </div>

              <a
                href={CONTENT.links.repo}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white hover:opacity-90"
              >
                Repo and notebooks <ExternalLink className="h-4 w-4 opacity-70" />
              </a>
            </CardShell>
          </div>

          <div className="mt-6 grid md:grid-cols-3 gap-4">
            <CardShell>
              <div className="flex items-center gap-3">
                <IconBadge Icon={LineChart} />
                <div className="font-semibold">Key findings</div>
              </div>
              <div className="mt-4">
                <BulletList items={CONTENT.research.keyFindings} />
              </div>
            </CardShell>

            <CardShell>
              <div className="flex items-center gap-3">
                <IconBadge Icon={ShieldAlert} />
                <div className="font-semibold">Implications</div>
              </div>
              <div className="mt-4">
                <BulletList items={CONTENT.research.implications} />
              </div>
            </CardShell>

            <CardShell>
              <div className="flex items-center gap-3">
                <IconBadge Icon={ArrowRight} />
                <div className="font-semibold">Next steps</div>
              </div>
              <div className="mt-4">
                <BulletList items={CONTENT.research.nextSteps} />
              </div>
            </CardShell>
          </div>

          <div className="mt-6 grid md:grid-cols-2 gap-4">
            <CardShell>
              <div className="font-semibold">Limitations</div>
              <div className="mt-4">
                <BulletList
                  items={[
                    "Simulated data illustrates direction of effects, not causality",
                    "Employment is a proxy, not direct education participation data",
                    "Replication needs richer controls and administrative records",
                  ]}
                />
              </div>
            </CardShell>

            <CardShell>
              <div className="font-semibold">Slide highlights</div>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {CONTENT.research.slides.map((s) => (
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
              <div className="mt-4 text-xs text-white/55">
                If a slide is missing, it will hide automatically. Make sure filenames match exactly.
              </div>
            </CardShell>
          </div>
        </Section>

        {/* policy */}
        <Section
          id="policy"
          eyebrow="Policy"
          title="Policy notes"
          subtitle={CONTENT.policy.intro}
        >
          <div className="grid md:grid-cols-3 gap-4">
            {CONTENT.policy.cards.map((p) => {
              const enabled = Boolean(p.pdfHref);
              return (
                <CardShell key={p.title}>
                  <div className="flex items-center gap-3">
                    <IconBadge Icon={p.icon} />
                    <div className="font-semibold">{p.title}</div>
                  </div>

                  <p className="mt-3 text-sm text-white/75 leading-relaxed">{p.oneLine}</p>

                  <div className="mt-4">
                    <BulletList items={p.bullets} />
                  </div>

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
                    Full paper (PDF)
                    <ExternalLink className="h-4 w-4 opacity-70" />
                  </a>
                </CardShell>
              );
            })}
          </div>
        </Section>

        {/* sources */}
        <Section
          id="sources"
          eyebrow="Sources"
          title="Sources used"
          subtitle="Direct links to the core references used for the research framing."
        >
          <CardShell>
            <div className="grid gap-3">
              {CONTENT.sources.map((s) => (
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
          </CardShell>
        </Section>

        {/* about */}
        <Section id="about" eyebrow="About" title={CONTENT.about.title}>
          <div className="grid md:grid-cols-12 gap-6">
            <div className="md:col-span-8">
              <CardShell>
                <div className="flex items-center gap-3">
                  <IconBadge Icon={FileText} />
                  <div>
                    <div className="font-semibold">Purpose</div>
                    <div className="text-xs text-white/60 mt-1">What this portfolio is showing</div>
                  </div>
                </div>
                <div className="mt-4">
                  <BulletList items={CONTENT.about.bullets} />
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href={CONTENT.links.repo}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white text-neutral-950 font-semibold hover:opacity-90"
                  >
                    <Github className="h-4 w-4" />
                    Repo
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
              </CardShell>
            </div>

            <div className="md:col-span-4">
              <CardShell>
                <div className="text-sm font-semibold">Site notes</div>
                <div className="mt-3 text-sm text-white/70 leading-relaxed">
                  Want this to feel even more like a research site? Add a Methods PDF, a short References page,
                  and a single figure recreated as a chart instead of an image.
                </div>
              </CardShell>
            </div>
          </div>
        </Section>

        {/* footer */}
        <footer className="border-t border-white/10">
          <div className="max-w-6xl mx-auto px-4 py-10 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
            <div className="text-sm text-white/60">
              © {new Date().getFullYear()} {CONTENT.authorLine}
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
                Back to top
                <ArrowRight className="h-4 w-4 opacity-70" />
              </a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
