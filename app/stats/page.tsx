"use client";

import { Container, Kicker, H1, P } from "@/components/ui";
import { BJS2012 } from "@/components/statsData";
import { BarChart, DonutChart, LineChart } from "@/components/StatsCharts";
import PageFade from "@/components/PageFade";
import React from "react";

function pctShare(count: number, total: number) {
  return (count / total) * 100;
}

function toCSV(rows: Array<Record<string, string | number>>) {
  const headers = Object.keys(rows[0] ?? {});
  const lines = [
    headers.join(","),
    ...rows.map((r) => headers.map((h) => JSON.stringify(r[h] ?? "")).join(",")),
  ];
  return lines.join("\n");
}

export default function StatsPage() {
  const [view, setView] = React.useState<"time" | "breakdowns">("time");

  const priors = BJS2012.priorArrestsCounts.map((d) => ({
    label: d.label,
    value: pctShare(d.count, BJS2012.totalReleased),
  }));

  const ages = BJS2012.ageFirstArrestCounts.map((d) => ({
    label: d.label,
    value: pctShare(d.count, BJS2012.totalReleased),
  }));

  const timeRows = BJS2012.cumulativeArrestOverTime.map((d) => ({
    year: d.year,
    cumulative_arrest_pct: d.pct,
    source: "BJS 34 states 2012 PDF",
  }));

  const csv = toCSV(timeRows);
  const csvHref = `data:text/csv;charset=utf-8,${encodeURIComponent(csv)}`;

  return (
    <PageFade>
      <div className="relative min-h-screen">
        {/* Hero background */}
        <div className="absolute inset-0 -z-10">
          <img
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=2200&q=70"
            alt="Dashboard background"
            className="h-full w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-[#06080f]/92" />
          <div className="absolute inset-0 bg-gradient-to-b from-sky-500/8 via-transparent to-transparent" />
        </div>

        {/* Header section — dark */}
        <Container>
          <div className="pt-12 sm:pt-16 pb-10">
            <Kicker>Dashboard</Kicker>
            <H1>Recidivism patterns in BJS reporting</H1>

            <div className="mt-4 max-w-3xl">
              <P>
                These visuals summarize Bureau of Justice Statistics reporting so the patterns are
                readable fast. Each chart is descriptive — it shows what was reported, not why it happened.
              </P>
            </div>

            {/* Key stat cards — dark themed, no white bg */}
            <div className="mt-8 grid sm:grid-cols-3 gap-4">
              {[
                {
                  label: "Arrested within 5 years",
                  value: "70.8%",
                  note: "34-state cohort released in 2012 — any arrest, any offense",
                  source: "BJS 2017",
                },
                {
                  label: "Arrested within 3 years",
                  value: "68%",
                  note: "2005 release cohort — longer follow-up study",
                  source: "BJS 2018",
                },
                {
                  label: "Arrested within 9 years",
                  value: "83%",
                  note: "Shows why follow-up duration changes the picture",
                  source: "BJS 2018",
                },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-3xl bg-white/6 ring-1 ring-white/10 p-5 shadow-[0_16px_60px_rgba(0,0,0,0.4)]"
                >
                  <div className="text-xs uppercase tracking-widest text-white/50">{s.label}</div>
                  <div className="mt-2 text-4xl font-semibold text-white tracking-tight">{s.value}</div>
                  <div className="mt-2 text-sm text-white/65 leading-snug">{s.note}</div>
                  <div className="mt-3 text-xs text-white/40">{s.source}</div>
                </div>
              ))}
            </div>

            <div className="mt-4 text-xs text-white/40">
              Method note: these charts are descriptive summaries. They do not imply causation.
            </div>
          </div>
        </Container>

        {/* Chart section — light panel, charts are white so they need a light ground */}
        <div className="bg-[#f4f5f8] border-t border-black/10">
          <Container>
            <div className="py-10">
              {/* View toggle + CSV */}
              <div className="flex flex-wrap items-center gap-3 mb-8">
                <div className="flex items-center gap-1 bg-black/8 rounded-full p-1">
                  <button
                    onClick={() => setView("time")}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                      view === "time"
                        ? "bg-white text-neutral-900 shadow-sm"
                        : "text-black/60 hover:text-black/80"
                    }`}
                  >
                    Recidivism over time
                  </button>
                  <button
                    onClick={() => setView("breakdowns")}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                      view === "breakdowns"
                        ? "bg-white text-neutral-900 shadow-sm"
                        : "text-black/60 hover:text-black/80"
                    }`}
                  >
                    Breakdown charts
                  </button>
                </div>

                <a
                  className="ml-auto flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold bg-white ring-1 ring-black/10 hover:bg-neutral-50 transition text-black/70"
                  href={csvHref}
                  download="bjs_2012_cumulative_arrest.csv"
                >
                  ↓ Download CSV
                </a>
              </div>

              {view === "time" ? (
                <div className="space-y-5">
                  <div className="rounded-3xl bg-white ring-1 ring-black/8 p-5">
                    <div className="text-sm font-semibold text-black">Key pattern</div>
                    <div className="mt-1 text-sm text-black/70">
                      Cumulative arrest rises sharply in year 1, then continues increasing through year 5 in the 2012 cohort.
                    </div>
                    <div className="mt-1 text-xs text-black/45">
                      What this is: cumulative arrest after release. What this is not: a causal estimate of why arrests happen.
                    </div>
                  </div>

                  <LineChart
                    data={BJS2012.cumulativeArrestOverTime.map((d) => ({
                      x: `Year ${d.year}`,
                      y: d.pct,
                    }))}
                  />
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="grid lg:grid-cols-2 gap-5">
                    <BarChart
                      title="Cumulative arrest at 5 years — by sex"
                      subtitle="Any arrest, any offense (34 states, 2012 release cohort)"
                      data={BJS2012.cumulativeArrest5yrBySex.map((d) => ({
                        label: d.label,
                        value: d.pct,
                      }))}
                      mode="pct"
                    />
                    <BarChart
                      title="Cumulative arrest at 5 years — by race/ethnicity"
                      subtitle="Any arrest, any offense (34 states, 2012 release cohort)"
                      data={BJS2012.cumulativeArrest5yrByRace.map((d) => ({
                        label: d.label,
                        value: d.pct,
                      }))}
                      mode="pct"
                    />
                  </div>

                  <div className="grid lg:grid-cols-2 gap-5">
                    <BarChart
                      title="Prior arrest intensity"
                      subtitle="Share of released prisoners by number of prior arrests"
                      data={priors}
                      mode="pct"
                    />
                    <BarChart
                      title="Age at first arrest"
                      subtitle="Share of released prisoners by age of first arrest"
                      data={ages}
                      mode="pct"
                    />
                  </div>

                  <DonutChart
                    title="Most serious commitment offense"
                    subtitle="Distribution of releases by offense category (34 states, 2012 release cohort)"
                    data={BJS2012.commitmentOffensePct}
                  />

                  <div className="rounded-3xl bg-white ring-1 ring-black/8 p-6">
                    <div className="text-sm font-semibold text-black">Interpretation rule</div>
                    <div className="mt-2 text-sm text-black/70">
                      These charts describe reported patterns. They do not prove that any single factor causes recidivism.
                      The purpose is to make primary reporting legible and verifiable.
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Container>
        </div>

        {/* Sources footer — dark */}
        <div className="bg-[#06080f] border-t border-white/8">
          <Container>
            <div className="py-10">
              <div className="text-xs uppercase tracking-widest text-white/50 mb-4">Data sources</div>
              <div className="grid sm:grid-cols-2 gap-4">
                <a
                  href="https://bjs.ojp.gov/sites/g/files/xyckuh236/files/media/document/rpr34s125yfup1217.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="group rounded-2xl bg-white/6 ring-1 ring-white/10 p-4 hover:bg-white/10 transition block"
                >
                  <div className="text-sm font-semibold text-white">
                    BJS (2017) — 34 States, 2012 Release Cohort
                  </div>
                  <div className="mt-1 text-xs text-white/55">
                    Primary government data · PDF · All time-series and breakdown charts
                  </div>
                  <div className="mt-2 text-xs text-white/35 font-mono">bjs.ojp.gov ↗</div>
                </a>
                <a
                  href="https://bjs.ojp.gov/library/publications/2018-update-prisoner-recidivism-9-year-follow-period-2005-2014"
                  target="_blank"
                  rel="noreferrer"
                  className="group rounded-2xl bg-white/6 ring-1 ring-white/10 p-4 hover:bg-white/10 transition block"
                >
                  <div className="text-sm font-semibold text-white">
                    BJS (2018) — 9-Year Follow-Up Update
                  </div>
                  <div className="mt-1 text-xs text-white/55">
                    Primary government data · 3 / 6 / 9-year headline stats
                  </div>
                  <div className="mt-2 text-xs text-white/35 font-mono">bjs.ojp.gov ↗</div>
                </a>
              </div>
              <div className="mt-5 text-xs text-white/35">
                Background photo credit is listed on the Sources page.
              </div>
            </div>
          </Container>
        </div>
      </div>
    </PageFade>
  );
}
