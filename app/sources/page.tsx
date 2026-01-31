// app/sources/page.tsx
import { Container, Surface, Kicker, H1, H2, P } from "@/components/ui";
import { SITE } from "@/components/siteData";

export default function SourcesPage() {
  return (
    <Container>
      <div className="pt-12 md:pt-16 pb-12">
        <Kicker>Sources</Kicker>
        <H1>Sources and references</H1>

        <div className="mt-4 max-w-3xl">
          <P>
            Primary links and citations used to frame the research and policy sections.
          </P>
        </div>

        <div className="mt-10 grid lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 space-y-6">
            <Surface>
              <H2>Primary links</H2>
              <div className="mt-4 space-y-3">
                {SITE.sources.primaryLinks.map((s) => (
                  <a
                    key={s.href}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="block rounded-2xl bg-neutral-50 ring-1 ring-black/10 p-4 hover:bg-white transition"
                  >
                    <div className="text-sm font-semibold text-black">{s.label}</div>
                    <div className="mt-1 text-xs text-black/55 break-all">{s.href}</div>
                  </a>
                ))}
              </div>
            </Surface>

            <Surface>
              <H2>Legal cases</H2>
              <div className="mt-4 space-y-2 text-sm text-black/70">
                {SITE.sources.legalCases.map((c) => (
                  <div key={c} className="rounded-2xl bg-neutral-50 ring-1 ring-black/10 p-3">
                    {c}
                  </div>
                ))}
              </div>
            </Surface>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <Surface>
              <H2>Articles and readings</H2>
              <div className="mt-4 space-y-2 text-sm text-black/70 leading-relaxed">
                {SITE.sources.articlesAndReads.map((a) => (
                  <div key={a} className="rounded-2xl bg-neutral-50 ring-1 ring-black/10 p-3">
                    {a}
                  </div>
                ))}
              </div>
            </Surface>

            <Surface className="bg-gradient-to-br from-rose-50 via-white to-amber-50">
              <H2>Policy section references</H2>
              <div className="mt-3 space-y-2 text-sm text-black/70 leading-relaxed">
                <div className="rounded-2xl bg-white ring-1 ring-black/10 p-3">
                  Death Penalty Information Center (2024)
                </div>
                <div className="rounded-2xl bg-white ring-1 ring-black/10 p-3">
                  Innocence Project (2023)
                </div>
                <div className="rounded-2xl bg-white ring-1 ring-black/10 p-3">
                  National Registry of Exonerations (2023)
                </div>
                <div className="rounded-2xl bg-white ring-1 ring-black/10 p-3">
                  Human Rights Watch (2023)
                </div>
                <div className="rounded-2xl bg-white ring-1 ring-black/10 p-3">
                  Roper v. Simmons, 543 U.S. 551 (2005)
                </div>
              </div>
            </Surface>
          </div>
        </div>
      </div>
    </Container>
  );
}
