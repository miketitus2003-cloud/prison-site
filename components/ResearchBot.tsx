// components/ResearchBot.tsx
"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

type Msg = { role: "user" | "assistant"; content: string; ts: number };

function cx(...c: Array<string | false | undefined>) {
  return c.filter(Boolean).join(" ");
}

/**
 * Free + impressive: local "research assistant" that answers using your site context.
 * Later you can replace `answerLocally()` with a real API route (Option 2).
 */
export default function ResearchBot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [tab, setTab] = useState<"ask" | "about">("ask");
  const [msgs, setMsgs] = useState<Msg[]>(() => [
    {
      role: "assistant",
      content:
        "Hey — I’m your research assistant. Ask me about the model, findings, limitations, or the policy briefs. I’ll keep it short and evidence-focused.",
      ts: Date.now(),
    },
  ]);

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!open) return;
    // focus after opening
    const t = setTimeout(() => inputRef.current?.focus(), 120);
    return () => clearTimeout(t);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    scrollRef.current?.scrollTo({ top: 999999, behavior: "smooth" });
  }, [open, msgs.length, busy]);

  // You can later populate this from a facts/stats JSON file or a "facts" page.
  const knowledge = useMemo(
    () => ({
      title: "Prison Education & Recidivism — Michael Parham",
      scope:
        "This is a research brief on recidivism and reentry support. The analysis uses post-release employment as a proxy for education/reentry support because direct program participation data is often missing.",
      model:
        "Model: logistic regression (Logit). Outcome: recidivism (reoffended vs did not). Predictors: employed after release, offense type, time served (years).",
      findings: [
        "Employment after release is associated with lower likelihood of reoffending (directional association).",
        "Violent offense type is associated with higher likelihood of return (directional association).",
        "Time served was not statistically significant in the current run.",
      ],
      limitations: [
        "The current run is not a causal claim (correlation/association, not causation).",
        "Employment is a proxy — measurable but not identical to program completion.",
        "Better versions add administrative education records and more controls (demographics, parole, etc.).",
      ],
      policy: {
        teens: [
          "High-stakes punishments are irreversible; risk of wrongful conviction matters.",
          "Youth are more vulnerable to pressure/false confessions.",
          "Equity concerns: extreme sentencing not applied equally.",
        ],
        solitary: [
          "For youth, isolation increases risk of anxiety/depression and self-harm.",
          "Often used for staffing/rules, not because it improves outcomes.",
          "Better alternatives: step-down programs, clinical care, strict limits and oversight.",
        ],
      },
      tone:
        "Be concise. If uncertain, say so. Prefer bullet points. Encourage checking Sources page for verification.",
    }),
    []
  );

  const suggestions = useMemo(
    () => [
      "Summarize the main finding in 3 bullets.",
      "Explain the model like I’m a recruiter.",
      "What are the biggest limitations I should admit?",
      "Give me a 20-second summary for an interview.",
      "What should I say if someone questions the proxy?",
      "Turn the policy brief into a punchy paragraph.",
    ],
    []
  );

  function answerLocally(userText: string): string {
    const q = userText.toLowerCase();

    // super simple routing — keeps it fast & believable, not “generic chatbot”
    if (q.includes("interview") || q.includes("recruiter") || q.includes("20-second") || q.includes("elevator")) {
      return [
        "Here’s a clean interview-style summary:",
        "",
        "• I analyzed how reentry support relates to recidivism using post-release employment as a measurable proxy.",
        "• I modeled recidivism with logistic regression using employment, offense type, and time served.",
        "• Employment aligned with lower reoffending, offense type mattered, and time served wasn’t significant in this run.",
        "",
        "If you want, I can tighten it to a single sentence."
      ].join("\n");
    }

    if (q.includes("model") || q.includes("logistic") || q.includes("logit") || q.includes("method")) {
      return [
        "Method overview (quick + clear):",
        `• ${knowledge.model}`,
        "",
        "Interpretation:",
        "• Coefficients estimate how each predictor changes the odds of recidivism (holding others constant).",
        "• I treat results as directional evidence, not proof of causation.",
      ].join("\n");
    }

    if (q.includes("limitations") || q.includes("limit") || q.includes("weakness") || q.includes("proxy")) {
      return [
        "Limitations I’d state confidently:",
        ...knowledge.limitations.map((x) => `• ${x}`),
        "",
        "How to defend the proxy (without over-claiming):",
        "• Employment is measurable and plausibly connected to education/reentry support.",
        "• It’s not a perfect stand-in — so conclusions stay conservative.",
      ].join("\n");
    }

    if (q.includes("policy") || q.includes("death") || q.includes("teen") || q.includes("juvenile")) {
      return [
        "Policy brief — youth sentencing (strong points only):",
        ...knowledge.policy.teens.map((x) => `• ${x}`),
        "",
        "Bottom line:",
        "• If the system can be wrong, punishment shouldn’t be irreversible."
      ].join("\n");
    }

    if (q.includes("solitary") || q.includes("isolation")) {
      return [
        "Policy brief — solitary confinement (youth-focused):",
        ...knowledge.policy.solitary.map((x) => `• ${x}`),
        "",
        "Bottom line:",
        "• Long isolation creates harm and can make reentry harder."
      ].join("\n");
    }

    if (q.includes("findings") || q.includes("results") || q.includes("summary") || q.includes("key")) {
      return [
        "Key takeaways:",
        ...knowledge.findings.map((x) => `• ${x}`),
        "",
        "Want me to rewrite this as a resume bullet or a short abstract?"
      ].join("\n");
    }

    // default helpful response
    return [
      "I can help with that. Tell me what you want the output to be:",
      "• 3-bullet summary",
      "• short paragraph",
      "• interview answer",
      "• limitations section",
      "",
      "If you mention “research” or “policy” I’ll tailor it tighter."
    ].join("\n");
  }

  async function send(text: string) {
    const t = text.trim();
    if (!t || busy) return;

    setMsgs((m) => [...m, { role: "user", content: t, ts: Date.now() }]);
    setInput("");
    setBusy(true);

    // Fake "thinking" delay to feel premium (fast but not instant)
    await new Promise((r) => setTimeout(r, 450));

    const a = answerLocally(t);

    setMsgs((m) => [...m, { role: "assistant", content: a, ts: Date.now() }]);
    setBusy(false);
  }

  function clearChat() {
    setMsgs([
      {
        role: "assistant",
        content:
          "Chat cleared. Ask me about the model, findings, limitations, or the policy briefs.",
        ts: Date.now(),
      },
    ]);
    setTab("ask");
  }

  // keyboard shortcuts
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
      {/* Floating launcher */}
      <div className="fixed right-5 bottom-5 z-[99999]">
        <button
          onClick={() => setOpen(true)}
          className={cx(
            "group relative flex items-center gap-3 rounded-full px-4 py-3",
            "bg-white/10 backdrop-blur-md ring-1 ring-white/15 shadow-[0_18px_55px_rgba(0,0,0,0.35)]",
            "hover:bg-white/14 active:scale-[0.98] transition",
            // make it more obvious
            "min-w-[190px]"
          )}
          aria-label="Open research assistant"
        >
          <span className="relative grid place-items-center h-10 w-10 rounded-full overflow-hidden">
            <span className="absolute inset-0 bg-gradient-to-br from-indigo-400/90 via-cyan-300/90 to-emerald-300/90" />
            <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-white/10" />
            <span className="relative text-neutral-950 font-black">AI</span>
          </span>

          <span className="text-left">
            <span className="block text-sm font-semibold text-white leading-tight">
              Research Assistant
            </span>
            <span className="block text-xs text-white/70 leading-tight">
              Ask about findings & methods
            </span>
          </span>

          <span className="ml-auto text-white/60 text-xs hidden sm:inline">
            ⌘K
          </span>
        </button>
      </div>

      {/* Modal */}
      {open ? (
        <div className="fixed inset-0 z-[99998]">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
            onClick={() => setOpen(false)}
          />

          {/* Panel */}
          <div className="absolute right-5 bottom-5 w-[92vw] max-w-[430px]">
            <div className="overflow-hidden rounded-3xl ring-1 ring-white/12 bg-neutral-950/80 backdrop-blur-xl shadow-[0_28px_90px_rgba(0,0,0,0.55)]">
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
                      Evidence-first answers • press Esc to close
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
                    onClick={() => setTab("about")}
                    className={cx(
                      "px-3 py-2 rounded-2xl text-xs font-semibold ring-1 transition",
                      tab === "about"
                        ? "bg-white text-neutral-950 ring-white/10"
                        : "bg-white/5 text-white/70 ring-white/10 hover:bg-white/10"
                    )}
                  >
                    What I know
                  </button>
                </div>
              </div>

              {/* Body */}
              <div className="p-4">
                {tab === "about" ? (
                  <div className="space-y-3 text-sm text-white/75 leading-relaxed">
                    <p className="text-white/85">
                      I answer using your site’s research framing:
                    </p>
                    <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-3">
                      <div className="text-xs uppercase tracking-widest text-white/60">
                        Scope
                      </div>
                      <div className="mt-2">{knowledge.scope}</div>
                    </div>
                    <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-3">
                      <div className="text-xs uppercase tracking-widest text-white/60">
                        Model
                      </div>
                      <div className="mt-2">{knowledge.model}</div>
                    </div>
                    <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-3">
                      <div className="text-xs uppercase tracking-widest text-white/60">
                        Key findings
                      </div>
                      <ul className="mt-2 space-y-1">
                        {knowledge.findings.map((x) => (
                          <li key={x}>• {x}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="text-xs text-white/55">
                      Next step (later): connect me to a Facts/Stats JSON so I can cite numbers from your page.
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Suggestions */}
                    <div className="flex flex-wrap gap-2">
                      {suggestions.slice(0, 4).map((s) => (
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
                              "max-w-[90%] rounded-3xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap",
                              m.role === "user"
                                ? "ml-auto bg-white text-neutral-950"
                                : "bg-white/7 text-white ring-1 ring-white/10"
                            )}
                          >
                            {m.content}
                          </div>
                        ))}

                        {busy ? (
                          <div className="max-w-[90%] rounded-3xl px-4 py-3 text-sm bg-white/7 text-white ring-1 ring-white/10">
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
                          placeholder="Ask about methods, results, limitations…"
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
                      Tip: press <span className="text-white/70">⌘K</span> to focus input • <span className="text-white/70">Esc</span> to close
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
