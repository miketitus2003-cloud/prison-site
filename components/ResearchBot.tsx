// components/ResearchBot.tsx
"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { SITE } from "@/components/siteData";
import { BJS2012, BJS2018 } from "@/components/statsData";

type Role = "user" | "assistant";
type Msg = { role: Role; content: string; ts: number };

function cx(...c: Array<string | false | undefined>) {
  return c.filter(Boolean).join(" ");
}

function clampText(s: string, max = 260) {
  const t = (s ?? "").trim();
  if (t.length <= max) return t;
  return t.slice(0, max - 1).trimEnd() + "…";
}

function isEmpty(v: unknown) {
  return typeof v !== "string" || v.trim().length === 0;
}

function formatPct(v: number) {
  // keep one decimal if needed
  const s = String(v);
  if (s.includes(".")) return `${v.toFixed(1)}%`;
  return `${v}%`;
}

function bulletLines(items: string[]) {
  return items.map((x) => `• ${x}`).join("\n");
}

/**
 * Premium local Research Assistant (free)
 * - No external API calls
 * - Grounded in SITE + BJS stats
 * - Later: swap answerLocally() for /api/chat and keep the UI
 */
export default function ResearchBot() {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<"ask" | "stats" | "sources">("ask");
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);

  const [msgs, setMsgs] = useState<Msg[]>(() => [
    {
      role: "assistant",
      content:
        "Ask me about the research, the model, the policy briefs, or the Stats Lab. I’ll keep it short and grounded in the sources on this site.",
      ts: Date.now(),
    },
  ]);

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // focus input when opened
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => inputRef.current?.focus(), 140);
    return () => clearTimeout(t);
  }, [open]);

  // auto scroll
  useEffect(() => {
    if (!open) return;
    scrollRef.current?.scrollTo({ top: 999999, behavior: "smooth" });
  }, [open, msgs.length, busy]);

  // keyboard shortcuts
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (!open) return;

      if (e.key === "Escape") setOpen(false);

      // Cmd/Ctrl + K focuses input
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const sources = useMemo(
    () => ({
      bjs2012pdf:
        "https://bjs.ojp.gov/sites/g/files/xyckuh236/files/media/document/rpr34s125yfup1217.pdf",
      bjs2018update:
        "https://bjs.ojp.gov/library/publications/2018-update-prisoner-recidivism-9-year-follow-period-2005-2014",
      sourcesPage: "/sources",
      statsPage: "/stats",
      researchPage: "/research",
      policyPage: "/policy",
    }),
    []
  );

  const quickChips = useMemo(
    () => [
      "Give me a 20-second interview summary.",
      "Explain the model in simple terms.",
      "What are the limitations I should admit?",
      "Summarize the main findings in 3 bullets.",
      "Pull 5-year vs 9-year BJS stats.",
      "Summarize the youth sentencing policy brief.",
      "Summarize solitary confinement brief.",
    ],
    []
  );

  const grounded = useMemo(() => {
    // Pull from SITE so the bot stays aligned with your writing
    const research = SITE.research;
    const policy = SITE.policy;

    const bjs2012Year5 = BJS2012.cumulativeArrestOverTime?.slice(-1)?.[0]?.pct;
    const bjs2012Year1 = BJS2012.cumulativeArrestOverTime?.[0]?.pct;

    const bjs2018_3yr = BJS2018.arrestedWithin?.find((x) => x.years === 3)?.pct;
    const bjs2018_9yr = BJS2018.arrestedWithin?.find((x) => x.years === 9)?.pct;

    return {
      title: SITE.overview.title,
      author: SITE.author,

      researchTitle: research.title,
      question: research.question,
      methodBullets: research.methodBullets,
      resultsBullets: research.resultsBullets,
      limitationsBullets: research.limitationsBullets,

      policyBriefs: policy.map((p) => ({
        title: p.title,
        oneLine: p.oneLine,
        bullets: p.bullets,
        bottomLine: p.bottomLine,
      })),

      // stats snapshot for easy responses
      stats: {
        bjs2012: {
          label: "BJS 2012 cohort (34 states)",
          year1: bjs2012Year1,
          year5: bjs2012Year5,
          sex5yr: BJS2012.cumulativeArrest5yrBySex,
          race5yr: BJS2012.cumulativeArrest5yrByRace,
          offense: BJS2012.commitmentOffensePct,
          totalReleased: BJS2012.totalReleased,
        },
        bjs2018: {
          label: "BJS 2005 cohort (9-year follow-up update)",
          threeYear: bjs2018_3yr,
          nineYear: bjs2018_9yr,
          released: BJS2018.cohortReleased2005,
        },
      },

      disclaimer:
        "This is informational. It’s not legal advice. This site is not advocating for crime; it focuses on documented injustice and evidence-based discussion.",
    };
  }, []);

  function makeInterviewSummary() {
    return [
      "Here’s a clean interview summary:",
      "",
      "• I built a research brief on recidivism and reentry support.",
      "• I modeled recidivism using logistic regression with post-release employment as a measurable proxy, plus offense type and time served.",
      "• In this run, employment aligned with lower reoffending, offense type mattered, and time served wasn’t significant.",
      "",
      "If you want, I can tighten that to one sentence.",
    ].join("\n");
  }

  function makeModelExplanationSimple() {
    return [
      "Model explanation (simple):",
      "",
      `• Research question: ${grounded.question}`,
      "• I used logistic regression to estimate how each factor relates to the odds of recidivism while holding other factors constant.",
      "• The result is directional evidence. It’s a relationship, not proof of causation.",
    ].join("\n");
  }

  function makeLimitations() {
    return [
      "Limitations I would say out loud (clean + honest):",
      "",
      bulletLines(grounded.limitationsBullets),
      "",
      "How I defend the proxy without over-claiming:",
      "• Employment is measurable and plausibly tied to reentry support, but it is not the same as program completion.",
      "• That’s why the conclusions stay conservative.",
    ].join("\n");
  }

  function makeFindings3() {
    return [
      "Key findings (3 bullets):",
      "",
      bulletLines(grounded.resultsBullets.slice(0, 3)),
      "",
      "If you want a recruiter version, tell me the job title and I’ll rewrite it.",
    ].join("\n");
  }

  function makePolicyBrief(which: "teens" | "solitary") {
    const match =
      which === "teens"
        ? grounded.policyBriefs.find((p) => p.title.toLowerCase().includes("teen"))
        : grounded.policyBriefs.find((p) => p.title.toLowerCase().includes("solitary"));

    if (!match) {
      return "I couldn’t find that brief in the site data. Check the Policy page.";
    }

    return [
      `${match.title} (short brief):`,
      "",
      clampText(match.oneLine, 400),
      "",
      "Strong points:",
      bulletLines(match.bullets),
      "",
      `Bottom line: ${match.bottomLine}`,
    ].join("\n");
  }

  function makeStatsCompare() {
    const b12 = grounded.stats.bjs2012;
    const b18 = grounded.stats.bjs2018;

    const lines: string[] = [];
    lines.push("BJS stats comparison (quick):");
    lines.push("");

    if (typeof b12.year1 === "number" && typeof b12.year5 === "number") {
      lines.push(
        `• 2012 cohort (34 states): cumulative arrest rises from ${formatPct(b12.year1)} (Year 1) to ${formatPct(
          b12.year5
        )} (Year 5).`
      );
    } else {
      lines.push("• 2012 cohort: see Stats Lab for the full time series.");
    }

    if (typeof b18.threeYear === "number" && typeof b18.nineYear === "number") {
      lines.push(
        `• 2005 cohort (BJS update): arrested within 3 years ${formatPct(
          b18.threeYear
        )}, within 9 years ${formatPct(b18.nineYear)}.`
      );
    } else {
      lines.push("• 2005 cohort (BJS update): open the BJS page for the full set of numbers.");
    }

    lines.push("");
    lines.push("Verify:");
    lines.push(`• BJS 2012 PDF: ${sources.bjs2012pdf}`);
    lines.push(`• BJS 2018 update: ${sources.bjs2018update}`);
    lines.push(`• Stats Lab: ${sources.statsPage}`);

    return lines.join("\n");
  }

  function makeStatsSexRace() {
  const b12 = grounded.stats.bjs2012;

  // supports either:
  // 1) array form: [{ label: "Male", pct: 71.7 }, { label: "Female", pct: 63.1 }]
  // 2) object form: { male: 71.7, female: 63.1 }
  const getPct = (
    v:
      | { label: string; pct: number }[]
      | { [k: string]: number }
      | undefined,
    keyOrLabel: string
  ) => {
    if (!v) return undefined;

    if (Array.isArray(v)) {
      const hit = v.find(
        (x) => x.label.toLowerCase() === keyOrLabel.toLowerCase()
      );
      return hit?.pct;
    }

    // object
    const k = keyOrLabel.toLowerCase();
    // allow "male" or "Male"
    return (v as any)[k] ?? (v as any)[keyOrLabel];
  };

  const male = getPct(b12.sex5yr as any, "Male") ?? getPct(b12.sex5yr as any, "male");
  const female = getPct(b12.sex5yr as any, "Female") ?? getPct(b12.sex5yr as any, "female");

  const white =
    getPct(b12.race5yr as any, "White") ?? getPct(b12.race5yr as any, "white");
  const black =
    getPct(b12.race5yr as any, "Black") ?? getPct(b12.race5yr as any, "black");
  const hispanic =
    getPct(b12.race5yr as any, "Hispanic") ??
    getPct(b12.race5yr as any, "hispanic");

  const out: string[] = [];
  out.push("Breakdowns from the BJS 2012 cohort (Year 5):");
  out.push("");

  if (typeof male === "number" && typeof female === "number") {
    out.push(
      `• Sex: male ${formatPct(male)} vs female ${formatPct(female)} (cumulative arrest).`
    );
  } else {
    out.push("• Sex: see Stats Lab for the breakdown chart.");
  }

  if (
    typeof white === "number" &&
    typeof black === "number" &&
    typeof hispanic === "number"
  ) {
    out.push(
      `• Race/ethnicity: White ${formatPct(white)}, Black ${formatPct(
        black
      )}, Hispanic ${formatPct(hispanic)} (cumulative arrest).`
    );
  } else {
    out.push("• Race/ethnicity: see Stats Lab for the breakdown chart.");
  }

  out.push("");
  out.push("Verify:");
  out.push(`• BJS 2012 PDF: ${sources.bjs2012pdf}`);
  out.push(`• Stats Lab: ${sources.statsPage}`);

  return out.join("\n");
}
  function makeOffenseMix() {
    const o = grounded.stats.bjs2012.offense;
    if (!o) return "Offense distribution is not available in the current stats dataset.";
    return [
      "Most serious commitment offense mix (BJS 2012 cohort):",
      "",
      `• Violent: ${formatPct(o.violent)}`,
      `• Property: ${formatPct(o.property)}`,
      `• Drug: ${formatPct(o.drug)}`,
      `• Public order: ${formatPct(o.publicOrder)}`,
      "",
      "Verify:",
      `• BJS 2012 PDF: ${sources.bjs2012pdf}`,
      `• Stats Lab: ${sources.statsPage}`,
    ].join("\n");
  }

  function answerLocally(userText: string) {
    const q = userText.toLowerCase();

    // Interview / recruiter
    if (q.includes("interview") || q.includes("recruiter") || q.includes("20-second") || q.includes("elevator")) {
      return makeInterviewSummary();
    }

    // Model / method
    if (q.includes("model") || q.includes("logistic") || q.includes("logit") || q.includes("method")) {
      return makeModelExplanationSimple();
    }

    // Limitations / proxy
    if (q.includes("limit") || q.includes("weakness") || q.includes("proxy")) {
      return makeLimitations();
    }

    // Findings
    if (q.includes("finding") || q.includes("result") || q.includes("summary") || q.includes("key")) {
      return makeFindings3();
    }

    // Policy: teens/death penalty
    if (q.includes("teen") || q.includes("juvenile") || q.includes("death")) {
      return makePolicyBrief("teens");
    }

    // Policy: solitary
    if (q.includes("solitary") || q.includes("isolation")) {
      return makePolicyBrief("solitary");
    }

    // Stats
    if (q.includes("bjs") || q.includes("34 states") || q.includes("5-year") || q.includes("9-year") || q.includes("over time")) {
      return makeStatsCompare();
    }

    if (q.includes("sex") || q.includes("female") || q.includes("male") || q.includes("race") || q.includes("hispanic") || q.includes("black") || q.includes("white")) {
      return makeStatsSexRace();
    }

    if (q.includes("offense") || q.includes("violent") || q.includes("property") || q.includes("drug") || q.includes("public order")) {
      return makeOffenseMix();
    }

    // Default
    return [
      "Tell me what you want:",
      "",
      "• interview summary",
      "• method explanation",
      "• limitations/proxy defense",
      "• key findings",
      "• BJS stats (5-year vs 9-year, sex/race, offense mix)",
      "",
      "If you type “stats,” I’ll pull from the Stats Lab dataset.",
    ].join("\n");
  }

  async function send(text: string) {
    const t = (text ?? "").trim();
    if (!t || busy) return;

    setMsgs((m) => [...m, { role: "user", content: t, ts: Date.now() }]);
    setInput("");
    setBusy(true);

    // premium “thinking” delay
    await new Promise((r) => setTimeout(r, 420));

    const a = answerLocally(t);

    setMsgs((m) => [...m, { role: "assistant", content: a, ts: Date.now() }]);
    setBusy(false);
  }

  function clearChat() {
    setMsgs([
      {
        role: "assistant",
        content:
          "Chat cleared. Ask about research, policy, or stats. I’ll keep it grounded in this site’s sources.",
        ts: Date.now(),
      },
    ]);
    setTab("ask");
  }

  // Small helper panel for stats tab (looks premium, zero fluff)
  function StatsPanel() {
    const b12 = grounded.stats.bjs2012;
    const b18 = grounded.stats.bjs2018;

    return (
      <div className="space-y-4">
        <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-4">
          <div className="text-xs uppercase tracking-widest text-white/60">BJS 2012 cohort</div>
          <div className="mt-2 text-sm text-white/80 leading-relaxed">
            {typeof b12.year1 === "number" && typeof b12.year5 === "number" ? (
              <>
                Cumulative arrest rises from <span className="font-semibold text-white">{formatPct(b12.year1)}</span> (Year 1)
                to <span className="font-semibold text-white">{formatPct(b12.year5)}</span> (Year 5).
              </>
            ) : (
              <>Open Stats Lab for the full time series chart.</>
            )}
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              onClick={() => send("Pull 5-year vs 9-year BJS stats.")}
              className="text-xs px-3 py-2 rounded-2xl bg-white/5 hover:bg-white/10 ring-1 ring-white/10 text-white/80 transition"
            >
              Compare 5 vs 9 years
            </button>
            <button
              onClick={() => send("Show sex and race breakdown stats.")}
              className="text-xs px-3 py-2 rounded-2xl bg-white/5 hover:bg-white/10 ring-1 ring-white/10 text-white/80 transition"
            >
              Sex and race
            </button>
            <button
              onClick={() => send("Show the offense mix breakdown.")}
              className="text-xs px-3 py-2 rounded-2xl bg-white/5 hover:bg-white/10 ring-1 ring-white/10 text-white/80 transition"
            >
              Offense mix
            </button>
          </div>
        </div>

        <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-4">
          <div className="text-xs uppercase tracking-widest text-white/60">BJS 2018 update</div>
          <div className="mt-2 text-sm text-white/80 leading-relaxed">
            {typeof b18.threeYear === "number" && typeof b18.nineYear === "number" ? (
              <>
                Arrested within 3 years <span className="font-semibold text-white">{formatPct(b18.threeYear)}</span>, within 9 years{" "}
                <span className="font-semibold text-white">{formatPct(b18.nineYear)}</span>.
              </>
            ) : (
              <>Open the BJS update page for the complete set of numbers.</>
            )}
          </div>
        </div>

        <div className="text-[11px] text-white/55 leading-relaxed">
          Sources:{" "}
          <a className="text-white/75 hover:text-white underline" href={sources.bjs2012pdf} target="_blank" rel="noreferrer">
            BJS 2012 PDF
          </a>{" "}
          and{" "}
          <a className="text-white/75 hover:text-white underline" href={sources.bjs2018update} target="_blank" rel="noreferrer">
            BJS 2018 update
          </a>
          . Stats visuals live on{" "}
          <a className="text-white/75 hover:text-white underline" href={sources.statsPage}>
            Stats Lab
          </a>
          .
        </div>
      </div>
    );
  }

  function SourcesPanel() {
    return (
      <div className="space-y-4">
        <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-4">
          <div className="text-xs uppercase tracking-widest text-white/60">Primary verification</div>
          <div className="mt-2 text-sm text-white/80 leading-relaxed">
            If someone wants to check a claim, the fastest path is Stats Lab for numbers and Sources for citations.
          </div>

          <div className="mt-3 grid gap-2">
            <a
              href={sources.statsPage}
              className="rounded-2xl bg-white/5 hover:bg-white/10 ring-1 ring-white/10 p-3 transition"
            >
              <div className="text-sm font-semibold text-white">Open Stats Lab</div>
              <div className="mt-1 text-xs text-white/55">Charts built from BJS reporting</div>
            </a>

            <a
              href={sources.sourcesPage}
              className="rounded-2xl bg-white/5 hover:bg-white/10 ring-1 ring-white/10 p-3 transition"
            >
              <div className="text-sm font-semibold text-white">Open Sources</div>
              <div className="mt-1 text-xs text-white/55">Primary links and readings</div>
            </a>

            <a
              href={sources.bjs2012pdf}
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl bg-white/5 hover:bg-white/10 ring-1 ring-white/10 p-3 transition"
            >
              <div className="text-sm font-semibold text-white">BJS 2012 PDF</div>
              <div className="mt-1 text-xs text-white/55 break-all">{sources.bjs2012pdf}</div>
            </a>

            <a
              href={sources.bjs2018update}
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl bg-white/5 hover:bg-white/10 ring-1 ring-white/10 p-3 transition"
            >
              <div className="text-sm font-semibold text-white">BJS 2018 update</div>
              <div className="mt-1 text-xs text-white/55 break-all">{sources.bjs2018update}</div>
            </a>
          </div>
        </div>

        <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-4">
          <div className="text-xs uppercase tracking-widest text-white/60">Positioning</div>
          <div className="mt-2 text-sm text-white/80 leading-relaxed">
            {grounded.disclaimer}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Floating launcher: bigger, obvious, still tasteful */}
      <div className="fixed right-5 bottom-5 z-[99999]">
        <button
          onClick={() => setOpen(true)}
          className={cx(
            "group relative flex items-center gap-3 rounded-full",
            "px-5 py-3.5 min-w-[220px]",
            "bg-neutral-950/80 backdrop-blur-xl ring-1 ring-white/15",
            "shadow-[0_22px_70px_rgba(0,0,0,0.38)]",
            "hover:bg-neutral-950/88 active:scale-[0.99] transition"
          )}
          aria-label="Open research assistant"
        >
          <span className="relative grid place-items-center h-11 w-11 rounded-full overflow-hidden">
            <span className="absolute inset-0 bg-gradient-to-br from-indigo-400/95 via-cyan-300/90 to-emerald-300/90" />
            <span className="relative text-neutral-950 font-black text-sm">AI</span>
          </span>

          <span className="text-left">
            <span className="block text-sm font-semibold text-white leading-tight">
              Research Assistant
            </span>
            <span className="block text-xs text-white/70 leading-tight">
              grounded answers + stats
            </span>
          </span>

          <span className="ml-auto text-white/55 text-xs hidden sm:inline">
            ⌘K
          </span>
        </button>
      </div>

      {/* Modal */}
      {open ? (
        <div className="fixed inset-0 z-[99998]">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/45 backdrop-blur-[2px]"
            onClick={() => setOpen(false)}
          />

          {/* Panel */}
          <div className="absolute right-5 bottom-5 w-[94vw] max-w-[460px]">
            <div className="overflow-hidden rounded-3xl ring-1 ring-white/12 bg-neutral-950/82 backdrop-blur-xl shadow-[0_30px_100px_rgba(0,0,0,0.58)]">
              {/* Header */}
              <div className="p-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-2xl bg-white/10 ring-1 ring-white/10 grid place-items-center overflow-hidden">
                    <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-indigo-400 via-cyan-300 to-emerald-300" />
                  </div>

                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-white leading-tight">
                      Research Assistant
                    </div>
                    <div className="text-xs text-white/60 truncate">
                      Short, grounded answers • Esc closes
                    </div>
                  </div>

                  <div className="ml-auto flex items-center gap-2">
                    <button
                      onClick={clearChat}
                      className="text-xs px-3 py-1.5 rounded-full bg-white/8 hover:bg-white/12 ring-1 ring-white/10 text-white/80 transition"
                    >
                      Clear
                    </button>
                    <button
                      onClick={() => setOpen(false)}
                      className="text-xs px-3 py-1.5 rounded-full bg-white/8 hover:bg-white/12 ring-1 ring-white/10 text-white/80 transition"
                    >
                      Close
                    </button>
                  </div>
                </div>

                {/* Tabs */}
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => setTab("ask")}
                    className={cx(
                      "px-3 py-2 rounded-2xl text-xs font-semibold ring-1 transition",
                      tab === "ask"
                        ? "bg-white text-neutral-950 ring-white/10"
                        : "bg-white/5 text-white/70 ring-white/10 hover:bg-white/10"
                    )}
                  >
                    Ask
                  </button>
                  <button
                    onClick={() => setTab("stats")}
                    className={cx(
                      "px-3 py-2 rounded-2xl text-xs font-semibold ring-1 transition",
                      tab === "stats"
                        ? "bg-white text-neutral-950 ring-white/10"
                        : "bg-white/5 text-white/70 ring-white/10 hover:bg-white/10"
                    )}
                  >
                    Stats
                  </button>
                  <button
                    onClick={() => setTab("sources")}
                    className={cx(
                      "px-3 py-2 rounded-2xl text-xs font-semibold ring-1 transition",
                      tab === "sources"
                        ? "bg-white text-neutral-950 ring-white/10"
                        : "bg-white/5 text-white/70 ring-white/10 hover:bg-white/10"
                    )}
                  >
                    Sources
                  </button>
                </div>
              </div>

              {/* Body */}
              <div className="p-4">
                {tab === "stats" ? (
                  <StatsPanel />
                ) : tab === "sources" ? (
                  <SourcesPanel />
                ) : (
                  <>
                    {/* Quick chips */}
                    <div className="flex flex-wrap gap-2">
                      {quickChips.slice(0, 6).map((s) => (
                        <button
                          key={s}
                          onClick={() => send(s)}
                          className="text-xs px-3 py-2 rounded-2xl bg-white/5 hover:bg-white/10 ring-1 ring-white/10 text-white/80 transition"
                        >
                          {s}
                        </button>
                      ))}
                    </div>

                    {/* Messages */}
                    <div
                      ref={scrollRef}
                      className="mt-4 h-[340px] overflow-auto pr-1"
                    >
                      <div className="space-y-3">
                        {msgs.map((m) => (
                          <div
                            key={m.ts + m.role}
                            className={cx(
                              "max-w-[92%] rounded-3xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap",
                              m.role === "user"
                                ? "ml-auto bg-white text-neutral-950"
                                : "bg-white/7 text-white ring-1 ring-white/10"
                            )}
                          >
                            {m.content}
                          </div>
                        ))}

                        {busy ? (
                          <div className="max-w-[92%] rounded-3xl px-4 py-3 text-sm bg-white/7 text-white ring-1 ring-white/10">
                            <span className="inline-flex items-center gap-2 text-white/80">
                              <span className="h-2 w-2 rounded-full bg-white/70 animate-pulse" />
                              Thinking…
                            </span>
                          </div>
                        ) : null}
                      </div>
                    </div>

                    {/* Input */}
                    <div className="mt-4 flex items-center gap-2">
                      <div className="flex-1 relative">
                        <input
                          ref={inputRef}
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") send(input);
                          }}
                          placeholder="Ask about methods, results, limitations, stats…"
                          className="w-full rounded-2xl bg-white/5 ring-1 ring-white/10 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:ring-2 focus:ring-white/20"
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-white/40">
                          Enter
                        </div>
                      </div>

                      <button
                        onClick={() => send(input)}
                        disabled={busy}
                        className={cx(
                          "rounded-2xl px-4 py-3 text-sm font-semibold transition",
                          busy
                            ? "bg-white/10 text-white/40 ring-1 ring-white/10 cursor-not-allowed"
                            : "bg-gradient-to-br from-indigo-400 via-cyan-300 to-emerald-300 text-neutral-950 hover:opacity-95"
                        )}
                      >
                        Send
                      </button>
                    </div>

                    <div className="mt-2 text-[11px] text-white/45">
                      Tip: press <span className="text-white/70">⌘K</span> to focus input •{" "}
                      <span className="text-white/70">Esc</span> to close
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
