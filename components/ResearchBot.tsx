"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { SITE } from "@/components/siteData";
import { BJS2012, BJS2018 } from "@/components/statsData";

type Role = "user" | "assistant";
type Msg = { role: Role; content: string; ts: number };

function cx(...c: Array<string | false | undefined>) {
  return c.filter(Boolean).join(" ");
}

function formatPct(v: number | undefined) {
  if (typeof v !== "number") return "n/a";
  const hasDecimal = String(v).includes(".");
  return hasDecimal ? `${v.toFixed(1)}%` : `${v}%`;
}

function pickPct(arr: Array<{ label: string; pct: number }>, label: string) {
  const hit = arr.find((x) => x.label.toLowerCase() === label.toLowerCase());
  return hit?.pct;
}

function clampText(s: string, max = 280) {
  const t = (s ?? "").trim();
  if (t.length <= max) return t;
  return t.slice(0, max - 1).trimEnd() + "…";
}

export default function ResearchBot() {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<"ask" | "stats" | "sources">("ask");
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>(() => [
    {
      role: "assistant",
      content:
        "Ask me about the dashboard, insights, or policy briefs. I keep answers short and grounded in this site’s sources.",
      ts: Date.now(),
    },
  ]);

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => inputRef.current?.focus(), 140);
    return () => clearTimeout(t);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    scrollRef.current?.scrollTo({ top: 999999, behavior: "smooth" });
  }, [open, msgs.length, busy]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (!open) return;
      if (e.key === "Escape") setOpen(false);
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
      statsPage: "/stats",
      sourcesPage: "/sources",
      policyPage: "/policy",
      insightsPage: "/research",
    }),
    []
  );

  const quickChips = useMemo(
    () => [
      "Give me a 20-second summary.",
      "Explain recidivism in plain English.",
      "What are the main findings on the Insights page?",
      "What are the biggest limitations to admit?",
      "Pull key dashboard numbers (year 1 vs year 5).",
      "Show sex and race breakdowns at year 5.",
      "Summarize the policy briefs as decisions.",
    ],
    []
  );

  function makeRecidivismDefinition() {
    return [
      `${SITE.glossary.recidivism.term} (plain English):`,
      "",
      SITE.glossary.recidivism.plain,
      "",
      "Why it matters:",
      SITE.glossary.recidivism.whyItMatters,
    ].join("\n");
  }

  function make20SecondSummary() {
    return [
      "20-second summary:",
      "",
      "• I built a public-facing dashboard and brief-style writeup using primary justice statistics.",
      "• The dashboard makes recidivism patterns legible and verifiable with source links.",
      "• The Insights page explains a directional model framing and clearly states limits (no causality).",
    ].join("\n");
  }

  function makeInsightsSummary() {
    return [
      "Insights summary:",
      "",
      `Question: ${SITE.research.question}`,
      "",
      "Findings (directional):",
      ...SITE.research.resultsBullets.map((x) => `• ${x}`),
      "",
      "Limits (transparent):",
      ...SITE.research.limitationsBullets.map((x) => `• ${x}`),
    ].join("\n");
  }

  function makeLimitations() {
    return [
      "Limitations to admit cleanly:",
      "",
      ...SITE.research.limitationsBullets.map((x) => `• ${x}`),
      "",
      "Positioning rule:",
      "• Use association language. Do not imply causation.",
    ].join("\n");
  }

  function makeDashboardKeyNumbers() {
    const year1 = BJS2012.cumulativeArrestOverTime[0]?.pct;
    const year5 = BJS2012.cumulativeArrestOverTime[BJS2012.cumulativeArrestOverTime.length - 1]?.pct;

    return [
      "Dashboard numbers (BJS 2012 cohort, 34 states):",
      "",
      `• Cumulative arrest Year 1: ${formatPct(year1)}`,
      `• Cumulative arrest Year 5: ${formatPct(year5)}`,
      "",
      `Verify: ${sources.bjs2012pdf}`,
    ].join("\n");
  }

  function makeSexRaceBreakdowns() {
    const male = pickPct(BJS2012.cumulativeArrest5yrBySex, "Male");
    const female = pickPct(BJS2012.cumulativeArrest5yrBySex, "Female");

    const white = pickPct(BJS2012.cumulativeArrest5yrByRace, "White");
    const black = pickPct(BJS2012.cumulativeArrest5yrByRace, "Black");
    const hispanic = pickPct(BJS2012.cumulativeArrest5yrByRace, "Hispanic");

    return [
      "Breakdowns at year 5 (BJS 2012 cohort):",
      "",
      `• Sex: Male ${formatPct(male)} vs Female ${formatPct(female)}`,
      `• Race/ethnicity: White ${formatPct(white)}, Black ${formatPct(black)}, Hispanic ${formatPct(hispanic)}`,
      "",
      `Verify: ${sources.bjs2012pdf}`,
    ].join("\n");
  }

  function makePolicyDecisionSummary() {
    return [
      "Policy briefs as decision memos (short):",
      "",
      ...SITE.policy.map((p) => {
        return [
          `${p.title}:`,
          `• Summary: ${clampText(p.oneLine, 180)}`,
          `• Owner: ${p.memo.owner}`,
          `• Timeline: ${p.memo.timeline}`,
          `• Success metrics: ${p.memo.successMetrics.slice(0, 2).join(", ")}`,
          "",
        ].join("\n");
      }),
      "For full detail, open the Policy briefs page.",
    ].join("\n");
  }

  function answerLocally(userText: string) {
    const q = userText.toLowerCase();

    if (q.includes("recidivism") || q.includes("define") || q.includes("what does")) {
      return makeRecidivismDefinition();
    }
    if (q.includes("20") || q.includes("summary") || q.includes("elevator") || q.includes("recruiter")) {
      return make20SecondSummary();
    }
    if (q.includes("insight") || q.includes("finding") || q.includes("method") || q.includes("model")) {
      return makeInsightsSummary();
    }
    if (q.includes("limit") || q.includes("proxy") || q.includes("weakness")) {
      return makeLimitations();
    }
    if (q.includes("dashboard") || q.includes("year 1") || q.includes("year 5") || q.includes("over time")) {
      return makeDashboardKeyNumbers();
    }
    if (q.includes("sex") || q.includes("race") || q.includes("male") || q.includes("female") || q.includes("black") || q.includes("white") || q.includes("hispanic")) {
      return makeSexRaceBreakdowns();
    }
    if (q.includes("policy") || q.includes("owner") || q.includes("timeline") || q.includes("decision")) {
      return makePolicyDecisionSummary();
    }

    return [
      "Try one of these:",
      "• Define recidivism",
      "• Pull dashboard numbers",
      "• Summarize Insights",
      "• Summarize policy briefs",
      "",
      "Or click the chips above.",
    ].join("\n");
  }

  async function send(text: string) {
    const t = (text ?? "").trim();
    if (!t || busy) return;

    setMsgs((m) => [...m, { role: "user", content: t, ts: Date.now() }]);
    setInput("");
    setBusy(true);

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
          "Chat cleared. Ask about the dashboard, insights, policy briefs, or definitions.",
        ts: Date.now(),
      },
    ]);
    setTab("ask");
  }

  function StatsPanel() {
    const y1 = BJS2012.cumulativeArrestOverTime[0]?.pct;
    const y5 = BJS2012.cumulativeArrestOverTime[BJS2012.cumulativeArrestOverTime.length - 1]?.pct;

    return (
      <div className="space-y-3">
        <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-4">
          <div className="text-xs uppercase tracking-widest text-white/60">Key pattern</div>
          <div className="mt-2 text-sm text-white/80">
            Year 1 {formatPct(y1)} to Year 5 {formatPct(y5)} in the 2012 cohort.
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              onClick={() => send("Pull key dashboard numbers (year 1 vs year 5).")}
              className="text-xs px-3 py-2 rounded-2xl bg-white/5 hover:bg-white/10 ring-1 ring-white/10 text-white/80 transition"
            >
              Year 1 vs Year 5
            </button>
            <button
              onClick={() => send("Show sex and race breakdowns at year 5.")}
              className="text-xs px-3 py-2 rounded-2xl bg-white/5 hover:bg-white/10 ring-1 ring-white/10 text-white/80 transition"
            >
              Sex and race
            </button>
          </div>
        </div>

        <div className="text-[11px] text-white/55">
          Verify on Dashboard:{" "}
          <a className="underline text-white/75" href={sources.statsPage}>
            {sources.statsPage}
          </a>
        </div>
      </div>
    );
  }

  function SourcesPanel() {
    return (
      <div className="space-y-3">
        <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-4">
          <div className="text-xs uppercase tracking-widest text-white/60">Primary sources</div>
          <div className="mt-2 grid gap-2">
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
            <a
              href={sources.sourcesPage}
              className="rounded-2xl bg-white/5 hover:bg-white/10 ring-1 ring-white/10 p-3 transition"
            >
              <div className="text-sm font-semibold text-white">Sources page</div>
              <div className="mt-1 text-xs text-white/55">Claim mapping and quality labels</div>
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="fixed right-5 bottom-5 z-[99999]">
        <button
          onClick={() => setOpen(true)}
          className={cx(
            "group relative flex items-center gap-3 rounded-full",
            "px-5 py-3.5 min-w-[230px]",
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

          <span className="ml-auto text-white/55 text-xs hidden sm:inline">⌘K</span>
        </button>
      </div>

      {open ? (
        <div className="fixed inset-0 z-[99998]">
          <div
            className="absolute inset-0 bg-black/45 backdrop-blur-[2px]"
            onClick={() => setOpen(false)}
          />

          <div className="absolute right-5 bottom-5 w-[94vw] max-w-[460px]">
            <div className="overflow-hidden rounded-3xl ring-1 ring-white/12 bg-neutral-950/82 backdrop-blur-xl shadow-[0_30px_100px_rgba(0,0,0,0.58)]">
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

              <div className="p-4">
                {tab === "stats" ? (
                  <StatsPanel />
                ) : tab === "sources" ? (
                  <SourcesPanel />
                ) : (
                  <>
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

                    <div ref={scrollRef} className="mt-4 h-[340px] overflow-auto pr-1">
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

                    <div className="mt-4 flex items-center gap-2">
                      <div className="flex-1 relative">
                        <input
                          ref={inputRef}
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") send(input);
                          }}
                          placeholder="Ask about dashboard, insights, policy, definitions…"
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
