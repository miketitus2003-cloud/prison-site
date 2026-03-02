import { Container, Card, Kicker, H1, H2, P, Bullets, Divider, ButtonLink } from "@/components/ui";
import { SITE } from "@/components/siteData";
import PageFade from "@/components/PageFade";

export default function PolicyPage() {
  return (
    <PageFade>
    <div className="relative">
      <div className="absolute inset-0 -z-10">
        <img
          src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=2200&q=70"
          alt="Policy background"
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-[#06080f]/90" />
        <div className="absolute inset-0 bg-gradient-to-b from-sky-500/8 via-transparent to-[#06080f]" />
      </div>

      <Container>
        <div className="pt-12 sm:pt-16 pb-12">
          <Kicker>Policy briefs</Kicker>
          <H1>Decision-memo briefs</H1>

          <div className="mt-4 max-w-3xl">
            <P>
              These briefs connect evidence and implementation. The format is designed for policy, compliance, and program reviewers.
            </P>
          </div>

          <div className="mt-8 grid lg:grid-cols-2 gap-6">
            {SITE.policy.map((p) => (
              <Card key={p.title}>
                <H2>{p.title}</H2>
                <P className="mt-3">{p.oneLine}</P>

                <Divider />

                <div className="text-xs uppercase tracking-widest text-white/50">Key points</div>
                <Bullets items={p.bullets} />

                <Divider />

                <div className="rounded-2xl bg-white/6 ring-1 ring-white/10 p-4">
                  <div className="text-xs uppercase tracking-widest text-white/50">Bottom line</div>
                  <div className="mt-2 text-sm font-semibold text-white">{p.bottomLine}</div>
                </div>

                <Divider />

                <div className="text-xs uppercase tracking-widest text-white/50">Decision memo</div>
                <div className="mt-3 grid sm:grid-cols-2 gap-3 text-sm text-white/70">
                  <div className="rounded-2xl bg-white/6 ring-1 ring-white/10 p-4">
                    <div className="text-xs uppercase tracking-widest text-white/50">Owner</div>
                    <div className="mt-2">{p.memo.owner}</div>
                  </div>
                  <div className="rounded-2xl bg-white/6 ring-1 ring-white/10 p-4">
                    <div className="text-xs uppercase tracking-widest text-white/50">Cost</div>
                    <div className="mt-2">{p.memo.cost}</div>
                  </div>
                  <div className="rounded-2xl bg-white/6 ring-1 ring-white/10 p-4">
                    <div className="text-xs uppercase tracking-widest text-white/50">Timeline</div>
                    <div className="mt-2">{p.memo.timeline}</div>
                  </div>
                  <div className="rounded-2xl bg-white/6 ring-1 ring-white/10 p-4">
                    <div className="text-xs uppercase tracking-widest text-white/50">Risks</div>
                    <ul className="mt-2 space-y-1">
                      {p.memo.risks.map((r) => (
                        <li key={r}>• {r}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-4 rounded-2xl bg-white/6 ring-1 ring-white/10 p-4">
                  <div className="text-xs uppercase tracking-widest text-white/50">Success metrics</div>
                  <ul className="mt-2 space-y-1 text-sm text-white/70">
                    {p.memo.successMetrics.map((m) => (
                      <li key={m}>• {m}</li>
                    ))}
                  </ul>
                </div>

                <div className="mt-5 flex flex-wrap gap-3">
                  <ButtonLink href="/sources" variant="secondary">
                    Sources used
                  </ButtonLink>
                  <ButtonLink href="/stats" variant="ghost">
                    Dashboard
                  </ButtonLink>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-10 text-xs text-white/40">
            Background photo credit is listed on Sources.
          </div>
        </div>
      </Container>
    </div>
    </PageFade>
  );
}
