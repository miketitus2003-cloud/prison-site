// app/page.tsx
import { Container, Card, Kicker, H1, H2, P, ButtonLink, Badge, Callout } from "@/components/ui";
import { SITE } from "@/components/siteData";

export default function OverviewPage() {
  return (
    <div className="section-band">
      <Container>
        <div className="pt-12 sm:pt-16 pb-14">
          <div className="grid lg:grid-cols-12 gap-10 items-start">
            {/* Left: Hero */}
            <div className="lg:col-span-7">
              <div className="flex flex-wrap items-center gap-2">
                <Badge tone="accent">Research brief</Badge>
                <Badge tone="neutral">Stats dashboard</Badge>
                <Badge tone="neutral">Policy briefs</Badge>
              </div>

              <div className="mt-4">
                <Kicker>Built and written by {SITE.author}</Kicker>
                <H1>{SITE.overview.title}</H1>
              </div>

              <div className="mt-4 max-w-2xl">
                <P className="text-[15px] sm:text-base">
                  {SITE.overview.lead}
                </P>
              </div>

              {/* Hire-me obvious block */}
              <div className="mt-6 rounded-3xl bg-white ring-1 ring-black/10 shadow-soft p-6">
                <div className="text-sm font-semibold text-black">What I built</div>
                <div className="mt-3 grid sm:grid-cols-3 gap-3">
                  <div className="rounded-2xl bg-neutral-50 ring-1 ring-black/10 p-4">
                    <div className="text-xs uppercase tracking-widest text-black/50">Analysis</div>
                    <div className="mt-1 text-sm text-black/80">
                      Logistic regression demo and a research brief.
                    </div>
                  </div>
                  <div className="rounded-2xl bg-neutral-50 ring-1 ring-black/10 p-4">
                    <div className="text-xs uppercase tracking-widest text-black/50">Stats Lab</div>
                    <div className="mt-1 text-sm text-black/80">
                      Visuals pulled from BJS reporting for fast verification.
                    </div>
                  </div>
                  <div className="rounded-2xl bg-neutral-50 ring-1 ring-black/10 p-4">
                    <div className="text-xs uppercase tracking-widest text-black/50">Policy</div>
                    <div className="mt-1 text-sm text-black/80">
                      Short briefs with actionable levers and success metrics.
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-3">
                  <ButtonLink href="/research" variant="primary">
                    Start with results
                  </ButtonLink>
                  <ButtonLink href="/stats" variant="secondary">
                    Open Stats Lab
                  </ButtonLink>
                  <ButtonLink href={SITE.links.analysisRepo} external variant="ghost">
                    View code
                  </ButtonLink>
                </div>
              </div>

              {/* Project One-Pager */}
              <div className="mt-6">
                <Callout title="Project one pager" tone="accent">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs uppercase tracking-widest text-black/50">Problem</div>
                      <div className="mt-1">
                        How strongly do measurable reentry supports relate to recidivism?
                      </div>
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-widest text-black/50">Approach</div>
                      <div className="mt-1">
                        Use post release employment as a proxy, run a logit model, and explain limits clearly.
                      </div>
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-widest text-black/50">Key takeaway</div>
                      <div className="mt-1">
                        Directional association suggests employment aligns with lower reoffending in this run.
                      </div>
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-widest text-black/50">Limits</div>
                      <div className="mt-1">
                        Not causal, proxy based, stronger versions need admin program records and richer controls.
                      </div>
                    </div>
                  </div>
                </Callout>
              </div>

              {/* Tags */}
              <div className="mt-6 flex flex-wrap gap-2">
                {["Logistic regression", "Evidence writing", "Dashboard visuals", "Source verification"].map((t) => (
                  <span
                    key={t}
                    className="text-xs px-3 py-1.5 rounded-full bg-white ring-1 ring-black/10 text-black/70"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: At a glance */}
            <div className="lg:col-span-5">
              <Card className="bg-white ring-1 ring-black/10">
                <div className="flex items-center justify-between gap-3">
                  <H2>At a glance</H2>
                  <Badge tone="neutral">Fast verification</Badge>
                </div>

                <div className="mt-5 space-y-4">
                  {SITE.overview.stats.map((s) => (
                    <div key={s.label} className="rounded-2xl bg-neutral-50 ring-1 ring-black/10 p-4">
                      <div className="text-[11px] uppercase tracking-widest text-black/50">
                        {s.label}
                      </div>
                      <div className="mt-2 text-base font-semibold text-black">
                        {s.value}
                      </div>
                      <div className="mt-1 text-sm text-black/70">
                        {s.note}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-5 flex flex-wrap gap-3">
                  <ButtonLink href="/sources" variant="secondary">
                    Sources
                  </ButtonLink>
                  <ButtonLink href={SITE.links.analysisRepo} external variant="ghost">
                    Analysis repo
                  </ButtonLink>
                </div>

                <div className="mt-6 text-xs text-black/55 leading-relaxed">
                  This website is not advocating for crime. It focuses on documented injustice, evidence, and practical policy discussion.
                </div>
              </Card>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
