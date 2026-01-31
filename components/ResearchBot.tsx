"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { SITE } from "@/components/siteData";

type Msg = { role: "user" | "assistant"; content: string };

function cx(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/**
 * Very simple “smart” matching:
 * - Scores each doc chunk by keyword hits
 * - Returns top 1–2 answers + quick links
 * - If unsure, it tells the user where to look
 */
function makeAnswer(query: string) {
  const q = query.toLowerCase().trim();

  // Build a small “knowledge base” from your existing SITE data
  const kb: Array<{
    title: string;
    body: string;
    route?: string;
  }> = [
    {
      title: "Project overview",
      body:
        `${SITE.tagline ?? ""} ` +
        `Main question: ${SITE.research?.question ?? ""} ` +
        `Method: ${SITE.research?.method?.join(" ") ?? ""}`,
      route: "/",
    },
    {
      title: "Research question",
      body: SITE.research?.question ?? "",
      route: "/research",
    },
    {
      title: "Methods",
      body: (SITE.research?.method ?? []).join(" "),
      route: "/research",
    },
    {
      title: "Key findings",
      body: (SITE.research?.results ?? []).join(" "),
      route: "/research",
    },
    {
      title: "Limitations",
      body: (SITE.research?.limits ?? []).join(" "),
      route: "/research",
    },
    {
      title: "Policy briefs",
      body: (SITE.policy ?? [])
        .map(
          (p: any) =>
            `${p.title}. ${p.oneLine} Key points: ${(p.bullets ?? []).join(
              "; "
            )} Bottom line: ${p.bottomLine}`
        )
        .join(" "),
      route: "/policy",
    },
    {
      title: "Sources",
      body: (SITE.sources ?? [])
        .map((s: any) => `${s.label} ${s.href}`)
        .join(" "),
      route: "/sources",
    },
    {
      title: "About",
      body: `Author: ${SITE.author}. ${SITE.about ?? ""}`,
      route: "/about",
    },
  ].filter((x) => x.body && x.body.trim().length > 0);

  // Quick intent routing
  const routeHints: Array<{ test: RegExp; reply: string; route?: string }> = [
    {
      test: /(method|model|logistic|logit|statsmodels|variables|predictor|outcome)/i,
      reply:
        "If you’re looking for the model setup (outcome/predictors + approach), check the Research page — it has the full methods block and findings summary.",
      route: "/research",
    },
    {
      test: /(death penalty|execution|roper|stinney|juvenile)/i,
      reply:
        "That’s covered under Policy. Open the Policy page and look for the youth sentencing / extreme punishment brief.",
      route: "/policy",
    },
    {
      test: /(solitary|isolation|segregation|the hole)/i,
      reply:
        "That’s covered under Policy. Open the Policy page for the solitary confinement briefs.",
      route: "/policy",
    },
    {
      test: /(sources|citations|references|bjs|rand|dpic|innocence|hrw|exonerations)/i,
      reply:
        "All citations and primary links are on the Sources page. That’s the place to verify everything fast.",
      route: "/sources",
    },
  ];

  const hint = routeHints.find((h) => h.test.test(q));
  if (hint) {
    return {
      text: hint.reply,
      links: hint.route ? [{ label: "Open page", href: hint.route }] : [],
    };
  }

  // Score KB chunks
  const tokens = q
    .split(/[^a-z0-9]+/i)
    .map((t) => t.trim())
    .filter((t) => t.length >= 3);

  const scored = kb
    .map((item) => {
      const hay = (item.title + " " + item.body).toLowerCase();
      let score = 0;
      for (const t of tokens) {
        if (hay.includes(t)) score += 1;
      }
      // small bonus if title matches
      for (const t of tokens) {
        if (item.title.toLowerCase().includes(t)) score += 1;
      }
      return { ...item, score };
    })
    .sort((a, b) => b.score - a.score);

  const top = scored[0];
  const second = scored[1];

  // If nothing matches, fall back with guidance
  if (!top || top.score === 0) {
    return {
      text:
        "I’m not sure from what’s currently on the site. Try asking about the research question, the model/method, key results, or sources — or open the Research page and I’ll help you interpret it.",
      links: [
        { label: "Research", href: "/research" },
        { label: "Sources", href: "/sources" },
      ],
    };
  }

  const short = (s: string, n = 420) =>
    s.length > n ? s.slice(0, n).trim() + "…" : s;

  // Build a clean, non-templated response
  const responseParts: string[] = [];
  responseParts.push(`Here’s what I have on that (${top.title}):`);
  responseParts.push(short(top.body));

  if (second && second.score >= Math.max(2, top.score - 1) && second.title !== top.title) {
    responseParts.push("");
    responseParts.push(`Related (${second.title}):`);
    responseParts.push(short(second.body, 260));
  }

  const links = [
    top.route ? { label: `Open ${top.title}`, href: top.route } : null,
    second?.route && second.route !== top.route
      ? { label: `Open ${second.title}`, href: second.route }
      : null,
  ].filter(Boolean) as Array<{ label: string; href: string }>;

  return { text: responseParts.join("\n"), links };
}

export default function ResearchBot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      content:
        "Ask me about the research, methods, key findings, or sources. What do you want to know?",
    },
  ]);

  const suggested = useMemo(
    () => [
      "What was the research question?",
      "What variables were used in the model?",
      "Summarize the key results in plain English",
      "Where are the sources for solitary confinement?",
    ],
    []
  );

  function send(text?: string) {
    const q = (text ?? input).trim();
    if (!q) return;

    const next: Msg[] = [...messages, { role: "user", content: q }];
    const a = makeAnswer(q);

    setMessages([
      ...next,
      {
        role: "assistant",
        content: a.text + (a.links.length ? "\n\nLinks:\n" + a.links.map((l) => `• ${l.label}: ${l.href}`).join("\n") : ""),
      },
    ]);
    setInput("");
  }

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-5 right-5 z-50 rounded-full px-4 py-3 bg-neutral-900 text-white shadow-lg ring-1 ring-black/10 hover:opacity-90"
        aria-label={open ? "Close assistant" : "Open assistant"}
      >
        {open ? "Close" : "Ask"}
      </button>

      {/* Panel */}
      {open && (
        <div className="fixed bottom-20 right-5 z-50 w-[380px] max-w-[92vw] overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/10">
          <div className="px-4 py-3 bg-neutral-900 text-white text-sm font-semibold">
            Research Assistant
          </div>

          <div className="px-4 py-3 border-b border-black/10 bg-white">
            <div className="text-xs text-neutral-600">
              Answers are generated from site content (no external AI).
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {suggested.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="text-xs rounded-full px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="h-[320px] overflow-y-auto p-3 space-y-2 bg-neutral-50">
            {messages.map((m, i) => (
              <div
                key={i}
                className={cx(
                  "max-w-[92%] rounded-2xl px-3 py-2 text-sm whitespace-pre-wrap",
                  m.role === "user"
                    ? "ml-auto bg-neutral-900 text-white"
                    : "bg-white ring-1 ring-black/10 text-neutral-900"
                )}
              >
                {/* turn "Links" bullet lines into clickable links */}
                {m.content.split("\n").map((line, idx) => {
                  const match = line.match(/^•\s(.+):\s(\/[a-z0-9\-\/]+)$/i);
                  if (match) {
                    const label = match[1];
                    const href = match[2];
                    return (
                      <div key={idx}>
                        •{" "}
                        <Link href={href} className="underline underline-offset-2">
                          {label}
                        </Link>
                      </div>
                    );
                  }
                  return <div key={idx}>{line}</div>;
                })}
              </div>
            ))}
          </div>

          <div className="p-3 flex gap-2 bg-white border-t border-black/10">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => (e.key === "Enter" ? send() : null)}
              placeholder="Ask about the study…"
              className="flex-1 rounded-xl border border-black/10 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/10"
            />
            <button
              onClick={() => send()}
              className="rounded-xl px-3 py-2 bg-neutral-900 text-white text-sm font-semibold hover:opacity-90"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
