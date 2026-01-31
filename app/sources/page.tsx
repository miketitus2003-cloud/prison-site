// app/sources/page.tsx
import { Container, Kicker, H1, P, Badge } from "@/components/ui";
import { SITE } from "@/components/siteData";

function SourceLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="block rounded-2xl bg-white ring-1 ring-black/10 p-4 hover:bg-neutral-50 transition"
    >
      <div className="text-sm font-semibold text-black">{label}</div>
      <div className="mt-1 text-xs text-black/55 break-all">{href}</div>
    </a>
  );
}

export default function SourcesPage() {
  const primary = SITE.sources.primaryLinks;

  return (
    <Container>
      <div className="pt-12 sm:pt-16 pb-12">
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="accent">Sources</Badge>
          <Badge tone="neutral">Claim mapping</Badge>
        </div>

        <H1>Sources and references</H1>

        <div className="mt-4 max-w-3xl">
          <P>
            Sources are grouped by what they support so it is easy to verify claims quickly. Primary and official sources come first.
          </P>
        </div>

        {/* Primary */}
        <div className="mt-8">
          <div className="text-sm font-semibold text-black">Primary data and official reporting</div>
          <div className="mt-3 grid md:grid-cols-2 gap-4">
            {primary.map((s) => (
              <SourceLink key={s.href} href={s.href} label={s.label} />
            ))}
          </div>
        </div>

        {/* Claim mapping */}
        <div className="mt-10 grid lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 rounded-3xl bg-white ring-1 ring-black/10 shadow-soft p-6">
            <div className="text-sm font-semibold text-black">Claim to source mapping</div>

            <div className="mt-4 space-y-4 text-sm text-black/70">
              <div className="rounded-2xl bg-neutral-50 ring-1 ring-black/10 p-4">
                <div className="font-semibold text-black">Recidivism rises with longer follow up time</div>
                <div className="mt-2 space-y-2">
                  <div>• BJS 2012 cohort shows cumulative arrest rises quickly over five years</div>
                  <div>• BJS 9 year follow up update shows continued increase with longer tracking</div>
                </div>
              </div>

              <div className="rounded-2xl bg-neutral-50 ring-1 ring-black/10 p-4">
                <div className="font-semibold text-black">Correctional education literature links programs to improved outcomes</div>
                <div className="mt-2">• RAND correctional education meta analysis</div>
              </div>

              <div className="rounded-2xl bg-neutral-50 ring-1 ring-black/10 p-4">
                <div className="font-semibold text-black">Solitary confinement has documented psychological harms</div>
                <div className="mt-2 space-y-1">
                  {SITE.sources.articlesAndReads
                    .filter((x) => x.toLowerCase().includes("solitary"))
                    .map((x) => (
                      <div key={x}>• {x}</div>
                    ))}
                </div>
              </div>

              <div className="rounded-2xl bg-neutral-50 ring-1 ring-black/10 p-4">
                <div className="font-semibold text-black">Youth sentencing and irreversible punishment risks</div>
                <div className="mt-2 space-y-1">
                  <div>• Roper v. Simmons, 543 U.S. 551 (2005)</div>
                  <div>• Death Penalty Information Center</div>
                  <div>• Innocence Project and National Registry of Exonerations</div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick reference */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-3xl bg-white ring-1 ring-black/10 shadow-soft p-6">
              <div className="text-sm font-semibold text-black">Legal</div>
              <div className="mt-3 text-sm text-black/70 space-y-1">
                {SITE.sources.legalCases.map((c) => (
                  <div key={c}>• {c}</div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl bg-white ring-1 ring-black/10 shadow-soft p-6">
              <div className="text-sm font-semibold text-black">Articles and background reading</div>
              <div className="mt-3 text-sm text-black/70 space-y-2">
                {SITE.sources.articlesAndReads.map((a) => (
                  <div key={a}>• {a}</div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl bg-neutral-50 ring-1 ring-black/10 p-6">
              <div className="text-sm font-semibold text-black">Note</div>
              <div className="mt-2 text-sm text-black/70">
                If you want the fastest verification path, use Stats Lab for numbers and this page for citations.
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
