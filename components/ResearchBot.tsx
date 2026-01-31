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

function formatPct(v: number, digits = 1) {
  if (!Number.isFinite(v)) return "";
  const rounded = Math.round(v * Math.pow(10, digits)) / Math.pow(10, digits);
  // remove trailing .0
  const asStr = String(rounded);
  return asStr.includes(".") ? `${rounded.toFixed(digits)}%` : `${rounded}%`;
}

function bulletLines(items: string[]) {
  return items.map((x) => `• ${x}`).join("\n");
}

type LabeledPct = { label: string; pct: number };

// Safe getter for arrays shaped like [{label, pct}]
function getPctFromArray(arr: unknown, label: string): number | undefined {
  if (!Array.isArray(arr)) return undefined;
  const hit = (arr as any[]).find((x) => {
    const l = String(x?.label ?? "").toLowerCase().trim();
    return l === label.toLowerCase().trim();
  });
  const pct = Number(hit?.pct);
  return Number.isFinite(pct) ? pct : undefined;
}

// Converts offense donut data into bullet output (expects array form)
function offenseMixLines(offenseArr: unknown): string[] {
  if (!Array.isArray(offenseArr)) return ["Offense mix is not available in the current dataset."];
  const a = offenseArr as LabeledPct[];

  // Keep order if labels exist, otherwise just list top
  const order = ["Violent", "Property", "Drug", "Public order"];
  const out: string[] = [];

  const byLabel = (lab: string) => {
    const hit = a.find((x) => String(x.label).toLowerCase() === lab.toLowerCase());
    return hit ? `• ${lab}: ${formatPct(hit.pct, 1)}` : undefined;
  };

  const ordered = order.map(byLabel).filter(Boolean) as string[];
  if (ordered.length) return ordered;

  // fallback: list all items
  for (const x of a) {
    const lab = String(x?.label ?? "").trim();
    const pct = Number(x?.pct);
    if (lab && Number.isFinite(pct)) out.push(`• ${lab}: ${formatPct(pct, 1)}`);
  }
  return out.length ? out : ["Offense mix is not available in the current dataset."];
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
        "Ask me about the research, the model, the policy briefs, or the Stats Lab. I’ll keep it short and grounded in the sources on this site.",
      ts: Date.now(),
    },
  ]);

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const links = useMemo(
    () => ({
      bjs2012pdf:
        "https://bjs.ojp.gov/sites/g/files/xyckuh236/files/media/document/rpr34s125yfup1217.pdf",
      bjs2018update:
        "https://bjs.ojp.gov/library/publications/2018-update-prisoner-recidivism-9-year-follow-period-2005-2014",
      statsPage: "/stats",
      sourcesPage: "/sources",
      researchPage: "/research",
      policyPage: "/policy",
    }),
    []
  );

  // Focus input when opened
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => inputRef.current?.focus(), 140);
    return () => clearTimeout(t);
  }, [open]);

  // Auto scroll
  useEffect(() => {
    if (!open) return;
    scrollRef.current?.scrollTo({ top: 999999, behavior: "smooth" });
  }, [open, msgs.length, busy]);

  // Keyboard shortcuts
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

  const quickChips = useMemo(
    () => [
      "Give me a 20-second interview summary.",
      "Explain the model in simple terms.",
      "What limitations should I admit?",
      "Summarize findings in 3 bullets.",
      "Compare 5-year vs 9-year BJS numbers.",
      "Summarize youth sentencing policy.",
      "Summarize solitary confinement policy.",
    ],
    []
  );

  // Grounded facts pulled from your site + statsData
  const grounded = useMemo(() => {
    const r = SITE.research;

    const year1 = BJS2012.cumulativeArrestOverTime?.[0]?.pct;
    const year5 = BJS2012.cumulativeArrestOverTime?.slice(-1)?.[0]?.pct;

    const b18_3 = BJS2018.arrestedWithin?.find((x: any) => x.years === 3)?.pct;
    const b18_9 = BJS2018.arrestedWithin?.find((x: any) => x.years === 9)?.pct;

    return {
      author: SITE.author,
      overviewTitle: SITE.overview.title,

      question: r.question,
      methodBullets: r.methodBullets,
      resultsBullets: r.resultsBullets,
      limitationsBullets: r.limitationsBullets,

      policyBriefs: SITE.policy.map((p) => ({
        title: p.title,
        oneLine: p.oneLine,
        bullets: p.bullets,
        bottomLine: p.bottomLine,
      })),

      stats: {
        bjs2012: {
          year1,
          year5,
          sex5yr: BJS2012.cumulativeArrest5yrBySex as unknown,
          race5yr: BJS2012.cumulativeArrest5yrByRace as unknown,
          offense: BJS2012.commitmentOffensePct as unknown,
          totalReleased: (BJS2012 as any).totalReleased as number | undefined,
        },
        bjs2018: {
          threeYear: b18_3,
          nineYear: b18_9,
          released: (BJS2018 as any).cohortReleased2005 as number | undefined,
        },
      },

      disclaimer:
        "This site is about injustice and outcomes, not excusing harm. Numbers are shown with sources so people can verify quickly.",
    };
  }, []);

  function interviewSummary() {
    return [
      "Clean interview summary:",
      "",
      "• I built a research brief on recidivism and reentry support.",
      "• I modeled recidivism using logistic regression with post-release employment as a measurable proxy, plus offense type and time served.",
      "• In this run, employment aligned with lower reoffending, offense type mattered, and time served wasn’t significant.",
      "",
      `Code: ${SITE.links.analysisRepo}`,
    ].join("\n");
  }

  function explainModelSimple() {
    return [
      "Model explanation (simple):",
      "",
      `• Question: ${grounded.question}`,
      "• Logistic regression estimates how each factor relates to the odds of recidivism while holding the others constant.",
      "• I treat results as association, not causation.",
    ].join("\n");
  }

  function limitations() {
    return [
      "Limitations (honest, recruiter-safe):",
      "",
      bulletLines(grounded.limitationsBullets),
      "",
      "Proxy defense (without over-claiming):",
      "• Employment is measurable and plausibly tied to reentry support.",
      "• It is not the same as program completion, so conclusions stay conservative.",
    ].join("\n");
  }

  function findings3() {
    return [
      "Key findings:",
      "",
      bulletLines(grounded.resultsBullets.slice(0, 3)),
      "",
      "If you want a resume bullet version, tell me the job title.",
    ].join("\n");
  }

  function policyBrief(which: "teens" | "solitary") {
    const match =
      which === "teens"
        ? grounded.policyBriefs.find((p) => p.title.toLowerCase().includes("teen"))
        : grounded.policyBriefs.find((p) => p.title.toLowerCase().includes("solitary"));

    if (!match) return "I couldn’t find that brief in the site data. Check the Policy page.";

    return [
      `${match.title}:`,
      "",
      clampText(match.oneLine, 450),
      "",
      "Strong points:",
      bulletLines(match.bullets),
      "",
      `Bottom line: ${match.bottomLine}`,
      "",
      `Verify: ${links.sourcesPage}`,
    ].join("\n");
  }

  function statsCompare() {
    const b12 = grounded.stats.bjs2012;
    const b18 = grounded.stats.bjs2018;

    const out: string[] = [];
    out.push("BJS comparison (quick):");
    out.push("");

    if (typeof b12.year1 === "number" && typeof b12.year5 === "number") {
      out.push(
        `• 2012 cohort (34 states): cumulative arrest rises from ${formatPct(b12.year1, 1)} (Year 1) to ${formatPct(
          b12.year5,
          1
        )} (Year 5).`
      );
    } else {
      out.push("• 2012 cohort: see Stats Lab for the full time series.");
    }

    if (typeof b18.threeYear === "number" && typeof b18.nineYear === "number") {
      out.push(
        `• 2005 cohort (BJS update): arrested within 3 years ${formatPct(b18.threeYear, 0)}, within 9 years ${formatPct(
          b18.nineYear,
          0
        )}.`
      );
    } else {
      out.push("• 2005 cohort (BJS update): open the BJS page for the full set of numbers.");
    }

    out.push("");
    out.push("Verify:");
    out.push(`• BJS 2012 PDF: ${links.bjs2012pdf}`);
    out.push(`• BJS 2018 update: ${links.bjs2018update}`);
    out.push(`• Stats Lab: ${links.statsPage}`);

    return out.join("\n");
  }

  function statsSexRace() {
    const b12 = grounded.stats.bjs2012;

    const male = getPctFromArray(b12.sex5yr, "Male");
    const female = getPctFromArray(b12.sex5yr, "Female");

    const white = getPctFromArray(b12.race5yr, "White");
    const black = getPctFromArray(b12.race5yr, "Black");
    const hispanic = getPctFromArray(b12.race5yr, "Hispanic");

    const out: string[] = [];
    out.push("BJS 2012 cohort breakdowns (Year 5):");
    out.push("");

    if (typeof male === "number" && typeof female === "number") {
      out.push(`• Sex: male ${formatPct(male, 1)} vs female ${formatPct(female, 1)} (cumulative arrest).`);
    } else {
      out.push("• Sex: see Stats Lab chart.");
    }

    if (typeof white === "number" && typeof black === "number" && typeof hispanic === "number") {
      out.push(
        `• Race/ethnicity: White ${formatPct(white, 1)}, Black ${formatPct(black, 1)}, Hispanic ${formatPct(
          hispanic,
          1
        )} (cumulative arrest).`
      );
    } else {
      out.push("• Race/ethnicity: see Stats Lab chart.");
    }

    out.push("");
    out.push("Verify:");
    out.push(`• BJS 2012 PDF: ${links.bjs2012pdf}`);
    out.push(`• Stats Lab: ${links.statsPage}`);

    return out.join("\n");
  }

  function statsOffenseMix() {
    const lines = offenseMixLines(grounded.stats.bjs2012.offense);

    return [
      "Most serious commitment offense mix (BJS 2012 cohort):",
      "",
      ...lines,
      "",
      "Verify:",
      `• BJS 2012 PDF: ${links.bjs2012pdf}`,
      `• Stats Lab: ${links.statsPage}`,
    ].join("\n");
  }

  function answerLocally(userText: string) {
    const q = userText.toLowerCase();

    if (q.includes("interview") || q.includes("recruiter") || q.includes("20-second") || q.includes("elevator")) {
      return interviewSummary();
    }

    if (q.includes("model") || q.includes("logistic") || q.includes("logit") || q.includes("method")) {
      return explainModelSimple();
    }

    if (q.includes("limit") || q.includes("weakness") || q.includes("proxy")) {
      return limitations();
    }

    if (q.includes("finding") || q.includes("result") || q.includes("summary") || q.includes("key")) {
      return findings3();
    }

    if (q.includes("teen") || q.includes("juvenile") || q.includes("death")) {
      return policyBrief("teens");
    }

    if (q.includes("solitary") || q.includes("isolation")) {
      return policyBrief("solitary");
    }

    if (q.includes("sex") || q.includes("female") || q.includes("male") || q.includes("race") || q.includes("hispanic") || q.includes("black") || q.includes("white")) {
      return statsSexRace();
    }

    if (q.includes("offense") || q.includes("violent") || q.includes("property") || q.includes("drug") || q.includes("public order")) {
      return statsOffenseMix();
    }

    if (q.includes("bjs") || q.includes("34 states") || q.includes("5-year") || q.includes("9-year") || q.includes("over time")) {
      return statsCompare();
    }

    return [
      "Tell me what you want:",
      "",
      "• interview summary",
      "• model explanation",
      "• limitations and proxy defense",
      "• key findings",
      "• BJS stats (5 vs 9 years, sex/race, offense mix)",
      "",
      `Shortcuts: Stats tab, Sources tab, or ask me directly.`,
    ].join("\n");
  }

  async function send(text: string) {
    const t = (text ?? "").trim();
    if (!t || busy) return;

    setMsgs((m) => [...m, { role: "user", content: t, ts: Date.now() }]);
    setInput("");
    setBusy(true);

    // small delay so it feels premium but fast
    await new Promise((r) => setTimeout(r, 420));

    const a = answerLocally(t);
    setMsgs((m) => [...m, { role: "assistant", content: a, ts: Date.now() }]);
    setBusy(false);
  }

  function clearChat() {
    setMsgs([
      {
        role: "assistant",
        content: "Chat cleared. Ask about research, policy, or stats. I’ll keep it grounded in this site’s sources.",
        ts: Date.now(),
      },
    ]);
    setTab("ask");
  }

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
                Cumulative arrest rises from <span className="font-semibold text-white">{formatPct(b12.year1, 1)}</span> (Year 1)
                to <span className="font-semibold text-white">{formatPct(b12.year5, 1)}</span> (Year 5).
              </>
            ) : (
              <>Open Stats Lab for the full time series chart.</>
            )}
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            <button
              onClick={() => send("Compare 5-year vs 9-year BJS numbers.")}
              className="text-xs px-3 py-2 rounded-2xl bg-white/5 hover:bg-white/10 ring-1 ring-white/10 text-white/80 transition"
            >
              5 vs 9 years
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
                Arrested within 3 years <span className="font-semibold text-white">{formatPct(b18.threeYear, 0)}</span>,
                within 9 years <span className="font-semibold text-white">{formatPct(b18.nineYear, 0)}</span>.
              </>
            ) : (
              <>Open the BJS update page for the full set of numbers.</>
            )}
          </div>
        </div>

        <div className="text-[11px] text-white/55 leading-relaxed">
          Sources:{" "}
          <a className="text-white/75 hover:text-white underline" href={links.bjs2012pdf} target="_blank" rel="noreferrer">
            BJS 2012 PDF
          </a>{" "}
          and{" "}
          <a className="text-white/75 hover:text-white underline" href={links.bjs2018update} target="_blank" rel="noreferrer">
            BJS 2018 update
          </a>
          . Charts live on{" "}
          <a className="text-white/75 hover:text-white underline" href={links.statsPage}>
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
          <div className="text-xs uppercase tracking-widest text-white/60">Verify fast</div>
          <div className="mt-2 text-sm text-white/80 leading-relaxed">
            Stats Lab is for numbers. Sources is for citations. Research is for your method and findings.
          </div>

          <div className="mt-3 grid gap-2">
            <a
              href={links.researchPage}
              className="rounded-2xl bg-white/5 hover:bg-white/10 ring-1 ring-white/10 p-3 transition"
            >
              <div className="text-sm font-semibold text-white">Open Research</div>
              <div className="mt-1 text-xs text-white/55">Method, findings, limits</div>
            </a>

            <a
              href={links.statsPage}
              className="rounded-2xl bg-white/5 hover:bg-white/10 ring-1 ring-white/10 p-3 transition"
            >
              <div className="text-sm font-semibold text-white">Open Stats Lab</div>
              <div className="mt-1 text-xs text-white/55">Charts from BJS reporting</div>
            </a>

            <a
              href={links.sourcesPage}
              className="rounded-2xl bg-white/5 hover:bg-white/10 ring-1 ring-white/10 p-3 transition"
            >
              <div className="text-sm font-semibold text-white">Open Sources</div>
              <div className="mt-1 text-xs text-white/55">Primary links and readings</div>
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
      {/* Floating launcher */}
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

          <span className="ml-auto text-white/55 text-xs hidden sm:inline">⌘K</span>
        </button>
      </div>

      {/* Modal */}
      {open ? (
        <div className="fixed inset-0 z-[99998]">
          <div
            className="absolute inset-0 bg-black/45 backdrop-blur-[2px]"
            onClick={() => setOpen(false)}
          />

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
                      Short, grounded answers
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
                    <div className="flex flex-wrap gap-2">
                      {quickChips.map((s) => (
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
