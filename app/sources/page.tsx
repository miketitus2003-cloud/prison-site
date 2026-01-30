// app/sources/page.tsx
import { ExternalLink } from "lucide-react";
import { Container, Surface, Kicker, H1, P } from "@/components/ui";

type SourceLink = { label: string; href: string; note?: string };

const RESEARCH_CORE: SourceLink[] = [
  {
    label: "BJS — Recidivism (publications & topic hub)",
    href: "https://bjs.ojp.gov/taxonomy/term/recidivism",
    note: "Bureau of Justice Statistics topic page (stable link).",
  },
  {
    label: "BJS PDF — Recidivism report (download)",
    href: "https://bjs.ojp.gov/sites/g/files/xyckuh236/files/media/document/rpr34s125yfup1217.pdf",
    note: "PDF you listed.",
  },
  {
    label: "RAND (2013) — Correctional Education report",
    href: "https://www.rand.org/pubs/research_reports/RR266.html",
    note: "Foundational review on education programs and outcomes.",
  },
];

const SOLITARY_CONFINEMENT: Array<{ citation: string }> = [
  {
    citation:
      'Bulman, Philip. "The Psychological Effects of Solitary Confinement." Corrections Today, vol. 74, no. 3, 2012, pp. 58–59. ProQuest.',
  },
  {
    citation:
      'Lord, Rich. "In ‘the Hole’: Pa. Prisons’ Solitary Confinement Policy." McClatchy – Tribune Business News, Jun 10, 2012. ProQuest.',
  },
  {
    citation:
      'Curtis, Abigail. "Is Solitary Confinement Torture?: Proposed Bill Would Place Limits on Use of Solitary Confinement in State Prison." McClatchy – Tribune Business News, Oct 24, 2009. ProQuest.',
  },
  {
    citation:
      'Will, George. "Solitary; Confinement’s Toll." St. Louis Post-Dispatch, Feb 21, 2013. ProQuest.',
  },
];

const YOUTH_SENTENCING_DEATH_PENALTY: SourceLink[] = [
  {
    label: "Death Penalty Information Center (DPIC)",
    href: "https://deathpenaltyinfo.org",
    note: "Background, policy, execution methods, and national trends.",
  },
  {
    label: "Innocence Project",
    href: "https://innocenceproject.org",
    note: "Wrongful convictions and contributing factors.",
  },
  {
    label: "Human Rights Watch",
    href: "https://www.hrw.org",
    note: "Human rights reporting relevant to sentencing and confinement practices.",
  },
  {
    label: "National Registry of Exonerations (University of Michigan)",
    href: "https://www.law.umich.edu/special/exoneration",
    note: "Data on exonerations and trends.",
  },
  {
    label: "Equal Justice Initiative — George Stinney case (search hub)",
    href: "https://eji.org",
    note: "Casework and reporting on extreme punishment and juvenile justice history.",
  },
  {
    label: "Roper v. Simmons, 543 U.S. 551 (2005)",
    href: "https://supreme.justia.com/cases/federal/us/543/551/",
    note: "U.S. Supreme Court case on juveniles and capital punishment.",
  },
  {
    label: "The Guardian (2014) — Clayton Lockett execution reporting (search)",
    href: "https://www.theguardian.com/us-news/clayton-lockett",
    note: "Reporting on botched execution context.",
  },
];

function LinkCard({ s }: { s: SourceLink }) {
  return (
    <a
      href={s.href}
      target="_blank"
      rel="noreferrer"
      className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-4 hover:bg-white/10 transition flex items-start justify-between gap-3"
    >
      <div className="min-w-0">
        <div className="text-sm text-white/85">{s.label}</div>
        {s.note ? <div className="mt-1 text-xs text-white/60">{s.note}</div> : null}
      </div>
      <ExternalLink className="h-4 w-4 opacity-70 mt-0.5 shrink-0" />
    </a>
  );
}

export default function SourcesPage() {
  return (
    <Container>
      <div className="pt-12 md:pt-16 pb-12">
        <Kicker>Sources</Kicker>
        <H1>References</H1>

        <div className="mt-4 max-w-3xl">
          <P>
            Primary sources and citations used across the research and policy sections.
          </P>
        </div>

        <div className="mt-10 grid gap-6">
          <Surface>
            <div className="text-lg font-semibold">Research — Recidivism & education</div>
            <div className="mt-4 grid gap-3">
              {RESEARCH_CORE.map((s) => (
                <LinkCard key={s.href} s={s} />
              ))}
            </div>
          </Surface>

          <Surface>
            <div className="text-lg font-semibold">Policy — Solitary confinement</div>
            <div className="mt-4 space-y-3 text-sm text-white/80 leading-relaxed">
              {SOLITARY_CONFINEMENT.map((x) => (
                <div
                  key={x.citation}
                  className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-4"
                >
                  {x.citation}
                </div>
              ))}
            </div>
          </Surface>

          <Surface>
            <div className="text-lg font-semibold">Policy — Youth sentencing & death penalty</div>
            <div className="mt-4 grid gap-3">
              {YOUTH_SENTENCING_DEATH_PENALTY.map((s) => (
                <LinkCard key={s.href} s={s} />
              ))}
            </div>
          </Surface>
        </div>
      </div>
    </Container>
  );
}
