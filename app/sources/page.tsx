// app/sources/page.tsx
import { ExternalLink } from "lucide-react";
import { Card, SectionHeader } from "@/components/ui";

const SOURCES = [
  { label: "BJS — Recidivism topic page", href: "https://bjs.ojp.gov/topics/recidivism" },
  { label: "RAND (2013) — Correctional education report", href: "https://www.rand.org/pubs/research_reports/RR266.html" },
  {
    label: "BJS — Publications tagged for recidivism",
    href: "https://bjs.ojp.gov/library/publications/list?field_keywords_target_id%5B0%5D=Recidivism",
  },
];

export default function SourcesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 pt-12 md:pt-16 pb-12">
      <SectionHeader
        eyebrow="Sources"
        title="Core references"
        subtitle="Primary sources used to frame the research and statistics."
      />

      <div className="mt-8">
        <Card>
          <div className="grid gap-3">
            {SOURCES.map((s) => (
              <a
                key={s.href}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-4 hover:bg-white/10 transition flex items-start justify-between gap-3"
              >
                <div className="text-sm text-white/85">{s.label}</div>
                <ExternalLink className="h-4 w-4 opacity-70 mt-0.5" />
              </a>
            ))}
          </div>

          <div className="mt-5 text-xs text-white/55 leading-relaxed">
            Note: If you add more citations later, keep this page focused on primary/official sources first.
          </div>
        </Card>
      </div>
    </div>
  );
}
