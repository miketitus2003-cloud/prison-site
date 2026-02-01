import { Container, Kicker, H1, P } from "@/components/ui";
import { BJS2012, BJS2018 } from "@/components/statsData";
import { BarChart, DonutChart, LineChart, StatCard } from "@/components/StatsCharts";
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
    <div className="relative">
      {/* Background photo */}
      <div className="absolute inset-0 -z-10">
        <img
          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=2200&q=70"
          alt="Dashboard background"
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-[#06080f]/75" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/55 via-white/88 to-[#f7f8fb]" />
      </div>

      <Container>
        <div className="pt-12 sm:pt-16 pb-12">
          <Kicker>Dashboard</Kicker>
          <H1>Recidivism patterns in BJS reporting</H1>

          <div className="mt-4 max-w-3xl">
            <P>
              These visuals summarize Bureau of Justice Statistics reporting so the patterns are readable fast.
              Each chart includes a short note on what it measures and what it does not measure.
            </P>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            <button
              onClick={() => setView("time")}
              className={`px-3 py-2 rounded-full text-sm font-semibold ring-1 transition ${
                view === "time"
                  ? "bg-black text-white ring-black/10"
                  : "bg-white text-black/70 ring-black/10 hover:bg-neutral-50"
              }`}
            >
              Recidivism over time
            </button>
            <button
              onClick={() => setView("breakdowns")}
              className={`px-3 py-2 rounded-full text-sm font-semibold ring-1 transition ${
                view === "breakdowns"
                  ? "bg-black text-white ring-black/10"
                  : "bg-white text-black/70 ring-black/10 hover:bg-neutral-50"
              }`}
            >
              Breakdown charts
            </button>

            <a
              className="ml-auto px-3 py-2 rounded-full text-sm font-semibold bg-white ring-1 ring-black/10 hover:bg-neutral-50 transition"
              href={csvHref}
              download="bjs_2012_cumulative_arrest.csv"
            >
              Download CSV
            </a>
          </div>

          <div className="mt-8 grid md:grid-cols-3 gap-4">
            <StatCard
              label="Cumulative arrest at 5 years"
              value="70.8%"
              note="34 states, prisoners released in 2012 (any arrest, any offense)."
            />
            <StatCard
              label="Arrested within 3 years"
              value="68%"
              note="2005 release cohort tracked for longer follow-up."
            />
            <StatCard
              label="Arrested within 9 years"
              value="83%"
              note="Shows why longer follow-up changes the picture."
            />
          </div>

          <div className="mt-4 text-xs text-black/55">
            Method note: these charts are descriptive summaries. They do not imply causation.
          </div>

          {view === "time" ? (
            <div className="mt-8 space-y-6">
              <div className="rounded-3xl bg-white/90 ring-1 ring-black/10 p-5">
                <div className="text-sm font-semibold text-black">Key pattern</div>
                <div className="mt-1 text-sm text-black/70">
                  The cumulative arrest curve rises quickly in year 1 and keeps increasing through year 5 in the 2012 cohort.
                </div>
                <div className="mt-1 text-xs text-black/50">
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
            <>
              <div className="mt-8 grid lg:grid-cols-2 gap-6">
                <BarChart
                  title="Cumulative arrest at 5 years by sex"
                  subtitle="Any arrest, any offense (34 states, 2012 release cohort)"
                  data={BJS2012.cumulativeArrest5yrBySex.map((d) => ({
                    label: d.label,
                    value: d.pct,
                  }))}
                  mode="pct"
                />

                <BarChart
                  title="Cumulative arrest at 5 years by race/ethnicity"
                  subtitle="Any arrest, any offense (34 states, 2012 release cohort)"
                  data={BJS2012.cumulativeArrest5yrByRace.map((d) => ({
                    label: d.label,
                    value: d.pct,
                  }))}
                  mode="pct"
                />
              </div>

              <div className="mt-8 grid lg:grid-cols-2 gap-6">
                <BarChart
                  title="Prior arrest intensity"
                  subtitle="Share of released prisoners by number of prior arrests (computed from BJS table counts)"
                  data={priors.map((d) => ({ label: d.label, value: d.value }))}
                  mode="pct"
                />

                <BarChart
                  title="Age at first arrest"
                  subtitle="Share of released prisoners by age of first arrest (computed from BJS table counts)"
                  data={ages.map((d) => ({ label: d.label, value: d.value }))}
                  mode="pct"
                />
              </div>

              <div className="mt-8">
                <DonutChart
                  title="Most serious commitment offense"
                  subtitle="Distribution of releases by offense category (34 states, 2012 release cohort)"
                  data={BJS2012.commitmentOffensePct}
                />
              </div>

              <div className="mt-6 rounded-3xl bg-white/90 ring-1 ring-black/10 p-6">
                <div className="text-sm font-semibold text-black">Interpretation rule</div>
                <div className="mt-2 text-sm text-black/70">
                  These charts describe reported patterns. They do not prove that any single factor causes recidivism.
                  The purpose is to make the reporting legible and verifiable.
                </div>
              </div>
            </>
          )}

          <div className="mt-10 rounded-3xl bg-neutral-50 ring-1 ring-black/10 p-6">
            <div className="text-sm font-semibold text-black">Sources</div>
            <div className="mt-2 text-sm text-black/70 leading-relaxed">
              BJS (2017) Recidivism of Prisoners Released in 34 States in 2012 (PDF):{" "}
              <a
                className="underline"
                href="https://bjs.ojp.gov/sites/g/files/xyckuh236/files/media/document/rpr34s125yfup1217.pdf"
                target="_blank"
                rel="noreferrer"
              >
                rpr34s125yfup1217.pdf
              </a>
              <br />
              BJS (2018) 9-year follow-up update page:{" "}
              <a
                className="underline"
                href="https://bjs.ojp.gov/library/publications/2018-update-prisoner-recidivism-9-year-follow-period-2005-2014"
                target="_blank"
                rel="noreferrer"
              >
                2018 update on prisoner recidivism
              </a>
            </div>
          </div>

          <div className="mt-3 text-xs text-black/45">
            Background photo credit is listed on Sources.
          </div>
        </div>
      </Container>
    </div>
  );
}
