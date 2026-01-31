// app/stats/page.tsx
import { Container, Kicker, H1, P } from "@/components/ui";
import { BJS2012, BJS2018 } from "@/components/statsData";
import { BarChart, DonutChart, LineChart, StatCard } from "@/components/StatsCharts";

function pctShare(count: number, total: number) {
  return (count / total) * 100;
}

export default function StatsPage() {
  const priors = BJS2012.priorArrestsCounts.map((d) => ({
    label: d.label,
    value: pctShare(d.count, BJS2012.totalReleased),
  }));

  const ages = BJS2012.ageFirstArrestCounts.map((d) => ({
    label: d.label,
    value: pctShare(d.count, BJS2012.totalReleased),
  }));

  return (
    <Container>
      <div className="pt-12 sm:pt-16 pb-12">
        <Kicker>Stats</Kicker>
        <H1>Recidivism patterns in the BJS data</H1>

        <div className="mt-4 max-w-3xl">
          <P>
            These visuals are pulled from Bureau of Justice Statistics recidivism reporting.
            The goal is to make the patterns readable fast, with sources linked at the bottom.
          </P>
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
            note="2005 release cohort tracked for 9 years."
          />
          <StatCard
            label="Arrested within 9 years"
            value="83%"
            note="Shows why longer follow-up changes the picture."
          />
        </div>

        <div className="mt-8">
          <LineChart
            data={BJS2012.cumulativeArrestOverTime.map((d) => ({
              x: `Year ${d.year}`,
              y: d.pct,
            }))}
          />
        </div>

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

        <div className="mt-10 rounded-3xl bg-neutral-50 ring-1 ring-black/10 p-6">
          <div className="text-sm font-semibold text-black">Sources</div>
          <div className="mt-2 text-sm text-black/70 leading-relaxed">
            BJS (2017) Recidivism of Prisoners Released in 34 States in 2012 (PDF):{" "}
            <a className="underline" href="https://bjs.ojp.gov/sites/g/files/xyckuh236/files/media/document/rpr34s125yfup1217.pdf" target="_blank" rel="noreferrer">
              rpr34s125yfup1217.pdf
            </a>
            <br />
            BJS (2018) 9-year follow-up update page:{" "}
            <a className="underline" href="https://bjs.ojp.gov/library/publications/2018-update-prisoner-recidivism-9-year-follow-period-2005-2014" target="_blank" rel="noreferrer">
              2018 update on prisoner recidivism
            </a>
          </div>
        </div>
      </div>
    </Container>
  );
}
