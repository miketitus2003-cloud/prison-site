// components/ResearchBot.tsx
"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { FACTS } from "@/data/facts";

type Msg = { role: "user" | "assistant"; content: string; ts: number };

function cx(...c: Array<string | false | undefined>) {
  return c.filter(Boolean).join(" ");
}

export default function ResearchBot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [tab, setTab] = useState<"ask" | "about">("ask");
  const [msgs, setMsgs] = useState<Msg[]>(() => [
    {
      role: "assistant",
      content:
        "I can answer questions about the research brief, policy briefs, and stats. If you want numbers, ask for Stats Lab.",
      ts: Date.now(),
    },
  ]);

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => inputRef.current?.focus(), 120);
    return () => clearTimeout(t);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    scrollRef.current?.scrollTo({ top: 999999, behavior: "smooth" });
  }, [open, msgs.length, busy]);

  const knowledge = useMemo(
    () => ({
      scope:
        "Research brief on recidivism and reentry support. Employment after release is used as a measurable proxy when direct program participation data is missing.",
      method:
        "Model is logistic regression (Logit). Outcome is recidivism. Predictors include employment, offense type, and time served.",
      findings: [
        "Employment after release aligned with lower likelihood of reoffending in the current run.",
        "Violent offense type aligned with higher likelihood of return in the current run.",
        "Time served was not statistically significant in the current run.",
      ],
      limitations: [
        "Directional evidence only. Not a causal claim.",
        "Employment is measurable but not identical to education completion.",
        "Stronger versions would add administrative education records and more controls.",
      ],
    }),
    []
  );

  const suggestions = useMemo(
    () => [
      "Give me a 20 second summary for an interview.",
      "Explain the model like I am a recruiter.",
      "What are the biggest limitations I should say out loud.",
      "What does Stats Lab show with sources.",
    ],
    []
  );

  function statsAnswer(): string {
    const lines: string[] = [];
    lines.push("Stats Lab highlights:");
    for (const s of FACTS.quickStats) {
      lines.push(`• ${s.label}: ${s.value}`);
      lines.push(`  Context: ${s.context}`);
      lines.push(`  Source: ${s.sourceLabel} (${s.sourceHref})`);
    }
    lines.push("");
    lines.push("If you want, I can point you to the Stats Lab page and list the primary recidivism references.");
    return lines.join("\n");
  }

  function answerLocally(userText: string): string {
    const q = userText.toLowerCase();

    const wantsStats =
      q.includes("stats") ||
      q.includes("numbers") ||
      q.includes("data") ||
      q.includes("rate") ||
      q.includes("source") ||
      q.includes("bjs") ||
      q.includes("rand");

    if (wantsStats) return statsAnswer();

    if (q.includes("interview") || q.includes("recruiter") || q.includes("20 second") || q.includes("elevator")) {
      return [
        "Interview style summary:",
        "",
        "• I studied how reentry support relates to recidivism using employment after release as a measurable proxy.",
        "• I used logistic regression with employment, offense type, and time served to model recidivism.",
        "• Employment aligned with lower reoffending in this run, offense type mattered, and time served was not significant.",
      ].join("\n");
    }

    if (q.includes("model") || q.includes("logistic") || q.includes("logit") || q.includes("method")) {
      return [
        "Method overview:",
        `• ${knowledge.method}`,
        "",
        "Interpretation:",
        "• Coefficients describe changes in odds while holding other variables constant.",
        "• I treat results as directional evidence, not proof of causation.",
      ].join("\n");
    }

    if (q.includes("limitations") || q.includes("limit") || q.includes("weakness") || q.includes("proxy")) {
      return [
        "Limitations:",
        ...knowledge.limitations.map((x) => `• ${x}`),
        "",
        "How to defend the proxy without overclaiming:",
        "• Employment is measurable and plausibly connected to reentry support.",
        "• It is not a perfect stand in for program completion, so conclusions stay conservative.",
      ].join("\n");
    }

    if (q.includes("policy") || q.includes("death") || q.includes("teen") || q.includes("juvenile")) {
      return [
        "Policy brief on youth sentencing:",
        "• Wrongful convictions and false confessions are real risks.",
        "• Youth are more vulnerable to pressure.",
        "• Irreversible punishments raise the stakes when the system can be wrong.",
        "",
        "If you want sources, ask for Stats Lab or Sources page references.",
      ].join("\n");
    }

    if (q.includes("solitary") || q.includes("isolation")) {
      return [
        "Policy brief on solitary confinement:",
        "• For youth, isolation increases risk of anxiety, depression, and self harm.",
        "• Long isolation can create harm that makes reentry harder.",
        "• Better alternatives include step down programs, clinical care, strict limits, and oversight.",
        "",
        "If you want sources, ask for Stats Lab or Sources page references.",
      ].join("\n");
    }

    if (q.includes("findings") || q.includes("results") || q.includes("summary") || q.includes("key")) {
      return [
        "Key takeaways:",
        ...knowledge.findings.map((x) => `• ${x}`),
        "",
        "If you want numbers with sources, ask for Stats Lab.",
      ].join("\n");
    }

    return [
      "Tell me what you want:",
      "• short summary",
      "• interview answer",
      "• limitations",
      "• stats with sources",
      "",
      "If you ask for stats, I will reply with cited links.",
    ].join("\n");
  }

  async function send(text: string) {
    const t = text.trim();
    if (!t || busy) return;

    setMsgs((m) => [...m, { role: "user", content: t, ts: Date.now() }]);
    setInput("");
    setBusy(true);

    await new Promise((r) => setTimeout(r, 320));

    const a = answerLocally(t);

    setMsgs((m) => [...m, { role: "assistant", content: a, ts: Date.now() }]);
    setBusy(false);
  }

  function clearChat() {
    setMsgs([
      {
        role: "assistant",
        content:
          "Chat cleared. Ask about the research, policy briefs, or stats with sources.",
        ts: Date.now(),
      },
    ]);
    setTab("ask");
  }

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

  return (
    <>
      <div className="fixed right-5 bottom-5 z-[99999]">
        <button
          onClick={() => setOpen(true)}
          className={cx(
            "group relative flex items-center gap-3 rounded-full px-4 py-3",
            "bg-white/70 backdrop-blur-md border border-black/10 shadow-[0_18px_55px_rgba(0,0,0,0.10)]",
            "hover:bg-white/85 active:scale-[0.98] transition",
            "min-w-[210px]"
          )}
          aria-label="Open research assistant"
        >
          <span className="relative grid place-items-center h-11 w-11 rounded-full overflow-hidden border border-black/10">
            <span
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(135deg, rgba(59,130,246,0.95), rgba(16,185,129,0.95))",
              }}
            />
            <span className="relative text-white font-black">AI</span>
          </span>

          <span className="text-left">
            <span className="block text-sm font-semibold text-black/85 leading-tight">
              Research Assistant
            </span>
            <span className="block text-xs text-black/55 leading-tight">
              Ask for stats and sources
            </span>
          </span>

          <span className="ml-auto text-black/45 text-xs hidden sm:inline">
            ⌘K
          </span>
        </button>
      </div>

      {open ? (
        <div className="fixed inset-0 z-[99998]">
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"
            onClick={() => setOpen(false)}
          />

          <div className="absolute right-5 bottom-5 w-[92vw] max-w-[460px]">
            <div className="overflow-hidden rounded-3xl border border-black/10 bg-white/85 backdrop-blur-xl shadow-[0_28px_90px_rgba(0,0,0,0.20)]">
              <div className="p-4 border-b border-black/10">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-2xl bg-black/5 border border-black/10 grid place-items-center overflow-hidden">
                    <div
                      className="h-8 w-8 rounded-xl"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(59,130,246,0.95), rgba(16,185,129,0.95))",
                      }}
                    />
                  </div>

                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-black/85 leading-tight">
                      Research Assistant
                    </div>
                    <div className="text-xs text-black/55 truncate">
                      Evidence first answers, sources when available
                    </div>
                  </div>

                  <div className="ml-auto flex items-center gap-2">
                    <button
                      onClick={clearChat}
                      className="text-xs px-3 py-1.5 rounded-full bg-black/5 hover:bg-black/10 border border-black/10 text-black/70 transition"
                    >
                      Clear
                    </button>
                    <button
                      onClick={() => setOpen(false)}
                      className="text-xs px-3 py-1.5 rounded-full bg-black/5 hover:bg-black/10 border border-black/10 text-black/70 transition"
                    >
                      Close
                    </button>
                  </div>
                </div>

                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => setTab("ask")}
                    className={cx(
                      "px-3 py-2 rounded-2xl text-xs font-semibold border transition",
                      tab === "ask"
                        ? "bg-black text-white border-black/10"
                        : "bg-white/60 text-black/70 border-black/10 hover:bg-white/85"
                    )}
                  >
                    Ask
                  </button>
                  <button
                    onClick={() => setTab("about")}
                    className={cx(
                      "px-3 py-2 rounded-2xl text-xs font-semibold border transition",
                      tab === "about"
                        ? "bg-black text-white border-black/10"
                        : "bg-white/60 text-black/70 border-black/10 hover:bg-white/85"
                    )}
                  >
                    What I use
                  </button>
                </div>
              </div>

              <div className="p-4">
                {tab === "about" ? (
                  <div className="space-y-3 text-sm text-black/70 leading-relaxed">
                    <div className="rounded-2xl bg-white/70 border border-black/10 p-3">
                      <div className="text-xs uppercase tracking-widest text-black/50">
                        Scope
                      </div>
                      <div className="mt-2">{knowledge.scope}</div>
                    </div>
                    <div className="rounded-2xl bg-white/70 border border-black/10 p-3">
                      <div className="text-xs uppercase tracking-widest text-black/50">
                        Method
                      </div>
                      <div className="mt-2">{knowledge.method}</div>
                    </div>
                    <div className="rounded-2xl bg-white/70 border border-black/10 p-3">
                      <div className="text-xs uppercase tracking-widest text-black/50">
                        Stats Lab
                      </div>
                      <div className="mt-2">
                        Ask for stats and I will reply with the linked sources.
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex flex-wrap gap-2">
                      {suggestions.map((s) => (
                        <button
                          key={s}
                          onClick={() => send(s)}
                          className="text-xs px-3 py-2 rounded-2xl bg-white/60 hover:bg-white/85 border border-black/10 text-black/70 transition"
                        >
                          {s}
                        </button>
                      ))}
                    </div>

                    <div
                      ref={scrollRef}
                      className="mt-4 h-[350px] overflow-auto pr-1"
                    >
                      <div className="space-y-3">
                        {msgs.map((m) => (
                          <div
                            key={m.ts + m.role}
                            className={cx(
                              "max-w-[92%] rounded-3xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap border",
                              m.role === "user"
                                ? "ml-auto bg-black text-white border-black/10"
                                : "bg-white/70 text-black/75 border-black/10"
                            )}
                          >
                            {m.content}
                          </div>
                        ))}

                        {busy ? (
                          <div className="max-w-[92%] rounded-3xl px-4 py-3 text-sm bg-white/70 text-black/70 border border-black/10">
                            <span className="inline-flex items-center gap-2">
                              <span className="h-2 w-2 rounded-full bg-black/40 animate-pulse" />
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
                          placeholder="Ask about results, limitations, stats…"
                          className="w-full rounded-2xl bg-white/70 border border-black/10 px-4 py-3 text-sm text-black/80 placeholder:text-black/40 outline-none focus:ring-2 focus:ring-black/10"
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-black/35">
                          Enter
                        </div>
                      </div>

                      <button
                        onClick={() => send(input)}
                        disabled={busy}
                        className={cx(
                          "rounded-2xl px-4 py-3 text-sm font-semibold transition",
                          busy
                            ? "bg-black/5 text-black/30 border border-black/10 cursor-not-allowed"
                            : "bg-black text-white hover:opacity-90"
                        )}
                      >
                        Send
                      </button>
                    </div>

                    <div className="mt-2 text-[11px] text-black/45">
                      Tip: ⌘K focuses input, Esc closes
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
