import { Container, Card, Kicker, H1, H2, P, Divider } from "@/components/ui";
import { SITE } from "@/components/siteData";

export default function SourcesPage() {
  return (
    <div className="relative">
      <div className="absolute inset-0 -z-10">
        <img
          src="https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=2200&q=70"
          alt="Sources background"
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-[#06080f]/75" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/55 via-white/90 to-[#f7f8fb]" />
      </div>

      <Container>
        <div className="pt-12 sm:pt-16 pb-12">
          <Kicker>Sources</Kicker>
          <H1>Claim to source mapping</H1>

          <div className="mt-4 max-w-3xl">
            <P>
              This page is the credibility engine. Claims are paired with sources and labeled by quality.
              Advocacy sources are labeled clearly when used for context.
            </P>
          </div>

          <div className="mt-8 grid lg:grid-cols-2 gap-6">
            <Card className="bg-[#06080f]/75">
              <H2>Primary links</H2>
              <Divider />
              <div className="space-y-4">
                {SITE.sources.primaryLinks.map((s) => (
                  <div key={s.href} className="rounded-2xl bg-neutral-50 ring-1 ring-black/10 p-4">
                    <div className="text-sm font-semibold text-black">{s.label}</div>
                    <div className="mt-1 text-xs text-black/55">{s.quality}</div>
                    <div className="mt-2 text-sm text-black/70">{s.usedFor}</div>
                    <div className="mt-3">
                      <a className="underline text-sm" href={s.href} target="_blank" rel="noreferrer">
                        Open source
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="bg-[#06080f]/75">
              <H2>Verification standard</H2>
              <Divider />
              <div className="space-y-3 text-sm text-black/70 leading-relaxed">
                <div className="rounded-2xl bg-neutral-50 ring-1 ring-black/10 p-4">
                  <div className="text-xs uppercase tracking-widest text-black/50">Rule</div>
                  <div className="mt-2">
                    Every chart links to a primary source. Every interpretation note states what the chart measures and does not measure.
                  </div>
                </div>
                <div className="rounded-2xl bg-neutral-50 ring-1 ring-black/10 p-4">
                  <div className="text-xs uppercase tracking-widest text-black/50">Language</div>
                  <div className="mt-2">
                    Association only. No causal claims. Descriptive summary first.
                  </div>
                </div>
                <div className="rounded-2xl bg-neutral-50 ring-1 ring-black/10 p-4">
                  <div className="text-xs uppercase tracking-widest text-black/50">Fast verification path</div>
                  <div className="mt-2">
                    Dashboard for numbers. Sources for citations. Insights for framing and limits.
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <div className="mt-8">
            <Card className="bg-[#06080f]/75">
              <H2>Claim mapping</H2>
              <Divider />
              <div className="space-y-4">
                {SITE.sources.claimMap.map((c) => (
                  <div key={c.claim} className="rounded-2xl bg-neutral-50 ring-1 ring-black/10 p-5">
                    <div className="text-sm font-semibold text-black">Claim</div>
                    <div className="mt-2 text-sm text-black/75">{c.claim}</div>
                    <div className="mt-4 text-xs uppercase tracking-widest text-black/50">Sources</div>
                    <ul className="mt-2 space-y-1 text-sm text-black/70">
                      {c.sources.map((s) => (
                        <li key={s}>• {s}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="mt-8 grid lg:grid-cols-2 gap-6">
            <Card className="bg-[#06080f]/75">
              <H2>Image credits</H2>
              <Divider />
              <P>
                Background photos used for visual context are sourced from Unsplash image URLs. This keeps visuals high quality while remaining transparent.
              </P>
              <div className="mt-4 text-sm text-black/70 space-y-2">
                <div>Overview background: Unsplash image URL in the Overview page</div>
                <div>Dashboard background: Unsplash image URL in the Dashboard page</div>
                <div>Insights background: Unsplash image URL in the Insights page</div>
                <div>Policy background: Unsplash image URL in the Policy page</div>
                <div>Sources background: Unsplash image URL in the Sources page</div>
              </div>
              <div className="mt-4 text-xs text-black/55">
                If you want perfect attribution lines, send me the exact Unsplash page links you prefer and I will format photographer credits cleanly.
              </div>
            </Card>

            <Card className="bg-[#06080f]/75">
              <H2>Ethics and intent</H2>
              <Divider />
              <P>
                This site is not advocating for crime. It focuses on documented injustice, transparent measurement, and policies that reduce harm and improve reentry outcomes.
              </P>
              <div className="mt-4 rounded-2xl bg-neutral-50 ring-1 ring-black/10 p-4">
                <div className="text-xs uppercase tracking-widest text-black/50">What to do next</div>
                <div className="mt-2 text-sm text-black/70">
                  If you want a deeper evaluation, start with Dashboard for patterns, then read Insights for limits, then use the claim map to verify quickly.
                </div>
              </div>
            </Card>
          </div>

          <div className="mt-10 text-xs text-black/45">
            Background photo credit is listed here to keep usage transparent.
          </div>
        </div>
      </Container>
    </div>
  );
}
