// app/stats/page.tsx
import { Container, Kicker, H1, P, Badge, ButtonLink, Callout } from "@/components/ui";
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
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="accent">Stats Lab</Badge>
          <Badge tone="neutral">BJS extracted</Badge>
        </div>

        <H1>Recidivism patterns in BJS reporting</H1>

        <div className="mt-4 max-w-3xl">
          <P>
            These visuals are pulled from Bureau of Justice Statistics recidivism reporting. The goal is fast readability and quick verification.
          </P>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <ButtonLink href="#time" variant="secondary">Over time</ButtonLink>
          <ButtonLink href="#breakdowns" variant="secondary">Sex and race</ButtonLink>
          <ButtonLink href="#priors" variant="secondary">Prior arrests</ButtonLink>
          <ButtonLink href="#age" variant="secondary">Age first arrest</ButtonLink>
          <ButtonLink href="#offense" variant="secondary">Offense mix</ButtonLink>
        </div>

        <div className="mt-6">
          <Callout title="Interpretation note" tone="warn">
            These charts are descriptive summaries of BJS reporting. They do not explain why patterns occur.
          </Callout>
        </div>

        <div className="mt-8 grid md:grid-cols-3 gap-4">
          <StatCard
            label="Cumulative arrest at 5 years"
            value="70.8%"
            note="34 states, released in 2012. Any arrest, any offense."
          />
          <StatCard
            label="Arrested within 3 years"
            value="68%"
            note="2005 release cohort tracked for 9 years."
          />
          <StatCard
            label="Arrested within 9 years"
            value="83%"
            note="Longer follow up changes the picture."
          />
        </div>

        {/* Time series */}
        <div id="time" className="mt-10 scroll-mt-[100px]">
          <LineChart
            data={BJS2012.cumulativeArrestOverTime.map((d) => ({
              x: `Year ${d.year}`,
              y: d.pct,
            }))}
          />
        </div>

        {/* Breakdowns */}
        <div id="breakdowns" className="mt-8 grid lg:grid-cols-2 gap-6 scroll-mt-[100px]">
          <BarChart
            title="Cumulative arrest at 5 years by sex"
            subtitle="Any arrest, any offense (34 states, 2012 cohort)"
            data={BJS2012.cumulativeArrest5yrBySex.map((d) => ({
              label: d.label,
              value: d.pct,
            }))}
            mode="pct"
          />

          <BarChart
            title="Cumulative arrest at 5 years by race and ethnicity"
            subtitle="Any arrest, any offense (34 states, 2012 cohort)"
            data={BJS2012.cumulativeArrest5yrByRace.map((d) => ({
              label: d.label,
              value: d.pct,
            }))}
            mode="pct"
          />
        </div>

        {/* Priors */}
        <div id="priors" className="mt-8 scroll-mt-[100px]">
          <BarChart
            title="Prior arrest intensity"
            subtitle="Share of released prisoners by number of prior arrests (computed from BJS table counts)"
            data={priors.map((d) => ({ label: d.label, value: d.value }))}
            mode="pct"
          />
        </div>

        {/* Age first arrest */}
        <div id="age" className="mt-8 scroll-mt-[100px]">
          <BarChart
            title="Age at first arrest"
            subtitle="Share of released prisoners by age of first arrest (computed from BJS table counts)"
            data={ages.map((d) => ({ label: d.label, value: d.value }))}
            mode="pct"
          />
        </div>

        {/* Offense mix */}
        <div id="offense" className="mt-8 scroll-mt-[100px]">
          <DonutChart
            title="Most serious commitment offense"
            subtitle="Distribution of releases by offense category (34 states, 2012 cohort)"
            data={BJS2012.commitmentOffensePct}
          />
        </div>

        <div className="mt-10 rounded-3xl bg-neutral-50 ring-1 ring-black/10 p-6">
          <div className="text-sm font-semibold text-black">Sources</div>
          <div className="mt-2 text-sm text-black/70 leading-relaxed">
            BJS PDF (2012 cohort, 34 states):{" "}
            <a
              className="underline"
              href="https://bjs.ojp.gov/sites/g/files/xyckuh236/files/media/document/rpr34s125yfup1217.pdf"
              target="_blank"
              rel="noreferrer"
            >
              rpr34s125yfup1217.pdf
            </a>
            <br />
            BJS 9 year follow up update:{" "}
            <a
              className="underline"
              href="https://bjs.ojp.gov/library/publications/2018-update-prisoner-recidivism-9-year-follow-period-2005-2014"
              target="_blank"
              rel="noreferrer"
            >
              2018 update on prisoner recidivism
            </a>
            <div className="mt-4">
              <ButtonLink href="/sources" variant="secondary">Open Sources page</ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
