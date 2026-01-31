"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { SITE } from "@/components/siteData";

type Msg = { role: "user" | "assistant"; content: string; ts: number };

function cx(...c: Array<string | false | undefined>) {
  return c.filter(Boolean).join(" ");
}

function formatBullets(lines: string[]) {
  return lines.map((x) => `• ${x}`).join("\n");
}

function safeLower(s: string) {
  return (s || "").toLowerCase();
}

export default function ResearchBot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [tab, setTab] = useState<"ask" | "about">("ask");
  const [unread, setUnread] = useState(1);

  const [msgs, setMsgs] = useState<Msg[]>(() => [
    {
      role: "assistant",
      content:
        "Ask me about the model, findings, limitations, or the policy briefs. I answer using what is on this site.",
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

  useEffect(() => {
    if (open) setUnread(0);
  }, [open]);

  const knowledge = useMemo(() => {
    return {
      title: SITE.overview.title,
      lead: SITE.overview.lead,
      question: SITE.research.question,
      methodBullets: SITE.research.methodBullets,
      resultsBullets: SITE.research.resultsBullets,
      limitationsBullets: SITE.research.limitationsBullets,
      policy: SITE.policy,
      sources: SITE.sources?.primaryLinks || [],
      repo: SITE.links.analysisRepo,
      author: SITE.author,
    };
  }, []);

  const quickActions = useMemo(
    () => [
      { label: "3-bullet summary", prompt: "Summarize the main finding in 3 bullets." },
      { label: "Explain for a recruiter", prompt: "Explain the model like I’m a recruiter." },
      { label: "Limitations to admit", prompt: "What are the biggest limitations I should admit?" },
      { label: "Interview elevator pitch", prompt: "Give me a 20-second summary for an interview." },
      { label: "Defend the proxy", prompt: "What should I say if someone questions the proxy?" },
      { label: "Turn a policy brief into a paragraph", prompt: "Turn the youth sentencing brief into a punchy paragraph." },
    ],
    []
  );

  function answerLocally(userText: string): string {
    const q = safeLower(userText);

    const wantsInterview =
      q.includes("interview") ||
      q.includes("recruiter") ||
      q.includes("elevator") ||
      q.includes("20-second") ||
      q.includes("pitch");

    const wantsMethod =
      q.includes("model") ||
      q.includes("logistic") ||
      q.includes("logit") ||
      q.includes("method") ||
      q.includes("predictor") ||
      q.includes("outcome");

    const wantsLimits =
      q.includes("limit") ||
      q.includes("weak") ||
      q.includes("bias") ||
      q.includes("proxy") ||
      q.includes("causal") ||
      q.includes("causation");

    const wantsFindings =
      q.includes("finding") ||
      q.includes("result") ||
      q.includes("summary") ||
      q.includes("key") ||
      q.includes("takeaway");

    const wantsPolicy =
      q.includes("policy") ||
      q.includes("death") ||
      q.includes("teen") ||
      q.includes("juvenile") ||
      q.includes("solitary") ||
      q.includes("isolation");

    if (wantsInterview) {
      return [
        "Here is a clean interview summary:",
        "",
        "• I built a research brief on recidivism and reentry support using post-release employment as a measurable proxy.",
        "• I modeled recidivism with logistic regression using employment, offense type, and time served.",
        "• Employment aligned with lower reoffending, offense type mattered, and time served was not significant in this run.",
        "",
        "If you want, I can rewrite that as one sentence or as a resume bullet."
      ].join("\n");
    }

    if (wantsMethod) {
      return [
        "Method, quick and clear:",
        "",
        `Research question: ${knowledge.question}`,
        "",
        formatBullets(knowledge.methodBullets),
        "",
        "Interpretation:",
        "• The output is directional evidence. It is not proof of causation.",
      ].join("\n");
    }

    if (wantsLimits) {
      return [
        "Limitations I would say confidently:",
        "",
        formatBullets(knowledge.limitationsBullets),
        "",
        "How to defend the proxy without over-claiming:",
        "• Employment is measurable and connected to reentry support in the real world.",
        "• It is not the same thing as program completion, so I keep the conclusions conservative.",
      ].join("\n");
    }

    if (wantsPolicy) {
      const aboutSolitary = q.includes("solitary") || q.includes("isolation");
      const aboutTeens = q.includes("death") || q.includes("teen") || q.includes("juvenile");

      if (aboutSolitary) {
        const item = knowledge.policy.find((p) => safeLower(p.title).includes("solitary")) || knowledge.policy[1];
        return [
          `Policy brief: ${item.title}`,
          "",
          item.oneLine,
          "",
          "Key points:",
          formatBullets(item.bullets),
          "",
          `Bottom line: ${item.bottomLine}`,
          "",
          "If you want sources for this section, check the Sources page."
        ].join("\n");
      }

      if (aboutTeens) {
        const item =
          knowledge.policy.find((p) => safeLower(p.title).includes("teens")) || knowledge.policy[0];
        return [
          `Policy brief: ${item.title}`,
          "",
          item.oneLine,
          "",
          "Key points:",
          formatBullets(item.bullets),
          "",
          `Bottom line: ${item.bottomLine}`,
          "",
          "If you want sources for this section, check the Sources page."
        ].join("\n");
      }

      return [
        "Policy briefs on this site:",
        "",
        ...knowledge.policy.map((p) => `• ${p.title}`),
        "",
        "Tell me which one you want and I will summarize it tightly."
      ].join("\n");
    }

    if (wantsFindings) {
      return [
        "Key takeaways:",
        "",
        formatBullets(knowledge.resultsBullets),
        "",
        "Want that as a resume bullet, an abstract, or a caption for the Research page?"
      ].join("\n");
    }

    return [
      "Tell me what output you want and I will format it:",
      "",
      "• 3-bullet summary",
      "• short paragraph",
      "• interview answer",
      "• limitations section",
      "",
      "If you mention “research” or “policy” I will make it tighter."
    ].join("\n");
  }

  async function send(text: string) {
    const t = text.trim();
    if (!t || busy) return;

    setMsgs((m) => [...m, { role: "user", content: t, ts: Date.now() }]);
    setInput("");
    setBusy(true);

    await new Promise((r) => setTimeout(r, 380));

    const a = answerLocally(t);
    setMsgs((m) => [...m, { role: "assistant", content: a, ts: Date.now() }]);
    setBusy(false);
  }

  function clearChat() {
    setMsgs([
      {
        role: "assistant",
        content: "Chat cleared. Ask about methods, findings, limitations, or the policy briefs.",
        ts: Date.now(),
      },
    ]);
    setTab("ask");
    setUnread(0);
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
      {/* Launcher */}
      <div className="fixed right-5 bottom-5 z-[99999]">
        <button
          onClick={() => {
            setOpen(true);
            setUnread(0);
          }}
          className={cx(
            "group relative flex items-center gap-3 rounded-full px-5 py-3.5",
            "bg-white/95 text-black border border-black/10 shadow-[0_18px_55px_rgba(0,0,0,0.18)]",
            "hover:shadow-[0_24px_75px_rgba(0,0,0,0.22)] active:scale-[0.985] transition",
            "min-w-[230px]"
          )}
          aria-label="Open research assistant"
        >
          {/* glow ring */}
          <span className="pointer-events-none absolute -inset-1 rounded-full opacity-0 group-hover:opacity-100 transition">
            <span className="absolute inset-0 rounded-full blur-xl bg-gradient-to-r from-indigo-300/35 via-cyan-300/35 to-emerald-300/35" />
          </span>

          <span className="relative grid place-items-center h-11 w-11 rounded-full overflow-hidden border border-black/10">
            <span className="absolute inset-0 bg-gradient-to-br from-indigo-400 via-cyan-300 to-emerald-300" />
            <span className="relative font-black text-neutral-950 tracking-tight">AI</span>
          </span>

          <span className="text-left">
            <span className="block text-sm font-semibold leading-tight">
              Research Assistant
            </span>
            <span className="block text-xs text-black/60 leading-tight">
              Methods, findings, briefs
            </span>
          </span>

          {/* unread dot */}
          {unread > 0 ? (
            <span className="ml-auto relative">
              <span className="absolute -inset-1 rounded-full blur-md bg-emerald-300/40" />
              <span className="relative h-2.5 w-2.5 rounded-full bg-emerald-400" />
            </span>
          ) : (
            <span className="ml-auto text-black/40 text-xs hidden sm:inline">
              ⌘K
            </span>
          )}
        </button>
      </div>

      {/* Modal */}
      {open ? (
        <div className="fixed inset-0 z-[99998]">
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"
            onClick={() => setOpen(false)}
          />

          <div className="absolute right-5 bottom-5 w-[92vw] max-w-[460px]">
            <div className="overflow-hidden rounded-3xl border border-black/10 bg-white shadow-[0_32px_120px_rgba(0,0,0,0.25)]">
              {/* Header */}
              <div className="p-4 border-b border-black/10">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-2xl border border-black/10 grid place-items-center overflow-hidden">
                    <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-indigo-400 via-cyan-300 to-emerald-300" />
                  </div>

                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-black leading-tight">
                      Research Assistant
                    </div>
                    <div className="text-xs text-black/55 truncate">
                      Uses the content on this site. Press Esc to close.
                    </div>
                  </div>

                  <div className="ml-auto flex items-center gap-2">
                    <button
                      onClick={clearChat}
                      className="text-xs px-3 py-1.5 rounded-full bg-black/[0.04] hover:bg-black/[0.06] border border-black/10 text-black/80 transition"
                    >
                      Clear
                    </button>
                    <button
                      onClick={() => setOpen(false)}
                      className="text-xs px-3 py-1.5 rounded-full bg-black/[0.04] hover:bg-black/[0.06] border border-black/10 text-black/80 transition"
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
                      "px-3 py-2 rounded-2xl text-xs font-semibold border transition",
                      tab === "ask"
                        ? "bg-black text-white border-black"
                        : "bg-white text-black/70 border-black/10 hover:bg-black/[0.03]"
                    )}
                  >
                    Ask
                  </button>
                  <button
                    onClick={() => setTab("about")}
                    className={cx(
                      "px-3 py-2 rounded-2xl text-xs font-semibold border transition",
                      tab === "about"
                        ? "bg-black text-white border-black"
                        : "bg-white text-black/70 border-black/10 hover:bg-black/[0.03]"
                    )}
                  >
                    What I use
                  </button>
                </div>
              </div>

              {/* Body */}
              <div className="p-4">
                {tab === "about" ? (
                  <div className="space-y-3 text-sm text-black/70 leading-relaxed">
                    <div className="rounded-2xl bg-black/[0.03] border border-black/10 p-3">
                      <div className="text-[11px] uppercase tracking-widest text-black/50">
                        Scope
                      </div>
                      <div className="mt-2">{knowledge.lead}</div>
                    </div>

                    <div className="rounded-2xl bg-black/[0.03] border border-black/10 p-3">
                      <div className="text-[11px] uppercase tracking-widest text-black/50">
                        Research question
                      </div>
                      <div className="mt-2">{knowledge.question}</div>
                    </div>

                    <div className="rounded-2xl bg-black/[0.03] border border-black/10 p-3">
                      <div className="text-[11px] uppercase tracking-widest text-black/50">
                        Key sections I can summarize
                      </div>
                      <div className="mt-2">
                        • Method • Findings • Limits • Policy briefs
                      </div>
                    </div>

                    <div className="text-[11px] text-black/45">
                      Later we can connect this bot to a Stats page so it can answer with numbers from your site.
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Quick actions */}
                    <div className="flex flex-wrap gap-2">
                      {quickActions.slice(0, 5).map((s) => (
                        <button
                          key={s.label}
                          onClick={() => send(s.prompt)}
                          className="text-xs px-3 py-2 rounded-2xl bg-black/[0.03] hover:bg-black/[0.06] border border-black/10 text-black/75 transition"
                        >
                          {s.label}
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
                                ? "ml-auto bg-black text-white"
                                : "bg-black/[0.03] border border-black/10 text-black/80"
                            )}
                          >
                            {m.content}
                          </div>
                        ))}

                        {busy ? (
                          <div className="max-w-[92%] rounded-3xl px-4 py-3 text-sm bg-black/[0.03] border border-black/10 text-black/70">
                            <span className="inline-flex items-center gap-2">
                              <span className="h-2 w-2 rounded-full bg-black/40 animate-pulse" />
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
                          className="w-full rounded-2xl bg-white border border-black/10 px-4 py-3 text-sm text-black placeholder:text-black/40 outline-none focus:ring-2 focus:ring-black/10"
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
                            ? "bg-black/10 text-black/40 border border-black/10 cursor-not-allowed"
                            : "bg-gradient-to-br from-indigo-500 via-cyan-400 to-emerald-400 text-neutral-950 hover:opacity-95"
                        )}
                      >
                        Send
                      </button>
                    </div>

                    <div className="mt-2 text-[11px] text-black/45">
                      Tip: press <span className="text-black/70">⌘K</span> to focus input. Press <span className="text-black/70">Esc</span> to close.
                    </div>
                  </>
                )}
              </div>

              {/* Footer quick links */}
              <div className="px-4 py-3 border-t border-black/10 bg-white">
                <div className="flex items-center justify-between text-xs text-black/50">
                  <span>{knowledge.author}</span>
                  <div className="flex items-center gap-3">
                    <a className="hover:text-black/80 transition" href="/sources">
                      Sources
                    </a>
                    <a
                      className="hover:text-black/80 transition"
                      href={knowledge.repo}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Repo
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
